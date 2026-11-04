import type { BlogContentBlock } from "@/types/blog";

// Deliberately small, text-only format: never evaluates HTML or scripts.
export function parseBlogMarkdown(markdown: string): BlogContentBlock[] {
  return markdown.trim().split(/\n\s*\n/).filter(Boolean).map((chunk) => {
    const lines = chunk.split("\n");
    if (lines[0].startsWith("|") && /^\|(?:\s*:?-+:?\s*\|)+$/.test(lines[1] ?? "")) {
      const cells = (line: string) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
      const headers = cells(lines[0]);
      return { type: "table", headers, rows: lines.slice(2).map(cells).map((row) => headers.map((_, index) => row[index] ?? "")) };
    }
    if (/^#{2,3} /.test(chunk)) {
      return { type: "heading", level: chunk.startsWith("### ") ? 3 : 2, text: chunk.replace(/^#{2,3} /, "") };
    }
    if (/^\d+\. /.test(chunk)) {
      return { type: "list", ordered: true, boldLead: true, items: chunk.split("\n").map((line) => line.replace(/^\d+\. /, "").replace(/\*\*/g, "")) };
    }
    if (/^- /.test(chunk)) {
      const boldLead = lines.every((line) => /^- \*\*[^*]+\*\*/.test(line));
      return {
        type: "list",
        ...(boldLead ? { boldLead: true } : {}),
        items: lines.map((line) => line.replace(/^- /, "").replace(/^\*\*([^*]+)\*\*/, "$1")),
      };
    }
    if (/^\*\*[^*]+\*\*/.test(chunk)) {
      return { type: "paragraph", boldLead: true, text: chunk.replace(/^\*\*([^*]+)\*\*/, "$1") };
    }
    return { type: "paragraph", text: chunk };
  });
}

export function blogBlocksToMarkdown(blocks: BlogContentBlock[]): string {
  return blocks.map((block) => {
    if (block.type === "heading") return `${"#".repeat(block.level)} ${block.text}`;
    if (block.type === "paragraph") {
      const split = block.boldLead ? block.text.indexOf(". ") : -1;
      return split >= 0 ? `**${block.text.slice(0, split + 1)}**${block.text.slice(split + 1)}` : block.text;
    }
    if (block.type === "table") {
      const row = (cells: string[]) => `| ${cells.join(" | ")} |`;
      return [row(block.headers), row(block.headers.map(() => "---")), ...block.rows.map(row)].join("\n");
    }
    if (block.type === "source") return `Source: ${block.label} (${block.url})`;
    return block.items.map((item, index) => {
      const split = block.boldLead ? item.search(block.ordered ? /\.\s/ : /[.:]\s/) : -1;
      const text = split >= 0 ? `**${item.slice(0, split + 1)}**${item.slice(split + 1)}` : item;
      return `${block.ordered ? `${index + 1}.` : "-"} ${text}`;
    }).join("\n");
  }).join("\n\n");
}
