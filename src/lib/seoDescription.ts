import { CONTACT, DEFAULT_DESCRIPTION } from "../config/site.defaults";

/** Bing Webmaster: meta description should be 25–160 characters. */
export const META_DESCRIPTION_MAX_LEN = 160;

export const META_DESCRIPTION_MIN_LEN = 25;

/** Appended when capping long descriptions so booking contact is never dropped. */
export function metaDescriptionBookingCta(): string {
  return `Book via WhatsApp ${CONTACT.phoneE164}.`;
}

/** When a Learn watch page has no usable caption for `<meta description>`. */
export const LEARN_WATCH_META_FALLBACK = `Watch a Women's Health Duo health clip. ${metaDescriptionBookingCta()}`;

function normalizeMetaDescriptionText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function truncateAtWord(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const ellipsis = "…";
  const budget = maxLen - ellipsis.length;
  let truncated = text.slice(0, budget).trimEnd();
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > budget * 0.55) {
    truncated = truncated.slice(0, lastSpace);
  }
  return `${truncated}${ellipsis}`;
}

function stripDanglingClauseEnd(text: string): string {
  return text
    .replace(/\([^)]*$/, "")
    .replace(/[,;:\s]+$/, "")
    .trim();
}

function sentenceBreakIndex(text: string): number {
  for (let i = 0; i < text.length - 1; i++) {
    if (text[i] !== "." || text[i + 1] !== " ") continue;
    const before = text.slice(Math.max(0, i - 4), i);
    if (/\b(?:Dr|Mr|Ms|Mrs|vs|etc)$/i.test(before)) continue;
    return i;
  }
  return -1;
}

function leadBeforeBookingCta(trimmed: string, bodyBudget: number): string {
  const sentenceEnd = sentenceBreakIndex(trimmed);
  if (sentenceEnd > 0) {
    const sentence = trimmed.slice(0, sentenceEnd + 1).trim();
    if (sentence.length <= bodyBudget && sentence.length >= META_DESCRIPTION_MIN_LEN) {
      return sentence;
    }
  }

  const secondDoctor = trimmed.search(/ and Dr\. Zalak/i);
  if (secondDoctor >= META_DESCRIPTION_MIN_LEN && secondDoctor <= bodyBudget) {
    return trimmed.slice(0, secondDoctor).trim();
  }

  const closedClause = trimmed.indexOf("). ");
  if (closedClause > 0) {
    const clause = trimmed.slice(0, closedClause + 1).trim();
    if (clause.length <= bodyBudget && clause.length >= META_DESCRIPTION_MIN_LEN) {
      return clause;
    }
  }

  let body = truncateAtWord(trimmed, bodyBudget).replace(/…$/, "").trimEnd();
  body = stripDanglingClauseEnd(body);
  return body;
}

function capWithBookingCta(trimmed: string, maxLen: number): string {
  const phone = CONTACT.phoneE164;
  const bookingCta = metaDescriptionBookingCta();
  const bookingCtaSuffix = ` ${bookingCta}`;

  if (trimmed.includes(phone)) {
    const phoneIdx = trimmed.lastIndexOf(phone);
    const prefix = trimmed
      .slice(0, phoneIdx)
      .replace(/\s*(?:book\s+via\s+)?whatsapp\s*$/i, "")
      .trim();
    const tail = trimmed.slice(phoneIdx).startsWith("WhatsApp")
      ? trimmed.slice(phoneIdx)
      : `WhatsApp ${trimmed.slice(phoneIdx)}`;
    const tailWithDot = tail.endsWith(".") ? tail : `${tail}.`;
    const prefixBudget = maxLen - tailWithDot.length - 1;
    if (prefixBudget >= META_DESCRIPTION_MIN_LEN) {
      let prefixText = prefix.length > 0 ? leadBeforeBookingCta(prefix, prefixBudget) : "";
      prefixText = stripDanglingClauseEnd(prefixText);
      const combined = prefixText.length > 0 ? `${prefixText} ${tailWithDot}` : tailWithDot;
      if (combined.length <= maxLen) return combined;
    }
    return tailWithDot.length <= maxLen ? tailWithDot : truncateAtWord(tailWithDot, maxLen);
  }

  const vagueWhatsAppTail = /\s*WhatsApp or email to book\.?$/i;
  if (vagueWhatsAppTail.test(trimmed)) {
    trimmed = trimmed.replace(vagueWhatsAppTail, "").trim();
  }

  const bodyBudget = maxLen - bookingCtaSuffix.length;
  if (bodyBudget < META_DESCRIPTION_MIN_LEN) {
    return truncateAtWord(`${trimmed}${bookingCtaSuffix}`, maxLen);
  }

  let body = leadBeforeBookingCta(trimmed, bodyBudget);
  body = stripDanglingClauseEnd(body);
  if (body.length < META_DESCRIPTION_MIN_LEN) {
    body = stripDanglingClauseEnd(truncateAtWord(trimmed, bodyBudget).replace(/…$/, "").trimEnd());
  }

  const punctuatedBody = /[.!?]$/.test(body) ? body : `${body}.`;
  const combined = `${punctuatedBody}${bookingCtaSuffix}`;
  return combined.length <= maxLen ? combined : truncateAtWord(combined, maxLen);
}

/**
 * Normalize and cap meta description for HTML / OG / Twitter.
 * Long copy keeps a book-consult / WhatsApp CTA at the end when possible.
 * Must not use `@/` imports (used from Node build scripts).
 */
export function capMetaDescription(
  text: string,
  options: {
    maxLen?: number;
    minLen?: number;
    fallback?: string;
  } = {},
): string {
  const maxLen = options.maxLen ?? META_DESCRIPTION_MAX_LEN;
  const minLen = options.minLen ?? META_DESCRIPTION_MIN_LEN;
  const fallback = normalizeMetaDescriptionText(options.fallback ?? DEFAULT_DESCRIPTION);

  let trimmed = normalizeMetaDescriptionText(text);
  if (trimmed.length < minLen) trimmed = fallback;
  if (trimmed.length <= maxLen) return trimmed;
  return capWithBookingCta(trimmed, maxLen);
}
