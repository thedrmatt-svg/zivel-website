"use server";

import { Resend } from "resend";

export type LeadFormState = {
  status: "success" | "error";
  message: string;
} | null;

const TO_ADDRESSES = ["riverton@zivel.com", "jackson@zivel.com"];

function buildLeadHtml({
  name,
  phone,
  email,
  serviceInterest,
}: {
  name: string;
  phone: string;
  email: string;
  serviceInterest: string;
}) {
  const now = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Denver",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>New Lead — Zivel Riverton Ads</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0a0a0a;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c8971f;">Zivel</p>
              <h1 style="margin:10px 0 0;font-size:22px;font-weight:300;color:#ffffff;letter-spacing:0.5px;">New Lead — Riverton Ads</h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">Zivel Riverton · Google Ads Landing Page</p>
            </td>
          </tr>

          <!-- Gold accent bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#c8971f,#e8c547,#c8971f);"></td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:32px 40px 24px;">
              <p style="margin:0;font-size:15px;color:#333;line-height:1.6;">
                A new inquiry was submitted through the <strong>Riverton Google Ads</strong> landing page. Details are below.
              </p>
            </td>
          </tr>

          <!-- Contact Details -->
          <tr>
            <td style="padding:0 40px 8px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c8971f;">Contact Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
                <tr style="background:#fafafa;">
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;width:140px;border-bottom:1px solid #ebebeb;">Name</td>
                  <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ebebeb;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;border-bottom:1px solid #ebebeb;">Phone</td>
                  <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #ebebeb;"><a href="tel:${phone}" style="color:#c8971f;text-decoration:none;">${phone}</a></td>
                </tr>
                ${email ? `
                <tr style="background:#fafafa;">
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;border-bottom:1px solid #ebebeb;">Email</td>
                  <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #ebebeb;"><a href="mailto:${email}" style="color:#c8971f;text-decoration:none;">${email}</a></td>
                </tr>` : ""}
                <tr ${email ? "" : 'style="background:#fafafa;"'}>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;">Interest</td>
                  <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;">${serviceInterest}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Source -->
          <tr>
            <td style="padding:24px 40px 8px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c8971f;">Source</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
                <tr style="background:#fafafa;">
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;width:140px;border-bottom:1px solid #ebebeb;">Channel</td>
                  <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ebebeb;">Google Ads</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;">Page</td>
                  <td style="padding:12px 16px;font-size:14px;color:#888;">zivel.com/ads/riverton</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Reply CTA -->
          ${email ? `
          <tr>
            <td style="padding:32px 40px;" align="center">
              <a href="mailto:${email}?subject=Re: Your Zivel Riverton inquiry"
                style="display:inline-block;background:#0a0a0a;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:100px;border:1px solid #333;">
                Reply to ${name.split(" ")[0]}
              </a>
            </td>
          </tr>` : ""}

          <!-- Footer -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#c8971f,#e8c547,#c8971f);"></td>
          </tr>
          <tr>
            <td style="background:#0a0a0a;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);">Submitted ${now} MT · zivel.com</p>
              <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.2);">Sent to riverton@zivel.com and jackson@zivel.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function submitLead(formData: FormData): Promise<LeadFormState> {
  const name = (formData.get("name") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const serviceInterest =
    (formData.get("serviceInterest") as string)?.trim() ?? "Membership pricing";
  const email = (formData.get("email") as string)?.trim() ?? "";

  if (!name || !phone) {
    return {
      status: "error",
      message: "Please provide your name and phone number.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[RivertonAds] RESEND_API_KEY not configured");
    return {
      status: "error",
      message: "Something went wrong. Please call us at (385) 443-8778.",
    };
  }

  const html = buildLeadHtml({ name, phone, email, serviceInterest });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Zivel Website <no-reply@zivel.com>",
      to: TO_ADDRESSES,
      ...(email ? { replyTo: email } : {}),
      subject: `New Lead — Zivel Riverton · ${serviceInterest} · ${name}`,
      html,
    });

    if (error) {
      console.error("[RivertonAds] Resend error:", error);
      return {
        status: "error",
        message:
          "Something went wrong sending your message. Please call us at (385) 443-8778.",
      };
    }

    return {
      status: "success",
      message:
        "Thanks! We'll be in touch soon. You can also reach us directly at (385) 443-8778.",
    };
  } catch (err) {
    console.error("[RivertonAds] Unexpected error:", err);
    return {
      status: "error",
      message: "Something went wrong. Please call us at (385) 443-8778.",
    };
  }
}
