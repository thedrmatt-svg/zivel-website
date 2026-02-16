import Link from "next/link";
import { pathways } from "@/lib/data/pathways";

export default function HomePathwaysSection() {
  return (
    <section id="pathways" aria-labelledby="home-pathways-title">
      <div className="space-y-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="zv-tagline mb-4 block">Your Journey</span>
            <h2 id="home-pathways-title">Pathways</h2>
            <span className="zv-gold-line-left mt-6" />
            <p className="mt-6 text-white/60 text-lg">
              Goal-based routines that combine Zivel services into structured, repeatable wellness experiences.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link href="/pathways" className="zv-btn-luxury zv-btn-outline">
              View All Pathways
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {pathways.map((p) => (
            <Link
              key={p.slug}
              href={`/pathways/${p.slug}`}
              className="block zv-luxury-card p-8 group"
            >
              <h3 className="text-xl mb-3 group-hover:text-[var(--zivel-gold)] transition-colors duration-500">{p.name}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.seo.description}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[var(--zivel-gold)]">
                View Pathway
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
