"use server";

import { Resend } from "resend";

export type FranchiseInvestmentGateState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"firstName" | "lastName" | "email" | "phone", string>>;
};

function buildLeadHtml({
  firstName,
  lastName,
  email,
  phone,
  consent,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
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
  <title>Franchise Lead — Investment Details — ${firstName} ${lastName}</title>
</head>
<body style="margin:0;padding:40px 0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#111;border-radius:12px;overflow:hidden;border:1px solid #2a2a2a;">
    <div style="background:#c8971f;padding:24px 32px;">
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#000;letter-spacing:-0.3px;">Website Lead — Investment Details Request</h1>
      <p style="margin:8px 0 0;font-size:13px;color:rgba(0,0,0,0.65);">Zivel Franchise · ${now}</p>
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
          <td style="padding:12px 0;color:#888;font-size:13px;vertical-align:top;">Contact Consent</td>
          <td style="padding:12px 0;color:#fff;font-size:13px;">${consent ? '<span style="color:#c8971f;font-weight:700;">✓ Agreed</span>' : '<span style="color:#666;">Not agreed</span>'}</td>
        </tr>
      </table>
      <div style="margin-top:28px;padding:16px;background:#1a1a1a;border-radius:8px;border-left:3px solid #c8971f;">
        <p style="margin:0;color:#999;font-size:12px;line-height:1.6;">This lead unlocked the "Investment at a Glance" section on the franchise page. Follow up promptly — they are actively evaluating investment costs.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function submitFranchiseInvestmentGate(
  formData: FormData
): Promise<FranchiseInvestmentGateState> {
  const firstName = ((formData.get("firstName") as string) ?? "").trim();
  const lastName = ((formData.get("lastName") as string) ?? "").trim();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const consent = formData.get("consent") === "on";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fieldErrors: FranchiseInvestmentGateState["fieldErrors"] = {};
  if (!firstName) fieldErrors.firstName = "First name is required.";
  if (!lastName) fieldErrors.lastName = "Last name is required.";
  if (!phone) fieldErrors.phone = "Phone number is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!emailRegex.test(email)) fieldErrors.email = "Please enter a valid email address.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  if (!consent) {
    return { status: "error", message: "Please agree to be contacted to continue." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[FranchiseInvestmentGate] Missing RESEND_API_KEY env var.");
    return { status: "success", message: "Unlocked." };
  }

  const html = buildLeadHtml({ firstName, lastName, email, phone, consent });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Zivel Franchise <no-reply@zivel.com>",
      to: "matto@zivel.com",
      replyTo: email,
      subject: `Website Lead - Investment Details — ${firstName} ${lastName}`,
      html,
    });
    if (error) {
      console.error("[FranchiseInvestmentGate] Resend error:", error);
    }
  } catch (err) {
    console.error("[FranchiseInvestmentGate] Unexpected error:", err);
  }

  return { status: "success", message: "Unlocked." };
}
