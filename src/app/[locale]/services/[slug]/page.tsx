import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BookingWidget from "@/components/booking/BookingWidget";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getServiceBySlug, services } from "@/lib/data/services";
import { pathways } from "@/lib/data/pathways";
import { getLinksForServiceSlug } from "@/lib/data/serviceLinks";
import { getScienceBySlug } from "@/lib/data/science";
import { getResearchBySlug } from "@/lib/data/research";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: {
      canonical: service.seo.canonical ?? `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  
  const __zivelSlug = slug;
  const __zivelColorMap: Record<string, number[]> = {
    "cryotherapy": [45, 100, 189],
    "red-light-therapy": [214, 69, 69],
    "infrared-sauna": [245, 158, 11],
    "dry-float": [34, 197, 94],
    "compression-therapy": [161, 161, 170],
    "cryo-slimming": [20, 184, 166],
    "cryo-toning": [59, 130, 246],
    "cryo-lift-facial": [251, 113, 133],
  };
  const __zivelRGB = __zivelColorMap[__zivelSlug] ?? [212, 175, 55];

  const service = getServiceBySlug(slug);
  if (!service) return notFound();

  const SITE_URL = "https://www.zivel.com";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.seo.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: "Zivel Wellness",
      url: SITE_URL,
    },
    serviceType: service.name,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  const faqSchema = service.faqs.items.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 2, name: service.name, item: `${SITE_URL}/services/${service.slug}` },
    ],
  };

  const links = getLinksForServiceSlug(service.slug);
  const linkedScience = links.science.map(getScienceBySlug).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const linkedResearch = links.research.map(getResearchBySlug).filter((r): r is NonNullable<typeof r> => Boolean(r));

  const relatedPathways = pathways.filter((p) =>
    (p.services?.orderedServiceSlugs ?? []).includes(service.slug)
  );

  const accentHex = service.accent?.hex ?? "#C9A24D";
  const accentRGB = `rgb(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]})`;

  const researchBaseHref =
    service.benefits.viewResearchCTA?.href ?? "/research";

  const serviceStyle = {
    "--zivel-service-r": __zivelRGB[0],
    "--zivel-service-g": __zivelRGB[1],
    "--zivel-service-b": __zivelRGB[2],
  } as CSSProperties;

  return (
    <div style={serviceStyle} data-zivel-service={__zivelSlug} className="space-y-0 zivel-service-page -mt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ========== SECTION 1 — FULL-SCREEN HERO (DARK) ========== */}
      <section className="zv-bleed relative min-h-[70vh] flex items-center" style={{ overflow: 'clip' }} aria-labelledby="service-hero-title">
        <div className="z-0" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100vw' }}>
          {service.hero.media?.type === "video" ? (
            <>
              <video
                src={service.hero.media.src}
                poster={service.hero.media.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
            </>
          ) : service.hero.media?.type === "image" ? (
            <>
              <Image
                src={service.hero.media.src}
                alt={service.hero.media.alt ?? service.name}
                fill
                priority
                sizes="100vw"
                quality={100}
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
            </>
          ) : null}

          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${accentRGB} 0%, transparent 70%)` }}
          />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{ background: `radial-gradient(circle, ${accentRGB} 0%, transparent 70%)` }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <p className="zv-tagline zv-hero-animate-1" style={{ color: accentRGB }}>
            {service.name.toUpperCase()}
          </p>

          <h1 id="service-hero-title" className="mt-4 font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight zv-hero-animate-2">
            {service.name}
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed zv-hero-animate-3">
            {service.hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 zv-hero-animate-4">
            <a
              href={service.hero.primaryCTA.href}
              className="zv-btn-luxury"
              style={{
                backgroundColor: accentRGB,
                boxShadow: `0 0 40px rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.3)`,
              }}
            >
              {service.hero.primaryCTA.label}
            </a>
            <Link
              href={service.hero.secondaryCTA.href}
              className="zv-btn-outline"
            >
              {service.hero.secondaryCTA.label}
            </Link>
          </div>
        </div>

      </section>

      <div className="zv-divider-dark-to-light zv-bleed" />

      {/* ========== SECTION 2 — INTRO / WHAT IT IS (LIGHT) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-light zv-light">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight">{service.intro.headline}</h2>
                <div className="zv-gold-line-left" />
                <div className="space-y-4 text-lg leading-relaxed">
                  {service.intro.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {service.intro.bullets?.length ? (
                  <ul className="mt-6 space-y-3 text-black/60">
                    {service.intro.bullets.map((b) => (
                      <li key={b} className="flex gap-3 items-start">
                        <span className="mt-2 h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: accentRGB }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: `1px solid rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.20)` }}>
                {service.intro.media?.type === "video" ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <video
                      src={service.intro.media.src}
                      poster={service.intro.media.poster}
                      autoPlay muted loop playsInline preload="none"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : service.intro.media?.type === "image" ? (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={service.intro.media.src}
                      alt={service.intro.media.alt ?? service.name}
                      fill loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={75}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center text-black/30 bg-black/[0.03]">
                    Intro media placeholder
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-dark-to-light zv-bleed" />

      {/* ========== SECTION 3 — BENEFITS GRID (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <div className="flex items-end justify-between gap-6 mb-12">
              <div>
                <p className="zv-tagline" style={{ color: accentRGB }}>Benefits</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">{service.benefits.headline}</h2>
              </div>

              {service.benefits.viewResearchCTA ? (
                <Link
                  href={service.benefits.viewResearchCTA.href}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors zv-gold-underline hidden md:inline"
                >
                  {service.benefits.viewResearchCTA.label}
                </Link>
              ) : null}
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.benefits.items.map((b, idx) => (
              <ScrollReveal key={`${b.title}-${idx}`} variant="fade-up" delay={idx * 80}>
                <div className="zv-luxury-card rounded-2xl p-8 h-full" style={{ "--luxury-accent": accentRGB } as CSSProperties}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl font-normal">{b.title}</h3>
                    {b.citations?.length ? (
                      <div className="flex flex-wrap justify-end gap-2 text-xs text-white/50">
                        {b.citations.map((c, cIdx) => (
                          <a
                            key={`${c}-${cIdx}`}
                            href={`${researchBaseHref}#${c}`}
                            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 hover:text-white transition-colors"
                            title={`Citation ${cIdx + 1}`}
                            aria-label={`Citation ${cIdx + 1}`}
                          >
                            {cIdx + 1}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  {b.description ? (
                    <p className="mt-4 text-sm text-white/60 leading-relaxed">{b.description}</p>
                  ) : null}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {service.benefits.viewResearchCTA ? (
            <div className="mt-8 md:hidden">
              <Link
                href={service.benefits.viewResearchCTA.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {service.benefits.viewResearchCTA.label}
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {/* ========== PATHWAYS THAT INCLUDE THIS SERVICE (LIGHT) ========== */}
      {relatedPathways.length ? (
        <>
          <div className="zv-divider-dark-to-light zv-bleed" />
          <section className="zv-bleed zv-immersive-section zv-section-light zv-light">
            <div className="mx-auto max-w-6xl px-6">
              <ScrollReveal variant="fade-up">
                <div className="flex items-end justify-between gap-6 mb-12">
                  <div>
                    <p className="zv-tagline" style={{ color: accentRGB }}>Pathways</p>
                    <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">Pathways That Include {service.name}</h2>
                  </div>
                  <Link
                    href="/pathways"
                    className="text-sm font-medium text-black/50 hover:text-black transition-colors zv-gold-underline hidden md:inline"
                  >
                    View all pathways
                  </Link>
                </div>
              </ScrollReveal>

              <div className="grid gap-6 md:grid-cols-3">
                {relatedPathways.map((p, idx) => (
                  <ScrollReveal key={p.slug} variant="fade-up" delay={idx * 100}>
                    <Link
                      href={`/pathways/${p.slug}`}
                      className="zv-luxury-card block rounded-2xl p-8 h-full group" style={{ "--luxury-accent": accentRGB } as CSSProperties}
                    >
                      <div className="font-serif text-xl text-black/85 group-hover:text-[var(--zivel-gold-dark)] transition-colors">{p.name}</div>
                      <p className="mt-3 text-sm leading-relaxed">{p.seo.description}</p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <div className="zv-divider-dark-to-light zv-bleed" />

      {/* ========== SECTION 4 — HOW IT WORKS (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-gradient">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline" style={{ color: accentRGB }}>The Experience</p>
            <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">{service.howItWorks.headline}</h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.howItWorks.steps.map((s, idx) => (
              <ScrollReveal key={`${s.title}-${idx}`} variant="fade-up" delay={idx * 120}>
                <div className="relative rounded-2xl p-8 h-full" style={{
                  background: `rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.05)`,
                  border: `1px solid rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.12)`,
                }}>
                  <div className="font-serif text-3xl font-light mb-4" style={{ color: `rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.4)` }}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-serif text-xl font-normal">{s.title}</h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-divider-dark-to-light zv-bleed" />

      {/* ========== SECTION 5 — THE SCIENCE BEHIND IT (LIGHT) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-light zv-light">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <p className="zv-tagline" style={{ color: accentRGB }}>The Science</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight">{service.science.headline}</h2>
                <div className="zv-gold-line-left" />
                <div className="space-y-4 leading-relaxed">
                  {service.science.body.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {service.science.cta ? (
                  <Link
                    href={service.science.cta.href}
                    className="zv-btn-outline inline-flex mt-4"
                  >
                    {service.science.cta.label}
                  </Link>
                ) : null}
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: `1px solid rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.20)` }}>
                {service.science.media?.type === "video" ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <video
                      src={service.science.media.src}
                      poster={service.science.media.poster}
                      autoPlay muted loop playsInline preload="none"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : service.science.media?.type === "image" ? (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={service.science.media.src}
                      alt={service.science.media.alt ?? `${service.name} science`}
                      fill loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={75}
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center text-black/30 bg-black/[0.03]">
                    Science diagram placeholder
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-dark-to-light zv-bleed" />

      {/* ========== SECTION 6 — SAFETY & CONTRAINDICATIONS (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-recessed">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline" style={{ color: accentRGB }}>Safety First</p>
            <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Safety & Contraindications</h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2">
            <ScrollReveal variant="fade-left">
              <div className="zv-luxury-card rounded-2xl p-8 h-full" style={{ "--luxury-accent": accentRGB } as CSSProperties}>
                <h3 className="font-serif text-2xl font-normal">{service.safety.headline}</h3>
                <div className="mt-5 space-y-4 text-white/70 leading-relaxed">
                  {service.safety.body.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
                <p className="mt-6 text-xs text-white/40 italic">{service.safety.disclaimer}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-right">
              <div className="zv-luxury-card rounded-2xl p-8 h-full" style={{ "--luxury-accent": accentRGB } as CSSProperties}>
                <h3 className="font-serif text-2xl font-normal">Contraindications</h3>
                <ul className="mt-5 space-y-3 text-white/70">
                  {service.safety.contraindications.map((c) => (
                    <li key={c} className="flex gap-3 items-start">
                      <span className="mt-2 h-2 w-2 rounded-full flex-shrink-0 bg-white/30" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== SECTION 7 — BEFORE & AFTER (LIGHT, OPTIONAL) ========== */}
      {service.beforeAfter ? (
        <>
          <div className="zv-divider-dark-to-light zv-bleed" />
          <section className="zv-bleed zv-immersive-section zv-section-light zv-light">
            <div className="mx-auto max-w-6xl px-6">
              <ScrollReveal variant="fade-up">
                <p className="zv-tagline" style={{ color: accentRGB }}>Results</p>
                <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">{service.beforeAfter.headline}</h2>
              </ScrollReveal>

              <div className="grid gap-8 md:grid-cols-2">
                {service.beforeAfter.items.map((item, idx) => (
                  <ScrollReveal key={`${item.src ?? item.beforeSrc}-${idx}`} variant="fade-up" delay={idx * 100}>
                    <div className="zv-luxury-card rounded-2xl overflow-hidden" style={{ "--luxury-accent": accentRGB } as CSSProperties}>
                      {item.src ? (
                        <div className="w-full overflow-hidden rounded-2xl" style={{ border: `1px solid rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.15)` }}>
                          <Image src={item.src} alt={item.alt} width={0} height={0} sizes="(max-width: 768px) 100vw, 50vw" quality={80} className="w-full h-auto block" loading="lazy" />
                        </div>
                      ) : (
                        <div className="p-6">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-xl" style={{ border: `1px solid rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.15)` }}>
                              <Image src={item.beforeSrc!} alt={`${item.alt} — before`} fill loading="lazy" sizes="(max-width: 768px) 50vw, 25vw" quality={75} className="object-cover" />
                            </div>
                            <div className="relative aspect-[4/5] overflow-hidden rounded-xl" style={{ border: `1px solid rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.15)` }}>
                              <Image src={item.afterSrc!} alt={`${item.alt} — after`} fill loading="lazy" sizes="(max-width: 768px) 50vw, 25vw" quality={75} className="object-cover" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <p className="mt-6 text-xs text-black/35 italic">{service.beforeAfter.disclaimer}</p>
            </div>
          </section>
        </>
      ) : null}

      <div className="zv-divider-dark-to-light zv-bleed" />

      {/* ========== SECTION 8 — TESTIMONIALS (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-elevated">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline" style={{ color: accentRGB }}>Testimonials</p>
            <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">{service.testimonials.headline}</h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {service.testimonials.items.map((t, idx) => (
              <ScrollReveal key={`${t.name}-${idx}`} variant="fade-up" delay={idx * 100}>
                <div className="zv-luxury-card rounded-2xl p-8 h-full flex flex-col" style={{ "--luxury-accent": accentRGB } as CSSProperties}>
                  <div className="zv-quote-mark font-serif" style={{ color: `rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.3)` }}>&ldquo;</div>
                  <p className="flex-1 text-white/80 italic leading-relaxed font-serif text-lg">{t.quote}</p>
                  <div className="mt-6 pt-4" style={{ borderTop: `1px solid rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.12)` }}>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    {t.location ? <div className="text-xs text-white/50 mt-0.5">{t.location}</div> : null}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-divider-dark-to-light zv-bleed" />

      {/* ========== SECTION 9 — PRICING (LIGHT) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-light zv-light">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <h2 className="mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">{service.pricingPreview.headline}</h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {service.pricingPreview.cards.map((card, idx) => {
              const isMemberRate = card.title === "Member Rate";
              const isSingleSession = card.title === "Single Session";
              return (
              <ScrollReveal key={`${card.title}-${idx}`} variant="fade-up" delay={idx * 100}>
                <div
                  className="rounded-2xl p-5 h-full flex flex-col relative overflow-hidden group"
                  style={{
                    "--luxury-accent": accentRGB,
                    backgroundColor: "white",
                    border: isMemberRate ? `2px solid var(--zivel-gold)` : "1px solid rgba(0,0,0,0.08)",
                    boxShadow: isMemberRate ? `0 0 16px rgba(212,175,55,0.25)` : "0 1px 4px rgba(0,0,0,0.06)",
                  } as CSSProperties}
                >
                  {isMemberRate && (
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "linear-gradient(135deg, transparent 0%, transparent 38%, rgba(212,175,55,0.18) 50%, transparent 62%, transparent 100%)",
                      }}
                    />
                  )}
                  <div className="text-sm font-semibold uppercase tracking-wider text-black/50">{card.title}</div>
                  {!isSingleSession && (
                    <div className={`mt-2 font-serif text-2xl ${isMemberRate ? "font-semibold text-[var(--zivel-gold-dark)]" : "font-light text-black/85"}`}>
                      {isMemberRate ? "Save with a Plan" : card.priceLine}
                    </div>
                  )}
                  <ul className="mt-4 flex-1 space-y-2 text-sm text-black/55">
                    {card.details.map((d) => (
                      <li key={d} className="flex gap-3 items-start">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentRGB }} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {card.cta && !isMemberRate ? (
                    <div className="mt-5">
                      <Link
                        href={card.cta.href}
                        className="zv-btn-outline inline-flex text-sm"
                      >
                        {card.cta.label}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="zv-divider-dark-to-light zv-bleed" />

      {/* ========== SECTION 10 — BOOKING WIDGET (DARK) ========== */}
      <section id="book" className="zv-bleed zv-immersive-section zv-section-gradient">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <div className="max-w-3xl">
              <p className="zv-tagline" style={{ color: accentRGB }}>Book Now</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">{service.booking.headline}</h2>
              {service.booking.subheadline ? (
                <p className="mt-4 text-lg text-white/60">{service.booking.subheadline}</p>
              ) : null}
            </div>

            <BookingWidget className="mt-10" locationId={service.booking.locationIdDefault} />
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-dark-to-light zv-bleed" />

      {/* ========== SECTION 11 — FAQ (LIGHT) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-light zv-light">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline" style={{ color: accentRGB }}>Questions</p>
            <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">{service.faqs.headline}</h2>
          </ScrollReveal>

          <div className="space-y-4 max-w-4xl">
            {service.faqs.items.map((f, idx) => (
              <ScrollReveal key={`${f.question}-${idx}`} variant="fade-up" delay={idx * 60}>
                <details className="group rounded-2xl p-6 md:p-8 transition-colors" style={{
                  background: `rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.04)`,
                  border: `1px solid rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.12)`,
                }}>
                  <summary className="cursor-pointer font-serif text-lg font-normal text-black/85 list-none flex items-center justify-between gap-4">
                    {f.question}
                    <span className="text-black/25 transition-transform group-open:rotate-45 text-2xl flex-shrink-0">+</span>
                  </summary>
                  <p className="mt-4 text-black/55 leading-relaxed">{f.answer}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-divider-dark-to-light zv-bleed" />

      {/* ========== SECTION 12 — RELATED SERVICES (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline" style={{ color: accentRGB }}>Explore More</p>
            <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Related &amp; Recommended Services</h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {service.relatedServices.slugs.map((relatedSlug, idx) => {
              const related = getServiceBySlug(relatedSlug);
              const title = related?.name ?? relatedSlug.replaceAll("-", " ");
              const href = related ? `/services/${related.slug}` : "/services";

              return (
                <ScrollReveal key={relatedSlug} variant="fade-up" delay={idx * 100}>
                  <Link
                    href={href}
                    className="zv-luxury-card block rounded-2xl p-8 h-full" style={{ "--luxury-accent": accentRGB } as CSSProperties}
                  >
                    <div className="font-serif text-2xl font-light text-white">{title}</div>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed">
                      Explore this service and how it fits into a recovery stack.
                    </p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== RELATED SCIENCE & RESEARCH (LIGHT) ========== */}
      {(linkedScience.length > 0 || linkedResearch.length > 0) ? (
        <>
          <div className="zv-divider-dark-to-light zv-bleed" />
          <section className="zv-bleed zv-immersive-section zv-section-light zv-light">
            <div className="mx-auto max-w-6xl px-6">
              <ScrollReveal variant="fade-up">
                <p className="zv-tagline" style={{ color: accentRGB }}>Evidence</p>
                <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Related Science & Research</h2>
              </ScrollReveal>

              <div className="grid gap-8 md:grid-cols-2">
                {linkedScience.length > 0 ? (
                  <ScrollReveal variant="fade-left">
                    <div className="zv-luxury-card rounded-2xl p-8" style={{ "--luxury-accent": accentRGB } as CSSProperties}>
                      <div className="text-xs font-semibold text-black/40 tracking-wider uppercase mb-6">Science Articles</div>
                      <div className="space-y-4">
                        {linkedScience.map((a) => (
                          <Link
                            key={a.slug}
                            href={`/science/${a.slug}`}
                            className="block rounded-xl p-4 transition-colors hover:bg-black/[0.03]"
                            style={{
                              border: `1px solid rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.12)`,
                              background: `rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.04)`,
                            }}
                          >
                            <div className="font-serif text-black/80">{a.title}</div>
                            {a.description ? (
                              <div className="mt-1 text-xs text-black/45 line-clamp-2">{a.description}</div>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ) : null}
                {linkedResearch.length > 0 ? (
                  <ScrollReveal variant="fade-right">
                    <div className="zv-luxury-card rounded-2xl p-8" style={{ "--luxury-accent": accentRGB } as CSSProperties}>
                      <div className="text-xs font-semibold text-black/40 tracking-wider uppercase mb-6">Research Sources</div>
                      <div className="space-y-4">
                        {linkedResearch.map((r) => (
                          <Link
                            key={r.slug ?? r.id}
                            href={`/research/${r.slug ?? r.id}`}
                            className="block rounded-xl p-4 transition-colors hover:bg-black/[0.03]"
                            style={{
                              border: `1px solid rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.12)`,
                              background: `rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.04)`,
                            }}
                          >
                            <div className="font-serif text-black/80">{r.title}</div>
                            {r.journal ? (
                              <div className="mt-1 text-xs text-black/45">{r.journal} {r.year ? `(${r.year})` : ""}</div>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ) : null}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <div className="zv-divider-gold zv-bleed" />

      {/* ========== SECTION 13 — FINAL CTA (DARK) ========== */}
      <section className="zv-bleed relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
            style={{ background: `radial-gradient(circle, ${accentRGB} 0%, transparent 70%)` }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <ScrollReveal variant="scale">
            <div className="text-center">
              <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight">{service.finalCTA.headline}</h2>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href={service.finalCTA.primaryCTA.href}
                  className="zv-btn-luxury"
                  style={{
                    backgroundColor: accentRGB,
                    boxShadow: `0 0 50px rgba(${__zivelRGB[0]}, ${__zivelRGB[1]}, ${__zivelRGB[2]}, 0.3)`,
                  }}
                >
                  {service.finalCTA.primaryCTA.label}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
