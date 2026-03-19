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

/**
 * normalizeEmailForDocId()
 * - Garante que o email usado como docId
 *   seja exatamente o mesmo salvo pelo webhook
 * - Corrige:
 *   • espaço virando "+"
 *   • "%2B" literal
 *   • trim / lowercase
 */
function normalizeEmailForDocId(email) {
  return String(email || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '+')
    .replace(/%2b/gi, '+');
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Use POST' });
  }
  try {
    initFirebase();
    const db = admin.firestore();
    const body =
      req.body && typeof req.body === 'object'
        ? req.body
        : (typeof req.body === 'string' ? JSON.parse(req.body) : {});
    const rawEmail = body.email || req.query?.email || '';
    const email = normalizeEmailForDocId(decodeURIComponent(String(rawEmail || '')));

console.log('[DEBUG email]', { rawEmail, email });
    
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

    console.log('[DEBUG]', { email, expiresAt: data?.expiresAt, now: Date.now() });
    
    const expiresAt = Number(data.expiresAt);
    // ✅ FIX: detecta se expiresAt está em segundos (10 dígitos) e converte para ms
    const expiresAtMs = expiresAt < 1e12 ? expiresAt * 1000 : expiresAt;
    if (!Number.isFinite(expiresAtMs) || Date.now() > expiresAtMs) {
      return res.status(200).json({
        ok: true,
        premium: false,
        expired: true,
      });
    }
    // ✅ Opção C: se name não existe em premium_users, busca em premium_codes pelo email
    let resolvedName = (data.name || '').trim();
    if (!resolvedName) {
      try {
        const codesSnap = await db.collection('premium_codes')
          .where('email', '==', email)
          .orderBy('createdAt', 'desc')
          .limit(1)
          .get();
        if (!codesSnap.empty) {
          resolvedName = (codesSnap.docs[0].data().name || '').trim();
        }
      } catch (_) {}
    }
    return res.status(200).json({
      ok: true,
      premium: true,
      email,
      name: resolvedName,
      plan: data.plan || 'premium',
      expiresAtMs,
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
