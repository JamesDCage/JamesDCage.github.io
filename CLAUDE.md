# CLAUDE.md — James Cage Blog

Developer guide for LLM and human contributors. Read this before touching any file.

---

## What This Site Is

A personal blog (JamesDCage.github.io) hosted on GitHub Pages. Static HTML/CSS/JS only — no build step, no server-side code, no frameworks. About 20 readers. The reference design is GatesNotes.

Full specification: `docs/SPECIFICATION_V_0_9.md`  
Open bugs: `docs/BUGS_V0_2.md`  
Spec images (part of the spec, not decoration): `docs/images/`

---

## CRITICAL: Off-Limits Directory

**`/img/` — DO NOT TOUCH.** This directory contains legacy content belonging to another project. Never modify, rename, delete, or add to it. Ever.

---

## Repository Layout

```
JamesDCage.github.io/
├── index.html           # Home page shell
├── manifest.json        # All post metadata (sorted, filtered, rendered client-side)
├── video.html           # Full-screen YouTube player
├── 404.html             # Error page (GitHub Pages auto-serves this)
├── CLAUDE.md            # This file
├── img/                 # [SYSTEM RESERVED — DO NOT MODIFY]
├── assets/
│   ├── css/main.css     # ALL styles, mobile-first, single file
│   └── js/
│       ├── nav.js       # Navigation rendering + hamburger toggle
│       └── home.js      # Tile grid rendering, filtering, infinite scroll
├── posts/
│   ├── images/          # Post images: /posts/images/<slug>-<name>.ext
│   └── <slug>.html      # One complete HTML file per blog post
└── docs/
    ├── SPECIFICATION_V_0_9.md
    ├── BUGS_V0_2.md
    └── images/          # Spec reference images (read before implementing)
```

---

## Technology Choices

| Layer | Choice |
|-------|--------|
| Hosting | GitHub Pages (no CI/CD needed) |
| CSS | Vanilla, mobile-first, custom properties, CSS Grid |
| JS | Vanilla ES5 IIFEs, no build step |
| Fonts | Google Fonts: Lora (serif) + Inter (sans-serif), `font-display: swap` |

---

## Key CSS Variables (`assets/css/main.css`)

| Variable | Value | Meaning |
|----------|-------|---------|
| `--max-content` | 1800px | White content area (the "page" on the gray desk) |
| `--max-tile-grid` | 1500px | Home page tile grid |
| `--max-article` | 700px | Article text column |
| `--tile-height` | 420px | Fixed tile height — **never change per viewport** |
| `--header-height` | 60px | Floating header bar height |
| `--header-offset` | 96px | Body padding-top for non-featured pages (18 + 60 + 18) |

---

## Three-Tier Visual Layout

Every page (except video.html) uses this layered structure:

1. **`body`** — background `#FAFAFA` (light gray). Visible at viewport edges on wide screens.
2. **`.content-area`** — background `#FFFFFF`, `max-width: 1800px`, centered. This is the white "page."
3. Content inside `.content-area` (header/tiles/article/footer).

The floating `<header>` is placed **outside** `.content-area` (but inside `<body>`) so it overlays everything at `z-index: 100`.

### Body padding-top rules
- Default: `96px` (clears the floating header)
- `body[data-page="home"]` on desktop (≥1024px): `0` — featured tile extends behind header
- `body[data-page="article"]` on desktop (≥1024px): `0` — hero image extends behind header

---

## Home Page Architecture

`index.html` → `home.js` fetches `manifest.json` → renders tiles.

### Tile grid layout pattern (repeats every 7 posts)

| Cycle position | Span | Notes |
|---------------|------|-------|
| 0 (first ever) | 3 | **Featured tile** — full content-area width, taller, behind header |
| 0 (later cycles) | 3 | Normal span-3 tile in the tile-grid |
| 1 | 2 | — |
| 2 | 1 | — |
| 3 | 1 | — |
| 4 | 2 | — |
| 5 | 1 | — |
| 6 | 1 | — |

The very first tile (global idx 0) is rendered into `#featured-tile-container` (above the tile-grid). All other tiles go into `#tile-grid`.

### Tile type dispatch (in `home.js buildTile`)

| Condition | Class | Layout |
|-----------|-------|--------|
| `idx === 0` and `type !== 'video'` | `tile--featured` | Hero overlay (desktop/tablet), text-on-top (mobile) |
| `type === 'video'` | `tile--video` | Image top 5/6, caption bar bottom 1/6 |
| `image_type === 'hero'` and `span > 1` | `tile--hero` | Image fills tile, text overlay |
| Everything else (including hero at span-1) | `tile--main` | Text on top, image below |

### 1-column hero tile rule
Hero tiles at 1-column **always** use the text-on-top layout (no overlay box). This is enforced:
- In JS: `span > 1` guard on `tile--hero` assignment
- In CSS: `.tile--hero.span-1` overrides + `@media (max-width: 767px)` overrides all hero tiles

---

## Article Page Architecture

Each post is a standalone HTML file at `/posts/<slug>.html`. Posts link to the shared CSS and nav.js.

**Required HTML structure (contract with the external post generator):**

```html
<body data-page="article">
  <header class="site-header">...</header>
  <div class="content-area">
    <main class="article-main">
      <article class="post-article">
        <div class="post-featured-image"><img ...></div>
        <header class="post-header">
          <p class="post-overline">...</p>
          <h1 class="post-title">...</h1>
          <p class="post-summary">...</p>
          <p class="post-byline">...</p>
        </header>
        <hr class="post-divider">
        <div class="post-body">...</div>
        <hr class="post-end-rule">
      </article>
    </main>
    <footer class="site-footer">...</footer>
  </div>
  <script src="/assets/js/nav.js"></script>
</body>
```

The `.post-featured-image` uses a CSS full-bleed breakout (`width: 100vw; max-width: 1800px; left: 50%; transform: translateX(-50%)`) to fill the white content area width. It has no top margin — on desktop (≥1024px) it starts at y=0 behind the floating header.

---

## Navigation

Nav links are configured at the top of `nav.js` in the `NAV_LINKS` array — no code changes needed to add/remove links:

```js
const NAV_LINKS = [
  { label: 'Home',    filter: null },
  { label: 'Reviews', filter: 'Reviews' },
  { label: 'Videos',  filter: 'Videos' },
];
```

`filter: null` = home (clear filter). `filter: 'Tag'` = filter by that manifest tag.

---

## manifest.json

Every post requires: `slug`, `date` (YYYY-MM-DD), `tags` (array), `url`, `type`, `image_url`.  
Articles also require: `title`, `overline`, `summary`, `image_type` (`"main"` or `"hero"`).  
Videos also require: `video_url` (YouTube embed URL), `video_caption`.  
Optional: `originally` (attribution note).

Posts are sorted newest-first by `date`. The layout pattern is determined by position in the sorted list — the manifest does not contain column span information.

---

## Responsive Breakpoints

| Breakpoint | Columns | Notes |
|-----------|---------|-------|
| < 768px (mobile) | 1 | All hero tiles → text-on-top; hamburger nav |
| 768px–1023px (tablet) | 2 | span-3 capped at 2; hamburger nav |
| ≥ 1024px (desktop) | 3 | Featured tile extends behind header |

Tile height (`--tile-height: 420px`) is **fixed across all breakpoints**.

---

## Working with Bugs and Spec

- Bug tracker: `docs/BUGS_V0_2.md` — follow the instructions at the top of that file
- When you fix a bug: check the box, add a note to "Recently Completed"
- When you change implementation details: update `docs/SPECIFICATION_V_0_9.md` sections 3.1–3.4

---

## Do Not

- Do not modify anything in `/img/`
- Do not add JavaScript frameworks or CSS preprocessors
- Do not add a build step
- Do not change `--tile-height` in responsive media queries (tiles must be a fixed height)
- Do not add `padding-top` to `.content-area` (hero images/featured tiles must start at the top)
- Do not justify text (spec 2.3: always left-aligned)
