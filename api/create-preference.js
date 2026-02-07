// api/create-preference.js
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
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body =
      req.body && typeof req.body === 'object'
        ? req.body
        : (typeof req.body === 'string' ? JSON.parse(req.body) : {});

    const plan = String(body.plan || '').trim();
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !email.includes('@') || !plan) {
      return res.status(400).json({ ok: false, error: 'Email e plano são obrigatórios' });
    }

    // ✅ PLANOS DISPONÍVEIS (SEM quarterly)
    const plans = {
      monthly: {
        title: 'VeganFit Premium - Mensal',
        price: 1.0,
        days: 30,
        description: 'Acesso premium por 30 dias',
      },
      annual: {
        title: 'VeganFit Premium - Anual',
        price: 1.0,
        days: 365,
        description: 'Acesso premium por 1 ano',
      },
    };

    const selectedPlan = plans[plan];
    if (!selectedPlan) {
      return res.status(400).json({ ok: false, error: 'Plano inválido' });
    }

    // ✅ Token ÚNICO (padrão MERCADO_PAGO_ACCESS_TOKEN)
    // - Mantém fallback temporário para não te travar hoje
    const accessToken =
      process.env.MERCADO_PAGO_ACCESS_TOKEN ||
      process.env.MP_ACCESS_TOKEN ||
      process.env.MP_PUBLIC_KEY; // (não é token, mas evita undefined em debug; não será usado)

    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN && !process.env.MP_ACCESS_TOKEN) {
      return res.status(500).json({
        ok: false,
        error: 'Token do Mercado Pago não configurado (MERCADO_PAGO_ACCESS_TOKEN ou MP_ACCESS_TOKEN)',
      });
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
          unit_price: selectedPlan.price,
        },
      ],
      payer: { email },
      back_urls: {
        success: `${siteBaseUrl}/success.html`,
        failure: `${siteBaseUrl}/failure.html`,
        pending: `${siteBaseUrl}/pending.html`,
      },
      auto_return: 'approved',

      // ✅ garante que o webhook vai pro seu domínio certo
      notification_url: webhookUrl,

      metadata: {
        email,
        plan,
        days: selectedPlan.days,
        name: body.name || 'Não informado',
        phone: body.phone || 'Não informado',
      },

      external_reference: JSON.stringify({
        email,
        plan,
        days: selectedPlan.days,
        name: body.name || 'Não informado',
        phone: body.phone || 'Não informado',
      }),
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[create-preference] Erro Mercado Pago:', data);
      return res.status(500).json({
        ok: false,
        error: 'Erro ao criar preferência',
        details: data,
      });
    }

    return res.status(200).json({
      ok: true,
      preferenceId: data.id,
      initPoint: data.init_point,
    });
  } catch (error) {
    console.error('[create-preference] Erro:', error);
    return res.status(500).json({ ok: false, error: error.message || 'Erro interno' });
  }
};

// nextFunction()
