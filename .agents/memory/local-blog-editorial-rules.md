---
name: Local blog editorial rules
description: Why local blog drafts require individual writing and editor access stays separate from the public site.
---

Local versions must be authored individually by the user. Do not generate
city-swapped copies or automatically create per-location records when adding
a main article.

**Why:** The user's blog briefs explicitly reject templated local doorway
pages and request an editor action that creates a draft only when selected.

**How to apply:** Copy the main article only after an explicit local-version
creation action, leave local intro/closing empty, and populate studio contact
fields only from existing verified location data.

Keep private-editor authentication isolated from public website routes.

**Why:** The public site already has carefully scoped locale metadata,
tracking, and cookie consent, and is deployed externally by the user.
Editor authentication must not gate visitors or alter those public behaviors.

**How to apply:** Restrict auth providers/middleware to private editor/API
routes. Treat external-host production auth/database configuration as a
separate manual release requirement, not something Replit preview setup
automatically provides. Preserve Brecksville's no-blog restriction and the
external Belmont/Palm Coast redirects.
