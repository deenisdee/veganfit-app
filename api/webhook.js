import admin from 'firebase-admin';
import mercadopago from 'mercadopago';

/**
 * Lê credenciais do Firebase de forma robusta:
 * - Aceita JSON puro (string começando com "{")
 * - Aceita Base64 de JSON
 */
function getFirebaseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY não está definida na Vercel.');
  }

  const trimmed = raw.trim();

  // Caso 1: JSON puro
  if (trimmed.startsWith('{')) {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      throw new Error(
        'FIREBASE_SERVICE_ACCOUNT_KEY parece JSON, mas falhou ao fazer JSON.parse(). ' +
        'Verifique aspas/escape de quebras de linha.'
      );
    }
  }

  // Caso 2: Base64
  try {
    const decoded = Buffer.from(trimmed, 'base64').toString('utf-8').trim();
    return JSON.parse(decoded);
  } catch (e) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY não é um Base64 válido de JSON. ' +
      'Gere novamente o Base64 em uma única linha e cole sem aspas.'
    );
  }
}

function ensureFirebase() {
  if (admin.apps.length) return;

  const serviceAccount = getFirebaseServiceAccount();
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = (() => {
  // Não cria db aqui ainda, só quando garantir initializeApp
  return {
    get firestore() {
      ensureFirebase();
      return admin.firestore();
    }
  };
})();

// Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

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
    // Garante Firebase só quando a rota for chamada
    ensureFirebase();

    const body = req.body;

    // Mercado Pago manda vários tipos
    if (body?.type !== 'payment') {
      return res.status(200).json({ ok: true, message: 'Tipo ignorado' });
    }

    const paymentId = body?.data?.id;
    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID não encontrado' });
    }

    const payment = await mercadopago.payment.get(paymentId);
    const status = payment?.body?.status;

    if (status !== 'approved') {
      return res.status(200).json({ ok: true, message: 'Pagamento não aprovado ainda' });
    }

    const metadata = payment.body.metadata || {};
    const plan = metadata.plan || 'monthly';
    const name = metadata.name || payment.body.payer?.first_name || 'Cliente';
    const email = metadata.email || payment.body.payer?.email;
    const phone = metadata.phone || payment.body.payer?.phone?.number || '';

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

    // Firestore
    const firestore = db.firestore;
    const usersRef = firestore.collection('users');

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
        paymentId: payment.body.id,
        paymentStatus: status,
      });
    } else {
      const userId = existingUser.docs[0].id;
      await usersRef.doc(userId).update({
        plan,
        code,
        expiresAt,
        lastPaymentAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentId: payment.body.id,
        paymentStatus: status,
      });
    }

    const codesRef = firestore.collection('premium_codes');
    await codesRef.add({
      code,
      plan,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt,
      used: false,
      usedBy: null,
      usedAt: null,
      paymentId: payment.body.id,
      paymentStatus: status,
      mercadoPagoPayerId: payment.body.payer?.id || null,
    });

    // Envia email
    try {
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

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
