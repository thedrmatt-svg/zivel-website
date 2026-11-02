import type { Location } from "@/types/location";

const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
] as const;

/** Parse display hours without turning unsupported values into midnight. */
export function parseSchemaTime(value: string): string | null {
  const time = value.trim();
  const twelveHour = time.match(/^(0?[1-9]|1[0-2])(?::([0-5]\d))?\s*(am|pm)$/i);
  if (twelveHour) {
    const hour = Number(twelveHour[1]) % 12 + (twelveHour[3].toLowerCase() === "pm" ? 12 : 0);
    return `${String(hour).padStart(2, "0")}:${twelveHour[2] ?? "00"}`;
  }
  const twentyFourHour = time.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
  return twentyFourHour
    ? `${twentyFourHour[1].padStart(2, "0")}:${twentyFourHour[2]}`
    : null;
}

export function buildOpeningHoursSpec(hours: Location["hours"]) {
  return DAYS.flatMap((day) => {
    const value = hours?.[day.toLowerCase() as keyof NonNullable<Location["hours"]>]?.trim();
    if (!value) return [];
    // Schema.org represents a closed day with both values set to 00:00.
    if (/^closed$/i.test(value)) {
      return [{ "@type": "OpeningHoursSpecification", dayOfWeek: day, opens: "00:00", closes: "00:00" }];
    }
    const parts = value.split(/\s*[–—-]\s*/);
    const opens = parts.length === 2 ? parseSchemaTime(parts[0]) : null;
    const closes = parts.length === 2 ? parseSchemaTime(parts[1]) : null;
    if (!opens || !closes) {
      throw new Error(`Invalid ${day} opening hours: ${value}`);
    }
    return [{ "@type": "OpeningHoursSpecification", dayOfWeek: day, opens, closes }];
  });
}

/** The same business identity and hours on studio and local-service pages. */
export function getLocationBusinessDetails(location: Location) {
  const fullAddress = location.contact?.address?.trim() ?? "";
  const addressParts = fullAddress.split(",").map((part) => part.trim());
  const streetAddress = addressParts.length >= 3
    ? addressParts.slice(0, -2).join(", ")
    : addressParts[0];
  // Match the ZIP at the end, never the first five-digit street number.
  const postalCode = fullAddress.match(/\b(\d{5}(?:-\d{4})?)\s*$/)?.[1];
  const city = location.city
    ?? (addressParts.length >= 3 ? addressParts[addressParts.length - 2] : undefined)
    ?? location.citySlug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

  return {
    name: location.stateSlug === "florida" && location.citySlug === "hollywood"
      ? "Zivel - Hollywood"
      : location.name,
    address: {
      "@type": "PostalAddress",
      ...(streetAddress && { streetAddress }),
      addressLocality: city,
      addressRegion: location.state,
      ...(postalCode && { postalCode }),
      addressCountry: "US",
    },
    openingHoursSpecification: buildOpeningHoursSpec(location.hours),
  };
}
