import type { Metadata } from "next";
import Link from "next/link";
import { scienceArticles } from "@/lib/data/science";
import { getServiceBySlug } from "@/lib/data/services";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SITE_URL = "https://www.zivel.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const enUrl = `${SITE_URL}/science`;
  const esUrl = `${SITE_URL}/es/science`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;
  return {
    title: "Science & Recovery Hub | Zivel",
    description:
      "Evidence-informed articles on recovery, performance, longevity, and modern wellness technology—written for clarity and practical use.",
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

const CATEGORY_BLURBS: Record<string, string> = {
  "Science Basics":
    "Foundational concepts that explain how recovery, stress, and adaptation work—without the jargon.",
  Recovery:
    "How modern recovery tools are used in real routines: what to expect, how to think about consistency, and how to stay safe.",
  Performance:
    "Performance is built through adaptation. These articles explain stress, recovery, and how routines support consistent progress.",
  "Anti-Aging":
    "A practical lens on skin, tissue support, and routines people associate with healthy aging—without hype.",
  Longevity:
    "Big-picture concepts and habits linked to long-term health: recovery capacity, consistency, and physiological resilience.",
};

function sortByFeaturedThenTitle(a: { featured?: boolean; title: string }, b: { featured?: boolean; title: string }) {
  const af = a.featured ? 1 : 0;
  const bf = b.featured ? 1 : 0;
  if (af !== bf) return bf - af;
  return String(a.title).localeCompare(String(b.title));
}

export default function ScienceIndexPage() {
  const grouped = scienceArticles.reduce<Record<string, typeof scienceArticles>>((acc, a) => {
    (acc[a.category] ||= []).push(a);
    return acc;
  }, {});

  const categoriesOrdered = Object.keys(grouped).sort((a, b) =>
    a.localeCompare(b)
  );

  const featured = [...scienceArticles]
    .filter((a) => a.featured)
    .sort(sortByFeaturedThenTitle)
    .slice(0, 6);

  return (
    <main className="space-y-0 -mt-20">
      <title>Science &amp; Recovery Hub | Zivel</title>
      <meta name="description" content="Evidence-informed articles on recovery, performance, longevity, and modern wellness technology—written for clarity and practical use." />
      {/* HERO (DARK) */}
      <section className="zv-bleed zv-hero-bg zv-noise relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline zv-hero-animate-1">Evidence-Informed</p>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl font-light tracking-tight zv-hero-animate-2">Science & Recovery Hub</h1>
            <p className="mt-6 max-w-3xl text-lg text-white/70 leading-relaxed zv-hero-animate-3">
              This hub collects evidence-informed explanations of recovery and
              wellness technologies—written for clarity and practical use.
            </p>

            <div className="mt-6 text-sm text-white/60 zv-hero-animate-4">
              Looking for citations?{" "}
              <Link
                href="/research"
                className="text-white/80 underline hover:text-[var(--zivel-gold)]"
              >
                View sources
              </Link>
              .
            </div>
          </ScrollReveal>
        </div>
      </section>

      {featured.length ? (
        <>
          <div className="zv-bleed zv-divider-dark-to-light" />

          {/* FEATURED (LIGHT) */}
          <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
            <div className="mx-auto max-w-6xl px-6">
              <ScrollReveal variant="fade-up">
                <p className="zv-tagline">Recommended</p>
                <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Start Here</h2>
              </ScrollReveal>

              <div className="grid gap-6 md:grid-cols-3">
                {featured.map((a, idx) => (
                  <ScrollReveal key={a.slug} variant="fade-up" delay={idx * 80}>
                    <Link
                      href={`/science/${a.slug}`}
                      className="zv-luxury-card block rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="font-serif text-xl text-black/85 group-hover:text-[var(--zivel-gold-dark)] transition-colors">{a.title}</div>
                      <p className="mt-3 text-sm text-black/55 leading-relaxed">{a.description}</p>

                      {a.relatedServiceSlugs?.length ? (
                        <div className="mt-4 text-xs text-black/60">
                          Related:{" "}
                          {a.relatedServiceSlugs.map((slug: string, i: number) => {
                            const s = getServiceBySlug(slug);
                            const label = s?.name ?? slug.replaceAll("-", " ");
                            return (
                              <span key={slug}>
                                <span className="text-black/60">{label}</span>
                                {i < (a.relatedServiceSlugs?.length ?? 0) - 1 ? ", " : ""}
                              </span>
                            );
                          })}
                        </div>
                      ) : null}

                      <div className="mt-4 text-xs text-black/60">
                        {a.readingTimeMinutes ? `${a.readingTimeMinutes} min read` : ""}
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* CATEGORIES (DARK) */}
      <section className="zv-bleed zv-immersive-section zv-section-gradient">
        <div className="mx-auto max-w-6xl px-6 space-y-16">
          {categoriesOrdered.map((cat, catIdx) => {
            const items = [...(grouped[cat] ?? [])].sort(sortByFeaturedThenTitle);
            return (
              <div key={cat}>
                {catIdx > 0 && <div className="zv-divider-white mb-16" />}
                <ScrollReveal variant="fade-up">
                  <div className="space-y-3 max-w-3xl mb-10">
                    <p className="zv-tagline">{cat}</p>
                    <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight">{cat}</h2>
                    {CATEGORY_BLURBS[cat] ? (
                      <p className="text-white/60 leading-relaxed">{CATEGORY_BLURBS[cat]}</p>
                    ) : null}
                  </div>
                </ScrollReveal>

                <div className="grid gap-6 md:grid-cols-3">
                  {items.map((a, idx) => (
                    <ScrollReveal key={a.slug} variant="fade-up" delay={idx * 80}>
                      <Link
                        href={`/science/${a.slug}`}
                        className="zv-luxury-card block rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <div className="font-serif text-lg text-white group-hover:text-[var(--zivel-gold)] transition-colors">
                          {a.title}
                        </div>
                        <p className="mt-3 text-sm text-white/60 leading-relaxed">
                          {a.description}
                        </p>

                        {a.relatedServiceSlugs?.length ? (
                          <div className="mt-4 text-xs text-white/65">
                            Related:{" "}
                            {a.relatedServiceSlugs.map((slug: string, i: number) => {
                              const s = getServiceBySlug(slug);
                              const label = s?.name ?? slug.replaceAll("-", " ");
                              return (
                                <span key={slug}>
                                  <span className="text-white/60">{label}</span>
                                  {i < (a.relatedServiceSlugs?.length ?? 0) - 1 ? ", " : ""}
                                </span>
                              );
                            })}
                          </div>
                        ) : null}

                        <div className="mt-4 text-xs text-white/60">
                          {a.readingTimeMinutes ? `${a.readingTimeMinutes} min read` : ""}
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* FOOTER NOTE (LIGHT) */}
      <section className="zv-bleed zv-section-light zv-light py-12">
        <div className="mx-auto max-w-6xl px-6 text-sm text-black/65">
          Science articles reference peer-reviewed research.{" "}
          <Link
            href="/research"
            className="text-black/75 underline hover:text-[var(--zivel-gold-dark)]"
          >
            View sources →
          </Link>
        </div>
      </section>
    </main>
  );
}
