import type { ReactNode } from "react";

function inlineMarkdown(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      parts.push(
        <a
          key={key++}
          href={match[3]}
          className="font-semibold text-accent hover:underline"
          target={match[3]?.startsWith("http") ? "_blank" : undefined}
          rel={match[3]?.startsWith("http") ? "noreferrer" : undefined}
        >
          {match[2]}
        </a>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function ArticleBody({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2
          key={key++}
          className="font-display mt-10 text-2xl text-ink first:mt-0 md:text-3xl"
        >
          {inlineMarkdown(line.slice(3).trim())}
        </h2>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="mt-6 text-lg font-semibold text-ink">
          {inlineMarkdown(line.slice(4).trim())}
        </h3>,
      );
      i += 1;
      continue;
    }

    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i] ?? "")) {
        items.push((lines[i] ?? "").replace(/^[-*] /, ""));
        i += 1;
      }
      blocks.push(
        <ul key={key++} className="mt-4 list-disc space-y-2 pl-5 text-left">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed text-ink/90">
              {inlineMarkdown(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i] ?? "")) {
        items.push((lines[i] ?? "").replace(/^\d+\. /, ""));
        i += 1;
      }
      blocks.push(
        <ol key={key++} className="mt-4 list-decimal space-y-2 pl-5 text-left">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed text-ink/90">
              {inlineMarkdown(item)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    const paras: string[] = [];
    while (
      i < lines.length &&
      (lines[i] ?? "").trim() &&
      !(lines[i] ?? "").startsWith("## ") &&
      !(lines[i] ?? "").startsWith("### ") &&
      !/^[-*] /.test(lines[i] ?? "") &&
      !/^\d+\. /.test(lines[i] ?? "")
    ) {
      paras.push((lines[i] ?? "").trim());
      i += 1;
    }
    blocks.push(
      <p key={key++} className="mt-4 leading-relaxed text-ink/90">
        {inlineMarkdown(paras.join(" "))}
      </p>,
    );
  }

  return <div className="article-body">{blocks}</div>;
}
