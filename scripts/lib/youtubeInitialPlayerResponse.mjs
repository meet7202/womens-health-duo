/**
 * Extract `videoDetails.shortDescription` from a YouTube watch page (works for Shorts IDs too).
 * @param {string} html
 * @returns {string | null}
 */
export function youtubeShortDescriptionFromWatchHtml(html) {
  const marker = "ytInitialPlayerResponse = ";
  const i = html.indexOf(marker);
  if (i === -1) return null;
  let start = i + marker.length;
  while (start < html.length && (html[start] === " " || html[start] === "\n")) start += 1;
  if (html[start] !== "{") return null;
  let depth = 0;
  let end = start;
  for (; end < html.length; end++) {
    const c = html[end];
    if (c === "{") depth += 1;
    else if (c === "}") {
      depth -= 1;
      if (depth === 0) {
        end += 1;
        break;
      }
    }
  }
  try {
    const data = JSON.parse(html.slice(start, end));
    const desc = data?.videoDetails?.shortDescription;
    if (typeof desc === "string" && desc.trim().length > 0) return desc.trim();
    const title = data?.videoDetails?.title;
    if (typeof title === "string" && title.trim().length > 0) return title.trim();
  } catch {
    return null;
  }
  return null;
}
