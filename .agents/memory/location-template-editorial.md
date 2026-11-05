---
name: Location presentation and availability rules
description: User-confirmed scope for city-first main-page templates, breadcrumbs and coming-soon services.
---

## Main pages versus subpages
Generic location title, description, H1 city-first naming and hero-subhead formulas apply to main location pages only. Services, pricing, pathways and blog subpages keep their own title/description structures. Service accuracy applies across all those subpages.

**Why:** The user explicitly clarified that subpage metadata patterns should be inventoried for a later pass, not replaced by the generic main-page formulas.

**How to apply:** Derive main-page City from the address municipality, keep source data unchanged, and do not turn every service/blog title into the same location title.

### Fieldhouse naming exception
The business must remain **Zivel Fieldhouse**, not Zivel Hernando. It is inside the **Gatorade Fieldhouse near Hernando, MS**; keep Hernando as its actual address locality.

**Why:** The user corrected the city-first template because Zivel Fieldhouse is its established Google and public business name.

**How to apply:** Preserve the Fieldhouse business label in headings, FAQs, metadata and image descriptions, and identify the venue separately. Do not relabel it as a Hernando business name or invent a Fieldhouse neighborhood of Hernando.

## Breadcrumb consistency
Existing visible and BreadcrumbList location names must match the address city. Change the schema name values together with visible labels, preserving URLs and every other schema field.

**Why:** The user explicitly authorized this limited exception to the otherwise frozen non-FAQ/non-service-list JSON-LD.

**How to apply:** Keep business JSON-LD names, Google Business Profile names, legal/SMS/footer text and header navigation labels independent of city-first display naming.

## Coming-soon availability
Exclude flagged upcoming services from general location promotional metadata, hero service selections and JSON-LD service/offer lists until live. Keep the conditional visible FAQ sentence mirrored exactly in FAQPage JSON-LD.

**Why:** The user said advertising something visitors cannot book creates a mismatch between search snippets and the page.

**How to apply:** Respect actual availability flags without editing data and make the rule dormant when none are flagged. Highlands Ranch Red Light Therapy's own page metadata may explicitly say "coming soon"; keep its route, indexability, canonicals and sitemap entry, with no unqualified availability claims, book-now implication or Offer/Service JSON-LD listing. If compliance needs more than narrow copy/metadata edits, stop and show the exact conflict.

## Booking fallback
The location header mirrors the hero's primary booking action. With no online destination, use the hero's existing action or link to that location's main page if the hero has none. Never fall back to 11417 on a location route.

**Why:** The user explicitly rejected sending visitors to an unrelated studio when booking data is absent.

**How to apply:** Preserve non-location header behavior and existing booking restrictions; report other restricted studios instead of overriding them. Brecksville follows its separate exiting-brand, untouched policy.

## Metadata length and omissions
Append ", and more" whenever eligible services outnumber the services actually shown, including after dropping services to meet 155 characters; omit it only when all eligible services are shown. The title's 65-character maximum includes every layout suffix, and "| Zivel" must never be doubled.

**Why:** The user explicitly approved these counting and fallback rules; mixed neighborhood-suffixed and shorter titles are expected.

**How to apply:** Measure final rendered output, including the conditional description suffix, rather than only metadata inputs. Keep service names whole and use the approved title fallback order.
