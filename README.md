# Vibecoding workshop

A 30-slide deck for a 90-minute hands-on workshop on vibe coding and
advanced prototyping in Gemini Canvas. Staff across all departments, no
coding experience assumed.

Live at
[peter-guillam123.github.io/vibecoding-workshop](https://peter-guillam123.github.io/vibecoding-workshop).

There's an [About page](https://peter-guillam123.github.io/vibecoding-workshop/about.html)
carrying the same story in longer form, plus a diary of what changed and why.

Built from the [Guardian deck
template](https://github.com/peter-guillam123/guardian-deck-template),
second edition. The house rules live in `CLAUDE.md`.

## The password

The deck sits behind the same light gate as board-and-trust-training.
`gate.js` holds a SHA-256 hash, not the password itself, and an unlock is
remembered for the browser tab.

It's a deterrent, not security: this is a static site, so the slide text
reaches the browser whether or not the gate is answered, and anyone
viewing source can read it. Fine for keeping a workshop deck off the open
web; not a control you'd rely on for anything sensitive.

## Presenting it

Arrow keys or space to advance, R to reset, G to show the grid, Cmd-P →
Save as PDF for a one-slide-per-page export. It is driven entirely by
hand: nothing advances itself and nothing is on a timer.

One slide is meant to sit still: slide 24, the activity brief, which
stays on screen while people work.

**Every prompt card copies on click**, and so do the suggestion cards on slides 7 and 8. That replaces the
"have the prompts open in a notes file" step in the lesson plan's
pre-flight: the deck itself is the clipboard.

## Changelog

### 28 July 2026 — The bug hunt generalised

The Newcastle trick depended on Canvas not thinking of it, and in the
session it increasingly did — apps now often arrive with a disambiguation
list already built in. Slide 17 no longer rests on one reliable failure:
it's four probes, each a thing to type and a thing that might go wrong.
Somewhere you know intimately (you'll catch a wrong population at home
and never abroad), Newcastle reframed, Deal (where Wikipedia supplied
the New Deal), and something that isn't a place at all. The instruction
above them is what generalises: think about what would trip you up, and
ask exactly that.

### 28 July 2026 — Where the facts come from

Ran the workshop, then added the slide it turned out to need. New slide
10 opens Part 2 by ruling out the shortcut nobody had thought to rule
out: letting the model supply the data itself. An app built on what it
already knows might be fine, but neither you nor it can tell which parts
are current. Two responses, each with a worked example — send it looking
for a source first (the gov.uk entry-requirements page rather than its
own recollection of visa rules), or hand it something you already have
and can vouch for. It ends on the part that matters: both still need
checking, because choosing your source makes it verifiable, not true.

It also does a job the deck was missing structurally. Part 2 previously
jumped straight from "your app lives in a bubble" to "here is an API",
skipping the obvious question in between.



### 27 July 2026 — Internal data ruled out

Built a slide offering the Google Sheet route for internal numbers, then
removed it. Recording the finding so it doesn't get re-researched: the
Sheets gviz and CSV endpoints are CORS-clean and served no-cache, so a
linked sheet genuinely is live on reload while pasted data is baked in.
But the endpoint refuses credentialed requests, so the sheet must be
readable by anyone with the link — the "only people who already have
access" safeguard can't be enforced by Google's permissions at all. Not
a workable trade for internal data, so it's off the table.

### 27 July 2026 — The prompts are clickable, and now the deck says so

Click-to-copy has been in since the first build with nothing to announce
it. New slide 4 demonstrates it: a real prompt card, a pointer that
drifts in and clicks, and the Copied badge coming up on a loop. The six
suggestion cards on slide 7 are now copyable too, since they looked
exactly like something you'd want to paste. The script strips display
quote marks so the clipboard gets the sentence, not the typography.

### 27 July 2026 — Choosing an API moves to Part 4

Part 3 was modelling the build and also teaching people how to choose an
API, which is a different job done at a different moment. The two matrix
slides and the discovery prompts now open Part 4: your turn, here are
twelve that work, here's how to find your own, here's the brief. Part 3
is three clean beats — build it, add a second source, hand it to the
model — and the awkward "beat 2½" is gone.

### 27 July 2026 — Explaining the API bit properly

Two Part 2 slides assumed knowledge the room doesn't have. The raw JSON
slide now states the question in English before showing the answer, and
sets a plain reading of the response beside it: quote marks mean text,
no quote marks means a number you can calculate with, two letters fetch a
flag, coordinates can be handed to a weather API. The safety briefing
drops its unhelpful title, opens by naming what "keyless" has meant all
along, and gives rule 01 the room it deserves — what a key is, why they
exist, and a never/instead couplet on not letting one end up in the code.
Rule 02 gains the line that you can ask Gemini to explain an API's limits
before you build. The standalone "doesn't Gemini need a key?" slide is
gone; its useful half is inside rule 01. Deck is 31 slides.

### 27 July 2026 — A vaguer prompt, on purpose

The hook prompt was a specification, so everyone would have built the
same app. It is now one sentence: "Create an app that calculates the cost
of a meeting." Thirty people, thirty different apps, thirty different
sets of assumptions to notice. Slide 5 gained a "what you'll see" row and
an instruction to actually use the thing and judge what it decided
without asking. Slide 6 took everything the old prompt specified and
turned it into a menu of six moves to say next, one at a time.

Also fixed on the way: the solo prompt slides were laid out with
`display: block`, so the gap between stacked prompt cards never applied
and the content sat top-aligned instead of centred.

### 27 July 2026 — Canvas is two clicks down, not one

The pre-flight slide sent people to the + button to find Canvas. It isn't
there: the path is +, then More tools, then Canvas, and a Canvas chip
appears next to the prompt box once it's on. Fixed on slide 2 and on the
Part 1 opener, which had inherited "click the Canvas icon" from the
lesson plan. The chip is the bit worth naming, because it's a
confirmation signal thirty people can check at a glance.

### 27 July 2026 — First build, and an API matrix that needed rescuing

Thirty-two slides following the lesson plan's six parts, with a
participant pre-flight added at the front and an appendix of every
prompt at the back.

The interesting part was the pre-flight the plan asks for. I click-tested
all twelve APIs in the matrix before writing a single slide, and two of
them were broken.

**REST Countries was dead.** It returned a deprecation notice rather than
data, and the v5 that replaces it answers `Authorization key required.`
That is a problem well beyond a broken link, because REST Countries was
the API the plan modelled live in Part 3, and it supplied both the
base-build prompt and the LLM-handoff prompt in the appendix. Its
replacement also breaks the workshop's own first safety rule, which is
never to paste a key into Canvas.

The fix is a pairing rather than a swap. Open-Meteo's geocoding endpoint
gives the structured half - country, population, timezone, coordinates,
and the two-letter code that fetches a flag from flagcdn - and Wikipedia's
summary endpoint gives the human half, a photograph and a paragraph of
prose. Both keyless, both CORS-clean. Modelling them one after the other
adds a beat the plan didn't have: watch me add a second source with one
sentence. It also sharpens the closing line, because you can now point at
each half on screen while saying that the API gives you the facts and the
model gives you judgement.

It came with a gift. Type "Newcastle" and it breaks every time:
Open-Meteo confidently returns Australia while Wikipedia hands back a
disambiguation page with no photo. That is a reliable, unfrightening bug
to run the panic-button prompt against, instead of waiting to be
ambushed by a random wobble, and it makes a properly journalistic point
about two sources quietly disagreeing. It has its own slide.

**Frankfurter would have failed in the browser.** `api.frankfurter.app`
301s to `api.frankfurter.dev/v1/`, and the redirect response carries no
`Access-Control-Allow-Origin`, so a browser blocks it before it ever
reaches the working endpoint. The matrix now carries the destination URL.

Two smaller gaps in the plan got closed on the way. The safety briefing
promised three points and listed two, so the missing third - a public
link is public - is restored as rule 03, and it now bookends properly
with the sharing slide in Part 6. And the plan never answered the
question someone always asks, which is why we say never paste a key and
then ask everyone to call Gemini from inside their app. That has its own
slide now, immediately after the rules, rather than a raised hand
halfway through Part 3.

The optional extra I added without being asked: a participant pre-flight
at slide 2. Three checks, two minutes, at 00:00. The plan's pre-flight
was facilitator-only, and the likeliest way to lose a workshop is
finding out at the halfway mark that four people can't open Canvas at
all.

New components in `styles.css`, appended at the bottom per the template
rules: the activity brief lifted from the Board and Trust deck's slide
25, a compact two-column options ledger, the three-column API ledger, a
JSON specimen panel, and the holding slide. One new file,
`prompt-copy.js`, for the click-to-copy prompts.

Checked at 1920×1080 across all 32 slides: no body overflow, no
horizontal overflow, no console errors. The appendix stacks and the
second matrix slide needed a tighter setting to fit, which is in the
stylesheet as a measured correction rather than a guess.
