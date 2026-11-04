import { NextRequest, NextResponse } from "next/server";
import { isBlogEditor } from "@/lib/blog-editor-auth";
import { getLocalVersion, updateLocalVersion } from "@/lib/local-blog-store";
import { validateLocalVersion } from "@/lib/local-blog-model";
import { getLocationBlogPostBySlug } from "@/lib/data/locationBlog";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!await isBlogEditor()) return NextResponse.json({ error: "Editor access required." }, { status: 403 });
  try {
    const { id } = await params;
    if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error("Invalid draft ID.");
    const original = await getLocalVersion(id);
    if (!original) return NextResponse.json({ error: "Draft not found." }, { status: 404 });
    const input = await request.json();
    if (input.revision !== original.revision) return NextResponse.json({ error: "This draft changed in another tab. Reload before saving." }, { status: 409 });
    const version = validateLocalVersion(input, original);
    if (getLocationBlogPostBySlug(version.locationId.split("/")[1], version.slug)) throw new Error("An existing local post already uses this slug.");
    await updateLocalVersion(version, original.revision);
    return NextResponse.json({ version });
  } catch (error) {
    if ((error as { code?: string }).code === "23505") return NextResponse.json({ error: "This location already uses that slug." }, { status: 409 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save draft." }, { status: 400 });
  }
}
