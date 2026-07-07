"use server";

import { Resend } from "resend";

export type FranchiseFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

function buildFranchiseEmailHtml({
  firstName,
  lastName,
  email,
  phone,
  territory,
  funding,
  locationInterest,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  territory: string;
  funding: string;
  locationInterest: string;
}) {
  const now = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Chicago",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Franchise Lead — ${firstName} ${lastName}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <tr>
          <td style="background:#0a0a0a;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c8971f;">Zivel Franchise</p>
            <h1 style="margin:10px 0 0;font-size:22px;font-weight:300;color:#ffffff;letter-spacing:0.5px;">New Franchise Lead</h1>
            <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">via zivel.com/franchise</p>
          </td>
        </tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,#c8971f,#e8c547,#c8971f);"></td></tr>

        <tr>
          <td style="padding:32px 40px 8px;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c8971f;">Contact Details</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
              <tr style="background:#fafafa;">
                <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;width:160px;border-bottom:1px solid #ebebeb;">Name</td>
                <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ebebeb;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;border-bottom:1px solid #ebebeb;">Email</td>
                <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #ebebeb;"><a href="mailto:${email}" style="color:#c8971f;text-decoration:none;">${email}</a></td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;">Phone</td>
                <td style="padding:12px 16px;font-size:14px;"><a href="tel:${phone}" style="color:#c8971f;text-decoration:none;">${phone}</a></td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 40px 8px;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c8971f;">Franchise Interest</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
              <tr style="background:#fafafa;">
                <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;width:160px;border-bottom:1px solid #ebebeb;">Territory</td>
                <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ebebeb;">${territory}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;border-bottom:1px solid #ebebeb;">Funding Ready</td>
                <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ebebeb;">${funding}</td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;">Looking For</td>
                <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;">${locationInterest}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px;" align="center">
            <a href="mailto:${email}?subject=Re: Your Zivel Franchise Inquiry"
              style="display:inline-block;background:#0a0a0a;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:100px;border:1px solid #333;">
              Reply to ${firstName}
            </a>
          </td>
        </tr>

        <tr><td style="height:3px;background:linear-gradient(90deg,#c8971f,#e8c547,#c8971f);"></td></tr>
        <tr>
          <td style="background:#0a0a0a;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);">Submitted ${now} CT · zivel.com/franchise</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function submitFranchiseForm(
  _prevState: FranchiseFormState,
  formData: FormData
): Promise<FranchiseFormState> {
  const firstName = (formData.get("firstName") as string | null)?.trim() ?? "";
  const lastName = (formData.get("lastName") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const territory = (formData.get("territory") as string | null)?.trim() ?? "";
  const funding = (formData.get("funding") as string | null)?.trim() ?? "";
  const locationInterest = (formData.get("locationInterest") as string | null)?.trim() ?? "";

  if (!firstName || !lastName || !email || !phone || !territory || !funding || !locationInterest) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[FranchiseForm] Missing RESEND_API_KEY");
    return { status: "error", message: "Mail service unavailable. Please email matto@zivel.com directly." };
  }

  const html = buildFranchiseEmailHtml({
    firstName,
    lastName,
    email,
    phone,
    territory,
    funding,
    locationInterest,
  });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Zivel Franchise <no-reply@zivel.com>",
      to: "matto@zivel.com",
      replyTo: email,
      subject: "Franchise Lead - Website",
      html,
    });

    if (error) {
      console.error("[FranchiseForm] Resend error:", error);
      return { status: "error", message: "Something went wrong. Please email matto@zivel.com directly." };
    }

    return { status: "success", message: "success" };
  } catch (err) {
    console.error("[FranchiseForm] Unexpected error:", err);
    return { status: "error", message: "Something went wrong. Please email matto@zivel.com directly." };
  }
}
