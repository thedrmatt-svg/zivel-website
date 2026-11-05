---
name: Location presentation and availability rules
description: User-confirmed scope for city-first main-page templates, breadcrumbs and coming-soon services.
---

## Main pages versus subpages
Generic location title, description, H1 city-first naming and hero-subhead formulas apply to main location pages only. Services, pricing, pathways and blog subpages keep their own title/description structures. Service accuracy applies across all those subpages.

**Why:** The user explicitly clarified that subpage metadata patterns should be inventoried for a later pass, not replaced by the generic main-page formulas.

**How to apply:** Derive main-page City from the address municipality, keep source data unchanged, and do not turn every service/blog title into the same location title.

## Breadcrumb consistency
Existing visible and BreadcrumbList location names must match the address city. Change the schema name values together with visible labels, preserving URLs and every other schema field.

**Why:** The user explicitly authorized this limited exception to the otherwise frozen non-FAQ/non-service-list JSON-LD.

**How to apply:** Keep business JSON-LD names, Google Business Profile names, legal/SMS/footer text and header navigation labels independent of city-first display naming.

## Coming-soon availability
Exclude flagged upcoming services from search metadata, hero service selections and JSON-LD service/offer lists until live. A coming-soon label belongs only in the conditional visible FAQ sentence, mirrored exactly in FAQPage JSON-LD.

**Why:** The user said advertising something visitors cannot book creates a mismatch between search snippets and the page.

**How to apply:** Respect actual availability flags without editing data, and make the rule dormant when no services are flagged. Review dedicated upcoming-service pages explicitly; do not resolve conflicts by silently changing URLs, canonicals, indexability or sitemap output.
