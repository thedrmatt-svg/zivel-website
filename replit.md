# Zivel Wellness — Next.js 15

## Overview
A Next.js 15 wellness brand website for Zivel featuring 8 services, TypeScript, Tailwind CSS, and App Router. Dark-only theme with black background, white text, and gold accents. Internationalized with next-intl (English + Spanish).

## Project Structure
```
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (minimal)
│   │   ├── robots.ts               # robots.txt generation
│   │   ├── sitemap.ts              # Dynamic sitemap.xml
│   │   └── [locale]/               # Locale-based routing (en, es)
│   │       ├── layout.tsx          # Locale layout (metadata, Header, Footer, NextIntlClientProvider)
│   │       ├── page.tsx            # Home page
│   │       ├── blog/               # Blog section (structured content)
│   │       ├── pathways/           # Pathway index + [slug] detail pages
│   │       ├── services/[slug]/    # Dynamic service pages
│   │       ├── locations/          # Location pages
│   │       ├── science/            # Science section
│   │       └── research/           # Research library
│   ├── i18n/
│   │   ├── routing.ts             # Locale routing config (en default, es)
│   │   └── request.ts             # Request config for message loading
│   ├── messages/
│   │   ├── en.json                # English translations
│   │   └── es.json                # Spanish translations
│   ├── middleware.ts               # next-intl middleware
│   ├── components/
│   │   ├── layout/Header.tsx       # Navigation header
│   │   ├── layout/Footer.tsx       # Footer
│   │   ├── sections/               # Page section components
│   │   └── ui/                     # Shared UI components
│   ├── lib/data/                   # Data layer (services, blog, pathways, locations)
│   ├── content/
│   │   ├── blog/                   # Blog post content files
│   │   ├── pathways/               # Pathway content files
│   │   └── services/               # Service content files
│   ├── types/                      # TypeScript types (blog.ts, pathway.ts, service.ts)
│   └── styles/globals.css          # Design system + theme variables
├── public/images/                  # Static assets
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Internationalization (i18n)
- **Library**: next-intl
- **Locales**: en (default), es
- **Locale prefix**: "as-needed" (English URLs have no prefix, Spanish uses /es/...)
- **Message files**: src/messages/en.json, src/messages/es.json
- **Currently translated**: Home page hero (title + subtitle)
- **Routing**: src/i18n/routing.ts defines locales; middleware handles detection
- **Config**: next.config.ts uses createNextIntlPlugin wrapping

## Design System
- **Theme**: Dark-only (#000000 background, #ffffff text)
- **Gold accent**: #d4af37
- **CSS variables**: `--zivel-black`, `--zivel-white`, `--zivel-gold`, `--zivel-text-primary`, `--zivel-text-secondary`, `--zivel-text-muted`
- **Service theming**: `.zivel-service-page[data-zivel-service="..."]` with per-service CSS variables
- **Cryotherapy "True Blue"**: RGB(45,100,189) — blue glow effects, blue-tinted containers, uniform blue atmosphere

## Content Systems

### Blog System
- Structured content: BlogContentBlock discriminated union (paragraph, heading, list types)
- No markdown strings — all content typed
- Posts in src/content/blog/, registry in src/lib/data/blog.ts

### Pathway System
- Pathway type: slug, name, tagline, category, steps (service references), benefits, science note, testimonials, FAQs
- Categories: recovery, performance, beauty, longevity
- Content in src/content/pathways/, registry in src/lib/data/pathways.ts
- Pages: /pathways (index) and /pathways/[slug] (detail with SSG)

## Scripts
- `npm run dev` — Dev server on port 5000
- `npm run build` — Production build
- `npm run start` — Production server
- `npm run lint` — ESLint

## Configuration
- Import alias: `@/*` → `./src/*`
- Dev/prod server: port 5000 (0.0.0.0)
- Tailwind CSS with CSS variable-based theming

## Visual Dynamics System
CSS utility classes in globals.css for section-level visual variety:
- `.zv-bleed` — full-bleed section (breaks out of max-w container)
- `.zv-section-elevated` / `.zv-section-recessed` / `.zv-section-gradient` — alternating dark backgrounds
- `.zv-section-warm` / `.zv-section-cool` — warm (gold tint) and cool (blue tint) section variants
- `.zv-hero-bg` / `.zv-cta-bg` — hero and CTA gradient backgrounds
- `.zv-noise` — subtle noise texture overlay
- `.zv-divider-gold` / `.zv-divider-white` — gradient divider lines between sections
- `.zv-card-glass` — glass morphism card (backdrop-blur, inset shadow, hover state)
- `.zv-glow-gold` / `.zv-edge-top` — radial gold glow and top edge accent

## Recent Changes
- 2026-02-09: Created Pathway system (type, content, data registry, index + detail pages)
- 2026-02-09: Removed light/dark theme toggle — site is dark-only
- 2026-02-09: Cryotherapy uniform blue background atmosphere
- 2026-02-09: Blog system with structured content format
- 2026-02-13: Functional LocationSearch with ZIP geocoding (zippopotam.us), haversine distance, city/name text search
- 2026-02-13: Added geo coordinates (lat/lng) for all 19 locations
- 2026-02-14: Visual dynamics system — alternating section backgrounds, gold/white dividers, glass cards, noise textures, hero gradients across all pages
- 2026-02-14: Image/video optimization — AVIF+WebP auto-format, responsive sizes, lazy loading, quality controls, video support with poster frames, 30-day cache TTL
- 2026-02-14: Comprehensive SEO/GEO schema — Organization + WebSite in layout, Service + FAQ on service pages, Article on blog/science, ScholarlyArticle on research, BreadcrumbList on all detail pages, HealthAndBeautyBusiness with geo/phone on locations, robots.txt, dynamic sitemap.xml, Twitter cards, googleBot robots directives
- 2026-02-15: Internationalization with next-intl — en/es locales, locale-based routing under [locale], home page hero translated
