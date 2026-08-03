---
name: next-intl explicit locale to avoid Dynamic API
description: getMessages() and getTranslations() without args call headers() internally, opting routes into dynamic streaming and pushing metadata after </head>. Always pass { locale } explicitly.
---

## Rule
Always call next-intl server functions with an explicit locale:
- `getMessages({ locale })` in layouts/pages
- `getTranslations({ locale })` in page components

## Why
`getMessages()` and `getTranslations()` without arguments auto-detect locale by reading `headers()` internally. `headers()` is a Next.js Dynamic API — calling it in any Server Component opts the entire route segment into **dynamic streaming rendering**. In streaming mode, Next.js renders metadata as React nodes inside each segment's Suspense slot. Those nodes arrive in `$RC` fill chunks after `</head>` has closed, so crawlers (Lighthouse, Googlebot) cannot see `<meta name="description">` in the initial HTML.

**How to apply:**
- In `[locale]/layout.tsx`: `const messages = await getMessages({ locale })` where `locale` comes from `await params`
- In page components: add `params: Promise<{ locale: string }>` to props, `const { locale } = await params`, then `getTranslations({ locale })`
- `await params` is NOT a Dynamic API — it resolves from the URL and is safe to use without triggering dynamic rendering
- Even with the above fixes, next-intl's `intlMiddleware` injects request headers via `NextResponse.next({ request: { headers } })` on every request, which itself signals dynamic rendering to Next.js. The only reliable fix is `export const dynamic = "force-static"` on each affected page. Add this to every `[locale]/*` page that should be statically pre-rendered.
- Verify with `next start` (production mode), NOT the dev server. Dev always renders dynamically; `next start` serves the pre-rendered static output. Check byte positions: `<meta name="description">` must appear before `</head>`, and `first $RC` must be -1.
