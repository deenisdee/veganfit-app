import admin from 'firebase-admin';
import { MercadoPagoConfig, Payment } from 'mercadopago';

/**
 * getFirebaseServiceAccount()
 * - Lê credencial do Firebase via ENV
 * - Aceita JSON puro OU Base64 de JSON
 */
function getFirebaseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY não está definida na Vercel.');
  }

  const trimmed = raw.trim();

  // Caso 1: JSON puro
  if (trimmed.startsWith('{')) {
    return JSON.parse(trimmed);
  }

  // Caso 2: Base64
  const decoded = Buffer.from(trimmed, 'base64').toString('utf-8').trim();
  return JSON.parse(decoded);
}

/**
 * ensureFirebase()
 * - Inicializa Firebase Admin uma única vez
 */
function ensureFirebase() {
  if (admin.apps.length) return;

  const serviceAccount = getFirebaseServiceAccount();

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log('[WEBHOOK] ✅ Firebase Admin inicializado com sucesso');
}

/**
 * ensureMercadoPagoClient()
 * - Inicializa o client do Mercado Pago (SDK novo)
 */
function ensureMercadoPagoClient() {
  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!token) {
    throw new Error('MERCADO_PAGO_ACCESS_TOKEN não está definido na Vercel.');
  }

  const client = new MercadoPagoConfig({ accessToken: token });
  return {
    payment: new Payment(client)
  };
}

/**
 * generateCode(plan)
 * - Gera um código único por compra
 */
function generateCode(plan) {
  const prefix = plan === 'trial' ? 'TRIAL' : 'VFP';
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${random}`;
}

/**
 * calcExpiresAt(plan)
 * - Calcula expiração (trial/mensal/trimestral/anual)
 */
function calcExpiresAt(plan) {
  let expirationDays = 30;

  if (plan === 'trial') expirationDays = 5;
  else if (plan === 'monthly') expirationDays = 30;
  else if (plan === 'quarterly') expirationDays = 90;
  else if (plan === 'annual') expirationDays = 365;

  return Date.now() + expirationDays * 24 * 60 * 60 * 1000;
}

/**
 * handler()
 * - Webhook MP (Checkout Pro)
 * - Busca pagamento aprovado, salva no Firestore e envia email
 * - NÃO quebra com "Simular notificação" (payment 404)
 * - Anti-duplicação ATÔMICA com Firestore lock
 */
export default async function handler(req, res) {
  // Debug básico
  console.log('[WEBHOOK] Método:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    ensureFirebase();
    const mp = ensureMercadoPagoClient();
    const db = admin.firestore();

    const body = req.body;
    console.log('[WEBHOOK] Body recebido:', JSON.stringify(body, null, 2));

    // ✅ Verifica tipo de evento (MP costuma mandar { type: "payment" })
    if (body?.type !== 'payment') {
      console.log('[WEBHOOK] ⚠️ Tipo ignorado:', body?.type);
      return res.status(200).json({ ok: true, ignored: true, reason: 'type_ignored' });
    }

    const paymentId = body?.data?.id;

    if (!paymentId) {
      console.log('[WEBHOOK] ❌ Payment ID não encontrado no body');
      return res.status(200).json({ ok: true, ignored: true, reason: 'missing_payment_id' });
    }

    console.log('[WEBHOOK] 📋 Payment ID:', paymentId);

    // ✅ LOCK ATÔMICO (anti-duplicação)
    const webhookRef = db.collection('webhook_logs').doc(String(paymentId));

    try {
      await webhookRef.create({
        paymentId: String(paymentId),
        status: 'processing',
        receivedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log('[WEBHOOK] 🔒 Lock criado para paymentId:', paymentId);
    } catch (e) {
      console.log('[WEBHOOK] ♻️ Lock já existe (ignorando) paymentId:', paymentId);
      return res.status(200).json({ ok: true, ignored: true, reason: 'already_processed' });
    }

    // ✅ Busca pagamento real no MP
    let payment;
    try {
      payment = await mp.payment.get({ id: paymentId });
    } catch (err) {
      const status = err?.status;

      // ✅ Se for simulação / payment inexistente, não quebra o webhook
      if (status === 404) {
        console.log('[WEBHOOK] ⚠️ Payment não encontrado (simulador ou id inválido). Ignorando.', paymentId);

        await webhookRef.update({
          status: 'ignored',
          reason: 'payment_not_found',
          finishedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        return res.status(200).json({
          ok: true,
          ignored: true,
          reason: 'payment_not_found',
          paymentId
        });
      }

      console.error('[WEBHOOK] ❌ Erro ao buscar payment no MP:', err);

      await webhookRef.update({
        status: 'error',
        reason: 'payment_fetch_error',
        details: err?.message || String(err),
        finishedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return res.status(500).json({
        error: 'Erro ao buscar payment',
        details: err?.message || String(err)
      });
    }

    const paymentStatus = payment?.status;
    console.log('[WEBHOOK] 💰 Status do pagamento:', paymentStatus);

    // ✅ Só processa se aprovado
    if (paymentStatus !== 'approved') {
      console.log('[WEBHOOK] ⚠️ Pagamento não aprovado, ignorando');

      await webhookRef.update({
        status: 'ignored',
        reason: 'not_approved',
        paymentStatus,
        finishedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return res.status(200).json({ ok: true, ignored: true, reason: 'not_approved' });
    }

    // ✅ Extrai dados
    const metadata = payment.metadata || {};
    const plan = metadata.plan || 'monthly';
    const name = metadata.name || payment.payer?.first_name || 'Cliente';
    const email = metadata.email || payment.payer?.email;
    const phone = metadata.phone || payment.payer?.phone?.number || '';

    console.log('[WEBHOOK] 👤 Cliente:', { name, email, phone, plan });

    if (!email) {
      await webhookRef.update({
        status: 'error',
        reason: 'missing_email',
        finishedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return res.status(200).json({ ok: true, ignored: true, reason: 'missing_email' });
    }

    // ✅ Gera código + expiração
    const code = generateCode(plan);
    const expiresAt = calcExpiresAt(plan);

    // ✅ Salva user
    const usersRef = db.collection('users');
    const existingUser = await usersRef.where('email', '==', email).get();

    if (existingUser.empty) {
      await usersRef.add({
        name,
        email,
        phone,
        plan,
        code,
        expiresAt,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentId: payment.id,
        paymentStatus
      });
      console.log('[WEBHOOK] ✅ Novo usuário criado');
    } else {
      const userId = existingUser.docs[0].id;
      await usersRef.doc(userId).update({
        plan,
        code,
        expiresAt,
        lastPaymentAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentId: payment.id,
        paymentStatus
      });
      console.log('[WEBHOOK] ✅ Usuário atualizado');
    }

    // ✅ Salva code
    const codesRef = db.collection('premium_codes');
    await codesRef.add({
      code,
      plan,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt,
      used: false,
      usedBy: null,
      usedAt: null,
      paymentId: payment.id,
      paymentStatus,
      mercadoPagoPayerId: payment.payer?.id || null
    });

    console.log('[WEBHOOK] ✅ Código salvo no Firestore');

    // ✅ Envia e-mail (não falha o webhook por isso)
    let emailSent = false;

    try {
      const baseUrl =
        process.env.PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `https://${req.headers.host}`);

      console.log('[WEBHOOK] 📧 Chamando API de email em:', baseUrl);

      const emailResponse = await fetch(`${baseUrl}/api/send-premium-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          codigo: code,
          plan,
          expiresAt
        })
      });

      const responseText = await emailResponse.text();

      if (emailResponse.ok) {
        emailSent = true;
        console.log('[WEBHOOK] ✅ Email enviado com sucesso:', responseText);
      } else {
        console.error('[WEBHOOK] ⚠️ Falha ao enviar email:', responseText);
      }
    } catch (emailError) {
      console.error('[WEBHOOK] ⚠️ Erro ao enviar email:', emailError);
    }

    // ✅ Finaliza log do webhook
    await webhookRef.update({
      status: 'done',
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      paymentStatus,
      email,
      plan,
      expiresAt,
      emailSent
    });

    return res.status(200).json({
      ok: true,
      code,
      email,
      plan,
      expiresAt: new Date(expiresAt).toISOString(),
      emailSent
    });

  } catch (error) {
    console.error('[WEBHOOK] ERRO:', error);
    return res.status(500).json({
      error: 'Erro no webhook',
      details: error.message
    });
  }
}

// (fim do arquivo)
