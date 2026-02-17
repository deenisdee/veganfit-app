import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// handler()
// - Envia e-mail com o código premium (compatível com webhook e testes manuais)
export default async function handler(req, res) {
  try {
    // Apenas POST
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    // ✅ Body robusto (objeto, string, ou vazio)
    let body = req.body;

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    if (!body || typeof body !== "object") body = {};

    // ✅ Compatibilidade de campos
    const to = String(body.email || body.to || "").trim();
    const codigo = String(body.codigo || body.code || body.premiumToken || "").trim();

    const name = String(body.name || body.nome || "Cliente").trim();
    const plan = String(body.plan || "premium").trim();
    const expiresAtNum =
      body.expiresAt != null && String(body.expiresAt).trim() !== ""
        ? Number(body.expiresAt)
        : null;

    if (!to || !to.includes("@")) {
      return res.status(400).json({ ok: false, error: "Email é obrigatório" });
    }

    if (!process.env.RESEND_API_KEY) {
      return res
        .status(500)
        .json({ ok: false, error: "RESEND_API_KEY não configurada" });
    }

    const from =
      process.env.RESEND_FROM || "Veganfit.Life <noreply@veganfit.life>";
    const replyTo = "suporte@veganfit.life";

    const expiresText =
      Number.isFinite(expiresAtNum) && expiresAtNum > 0
        ? new Date(expiresAtNum).toLocaleString("pt-BR")
        : null;

    const subject = "Seu acesso Premium foi ativado ✅";

    const baseUrl = process.env.PUBLIC_BASE_URL || "https://www.veganfit.life";
    const activationLink = `${baseUrl.replace(
      /\/$/,
      ""
    )}/?openPremium=1&tab=3&autovalidate=1&email=${encodeURIComponent(to)}`;

    // ✅ Botão verde (texto branco)
    const buttonStyle = [
      "display:inline-block",
      "padding:14px 18px",
      "border-radius:12px",
      "text-decoration:none",
      "font-weight:800",
      "background:#16a34a",
      "color:#ffffff",
      "border:1px solid #15803d",
      "box-shadow:0 6px 18px rgba(22,163,74,0.25)",
    ].join(";");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
        <h2 style="margin:0 0 8px;">Olá, ${escapeHtml(name)} 👋</h2>
        <p style="margin:0 0 14px;">
          Seu <strong>Premium</strong> foi ativado com sucesso.
        </p>

        <div style="padding:14px 16px; border:1px solid #e5e7eb; border-radius:12px; background:#fafafa; margin: 0 0 14px;">
          <div style="font-size:12px; color:#555; margin-bottom:10px;">Ative em 1 clique</div>

          <a href="${activationLink}" style="${buttonStyle}">
            Acessar Premium
          </a>

          <div style="font-size:12px; color:#555; margin-top:12px;">
            <strong>Plano:</strong> ${escapeHtml(plan)}
            ${expiresText ? `<br/><strong>Válido até:</strong> ${escapeHtml(expiresText)}` : ""}
          </div>

          <div style="font-size:12px; color:#555; margin-top:10px;">
            <strong>E-mail da compra:</strong> ${escapeHtml(to)}
          </div>
        </div>

        <p style="margin:0 0 10px;">
          Se precisar de ajuda, é só responder este e-mail.
        </p>

        <p style="margin:0; font-size:12px; color:#6b7280;">
          Se o botão não abrir, copie e cole este link no navegador:<br/>
          <span style="word-break:break-all;">${activationLink}</span>
        </p>

        ${codigo ? `
          <p style="margin:14px 0 0; font-size:12px; color:#6b7280;">
            (Código interno de suporte: <strong>${escapeHtml(codigo)}</strong>)
          </p>
        ` : ""}

      </div>
    `;

    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo,
    });

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("send-premium-email error:", err);
    return res.status(500).json({ ok: false, error: "Internal error" });
  }
}

// escapeHtml(str)
// - Evita quebrar o HTML com caracteres especiais
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// (fim do arquivo)
