const admin = require('firebase-admin');

// DEBUG - VAMOS VER O QUE TÁ CHEGANDO
console.log('🔍 DEBUG ENV VARS:');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
console.log('FIREBASE_PRIVATE_KEY exists:', !!process.env.FIREBASE_PRIVATE_KEY);

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

// Gera código único
function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'VFP-'; // VeganFit Premium
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < 2) code += '-';
  }
  
  return code;
}

module.exports = async (req, res) => {
  try {
    // LOG COMPLETO DO BODY
    console.log('📦 Webhook body completo:', JSON.stringify(req.body, null, 2));
    console.log('📦 Webhook query:', JSON.stringify(req.query, null, 2));

    const { type, data, action, id } = req.body;
    const paymentId = data?.id || id || req.query.id;

    console.log('Webhook recebido:', { type, data, action, paymentId });

    // Mercado Pago pode enviar type ou action
    if ((type === 'payment' || action === 'payment.updated') && paymentId) {
      const paymentResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
          }
        }
      );

      const payment = await paymentResponse.json();
      
      console.log('💳 Status do pagamento:', payment.status);
      console.log('💳 Pagamento completo:', JSON.stringify(payment, null, 2));

      if (payment.status === 'approved') {
       const externalRef = JSON.parse(payment.external_reference);
const email = externalRef.email;
const plan = externalRef.plan;
const days = externalRef.days;

const code = generateCode();

const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        
        // Salva no Firestore
        await db.collection('premium_codes').doc(code).set({
          email: email,
          plan: plan,
          status: 'active',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          expiresAt: expiresAt,
          paymentId: payment.id
        });

        console.log(`
========================================
NOVO PAGAMENTO APROVADO!
Email: ${email}
Plano: ${plan}
Código: ${code}
Válido até: ${expiresAt.toLocaleDateString('pt-BR')}
========================================
        `);
      }
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    res.status(500).json({ error: error.message });
  }
};
