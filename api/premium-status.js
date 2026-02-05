// /api/premium-status.js
// - Fonte da verdade do Premium
// - Consulta Firestore: premium_users/{email}
// - Retorna { ok:true, premium:true/false, expiresAt, plan }

const admin = require('firebase-admin');

/**
 * getFirebaseServiceAccount()
 * - Aceita JSON puro
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
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Use POST' });
  }

  try {
    initFirebase();
    const db = admin.firestore();

    const body =
      req.body && typeof req.body === 'object'
        ? req.body
        : (typeof req.body === 'string' ? JSON.parse(req.body) : {});

    const email = normalizeEmail(body.email);

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        ok: false,
        premium: false,
        error: 'Email inválido',
      });
    }

    // 🔎 Fonte da verdade: premium_users/{email}
    const ref = db.collection('premium_users').doc(email);
    const snap = await ref.get();

    if (!snap.exists) {
      return res.status(200).json({
        ok: true,
        premium: false,
      });
    }

    const data = snap.data() || {};
    const expiresAt = Number(data.expiresAt);

    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
      return res.status(200).json({
        ok: true,
        premium: false,
        expired: true,
      });
    }

    return res.status(200).json({
      ok: true,
      premium: true,
      email,
      plan: data.plan || 'premium',
      expiresAt,
    });
  } catch (err) {
    console.error('premium-status error:', err);
    return res.status(500).json({
      ok: false,
      premium: false,
      error: 'Erro interno',
    });
  }
};
