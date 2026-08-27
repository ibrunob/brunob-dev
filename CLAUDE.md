# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Bruno Ortiz, served from the apex custom domain `brunob.dev` (`public/CNAME`) via GitHub Pages. React 19 + TypeScript + Vite + Tailwind CSS v4, three routes (`/`, `/work`, `/about`). No test suite.

## Commands

```bash
npm run dev        # Vite dev server on :5173
npm run build      # tsc -b && vite build && node scripts/copy-404.mjs
npm run preview    # serve dist/
npm run typecheck
npm run lint       # eslint (flat config, typescript-eslint)
```

## Architecture

- **Content is data, not markup.** Everything the site says lives in `src/content/site.ts` (intro, `meta`, `projects`, `stack`, `timeline`, `social`, `nav`). Components read from it; never hardcode copy into a component. Entries still marked `TODO:` are placeholders awaiting real content.
- **Routing** is `react-router` v7 declarative mode. `App.tsx` mounts a single `Layout` route with `Home` / `Work` / `About` / `NotFound` children. `Layout.tsx` owns the skip link, `Nav`, scroll-reset on navigation, and the keyed `motion.main` that fades each page in.
- **Theme** is a `dark` class on `<html>`. The inline script in `index.html` applies it before first paint (do not remove — it prevents a flash); `src/hooks/useTheme.ts` then keeps class, `localStorage` and state in sync, and follows the OS only until the visitor picks a theme explicitly.
- **Tokens** are defined once in `src/styles/globals.css`: an `@theme` block for light, a plain `.dark` block overriding the same custom properties (unlayered, so it beats Tailwind's `@layer theme`). Add new colors as `--color-*` in **both** blocks — utilities like `bg-surface` / `text-muted` / `border-border` come from those names.
- **`Nav.tsx`** mirrors surya.website's top bar and is the visual signature: `mx-6 mt-3 h-12`, in the document flow (it scrolls away, it does not stick). Wordmark left, links absolutely centred on the viewport with the active one in `text-accent` plus a 1px accent bottom border, and a right-hand row of 32px square buttons (`size-8 rounded-lg bg-fg/5`) for GitHub / X / LinkedIn plus the theme toggle. Brand marks come from lucide except X, which is a hand-rolled SVG in `src/components/icons.tsx`.
- **Project tags** render through `TechTag.tsx`, which maps a tag label to a Simple Icons mark from the `simple-icons` package (named imports, so Rollup tree-shakes it: fourteen icons cost ~16 kB, not the whole 3,000-icon set). Marks are drawn in `currentColor`, never their brand colour. A tag with no entry in that map renders as plain text at the same size, so nothing is silently dropped: add the icon to the map or leave the label as text. Marks sit bare in the row with no box or border around them.
- **`ThemeToggle`** is deliberately not another icon button: it is a 56x32 rounded track with a sliding knob, `role="switch"` plus `aria-checked`, so its shape says "state" while the three square `rounded-lg` buttons beside it say "link". Note that Tailwind v4's `translate-x-*` sets the CSS `translate` property rather than `transform`; `transition-transform` still covers it, so the knob animates.
- **Scrollbar** styling lives in `globals.css`: `scrollbar-width`/`scrollbar-color` for Firefox and `::-webkit-scrollbar*` for the rest, both reading `--color-border` / `--color-bg` so the bar follows the theme. The thumb's `border: 4px solid var(--color-bg)` is what insets it into a thin pill.
- **The nav stroke** is one `.nav-ink` element living in the link row, not one per link, so it can travel between items. `Nav.tsx` positions it imperatively in a `useLayoutEffect` keyed on `pathname`; the movement itself is the CSS transition on `.nav-ink`, which gives `left` and `right` different durations. Nav.tsx swaps which of the two is the fast one based on the direction of travel, so the leading edge lands in 170ms while the trailing edge takes 300ms and the stroke stretches across both words before pulling in. Motion was tried here first via `layoutId` and is deliberately not used: its layout projection fought the stroke's rotation, and the CSS version is both simpler and easier to reason about.
- **Debugging animations through the Chrome extension**: a backgrounded tab (`document.hidden === true`) has its CSS transitions and `requestAnimationFrame` suspended by Chrome, so animations look frozen and `transitionstart` never fires. Check `document.hidden` before concluding an animation is broken, and use `element.getAnimations()` (which still reports a running `CSSTransition`) rather than sampling positions over time.
- **The `bar:` breakpoint** (`--breakpoint-bar: 810px` in `globals.css`) is surya's own switch point for that bar, measured off their stylesheet. Below it the bar stops spanning the width and becomes a centred cluster: the wordmark drops out and links + buttons centre on one row, wrapping to two centred rows on phones. Verify changes to it by loading the site in a 390px-wide iframe — resizing the browser window does not change the viewport the media queries see.

- **Crawlable metadata is generated, never hand-written.** `scripts/postbuild.mjs` imports `site.ts` after the Vite build and emits `sitemap.xml`, `llms.txt` and the JSON-LD `@graph` (Person + WebSite) that it injects into `index.html`, then copies the finished file to `404.html`. Add a project or change the bio and all of it follows on the next build. It runs under `node --experimental-strip-types`, so keep `site.ts` free of TypeScript that type stripping cannot erase.
- **Per-route head** lives in `usePageMeta`: title, description, Open Graph and the canonical URL. The canonical is load-bearing here, because every route is served by the same `index.html` and without it a crawler can read `/`, `/work` and `/about` as three copies of one document.
- **WebMCP** (`src/lib/webmcp.ts`) registers five read-only tools on `document.modelContext` so an agent can query the portfolio instead of scraping it: `get_profile`, `list_projects`, `get_experience`, `get_stack`, `get_contact`. `navigator.modelContext` is a deprecated alias and is not used. Everything is feature-detected and torn down through an `AbortController`, and every payload runs through `plain()` so the `**` emphasis markers never reach a model. Tools answer from `site.ts`, which is what keeps the agent-facing data and the rendered page in agreement.

## Design rules

- Project descriptions cap at **4 to 5 rendered lines**, roughly 60 words at the `max-w-2xl` measure. Longer than that and the Work page turns into an essay; put the detail in the repo instead. Check the rendered card, not the word count alone.
- Emphasis inside copy is a highlighter pen, never an underline: underlines mean "link" here. Wrap words in `**...**` inside `site.ts` and `Rich.tsx` renders them with the `.mark` class from `globals.css`. The ink is `--color-highlight`, orange in light and blue in dark, and `box-decoration-break: clone` keeps the rounded ends when a marked phrase wraps across lines. Keep it to about two marks per paragraph; marking everything marks nothing.
- No emoji in the interface, and no icon-in-a-chip. The hero's location and studies are a label/value list (`site.meta`) matching the Stack rows on `/about`, not emoji pills; project tech marks sit bare. Both were changed away from the pill/badge pattern deliberately.

- Animation follows Emil Kowalski's rule: nothing over 300ms, `duration-150`/`200` with ease-out, and only where it does work. The theme switch (260ms) is the one richer moment: `useTheme` runs the change inside `document.startViewTransition` and animates a `clip-path` circle growing out of the toggle over `::view-transition-new(root)`. Browsers without view transitions get the `.theme-transition` class instead, which cross-fades colour properties for exactly the same 260ms and then gets out of the way so hover states keep their own timing. Hover states change color and background only — no transforms, scales or rotations. `prefers-reduced-motion` disables everything (global block in `globals.css` plus `useReducedMotion()` in `Nav`).
- Layout is a single `max-w-2xl` left-aligned column with generous vertical rhythm. Text is never centered.
- Prose blocks are justified (`text-justify`), and every one of them **must** carry `hyphens-auto` alongside it. Without hyphenation, justified text in this narrow column opens rivers of whitespace, badly so at phone widths. The `lang="en"` on `<html>` is what lets the browser hyphenate, so keep it accurate if the copy ever changes language.
- Interactive elements rely on the global `:focus-visible` outline; icon-only buttons need an `aria-label`.

- **Type** is McQueen Grotesk first, Inter second. McQueen Grotesk is a commercial Zetafonts face and is **not** in the repo, so today it only renders on machines that have it installed and everyone else gets Inter. `public/fonts/README.md` has the steps to self-host it; do not commit font files unless the licence allows it.

## Deployment gotchas

- `vite.config.ts` sets `base: '/'` — apex custom domain, not a project subpath.
- `public/CNAME` must survive into `dist/`, or Pages drops `brunob.dev`.
- `scripts/copy-404.mjs` writes `dist/404.html` so deep links survive a hard refresh; GitHub Pages has no SPA rewrite.
- Pages *Source* must be **GitHub Actions**, not "deploy from a branch".

## Notes

- Contact address is `info@brunob.dev`; the git identity is `altbrunob@gmail.com` and is not the public address.
- Content in `site.ts` came from Bruno's LinkedIn, his CV, his public GitHub repos and his commits in the `MediaLabUniovi` organisation. The CV carried his phone number and is deliberately **not** on the site or in `public/` any more; do not reintroduce either.
- Most of the MediaLab repositories are **private**. Those projects are described at feature level with no repo links; only `Healthcare_CuboLab` is public. Do not add links to private repos.
