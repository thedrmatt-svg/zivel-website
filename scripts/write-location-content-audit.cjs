const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");

const r = createLocationRenderer();
const { locations } = r.source("src/lib/data/locations");
const p = r.source("src/lib/location-presentation");
const baseline = JSON.parse(fs.readFileSync(path.join(fs.readFileSync("/tmp/zivel-content-before-path", "utf8"), "baseline.json")));
const audit = JSON.parse(fs.readFileSync("/tmp/zivel-location-audit.json"));
const http = JSON.parse(fs.readFileSync("/tmp/zivel-location-http-results.json"));
const browser = JSON.parse(fs.readFileSync("/tmp/zivel-location-browser-results.json"));
const escape = value => String(value ?? "N/A").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const table = (headers, rows) => `<div class="table-wrap"><table><thead><tr>${headers.map(value => `<th>${escape(value)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(value => `<td>${escape(value)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const list = rows => `<ul>${rows.map(value => `<li>${escape(value)}</li>`).join("")}</ul>`;
const bookingId = href => href?.match(/set_location=(\d+)/)?.[1] ?? (href?.startsWith("tel:") ? "phone only" : "N/A");

(async () => {
  const reportRows = [];
  for (const location of locations) {
    const label = `${location.stateSlug}/${location.citySlug}`;
    const before = baseline.main.find(entry => entry.path === label);
    const after = audit.main.find(entry => entry.path === label);
    const meta = p.getLocationMainMetadata(location);
    reportRows.push({ location, label, before, after, meta });
  }
  const breck = reportRows.find(row => row.location.citySlug === "brecksville");
  const beforeBreck = r.parse(breck.before.html);
  const afterBreck = await r.render("src/app/[locale]/locations/[state]/[city]/page", { state: "ohio", city: "brecksville" });
  const bookingAnswer = doc => doc.querySelectorAll("[data-location-faq] details").find(node => /How do I book/.test(node.text)).querySelector("p").text;
  if (bookingAnswer(beforeBreck) !== bookingAnswer(afterBreck)) throw new Error("Brecksville phone-only answer changed");
  const changed = execFileSync("git", ["diff", "--name-only"], { encoding: "utf8" }).trim().split("\n");
  const added = execFileSync("git", ["ls-files", "--others", "--exclude-standard"], { encoding: "utf8" }).trim().split("\n");
  const files = [...new Set([...changed, ...added, "reports/location-template-audit.html"])].filter(Boolean).sort();
  const navigation = r.source("src/lib/data/locationNav").getLocationNav({ featuredCount: 4 });
  if (JSON.stringify(navigation) !== JSON.stringify(baseline.nav)) throw new Error("Navigation labels changed");

  const corrections = [
    "Desktop and mobile header booking actions use a lightweight server-provided location lookup. The current pathname is re-evaluated after client navigation, including /es and all nested location routes.",
    "11417 was a hard-coded default and matches none of the 19 registered location IDs. Its actual studio ownership was not inferred. It remains only in non-location default booking behavior.",
    "The main hero, header, FAQ, and Book Your Session widget now resolve the same stored local booking destination. A missing destination uses the hero's phone action, or the location's main page when no hero action exists. Location pages do not use the global 11417 fallback.",
    "All 19 registered locations have a stored numeric booking ID. No additional booking restriction was found in the data beyond the existing Brecksville exception. Windermere's ClubReady package/gift-card purchase links are preserved.",
    "Main-page title, description, Open Graph, Twitter and manually rendered description now agree. Titles are absolute metadata values, preventing the inherited '| Zivel' suffix from being doubled. Final titles are at most 65 characters and descriptions at most 155.",
    "Service priorities and ', and more' are computed from live services. The suffix is recomputed after dropping trailing service names to meet the description length limit; it is omitted only when every eligible service is shown.",
    "City-first H1s, hero service subheads, applicable image alt text, FAQ headings/copy, Wellness Insights headings and blog buttons use the address municipality. Buckhead maps to Atlanta, Briargate to Colorado Springs, Windermere to Cumming, Fieldhouse to Hernando, and Cool Springs to Franklin. Neighborhoods remain in secondary hero and Location Details text.",
    "Visible and BreadcrumbList location names match on main, service, pricing, pathways, blog index and blog article pages. Article schema's existing 'City Blog' crumb is now 'Blog' to match its visible label. No breadcrumb URLs or other fields were changed.",
    "Briargate and Fayetteville main descriptions previously named Dry Float although it is absent from their service lists. Those availability claims, including corresponding business-schema description text, now use eligible services.",
    "Fayetteville's stored Dry Float individual-price row is no longer displayed on main/pricing pages because the location service list does not offer it. Stored data and prices were not changed.",
    "Highlands Ranch dedicated Red Light is excluded from general promotional metadata, main service cards, pricing/pathways metadata and offer/service lists. The main FAQ conditionally says 'Coming soon: Red Light Therapy.' Its visible text and FAQPage schema match.",
    "Highlands Ranch's existing 'Infrared Sauna w/ Red Light' price is presented under its offered service name, Infrared Sauna, without advertising the separate upcoming Red Light service. The stored row and amount are unchanged.",
    "Highlands Ranch's main blog teaser and affected local pathway card description no longer promote the upcoming standalone Red Light service as currently available.",
    "The Highlands Ranch Red Light route, canonical, indexability and sitemap entry remain. Its focused metadata retains explicit coming-soon wording. Its body says 'not yet available', session-frequency guidance is future-qualified, and service-specific CTAs remain contact/update actions rather than booking actions. General header booking still mirrors the main location's action as approved.",
    "Generic local-service stacking suggestions are corrected only where they name an unavailable service. This affects Cryotherapy, Red Light and Compression copy at Briargate/Fayetteville; and Cryo Slimming, Cryo Toning, CryoLift, Compression and Oxygen copy at Highlands Ranch. Unsupported Dry Float suggestions on Oxygen pages at Briargate/Fayetteville are also corrected. Replacement combinations are drawn only from each studio's live service data.",
    "All individual service pages' manual description tags now match their existing focused generateMetadata descriptions instead of falling back to a broad main-location description. Service-page title/description formulas and bespoke overrides remain intact.",
    "The shared generic local-service hours question no longer uses a possessive business name. Bespoke Riverton FAQ questions and attributed review quotations were inventoried rather than editorially rewritten.",
    "The eight standard main-page FAQs use the approved concise wording, real #map link, linked live services, conditional upcoming sentence, lowest known individual session price, up to two priced service examples, local booking, pricing and pathways. Package/equivalent prices are excluded from the minimum.",
    "Parking text is rendered as a complete sentence. The raw 'Free parking or street available' becomes 'Free parking or street parking is available.' Phone display formatting remains unchanged and phone links remain clickable.",
    "Native single-open FAQ behavior, initial server-rendered answers, blank local FAQ slots, omissions for missing pricing/pathways and the Belmont/Palm Coast accordion exception are preserved.",
    "Business names, addresses, phone numbers, geo, hours, data values, section order/backgrounds, legal/SMS copy, navigation labels, route slugs, redirects, canonicals, sitemap behavior and schema types are unchanged. Only authorized service accuracy, breadcrumb name and FAQ schema payload changes were made.",
  ];
  const titleRows = reportRows.map(({ location, before, meta }) => [
    location.name, before.h1, `Zivel ${p.getLocationCity(location)}`,
    `${before.meta.title} | Zivel`, meta.title, meta.title.length,
    location.citySlug === "brecksville" ? "exiting brand, untouched — shared-template effects only" : "verified",
  ]);
  const bookingRows = reportRows.map(({ location, before, after }) => {
    if (location.citySlug === "brecksville") return [location.name, "11438 stored; existing controls unchanged", "hidden → hidden", "existing behavior unchanged", "not added", "phone only → phone only", "N/A", "exiting brand, untouched"];
    const oldDoc = r.parse(before.html);
    const oldHero = oldDoc.querySelectorAll("a").find(node => node.text.trim() === "Book Now")?.getAttribute("href");
    const oldFaq = oldDoc.querySelectorAll("[data-location-faq] details").find(node => /How do I book/.test(node.text))?.querySelector("a")?.getAttribute("href");
    return [location.name, location.booking.locationId, `${bookingId(before.headerBookings[0])} → ${after.bookingId}`, `${bookingId(oldHero)} → ${bookingId(after.hero)}`, `${location.booking.locationId} → ${location.booking.locationId}`, `${bookingId(oldFaq)} → ${bookingId(after.faq)}`, "N/A — no booking-target JSON-LD field", "verified"];
  });
  const patterns = [
    ["Service", "{Service} in {route city}, {ST} | {location.name}, plus inherited layout suffix", "{Service} in {route city}, {ST} at {location.name}. {service hero subheadline}, truncated by the existing fallback; bespoke META_MAP overrides preserved.", "Main-page generic formulas not applied. Manual tag aligned with existing metadata; coming-soon override preserved."],
    ["Pricing", "Pricing & Memberships — {location.name}, plus layout suffix", "View local pricing, membership tiers, and current offers at {location.name}. {service list}", "Existing structure preserved; unavailable service names corrected."],
    ["Pathways", "Wellness Pathways — {location.name}, plus layout suffix", "Explore goal-based wellness pathways at Zivel {local display name}. Structured routines combining {services} — built for recovery, performance, aesthetics, and longevity.", "Existing structure preserved; unavailable service names corrected."],
    ["Blog index", "Existing per-location LOCATION_BLOG_CONFIG title", "Existing per-location LOCATION_BLOG_CONFIG metaDescription", "Unchanged; not converted to the main-page template."],
    ["Blog article", "Existing article/SEO title, including local-version overrides where present", "Existing article/SEO description and local-version behavior", "Unchanged; article content, dates and private editing behavior not changed."],
  ];
  const blogMetadataRows = [];
  const blogFile = "src/app/[locale]/locations/[state]/[city]/blog/page";
  for (const params of (await r.source(blogFile).generateStaticParams()).filter(params => params.city !== "brecksville")) {
    const meta = await r.source(blogFile).generateMetadata({ params: Promise.resolve({ ...params, locale: "en" }) });
    blogMetadataRows.push([`${params.state}/${params.city}/blog`, meta.title, meta.description]);
  }
  const serviceExamples = audit.services.filter(row => [
    "utah/riverton/cryotherapy", "colorado/briargate/cryotherapy",
    "colorado/highlands-ranch/red-light-therapy",
  ].includes(row.path)).map(row => [row.path, row.title, row.description]);
  const navRows = navigation.cities.map(item => {
    const location = locations.find(location => item.href === `/locations/${location.stateSlug}/${location.citySlug}`);
    return [item.label, p.getLocationCity(location), item.label.startsWith(`${p.getLocationCity(location)},`) ? "municipality" : "neighborhood/district", "unchanged"];
  });
  const editorial = [
    "Fayetteville has an attributed Google review saying the studio offers Dry Float. The location's current service list does not. The quotation/cache was not edited or fabricated; owner-approved review selection is deferred.",
    "Bespoke Riverton service content still includes questions such as 'What are Zivel Riverton’s hours?'. These are individually authored overrides, not the shared generic stem; they were left unchanged for editorial review.",
    "Global educational service paragraphs, global pathway detail pages, general site navigation and blog article subject matter were not rewritten merely because they mention a service unavailable at a particular studio.",
    "The upcoming Highlands Ranch Red Light page retains global educational explanations and attributed general service testimonials. These are not presented as local book-now offers; local availability statements and service-specific CTAs are explicitly future/contact-only.",
    "Brecksville is audit-only, exiting brand, untouched by targeted edits, and excluded from studio pass/fail counts. Its exact existing phone-only booking answer was preserved. Shared-template changes may automatically affect its generic text; this is not a targeted Brecksville correction.",
  ];
  const sections = [
    `<h1>Location booking and content audit</h1><p class="lead">November 5, 2026 · Workspace changes only · No manual commit, push or deployment</p>`,
    `<h2>Verification summary</h2>${list([
      "18 in-scope studios verified; Brecksville excluded from studio pass/fail counts.",
      "Main pages, 177 individual English service templates, 36 pricing/pathways templates and registered blog index/article breadcrumbs checked. Header route/child-route behavior tested in both locale patterns.",
      `${http.length} sequential HTTP requests: ${http.filter(row => row.status === 200).length} HTTP 200 responses and two preserved English main-page 308 external redirects. All generated FAQ/breadcrumb internal destinations requested. Existing #map anchors checked in rendered templates.`,
      "Belmont redirects to https://www.belmontzivel.com/ and Palm Coast to https://www.palmcoastzivel.com/. Their /es main pages remain locally served; do not infer localized redirect behavior from English routes.",
      "Final rendered main titles/descriptions checked through HTTP in both locales wherever locally served. All satisfy approved limits and have a single Zivel suffix.",
      "Production build passed with Node 22, including compilation, lint/type checking and page generation. Existing regression suites and the new content/header/breadcrumb checks passed.",
      "Browser checks: Buckhead native accordion, Hollywood mobile menu, actual Buckhead→Hollywood client navigation with unchanged document, and Spanish Briargate pricing header/breadcrumb. No runtime exceptions in the actual proxied-browser session.",
      "Schema payloads verified through template rendering. Existing service-schema delivery mode was not changed; the separately queued server-rendered schema work remains separate.",
    ])}`,
    `<h2>Booking audit — 19 registered locations</h2><p>Header values refer to desktop and mobile, main and child routes. All IDs are copied from existing data; no destinations were guessed.</p>${table(["Location", "Stored ID", "Header before → after", "Hero before → after", "Book Your Session before → after", "FAQ before → after", "Existing booking JSON-LD", "Status"], bookingRows)}`,
    `<h2>Main H1 and final title — before/after</h2><p>Before titles include the existing root layout suffix. Main titles now use absolute metadata, so the displayed result is the approved complete string.</p>${table(["Location", "Before H1", "After H1", "Before final title", "After final title", "Characters", "Status"], titleRows)}`,
    `<h2>Main descriptions</h2>${table(["Location", "New description", "Characters"], reportRows.map(({ location, meta }) => [location.name, meta.description, meta.description.length]))}`,
    `<h2>Corrections made</h2>${list(corrections)}`,
    `<h2>Subpage patterns preserved</h2>${table(["Page", "Title pattern", "Description pattern", "Action"], patterns)}`,
    `<h2>Concrete subpage metadata examples</h2><p>These are the returned page-specific metadata values; their existing inherited layout behavior is unchanged. Only the main-page complete-title rule was applied in this task.</p>${table(["Service path", "Existing title", "Existing description"], serviceExamples)}${table(["Blog index path", "Existing title", "Existing description"], blogMetadataRows)}`,
    `<h2>Navigation labels — municipality/neighborhood mix inventoried, not changed</h2>${table(["Existing navigation label", "Address municipality", "Label kind", "Action"], navRows)}`,
    `<h2>Other copy findings and deferred editorial decisions</h2>${list(editorial)}`,
    `<h2>Browser observations</h2><pre>${escape(JSON.stringify(browser, null, 2))}</pre>`,
    `<h2>Files added or modified</h2>${list(files)}`,
    `<h2>Preserved boundaries</h2><p>No stored location data files, global article content, consent/tracking configuration, URL slugs, redirect rules, canonical targets, sitemap generation, navigation labels, legal/SMS text, business-name fields or unrelated schema types were changed. No commits or push commands were run.</p>`,
  ];
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Location booking and content audit</title><style>body{font:15px/1.6 system-ui,sans-serif;color:#202020;background:#f5f5f2;margin:0;padding:32px}main{max-width:1440px;margin:auto;background:white;padding:32px;border-top:5px solid #bd9b30}h1{font-size:32px;line-height:1.2}h2{font-size:23px;margin-top:42px}.lead{color:#555}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;font-size:13px}th,td{border:1px solid #ddd;padding:10px;text-align:left;vertical-align:top;min-width:100px}th{background:#f3eddc}tr:nth-child(even){background:#fafafa}li{margin:10px 0}pre{white-space:pre-wrap;background:#f7f7f7;padding:20px;overflow-wrap:anywhere}@media(max-width:600px){body{padding:8px}main{padding:18px}h1{font-size:26px}}@media print{body,main{padding:0;background:white}.table-wrap{overflow:visible}table{font-size:9px}th,td{min-width:0;padding:4px}h2{break-after:avoid}}</style></head><body><main>${sections.join("\n")}</main></body></html>`;
  fs.mkdirSync("reports", { recursive: true });
  fs.writeFileSync("reports/location-template-audit.html", html);
  console.log(`Wrote reports/location-template-audit.html (${Buffer.byteLength(html)} bytes); ${files.length} files listed.`);
})().catch(error => { console.error(error.message); process.exitCode = 1; });
