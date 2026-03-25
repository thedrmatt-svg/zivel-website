import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Playfair_Display, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.zivel.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";

  const enPathname = pathname.startsWith("/es")
    ? pathname.replace(/^\/es/, "") || "/"
    : pathname;
  const esPathname = pathname.startsWith("/es") ? pathname : `/es${pathname}`;

  return {
    title: {
      default: "Zivel | Recover Smarter. Look Better. Feel Stronger.",
      template: "%s | Zivel Wellness",
    },
    description:
      "Zivel offers science-backed recovery, performance, and aesthetics services including cryotherapy, infrared sauna, red light therapy, CryoLift facials, and more. Book your session today.",
    openGraph: {
      title: "Zivel | Recover Smarter. Look Better. Feel Stronger.",
      description:
        "Modern wellness technology for pain relief, fat loss, skin rejuvenation, and performance. Find your local studio and book today.",
      url: "https://www.zivel.com",
      siteName: "Zivel",
      type: "website",
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Zivel Wellness Studios" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Zivel | Recover Smarter. Look Better. Feel Stronger.",
      description:
        "Modern wellness technology for pain relief, fat loss, skin rejuvenation, and performance. Find your local studio and book today.",
      images: ["/images/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${SITE_URL}${pathname}`,
      languages: {
        en: `${SITE_URL}${enPathname}`,
        es: `${SITE_URL}${esPathname}`,
        "x-default": `${SITE_URL}${enPathname}`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zivel Wellness",
    url: "https://www.zivel.com",
    logo: "https://www.zivel.com/images/brand/zivel-logo.png",
    description:
      "Science-backed wellness services including cryotherapy, red light therapy, infrared sauna, compression, dry float, and aesthetic cryo.",
    sameAs: [],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Zivel Wellness",
    url: "https://www.zivel.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.zivel.com/locations?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link
          rel="preload"
          href="/images/brand/zivel-logo.png"
          as="image"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-screen bg-black text-white overflow-x-hidden font-[var(--font-inter)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="w-full pt-20">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
