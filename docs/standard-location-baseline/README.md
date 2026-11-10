# Standard location pages: pre-holiday restoration reference

Saved November 10, 2026, before any approved holiday treatment was applied to
normal location pages. The holiday designs currently exist separately at
`/mock` and `/mock-pricing`.

## Start here when the holidays end

The owner requested that the current standard location hero sections and related
settings be saved here so they can be restored quickly after the holidays.

**Restore the standard appearance, not outdated business information.** Keep any
newer approved hours, prices, services, photos, contact details, booking links,
tracking, consent behavior, and accessibility fixes. Never overwrite the whole
site with this snapshot.

### Saved files

- `standard-source.tar.gz`: exact source-file reference for the current main
  location template, pricing template, their layouts, shared location
  components, theme CSS, location content/data, and supporting presentation
  helpers. Files keep their original workspace-relative paths inside the archive.
- `manifest.json`: archive checksum, individual source checksums, file list, and
  referenced local image checksums. This also records which referenced image
  files were absent when the snapshot was taken.
- This guide: the visual baseline and safe restoration procedure.

The archive contains source and settings, **not image binaries or secrets**.
Retain the existing `public/` assets during holiday work. The manifest preserves
image paths and checksums, not a separate copy of every image. If a holiday
rollout will overwrite an existing image, save that original separately first
or use a new seasonal filename instead.

Do not regenerate or overwrite this baseline during holiday implementation.
Make a separately dated baseline if the owner approves a new standard design.

## Standard main location page

### Hero and introduction

- Full-width standard studio image from `location.hero.image`; the existing
  fallback is `/images/home/hero.jpg`.
- Black hero/information background, white text, and Zivel gold accents.
  No holiday navy replacement, snow, bow, seasonal heading, or holiday offer
  cards in place of the standard studio hero.
- Hero image viewport ratio `1920/672`. Image rendering uses intrinsic
  `1920 × 800`, full width, automatic height, `marginTop: -3.333vw`,
  quality 80, priority loading, and `sizes="100vw"`.
- Original full-bleed positioning, top padding, and negative offsets are
  preserved exactly in the archived template; restore them together rather
  than guessing offsets.
- Black information block with responsive spacing, centered `max-w-6xl`
  content, breadcrumbs, optional studio note, business-name H1, generated
  service-aware subheading, and optional neighborhood line.
- H1 is serif, light weight, `text-5xl md:text-7xl`, with the existing entrance
  animation. The subheading uses `text-lg text-white/75`.
- Keep the owner's business names exactly as supplied. Business names do not
  automatically become address-city names. In particular, preserve Zivel
  Buckhead, Zivel Windermere, and Zivel Fieldhouse.
- Keep all original location-specific CTAs and conditions. Book Now follows the
  studio's own booking action; do not replace it with another location's link.
  Preserve phone/status, membership teaser, and optional notes as implemented.

### The rest of the main page

- Keep existing trust-bar contents and rating labels, conditional announcements,
  awards, deals, and all other location-specific visibility rules.
- Shared ordered sections are services, pricing, reviews, booking, pathways,
  details, map, and blog, subject to their existing conditional visibility.
  Other sections outside that ordered group remain where the template renders
  them; the archive is the exact source of truth.
- Preserve the original alternating light/dark backgrounds. The template's
  section-parity calculation is deliberate; do not replace every section with
  one color or recalculate parity from the reordered list.
- Service cards keep their normal imagery, crop positions, hover shimmer,
  availability, and location-specific image exceptions.
- Preserve the standard FAQ accordion, contact/booking sections, map embed,
  Google listing link, review filtering, and mobile action behavior.
- No foliage, bows, snow, seasonal overlays, or seasonal self-care/gift-care
  message is part of this standard baseline.

## Standard pricing page

- Hero classes: `zv-bleed zv-hero-bg zv-noise py-20 md:py-28`.
- Breadcrumbs, **Investment** tagline, and **Pricing & Memberships** heading.
- Heading classes:
  `font-serif text-4xl md:text-6xl font-light tracking-tight text-white`.
- Introductory copy:
  `Local pricing and membership options for Zivel {cityDisplay}.`
  The additional `Unlock full details below.` text remains conditional;
  Windermere does not show it.
- Keep the Back to location link and its studio-specific name and destination.
- Standard navigation order: **Memberships → Services → Packages → Specials**.
  If gift cards exist, their link is inserted before Specials by the current
  data-driven rule. Do not erase legitimate location-specific gift cards.
- Restore **Specials**, not **Holiday Specials**, to its original placement
  after the standard preceding pricing groups. Remove only expired,
  owner-designated holiday offers, not unrelated current specials.
- Main content uses the standard elevated dark section. Keep membership tiers,
  recovery/premium service groups, package cards, original-price strike-throughs
  where applicable, gift cards, disclaimers, and the current purchase links.
- Preserve the actual pricing lead-capture gate and its existing location
  exceptions. The mock pricing preview's gate bypass is not a live-page setting.
- No full-page snow, gold bow, holiday navy styling, or seasonal hero copy.

## Shared theme and behavior

- Gold: `#d4af37`; light gold: `#e8cc6e`; dark gold: `#b8942e`.
- Exact standard backgrounds, gradients, noise, fonts, animation, responsive
  breakpoints, and reduced-motion behavior are saved in `src/styles/globals.css`
  inside the archive.
- Preserve the working header, footer, consent banner, Cherry financing rules,
  sticky mobile actions and offsets, location-specific analytics, and booking.
  A visual restoration must not reinstall tracking or create duplicate loads.
- Preserve normal live metadata, canonicals, structured data, and sitemap
  entries. Never copy the mock routes' noindex/schema omissions to live pages.
- Keep Brecksville's existing exiting-brand restrictions and behavior untouched.
  Do not restore services that were removed for Briargate, Highlands Ranch, or
  another location, or reverse later approved service/image changes.

## Safe restoration procedure

1. List the studios actually given holiday treatment. Do not change studios
   that stayed standard.
2. If the rollout used a holiday-enable setting, disable that presentation for
   those studios first. Prefer this to replacing source files.
3. Compare changed presentation with the saved sources. Restore only seasonal
   hero/content/CSS changes and original section placement. Keep newer business
   data and unrelated fixes.
4. Remove seasonal decorations and expired offer links/copy as approved by the
   owner. Restore each studio's own standard image, headline, and CTA mapping.
5. Check main/pricing pages at desktop and phone widths, including header,
   hero, service cards, FAQ, trust bar, section order, and pricing navigation.
6. Verify booking/purchase destinations, phone links, directions, forms,
   reduced-motion behavior, consent, and tracking. Do not submit purchases.
7. Verify metadata, schema, sitemap eligibility, and non-participating studios
   remain unchanged. Run the applicable location/mock tests and type check.
8. Report the studios and files changed. No commit, push, publish, or deployment
   is authorized by this document.

### Inspecting the backup without overwriting the project

Run these commands in the **Replit workspace Shell**:

```sh
# List the saved files.
tar -tzf docs/standard-location-baseline/standard-source.tar.gz

# Read a saved template directly, without extracting over the current project.
tar -xOzf docs/standard-location-baseline/standard-source.tar.gz \
  'src/app/[locale]/locations/[state]/[city]/page.tsx'

# For comparisons, extract only to a temporary directory.
baseline_dir="$(mktemp -d /tmp/zivel-standard-baseline.XXXXXX)"
tar -xzf docs/standard-location-baseline/standard-source.tar.gz -C "$baseline_dir"
printf 'Baseline extracted to: %s\n' "$baseline_dir"
```

Do **not** extract the archive directly into the workspace to roll back the site.
It contains historical business data for reference as well as presentation.

## Related holiday instructions

See `../holiday-location-rollout.md` for applying the two approved holiday
references per location. Before each rollout, preserve this standard baseline
and keep seasonal configuration separate from permanent studio data.
