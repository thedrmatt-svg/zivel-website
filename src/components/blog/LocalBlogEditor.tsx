"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { LocalBlogVersion } from "@/types/local-blog";
import { parseBlogMarkdown } from "@/lib/blog-markdown";

type ParentPost = { id: string; title: string; publishDate: string; publishAt?: string };
type Studio = { id: string; name: string };
type EditorData = { posts: ParentPost[]; locations: Studio[]; versions: LocalBlogVersion[] };
type Draft = Omit<LocalBlogVersion, "id" | "revision" | "updatedAt">;

const EMPTY_DRAFT: Draft = {
  parentPostId: "",
  locationId: "",
  slug: "",
  title: "",
  description: "",
  body: "",
  localIntro: "",
  localClosing: "",
  locationName: "",
  address: "",
  phone: "",
  bookingUrl: "",
  status: "draft",
  publishAt: "",
  unique: false,
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#101113] px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors focus:border-[#d4af37]/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15";
const labelClass = "block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55";

function asMessage(value: unknown, fallback: string) {
  return value && typeof value === "object" && "error" in value && typeof value.error === "string"
    ? value.error
    : fallback;
}

function dateLabel(value?: string) {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function Field({
  label,
  hint,
  id,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; id: string; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <input id={id} className={fieldClass} {...props} />
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-white/40">{hint}</p>}
    </div>
  );
}

function TextArea({
  label,
  hint,
  id,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string; id: string; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <textarea id={id} className={`${fieldClass} min-h-28 resize-y leading-relaxed`} {...props} />
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-white/40">{hint}</p>}
    </div>
  );
}

function Preview({ markdown, title }: { markdown: string; title: string }) {
  const blocks = useMemo(() => parseBlogMarkdown(markdown), [markdown]);
  return (
    <article className="min-h-48 rounded-2xl border border-white/[0.08] bg-[#0b0c0d] p-5 sm:p-7">
      {title && <h3 className="mb-6 font-serif text-2xl font-normal leading-tight text-white">{title}</h3>}
      {!markdown.trim() ? (
        <p className="text-sm italic text-white/35">Your text-only article preview will appear here.</p>
      ) : (
        <div className="space-y-4 text-sm leading-7 text-white/70">
          {blocks.map((block, index) => {
            if (block.type === "heading") {
              const Heading = block.level === 3 ? "h4" : "h3";
              return <Heading key={index} className="font-serif text-xl font-normal text-white">{block.text}</Heading>;
            }
            if (block.type === "paragraph") return <p key={index} className="whitespace-pre-wrap">{block.text}</p>;
            if (block.type === "list") {
              const List = block.ordered ? "ol" : "ul";
              return (
                <List key={index} className="space-y-1 pl-5 marker:text-[#d4af37]">
                  {block.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                </List>
              );
            }
            return <p key={index} className="text-xs text-white/40">Source: {block.label} — {block.url}</p>;
          })}
        </div>
      )}
    </article>
  );
}

export default function LocalBlogEditor() {
  const [data, setData] = useState<EditorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [form, setForm] = useState<Draft>(EMPTY_DRAFT);
  const [baseline, setBaseline] = useState<Draft>(EMPTY_DRAFT);
  const [createParent, setCreateParent] = useState("");
  const [createLocation, setCreateLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");
  const [createError, setCreateError] = useState("");
  const [notice, setNotice] = useState("");
  const [hasConflict, setHasConflict] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const loadSequence = useRef(0);

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(baseline), [form, baseline]);
  const eligibleLocations = useMemo(
    () => data?.locations.filter((location) => !/brecksville|belmont|palm\s*coast/i.test(`${location.id} ${location.name}`)) ?? [],
    [data],
  );
  const activeVersion = data?.versions.find((version) => version.id === activeId);
  const selectedParent = data?.posts.find((post) => post.id === (activeVersion?.parentPostId || createParent));
  const selectedStudio = data?.locations.find((location) => location.id === (activeVersion?.locationId || createLocation));

  const load = useCallback(async () => {
    const sequence = ++loadSequence.current;
    setLoading(true);
    setLoadError("");
    try {
      const response = await fetch("/api/blog-editor", { credentials: "include", headers: { Accept: "application/json" } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(asMessage(result, `Could not load editor (${response.status}).`));
      if (sequence === loadSequence.current) {
        setData(result as EditorData);
        setCreateParent((current) => current || (result.posts?.[0]?.id ?? ""));
        setCreateLocation((current) => current || (result.locations?.find((location: Studio) => !/brecksville|belmont|palm\s*coast/i.test(`${location.id} ${location.name}`))?.id ?? ""));
      }
    } catch (error) {
      if (sequence === loadSequence.current) setLoadError(error instanceof Error ? error.message : "Could not load the local editor.");
    } finally {
      if (sequence === loadSequence.current) setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const updateField = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFormError("");
    setNotice("");
  };

  const openDraft = (version: LocalBlogVersion) => {
    if (version.id === activeId) return;
    if (dirty && !window.confirm("You have unsaved edits. Discard them and open another local draft?")) return;
    const { id: _id, revision: _revision, updatedAt: _updatedAt, ...draft } = version;
    setActiveId(version.id);
    setForm(draft);
    setBaseline(draft);
    setFormError("");
    setNotice("");
    setShowPreview(false);
  };

  const createVersion = async () => {
    if (!createParent || !createLocation || creating) return;
    setCreating(true);
    setCreateError("");
    setNotice("");
    try {
      const response = await fetch("/api/blog-editor", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ parentPostId: createParent, locationId: createLocation }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(asMessage(result, `Could not create local draft (${response.status}).`));
      const version = result.version as LocalBlogVersion;
      setData((current) => current ? { ...current, versions: [version, ...current.versions.filter((item) => item.id !== version.id)] } : current);
      openDraft(version);
      setNotice("Local draft created. Edit its city-specific details before publishing.");
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "Could not create local draft.");
    } finally {
      setCreating(false);
    }
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeId || !activeVersion || saving || !dirty) return;
    setSaving(true);
    setFormError("");
    setNotice("");
    setHasConflict(false);
    try {
      const response = await fetch(`/api/blog-editor/${encodeURIComponent(activeId)}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, revision: activeVersion.revision }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.status === 409) {
        setHasConflict(true);
        throw new Error(asMessage(result, "This draft changed elsewhere. Load the latest revision before continuing."));
      }
      if (!response.ok) throw new Error(asMessage(result, `Could not save local draft (${response.status}).`));
      const version = result.version as LocalBlogVersion;
      const { id: _id, revision: _revision, updatedAt: _updatedAt, ...savedDraft } = version;
      setData((current) => current ? { ...current, versions: current.versions.map((item) => item.id === version.id ? version : item) } : current);
      setForm(savedDraft);
      setBaseline(savedDraft);
      setHasConflict(false);
      setNotice("Changes saved.");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not save local draft.");
    } finally {
      setSaving(false);
    }
  };

  const currentParent = data?.posts.find((post) => post.id === form.parentPostId);
  const [stateSlug, citySlug] = form.locationId.split("/");
  const publicRoute = stateSlug && citySlug
    ? `/locations/${stateSlug}/${citySlug}/blog/${form.slug || "[slug]"}`
    : `/locations/[state]/[city]/blog/${form.slug || "[slug]"}`;

  const reloadLatest = async () => {
    if (!activeId) return;
    setLoading(true);
    setFormError("");
    try {
      const response = await fetch("/api/blog-editor", { credentials: "include", headers: { Accept: "application/json" } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(asMessage(result, `Could not reload draft (${response.status}).`));
      const refreshed = result as EditorData;
      const latest = refreshed.versions.find((version) => version.id === activeId);
      if (!latest) throw new Error("This draft is no longer in the editor.");
      const { id: _id, revision: _revision, updatedAt: _updatedAt, ...draft } = latest;
      setData(refreshed);
      setForm(draft);
      setBaseline(draft);
      setHasConflict(false);
      setNotice("Latest saved revision loaded.");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not reload the latest draft.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#090a0b] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-50" aria-hidden="true">
        <div className="absolute -top-48 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#bd9b36]/[0.055] blur-3xl" />
        <div className="absolute left-[-18rem] top-[45%] h-[28rem] w-[28rem] rounded-full bg-white/[0.018] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 py-8 sm:px-7 lg:px-10 lg:py-12">
        <header className="mb-8 border-b border-white/10 pb-7 lg:mb-10 lg:pb-9">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]">Zivel / editorial</p>
              <h1 className="mt-3 font-serif text-4xl font-normal tracking-tight text-white sm:text-5xl">Local blog studio</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
                Prepare a city-specific version of a published article. Each studio draft needs its own meaningful local edits.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 sm:self-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
              Private editor
            </div>
          </div>
        </header>

        {loading ? (
          <div aria-label="Loading local editor" className="grid gap-6 lg:grid-cols-[310px_minmax(0,1fr)]">
            <div className="h-[32rem] animate-pulse rounded-2xl border border-white/[0.07] bg-white/[0.025]" />
            <div className="h-[48rem] animate-pulse rounded-2xl border border-white/[0.07] bg-white/[0.025]" />
          </div>
        ) : loadError ? (
          <section role="alert" className="rounded-2xl border border-red-300/20 bg-red-300/[0.05] p-6">
            <p className="text-sm font-semibold text-red-100">The editor could not be loaded</p>
            <p className="mt-2 text-sm text-red-100/65">{loadError}</p>
            <button type="button" onClick={() => void load()} className="mt-5 rounded-full border border-red-100/25 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-50 transition hover:bg-red-50/10">Try again</button>
          </section>
        ) : !data ? null : (
          <div className="grid items-start gap-6 lg:grid-cols-[310px_minmax(0,1fr)]">
            <aside className="space-y-5">
              <section className="rounded-2xl border border-white/[0.09] bg-[#101112]/90 p-5 shadow-[0_18px_60px_rgba(0,0,0,.2)]">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">Start here</p>
                    <h2 className="mt-2 font-serif text-2xl font-normal">Create a version</h2>
                  </div>
                  <span className="font-mono text-xs text-white/25">01</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="source-post" className={labelClass}>Main article</label>
                    <select id="source-post" className={fieldClass} value={createParent} onChange={(event) => setCreateParent(event.target.value)}>
                      <option value="">Choose a published post</option>
                      {data.posts.map((post) => <option key={post.id} value={post.id}>{post.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="target-studio" className={labelClass}>Studio location</label>
                    <select id="target-studio" className={fieldClass} value={createLocation} onChange={(event) => setCreateLocation(event.target.value)}>
                      <option value="">Choose a studio</option>
                      {eligibleLocations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                    </select>
                  </div>
                  <button
                    type="button"
                    disabled={!createParent || !createLocation || creating}
                    onClick={() => void createVersion()}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d4af37] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#17140b] transition hover:bg-[#e8cc6e] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {creating ? "Creating draft…" : "Create local version"}
                    {!creating && <span aria-hidden="true">→</span>}
                  </button>
                  {createError && <p role="alert" className="text-xs leading-5 text-red-100/80">{createError}</p>}
                  {data.posts.length === 0 && <p className="text-xs leading-5 text-amber-100/60">No main posts are available to localize.</p>}
                  {eligibleLocations.length === 0 && (
                    <p className="text-xs leading-5 text-amber-100/60">No eligible locations are available.</p>
                  )}
                  {selectedParent && createParent && (
                    <div className="rounded-xl border border-white/[0.07] bg-black/20 px-3.5 py-3">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">Main article publishes</p>
                      <p className="mt-1 break-all font-mono text-xs text-white/75">{selectedParent.publishAt || selectedParent.publishDate}</p>
                    </div>
                  )}
                  {selectedStudio && createLocation && <p className="text-[11px] leading-5 text-white/40">New version for <span className="text-white/65">{selectedStudio.name}</span>.</p>}
                </div>
              </section>

              <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101112]/80">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Workspace</p>
                    <h2 className="mt-1 font-serif text-xl font-normal">Local drafts</h2>
                  </div>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white/45">{data.versions.length}</span>
                </div>
                {data.versions.length ? (
                  <ul className="max-h-[38rem] divide-y divide-white/[0.06] overflow-y-auto">
                    {data.versions.map((version) => {
                      const isActive = version.id === activeId;
                      return (
                        <li key={version.id}>
                          <button type="button" onClick={() => openDraft(version)} aria-current={isActive ? "page" : undefined}
                            className={`w-full px-5 py-4 text-left transition-colors hover:bg-white/[0.035] ${isActive ? "bg-[#d4af37]/[0.07]" : ""}`}>
                            <span className="flex items-start justify-between gap-3">
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-medium text-white/85">{version.title || "Untitled local draft"}</span>
                                <span className="mt-1.5 block truncate text-xs text-white/40">{version.locationName || data.locations.find((item) => item.id === version.locationId)?.name || version.locationId}</span>
                              </span>
                              <span className={`mt-0.5 shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-wider ${version.status === "published" ? "bg-emerald-300/10 text-emerald-200/75" : version.status === "scheduled" ? "bg-[#d4af37]/10 text-[#e8cc6e]" : "bg-white/[0.07] text-white/45"}`}>{version.status}</span>
                            </span>
                            <span className="mt-3 flex items-center justify-between gap-2 text-[10px] text-white/30">
                              <span className="truncate">/{version.slug || "no-slug"}</span>
                              <span className="shrink-0">{dateLabel(version.updatedAt)}</span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="px-5 py-9 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 font-serif text-lg text-[#d4af37]/80" aria-hidden="true">—</div>
                    <p className="text-sm text-white/65">No local drafts yet</p>
                    <p className="mt-1 text-xs leading-5 text-white/35">Choose a main article and studio above to create one.</p>
                  </div>
                )}
              </section>
            </aside>

            <section className="min-w-0">
              {!activeVersion ? (
                <div className="relative flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101112]/65 p-7 sm:p-10">
                  <div aria-hidden="true" className="absolute -right-8 -top-14 font-serif text-[18rem] leading-none text-white/[0.018]">Z</div>
                  <div className="relative">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">Editorial desk</p>
                    <h2 className="mt-5 max-w-xl font-serif text-3xl font-normal leading-tight sm:text-4xl">A local story should feel local.</h2>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-white/45">
                      Select an existing version to edit, or create a new one from a main article. Nothing is created automatically.
                    </p>
                  </div>
                  <div className="relative mt-12 grid gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
                    {[
                      ["01", "Choose", "Select the published parent and its studio."],
                      ["02", "Localize", "Write real location-specific details."],
                      ["03", "Review", "Check the route, canonical, and publish timing."],
                    ].map(([number, title, description]) => (
                      <div key={number}>
                        <span className="font-mono text-[10px] text-[#d4af37]/80">{number}</span>
                        <h3 className="mt-2 font-serif text-xl font-normal">{title}</h3>
                        <p className="mt-1 text-xs leading-5 text-white/40">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={save} className="space-y-5">
                  <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.09] bg-[#101112]/80 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#d4af37]">Editing local version</p>
                      <p className="mt-1 truncate text-sm text-white/70">{activeVersion.locationName || data.locations.find((item) => item.id === activeVersion.locationId)?.name}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {dirty && <span className="text-[10px] font-medium uppercase tracking-wider text-amber-100/70">Unsaved changes</span>}
                      <button type="button" onClick={() => setShowPreview((current) => !current)} className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65 transition hover:border-white/30 hover:text-white">
                        {showPreview ? "Hide preview" : "Preview"}
                      </button>
                      <button type="submit" disabled={!dirty || saving} className="rounded-full bg-[#d4af37] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#17140b] transition hover:bg-[#e8cc6e] disabled:cursor-not-allowed disabled:opacity-40">
                        {saving ? "Saving…" : "Save changes"}
                      </button>
                    </div>
                  </div>

                  {(formError || notice) && (
                    <div role={formError ? "alert" : "status"} aria-live={formError ? "assertive" : "polite"}
                      className={`rounded-xl border px-4 py-3 text-sm ${formError ? "border-red-200/20 bg-red-200/[0.055] text-red-100/85" : "border-emerald-200/15 bg-emerald-200/[0.045] text-emerald-100/80"}`}>
                      {formError || notice}
                      {formError && hasConflict && <button type="button" onClick={() => void reloadLatest()} className="ml-3 underline decoration-red-100/40 underline-offset-4 hover:text-white">Load latest revision</button>}
                    </div>
                  )}

                  <div className="rounded-2xl border border-amber-100/15 bg-amber-100/[0.035] p-4 sm:px-5">
                    <div className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/50 font-serif text-xs text-[#e8cc6e]" aria-hidden="true">i</span>
                      <div>
                        <p className="text-xs font-semibold text-amber-50/90">Do not city-swap a copied article.</p>
                        <p className="mt-1 text-xs leading-5 text-amber-50/55">This version began as a copy. Give it substantial, accurate studio-specific information and review every detail before publishing. Each location needs its own edited version.</p>
                      </div>
                    </div>
                  </div>

                  <section className="rounded-2xl border border-white/[0.09] bg-[#101112]/80 p-5 sm:p-7">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">01 / Article</p><h2 className="mt-1 font-serif text-2xl font-normal">Story details</h2></div>
                      <span className="hidden font-mono text-[10px] text-white/25 sm:block">CONTENT</span>
                    </div>
                    <div className="grid gap-5">
                      <Field id="local-slug" label="Slug" required value={form.slug} onChange={(event) => updateField("slug", event.target.value)} hint="The local article URL uses this exact slug." />
                      <Field id="local-title" label="Title" required value={form.title} onChange={(event) => updateField("title", event.target.value)} />
                      <TextArea id="local-description" label="Description" required rows={3} value={form.description} onChange={(event) => updateField("description", event.target.value)} hint="A concise summary for article listings and search results." />
                      <div className="grid gap-5 xl:grid-cols-2">
                        <TextArea id="local-body" label="Body · text-only Markdown" required rows={15} value={form.body} onChange={(event) => updateField("body", event.target.value)} hint="Supports paragraphs, ## / ### headings, and simple ordered or unordered lists. HTML is treated as text." />
                        {showPreview && <div><p className={`${labelClass} mb-2`}>Safe preview</p><Preview markdown={form.body} title={form.title} /></div>}
                      </div>
                    </div>
                  </section>

                  <section className="rounded-2xl border border-white/[0.09] bg-[#101112]/80 p-5 sm:p-7">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">02 / Studio</p><h2 className="mt-1 font-serif text-2xl font-normal">Local voice & details</h2></div>
                      <span className="hidden font-mono text-[10px] text-white/25 sm:block">LOCATION</span>
                    </div>
                    <div className="grid gap-5">
                      <TextArea id="local-intro" label="Local intro" rows={4} value={form.localIntro} onChange={(event) => updateField("localIntro", event.target.value)} hint="A genuinely local opening. Avoid simply inserting the city name into the parent copy." />
                      <TextArea id="local-closing" label="Local closing" rows={4} value={form.localClosing} onChange={(event) => updateField("localClosing", event.target.value)} hint="Close with relevant local context, not a generic swapped location." />
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="location-name" label="Location name" required value={form.locationName} onChange={(event) => updateField("locationName", event.target.value)} />
                        <Field id="location-phone" label="Phone" type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
                        <Field id="location-address" label="Address" value={form.address} onChange={(event) => updateField("address", event.target.value)} />
                        <Field id="location-booking" label="Booking URL" type="url" value={form.bookingUrl} onChange={(event) => updateField("bookingUrl", event.target.value)} />
                      </div>
                    </div>
                  </section>

                  <section className="rounded-2xl border border-white/[0.09] bg-[#101112]/80 p-5 sm:p-7">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">03 / Publishing</p><h2 className="mt-1 font-serif text-2xl font-normal">Visibility & canonical</h2></div>
                      <span className="hidden font-mono text-[10px] text-white/25 sm:block">ROUTING</span>
                    </div>
                    <div className="grid gap-6">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="publish-status" className={labelClass}>Status</label>
                          <select id="publish-status" className={fieldClass} value={form.status} onChange={(event) => updateField("status", event.target.value as Draft["status"])}>
                            <option value="draft">Draft — private</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                        <Field id="publish-at" label="Publish at · ISO with timezone" required value={form.publishAt} onChange={(event) => updateField("publishAt", event.target.value)} placeholder="2026-05-18T09:30:00-05:00" hint="Enter the timestamp exactly as intended, including Z or an offset such as -05:00. It is preserved as typed." />
                      </div>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-black/15 p-4">
                        <input type="checkbox" checked={form.unique} onChange={(event) => updateField("unique", event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#d4af37]" />
                        <span>
                          <span className="block text-sm font-medium text-white/80">Mark this article as unique</span>
                          <span className="mt-1 block text-xs leading-5 text-white/40">By default the local article points its canonical to the main article. Only enable this for meaningfully distinct content.</span>
                        </span>
                      </label>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-white/[0.08] bg-black/20 p-4">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/35">Public article route</p>
                          <p className="mt-2 break-all font-mono text-xs text-white/75">{publicRoute}</p>
                          <p className="mt-2 text-[11px] text-white/40">{form.status === "published" ? "Published article route" : "Draft and scheduled routes remain private / 404."}</p>
                        </div>
                        <div className="rounded-xl border border-white/[0.08] bg-black/20 p-4">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/35">Canonical target</p>
                          <p className="mt-2 break-all font-mono text-xs text-white/75">
                            {form.unique ? publicRoute : `/blog/${form.parentPostId || "[main-post]"}`}
                          </p>
                          <p className="mt-2 text-[11px] text-white/40">{form.unique ? "Self-canonical — unique content" : `Main article${currentParent ? `: ${currentParent.title}` : ""}`}</p>
                        </div>
                      </div>
                      {currentParent && (
                        <div className="flex flex-col justify-between gap-2 rounded-xl border border-[#d4af37]/15 bg-[#d4af37]/[0.035] px-4 py-3 sm:flex-row sm:items-center">
                          <span className="text-xs text-white/55">Main article earliest publish time</span>
                          <span className="break-all font-mono text-xs text-[#e8cc6e]/85">{currentParent.publishAt || currentParent.publishDate}</span>
                        </div>
                      )}
                    </div>
                  </section>

                  <div className="sticky bottom-3 z-10 flex items-center justify-between gap-3 rounded-2xl border border-white/[0.1] bg-[#151617]/95 p-3 shadow-[0_12px_40px_rgba(0,0,0,.38)] backdrop-blur-md sm:px-5">
                    <p className="hidden text-xs text-white/40 sm:block">{dirty ? "Your changes are not saved." : `Last updated ${dateLabel(activeVersion.updatedAt)}`}</p>
                    <div className="ml-auto flex items-center gap-3">
                      {dirty && <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-100/65">Unsaved</span>}
                      <button type="submit" disabled={!dirty || saving} className="rounded-full bg-[#d4af37] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#17140b] transition hover:bg-[#e8cc6e] disabled:cursor-not-allowed disabled:opacity-40">
                        {saving ? "Saving…" : "Save changes"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </section>
          </div>
        )}
        <footer className="mt-10 border-t border-white/[0.07] pt-5 text-[10px] uppercase tracking-[0.16em] text-white/25">
          Zivel editorial · Localized article drafts
        </footer>
      </div>
    </main>
  );
}
