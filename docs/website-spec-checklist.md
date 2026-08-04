# Zivel Website Spec Checklist
Last updated: 2026-08-04
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
- [x] Open Graph image — og:image + twitter:image added to homepage, services listing, all 8 service detail pages, and all location city pages; locale layout fallback covers remaining pages
- [ ] Breadcrumb nav matches BreadcrumbList JSON-LD on all inner pages
- [ ] Page speed — Core Web Vitals passing in field data (CrUX), not just lab

## Accessibility / Semantics

- [x] Skip to main content link — present
- [x] Main landmark — added on local service pages and key templates
- [x] Contrast fixes on location/service pages — Lighthouse Accessibility improved
- [x] Document lang attribute — html lang="en" (and /es/ routes)
- [x] All images have meaningful alt text or explicit alt="" for decorative images — 42 images audited; 8 fixed in franchise/page.tsx (6 step imageAlts had developer "(replace with custom image)" notes, 1 inline had "(replace with growth chart)" note); services listing now uses s.hero.media?.alt from content files instead of bare s.name; all other images were already correct
- [x] Focus styles visible on all interactive elements — focus-visible:ring-2 gold added to all form inputs (ContactForm, PricingGateModal, FranchiseLeadForm, InvestmentGateProvider, LocationSearch, riverton-google LeadForm); global CSS fallback covers all button/link/input elements
- [x] Form labels associated with inputs — confirmed correct htmlFor/id pairs on all forms; radio groups use role="group" + aria-labelledby; no missing labels
- [x] Keyboard navigation works through header nav and modals — InvestmentGateProvider modal: full focus trap, Escape to close, return focus to trigger; mobile nav: Escape closes menu + restores focus to toggle; desktop nav dropdowns: group-focus-within:visible opens them on keyboard focus; all toggles have aria-expanded + aria-controls + panel IDs
- [x] Form validation errors identify the specific field that failed — all four forms (ContactForm, PricingGateModal, FranchiseLeadForm, InvestmentGateProvider) return per-field errors from server actions; each input renders aria-invalid + aria-describedby + inline red hint when its field fails

## Performance

- [x] CLS fixed — overflow-x clip + related layout fixes; Lighthouse Performance 100
- [x] LCP/hero image handling — preload + next/image
- [ ] Font display strategy — font-display: optional or swap confirmed for all custom fonts
- [ ] Third-party scripts deferred — Cherry widget, analytics loaded after page is interactive
- [ ] No render-blocking resources flagged in Lighthouse

## Security

- [x] HSTS header — Strict-Transport-Security: max-age=63072000; includeSubDomains (no preload)
- [x] X-Content-Type-Options — nosniff header present on all routes
- [x] X-Frame-Options / frame-ancestors — SAMEORIGIN + CSP frame-ancestors 'self' on all routes
- [x] Referrer-Policy — strict-origin-when-cross-origin on all routes
- [x] Permissions-Policy — camera=(), microphone=(), geolocation=() (+ payment, usb, bluetooth, and others) on all routes
- [x] Content-Security-Policy — frame-ancestors 'self' baseline present; CSP extended as needed for maps/booking iframe

## Legal / Privacy

- [x] Cookie consent — banner present if non-essential cookies are set (analytics, marketing)
- [x] Privacy policy completeness — covers data collection, third-party services, user rights
- [x] Terms and conditions — present and linked from footer
- [x] CCPA / GDPR opt-out mechanism — if applicable based on user geography

## Error Handling

- [x] Custom 404 page — branded, with nav and suggested links; returns HTTP 404 status
- [x] Custom 500 page — global-error.tsx (root) + [locale]/error.tsx (with header/footer); returns HTTP 500 in production

## Agent-Readiness

- [x] /llms.txt — H1 + blockquote + Markdown [text](url) links; Lighthouse Agentic Browsing 3/3
- [x] robots.txt AI crawler allows — GPTBot, Google-Extended, ClaudeBot, etc.
- [ ] agents.json / .well-known/agents — optional agent identity manifest
- [ ] Per-page .md endpoints — optional machine-readable page content
- [ ] MCP endpoint — optional Model Context Protocol integration
- [ ] A2A protocol — optional agent-to-agent handshake support
