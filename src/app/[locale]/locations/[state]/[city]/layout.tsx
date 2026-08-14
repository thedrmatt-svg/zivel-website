import MetaPixelCoralGables from "@/components/consent/MetaPixelCoralGables";
import GoogleTagManagerRiverton from "@/components/consent/GoogleTagManagerRiverton";

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
  const { city } = await params;

  return (
    <>
      {city === "coral-gables" && <MetaPixelCoralGables />}
      {city === "riverton" && <GoogleTagManagerRiverton />}
      {children}
    </>
  );
}
