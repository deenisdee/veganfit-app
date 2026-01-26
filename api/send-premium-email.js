import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // ✅ Body robusto (pode vir como objeto, string ou vazio)
    let body = req.body;

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    if (!body || typeof body !== "object") body = {};

    // ✅ Aceita os dois formatos:
    // - legado: { email, codigo }
    // - novo: { to, premiumToken }
    const email = body.email || body.to || "";
    const codigo = body.codigo || body.premiumToken || body.token || "";

    if (!email || !codigo) {
      return res.status(400).json({ error: "Email e código são obrigatórios" });
    }

    const from = process.env.RESEND_FROM || "Veganfit.Life <noreply@veganfit.life>";

    const subject = "Seu acesso Premium foi ativado ✅";
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Seu Premium foi ativado 🎉</h2>
        <p>Seu código de acesso:</p>
        <p style="font-size:18px;font-weight:700;letter-spacing:0.5px">${codigo}</p>
        <p>Se precisar de ajuda, responda este e-mail.</p>
      </div>
    `;

    const result = await resend.emails.send({
      from,
      to: email,
      subject,
      html,
      // opcional (recomendado): para respostas irem pra suporte
      replyTo: "suporte@veganfit.life",
    });

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("send-premium-email error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}

// (próxima função, se existir no arquivo, começa abaixo)
