// /api/seed-premium-user.js
// Endpoint TEMPORÁRIO para criar um doc em premium_users via Admin SDK
// Protegido por ADMIN_SEED_KEY (env) + header x-admin-key

const admin = require('firebase-admin');

function getFirebaseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;

  const trimmed = String(raw).trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('{')) return JSON.parse(trimmed);

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Use POST' });

  // 🔒 Proteção
  const adminKey = String(req.headers['x-admin-key'] || '');
  const expectedKey = String(process.env.ADMIN_SEED_KEY || '');
  if (!expectedKey || adminKey !== expectedKey) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

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

    const plan = String(body.plan || 'monthly');
    const expiresAt = Number(body.expiresAt || (Date.now() + 30 * 24 * 60 * 60 * 1000));
    if (!Number.isFinite(expiresAt)) {
      return res.status(400).json({ ok: false, error: 'expiresAt inválido' });
    }

    await db.collection('premium_users').doc(email).set({
      email,
      plan,
      expiresAt,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      seeded: true,
    }, { merge: true });

    return res.status(200).json({ ok: true, email, plan, expiresAt });
  } catch (err) {
    console.error('seed-premium-user error:', err);
    return res.status(500).json({ ok: false, error: 'Erro interno' });
  }
};
