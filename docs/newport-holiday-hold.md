# Newport holiday work held for later

## Current release

`main` excludes the unfinished Newport holiday rollout. Newport's main and
pricing pages retain their standard presentation and pricing signup behavior.
The other six approved holiday locations remain enabled, including Riverton's
latest membership prices, Essential membership, and hidden Session Packages.

All Newport work completed before this hold is preserved locally on
`hold/newport-holiday-work`. This includes the holiday presentation, gift-card
links, three CryoFacial package links, and the $199 Single Slimming and Facial
special. Do not delete that branch.

## Push the non-Newport release

In the **Replit workspace Shell**, while on `main`:

```sh
git push origin main
```

Do not use `--all`, `--mirror`, or a force push. The saved branch is local; it
will not be pushed by the command above. Existing historical commits may contain
Newport work, but the final release tree excludes it. No history was rewritten.

## Resume Newport later

Stay on the latest `main`. The commit titled
`Hold Newport holiday rollout while releasing other location updates` contains
only the Newport holdback and its release guard test. Reverse that holdback
in a new change to recover Newport's saved work, resolving any shared-file
conflicts against newer changes carefully. Do not reset `main` to the saved
branch or merge the old branch expecting it to undo the holdback.

Recheck all studio offers and the position of Newport's Membership Specials
after restoring its second Service Specials row. Complete Newport's missing
details and links before its next release.
