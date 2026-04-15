# Known Issues and Questions

**Project:** Blog Site (JamesDCage.github.io)  
**Version:** 0.3  

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

- [ ] **SCROLL SENTINEL INSIDE TILE-GRID** — `#scroll-sentinel` was a child of `#tile-grid`, occupying grid cell col-1/row-1 and displacing all subsequent tiles, creating blank first-column cells throughout the grid. Fixed by moving the sentinel to a sibling `<div>` immediately after `#tile-grid` in `index.html`. (`index.html`)

- [ ] **HEADER MAX-WIDTH TOO WIDE** — `.site-header` used `max-width: var(--max-content)` (1800px), making the header wider than the tile grid (1500px) on large screens. Fixed by changing to `max-width: var(--max-tile-grid)`. (`assets/css/main.css`, `docs/SPECIFICATION_V_0_9.md` section 2.5)

- [ ] **LAYOUT PATTERN MISSING EIGHTH ENTRY** — `LAYOUT_PATTERN` was `[3, 2, 1, 1, 2, 1, 1]` (7 entries). Row 4 of the repeating cycle requires three 1-column tiles, but only two were present, causing the third span-1 slot to be a span-3 on the next cycle. Fixed by changing to `[3, 2, 1, 1, 2, 1, 1, 1]`. (`assets/js/home.js`, `docs/SPECIFICATION_V_0_9.md` section 1.3)

- [ ] **INCOMPLETE LAST ROW LEAVES GRID GAPS** — When the post count does not evenly fill a complete cycle row, trailing grid cells are left empty, creating visual gaps. Fixed by adding `fillLastRow(lastTile)` to `home.js`, called once when all posts have been rendered; it calculates the remainder columns and expands the last tile's `grid-column` span to fill them. (`assets/js/home.js`)

- [ ] **TILE RENDERING ORDER DISRUPTED BY SENTINEL** — Resolved as a direct consequence of fixing the scroll-sentinel placement (Bug 1 above). No separate code change needed.

---
