import MetaPixelCoralGables from "@/components/consent/MetaPixelCoralGables";
import GoogleTagManagerRiverton from "@/components/consent/GoogleTagManagerRiverton";
import GoogleTagManagerHollywood from "@/components/consent/GoogleTagManagerHollywood";
import MetaPixelHollywood from "@/components/consent/MetaPixelHollywood";
import LocationMobileActions from "@/components/location/LocationMobileActions";
import { getLocationByPath } from "@/lib/data/locations";
import { getLocationBookingAction } from "@/lib/location-booking";
import { isBrecksvilleLocation } from "@/lib/location-availability";
import { getLocationEnhancementCopy } from "@/lib/location-enhancement-copy";
import placesCache from "@/data/places-cache.json";

/**
 * Layout wrapping every Coral Gables nested route.
 * Mounts MetaPixelCoralGables here (not in page.tsx) so it covers
 * /locations/florida/coral-gables and all children:
 *   pricing, [service], blog, blog/[slug], pathways
 *
 * The component stays mounted during client-side navigation between those
 * pages and fires PageView on each route change via usePathname().
 */
export default async function CityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; state: string; city: string }>;
}) {
  const { state, city, locale } = await params;
  const location = getLocationByPath(state, city);
  const entry = location?.google?.placeId
    ? (placesCache as Record<string, { locationPath?: string; googleMapsUri?: string | null }>)[location.google.placeId]
    : undefined;
  const mapsUrl = entry?.locationPath === `${state}/${city}` ? entry.googleMapsUri : null;
  const action = location ? getLocationBookingAction(location) : null;

  return (
    <>
      {city === "coral-gables" && <MetaPixelCoralGables />}
      {city === "riverton" && <GoogleTagManagerRiverton />}
      {state === "florida" && city === "hollywood" && <GoogleTagManagerHollywood />}
      {state === "florida" && city === "hollywood" && <MetaPixelHollywood />}
      {children}
      {location && !isBrecksvilleLocation(state, city) && <LocationMobileActions
        key={`${locale}/${state}/${city}`}
        basePath={`/locations/${state}/${city}`}
        bookingUrl={action?.external ? action.href : undefined}
        phone={location.contact?.phone}
        mapsUrl={mapsUrl}
        copy={getLocationEnhancementCopy(locale)}
      />}
    </>
  );
}
