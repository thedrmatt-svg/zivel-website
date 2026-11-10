# Standard-page restoration reference

Before applying holiday designs, consult
[`standard-location-baseline/README.md`](standard-location-baseline/README.md).
Its saved source archive records the pre-holiday standard appearance. Keep it
unchanged and preserve original assets; after the season, restore presentation
without reverting newer business information or unrelated fixes.

# Approved holiday location rollout guidelines

## Approval and scope

The owner approved `/mock` and `/mock-pricing` as the visual references for
location-specific holiday main pages and pricing pages.

Replicate these designs, not a new interpretation. The owner will supply the
exact wording, image guidelines/assets, prices, and purchase links for each
location and for both pages. Approval of the design is not authorization to
roll it out to every studio or publish changes.

Work on explicitly requested locations only. Keep both reference pages unchanged
unless the owner requests revisions. No commits, push, publish, or deployment
without a separate instruction.

## Required information for each location

Collect and map these inputs before editing:

| Input | Main location page | Pricing page |
| --- | --- | --- |
| Exact owner-approved studio name and location | Required | Same studio |
| Heading, subheading, and body copy | Exact supplied text | Exact supplied text |
| Holiday offers and their display order | Each hero offer | Each Holiday Specials offer |
| Image file or image guidelines | Per offer, including crop/focal point | Per offer where applicable |
| Offer name and description | Exact supplied text | Exact supplied text |
| Price, quantity, duration, and original price if applicable | Per offer | Per offer |
| Button label and purchase URL | Per button | Per button |
| Eligibility and restrictions | Members-only, service limitations, etc. | Same rules for corresponding offers |
| Validity, expiration, and required disclaimer | Owner-supplied | Owner-supplied |

Confirm whether both pages describe the same offer and share a purchase link;
do not assume they do. If something essential is missing or contradictory, ask
for that item rather than inventing wording, a price, discount, expiry, or URL.
Preserve exact supplied wording and prices, including punctuation and formatting.

## Reference A: main location page — `/mock`

Use the actual reference implementation and its responsive rules:

- `src/app/mock/HollywoodHolidayHero.tsx`
- `src/app/mock/HollywoodLocationInfo.tsx`
- `src/app/mock/HollywoodHolidayHero.module.css`
- `src/app/mock/HollywoodMockContent.tsx`

Approved appearance:

- Navy holiday hero, centered studio label above the Holiday Offers title,
  gold accents, serif headings, and the current transparent gold bow at top left.
- Match the current bow size, opacity, cropping, and placement; do not copy the
  pricing page's different bow settings onto the main page.
- Snow and falling snow in the hero, with reduced-motion support.
- The reference has three image-led offer cards with gold borders, gold purchase
  buttons, restrained diagonal gold shimmer on hover/focus, and the current
  compact desktop/mobile arrangements.
- Replace sample offers only with the owner's location-specific offers. If the
  supplied number of offers differs, confirm the layout adjustment rather than
  inventing cards or silently dropping an offer.
- Compact navy studio-info section: approved seasonal copy, correct studio name,
  address, clickable phone, open/closed status, one Book Now action, and quieter
  Pricing and Directions links.
- Navy trust bar, FAQ background, and main-page pricing background.
- Services background uses the approved light winter ivory/champagne treatment
  with subtle gold illumination and frost accents, retaining readable dark text.
- Preserve the existing remaining location sections and their order.
- No pine branches, holly, berries, or foliage lighting.

The main mock's current purchase buttons all point to Hollywood pricing. Those
are reference destinations, not the default for rollout: replace each requested
purchase action with the exact URL supplied for that studio and offer.

## Reference B: pricing page — `/mock-pricing`

Use:

- `src/app/mock-pricing/HollywoodMockPricingContent.tsx`
- `src/app/mock-pricing/HollywoodMockPricing.module.css`
- `src/app/mock-pricing/layout.tsx`

Approved appearance and behavior:

- Navy hero and pricing content, existing gold accents, and the approved type
  treatments.
- Gold bow at top right, at its current enlarged size, fully opaque, without the
  dark fade/mask. Keep the current mirrored orientation and responsive sizing.
- Snow falls across the entire page while scrolling, not just within the hero.
  The decoration cannot intercept links, buttons, forms, or navigation.
- Respect reduced-motion settings with a static, restrained treatment.
- Hero has a main heading, emphasized subheading, and separate paragraph.
  Use the owner's exact location-specific text; the approved reference begins
  “Holiday Specials, Pricing & Memberships.”
- Rename Specials to **Holiday Specials** and place it before memberships.
  The section navigation must match that order and its anchors must still work.
- Preserve all normal membership, individual-service, and package content unless
  the owner explicitly supplies changes. Holiday design is not permission to
  alter standard pricing.

Hollywood's source pricing currently renders a “Check Back Soon” fallback in
Specials. It is not an approved holiday offer. Replace the fallback only when
the owner supplies that location's real holiday offers.

## Live-page safety rules

1. Keep changes location-scoped and holiday-enabled only for approved studios.
   Shared components/styles must not change non-participating locations.
2. Do not copy Hollywood's name, address, phone, hours, reviews, service
   availability, booking destination, Maps URL, or purchase links to another
   studio. Use the target studio's existing verified information.
3. Keep owner-approved business names exactly as supplied; address cities and
   surrounding service areas do not rename the business.
4. Check that each offer is actually available at that location, including any
   coming-soon or booking restrictions. Resolve a conflict with the owner rather
   than bypassing a restriction.
5. Preserve live headers, footers, working navigation, consent behavior, tracking
   scope, booking rules, and existing lead-capture behavior. The pricing mock
   bypasses its lead form for previewing; that bypass must not migrate to live
   pricing without explicit approval. The owner has now explicitly approved
   temporarily removing the signup card for holiday-enabled location pricing
   pages. Keep the form implementation intact, preserve non-holiday behavior,
   and restore the usual gate after the holiday period.
6. Keep normal live canonicals, indexability, sitemap entries, metadata, and
   existing valid structured data. The mock pages intentionally omit schema
   and use noindex; those preview protections must **not** be copied onto live
   pages. Any offer-schema changes require actual applicable offer data, not
   mock prices or fabricated availability.
7. Keep `/mock` and `/mock-pricing` unlisted/noindex, out of the sitemap, and free
   of added location advertising tags and schema.
8. Keep Brecksville untouched under the existing exiting-brand restriction
   unless the owner explicitly changes that instruction. Do not broaden rollout
   scope because another studio shares a template.

## Implementation and verification for each requested studio

1. Build a location/offer mapping from the supplied information. Check quantities,
   eligibility, purchase links, dates, images, and matching offers across pages.
2. Start from the approved reference components/CSS. Prefer shared holiday
   presentation with explicit per-location data rather than independent designs
   that drift. Keep existing live behavior behind its original rules.
3. Apply the holiday treatment only to the requested studio's main/pricing pages.
   Never apply blanket global CSS or enable holiday offers for all locations.
4. Compare desktop and mobile screenshots to the matching approved reference.
   Match spacing, colors, typography, cards, bow, snow, shimmer, and section
   ordering; allow only the necessary wrapping for the supplied copy.
5. Verify each purchase button against the supplied URL and correct studio/offer.
   Do not place an order or submit a payment to test a destination.
6. Verify Book Now, phone, Directions, pricing navigation, FAQ accordion,
   responsive layout, keyboard focus, and reduced-motion behavior. Keep text
   readable and decorations non-interactive.
7. Check main/pricing offer consistency and confirm unrelated standard prices,
   services, metadata, schema, tracking, consent, and lead forms remain intact.
8. Check a non-participating location and both approved mocks for regressions.
   Run applicable tests/type checks and verify scoped schema/indexing behavior.
9. Report the exact location and routes changed, offer/link mapping, missing
   inputs, files changed, and verification results. Leave work uncommitted and
   unpublished unless separately instructed.

## Owner handoff format

```text
Location:

MAIN PAGE
Studio label / heading:
Seasonal info-section message:
Offer 1:
  Name:
  Description / quantity / duration:
  Price / original price if applicable:
  Image file or guidelines:
  Button text:
  Purchase URL:
  Eligibility / restrictions:
[Repeat for each offer in display order]
Dates / disclaimer:

PRICING PAGE
Heading:
Subheading:
Paragraph:
Holiday Specials:
  [Offer details, images, prices, buttons, links, restrictions, display order]
Dates / disclaimer:
Other specifically requested pricing changes, if any:
```
