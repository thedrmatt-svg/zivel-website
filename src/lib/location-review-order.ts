/** Operates on the already-filtered reviews; never changes eligibility or text. */
export function orderLocationReviews<T extends { text: string | null }>(reviews: readonly T[]): T[] {
  const words = (text: string | null) => text?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  const ranked = reviews.map((review, index) => ({ review, index, count: words(review.text) }));
  if (ranked.filter(row => row.count >= 20).length < 3) return [...reviews];
  return ranked.sort((a, b) => {
    if (a.count >= 20 && b.count >= 20) return b.count - a.count || a.index - b.index;
    if (a.count >= 20) return -1;
    if (b.count >= 20) return 1;
    return a.index - b.index;
  }).map(row => row.review);
}
