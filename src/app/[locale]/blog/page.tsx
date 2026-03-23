import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SITE_URL = "https://www.zivel.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const enUrl = `${SITE_URL}/blog`;
  const esUrl = `${SITE_URL}/es/blog`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;
  return {
    title: "Blog | Zivel",
    description: "Evidence-informed wellness, recovery, and longevity education.",
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

export default function BlogIndexPage() {
  return (
    <main className="space-y-0 -mt-20">
      {/* HERO (DARK) */}
      <section className="zv-bleed zv-hero-bg zv-noise relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline zv-hero-animate-1">Insights & Education</p>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl font-light tracking-tight zv-hero-animate-2">Blog</h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed zv-hero-animate-3">
              Clear, science-led insights on recovery, performance, and longevity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* GRID (LIGHT) */}
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
                  <div className="mt-3 font-serif text-xl text-black/85 group-hover:text-[var(--zivel-gold-dark)] transition-colors">{p.title}</div>
                  <p className="mt-3 text-sm text-black/55 leading-relaxed">{p.description}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
