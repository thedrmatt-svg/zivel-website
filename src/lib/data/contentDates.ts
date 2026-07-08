/**
 * Fallback "last meaningful content change" date used when a content item
 * does not yet define its own `updatedAt`/`createdAt`/`publishedAt` value.
 *
 * This must NOT be `new Date()` — sitemap <lastmod> values must stay stable
 * across rebuilds/redeploys. When a piece of content actually changes,
 * add/update an explicit `updatedAt` on that content item instead of
 * relying on this fallback.
 */
export const DEFAULT_CONTENT_DATE = "2026-02-16";

export function withContentDateFallback<T extends { createdAt?: string; updatedAt?: string }>(
  item: T,
  fallback: string = DEFAULT_CONTENT_DATE
): T & { createdAt: string; updatedAt: string } {
  return {
    ...item,
    createdAt: item.createdAt ?? fallback,
    updatedAt: item.updatedAt ?? item.createdAt ?? fallback,
  };
}
