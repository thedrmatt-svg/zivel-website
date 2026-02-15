import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogBySlug } from "@/lib/data/blog";
import type { BlogContentBlock } from "@/types/blog";

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
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: post.title + " | Zivel",
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

function renderContentBlocks(blocks: BlogContentBlock[]) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "heading":
        if (block.level === 2)
          return <h2 key={i} className="mt-10">{block.text}</h2>;
        return <h3 key={i} className="mt-8 text-lg font-semibold">{block.text}</h3>;

      case "list":
        return (
          <ul key={i} className="space-y-2 text-white/70">
            {block.items.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );

      case "paragraph":
        return <p key={i} className="text-white/70">{block.text}</p>;

      default:
        return null;
    }
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return notFound();

  const SITE_URL = "https://www.zivel.com";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Zivel Wellness",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/brand/zivel-logo.png` },
    },
    datePublished: post.publishDate,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 2, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <main className="section space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="text-sm text-white/60">
        <Link href="/blog" className="hover:text-white">Blog</Link> / {post.title}
      </nav>

      <header className="space-y-3">
        <div className="flex items-center gap-3 text-xs text-white/60">
          <span>{post.publishDate}</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>{post.author}</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>{post.readingTime}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="text-white/70">{post.description}</p>
      </header>

      <article className="prose prose-invert max-w-none">
        {renderContentBlocks(post.content)}
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
