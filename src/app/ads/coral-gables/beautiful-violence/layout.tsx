import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import CookieConsent from "@/components/consent/CookieConsent";

const campaignDisplay = localFont({
  src: "../../../../assets/fonts/att/montserrat-latin-variable.woff2",
  variable: "--font-campaign-display",
  display: "swap",
  weight: "500 900",
});

const campaignBody = localFont({
  src: "../../../../assets/fonts/att/dm-sans-latin-variable.woff2",
  variable: "--font-campaign-body",
  display: "swap",
  weight: "100 1000",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function BeautifulViolenceCampaignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${campaignDisplay.variable} ${campaignBody.variable}`}>
      <body className="min-h-[100dvh] overflow-x-hidden" style={{ fontFamily: "var(--font-campaign-body)" }}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
