import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FranchiseLeadForm from "@/components/franchise/FranchiseLeadForm";
import FranchiseInvestmentReveal from "@/components/franchise/FranchiseInvestmentReveal";
import InvestmentGateProvider from "@/components/franchise/InvestmentGateProvider";
import ViewInvestmentDetailsButton from "@/components/franchise/ViewInvestmentDetailsButton";
import FranchiseNavBanner from "@/components/franchise/FranchiseNavBanner";

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
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Zivel Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Own a Zivel Franchise | Performance & Recovery",
    description:
      "Own the nation's first non-medical, all-in-one Performance & Recovery franchise. $327K–$429K investment, ranked #45 Entrepreneur 2026.",
    images: [`${SITE_URL}/images/og-image.jpg`],
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
    body: "Eight premium recovery and aesthetic services under one roof — cryotherapy, red light, sauna, float, compression, slimming, toning, and facial. Multiple revenue streams, one seamless client experience.",
  },
  {
    icon: "◇",
    title: "Low Cost of Entry",
    body: "Initial investment compares favorably to other health-related franchises. Designed for capital efficiency at every stage of build-out.",
  },
  {
    icon: "◉",
    title: "Efficient Operations",
    body: "Just 1–2 employees on-site at a time. No medical licensing required. All-in-one scheduling, billing, and membership management built in.",
  },
  {
    icon: "◆",
    title: "Semi-Absentee Ownership",
    body: "Hire a manager and provide strategic oversight. Zivel is designed for owners who want a high-performing business — not a second job.",
  },
  {
    icon: "◑",
    title: "Multiple Income Streams",
    body: "Memberships, single-session retail, packages, and aesthetic services drive predictable recurring revenue and strong client lifetime value.",
  },
  {
    icon: "◐",
    title: "Straightforward to Build",
    body: "Small footprint, cost containment at every stage, straightforward real estate approvals. Zivel supports your build-out from site selection through opening day.",
  },
];

// ─── Path to Ownership steps with image placeholders ───
// TODO: Replace each `image` path with a condensed/custom step image when ready.
const STEPS = [
  {
    n: "01",
    title: "Introductory Call",
    body: "A focused conversation to explore your goals, market opportunity, and mutual fit.",
    image: "/images/franchise/introductory-call.avif",
    imageAlt: "Step 01 — Introductory Call",
    imagePosition: "object-[50%_25%]",
  },
  {
    n: "02",
    title: "Complete Application",
    body: "Submit your franchise application so we can begin the formal review process.",
    image: "/images/franchise/complete-application.avif",
    imageAlt: "Step 02 — Complete Application",
    imagePosition: "object-[50%_85%]",
  },
  {
    n: "03",
    title: "Budgeting & Funding",
    body: "Explore financing paths — SBA loans, private lenders, HELOC, or ROBS — with our support team.",
    image: "/images/home/science-1.jpg",
    imageAlt: "Wellness science research materials — Zivel franchise budgeting and funding overview",
  },
  {
    n: "04",
    title: "Extended Introduction & Education",
    body: "Deep-dive into operations, technology, marketing, and what a day in a Zivel studio looks like.",
    image: "/images/home/service-cryo.jpg",
    imageAlt: "Whole body cryotherapy chamber inside a Zivel studio",
  },
  {
    n: "05",
    title: "Territory Selection",
    body: "Work with our team to identify and secure your exclusive territory before the market matures.",
    image: "/images/home/service-redlight.jpg",
    imageAlt: "Red light therapy panel at Zivel — exclusive territory opportunity",
  },
  {
    n: "06",
    title: "Discovery Day & Site Visit",
    body: "Visit a live Zivel studio, meet the team, and experience the brand firsthand.",
    image: "/images/home/service-sauna.jpg",
    imageAlt: "Infrared sauna suite at Zivel — experienced during a Discovery Day visit",
  },
  {
    n: "07",
    title: "Final Agreement",
    body: "Review and execute your Franchise Disclosure Document and Franchise Agreement.",
    image: "/images/home/quote-bg.jpg",
    imageAlt: "Zivel studio ambient interior — final franchise agreement milestone",
  },
  {
    n: "08",
    title: "Onboarding",
    body: "Training, build-out support, technology setup, and a grand opening plan tailored to your market.",
    image: "/images/home/service-dryfloat.jpg",
    imageAlt: "Client relaxing on a dry float therapy bed — Zivel studio onboarding experience",
  },
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
    quote: "I tried cryotherapy at Zivel on a whim and left feeling better than I had in years. Now I'm in three times a week. This is the kind of place that keeps people coming back — and that's exactly what made me want to own one.",
    name: "Marcus T.",
    location: "Draper, UT",
  },
  {
    quote: "The red light therapy and infrared sauna sessions have completely changed my recovery. I sleep better, move better, and feel like myself again. Zivel isn't a luxury — it's become essential.",
    name: "Sarah M.",
    location: "Riverton, UT",
  },
  {
    quote: "I've been to a lot of wellness studios and nothing compares to what Zivel offers in one visit. It's efficient, high-end, and the results are real. I tell everyone I know about this place.",
    name: "Jennifer K.",
    location: "South Jordan, UT",
  },
];

export default function FranchisePage() {
  return (
    <main id="main-content" tabIndex={-1} className="space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="zv-bleed zv-hero-bg zv-noise relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 zv-glow-gold opacity-25" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-40 text-center">
          <nav aria-label="Breadcrumb" className="mb-8 text-left">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/30">/</li>
              <li className="text-white/70">Franchise</li>
            </ol>
          </nav>
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

      <FranchiseNavBanner />

      {/* ── WHY OWN A ZIVEL ── */}
      <section id="why-own-zivel" style={{ scrollMarginTop: "10rem" }} className="zv-bleed zv-section-gradient zv-immersive-section">
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

          {/* Growth callout + CTA */}
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
              <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
                <a href="#franchise-form" className="zv-btn-gold px-6 py-3 text-xs font-semibold tracking-widest uppercase whitespace-nowrap">
                  Request Info →
                </a>
                <a href="/franchise-brochure.pdf" target="_blank" rel="noopener noreferrer" className="zv-btn-outline px-6 py-3 text-xs font-semibold tracking-widest uppercase whitespace-nowrap">
                  Download Brochure
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-gold" />

      {/* ── MARKET OPPORTUNITY ── */}
      <InvestmentGateProvider>
      <section id="growth-proof" style={{ scrollMarginTop: "10rem" }} className="zv-bleed bg-black zv-immersive-section relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--zivel-gold)]/3 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <p className="zv-tagline mb-4">Industry Tailwinds</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6 max-w-3xl mx-auto leading-tight">
                The Wellness Opportunity Has Never Been Bigger
              </h2>
              <div className="zv-gold-line mx-auto" />
            </div>
          </ScrollReveal>

          {/* Headline stat cards */}
          <ScrollReveal variant="fade-up" delay={80}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { value: "$6.8T", label: "Global wellness economy (2024)", sub: "→ $9.8T by 2029" },
                { value: "7.6%", label: "Annual industry growth rate", sub: "Outpacing global GDP" },
                { value: "$1.13B", label: "Red light therapy market by 2033", sub: "9.8% CAGR" },
                { value: "30–35%", label: "Annual unit growth", sub: "Top wellness franchises" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-6 text-center"
                >
                  <p className="text-3xl md:text-4xl font-serif font-light text-[var(--zivel-gold)] leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/55 leading-snug mb-1">{stat.label}</p>
                  <p className="text-[10px] text-[var(--zivel-gold)]/60 tracking-wide">{stat.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Main content — bullets + placeholder visual */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-16">
            {/* Bullet list — 3 cols */}
            <div className="lg:col-span-3 space-y-5">
              {[
                {
                  headline: "A $6.8 trillion global economy — growing fast.",
                  body: "The global wellness economy reached $6.8 trillion in 2024 and is projected to grow to $9.8 trillion by 2029 — expanding at 7.6% annually, significantly faster than global GDP.",
                },
                {
                  headline: "Recovery services are the fastest-growing segment.",
                  body: "Cryotherapy, red light therapy, infrared sauna, compression, and aesthetics are among the highest-growth modalities in the entire wellness industry.",
                },
                {
                  headline: "Red Light Therapy alone is expected to nearly double.",
                  body: "From ~$534 million in 2025 to over $1.13 billion by 2033 at a 9.8% CAGR — one of eight services Zivel delivers under a single roof.",
                },
                {
                  headline: "Top-performing franchises are scaling at 30–35% annually.",
                  body: "Boutique wellness and recovery concepts are among the fastest-scaling franchise categories, with leading brands posting 30–35% annual unit growth.",
                },
                {
                  headline: "Consumers want integrated, membership-based experiences.",
                  body: "Single-modality studios are losing ground. Clients are moving toward integrated recovery + aesthetics destinations with recurring memberships — exactly what Zivel delivers.",
                },
              ].map((item, i) => (
                <ScrollReveal key={i} variant="fade-right" delay={i * 60}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full border border-[var(--zivel-gold)]/40 bg-[var(--zivel-gold)]/10 flex items-center justify-center">
                        <svg className="w-3 h-3 text-[var(--zivel-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{item.headline}</p>
                      <p className="text-sm text-white/50 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Placeholder visual — 2 cols */}
            <div className="lg:col-span-2 space-y-4">
              <ScrollReveal variant="fade-left" delay={100}>
                {/* Chart placeholder */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <div className="relative h-48 flex items-end justify-around px-6 pb-6 pt-8 gap-2">
                    {/* Simulated bar chart */}
                    {[
                      { year: "2020", h: "35%", highlight: false },
                      { year: "2022", h: "52%", highlight: false },
                      { year: "2024", h: "68%", highlight: false },
                      { year: "2026", h: "78%", highlight: false },
                      { year: "2029", h: "100%", highlight: true },
                    ].map((bar) => (
                      <div key={bar.year} className="flex flex-col items-center gap-2 flex-1">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-700 ${
                            bar.highlight
                              ? "bg-[var(--zivel-gold)]/70"
                              : "bg-white/15"
                          }`}
                          style={{ height: bar.h }}
                        />
                        <span className="text-[10px] text-white/35 tracking-wide">{bar.year}</span>
                      </div>
                    ))}
                    {/* Y-axis label */}
                    <div className="absolute top-3 left-4 text-[10px] text-white/25 tracking-widest uppercase">Global Wellness Economy</div>
                  </div>
                  <div className="border-t border-white/8 px-5 py-3 flex items-center justify-between">
                    <span className="text-[11px] text-white/30">$4.5T → $9.8T projection</span>
                    <span className="text-[10px] text-[var(--zivel-gold)]/50 tracking-widest uppercase">Placeholder chart</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={160}>
                {/* Studio image placeholder */}
                <div className="rounded-2xl border border-white/10 overflow-hidden relative h-40">
                  <Image
                    src="/images/home/service-redlight.jpg"
                    alt="Zivel red light therapy studio — Recovery Economy market visual"
                    fill
                    className="object-cover opacity-40"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="text-xs text-white/60 font-semibold">Recovery Economy</p>
                    <p className="text-[10px] text-white/30 mt-0.5 tracking-widest uppercase">Replace with modality icons or infographic</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={200}>
                <div className="rounded-xl border border-[var(--zivel-gold)]/20 bg-[var(--zivel-gold)]/5 p-5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[var(--zivel-gold)] mb-2">Source Note</p>
                  <p className="text-xs text-white/35 leading-relaxed">
                    Market data sourced from Global Wellness Institute, Grand View Research, and Entrepreneur
                    franchise rankings. Replace placeholder chart with licensed data visualization when available.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Closing statement */}
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] px-8 md:px-12 py-10 text-center">
              <p className="zv-quote-mark mx-auto mb-4">&ldquo;</p>
              <p className="text-xl md:text-2xl font-serif font-light text-white leading-relaxed max-w-3xl mx-auto italic">
                Zivel is perfectly positioned at the intersection of explosive industry growth,
                proven membership economics, and consumer demand for science-backed results.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#franchise-form" className="zv-btn-gold px-10 py-4 text-sm font-semibold tracking-widest uppercase">
                  Explore Ownership →
                </a>
                <ViewInvestmentDetailsButton className="zv-btn-outline px-10 py-4 text-sm font-semibold tracking-widest uppercase">
                  View Investment Details
                </ViewInvestmentDetailsButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-gold" />

      {/* ── INVESTMENT AT A GLANCE ── */}
      <section id="investment" style={{ scrollMarginTop: "10rem" }} className="zv-bleed zv-section-elevated zv-immersive-section">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-12">
              <p className="zv-tagline mb-4">Transparent from Day One</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
                Investment at a Glance
              </h2>
              <div className="zv-gold-line mx-auto" />
            </div>
          </ScrollReveal>

          {/* Collapsible investment table — client component */}
          <FranchiseInvestmentReveal />

          <ScrollReveal variant="fade-up" delay={100}>
            <div className="mt-8 text-center">
              <a
                href="#franchise-form"
                className="zv-btn-gold inline-block px-10 py-4 text-sm font-semibold tracking-widest uppercase"
              >
                Request Full Investment Details →
              </a>
              <p className="mt-4 text-white/30 text-xs">
                We&rsquo;ll send you the complete breakdown plus available financing paths.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
      </InvestmentGateProvider>

      <div className="zv-divider-white" />

      {/* ── SUPPORT PILLARS ── */}
      <section id="support-training" style={{ scrollMarginTop: "10rem" }} className="zv-bleed zv-section-light zv-light zv-immersive-section">
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

          {/* CTA after support pillars */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-16 text-center">
              <p className="text-[#1a1a1a]/50 text-sm mb-6">
                Ready to see what owning a Zivel looks like in your market?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#franchise-form"
                  className="inline-block bg-[#1a1a1a] text-white text-sm font-semibold tracking-widest uppercase px-10 py-4 rounded-full hover:bg-black transition-colors duration-200"
                >
                  Request Franchise Info →
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-[#1a1a1a]/25 text-[#1a1a1a] text-sm font-semibold tracking-widest uppercase px-10 py-4 rounded-full hover:border-[#1a1a1a]/60 transition-colors duration-200"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ── PATH TO OWNERSHIP ── */}
      <section id="path-to-ownership" style={{ scrollMarginTop: "10rem" }} className="zv-bleed bg-black zv-immersive-section">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-20">
              <p className="zv-tagline mb-4">A Clear Path Forward</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
                Your Path to Ownership
              </h2>
              <div className="zv-gold-line mx-auto" />
              <p className="text-white/45 mt-6 text-sm max-w-lg mx-auto leading-relaxed">
                Eight focused steps from first conversation to grand opening — with our team
                alongside you at every stage.
              </p>
            </div>
          </ScrollReveal>

          {/* 2×4 card grid with image placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.n} variant="fade-up" delay={Math.floor(i / 2) * 80}>
                {/*
                  IMAGE PLACEHOLDER — Step {step.n}: {step.title}
                  Replace `image` in the STEPS array in page.tsx with the condensed step image.
                  Current: {step.image}
                */}
                <div className="group rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] hover:border-white/15 transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      className={`object-cover ${step.imagePosition ?? "object-center"} opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <span className="text-3xl font-serif text-[var(--zivel-gold)] leading-none opacity-80">{step.n}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-semibold text-white mb-2 tracking-wide">{step.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={200}>
            <div className="text-center mt-16">
              <p className="text-white/40 text-sm mb-6">Ready to start with Step 1?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#franchise-form" className="zv-btn-gold px-10 py-4 text-sm font-semibold tracking-widest uppercase">
                  Begin the Conversation →
                </a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="zv-btn-outline px-10 py-4 text-sm font-semibold tracking-widest uppercase">
                  Schedule Intro Call
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-gold" />

      {/* ── SERVICES & PATHWAYS ── */}
      <section id="services-pathways" style={{ scrollMarginTop: "10rem" }} className="zv-bleed zv-section-recessed zv-immersive-section">
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

          <ScrollReveal variant="fade-up" delay={100}>
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

          {/* CTA after services */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-12 text-center">
              <a
                href="#franchise-form"
                className="zv-btn-gold inline-block px-10 py-4 text-sm font-semibold tracking-widest uppercase"
              >
                Learn More — Request Franchise Info →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-white" />

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ scrollMarginTop: "10rem" }} className="zv-bleed zv-section-light-warm zv-light zv-immersive-section">
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
            <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#franchise-form"
                className="inline-block bg-[#1a1a1a] text-white text-sm font-semibold tracking-widest uppercase px-10 py-4 rounded-full hover:bg-black transition-colors duration-200"
              >
                Request Franchise Info →
              </a>
              <Link
                href="/locations"
                className="inline-block border border-[#1a1a1a]/25 text-[#1a1a1a] text-sm font-semibold tracking-widest uppercase px-10 py-4 rounded-full hover:border-[#1a1a1a]/60 transition-colors duration-200 text-center"
              >
                Explore Our Studios
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ── LEAD CAPTURE FORM ── */}
      <section id="franchise-form" style={{ scrollMarginTop: "10rem" }} className="zv-bleed bg-black zv-immersive-section">
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
                  Fill out Step 1 and we&rsquo;ll be in touch within one business day. You&rsquo;ll then have
                  the option to schedule a 1-on-1 Zoom intro call directly with our CEO.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    "Transparent investment numbers — no surprises",
                    "Exclusive territory support",
                    "Semi-absentee ownership available",
                    "0% required ad fund contribution",
                    "$9,500 veterans incentive available",
                    "Respond within 1 business day",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--zivel-gold)] flex-shrink-0 mt-1.5" />
                      <p className="text-sm text-white/60">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-white/10 p-6 bg-white/3">
                  <p className="text-xs text-white/40 leading-relaxed mb-4">
                    Prefer to talk first? Schedule directly:
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
