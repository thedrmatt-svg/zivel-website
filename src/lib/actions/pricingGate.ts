"use server";

import { Resend } from "resend";
import { locations } from "@/lib/data/locations";

export type PricingGateState = {
  status: "idle" | "success" | "error";
  message: string;
};

function buildLeadHtml({
  firstName,
  lastName,
  email,
  phone,
  cityDisplay,
  smsConsent,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cityDisplay: string;
  smsConsent: boolean;
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
  <title>Website Lead — Pricing Inquiry — ${cityDisplay}</title>
</head>
<body style="margin:0;padding:40px 0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#111;border-radius:12px;overflow:hidden;border:1px solid #2a2a2a;">
    <div style="background:#c8971f;padding:24px 32px;">
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#000;letter-spacing:-0.3px;">Website Lead — Pricing Inquiry</h1>
      <p style="margin:8px 0 0;font-size:13px;color:rgba(0,0,0,0.65);">Zivel ${cityDisplay} · ${now}</p>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #222;">
          <td style="padding:12px 0;color:#888;font-size:13px;width:130px;vertical-align:top;">Name</td>
          <td style="padding:12px 0;color:#fff;font-size:15px;font-weight:600;">${firstName} ${lastName}</td>
        </tr>
        <tr style="border-bottom:1px solid #222;">
          <td style="padding:12px 0;color:#888;font-size:13px;vertical-align:top;">Email</td>
          <td style="padding:12px 0;"><a href="mailto:${email}" style="color:#c8971f;text-decoration:none;font-size:14px;">${email}</a></td>
        </tr>
        <tr style="border-bottom:1px solid #222;">
          <td style="padding:12px 0;color:#888;font-size:13px;vertical-align:top;">Phone</td>
          <td style="padding:12px 0;"><a href="tel:${phone}" style="color:#c8971f;text-decoration:none;font-size:14px;">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding:12px 0;color:#888;font-size:13px;vertical-align:top;">SMS / Email Consent</td>
          <td style="padding:12px 0;color:#fff;font-size:13px;">${smsConsent ? '<span style="color:#c8971f;font-weight:700;">✓ Agreed</span>' : '<span style="color:#666;">Not agreed</span>'}</td>
        </tr>
      </table>
      <div style="margin-top:28px;padding:16px;background:#1a1a1a;border-radius:8px;border-left:3px solid #c8971f;">
        <p style="margin:0;color:#999;font-size:12px;line-height:1.6;">This lead came from the gated Pricing &amp; Memberships page. Follow up promptly — they are actively comparing pricing options.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function submitPricingGate(
  formData: FormData
): Promise<PricingGateState> {
  const firstName = ((formData.get("firstName") as string) ?? "").trim();
  const lastName = ((formData.get("lastName") as string) ?? "").trim();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const citySlug = ((formData.get("citySlug") as string) ?? "").trim();
  const cityDisplay = ((formData.get("cityDisplay") as string) ?? "").trim();
  const locationEmail = ((formData.get("locationEmail") as string) ?? "").trim();
  const smsConsent = formData.get("smsConsent") === "on";

  if (!firstName || !lastName || !phone || !email) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[PricingGate] Missing RESEND_API_KEY env var.");
    return { status: "success", message: "Pricing unlocked." };
  }

  const html = buildLeadHtml({ firstName, lastName, email, phone, cityDisplay, smsConsent });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Zivel Website <no-reply@zivel.com>",
      to: locations.find((l) => l.citySlug === citySlug)?.contact?.email || `${citySlug}@zivel.com`,
      replyTo: email,
      subject: `Website Lead - Pricing Inquiry — ${firstName} ${lastName}`,
      html,
    });
    if (error) {
      console.error("[PricingGate] Resend error:", error);
    }
  } catch (err) {
    console.error("[PricingGate] Unexpected error:", err);
  }

  return { status: "success", message: "Pricing unlocked." };
}
