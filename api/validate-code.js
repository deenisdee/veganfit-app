// /api/validate-code.js
const admin = require('firebase-admin');

// Inicializa Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}
 
const db = admin.firestore();

/**
 * normalizeEmail(email)
 * - Normaliza e valida email básico
 */
function normalizeEmail(email) {
  if (typeof email !== 'string') return null;
  const e = email.trim().toLowerCase();
  return e.includes('@') ? e : null;
}

/**
 * inferPlanAndExpiry(docData)
 * - Decide plan (monthly/annual) e expiresAt (ms)
 * - Se expiresAt já existir no doc, usa.
 * - Se não existir, calcula com base no plano:
 *    monthly => +30 dias
 *    annual  => +365 dias
 * - Se não houver processedAt, usa Date.now()
 */
function inferPlanAndExpiry(docData) {
  const planRaw = String(docData.plan || docData.plano || docData.subscription || docData.type || '').toLowerCase();

  let plan = 'monthly';
  if (planRaw.includes('anual') || planRaw.includes('annual') || planRaw.includes('year')) plan = 'annual';
  if (planRaw.includes('mensal') || planRaw.includes('monthly') || planRaw.includes('month')) plan = 'monthly';

  // expiresAt pode vir como Timestamp, number, ou string
  let expiresAt =
    typeof docData.expiresAt?.toMillis === 'function'
      ? docData.expiresAt.toMillis()
      : docData.expiresAt;

  if (typeof expiresAt === 'string') {
    const n = Number(expiresAt);
    expiresAt = Number.isFinite(n) ? n : null;
  }

  if (typeof expiresAt !== 'number' || !Number.isFinite(expiresAt) || expiresAt <= 0) {
    // base time
    let baseMs = Date.now();

    const processedAt =
      typeof docData.processedAt?.toMillis === 'function'
        ? docData.processedAt.toMillis()
        : docData.processedAt;

    if (typeof processedAt === 'number' && Number.isFinite(processedAt) && processedAt > 0) {
      baseMs = processedAt;
    } else if (typeof processedAt === 'string' && processedAt) {
      const parsed = Date.parse(processedAt);
      if (Number.isFinite(parsed)) baseMs = parsed;
    }

    const days = plan === 'annual' ? 365 : 30;
    expiresAt = baseMs + days * 24 * 60 * 60 * 1000;
  }

  return { plan, expiresAt };
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Use POST' });
  }

  try {
    let { code, email } = req.body || {};

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ ok: false, error: 'Código ausente' });
    }

    const normalizedCode = code.trim().toUpperCase();
    const normalizedEmail = normalizeEmail(email);

    console.log('🔍 Validando:', {
      code: normalizedCode,
      email: normalizedEmail || '(email não enviado)'
    });

    // 1) Primeiro tenta premium_codes (mantém compatibilidade)
    let docRef = null;
    let docData = null;
    let source = 'premium_codes';

    const codeSnap = await db
      .collection('premium_codes')
      .where('code', '==', normalizedCode)
      .limit(1)
      .get();

    if (!codeSnap.empty) {
      docRef = codeSnap.docs[0].ref;
      docData = codeSnap.docs[0].data();
    } else {
      // 2) Fallback: processed_payments (seu webhook grava aqui)
      source = 'processed_payments';
      const paySnap = await db
        .collection('processed_payments')
        .where('code', '==', normalizedCode)
        .limit(1)
        .get();

      if (paySnap.empty) {
        return res.status(401).json({ ok: false, error: 'Código inválido ou inexistente' });
      }

      docRef = paySnap.docs[0].ref;
      docData = paySnap.docs[0].data();
    }

    const codeEmail = normalizeEmail(docData.email) || null;
    if (!codeEmail) {
      return res.status(500).json({ ok: false, error: 'Código encontrado, mas sem email vinculado' });
    }

    const { plan, expiresAt } = inferPlanAndExpiry(docData);

    // ⏳ Expiração
    if (!expiresAt || Date.now() > expiresAt) {
      return res.status(401).json({ ok: false, error: 'Código expirado' });
    }

    // 📧 valida e-mail digitado (se enviado)
    if (normalizedEmail && normalizedEmail !== codeEmail) {
      return res.status(401).json({
        ok: false,
        error: 'Este código pertence a outro email'
      });
    }

    // 🔐 Marca como usado (idempotente)
    if (!docData.usedBy) {
      await docRef.update({
        usedBy: codeEmail,
        usedAt: admin.firestore.FieldValue.serverTimestamp(),
        source,
      });
    }

    // ✅ Persistir estado premium por usuário
    await db.collection('premium_users').doc(codeEmail).set(
      {
        email: codeEmail,
        plan,
        expiresAt,
        activatedAt: admin.firestore.FieldValue.serverTimestamp(),
        code: normalizedCode,
        source,
      },
      { merge: true }
    );

    const expiresInDays = Math.ceil((expiresAt - Date.now()) / (1000 * 60 * 60 * 24));

    // 🎟 Token simples
    const tokenPayload = { code: normalizedCode, email: codeEmail, expiresAt };
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

    console.log('✅ Código validado + premium_users salvo:', {
      code: normalizedCode,
      email: codeEmail,
      plan,
      expiresInDays,
      source,
    });

    return res.status(200).json({
      ok: true,
      premium: true,
      email: codeEmail,
      plan,
      token,
      expiresAt,
      expiresInDays,
      message: `Premium ativado por ${expiresInDays} dias`
    });
  } catch (err) {
    console.error('Erro ao validar código:', err);
    return res.status(500).json({ ok: false, error: 'Erro interno' });
  }
};

// (fim do arquivo)
