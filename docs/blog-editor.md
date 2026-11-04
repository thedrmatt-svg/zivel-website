# Private local-blog editor

The editor is at `/admin/blog`. It uses Clerk sign-in and only grants access
when a verified email matches `BLOG_EDITOR_EMAILS` (comma-separated). There is
no first-user-is-admin rule. Public website pages do not mount Clerk.

## Writing a local version

1. Sign in (or create your account and verify the approved email).
2. Choose a main post and studio, then select **Create local version**.
3. Edit the copied text individually. No city-name replacement is performed.
4. Add your own local introduction/closing as needed; verified studio contact
   data is available in editable fields.
5. Set a publication timestamp with its UTC offset. For example,
   `2026-11-11T08:00:00-06:00` is 8 AM Central Standard Time.
6. Save as Draft, Scheduled, or Published. A local timestamp cannot precede its
   parent's, and both the main post and local version must be publishable.
7. Canonical defaults to the main post. Select unique only after writing a
   genuinely distinct local article to use a self-referencing canonical.

Drafts return 404 publicly, stay out of listings/sitemaps, and are visible only
inside the private noindex editor. Opening the editor never creates a record.
Saving uses revision checks to avoid silently overwriting another open tab.

Brecksville's no-blog restriction remains in effect. Belmont and Palm Coast
main pages redirect externally, so their separate sites are not edited here.

## External live hosting

Preview configuration is not automatically installed on an externally hosted
production website. Before manually deploying the editor there:

- Configure a production Clerk application and its `CLERK_SECRET_KEY` and
  `CLERK_PUBLISHABLE_KEY` in the hosting provider's environment settings.
- Configure `CLERK_PROXY_URL` only when using the managed frontend proxy;
  `/api/__clerk` is implemented as a Next.js route.
- Set `BLOG_EDITOR_EMAILS` to approved editor email addresses.
- Configure `DATABASE_URL` for the intended durable PostgreSQL database.
- In that database's **PostgreSQL query interface**, apply
  `db/local-blog-editor.sql`. This creates an empty table; it does not create
  local versions. Never overwrite another database's connection settings.
- Register/sign in and verify the approved production email. Development
  identities do not establish production access.

No secrets are stored in source files. No production database changes or
deployment are performed by the editor setup. Without an editor database
configuration, existing static public blog posts remain available, while the
editor fails explicitly on attempted database operations.

Main posts remain source-controlled and are deployed manually before their
scheduled publication. Scheduling is evaluated per request; it does not
require another deployment at the publication time. Tests simulate time only
inside the test process.

## Files added or changed for Blog #2

Article and public rendering:
- `src/content/blog/new-year-new-norm-start-now.ts`
- `src/lib/data/blog.ts`
- `src/types/blog.ts`
- `src/app/[locale]/blog/[slug]/page.tsx`
- `src/app/[locale]/locations/[state]/[city]/blog/page.tsx`
- `src/app/[locale]/locations/[state]/[city]/blog/[slug]/page.tsx`
- `src/app/sitemap.ts`

Private editor and authentication:
- `src/app/admin/layout.tsx`
- `src/app/admin/blog/page.tsx`
- `src/app/admin/sign-in/[[...sign-in]]/page.tsx`
- `src/app/admin/sign-up/[[...sign-up]]/page.tsx`
- `src/components/blog/LocalBlogEditor.tsx`
- `src/app/api/blog-editor/route.ts`
- `src/app/api/blog-editor/[id]/route.ts`
- `src/app/api/__clerk/[[...path]]/route.ts`
- `src/lib/blog-editor-auth.ts`
- `src/middleware.ts`
- `next.config.ts`

Draft data, validation, setup, and tests:
- `src/types/local-blog.ts`
- `src/lib/blog-markdown.ts`
- `src/lib/local-blog-model.ts`
- `src/lib/local-blog-store.ts`
- `db/local-blog-editor.sql`
- `scripts/test-blog-publication.cjs`
- `scripts/test-blog-editor.cjs`
- `package.json`
- `package-lock.json`
- `.replit` (workspace-managed configuration)
- `docs/blog-editor.md`

Project guidance:
- `.agents/memory/local-blog-editorial-rules.md`
- `.agents/memory/MEMORY.md`
