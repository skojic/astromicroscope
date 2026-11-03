// Writes dist/_headers (specs/09 section 4). Previews and local builds send X-Robots-Tag: noindex.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/** @param {{ isProduction: boolean }} options */
export function buildHeaders({ isProduction }) {
  const csp = [
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-src https://www.youtube-nocookie.com", // video player, created only after a click (M11)
  ].join('; ');
  // Scripts and styles are limited by the hash-based CSP that Astro puts in each page (security.csp in astro.config.mjs).
  const all = [
    'Strict-Transport-Security: max-age=31536000',
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()',
    `Content-Security-Policy: ${csp}`,
  ];
  if (!isProduction) all.push('X-Robots-Tag: noindex');
  return `/*\n${all.map((h) => `  ${h}`).join('\n')}\n\n/_astro/*\n  Cache-Control: public, max-age=31536000, immutable\n`;
}

/** @param {{ isProduction: boolean }} options @returns {import('astro').AstroIntegration} */
export default function headers(options) {
  return {
    name: 'am-headers',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await writeFile(fileURLToPath(new URL('_headers', dir)), buildHeaders(options));
      },
    },
  };
}
