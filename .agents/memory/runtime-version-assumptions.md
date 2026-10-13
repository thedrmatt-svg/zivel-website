---
name: Runtime version assumptions
description: Package engine requirements may not match the actual workspace Node runtime.
---

Do not assume the workspace Node runtime matches the version declared in package.json engines.

**Why:** Browser verification encountered Node 20 even though this project declared Node 22. Code relying on newer global APIs failed before the test could run.

**How to apply:** Check the actual runtime version before choosing tooling or using newer Node built-ins. Treat engine requirements as a declaration, not proof that the workspace has installed that version.
