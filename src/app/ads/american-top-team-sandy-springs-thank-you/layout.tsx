import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";

const montserrat = localFont({ src: "../../../assets/fonts/att/montserrat-latin-variable.woff2", variable: "--font-att", display: "swap", weight: "500 900", style: "normal" });
const dmSans = localFont({ src: "../../../assets/fonts/att/dm-sans-latin-variable.woff2", variable: "--font-att-body", display: "swap", weight: "100 1000", style: "normal" });
export const metadata: Metadata = { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } };
export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${montserrat.variable} ${dmSans.variable}`}><body className="min-h-screen bg-[#07101d] text-white" style={{ fontFamily: "var(--font-att-body)" }}>{children}<Analytics /></body></html>;
}