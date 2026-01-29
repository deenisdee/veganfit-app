const admin = require('firebase-admin');

/**
 * Firebase Admin init
 * - Aceita FIREBASE_SERVICE_ACCOUNT_KEY como JSON direto OU base64
 */
function initFirebase() {
  if (admin.apps.length) return;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY não está definido na Vercel.');
  }

  let serviceAccount;

  // Se já parece JSON
  if (raw.trim().startsWith('{')) {
    serviceAccount = JSON.parse(raw);
  } else {
    // Senão, tenta base64
    const decoded = Buffer.from(raw, 'base64').toString('utf-8');
    serviceAccount = JSON.parse(decoded);
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

function getAccessToken() {
  // Preferir MERCADO_PAGO_ACCESS_TOKEN, mas aceitar MP_ACCESS_TOKEN como fallback
  const token =
    process.env.MERCADO_PAGO_ACCESS_TOKEN ||
    process.env.MP_ACCESS_TOKEN;

  if (!token) {
    throw new Error('MERCADO_PAGO_ACCESS_TOKEN não está definido na Vercel.');
  }

  return token;
}

function generateCode(plan) {
  const prefix = plan === 'trial' ? 'TRIAL' : 'VFP';
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${random}`;
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

async function fetchPayment(paymentId, accessToken) {
  const resp = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await resp.json();

  if (!resp.ok) {
    const err = new Error(data?.message || 'Erro ao buscar payment no Mercado Pago');
    err.details = data;
    err.status = resp.status;
    throw err;
  }

  return data;
}

async function sendEmail({ baseUrl, email, name, code, plan, expiresAt }) {
  const resp = await fetch(`${baseUrl}/api/send-premium-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, code, plan, expiresAt }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    const err = new Error(`Falha ao enviar e-mail: ${txt}`);
    err.status = resp.status;
    throw err;
  }

  return resp.json();
}

module.exports = async (req, res) => {
  // CORS básico (webhook do MP não precisa, mas não atrapalha)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    console.log('[WEBHOOK] Método:', req.method);
    console.log('[WEBHOOK] Body:', JSON.stringify(req.body, null, 2));

    // Inicializa Firebase
    initFirebase();
    const db = admin.firestore();

    // Pega paymentId (suporta formatos comuns do MP)
    const body = req.body || {};

    // Formato típico: { type: 'payment', data: { id: '123' } }
    let paymentId = body?.data?.id || body?.id;

    // Se vier como string num payload diferente, tenta converter
    if (typeof paymentId === 'string' && paymentId.includes('payment')) {
      // não faz nada especial, só mantém
    }

    if (!paymentId) {
      console.log('[WEBHOOK] ⚠️ Payment ID não encontrado no body');
      return res.status(200).json({ ok: true, ignored: true });
    }

    const accessToken = getAccessToken();

    // Busca payment
    const payment = await fetchPayment(paymentId, accessToken);

    console.log('[WEBHOOK] payment.status:', payment.status);

    // Só processa se aprovado
    if (payment.status !== 'approved') {
      return res.status(200).json({ ok: true, message: 'Pagamento não aprovado ainda', status: payment.status });
    }

    // ✅ Extrair dados do comprador
    // Prioridade: external_reference (que você está setando na preference) -> payer.email
    const ext = typeof payment.external_reference === 'string'
      ? safeJsonParse(payment.external_reference)
      : null;

    const plan = ext?.plan || payment.metadata?.plan || 'monthly';
    const name = ext?.name || payment.metadata?.name || payment.payer?.first_name || 'Cliente';
    const email = normalizeEmail(ext?.email || payment.metadata?.email || payment.payer?.email);
    const phone = ext?.phone || payment.metadata?.phone || payment.payer?.phone?.number || '';

    if (!email) {
      console.log('[WEBHOOK] ❌ Email não encontrado no payment/external_reference');
      return res.status(400).json({ error: 'Email não encontrado' });
    }

    // ✅ Idempotência: não duplicar processamento do mesmo payment
    const paymentRef = db.collection('processed_payments').doc(String(paymentId));
    const paymentSnap = await paymentRef.get();

    if (paymentSnap.exists) {
      console.log('[WEBHOOK] ✅ Payment já processado, ignorando duplicação:', paymentId);
      return res.status(200).json({ ok: true, duplicated: true });
    }

    // Gera código e expiração
    let expirationDays = 30;
    if (plan === 'trial') expirationDays = 5;
    else if (plan === 'monthly') expirationDays = 30;
    else if (plan === 'quarterly') expirationDays = 90;
    else if (plan === 'annual') expirationDays = 365;

    const expiresAtMs = Date.now() + expirationDays * 24 * 60 * 60 * 1000;
    const expiresAt = admin.firestore.Timestamp.fromMillis(expiresAtMs);

    const code = generateCode(plan);

    console.log('[WEBHOOK] ✅ Dados finais:', { paymentId, plan, name, email, phone, code, expiresAtMs });

    // ✅ Salva código com ID = code (compatível com validate-code.js)
    const codeRef = db.collection('premium_codes').doc(code);
    await codeRef.set({
      code,
      plan,
      email,
      name,
      phone,
      status: 'active',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt,
      usedBy: null,
      usedAt: null,
      paymentId: String(paymentId),
      paymentStatus: payment.status,
    }, { merge: false });

    // ✅ Marca payment como processado (para não duplicar)
    await paymentRef.set({
      paymentId: String(paymentId),
      email,
      code,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // ✅ Envia e-mail (usar domínio público pra não depender do VERCEL_URL interno)
    const baseUrl =
      process.env.PUBLIC_BASE_URL?.trim()
        ? process.env.PUBLIC_BASE_URL.trim().replace(/\/$/, '')
        : 'https://www.veganfit.life';

    try {
      await sendEmail({
        baseUrl,
        email,
        name,
        code,
        plan,
        expiresAt: expiresAtMs,
      });

      console.log('[WEBHOOK] ✅ Email enviado com sucesso');
    } catch (e) {
      console.error('[WEBHOOK] ⚠️ Erro ao enviar email (não vou falhar webhook):', e.message);
    }

    return res.status(200).json({
      ok: true,
      email,
      code,
      plan,
      expiresAt: new Date(expiresAtMs).toISOString(),
    });

  } catch (error) {
    console.error('[WEBHOOK] ❌ ERRO:', error?.message || error);
    if (error?.details) console.error('[WEBHOOK] details:', JSON.stringify(error.details, null, 2));

    return res.status(500).json({
      ok: false,
      error: 'Erro no webhook',
      details: error?.message || String(error),
    });
  }
};
