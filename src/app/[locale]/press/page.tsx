import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PressGrid from "@/components/sections/PressGrid";
import { pressItems } from "@/lib/data/press";

const SITE_URL = "https://www.zivel.com";

export const metadata: Metadata = {
  title: "Press & Media",
  description:
    "Zivel Press and Media — Learn about our story, scientific research, media features, and wellness innovations in recovery and performance.",
  alternates: {
    canonical: `${SITE_URL}/press`,
    languages: {
      en: `${SITE_URL}/press`,
      "x-default": `${SITE_URL}/press`,
    },
  },
  openGraph: {
    title: "Press & Media | Zivel",
    description:
      "Zivel Press and Media — Learn about our story, scientific research, media features, and wellness innovations in recovery and performance.",
    url: `${SITE_URL}/press`,
    siteName: "Zivel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press & Media | Zivel",
    description:
      "Zivel Press and Media — Learn about our story, scientific research, media features, and wellness innovations in recovery and performance.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Zivel Press & Media",
  description:
    "Press coverage, media mentions, and franchise news about Zivel — a leading science-backed wellness brand.",
  url: `${SITE_URL}/press`,
  publisher: {
    "@type": "Organization",
    name: "Zivel",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/brand/zivel-logo.png`,
    },
  },
  mainEntity: pressItems.map((item) => ({
    "@type": "NewsArticle",
    headline: item.headline,
    description: item.excerpt,
    datePublished: item.date,
    url: item.url,
    publisher: {
      "@type": "Organization",
      name: item.publication,
    },
    about: {
      "@type": "Organization",
      name: "Zivel",
      url: SITE_URL,
    },
  })),
};

const featuredPubs = [
  "Club Solutions",
  "FOX 8 NOLA",
  "Entrepreneur",
  "Williamson Herald",
  "City Lifestyle",
  "DeSoto County News",
  "ABC4 Utah",
  "NWAhomepage",
];

export default function PressPage() {
  return (
    <main id="main-content" tabIndex={-1} className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO (DARK) ── */}
      <section className="zv-bleed zv-hero-bg zv-noise zv-immersive-section">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-5">In the News</p>
            <h1 className="zv-hero-animate-1 font-serif text-5xl md:text-7xl font-light tracking-tight text-white">
              Zivel in the Press
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={120}>
            <p className="zv-hero-animate-2 mx-auto mt-6 max-w-2xl text-lg md:text-xl text-white/60 leading-relaxed">
              Recognized by the best in wellness, recovery, and business.
            </p>
          </ScrollReveal>

          {/* Publication name strip */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {featuredPubs.map((pub) => (
                <span
                  key={pub}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50"
                >
                  {pub}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ── PRESS GRID (LIGHT) ── */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-3">Coverage</p>
            <h2 className="mb-4 font-serif text-4xl md:text-5xl font-light tracking-tight">
              Media Mentions
            </h2>
            <p className="mb-12 max-w-xl text-base text-black/55 leading-relaxed">
              Explore how Zivel is being covered across national outlets, wellness publications, franchise trade press, and local media.
            </p>
          </ScrollReveal>

          <PressGrid />
        </div>
      </section>

      {/* ── MEDIA KIT STRIP (DARK GRADIENT) ── */}
      <section className="zv-bleed zv-section-gradient zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <ScrollReveal variant="fade-up">
              <div className="zv-card-glass rounded-2xl p-8">
                <div className="mb-4 text-2xl">📰</div>
                <h3 className="mb-3 font-serif text-xl font-light text-white">Press Releases</h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  Official announcements about new location openings, franchise milestones, and brand partnerships.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={80}>
              <div className="zv-card-glass rounded-2xl p-8">
                <div className="mb-4 text-2xl">🖼️</div>
                <h3 className="mb-3 font-serif text-xl font-light text-white">Brand Assets</h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  High-resolution logos, photography, and brand guidelines for editorial and media use.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={160}>
              <div className="zv-card-glass rounded-2xl p-8">
                <div className="mb-4 text-2xl">🎙️</div>
                <h3 className="mb-3 font-serif text-xl font-light text-white">Expert Quotes</h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  Need a wellness recovery expert on deadline? Our team is available for rapid-turnaround commentary.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ── MEDIA INQUIRIES CTA (LIGHT) ── */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-5">Get in Touch</p>
            <h2 className="mb-6 font-serif text-4xl md:text-5xl font-light tracking-tight">
              Media Inquiries
            </h2>
            <p className="mb-10 text-base text-black/55 leading-relaxed max-w-xl mx-auto">
              Journalists, editors, and podcast producers — we welcome every conversation. Reach out for interviews, expert commentary, brand assets, or anything else your story needs.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <div className="rounded-2xl border border-black/10 bg-white shadow-sm p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 text-left">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--zivel-gold-dark)]">
                    Press Contact
                  </p>
                  <p className="font-serif text-lg font-light text-black/90">Zivel Communications</p>
                  <a
                    href="mailto:press@zivel.com"
                    className="mt-2 inline-block text-sm font-semibold text-[var(--zivel-gold-dark)] underline-offset-4 hover:underline"
                  >
                    press@zivel.com
                  </a>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--zivel-gold-dark)]">
                    Franchise Media
                  </p>
                  <p className="font-serif text-lg font-light text-black/90">Franchise Development</p>
                  <a
                    href="https://www.zivelfranchise.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-[var(--zivel-gold-dark)] underline-offset-4 hover:underline"
                  >
                    zivelfranchise.com →
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-black/[0.07] text-center">
                <p className="mb-6 text-sm text-black/55">
                  Prefer to send a full request? Use our contact form and select &ldquo;Media / Press&rdquo; from the subject line.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--zivel-gold)] px-8 py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)]"
                >
                  Send a Media Request →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── INTERNAL LINKS (DARK) ── */}
      <section className="zv-bleed zv-cta-bg zv-noise zv-immersive-section">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-5">Explore Zivel</p>
            <h2 className="mb-10 font-serif text-3xl md:text-4xl font-light tracking-tight text-white">
              Learn more about the brand behind the headlines
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={80}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/about"
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:border-[var(--zivel-gold)] hover:text-[var(--zivel-gold)]"
              >
                About Zivel
              </Link>
              <Link
                href="/science"
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:border-[var(--zivel-gold)] hover:text-[var(--zivel-gold)]"
              >
                The Science
              </Link>
              <a
                href="https://www.zivelfranchise.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--zivel-gold)] px-7 py-3 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)]"
              >
                Franchise Opportunities →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
