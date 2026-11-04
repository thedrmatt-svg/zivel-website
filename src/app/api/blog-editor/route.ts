import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { isBlogEditor } from "@/lib/blog-editor-auth";
import { getEditorSourcePosts } from "@/lib/data/blog";
import { createLocalDraft, editorLocations } from "@/lib/local-blog-model";
import { insertLocalVersion, listLocalVersions } from "@/lib/local-blog-store";
import { getLocationBlogPostBySlug } from "@/lib/data/locationBlog";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!await isBlogEditor()) return NextResponse.json({ error: "Editor access required." }, { status: 403 });
  return NextResponse.json({
    posts: getEditorSourcePosts().map(({ slug, title, publishDate, publishAt }) => ({ id: slug, title, publishDate, publishAt })),
    locations: editorLocations().map((loc) => ({ id: `${loc.stateSlug}/${loc.citySlug}`, name: loc.name })),
    versions: await listLocalVersions(),
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!await isBlogEditor()) return NextResponse.json({ error: "Editor access required." }, { status: 403 });
  try {
    const input = await request.json();
    if (typeof input.parentPostId !== "string" || typeof input.locationId !== "string") throw new Error("Choose a main post and location.");
    const draft = createLocalDraft(input.parentPostId, input.locationId, randomUUID());
    if (getLocationBlogPostBySlug(draft.locationId.split("/")[1], draft.slug)) throw new Error("A published local post already uses this slug.");
    await insertLocalVersion(draft);
    return NextResponse.json({ version: draft }, { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === "23505") return NextResponse.json({ error: "This location already has a version with that slug. Open the existing draft." }, { status: 409 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not create draft." }, { status: 400 });
  }
}
