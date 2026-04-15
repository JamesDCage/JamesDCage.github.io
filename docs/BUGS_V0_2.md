# Known Issues and Questions

**Project:** Blog Site (JamesDCage.github.io)  
**Version:** 0.2  

**Instructions for LLM Developers:**
- Add bugs you discover that you CANNOT fix without human input
- Add questions about spec inconsistencies or ambiguities
- When you fix a bug or complete an enhancement, put an X in the checkbox. Make a note in the "Recently Completed (Awaiting Verification)" section referring to the bug by the same name. Provide a checkbox but LEAVE UNCHECKED.
- State assumptions clearly when specs are unclear
- Use priority labels: 🔴 High | 🟡 Medium | 🟢 Low | 🎯 Enhancement

**Instructions for Human Developer (James):**
- Review and answer questions in spec clarifications section
- Test all items in "Recently Completed"
- Check boxes only after verifying fixes work
- Add bugs found during manual testing
- Add enhancement requests as needed

---

## 🔴 High Priority

- [x] THREE-TIER VISUAL CONTAINER — The site currently has a flat background with no visible distinction between the page and content areas. Implement the three-tier container model: light gray page background (#FAFAFA) visible at viewport edges, a centered white content area (#FFFFFF, max-width ~1800px) as a visually distinct container, and content within that. The white area must be a visible rectangle on the gray background, not an invisible wrapper. See SPECIFICATION_V_0_9.md section 2.2 and 2.4.

- [x] TILE GRID WIDTH — The tile grid is currently too narrow (~1100px). Increase the tile grid max-width to approximately 1500px, centered within the white content area. See SPECIFICATION_V_0_9.md section 2.2.

- [x] FEATURED TILE — The first tile on the home page should be wider and taller than standard tiles. It should fill the full width of the white content area (~1800px, wider than the ~1500px tile grid) and extend upward from the normal Row 1 bottom edge to the top of the white content area, passing behind the floating header. The bottom of the featured tile stays where a normal first-row tile would end. No border, no shadow, no rounded corners — it bleeds to the edges of the white content area. Only the very first tile on the page gets this treatment. See SPECIFICATION_V_0_9.md sections 1.3, 2.2, and 2.6.

- [x] ARTICLE HERO IMAGE FULL WHITE CONTENT AREA WIDTH — The article page hero image should fill the full width of the white content area (~1800px), not the ~700px text column. It should sit at the very top of the article with no gap, passing behind the floating header. On viewports narrower than 1800px, the image fills the full white content area width. See SPECIFICATION_V_0_9.md sections 1.4 and 2.2.

- [x] 1-COLUMN TILES: NO HERO OVERLAY — All tiles rendered at 1-column width must use the text-on-top/image-below layout (like main image tiles), regardless of whether the manifest says "hero" or "main" for image_type. No gray overlay box on 1-column tiles. This applies on desktop when the layout pattern places a hero post in a 1-column slot, and on mobile/tablet when all tiles are 1-column. The hero overlay (image fills tile, text in overlay box) is only used on 2- and 3-column tiles. See SPECIFICATION_V_0_9.md section 1.3.2.2.

- [x] FIXED TILE HEIGHTS ACROSS VIEWPORTS — Tile row heights currently shrink as the viewport narrows. Tile heights must remain the same at all viewport widths. When the viewport narrows, tiles get narrower (and may reflow to fewer columns) but they do not get shorter. See SPECIFICATION_V_0_9.md sections 1.3 and 2.8.

---

## 🟡 Medium Priority

- [ ]

---

## 🟢 Low Priority / Future

- [ ] UNBORDERED CALLOUT TILES — GatesNotes uses unbordered tiles for quotes, links, and editorial callouts to break up the visual rhythm. Defer until article and video tiles are working. See review notes item 4a.

---

## 🎯 Enhancement Requests


## ❓ Questions / Spec Clarifications

- [ ]

## ✅ Recently Completed (Awaiting Verification)

- [ ] THREE-TIER VISUAL CONTAINER — Added `.content-area` wrapper div (background: #FFFFFF, max-width: 1800px, centered) to index.html, 404.html, and all post HTML files. Body retains background: #FAFAFA. The white rectangle is visible against the gray page background on wide screens.

- [ ] TILE GRID WIDTH — Updated `--max-content` from 1100px to 1800px (white content area) and added `--max-tile-grid: 1500px`. The `.tile-grid` now uses `--max-tile-grid`, making it approximately 1500px wide, centered within the white content area.

- [ ] FEATURED TILE — The first tile (idx 0) is now rendered into `#featured-tile-container` (above the tile-grid) with class `tile--featured`. It has no shadow, border, or border-radius, fills 100% of the white content area width. On desktop (≥1024px): hero overlay layout, height = `calc(96px + 2.5rem + 420px)` ≈ 556px, body padding-top: 0 so it extends to y=0 behind the header. On tablet (≥768px): same height formula with 2rem grid padding. On mobile: text-on-top layout, auto height, below the header (body padding-top: 96px). Subsequent cycle Row 1 tiles (idx 7, 14…) remain normal span-3 tiles in the tile-grid.

- [ ] ARTICLE HERO IMAGE FULL WHITE CONTENT AREA WIDTH — `.post-featured-image` now uses `width: 100vw; max-width: var(--max-content); position: relative; left: 50%; transform: translateX(-50%)` to fill the full white content area (up to 1800px). `body[data-page="article"]` has `padding-top: 0` on desktop (≥1024px) so the image extends behind the floating header. `.post-article` top padding removed.

- [ ] 1-COLUMN TILES: NO HERO OVERLAY — In home.js, hero tiles at span-1 are now rendered with `buildMainTileContent` (text-on-top layout, `tile--main` class). In CSS, `.tile--hero.span-1` overrides to text-on-top, and a `@media (max-width: 767px)` rule forces all `.tile--hero` to text-on-top on mobile.

- [ ] FIXED TILE HEIGHTS ACROSS VIEWPORTS — All `.tile` elements now have `height: var(--tile-height)` (420px) applied unconditionally, with no responsive overrides. The `aspect-ratio` on `.tile--main .tile-image` was replaced with `height: 240px`. All responsive `min-height` rules on hero/video tiles were removed.

---
