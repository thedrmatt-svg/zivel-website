import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogBySlug } from "@/lib/data/blog";
import type { BlogContentBlock } from "@/types/blog";
import ScrollReveal from "@/components/ui/ScrollReveal";

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

const SITE_URL = "https://www.zivel.com";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  const basePath = `/blog/${post.slug}`;
  const enUrl = `${SITE_URL}${basePath}`;
  const esUrl = `${SITE_URL}/es${basePath}`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;
  return {
    title: post.title + " | Zivel",
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractHeadings(blocks: BlogContentBlock[]) {
  return blocks
    .filter((b): b is Extract<BlogContentBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ level: b.level, text: b.text, id: slugify(b.text) }));
}

function renderContentBlocks(blocks: BlogContentBlock[]) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "heading": {
        const id = slugify(block.text);
        if (block.level === 2)
          return <h2 key={i} id={id} className="mt-10 font-serif text-2xl md:text-3xl font-light tracking-tight scroll-mt-28">{block.text}</h2>;
        return <h3 key={i} id={id} className="mt-8 font-serif text-xl font-normal scroll-mt-28">{block.text}</h3>;
      }

      case "list":
        return (
          <ul key={i} className="space-y-3 text-black/60">
            {block.items.map((item, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--zivel-gold)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );

      case "paragraph":
        return <p key={i} className="text-black/60 text-lg leading-relaxed">{block.text}</p>;

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
  const headings = extractHeadings(post.content);

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
    ...(headings.length > 0 && {
      articleSection: headings
        .filter((h) => h.level === 2)
        .map((h) => h.text),
    }),
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
    <div className="space-y-0 -mt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ========== HEADER (DARK) ========== */}
      <section className="zv-bleed zv-hero-bg zv-noise relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-20" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <ScrollReveal variant="fade-up">
            <nav className="text-sm text-white/50 mb-6 zv-hero-animate-1">
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-white/70">{post.category}</span>
            </nav>

            <div className="flex items-center gap-3 text-xs text-white/40 mb-4 zv-hero-animate-2">
              <span>{post.publishDate}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{post.author}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{post.readingTime}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight max-w-4xl zv-hero-animate-3">{post.title}</h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-3xl zv-hero-animate-4">{post.description}</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== ARTICLE BODY (LIGHT) ========== */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal variant="fade-up">
            {headings.length > 0 && (
              <nav aria-label="Table of contents" className="mb-12 rounded-2xl border border-black/8 bg-black/[0.02] p-6 md:p-8">
                <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--zivel-gold-dark)] font-semibold mb-4">In This Article</h2>
                <ol className="space-y-2">
                  {headings.map((heading) => (
                    <li key={heading.id} className={heading.level === 3 ? "pl-5" : ""}>
                      <a
                        href={`#${heading.id}`}
                        className="text-black/60 hover:text-[var(--zivel-gold-dark)] transition-colors duration-300 text-[15px] leading-relaxed flex items-start gap-2"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--zivel-gold)]/40" />
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <article className="space-y-6">
              {renderContentBlocks(post.content)}
            </article>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== CTA (DARK) ========== */}
      <section className="zv-bleed relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 zv-glow-gold opacity-15" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <ScrollReveal variant="scale">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight">Explore Services</h2>
              <p className="mt-6 text-white/65 text-lg leading-relaxed">
                Zivel offers modern recovery and wellness modalities built for consistency.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/services" className="zv-btn-luxury zv-btn-gold">
                  View Services
                </Link>
                <Link href="/locations" className="zv-btn-luxury zv-btn-outline">
                  Find a Location
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
