const MAX_HTML_BYTES = 2_097_152;

/**
 * True when Accept prefers `text/markdown` with q > 0.
 * `text/markdown;q=0` (or missing type) must not trigger conversion.
 */
export function wantsMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;

  for (const part of acceptHeader.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const [mediaRaw, ...params] = trimmed.split(";").map((s) => s.trim());
    const media = (mediaRaw ?? "").toLowerCase();
    if (media !== "text/markdown") continue;

    let q = 1;
    for (const param of params) {
      const m = param.match(/^q\s*=\s*([0-9.]+)$/i);
      if (m) {
        const parsed = Number(m[1]);
        q = Number.isFinite(parsed) ? parsed : 0;
      }
    }
    return q > 0;
  }
  return false;
}

export function shouldSkipMarkdownPath(pathname: string): boolean {
  if (pathname.startsWith("/assets/")) return true;
  if (pathname.startsWith("/fonts/")) return true;
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

function formatInlineLinks(html: string): string {
  const withLinks = html.replace(
    /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_full, href: string, labelHtml: string) => {
      const label = stripTags(labelHtml) || href;
      return `[${label}](${href})`;
    },
  );
  return stripTags(withLinks);
}

/**
 * Parse the full `#static-seo-shell` main (visible unclipped shell after SEO-10).
 * Captures H1, paragraphs, and in-shell nav links — not only a 1px clipped stub.
 */
function staticShellMarkdown(html: string): string {
  const shell = html.match(/<main id="static-seo-shell"[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!shell) return "";

  const lines: string[] = [];
  const h1 = shell.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) lines.push(`# ${stripTags(h1[1])}`, "");

  const paragraphs = [...shell.matchAll(/<(?:p|li)[^>]*>([\s\S]*?)<\/(?:p|li)>/gi)]
    .map((match) => formatInlineLinks(match[1]))
    .filter(Boolean);

  // Prefer unique prose / link lines (nav links often sit inside a <p>).
  const seen = new Set<string>();
  for (const paragraph of paragraphs) {
    if (seen.has(paragraph)) continue;
    seen.add(paragraph);
    lines.push(paragraph, "");
  }

  return lines.join("\n").trim();
}

function shellOrNoscriptNavLinks(html: string): string {
  const shell = html.match(/<main id="static-seo-shell"[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/i)?.[1];
  const source = shell || noscript || "";
  if (!source) return "";

  const links = [...source.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(
    (match) => `[${stripTags(match[2]) || match[1]}](${match[1]})`,
  );
  const unique = [...new Set(links)];
  return unique.length ? `**Links:** ${unique.join(" · ")}` : "";
}

export function htmlToMarkdown(html: string): string {
  if (html.length > MAX_HTML_BYTES) {
    throw new Error("HTML exceeds 2 MB conversion limit");
  }

  const jsonLd = extractJsonLd(html);
  const frontmatter = pageFrontmatter(html);
  const bodyMd = staticShellMarkdown(html);
  const nav = shellOrNoscriptNavLinks(html);

  const parts: string[] = [];
  if (frontmatter) parts.push(frontmatter, "");
  if (bodyMd) parts.push(bodyMd);
  // Skip a second link list when the shell body already inlined the same anchors.
  if (nav) {
    const linkItems = nav.replace("**Links:** ", "").split(" · ").filter(Boolean);
    const bodyHasLinks = linkItems.length > 0 && linkItems.every((link) => bodyMd.includes(link));
    if (!bodyHasLinks) parts.push("", nav);
  }

  if (jsonLd.length) {
    if (parts.length) parts.push("");
    parts.push("```json", jsonLd.join("\n"), "```");
  }

  return parts.join("\n").trim() || "(empty page)";
}
