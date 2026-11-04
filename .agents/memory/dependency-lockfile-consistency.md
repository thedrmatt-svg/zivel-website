---
name: Dependency lockfile consistency
description: Keep the pnpm deployment lockfile synchronized when workspace dependency tools update npm's lockfile.
---

Keep both existing dependency lockfiles synchronized after package changes.
Vercel uses pnpm for this project, while workspace dependency tooling may
update only npm's lockfile.

**Why:** Adding the blog editor's dependencies updated the manifest and npm
lockfile but left the pnpm lockfile stale. Vercel then failed during its
frozen-lockfile installation, before compiling the application.

**How to apply:** After npm-based dependency changes, regenerate the pnpm
lockfile from the npm lockfile with `pnpm import` to preserve resolved package
versions. Verify with a frozen-lockfile check against copies of the manifest
and pnpm lockfile in a temporary directory. Do not disable frozen installs,
delete a package manager's lockfile, or switch deployment package managers
just to conceal a mismatch.
