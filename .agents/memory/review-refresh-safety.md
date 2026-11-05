---
name: Review refresh failure policy
description: Why valid partial updates are saved even though the refresh workflow remains failed.
---

Review refreshes deliberately keep successful studio updates when other
studios fail, while leaving the overall workflow failed. Do not discard
valid partial results merely to make a run uniformly successful or failed.

**Why:** The public site relies on a committed cache rather than live Google
calls. One studio's API failure must not erase its old reviews or prevent
unaffected studios from receiving fresh data. A green run or a full-cache
timestamp must not imply that failed studios were refreshed.

**How to apply:** Preserve failed studios' complete prior entries and
identities, distinguish partial from complete freshness, and test using
fixtures rather than a real key. Live cache-writing runs require owner
approval; do not change GitHub secrets or branch policies to force success.
