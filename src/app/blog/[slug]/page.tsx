import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title + " | Zivel",
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

function renderMarkdownish(text: string) {
  return text.split(/\n\n+/).map((block, i) => {
    const h2 = block.match(/^##\s+(.*)/);
    if (h2) return <h2 key={i} className="mt-10">{h2[1]}</h2>;

    const h3 = block.match(/^###\s+(.*)/);
    if (h3) return <h3 key={i} className="mt-8 text-lg font-semibold">{h3[1]}</h3>;

    const rel = block.match(/^\*\*Related:\*\*\s+(.*)/);
    if (rel) {
      const hrefs = rel[1].split("and").map(s => s.trim());
      return (
        <p key={i} className="text-sm text-white/70">
          Related:{" "}
          {hrefs.map((h, idx) => (
            <span key={h}>
              <Link className="underline hover:text-[var(--zivel-gold)]" href={h}>{h}</Link>
              {idx < hrefs.length - 1 ? " • " : ""}
            </span>
          ))}
        </p>
      );
    }

    if (block.includes("\n- ")) {
      const [lead, ...items] = block.split("\n- ");
      return (
        <div key={i} className="space-y-3">
          {lead.trim() ? <p className="text-white/70">{lead.trim()}</p> : null}
          <ul className="space-y-2 text-white/70">
            {items.map((it, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{it.trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return <p key={i} className="text-white/70">{block.trim()}</p>;
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return notFound();

  return (
    <main className="section space-y-10">
      <nav className="text-sm text-white/60">
        <Link href="/blog" className="hover:text-white">Blog</Link> / {post.title}
      </nav>

      <header className="space-y-3">
        <div className="text-xs text-white/60">{post.date}</div>
        <h1>{post.title}</h1>
        <p className="text-white/70">{post.description}</p>
      </header>

      <article className="prose prose-invert max-w-none">
        {renderMarkdownish(post.body)}
      </article>

      <div className="rounded-2xl border-subtle bg-card p-8">
        <h2 className="m-0">Explore Services</h2>
        <p className="mt-3 text-white/70">
          Zivel offers modern recovery and wellness modalities built for consistency.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/services" className="rounded-xl bg-[var(--zivel-gold)] px-5 py-3 text-sm font-semibold text-black hover:opacity-90">
            View Services
          </Link>
          <Link href="/locations" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10">
            Find a Location
          </Link>
        </div>
      </div>
    </main>
  );
}
