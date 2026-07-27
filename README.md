# Guardian deck template

Skeleton for HTML slide decks in the Guardian editorial style — second
edition. Spin a new repo from this template, replace the placeholder words
in `index.html`, drop images in `images/`, push to `main`, and GitHub Pages
serves the result. The reference implementation (and the deck this system
was built for) is
[board-and-trust-training](https://github.com/peter-guillam123/board-and-trust-training);
its first edition is archived there at
[/first-edition/](https://peter-guillam123.github.io/board-and-trust-training/first-edition/)
if you want to see how far the second edition moved things on.

## Starting a new deck

In Claude Code, in an empty folder, say:

> "Set up a new deck from my template, call it `xyz`."

Claude will clone the template into the folder via `gh repo create
--template`, push the first commit, and hand back the live URL once Pages
has built. Then describe the slides — the words you want, in your words —
and let Claude fit them to the patterns. The rules Claude follows live in
`CLAUDE.md` in this repo, so you don't have to repeat them.

## What's in here

- `index.html` — twenty reference slides, one per pattern: cover, agenda,
  section opener (ghost numeral + drawn underline), plate-card trio, split
  image/text, step cards, staged line chart with count-ups, stat pair +
  ledger, rulebook ledger, image + open text blocks, conversation rail,
  picture triptych, diptych, curve timeline, ink pull quote, self-typing
  prompt, case ledger, exchanges, chat stream, numbered ways. Replace the
  placeholder copy; delete what you don't need.
- `styles.css` — the full design system: the real Guardian font cuts
  (including the drawn italics and Black, from `assets.guim.co.uk`),
  design tokens, paper-fibre grain and press vignette, slide chrome,
  every component, and the motion keyframes (including a CSS `linear()`
  spring).
- `motion.js` — the choreography engine: folio numbering, the progress
  seam, masked word reveals, `data-fx` replays on every slide visit,
  count-up figures, live-typing prompts and the staged chart draw. Three
  safety nets: no JavaScript hides nothing, `prefers-reduced-motion` gets
  a static deck, print forces final states.
- `deck-stage.js` — the `<deck-stage>` web component. Keyboard navigation
  (←/→, PageUp/PageDown, Space, Home/End, R, number keys), auto-scaling,
  tap zones on mobile, and print rules that lay one slide per page at
  1920×1080 for Cmd-P → Save as PDF.
- `grid-overlay.js` — a Müller-Brockmann grid instrument. Press **G** while
  previewing to draw the 12-column + baseline grid the deck is built against.
  Off by default; it reads the `--grid-*` tokens in `styles.css` and changes
  nothing — it just lets you check alignment.
- `CLAUDE.md` — the build rules and the motion grammar, written for the
  Claude session doing the work.
- `.github/workflows/pages.yml` — deploys to Pages on every push to
  `main`, with concurrency control.

## Working in the deck

Open `index.html` in a browser to preview. Arrow keys / space to navigate,
R to reset, Cmd-P → Save as PDF for a one-slide-per-page export. Slide
numbers auto-fill — write `01 / NN` and motion.js does the rest.
Animations replay on every slide arrival, backwards included.

## Notes

- **Fonts** load from `assets.guim.co.uk`, so the deck only renders
  correctly online. The CSS falls back to Georgia / Helvetica if the CDN
  is unreachable, but the visual is noticeably different. Presenting
  somewhere with patchy wifi? Self-hosting the `.woff2` files is a
  10-minute job.
- **One italic word per title** — red on paper, yellow on ink — is the
  deck's punctuation. Keep it to one.
- **Images dissolve** (`data-fx="photo"`); the kit deliberately has no
  directional wipes.

## Changelog

### 11 June 2026 — Müller-Brockmann grid baked in

`styles.css` now carries a `--grid-*` source of truth (12 columns, 120px
margins, 12px baseline, 24px gutter) that the chrome, the card gutters and a
new toggle-able overlay (`grid-overlay.js`, press **G**) all read — so any deck
built from this kit starts grid-true and verifiable. The three-up patterns sit
on an exact 4 + 4 + 4 column rhythm. `CLAUDE.md` gains a grid section, including
the one rule we *don't* take from the source skill: its white-paper / sans-serif
house style, which would undo the Guardian look this kit exists to produce.

### 11 June 2026 — Second edition

The template catches up with everything the Board and Trust rework
taught us. In: the real Guardian italic and Black cuts, masked word-by-
word title reveals, paper grain and press vignette, plate cards, ghost
numerals on section openers, the photographic image dissolve, count-up
figures, self-typing prompts, the staged chart draw, a progress seam,
and `motion.js` to run it all — with no-JS, reduced-motion and print
fallbacks. The six first-edition skeleton slides became twenty, one per
pattern, with instructive placeholder copy that explains each shape as
you replace it. New `CLAUDE.md` carries the build rules so future
sessions start already knowing the house style.

### Earlier — Initial template

Framework, six skeleton slides and a README, extracted from the first
generation of decks.
