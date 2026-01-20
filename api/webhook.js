import admin from 'firebase-admin';
import mercadopago from 'mercadopago';

// ✅ INICIALIZA FIREBASE (se ainda não inicializou)
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    console.log('Firebase Admin inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar Firebase Admin:', error);
  }
}

const db = admin.firestore();

// ✅ CONFIGURA MERCADO PAGO
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

// ✅ GERA CÓDIGO ÚNICO
function generateCode(plan) {
  const prefix = plan === 'trial' ? 'TRIAL' : 'VFP';
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${random}`;
}

export default async function handler(req, res) {
  // Log de debug
  console.log('[WEBHOOK] Método:', req.method);
  console.log('[WEBHOOK] Headers:', JSON.stringify(req.headers, null, 2));

  // Apenas POST
  if (req.method !== 'POST') {
    console.log('[WEBHOOK] ❌ Método não permitido');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    console.log('[WEBHOOK] Body completo:', JSON.stringify(body, null, 2));

    // ✅ VERIFICA SE É NOTIFICAÇÃO DE PAGAMENTO
    if (body.type !== 'payment') {
      console.log('[WEBHOOK] ⚠️ Tipo de notificação ignorado:', body.type);
      return res.status(200).json({ ok: true, message: 'Tipo ignorado' });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      console.log('[WEBHOOK] ❌ Payment ID não encontrado');
      return res.status(400).json({ error: 'Payment ID não encontrado' });
    }

    console.log('[WEBHOOK] 📋 Payment ID:', paymentId);

    // ✅ BUSCA DETALHES DO PAGAMENTO
    const payment = await mercadopago.payment.get(paymentId);
    console.log('[WEBHOOK] 💰 Status do pagamento:', payment.body.status);
    console.log('[WEBHOOK] 📦 Dados do pagamento:', JSON.stringify(payment.body, null, 2));

    // ✅ SÓ PROCESSA SE APROVADO
    if (payment.body.status !== 'approved') {
      console.log('[WEBHOOK] ⚠️ Pagamento não aprovado, ignorando');
      return res.status(200).json({ 
        ok: true, 
        message: 'Pagamento não aprovado ainda' 
      });
    }

    // ✅ EXTRAI DADOS DO METADATA
    const metadata = payment.body.metadata || {};
    const plan = metadata.plan || 'monthly';
    const name = metadata.name || payment.body.payer?.first_name || 'Cliente';
    const email = metadata.email || payment.body.payer?.email;
    const phone = metadata.phone || payment.body.payer?.phone?.number || '';

    console.log('[WEBHOOK] 👤 Dados do cliente:', { name, email, phone, plan });

    if (!email) {
      console.log('[WEBHOOK] ❌ Email não encontrado');
      return res.status(400).json({ error: 'Email não encontrado' });
    }

    // ✅ GERA CÓDIGO PREMIUM
    const code = generateCode(plan);

    // ✅ CALCULA EXPIRAÇÃO
    let expirationDays = 30;
    if (plan === 'trial') expirationDays = 5;
    else if (plan === 'monthly') expirationDays = 30;
    else if (plan === 'quarterly') expirationDays = 90;
    else if (plan === 'annual') expirationDays = 365;

    const expiresAt = Date.now() + (expirationDays * 24 * 60 * 60 * 1000);

    console.log('[WEBHOOK] 🎟️ Código gerado:', code);
    console.log('[WEBHOOK] 📅 Expira em:', new Date(expiresAt).toISOString());

    // ✅ SALVA USUÁRIO NO FIRESTORE
    const usersRef = db.collection('users');
    
    // Verifica se usuário já existe
    const existingUser = await usersRef.where('email', '==', email).get();
    
    if (existingUser.empty) {
      // Cria novo usuário
      await usersRef.add({
        name: name,
        email: email,
        phone: phone,
        plan: plan,
        code: code,
        expiresAt: expiresAt,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentId: payment.body.id,
        paymentStatus: payment.body.status
      });
      console.log('[WEBHOOK] ✅ Novo usuário criado');
    } else {
      // Atualiza usuário existente
      const userId = existingUser.docs[0].id;
      await usersRef.doc(userId).update({
        plan: plan,
        code: code,
        expiresAt: expiresAt,
        lastPaymentAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentId: payment.body.id,
        paymentStatus: payment.body.status
      });
      console.log('[WEBHOOK] ✅ Usuário atualizado');
    }

    // ✅ SALVA CÓDIGO NO FIRESTORE
    const codesRef = db.collection('premium_codes');
    await codesRef.add({
      code: code,
      plan: plan,
      email: email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: expiresAt,
      used: false,
      usedBy: null,
      usedAt: null,
      paymentId: payment.body.id,
      paymentStatus: payment.body.status,
      mercadoPagoPayerId: payment.body.payer?.id || null
    });

    console.log('[WEBHOOK] ✅ Código salvo no Firestore');

    // ✅ ENVIA EMAIL AUTOMATICAMENTE
    try {
      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000';
      
      console.log('[WEBHOOK] 📧 Enviando email para:', email);
      
      const emailResponse = await fetch(`${baseUrl}/api/send-premium-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          name: name,
          code: code,
          plan: plan,
          expiresAt: expiresAt
        })
      });

      if (emailResponse.ok) {
        const emailData = await emailResponse.json();
        console.log('[WEBHOOK] ✅ Email enviado com sucesso:', emailData);
      } else {
        const errorText = await emailResponse.text();
        console.error('[WEBHOOK] ⚠️ Falha ao enviar email:', errorText);
      }
    } catch (emailError) {
      console.error('[WEBHOOK] ⚠️ Erro ao enviar email:', emailError);
      // Não falha o webhook por causa do email
    }

    return res.status(200).json({ 
      ok: true, 
      code: code,
      email: email,
      plan: plan,
      expiresAt: new Date(expiresAt).toISOString(),
      emailSent: true
    });

  } catch (error) {
    console.error('[WEBHOOK] ❌ Erro:', error);
    return res.status(500).json({ 
      error: 'Erro no webhook',
      details: error.message 
    });
  }
}
