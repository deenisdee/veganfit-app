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
  res.setHeader('Access-Control-Allow-Credentials', true);
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
    const { code } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ 
        ok: false, 
        error: 'Código ausente' 
      });
    }

    // Normaliza código
    const normalized = code.trim().toUpperCase();

    // Busca código no Firestore
    const docRef = db.collection('premium_codes').doc(normalized);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(401).json({ 
        ok: false, 
        error: 'Código inválido ou expirado' 
      });
    }

    const subscription = doc.data();
    const expiresAt = subscription.expiresAt.toDate().getTime();

    // Verifica expiração
    if (Date.now() > expiresAt) {
      return res.status(401).json({ 
        ok: false, 
        error: 'Código expirado' 
      });
    }

    // Verifica status
    if (subscription.status !== 'active') {
      return res.status(401).json({ 
        ok: false, 
        error: 'Código inativo' 
      });
    }

    // Calcula dias restantes
    const expiresInDays = Math.ceil((expiresAt - Date.now()) / (1000 * 60 * 60 * 24));

    // Gera token (compatível com sistema antigo)
    const tokenData = {
      code: normalized,
      activated: Date.now(),
      expires: expiresAt
    };
    
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

    // Log
    console.log('[REDEEM] Código validado:', {
      code: normalized,
      expiresInDays,
      email: subscription.email
    });

    // Retorna NO MESMO FORMATO do redeem.js
    res.status(200).json({
      ok: true,
      premium: true,
      token: token,
      expiresInDays: expiresInDays,
      expiresAt: expiresAt,
      message: `Premium ativado por ${expiresInDays} dias!`
    });

  } catch (error) {
    console.error('Erro ao validar código:', error);
    res.status(500).json({ 
      ok: false,
      error: 'Erro ao validar código' 
    });
  }
};
