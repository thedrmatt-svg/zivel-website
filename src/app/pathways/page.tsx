import Link from "next/link";
import { pathways } from "@/lib/data/pathways";

export const metadata = {
  title: "Pathways | Zivel",
  description:
    "Curated multi-service sessions designed around how you want to feel. Explore recovery, performance, beauty, and longevity pathways at Zivel.",
};

const CATEGORY_META: Record<
  string,
  { label: string; color: string }
> = {
  recovery: { label: "Recovery", color: "bg-blue-500/20 text-blue-300" },
  performance: { label: "Performance", color: "bg-emerald-500/20 text-emerald-300" },
  beauty: { label: "Beauty", color: "bg-rose-500/20 text-rose-300" },
  longevity: { label: "Longevity", color: "bg-amber-500/20 text-amber-300" },
};

export default function PathwaysIndexPage() {
  return (
    <main className="section space-y-10">
      <header className="space-y-3">
        <h1>Zivel Pathways</h1>
        <p className="max-w-2xl text-white/70">
          Curated combinations that turn multiple services into a streamlined
          session — built around how you want to feel today.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {pathways.map((pw) => {
          const cat = CATEGORY_META[pw.category];
          return (
            <Link
              key={pw.slug}
              href={`/pathways/${pw.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/4 p-6 hover:border-white/20 hover:bg-white/8"
            >
              <div className="flex items-center gap-3">
                {cat && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${cat.color}`}
                  >
                    {cat.label}
                  </span>
                )}
                <span className="text-xs text-white/50">{pw.totalDuration}</span>
              </div>

              <h2 className="mt-3 text-xl font-semibold text-white group-hover:text-[var(--zivel-gold)]">
                {pw.name}
              </h2>
              <p className="mt-2 text-sm text-white/70">{pw.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {pw.steps.map((s) => (
                  <span
                    key={s.serviceSlug}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
                  >
                    {s.serviceName}
                  </span>
                ))}
              </div>

              <div className="mt-5 text-sm font-semibold text-[var(--zivel-gold)] opacity-0 transition-opacity group-hover:opacity-100">
                View pathway →
              </div>
            </Link>
          );
        })}
      </div>

      {pathways.length === 0 && (
        <p className="text-white/50">Pathways are coming soon.</p>
      )}
    </main>
  );
}
