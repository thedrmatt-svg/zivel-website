"use server";

import { Resend } from "resend";
import { headers } from "next/headers";

// ── Escaping helpers ──────────────────────────────────────────────────────────

/** Escape every user value before interpolating into HTML email. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ── Input validation ──────────────────────────────────────────────────────────

/** Allowlist — must match the hidden source values in each landing page. */
const ALLOWED_SOURCES: ReadonlySet<string> = new Set([
  "Salt Lake Bees Google Ads",
  "Real Salt Lake Google Ads",
  "Utah Royals Google Ads",
  "American Top Team Sandy Springs Google Ads",
]);

/** Allowlist — must match the <option> values in AdsLeadForm. */
const ALLOWED_SERVICES: ReadonlySet<string> = new Set([
  "Red Light Therapy - $5/service",
  "Cryotherapy - $5/service",
  "Infrared Sauna - $5/service",
  "Compression Therapy - $5/service",
  "Float Therapy - $5/service",
  "Oxygen Therapy - $5/service",
  "CryoLift Facial - 30% Off Retail",
  "Cryo Body Contouring - 30% Off Retail",
  "Cryo Toning - 30% Off Retail",
  "Not sure — help me choose",
  "Cryotherapy",
  "Red Light Therapy",
  "Infrared Sauna",
  "Compression Therapy",
  "I'm not sure yet",
  "CryoLift Facial",
  "Cryo Slimming",
  "Post Fight Facial",
]);

const ALLOWED_REFERRERS: ReadonlySet<string> = new Set([
  "American Top Team - Sandy Springs",
]);

const ALLOWED_OFFERS: ReadonlySet<string> = new Set([
  "A — First recovery session free",
  "B — $49 day pass, three standard services, same day",
  "C — Fighter membership, $69 then $139",
]);

/** Loose email check — just blocks obviously malformed values. */
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

/** Only allow characters that belong in a phone number. */
const PHONE_RE = /^[0-9()\-+.\s]{6,30}$/;

/** Strip everything except digits and a leading '+' for the tel: URL. */
function toTelHref(phone: string): string {
  return "tel:" + phone.replace(/[^\d+]/g, "");
}

// ── Rate limiting (in-memory per deployment instance) ────────────────────────
//
// Serverless functions may spin up many instances, so this provides basic
// per-instance protection rather than global enforcement. Paired with the
// honeypot field in the form, it significantly raises the cost of abuse.

const rateLimitMap = new Map<string, number[]>();
const RL_WINDOW_MS = 60_000; // 1 minute
const RL_MAX = 5;            // 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RL_WINDOW_MS;
  const prev = (rateLimitMap.get(ip) ?? []).filter((t) => t > cutoff);
  if (prev.length >= RL_MAX) return true;
  prev.push(now);
  rateLimitMap.set(ip, prev);
  return false;
}

// ── Email builder ─────────────────────────────────────────────────────────────

function buildLeadHtml({
  name,
  phone,
  email,
  service,
  referrer,
  offer,
  source,
}: {
  name: string;
  phone: string;
  email: string;
  service: string;
  referrer: string;
  offer: string;
  source: string;
}) {
  // All values are HTML-escaped before interpolation.
  const safeName    = escapeHtml(name);
  const safePhone   = escapeHtml(phone);
  const safeEmail   = escapeHtml(email);
  const safeService = escapeHtml(service);
  const safeReferrer = escapeHtml(referrer);
  const safeOffer    = escapeHtml(offer);
  const safeSource  = escapeHtml(source);
  const telHref     = toTelHref(phone);        // digits + '+' only
  const mailtoHref  = email ? `mailto:${encodeURIComponent(email)}` : "";

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
  <title>New Lead — Zivel ${safeSource}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <tr><td style="background:#0a0a0a;padding:32px 40px;text-align:center;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c8971f;">Zivel</p>
          <h1 style="margin:10px 0 0;font-size:22px;font-weight:300;color:#ffffff;letter-spacing:0.5px;">New Lead — ${safeSource}</h1>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">Google Ads Landing Page</p>
        </td></tr>

        <tr><td style="height:3px;background:linear-gradient(90deg,#c8971f,#e8c547,#c8971f);"></td></tr>

        <tr><td style="padding:32px 40px 24px;">
          <p style="margin:0;font-size:15px;color:#333;line-height:1.6;">
            A new inquiry was submitted through the <strong>${safeSource}</strong> landing page.
          </p>
        </td></tr>

        <tr><td style="padding:0 40px 8px;">
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c8971f;">Contact Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #ebebeb;">
            <tr style="background:#fafafa;">
              <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;width:140px;border-bottom:1px solid #ebebeb;">Name</td>
              <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ebebeb;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;border-bottom:1px solid #ebebeb;">Phone</td>
              <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #ebebeb;"><a href="${telHref}" style="color:#c8971f;text-decoration:none;">${safePhone}</a></td>
            </tr>
            ${email ? `
            <tr style="background:#fafafa;">
              <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;border-bottom:1px solid #ebebeb;">Email</td>
              <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #ebebeb;"><a href="${mailtoHref}" style="color:#c8971f;text-decoration:none;">${safeEmail}</a></td>
            </tr>` : ""}
            ${safeReferrer ? `
            <tr ${email ? "" : 'style="background:#fafafa;"'}>
              <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;border-bottom:1px solid #ebebeb;">Referred By</td>
              <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ebebeb;">${safeReferrer}</td>
            </tr>
            ` : ""}
            ${safeOffer ? `
            <tr style="background:#fafafa;">
              <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;border-bottom:1px solid #ebebeb;">Training Offer</td>
              <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ebebeb;">${safeOffer}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#555;">Interested Service</td>
              <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;">${safeService}</td>
            </tr>
          </table>
        </td></tr>

        ${email ? `
        <tr><td style="padding:24px 40px;" align="center">
          <a href="${mailtoHref}?subject=Re%3A%20Your%20Zivel%20inquiry"
            style="display:inline-block;background:#0a0a0a;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:100px;border:1px solid #333;">
            Reply to ${safeName.split(" ")[0]}
          </a>
        </td></tr>` : ""}

        <tr><td style="height:3px;background:linear-gradient(90deg,#c8971f,#e8c547,#c8971f);"></td></tr>
        <tr><td style="background:#0a0a0a;padding:24px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);">Submitted ${escapeHtml(now)} MT · zivel.com</p>
          <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.2);">Submitted through the Zivel website</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Action ────────────────────────────────────────────────────────────────────

export type AdsLeadState = {
  status: "success" | "error";
  message: string;
} | null;

const TO_ADDRESSES = ["vtzk5gc2@robot.zapier.com", "jackson@zivel.com"];

export async function submitAdsLead(formData: FormData): Promise<AdsLeadState> {
  // ── Honeypot — bots fill this; real users leave it empty ──────────────────
  const honeypot = (formData.get("website") as string ?? "").trim();
  if (honeypot) {
    // Silent fake success — don't reveal to the bot that it was rejected.
    return { status: "success", message: "Thanks! Our team will be in touch shortly." };
  }

  // ── Rate limiting ──────────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Too many requests. Please wait a minute and try again, or call us at (385) 443-8778.",
    };
  }

  // ── Extract and length-bound inputs ───────────────────────────────────────
  const name    = (formData.get("name")    as string ?? "").trim().slice(0, 120);
  const phone   = (formData.get("phone")   as string ?? "").trim().slice(0, 30);
  const email   = (formData.get("email")   as string ?? "").trim().slice(0, 254);
  const service = (formData.get("service") as string ?? "").trim();
  const referrer = (formData.get("referrer") as string ?? "").trim();
  const offer   = (formData.get("offer")   as string ?? "").trim();
  const source  = (formData.get("source")  as string ?? "").trim();

  // ── Required field validation ─────────────────────────────────────────────
  if (!name || !phone) {
    return { status: "error", message: "Please provide your name and phone number." };
  }

  // ── Phone format check ────────────────────────────────────────────────────
  if (!PHONE_RE.test(phone)) {
    return { status: "error", message: "Please enter a valid phone number." };
  }

  // ── Email format check (only if provided) ─────────────────────────────────
  if (email && !EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // ── Service allowlist ─────────────────────────────────────────────────────
  const safeService = ALLOWED_SERVICES.has(service) ? service : "General information";
  const isAttLead = source === "American Top Team Sandy Springs Google Ads";
  const safeReferrer = ALLOWED_REFERRERS.has(referrer) ? referrer : "";
  const safeOffer = ALLOWED_OFFERS.has(offer) ? offer : "";

  if (isAttLead && (!safeReferrer || !safeOffer || !ALLOWED_SERVICES.has(service))) {
    return { status: "error", message: "Please select a referral source, training offer, and service." };
  }

  // ── Source allowlist — never trust user-supplied value directly ───────────
  const safeSource = ALLOWED_SOURCES.has(source) ? source : "Sports Team Ads";

  // ── Build subject from trusted, bounded values only ───────────────────────
  const subject = `New Lead — ${safeSource} · ${safeOffer || safeService} · ${name.slice(0, 60)}`;

  // ── Send ──────────────────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[AdsLead] RESEND_API_KEY not configured");
    return { status: "error", message: "Something went wrong. Please call us at (385) 443-8778." };
  }

  const html = buildLeadHtml({
    name,
    phone,
    email,
    service: safeService,
    referrer: safeReferrer,
    offer: safeOffer,
    source: safeSource,
  });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Zivel Website <no-reply@zivel.com>",
      to: TO_ADDRESSES,
      ...(email ? { replyTo: email } : {}),
      subject,
      html,
    });

    if (error) {
      console.error("[AdsLead] Resend error:", error);
      return { status: "error", message: "Something went wrong. Please call us at (385) 443-8778." };
    }

    return { status: "success", message: "Thanks! Our team will be in touch shortly." };
  } catch (err) {
    console.error("[AdsLead] Unexpected error:", err);
    return { status: "error", message: "Something went wrong. Please call us at (385) 443-8778." };
  }
}
