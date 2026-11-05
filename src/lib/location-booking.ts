import type { Location } from "@/types/location";
import { phoneHref } from "@/lib/contact-links";

export type LocationBookingAction = { href: string; label: string; external: boolean };
export type LocationBookingActions = Record<string, LocationBookingAction>;

export function getLocationBookingAction(location: Location): LocationBookingAction | null {
  const id = location.booking?.locationId;
  if (typeof id === "number" && Number.isFinite(id) && id > 0) return {
    href: `https://zivel.myperformanceiq.com/book-appointment?set_location=${id}`,
    label: "Book Now", external: true,
  };
  if (location.contact?.phone) return {
    href: phoneHref(location.contact.phone), label: "Call or text", external: false,
  };
  return null;
}

export function getLocationBookingHref(location: Location): string {
  return getLocationBookingAction(location)?.href ?? `/locations/${location.stateSlug}/${location.citySlug}`;
}

export function buildLocationBookingActions(locations: readonly Location[]): LocationBookingActions {
  return Object.fromEntries(locations.map(location => {
    const base = `/locations/${location.stateSlug}/${location.citySlug}`;
    return [base, getLocationBookingAction(location) ?? { href: base, label: "View Location", external: false }];
  }));
}

export function getHeaderBookingAction(pathname: string, actions: LocationBookingActions): LocationBookingAction {
  const path = pathname.replace(/^\/(?:en|es)(?=\/|$)/, "");
  const match = path.match(/^\/locations\/([^/]+)\/([^/]+)(?:\/|$)/);
  if (match) {
    const base = `/locations/${match[1]}/${match[2]}`;
    return actions[base] ?? { href: base, label: "View Location", external: false };
  }
  return {
    href: "https://zivel.myperformanceiq.com/book-appointment?set_location=11417",
    label: "Book Now", external: true,
  };
}
