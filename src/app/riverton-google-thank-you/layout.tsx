import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import GoogleTagManagerRiverton from "@/components/consent/GoogleTagManagerRiverton";

const playfair = localFont({
  src: "../../assets/fonts/shared/playfair-display-latin-variable.woff2",
  variable: "--font-playfair",
  display: "swap",
  weight: "400 700",
  style: "normal",
  adjustFontFallback: "Times New Roman",
});

const inter = localFont({
  src: "../../assets/fonts/shared/inter-latin-variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#080808] text-white overflow-x-hidden font-[var(--font-inter)]">
        {children}
        <Analytics />
        <GoogleTagManagerRiverton />
      </body>
    </html>
  );
}
