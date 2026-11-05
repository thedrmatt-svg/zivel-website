---
name: Large route audits
description: Safely validate broad route coverage without exhausting the Next.js development server.
---

## Rule
Do not parallel-crawl the entire sitemap against `next dev`. Audit metadata from the route definitions and verify representative rendered routes instead; use a production build or a rate-limited crawl only when full live-route validation is essential.

**Why:** The development server compiles route modules on demand. Concurrent requests across hundreds of routes can saturate it and terminate the workflow before the audit completes.

**How to apply:** Keep dev-server checks targeted and sequential. Before a site-wide check, prefer source-level coverage analysis; after the audit, confirm the workflow is running and re-check a small set of representative routes.

For hundreds of served-page checks, prefer an isolated production build over a dev-server crawl, even with sequential requests; stop on infrastructure 502/503/504 responses rather than continuing the crawl.

**Why:** On-demand compilation can accumulate enough memory to stop the development workflow even when HTTP requests themselves are sequential, especially alongside browser and source-render checks.

**How to apply:** Run broad link coverage against an ephemeral production test server, shut it down afterward, and keep preview verification targeted.

## Template coverage is not served-page coverage

Check actual location URLs with redirects disabled before claiming that a shared-template change reaches every public location page.

**Why:** A successful server-rendering test can bypass routing rules. During the FAQ work, all location templates rendered correctly, but two main location URLs redirected visitors to separate franchise websites.

**How to apply:** Report template coverage separately from HTTP-served coverage. Treat locale-prefixed URLs as separate HTTP targets rather than inferring their redirect behavior from the English URL. Preserve existing external redirects unless the user explicitly authorizes a routing change; updating a template does not update the destination website.