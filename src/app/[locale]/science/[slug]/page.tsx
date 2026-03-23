import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getScienceBySlug, scienceArticles } from "@/lib/data/science";
import { getRelatedServicesForScienceSlug } from "@/lib/data/serviceLinks";
import { getServiceBySlug } from "@/lib/data/services";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SITE_URL = "https://www.zivel.com";

export function generateStaticParams() {
  return scienceArticles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const a = getScienceBySlug(slug);
  if (!a) return {};
  const basePath = `/science/${a.slug}`;
  const enUrl = `${SITE_URL}${basePath}`;
  const esUrl = `${SITE_URL}/es${basePath}`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;
  return {
    title: `${a.title} | Zivel`,
    description: a.description,
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

export default async function ScienceArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getScienceBySlug(slug);
  if (!a) return notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.publishedDate,
    ...(a.updatedDate && { dateModified: a.updatedDate }),
    publisher: {
      "@type": "Organization",
      name: "Zivel Wellness",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/brand/zivel-logo.png` },
    },
    url: `${SITE_URL}/science/${a.slug}`,
    mainEntityOfPage: `${SITE_URL}/science/${a.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Science", item: `${SITE_URL}/science` },
      { "@type": "ListItem", position: 2, name: a.title, item: `${SITE_URL}/science/${a.slug}` },
    ],
  };

  const relatedServiceSlugs = getRelatedServicesForScienceSlug(a.slug);
  const relatedServices = relatedServiceSlugs.map(getServiceBySlug).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="space-y-0 -mt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ========== HEADER (DARK) ========== */}
      <section className="zv-bleed zv-hero-bg zv-noise relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-20" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <ScrollReveal variant="fade-up">
            <nav className="text-sm text-white/50 mb-6 zv-hero-animate-1">
              <Link href="/science" className="hover:text-white transition-colors">Science</Link>
              <span className="mx-2">/</span>
              <span className="text-white/70">{a.category}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight max-w-4xl zv-hero-animate-2">{a.title}</h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-3xl zv-hero-animate-3">{a.description}</p>
            <div className="mt-4 text-xs text-white/40 zv-hero-animate-4">
              Published {a.publishedDate}{a.readingTimeMinutes ? ` · ${a.readingTimeMinutes} min read` : ""}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== ARTICLE BODY (LIGHT) ========== */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal variant="fade-up">
            <article className="space-y-6">
              {a.body.map((b, i) => {
                if (b.type === "h2") return <h2 key={i} className="mt-10 font-serif text-2xl md:text-3xl font-light tracking-tight">{String(b.content)}</h2>;
                if (b.type === "ul") {
                  return (
                    <ul key={i} className="space-y-3 text-black/60">
                      {(b.content as string[]).map((li, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--zivel-gold)] flex-shrink-0" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-black/60 text-lg leading-relaxed">{String(b.content)}</p>;
              })}
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== RELATED ARTICLES (DARK) ========== */}
      {a.relatedSlugs?.length ? (
        <>
          <div className="zv-bleed zv-divider-dark-to-light" />
          <section className="zv-bleed zv-immersive-section zv-section-elevated">
            <div className="mx-auto max-w-6xl px-6">
              <ScrollReveal variant="fade-up">
                <p className="zv-tagline">Continue Reading</p>
                <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Related Articles</h2>
              </ScrollReveal>

              <div className="flex flex-wrap gap-4">
                {a.relatedSlugs.map((s, idx) => (
                  <ScrollReveal key={s} variant="fade-up" delay={idx * 80}>
                    <Link
                      href={`/science/${s}`}
                      className="zv-luxury-card block rounded-2xl px-6 py-4 group transition-all hover:-translate-y-0.5"
                    >
                      <span className="text-white/80 group-hover:text-[var(--zivel-gold)] transition-colors font-serif">
                        {s.replaceAll("-", " ")}
                      </span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* ========== RELATED SERVICES (LIGHT) ========== */}
      {relatedServices.length > 0 && (
        <>
          <div className="zv-bleed zv-divider-dark-to-light" />
          <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
            <div className="mx-auto max-w-6xl px-6">
              <ScrollReveal variant="fade-up">
                <p className="zv-tagline">Explore</p>
                <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Related Services</h2>
              </ScrollReveal>

              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {relatedServices.slice(0, 6).map((svc, idx) => (
                  <ScrollReveal key={svc.slug} variant="fade-up" delay={idx * 80}>
                    <Link
                      href={`/services/${svc.slug}`}
                      className="zv-luxury-card block rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="font-serif text-xl text-black/85 group-hover:text-[var(--zivel-gold-dark)] transition-colors">{svc.name}</div>
                      <p className="mt-2 text-sm text-black/50">Explore {svc.name} →</p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
