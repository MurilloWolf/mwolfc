import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

import CopyButton from "@/components/mdx/CopyButton";
import { highlightCode } from "@/lib/highlight";
import { cn } from "@/lib/utils";

type PreCodeElement = ReactElement<
  ComponentPropsWithoutRef<"code"> & {
    children: ReactNode;
    metastring?: string;
  }
>;

type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & {
  children: PreCodeElement;
};

type CodeBlockMeta = {
  title?: string;
  filename?: string;
  theme?: string;
  wrapper?: string;
  codeClass?: string;
};

function normalizeCode(node: ReactNode) {
  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.filter((item) => typeof item === "string").join("");
  }

  return "";
}

function parseMeta(meta?: string) {
  if (!meta) return {} as Record<string, string>;

  return meta.split(/\s+/).reduce<Record<string, string>>((acc, chunk) => {
    const [rawKey, rawValue] = chunk.split("=");

    if (!rawKey || !rawValue) return acc;

    const value = rawValue.replace(/^"|"$/g, "");
    acc[rawKey] = value;
    return acc;
  }, {});
}

export default async function CodeBlock({ children }: CodeBlockProps) {
  const { className = "", children: codeChildren, metastring } = children.props;

  const code = normalizeCode(codeChildren).trimEnd();
  const meta = parseMeta(metastring) as CodeBlockMeta;
  const language = className
    .split(" ")
    .find((token) => token.startsWith("language-"))
    ?.replace("language-", "")
    ?.trim();

  const title = meta.title ?? meta.filename ?? "Snippet";
  const highlighted = await highlightCode({
    code,
    language: language || "plaintext",
    theme: meta.theme,
  });

  const wrapperClassName = cn("relative bg-muted px-4 py-4", meta.wrapper);

  const codeBlockClassName = cn(
    "code-block overflow-x-auto [&_.shiki]:m-0 [&_.shiki]:bg-transparent [&_.shiki]:p-0 [&_.shiki_code]:font-mono [&_.shiki_code]:text-sm [&_.line]:min-h-[1.5rem] [&_.line]:leading-relaxed",
    meta.codeClass
  );

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-muted bg-muted/30 shadow-sm">
      <div className=" flex items-center justify-between gap-3 border-b border-muted/80 bg-black/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="font-medium">
          {title}
          {language ? ` · ${language.toUpperCase()}` : ""}
        </span>
        <CopyButton value={code} />
      </div>
      <div className={wrapperClassName}>
        <div
          className={codeBlockClassName}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}
