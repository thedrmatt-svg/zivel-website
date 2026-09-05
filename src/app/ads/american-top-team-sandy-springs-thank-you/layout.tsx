import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-att", display: "swap", weight: ["500", "700", "800", "900"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-att-body", display: "swap" });
export const metadata: Metadata = { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } };
export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${montserrat.variable} ${dmSans.variable}`}><body className="min-h-screen bg-[#07101d] text-white" style={{ fontFamily: "var(--font-att-body)" }}>{children}<Analytics /></body></html>;
}