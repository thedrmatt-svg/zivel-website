import fs from "node:fs";
import path from "node:path";

const SERVICE = process.env.SERVICE ?? "cryo";
const RGB = (process.env.RGB ?? "45,100,189").split(",").map(n => parseInt(n.trim(), 10));
if (RGB.length !== 3 || RGB.some(n => Number.isNaN(n))) {
  console.error("❌ RGB must be like: 45,100,189");
  process.exit(1);
}
const [R,G,B] = RGB;

const MARKER_START = "/* ZIVEL_SERVICE_THEME_START */";
const MARKER_END   = "/* ZIVEL_SERVICE_THEME_END */";

const THEME_CSS = `${MARKER_START}
:root{
  --zivel-bg:#07090d;
  --zivel-fg: #f6f7f8;
  --zivel-muted: rgba(246,247,248,.72);

  /* Card pop */
  --zivel-card-bg: rgba(255,255,255,.06);
  --zivel-card-bg-hover: rgba(255,255,255,.09);
  --zivel-card-border: rgba(255,255,255,.10);
  --zivel-card-border-hover: rgba(255,255,255,.16);
  --zivel-card-shadow: 0 18px 55px rgba(0,0,0,.55);

  /* Service color (set per page) */
  --zivel-service-r: 45;
  --zivel-service-g: 100;
  --zivel-service-b: 189;
}

/* Wrapper: applies only on service pages where you add data-zivel-service */
.zivel-service-page{
  position: relative;
  background: var(--zivel-bg);
  color: var(--zivel-fg);
  overflow: clip;
}

/* Symmetric service glow BEHIND content */
.zivel-service-page::before{
  content:"";
  position:absolute;
  inset:0;
  z-index:0;
  pointer-events:none;

  /* subtle, symmetric + vignette */
  background:
    radial-gradient(900px 650px at 10% 18%,
      rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .22) 0%,
      rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .10) 38%,
      rgba(0,0,0,0) 70%),
    radial-gradient(900px 650px at 90% 18%,
      rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .22) 0%,
      rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .10) 38%,
      rgba(0,0,0,0) 70%),
    radial-gradient(1200px 900px at 50% 86%,
      rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .12) 0%,
      rgba(0,0,0,0) 62%),
    radial-gradient(1400px 1000px at 50% 58%,
      rgba(0,0,0,.75) 0%,
      rgba(0,0,0,.95) 70%),
    linear-gradient(180deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.70) 55%, rgba(0,0,0,.92) 100%);
}

/* Ensure content sits above glow */
.zivel-service-page > *{ position:relative; z-index:1; }

/* Headings pop slightly */
.zivel-service-page h1,
.zivel-service-page h2,
.zivel-service-page h3{
  text-shadow: 0 10px 26px rgba(0,0,0,.45);
}

/* Body text slightly softened */
.zivel-service-page p,
.zivel-service-page li{
  color: var(--zivel-muted);
}

/* UI POP:
   This targets common "box/card" patterns without changing your components:
   - any element with a border (Tailwind often emits border utilities)
   - any rounded container (rounded-xl/2xl etc)
   These rules are subtle and only apply inside the service wrapper.
*/
.zivel-service-page [class*="rounded"],
.zivel-service-page [class*="border"]{
  border-color: var(--zivel-card-border) !important;
}

/* Card-like containers: if you already have bg-black/bg-white overlays, we nudge them */
.zivel-service-page [class*="bg-"]{
  /* don't force a color, just improve legibility */
  backdrop-filter: saturate(1.05) blur(6px);
}

/* A safe "card pop" class you can optionally add later (not required) */
.zivel-card-pop{
  background: var(--zivel-card-bg);
  border: 1px solid var(--zivel-card-border);
  border-radius: 18px;
  box-shadow: var(--zivel-card-shadow);
}
.zivel-card-pop:hover{
  background: var(--zivel-card-bg-hover);
  border-color: var(--zivel-card-border-hover);
  transform: translateY(-1px);
  transition: all .18s ease;
}

/* Buttons: keep your existing, but add a premium focus ring */
.zivel-service-page a:focus-visible,
.zivel-service-page button:focus-visible{
  outline: 2px solid rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .55);
  outline-offset: 3px;
  border-radius: 12px;
}
${MARKER_END}
`;

function backup(filePath){
  const stamp = new Date().toISOString().replace(/[:.]/g,"-");
  const safe = filePath.replace(/\//g,"__");
  const out = path.join(".backups", `${safe}.${stamp}.bak`);
  fs.copyFileSync(filePath, out);
  return out;
}

function findGlobalsCss(){
  const cands = [
    "app/globals.css",
    "src/app/globals.css",
    "styles/globals.css",
    "src/styles/globals.css",
  ];
  for (const c of cands) if (fs.existsSync(c)) return c;
  return null;
}

function findCryoPage(){
  const preferred = [
    "src/app/services/[slug]/page.tsx",
    "app/services/cryotherapy/page.tsx",
    "app/services/cryotherapy/page.jsx",
    "src/app/services/cryotherapy/page.tsx",
    "src/app/services/cryotherapy/page.jsx",
    "app/(services)/cryotherapy/page.tsx",
    "app/(services)/cryotherapy/page.jsx",
  ];
  for (const p of preferred) if (fs.existsSync(p)) return p;

  const hits = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const ent of fs.readdirSync(dir, {withFileTypes:true})) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.isFile() && /^page\.(t|j)sx$/.test(ent.name)) hits.push(full);
    }
  };
  walk("app");
  walk("src/app");

  const scored = [];
  for (const f of hits) {
    const s = fs.readFileSync(f, "utf8");
    let score = 0;
    const lower = f.toLowerCase();
    if (lower.includes("cryo")) score += 5;
    if (s.includes("Cryotherapy")) score += 5;
    if (s.match(/title:\s*["'`]Cryotherapy/i)) score += 4;
    if (s.match(/<h1[^>]*>[^<]*Cryotherapy/i)) score += 4;
    if (score > 0) scored.push({f, score});
  }
  scored.sort((a,b)=>b.score-a.score);
  return scored[0]?.f ?? null;
}

function upsertThemeCss(globalsPath){
  let css = fs.readFileSync(globalsPath,"utf8");
  if (css.includes(MARKER_START) && css.includes(MARKER_END)) {
    css = css.replace(new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`,"m"), THEME_CSS);
  } else {
    css = css.trimEnd() + "\n\n" + THEME_CSS + "\n";
  }
  fs.writeFileSync(globalsPath, css, "utf8");
}

function applyWrapper(pagePath){
  let src = fs.readFileSync(pagePath,"utf8");

  const mainOpen = src.match(/<main\b[^>]*>/);
  if (mainOpen) {
    const tag = mainOpen[0];
    let next = tag;

    if (!/data-zivel-service=/.test(tag)) {
      next = next.replace("<main", `<main data-zivel-service="${SERVICE}"`);
    }

    if (/className=/.test(next)) {
      next = next.replace(/className=\{([^}]+)\}/, (m, inner) => {
        return `className={${inner} + " zivel-service-page zivel-service--${SERVICE}"}`;
      });
      next = next.replace(/className="([^"]*)"/, (m, inner) => {
        return `className="${inner} zivel-service-page zivel-service--${SERVICE}"`;
      });
    } else {
      next = next.replace("<main", `<main className="zivel-service-page zivel-service--${SERVICE}"`);
    }

    src = src.replace(tag, next);
  } else {
    src = src.replace(/return\s*\(\s*</, `return (\n    <div data-zivel-service="${SERVICE}" className="zivel-service-page zivel-service--${SERVICE}">\n      <`);
    src = src.replace(/\)\s*;\s*$/m, `\n    </div>\n  );`);
  }

  fs.writeFileSync(pagePath, src, "utf8");
}

function addServiceVarRule(globalsPath){
  let css = fs.readFileSync(globalsPath,"utf8");
  const rule = `
/* Per-service color variables (Cryo true blue) */
.zivel-service-page[data-zivel-service="${SERVICE}"]{
  --zivel-service-r: ${R};
  --zivel-service-g: ${G};
  --zivel-service-b: ${B};
}
`.trim();

  if (!css.includes(`data-zivel-service="${SERVICE}"`)) {
    if (css.includes(MARKER_END)) {
      css = css.replace(MARKER_END, rule + "\n" + MARKER_END);
    } else {
      css = css.trimEnd() + "\n\n" + rule + "\n";
    }
    fs.writeFileSync(globalsPath, css, "utf8");
  }
}

function main(){
  const globalsPath = findGlobalsCss();
  if (!globalsPath) {
    console.error("❌ Could not find globals.css (tried app/globals.css, src/app/globals.css, styles/globals.css, src/styles/globals.css)");
    process.exit(1);
  }

  const pagePath = findCryoPage();
  if (!pagePath) {
    console.error("❌ Could not find Cryotherapy page under app/**/page.(t|j)sx");
    process.exit(1);
  }

  const b1 = backup(globalsPath);
  const b2 = backup(pagePath);

  upsertThemeCss(globalsPath);
  addServiceVarRule(globalsPath);
  applyWrapper(pagePath);

  console.log("✅ Applied service theme");
  console.log("   Globals:", globalsPath);
  console.log("   Cryo page:", pagePath);
  console.log("✅ Backups created:");
  console.log("   ", b1);
  console.log("   ", b2);
}

main();
