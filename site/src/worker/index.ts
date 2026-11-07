// M12-01/M12-04/M12-02 (D44): the Cloudflare Worker script that answers /api/* and leaves every other path to the
// static assets. Astro builds the site into dist/; wrangler sets `main` to this file and `assets.run_worker_first` to
// ["/api/*"], so a form POST to /api/newsletter runs here, and every page keeps serving from the static assets.
//
// Endpoints:
//   GET  /api/form-token  -> { ts, sig } : a short-lived, HMAC-signed challenge the page picks up (M12-04).
//   POST /api/newsletter   -> the newsletter / waitlist form (M12-02): creates the subscriber as `unconfirmed`
//                            and mints a confirmation token for the double-opt-in mail.
//   GET  /api/confirm      -> the link in the double-opt-in mail: flips the subscriber to `active`.
//
// The providers (MailerLite M12-02, Email Service M12-03) plug into the marked spots; no secret is stored here — they
// are Worker secrets in the Cloudflare dashboard, read through env bindings (specs/09 §2).

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

    if (request.method === 'GET' && path === '/api/confirm') {
      return handleConfirm(url, env);
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

  // 5. Per-IP rate limit (stub Map; promote to KV before launch, M12-04).
  if (request.headers.get('cf-connecting-ip') && !(await underRateLimit(request, env))) {
    return json({ ok: false, error: 'rate-limited' }, 429);
  }

  // 6. M12-02: create the subscriber as `unconfirmed` in MailerLite and mint a confirmation token.
  const subscriber = await mailerLiteSubscribe(email, list, env);
  if (!subscriber) {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  // 7. M12-02 double opt-in: persist the confirm token and (M12-03) email the confirmation link.
  await storeConfirmation(subscriber.id, email, lang, list, env);

  return json({ ok: true });
}

/**
 * M12-02: add the subscriber to MailerLite and return its id, or `null` on failure. The old behaviour (return a
 * boolean) is superseded because double opt-in needs the subscriber id to flip it to `active` later.
 */
async function mailerLiteSubscribe(email, list, env) {
  const apiKey = env.MAILERLITE_API_KEY;
  const groupId = list === 'waitlist' ? env.MAILERLITE_GROUP_WAITLIST : env.MAILERLITE_GROUP_NEWSLETTER;
  if (typeof apiKey !== 'string' || apiKey === '' || typeof groupId !== 'string' || groupId === '') {
    return null; // not configured (or non-production): nothing to send
  }

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      groups: [groupId],
      status: 'unconfirmed',
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data?.data?.id ?? null;
}

/** The double-opt-in confirmation link (M12-02, sends in M12-03). */
async function handleConfirm(url, env) {
  const token = url.searchParams.get('token');
  if (typeof token !== 'string' || token === '') {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  // The token is `subscriberId.expiry.sig`; verify sig and expiry before trusting the id.
  const parts = token.split('.');
  if (parts.length !== 3) return json({ ok: false, error: 'invalid' }, 400);
  const [id, expiryStr, sig] = parts;
  const secret = env.FORM_SIGNING_SECRET;
  if (typeof secret !== 'string' || secret === '') {
    return json({ ok: false, error: 'unconfigured' }, 500);
  }
  const expected = await sign(`${CONFIRM_SALT}|${id}.${expiryStr}`, secret);
  if (!timingSafeEqual(expected, sig)) return json({ ok: false, error: 'invalid' }, 400);
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return json({ ok: false, error: 'expired' }, 400);

  // The subscriber id must match what we stored at subscribe time (defends against forged ids).
  const stored = await env.CONFIRM_STORE?.get(`confirm:${token}`);
  if (stored !== id) return json({ ok: false, error: 'invalid' }, 400);

  const apiKey = env.MAILERLITE_API_KEY;
  if (typeof apiKey !== 'string' || apiKey === '') {
    return json({ ok: false, error: 'unconfigured' }, 500);
  }
  const res = await fetch(`https://connect.mailerlite.com/api/subscribers/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ status: 'active', opted_in_at: new Date().toISOString().slice(0, 19).replace('T', ' ') }),
  });

  if (!res.ok) return json({ ok: false, error: 'invalid' }, 400);
  await env.CONFIRM_STORE?.delete(`confirm:${token}`);
  return json({ ok: true });
}

const CONFIRM_SALT = 'astromicroscope-confirm-v1';

/**
 * M12-02/M12-03: the double-opt-in confirmation is sent BY MAILERLITE, not by us.
 *
 * MailerLite sends the confirmation email itself when a subscriber is created with `status: "unconfirmed"` on a group
 * that has double opt-in enabled (MailerLite dashboard -> the group -> double opt-in). That is why the subscriber is
 * posted as `unconfirmed` in `mailerLiteSubscribe`, and why there is no send here.
 *
 * The Cloudflare `send_email` binding cannot do this: it only delivers to addresses verified in Email Routing (it
 * answers "destination address is not a verified address" for any other recipient), so it suits a contact form that
 * mails the site owner, never a newsletter to arbitrary subscribers. Tried and removed 2026-11-07.
 *
 * `/api/confirm` below stays as the fallback link handler for the case MailerLite's confirmation page is not used.
 */
async function storeConfirmation(subscriberId, email, lang, list, env) {
  const store = env.CONFIRM_STORE;
  if (!store) return; // no KV binding (non-production): nothing to persist

  const id = String(subscriberId);
  const expiry = Date.now() + CONFIRM_TTL_MS;
  const secret = env.FORM_SIGNING_SECRET;
  if (typeof secret !== 'string' || secret === '') return;
  const sig = await sign(`${CONFIRM_SALT}|${id}.${expiry}`, secret);
  const token = `${id}.${expiry}.${sig}`;
  await store.put(`confirm:${token}`, id, { expirationTtl: Math.floor(CONFIRM_TTL_MS / 1000) });
}

const CONFIRM_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days to click the confirmation link

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

/** Fixed-window per-IP cap (M12-04) using the KV `RATE_STORE` namespace. Each IP has a rolling count over a short window
 * (KV has millisecond granularity in limits, so we use a per-IP key storing `{ start, count }`, incremented on each hit and
 * reset when the window passes). The key auto-expires shortly after the window so stale entries are reclaimed. */
async function underRateLimit(request, env) {
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const now = Date.now();
  const windowMs = 60_000;
  const maxPerWindow = 5;
  const key = `rate:${ip}`;

  const store = env.RATE_STORE;
  if (!store) return true; // no binding (non-production): rate-limit disabled

  let entry;
  try {
    const raw = await store.get(key, 'json');
    if (raw && now - raw.start < windowMs) entry = raw;
  } catch {
    return true; // KV read failure must not block the form
  }

  const next = entry ? { start: entry.start, count: entry.count + 1 } : { start: now, count: 1 };
  try {
    await store.put(key, JSON.stringify(next), { expirationTtl: Math.ceil(windowMs / 1000) + 5 });
  } catch {
    // best effort: if we cannot persist, let the request through (consistent with "must not block")
  }
  return next.count <= maxPerWindow;
}