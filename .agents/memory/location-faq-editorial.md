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

**How to apply:** Use only owner-supplied local facts; omit incomplete entries from both visible text and FAQPage schema, remove the current municipality from nearby-community lists, and exclude Brecksville from structured local additions and other-studio calculations. Keep manual localFaqs separate and empty until specifically approved.
