---
name: Large route audits
description: Safely validate broad route coverage without exhausting the Next.js development server.
---

## Rule
Do not parallel-crawl the entire sitemap against `next dev`. Audit metadata from the route definitions and verify representative rendered routes instead; use a production build or a rate-limited crawl only when full live-route validation is essential.

**Why:** The development server compiles route modules on demand. Concurrent requests across hundreds of routes can saturate it and terminate the workflow before the audit completes.

**How to apply:** Keep dev-server checks targeted and sequential. Before a site-wide check, prefer source-level coverage analysis; after the audit, confirm the workflow is running and re-check a small set of representative routes.