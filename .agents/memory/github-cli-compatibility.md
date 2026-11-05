---
name: GitHub CLI compatibility
description: Workarounds for workflow CLI version errors and escaped log output in this workspace.
---

Use GitHub's REST API through `gh api` when workflow subcommands fail with
`malformed version` rather than assuming authentication has failed.

**Why:** Workflow dispatch failed in the CLI subcommand while the equivalent
REST dispatch succeeded using the same existing authentication.

**How to apply:** Obtain owner approval before dispatching a cache-writing
workflow. Inspect workflow and job status through the REST endpoints.
Job-log downloads may require `gh api --allow-escape-sequences`; save them
temporarily and display only relevant, credential-safe status lines.
