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

    if (!to || !to.includes("@") || !codigo) {
      return res.status(400).json({ ok: false, error: "Email e código são obrigatórios" });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ ok: false, error: "RESEND_API_KEY não configurada" });
    }

    const from = process.env.RESEND_FROM || "Veganfit.Life <noreply@veganfit.life>";
    const replyTo = "suporte@veganfit.life";

    const expiresText =
      Number.isFinite(expiresAtNum) && expiresAtNum > 0
        ? new Date(expiresAtNum).toLocaleString("pt-BR")
        : null;

    const subject = "Seu acesso Premium foi ativado ✅";

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
        <h2 style="margin:0 0 8px;">Olá, ${escapeHtml(name)} 👋</h2>
        <p style="margin:0 0 14px;">
          Seu <strong>Premium</strong> foi ativado com sucesso.
        </p>

        <div style="padding:14px 16px; border:1px solid #e5e7eb; border-radius:12px; background:#fafafa; margin: 0 0 14px;">
          <div style="font-size:12px; color:#555; margin-bottom:6px;">Seu código</div>
          <div style="font-size:18px; font-weight:800; letter-spacing:0.6px;">${escapeHtml(codigo)}</div>
          <div style="font-size:12px; color:#555; margin-top:10px;">
            <strong>Plano:</strong> ${escapeHtml(plan)}
            ${expiresText ? `<br/><strong>Válido até:</strong> ${escapeHtml(expiresText)}` : ""}
          </div>
        
        <div style="margin: 0 0 14px;">
          <a
            href="https://www.veganfit.life/?open=redeem&code=${encodeURIComponent(codigo)}"
            style="display:inline-block; padding:12px 18px; background:#22c55e; color:#fff; text-decoration:none; border-radius:10px; font-weight:700;"
          >
            Ativar meu Premium
          </a>
          <div style="font-size:12px; color:#555; margin-top:8px;">
            Dica: ao abrir, seu código já estará preenchido. Basta informar seu e-mail e ativar.
          </div>
        </div>

        <p style="margin:0 0 10px;">
          Se precisar de ajuda, é só responder este e-mail.
        </p>

        <p style="margin:0; color:#555; font-size:12px;">
          Veganfit.Life
        </p>
      </div>
    `;

    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo
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
