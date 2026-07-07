import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FranchiseLeadForm from "@/components/franchise/FranchiseLeadForm";

const SITE_URL = "https://www.zivel.com";
const CALENDLY_URL = "https://calendly.com/matto-zivel/zivel-franchise-intro-zoom";

export const metadata: Metadata = {
  title: "Own a Zivel Franchise | Performance & Recovery Franchise Opportunity",
  description:
    "Own the nation's first non-medical, all-in-one Performance & Recovery franchise. Initial investment $327K–$429K. 19 locations, +466.7% growth, ranked #45 by Entrepreneur 2026. Request info today.",
  alternates: {
    canonical: `${SITE_URL}/franchise`,
    languages: {
      en: `${SITE_URL}/franchise`,
      "x-default": `${SITE_URL}/franchise`,
    },
  },
  openGraph: {
    title: "Own a Zivel Franchise | Performance & Recovery",
    description:
      "Own the nation's first non-medical, all-in-one Performance & Recovery franchise. $327K–$429K investment, 0% ad fund, semi-absentee ownership. Ranked #45 Entrepreneur 2026.",
    url: `${SITE_URL}/franchise`,
    siteName: "Zivel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Own a Zivel Franchise | Performance & Recovery",
    description:
      "Own the nation's first non-medical, all-in-one Performance & Recovery franchise. $327K–$429K investment, ranked #45 Entrepreneur 2026.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Zivel Franchise Opportunity",
  description:
    "Own the nation's first non-medical, all-in-one Performance & Recovery franchise. Initial investment $327,400–$429,000.",
  url: `${SITE_URL}/franchise`,
  mainEntity: {
    "@type": "FranchiseOrganization",
    name: "Zivel",
    url: SITE_URL,
    foundingDate: "2018",
    numberOfLocations: 19,
    description:
      "Zivel is the nation's first non-medical, all-in-one Performance & Recovery franchise offering cryotherapy, red light therapy, infrared sauna, dry float, compression, and aesthetic services.",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Franchise", item: `${SITE_URL}/franchise` },
    ],
  },
};

const STATS = [
  { value: "19", label: "Locations Nationwide" },
  { value: "1,500+", label: "5-Star Reviews" },
  { value: "100,000+", label: "Services Delivered" },
  { value: "2018", label: "Founded" },
];

const WHY_OWN = [
  {
    icon: "◈",
    title: "All-in-One Model",
    body:
      "Eight premium recovery and aesthetic services under one roof — cryotherapy, red light, sauna, float, compression, slimming, toning, and facial. Multiple revenue streams, one seamless client experience.",
  },
  {
    icon: "◇",
    title: "Low Cost of Entry",
    body:
      "Initial investment of $327,400–$429,000 compares favorably to other health-related franchises. Designed for capital efficiency at every stage of build-out.",
  },
  {
    icon: "◉",
    title: "Efficient Operations",
    body:
      "Just 1–2 employees on-site at a time. No medical licensing required. All-in-one scheduling, billing, and membership management built in.",
  },
  {
    icon: "◆",
    title: "Semi-Absentee Ownership",
    body:
      "Hire a manager and provide strategic oversight. Zivel is designed for owners who want a high-performing business — not a second job.",
  },
  {
    icon: "◑",
    title: "Multiple Income Streams",
    body:
      "Memberships, single-session retail, packages, and aesthetic services drive predictable recurring revenue and strong client lifetime value.",
  },
  {
    icon: "◐",
    title: "Straightforward to Build",
    body:
      "Small footprint, cost containment at every stage, straightforward real estate approvals. Zivel supports your build-out from site selection through opening day.",
  },
];

const INVESTMENT_ROWS = [
  { label: "Initial Investment", value: "$327,400 – $429,000" },
  { label: "Liquidity Required", value: "$100,000" },
  { label: "Net Worth Required", value: "$350,000" },
  { label: "Franchise Fee", value: "$39,500" },
  { label: "Royalty Fee", value: "6%" },
  { label: "Ad Fund Contribution", value: "0%" },
  { label: "Technology Fee", value: "$1,500" },
  { label: "Agreement Term", value: "10 years, renewable" },
  { label: "Veterans Incentive", value: "$9,500 off franchise fee" },
];

const STEPS = [
  { n: "01", title: "Introduction Call", body: "A focused conversation to explore your goals, market opportunity, and mutual fit." },
  { n: "02", title: "Complete Application", body: "Submit your franchise application so we can begin the formal review process." },
  { n: "03", title: "Budgeting & Funding", body: "Explore financing paths — SBA loans, private lenders, HELOC, or ROBS — with our support team." },
  { n: "04", title: "Extended Introduction & Education", body: "Deep-dive into operations, technology, marketing, and what a day in a Zivel studio looks like." },
  { n: "05", title: "Territory Selection", body: "Work with our team to identify and secure your exclusive territory before the market matures." },
  { n: "06", title: "Discovery Day & Site Visit", body: "Visit a live Zivel studio, meet the team, and experience the brand firsthand." },
  { n: "07", title: "Final Agreement", body: "Review and execute your Franchise Disclosure Document and Franchise Agreement." },
  { n: "08", title: "Onboarding", body: "Training, build-out support, technology setup, and a grand opening plan tailored to your market." },
];

const SERVICES = [
  "Whole-Body Cryotherapy",
  "Red Light Therapy",
  "Infrared Sauna",
  "Dry Float Therapy",
  "Compression Therapy",
  "CryoSlimming",
  "CryoToning",
  "CryoFacial",
];

const PATHWAYS = [
  "Recovery & Pain Support",
  "Longevity & Healthy Aging",
  "Stress & Sleep Reset",
  "Performance & Athletic Optimization",
  "Mobility & Active Lifestyle",
  "Body Composition & Metabolic Support",
  "Skin Health & Regenerative Aesthetics",
  "Travel Reset & Jet Lag Recovery",
];

const TESTIMONIALS = [
  {
    quote:
      "I tried cryotherapy at Zivel on a whim and left feeling better than I had in years. Now I'm in three times a week. This is the kind of place that keeps people coming back — and that's exactly what made me want to own one.",
    name: "Marcus T.",
    location: "Draper, UT",
  },
  {
    quote:
      "The red light therapy and infrared sauna sessions have completely changed my recovery. I sleep better, move better, and feel like myself again. Zivel isn't a luxury — it's become essential.",
    name: "Sarah M.",
    location: "Riverton, UT",
  },
  {
    quote:
      "I've been to a lot of wellness studios and nothing compares to what Zivel offers in one visit. It's efficient, high-end, and the results are real. I tell everyone I know about this place.",
    name: "Jennifer K.",
    location: "South Jordan, UT",
  },
];

export default function FranchisePage() {
  return (
    <main className="space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="zv-bleed zv-hero-bg zv-noise relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 zv-glow-gold opacity-25" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-40 text-center">
          <ScrollReveal variant="fade-in">
            <p className="zv-tagline mb-6">
              Entrepreneur 2026 — #45 Top New &amp; Emerging Franchise
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-tight tracking-tight text-white mb-6">
              Recover Smarter.<br />
              Look Better.<br />
              <em className="italic text-[var(--zivel-gold)]">Feel Stronger.</em>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-12">
              Own a piece of the nation&rsquo;s first non-medical, all-in-one Performance &amp; Recovery franchise.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <a
                href="#franchise-form"
                className="zv-btn-gold px-10 py-4 text-sm font-semibold tracking-widest uppercase"
              >
                Request Franchise Info
              </a>
              <a
                href="/franchise-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="zv-btn-outline px-10 py-4 text-sm font-semibold tracking-widest uppercase"
              >
                Download Brochure
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={400}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-3xl mx-auto">
              {STATS.map((s) => (
                <div key={s.label} className="bg-black/40 backdrop-blur-sm px-6 py-6 text-center">
                  <p className="text-3xl md:text-4xl font-serif font-light text-[var(--zivel-gold)] leading-none mb-2">
                    {s.value}
                  </p>
                  <p className="text-xs text-white/50 tracking-widest uppercase leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ── WHY OWN A ZIVEL ── */}
      <section className="zv-bleed zv-section-gradient zv-immersive-section">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <p className="zv-tagline mb-4">The Opportunity</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
                Why Own a Zivel
              </h2>
              <div className="zv-gold-line mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_OWN.map((item, i) => (
              <ScrollReveal key={item.title} variant="fade-up" delay={i * 80}>
                <div className="zv-luxury-card p-8 rounded-2xl h-full">
                  <p className="text-3xl text-[var(--zivel-gold)] mb-4 font-light">{item.icon}</p>
                  <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">{item.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-12 rounded-2xl border border-[var(--zivel-gold)]/20 bg-[var(--zivel-gold)]/5 px-8 py-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="flex-shrink-0 text-4xl font-serif text-[var(--zivel-gold)]">+466.7%</div>
              <div>
                <p className="text-white font-semibold mb-1">Growth Rate</p>
                <p className="text-white/55 text-sm">
                  Ranked <strong className="text-white">#45</strong> on Entrepreneur&rsquo;s 2026 Top New &amp; Emerging Franchises.
                  Zivel&rsquo;s machine-based, multi-service model is built for the expanding recovery economy.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#franchise-form"
                  className="zv-btn-gold px-6 py-3 text-xs font-semibold tracking-widest uppercase whitespace-nowrap"
                >
                  Get Started →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-gold" />

      {/* ── INVESTMENT AT A GLANCE ── */}
      <section className="zv-bleed zv-section-elevated zv-immersive-section">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <p className="zv-tagline mb-4">Transparent from Day One</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
                Investment at a Glance
              </h2>
              <div className="zv-gold-line mx-auto" />
              <p className="text-white/55 mt-6 max-w-xl mx-auto text-sm leading-relaxed">
                Zivel is designed to compete favorably with other health-related franchises on both capital
                requirements and operating costs. The numbers below reflect our current FDD disclosures.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              {INVESTMENT_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-8 py-5 ${
                    i % 2 === 0 ? "bg-white/3" : "bg-transparent"
                  } ${row.label === "Veterans Incentive" ? "border-t border-[var(--zivel-gold)]/30 bg-[var(--zivel-gold)]/5" : ""}`}
                >
                  <p className="text-sm text-white/60 font-medium tracking-wide">{row.label}</p>
                  <p
                    className={`text-base font-semibold ${
                      row.label === "Ad Fund Contribution"
                        ? "text-[var(--zivel-gold)]"
                        : row.label === "Veterans Incentive"
                        ? "text-[var(--zivel-gold)]"
                        : "text-white"
                    }`}
                  >
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-8 text-center">
              <p className="text-white/35 text-xs leading-relaxed max-w-2xl mx-auto">
                Zivel does not provide lending directly. We work with private lenders, SBA loans, HELOC, and
                ROBS financing options to help qualified candidates find the right path.
              </p>
              <a href="#franchise-form" className="zv-btn-gold inline-block mt-6 px-10 py-4 text-sm font-semibold tracking-widest uppercase">
                Request Full Investment Details
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-white" />

      {/* ── SUPPORT PILLARS ── */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <p className="zv-tagline mb-4">You&rsquo;re Not Alone</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
                Support at Every Stage
              </h2>
              <div className="zv-gold-line-left mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real Estate & Site Selection",
                body: "Our team helps you identify, evaluate, and secure the right location — small footprint, easy lease approvals, cost containment built in.",
              },
              {
                title: "Build-Out & Construction",
                body: "Standardized build-out guides, vendor relationships, and cost-containment strategies at every stage of construction.",
              },
              {
                title: "Training & Onboarding",
                body: "Initial and ongoing training for you and your team covering operations, client experience, and every service modality.",
              },
              {
                title: "Marketing & Lead Generation",
                body: "Ad templates, social media support, SEO, email marketing, and a loyalty app powered by N2ition — a built-in tech advantage most competitors don&rsquo;t have.",
              },
              {
                title: "Technology",
                body: "The branded Zivel app plus all-in-one scheduling, billing, and client management. One platform, zero friction.",
              },
              {
                title: "Ongoing Franchisor Support",
                body: "Regular check-ins, performance reviews, and a network of fellow owners you can learn from and grow with.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} variant="fade-up" delay={i * 80}>
                <div className="border-l-2 border-[var(--zivel-gold)] pl-6">
                  <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ── PATH TO OWNERSHIP ── */}
      <section className="zv-bleed bg-black zv-immersive-section">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-20">
              <p className="zv-tagline mb-4">A Clear Path Forward</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
                Your Path to Ownership
              </h2>
              <div className="zv-gold-line mx-auto" />
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--zivel-gold)]/60 via-[var(--zivel-gold)]/20 to-transparent" />

            <div className="space-y-10">
              {STEPS.map((step, i) => (
                <ScrollReveal key={step.n} variant="fade-left" delay={i * 60}>
                  <div className="flex gap-8 md:gap-12 items-start">
                    <div className="flex-shrink-0 relative">
                      <div className="w-16 md:w-24 h-16 md:h-24 rounded-full border border-[var(--zivel-gold)]/30 bg-black flex items-center justify-center">
                        <span className="text-[var(--zivel-gold)] text-sm font-semibold tracking-widest">{step.n}</span>
                      </div>
                    </div>
                    <div className="pt-4 md:pt-5">
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-wide">{step.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed max-w-lg">{step.body}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal variant="fade-up" delay={200}>
            <div className="text-center mt-20">
              <p className="text-white/50 text-sm mb-6">Ready to start with Step 1?</p>
              <a href="#franchise-form" className="zv-btn-gold px-10 py-4 text-sm font-semibold tracking-widest uppercase">
                Begin the Conversation →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-gold" />

      {/* ── SERVICES & PATHWAYS ── */}
      <section className="zv-bleed zv-section-recessed zv-immersive-section">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <p className="zv-tagline mb-4">The Product</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
                Signature Services &amp; Pathways
              </h2>
              <div className="zv-gold-line mx-auto" />
              <p className="text-white/55 mt-6 max-w-xl mx-auto text-sm leading-relaxed">
                Eight premium modalities organized into goal-based pathways — giving every client a clear,
                repeatable routine and giving every owner multiple revenue channels in a single studio.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <ScrollReveal variant="fade-right">
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--zivel-gold)] mb-6">
                  Eight Signature Services
                </h3>
                <ul className="space-y-3">
                  {SERVICES.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--zivel-gold)] flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-white/35 leading-relaxed">
                  No specialty medical licensing required for most markets. Consult your local regulatory environment.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left">
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--zivel-gold)] mb-6">
                  Eight Goal-Based Pathways
                </h3>
                <ul className="space-y-3">
                  {PATHWAYS.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-white/35 leading-relaxed">
                  Pathways bundle services into structured client routines — driving memberships, repeat visits, and retention.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { stat: "1–2", label: "Employees on-site at a time" },
                { stat: "0%", label: "Required ad fund contribution" },
                { stat: "10yr", label: "Renewable agreement term" },
              ].map((item) => (
                <div key={item.label} className="zv-card-glass rounded-xl px-6 py-8">
                  <p className="text-3xl font-serif text-[var(--zivel-gold)] mb-2">{item.stat}</p>
                  <p className="text-xs text-white/50 tracking-widest uppercase">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-white" />

      {/* ── TESTIMONIALS ── */}
      <section className="zv-bleed zv-section-light-warm zv-light zv-immersive-section">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <p className="zv-tagline mb-4">What Clients Say</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
                The Results Speak for Themselves
              </h2>
              <div className="zv-gold-line-left mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} variant="fade-up" delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-sm h-full flex flex-col">
                  <p className="text-[var(--zivel-gold)] text-4xl font-serif leading-none mb-4">&ldquo;</p>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed flex-1 mb-6 italic">
                    {t.quote}
                  </p>
                  <div className="border-t border-[#1a1a1a]/10 pt-4">
                    <p className="font-semibold text-[#1a1a1a] text-sm">{t.name}</p>
                    <p className="text-xs text-[#1a1a1a]/45 mt-0.5">{t.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-12 text-center">
              <Link
                href="/locations"
                className="text-sm font-semibold tracking-widest uppercase text-[#1a1a1a] opacity-50 hover:opacity-80 transition-opacity duration-200 zv-gold-underline"
              >
                Explore Our Studio Locations →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ── LEAD CAPTURE FORM ── */}
      <section id="franchise-form" className="zv-bleed bg-black zv-immersive-section">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal variant="fade-right">
              <div className="lg:sticky lg:top-28">
                <p className="zv-tagline mb-4">Step 1 of 2</p>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6 leading-tight">
                  Request<br />
                  <em className="italic text-[var(--zivel-gold)]">Franchise Info</em>
                </h2>
                <div className="zv-gold-line mb-8" />
                <p className="text-white/55 text-sm leading-relaxed mb-8">
                  Fill out Step 1 and we&rsquo;ll be in touch. You&rsquo;ll then have the option to schedule
                  a 1-on-1 Zoom intro call directly with our CEO.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    "Transparent investment numbers — no surprises",
                    "Exclusive territory support",
                    "Semi-absentee ownership available",
                    "0% required ad fund contribution",
                    "$9,500 veterans incentive available",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--zivel-gold)] flex-shrink-0 mt-1.5" />
                      <p className="text-sm text-white/60">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-white/10 p-6 bg-white/3">
                  <p className="text-xs text-white/40 leading-relaxed mb-4">
                    Not ready to fill out the form? Schedule a call directly:
                  </p>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[var(--zivel-gold)] tracking-wide hover:underline"
                  >
                    Book a Zoom with our CEO →
                  </a>
                  <p className="mt-3 text-xs text-white/30">
                    Or email:{" "}
                    <a href="mailto:matto@zivel.com" className="text-white/50 hover:text-[var(--zivel-gold)] transition-colors">
                      matto@zivel.com
                    </a>
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left">
              <div className="zv-luxury-card rounded-2xl p-8 md:p-10">
                <FranchiseLeadForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── LEGAL FOOTER ── */}
      <section className="zv-bleed bg-black border-t border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-white/25 text-xs leading-relaxed">
            <strong className="text-white/40">Franchise Disclosure:</strong> This information is not intended
            as an offer to sell, or the solicitation of an offer to buy, a franchise. It is for information
            purposes only. An offer or solicitation can only be made by a Franchise Disclosure Document (FDD)
            registered and approved in the applicable state. The following states regulate the offer and
            sale of franchises: California, Hawaii, Illinois, Indiana, Maryland, Michigan, Minnesota,
            New York, North Dakota, Oregon, Rhode Island, South Dakota, Virginia, Washington, and Wisconsin.
            If you are a resident of or wish to acquire a franchise for a business to be located in one of
            these states, we will not offer you a franchise unless and until we have complied with applicable
            pre-sale registration and disclosure requirements in your state. Results may vary.{" "}
            <em>Please consult your franchise attorney to verify current registration status and required disclosures.</em>
          </p>
        </div>
      </section>
    </main>
  );
}
