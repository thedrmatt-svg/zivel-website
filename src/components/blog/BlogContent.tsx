import type { BlogContentBlock } from "@/types/blog";

export function BlogListText({ text, boldLead }: { text: string; boldLead?: boolean }) {
  const split = boldLead ? text.search(/[.:]\s/) : -1;
  return split >= 0 ? <><strong>{text.slice(0, split + 1)}</strong>{text.slice(split + 1)}</> : <>{text}</>;
}

export function BlogTable({ block, dark = false }: {
  block: Extract<BlogContentBlock, { type: "table" }>;
  dark?: boolean;
}) {
  return (
    <div
      role="region"
      aria-label="Article table — scroll horizontally to see all columns"
      tabIndex={0}
      className={`w-full min-w-0 max-w-full overflow-x-auto rounded-2xl border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--zivel-gold)] ${dark ? "border-white/15" : "border-black/10"}`}
    >
      <table className={`w-full min-w-[640px] border-collapse text-left text-sm leading-relaxed ${dark ? "text-white/75" : "text-black/65"}`}>
        <thead className={dark ? "bg-white/5 text-[var(--zivel-gold)]" : "bg-black/[0.03] text-[var(--zivel-gold-dark)]"}>
          <tr>{block.headers.map((header, index) => <th key={index} scope="col" className="px-5 py-4 font-semibold">{header}</th>)}</tr>
        </thead>
        <tbody>{block.rows.map((row, index) => (
          <tr key={index} className={`border-t ${dark ? "border-white/10" : "border-black/8"}`}>
            {row.map((cell, column) => column === 0
              ? <th key={column} scope="row" className="px-5 py-4 align-top font-medium">{cell}</th>
              : <td key={column} className="px-5 py-4 align-top">{cell}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export function BlogParagraph({ block, className }: {
  block: Extract<BlogContentBlock, { type: "paragraph" }>;
  className?: string;
}) {
  const split = block.boldLead ? block.text.indexOf(". ") : -1;
  return <p className={className}>{split >= 0
    ? <><strong>{block.text.slice(0, split + 1)}</strong>{block.text.slice(split + 1)}</>
    : block.text}</p>;
}
