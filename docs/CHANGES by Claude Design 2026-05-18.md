# Style Change Notes — Simulation → Repo

A handoff doc for updating `docs/SPECIFICATION_V_0_11.md` and instructing
Claude Code to apply the same changes to the working repo.

Every change below was made against this simulation; paths assume the
real repo's layout (CSS in `assets/css/main.css`, HTML in `index.html`
plus `posts/*.html`).

---

## 1. Header — black, centered nav, search icon on the right

**Spec change.** Header is no longer white-with-border. It's a black
floating bar (`#000`) with white text. Layout shifts from
`flex / space-between` (logo · nav-with-hamburger) to a **3-column grid**:
logo left, nav center, actions (search + hamburger) right.

**Width rule changed.** The bar's outer edges now match the *visible
tile-edge span* — i.e. `tile-grid max-width − the grid's horizontal
padding` — rather than the tile-grid container width. The bar shrinks by
the same amount the tile grid is padded internally.

| Viewport | Tile-grid h-padding (each side) | Header bar outer width |
|---|---|---|
| Mobile (<768px) | `1rem` | `calc(100% − 2rem)` |
| Tablet+ (≥768px) | `2rem` | `calc(100% − 4rem)`, capped at `calc(var(--max-tile-grid) − 4rem)` |

Inner padding on `.site-header__inner` is `0 1rem` (mobile) / `0 1.25rem`
(tablet+) so the logo and search icon have a small breathing inset from
the bar edges.

### `assets/css/main.css` — header section (replace existing §5 Header + the header overrides in §15 Tablet)

```css
.site-header {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  /* Match the visible tile-edge span (grid container minus its horizontal padding). */
  max-width: calc(var(--max-tile-grid) - 2rem); /* mobile: tile-grid has 1rem h-padding */
  z-index: 100;
  background: #000000;
  color: #FFFFFF;
  border-bottom: 1px solid #000000;
  border-radius: 8px;
  height: var(--header-height);
}

.site-header__inner {
  max-width: var(--max-content);
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

.site-header__left   { justify-self: start; }
.site-header__center { justify-self: center; }
.site-header__right  { justify-self: end; display: flex; align-items: center; gap: 0.25rem; }

.site-logo {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFFFFF;
  text-decoration: none;
  flex-shrink: 0;
  white-space: nowrap;
}
.site-logo:hover { color: #CCCCCC; }
```

Inside `@media (min-width: 768px)`:

```css
.site-header {
  width: calc(100% - 4rem);                       /* match tile-grid visible span (2rem h-padding each side) */
  max-width: calc(var(--max-tile-grid) - 4rem);
}
.site-header__inner { padding: 0 1.25rem; }
```

### Nav-link colors (§6 Navigation)

Every `var(--color-link)` / `var(--color-body-text)` / `var(--color-headline)`
referenced from `.site-nav__link*` and `.site-nav__hamburger span`
becomes `#FFFFFF`. `gap` on `.site-nav__list` goes from `1.5rem` to
`2rem`. Active-link underline is white.

### `index.html` and every `posts/*.html` — header markup

Replace the existing `<header class="site-header">…</header>` block with
this three-slot structure. The hamburger button moves *out* of `<nav>`
into a new `.site-header__right` slot, with the search button just
before it.

```html
<header class="site-header" role="banner">
  <div class="site-header__inner">
    <div class="site-header__left">
      <a href="/" class="site-logo">James Cage</a>
    </div>

    <nav class="site-nav site-header__center" aria-label="Site navigation">
      <ul id="nav-links" class="site-nav__list" role="list"></ul>
    </nav>

    <div class="site-header__right">
      <button type="button" class="site-search" aria-label="Search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke-width="2"></circle>
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke-width="2" stroke-linecap="round"></line>
        </svg>
      </button>
      <button id="nav-hamburger" class="site-nav__hamburger"
              aria-label="Open navigation menu" aria-expanded="false"
              aria-controls="nav-mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <div id="nav-mobile-menu" class="site-nav__mobile-menu" role="dialog" aria-label="Navigation menu">
    <ul id="nav-links-mobile" class="site-nav__mobile-list" role="list"></ul>
  </div>
</header>
```

`nav.js` keeps working — the IDs are unchanged.

---

## 2. Search button (the magnifying glass)

Inline SVG, no asset needed. 32px icon inside a 48px hit target.
Currently a no-op `<button>` — wire it to whatever search behavior the
real site uses.

```css
.site-search {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  background: none;
  border: none;
  border-radius: 4px;
  color: #FFFFFF;
  cursor: pointer;
  transition: background 0.15s;
}
.site-search:hover { background: rgba(255, 255, 255, 0.1); }
.site-search:focus-visible { outline: 2px solid #FFFFFF; outline-offset: 2px; }
.site-search svg {
  display: block;
  width: 32px;
  height: 32px;
  stroke: currentColor;
  fill: none;
}
```

---

## 3. Video tiles — caption is now an overlay (matches hero tiles)

**Old behavior:** image filled the top 5/6, light-gray caption bar
filled the bottom 1/6.
**New behavior:** image fills the *entire* tile. Caption floats as a
dark overlay in the **bottom-left**, sized like the hero-tile overlay
(1-column-wide at every span).

| Tile span | Caption width |
|---|---|
| 1-col (and mobile) | `calc(100% − 2rem)` (full bar with 1rem inset each side) |
| 2-col (tablet+) | `50%` |
| 3-col (desktop) | `33.33%` |

Colors: background `#615E63`, text `#FFFFFF`. Font size bumped from
`0.875rem` to `1rem` (~15% larger).

Replace the §9 `tile--video` block with:

```css
.tile--video .tile-link {
  position: relative;
  display: block;
  height: 100%;
}
.tile--video .tile-video-image-wrap {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tile--video .tile-video-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tile-video-play {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--color-headline);
  pointer-events: none;
  z-index: 2;
}
.tile--video .tile-video-caption {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: auto;
  width: calc(100% - 2rem);
  background: #615E63;
  color: #FFFFFF;
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.4;
  padding: 0.85rem 1.1rem;
  z-index: 2;
}
```

Add inside `@media (min-width: 768px)` (next to the hero-overlay sizing
rules):

```css
.tile.span-2.tile--video .tile-video-caption,
.tile.span-3.tile--video .tile-video-caption {
  width: 50%;
}
```

Add inside `@media (min-width: 1024px)`:

```css
.tile.span-3.tile--video .tile-video-caption {
  width: 33.33%;
}
```

No HTML changes required — `home.js` already builds the same DOM.

---

## 4. Article body figures — 35% wider than the text column

In-body `<figure>` elements now break out to 135% of the text column
width, centered, and clamp to the viewport on narrow screens. The
article hero image (`.post-featured-image`) is unaffected; it keeps its
full-content-area breakout.

```css
.post-body figure {
  /* Break out 17.5% on each side of the text column (35% total wider). */
  width: 135%;
  max-width: calc(100vw - 2rem);
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 2em 0;
}
```

No HTML changes — applies to every existing `<figure>` inside
`.post-body`. The existing `overflow-x: hidden` on `.content-area`
prevents horizontal scrollbars at narrow widths.

---

## 5. Page-margin background

The desk-gray either side of the white content area is now slightly
cooler/darker so it's clearly readable on screen.

```css
:root {
  --color-page-bg: #EEEEF0;   /* was #FAFAFA */
}
```

---

## 6. End-of-article CTA — Comment / Get my newsletter

A two-button row at the very bottom of every **article** page (NOT on
video pages, NOT on 404). Stacks on narrow screens, side-by-side from
600px up. Dark fill (`#1F1F22`), white text, 18px sans, 6px radius.

### `assets/css/main.css` — add after `.post-end-rule`

```css
.post-cta {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 600px) {
  .post-cta {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}
.post-cta__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: #1F1F22;
  color: #FFFFFF;
  font-family: var(--font-sans);
  font-size: 1.125rem;       /* ~18px */
  font-weight: 600;
  text-decoration: none;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}
.post-cta__button:hover { background: #000000; color: #FFFFFF; }
.post-cta__button svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  flex-shrink: 0;
}
```

### Article HTML — insert after `<hr class="post-end-rule">`, before `</article>`

```html
<div class="post-cta">
  <button type="button" class="post-cta__button">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
    Comment
  </button>
  <a href="#" class="post-cta__button">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      <polyline points="22,6 12,13 2,6"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
    </svg>
    Get my newsletter
  </a>
</div>
```

Both targets are placeholders — wire **Comment** to the real comment
system and **Get my newsletter** to the subscribe URL. The post
generator that emits article HTML needs to grow this block. Update
`docs/SPECIFICATION_V_0_11.md` article-structure contract: every
article ends with a `.post-cta` containing two `.post-cta__button`
elements (Comment, Newsletter); videos do *not* get this block.

---

## Spec sections to update in `docs/SPECIFICATION_V_0_11.md`

- Header description + the floating-bar width rule (was tile-grid width;
  now tile-grid width minus tile-grid horizontal padding). Add the
  3-column grid layout. Add the search button as part of the right-side
  actions group.
- Color-variable table: `--color-page-bg: #EEEEF0`.
- Tile spec §1.3 video tile rule: image fills tile, caption is an
  overlay sized like hero (1/1, 1/2, 1/3 across breakpoints), background
  `#615E63`, white text, 1rem font.
- Article body §: figures break out to 135% of text column width.
- Article structure contract: append the `.post-cta` block to the
  required HTML after `<hr class="post-end-rule">`.

---

## Files in this simulation worth pulling into the repo

All paths are relative to this design project:

| Path | What it is | Use it? |
|---|---|---|
| `assets/css/main.css` | Full updated stylesheet with §1–6 applied | **Yes** — wholesale replace `assets/css/main.css` in the repo |
| `assets/js/nav.js` | Same as repo, except `linkHref()` builds relative URLs (`Home.html?filter=…`) for this simulation | **No** — keep the repo's version |
| `assets/js/home.js` | Same as repo, except `MANIFEST_URL` is `'manifest.json'` (relative) and video page URL is `Video.html` | **No** — keep the repo's version |
| `Batman and Superman.html` | Reference article with the new CTA block | Reference only — see structure |
| `Greenville.html` | Reference article showing a horizontal in-body figure with the new 135% breakout | Reference only |
| `Home.html`, `Not Found.html`, `Video.html` | Reference shells with the new header markup | Reference only |
| `CHANGES.md` | This document | Bundle with your handoff |

### How to download these from this project

Ask me in chat:

> "Give me a download link for `assets/css/main.css`."
> "Give me a download link for `CHANGES.md`."
> "Zip up the whole project."

I can package any single file or zip the whole project for download.

---

## Suggested commit order for Claude Code

1. **CSS-only commit.** Apply the §1–6 CSS changes in
   `assets/css/main.css`. Verify home + article pages still render at
   all breakpoints. Wholesale-replacing the CSS file from this
   simulation works if no other branch has touched the file.
2. **Header HTML commit.** Update the `<header>` markup in
   `index.html`, `404.html`, and (optionally) `video.html` to the
   three-slot structure. `nav.js` is unchanged.
3. **Post-generator commit.** Teach the generator to emit `.post-cta`
   at the bottom of every article. Re-generate all article HTMLs.
   Confirm video pages do *not* get the CTA.
4. **Spec commit.** Update `docs/SPECIFICATION_V_0_11.md` per the list
   above. Bump the version number in the filename if that's the
   project's convention.

---

## Sanity checks after the changes land

- Header bar's left and right edges are flush with the second-row tile
  edges (not the wider featured tile) at desktop, tablet, and mobile
  widths.
- Logo and search icon don't touch the bar's rounded corners — there
  should be visible inset on both sides.
- Video tiles at 1, 2, and 3 columns all show the caption as a dark
  overlay in the bottom-left at the right width.
- Article hero image still fills the white content area top-to-edge.
  Mid-article figures are wider than paragraph text by ~35%, centered.
- Article CTA renders as two side-by-side buttons at ≥600px and stacks
  below that. Video pages have no CTA.
