"use server";

import nodemailer from "nodemailer";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  messageText: string;
  smsTransactional: boolean;
  smsMarketing: boolean;
  acceptTerms: boolean;
  locationSlug: string;
  locationName: string;
  locationPhone: string;
};

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
    return { status: "error", message: "Please fill in all required fields and accept the Terms of Service." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const toEmail = `${locationSlug}@zivel.com`;

  const htmlBody = `
    <h2 style="font-family:sans-serif;color:#1a1a1a;">New Contact Form Submission — ${locationName}</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;width:180px;">Name</td><td style="padding:8px 12px;">${firstName} ${lastName}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;">Email</td><td style="padding:8px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;">Phone</td><td style="padding:8px 12px;"><a href="tel:${phone}">${phone}</a></td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;">Message</td><td style="padding:8px 12px;white-space:pre-wrap;">${messageText}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;">SMS Transactional</td><td style="padding:8px 12px;">${smsTransactional ? "✓ Yes" : "No"}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;">SMS Marketing</td><td style="padding:8px 12px;">${smsMarketing ? "✓ Yes" : "No"}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;">Accepted Terms</td><td style="padding:8px 12px;">${acceptTerms ? "✓ Yes" : "No"}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;">Location</td><td style="padding:8px 12px;">${locationName}</td></tr>
      <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;">Location Phone</td><td style="padding:8px 12px;">${locationPhone}</td></tr>
    </table>
  `;

  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT ?? "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("[ContactForm] Missing SMTP configuration. Set SMTP_HOST, SMTP_USER, SMTP_PASS env vars.");
      return { status: "error", message: "Mail service is not configured. Please call or text us directly." };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Zivel Website" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `New Inquiry from ${firstName} ${lastName} — ${locationName}`,
      html: htmlBody,
      text: `New inquiry from ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\n${messageText}\n\nSMS Transactional: ${smsTransactional}\nSMS Marketing: ${smsMarketing}\nAccepted Terms: ${acceptTerms}`,
    });

    return { status: "success", message: "Thank you! Your message has been sent. We'll be in touch soon." };
  } catch (err) {
    console.error("[ContactForm] Send error:", err);
    return { status: "error", message: "Something went wrong sending your message. Please call or text us directly." };
  }
}
