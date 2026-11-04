---
name: Bundled fonts for reliable builds
description: Why all application font families must remain bundled instead of requesting Google CSS during production builds.
---

Keep application typography self-hosted with licensed bundled font assets,
retaining the original families and per-layout display behavior.

**Why:** A clean production build reproduced a Next.js Google-font loader
crash caused by its assumption that every returned font URL ends in a known
extension. Fixing ATT exposed the same failure in FanX. The remaining Google
font requests passed a clean local build but subsequently failed in Vercel's
Playfair Display compilation. A successful local build does not make an
external font response deterministic across environments. Blog scheduling
was not implicated by those font-loader errors.

**How to apply:** Do not reintroduce build-time Google font requests in the
application. When modifying fonts, retain their licenses and verify actual
font metadata, required weights, generated CSS/assets, and a clean optimized
production build. Match Vercel with a fresh frozen pnpm install and Node 22,
in an isolated directory so the preview's .next cache is not overwritten.
Keep optional font display on the public locale layout; do not introduce
late font swaps there while fixing build issues.
