import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPathwayBySlug, pathways } from "@/lib/data/pathways";
import { getServiceBySlug } from "@/lib/data/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pathways.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pathway = getPathwayBySlug(slug);
  if (!pathway) return {};
  return {
    title: pathway.seo.title,
    description: pathway.seo.description,
    alternates: { canonical: pathway.seo.canonical ?? `/pathways/${pathway.slug}` },
  };
}

export default async function PathwayPage({ params }: PageProps) {
  const { slug } = await params;
  const pathway = getPathwayBySlug(slug);
  if (!pathway) return notFound();

  return (
    <main className="space-y-24">
      {/* HERO */}
      <section className="section">
        <div className="rounded-2xl border-subtle bg-card p-10">
          <div className="max-w-3xl space-y-5">
            <h1>{pathway.hero.headline}</h1>
            <p className="text-lg text-white/80">{pathway.hero.subheadline}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={pathway.hero.primaryCTA.href}
                className="rounded-xl bg-[var(--zivel-gold)] px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                {pathway.hero.primaryCTA.label}
              </Link>
              <Link
                href={pathway.hero.secondaryCTA.href}
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10"
              >
                {pathway.hero.secondaryCTA.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section">
        <h2 className="mb-6">{pathway.whoItsFor.headline}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-white/70">
            {pathway.whoItsFor.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {pathway.whoItsFor.note ? (
              <p className="text-xs text-white/50">{pathway.whoItsFor.note}</p>
            ) : null}
          </div>

          {pathway.whoItsFor.bullets?.length ? (
            <div className="rounded-2xl border-subtle bg-card p-6">
              <ul className="space-y-2 text-sm text-white/70">
                {pathway.whoItsFor.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--zivel-gold)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* GOAL */}
      <section className="section">
        <h2 className="mb-6">{pathway.goal.headline}</h2>
        <div className="space-y-4 text-white/70">
          {pathway.goal.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2>{pathway.services.headline}</h2>
            {pathway.services.intro ? (
              <p className="mt-2 text-white/70">{pathway.services.intro}</p>
            ) : null}
          </div>
          <Link
            href="/services"
            className="text-sm font-medium text-white/70 hover:text-[var(--zivel-gold)]"
          >
            View all services →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pathway.services.orderedServiceSlugs.map((svcSlug) => {
            const svc = getServiceBySlug(svcSlug);
            const href = svc ? `/services/${svc.slug}` : "/services";
            const title = svc?.name ?? svcSlug.replaceAll("-", " ");

            return (
              <Link
                key={svcSlug}
                href={href}
                className="rounded-2xl border-subtle bg-card p-6 hover:border-white/20 hover:bg-white/10"
              >
                <div className="text-lg font-semibold text-white">{title}</div>
                <p className="mt-2 text-sm text-white/70">
                  Explore how this modality fits into the pathway routine.
                </p>
              </Link>
            );
          })}
        </div>

        {pathway.services.note ? (
          <p className="mt-6 text-xs text-white/50">{pathway.services.note}</p>
        ) : null}
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <h2 className="mb-6">{pathway.howItWorks.headline}</h2>
        <div className="rounded-2xl border-subtle bg-card p-6">
          <ul className="space-y-2 text-sm text-white/70">
            {pathway.howItWorks.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SCIENCE */}
      <section className="section rounded-2xl border-subtle bg-card p-8">
        <div className="max-w-3xl space-y-4">
          <h2>{pathway.science.headline}</h2>
          <div className="space-y-3 text-sm text-white/70">
            {pathway.science.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Link
            href={pathway.science.cta.href}
            className="inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10"
          >
            {pathway.science.cta.label}
          </Link>
        </div>
      </section>

      {/* FREQUENCY */}
      <section className="section">
        <h2 className="mb-6">{pathway.frequency.headline}</h2>
        <div className="space-y-4 text-white/70">
          {pathway.frequency.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {pathway.frequency.bullets?.length ? (
          <div className="mt-6 rounded-2xl border-subtle bg-card p-6">
            <ul className="space-y-2 text-sm text-white/70">
              {pathway.frequency.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--zivel-gold)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {/* FINAL CTA */}
      <section className="section rounded-2xl border-subtle bg-black/60 p-10">
        <div className="max-w-4xl space-y-4">
          <h2 className="m-0">{pathway.finalCTA.headline}</h2>
          <div className="space-y-3 text-white/70">
            {pathway.finalCTA.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={pathway.finalCTA.primaryCTA.href}
              className="rounded-xl bg-[var(--zivel-gold)] px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              {pathway.finalCTA.primaryCTA.label}
            </Link>
            <Link
              href={pathway.finalCTA.secondaryCTA.href}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10"
            >
              {pathway.finalCTA.secondaryCTA.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Related pathways */}
      {pathway.relatedPathwaySlugs?.length ? (
        <section className="section">
          <h2 className="mb-6">Related Pathways</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pathway.relatedPathwaySlugs.map((rpSlug) => (
              <Link
                key={rpSlug}
                href={`/pathways/${rpSlug}`}
                className="rounded-2xl border-subtle bg-card p-6 hover:border-white/20 hover:bg-white/10"
              >
                <div className="text-lg font-semibold text-white">
                  {rpSlug.replaceAll("-", " ")}
                </div>
                <p className="mt-2 text-sm text-white/70">
                  This pathway will be published soon.
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
