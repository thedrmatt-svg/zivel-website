import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";

export const metadata = {
  title: "Blog | Zivel",
  description: "Evidence-informed wellness, recovery, and longevity education.",
};

export default function BlogIndexPage() {
  return (
    <main className="section space-y-10">
      <header className="space-y-3">
        <h1>Blog</h1>
        <p className="text-white/70">
          Evidence-informed wellness, recovery, and longevity education—written for clarity.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border-subtle bg-card p-6 hover:border-white/20 hover:bg-white/10">
            <div className="text-xs text-white/60">{p.date}</div>
            <div className="mt-2 text-lg font-semibold text-white">{p.title}</div>
            <p className="mt-2 text-sm text-white/70">{p.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
