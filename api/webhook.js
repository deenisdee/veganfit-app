const admin = require('firebase-admin');
const { MercadoPagoConfig, Payment } = require('mercadopago');

/**
 * getFirebaseServiceAccount()
 * - Aceita JSON puro (string começando com "{")
 * - Aceita Base64 de JSON
 */
function getFirebaseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;

  const trimmed = String(raw).trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('{')) {
    return JSON.parse(trimmed);
  }

  const decoded = Buffer.from(trimmed, 'base64').toString('utf-8').trim();
  return JSON.parse(decoded);
}

/**
 * initFirebase()
 * - Inicializa Firebase Admin uma única vez
 */
function initFirebase() {
  if (admin.apps.length) return;

  const sa = getFirebaseServiceAccount();
  if (sa) {
    admin.initializeApp({
      credential: admin.credential.cert(sa),
    });
    return;
  }

  // Fallback (se você ainda tiver envs antigas)
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

/**
 * ensureMercadoPagoClient()
 * - Usa MERCADO_PAGO_ACCESS_TOKEN como padrão
 * - Aceita MP_ACCESS_TOKEN como fallback
 */
function ensureMercadoPagoClient() {
  const accessToken =
    process.env.MERCADO_PAGO_ACCESS_TOKEN ||
    process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error('MERCADO_PAGO_ACCESS_TOKEN não está definido na Vercel.');
  }

  return new MercadoPagoConfig({ accessToken });
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

// ✅ GERA CÓDIGO ÚNICO
function generateCode(plan) {
  const prefix = plan === 'trial' ? 'TRIAL' : 'VFP';
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${random}`;
}

/**
 * computeExpiresAtMs(plan)
 * - trial: 5 dias
 * - monthly: 30
 * - quarterly: 90
 * - annual: 365
 */
function computeExpiresAtMs(plan) {
  let days = 30;
  if (plan === 'trial') days = 5;
  else if (plan === 'monthly') days = 30;
  else if (plan === 'quarterly') days = 90;
  else if (plan === 'annual') days = 365;

  return Date.now() + days * 24 * 60 * 60 * 1000;
}

/**
 * sendPremiumEmail()
 * - Chama seu endpoint /api/send-premium-email (Resend)
 */
async function sendPremiumEmail({ baseUrl, email, name, code, plan, expiresAt }) {
  const url = `${baseUrl.replace(/\/$/, '')}/api/send-premium-email`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, code, plan, expiresAt }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Falha ao enviar email (${resp.status}): ${txt}`);
  }

  return resp.json();
}

module.exports = async function handler(req, res) {
  console.log('[WEBHOOK] Método:', req.method);

  if (req.method !== 'POST') {
    console.log('[WEBHOOK] ❌ Método não permitido');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    initFirebase();
    const db = admin.firestore();

    const body = req.body || {};
    console.log('[WEBHOOK] Body:', JSON.stringify(body, null, 2));

    // ✅ Aceita formato padrão do MP: { type:'payment', data:{id} }
    const type = body.type || body.topic || null;
    const paymentId = body?.data?.id || body?.id;

    if (type && type !== 'payment') {
      console.log('[WEBHOOK] ⚠️ Tipo de notificação ignorado:', type);
      return res.status(200).json({ ok: true, message: 'Tipo ignorado' });
    }

    if (!paymentId) {
      console.log('[WEBHOOK] ⚠️ paymentId ausente (ignorando)');
      return res.status(200).json({ ok: true, message: 'paymentId ausente' });
    }

    // ✅ Idempotência: não processar o mesmo payment 2x
    const processedRef = db.collection('processed_payments').doc(String(paymentId));
    const processedSnap = await processedRef.get();
    if (processedSnap.exists) {
      console.log('[WEBHOOK] ✅ Payment já processado:', paymentId);
      return res.status(200).json({ ok: true, duplicated: true });
    }

    // ✅ Busca pagamento no MP (SDK nova)
    const client = ensureMercadoPagoClient();
    const paymentClient = new Payment(client);

    let payment;
    try {
      payment = await paymentClient.get({ id: String(paymentId) });
    } catch (e) {
      // Simulador do MP costuma dar 404 mesmo (Payment not found)
      console.error('[WEBHOOK] ⚠️ Falha ao buscar payment:', e?.message || e);
      return res.status(200).json({ ok: true, message: 'Payment não encontrado (simulação?)', paymentId });
    }

    console.log('[WEBHOOK] payment.status:', payment?.status);

    // ✅ SÓ PROCESSA SE APROVADO
    if (payment?.status !== 'approved') {
      console.log('[WEBHOOK] ⚠️ Pagamento não aprovado, ignorando');
      return res.status(200).json({
        ok: true,
        message: 'Pagamento não aprovado ainda',
        status: payment?.status || null,
      });
    }

    // ✅ Extrai dados do external_reference (prioridade)
    const extRef = typeof payment.external_reference === 'string'
      ? safeJsonParse(payment.external_reference)
      : null;

    const plan = extRef?.plan || payment?.metadata?.plan || 'monthly';
    const name = extRef?.name || payment?.metadata?.name || payment?.payer?.first_name || 'Cliente';

    const email = normalizeEmail(
      extRef?.email ||
      payment?.metadata?.email ||
      payment?.payer?.email
    );

    const phone =
      extRef?.phone ||
      payment?.metadata?.phone ||
      payment?.payer?.phone?.number ||
      '';

    if (!email) {
      console.log('[WEBHOOK] ❌ Email não encontrado');
      return res.status(400).json({ error: 'Email não encontrado' });
    }

    // ✅ Gera código premium
    const code = generateCode(plan);
    const expiresAt = computeExpiresAtMs(plan);

    console.log('[WEBHOOK] 🎟️ Código gerado:', code);
    console.log('[WEBHOOK] 📧 Email:', email);
    console.log('[WEBHOOK] 📅 Expira em:', new Date(expiresAt).toISOString());

    // ✅ Salva código com ID = code (compatível com validate-code.js)
    await db.collection('premium_codes').doc(code).set({
      code,
      plan,
      email,
      name,
      phone,
      status: 'active',
      expiresAt, // número em ms (mais simples)
      usedBy: null,
      usedAt: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      paymentId: String(paymentId),
      paymentStatus: payment.status,
    }, { merge: false });

    // ✅ Marca payment como processado (idempotência)
    await processedRef.set({
      paymentId: String(paymentId),
      email,
      code,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // ✅ Envia email automaticamente (não falha o webhook se email falhar)
    const baseUrl =
      (process.env.PUBLIC_BASE_URL && process.env.PUBLIC_BASE_URL.trim()) ||
      'https://www.veganfit.life';

    try {
      await sendPremiumEmail({ baseUrl, email, name, code, plan, expiresAt });
      console.log('[WEBHOOK] ✅ Email enviado com sucesso');
    } catch (emailErr) {
      console.error('[WEBHOOK] ⚠️ Erro ao enviar email:', emailErr?.message || emailErr);
    }

    return res.status(200).json({
      ok: true,
      code,
      email,
      plan,
      expiresAt: new Date(expiresAt).toISOString(),
    });

  } catch (error) {
    console.error('[WEBHOOK] ❌ ERRO:', error?.message || error);
    return res.status(500).json({
      ok: false,
      error: 'Erro no webhook',
      details: error?.message || String(error),
    });
  }
};
