import type { Metadata } from "next";
import "@/styles/globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zivel.com"),
  title: {
    default: "Zivel Wellness | Recovery, Performance & Longevity",
    template: "%s | Zivel Wellness",
  },
  description:
    "Science-backed wellness services including cryotherapy, red light therapy, infrared sauna, compression, dry float, and aesthetic cryo. Book your session today.",
  openGraph: {
    title: "Zivel Wellness | Recovery, Performance & Longevity",
    description:
      "Science-backed wellness services including cryotherapy, red light therapy, infrared sauna, compression, dry float, and aesthetic cryo. Book your session today.",
    url: "https://www.zivel.com",
    siteName: "Zivel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zivel Wellness | Recovery, Performance & Longevity",
    description: "Science-backed wellness services including cryotherapy, red light therapy, infrared sauna, compression, dry float, and aesthetic cryo. Book your session today.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Zivel Wellness",
            "url": "https://www.zivel.com",
            "logo": "https://www.zivel.com/images/brand/zivel-logo.png",
            "description": "Science-backed wellness services including cryotherapy, red light therapy, infrared sauna, compression, dry float, and aesthetic cryo.",
            "sameAs": []
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Zivel Wellness",
            "url": "https://www.zivel.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.zivel.com/locations?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }) }}
        />
        <Header />
        <div className="mx-auto w-full max-w-6xl px-4 py-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
