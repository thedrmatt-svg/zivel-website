import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import CookieConsent from "@/components/consent/CookieConsent";
import { CampaignGoogleTagManagerHead } from "@/components/consent/CampaignGoogleTagManager";

const display = localFont({
  src: [
    { path: "../../../assets/fonts/fanx/barlow-condensed-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../../assets/fonts/fanx/barlow-condensed-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../../assets/fonts/fanx/barlow-condensed-latin-700.woff2", weight: "700", style: "normal" },
    { path: "../../../assets/fonts/fanx/barlow-condensed-latin-800.woff2", weight: "800", style: "normal" },
    { path: "../../../assets/fonts/fanx/barlow-condensed-latin-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-fanx-display",
  display: "swap",
});
const body = localFont({ src: "../../../assets/fonts/att/dm-sans-latin-variable.woff2", variable: "--font-fanx-body", weight: "400 700", display: "swap", style: "normal" });

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function FanXLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} scroll-smooth`}>
      <head><CampaignGoogleTagManagerHead consentRequired /></head>
      <body className="min-h-screen overflow-x-hidden" style={{ fontFamily: "var(--font-fanx-body)", background: "#131313", color: "#fff", ["--zivel-gold" as string]: "#ff3f87" }}>
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}