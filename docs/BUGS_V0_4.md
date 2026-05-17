# Known Issues and Questions

**Project:** Blog Site (JamesDCage.github.io)  
**Version:** 0.4  

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

- [ ] **Manifest-based tile ordering:** Update `home.js` to display tiles in the order they appear in `manifest.json` (per SPECIFICATION_V_0_11.md §1.3), not in reverse chronological order. The layout pattern (3-column featured, 2+1, 1+2, 1+1+1) still applies, but it should consume articles from the manifest in manifest order, not by date.

- [ ] **16:9 aspect ratio for featured tile:** Update CSS to size the featured tile (first tile on page) tall enough to display a 16:9 image fully. Define `--featured-tile-height` CSS custom property to support this (per SPECIFICATION_V_0_11.md §1.3). Featured tile fills full white content area width (~1800px).

- [ ] **16:9 aspect ratio for 3-column rows:** Update CSS to size all 3-column tile rows (featured tile and any other 3-column tiles in the pattern) tall enough to maintain 16:9 aspect ratio (per SPECIFICATION_V_0_11.md §1.3). Define `--tile-height-3col` CSS custom property.

- [ ] **Grid layout: allow empty slots in last row:** Update `home.js` tile layout logic to allow the last row to have fewer than 3 columns with empty slots, instead of forcing it to fill. Empty spaces should not display placeholder tiles (per SPECIFICATION_V_0_11.md §1.3).

- [ ] **Small-screen tile height rules:** Update responsive CSS for tablet and mobile. Once viewport narrows to single-column display, all rows should be the same height (per SPECIFICATION_V_0_11.md §1.3). Currently tile heights are fixed across all breakpoints; clarify height behavior at each breakpoint.

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



---
