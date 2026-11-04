// @ts-check
import { defineConfig } from 'astro/config';
import headers from './src/integrations/headers.mjs';
import notFound from './src/integrations/not-found.mjs';
import seoFiles from './src/integrations/seo-files.mjs';

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
  // Web Analytics (M12-05) loads an external script from static.cloudflareinsights.com, so that host is allowlisted in
  // script-src here (together with 'self'; Astro's default resources are overridden, not extended, so 'self' is explicit).
  security: {
    csp: {
      scriptDirective: { resources: ["'self'", 'https://static.cloudflareinsights.com'] },
    },
  },
  markdown: { syntaxHighlight: false }, // no code samples on the site; Shiki's inline styles do not work with CSP
  integrations: [headers({ isProduction }), notFound(), seoFiles({ isProduction, site: 'https://astromicroscope.com' })],
});
