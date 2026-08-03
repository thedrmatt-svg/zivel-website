import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Playfair_Display, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/consent/CookieConsent";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  // "optional" prevents FOUT: the browser won't swap the font in after paint,
  // eliminating the layout shift caused by the large serif H1 changing metrics.
  // Next.js self-hosts and preloads this font, so it loads from the same origin
  // and will be available before first paint on most connections.
  display: "optional",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  // "optional" prevents FOUT on body text: same reasoning as Playfair above.
  // Next.js self-hosts and preloads Inter from the same origin, so it arrives
  // before or at first paint on most connections. No swap = no CLS.
  display: "optional",
});

export const metadata: Metadata = {
  verification: {
    google: "Nx0wahWkUBMr-kDzL1w4nuvxoMJm6AjKa6H24E3w0M4",
  },
  title: {
    default: "Zivel | Recovery, Performance & Aesthetics",
    template: "%s | Zivel",
  },
  openGraph: {
    title: "Zivel | Recovery, Performance & Aesthetics",
    description:
      "Science-backed recovery, performance, and aesthetics services. Find your local Zivel studio and book today.",
    url: "https://www.zivel.com",
    siteName: "Zivel",
    type: "website",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Zivel Studios" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zivel | Recovery, Performance & Aesthetics",
    description:
      "Science-backed recovery, performance, and aesthetics services. Find your local Zivel studio and book today.",
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
};

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

  // Pass locale explicitly so next-intl reads from the messages file directly
  // without touching headers(). Calling getMessages() without args auto-detects
  // locale from request headers, which opts the entire [locale] tree into
  // dynamic streaming rendering and causes page metadata to arrive after </head>.
  const messages = await getMessages({ locale });

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zivel",
    url: "https://www.zivel.com",
    logo: "https://www.zivel.com/images/brand/zivel-logo.png",
    description:
      "Science-backed wellness services including cryotherapy, red light therapy, infrared sauna, compression, dry float, and aesthetic cryo.",
    sameAs: [],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Zivel",
    url: "https://www.zivel.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.zivel.com/locations?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-black text-white font-[var(--font-inter)]">
        {/* Skip link — first focusable element, visually hidden until focused */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
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
        <CookieConsent />
      </body>
    </html>
  );
}
