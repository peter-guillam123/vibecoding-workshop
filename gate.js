/**
 * gate.js — a LIGHT password gate for the deck.
 *
 * IMPORTANT: this is a deterrent, not real security. The slides are a
 * static site, so their text is still delivered to the browser; anyone
 * who views source can read it regardless of this gate. It only stops
 * casual visitors. For real protection the deck would need to sit behind
 * proper auth (e.g. Cloudflare Access) on a custom domain.
 *
 * We store a SHA-256 hash of the password rather than the password
 * itself, so the plaintext isn't sitting in the public source. Unlock is
 * remembered for the tab session (sessionStorage), so it only prompts
 * once per visit.
 */
(() => {
  const gate = document.getElementById('deck-gate');
  if (!gate) return;
  const KEY = 'deck-gate-ok';
  const HASH = '1ff665efc43981edec578bb5b8448adc2853790a7ce4f69cf5edf71856a8be3f';

  const unlock = () => {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
    gate.remove();
  };

  // Already unlocked this session — don't prompt again.
  try { if (sessionStorage.getItem(KEY) === '1') { gate.remove(); return; } } catch (e) { /* ignore */ }

  const form = document.getElementById('deck-gate-form');
  const input = document.getElementById('deck-gate-input');
  const err = document.getElementById('deck-gate-error');

  const sha256 = async (str) => {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let ok = false;
    try { ok = (await sha256(input.value.trim())) === HASH; } catch (e) { /* crypto unavailable */ }
    if (ok) {
      unlock();
    } else {
      err.hidden = false;
      input.value = '';
      input.focus();
    }
  });

  input.focus();
})();
