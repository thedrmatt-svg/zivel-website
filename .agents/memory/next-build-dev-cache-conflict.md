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

## Typecheck timing

Do not run a standalone typecheck concurrently with a Next.js workflow restart.

**Why:** Next deletes and regenerates `.next/types` during startup. TypeScript can enumerate a generated file immediately before Next removes it, causing misleading TS6053 file-not-found errors despite valid source.

**How to apply:** Run the typecheck after startup and route compilation have settled, or typecheck an isolated source copy. Do not treat missing generated files during a restart as source-code failures.
