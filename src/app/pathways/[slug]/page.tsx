import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pathways, getPathwayBySlug } from "@/lib/data/pathways";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pathways.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pw = getPathwayBySlug(slug);
  if (!pw) return {};
  return {
    title: `${pw.name} Pathway | Zivel`,
    description: pw.description,
    alternates: { canonical: `/pathways/${pw.slug}` },
  };
}

export default async function PathwayDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pw = getPathwayBySlug(slug);
  if (!pw) return notFound();

  return (
    <main className="section space-y-16">
      <nav className="text-sm text-white/60">
        <Link href="/pathways" className="hover:text-white">
          Pathways
        </Link>{" "}
        / {pw.name}
      </nav>

      <header className="space-y-4">
        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium capitalize text-white/70">
          {pw.category}
        </span>
        <h1>{pw.name}</h1>
        <p className="max-w-3xl text-lg text-white/70">{pw.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-white/60">
          <span>Total: {pw.totalDuration}</span>
          <span>{pw.steps.length} services</span>
        </div>
      </header>

      <section className="space-y-4">
        <h2>Ideal For</h2>
        <ul className="space-y-2">
          {pw.idealFor.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-white/70">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--zivel-gold)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        <h2>Your Session</h2>
        <div className="space-y-4">
          {pw.steps.map((step) => (
            <div
              key={step.serviceSlug}
              className="relative rounded-2xl border border-white/10 bg-white/4 p-6"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--zivel-gold)] text-sm font-bold text-black">
                  {step.order}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{step.serviceName}</h3>
                    <span className="text-xs text-white/50">{step.duration}</span>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{step.description}</p>
                </div>
              </div>
              <div className="mt-3 pl-12">
                <Link
                  href={`/services/${step.serviceSlug}`}
                  className="text-xs font-medium text-[var(--zivel-gold)] hover:underline"
                >
                  Learn about {step.serviceName} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2>Benefits</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pw.benefits.map((b, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/4 p-5"
            >
              <h3 className="text-base font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-white/70">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/4 p-8">
        <h2>The Science</h2>
        <p className="mt-3 text-white/70">{pw.scienceNote}</p>
        <div className="mt-5">
          <Link
            href="/research"
            className="text-sm font-medium text-[var(--zivel-gold)] hover:underline"
          >
            Explore the research library →
          </Link>
        </div>
      </section>

      {pw.testimonials.length > 0 && (
        <section className="space-y-6">
          <h2>What Clients Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pw.testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="rounded-2xl border border-white/10 bg-white/4 p-6"
              >
                <p className="text-sm italic text-white/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4 text-xs text-white/50">
                  — {t.name}
                  {t.location ? `, ${t.location}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {pw.faqs.length > 0 && (
        <section className="space-y-6">
          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {pw.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/4"
              >
                <summary className="cursor-pointer select-none px-6 py-4 text-sm font-semibold text-white hover:text-[var(--zivel-gold)]">
                  {faq.question}
                </summary>
                <div className="border-t border-white/10 px-6 py-4 text-sm text-white/70">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-white/10 bg-white/4 p-8 text-center">
        <h2>Ready to feel the difference?</h2>
        <p className="mt-3 text-white/70">
          Book your {pw.name} pathway and experience a curated recovery session.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/#book"
            className="rounded-xl bg-[var(--zivel-gold)] px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
          >
            Book Now
          </Link>
          <Link
            href="/locations"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10"
          >
            Find a Location
          </Link>
        </div>
      </section>
    </main>
  );
}
