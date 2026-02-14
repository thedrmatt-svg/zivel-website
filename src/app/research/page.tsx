import Link from "next/link";
import { researchSources } from "@/lib/data/research";

export const metadata = {
  title: "Research Sources | Zivel",
  description: "Citations and sources referenced across Zivel service pages and science articles.",
};

export default function ResearchIndexPage() {
  return (
    <div className="space-y-0">
      <section className="zv-bleed zv-section-cool zv-noise py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 space-y-3">
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--zivel-gold)]">Evidence & Citations</p>
          <h1>Research Sources</h1>
          <p className="text-white/70 max-w-3xl">
            This page lists sources referenced across Zivel content. Each source links to the original publisher.
          </p>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      <section className="zv-bleed zv-section-gradient zv-noise py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {researchSources.map((s) => {
              const identifier = s.slug ?? s.id;
              return (
                <Link
                  key={identifier}
                  href={`/research/${identifier}`}
                  className="rounded-2xl zv-card-glass p-6 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="text-lg font-semibold text-white">{s.title}</div>
                  <div className="mt-2 text-sm text-white/70">{s.summary}</div>
                  <div className="mt-4 text-xs text-white/50">
                    {s.journal ?? s.source ?? ""}{s.year ? ` • ${s.year}` : ""}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
