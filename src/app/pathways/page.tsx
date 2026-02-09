import Link from "next/link";
import { pathways } from "@/lib/data/pathways";

export const metadata = {
  title: "Pathways | Zivel",
  description:
    "Goal-based wellness pathways built from Zivel services—designed to make routines clear, repeatable, and easy to book.",
};

export default function PathwaysIndexPage() {
  return (
    <main className="section space-y-10">
      <header className="space-y-3">
        <h1>Pathways</h1>
        <p className="text-white/70">
          Goal-based routines that combine Zivel services into structured, repeatable wellness experiences.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {pathways.map((p) => (
          <Link
            key={p.slug}
            href={`/pathways/${p.slug}`}
            className="rounded-2xl border-subtle bg-card p-6 hover:border-white/20 hover:bg-white/10"
          >
            <div className="text-lg font-semibold text-white">{p.name}</div>
            <p className="mt-2 text-sm text-white/70">{p.seo.description}</p>
            <div className="mt-4 text-sm font-medium text-[var(--zivel-gold)]">
              View Pathway →
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
