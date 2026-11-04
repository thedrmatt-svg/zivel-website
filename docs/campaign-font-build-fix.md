# Campaign font build fix

The production failure originated in Next.js's Google-font loader, not blog
content or the local editor. The first clean verification build exposed the
same font-loader failure in FanX after ATT was corrected, so both affected
campaign families were fixed together.

## Changes

Layouts now load the same font families from bundled WOFF2 assets with
`next/font/local`. Existing CSS variables, required weights, swap behavior,
analytics, noindex metadata, consent, and tracking scope are preserved.

Main-site Playfair Display/Inter loading is unchanged. Buckhead fighter
layouts reuse the ATT layouts, so they inherit the fix without additional
layout changes.

### Changed layouts

- `src/app/ads/american-top-team-sandy-springs/layout.tsx`
- `src/app/ads/american-top-team-sandy-springs-thank-you/layout.tsx`
- `src/app/ads/fanx/layout.tsx`
- `src/app/ads/fanx-thank-you/layout.tsx`

### Added assets, licenses, and documentation

- `src/assets/fonts/att/montserrat-latin-variable.woff2`
- `src/assets/fonts/att/dm-sans-latin-variable.woff2`
- `src/assets/fonts/att/Montserrat-OFL.txt`
- `src/assets/fonts/att/DM-Sans-OFL.txt`
- `src/assets/fonts/att/README.md`
- `src/assets/fonts/fanx/barlow-condensed-latin-500.woff2`
- `src/assets/fonts/fanx/barlow-condensed-latin-600.woff2`
- `src/assets/fonts/fanx/barlow-condensed-latin-700.woff2`
- `src/assets/fonts/fanx/barlow-condensed-latin-800.woff2`
- `src/assets/fonts/fanx/barlow-condensed-latin-900.woff2`
- `src/assets/fonts/fanx/Barlow-Condensed-OFL.txt`
- `src/assets/fonts/fanx/README.md`
- `docs/campaign-font-build-fix.md`

### Added regression check and project guidance

- `scripts/test-campaign-fonts.cjs`
- `.agents/memory/campaign-font-builds.md`
- `.agents/memory/MEMORY.md`

## Verification

- Clean Next.js optimized production build passed with Node 22 in an
  isolated temporary copy; all 692 static pages generated successfully.
- Real built-server checks passed for ATT/Buckhead, its thank-you page,
  FanX and its thank-you page, the homepage, Riverton and Hollywood main
  location pages, and the published main holiday blog.
- Future scheduled posts still return 404.
- Built ATT CSS contains the existing typography variables and expected
  font-weight ranges. Its WOFF2 requests return valid local font files.
- ATT/Buckhead HTML contains neither Riverton nor Hollywood GTM IDs.
- Font metadata, glyphs, licenses, and campaign layout preservation have
  regression tests in `scripts/test-campaign-fonts.cjs`.
- Existing production-build lint warnings were non-blocking; they were not
  suppressed or changed as part of this fix.

## Manual release

No Git push or deployment was performed.

1. **Your normal Git workflow:** push the changed layouts, new fonts,
   licenses, and checks together. The font binaries must be included.
2. **Vercel dashboard:** let the new commit deploy, or redeploy that new
   commit. Redeploying the previous commit will not include this fix.
3. **Vercel Build Logs:** confirm optimized compilation completes.

No new environment variables, package upgrades, database changes, or
Vercel setting changes are required for this font fix.
