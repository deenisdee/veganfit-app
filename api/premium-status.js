// /api/premium-status.js
// - Verifica se existe Premium ativo para um email
// - Fonte da verdade: Firestore (collection premium_codes)
// - Retorna { ok:true, premium:true/false, expiresAt, code, plan }

const admin = require('firebase-admin');

function getFirebaseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;

  const trimmed = String(raw).trim();
  if (!trimmed) return null;

  // JSON direto
  if (trimmed.startsWith('{')) return JSON.parse(trimmed);

  // Base64 JSON
  const decoded = Buffer.from(trimmed, 'base64').toString('utf-8').trim();
  return JSON.parse(decoded);
}

function initFirebase() {
  if (admin.apps.length) return;

  const sa = getFirebaseServiceAccount();
  if (sa) {
    admin.initializeApp({ credential: admin.credential.cert(sa) });
    return;
  }

  // fallback (envs antigas)
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

module.exports = async (req, res) => {
  // CORS básico
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Use POST' });

  try {
    initFirebase();
    const db = admin.firestore();

    const body = req.body && typeof req.body === 'object'
      ? req.body
      : (typeof req.body === 'string' ? JSON.parse(req.body) : {});

    const email = normalizeEmail(body.email);
    if (!email || !email.includes('@')) {
      return res.status(400).json({ ok: false, error: 'Email inválido' });
    }

    const now = Date.now();

    // Busca códigos do email e pega o melhor (mais longe no futuro)
    const snap = await db
      .collection('premium_codes')
      .where('email', '==', email)
      .get();

    if (snap.empty) {
      return res.status(200).json({ ok: true, premium: false });
    }

    let best = null;

    snap.docs.forEach((d) => {
      const data = d.data() || {};
      const expiresAt =
        typeof data.expiresAt?.toMillis === 'function'
          ? data.expiresAt.toMillis()
          : Number(data.expiresAt);

      if (!Number.isFinite(expiresAt)) return;

      // considera ativo se expiração ainda no futuro
      if (expiresAt > now) {
        if (!best || expiresAt > best.expiresAt) {
          best = {
            code: String(data.code || d.id),
            plan: String(data.plan || 'monthly'),
            expiresAt,
          };
        }
      }
    });

    if (!best) {
      return res.status(200).json({ ok: true, premium: false });
    }

    return res.status(200).json({
      ok: true,
      premium: true,
      email,
      code: best.code,
      plan: best.plan,
      expiresAt: best.expiresAt,
    });
  } catch (err) {
    console.error('premium-status error:', err);
    return res.status(500).json({ ok: false, error: 'Erro interno' });
  }
};
