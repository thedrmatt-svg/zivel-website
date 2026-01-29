import fs from "node:fs";
import path from "node:path";

const CRYO_RGB = [45, 100, 189]; // true blue
const MARKER_START = "/* ZIVEL_SERVICE_THEME_START */";
const MARKER_END   = "/* ZIVEL_SERVICE_THEME_END */";

function backup(filePath){
  const stamp = new Date().toISOString().replace(/[:.]/g,"-");
  const safe = filePath.replace(/\//g,"__");
  const out = path.join(".backups", `${safe}.${stamp}.bak`);
  fs.copyFileSync(filePath, out);
  return out;
}

function findLayout(){
  const cands = ["app/layout.tsx","app/layout.jsx","src/app/layout.tsx","src/app/layout.jsx"];
  return cands.find(fs.existsSync) ?? null;
}

function findGlobalsFromLayout(layoutPath){
  const dir = path.dirname(layoutPath);
  const direct = path.join(dir, "globals.css");
  if (fs.existsSync(direct)) return direct;
  const cands = ["app/globals.css","src/app/globals.css","styles/globals.css","src/styles/globals.css"];
  return cands.find(fs.existsSync) ?? null;
}

function findDynamicServicePage(){
  const cands = [
    "src/app/services/[slug]/page.tsx",
    "src/app/services/[slug]/page.jsx",
    "app/services/[slug]/page.tsx",
    "app/services/[slug]/page.jsx",
  ];
  return cands.find(fs.existsSync) ?? null;
}

function upsertThemeCss(globalsPath){
  const THEME_CSS = `${MARKER_START}
/* Zivel Service Theme (dynamic-route) */
:root{
  --zivel-bg:#07090d;
  --zivel-fg:#f6f7f8;

  --zivel-card-bg: rgba(255,255,255,.055);
  --zivel-card-bg-hover: rgba(255,255,255,.085);
  --zivel-card-border: rgba(255,255,255,.11);
  --zivel-card-border-hover: rgba(255,255,255,.18);
  --zivel-card-shadow: 0 18px 55px rgba(0,0,0,.55);
}

.zivel-service-page{
  position: relative;
  background: var(--zivel-bg);
  color: var(--zivel-fg);
  overflow: clip;
}

/* Symmetric glow behind UI (vars come from inline style on wrapper) */
.zivel-service-page::before{
  content:"";
  position:absolute;
  inset:-2px;
  z-index:0;
  pointer-events:none;
  background:
    radial-gradient(900px 650px at 10% 18%,
      rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .18) 0%,
      rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .08) 45%,
      rgba(0,0,0,0) 72%),
    radial-gradient(900px 650px at 90% 18%,
      rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .18) 0%,
      rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .08) 45%,
      rgba(0,0,0,0) 72%),
    radial-gradient(1200px 900px at 50% 86%,
      rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .10) 0%,
      rgba(0,0,0,0) 62%),
    radial-gradient(1400px 1000px at 50% 58%,
      rgba(0,0,0,.70) 0%,
      rgba(0,0,0,.94) 70%),
    linear-gradient(180deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.72) 55%, rgba(0,0,0,.92) 100%);
}

.zivel-service-page > *{ position:relative; z-index:1; }

.zivel-service-page h1,
.zivel-service-page h2,
.zivel-service-page h3{
  text-shadow: 0 10px 26px rgba(0,0,0,.45);
}

/* If sections use opaque bg-black/bg-zinc/etc, they hide glow. Make them translucent inside service pages. */
.zivel-service-page :where([class*="bg-black"], [class*="bg-zinc"], [class*="bg-neutral"], [class*="bg-slate"]){
  background-color: rgba(0,0,0,.55) !important;
  backdrop-filter: blur(6px) saturate(1.05);
}

/* UI pop for card-like blocks (rounded + padding) */
.zivel-service-page :where([class*="rounded"][class*="p-"], [class*="rounded"][class*="px-"][class*="py-"]){
  background: var(--zivel-card-bg) !important;
  border: 1px solid var(--zivel-card-border) !important;
  box-shadow: var(--zivel-card-shadow);
}
.zivel-service-page :where([class*="rounded"][class*="p-"], [class*="rounded"][class*="px-"][class*="py-"]):hover{
  background: var(--zivel-card-bg-hover) !important;
  border-color: var(--zivel-card-border-hover) !important;
}

.zivel-service-page a:focus-visible,
.zivel-service-page button:focus-visible{
  outline: 2px solid rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), .55);
  outline-offset: 3px;
  border-radius: 12px;
}
${MARKER_END}
`;

  let css = fs.readFileSync(globalsPath, "utf8");
  if (css.includes(MARKER_START) && css.includes(MARKER_END)) {
    css = css.replace(new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`,"m"), THEME_CSS);
  } else {
    css = css.trimEnd() + "\n\n" + THEME_CSS + "\n";
  }
  fs.writeFileSync(globalsPath, css, "utf8");
}

function ensureServiceStyleBlock(src){
  const marker = "/* ZIVEL_SERVICE_STYLE_BLOCK */";
  if (src.includes(marker)) return src;

  const block = `
  ${marker}
  const isCryo = slug === "cryotherapy";
  const serviceStyle = {
    "--zivel-service-r": isCryo ? ${CRYO_RGB[0]} : 0,
    "--zivel-service-g": isCryo ? ${CRYO_RGB[1]} : 0,
    "--zivel-service-b": isCryo ? ${CRYO_RGB[2]} : 0,
  } as React.CSSProperties;
`;

  // Find "const { slug } = await params;" and insert after
  const slugMatch = src.match(/const\s*\{\s*slug\s*\}\s*=\s*await\s+params\s*;/m);
  if (slugMatch) {
    return src.replace(slugMatch[0], slugMatch[0] + block);
  }

  // Fallback: insert after the function opening brace of the default export
  const m =
    src.match(/export\s+default\s+async\s+function[^{]*\{/) ??
    src.match(/export\s+default\s+function[^{]*\{/);

  if (!m) return src;

  return src.replace(m[0], m[0] + block);
}

function forceWrapperOnReturn(src){
  // If returning a fragment, replace <> ... </> with <div ...> ... </div>
  if (/return\s*\(\s*<>/m.test(src) && /<\/>\s*\)\s*;?/m.test(src)) {
    src = src.replace(/return\s*\(\s*<>/m,
      `return (
    <div data-zivel-service={slug} className="zivel-service-page" style={serviceStyle}>`
    );
    src = src.replace(/<\/>\s*\)\s*;?/m, `</div>
  );`);
    return src;
  }

  // Otherwise, add attributes to the first root tag after return (
  const m = src.match(/return\s*\(\s*<([a-zA-Z]+)([^>]*)>/m);
  if (!m) return src;

  const tag = m[1];
  const attrs = m[2] ?? "";
  const full = m[0];

  if (!["main","div","section"].includes(tag)) return src;

  let open = `<${tag}${attrs}>`;

  // data-zivel-service
  if (!/data-zivel-service=/.test(open)) {
    open = open.replace(`<${tag}`, `<${tag} data-zivel-service={slug}`);
  }

  // className add
  if (/className="([^"]*)"/.test(open)) {
    open = open.replace(/className="([^"]*)"/, (mm, inner) =>
      inner.includes("zivel-service-page")
        ? mm
        : `className="${inner} zivel-service-page"`
    );
  } else if (/className=\{/.test(open)) {
    if (!open.includes("zivel-service-page")) {
      open = open.replace(/className=\{([^}]+)\}/, (mm, inner) =>
        `className={(${inner}).toString() + " zivel-service-page"}`
      );
    }
  } else {
    open = open.replace(`<${tag}`, `<${tag} className="zivel-service-page"`);
  }

  // style merge: if no style prop, add style={serviceStyle}
  if (!/style=/.test(open)) {
    open = open.replace(`<${tag}`, `<${tag} style={serviceStyle}`);
  }

  const replaced = full.replace(`<${tag}${attrs}>`, open);
  return src.replace(full, replaced);
}

function main(){
  const layout = findLayout();
  if (!layout) throw new Error("Could not find app/layout.* or src/app/layout.*");

  const globals = findGlobalsFromLayout(layout);
  if (!globals) throw new Error("Could not find globals.css");

  const servicePage = findDynamicServicePage();
  if (!servicePage) throw new Error("Could not find services/[slug]/page.tsx");

  const b1 = backup(globals);
  const b2 = backup(servicePage);

  upsertThemeCss(globals);

  let src = fs.readFileSync(servicePage, "utf8");
  src = ensureServiceStyleBlock(src);
  src = forceWrapperOnReturn(src);
  fs.writeFileSync(servicePage, src, "utf8");

  // Diagnostics
  const lines = src.split("\\n");
  const idx = lines.findIndex(l => l.includes("return"));
  const start = Math.max(0, idx - 2);
  const end = Math.min(lines.length, idx + 20);
  console.log("✅ Updated files:");
  console.log("  globals:", globals);
  console.log("  page   :", servicePage);
  console.log("✅ Backups:");
  console.log(" ", b1);
  console.log(" ", b2);
}

main();
