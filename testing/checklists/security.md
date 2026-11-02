# Security checklist

From `specs/09-security.md`. Run before launch (M13) and then once a month.

- [ ] 2FA confirmed on every account in `specs/09` §2 (GitHub ×2, Cloudflare, registrar, email, Instagram, YouTube)
- [ ] Domain: renewed, auto-renew on, registrar lock on, DNSSEC on
- [ ] No secret in the repository (secret scanning shows no open alerts)
- [ ] Dependabot: no open high or critical alerts
- [ ] Security headers present on the live site (`curl -I`): CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy
- [ ] No third-party script without a decision entry
- [ ] Forms: server-side validation, rate limit, anti-spam challenge tested
- [ ] Preview deployments send `X-Robots-Tag: noindex`
- [ ] Search Console: no security issues, no manual actions; spam URLs return 410
- [ ] Access review: only current people have GitHub, Cloudflare and registrar access
