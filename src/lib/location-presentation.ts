import type { Location } from "@/types/location";

export const SERVICE_PRIORITY = [
  "cryotherapy", "red-light-therapy", "infrared-sauna", "dry-float",
  "compression-therapy", "oxygen-bar", "cryo-slimming", "cryo-toning",
  "cryo-lift-facial", "cryo-soothe",
] as const;
const SERVICE_NAMES = [
  ["cryotherapy", "Cryotherapy"], ["red-light-therapy", "Red Light Therapy"],
  ["infrared-sauna", "Infrared Sauna"], ["dry-float", "Dry Float"],
  ["compression-therapy", "Compression Therapy"], ["oxygen-bar", "Oxygen Bar"],
  ["cryo-slimming", "Cryo Slimming"], ["cryo-toning", "Cryo Toning"],
  ["cryo-lift-facial", "CryoLift Facial"], ["cryo-soothe", "Cryo Soothe"],
];

export function getLocationCity(location: Location): string {
  const parts = location.contact?.address?.split(",").map(part => part.trim()) ?? [];
  return (parts.length >= 3 ? parts.at(-2) : undefined)
    ?? location.city
    ?? location.citySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export function getLocationNeighborhood(location: Location): string | undefined {
  const neighborhood = location.citySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  return neighborhood.toLowerCase() === getLocationCity(location).toLowerCase() ? undefined : neighborhood;
}

export function getLiveLocationServices(location: Location) {
  return location.services.filter(service => !service.comingSoon);
}

export function getPriorityLocationServices(location: Location) {
  return [...getLiveLocationServices(location)].sort((a, b) => {
    const rank = (slug: string) => {
      const index = SERVICE_PRIORITY.indexOf(slug as typeof SERVICE_PRIORITY[number]);
      return index < 0 ? SERVICE_PRIORITY.length : index;
    };
    return rank(a.slug) - rank(b.slug);
  });
}

export function joinNaturally(values: readonly string[], conjunction = "and"): string {
  if (values.length < 2) return values[0] ?? "";
  if (values.length === 2) return `${values[0]} ${conjunction} ${values[1]}`;
  return `${values.slice(0, -1).join(", ")}${conjunction === "&" ? "" : ","} ${conjunction} ${values.at(-1)}`;
}

export function getLocationMainMetadata(location: Location) {
  const city = getLocationCity(location);
  const neighborhood = getLocationNeighborhood(location);
  const services = getPriorityLocationServices(location).map(service => service.name);
  if (!services.length) throw new Error(`No live services for ${location.slug}`);
  const titleOptions = [
    ...(services[1] && neighborhood ? [`${services[0]} & ${services[1]} in ${city}, ${location.state} | Zivel ${neighborhood}`] : []),
    ...(services[1] ? [`${services[0]} & ${services[1]} in ${city}, ${location.state} | Zivel`] : []),
    `${services[0]} in ${city}, ${location.state} | Zivel`,
  ];
  const title = titleOptions.find(value => value.length <= 65);
  if (!title) throw new Error(`No approved title fits ${location.slug}`);
  let description = "";
  for (let count = Math.min(4, services.length); count >= 1; count--) {
    const shown = services.slice(0, count).join(", ");
    const more = services.length > count ? ", and more" : "";
    const candidate = `Zivel ${city} offers ${shown}${more} in ${city}, ${location.state}. Book your session today.`;
    if (candidate.length <= 155) { description = candidate; break; }
  }
  if (!description) throw new Error(`No approved description fits ${location.slug}`);
  return {
    title, description,
    subhead: `${joinNaturally(services.slice(0, 3), "&")} in ${city}, ${location.state}`,
    neighborhoodLine: neighborhood ? `Located in the ${neighborhood} area of ${city}` : undefined,
  };
}

const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Presentation-only filtering: never mutate stored rows or package destinations. */
export function getLocationDisplayPrices(
  location: Location,
  rows = location.pricing?.standardPrices ?? [],
) {
  return rows.flatMap(row => {
    const entry = SERVICE_NAMES.find(([, name]) => normalize(row.name).startsWith(normalize(name)));
    if (!entry) return [row];
    const service = getLiveLocationServices(location).find(service => service.slug === entry[0]);
    if (!service) return [];
    // A row such as "Infrared Sauna w/ Red Light" describes the sauna price,
    // not a separately available dedicated Red Light service.
    return [hasUnavailableServiceMention(location, row.name) ? { ...row, name: service.name } : row];
  });
}

export function hasUnavailableServiceMention(location: Location, text: string): boolean {
  const live = new Set(getLiveLocationServices(location).map(service => service.slug));
  return SERVICE_NAMES.some(([slug, name]) => !live.has(slug) && normalize(text).includes(normalize(name)));
}

export function getAccurateLocationDescription(location: Location): string {
  return hasUnavailableServiceMention(location, location.seo.description)
    ? getLocationMainMetadata(location).description
    : location.seo.description;
}

/** Correct explicit local stacking suggestions, not global educational prose. */
export function getAccurateLocalStackCopy(location: Location, serviceSlug: string, text: string): string {
  if (!hasUnavailableServiceMention(location, text) || !/\b(pair\w*|stack\w*|combin\w*|complement\w*)\b/i.test(text)) return text;
  const service = location.services.find(service => service.slug === serviceSlug);
  if (!service) return text;
  const otherServices = getPriorityLocationServices(location).filter(entry => entry.slug !== serviceSlug).slice(0, 3).map(entry => entry.name);
  if (!otherServices.length) return `Ask the team at Zivel ${getLocationCity(location)} about available service combinations.`;
  const introduction = service.comingSoon ? `When ${service.name} becomes available, it` : service.name;
  return `${introduction} can be combined with ${joinNaturally(otherServices)} at Zivel ${getLocationCity(location)}. Ask our local team about available service combinations.`;
}

export function getLocationAltText(location: Location, text: string): string {
  const city = getLocationCity(location);
  const neighborhood = getLocationNeighborhood(location);
  if (!neighborhood) return text;
  return text.replaceAll(location.name, `Zivel ${city}`).replaceAll(neighborhood, city);
}
