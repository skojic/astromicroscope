// @ts-check
import { defineConfig } from 'astro/config';
import headers from './src/integrations/headers.mjs';

// SITE_ENV=production only on the production deploy; everything else (dev, CI, previews) is non-production.
const isProduction = process.env.SITE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://astromicroscope.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'sr',
    locales: ['sr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // Hashes for inline scripts and styles go into a <meta> CSP; frame-ancestors, object-src and the rest are sent as headers (src/integrations/headers.mjs).
  security: { csp: true },
  markdown: { syntaxHighlight: false }, // no code samples on the site; Shiki's inline styles do not work with CSP
  integrations: [headers({ isProduction })],
});
