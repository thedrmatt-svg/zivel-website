import type { Location } from "@/types/location";
import { phoneHref } from "@/lib/contact-links";
import { isBrecksvilleLocation } from "@/lib/location-availability";
import { getLocalServiceHref } from "@/lib/data/local-service-pages";
import { pathways as sharedPathways } from "@/lib/data/pathways";
import { getLocationDisplayPrices, getLocationNeighborhood, getLiveLocationServices, joinNaturally } from "@/lib/location-presentation";
import { getLocationBookingAction } from "@/lib/location-booking";
import { getLocationMembershipMinimum } from "@/lib/location-memberships";
import { getLocationEnhancementCopy, membershipText } from "@/lib/location-enhancement-copy";
import { buildStructuredLocationFaqs } from "@/lib/location-local-faqs";

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
  locale?: string;
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
  const values = getLocationDisplayPrices(location).flatMap(row => {
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
  const label = `Zivel ${city}`;
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
  const open = options.groupedHours.filter(row => !/^closed$/i.test(row.time));
  const closed = options.groupedHours.filter(row => /^closed$/i.test(row.time)).map(row => row.label);
  const hours = joinNaturally(open.map(row => `${row.label} ${row.time}`));
  const hoursText = open.length
    ? `open ${hours}${closed.length ? `, and closed ${joinNaturally(closed)}` : ""}`
    : `closed ${joinNaturally(closed)}`;
  add("hours", `What are the hours at Zivel ${city}?`, [
    { text: `${label} is ${hoursText}. Call or text ` }, phonePart,
    { text: " with questions about hours." },
  ]);
  const neighborhood = getLocationNeighborhood(location);
  const parking = location.contact?.parking === "Free parking or street available"
    ? "Free parking or street parking is available."
    : location.contact?.parking
      ? `${location.contact.parking.trim().replace(/[.!?]+$/, "").replace(/ parking available$/i, " parking is available")}.`
      : "";
  add("directions", `Where is Zivel ${city} located, and is there parking?`, [
    { text: `${label} is at ${location.contact?.address ?? "the address shown in Location Details"}${neighborhood ? `, in the ${neighborhood} area` : ""}. ${parking ? `${parking} ` : ""}Use ` },
    { text: "the map and directions", href: "#map" },
    { text: " or call " },
    phonePart,
    { text: " for help finding us." },
  ]);
  const serviceParts: LocationFaqPart[] = [];
  const liveServices = getLiveLocationServices(location);
  liveServices.forEach((service, index) => {
    if (index) serviceParts.push({ text: index === liveServices.length - 1 ? (index === 1 ? " and " : ", and ") : ", " });
    serviceParts.push({
      text: service.name,
      href: getLocalServiceHref(location.stateSlug, location.citySlug, service.slug),
    });
  });
  const upcoming = location.services.filter(service => service.comingSoon);
  add("services", `What services does Zivel ${city} offer?`, [
    { text: `${label} offers ` },
    ...serviceParts,
    { text: `. Select any service for details and to book.${upcoming.length ? ` Coming soon: ${joinNaturally(upcoming.map(service => service.name))}.` : ""}` },
  ]);
  const range = getSingleSessionRange(location);
  const examplePrices = ["cryotherapy", "red-light-therapy", "infrared-sauna"].flatMap(slug => {
    const service = liveServices.find(service => service.slug === slug);
    const row = service && getLocationDisplayPrices(location).find(row =>
      row.name === service.name && (!row.note || /single[\s-]*session/i.test(row.note))
      && /^\$\s*[\d,]+(?:\.\d{1,2})?$/.test(row.price));
    return row ? [`${service!.name} is ${row.price}`] : [];
  }).slice(0, 2);
  if (range) add("pricing", `How much does a session cost at Zivel ${city}?`, [
    { text: `Single sessions at ${label} start at ${range.low}. ${examplePrices.length ? `${joinNaturally(examplePrices)}. ` : ""}See ` },
    { text: "local pricing", href: pricingHref },
    { text: " for memberships, packages, and seasonal deals." },
  ]);
  if (isBrecksvilleLocation(location.stateSlug, location.citySlug)) {
    add("booking", `How do I book a session at Zivel ${city}?`, [
      { text: `Contact ${location.name} in ${city} at ` }, phonePart,
      { text: " about arranging a session. Call or text this studio directly with questions about the services listed on its location page. The " },
      { text: "local pricing page", href: pricingHref },
      { text: ` shows the published individual-session options, memberships, and packages for this ${city} location.` },
    ]);
  } else {
    const action = getLocationBookingAction(location);
    add("booking", `How do I book a session at Zivel ${city}?`, [
      { text: action?.external ? "Book online with " : `Contact ${label} with ` },
      { text: action?.label ?? "the location page", href: action?.href ?? base },
      { text: ", or call or text " }, phonePart, { text: "." },
    ]);
  }
  const minimum = !isBrecksvilleLocation(location.stateSlug, location.citySlug) ? getLocationMembershipMinimum(location) : null;
  add("memberships", `Does Zivel ${city} offer memberships or packages?`, [
    { text: `Yes. Memberships and packages at ${label} offer more value per visit than single sessions. See ` },
    { text: "local pricing", href: pricingHref },
    { text: " for current options, or call " }, phonePart, { text: " for personalized pricing." },
    ...(minimum ? [{ text: membershipText(getLocationEnhancementCopy(options.locale).membershipFaq, minimum.price, minimum.unit) }] : []),
  ]);
  const pathways = options.pathways ?? sharedPathways;
  if (pathways.length) add("pathways", `Does Zivel ${city} offer goal-based wellness pathways?`, [
    { text: `Yes. ${label} offers ${["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"][pathways.length] ?? String(pathways.length)} goal-based pathways: ${pathways.map(pathway => pathway.name).join("; ")}. ` },
    { text: "Explore local pathways", href: `${base}/pathways` }, { text: "." },
  ]);
  add("medical", "Are Zivel services medical treatments?", [
    { text: "No. Zivel wellness services are not medical treatments and do not diagnose, treat, cure, or prevent disease. If you have health concerns or questions about whether a service is right for you, talk with your healthcare provider first." },
  ]);
  items.push(...buildStructuredLocationFaqs(location));
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
