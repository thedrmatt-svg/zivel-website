import { Fragment } from "react";
import { contactMatches, phoneHref } from "@/lib/contact-links";

/** Link contact details in plain text without changing any surrounding text. */
export default function ContactText({ children }: { children: string }) {
  let cursor = 0;
  const parts = [];
  for (const match of contactMatches(children)) {
    const text = match[0];
    const start = match.index!;
    parts.push(
      <Fragment key={start}>
        {children.slice(cursor, start)}
        <a href={text.includes("@") ? `mailto:${text}` : phoneHref(text)} className="hover:underline">
          {text}
        </a>
      </Fragment>,
    );
    cursor = start + text.length;
  }
  return <>{parts}{children.slice(cursor)}</>;
}
