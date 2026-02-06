// create-preference.js
// - Cria uma preferência de pagamento no Mercado Pago (Checkout Pro)
// - Retorna init_point para redirecionar o usuário 
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
      monthly: {
        title: 'VeganFit Premium - Mensal [TESTE]',
        price: 1.0,
        days: 30,
        description: 'Acesso premium por 30 dias'
      },
      quarterly: {
        title: 'VeganFit Premium - Trimestral [TESTE]',
        price: 1.0,
        days: 90,
        description: 'Acesso premium por 90 dias - Economize 20%'
      },
      annual: {
        title: 'VeganFit Premium - Anual [TESTE]',
        price: 1.0,
        days: 365,
        description: 'Acesso premium por 1 ano - Economize 33%'
      }
    };

    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      return res.status(400).json({ error: 'Plano inválido' });
    }

    // Base URL do seu site (prioriza domínio final)
    const siteBaseUrl =
      process.env.PUBLIC_BASE_URL?.trim() ||
      'https://www.veganfit.life';

    const webhookUrl = `${siteBaseUrl.replace(/\/$/, '')}/api/webhook`;

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
        success: `${siteBaseUrl}/success.html`,
        failure: `${siteBaseUrl}/failure.html`,
        pending: `${siteBaseUrl}/pending.html`
      },
      auto_return: 'approved',

      // ✅ CORRIGIDO (sem https duplicado)
      // - Mesmo com Webhooks configurado no painel, manter isso correto ajuda
      notification_url: webhookUrl,

      // Melhor passar metadata direto (Mercado Pago suporta metadata)
      // - Mantém compatível com seu webhook que lê payment.metadata
      metadata: {
        email: email,
        plan: plan,
        days: selectedPlan.days,
        name: req.body.name || 'Não informado',
        phone: req.body.phone || 'Não informado'
      },

      // Você pode manter external_reference também se quiser rastrear
      external_reference: JSON.stringify({
        email: email,
        plan: plan,
        days: selectedPlan.days,
        name: req.body.name || 'Não informado',
        phone: req.body.phone || 'Não informado'
      })
    };

    if (!process.env.MP_ACCESS_TOKEN) {
      return res.status(500).json({ error: 'MP_ACCESS_TOKEN não está definido na Vercel' });
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preference)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro Mercado Pago:', data);
      return res.status(500).json({ error: 'Erro ao criar preferência', details: data });
    }

    return res.status(200).json({
      preferenceId: data.id,
      initPoint: data.init_point
    });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return res.status(500).json({ error: error.message });
  }
};

// nextFunction()  // <- primeira linha da próxima função (se existir no seu arquivo)
