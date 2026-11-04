// M12-01/M12-04 (D44): the Cloudflare Worker script that answers /api/* and leaves every other path to the static
// assets. Astro builds the site into dist/; wrangler sets `main` to this file and `assets.run_worker_first` to
// ["/api/*"], so a form POST to /api/newsletter runs here, and every page keeps serving from the static assets.
//
// Endpoints:
//   GET  /api/form-token  -> { ts, sig } : a short-lived, HMAC-signed challenge the page picks up (M12-04). The
//                            signature is over `FORM_SALT|ts`, so it authenticates the page session without binding
//                            the user's email and without shipping the secret to the browser.
//   POST /api/newsletter   -> the newsletter / waitlist form (M12-02).
//
// This is the backend shell: endpoints validate their input, store nothing, and answer JSON. The providers
// (MailerLite M12-02, Email Service M12-03) plug into the marked spots; no secret is stored here — they are
// Worker secrets in the Cloudflare dashboard, read through env bindings (specs/09 §2).

export default {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (request.method === 'GET' && path === '/api/form-token') {
      return issueFormToken(env);
    }

    if (request.method === 'POST' && path === '/api/newsletter') {
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

/** Mint a fresh challenge (M12-04): the current time and the HMAC of `FORM_SALT|ts`. Valid for one hour (see verify). */
async function issueFormToken(env) {
  const secret = env.FORM_SIGNING_SECRET;
  if (typeof secret !== 'string' || secret === '') {
    return json({ ok: false, error: 'unconfigured' }, 500);
  }
  const ts = Date.now();
  const sig = await sign(`${FORM_SALT}|${ts}`, secret);
  return json({ ok: true, ts, sig });
}

/**
 * Newsletter and course-waitlist sign-up (M12-02). The form posts JSON { email, lang, list, hp, ts, sig }, where
 * ts+sig are the challenge from /api/form-token. Validation and spam defence are here; the reply is always generic
 * so the endpoint does not leak which field failed.
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

  // 2. Challenge: the page fetched /api/form-token and attached ts+sig. Verify it with the server secret.
  if (!(await verifyChallenge(ts, sig, env))) {
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
  if (request.headers.get('cf-connecting-ip') && !(await underRateLimit(request, env))) {
    return json({ ok: false, error: 'rate-limited' }, 429);
  }

  // M12-02 TO DO: POST to MailerLite here — `connect.mailerlite.com/api/subscribers` with `env.MAILERLITE_API_KEY`,
  // `status` per the proven double opt-in (D44), group id for `waitlist` vs `newsletter`. Until then the endpoint
  // acknowledges but stores nothing, and the reply does not reveal whether it would have sent.
  return json({ ok: true });
}

/** A challenge is valid if its timestamp is fresh (max 1 h old) and the signature matches `FORM_SALT|ts`. */
async function verifyChallenge(ts, sig, env) {
  if (typeof sig !== 'string' || !isFreshTimestamp(ts)) return false;
  const secret = env.FORM_SIGNING_SECRET;
  if (typeof secret !== 'string' || secret === '') return false;
  const expected = await sign(`${FORM_SALT}|${ts}`, secret);
  return timingSafeEqual(expected, sig);
}

const FORM_SALT = 'astromicroscope-form-v1';

/** Submission must be at least 3 s old (a human fills a form) and at most 1 h old (no replay). */
function isFreshTimestamp(ts) {
  if (typeof ts !== 'number' || !Number.isFinite(ts)) return false;
  const age = Date.now() - ts;
  return age >= 3_000 && age <= 60 * 60 * 1_000;
}

/** HMAC-SHA-256 of `data` under `secret`, hex-encoded, via WebCrypto. */
async function sign(data, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data)));
  return [...mac].map((b) => b.toString(16).padStart(2, '0')).join('');
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