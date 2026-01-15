import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getResearchBySlug, researchSources } from "@/lib/data/research";

export function generateStaticParams() {
  return researchSources.map((s) => ({ slug: s.slug ?? s.id }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getResearchBySlug(slug);
  if (!s) return {};
  const identifier = s.slug ?? s.id;
  return { title: `${s.title} | Zivel Research`, description: s.summary, alternates: { canonical: `/research/${identifier}` } };
}

export default async function ResearchSourcePage({ params }: Props) {
  const { slug } = await params;
  const s = getResearchBySlug(slug);
  if (!s) return notFound();

  return (
    <div className="section space-y-8 max-w-3xl">
      <div className="space-y-2">
        <h1>{s.title}</h1>
        <p className="text-white/70">{s.summary}</p>
        {s.authors?.length ? (
          <div className="text-xs text-white/60">{s.authors.join(", ")}</div>
        ) : null}
        <div className="text-xs text-white/50">
          {s.journal ?? s.source ?? ""}{s.year ? ` • ${s.year}` : ""}
        </div>
      </div>

      <div className="rounded-2xl border-subtle bg-card p-6 space-y-3">
        <div className="text-sm text-white/80">Original source</div>
        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--zivel-gold)] underline break-all">
          {s.url}
        </a>
      </div>

      <Link href="/research" className="text-sm text-white/70 hover:text-[var(--zivel-gold)]">
        ← Back to all sources
      </Link>
    </div>
  );
}
