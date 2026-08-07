import type { Metadata } from "next";
import Image from "next/image";
import AdsLeadForm from "../_shared/AdsLeadForm";

// ── Constants ──────────────────────────────────────────────────────────────────
const PHONE_DISPLAY = "(385) 443-8778";
const PHONE_TEL = "tel:+13854438778";
const PARTNER_LOCKUP = "UTAH ROYALS × ZIVEL";
const TAGLINE = "WELLNESS. STRONGER. TOGETHER.";
const SUPPORTING = "Recovery solutions for every athlete.";
const FOOTER_LINE = "OFFICIAL WELLNESS PARTNER OF UTAH ROYALS";
const FOOTER_CTA = "STRONGER WELLNESS. STRONGER TOGETHER.";
const THANK_YOU_URL = "/ads/utah-royals-thank-you";
const SOURCE_LABEL = "Utah Royals Google Ads";
const NAVY = "#003087";
// Logo: drop /images/ads/royals-logo.png to replace the text placeholder
const LOGO_PATH = "/images/ads/royals-logo.png";

const SERVICES_ROW = [
  { icon: "🔴", name: "Red Light Therapy" },
  { icon: "❄️", name: "Sauna or Cryochamber" },
  { icon: "💆", name: "Compression Therapy" },
  { icon: "🌊", name: "Float Therapy" },
  { icon: "💨", name: "Oxygen Therapy" },
];

const VALUE_PROPS = [
  "30% off any service — new clients only",
  "First session just $5",
  "Official Wellness Partner of Utah Royals",
  "Cryotherapy, red light, sauna, float & more",
  "Same-day appointments available",
];

const TRUST_BADGES = [
  "Science-Backed Solutions",
  "Trusted by Athletes",
  "Premium Equipment",
  "Locally Owned & Operated",
];

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "30% Off + $5 First Visit | Zivel × Utah Royals Official Wellness Partner",
  description:
    "Exclusive offer for Utah Royals fans — 30% off any service and your first visit for just $5. Cryotherapy, red light therapy, sauna, float, and more at Zivel Riverton.",
  robots: { index: false, follow: false },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function UtahRoyalsPage() {
  return (
    <>
      {/* ── Sticky header ───────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b border-white/10"
        style={{ backgroundColor: "rgba(0,0,0,0.97)", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Zivel logo + team partnership */}
          <div className="flex items-center gap-3">
            <a href="https://www.zivel.com" aria-label="Zivel home">
              <Image src="/images/brand/zivel-logo.png" alt="Zivel" width={80} height={28} className="h-7 w-auto" />
            </a>
            <span className="text-white/20 text-lg font-thin hidden sm:block">×</span>
            {/* Team logo slot — replace span with next/image when /images/ads/royals-logo.png is available */}
            <div className="hidden sm:flex items-center h-7">
              <span
                className="text-xs font-black tracking-[0.15em] uppercase"
                style={{ color: "var(--zivel-gold)" }}
                title={`Logo placeholder — swap for Image src="${LOGO_PATH}"`}
              >
                Utah Royals
              </span>
            </div>
          </div>

          {/* Right: phone + CTA */}
          <nav className="flex items-center gap-3 sm:gap-4" aria-label="Header actions">
            <a
              href={PHONE_TEL}
              className="hidden sm:flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <span>📞</span>
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a
              href="#lead-form"
              className="px-4 sm:px-5 py-2.5 text-xs font-black tracking-widest uppercase rounded text-black transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: "var(--zivel-gold)" }}
            >
              Claim Offer
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>

        {/* ── Hero: 2-col (offer left | athlete right) ──────────────────── */}
        <section
          className="relative min-h-screen grid lg:grid-cols-2"
          style={{ backgroundColor: "#0a0a0a" }}
        >
          {/* Left: offer copy */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-24 lg:py-0 relative z-10">
            {/* Partnership lockup */}
            <p
              className="text-xs font-black tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--zivel-gold)" }}
            >
              {PARTNER_LOCKUP}
            </p>

            {/* Badge */}
            <div className="mb-8 self-start">
              <span
                className="px-3 py-1 text-xs font-black tracking-widest uppercase rounded-full text-white"
                style={{ backgroundColor: NAVY }}
              >
                Official Wellness Partner
              </span>
            </div>

            {/* Main offer */}
            <h1
              className="font-black leading-none mb-4 text-white"
              style={{
                fontSize: "clamp(3rem, 8vw, 5rem)",
                fontFamily: "var(--font-playfair)",
                lineHeight: 1.0,
              }}
            >
              30% OFF
              <br />
              <span style={{ color: "var(--zivel-gold)" }}>ANY SERVICE</span>
            </h1>

            {/* Sub-offer */}
            <p
              className="text-xl sm:text-2xl font-black tracking-wider uppercase mb-2"
              style={{ color: "var(--zivel-gold)" }}
            >
              First Visit Just $5
            </p>
            <p className="text-sm text-white/40 mb-10 uppercase tracking-widest">
              New clients only
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#lead-form"
                className="inline-block px-8 py-4 text-sm font-black tracking-widest uppercase rounded text-black transition-opacity hover:opacity-90 text-center"
                style={{ backgroundColor: "var(--zivel-gold)" }}
              >
                Claim Your Offer
              </a>
              <a
                href={PHONE_TEL}
                className="inline-block px-8 py-4 text-sm font-black tracking-widest uppercase rounded border transition-colors hover:bg-white/10 text-center"
                style={{ borderColor: "var(--zivel-gold)", color: "var(--zivel-gold)" }}
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Right: athlete image placeholder */}
          <div
            className="relative min-h-[50vh] lg:min-h-full overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #00071a 0%, #000510 50%, #000308 100%)",
            }}
          >
            {/* Navy glow */}
            <div
              className="absolute inset-0 opacity-25"
              style={{ background: `radial-gradient(ellipse at 60% 40%, ${NAVY}, transparent 70%)` }}
              aria-hidden="true"
            />
            {/* Athlete image slot */}
            {/*
              REPLACE THIS DIV WITH:
              <Image
                src="/images/ads/royals-athlete.jpg"
                alt="Utah Royals athlete recovery at Zivel"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
            */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" aria-hidden="true">
              <span className="text-9xl opacity-15">⚽</span>
              <span className="text-xs uppercase tracking-[0.3em] text-white/15">Athlete image coming soon</span>
              <code className="text-xs text-white/10">/images/ads/royals-athlete.jpg</code>
            </div>
          </div>
        </section>

        {/* ── Services icons row ────────────────────────────────────────── */}
        <section className="py-16 border-t border-white/10" style={{ backgroundColor: "#080808" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {SERVICES_ROW.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl border border-white/10 min-w-[110px]"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-xs font-semibold text-white/70 text-center leading-snug">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p
                className="text-lg sm:text-xl font-black tracking-[0.15em] uppercase mb-2"
                style={{ color: "var(--zivel-gold)" }}
              >
                {TAGLINE}
              </p>
              <p className="text-white/50 text-sm">{SUPPORTING}</p>
            </div>
          </div>
        </section>

        {/* ── Lead form section ─────────────────────────────────────────── */}
        <section id="lead-form" className="py-20 scroll-mt-16 border-t border-white/10" style={{ backgroundColor: "#0d0d0d" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left: value props */}
              <div>
                <p
                  className="text-xs font-black tracking-[0.25em] uppercase mb-3"
                  style={{ color: "var(--zivel-gold)" }}
                >
                  {PARTNER_LOCKUP}
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-5 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Claim Your
                  <br />
                  <span style={{ color: "var(--zivel-gold)" }}>Exclusive Offer</span>
                </h2>
                <p className="text-white/65 leading-relaxed mb-8">
                  As an Official Wellness Partner of Utah Royals, Zivel is
                  offering fans an exclusive deal. Fill out the form and our team
                  will reach out to get you started.
                </p>
                <ul className="space-y-3 text-sm text-white/70">
                  {VALUE_PROPS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 font-bold" style={{ color: "var(--zivel-gold)" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">
                    Prefer to call?
                  </p>
                  <a
                    href={PHONE_TEL}
                    className="text-2xl font-bold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--zivel-gold)" }}
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              {/* Right: form panel */}
              <div
                className="rounded-xl border border-white/10 p-6 sm:p-8"
                style={{ backgroundColor: "rgba(0,25,80,0.97)" }}
              >
                <div className="mb-5">
                  <span
                    className="text-xs font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full text-black"
                    style={{ backgroundColor: "var(--zivel-gold)" }}
                  >
                    Exclusive Fan Offer
                  </span>
                </div>
                <h3
                  className="text-lg font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  30% Off + $5 First Visit
                </h3>
                <p className="text-white/50 text-sm mb-6">
                  Fill in your details and we&rsquo;ll be in touch shortly.
                </p>
                <AdsLeadForm redirectUrl={THANK_YOU_URL} source={SOURCE_LABEL} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust badges ─────────────────────────────────────────────── */}
        <section className="py-12 border-t border-white/10" style={{ backgroundColor: "#080808" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TRUST_BADGES.map((badge) => (
                <div key={badge} className="text-center px-4 py-4">
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center text-black font-black text-sm"
                    style={{ backgroundColor: "var(--zivel-gold)" }}
                    aria-hidden="true"
                  >
                    ✓
                  </div>
                  <p className="text-xs font-semibold text-white/70 leading-snug">{badge}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="py-10 border-t border-white/10" style={{ backgroundColor: "#0a0a0a" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <Image
              src="/images/brand/zivel-logo.png"
              alt="Zivel"
              width={80}
              height={28}
              className="h-7 w-auto mx-auto mb-5 opacity-60"
            />
            <p
              className="text-xs font-black tracking-[0.2em] uppercase mb-2"
              style={{ color: "var(--zivel-gold)" }}
            >
              {FOOTER_LINE}
            </p>
            <p
              className="text-xs font-bold tracking-[0.15em] uppercase mb-6"
              style={{ color: "var(--zivel-gold)" }}
            >
              {FOOTER_CTA}
            </p>
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} Zivel. All rights reserved.{" "}
              <a
                href="https://www.zivel.com/privacy-policy"
                className="underline underline-offset-2 hover:text-white/50 transition-colors"
              >
                Privacy Policy
              </a>
            </p>
            <p className="text-xs text-white/15 mt-2">
              This page is a paid advertising landing page and is not indexed by search engines.
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}
