import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zivel.com"),
  description:
    "Zivel delivers cutting-edge wellness technology nationwide — expert-led recovery, body contouring, and skin rejuvenation in serene private studios. Book cryo, red light, infrared sauna, CryoLift Facial and more.",
  openGraph: {
    title: "Zivel | Recover Smarter. Look Better. Feel Stronger.",
    description:
      "Modern wellness technology for pain relief, fat loss, skin rejuvenation, and performance. Find your local studio and book today.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Zivel Wellness Studios" }],
    siteName: "Zivel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zivel | Recover Smarter. Look Better. Feel Stronger.",
    description:
      "Modern wellness technology for pain relief, fat loss, skin rejuvenation, and performance. Find your local studio and book today.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
