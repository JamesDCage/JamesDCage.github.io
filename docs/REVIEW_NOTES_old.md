# Blog Site — Implementation Review Notes

**Date:** April 13, 2026  
**Status:** Issues identified during first visual review  

---

## Home Page

### 1. Hero tile grid placement
The Batman hero tile (column_span: 2) sits in columns 2-3, leaving column 1 empty. It should either start from column 1 or span all 3 columns. No row should have empty columns — every row must sum to exactly 3 columns on desktop.

### 2. Row-filling algorithm
Rename `column_span` to `max_column_span` in the manifest and implement the following algorithm: When placing a tile, render it at `min(max_column_span, remaining_columns_in_row)`. Remaining columns start at 3 for each row, subtract the rendered width, and start a new row when remaining hits 0. Posts remain in reverse chronological order — no reordering to fill gaps.

### 3. Video tile width
The Shinyribs video tile appears to be filling 2 columns despite having `column_span: 1` in the manifest. Verify the grid is correctly constraining 1-column tiles.

### 4. Hero image tile text overlay width
On hero image tiles, the text overlay box (overline, headline, summary) should always be the width of one grid column, regardless of the tile's rendered column span. A 3-column tile has a 1/3-width text box. A 2-column tile has a 1/2-width text box. When the tile renders at 1 column (mobile, or constrained by row space), the text box fills the full tile width.

---

## Article Page

### 5. Hero image should be full-width
The hero image is currently constrained to the 700px article text column. It should break out of the text column and span the full viewport width, up to a maximum of approximately 1200px, centered. The text column below remains at 700px. This creates a three-tier width system: hero image (~1200px max), home page grid (~1100px max), article text (~700px max) — all centered. This matches the GatesNotes pattern.

### 6. Drop cap font
The spec (section 1.4) says the drop cap should be sans-serif (Inter). Verify this is implemented correctly — it may currently be rendering in serif (Lora).

### 7. Drop cap size
The CSS currently uses `font-size: 4.5em` for the drop cap. The spec (section 2.3) suggests ~3.5em. Check visually and adjust if it looks too large.

---

## Header

### 8. Sticky header behavior
The header should use `position: sticky` (or `position: fixed`) with `top: 0` and a high enough `z-index` to stay above content as the reader scrolls. If using `fixed`, add matching `padding-top` to the body or main content area so the first tile isn't hidden behind the header. Note: The CSS already has `position: sticky; top: 0; z-index: 100` — if the header is not floating over content in the browser, investigate whether a parent element is preventing sticky behavior.

---

## Navigation

### 9. Nav links are hardcoded in article pages
Article HTML files have the nav links hardcoded rather than loading them from `nav.js`. This works for now, but means adding a new nav link (e.g., "Music") requires updating every existing article HTML file. The spec (section 1.7) says navigation should be configurable. Flag for the blog-manager: when generating article HTML, nav links should come from a shared config, not be baked in.

---

## Spec Updates Needed

### 10. Update Appendix A — tag filter mechanism
The implementor chose URL parameters (`?filter=<tag>`) for filtering. Appendix A still says "implementor's choice." Update to reflect the resolution.

### 11. Add row-filling rule to section 1.3
Document the rule that every row must sum to exactly 3 columns (desktop) with no gaps, and the `min(max_column_span, remaining)` algorithm.

### 12. Add hero image tile text overlay width rule to section 1.3.2.2
Document that the text overlay box is always 1 grid column wide, regardless of tile span.

### 13. Add hero image full-width rule to section 1.4
Document that the article page hero image should span up to ~1200px (wider than the 700px text column), centered.
