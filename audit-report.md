# Website Spec Audit — https://www.zivel.com
_Generated 2026-07-30 using [The Website Specification](https://specification.website) MCP server_

---


## High-Level Summary

This report audits **https://www.zivel.com** against [The Website Specification](https://specification.website).

It covers five categories most relevant to a franchise wellness site:

| Category | Focus |
|---|---|
| **SEO** | Crawlability, structured data, sitemaps, URL structure |
| **Accessibility** | WCAG compliance, semantic HTML, keyboard navigation |
| **Security** | HTTPS, CSP, headers, dependency hygiene |
| **Performance** | Core Web Vitals, caching, asset optimization |
| **Agent-Readiness** | AI crawler access, structured metadata, `llms.txt` |

Items are drawn from two tiers:
- **Required** — platform contract; broken sites fail here
- **Recommended** — modern sites should do this; high ROI


---

## Baseline Audit Plan (Required-Tier — All Categories)

> These are the **contract-level** requirements every public website must meet.

You are auditing the website https://www.zivel.com against The Website Specification (https://specification.website). Focus on every **required** item across the spec. For each item below, decide PASS / FAIL / UNCLEAR by fetching the page (and headers) and citing the evidence. Where multiple items overlap, group them. Use the get_topic tool to load any page's full guidance before judging.

- **Colour contrast** (required) — Text and meaningful non-text elements must have enough contrast against their background so people with low vision and people in harsh light can read them.
  Reference: https://specification.website/spec/accessibility/color-contrast/
- **Image alt text** (required) — Every <img> element must have an alt attribute. The value describes the image's purpose to screen readers, search engines, and anyone whose image fails to load.
  Reference: https://specification.website/spec/accessibility/image-alt-text/
- **Form labels** (required) — Every form control needs a programmatically associated label. A placeholder is not a label, and an unlabelled input is unusable for screen-reader and voice-control users.
  Reference: https://specification.website/spec/accessibility/form-labels/
- **Keyboard navigation** (required) — Every interactive element on the page must be reachable and operable with a keyboard alone, in a logical order, with no traps that hold focus.
  Reference: https://specification.website/spec/accessibility/keyboard-navigation/
- **Visible focus indicators** (required) — Whenever a control receives keyboard focus, the page must show a clear, high-contrast indicator. Removing focus outlines without a replacement is a top accessibility failure.
  Reference: https://specification.website/spec/accessibility/focus-indicators/
- **Skip links** (required) — A 'skip to main content' link as the first focusable element lets keyboard and screen-reader users jump past repeated navigation on every page.
  Reference: https://specification.website/spec/accessibility/skip-links/
- **Semantic HTML and landmarks** (required) — Use the right HTML element for the job. Landmarks like <header>, <nav>, <main>, and <footer> let assistive technologies announce structure and skip between regions.
  Reference: https://specification.website/spec/accessibility/semantic-html/
- **Descriptive link text** (required) — Every link's text must describe where it goes. 'Click here' and 'read more' fail screen-reader users who scan a page by jumping from link to link.
  Reference: https://specification.website/spec/accessibility/link-text/
- **Accessible form errors** (required) — When a form submission fails, errors must be identified in text, associated with the input that caused them, and announced to assistive technology.
  Reference: https://specification.website/spec/accessibility/form-errors/
- **Document and parts language** (required) — Set the page's primary language on <html lang> and mark any inline content in a different language with its own lang attribute, so screen readers pronounce it correctly.
  Reference: https://specification.website/spec/accessibility/document-language/
- **Reduced motion** (required) — Respect the user's `prefers-reduced-motion` setting. Decorative animation, parallax, and autoplay can trigger vestibular distress, migraines, and seizures.
  Reference: https://specification.website/spec/accessibility/reduced-motion/
- **Captions and transcripts** (required) — Video needs synchronised captions, audio-only content needs a transcript, and visuals that carry meaning need audio description. Auto-captions alone are not enough.
  Reference: https://specification.website/spec/accessibility/captions-and-transcripts/
- **Accessible data tables** (required) — Tabular data must use real <table> markup with a caption, header cells, and scope attributes so screen readers can announce row and column relationships.
  Reference: https://specification.website/spec/accessibility/data-tables/
- **Touch target size** (required) — Interactive controls must be large enough to tap or click reliably. WCAG 2.2 sets a 24×24 CSS px minimum, with 44×44 CSS px as the enhanced target.
  Reference: https://specification.website/spec/accessibility/touch-target-size/
- **Stable URLs** (required) — URLs are public contracts. Once published, they should keep working. Breaking them invalidates citations, bookmarks, links, and agent caches — and is almost always avoidable.
  Reference: https://specification.website/spec/agent-readiness/stable-urls/
- **The HTML doctype** (required) — Every HTML document must start with <!doctype html> as its first line. This opts the browser into standards mode; without it, you get quirks mode and broken layout.
  Reference: https://specification.website/spec/foundations/doctype/
- **The lang attribute on <html>** (required) — Set a valid BCP 47 language tag on the <html> element so screen readers, translators, search engines, and browsers know what language the page is in.
  Reference: https://specification.website/spec/foundations/html-lang/
- **<meta charset>** (required) — Declare UTF-8 as the document character encoding in the first 1024 bytes of the HTML, so browsers parse text correctly before they hit any non-ASCII content.
  Reference: https://specification.website/spec/foundations/meta-charset/
- **<meta viewport>** (required) — Tell mobile browsers to render the page at the device's actual width instead of pretending to be a 980-pixel desktop. One line, and never disable user scaling.
  Reference: https://specification.website/spec/foundations/meta-viewport/
- **The <title> element** (required) — Every HTML document must have exactly one non-empty <title> element inside <head>. It names the page for browsers, search engines, screen readers, social previews, and AI agents. It is not the same thing as the page's <h1>.
  Reference: https://specification.website/spec/foundations/title/
- **lang attribute on inline content** (required) — Mark passages, phrases, and inline elements that differ from the document language with a lang attribute. WCAG 3.1.2 requires it so assistive tech can switch pronunciation.
  Reference: https://specification.website/spec/i18n/lang-attribute/
- **Core Web Vitals (LCP, INP, CLS)** (required) — Core Web Vitals measure loading, responsiveness, and visual stability. Hit LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1 at the 75th percentile of real users.
  Reference: https://specification.website/spec/performance/core-web-vitals/
- **Image optimisation** (required) — Serve images in modern formats (WebP, AVIF), at the right size for the viewport, with explicit dimensions. Images are the largest payload on most pages.
  Reference: https://specification.website/spec/performance/image-optimization/
- **Cache-Control headers** (required) — Cache-Control tells browsers and CDNs how long to keep a response. Use immutable + max-age=31536000 for fingerprinted assets and short or no-cache for HTML.
  Reference: https://specification.website/spec/performance/cache-control/
- **Compression (gzip, brotli, zstd)** (required) — Compress text responses with brotli where supported, gzip everywhere else. zstd is emerging. Don't compress already-compressed media.
  Reference: https://specification.website/spec/performance/compression/
- **Privacy policy** (required) — A privacy policy tells visitors what personal data you collect, why, on what legal basis, who you share it with, how long you keep it, and what rights they have.
  Reference: https://specification.website/spec/privacy/privacy-policy/
- **Cookie consent** (required) — In the EU and UK, non-essential cookies and similar storage require freely given, informed, specific, and unambiguous opt-in consent before they are set.
  Reference: https://specification.website/spec/privacy/cookie-consent/
- **Custom error pages (404, 500)** (required) — Custom error pages must return the correct HTTP status code, explain what went wrong in plain language, and offer the user a way forward without leaking implementation details.
  Reference: https://specification.website/spec/resilience/error-pages/
- **HTTPS and TLS** (required) — Serve every page over HTTPS using TLS 1.2 or 1.3, redirect plain HTTP to HTTPS, and disable obsolete SSL and early TLS versions on every host you control.
  Reference: https://specification.website/spec/security/https-tls/
- **HSTS (Strict-Transport-Security)** (required) — HSTS tells browsers to only ever use HTTPS for your domain. Send max-age with includeSubDomains — but skip the preload list, which its own operator now discourages.
  Reference: https://specification.website/spec/security/hsts/
- **X-Content-Type-Options: nosniff** (required) — The nosniff header stops browsers from guessing a response's content type. It blocks a class of attacks where a benign-looking file is interpreted as script or stylesheet.
  Reference: https://specification.website/spec/security/x-content-type-options/
- **Clickjacking protection (frame-ancestors / X-Frame-Options)** (required) — Tell browsers who is allowed to embed your pages in an iframe. Use CSP frame-ancestors. X-Frame-Options is the legacy fallback.
  Reference: https://specification.website/spec/security/frame-ancestors/
- **Cookie attributes — Secure, HttpOnly, SameSite** (required) — Every cookie should be Secure, HttpOnly where possible, and have an explicit SameSite. Use __Host- and __Secure- prefixes for session cookies.
  Reference: https://specification.website/spec/security/cookie-attributes/
- **Redirects (301/302/308)** (required) — HTTP redirects send a client from one URL to another. Use 301 or 308 for permanent moves, 302 or 307 for temporary ones, and never chain more than necessary.
  Reference: https://specification.website/spec/seo/redirects/
- **Meta robots and X-Robots-Tag** (required) — Every page must have an explicit, correct indexing policy — either implicit (default index, follow) on public pages, or an explicit noindex / X-Robots-Tag on staging, admin, thin, or private content. Get this wrong and you either disappear from search or expose what you didn't mean to.
  Reference: https://specification.website/spec/seo/meta-robots/
- **Heading hierarchy** (required) — Headings describe the sections of a page. They must form a nested outline, never be used for visual styling alone, and never skip levels.
  Reference: https://specification.website/spec/seo/heading-hierarchy/

For each FAIL, recommend the minimal change with a code snippet where possible.

---

## SEO

### Audit Plan (Recommended + Optional depth)

You are auditing the website https://www.zivel.com against The Website Specification (https://specification.website). Focus on the **seo** category. For each item below, decide PASS / FAIL / UNCLEAR by fetching the page (and headers) and citing the evidence. Where multiple items overlap, group them. Use the get_topic tool to load any page's full guidance before judging.

- **robots.txt** (recommended) — A plain-text file at the site root that tells crawlers which paths they may or may not fetch. Standardised in RFC 9309 and supported by every major search engine.
  Reference: https://specification.website/spec/seo/robots-txt/
- **XML sitemaps** (recommended) — An XML file listing the canonical URLs of a site, with optional metadata about when each was last changed. The fastest way to tell a search engine what exists.
  Reference: https://specification.website/spec/seo/xml-sitemaps/
- **Sitemap index files** (recommended) — A sitemap of sitemaps. Used when a site has more than 50,000 URLs or wants to split sitemaps by content type for cleaner reporting.
  Reference: https://specification.website/spec/seo/sitemap-index/
- **Image and video sitemap extensions** (optional) — Optional XML extensions that add image and video metadata to sitemap entries. Useful when media is loaded by JavaScript or hosted on a CDN that crawlers cannot reach by following links.
  Reference: https://specification.website/spec/seo/image-sitemaps/
- **URL structure** (recommended) — URLs are the most stable identifier on the web. Keep them lowercase, hyphenated, descriptive, and shallow. Treat them as a public API for your content.
  Reference: https://specification.website/spec/seo/url-structure/
- **Redirects (301/302/308)** (required) — HTTP redirects send a client from one URL to another. Use 301 or 308 for permanent moves, 302 or 307 for temporary ones, and never chain more than necessary.
  Reference: https://specification.website/spec/seo/redirects/
- **Server-side rendering** (recommended) — Crawlers, social scrapers, and AI agents index the HTML your server returns. Render your primary content and metadata server-side — via SSR, static generation, or prerendering — so it is in the initial response, not assembled later by client-side JavaScript.
  Reference: https://specification.website/spec/seo/server-side-rendering/
- **Meta robots and X-Robots-Tag** (required) — Every page must have an explicit, correct indexing policy — either implicit (default index, follow) on public pages, or an explicit noindex / X-Robots-Tag on staging, admin, thin, or private content. Get this wrong and you either disappear from search or expose what you didn't mean to.
  Reference: https://specification.website/spec/seo/meta-robots/
- **Heading hierarchy** (required) — Headings describe the sections of a page. They must form a nested outline, never be used for visual styling alone, and never skip levels.
  Reference: https://specification.website/spec/seo/heading-hierarchy/
- **Internal linking** (recommended) — Links from one page on a site to another. The strongest signal you control for telling crawlers and AI agents what a page is about and how important it is.
  Reference: https://specification.website/spec/seo/internal-linking/
- **Structured data (JSON-LD)** (recommended) — Machine-readable annotations that describe the content of a page using the schema.org vocabulary. JSON-LD is the format search engines and AI agents expect.
  Reference: https://specification.website/spec/seo/structured-data/
- **Breadcrumbs** (recommended) — A short trail showing the page's position in the site hierarchy. Visible in the UI for users, marked up as BreadcrumbList JSON-LD for search engines.
  Reference: https://specification.website/spec/seo/breadcrumbs/
- **IndexNow** (optional) — An open protocol for telling participating search engines that a URL has changed. One HTTP request pushes Bing, Yandex, Naver, and Seznam to recrawl — Google does not participate.
  Reference: https://specification.website/spec/seo/indexnow/

For each FAIL, recommend the minimal change with a code snippet where possible.

### Checklist (Recommended items)

# The Website Specification — checklist (8 items)

## SEO
- [ ] **robots.txt** _(recommended)_ — A plain-text file at the site root that tells crawlers which paths they may or may not fetch. Standardised in RFC 9309 and supported by every major search engine.
      https://specification.website/spec/seo/robots-txt/
- [ ] **XML sitemaps** _(recommended)_ — An XML file listing the canonical URLs of a site, with optional metadata about when each was last changed. The fastest way to tell a search engine what exists.
      https://specification.website/spec/seo/xml-sitemaps/
- [ ] **Sitemap index files** _(recommended)_ — A sitemap of sitemaps. Used when a site has more than 50,000 URLs or wants to split sitemaps by content type for cleaner reporting.
      https://specification.website/spec/seo/sitemap-index/
- [ ] **URL structure** _(recommended)_ — URLs are the most stable identifier on the web. Keep them lowercase, hyphenated, descriptive, and shallow. Treat them as a public API for your content.
      https://specification.website/spec/seo/url-structure/
- [ ] **Server-side rendering** _(recommended)_ — Crawlers, social scrapers, and AI agents index the HTML your server returns. Render your primary content and metadata server-side — via SSR, static generation, or prerendering — so it is in the initial response, not assembled later by client-side JavaScript.
      https://specification.website/spec/seo/server-side-rendering/
- [ ] **Internal linking** _(recommended)_ — Links from one page on a site to another. The strongest signal you control for telling crawlers and AI agents what a page is about and how important it is.
      https://specification.website/spec/seo/internal-linking/
- [ ] **Structured data (JSON-LD)** _(recommended)_ — Machine-readable annotations that describe the content of a page using the schema.org vocabulary. JSON-LD is the format search engines and AI agents expect.
      https://specification.website/spec/seo/structured-data/
- [ ] **Breadcrumbs** _(recommended)_ — A short trail showing the page's position in the site hierarchy. Visible in the UI for users, marked up as BreadcrumbList JSON-LD for search engines.
      https://specification.website/spec/seo/breadcrumbs/

---

## Accessibility

### Audit Plan (Recommended + Optional depth)

You are auditing the website https://www.zivel.com against The Website Specification (https://specification.website). Focus on the **accessibility** category. For each item below, decide PASS / FAIL / UNCLEAR by fetching the page (and headers) and citing the evidence. Where multiple items overlap, group them. Use the get_topic tool to load any page's full guidance before judging.

- **Colour contrast** (required) — Text and meaningful non-text elements must have enough contrast against their background so people with low vision and people in harsh light can read them.
  Reference: https://specification.website/spec/accessibility/color-contrast/
- **Automatic contrasting colour** (optional) — Let the browser pick a legible black or white foreground for a dynamic background with the CSS contrast-color() function, instead of hard-coding colour pairs or computing luminance in JavaScript.
  Reference: https://specification.website/spec/accessibility/contrast-color/
- **Forced colours mode** (recommended) — Respect forced colours mode (Windows High Contrast and similar). The `forced-colors` media feature lets you repair UI the user's palette would otherwise flatten — without overriding their choice.
  Reference: https://specification.website/spec/accessibility/forced-colors/
- **Image alt text** (required) — Every <img> element must have an alt attribute. The value describes the image's purpose to screen readers, search engines, and anyone whose image fails to load.
  Reference: https://specification.website/spec/accessibility/image-alt-text/
- **Form labels** (required) — Every form control needs a programmatically associated label. A placeholder is not a label, and an unlabelled input is unusable for screen-reader and voice-control users.
  Reference: https://specification.website/spec/accessibility/form-labels/
- **Keyboard navigation** (required) — Every interactive element on the page must be reachable and operable with a keyboard alone, in a logical order, with no traps that hold focus.
  Reference: https://specification.website/spec/accessibility/keyboard-navigation/
- **Visible focus indicators** (required) — Whenever a control receives keyboard focus, the page must show a clear, high-contrast indicator. Removing focus outlines without a replacement is a top accessibility failure.
  Reference: https://specification.website/spec/accessibility/focus-indicators/
- **Focus not obscured** (recommended) — A focused control must not be hidden behind a sticky header, cookie banner, or chat widget. WCAG 2.2 added this as a separate criterion because a perfect focus ring is worthless if something is sitting on top of it.
  Reference: https://specification.website/spec/accessibility/focus-not-obscured/
- **Skip links** (required) — A 'skip to main content' link as the first focusable element lets keyboard and screen-reader users jump past repeated navigation on every page.
  Reference: https://specification.website/spec/accessibility/skip-links/
- **The inert attribute** (recommended) — When an overlay is open, the content behind it should be unreachable — not just dimmed. The inert attribute removes a subtree from tab order and the accessibility tree at once, replacing fragile focus-trap JavaScript.
  Reference: https://specification.website/spec/accessibility/inert-attribute/
- **Semantic HTML and landmarks** (required) — Use the right HTML element for the job. Landmarks like <header>, <nav>, <main>, and <footer> let assistive technologies announce structure and skip between regions.
  Reference: https://specification.website/spec/accessibility/semantic-html/
- **ARIA — first rule of ARIA** (recommended) — ARIA can make custom widgets accessible, but the first rule of ARIA is don't use ARIA. Reach for a native HTML element first; add ARIA only when nothing native fits.
  Reference: https://specification.website/spec/accessibility/aria-usage/
- **Descriptive link text** (required) — Every link's text must describe where it goes. 'Click here' and 'read more' fail screen-reader users who scan a page by jumping from link to link.
  Reference: https://specification.website/spec/accessibility/link-text/
- **Accessible form errors** (required) — When a form submission fails, errors must be identified in text, associated with the input that caused them, and announced to assistive technology.
  Reference: https://specification.website/spec/accessibility/form-errors/
- **Accessible authentication** (recommended) — Let people log in without solving a puzzle, transcribing a code, or memorising anything. Don't block password managers, allow paste, and offer a method that needs no cognitive function test.
  Reference: https://specification.website/spec/accessibility/accessible-authentication/
- **Redundant entry** (recommended) — Don't make people re-type information they already gave you in the same process. Auto-populate it, or let them pick it from what they entered a step ago.
  Reference: https://specification.website/spec/accessibility/redundant-entry/
- **Consistent help** (recommended) — If you offer help — a contact link, a phone number, a chat widget, an FAQ — put it in the same relative place on every page that has it. Moving it around is the failure.
  Reference: https://specification.website/spec/accessibility/consistent-help/
- **Document and parts language** (required) — Set the page's primary language on <html lang> and mark any inline content in a different language with its own lang attribute, so screen readers pronounce it correctly.
  Reference: https://specification.website/spec/accessibility/document-language/
- **Reduced motion** (required) — Respect the user's `prefers-reduced-motion` setting. Decorative animation, parallax, and autoplay can trigger vestibular distress, migraines, and seizures.
  Reference: https://specification.website/spec/accessibility/reduced-motion/
- **Captions and transcripts** (required) — Video needs synchronised captions, audio-only content needs a transcript, and visuals that carry meaning need audio description. Auto-captions alone are not enough.
  Reference: https://specification.website/spec/accessibility/captions-and-transcripts/
- **Accessible data tables** (required) — Tabular data must use real <table> markup with a caption, header cells, and scope attributes so screen readers can announce row and column relationships.
  Reference: https://specification.website/spec/accessibility/data-tables/
- **Touch target size** (required) — Interactive controls must be large enough to tap or click reliably. WCAG 2.2 sets a 24×24 CSS px minimum, with 44×44 CSS px as the enhanced target.
  Reference: https://specification.website/spec/accessibility/touch-target-size/
- **Dragging movements** (recommended) — Anything you can drag must also work with a single pointer that never drags. Sliders, sortable lists, and drag-to-pan maps each need a click or tap alternative.
  Reference: https://specification.website/spec/accessibility/dragging-movements/
- **Hidden until found** (recommended) — Use hidden="until-found" for collapsible content so that browser find-in-page, assistive tech, and search engines can still reach the text and auto-expand it.
  Reference: https://specification.website/spec/accessibility/hidden-until-found/
- **Mobile-friendly form inputs** (recommended) — On a phone, the right input type, inputmode, and enterkeyhint summon the correct on-screen keyboard and a useful Enter key. Keep input text at 16px or larger so iOS Safari doesn't zoom on focus.
  Reference: https://specification.website/spec/accessibility/mobile-form-inputs/
- **Native interactive elements** (recommended) — Prefer native HTML interactive elements — <button>, <a>, <details>/<summary>, <dialog> — over divs with click handlers. You get keyboard support, focus management, and assistive-tech semantics for free.
  Reference: https://specification.website/spec/accessibility/native-interactive-elements/
- **CSS state and relational selectors** (recommended) — Use `:has()` together with `:user-invalid`, `:user-valid`, `:placeholder-shown` and `:focus-within` to express form and component state in CSS, removing the JavaScript class-toggling pattern and the race conditions it brings.
  Reference: https://specification.website/spec/accessibility/css-state-selectors/

For each FAIL, recommend the minimal change with a code snippet where possible.

### Checklist (Recommended items)

# The Website Specification — checklist (12 items)

## Accessibility
- [ ] **Forced colours mode** _(recommended)_ — Respect forced colours mode (Windows High Contrast and similar). The `forced-colors` media feature lets you repair UI the user's palette would otherwise flatten — without overriding their choice.
      https://specification.website/spec/accessibility/forced-colors/
- [ ] **Focus not obscured** _(recommended)_ — A focused control must not be hidden behind a sticky header, cookie banner, or chat widget. WCAG 2.2 added this as a separate criterion because a perfect focus ring is worthless if something is sitting on top of it.
      https://specification.website/spec/accessibility/focus-not-obscured/
- [ ] **The inert attribute** _(recommended)_ — When an overlay is open, the content behind it should be unreachable — not just dimmed. The inert attribute removes a subtree from tab order and the accessibility tree at once, replacing fragile focus-trap JavaScript.
      https://specification.website/spec/accessibility/inert-attribute/
- [ ] **ARIA — first rule of ARIA** _(recommended)_ — ARIA can make custom widgets accessible, but the first rule of ARIA is don't use ARIA. Reach for a native HTML element first; add ARIA only when nothing native fits.
      https://specification.website/spec/accessibility/aria-usage/
- [ ] **Accessible authentication** _(recommended)_ — Let people log in without solving a puzzle, transcribing a code, or memorising anything. Don't block password managers, allow paste, and offer a method that needs no cognitive function test.
      https://specification.website/spec/accessibility/accessible-authentication/
- [ ] **Redundant entry** _(recommended)_ — Don't make people re-type information they already gave you in the same process. Auto-populate it, or let them pick it from what they entered a step ago.
      https://specification.website/spec/accessibility/redundant-entry/
- [ ] **Consistent help** _(recommended)_ — If you offer help — a contact link, a phone number, a chat widget, an FAQ — put it in the same relative place on every page that has it. Moving it around is the failure.
      https://specification.website/spec/accessibility/consistent-help/
- [ ] **Dragging movements** _(recommended)_ — Anything you can drag must also work with a single pointer that never drags. Sliders, sortable lists, and drag-to-pan maps each need a click or tap alternative.
      https://specification.website/spec/accessibility/dragging-movements/
- [ ] **Hidden until found** _(recommended)_ — Use hidden="until-found" for collapsible content so that browser find-in-page, assistive tech, and search engines can still reach the text and auto-expand it.
      https://specification.website/spec/accessibility/hidden-until-found/
- [ ] **Mobile-friendly form inputs** _(recommended)_ — On a phone, the right input type, inputmode, and enterkeyhint summon the correct on-screen keyboard and a useful Enter key. Keep input text at 16px or larger so iOS Safari doesn't zoom on focus.
      https://specification.website/spec/accessibility/mobile-form-inputs/
- [ ] **Native interactive elements** _(recommended)_ — Prefer native HTML interactive elements — <button>, <a>, <details>/<summary>, <dialog> — over divs with click handlers. You get keyboard support, focus management, and assistive-tech semantics for free.
      https://specification.website/spec/accessibility/native-interactive-elements/
- [ ] **CSS state and relational selectors** _(recommended)_ — Use `:has()` together with `:user-invalid`, `:user-valid`, `:placeholder-shown` and `:focus-within` to express form and component state in CSS, removing the JavaScript class-toggling pattern and the race conditions it brings.
      https://specification.website/spec/accessibility/css-state-selectors/

---

## Security

### Audit Plan (Recommended + Optional depth)

You are auditing the website https://www.zivel.com against The Website Specification (https://specification.website). Focus on the **security** category. For each item below, decide PASS / FAIL / UNCLEAR by fetching the page (and headers) and citing the evidence. Where multiple items overlap, group them. Use the get_topic tool to load any page's full guidance before judging.

- **HTTPS and TLS** (required) — Serve every page over HTTPS using TLS 1.2 or 1.3, redirect plain HTTP to HTTPS, and disable obsolete SSL and early TLS versions on every host you control.
  Reference: https://specification.website/spec/security/https-tls/
- **HSTS (Strict-Transport-Security)** (required) — HSTS tells browsers to only ever use HTTPS for your domain. Send max-age with includeSubDomains — but skip the preload list, which its own operator now discourages.
  Reference: https://specification.website/spec/security/hsts/
- **Mixed content and upgrade-insecure-requests** (recommended) — An HTTPS page that loads any subresource over HTTP is mixed content. Serve every subresource over HTTPS, and send the upgrade-insecure-requests CSP directive as a safety net.
  Reference: https://specification.website/spec/security/mixed-content/
- **Content Security Policy (CSP)** (recommended) — A CSP tells browsers which sources of script, style, image, and frame content to trust. A good policy stops most XSS and data-exfiltration attacks dead.
  Reference: https://specification.website/spec/security/content-security-policy/
- **Reporting API (Reporting-Endpoints)** (recommended) — A response header that names HTTP endpoints to which the browser POSTs structured violation reports — CSP and COOP breaches, permissions-policy violations, deprecations, interventions, and crashes — so you learn what is breaking in the field.
  Reference: https://specification.website/spec/security/reporting-endpoints/
- **/.well-known/security.txt** (recommended) — A standard text file at /.well-known/security.txt tells security researchers how to report vulnerabilities. It is cheap to publish and dramatically lowers the bar for responsible disclosure.
  Reference: https://specification.website/spec/security/security-txt/
- **X-Content-Type-Options: nosniff** (required) — The nosniff header stops browsers from guessing a response's content type. It blocks a class of attacks where a benign-looking file is interpreted as script or stylesheet.
  Reference: https://specification.website/spec/security/x-content-type-options/
- **Clickjacking protection (frame-ancestors / X-Frame-Options)** (required) — Tell browsers who is allowed to embed your pages in an iframe. Use CSP frame-ancestors. X-Frame-Options is the legacy fallback.
  Reference: https://specification.website/spec/security/frame-ancestors/
- **Cross-origin isolation (COOP / COEP / CORP)** (recommended) — Three response headers — Cross-Origin-Opener-Policy, Cross-Origin-Embedder-Policy, and Cross-Origin-Resource-Policy — that sever risky cross-window and cross-origin links and defend against side-channel leaks.
  Reference: https://specification.website/spec/security/cross-origin-isolation/
- **Referrer-Policy** (recommended) — Referrer-Policy controls how much URL information your site leaks when users follow a link or load a subresource. strict-origin-when-cross-origin is the sensible default.
  Reference: https://specification.website/spec/security/referrer-policy/
- **Permissions-Policy** (recommended) — Permissions-Policy lets you turn off powerful browser features — camera, microphone, geolocation, payment, USB — for your own pages and for any iframes you embed.
  Reference: https://specification.website/spec/security/permissions-policy/
- **Subresource Integrity (SRI)** (recommended) — SRI adds a cryptographic hash to every third-party script and stylesheet so the browser refuses to run modified files. Essential for any external JS or CSS you depend on.
  Reference: https://specification.website/spec/security/subresource-integrity/
- **Digest Fields (Content-Digest and Repr-Digest)** (optional) — RFC 9530 lets a server publish a cryptographic hash of what it sent, so a client can detect corruption in transit. Worth shipping on APIs, file downloads, and machine-readable endpoints; browsers ignore it.
  Reference: https://specification.website/spec/security/digest-fields/
- **Trusted Types** (recommended) — Trusted Types make the browser reject plain strings at DOM injection sinks like innerHTML, demanding a vetted typed value instead. Switched on with two CSP directives, it neutralises a whole class of DOM-based XSS.
  Reference: https://specification.website/spec/security/trusted-types/
- **Cookie attributes — Secure, HttpOnly, SameSite** (required) — Every cookie should be Secure, HttpOnly where possible, and have an explicit SameSite. Use __Host- and __Secure- prefixes for session cookies.
  Reference: https://specification.website/spec/security/cookie-attributes/
- **Clear-Site-Data** (optional) — Clear-Site-Data lets a response tell the browser to wipe cookies, storage, and caches for your origin. Send it on logout so a shared device keeps nothing behind.
  Reference: https://specification.website/spec/security/clear-site-data/
- **DNS CAA records** (recommended) — A CAA record tells certificate authorities which of them are allowed to issue certificates for your domain. Cheap to add, blocks a class of mis-issuance attacks.
  Reference: https://specification.website/spec/security/caa-records/
- **DNSSEC** (optional) — DNSSEC cryptographically signs DNS records so resolvers can verify they have not been tampered with. Strong defence in depth, but only with full registrar and registry support.
  Reference: https://specification.website/spec/security/dnssec/

For each FAIL, recommend the minimal change with a code snippet where possible.

### Checklist (Recommended items)

# The Website Specification — checklist (10 items)

## Security
- [ ] **Mixed content and upgrade-insecure-requests** _(recommended)_ — An HTTPS page that loads any subresource over HTTP is mixed content. Serve every subresource over HTTPS, and send the upgrade-insecure-requests CSP directive as a safety net.
      https://specification.website/spec/security/mixed-content/
- [ ] **Content Security Policy (CSP)** _(recommended)_ — A CSP tells browsers which sources of script, style, image, and frame content to trust. A good policy stops most XSS and data-exfiltration attacks dead.
      https://specification.website/spec/security/content-security-policy/
- [ ] **Reporting API (Reporting-Endpoints)** _(recommended)_ — A response header that names HTTP endpoints to which the browser POSTs structured violation reports — CSP and COOP breaches, permissions-policy violations, deprecations, interventions, and crashes — so you learn what is breaking in the field.
      https://specification.website/spec/security/reporting-endpoints/
- [ ] **/.well-known/security.txt** _(recommended)_ — A standard text file at /.well-known/security.txt tells security researchers how to report vulnerabilities. It is cheap to publish and dramatically lowers the bar for responsible disclosure.
      https://specification.website/spec/security/security-txt/
- [ ] **Cross-origin isolation (COOP / COEP / CORP)** _(recommended)_ — Three response headers — Cross-Origin-Opener-Policy, Cross-Origin-Embedder-Policy, and Cross-Origin-Resource-Policy — that sever risky cross-window and cross-origin links and defend against side-channel leaks.
      https://specification.website/spec/security/cross-origin-isolation/
- [ ] **Referrer-Policy** _(recommended)_ — Referrer-Policy controls how much URL information your site leaks when users follow a link or load a subresource. strict-origin-when-cross-origin is the sensible default.
      https://specification.website/spec/security/referrer-policy/
- [ ] **Permissions-Policy** _(recommended)_ — Permissions-Policy lets you turn off powerful browser features — camera, microphone, geolocation, payment, USB — for your own pages and for any iframes you embed.
      https://specification.website/spec/security/permissions-policy/
- [ ] **Subresource Integrity (SRI)** _(recommended)_ — SRI adds a cryptographic hash to every third-party script and stylesheet so the browser refuses to run modified files. Essential for any external JS or CSS you depend on.
      https://specification.website/spec/security/subresource-integrity/
- [ ] **Trusted Types** _(recommended)_ — Trusted Types make the browser reject plain strings at DOM injection sinks like innerHTML, demanding a vetted typed value instead. Switched on with two CSP directives, it neutralises a whole class of DOM-based XSS.
      https://specification.website/spec/security/trusted-types/
- [ ] **DNS CAA records** _(recommended)_ — A CAA record tells certificate authorities which of them are allowed to issue certificates for your domain. Cheap to add, blocks a class of mis-issuance attacks.
      https://specification.website/spec/security/caa-records/

---

## Performance

### Audit Plan (Recommended + Optional depth)

You are auditing the website https://www.zivel.com against The Website Specification (https://specification.website). Focus on the **performance** category. For each item below, decide PASS / FAIL / UNCLEAR by fetching the page (and headers) and citing the evidence. Where multiple items overlap, group them. Use the get_topic tool to load any page's full guidance before judging.

- **Core Web Vitals (LCP, INP, CLS)** (required) — Core Web Vitals measure loading, responsiveness, and visual stability. Hit LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1 at the 75th percentile of real users.
  Reference: https://specification.website/spec/performance/core-web-vitals/
- **Image optimisation** (required) — Serve images in modern formats (WebP, AVIF), at the right size for the viewport, with explicit dimensions. Images are the largest payload on most pages.
  Reference: https://specification.website/spec/performance/image-optimization/
- **Lazy loading images, iframes, and video** (recommended) — Native lazy loading defers off-screen images, iframes, and (recently) video until the user scrolls near them. Use loading="lazy" — but never on the LCP element.
  Reference: https://specification.website/spec/performance/lazy-loading/
- **Preload, prefetch, preconnect** (recommended) — Resource hints let you tell the browser what is coming. Preload the LCP image and critical fonts, preconnect to third-party origins, prefetch the next navigation.
  Reference: https://specification.website/spec/performance/preload-prefetch-preconnect/
- **103 Early Hints** (optional) — An informational HTTP response that carries Link headers — preload, preconnect — to the browser before the final response is ready, putting server think-time to work.
  Reference: https://specification.website/spec/performance/early-hints/
- **Cache-Control headers** (required) — Cache-Control tells browsers and CDNs how long to keep a response. Use immutable + max-age=31536000 for fingerprinted assets and short or no-cache for HTML.
  Reference: https://specification.website/spec/performance/cache-control/
- **Conditional requests (ETag, Last-Modified, 304)** (recommended) — Send a validator — ETag or Last-Modified — on every cacheable response, and honour If-None-Match / If-Modified-Since so unchanged resources return an empty 304 instead of the full body.
  Reference: https://specification.website/spec/performance/conditional-requests/
- **No-Vary-Search response header** (recommended) — The `No-Vary-Search` response header tells browsers and caches that some URL query parameters (tracking, UTM, sort order) do not change the response. The cached entry for the canonical URL is reused for variants — fewer fetches, better prefetch hits, less duplicate work.
  Reference: https://specification.website/spec/performance/no-vary-search/
- **Compression (gzip, brotli, zstd)** (required) — Compress text responses with brotli where supported, gzip everywhere else. zstd is emerging. Don't compress already-compressed media.
  Reference: https://specification.website/spec/performance/compression/
- **Web font loading** (recommended) — Self-host WOFF2 fonts, subset them, set font-display: swap so text is readable while the font loads, and preload the critical face only when it styles above-the-fold content.
  Reference: https://specification.website/spec/performance/font-loading/
- **Critical CSS and render-blocking resources** (recommended) — Inline the CSS needed for above-the-fold content and defer the rest. Render-blocking resources in <head> are the single biggest cause of slow first paint.
  Reference: https://specification.website/spec/performance/critical-css/
- **Script loading — defer, async, module** (recommended) — Choose the right script-loading attribute for every <script>: defer for app code, async for independent third-party, type=module for modern code. Bare <script> in <head> is always wrong.
  Reference: https://specification.website/spec/performance/script-loading/
- **HTTP/2 and HTTP/3** (recommended) — Serve over HTTP/2 at minimum and HTTP/3 where you can. Multiplexing eliminates head-of-line blocking; QUIC removes TCP handshake delays.
  Reference: https://specification.website/spec/performance/http3/
- **Speculation Rules** (recommended) — Tell the browser which links to prefetch or prerender before the user clicks. Done well, navigations feel instant; done carelessly, you burn bandwidth on pages nobody visits.
  Reference: https://specification.website/spec/performance/speculation-rules/
- **Resource hints overview** (recommended) — Five resource hints — dns-prefetch, preconnect, preload, modulepreload, prefetch — cover every stage of the request lifecycle. Pick the right one for the job.
  Reference: https://specification.website/spec/performance/resource-hints/
- **View Transitions** (optional) — Animate between states (same-document) or between pages (cross-document) with a single CSS opt-in. Replaces ad-hoc SPA animation libraries with a platform primitive.
  Reference: https://specification.website/spec/performance/view-transitions/
- **Back/forward cache (BFCache)** (recommended) — Keep pages BFCache-eligible so back/forward navigation restores them instantly from memory, with no reload, no hydration, and no repaint.
  Reference: https://specification.website/spec/performance/bfcache/
- **Visibility-aware rendering** (optional) — Use `content-visibility` with `contain-intrinsic-size` to skip layout and paint for off-screen content, and Intersection Observer to drive lazy behaviour, instead of scroll and resize listeners.
  Reference: https://specification.website/spec/performance/visibility-aware-rendering/
- **CSS containment** (optional) — Use `contain: layout paint style` (or the `contain: content` shorthand) to tell the browser that an element's internals cannot affect the rest of the page, so reflow and repaint stay isolated to that subtree.
  Reference: https://specification.website/spec/performance/css-containment/
- **Scroll-driven animations** (optional) — Drive CSS animations from scroll position or element visibility with `scroll-timeline` and `view-timeline`, replacing JS scroll-listener libraries with compositor-thread animation.
  Reference: https://specification.website/spec/performance/scroll-driven-animations/
- **Scrollbar gutter** (recommended) — Use scrollbar-gutter: stable to reserve scrollbar space and stop horizontal layout shift between pages or states that overflow vs. don't.
  Reference: https://specification.website/spec/performance/scrollbar-gutter/
- **Dynamic viewport units (dvh, svh, lvh)** (recommended) — On mobile, 100vh is taller than the screen because it ignores the browser's collapsing toolbar. Use dvh, svh, and lvh to size full-height elements to the viewport that is actually visible.
  Reference: https://specification.website/spec/performance/dynamic-viewport-units/
- **Compression Dictionary Transport** (optional) — Use a previously served response, or a dedicated dictionary, as a Brotli/Zstandard dictionary so updated assets compress to a fraction of their size. Pure progressive enhancement over ordinary compression.
  Reference: https://specification.website/spec/performance/compression-dictionary-transport/
- **Server-Timing header** (optional) — Server-Timing surfaces backend metrics — database time, cache hits, edge processing — in browser DevTools and to RUM via the PerformanceServerTiming API. Send it when you measure server-side latency, and keep the values free of sensitive infrastructure detail.
  Reference: https://specification.website/spec/performance/server-timing/

For each FAIL, recommend the minimal change with a code snippet where possible.

### Checklist (Recommended items)

# The Website Specification — checklist (13 items)

## Performance
- [ ] **Lazy loading images, iframes, and video** _(recommended)_ — Native lazy loading defers off-screen images, iframes, and (recently) video until the user scrolls near them. Use loading="lazy" — but never on the LCP element.
      https://specification.website/spec/performance/lazy-loading/
- [ ] **Preload, prefetch, preconnect** _(recommended)_ — Resource hints let you tell the browser what is coming. Preload the LCP image and critical fonts, preconnect to third-party origins, prefetch the next navigation.
      https://specification.website/spec/performance/preload-prefetch-preconnect/
- [ ] **Conditional requests (ETag, Last-Modified, 304)** _(recommended)_ — Send a validator — ETag or Last-Modified — on every cacheable response, and honour If-None-Match / If-Modified-Since so unchanged resources return an empty 304 instead of the full body.
      https://specification.website/spec/performance/conditional-requests/
- [ ] **No-Vary-Search response header** _(recommended)_ — The `No-Vary-Search` response header tells browsers and caches that some URL query parameters (tracking, UTM, sort order) do not change the response. The cached entry for the canonical URL is reused for variants — fewer fetches, better prefetch hits, less duplicate work.
      https://specification.website/spec/performance/no-vary-search/
- [ ] **Web font loading** _(recommended)_ — Self-host WOFF2 fonts, subset them, set font-display: swap so text is readable while the font loads, and preload the critical face only when it styles above-the-fold content.
      https://specification.website/spec/performance/font-loading/
- [ ] **Critical CSS and render-blocking resources** _(recommended)_ — Inline the CSS needed for above-the-fold content and defer the rest. Render-blocking resources in <head> are the single biggest cause of slow first paint.
      https://specification.website/spec/performance/critical-css/
- [ ] **Script loading — defer, async, module** _(recommended)_ — Choose the right script-loading attribute for every <script>: defer for app code, async for independent third-party, type=module for modern code. Bare <script> in <head> is always wrong.
      https://specification.website/spec/performance/script-loading/
- [ ] **HTTP/2 and HTTP/3** _(recommended)_ — Serve over HTTP/2 at minimum and HTTP/3 where you can. Multiplexing eliminates head-of-line blocking; QUIC removes TCP handshake delays.
      https://specification.website/spec/performance/http3/
- [ ] **Speculation Rules** _(recommended)_ — Tell the browser which links to prefetch or prerender before the user clicks. Done well, navigations feel instant; done carelessly, you burn bandwidth on pages nobody visits.
      https://specification.website/spec/performance/speculation-rules/
- [ ] **Resource hints overview** _(recommended)_ — Five resource hints — dns-prefetch, preconnect, preload, modulepreload, prefetch — cover every stage of the request lifecycle. Pick the right one for the job.
      https://specification.website/spec/performance/resource-hints/
- [ ] **Back/forward cache (BFCache)** _(recommended)_ — Keep pages BFCache-eligible so back/forward navigation restores them instantly from memory, with no reload, no hydration, and no repaint.
      https://specification.website/spec/performance/bfcache/
- [ ] **Scrollbar gutter** _(recommended)_ — Use scrollbar-gutter: stable to reserve scrollbar space and stop horizontal layout shift between pages or states that overflow vs. don't.
      https://specification.website/spec/performance/scrollbar-gutter/
- [ ] **Dynamic viewport units (dvh, svh, lvh)** _(recommended)_ — On mobile, 100vh is taller than the screen because it ignores the browser's collapsing toolbar. Use dvh, svh, and lvh to size full-height elements to the viewport that is actually visible.
      https://specification.website/spec/performance/dynamic-viewport-units/

---

## Agent-Readiness (AI Crawlers)

### Audit Plan (Recommended + Optional depth)

You are auditing the website https://www.zivel.com against The Website Specification (https://specification.website). Focus on the **agent-readiness** category. For each item below, decide PASS / FAIL / UNCLEAR by fetching the page (and headers) and citing the evidence. Where multiple items overlap, group them. Use the get_topic tool to load any page's full guidance before judging.

- **Agent readiness** (recommended) — Agent readiness is the set of choices that make a site legible to AI agents and LLMs: stable URLs, structured data, clean semantics, robots controls, and machine-readable endpoints.
  Reference: https://specification.website/spec/agent-readiness/agent-readiness-overview/
- **/llms.txt** (recommended) — A proposed markdown file at the site root that gives LLMs a curated index of your most important content. Emerging convention, not a ratified standard.
  Reference: https://specification.website/spec/agent-readiness/llms-txt/
- **/llms-full.txt** (optional) — An extended companion to /llms.txt that concatenates the full markdown content of your key pages into a single file. Useful for small sites, costly for large ones.
  Reference: https://specification.website/spec/agent-readiness/llms-full-txt/
- **Per-page Markdown source endpoints** (recommended) — Expose every documentation page's raw Markdown source at a predictable URL — via a .md suffix on the canonical URL, content negotiation, or both. Agents pull source instead of parsing HTML.
  Reference: https://specification.website/spec/agent-readiness/markdown-source-endpoints/
- **robots.txt for AI crawlers** (recommended) — Major AI vendors publish named user-agents for their crawlers. Setting an explicit allow or disallow per agent is the clearest way to control how your content is used.
  Reference: https://specification.website/spec/agent-readiness/robots-for-ai-crawlers/
- **Content Signals in robots.txt** (optional) — Add Content-Signal directives to robots.txt to declare whether AI crawlers may search, ingest, or train on your content. An emerging IETF AI Preferences / IAB Tech Lab proposal that some validators already check.
  Reference: https://specification.website/spec/agent-readiness/content-signals/
- **Web Bot Auth — verifiable bot identity** (optional) — Web Bot Auth lets a bot prove who it is by signing each HTTP request with a key it controls. Sites can then allow or block specific bots without IP allow-lists, user-agent strings, or guesswork. Built on RFC 9421 HTTP Message Signatures.
  Reference: https://specification.website/spec/agent-readiness/web-bot-auth/
- **Stable URLs** (required) — URLs are public contracts. Once published, they should keep working. Breaking them invalidates citations, bookmarks, links, and agent caches — and is almost always avoidable.
  Reference: https://specification.website/spec/agent-readiness/stable-urls/
- **Structured data for agents** (recommended) — JSON-LD with schema.org types gives agents typed facts about your page. It is the same markup search engines use, and agents lean on it just as heavily.
  Reference: https://specification.website/spec/agent-readiness/structured-data-for-agents/
- **Machine-readable formats** (recommended) — Offer JSON, RSS, or plain markdown endpoints alongside HTML where it makes sense. Agents and feed readers prefer typed data over scraped HTML.
  Reference: https://specification.website/spec/agent-readiness/machine-readable-formats/
- **HTTP Link headers for discovery** (recommended) — Use the HTTP Link header to advertise machine-readable resources — llms.txt, sitemap, api-catalog, RSS — directly in the response. Agents that never parse your HTML can still find what they need.
  Reference: https://specification.website/spec/agent-readiness/link-headers/
- **MCP and tool discovery** (optional) — The Model Context Protocol is an emerging way for sites to expose queryable tools to agents over JSON-RPC. Relevant whenever your content has structure worth filtering — even for a static reference site like this one.
  Reference: https://specification.website/spec/agent-readiness/mcp-and-tool-discovery/
- **A2A agent cards** (optional) — The Agent-to-Agent (A2A) protocol lets an autonomous agent find another autonomous agent and call it over JSON-RPC. Discovery hinges on a single well-known file: `/.well-known/agent-card.json`. Relevant whenever your service exposes agentic behaviour another agent might want to delegate to.
  Reference: https://specification.website/spec/agent-readiness/a2a-agent-cards/
- **Agent Skills discovery** (recommended) — A well-known URI that lists Agent Skills — short, scoped instructions an AI agent can load to work better with your site. Emerging convention via a Cloudflare-led RFC; still draft, still cheap to ship.
  Reference: https://specification.website/spec/agent-readiness/agent-skills-discovery/
- **DNS for AI Discovery (DNS-AID)** (optional) — Publish SVCB/HTTPS records under _agents.example.com so agents can discover your services from DNS, before any HTTP round-trip. Pair with DNSSEC so the answer is authenticated.
  Reference: https://specification.website/spec/agent-readiness/dns-aid/
- **Agentic Resource Discovery (ARD)** (optional) — Publish an AI Catalog at /.well-known/ai-catalog.json listing the agent capabilities your domain offers — MCP servers, A2A agents — so registries and agents can find and trust them from one fetch.
  Reference: https://specification.website/spec/agent-readiness/agentic-resource-discovery/
- **NLWeb — conversational interface discovery** (optional) — NLWeb is an emerging convention for exposing a site as a conversational AI endpoint. A site advertises an `/ask`-style endpoint via a `rel="nlweb"` link and serves an MCP-compatible JSON-RPC interface that agents can query in natural language.
  Reference: https://specification.website/spec/agent-readiness/nlweb/
- **WebMCP — browser-native tools for agents** (optional) — WebMCP lets a page register tools that an in-browser AI agent can call directly, using a `navigator.modelContext` JavaScript API. It turns a site into an agent surface without server-side MCP plumbing.
  Reference: https://specification.website/spec/agent-readiness/webmcp/
- **Open Knowledge Format (OKF) bundle** (optional) — Publish your whole knowledge base as an Open Knowledge Format bundle — a tree of Markdown concept files with typed front matter — so an agent can ingest the entire corpus in one fetch instead of scraping page by page.
  Reference: https://specification.website/spec/agent-readiness/okf-bundle/
- **Schemamap — discoverable JSON-LD endpoints per resource** (optional) — A convention this site proposes — no external standard exists yet. `/schemamap.xml` indexes one JSON-LD endpoint per resource so agents fetch the structured-data graph directly instead of extracting it from HTML.
  Reference: https://specification.website/spec/agent-readiness/schemamap/

For each FAIL, recommend the minimal change with a code snippet where possible.

### Checklist (Recommended items)

# The Website Specification — checklist (8 items)

## Agent Readiness
- [ ] **Agent readiness** _(recommended)_ — Agent readiness is the set of choices that make a site legible to AI agents and LLMs: stable URLs, structured data, clean semantics, robots controls, and machine-readable endpoints.
      https://specification.website/spec/agent-readiness/agent-readiness-overview/
- [ ] **/llms.txt** _(recommended)_ — A proposed markdown file at the site root that gives LLMs a curated index of your most important content. Emerging convention, not a ratified standard.
      https://specification.website/spec/agent-readiness/llms-txt/
- [ ] **Per-page Markdown source endpoints** _(recommended)_ — Expose every documentation page's raw Markdown source at a predictable URL — via a .md suffix on the canonical URL, content negotiation, or both. Agents pull source instead of parsing HTML.
      https://specification.website/spec/agent-readiness/markdown-source-endpoints/
- [ ] **robots.txt for AI crawlers** _(recommended)_ — Major AI vendors publish named user-agents for their crawlers. Setting an explicit allow or disallow per agent is the clearest way to control how your content is used.
      https://specification.website/spec/agent-readiness/robots-for-ai-crawlers/
- [ ] **Structured data for agents** _(recommended)_ — JSON-LD with schema.org types gives agents typed facts about your page. It is the same markup search engines use, and agents lean on it just as heavily.
      https://specification.website/spec/agent-readiness/structured-data-for-agents/
- [ ] **Machine-readable formats** _(recommended)_ — Offer JSON, RSS, or plain markdown endpoints alongside HTML where it makes sense. Agents and feed readers prefer typed data over scraped HTML.
      https://specification.website/spec/agent-readiness/machine-readable-formats/
- [ ] **HTTP Link headers for discovery** _(recommended)_ — Use the HTTP Link header to advertise machine-readable resources — llms.txt, sitemap, api-catalog, RSS — directly in the response. Agents that never parse your HTML can still find what they need.
      https://specification.website/spec/agent-readiness/link-headers/
- [ ] **Agent Skills discovery** _(recommended)_ — A well-known URI that lists Agent Skills — short, scoped instructions an AI agent can load to work better with your site. Emerging convention via a Cloudflare-led RFC; still draft, still cheap to ship.
      https://specification.website/spec/agent-readiness/agent-skills-discovery/

---

## How to Use This Report

1. **Work through the Baseline section first** — these are required-tier items that affect every visitor and crawler.
2. **Prioritize SEO and Performance** for franchise discovery (organic search drives trial bookings).
3. **Accessibility** is both ethical and increasingly a legal requirement for multi-location brands.
4. **Agent-Readiness** is the emerging frontier — AI assistants increasingly drive local service discovery.
5. Use the checklist items as acceptance criteria in your sprint/task backlog.

_Full spec reference: <https://specification.website>_
