// Pure text helpers for video pages (no Astro imports, so they can be unit tested).

const CONTACT = /^(instagram|sajt|mejl|mail|e-?mail|web|website|facebook|tiktok|youtube|telegram|kontakt)\s*:/i;
const SEPARATOR = /^[\s/\\|*_=~.\-\u2013\u2014]{2,}$/;
const HASHTAGS = /^(#[^\s#]+\s*)+$/;
const SIGNATURE = /^Gorica Vi[\u0107c]entijevi[\u0107c],?\s+(diplomirani\s+)?astrolog\.?$/i;

/**
 * YouTube descriptions carry channel boilerplate (contact lines, hashtags, a signature, "///" separators). It is not
 * the video's summary and must not become the meta description. Sentences that merely mention Instagram or an email are kept.
 */
export function stripBoilerplate(text: string): string {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !(CONTACT.test(line) || SEPARATOR.test(line) || HASHTAGS.test(line) || SIGNATURE.test(line)))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** YouTube descriptions come with trailing spaces and long runs of blank lines; clean them once. */
export const cleanText = (text: string) => stripBoilerplate(text.split('\n').map((line) => line.trim()).join('\n').replace(/\n{3,}/g, '\n\n').trim());

/** First paragraph of the (cleaned) description, cut to fit a meta description. */
export function shortDescription(text: string, max = 155): string {
  const first = (text.split(/\n\s*\n/)[0] ?? '').replace(/\s+/g, ' ').trim();
  if (first.length <= max) return first;
  return first.slice(0, max - 1).replace(/\s+\S*$/, '') + '\u2026';
}

/** Title for <title> and social cards: at most `max` characters, cut at a word boundary (the page's H1 keeps the full title). */
export function shortTitle(title: string, max = 60): string {
  if (title.length <= max) return title;
  return title.slice(0, max - 1).replace(/\s+\S*$/, '').replace(/[\s,;:\u2013-]+$/, '') + '\u2026';
}
