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
    const { plan, email } = req.body;

    if (!email || !plan) {
      return res.status(400).json({ error: 'Email e plano são obrigatórios' });
    }

    // ✅ PLANOS DISPONÍVEIS
    const plans = {
  'monthly': {
    title: 'VeganFit Premium - Mensal [TESTE]',
    price: 1.00,  // ← TESTE
    days: 30,
    description: 'Acesso premium por 30 dias'
  },
  'quarterly': {
    title: 'VeganFit Premium - Trimestral [TESTE]',
    price: 1.00,  // ← TESTE
    days: 90,
    description: 'Acesso premium por 90 dias - Economize 20%'
  },
  'annual': {
    title: 'VeganFit Premium - Anual [TESTE]',
    price: 1.00,  // ← TESTE
    days: 365,
    description: 'Acesso premium por 1 ano - Economize 33%'
  }
    };

    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      return res.status(400).json({ error: 'Plano inválido' });
    }

    const preference = {
      items: [
        {
          title: selectedPlan.title,
          description: selectedPlan.description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: selectedPlan.price
        }
      ],
      payer: {
        email: email
      },
back_urls: {
  success: 'https://veganfit-app.vercel.app/success.html',
  failure: 'https://veganfit-app.vercel.app/failure.html',
  pending: 'https://veganfit-app.vercel.app/pending.html'
},
      auto_return: 'approved',
      notification_url: 'https://veganfit-app.vercel.app/api/webhook',
    
  external_reference: JSON.stringify({
  email: email,
  plan: plan,
  days: selectedPlan.days,
  name: req.body.name || 'Não informado',
  phone: req.body.phone || 'Não informado'
})
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preference)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro Mercado Pago:', data);
      return res.status(500).json({ error: 'Erro ao criar preferência' });
    }

    res.status(200).json({
      preferenceId: data.id,
      initPoint: data.init_point
    });

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ error: error.message });
  }
};
