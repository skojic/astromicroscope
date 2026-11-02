/* Two-language switch for the design previews: Serbian (default) and English.
   The pages are written in English. window.SR (i18n/sr.js) maps each English text block,
   attribute value or <title> to its Serbian version.
   - A "text block" is the outermost element that has its own text; its key is its innerHTML
     with whitespace collapsed. Elements inside [data-i18n-skip] are left to page scripts.
   - Choice is kept in localStorage and can be forced with ?lang=en or ?lang=sr.
   - Pages that render text from script listen for the "langchange" event (detail = "sr" | "en").
   - ?extract=1 lists every untranslated key, for maintaining sr.js. */
(() => {
  const SR = window.SR || {};
  const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const hasWords = s => /[A-Za-z]{2,}/.test(s);
  const ownText = el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
  const blocks = [], attrs = [];
  const style = document.createElement('style');
  style.textContent = '.langs{display:inline-flex;gap:2px;align-items:center}.langs button{all:unset;cursor:pointer;padding:6px 7px;border-radius:6px;opacity:.55;font:inherit;font-weight:600}.langs button:hover{opacity:.85}.langs button[aria-pressed=true]{opacity:1;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:5px}.langs button:focus-visible{outline:2px solid currentColor;outline-offset:2px}.review .langs{margin-left:6px;padding-left:6px;border-left:1px solid rgba(0,0,0,.15)}';
  document.head.appendChild(style);
  let titleEn = document.title;

  function scan() {
    const walk = el => {
      for (const a of ATTRS) {
        const v = el.getAttribute && el.getAttribute(a);
        if (v && hasWords(v)) attrs.push({ el, a, en: v });
      }
      if (el.hasAttribute && el.hasAttribute('data-i18n-skip')) return;
      if (/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(el.tagName)) return;
      if (el !== document.body && ownText(el)) {
        const en = norm(el.innerHTML);
        if (hasWords(el.textContent)) blocks.push({ el, en });
        return;
      }
      for (const c of el.children) walk(c);
    };
    walk(document.body);
  }

  function apply(lang) {
    document.documentElement.lang = lang === 'sr' ? 'sr-Latn' : 'en';
    document.title = lang === 'sr' && SR[titleEn] ? SR[titleEn] : titleEn;
    for (const b of blocks) b.el.innerHTML = lang === 'sr' && SR[b.en] ? SR[b.en] : b.en;
    for (const t of attrs) t.el.setAttribute(t.a, lang === 'sr' && SR[t.en] ? SR[t.en] : t.en);
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    try { localStorage.setItem('astro-lang', lang); } catch (e) {}
    window.LANG = lang;
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  function start() {
    scan();
    const q = new URLSearchParams(location.search);
    if (q.has('extract')) {
      const keys = [...new Set([titleEn, ...blocks.map(b => b.en), ...attrs.map(a => a.en)])].filter(k => !(k in SR));
      const pre = document.createElement('pre');
      pre.id = 'i18n-extract';
      pre.textContent = JSON.stringify(keys);
      document.body.appendChild(pre);
      return;
    }
    let lang = q.get('lang');
    if (lang !== 'en' && lang !== 'sr') { try { lang = localStorage.getItem('astro-lang'); } catch (e) {} }
    if (lang !== 'en' && lang !== 'sr') lang = 'sr';
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-lang]');
      if (b) { e.preventDefault(); apply(b.dataset.lang); }
    });
    apply(lang);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
