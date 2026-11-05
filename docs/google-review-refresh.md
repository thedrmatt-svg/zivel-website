# Google review refresh setup and recovery

## Why the scheduled refresh failed

The observed GitHub Actions run received an empty `GOOGLE_PLACES_API_KEY`.
It stopped before contacting Google. A key configured in Replit or Vercel
does not automatically configure a GitHub Actions repository secret.
The job previously also installed the entire application with npm on Node
20, even though this refresh script only needs Node 22 built-ins.

No API key was read, rotated, printed, or changed as part of this repair.
No real refresh or Git push was triggered by the agent.

## Owner setup — GitHub repository settings

In **GitHub → thedrmatt-svg/zivel-website → Settings → Secrets and variables
→ Actions → Repository secrets**:

1. Create **New repository secret** named exactly `GOOGLE_PLACES_API_KEY`,
   or update the existing repository secret.
2. Enter your existing valid Places API key directly into GitHub's secret
   value field. Do not paste it in chat or commit it to a file.
3. Save it. A repository Actions **variable** is not a substitute for this
   secret. If an organization secret is used instead, its repository access
   policy must include this repository.
4. This job does not select a GitHub deployment environment. An
   environment-only secret will not be available to it.

Do not change Google billing, API restrictions, or rotate the key merely
because it was missing from GitHub. A later HTTP failure needs its own
evidence and diagnosis.

## Owner checks — GitHub repository permissions

In **Settings → Actions → General**, confirm Actions and the checkout and
setup-node actions are permitted. The refresh job explicitly requests
`contents: write` for its existing cache-commit operation; this permission
is scoped to that job, not unrelated workflows.

Check **Settings → Rules → Rulesets** and any **Branches → Branch protection
rules** applying to the target branch. The job's `GITHUB_TOKEN` must be
allowed to push the intended cache update. Organization policy may limit
its effective permissions. Do not disable branch protection or add a broad
personal access token to get around a restriction. If direct bot commits
are disallowed, agree on a protected pull-request-based update process
before changing the automation.

The job uses the existing checkout credentials and standard `GITHUB_TOKEN`.
No custom GitHub token is required. Push failures are now genuine job
failures, not reported as "No changes".

## Owner release and manual verification

1. **Your normal Git workflow:** push this repair first. An Actions run uses
   the workflow and script from its selected branch, not unpushed Replit
   changes.
2. **GitHub → repository → Actions → Refresh Google Reviews → Run workflow:**
   select the updated `main` branch and explicitly start the run.
3. Check **Validate refresh configuration**. It must confirm configuration
   without displaying the key or making a Google request.
4. Check **Refresh Places cache** for per-studio status and the final count.
5. Check **Commit updated cache** and confirm the bot commit contains only
   the expected `src/data/places-cache.json` update. Confirm studio keys and
   `locationPath` values remain associated with the same studios.
6. Full success must report all studios refreshed. For a partial result,
   successful updates may be committed, but the overall workflow remains
   failed and failed studios retain their old entries.
7. Confirm the cache reaches the site through your normal Vercel release
   process. GitHub does not start another GitHub workflow from a normal
   `GITHUB_TOKEN` bot push; external deployment integration behavior must
   be checked separately. Do not assume this task deployed refreshed data.

The agent may inspect an owner-approved run afterward, but will not trigger
a cache-writing run without explicit owner approval.

## Schedule and cache safety

- Unchanged schedule: 02:00 UTC on the 1st and 15th of each month.
- The existing manual trigger remains available.
- Node 22 runs the script directly. No npm/pnpm dependency install is needed.
- Missing configuration fails before requests or cache writes.
- HTTP, network, timeout, JSON, or studio-identity failures retain each
  affected entry. Error bodies and raw exception messages are not logged.
- All failures: nonzero exit; cache bytes and timestamps are unchanged.
- Partial success: successful entries have `_refreshedAt`; failed entries
  are untouched; `_generatedAt` stays at the last complete refresh.
  `_lastRefresh` records partial status and counts, and the job ends failed.
- Complete success: all entries are refreshed and `_generatedAt` advances.
- Writes use a temporary sibling file and atomic rename. API calls have a
  15-second timeout and remain spaced by 300 ms.
- Concurrency is serialized per branch to avoid overlapping refresh jobs.

## Fixture verification — workspace shell

Run:

```sh
node --test scripts/test-places-refresh.mjs
```

These tests use fake responses and temporary directories only. They do not
use an actual key, contact Google, or modify the production review cache.
