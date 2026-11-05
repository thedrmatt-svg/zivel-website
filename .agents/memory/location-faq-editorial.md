---
name: Local FAQ editorial approval
description: Approval requirements for location-specific FAQ content.
---

Standard location FAQs may use existing location data, but do not invent location-specific FAQ content. Manual localFaqs entries should stay empty until the user supplies approved questions and answers.

**Why:** The user explicitly requested blank local FAQ slots for all 19 locations and a template for supplying approved content.

**How to apply:** Use the approved entries supplied through `LOCAL_FAQ_TEMPLATE.md` or directly by the user. Existing sample copy elsewhere in the project is not approval to publish new location-specific answers.

## Approved structured local templates

The user has approved data-driven local questions using supplied county, nearby-community, partner-app and venue fields, plus other same-state studios derived from the registered locations. This does not authorize invented manual FAQs or enrichment of local facts.

**Why:** The user supplied exact local values and template wording, with a strict instruction to omit any question missing a required field rather than guess its content.

**How to apply:** Use only owner-supplied local facts; omit incomplete entries from both visible text and FAQPage schema, remove the current municipality from nearby-community lists except Windermere's explicitly requested Cumming entry, and exclude Brecksville from structured local additions and other-studio calculations. Keep manual localFaqs separate and empty until specifically approved.

Windermere's service-area FAQ must include Cumming, alongside Alpharetta and Johns Creek, even though Cumming is also its address municipality.

**Why:** The user explicitly corrected the municipality-filtering result and requested Cumming's inclusion.

**How to apply:** Retain this exception only for Windermere; do not loosen other studios' approved municipality filtering.

Other-state-studio FAQ lists must also exclude studios explicitly marked not yet open or coming soon. Do not alter data to force expected counts; report each affected list even when its count remains unchanged.

**Why:** The user added this condition when approving the structured local FAQ plan.

**How to apply:** Inspect studio-level opening flags, not service-level coming-soon flags. A coming-soon service alone does not mean the studio is closed.
