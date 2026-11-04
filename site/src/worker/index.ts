// M12-01 (D44): the Cloudflare Worker script that answers /api/* and leaves every other path to the static
// assets. Astro builds the site into dist/; wrangler sets `main` to this file and `assets.run_worker_first` to
// ["/api/*"], so a form POST to /api/newsletter runs here, and every page keeps serving from the static assets.
//
// This is the backend shell: endpoints validate their input, store nothing, and answer JSON. The providers
// (MailerLite M12-02, Email Service M12-03) plug into the marked spots; no secret is stored here — they are
// Worker secrets in the Cloudflare dashboard, read through env bindings (specs/09 §2).

export default {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method-not-allowed' }, 405);
    }

    if (path === '/api/newsletter') {
      return handleNewsletter(request, env);
    }

    return json({ ok: false, error: 'not-found' }, 404);
  },
};

/** @param {{ ok: boolean, [k: string]: unknown }} body */
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

/**
 * Newsletter and course-waitlist sign-up (M12-02). The form posts JSON { email, lang, list, hp, ts, sig }.
 * Validation and spam defence are here; the reply is always generic so the endpoint does not leak which field failed.
 */
async function handleNewsletter(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  const { email, lang, list, hp, ts, sig } = body ?? {};

  // 1. Honeypot: a hidden field a real visitor never fills. A bot that does is dropped immediately.
  if (typeof hp === 'string' && hp.trim() !== '') {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  // 2. Signed timestamp: the form carries the time it was filled (set in a tiny client script) plus an HMAC
  //    signature the server makes over `email:ts`. Too-young or too-old submissions are rejected.
  if (!isFreshTimestamp(ts)) {
    return json({ ok: false, error: 'invalid' }, 400);
  }
  if (!verifySignature(email, ts, sig, env)) {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  // 3. Email shape.
  if (typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  // 4. Language and list: `waitlist` (2027 courses) or `newsletter` (D21, D44).
  if ((lang !== 'sr' && lang !== 'en') || (list !== 'newsletter' && list !== 'waitlist')) {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  // 5. Per-IP rate limit. The IP is in request.headers.get('cf-connecting-ip') on Cloudflare; a per-key cap is
  //    kept here against a lock-free counter. M12-04 replaces this stub with a bounded store (e.g. Workers KV,
  //    or a fixed-window count against a Durable Object if volume demands it).
  if (!(await underRateLimit(request, env))) {
    return json({ ok: false, error: 'rate-limited' }, 429);
  }

  // M12-02 TO DO: POST to MailerLite here — `connect.mailerlite.com/api/subscribers` with `env.MAILERLITE_API_KEY`,
  // `status` per the proven double opt-in (D44), group id for `waitlist` vs `newsletter`. Until then the endpoint
  // acknowledges but stores nothing, and the reply does not reveal whether it would have sent.
  return json({ ok: true });
}

/** Submission must be at least 3 s old (a human fills a form) and at most 1 h old (no replay). */
function isFreshTimestamp(ts) {
  if (typeof ts !== 'number' || !Number.isFinite(ts)) return false;
  const age = Date.now() - ts;
  return age >= 3_000 && age <= 60 * 60 * 1_000;
}

/**
 * HMAC-style signature over `${email}|${ts}` with the Worker secret `FORM_SIGNING_SECRET`. The same secret on the
 * server signs a token the client sends with the form; anything that cannot reproduce it did not come through the
 * page. Uses WebCrypto HMAC-SHA-256. M12-04 wires the client half; until then every unsigned submission is rejected.
 */
async function verifySignature(email, ts, sig, env) {
  if (typeof sig !== 'string' || typeof email !== 'string' || typeof ts !== 'number') return false;
  const secret = env.FORM_SIGNING_SECRET;
  if (typeof secret !== 'string' || secret === '') return false;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const data = new TextEncoder().encode(`${email}|${ts}`);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, data));
  const hex = [...mac].map((b) => b.toString(16).padStart(2, '0')).join('');
  return timingSafeEqual(hex, sig);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

/** Fixed-window per-IP cap; a simple Map is fine for a low-traffic personal site (M12-04 may promote to KV). */
async function underRateLimit(request, env) {
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const now = Date.now();
  const windowMs = 60_000;
  const maxPerWindow = 5;
  const key = `${ip}`;

  // A worker boot may handle several requests, but globalThis is per-isolate and short-lived; a Map keyed by IP
  // with a timestamp is enough for the current stage. Replace with a real store before launch (M12-04).
  const store = env.RATE_STORE ?? globalThis.__am_rate ?? (globalThis.__am_rate = new Map());
  const entry = store.get(key);
  if (entry && now - entry.start < windowMs) {
    entry.count += 1;
    return entry.count <= maxPerWindow;
  }
  store.set(key, { start: now, count: 1 });
  return true;
}