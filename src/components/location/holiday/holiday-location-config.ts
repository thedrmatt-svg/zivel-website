const HOLIDAY_ENABLED_LOCATIONS = new Set([
  "georgia/buckhead",
  "florida/coral-gables",
  "colorado/parker",
  "arkansas/rogers",
  "arkansas/bentonville",
  "utah/riverton",
]);

// Seasonal exception: set false to restore the normal signup gate even while
// holiday presentation remains enabled. Disabling holiday mode also restores it.
export const HOLIDAY_PRICING_SIGNUP_PAUSED = true;

export function isHolidayLocation(stateSlug: string, citySlug: string): boolean {
  return HOLIDAY_ENABLED_LOCATIONS.has(`${stateSlug}/${citySlug}`);
}
