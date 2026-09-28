"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { zivel_coral_gables_location as coralGables } from "@/content/locations/coral-gables-florida";
import { pathways } from "./pathways";

type Field = "name" | "phone" | "email" | "pathway";
export type SunsetInquiryState = {
  status: "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<Field, string>>;
};

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9()+.\-\s]{6,30}$/;
const requests = new Map<string, number[]>();

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char] ?? char);
}

export async function submitSunsetInquiry(formData: FormData): Promise<SunsetInquiryState> {
  if (text(formData, "website")) {
    return { status: "success", message: "Thanks! The Zivel Coral Gables team will be in touch." };
  }

  const name = text(formData, "name");
  const phone = text(formData, "phone");
  const email = text(formData, "email");
  const pathway = text(formData, "pathway");
  const fieldErrors: Partial<Record<Field, string>> = {};
  if (!name || name.length > 120) fieldErrors.name = "Enter your name (up to 120 characters).";
  if (!PHONE_RE.test(phone)) fieldErrors.phone = "Enter a valid phone number.";
  if (email && (email.length > 254 || !EMAIL_RE.test(email))) fieldErrors.email = "Enter a valid email address or leave it blank.";
  if (!pathways.some((item) => item.name === pathway)) fieldErrors.pathway = "Select a pathway.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim()
    || requestHeaders.get("x-real-ip") || "unknown";
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter((time) => now - time < 60_000);
  if (recent.length >= 5) {
    return { status: "error", message: "Too many requests. Please wait a minute before trying again." };
  }
  requests.set(ip, [...recent, now]);

  const recipient = coralGables.contact?.email;
  const apiKey = process.env.RESEND_API_KEY;
  if (!recipient || !apiKey) {
    console.error("[SunsetInquiry] Email recipient or sending service not configured");
    return { status: "error", message: "We couldn't send your request. Please call Zivel Coral Gables instead." };
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safePathway = escapeHtml(pathway);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Zivel Website <no-reply@zivel.com>",
      to: [recipient],
      ...(email ? { replyTo: email } : {}),
      subject: `Sunset Chiropractic pathway inquiry — ${pathway}`,
      html: `<!doctype html><html lang="en"><body style="margin:0;padding:32px;background:#f4f0e9;color:#2b211c;font-family:Arial,sans-serif">
        <div style="max-width:600px;margin:auto;padding:32px;background:#fff;border-top:5px solid #925729">
          <p style="font-size:12px;font-weight:bold;letter-spacing:2px;color:#925729">ZIVEL CORAL GABLES × SUNSET CHIROPRACTIC</p>
          <h1 style="font-size:26px;margin:12px 0 24px">New pathway inquiry</h1>
          <p>A visitor to the Sunset Chiropractic partnership page requested information about a pathway.</p>
          <p><strong>Pathway:</strong> ${safePathway}</p>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          ${email ? `<p><strong>Email:</strong> ${safeEmail}</p>` : ""}
          <p style="font-size:12px;color:#594b40;margin-top:32px">Submitted through zivel.com/sunsetchiro. No medical information was requested.</p>
        </div></body></html>`,
    });
    if (error) {
      console.error("[SunsetInquiry] Resend error:", error);
      return { status: "error", message: "We couldn't send your request. Please call Zivel Coral Gables instead." };
    }
    return { status: "success", message: "Thanks! The Zivel Coral Gables team will be in touch." };
  } catch (error) {
    console.error("[SunsetInquiry] Sending failed:", error);
    return { status: "error", message: "We couldn't send your request. Please call Zivel Coral Gables instead." };
  }
}