const HOLIDAY_ENABLED_LOCATIONS = new Set(["georgia/buckhead"]);

export function isHolidayLocation(stateSlug: string, citySlug: string): boolean {
  return HOLIDAY_ENABLED_LOCATIONS.has(`${stateSlug}/${citySlug}`);
}
