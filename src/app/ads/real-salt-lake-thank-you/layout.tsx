import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { CampaignGoogleTagManagerHead, CampaignGoogleTagManagerNoScript } from "@/components/consent/CampaignGoogleTagManager";

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

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function RSLThankYouLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head><CampaignGoogleTagManagerHead /></head>
      <body className="min-h-screen bg-[#080808] text-white overflow-x-hidden font-[var(--font-inter)]">
        <CampaignGoogleTagManagerNoScript />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
