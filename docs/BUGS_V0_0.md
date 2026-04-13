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

- [ ] FIXED TILE LAYOUT PATTERN — Remove `column_span` from manifest.json. Implement fixed repeating row pattern from newest to oldest: (3), (2,1), (1,2), (1,1,1). Pattern repeats every 7 articles. All tiles must render correctly at 1, 2, and 3 column widths. See SPECIFICATION_V_0_7.md section 1.3.

- [ ] HERO IMAGE TILE TEXT OVERLAY WIDTH — On hero image tiles, the text overlay box must always be the width of one grid column, regardless of the tile's rendered column span. 3-column tile = 1/3-width box. 2-column tile = 1/2-width box. 1-column tile = full-width box. See SPECIFICATION_V_0_7.md section 1.3.2.2.

- [ ] ARTICLE PAGE HERO IMAGE FULL WIDTH — The hero image is currently constrained to the 700px article text column. It should break out of the text column and span up to approximately 1200px, centered. Text column remains at 700px below it. Three-tier width system: hero image (~1200px max), home page grid (~1100px max), article text (~700px max). See SPECIFICATION_V_0_7.md section 1.4.

- [ ] FLOATING HEADER — Change header from sticky to floating: `position: fixed`, `top: 18px`, `max-width: var(--max-content)`, centered with `margin: 0 auto`, `border-radius: 8px`. No box-shadow — keep existing thin bottom border only. Content must scroll behind and around it, visible in gap above and to left/right. Add `padding-top` to body/main content to compensate. See SPECIFICATION_V_0_7.md section 2.5.

- [ ] DROP CAP FONT — Spec says drop cap should be sans-serif (Inter). Verify current implementation — it may be rendering in serif (Lora). See SPECIFICATION_V_0_7.md sections 1.4 and 2.3.

- [ ] DROP CAP SIZE — CSS currently uses `font-size: 4.5em` for the drop cap. Spec says ~3.5em. Check visually and adjust if it looks too large. See SPECIFICATION_V_0_7.md section 2.3.

- [ ] VIDEO TILE RENDERING AT ALL WIDTHS — With the new fixed layout pattern, video tiles will appear at 1, 2, and 3 column widths. Verify that video tiles render correctly at all three widths (image fills upper 5/6ths, caption in lower 1/6th).

---

## 🟡 Medium Priority

- [ ] NAV LINKS HARDCODED IN ARTICLE PAGES — Article HTML files have nav links hardcoded rather than loading them from `nav.js`. Adding a new nav link (e.g., "Music") requires updating every existing article HTML file. Spec section 1.7 says navigation should be configurable. Flag for the blog-manager: when generating article HTML, nav links should come from a shared config, not be baked in.

---

## 🟢 Low Priority / Future

- [ ] UNBORDERED CALLOUT TILES — GatesNotes uses unbordered tiles for quotes, links, and editorial callouts to break up the visual rhythm. Defer until article and video tiles are working. See review notes item 4a.

---

## 🎯 Enhancement Requests


## ❓ Questions / Spec Clarifications

- [ ]

## ✅ Recently Completed (Awaiting Verification)


---
