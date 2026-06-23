import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { BlogContentBlock } from "@/types/blog";
import {
  getLocationBlogPostBySlug,
  getLocationBlogSlugs,
} from "@/lib/data/locationBlog";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SITE_URL = "https://www.zivel.com";

const CITY_META: Record<
  string,
  { cityName: string; stateSlug: string; bookingUrl: string }
> = {
  bentonville: {
    cityName: "Bentonville",
    stateSlug: "arkansas",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11443",
  },
  rogers: {
    cityName: "Rogers",
    stateSlug: "arkansas",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11442",
  },
  brecksville: {
    cityName: "Brecksville",
    stateSlug: "ohio",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11438",
  },
  briargate: {
    cityName: "Briargate",
    stateSlug: "colorado",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11779",
  },
  buckhead: {
    cityName: "Buckhead",
    stateSlug: "georgia",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11537",
  },
  "cool-springs": {
    cityName: "Cool Springs",
    stateSlug: "tennessee",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11436",
  },
  "coral-gables": {
    cityName: "Coral Gables",
    stateSlug: "florida",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11432",
  },
  fayetteville: {
    cityName: "Fayetteville",
    stateSlug: "arkansas",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11616",
  },
  fieldhouse: {
    cityName: "Fieldhouse",
    stateSlug: "mississippi",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11441",
  },
  "highlands-ranch": {
    cityName: "Highlands Ranch",
    stateSlug: "colorado",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11431",
  },
  hollywood: {
    cityName: "Hollywood",
    stateSlug: "florida",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11433",
  },
  metairie: {
    cityName: "Metairie",
    stateSlug: "louisiana",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11435",
  },
  murfreesboro: {
    cityName: "Murfreesboro",
    stateSlug: "tennessee",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11430",
  },
  newport: {
    cityName: "Newport",
    stateSlug: "kentucky",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11437",
  },
  parker: {
    cityName: "Parker",
    stateSlug: "colorado",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11680",
  },
  riverton: {
    cityName: "Riverton",
    stateSlug: "utah",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11445",
  },
  windermere: {
    cityName: "Cumming-Windermere",
    stateSlug: "georgia",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11617",
  },
};

type PageProps = {
  params: Promise<{ locale: string; state: string; city: string; slug: string }>;
};

export async function generateStaticParams() {
  const paths: { state: string; city: string; slug: string }[] = [];
  for (const [citySlug, meta] of Object.entries(CITY_META)) {
    for (const slug of getLocationBlogSlugs(citySlug)) {
      paths.push({ state: meta.stateSlug, city: citySlug, slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, state, slug, locale } = await params;
  const post = getLocationBlogPostBySlug(city, slug);
  if (!post) return {};

  const canonicalPath = `/locations/${state}/${city}/blog/${slug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const esUrl = `${SITE_URL}/es${canonicalPath}`;

  return {
    title: `${post.title} | Zivel ${CITY_META[city]?.cityName ?? city}`,
    description: post.description,
    alternates: {
      canonical: locale === "es" ? esUrl : canonicalUrl,
      languages: { en: canonicalUrl, es: esUrl, "x-default": canonicalUrl },
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
    .filter(
      (b): b is Extract<BlogContentBlock, { type: "heading" }> =>
        b.type === "heading"
    )
    .map((b) => ({ level: b.level, text: b.text, id: slugify(b.text) }));
}

function renderContentBlocks(blocks: BlogContentBlock[]) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "heading": {
        const id = slugify(block.text);
        if (block.level === 2)
          return (
            <h2
              key={i}
              id={id}
              className="mt-10 font-serif text-2xl md:text-3xl font-light tracking-tight scroll-mt-28"
            >
              {block.text}
            </h2>
          );
        return (
          <h3
            key={i}
            id={id}
            className="mt-8 font-serif text-xl font-normal scroll-mt-28"
          >
            {block.text}
          </h3>
        );
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
        return (
          <p key={i} className="text-black/60 text-lg leading-relaxed">
            {block.text}
          </p>
        );
      case "source":
        return (
          <p
            key={i}
            className="text-black/45 text-sm italic border-t border-black/10 pt-6 mt-2"
          >
            Source:{" "}
            <a
              href={block.url}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--zivel-gold-dark)] underline underline-offset-2 hover:text-black transition-colors duration-200"
            >
              {block.label}
            </a>
          </p>
        );
      default:
        return null;
    }
  });
}

export default async function LocationBlogPostPage({ params }: PageProps) {
  const { city, state, slug } = await params;
  const post = getLocationBlogPostBySlug(city, slug);
  if (!post) notFound();

  const meta = CITY_META[city];
  const cityName = meta?.cityName ?? city;
  const bookingUrl =
    meta?.bookingUrl ??
    "https://zivel.myperformanceiq.com/book-appointment";

  const headings = extractHeadings(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Zivel",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/brand/zivel-logo.png`,
      },
    },
    datePublished: post.publishDate,
    url: `${SITE_URL}/locations/${state}/${city}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/locations/${state}/${city}/blog/${post.slug}`,
    ...(headings.length > 0 && {
      articleSection: headings.filter((h) => h.level === 2).map((h) => h.text),
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: `Zivel ${cityName}`,
        item: `${SITE_URL}/locations/${state}/${city}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${cityName} Blog`,
        item: `${SITE_URL}/locations/${state}/${city}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/locations/${state}/${city}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="space-y-0 -mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* HEADER (DARK) */}
      <section className="zv-bleed zv-hero-bg zv-noise relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-20" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <ScrollReveal variant="fade-up">
            <nav className="text-sm text-white/50 mb-6 zv-hero-animate-1">
              <Link
                href={`/locations/${state}/${city}`}
                className="hover:text-white transition-colors"
              >
                Zivel {cityName}
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/locations/${state}/${city}/blog`}
                className="hover:text-white transition-colors"
              >
                Blog
              </Link>
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

            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight max-w-4xl zv-hero-animate-3">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-3xl zv-hero-animate-4">
              {post.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ARTICLE BODY (LIGHT) */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal variant="fade-up">
            {headings.length > 0 && (
              <nav
                aria-label="Table of contents"
                className="mb-12 rounded-2xl border border-black/8 bg-black/[0.02] p-6 md:p-8"
              >
                <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--zivel-gold-dark)] font-semibold mb-4">
                  In This Article
                </h2>
                <ol className="space-y-2">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={heading.level === 3 ? "pl-5" : ""}
                    >
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

      {/* CTA (DARK) */}
      <section className="zv-bleed relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 zv-glow-gold opacity-15" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <ScrollReveal variant="scale">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight">
                Ready to Try Cryotherapy in {cityName}?
              </h2>
              <p className="mt-6 text-white/65 text-lg leading-relaxed">
                Build a recovery routine that fits your schedule. Dry, fast, and stackable with red light, compression, and more.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zv-btn-luxury zv-btn-gold"
                >
                  Book a Session
                </a>
                <Link
                  href={`/locations/${state}/${city}`}
                  className="zv-btn-luxury zv-btn-outline"
                >
                  Zivel {cityName}
                </Link>
                <Link
                  href={`/locations/${state}/${city}/blog`}
                  className="zv-btn-luxury zv-btn-outline"
                >
                  More from the Blog
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
