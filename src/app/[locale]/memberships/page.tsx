import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.zivel.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const enUrl = `${SITE_URL}/memberships`;
  const esUrl = `${SITE_URL}/es/memberships`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;
  return {
    title: "Memberships",
    description: "Zivel membership plans give you access to premium wellness sessions at every studio location. Details coming soon.",
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

export default function MembershipsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32">
      <span className="zv-tagline mb-6 block">Member Benefits</span>
      <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight mb-6">
        Memberships
      </h1>
      <span className="zv-gold-line mb-8 mx-auto" />
      <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-12">
        Full membership details and online enrollment are coming soon.
        Visit your local studio to learn about current plans and pricing.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/locations" className="zv-btn-luxury zv-btn-gold">
          Find a Studio
        </Link>
        <Link href="/services" className="zv-btn-luxury zv-btn-outline">
          Explore Services
        </Link>
      </div>
    </div>
  );
}
