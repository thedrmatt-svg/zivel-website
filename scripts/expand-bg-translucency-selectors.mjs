import fs from "node:fs";
import path from "node:path";

const FILE = "src/styles/globals.css";
const START = "/* ZIVEL_SERVICE_THEME_START */";
const END   = "/* ZIVEL_SERVICE_THEME_END */";

function backup(filePath){
  const stamp = new Date().toISOString().replace(/[:.]/g,"-");
  const safe = filePath.replace(/\//g,"__");
  const out = path.join(".backups", `${safe}.${stamp}.bak`);
  fs.copyFileSync(filePath, out);
  return out;
}

function main(){
  if (!fs.existsSync(FILE)) {
    console.error("❌ Not found:", FILE);
    process.exit(1);
  }

  const b = backup(FILE);
  let css = fs.readFileSync(FILE, "utf8");

  const blockRe = new RegExp(`${START}[\\s\\S]*?${END}`, "m");
  const m = css.match(blockRe);
  if (!m) {
    console.error("❌ Theme block markers not found in src/styles/globals.css");
    process.exit(1);
  }

  let block = m[0];

  const oldRuleRe =
/\.zivel-service-page\s*:where\(section,\s*main,\s*article,\s*div\)\[class\*="bg-"\]\s*\{[\s\S]*?\}\s*/m;

  const newRule =
`.zivel-service-page :where(section, main, article, div)[class*="bg-"],
.zivel-service-page :where(section, main, article, div)[class*="bg-["]{
  /* Make opaque sections translucent so the symmetric glow reads site-wide */
  background-color: rgba(0,0,0,.46) !important;
  backdrop-filter: blur(10px) saturate(1.08);
}
`;

  if (oldRuleRe.test(block)) {
    block = block.replace(oldRuleRe, newRule);
  } else {
    const insertPoint = block.indexOf("/* Type depth */");
    if (insertPoint !== -1) {
      block = block.slice(0, insertPoint) + newRule + "\n" + block.slice(insertPoint);
    } else {
      block = block.replace(/(\.zivel-service-page::before[\s\S]*?\}\s*)/m, `$1\n\n${newRule}\n`);
    }
  }

  css = css.replace(blockRe, block);
  fs.writeFileSync(FILE, css, "utf8");

  console.log("✅ Expanded translucent background selectors to include Tailwind bg-[...] arbitrary values.");
  console.log("File:", FILE);
  console.log("Backup:", b);
}

main();
