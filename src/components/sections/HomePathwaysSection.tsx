import Link from "next/link";
import { pathways } from "@/lib/data/pathways";

export default function HomePathwaysSection() {
  return (
    <section id="pathways" className="section" aria-labelledby="home-pathways-title">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="home-pathways-title">Pathways</h2>
            <p className="mt-2 text-white/70">
              Goal-based routines that combine Zivel services into structured, repeatable wellness experiences.
            </p>
          </div>
          <Link
            href="/pathways"
            className="text-sm font-medium text-white/70 hover:text-[var(--zivel-gold)]"
          >
            View all pathways →
          </Link>
        </div>

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
                View pathway →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
