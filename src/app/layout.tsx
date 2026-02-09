import type { Metadata } from "next";
import "@/styles/globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/ThemeProvider";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--zivel-surface)] text-[var(--zivel-text-primary)] transition-colors duration-300">
        <ThemeProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
