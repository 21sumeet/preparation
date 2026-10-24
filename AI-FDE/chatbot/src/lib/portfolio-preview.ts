export type PortfolioFiles = {
  html: string;
  css: string;
  js: string;
};

type FileKind = keyof PortfolioFiles;

const FENCE = /```([^\n`]*)\n([\s\S]*?)```/g;

function kindOf(language: string, fileName: string): FileKind | null {
  const name = fileName.split("/").pop()?.toLowerCase() ?? "";

  if (language === "html" || name === "index.html" || name.endsWith(".html")) {
    return "html";
  }
  if (language === "css" || name.endsWith(".css")) return "css";
  if (
    language === "js" ||
    language === "javascript" ||
    language === "mjs" ||
    name.endsWith(".js")
  ) {
    return "js";
  }
  return null;
}

/**
 * Pulls the index.html / styles.css / script.js trio out of an assistant reply.
 * Returns null unless all three files are present, so the preview only appears
 * for complete portfolio responses.
 */
export function parsePortfolioFiles(markdown: string): PortfolioFiles | null {
  const text = markdown.replace(/\r\n/g, "\n");
  const found: Partial<Record<FileKind, string>> = {};

  for (const match of text.matchAll(FENCE)) {
    const [language, ...rest] = match[1].trim().toLowerCase().split(/\s+/);
    const kind = kindOf(language, rest.join(" "));
    if (!kind || found[kind] !== undefined) continue;

    const body = match[2].replace(/\n$/, "");
    if (body.trim()) found[kind] = body;
  }

  if (!found.html || !found.css || !found.js) return null;
  return { html: found.html, css: found.css, js: found.js };
}

export function hasPortfolioPreview(markdown: string): boolean {
  return parsePortfolioFiles(markdown) !== null;
}

function escapeScript(code: string): string {
  return code.replace(/<\/script/gi, "<\\/script");
}

/**
 * The generated files reference each other by relative path, which a srcDoc
 * iframe cannot resolve, so styles.css and script.js are inlined.
 */
export function buildPortfolioSrcDoc({ html, css, js }: PortfolioFiles): string {
  let doc = html;
  const styleTag = `<style>\n${css}\n</style>`;
  const scriptTag = `<script>\n${escapeScript(js)}\n</script>`;

  const linkTag =
    /<link\b[^>]*\bhref=["'][^"']*styles\.css["'][^>]*\/?>/i;
  const scriptTagWithSrc =
    /<script\b[^>]*\bsrc=["'][^"']*script\.js["'][^>]*>(?:\s*<\/script>)?/i;

  if (linkTag.test(doc)) {
    doc = doc.replace(linkTag, styleTag);
  } else if (/<\/head>/i.test(doc)) {
    doc = doc.replace(/<\/head>/i, `${styleTag}\n</head>`);
  } else {
    doc = `${styleTag}\n${doc}`;
  }

  if (scriptTagWithSrc.test(doc)) {
    doc = doc.replace(scriptTagWithSrc, scriptTag);
  } else if (/<\/body>/i.test(doc)) {
    doc = doc.replace(/<\/body>/i, `${scriptTag}\n</body>`);
  } else {
    doc = `${doc}\n${scriptTag}`;
  }

  return doc;
}
