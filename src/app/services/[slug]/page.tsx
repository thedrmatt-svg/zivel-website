import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BookingWidget from "@/components/booking/BookingWidget";
import { getServiceBySlug, services } from "@/lib/data/services";

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
  const service = getServiceBySlug(slug);
  if (!service) return notFound();


  const accentHex = service.accent?.hex ?? "#C9A24D"; // fallback gold

  const researchBaseHref =
    service.benefits.viewResearchCTA?.href ?? "/research";

  return (
    <div className="space-y-24">{/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden">
        {/* Background media */}
        {service.hero.media?.type === "image" ? (
          <div className="absolute inset-0">
            <Image
              src={service.hero.media.src}
              alt={service.hero.media.alt ?? service.name}
              fill
              priority
              className="object-cover"
            />
            {/* Gradient overlay: black -> transparent */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/10" />
          </div>
        ) : null}

        <div className="relative section py-20">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-60 md:opacity-40" style={{ background: accentHex }} />
          <div className="max-w-3xl space-y-6">
            <h1>{service.name}</h1>
            <p className="text-lg text-white/85">{service.hero.subheadline}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={service.hero.primaryCTA.href}
                style={{
                  backgroundColor: accentHex,
                  boxShadow: `0 0 32px ${accentHex}66`,
                }}
                className="rounded-xl px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                {service.hero.primaryCTA.label}
              </a>
              <Link
                href={service.hero.secondaryCTA.href}
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10"
              >
                {service.hero.secondaryCTA.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRO / WHAT IT IS */}
      <section className="section">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <h2>{service.intro.headline}</h2>
            <div className="space-y-4 text-white/70">
              {service.intro.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {service.intro.bullets?.length ? (
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {service.intro.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Media */}
          <div className="rounded-2xl border-subtle bg-card overflow-hidden">
            {service.intro.media?.type === "image" ? (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={service.intro.media.src}
                  alt={service.intro.media.alt ?? service.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center text-white/40">
                Intro media placeholder
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3 — BENEFITS GRID (WITH CITATIONS) */}
      <section className="section">
        <div className="flex items-end justify-between gap-6">
          <h2>{service.benefits.headline}</h2>

          {service.benefits.viewResearchCTA ? (
            <Link
              href={service.benefits.viewResearchCTA.href}
              className="text-sm font-medium text-white/70 hover:text-[var(--zivel-gold)]"
            >
              {service.benefits.viewResearchCTA.label}
            </Link>
          ) : null}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {service.benefits.items.map((b, idx) => (
            <div key={`${b.title}-${idx}`} className="rounded-2xl border-subtle bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg">{b.title}</h3>

                {/* Citation number(s) */}
                {b.citations?.length ? (
                  <div className="flex flex-wrap justify-end gap-2 text-xs text-white/60">
                    {b.citations.map((c, cIdx) => (
                      <a
                        key={`${c}-${cIdx}`}
                        href={`${researchBaseHref}#${c}`}
                        className="rounded-full border border-white/15 bg-white/5 px-2 py-1 hover:text-[var(--zivel-gold)]"
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
                <p className="mt-3 text-sm text-white/70">{b.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS / WHAT TO EXPECT */}
      <section className="section">
        <h2 className="mb-10">{service.howItWorks.headline}</h2>

        <div className="grid gap-6 md:grid-cols-4">
          {service.howItWorks.steps.map((s, idx) => (
            <div key={`${s.title}-${idx}`} className="rounded-2xl border-subtle bg-card p-6">
              <div className="text-xs font-semibold text-white/60">STEP {idx + 1}</div>
              <h3 className="mt-2 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-white/70">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — THE SCIENCE BEHIND IT */}
      <section className="section rounded-2xl border-subtle bg-card p-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2>{service.science.headline}</h2>
            <div className="space-y-3 text-sm text-white/70">
              {service.science.body.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {service.science.cta ? (
              <Link
                href={service.science.cta.href}
                className="inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10"
              >
                {service.science.cta.label}
              </Link>
            ) : null}
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/20">
            {service.science.media?.type === "image" ? (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={service.science.media.src}
                  alt={service.science.media.alt ?? `${service.name} science`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center text-white/40">
                Science diagram placeholder
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 6 — SAFETY & CONTRAINDICATIONS */}
      <section className="section">
        <h2 className="mb-10">Safety & Contraindications</h2>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border-subtle bg-card p-6">
            <h3 className="text-lg">{service.safety.headline}</h3>
            <div className="mt-3 space-y-3 text-sm text-white/70">
              {service.safety.body.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/50">{service.safety.disclaimer}</p>
          </div>

          <div className="rounded-2xl border-subtle bg-card p-6">
            <h3 className="text-lg">Contraindications</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {service.safety.contraindications.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 7 — BEFORE & AFTER (OPTIONAL) */}
      {service.beforeAfter ? (
        <section className="section">
          <h2 className="mb-10">{service.beforeAfter.headline}</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {service.beforeAfter.items.map((item, idx) => (
              <div
                key={`${item.beforeSrc}-${idx}`}
                className="rounded-2xl border-subtle bg-card p-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10">
                    <Image src={item.beforeSrc} alt={item.alt} fill className="object-cover" />
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10">
                    <Image src={item.afterSrc} alt={item.alt} fill className="object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-white/50">{service.beforeAfter.disclaimer}</p>
        </section>
      ) : null}

      {/* SECTION 8 — TESTIMONIALS */}
      <section className="section">
        <h2 className="mb-10">{service.testimonials.headline}</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {service.testimonials.items.map((t, idx) => (
            <div key={`${t.name}-${idx}`} className="rounded-2xl border-subtle bg-card p-6">
              <p className="text-sm text-white/70">&quot;{t.quote}&quot;</p>
              <div className="mt-4 text-sm font-semibold text-white">{t.name}</div>
              {t.location ? <div className="text-xs text-white/60">{t.location}</div> : null}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9 — PRICING PREVIEW */}
      <section className="section">
        <h2 className="mb-10">{service.pricingPreview.headline}</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {service.pricingPreview.cards.map((card, idx) => (
            <div key={`${card.title}-${idx}`} className="rounded-2xl border-subtle bg-card p-6">
              <div className="text-sm font-semibold text-white">{card.title}</div>
              <div className="mt-2 text-2xl font-bold text-white">{card.priceLine}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {card.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              {card.cta ? (
                <div className="mt-6">
                  <Link
                    href={card.cta.href}
                    className="inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10"
                  >
                    {card.cta.label}
                  </Link>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10 — BOOKING WIDGET */}
      <section id="book" className="section rounded-2xl border-subtle bg-card p-8">
        <div className="max-w-3xl">
          <h2 className="mb-3">{service.booking.headline}</h2>
          {service.booking.subheadline ? (
            <p className="text-white/70">{service.booking.subheadline}</p>
          ) : null}

          {service.booking.badges?.length ? (
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/70">
              {service.booking.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1"
                >
                  {b}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <BookingWidget className="mt-8" locationId={service.booking.locationIdDefault} />
      </section>

      {/* SECTION 11 — FAQ */}
      <section className="section">
        <h2 className="mb-10">{service.faqs.headline}</h2>

        <div className="space-y-4">
          {service.faqs.items.map((f, idx) => (
            <details key={`${f.question}-${idx}`} className="rounded-2xl border-subtle bg-card p-6">
              <summary className="cursor-pointer text-base font-semibold text-white">
                {f.question}
              </summary>
              <p className="mt-3 text-sm text-white/70">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* SECTION 12 — RELATED SERVICES */}
      <section className="section">
        <h2 className="mb-10">{service.relatedServices.headline}</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {service.relatedServices.slugs.map((relatedSlug) => {
            const related = getServiceBySlug(relatedSlug);
            const title = related?.name ?? relatedSlug.replaceAll("-", " ");
            const href = related ? `/services/${related.slug}` : "/services";

            return (
              <Link
                key={relatedSlug}
                href={href}
                className="rounded-2xl border-subtle bg-card p-6 hover:border-white/20 hover:bg-white/10"
              >
                <div className="text-lg font-semibold text-white">{title}</div>
                <div className="mt-2 text-sm text-white/70">
                  Explore this service and how it fits into a recovery stack.
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 13 — FINAL CTA STRIP */}
      <section className="section rounded-2xl border-subtle bg-black/60 p-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="m-0">{service.finalCTA.headline}</h2>

          <div className="flex flex-wrap gap-3">
            <a
              href={service.finalCTA.primaryCTA.href}
              className="rounded-xl bg-[var(--zivel-gold)] px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              {service.finalCTA.primaryCTA.label}
            </a>
            <Link
              href={service.finalCTA.secondaryCTA.href}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10"
            >
              {service.finalCTA.secondaryCTA.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
