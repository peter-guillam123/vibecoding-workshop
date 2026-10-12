/* deck-nav.js - a map for the deck.
 *
 * Three things, all read from the slides themselves:
 *   (a) a rail of the deck's parts in every footer. Any section
 *       carrying data-part starts a part; data-part-short is the
 *       label the rail shows. Click a part to jump to it.
 *   (b) a map of every slide, grouped by part, on M or the Map
 *       button. Esc or M closes it. Arrow keys move through it.
 *   (c) jumps and links: anything with data-goto="12" or
 *       data-goto="a-slide-label" jumps there on click, and the
 *       address bar carries #12 so a link can open the deck at a
 *       given slide.
 *
 * Load after deck-stage.js and motion.js. Nothing here is load-
 * bearing: without it the deck is the same deck with a plainer
 * footer and no map.
 */
(() => {
  'use strict';

  const stage = document.querySelector('deck-stage');
  if (!stage) return;
  const slides = Array.from(document.querySelectorAll('deck-stage > section'));
  if (!slides.length) return;

  const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const pad2 = (n) => String(n).padStart(2, '0');

  /* The map shows each slide's own title, not its working label. */
  const titleOf = (s) => {
    const el = s.querySelector('.slide-title, .section-opener h1, .wordmark, .epigraph, .research-quote, .brief-lede');
    const raw = el ? el.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '') : (s.dataset.label || '');
    const t = raw.replace(/\s+/g, ' ').trim();
    return t || s.dataset.label || '';
  };

  /* ── Parts ───────────────────────────────────────────────────── */
  const parts = [];
  slides.forEach((s, i) => {
    if (s.hasAttribute('data-part')) {
      parts.push({ label: s.dataset.part, short: s.dataset.partShort || s.dataset.part, start: i, slides: [] });
    }
    if (!parts.length) parts.push({ label: 'Start', short: 'Start', start: 0, slides: [] });
    parts[parts.length - 1].slides.push(i);
  });
  const partOf = (i) => parts.findIndex((p) => p.slides.includes(i));

  /* ── Jumps ───────────────────────────────────────────────────── */
  const resolve = (ref) => {
    const r = String(ref || '').trim();
    if (!r) return -1;
    if (/^\d+$/.test(r)) return Math.min(slides.length, Math.max(1, parseInt(r, 10))) - 1;
    const want = slug(r);
    return slides.findIndex((s) => slug(s.dataset.label) === want);
  };
  const go = (ref) => {
    const i = resolve(ref);
    if (i >= 0) stage.goTo(i);
    return i >= 0;
  };

  /* ── The rail, one per footer ────────────────────────────────── */
  slides.forEach((s, i) => {
    const foot = s.querySelector('.slide-foot');
    if (!foot) return;
    const here = partOf(i);
    const nav = document.createElement('nav');
    nav.className = 'deck-rail';
    nav.setAttribute('aria-label', 'Parts of the deck');
    parts.forEach((p, k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'rail-part' + (k < here ? ' is-done' : '');
      b.textContent = p.short;
      b.dataset.goto = String(p.start + 1);
      if (k === here) b.setAttribute('aria-current', 'true');
      nav.appendChild(b);
    });
    const m = document.createElement('button');
    m.type = 'button';
    m.className = 'rail-map';
    m.setAttribute('aria-haspopup', 'dialog');
    m.dataset.map = '';
    m.innerHTML = 'Map<kbd aria-hidden="true">M</kbd>';
    nav.appendChild(m);
    foot.insertBefore(nav, foot.querySelector('.num'));
  });

  /* ── The map ─────────────────────────────────────────────────── */
  const map = document.createElement('div');
  map.id = 'deck-map';
  map.hidden = true;
  map.innerHTML =
    '<div class="map-scrim" data-map-close></div>' +
    '<div class="map-panel" role="dialog" aria-modal="true" aria-labelledby="deck-map-title" tabindex="-1">' +
      '<div class="map-head">' +
        '<div><p class="map-kicker">Map</p><h2 id="deck-map-title">Every slide in the deck</h2></div>' +
        '<button type="button" class="map-close" data-map-close aria-label="Close the map">&times;</button>' +
      '</div>' +
      '<div class="map-parts"></div>' +
      '<p class="map-hint">Arrow keys move through the deck, R goes back to the start, and M opens and closes this map.</p>' +
    '</div>';
  document.body.appendChild(map);

  const partsEl = map.querySelector('.map-parts');
  parts.forEach((p) => {
    const col = document.createElement('section');
    col.className = 'map-part';
    const h = document.createElement('h3');
    h.textContent = p.label;
    col.appendChild(h);
    const ol = document.createElement('ol');
    p.slides.forEach((i) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'map-slide';
      b.dataset.goto = String(i + 1);
      const n = document.createElement('span');
      n.className = 'map-n';
      n.textContent = pad2(i + 1);
      const t = document.createElement('span');
      t.className = 'map-t';
      t.textContent = titleOf(slides[i]);
      b.appendChild(n);
      b.appendChild(t);
      li.appendChild(b);
      ol.appendChild(li);
    });
    col.appendChild(ol);
    partsEl.appendChild(col);
  });

  const panel = map.querySelector('.map-panel');
  let opener = null;
  const syncCurrent = () => {
    const i = stage.index;
    map.querySelectorAll('.map-slide').forEach((b) => {
      if (parseInt(b.dataset.goto, 10) - 1 === i) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  };
  const openMap = (from) => {
    if (!map.hidden) return;
    opener = from || document.activeElement;
    syncCurrent();
    map.hidden = false;
    document.body.classList.add('map-open');
    const current = map.querySelector('.map-slide[aria-current]') || map.querySelector('.map-slide');
    (current || panel).focus();
  };
  const closeMap = () => {
    if (map.hidden) return;
    map.hidden = true;
    document.body.classList.remove('map-open');
    if (opener && typeof opener.focus === 'function' && document.contains(opener)) opener.focus();
    opener = null;
  };

  /* ── Clicks ──────────────────────────────────────────────────── */
  document.addEventListener('click', (e) => {
    const close = e.target.closest('[data-map-close]');
    if (close) { e.preventDefault(); closeMap(); return; }
    const m = e.target.closest('[data-map]');
    if (m) { e.preventDefault(); e.stopPropagation(); openMap(m); return; }
    const t = e.target.closest('[data-goto]');
    if (!t) return;
    e.preventDefault();
    e.stopPropagation();
    if (go(t.dataset.goto)) closeMap();
  });

  /* ── Keys ────────────────────────────────────────────────────── */
  const typing = (t) => t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (!map.hidden) {
      /* The stage listens on window; stop it moving behind the map. */
      e.stopPropagation();
      if (e.key === 'Escape' || e.key === 'm' || e.key === 'M') { e.preventDefault(); closeMap(); return; }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = Array.from(map.querySelectorAll('.map-slide'));
        const at = items.indexOf(document.activeElement);
        const next = e.key === 'ArrowDown' ? Math.min(items.length - 1, at + 1) : Math.max(0, at - 1);
        if (items[next]) items[next].focus();
      }
      return;
    }
    if (typing(e.target)) return;
    if (e.key === 'm' || e.key === 'M') { e.preventDefault(); openMap(null); }
  }, true);

  /* ── Address bar ─────────────────────────────────────────────── */
  const applyHash = () => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h) return false;
    const i = resolve(h);
    if (i >= 0 && i !== stage.index) stage.goTo(i);
    return i >= 0;
  };
  stage.addEventListener('slidechange', (e) => {
    try { history.replaceState(null, '', '#' + (e.detail.index + 1)); } catch (_) { /* ignore */ }
    syncCurrent();
  });
  window.addEventListener('hashchange', applyHash);
  if (!applyHash()) {
    try { history.replaceState(null, '', '#' + (stage.index + 1)); } catch (_) { /* ignore */ }
  }
})();
