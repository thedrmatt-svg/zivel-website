import type { Location } from "@/types/location";
import type { LocationFaqItem, LocationFaqPart } from "@/lib/location-faqs";
import { locations } from "@/lib/data/locations";
import { getLocationHref } from "@/lib/data/locationNav";
import { getLocationCity, getLocationBusinessLabel, joinNaturally } from "@/lib/location-presentation";
import { getLocationBookingAction } from "@/lib/location-booking";
import { isBrecksvilleLocation } from "@/lib/location-availability";
import { phoneHref } from "@/lib/contact-links";

const text = (value: unknown): string => typeof value === "string" ? value.trim() : "";
function values(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  return input.map(text).filter(value => {
    const key = value.toLowerCase();
    if (!value || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Read explicit studio-level opening flags only. A coming-soon SERVICE does
 * not make an otherwise open studio ineligible. No opening state is inferred
 * from dates, hours, images, or descriptive copy, and no records are modified.
 * Current registered studios have no studio-level opening flags.
 */
export function isLiveLocationForLocalFaq(location: Location): boolean {
  const flags = location as Location & {
    comingSoon?: boolean;
    notYetOpen?: boolean;
    isOpen?: boolean;
    status?: string;
  };
  return !isBrecksvilleLocation(location.stateSlug, location.citySlug)
    && flags.comingSoon !== true && flags.notYetOpen !== true && flags.isOpen !== false
    && !/^(coming[\s_-]*soon|not[\s_-]*(?:yet[\s_-]*)?open)$/i.test(text(flags.status));
}

export function getOtherLiveStateLocations(location: Location, registry: readonly Location[] = locations): Location[] {
  if (!text(location.stateSlug)) return [];
  return registry.filter(other =>
    other.stateSlug === location.stateSlug
    && !(other.stateSlug === location.stateSlug && other.citySlug === location.citySlug)
    && text(other.citySlug) && text(getLocationCity(other))
    && isLiveLocationForLocalFaq(other)
  );
}

function linkedCities(studios: readonly Location[]): LocationFaqPart[] {
  return studios.flatMap((studio, index) => [
    ...(index ? [{ text: index === studios.length - 1 ? (index === 1 ? " and " : ", and ") : ", " }] : []),
    { text: getLocationCity(studio), href: getLocationHref(studio) },
  ]);
}

/** Approved English templates also serve the existing es FAQ fallback. */
export function buildStructuredLocationFaqs(location: Location, registry: readonly Location[] = locations): LocationFaqItem[] {
  if (isBrecksvilleLocation(location.stateSlug, location.citySlug)) return [];
  const city = text(getLocationCity(location));
  if (!city) return [];
  const label = getLocationBusinessLabel(location);
  const items: LocationFaqItem[] = [];
  const add = (id: string, question: string, parts: LocationFaqPart[]) =>
    items.push({ key: `structured-${id}`, question, parts, answer: parts.map(part => part.text).join("") });

  const county = text(location.county), state = text(location.state);
  // Owner-approved exception: Cumming belongs in Windermere's served-area list.
  const includeMunicipality = location.stateSlug === "georgia" && location.citySlug === "windermere";
  const communities = values(location.nearbyCommunities).filter(value => includeMunicipality || value.toLowerCase() !== city.toLowerCase());
  if (county && state && communities.length >= 2) {
    add("L1", `Which areas does ${label} serve?`, [{
      text: `${label} is in ${county}, ${state}, and welcomes clients from ${joinNaturally(communities)}, and surrounding communities.`,
    }]);
  }

  const others = getOtherLiveStateLocations(location, registry);
  if (others.length) {
    const stateName = location.stateSlug.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
    add("L2", `Does Zivel have other locations in ${stateName}?`, [
      { text: others.length === 1 ? `Yes. Zivel also has a ${stateName} studio in ` : `Yes. Zivel also has ${stateName} studios in ` },
      ...linkedCities(others),
      { text: others.length === 1 ? ". It has its own hours, pricing, and booking page." : ". Each has its own hours, pricing, and booking page." },
    ]);
  }

  const apps = values(location.partnerApps);
  if (apps.length) {
    add("L3a", `Can I use ${joinNaturally(apps, "or")} at ${label}?`, [{
      text: apps.length === 1
        ? `${label} is listed on ${apps[0]}. Eligible plans and availability are set by ${apps[0]}, so check the app for current options.`
        : `${label} is listed on ${joinNaturally(apps)}. Eligible plans and availability are set by each app, so check the apps for current options.`,
    }]);
  }

  const site = text(location.siteName), address = text(location.contact?.address);
  if (site && address) {
    add("L3b", `What is ${label} located in?`, [{ text: `${label} is located in ${site}, at ${address}.` }]);
  }
  if (site && location.venueVisitors === true) {
    const action = getLocationBookingAction(location), phone = text(location.contact?.phone);
    if (action?.external || phone) {
      add("L4", `Can visitors to ${site} book a session at ${label}?`, [
        { text: `Yes. ${label} is located in ${site}, and anyone can ` },
        ...(action?.external ? [{ text: "book online or by phone" }] : [
          { text: "call or text " }, { text: phone, href: phoneHref(phone) }, { text: " to book" },
        ]),
        { text: ", including athletes, families, and event visitors." },
      ]);
    }
  }
  return items;
}
