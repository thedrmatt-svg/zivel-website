#!/usr/bin/env node
/**
 * Website Spec MCP Audit — www.zivel.com
 *
 * Connects to the public Website Specification MCP server and generates
 * a prioritized audit report for the target URL.
 *
 * Usage:
 *   node scripts/website-spec-audit.js
 *   node scripts/website-spec-audit.js https://www.zivel.com
 *
 * Output: prints Markdown to stdout.
 *         Redirect to a file:  node scripts/website-spec-audit.js > audit-report.md
 */

const TARGET_URL = process.argv[2] || "https://www.zivel.com";
const MCP_ENDPOINT = "https://mcp.specification.website/mcp";

// Categories relevant to a franchise wellness site
const FOCUS_CATEGORIES = [
  "seo",
  "accessibility",
  "security",
  "performance",
  "agent-readiness",
];

// ─── MCP JSON-RPC helpers ─────────────────────────────────────────────────────

let sessionId = null;
let requestId = 0;

function nextId() {
  return ++requestId;
}

async function mcpRequest(method, params = {}) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };
  if (sessionId) headers["Mcp-Session-Id"] = sessionId;

  const body = JSON.stringify({
    jsonrpc: "2.0",
    id: nextId(),
    method,
    params,
  });

  const res = await fetch(MCP_ENDPOINT, { method: "POST", headers, body });

  // Capture session ID from response headers if provided
  const sid = res.headers.get("Mcp-Session-Id");
  if (sid) sessionId = sid;

  const text = await res.text();

  // The server may respond with Server-Sent Events (SSE) or plain JSON
  // Strip SSE framing if present: lines starting with "data: "
  let jsonText = text;
  if (text.startsWith("data:")) {
    const lines = text.split("\n").filter((l) => l.startsWith("data: "));
    // Collect all data frames and merge (MCP may batch)
    const frames = lines.map((l) => l.slice(6).trim()).filter(Boolean);
    // Return the last complete JSON object (final response)
    jsonText = frames[frames.length - 1] || "{}";
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error(`Non-JSON response from MCP (${res.status}):\n${text.slice(0, 500)}`);
  }

  if (parsed.error) {
    throw new Error(`MCP error [${parsed.error.code}]: ${parsed.error.message}`);
  }

  return parsed.result;
}

// ─── Initialize MCP session ───────────────────────────────────────────────────

async function initialize() {
  const result = await mcpRequest("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "zivel-audit-script", version: "1.0.0" },
  });
  return result.serverInfo;
}

// ─── Get the baseline audit prompt (required-tier, all categories) ────────────

async function getAuditPlan(url, focus) {
  const args = { url };
  if (focus) args.focus = focus;

  const result = await mcpRequest("prompts/get", {
    name: "audit_url",
    arguments: args,
  });

  // Result has a `messages` array; extract all text content
  if (!result || !result.messages) return null;
  return result.messages
    .map((m) => {
      if (typeof m.content === "string") return m.content;
      if (Array.isArray(m.content))
        return m.content
          .filter((c) => c.type === "text")
          .map((c) => c.text)
          .join("\n");
      if (m.content?.type === "text") return m.content.text;
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

// ─── Get checklist for a category ────────────────────────────────────────────

async function getChecklist(category, status = "recommended") {
  const result = await mcpRequest("tools/call", {
    name: "get_checklist",
    arguments: { category, status },
  });

  // Result has content[].text (Markdown) and structuredContent
  const text = result?.content?.find((c) => c.type === "text")?.text || "";
  const structured = result?.structuredContent || null;
  return { text, structured };
}

// ─── Markdown formatting helpers ──────────────────────────────────────────────

function hr() {
  return "\n---\n";
}

function section(title, content) {
  return `\n## ${title}\n\n${content}\n`;
}

function categoryLabel(cat) {
  const labels = {
    seo: "SEO",
    accessibility: "Accessibility",
    security: "Security",
    performance: "Performance",
    "agent-readiness": "Agent-Readiness (AI Crawlers)",
  };
  return labels[cat] || cat;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  process.stderr.write(`\n🔌  Connecting to MCP server at ${MCP_ENDPOINT}…\n`);

  const serverInfo = await initialize();
  process.stderr.write(`✅  Connected to: ${serverInfo.title || serverInfo.name} v${serverInfo.version}\n`);
  process.stderr.write(`🎯  Target URL:   ${TARGET_URL}\n\n`);

  // ── 1. Baseline audit (required-tier, all categories) ──────────────────────
  process.stderr.write("📋  Fetching baseline audit plan (required-tier, all categories)…\n");
  const baselinePlan = await getAuditPlan(TARGET_URL);

  // ── 2. Focus audits for each category ──────────────────────────────────────
  const focusPlans = {};
  for (const cat of FOCUS_CATEGORIES) {
    process.stderr.write(`📋  Fetching focus audit: ${cat}…\n`);
    focusPlans[cat] = await getAuditPlan(TARGET_URL, cat);
  }

  // ── 3. Checklists (recommended-tier) for each category ─────────────────────
  const checklists = {};
  for (const cat of FOCUS_CATEGORIES) {
    process.stderr.write(`✅  Fetching checklist:   ${cat} (recommended)…\n`);
    checklists[cat] = await getChecklist(cat, "recommended");
  }

  process.stderr.write("\n📝  Building report…\n\n");

  // ── Assemble Markdown report ────────────────────────────────────────────────
  const now = new Date().toISOString().split("T")[0];
  const lines = [];

  lines.push(`# Website Spec Audit — ${TARGET_URL}`);
  lines.push(`_Generated ${now} using [The Website Specification](https://specification.website) MCP server_`);
  lines.push(hr());

  // Summary
  lines.push(section(
    "High-Level Summary",
    `This report audits **${TARGET_URL}** against [The Website Specification](https://specification.website).

It covers five categories most relevant to a franchise wellness site:

| Category | Focus |
|---|---|
| **SEO** | Crawlability, structured data, sitemaps, URL structure |
| **Accessibility** | WCAG compliance, semantic HTML, keyboard navigation |
| **Security** | HTTPS, CSP, headers, dependency hygiene |
| **Performance** | Core Web Vitals, caching, asset optimization |
| **Agent-Readiness** | AI crawler access, structured metadata, \`llms.txt\` |

Items are drawn from two tiers:
- **Required** — platform contract; broken sites fail here
- **Recommended** — modern sites should do this; high ROI`
  ));

  // Baseline audit (required-tier)
  if (baselinePlan) {
    lines.push(hr());
    lines.push(`## Baseline Audit Plan (Required-Tier — All Categories)\n`);
    lines.push(`> These are the **contract-level** requirements every public website must meet.\n`);
    lines.push(baselinePlan);
  }

  // Per-category sections
  for (const cat of FOCUS_CATEGORIES) {
    lines.push(hr());
    lines.push(`## ${categoryLabel(cat)}`);

    // Focus audit for this category
    if (focusPlans[cat]) {
      lines.push(`\n### Audit Plan (Recommended + Optional depth)\n`);
      lines.push(focusPlans[cat]);
    }

    // Recommended checklist
    if (checklists[cat]?.text) {
      lines.push(`\n### Checklist (Recommended items)\n`);
      lines.push(checklists[cat].text);
    }
  }

  lines.push(hr());
  lines.push(`## How to Use This Report\n`);
  lines.push(`1. **Work through the Baseline section first** — these are required-tier items that affect every visitor and crawler.
2. **Prioritize SEO and Performance** for franchise discovery (organic search drives trial bookings).
3. **Accessibility** is both ethical and increasingly a legal requirement for multi-location brands.
4. **Agent-Readiness** is the emerging frontier — AI assistants increasingly drive local service discovery.
5. Use the checklist items as acceptance criteria in your sprint/task backlog.

_Full spec reference: <https://specification.website>_`);

  // Print the report to stdout
  console.log(lines.join("\n"));

  process.stderr.write("✅  Report complete.\n");
  process.stderr.write("    Tip: redirect to a file →  node scripts/website-spec-audit.js > audit-report.md\n\n");
}

main().catch((err) => {
  process.stderr.write(`\n💥  Error: ${err.message}\n`);
  process.exit(1);
});
