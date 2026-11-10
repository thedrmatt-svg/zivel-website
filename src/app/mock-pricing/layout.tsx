import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/consent/CookieConsent";
import LocationMobileActions from "@/components/location/LocationMobileActions";
import { locations, getLocationByPath } from "@/lib/data/locations";
import { getLocationNav } from "@/lib/data/locationNav";
import { buildLocationBookingActions, getLocationBookingAction } from "@/lib/location-booking";
import { getLocationEnhancementCopy } from "@/lib/location-enhancement-copy";
import placesCache from "@/data/places-cache.json";

const playfair = localFont({
  src: "../../assets/fonts/shared/playfair-display-latin-variable.woff2",
  variable: "--font-playfair",
  display: "optional",
  weight: "400 700",
  style: "normal",
  adjustFontFallback: "Times New Roman",
});
const inter = localFont({
  src: "../../assets/fonts/shared/inter-latin-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  style: "normal",
  display: "optional",
});

export const metadata: Metadata = {
  title: { absolute: "Hollywood Holiday Pricing Preview | Zivel" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default async function MockPricingLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages({ locale: "en" });
  const location = getLocationByPath("florida", "hollywood");
  if (!location) throw new Error("Hollywood pricing preview requires the existing Hollywood location.");
  const action = getLocationBookingAction(location);
  const entry = location.google?.placeId
    ? (placesCache as Record<string, { locationPath?: string; googleMapsUri?: string | null }>)[location.google.placeId]
    : undefined;
  const mapsUrl = entry?.locationPath === "florida/hollywood" ? entry.googleMapsUri : null;

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-black text-white font-[var(--font-inter)]">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <NextIntlClientProvider locale="en" messages={messages}>
          <Header
            locationNav={getLocationNav({ featuredCount: 4 })}
            bookingActions={buildLocationBookingActions(locations)}
            pathnameOverride="/locations/florida/hollywood"
          />
          <div className="w-full pt-20">{children}</div>
          <LocationMobileActions
            basePath="/mock-pricing"
            bookingUrl={action?.external ? action.href : undefined}
            phone={location.contact?.phone}
            mapsUrl={mapsUrl}
            copy={getLocationEnhancementCopy("en")}
          />
          <Footer />
        </NextIntlClientProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
