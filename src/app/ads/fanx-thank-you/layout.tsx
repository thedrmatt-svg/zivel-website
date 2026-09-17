import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import CookieConsent from "@/components/consent/CookieConsent";

const display = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-fanx-display",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-fanx-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function FanXThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body
        className="min-h-screen overflow-x-hidden"
        style={{
          fontFamily: "var(--font-fanx-body)",
          background: "#131313",
          color: "#fff",
        }}
      >
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}