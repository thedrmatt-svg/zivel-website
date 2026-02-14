import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";

export const metadata = {
  title: "Blog | Zivel",
  description: "Evidence-informed wellness, recovery, and longevity education.",
};

export default function BlogIndexPage() {
  return (
    <main className="space-y-0">
      <section className="zv-bleed zv-hero-bg zv-noise py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 space-y-3">
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--zivel-gold)]">Insights & Education</p>
          <h1>Blog</h1>
          <p className="text-white/70 max-w-2xl">
            Clear, science-led insights on recovery, performance, and longevity.
          </p>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      <section className="zv-bleed zv-section-gradient zv-noise py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl zv-card-glass p-6 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <span>{p.publishDate}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--zivel-gold)]" />
                  <span>{p.category}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--zivel-gold)]" />
                  <span>{p.readingTime}</span>
                </div>
                <div className="mt-2 text-lg font-semibold text-white">{p.title}</div>
                <p className="mt-2 text-sm text-white/70">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
