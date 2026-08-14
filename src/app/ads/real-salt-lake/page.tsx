import type { Metadata } from "next";
import Image from "next/image";
import AdsLeadForm from "../_shared/AdsLeadForm";

// ── Constants ──────────────────────────────────────────────────────────────────
const PHONE_DISPLAY = "(385) 443-8778";
const PHONE_TEL = "tel:+13854438778";
const PARTNER_LOCKUP = "Real Salt Lake";
const TAGLINE = "WELLNESS. ELEVATE. PERFORM.";
const SUPPORTING = "Advanced wellness. Elevated performance.";
const FOOTER_LINE = "OFFICIAL WELLNESS PARTNER OF REAL SALT LAKE";
const FOOTER_CTA = "RECOVER TODAY. WIN TOMORROW.";
const THANK_YOU_URL = "/ads/real-salt-lake-thank-you";
const SOURCE_LABEL = "Real Salt Lake Google Ads";
const MAROON = "#8b1a1a";
const HERO_BG = "#08010 1";
const LOGO_PATH = "/images/ads/rsl-logo.png";

const SERVICES_ROW = [
  { icon: "🔴", name: "Red Light Therapy",     desc: "Enhances recovery and reduces inflammation." },
  { icon: "❄️", name: "Sauna or Cryochamber",  desc: "Detox, relieve stress and reduce muscle soreness." },
  { icon: "💆", name: "Compression Therapy",   desc: "Improve circulation and support deep muscle recovery." },
  { icon: "🌊", name: "Float Therapy",          desc: "Reduce stress and promote deep relaxation." },
  { icon: "💨", name: "Oxygen Therapy",         desc: "Increase energy and support peak performance." },
];

const TRUST_BADGES = [
  { icon: "🔬", label: "Science-Backed Solutions" },
  { icon: "🏆", label: "Trusted by Athletes" },
  { icon: "⚙️", label: "Premium Equipment" },
  { icon: "📍", label: "Locally Owned & Operated" },
];

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "30% Off + $5 First Visit | Zivel × Real Salt Lake Official Wellness Partner",
  description:
    "Exclusive offer for RSL fans — 30% off any service and your first visit for just $5. Cryotherapy, red light therapy, sauna, float, and more at Zivel Riverton.",
  robots: { index: false, follow: false },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RealSaltLakePage() {
  return (
    <>
      {/* ── Sticky minimal header ─────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b border-white/10"
        style={{ backgroundColor: "rgba(8,1,1,0.97)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <a href="https://www.zivel.com" aria-label="Zivel home">
              <Image src="/images/brand/zivel-logo.png" alt="Zivel" width={72} height={24} className="h-6 w-auto" />
            </a>
            <span className="text-white/25 text-base font-thin">×</span>
            <span className="text-xs font-black tracking-[0.15em] uppercase" style={{ color: "var(--zivel-gold)" }}>
              {PARTNER_LOCKUP}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href={PHONE_TEL} className="hidden sm:block text-xs text-white/60 hover:text-white transition-colors">
              {PHONE_DISPLAY}
            </a>
            <a
              href="#claim"
              className="px-4 py-2 text-xs font-black tracking-widest uppercase rounded transition-opacity hover:opacity-90 text-black"
              style={{ backgroundColor: "var(--zivel-gold)" }}
            >
              Claim Offer
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[92vh] overflow-hidden flex flex-col" style={{ backgroundColor: "#080101" }}>

          {/* Athlete image — right half */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[52%]">
            <Image
              src="/images/ads/rsl-athlete.jpg"
              alt="Real Salt Lake athlete on the pitch"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
          </div>

          {/* Left-to-center fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(to right, #080101 45%, #080101cc 60%, transparent 80%)` }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-5 sm:px-10 lg:px-16">

            {/* Partnership bar */}
            <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-3 sm:gap-5">
              <Image
                src={LOGO_PATH}
                alt="Real Salt Lake"
                width={52}
                height={52}
                className="h-12 w-auto"
                priority
              />
              <span className="text-white text-lg font-thin">&amp;</span>
              <Image src="/images/brand/zivel-logo.png" alt="Zivel" width={80} height={28} className="h-7 w-auto" />
              <span className="text-xs text-white font-semibold tracking-widest uppercase hidden sm:block">
                Wellness Reimagined
              </span>
              <div className="ml-auto hidden sm:block">
                <span
                  className="px-3 py-1 text-xs font-black tracking-widest uppercase rounded-sm text-white"
                  style={{ backgroundColor: MAROON }}
                >
                  Official Wellness Partner
                </span>
              </div>
            </div>

            {/* Offer hero copy */}
            <div className="flex-1 flex flex-col justify-center py-10 max-w-[580px]">
              <p
                className="font-black text-white leading-none tracking-tight"
                style={{ fontSize: "clamp(5rem, 13vw, 9.5rem)", lineHeight: 0.85, fontFamily: "var(--font-inter)" }}
              >
                30% OFF
              </p>
              <p
                className="font-black text-white leading-none tracking-tight mb-6"
                style={{ fontSize: "clamp(3rem, 8.5vw, 6.5rem)", lineHeight: 0.85, fontFamily: "var(--font-inter)" }}
              >
                ANY SERVICE
              </p>

              <div className="flex items-center gap-3 mb-5">
                <span className="text-lg" style={{ color: "var(--zivel-gold)" }}>★</span>
                <div className="flex-1 h-px bg-white/20" />
              </div>

              <p
                className="font-bold text-white uppercase tracking-widest mb-1"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
              >
                First Visit
              </p>
              <p
                className="font-black leading-none tracking-tight mb-3"
                style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", color: "var(--zivel-gold)", lineHeight: 0.85, fontFamily: "var(--font-inter)" }}
              >
                JUST $5
              </p>
              <p className="text-xs text-white/50 uppercase tracking-[0.2em] mb-10">
                For first-time visitors
              </p>

              <div className="flex flex-col xs:flex-row gap-3">
                <a
                  href="#claim"
                  className="inline-block px-8 py-4 text-sm font-black tracking-widest uppercase rounded text-black transition-opacity hover:opacity-90 text-center"
                  style={{ backgroundColor: "var(--zivel-gold)" }}
                >
                  Claim Your Offer
                </a>
                <a
                  href={PHONE_TEL}
                  className="inline-block px-8 py-4 text-sm font-bold tracking-widest uppercase rounded border transition-colors hover:bg-white/10 text-center text-white"
                  style={{ borderColor: "rgba(255,255,255,0.25)" }}
                >
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHITE SECTION — services + form ───────────────────────────────── */}
        <section id="claim" className="scroll-mt-14" style={{ backgroundColor: "#f5f3ee" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

              {/* Left */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight mb-2 leading-tight">
                  {TAGLINE}
                </h2>
                <p className="text-gray-500 text-sm mb-10">{SUPPORTING}</p>

                <div className="grid grid-cols-5 gap-3 mb-12">
                  {SERVICES_ROW.map((s) => (
                    <div key={s.name} className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-xl mb-2 flex items-center justify-center text-2xl" style={{ backgroundColor: "#ede9e0" }}>
                        {s.icon}
                      </div>
                      <p className="text-xs font-black uppercase text-gray-800 mb-1 leading-snug">{s.name}</p>
                      <p className="text-xs text-gray-400 leading-snug hidden sm:block">{s.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
                  {TRUST_BADGES.map((b) => (
                    <div key={b.label} className="flex items-start gap-2">
                      <span className="text-lg shrink-0">{b.icon}</span>
                      <p className="text-xs font-semibold text-gray-600 leading-snug">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: form card — maroon */}
              <div
                className="rounded-xl p-6 sm:p-7 sticky top-20"
                style={{ backgroundColor: "rgba(80,5,5,0.97)" }}
              >
                <p
                  className="text-xs font-black tracking-[0.2em] uppercase mb-0.5"
                  style={{ color: "var(--zivel-gold)" }}
                >
                  Claim Your Offer
                </p>
                <p className="text-xs text-white/40 mb-6">New clients only.</p>
                <AdsLeadForm redirectUrl={THANK_YOU_URL} source={SOURCE_LABEL} />
              </div>

            </div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer style={{ backgroundColor: "#080101" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <Image src="/images/brand/zivel-logo.png" alt="Zivel" width={60} height={20} className="h-5 w-auto opacity-50" />
              <p className="text-xs font-black tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                {FOOTER_LINE}
              </p>
            </div>
            <p className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: "var(--zivel-gold)" }}>
              {FOOTER_CTA}
            </p>
          </div>
          <div className="border-t border-white/5">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
              <p className="text-xs text-white/20">© {new Date().getFullYear()} Zivel. All rights reserved.</p>
              <a href="https://www.zivel.com/privacy-policy" className="text-xs text-white/20 underline underline-offset-2 hover:text-white/40 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
