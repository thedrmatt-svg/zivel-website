import { Pool } from "pg";
import { cache } from "react";
import type { LocalBlogVersion } from "@/types/local-blog";
import { isLocalVersionPublished, localVersionToPost } from "@/lib/local-blog-model";

const globalDb = globalThis as unknown as { blogPool?: Pool };
function pool() {
  if (!process.env.DATABASE_URL) throw new Error("The blog editor database is not configured.");
  return globalDb.blogPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 3, connectionTimeoutMillis: 5000, allowExitOnIdle: true });
}

export async function listLocalVersions(): Promise<LocalBlogVersion[]> {
  const result = await pool().query("SELECT record FROM local_blog_versions ORDER BY updated_at DESC");
  return result.rows.map((row) => row.record);
}

export async function getLocalVersion(id: string): Promise<LocalBlogVersion | undefined> {
  const result = await pool().query("SELECT record FROM local_blog_versions WHERE id = $1", [id]);
  return result.rows[0]?.record;
}

export async function insertLocalVersion(version: LocalBlogVersion) {
  await pool().query("INSERT INTO local_blog_versions (id, parent_post_id, location_id, slug, record) VALUES ($1, $2, $3, $4, $5)", [version.id, version.parentPostId, version.locationId, version.slug, version]);
}

export async function updateLocalVersion(version: LocalBlogVersion, previousRevision: number) {
  const result = await pool().query("UPDATE local_blog_versions SET slug = $2, record = $3, updated_at = now() WHERE id = $1 AND (record->>'revision')::int = $4 RETURNING id", [version.id, version.slug, version, previousRevision]);
  if (!result.rowCount) throw new Error("This draft changed in another tab. Reload it before saving.");
}

export const getPublishedEditorPosts = cache(async () => {
  // Existing static blogs remain available when an external deployment has not
  // yet configured the optional editor database. Admin writes fail explicitly.
  if (!process.env.DATABASE_URL) return [];
  return (await listLocalVersions()).filter((version) => isLocalVersionPublished(version)).map(localVersionToPost);
});
