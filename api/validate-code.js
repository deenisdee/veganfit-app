const admin = require('firebase-admin');

/**
 * getFirebaseServiceAccount()
 * - Lê FIREBASE_SERVICE_ACCOUNT_KEY
 * - Aceita JSON puro OU Base64 de JSON
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
 * - Inicializa Firebase Admin uma única vez
 * - Prioriza FIREBASE_SERVICE_ACCOUNT_KEY
 * - Fallback para FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY
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
 * normalizeEmail()
 * - Normaliza email para comparação
 */
function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

/**
 * normalizeCode()
 * - Normaliza code para comparação
 */
function normalizeCode(code) {
  return String(code || '').trim().toUpperCase();
}

/**
 * getExpiresAtMs()
 * - Aceita Timestamp do Firestore ou número (ms)
 */
function getExpiresAtMs(subscription) {
  const exp = subscription?.expiresAt;

  if (exp && typeof exp.toDate === 'function') {
    return exp.toDate().getTime();
  }

  const n = Number(exp || 0);
  return Number.isFinite(n) ? n : 0;
}

/**
 * isPlaceholderEmail()
 * - Detecta email placeholder antigo
 */
function isPlaceholderEmail(email) {
  const e = normalizeEmail(email);
  return !e || e === 'unknown@email.com' || e === 'unknown@domain.com';
}

/**
 * findCodeDoc()
 * - Busca o código por docId(code) e também por where('code' == code)
 * - Retorna { ref, data } ou null
 */
async function findCodeDoc(db, normalizedCode) {
  // 1) Tenta docId = code
  const docRef = db.collection('premium_codes').doc(normalizedCode);
  const docSnap = await docRef.get();
  if (docSnap.exists) {
    return { ref: docRef, data: docSnap.data() || {} };
  }

  // 2) Tenta query (caso tenha sido salvo por .add())
  const qSnap = await db
    .collection('premium_codes')
    .where('code', '==', normalizedCode)
    .limit(1)
    .get();

  if (!qSnap.empty) {
    const d = qSnap.docs[0];
    return { ref: d.ref, data: d.data() || {} };
  }

  return null;
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
    const normalizedCode = normalizeCode(body.code);

    // Email pode vir em chaves diferentes (dependendo do front)
    const emailRaw =
      body.email ||
      body.userEmail ||
      body.to ||
      '';

    const normalizedEmail = normalizeEmail(emailRaw);

    if (!normalizedCode) {
      return res.status(400).json({ ok: false, error: 'Código ausente' });
    }

    console.log('🔍 Validando:', {
      code: normalizedCode,
      email: normalizedEmail || '(email não enviado)',
    });

    // Busca o código
    const found = await findCodeDoc(db, normalizedCode);

    if (!found) {
      return res.status(401).json({ ok: false, error: 'Código inválido ou expirado' });
    }

    const { ref, data: subscription } = found;

    // Status: se não existir, assume active (compatibilidade)
    const status = String(subscription.status || 'active').toLowerCase();
    if (status !== 'active') {
      return res.status(401).json({ ok: false, error: 'Código inativo' });
    }

    // Expiração
    const expiresAtMs = getExpiresAtMs(subscription);
    if (!expiresAtMs) {
      return res.status(401).json({ ok: false, error: 'Código inválido (expiração ausente)' });
    }

    if (Date.now() > expiresAtMs) {
      return res.status(401).json({ ok: false, error: 'Código expirado' });
    }

    // Email do código
    const codeEmail = normalizeEmail(subscription.email);

    // ✅ Se não veio email no body, tentamos usar o email que está no código
    const finalEmail = normalizedEmail || codeEmail;

    if (!finalEmail || !finalEmail.includes('@')) {
      return res.status(400).json({
        ok: false,
        error: 'Email ausente. Informe o email usado na compra.',
      });
    }

    // ✅ Se email do código é placeholder, adotamos o email digitado e corrigimos no Firestore
    if (isPlaceholderEmail(codeEmail) && normalizedEmail) {
      await ref.update({ email: normalizedEmail });
      console.log('✅ Email placeholder corrigido no código:', normalizedEmail);
    }

    // ✅ Bloqueia mismatch apenas se o email do código for real e diferente
    if (!isPlaceholderEmail(codeEmail) && normalizedEmail && codeEmail && codeEmail !== normalizedEmail) {
      console.log('❌ Email não corresponde:', {
        emailCodigo: codeEmail,
        emailDigitado: normalizedEmail,
      });

      return res.status(401).json({
        ok: false,
        error: 'Este código pertence a outro email',
      });
    }

    // Já usado
    const usedBy = normalizeEmail(subscription.usedBy);
    if (usedBy && usedBy !== finalEmail) {
      return res.status(401).json({ ok: false, error: 'Este código já foi ativado em outra conta' });
    }

    // Marca como usado (se ainda não foi)
    if (!usedBy) {
      await ref.update({
        usedBy: finalEmail,
        usedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log('✅ Código marcado como usado por:', finalEmail);
    }

    // Dias restantes
    const expiresInDays = Math.ceil((expiresAtMs - Date.now()) / (1000 * 60 * 60 * 24));

    // Token
    const tokenData = {
      code: normalizedCode,
      activated: Date.now(),
      expires: expiresAtMs,
      email: finalEmail,
    };

    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

    console.log('[VALIDATE] Código validado com sucesso:', {
      code: normalizedCode,
      email: finalEmail,
      expiresInDays,
    });

    return res.status(200).json({
      ok: true,
      premium: true,
      token,
      expiresInDays,
      expiresAt: expiresAtMs,
      email: finalEmail,
      message: `Premium ativado por ${expiresInDays} dias!`,
    });
  } catch (error) {
    console.error('Erro ao validar código:', error);
    return res.status(500).json({ ok: false, error: 'Erro ao validar código' });
  }
};

// nextFunction()  // <- primeira linha da próxima função (se houver no seu arquivo)
