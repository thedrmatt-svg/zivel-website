# Zivel Website Spec Checklist
Last updated: 2026-08-03
Live site: https://www.zivel.com
Lighthouse (homepage/services): Performance 100 · SEO 100 · Accessibility 100 · Best Practices 100 · Agentic 3/3

---

## SEO / Foundations

- [x] Meta description in initial `<head>` (not late-streamed) — fixed with `force-static` + clean middleware; Lighthouse SEO 100
- [x] Title element present and unique — verified in production source
- [x] Canonical + hreflang — present
- [x] robots meta index,follow — present
- [x] Server-side / static rendering on key pages — `force-static` on homepage, services, science
- [x] XML sitemap — live at /sitemap.xml, includes locations, services, local service pages, blogs
- [x] robots.txt — present; AI crawlers explicitly allowed
- [x] URL structure — clean /locations/state/city and /services/slug patterns
- [x] Structured data (JSON-LD) — Organization, WebSite, Service, BreadcrumbList present
- [x] IndexNow — key file + helper wired
- [x] Stable redirects (301) for old paths/subdomains — configured
- [ ] Open Graph image — og:image tag present and resolves to a valid image
- [ ] Breadcrumb nav matches BreadcrumbList JSON-LD on all inner pages
- [ ] Page speed — Core Web Vitals passing in field data (CrUX), not just lab

## Accessibility / Semantics

- [x] Skip to main content link — present
- [x] Main landmark — added on local service pages and key templates
- [x] Contrast fixes on location/service pages — Lighthouse Accessibility improved
- [x] Document lang attribute — html lang="en" (and /es/ routes)
- [ ] All images have meaningful alt text or explicit alt="" for decorative images
- [ ] Focus styles visible on all interactive elements
- [ ] Form labels associated with inputs (contact, booking forms)
- [ ] Keyboard navigation works through header nav and modals

## Performance

- [x] CLS fixed — overflow-x clip + related layout fixes; Lighthouse Performance 100
- [x] LCP/hero image handling — preload + next/image
- [ ] Font display strategy — font-display: optional or swap confirmed for all custom fonts
- [ ] Third-party scripts deferred — Cherry widget, analytics loaded after page is interactive
- [ ] No render-blocking resources flagged in Lighthouse

## Security

- [ ] HSTS header — Strict-Transport-Security set
- [ ] X-Content-Type-Options — nosniff header present
- [ ] X-Frame-Options / frame-ancestors — clickjacking protection configured
- [ ] Referrer-Policy — set to strict-origin-when-cross-origin or tighter
- [ ] Permissions-Policy — camera, microphone, geolocation scoped appropriately
- [ ] Content-Security-Policy — baseline policy defined

## Legal / Privacy

- [ ] Cookie consent — banner present if non-essential cookies are set (analytics, marketing)
- [ ] Privacy policy completeness — covers data collection, third-party services, user rights
- [ ] Terms and conditions — present and linked from footer
- [ ] CCPA / GDPR opt-out mechanism — if applicable based on user geography

## Error Handling

- [ ] Custom 404 page — branded, with nav and suggested links; returns HTTP 404 status
- [ ] Custom 500 page — branded error page for server errors; returns HTTP 500 status

## Agent-Readiness

- [x] /llms.txt — H1 + blockquote + Markdown [text](url) links; Lighthouse Agentic Browsing 3/3
- [x] robots.txt AI crawler allows — GPTBot, Google-Extended, ClaudeBot, etc.
- [ ] agents.json / .well-known/agents — optional agent identity manifest
- [ ] Per-page .md endpoints — optional machine-readable page content
- [ ] MCP endpoint — optional Model Context Protocol integration
- [ ] A2A protocol — optional agent-to-agent handshake support
