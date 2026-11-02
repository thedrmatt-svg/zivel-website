/** All current studios use North American numbers. Preserve display formatting separately. */
export function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (phone.trim().startsWith("+") || (digits.length === 11 && digits.startsWith("1"))) {
    return `tel:+${digits}`;
  }
  throw new Error("A complete phone number with a country code is required");
}

/** Contact details embedded in prose, excluding partial numbers and URL paths. */
export function contactMatches(text: string) {
  return text.matchAll(
    /(?<![\w@/])(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|(?:\+?1[\s.-]?)?(?:\([2-9]\d{2}\)|[2-9]\d{2})[\s.-]?[2-9]\d{2}[\s.-]?\d{4})(?![\w@/])/gi,
  );
}
