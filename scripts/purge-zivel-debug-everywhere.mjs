import fs from "node:fs";
import path from "node:path";

const DEBUG_START = "/* ZIVEL_DEBUG_START */";
const DEBUG_END   = "/* ZIVEL_DEBUG_END */";

function backup(filePath){
  const stamp = new Date().toISOString().replace(/[:.]/g,"-");
  const safe = filePath.replace(/\//g,"__");
  const out = path.join(".backups", `${safe}.${stamp}.bak`);
  fs.copyFileSync(filePath, out);
  return out;
}

function walk(dir, out = []){
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".next" || ent.name === ".git") continue;
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

function removeDebugBlocks(text){
  // Remove marker block if present
  if (text.includes(DEBUG_START) && text.includes(DEBUG_END)) {
    text = text.replace(new RegExp(`${DEBUG_START}[\\s\\S]*?${DEBUG_END}\\s*`, "gm"), "");
  }

  // Also remove any stray magenta outline rule even if markers got mangled
  text = text.replace(/\.zivel-service-page\s*\{[\s\S]*?outline:\s*4px\s+solid\s+magenta\s*!important;[\s\S]*?\}\s*/gm, "");

  // Remove debug-only body:has rule if it exists
  text = text.replace(/body:has\(\.zivel-service-page\)\s*\{[\s\S]*?\}\s*/gm, "");

  return text;
}

function main(){
  const root = process.cwd();
  const files = walk(root).filter(f => f.endsWith(".css"));

  let changed = 0;
  const touched = [];

  for (const f of files) {
    let txt = fs.readFileSync(f, "utf8");
    const next = removeDebugBlocks(txt);
    if (next !== txt) {
      backup(f);
      fs.writeFileSync(f, next, "utf8");
      changed++;
      touched.push(f);
    }
  }

  console.log(`✅ Purge complete. CSS files changed: ${changed}`);
  if (touched.length) {
    console.log("Touched:");
    for (const f of touched) console.log(" -", f);
  } else {
    console.log("No debug CSS found in any .css file.");
  }
}

main();
