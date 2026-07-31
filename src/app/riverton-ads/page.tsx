import type { Metadata } from "next";
import Image from "next/image";
import LeadForm from "./LeadForm";
import GoogleAdsScript from "@/components/consent/GoogleAdsScript";

// ── Location constants ────────────────────────────────────────────────────────
const PHONE_DISPLAY = "(385) 443-8778";
const PHONE_TEL = "tel:+13854438778";
const ADDRESS = "2722 W 12600 S #1, Riverton, UT 84065";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1" +
  "&destination=2722+W+12600+S+%231+Riverton+UT+84065" +
  "&destination_place_id=ChIJp1GibQmFUocRBLMZt3xJW9k";
const GOOGLE_MAPS_URL = "https://maps.google.com/?cid=15662192929107718916";
const GOOGLE_ADS_ID = "AW-11334656695";

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Zivel Riverton — Recovery & Wellness Memberships",
  description:
    "Join Zivel Riverton for science-backed cryotherapy, infrared sauna, red light therapy, and more. Ask about membership pricing today.",
  robots: { index: false, follow: false },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const HOURS: { day: string; hours: string }[] = [
  { day: "Monday", hours: "7am – 8pm" },
  { day: "Tuesday", hours: "10am – 8pm" },
  { day: "Wednesday", hours: "7am – 8pm" },
  { day: "Thursday", hours: "10am – 8pm" },
  { day: "Friday", hours: "8am – 8pm" },
  { day: "Saturday", hours: "9am – 8pm" },
  { day: "Sunday", hours: "10am – 2pm" },
];

const SERVICES = [
  { name: "Cryotherapy", price: "$45", desc: "2–3 min whole-body cold exposure for recovery and energy" },
  { name: "Infrared Sauna", price: "$35", desc: "Full-spectrum heat for detox and deep relaxation" },
  { name: "Red Light Therapy", price: "$30", desc: "Cellular repair, skin health, and muscle recovery" },
  { name: "Dry Float", price: "$65", desc: "Zero-gravity decompression and nervous system reset" },
  { name: "Compression Therapy", price: "$30", desc: "Lymphatic drainage and circulation support" },
  { name: "CryoLift Facial", price: "$150", desc: "Cryo-based facial tightening and complexion treatment" },
];

const REVIEWS = [
  {
    name: "Aimee I.",
    text: "The team here is incredible. Jolie and the staff always make me feel welcome. The infrared sauna and cryo chamber are my go-to weekly recovery combo — I leave feeling like a new person every time.",
    stars: 5,
  },
  {
    name: "William B.",
    text: "Best investment in my health. The membership pays for itself — I come in for sauna and cryotherapy every week and the results are very real. Highly recommend the Elite membership.",
    stars: 5,
  },
  {
    name: "Jennifer P.",
    text: "Annie's CryoLift facials are absolutely amazing, and the membership has completely changed my wellness routine. The staff is knowledgeable and genuinely care about your results.",
    stars: 5,
  },
];

const FAQS = [
  {
    q: "Is a membership worth it if I'm just getting started?",
    a: "Yes — the Essential membership at $99/mo is designed specifically for beginners. Six sessions a month gives you enough frequency to actually feel results, at a fraction of the walk-in rate. Most members see a difference within the first two weeks.",
  },
  {
    q: "What's included in a membership?",
    a: "Essential includes 6 recovery sessions per month ($99/mo). Elite includes 8 sessions plus premium service discounts ($175/mo, most popular). Both plans work across any of our core services — cryo, sauna, red light, float, compression, and more.",
  },
  {
    q: "Is there a long-term commitment?",
    a: "No long-term contract required. Ask our team about flexible month-to-month options when you call — we'll find a plan that works for you.",
  },
  {
    q: "Can I apply my membership sessions to any service?",
    a: "Yes. Your sessions work across cryotherapy, infrared sauna, red light therapy, dry float, and compression therapy. Your team can help you build the right weekly protocol for your goal.",
  },
  {
    q: "Is cryotherapy safe?",
    a: "Absolutely. Whole-body cryotherapy is a well-studied modality used by professional athletes, physical therapists, and wellness studios worldwide. Every session is guided by trained staff who ensure your safety and comfort.",
  },
  {
    q: "Do I need an appointment or can I walk in?",
    a: "Appointments are recommended to guarantee your preferred time — especially on weekday mornings and Saturday. Walk-ins are always welcome based on availability. Call us and we'll get you in.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "var(--zivel-gold)" }}>
          ★
        </span>
      ))}
    </span>
  );
}

function GoldBtn({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-block px-8 py-4 text-sm font-bold tracking-widest uppercase rounded text-black transition-opacity hover:opacity-90 ${className}`}
      style={{ backgroundColor: "var(--zivel-gold)" }}
    >
      {children}
    </a>
  );
}

function OutlineBtn({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-block px-8 py-4 text-sm font-bold tracking-widest uppercase rounded border transition-colors hover:bg-white/10 ${className}`}
      style={{ borderColor: "var(--zivel-gold)", color: "var(--zivel-gold)" }}
    >
      {children}
    </a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RivertonAdsPage() {
  return (
    <>
      {/* Google Ads tag — consent-gated */}
      <GoogleAdsScript id={GOOGLE_ADS_ID} />

      {/* ── 1. Sticky minimal header ───────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b border-white/10"
        style={{ backgroundColor: "rgba(0,0,0,0.97)", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="https://www.zivel.com" aria-label="Zivel home">
            <Image
              src="/images/brand/zivel-logo.png"
              alt="Zivel"
              width={90}
              height={32}
              className="h-8 w-auto"
            />
          </a>

          {/* Right-side CTAs */}
          <nav className="flex items-center gap-3 sm:gap-4" aria-label="Header actions">
            {/* Phone — hidden on smallest screens */}
            <a
              href={PHONE_TEL}
              className="hidden sm:flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
            >
              <span>📞</span>
              <span>{PHONE_DISPLAY}</span>
            </a>

            {/* Directions — tablet+ */}
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
            >
              <span>📍</span>
              <span>Directions</span>
            </a>

            {/* Primary CTA */}
            <a
              href="#lead-form"
              className="px-4 sm:px-5 py-2.5 text-xs font-bold tracking-widest uppercase rounded text-black transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: "var(--zivel-gold)" }}
            >
              Ask About Membership
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>

        {/* ── 2. Hero ───────────────────────────────────────────────────────── */}
        <section className="relative min-h-[88vh] flex items-center">
          <Image
            src="/images/locations/riverton/hero.jpg"
            alt="Zivel Riverton wellness studio"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay — gradient so bottom feels grounded */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
            {/* Eyebrow */}
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: "var(--zivel-gold)" }}
            >
              Riverton, Utah · Since 2023
            </p>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Build the Recovery Habit
              <br />
              <span style={{ color: "var(--zivel-gold)" }}>That Actually Sticks.</span>
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join hundreds of Riverton members using science-backed cryotherapy, infrared
              sauna, and red light therapy to recover faster, look better, and feel
              their best — every single week.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GoldBtn href="#lead-form" className="text-center">
                Ask About Membership Pricing →
              </GoldBtn>
              <OutlineBtn href={PHONE_TEL} className="text-center">
                Call {PHONE_DISPLAY}
              </OutlineBtn>
            </div>

            {/* Trust row */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <StarRow count={5} />
                <strong className="text-white">5.0</strong> · 260+ Google Reviews
              </span>
              <span className="hidden sm:block text-white/30">·</span>
              <span>1,000s of Sessions Delivered</span>
              <span className="hidden sm:block text-white/30">·</span>
              <span>Free Parking Available</span>
            </div>
          </div>
        </section>

        {/* ── 3. Services / single-session pricing (secondary) ─────────────── */}
        <section className="py-20 bg-[#0d0d0d]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-4">
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--zivel-gold)" }}
              >
                Walk-In Rates
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Single Session Pricing
              </h2>
              <p className="text-white/60 max-w-lg mx-auto text-sm">
                Try any service at walk-in rates — or{" "}
                <a href="#lead-form" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: "var(--zivel-gold)" }}>
                  ask about membership pricing
                </a>{" "}
                to save significantly on every visit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {SERVICES.map((s) => (
                <div
                  key={s.name}
                  className="rounded-lg border border-white/10 p-6 hover:border-white/20 transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white">{s.name}</h3>
                    <span
                      className="text-lg font-bold"
                      style={{ color: "var(--zivel-gold)" }}
                    >
                      {s.price}
                    </span>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Membership upsell */}
            <div
              className="mt-10 rounded-xl p-8 text-center border"
              style={{ borderColor: "var(--zivel-gold)", backgroundColor: "rgba(201,169,110,0.06)" }}
            >
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--zivel-gold)" }}
              >
                Better Value With a Membership
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
                <div>
                  <p className="text-2xl font-bold text-white">$99<span className="text-base text-white/50">/mo</span></p>
                  <p className="text-sm text-white/60 mt-1">Essential · 6 sessions/month</p>
                </div>
                <div className="hidden sm:block text-white/20 text-2xl">|</div>
                <div>
                  <p className="text-2xl font-bold text-white">$175<span className="text-base text-white/50">/mo</span></p>
                  <p className="text-sm text-white/60 mt-1">
                    Elite · 8 sessions + discounts{" "}
                    <span
                      className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "var(--zivel-gold)", color: "#000" }}
                    >
                      Most Popular
                    </span>
                  </p>
                </div>
              </div>
              <GoldBtn href="#lead-form">Ask About Membership Pricing →</GoldBtn>
            </div>
          </div>
        </section>

        {/* ── 4. Phone CTA band ─────────────────────────────────────────────── */}
        <section className="py-14 bg-black border-y border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-white/60 text-sm uppercase tracking-widest mb-3 font-semibold">
              Prefer to talk first?
            </p>
            <p
              className="text-3xl sm:text-4xl font-bold mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Call or Text Us Anytime
            </p>
            <a
              href={PHONE_TEL}
              className="text-3xl sm:text-4xl font-bold hover:opacity-80 transition-opacity"
              style={{ color: "var(--zivel-gold)" }}
            >
              {PHONE_DISPLAY}
            </a>
            <p className="text-white/50 text-sm mt-4">
              Our team will answer your questions about membership, services, and scheduling.
            </p>
          </div>
        </section>

        {/* ── 5. Social proof ───────────────────────────────────────────────── */}
        <section className="py-20 bg-[#0d0d0d]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--zivel-gold)" }}
              >
                Google Reviews
              </p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <StarRow count={5} />
                <span className="text-2xl font-bold text-white">5.0</span>
                <span className="text-white/50">· 260+ reviews</span>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline underline-offset-2 hover:text-white transition-colors"
                style={{ color: "var(--zivel-gold)" }}
              >
                View all reviews on Google →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.map((r) => (
                <div
                  key={r.name}
                  className="rounded-lg border border-white/10 p-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <StarRow count={r.stars} />
                  <p className="text-white/80 text-sm leading-relaxed mt-4 mb-5">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    — {r.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. Visit / location block ─────────────────────────────────────── */}
        <section className="py-20 bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--zivel-gold)" }}
              >
                Find Us
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Visit Zivel Riverton
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Info */}
              <div className="space-y-8">
                {/* Address & phone */}
                <div>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-2">
                    Address
                  </p>
                  <p className="text-white text-lg">{ADDRESS}</p>
                  <p className="text-white/50 text-sm mt-1">Free parking available</p>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-2">
                    Phone
                  </p>
                  <a
                    href={PHONE_TEL}
                    className="text-lg font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--zivel-gold)" }}
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-3">
                    Studio Hours
                  </p>
                  <table className="w-full text-sm">
                    <tbody>
                      {HOURS.map(({ day, hours }) => (
                        <tr key={day} className="border-b border-white/5">
                          <td className="py-2 text-white/60 pr-6">{day}</td>
                          <td className="py-2 text-white font-medium">{hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <GoldBtn
                    href={DIRECTIONS_URL}
                    className="text-center"
                  >
                    📍 Get Directions
                  </GoldBtn>
                  <OutlineBtn
                    href={GOOGLE_MAPS_URL}
                    className="text-center"
                  >
                    View Google Profile
                  </OutlineBtn>
                </div>
              </div>

              {/* Map embed */}
              <div className="rounded-xl overflow-hidden border border-white/10 aspect-square lg:aspect-auto lg:h-[420px]">
                <iframe
                  title="Zivel Riverton location map"
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY || ""}&q=place_id:ChIJp1GibQmFUocRBLMZt3xJW9k`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. FAQ ────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-[#0d0d0d]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--zivel-gold)" }}
              >
                Got Questions?
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Common Questions
              </h2>
            </div>

            <div className="space-y-0 divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden">
              {FAQS.map((faq, i) => (
                <div key={i} className="p-6" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <p
                    className="font-semibold text-white mb-3 leading-snug"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {faq.q}
                  </p>
                  <p className="text-white/65 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. Final CTA band + lead form ─────────────────────────────────── */}
        <section id="lead-form" className="py-20 bg-black border-t border-white/10 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: copy */}
              <div>
                <p
                  className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
                  style={{ color: "var(--zivel-gold)" }}
                >
                  Ready to Get Started?
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-5 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Ask About
                  <br />
                  <span style={{ color: "var(--zivel-gold)" }}>Membership Pricing</span>
                </h2>
                <p className="text-white/65 leading-relaxed mb-8">
                  Fill out the form and our Riverton team will reach out to walk you
                  through membership options, answer your questions, and help you pick
                  the right plan for your goals. No commitment required.
                </p>

                {/* Bullets */}
                <ul className="space-y-3 text-sm text-white/70">
                  {[
                    "Essential membership from $99/mo — 6 sessions",
                    "Elite membership from $175/mo — 8 sessions + discounts",
                    "Month-to-month, no long-term contracts",
                    "Works across cryo, sauna, red light, float & more",
                    "Free parking · 7 days a week",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 shrink-0 font-bold"
                        style={{ color: "var(--zivel-gold)" }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Phone fallback */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2 font-semibold">
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

              {/* Right: form */}
              <div
                className="rounded-xl border border-white/10 p-6 sm:p-8"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <h3 className="text-lg font-bold text-white mb-6">
                  Get Membership Info
                </h3>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. Minimal footer ─────────────────────────────────────────────── */}
        <footer className="py-8 border-t border-white/10 bg-[#080808]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
            <p>© {new Date().getFullYear()} Zivel. All rights reserved.</p>
            <p className="text-center sm:text-right">
              This page is a paid advertising landing page and is not indexed by search engines.{" "}
              <a
                href="https://www.zivel.com/privacy-policy"
                className="underline underline-offset-2 hover:text-white/60 transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}
