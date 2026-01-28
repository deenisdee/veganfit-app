export default async function handler(req, res) {
  try {
    // ✅ Não vaza valores — só status e tamanho
    const envCheck = {
      FIREBASE_SERVICE_ACCOUNT_KEY: {
        exists: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
        length: process.env.FIREBASE_SERVICE_ACCOUNT_KEY
          ? String(process.env.FIREBASE_SERVICE_ACCOUNT_KEY).length
          : 0,
        looksLikeJson: process.env.FIREBASE_SERVICE_ACCOUNT_KEY
          ? String(process.env.FIREBASE_SERVICE_ACCOUNT_KEY).trim().startsWith('{')
          : false,
      },

      MERCADO_PAGO_ACCESS_TOKEN: {
        exists: !!process.env.MERCADO_PAGO_ACCESS_TOKEN,
        length: process.env.MERCADO_PAGO_ACCESS_TOKEN
          ? String(process.env.MERCADO_PAGO_ACCESS_TOKEN).length
          : 0,
      },

      MP_ACCESS_TOKEN: {
        exists: !!process.env.MP_ACCESS_TOKEN,
        length: process.env.MP_ACCESS_TOKEN
          ? String(process.env.MP_ACCESS_TOKEN).length
          : 0,
      },

      MP_PUBLIC_KEY: {
        exists: !!process.env.MP_PUBLIC_KEY,
        length: process.env.MP_PUBLIC_KEY
          ? String(process.env.MP_PUBLIC_KEY).length
          : 0,
      },

      RESEND_API_KEY: {
        exists: !!process.env.RESEND_API_KEY,
        length: process.env.RESEND_API_KEY
          ? String(process.env.RESEND_API_KEY).length
          : 0,
      },

      RESEND_FROM: {
        exists: !!process.env.RESEND_FROM,
        length: process.env.RESEND_FROM
          ? String(process.env.RESEND_FROM).length
          : 0,
      },

      PUBLIC_BASE_URL: {
        exists: !!process.env.PUBLIC_BASE_URL,
        value: process.env.PUBLIC_BASE_URL || null, // ✅ aqui pode mostrar, não é segredo
      },

      VERCEL_URL: {
        exists: !!process.env.VERCEL_URL,
        value: process.env.VERCEL_URL || null, // ✅ não é segredo
      },
    };

    return res.status(200).json({
      ok: true,
      env: envCheck,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: String(err?.message || err),
    });
  }
}

// (fim do arquivo)
