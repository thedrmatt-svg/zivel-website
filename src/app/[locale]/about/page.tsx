import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.zivel.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const enUrl = `${SITE_URL}/about`;
  const esUrl = `${SITE_URL}/es/about`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;
  return {
    title: "About Zivel",
    description: "Learn about Zivel's mission to bring modern wellness technology to local communities across the country.",
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32">
      <span className="zv-tagline mb-6 block">Our Story</span>
      <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight mb-6">
        About Zivel
      </h1>
      <span className="zv-gold-line mb-8 mx-auto" />
      <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-12">
        We&apos;re crafting something worth reading. Our full story is coming soon.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/locations" className="zv-btn-luxury zv-btn-gold">
          Find a Studio
        </Link>
        <Link href="/" className="zv-btn-luxury zv-btn-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
