import Link from "next/link";
import { pathways } from "@/lib/data/pathways";

export const metadata = {
  title: "Pathways | Zivel",
  description:
    "Goal-based wellness pathways built from Zivel services—designed to make routines clear, repeatable, and easy to book.",
};

export default function PathwaysIndexPage() {
  return (
    <main className="space-y-0">
      <section className="zv-bleed zv-hero-bg zv-noise py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 space-y-3">
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--zivel-gold)]">Goal-Based Wellness</p>
          <h1>Pathways</h1>
          <p className="text-white/70 max-w-2xl">
            Goal-based routines that combine Zivel services into structured, repeatable wellness experiences.
          </p>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      <section className="zv-bleed zv-section-gradient zv-noise py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {pathways.map((p) => (
              <Link
                key={p.slug}
                href={`/pathways/${p.slug}`}
                className="rounded-2xl zv-card-glass p-6 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="text-lg font-semibold text-white">{p.name}</div>
                <p className="mt-2 text-sm text-white/70">{p.seo.description}</p>
                <div className="mt-4 text-sm font-medium text-[var(--zivel-gold)]">
                  View Pathway →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
