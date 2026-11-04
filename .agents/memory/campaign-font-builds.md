---
name: Campaign font builds
description: Why ATT and FanX fonts must remain bundled instead of using Google CSS during production builds.
---

Keep ATT/Buckhead and FanX typography self-hosted with its licensed font
assets, retaining each campaign's original families and display behavior.

**Why:** A clean production build reproduced a Next.js Google-font loader
crash caused by its assumption that every returned font URL ends in a known
extension. Fixing ATT exposed the same failure in FanX. A working dev
preview and TypeScript checks did not detect the release blocker.

**How to apply:** Do not reintroduce build-time Google font requests in these
campaigns. When modifying fonts, retain their licenses and verify actual
font metadata, required weights, generated CSS/assets, and a clean optimized
production build. Keep broader font migrations separate unless another
layout demonstrably blocks the build.
