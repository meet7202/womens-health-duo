const MAX_HTML_BYTES = 2_097_152;

export function wantsMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;
  return /\btext\/markdown\b/i.test(acceptHeader);
}

export function shouldSkipMarkdownPath(pathname: string): boolean {
  if (pathname.startsWith("/assets/")) return true;
  if (pathname.startsWith("/images/")) return true;
  if (pathname.startsWith("/.well-known/")) return true;
  const lower = pathname.toLowerCase();
  return /\.(js|mjs|css|json|xml|txt|ico|svg|png|jpe?g|webp|gif|woff2?|ttf|map|webmanifest)$/i.test(
    lower,
  );
}

export function estimateMarkdownTokens(markdown: string): number {
  return Math.max(1, Math.ceil(markdown.length / 4));
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripTags(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, "").trim());
}

function metaContent(html: string, selector: RegExp): string | undefined {
  const match = html.match(selector);
  const value = match?.[1]?.trim();
  return value ? decodeHtmlEntities(value) : undefined;
}

function pageFrontmatter(html: string): string | undefined {
  const title =
    metaContent(html, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i) ??
    metaContent(html, /<title>([^<]*)<\/title>/i);
  const description =
    metaContent(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i) ??
    metaContent(html, /<meta[^>]+property="og:description"[^>]+content="([^"]*)"/i);
  const image = metaContent(html, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i);

  const lines: string[] = [];
  if (title) lines.push(`title: ${yamlScalar(title)}`);
  if (description) lines.push(`description: ${yamlScalar(description)}`);
  if (image) lines.push(`image: ${yamlScalar(image)}`);
  if (!lines.length) return undefined;
  return `---\n${lines.join("\n")}\n---`;
}

function yamlScalar(value: string): string {
  if (/^[\w\s.,'()&–—/-]+$/u.test(value) && !value.includes(":")) return value;
  return JSON.stringify(value);
}

function extractJsonLd(html: string): string[] {
  return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean);
}

function staticShellMarkdown(html: string): string {
  const shell = html.match(/<main id="static-seo-shell"[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!shell) return "";

  const h1 = shell.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const paragraphs = [...shell.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => stripTags(match[1]))
    .filter(Boolean);

  const lines: string[] = [];
  if (h1) lines.push(`# ${stripTags(h1[1])}`, "");
  for (const paragraph of paragraphs) {
    lines.push(paragraph, "");
  }
  return lines.join("\n").trim();
}

function noscriptNavLinks(html: string): string {
  const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/i)?.[1];
  if (!noscript) return "";

  const links = [...noscript.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([^<]*)<\/a>/gi)].map(
    (match) => `[${stripTags(match[2])}](${match[1]})`,
  );
  return links.length ? `**Links:** ${links.join(" · ")}` : "";
}

export function htmlToMarkdown(html: string): string {
  if (html.length > MAX_HTML_BYTES) {
    throw new Error("HTML exceeds 2 MB conversion limit");
  }

  const jsonLd = extractJsonLd(html);
  const frontmatter = pageFrontmatter(html);
  const bodyMd = staticShellMarkdown(html);
  const nav = noscriptNavLinks(html);

  const parts: string[] = [];
  if (frontmatter) parts.push(frontmatter, "");
  if (bodyMd) parts.push(bodyMd);
  if (nav) parts.push("", nav);

  if (jsonLd.length) {
    if (parts.length) parts.push("");
    parts.push("```json", jsonLd.join("\n"), "```");
  }

  return parts.join("\n").trim() || "(empty page)";
}
