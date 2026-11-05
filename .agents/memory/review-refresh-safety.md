---
name: Review refresh failure policy
description: Why valid partial updates are saved even though the refresh workflow remains failed.
---

Review refreshes deliberately keep successful studio updates when other
studios fail, while leaving the overall workflow failed. Do not discard
valid partial results merely to make a run uniformly successful or failed.

**Why:** The public site relies on a committed cache rather than live Google
calls. One studio's API failure must not erase its old reviews or prevent
unaffected studios from receiving fresh data. A green run or a full-cache
timestamp must not imply that failed studios were refreshed.

**How to apply:** Preserve failed studios' complete prior entries and
identities, distinguish partial from complete freshness, and test using
fixtures rather than a real key. Live cache-writing runs require owner
approval; do not change GitHub secrets or branch policies to force success.

## Canonical Place IDs

Do not weaken the identity check merely because Google returns HTTP 200.
Verify business name, street address, and the existing Google Maps listing
identifier before correcting a stored ID and rekeying its cache entry.

**Why:** Google accepted Hollywood's stored ID but returned a different
canonical ID for the same Maps listing. The guard correctly rejected the
mismatch; it was not an API-key failure. A successful HTTP response alone
cannot establish that a returned business is the intended studio.

**How to apply:** Correct the location mapping and cache key together,
preserving the cached review payload. Incorporate any newer automated cache
commit first so correcting one studio cannot overwrite other fresh entries.

## Review eligibility is intentional

Keep the existing five-star filter and content-exclusion mechanism for every location; do not loosen either when expanding review presentation.

**Why:** The user explicitly corrected the proposal to display all imported reviews and required both filters and existing rating labels to remain unchanged. Brecksville stays untouched under its exiting-brand policy.

**How to apply:** Apply ordering, display caps and expansion controls only after the existing eligibility filters, without changing imported review text or the refresh process.
