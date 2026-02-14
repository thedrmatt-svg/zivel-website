import Link from "next/link";
import { scienceArticles } from "@/lib/data/science";
import { getServiceBySlug } from "@/lib/data/services";

export const metadata = {
  title: "Science & Recovery Hub | Zivel",
  description:
    "Evidence-informed articles on recovery, performance, longevity, and modern wellness technology—written for clarity and practical use.",
};

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
    <div className="space-y-0">
      <section className="zv-bleed zv-section-cool zv-noise py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 space-y-4">
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--zivel-gold)]">Evidence-Informed</p>
          <h1>Science & Recovery Hub</h1>
          <p className="text-white/70 max-w-3xl">
            This hub collects evidence-informed explanations of recovery and
            wellness technologies—written for clarity and practical use. The goal
            is to help readers understand what people use these tools for, what to
            expect, and how to think about routines without hype.
          </p>

          <div className="text-sm text-white/60">
            Looking for citations?{" "}
            <Link
              href="/research"
              className="text-white/80 underline hover:text-[var(--zivel-gold)]"
            >
              View sources
            </Link>
            .
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      {featured.length ? (
        <>
          <section className="zv-bleed zv-section-elevated zv-noise py-16">
            <div className="mx-auto max-w-6xl px-4 space-y-5">
              <h2 className="text-xl">Start here</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {featured.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/science/${a.slug}`}
                    className="rounded-2xl zv-card-glass p-6 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="text-lg font-semibold text-white">{a.title}</div>
                    <div className="mt-2 text-sm text-white/70">{a.description}</div>

                    {a.relatedServiceSlugs?.length ? (
                      <div className="mt-4 text-xs text-white/55">
                        Related:{" "}
                        {a.relatedServiceSlugs.map((slug: string, i: number) => {
                          const s = getServiceBySlug(slug);
                          const label = s?.name ?? slug.replaceAll("-", " ");
                          return (
                            <span key={slug}>
                              <span className="text-white/70">{label}</span>
                              {i < (a.relatedServiceSlugs?.length ?? 0) - 1 ? ", " : ""}
                            </span>
                          );
                        })}
                      </div>
                    ) : null}

                    <div className="mt-4 text-xs text-white/50">
                      {a.readingTimeMinutes ? `${a.readingTimeMinutes} min read` : ""}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <div className="zv-bleed zv-divider-white" />
        </>
      ) : null}

      <section className="zv-bleed zv-section-gradient zv-noise py-16">
        <div className="mx-auto max-w-6xl px-4 space-y-10">
          {categoriesOrdered.map((cat, catIdx) => {
            const items = [...(grouped[cat] ?? [])].sort(sortByFeaturedThenTitle);
            return (
              <div key={cat}>
                {catIdx > 0 && <div className="zv-divider-white mb-10" />}
                <div className="space-y-4">
                  <div className="space-y-2 max-w-3xl">
                    <h2 className="text-xl">{cat}</h2>
                    {CATEGORY_BLURBS[cat] ? (
                      <p className="text-white/65 text-sm">{CATEGORY_BLURBS[cat]}</p>
                    ) : null}
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {items.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/science/${a.slug}`}
                        className="rounded-2xl zv-card-glass p-6 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <div className="text-lg font-semibold text-white">
                          {a.title}
                        </div>
                        <div className="mt-2 text-sm text-white/70">
                          {a.description}
                        </div>

                        {a.relatedServiceSlugs?.length ? (
                          <div className="mt-4 text-xs text-white/55">
                            Related:{" "}
                            {a.relatedServiceSlugs.map((slug: string, i: number) => {
                              const s = getServiceBySlug(slug);
                              const label = s?.name ?? slug.replaceAll("-", " ");
                              return (
                                <span key={slug}>
                                  <span className="text-white/70">{label}</span>
                                  {i < (a.relatedServiceSlugs?.length ?? 0) - 1 ? ", " : ""}
                                </span>
                              );
                            })}
                          </div>
                        ) : null}

                        <div className="mt-4 text-xs text-white/50">
                          {a.readingTimeMinutes ? `${a.readingTimeMinutes} min read` : ""}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      <section className="zv-bleed zv-section-recessed py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-white/60">
          Science articles reference peer-reviewed research.{" "}
          <Link
            href="/research"
            className="text-white/80 underline hover:text-[var(--zivel-gold)]"
          >
            View sources →
          </Link>
        </div>
      </section>
    </div>
  );
}
