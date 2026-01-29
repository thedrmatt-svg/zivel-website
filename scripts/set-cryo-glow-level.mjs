import fs from "node:fs";
import path from "node:path";

const FILE = "src/styles/globals.css";
const START = "/* ZIVEL_SERVICE_THEME_START */";
const END   = "/* ZIVEL_SERVICE_THEME_END */";

const level = Number(process.argv[2] ?? "2");
if (![1,2,3,4,5].includes(level)) {
  console.error("❌ Usage: node scripts/set-cryo-glow-level.mjs <level 1-5>");
  process.exit(1);
}

const map = {
  1: { a1: 0.26, a2: 0.12, a3: 0.14 },
  2: { a1: 0.32, a2: 0.16, a3: 0.18 },
  3: { a1: 0.38, a2: 0.20, a3: 0.22 },
  4: { a1: 0.44, a2: 0.24, a3: 0.26 },
  5: { a1: 0.50, a2: 0.28, a3: 0.30 },
}[level];

function backup(filePath){
  const stamp = new Date().toISOString().replace(/[:.]/g,"-");
  const safe = filePath.replace(/\//g,"__");
  const out = path.join(".backups", `${safe}.${stamp}.bak`);
  fs.copyFileSync(filePath, out);
  return out;
}

function findThemeBlock(css){
  const re = new RegExp(`${START}[\\s\\S]*?${END}`, "m");
  const m = css.match(re);
  return m ? { re, block: m[0] } : null;
}

function findMatchingBrace(text, startIdx){
  let depth = 0;
  for (let i = startIdx; i < text.length; i++){
    const ch = text[i];
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function main(){
  if (!fs.existsSync(FILE)) {
    console.error("❌ Not found:", FILE);
    process.exit(1);
  }

  const b = backup(FILE);
  let css = fs.readFileSync(FILE, "utf8");

  const theme = findThemeBlock(css);
  if (!theme) {
    console.error("❌ Theme block markers not found in src/styles/globals.css");
    process.exit(1);
  }

  let block = theme.block;

  const needle = ".zivel-service-page::before";
  const idxRule = block.indexOf(needle);
  if (idxRule === -1) {
    console.error("❌ Could not find .zivel-service-page::before rule inside theme block.");
    process.exit(1);
  }

  const idxOpen = block.indexOf("{", idxRule);
  if (idxOpen === -1) {
    console.error("❌ Could not find opening { for ::before rule.");
    process.exit(1);
  }

  const idxClose = findMatchingBrace(block, idxOpen);
  if (idxClose === -1) {
    console.error("❌ Could not find closing } for ::before rule.");
    process.exit(1);
  }

  const beforeRule = block.slice(idxRule, idxClose + 1);

  const rgbaVarRe = /rgba\(var\(--zivel-service-r\),\s*var\(--zivel-service-g\),\s*var\(--zivel-service-b\),\s*(0?\.\d+)\s*\)/g;

  let i = 0;
  const replacedRule = beforeRule.replace(rgbaVarRe, (_m, _alpha) => {
    i++;
    if (i === 1 || i === 3) return `rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), ${map.a1})`;
    if (i === 2 || i === 4) return `rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), ${map.a2})`;
    if (i === 5)            return `rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), ${map.a3})`;
    return `rgba(var(--zivel-service-r), var(--zivel-service-g), var(--zivel-service-b), ${_alpha})`;
  });

  if (i < 5) {
    console.error(`❌ Expected at least 5 service-color rgba() matches inside ::before; found ${i}.`);
    console.error("This means your ::before rule doesn't match the expected structure.");
    process.exit(1);
  }

  block = block.replace(beforeRule, replacedRule);
  css = css.replace(theme.re, block);
  fs.writeFileSync(FILE, css, "utf8");

  console.log(`✅ Set Cryo glow to Level ${level}`);
  console.log(`   a1=${map.a1} (side primary), a2=${map.a2} (side secondary), a3=${map.a3} (bottom accent)`);
  console.log("✅ File:", FILE);
  console.log("✅ Backup:", b);
}

main();
