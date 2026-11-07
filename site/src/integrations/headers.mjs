// Writes dist/_headers (specs/09 section 4). Previews and local builds send X-Robots-Tag: noindex.
// The _headers file also carries the environment the build was made for (D56): x-astromicroscope-env, the same header
// the Worker sends on its API responses, so the deploy's smoke test checks that a production address really runs the
// production build.
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
    "connect-src 'self' https://static.cloudflareinsights.com", // Web Analytics beacon POST (M12-05)
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
  all.push(`X-Astromicroscope-Env: ${isProduction ? 'production' : 'preview'}`);
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
