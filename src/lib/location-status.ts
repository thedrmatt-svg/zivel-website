import type { Location } from "@/types/location";

export const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
type Hours = Location["hours"];
export type StatusCopy = {
  opensToday: string; openNow: string; closedNow: string; closedToday: string; tomorrow: string;
};

export function getLocationTimezone(location: Location) {
  const explicit = (location as Location & { timezone?: string; timeZone?: string }).timezone
    ?? (location as Location & { timeZone?: string }).timeZone;
  if (explicit) {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: explicit }).format();
      return { zone: explicit, source: "stored timezone" };
    } catch { return { zone: null, source: "invalid stored timezone" }; }
  }
  const zones: Record<string, string> = {
    "north-carolina": "America/New_York", georgia: "America/New_York",
    florida: "America/New_York", kentucky: "America/New_York", ohio: "America/New_York",
    arkansas: "America/Chicago", mississippi: "America/Chicago",
    louisiana: "America/Chicago", tennessee: "America/Chicago",
    colorado: "America/Denver", utah: "America/Denver",
  };
  return { zone: zones[location.stateSlug] ?? null, source: "approved state/location mapping" };
}

function parseTime(text: string) {
  const match = text.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!match) return null;
  const hour = Number(match[1]), minute = Number(match[2] ?? 0);
  if (hour < 1 || hour > 12 || minute > 59) return null;
  return (hour % 12 + (match[3].toLowerCase() === "pm" ? 12 : 0)) * 60 + minute;
}

/** Unknown, missing or split/overnight hours fail closed rather than guessing. */
export function parseLocationHours(hours: Hours) {
  const result = [];
  for (const day of WEEKDAYS) {
    const text = hours?.[day]?.trim();
    if (!text) return null;
    if (/^closed$/i.test(text)) { result.push(null); continue; }
    const match = text.match(/^(.+?)\s*[–—-]\s*(.+?)$/);
    if (!match) return null;
    const start = parseTime(match[1]), end = parseTime(match[2]);
    if (start === null || end === null || end <= start) return null;
    result.push({ start, end, opens: match[1].trim(), closes: match[2].trim() });
  }
  return result;
}

export function getLocationStatus(hours: Hours, zone: string | null, now: Date, locale: string, copy: StatusCopy): string | null {
  const week = parseLocationHours(hours);
  if (!week || !zone || !Number.isFinite(now.getTime())) return null;
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: zone, weekday: "long", hour: "numeric", minute: "numeric", hourCycle: "h23",
    }).formatToParts(now);
    const part = (type: string) => parts.find(value => value.type === type)?.value ?? "";
    const index = WEEKDAYS.indexOf(part("weekday").toLowerCase() as typeof WEEKDAYS[number]);
    if (index < 0) return null;
    const minute = Number(part("hour")) * 60 + Number(part("minute"));
    const today = week[index];
    const format = (template: string, values: Record<string, string>) =>
      template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
    if (today && minute < today.start) return format(copy.opensToday, { time: today.opens });
    if (today && minute < today.end) return format(copy.openNow, { time: today.closes });
    for (let offset = 1; offset <= 7; offset++) {
      const next = week[(index + offset) % 7];
      if (!next) continue;
      // A fixed UTC Monday anchors weekday localization without DST arithmetic.
      const day = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" })
        .format(new Date(Date.UTC(2024, 0, 1 + ((index + offset) % 7))));
      return format(today ? copy.closedNow : copy.closedToday, {
        day: today && offset === 1 ? copy.tomorrow : day, time: next.opens,
      });
    }
    return null;
  } catch { return null; }
}
