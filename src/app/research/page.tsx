import Link from "next/link";
import { researchSources } from "@/lib/data/research";

export const metadata = {
  title: "Research Sources | Zivel",
  description: "Citations and sources referenced across Zivel service pages and science articles.",
};

export default function ResearchIndexPage() {
  return (
    <div className="section space-y-10">
      <div className="space-y-3">
        <h1>Research Sources</h1>
        <p className="text-white/70 max-w-3xl">
          This page lists sources referenced across Zivel content. Each source links to the original publisher.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {researchSources.map((s) => (
          <Link
            key={s.slug}
            href={`/research/${s.slug}`}
            className="rounded-2xl border-subtle bg-card p-6 hover:border-white/20 hover:bg-white/10"
          >
            <div className="text-lg font-semibold text-white">{s.title}</div>
            <div className="mt-2 text-sm text-white/70">{s.summary}</div>
            <div className="mt-4 text-xs text-white/50">
              {s.publisher ? `${s.publisher}` : ""}{s.year ? ` • ${s.year}` : ""}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
