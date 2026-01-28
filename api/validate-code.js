const admin = require('firebase-admin');

/**
 * getFirebaseServiceAccount()
 * - Lê credencial do Firebase via ENV FIREBASE_SERVICE_ACCOUNT_KEY
 * - Aceita JSON puro ou Base64 de JSON
 */
function getFirebaseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;

  const trimmed = String(raw).trim();
  if (!trimmed) return null;

  // JSON puro
  if (trimmed.startsWith('{')) {
    return JSON.parse(trimmed);
  }

  // Base64
  const decoded = Buffer.from(trimmed, 'base64').toString('utf-8').trim();
  return JSON.parse(decoded);
}

/**
 * initFirebase()
 * - Inicializa Firebase Admin (preferindo FIREBASE_SERVICE_ACCOUNT_KEY)
 * - Fallback para FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY (se existir)
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

  // Fallback (se você ainda usar essas envs em outros endpoints)
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

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
    initFirebase();
    const db = admin.firestore();

    const body = req.body || {};

    // ✅ code obrigatório
    const codeRaw = typeof body.code === 'string' ? body.code : '';
    const normalized = codeRaw.trim().toUpperCase();

    if (!normalized) {
      return res.status(400).json({ ok: false, error: 'Código ausente' });
    }

    // ✅ email opcional (aceita várias chaves)
    const emailRaw =
      (typeof body.email === 'string' ? body.email : '') ||
      (typeof body.userEmail === 'string' ? body.userEmail : '') ||
      (typeof body.to === 'string' ? body.to : '');

    const normalizedEmail = String(emailRaw || '').trim().toLowerCase();

    console.log('🔍 Validando:', {
      code: normalized,
      email: normalizedEmail || '(não enviado no body)',
    });

    // ✅ Compatível com premium_codes salvos por .add()
    // Procura pelo campo "code" == normalized
    const qSnap = await db
      .collection('premium_codes')
      .where('code', '==', normalized)
      .limit(1)
      .get();

    if (qSnap.empty) {
      return res.status(401).json({ ok: false, error: 'Código inválido ou expirado' });
    }

    const doc = qSnap.docs[0];
    const subscription = doc.data() || {};

    // expiresAt pode estar em Timestamp ou número
    const expiresAt =
      subscription.expiresAt?.toDate
        ? subscription.expiresAt.toDate().getTime()
        : Number(subscription.expiresAt || 0);

    if (!Number.isFinite(expiresAt) || expiresAt <= 0) {
      return res.status(401).json({ ok: false, error: 'Código inválido (expiração ausente)' });
    }

    // ✅ Se não veio email, usa o email do Firestore
    const codeEmail = String(subscription.email || '').trim().toLowerCase();
    const finalEmail = normalizedEmail || codeEmail;

    // ✅ Se ainda não tem email, não dá pra ativar com segurança
    if (!finalEmail || !finalEmail.includes('@')) {
      return res.status(400).json({ ok: false, error: 'Email ausente (envie email junto do código)' });
    }

    // ✅ Se veio email no body, valida que é o mesmo email que comprou
    if (normalizedEmail && codeEmail && codeEmail !== normalizedEmail) {
      console.log('❌ Email não corresponde:', {
        emailCodigo: codeEmail,
        emailDigitado: normalizedEmail,
      });

      return res.status(401).json({ ok: false, error: 'Este código pertence a outro email' });
    }

    // ✅ status: se não existir, consideramos ativo (para compatibilidade)
    const status = String(subscription.status || 'active').toLowerCase();
    if (status !== 'active') {
      return res.status(401).json({ ok: false, error: 'Código inativo' });
    }

    // ✅ expiração
    if (Date.now() > expiresAt) {
      return res.status(401).json({ ok: false, error: 'Código expirado' });
    }

    // ✅ já usado
    const usedBy = String(subscription.usedBy || '').trim().toLowerCase();
    if (usedBy && usedBy !== finalEmail) {
      return res.status(401).json({ ok: false, error: 'Este código já foi ativado em outra conta' });
    }

    // ✅ marca como usado (se ainda não foi)
    if (!usedBy) {
      await doc.ref.update({
        usedBy: finalEmail,
        usedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log('✅ Código marcado como usado por:', finalEmail);
    }

    // dias restantes
    const expiresInDays = Math.ceil((expiresAt - Date.now()) / (1000 * 60 * 60 * 24));

    // token
    const tokenData = { code: normalized, activated: Date.now(), expires: expiresAt };
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

    console.log('[VALIDATE] Código validado com sucesso:', {
      code: normalized,
      email: finalEmail,
      expiresInDays,
    });

    return res.status(200).json({
      ok: true,
      premium: true,
      token,
      expiresInDays,
      expiresAt,
      email: finalEmail,
      message: `Premium ativado por ${expiresInDays} dias!`,
    });
  } catch (error) {
    console.error('Erro ao validar código:', error);
    return res.status(500).json({ ok: false, error: 'Erro ao validar código' });
  }
};

// (fim do arquivo)
// nextFunction()  // <- primeira linha da próxima função (se houver no seu arquivo)
