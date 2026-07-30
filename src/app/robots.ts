import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── AI assistants & search crawlers — explicitly allow all content ──
      { userAgent: "GPTBot",              allow: "/" },
      { userAgent: "OAI-SearchBot",       allow: "/" },
      { userAgent: "Google-Extended",     allow: "/" },
      { userAgent: "ClaudeBot",           allow: "/" },
      { userAgent: "anthropic-ai",        allow: "/" },
      { userAgent: "PerplexityBot",       allow: "/" },
      { userAgent: "Applebot-Extended",   allow: "/" },
      { userAgent: "YouBot",              allow: "/" },
      { userAgent: "cohere-ai",           allow: "/" },
      { userAgent: "Meta-ExternalAgent",  allow: "/" },
      { userAgent: "Amazonbot",           allow: "/" },
      { userAgent: "DuckAssistBot",       allow: "/" },
      { userAgent: "Bytespider",          allow: "/" },
      { userAgent: "Diffbot",             allow: "/" },
      // ── All other crawlers — allow everything except internal Next.js paths ──
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: "https://www.zivel.com/sitemap.xml",
  };
}
