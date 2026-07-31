"use server";

import { Resend } from "resend";

export type LeadFormState = {
  status: "success" | "error";
  message: string;
} | null;

export async function submitLead(formData: FormData): Promise<LeadFormState> {
  const name = (formData.get("name") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const serviceInterest =
    (formData.get("serviceInterest") as string)?.trim() ?? "Membership pricing";
  const email = (formData.get("email") as string)?.trim();

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

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1a1a1a;border-bottom:2px solid #c9a96e;padding-bottom:8px">
        New Lead — Zivel Riverton Ads Page
      </h2>
      <table style="font-size:14px;border-collapse:collapse;width:100%">
        <tr>
          <td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap">Name</td>
          <td style="padding:8px 0"><strong>${name}</strong></td>
        </tr>
        <tr style="background:#f9f9f9">
          <td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap">Phone</td>
          <td style="padding:8px 0"><strong>${phone}</strong></td>
        </tr>
        <tr>
          <td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap">Interest</td>
          <td style="padding:8px 0">${serviceInterest}</td>
        </tr>
        ${
          email
            ? `<tr style="background:#f9f9f9">
               <td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap">Email</td>
               <td style="padding:8px 0">${email}</td>
             </tr>`
            : ""
        }
        <tr>
          <td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap">Source</td>
          <td style="padding:8px 0;color:#888;font-size:12px">Riverton Google Ads Landing Page (/riverton-ads)</td>
        </tr>
      </table>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Zivel Riverton Ads <no-reply@zivel.com>",
      to: "info@zivel.com",
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
