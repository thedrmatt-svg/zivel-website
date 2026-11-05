import type { Location } from "@/types/location";
import { phoneHref } from "@/lib/contact-links";
import { isBrecksvilleLocation } from "@/lib/location-availability";
import { getLocalServiceHref } from "@/lib/data/local-service-pages";
import { pathways as sharedPathways } from "@/lib/data/pathways";

export type LocationFaqPart = { text: string; href?: string };
export type LocationFaqItem = {
  key: string;
  question: string;
  parts: LocationFaqPart[];
  answer: string;
};
export type FaqGroupedHour = { label: string; time: string };
type FaqOptions = {
  cityName: string;
  groupedHours: readonly FaqGroupedHour[];
  bookingUrl: string;
  pathways?: readonly { name: string }[];
};

// Local additions are plain text. Strip markup for both visible text and schema.
export function plainFaqText(value: string): string {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getSingleSessionRange(location: Location): { low: string; high: string } | null {
  const values = (location.pricing?.standardPrices ?? []).flatMap(row => {
    if (/\b(packages?|packs?|series|memberships?)\b/i.test(`${row.name} ${row.note ?? ""}`)) return [];
    if (row.note && !/single[\s-]*session/i.test(row.note)) return [];
    const match = row.price.trim().match(/^\$\s*((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?)$/);
    return match ? [Number(match[1].replace(/,/g, ""))] : [];
  }).filter(Number.isFinite);
  if (!values.length) return null;
  const format = (value: number) => new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
  return { low: format(Math.min(...values)), high: format(Math.max(...values)) };
}

export function buildLocationFaqs(location: Location, options: FaqOptions): LocationFaqItem[] {
  const city = options.cityName;
  const label = `${location.name} in ${city}`;
  const base = `/locations/${location.stateSlug}/${location.citySlug}`;
  const pricingHref = `${base}/pricing`;
  const phone = location.contact?.phone;
  const phonePart: LocationFaqPart = phone
    ? { text: phone, href: phoneHref(phone) }
    : { text: "the location contact form", href: "#contact" };
  const items: LocationFaqItem[] = [];
  const add = (key: string, question: string, parts: LocationFaqPart[]) => {
    items.push({ key, question, parts, answer: parts.map(part => part.text).join("") });
  };
  const hours = options.groupedHours.map(row => `${row.label}: ${row.time}`).join("; ");
  add("hours", `What are Zivel ${city}'s hours?`, [
    { text: `${label} follows these studio hours: ${hours}. For questions about the hours shown for this ${city} location, call ` },
    phonePart,
    { text: ". These are the same local hours listed in the Location Details section on this page." },
  ]);
  add("directions", `Where is Zivel ${city} located, and is there parking?`, [
    { text: `${label} is located at ${location.contact?.address ?? "the address shown in Location Details"}. ${location.contact?.parking ? `Parking information: ${location.contact.parking}. ` : "Parking details are not listed on this page. "}` },
    { text: "Open the Find Us map", href: "#map" },
    { text: ` for this ${city} location's address and directions, or call ` },
    phonePart,
    { text: " with questions about parking or finding the studio." },
  ]);
  const serviceParts: LocationFaqPart[] = [];
  location.services.forEach((service, index) => {
    if (index) serviceParts.push({ text: index === location.services.length - 1 ? ", and " : ", " });
    serviceParts.push({
      text: service.name,
      href: getLocalServiceHref(location.stateSlug, location.citySlug, service.slug),
    });
    if (service.comingSoon) serviceParts.push({ text: " (coming soon)" });
  });
  add("services", `What services does Zivel ${city} offer?`, [
    { text: `${label} lists these wellness services: ` },
    ...serviceParts,
    { text: `. Select a service name for its local service page, or contact ${location.name} about the services listed for ${city}. Services marked coming soon are not yet available.` },
  ]);
  const range = getSingleSessionRange(location);
  if (range) add("pricing", `How much does a session cost at Zivel ${city}?`, [
    { text: `${label} lists single-session prices from ${range.low} to ${range.high}. This range comes from the studio's published individual-session prices, not membership prices or multi-session packages. See ` },
    { text: "local pricing", href: pricingHref },
    { text: ` for memberships, packages, and seasonal deals, and contact the ${city} studio for personalized pricing.` },
  ]);
  if (isBrecksvilleLocation(location.stateSlug, location.citySlug) || !location.booking?.locationId) {
    add("booking", `How do I book a session at Zivel ${city}?`, [
      { text: `Contact ${label} at ` }, phonePart,
      { text: " about arranging a session. Call or text this studio directly with questions about the services listed on its location page. The " },
      { text: "local pricing page", href: pricingHref },
      { text: ` shows the published individual-session options, memberships, and packages for this ${city} location.` },
    ]);
  } else {
    add("booking", `How do I book a session at Zivel ${city}?`, [
      { text: `${label} offers online session booking or booking by phone. Use ` },
      { text: "Book Now", href: options.bookingUrl },
      { text: " to open this location's existing booking page, or call or text " }, phonePart,
      { text: `. For this ${city} studio's services and session options, refer to the local service pages and pricing page.` },
    ]);
  }
  add("memberships", `Does Zivel ${city} offer memberships or packages?`, [
    { text: `Yes. Memberships and packages are available at ${label}, offering more value per visit than single sessions. Visit the ` },
    { text: "location pricing page", href: pricingHref },
    { text: ` for membership and package options, and ask the ${city} studio for personalized pricing. Published pricing information for ${location.name} is linked here so you can review its local options.` },
  ]);
  const pathways = options.pathways ?? sharedPathways;
  if (pathways.length) add("pathways", `Does Zivel ${city} offer goal-based wellness pathways?`, [
    { text: `Yes. ${label} offers goal-based wellness pathways: ${pathways.map(pathway => pathway.name).join("; ")}. See the ` },
    { text: "local pathways page", href: `${base}/pathways` },
    { text: ` for these named plans at the ${city} studio.` },
  ]);
  add("medical", "Are Zivel services medical treatments?", [
    { text: `No. Zivel wellness services are not medical treatments and do not diagnose, treat, cure, or prevent disease. This applies to the wellness services listed by ${label}. People with health concerns or questions about whether a service is right for them should talk with their healthcare provider.` },
  ]);
  for (const [index, faq] of (location.localFaqs ?? []).entries()) {
    const question = plainFaqText(faq.question), answer = plainFaqText(faq.answer);
    if (question && answer) add(`local-${index}`, question, [{ text: answer }]);
  }
  return items;
}

export function buildLocationFaqSchema(items: readonly LocationFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
