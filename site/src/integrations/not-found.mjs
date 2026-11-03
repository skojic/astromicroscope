// Astro writes src/pages/en/404.astro to dist/en/404/index.html. Cloudflare looks for the nearest 404.html up the path,
// so move it to dist/en/404.html (the Serbian one is already dist/404.html).
import { rename, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/** @returns {import('astro').AstroIntegration} */
export default function notFound() {
  return {
    name: 'am-not-found',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await rename(fileURLToPath(new URL('en/404/index.html', dir)), fileURLToPath(new URL('en/404.html', dir)));
        await rm(fileURLToPath(new URL('en/404/', dir)), { recursive: true, force: true });
      },
    },
  };
}
