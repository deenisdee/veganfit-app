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
    let { code, email } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ ok: false, error: 'Código ausente' });
    }

    const normalizedCode = code.trim().toUpperCase();
    const normalizedEmail =
      typeof email === 'string' && email.includes('@')
        ? email.trim().toLowerCase()
        : null;

    console.log('🔍 Validando:', {
      code: normalizedCode,
      email: normalizedEmail || '(email não enviado)'
    });

    // 🔎 Busca código
    const codeSnap = await db
      .collection('premium_codes')
      .where('code', '==', normalizedCode)
      .limit(1)
      .get();

    if (codeSnap.empty) {
      return res.status(401).json({ ok: false, error: 'Código inválido ou inexistente' });
    }

    const doc = codeSnap.docs[0];
    const data = doc.data();

    const codeEmail = String(data.email || '').toLowerCase();
    const plan = String(data.plan || 'monthly');

    const expiresAt =
      typeof data.expiresAt?.toMillis === 'function'
        ? data.expiresAt.toMillis()
        : data.expiresAt;

    // ⏳ Expiração
    if (!expiresAt || Date.now() > expiresAt) {
      return res.status(401).json({ ok: false, error: 'Código expirado' });
    }

    // 📧 Se email foi enviado, valida
    if (normalizedEmail && normalizedEmail !== codeEmail) {
      return res.status(401).json({
        ok: false,
        error: 'Este código pertence a outro email'
      });
    }

    // 🔐 Marca como usado (idempotente)
    if (!data.usedBy) {
      await doc.ref.update({
        usedBy: codeEmail,
        usedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // ✅✅✅ AQUI É O QUE ESTAVA FALTANDO:
    // - Persistir "estado premium" por usuário
    // - Fonte da verdade para /api/premium-status
    await db.collection('premium_users').doc(codeEmail).set(
      {
        email: codeEmail,
        plan,
        expiresAt,
        activatedAt: admin.firestore.FieldValue.serverTimestamp(),
        code: normalizedCode
      },
      { merge: true }
    );

    const expiresInDays = Math.ceil((expiresAt - Date.now()) / (1000 * 60 * 60 * 24));

    // 🎟 Token simples (mantido, mas agora o estado real está no Firestore)
    const tokenPayload = { code: normalizedCode, email: codeEmail, expiresAt };
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

    console.log('✅ Código validado + premium_users salvo:', {
      code: normalizedCode,
      email: codeEmail,
      plan,
      expiresInDays
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
