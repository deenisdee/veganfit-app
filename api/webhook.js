import admin from 'firebase-admin';
import { MercadoPagoConfig, Payment } from 'mercadopago';

/**
 * Lê credenciais do Firebase de forma robusta:
 * - Aceita JSON puro (string começando com "{")
 * - Aceita Base64 de JSON
 */
function getFirebaseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY não está definida na Vercel.');

  const trimmed = raw.trim();

  // JSON puro
  if (trimmed.startsWith('{')) {
    return JSON.parse(trimmed);
  }

  // Base64
  const decoded = Buffer.from(trimmed, 'base64').toString('utf-8').trim();
  return JSON.parse(decoded);
}

function ensureFirebase() {
  if (admin.apps.length) return;
  const serviceAccount = getFirebaseServiceAccount();
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

function ensureMercadoPagoClient() {
  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!token) throw new Error('MERCADO_PAGO_ACCESS_TOKEN não está definido na Vercel.');

  const client = new MercadoPagoConfig({ accessToken: token });
  return {
    payment: new Payment(client),
  };
}

// Gera código
function generateCode(plan) {
  const prefix = plan === 'trial' ? 'TRIAL' : 'VFP';
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${random}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    ensureFirebase();
    const mp = ensureMercadoPagoClient();

    const body = req.body;

    // MP manda vários tipos
    if (body?.type !== 'payment') {
      return res.status(200).json({ ok: true, message: 'Tipo ignorado' });
    }

    const paymentId = body?.data?.id;
    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID não encontrado' });
    }

    // ✅ SDK novo: buscar pagamento por ID
    const paymentResponse = await mp.payment.get({ id: paymentId });
    const payment = paymentResponse;
    const status = payment?.status;

    if (status !== 'approved') {
      return res.status(200).json({ ok: true, message: 'Pagamento não aprovado ainda' });
    }

    const metadata = payment.metadata || {};
    const plan = metadata.plan || 'monthly';
    const name = metadata.name || payment.payer?.first_name || 'Cliente';
    const email = metadata.email || payment.payer?.email;
    const phone = metadata.phone || payment.payer?.phone?.number || '';

    if (!email) {
      return res.status(400).json({ error: 'Email não encontrado' });
    }

    const code = generateCode(plan);

    let expirationDays = 30;
    if (plan === 'trial') expirationDays = 5;
    else if (plan === 'monthly') expirationDays = 30;
    else if (plan === 'quarterly') expirationDays = 90;
    else if (plan === 'annual') expirationDays = 365;

    const expiresAt = Date.now() + expirationDays * 24 * 60 * 60 * 1000;

    const db = admin.firestore();

    // users
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
        paymentStatus: status,
      });
    } else {
      const userId = existingUser.docs[0].id;
      await usersRef.doc(userId).update({
        plan,
        code,
        expiresAt,
        lastPaymentAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentId: payment.id,
        paymentStatus: status,
      });
    }

    // premium_codes
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
      paymentStatus: status,
      mercadoPagoPayerId: payment.payer?.id || null,
    });

    // Envio de e-mail
    try {
      // Melhor: usar o domínio real em produção (você já tem)
      const baseUrl =
        process.env.PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

      const emailResponse = await fetch(`${baseUrl}/api/send-premium-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, code, plan, expiresAt }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('[WEBHOOK] Falha ao enviar email:', errorText);
      }
    } catch (e) {
      console.error('[WEBHOOK] Erro ao enviar email:', e);
    }

    return res.status(200).json({
      ok: true,
      code,
      email,
      plan,
      expiresAt: new Date(expiresAt).toISOString(),
    });
  } catch (error) {
    console.error('[WEBHOOK] ERRO:', error);
    return res.status(500).json({
      error: 'Erro no webhook',
      details: error.message,
    });
  }
}
