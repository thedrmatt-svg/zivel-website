const fs = require("node:fs");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");

async function capture() {
  const r = createLocationRenderer();
  r.wrappers["@/lib/local-blog-store"] = { getPublishedEditorPosts: async () => [] };
  const { locations } = r.source("src/lib/data/locations");
  const main = "src/app/[locale]/locations/[state]/[city]/page";
  const pages = [];
  for (const location of locations) for (const locale of ["en", "es"]) {
    const params = { locale, state: location.stateSlug, city: location.citySlug };
    const doc = await r.render(main, params);
    const section = doc.querySelector("[data-location-faq]");
    const faq = section.querySelectorAll("details").map(detail => ({
      question: detail.querySelector("summary").text,
      answer: detail.querySelector("p").text,
    }));
    const sections = doc.querySelectorAll("main > section").map(node => [
      node.getAttribute("id"), node.getAttribute("class"),
    ]);
    section.remove();
    pages.push({ params, faq, sections, protectedHtml: doc.toString(),
      metadata: await r.source(main).generateMetadata({ params: Promise.resolve(params) }) });
  }
  return { locations, pages, sitemap: await r.source("src/app/sitemap").default(),
    navigation: r.source("src/lib/data/locationNav").getLocationNav() };
}

module.exports = { capture };
if (require.main === module) capture().then(result => {
  fs.writeFileSync(process.argv[2], JSON.stringify(result));
  console.log(`Captured ${result.pages.length} locale pages and ${result.sitemap.length} sitemap entries.`);
}).catch(error => { console.error(error); process.exitCode = 1; });
