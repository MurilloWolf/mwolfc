import { codeToHtml } from "shiki";

const FALLBACK_THEME = "github-light-default";

interface HighlightOptions {
  code: string;
  language: string;
  theme?: string;
}

export async function highlightCode({
  code,
  language,
  theme,
}: HighlightOptions) {
  const lang = language || "plaintext";

  const highlighted = await codeToHtml(code, {
    lang,
    theme: theme ?? FALLBACK_THEME,
  });

  return highlighted.replace(/(<pre\b[^>]*?)\sstyle="[^"]*"/, "$1");
}
