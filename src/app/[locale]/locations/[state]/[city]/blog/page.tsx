import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blog";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SITE_URL = "https://www.zivel.com";

const LOCATION_BLOG_CONFIG: Record<
  string,
  {
    cityName: string;
    stateSlug: string;
    citySlug: string;
    bookingUrl: string;
    title: string;
    metaDescription: string;
    h1: string;
    subtitle: string;
    tagline: string;
  }
> = {
  bentonville: {
    cityName: "Bentonville",
    stateSlug: "arkansas",
    citySlug: "bentonville",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11443",
    title: "Zivel Bentonville Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Bentonville. Local tips on cryotherapy, red light therapy, infrared sauna, body contouring and more for the Bentonville, Rogers & Northwest Arkansas community.",
    h1: "Bentonville Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Bentonville team",
    tagline: "Insights from Northwest Arkansas",
  },
};

export async function generateStaticParams() {
  return Object.values(LOCATION_BLOG_CONFIG).map((loc) => ({
    state: loc.stateSlug,
    city: loc.citySlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; state: string; city: string }>;
}): Promise<Metadata> {
  const { city, state, locale } = await params;
  const cfg = LOCATION_BLOG_CONFIG[city];
  if (!cfg) return {};

  const canonicalPath = `/locations/${state}/${city}/blog`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const esUrl = `${SITE_URL}/es${canonicalPath}`;

  return {
    title: cfg.title,
    description: cfg.metaDescription,
    alternates: {
      canonical: locale === "es" ? esUrl : canonicalUrl,
      languages: {
        en: canonicalUrl,
        es: esUrl,
        "x-default": canonicalUrl,
      },
    },
  };
}

export default async function LocationBlogPage({
  params,
}: {
  params: Promise<{ locale: string; state: string; city: string }>;
}) {
  const { city, state } = await params;
  const cfg = LOCATION_BLOG_CONFIG[city];
  if (!cfg) notFound();

  return (
    <main className="space-y-0 -mt-20">
      <title>{cfg.title}</title>
      <meta name="description" content={cfg.metaDescription} />

      {/* HERO (DARK) */}
      <section className="zv-bleed zv-hero-bg zv-noise relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline zv-hero-animate-1">{cfg.tagline}</p>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl font-light tracking-tight zv-hero-animate-2">
              {cfg.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed zv-hero-animate-3">
              {cfg.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* BLOG GRID (LIGHT) */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((p, idx) => (
              <ScrollReveal key={p.slug} variant="fade-up" delay={idx * 80}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="zv-luxury-card block rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 text-xs text-black/45">
                    <span>{p.publishDate}</span>
                    <span className="h-1 w-1 rounded-full bg-[var(--zivel-gold)]" />
                    <span>{p.category}</span>
                    <span className="h-1 w-1 rounded-full bg-[var(--zivel-gold)]" />
                    <span>{p.readingTime}</span>
                  </div>
                  <div className="mt-3 font-serif text-xl text-black/85 group-hover:text-[var(--zivel-gold-dark)] transition-colors">
                    {p.title}
                  </div>
                  <p className="mt-3 text-sm text-black/55 leading-relaxed">
                    {p.description}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* BOTTOM ACTIONS */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/locations/${state}/${city}`}
                className="zv-btn-luxury zv-btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Zivel {cfg.cityName}
              </Link>
              <a
                href={cfg.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="zv-btn-luxury zv-btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase"
              >
                Book Now — {cfg.cityName}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
