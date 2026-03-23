import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPathwayBySlug, pathways } from "@/lib/data/pathways";
import { getServiceBySlug } from "@/lib/data/services";
import ScrollReveal from "@/components/ui/ScrollReveal";

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

const SITE_URL = "https://www.zivel.com";

export function generateStaticParams() {
  return pathways.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const pathway = getPathwayBySlug(slug);
  if (!pathway) return {};
  const basePath = `/pathways/${pathway.slug}`;
  const enUrl = `${SITE_URL}${basePath}`;
  const esUrl = `${SITE_URL}/es${basePath}`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;
  return {
    title: pathway.seo.title,
    description: pathway.seo.description,
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

export default async function PathwayPage({ params }: PageProps) {
  const { slug } = await params;
  const pathway = getPathwayBySlug(slug);
  if (!pathway) return notFound();

  return (
    <main className="space-y-0 -mt-20">
      {/* ========== HERO (DARK) ========== */}
      <section className="zv-bleed zv-hero-bg zv-noise relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <ScrollReveal variant="fade-up">
            <div className="max-w-3xl space-y-5">
              <p className="zv-tagline zv-hero-animate-1">Pathway</p>
              <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight zv-hero-animate-2">{pathway.hero.headline}</h1>
              <p className="text-lg text-white/75 leading-relaxed zv-hero-animate-3">{pathway.hero.subheadline}</p>

              <div className="flex flex-wrap gap-4 pt-2 zv-hero-animate-4">
                <Link
                  href={pathway.hero.primaryCTA.href}
                  className="zv-btn-luxury zv-btn-gold"
                >
                  {pathway.hero.primaryCTA.label}
                </Link>
                <Link
                  href={pathway.hero.secondaryCTA.href}
                  className="zv-btn-luxury zv-btn-outline"
                >
                  {pathway.hero.secondaryCTA.label}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== WHO IT'S FOR (LIGHT) ========== */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline">Who It&apos;s For</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">{pathway.whoItsFor.headline}</h2>
            <div className="zv-gold-line-left mt-6" />
          </ScrollReveal>

          <div className="mt-10 grid gap-12 md:grid-cols-2">
            <ScrollReveal variant="fade-left">
              <div className="space-y-4 text-lg leading-relaxed">
                {pathway.whoItsFor.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {pathway.whoItsFor.note ? (
                  <p className="text-xs text-black/40 italic">{pathway.whoItsFor.note}</p>
                ) : null}
              </div>
            </ScrollReveal>

            {pathway.whoItsFor.bullets?.length ? (
              <ScrollReveal variant="fade-right">
                <div className="zv-luxury-card rounded-2xl p-8">
                  <ul className="space-y-3 text-sm text-black/60">
                    {pathway.whoItsFor.bullets.map((b) => (
                      <li key={b} className="flex gap-3 items-start">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--zivel-gold)] flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ) : null}
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== GOAL (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-recessed">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline">The Goal</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">{pathway.goal.headline}</h2>
            <div className="zv-gold-line-left mt-6" />
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <div className="mt-10 space-y-4 text-white/70 text-lg leading-relaxed max-w-3xl">
              {pathway.goal.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== SERVICES (LIGHT) ========== */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <div className="flex items-end justify-between gap-6 mb-12">
              <div>
                <p className="zv-tagline">Included Services</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">{pathway.services.headline}</h2>
                {pathway.services.intro ? (
                  <p className="mt-3 text-black/55 max-w-2xl">{pathway.services.intro}</p>
                ) : null}
              </div>
              <Link
                href="/services"
                className="text-sm font-medium text-black/50 hover:text-black transition-colors zv-gold-underline hidden md:inline"
              >
                View all services →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {pathway.services.orderedServiceSlugs.map((svcSlug, idx) => {
              const svc = getServiceBySlug(svcSlug);
              const href = svc ? `/services/${svc.slug}` : "/services";
              const title = svc?.name ?? svcSlug.replaceAll("-", " ");

              return (
                <ScrollReveal key={svcSlug} variant="fade-up" delay={idx * 100}>
                  <Link
                    href={href}
                    className="zv-luxury-card block rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="font-serif text-xl text-black/85 group-hover:text-[var(--zivel-gold-dark)] transition-colors">{title}</div>
                    <p className="mt-3 text-sm text-black/55 leading-relaxed">
                      Explore how this modality fits into the pathway routine.
                    </p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {pathway.services.note ? (
            <p className="mt-6 text-xs text-black/40 italic">{pathway.services.note}</p>
          ) : null}
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== HOW IT WORKS (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-elevated">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline">The Process</p>
            <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">{pathway.howItWorks.headline}</h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pathway.howItWorks.bullets.map((b, idx) => (
              <ScrollReveal key={b} variant="fade-up" delay={idx * 80}>
                <div className="zv-luxury-card rounded-2xl p-8 h-full">
                  <div className="font-serif text-2xl font-light text-white/25 mb-3">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <p className="text-white/70 leading-relaxed">{b}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== SCIENCE (LIGHT) ========== */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <div className="max-w-3xl space-y-6">
              <p className="zv-tagline">The Science</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight">{pathway.science.headline}</h2>
              <div className="zv-gold-line-left" />
              <div className="space-y-4 text-lg leading-relaxed">
                {pathway.science.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Link
                href={pathway.science.cta.href}
                className="zv-btn-outline inline-flex mt-4"
              >
                {pathway.science.cta.label}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== FREQUENCY (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-gradient">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline">Recommended Frequency</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">{pathway.frequency.headline}</h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <div className="mt-10 space-y-4 text-white/70 text-lg leading-relaxed max-w-3xl">
              {pathway.frequency.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </ScrollReveal>

          {pathway.frequency.bullets?.length ? (
            <ScrollReveal variant="fade-up" delay={200}>
              <div className="mt-8 zv-luxury-card rounded-2xl p-8 max-w-3xl">
                <ul className="space-y-3 text-sm text-white/70">
                  {pathway.frequency.bullets.map((b) => (
                    <li key={b} className="flex gap-3 items-start">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--zivel-gold)] flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ) : null}
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      {/* ========== FINAL CTA (DARK) ========== */}
      <section className="zv-bleed relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 zv-glow-gold opacity-20" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <ScrollReveal variant="scale">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight">{pathway.finalCTA.headline}</h2>
              <div className="space-y-3 text-white/70 text-lg leading-relaxed">
                {pathway.finalCTA.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  href={pathway.finalCTA.primaryCTA.href}
                  className="zv-btn-luxury zv-btn-gold"
                >
                  {pathway.finalCTA.primaryCTA.label}
                </Link>
                <Link
                  href={pathway.finalCTA.secondaryCTA.href}
                  className="zv-btn-luxury zv-btn-outline"
                >
                  {pathway.finalCTA.secondaryCTA.label}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== RELATED PATHWAYS (LIGHT, optional) ========== */}
      {pathway.relatedPathwaySlugs?.length ? (
        <>
          <div className="zv-bleed zv-divider-dark-to-light" />
          <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
            <div className="mx-auto max-w-6xl px-6">
              <ScrollReveal variant="fade-up">
                <p className="zv-tagline">Explore More</p>
                <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Related Pathways</h2>
              </ScrollReveal>

              <div className="grid gap-6 md:grid-cols-3">
                {pathway.relatedPathwaySlugs.map((rpSlug, idx) => (
                  <ScrollReveal key={rpSlug} variant="fade-up" delay={idx * 100}>
                    <Link
                      href={`/pathways/${rpSlug}`}
                      className="zv-luxury-card block rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="font-serif text-xl text-black/85 group-hover:text-[var(--zivel-gold-dark)] transition-colors">
                        {rpSlug.replaceAll("-", " ")}
                      </div>
                      <p className="mt-3 text-sm text-black/55 leading-relaxed">
                        This pathway will be published soon.
                      </p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
