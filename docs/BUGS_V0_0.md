# Known Issues and Questions

**Project:** Blog Site (JamesDCage.github.io)  
**Version:** 0.0  

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

- [X] FIXED TILE LAYOUT PATTERN — Remove `column_span` from manifest.json. Implement fixed repeating row pattern from newest to oldest: (3), (2,1), (1,2), (1,1,1). Pattern repeats every 7 articles. All tiles must render correctly at 1, 2, and 3 column widths. See SPECIFICATION_V_0_7.md section 1.3.

- [X] HERO IMAGE TILE TEXT OVERLAY WIDTH — On hero image tiles, the text overlay box must always be the width of one grid column, regardless of the tile's rendered column span. 3-column tile = 1/3-width box. 2-column tile = 1/2-width box. 1-column tile = full-width box. See SPECIFICATION_V_0_7.md section 1.3.2.2.

- [X] ARTICLE PAGE HERO IMAGE FULL WIDTH — The hero image is currently constrained to the 700px article text column. It should break out of the text column and span up to approximately 1200px, centered. Text column remains at 700px below it. Three-tier width system: hero image (~1200px max), home page grid (~1100px max), article text (~700px max). See SPECIFICATION_V_0_7.md section 1.4.

- [X] FLOATING HEADER — Change header from sticky to floating: `position: fixed`, `top: 18px`, `max-width: var(--max-content)`, centered with `margin: 0 auto`, `border-radius: 8px`. No box-shadow — keep existing thin bottom border only. Content must scroll behind and around it, visible in gap above and to left/right. Add `padding-top` to body/main content to compensate. See SPECIFICATION_V_0_7.md section 2.5.

- [X] DROP CAP FONT — Spec says drop cap should be sans-serif (Inter). Verify current implementation — it may be rendering in serif (Lora). See SPECIFICATION_V_0_7.md sections 1.4 and 2.3.

- [X] DROP CAP SIZE — CSS currently uses `font-size: 4.5em` for the drop cap. Spec says ~3.5em. Check visually and adjust if it looks too large. See SPECIFICATION_V_0_7.md section 2.3.

- [X] VIDEO TILE RENDERING AT ALL WIDTHS — With the new fixed layout pattern, video tiles will appear at 1, 2, and 3 column widths. Verify that video tiles render correctly at all three widths (image fills upper 5/6ths, caption in lower 1/6th).

---

## 🟡 Medium Priority

- [X] NAV LINKS HARDCODED IN ARTICLE PAGES — Article HTML files have nav links hardcoded rather than loading them from `nav.js`. Adding a new nav link (e.g., "Music") requires updating every existing article HTML file. Spec section 1.7 says navigation should be configurable. Flag for the blog-manager: when generating article HTML, nav links should come from a shared config, not be baked in.

---

## 🟢 Low Priority / Future

- [ ] UNBORDERED CALLOUT TILES — GatesNotes uses unbordered tiles for quotes, links, and editorial callouts to break up the visual rhythm. Defer until article and video tiles are working. See review notes item 4a.

---

## 🎯 Enhancement Requests


## ❓ Questions / Spec Clarifications

- [ ]

## ✅ Recently Completed (Awaiting Verification)

- [ ] FIXED TILE LAYOUT PATTERN — Removed `column_span` from manifest.json (new manifest from docs/sample-content/ has no such field). Implemented `LAYOUT_PATTERN = [3,2,1,1,2,1,1]` in `home.js`. `columnSpanForIndex(idx)` computes span by position modulo 7. `renderNextBatch()` now passes the list index to `buildTile(post, idx)`.

- [ ] HERO IMAGE TILE TEXT OVERLAY WIDTH — Replaced fixed overlay width with viewport-responsive CSS rules. Mobile (1-col): overlay fills full tile width (`width: 100%; left: 0; right: 0; bottom: 0`). Tablet (span-2 and span-3 both render 2 cols): overlay = 50% (`width: 50%`). Desktop span-3 (3 cols): overlay = 33.33% (`width: 33.33%`). Rules added to the 768px and 1024px media query blocks in `main.css`.

- [ ] ARTICLE PAGE HERO IMAGE FULL WIDTH — Applied CSS full-bleed breakout formula to `.post-featured-image`: `width: min(100vw, 1200px); margin-left: calc(50% - min(50vw, 600px))`. This works for all featured images (hero and main) on article pages. Image fills viewport width on viewports ≤ 1200px; caps at 1200px on wider displays. Border-radius added at 1200px+ where image no longer spans full viewport. Removed the old tablet `margin: 0 0 2rem` override that was counteracting the breakout.

- [ ] FLOATING HEADER — Changed `.site-header` from `position: sticky; top: 0` to `position: fixed; top: 18px; left: 50%; transform: translateX(-50%); width: calc(100% - 2rem); max-width: var(--max-content); border-radius: 8px`. Kept only the thin bottom border, no box-shadow. Added `padding-top: 96px` to `body` (18px gap + 60px header height + 18px gap). Mobile dropdown given `border-radius: 0 0 8px 8px` to match.

- [ ] DROP CAP FONT — Verified: the existing CSS already uses `font-family: var(--font-sans)` (Inter) on `.post-body > p:first-child::first-letter`. No change was needed for the font.

- [ ] DROP CAP SIZE — Changed `font-size` on `.post-body > p:first-child::first-letter` from `4.5em` to `3.5em` per spec.

- [ ] VIDEO TILE RENDERING AT ALL WIDTHS — Fixed the video tile `height: 100%` issue (which doesn't work without a defined parent height) by replacing it with `min-height: 280px` on `.tile--video .tile-link`. Added tablet (360px) and desktop (420px) min-height overrides in the responsive media query blocks, matching the hero tile scaling. The `flex: 5` / `flex: 1` ratio for image and caption is preserved and now functions correctly at all widths.

- [ ] NAV LINKS HARDCODED IN ARTICLE PAGES — All four freshly generated article HTML files use the same `<header>` shell as `index.html`, with empty `<ul>` elements populated at runtime by `nav.js`. No nav links are hardcoded in any article file.

---
