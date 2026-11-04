import type { BlogContentBlock } from "@/types/blog";

// Deliberately small, text-only format: never evaluates HTML or scripts.
export function parseBlogMarkdown(markdown: string): BlogContentBlock[] {
  return markdown.trim().split(/\n\s*\n/).filter(Boolean).map((chunk) => {
    if (/^#{2,3} /.test(chunk)) {
      return { type: "heading", level: chunk.startsWith("### ") ? 3 : 2, text: chunk.replace(/^#{2,3} /, "") };
    }
    if (/^\d+\. /.test(chunk)) {
      return { type: "list", ordered: true, boldLead: true, items: chunk.split("\n").map((line) => line.replace(/^\d+\. /, "").replace(/\*\*/g, "")) };
    }
    if (/^- /.test(chunk)) return { type: "list", items: chunk.split("\n").map((line) => line.replace(/^- /, "")) };
    return { type: "paragraph", text: chunk };
  });
}

export function blogBlocksToMarkdown(blocks: BlogContentBlock[]): string {
  return blocks.map((block) => {
    if (block.type === "heading") return `${"#".repeat(block.level)} ${block.text}`;
    if (block.type === "paragraph") return block.text;
    if (block.type === "source") return `Source: ${block.label} (${block.url})`;
    return block.items.map((item, index) => {
      const split = block.boldLead ? item.indexOf(". ") : -1;
      const text = split >= 0 ? `**${item.slice(0, split + 1)}**${item.slice(split + 1)}` : item;
      return `${block.ordered ? `${index + 1}.` : "-"} ${text}`;
    }).join("\n");
  }).join("\n\n");
}
