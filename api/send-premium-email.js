import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, code, plan, expiresAt } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email e código são obrigatórios' });
    }

    // Formata data de expiração
    const expiresDate = new Date(expiresAt);
    const formattedDate = expiresDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Nome do plano
    let planName = 'Premium';
    if (plan === 'trial') planName = 'Grátis (5 dias)';
    else if (plan === 'monthly') planName = 'Mensal (30 dias)';
    else if (plan === 'annual') planName = 'Anual (1 ano)';

    // Envia email
    const data = await resend.emails.send({
      from: 'VeganFit <noreply@resend.dev>',
      to: email,
      subject: `🌱 Seu código VeganFit Premium chegou!`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #16a34a;
      margin-bottom: 10px;
    }
    .code-box {
      background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
      color: white;
      padding: 24px;
      border-radius: 8px;
      text-align: center;
      margin: 30px 0;
    }
    .code {
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 2px;
      font-family: 'Courier New', monospace;
      margin: 10px 0;
    }
    .info {
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
      padding: 16px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .steps {
      margin: 20px 0;
    }
    .step {
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .step:last-child {
      border-bottom: none;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      background: #16a34a;
      color: white;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🌱 VeganFit</div>
      <p style="color: #6b7280; font-size: 16px;">Receitas veganas fitness</p>
    </div>

    <h1 style="color: #16a34a; margin-bottom: 10px;">Parabéns, ${name || 'amigo(a)'}! 🎉</h1>
    
    <p style="font-size: 16px;">Seu pagamento foi aprovado e seu acesso premium está ativo!</p>

    <div class="code-box">
      <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px;">Seu código de acesso</div>
      <div class="code">${code}</div>
      <div style="font-size: 14px; opacity: 0.9; margin-top: 10px;">Plano ${planName}</div>
    </div>

    <div class="info">
      <strong>📅 Válido até:</strong> ${formattedDate}
    </div>

    <div class="steps">
      <h3 style="color: #16a34a; margin-bottom: 16px;">Como usar seu código:</h3>
      <div class="step">
        <strong>1.</strong> Acesse <a href="https://veganfit.app" style="color: #16a34a;">veganfit.app</a>
      </div>
      <div class="step">
        <strong>2.</strong> Clique no botão "Ativar Premium"
      </div>
      <div class="step">
        <strong>3.</strong> Vá na aba "Já tenho um código"
      </div>
      <div class="step">
        <strong>4.</strong> Cole o código acima
      </div>
      <div class="step">
        <strong>5.</strong> Aproveite receitas ilimitadas! 🚀
      </div>
    </div>

    <div style="text-align: center;">
      <a href="https://veganfit.app" class="button">Acessar VeganFit</a>
    </div>

    <div style="margin-top: 30px; padding: 16px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <strong>💡 Dica:</strong> Salve este email! Você pode usar o código em outros dispositivos.
    </div>

    <div class="footer">
      <p>Dúvidas? Responda este email que a gente te ajuda!</p>
      <p style="margin-top: 10px;">
        <a href="https://instagram.com/veganfit.app" style="color: #16a34a; text-decoration: none;">
          📱 @veganfit.app
        </a>
      </p>
      <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
        © ${new Date().getFullYear()} VeganFit. Todos os direitos reservados.
      </p>
    </div>
  </div>
</body>
</html>
      `
    });

    console.log('✅ Email enviado:', data);

    return res.status(200).json({ 
      ok: true, 
      emailId: data.id,
      message: 'Email enviado com sucesso!' 
    });

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return res.status(500).json({ 
      error: 'Erro ao enviar email',
      details: error.message 
    });
  }
}


