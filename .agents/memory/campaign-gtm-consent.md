---
name: Campaign GTM consent
description: Consent and duplicate-loading constraints for campaign tracking.
---

Install GTM-5XRKPB32 on campaign and landing pages, but preserve Riverton's consent gating. New installations must follow the page's existing consent policy, not introduce unconditional tracking on consent-gated pages.

**Why:** The user explicitly requires one container load per page and no tracking before consent on Riverton or other consent-gated landing pages.

**How to apply:** Check inherited layouts and redirects before adding a loader. Consent-gated pages must not emit an active noscript tracking iframe, since it would bypass consent with JavaScript disabled. Test direct visits and Next.js client navigation; raw inline head scripts alone do not execute on client navigation. Keep duplicate guards when providing both document-load and navigation bootstraps.
