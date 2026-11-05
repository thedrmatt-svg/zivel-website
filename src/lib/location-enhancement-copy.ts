import en from "@/messages/en.json";
import es from "@/messages/es.json";

export type LocationEnhancementCopy = typeof en.locationEnhancements;
export function getLocationEnhancementCopy(locale = "en"): LocationEnhancementCopy {
  return locale === "es" ? { ...en.locationEnhancements, ...es.locationEnhancements } : en.locationEnhancements;
}

export function membershipText(template: string, price: string, unit: string) {
  // Stored prices already include "$"; preserve the pricing page's cadence verbatim.
  return template.replace("{price}", price).replace("{unit}", unit);
}
