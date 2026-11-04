import type { BlogPost } from "@/types/blog";
import type { LocalBlogVersion } from "@/types/local-blog";
import { getEditorSourcePosts, getPublicationStatus } from "@/lib/data/blog";
import { locations } from "@/lib/data/locations";
import { isBrecksvilleLocation } from "@/lib/location-availability";
import { blogBlocksToMarkdown, parseBlogMarkdown } from "@/lib/blog-markdown";

export function editorLocations() {
  return locations.filter((loc) =>
    !isBrecksvilleLocation(loc.stateSlug, loc.citySlug) &&
    !["north-carolina/belmont", "florida/palm-coast"].includes(`${loc.stateSlug}/${loc.citySlug}`)
  );
}

export function sourcePost(id: string) {
  const post = getEditorSourcePosts().find((post) => post.slug === id);
  if (!post) throw new Error("Main post not found.");
  return post;
}

export function createLocalDraft(parentPostId: string, locationId: string, id: string): LocalBlogVersion {
  const parent = sourcePost(parentPostId);
  const loc = editorLocations().find((loc) => `${loc.stateSlug}/${loc.citySlug}` === locationId);
  if (!loc) throw new Error("This location does not have an editable local blog.");
  return {
    id, parentPostId, locationId, slug: parent.slug, title: parent.title,
    description: parent.description, body: blogBlocksToMarkdown(parent.content),
    localIntro: "", localClosing: "", status: "draft", unique: false,
    locationName: loc.name, address: loc.contact?.address ?? "", phone: loc.contact?.phone ?? "",
    bookingUrl: loc.booking?.locationId
      ? `https://zivel.myperformanceiq.com/book-appointment?set_location=${loc.booking.locationId}` : "",
    publishAt: parent.publishAt ?? `${parent.publishDate}T00:00:00-06:00`,
    revision: 1, updatedAt: new Date().toISOString(),
  };
}

export function validateLocalVersion(input: unknown, original: LocalBlogVersion): LocalBlogVersion {
  if (!input || typeof input !== "object") throw new Error("Invalid draft.");
  const data = input as Record<string, unknown>;
  const text = (key: string, max: number, required = false) => {
    const value = data[key];
    if (typeof value !== "string" || value.length > max || (required && !value.trim())) throw new Error(`Check the ${key} field.`);
    return value;
  };
  const slug = text("slug", 160, true);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Use lowercase words and hyphens for the slug.");
  if (!["draft", "scheduled", "published"].includes(String(data.status))) throw new Error("Choose a valid publication status.");
  const publishAt = text("publishAt", 40, true);
  if (!/(Z|[+-]\d{2}:\d{2})$/.test(publishAt) || !Number.isFinite(Date.parse(publishAt))) throw new Error("Use a publication time with a timezone.");
  const parent = sourcePost(original.parentPostId);
  const earliest = Date.parse(parent.publishAt ?? `${parent.publishDate}T00:00:00-06:00`);
  if (Date.parse(publishAt) < earliest) throw new Error("A local version cannot publish before its main post.");
  const bookingUrl = text("bookingUrl", 2000);
  if (bookingUrl) {
    try {
      const parsed = new URL(bookingUrl);
      if (parsed.protocol !== "https:" || !parsed.hostname || parsed.username || parsed.password) throw new Error();
    } catch {
      throw new Error("The booking link must use HTTPS.");
    }
  }
  if (data.status !== "draft" && !bookingUrl) throw new Error("Add the studio booking link before publishing.");
  if (typeof data.unique !== "boolean") throw new Error("Choose a valid canonical setting.");
  return {
    ...original, slug, title: text("title", 250, true), description: text("description", 500, true),
    body: text("body", 100000, true), localIntro: text("localIntro", 10000),
    localClosing: text("localClosing", 10000), locationName: text("locationName", 200, true),
    address: text("address", 500), phone: text("phone", 100), bookingUrl,
    status: data.status as LocalBlogVersion["status"], publishAt, unique: data.unique,
    revision: original.revision + 1, updatedAt: new Date().toISOString(),
  };
}

export function isLocalVersionPublished(version: LocalBlogVersion, now = Date.now()) {
  const parent = sourcePost(version.parentPostId);
  return getPublicationStatus(parent, now) === "published" &&
    getPublicationStatus({ ...parent, status: version.status, publishAt: version.publishAt }, now) === "published" &&
    Date.parse(version.publishAt) >= Date.parse(parent.publishAt ?? `${parent.publishDate}T00:00:00-06:00`);
}

export function localVersionToPost(version: LocalBlogVersion): BlogPost & { localVersion: LocalBlogVersion } {
  return {
    ...sourcePost(version.parentPostId), slug: version.slug, title: version.title,
    description: version.description, seoTitle: version.title, status: version.status,
    publishAt: version.publishAt,
    publishDate: new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(version.publishAt)),
    content: [
      ...(version.localIntro ? [{ type: "paragraph" as const, text: version.localIntro }] : []),
      ...parseBlogMarkdown(version.body),
      ...(version.localClosing ? [{ type: "paragraph" as const, text: version.localClosing }] : []),
    ],
    localVersion: version,
  };
}
