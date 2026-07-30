---
name: Next.js build/dev cache conflict
description: Running npm run build while the dev server is running (or has run) corrupts .next/ causing "Cannot find module './XXXX.js'" and "__webpack_modules__[moduleId] is not a function" errors in the dev server.
---

# Next.js build/dev cache conflict

## The rule
Never run `npm run build` while the dev server workflow is active (or has written to `.next/` in the same session). Production and dev builds write incompatible chunks to the same `.next/` directory.

**Why:** `npm run build` replaces `.next/` with production-optimised chunks. When the dev server then restarts, it tries to load references compiled against those production chunk IDs, which don't exist in its own incremental compilation — producing `Cannot find module './XXXX.js'` and `__webpack_modules__[moduleId] is not a function`.

## How to apply
- Use `npm run build` only to validate zero TS/lint errors, then immediately delete `.next/` and restart the dev server workflow.
- Fix: `rm -rf .next && WorkflowsRestart("Next.js Dev Server")`.
- Confirm with `curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/` returning `200`.
