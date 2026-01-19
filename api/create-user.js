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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, plan, code, expiresAt } = req.body;

    if (!name || !email || !phone || !plan) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Salva usuário no Firestore
    await db.collection('users').doc(email).set({
      name,
      email,
      phone,
      plan,
      code: code || null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active'
    });

    console.log('[USER] Criado:', { email, plan });

    res.status(200).json({
      ok: true,
      message: 'Usuário criado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: error.message });
  }
};
