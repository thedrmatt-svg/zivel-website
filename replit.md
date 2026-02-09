# Zivel Wellness — Next.js 15

## Overview
A Next.js 15 wellness brand website for Zivel featuring 8 services, TypeScript, Tailwind CSS, and App Router. Dark theme default with light/dark toggle.

## Project Structure
```
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (ThemeProvider wrapper)
│   │   ├── page.tsx                # Home page
│   │   ├── blog/                   # Blog section (structured content)
│   │   ├── services/[slug]/        # Dynamic service pages
│   │   ├── locations/              # Location pages
│   │   ├── science/                # Science section
│   │   └── research/               # Research library
│   ├── components/
│   │   ├── ThemeProvider.tsx        # Light/dark theme context + toggle logic
│   │   ├── layout/Header.tsx       # Theme-aware navigation header
│   │   ├── layout/Footer.tsx       # Theme-aware footer
│   │   ├── sections/               # Page section components
│   │   └── ui/                     # Shared UI components
│   ├── lib/data/                   # Data layer (services, blog, locations)
│   ├── content/blog/               # Blog post content files
│   ├── types/                      # TypeScript types (blog.ts, etc.)
│   └── styles/globals.css          # Design system + theme variables
├── public/images/                  # Static assets
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Design System
- **Theme**: Dark default (#000000), light mode (#ffffff), toggle via `data-theme` attribute on `<html>`
- **Gold accent**: #d4af37 (dark), #b8941e (light)
- **CSS variables**: `--zivel-surface`, `--zivel-text-primary`, `--zivel-text-secondary`, `--zivel-text-muted`, `--zivel-border`, etc.
- **Service theming**: `.zivel-service-page[data-zivel-service="..."]` with per-service CSS variables
- **Cryotherapy "True Blue"**: RGB(45,100,189) — blue glow effects, blue-tinted containers, uniform blue atmosphere; preserved in both light and dark modes

## Theme System
- ThemeProvider (src/components/ThemeProvider.tsx): React context with localStorage persistence
- Toggle: Sun/moon icon in header nav bar (desktop + mobile)
- Light mode overrides: Scoped with `:not(.zivel-service-page *)` to preserve service page theming
- Service pages always use their own dark-themed atmosphere regardless of site theme

## Blog System
- Structured content: BlogContentBlock discriminated union (paragraph, heading, list types)
- No markdown strings — all content typed
- Posts in src/content/blog/, registry in src/lib/data/blog.ts

## Scripts
- `npm run dev` — Dev server on port 5000
- `npm run build` — Production build
- `npm run start` — Production server
- `npm run lint` — ESLint

## Configuration
- Import alias: `@/*` → `./src/*`
- Dev/prod server: port 5000 (0.0.0.0)
- Tailwind CSS with CSS variable-based theming

## Recent Changes
- 2026-02-09: Added light/dark theme toggle (ThemeProvider, CSS variables, Header/Footer theme-aware)
- 2026-02-09: Cryotherapy uniform blue background atmosphere
- 2026-02-09: Blog system with structured content format
