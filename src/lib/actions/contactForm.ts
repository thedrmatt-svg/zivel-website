"use server";

import { Resend } from "resend";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

function buildEmailHtml({
  firstName,
  lastName,
  email,
  phone,
  messageText,
  smsTransactional,
  smsMarketing,
  locationName,
  locationPhone,
  locationSlug,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  messageText: string;
  smsTransactional: boolean;
  smsMarketing: boolean;
  locationName: string;
  locationPhone: string;
  locationSlug: string;
}) {
  const now = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Chicago",
  });

  const check = (v: boolean) =>
    v
      ? `<span style="color:#c8971f;font-weight:700;">✓ Yes</span>`
      : `<span style="color:#999;">No</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>New Contact Form Submission — ${locationName}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0a0a0a;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c8971f;">Zivel Wellness</p>
              <h1 style="margin:10px 0 0;font-size:22px;font-weight:300;color:#ffffff;letter-spacing:0.5px;">New Contact Form Submission</h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">${locationName}</p>
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
                A new inquiry has been submitted through the <strong>${locationName}</strong> location page. Details are below.
              </p>
            </td>
          </tr>

          <!-- Contact Details -->
          <tr>
            <td style="padding:0 40px 8px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c8971f;">Contact Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
                <tr style="background:#fafafa;">
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;width:140px;border-bottom:1px solid #ebebeb;">Full Name</td>
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

          <!-- Message -->
          <tr>
            <td style="padding:24px 40px 8px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c8971f;">Message</p>
              <div style="background:#fafafa;border:1px solid #ebebeb;border-radius:8px;padding:20px;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">${messageText}</div>
            </td>
          </tr>

          <!-- Consent -->
          <tr>
            <td style="padding:24px 40px 8px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c8971f;">Consent</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
                <tr style="background:#fafafa;">
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;width:220px;border-bottom:1px solid #ebebeb;">SMS Transactional</td>
                  <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #ebebeb;">${check(smsTransactional)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;border-bottom:1px solid #ebebeb;">SMS Marketing</td>
                  <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #ebebeb;">${check(smsMarketing)}</td>
                </tr>
                <tr style="background:#fafafa;">
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;">Terms &amp; Privacy</td>
                  <td style="padding:12px 16px;font-size:14px;">${check(true)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Location Info -->
          <tr>
            <td style="padding:24px 40px 8px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c8971f;">Location</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
                <tr style="background:#fafafa;">
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;width:140px;border-bottom:1px solid #ebebeb;">Studio</td>
                  <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ebebeb;">${locationName}</td>
                </tr>
                ${locationPhone ? `<tr>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;border-bottom:1px solid #ebebeb;">Studio Phone</td>
                  <td style="padding:12px 16px;font-size:14px;"><a href="tel:${locationPhone}" style="color:#c8971f;text-decoration:none;">${locationPhone}</a></td>
                </tr>` : ""}
                <tr ${locationPhone ? "" : 'style="background:#fafafa;"'}>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;">Inbox</td>
                  <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;">${locationSlug}@zivel.com</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Reply CTA -->
          <tr>
            <td style="padding:32px 40px;" align="center">
              <a href="mailto:${email}?subject=Re: Your inquiry at ${locationName}"
                style="display:inline-block;background:#0a0a0a;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:100px;border:1px solid #333;">
                Reply to ${firstName}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#c8971f,#e8c547,#c8971f);"></td>
          </tr>
          <tr>
            <td style="background:#0a0a0a;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);">Submitted ${now} CT · zivel.com</p>
              <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.2);">This message was sent from the contact form on the ${locationName} page.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const firstName = (formData.get("firstName") as string | null)?.trim() ?? "";
  const lastName = (formData.get("lastName") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const messageText = (formData.get("message") as string | null)?.trim() ?? "";
  const smsTransactional = formData.get("smsTransactional") === "on";
  const smsMarketing = formData.get("smsMarketing") === "on";
  const acceptTerms = formData.get("acceptTerms") === "on";
  const locationSlug = (formData.get("locationSlug") as string | null) ?? "";
  const locationName = (formData.get("locationName") as string | null) ?? "";
  const locationPhone = (formData.get("locationPhone") as string | null) ?? "";

  if (!firstName || !lastName || !email || !phone || !messageText || !acceptTerms) {
    return {
      status: "error",
      message: "Please fill in all required fields and accept the Terms of Service.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[ContactForm] Missing RESEND_API_KEY env var.");
    return {
      status: "error",
      message: "Mail service is not configured. Please call or text us directly.",
    };
  }

  const toEmail = `${locationSlug}@zivel.com`;

  const html = buildEmailHtml({
    firstName,
    lastName,
    email,
    phone,
    messageText,
    smsTransactional,
    smsMarketing,
    locationName,
    locationPhone,
    locationSlug,
  });

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Zivel Contact Form <no-reply@zivel.com>",
      to: toEmail,
      replyTo: email,
      subject: `New Inquiry from ${firstName} ${lastName} — ${locationName}`,
      html,
    });

    if (error) {
      console.error("[ContactForm] Resend error:", error);
      return {
        status: "error",
        message: "Something went wrong sending your message. Please call or text us directly.",
      };
    }

    return {
      status: "success",
      message: "Thank you! Your message has been sent. We'll be in touch soon.",
    };
  } catch (err) {
    console.error("[ContactForm] Unexpected error:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please call or text us directly.",
    };
  }
}
