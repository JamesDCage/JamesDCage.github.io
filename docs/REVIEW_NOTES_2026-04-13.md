# Blog Site — Implementation Review Notes

**Date:** April 13, 2026  
**Status:** Issues identified during first visual review  

---

## Home Page

### 1. Fixed tile layout pattern (replaces manual column_span)
Remove `column_span` (and the proposed `max_column_span`) from the manifest. The home page grid should use a fixed repeating row pattern, applied automatically from newest to oldest:

- Row 1: one 3-column tile
- Row 2: one 2-column tile, one 1-column tile
- Row 3: one 1-column tile, one 2-column tile
- Row 4: three 1-column tiles

This pattern consumes 7 articles per cycle, then repeats. Articles are always in reverse chronological order — the pattern controls the layout, not the manifest. Every post (article and video) must render correctly at any width (1, 2, or 3 columns).

### 2. Remove column_span from manifest.json
Since the layout is now algorithmically determined, remove the `column_span` field from the manifest schema in section 3.3 and from all manifest examples.

### 3. Video tile width
The Shinyribs video tile appears to be filling 2 columns despite having `column_span: 1` in the manifest. With the new fixed layout pattern, this should resolve itself — but verify that video tiles render correctly at all three widths (1, 2, and 3 columns).

### 4. Hero image tile text overlay width
On hero image tiles, the text overlay box (overline, headline, summary) should always be the width of one grid column, regardless of the tile's rendered column span. A 3-column tile has a 1/3-width text box. A 2-column tile has a 1/2-width text box. When the tile renders at 1 column (mobile, or constrained by row space), the text box fills the full tile width.

### 4a. Unbordered callout tiles (future release)
GatesNotes uses unbordered tiles for quotes, links, and editorial callouts to break up the visual rhythm. Defer this to a later release — get article and video tiles working first.

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

### 8. Floating header
The header should float above the content like the GatesNotes header: set `top: 18px` (not `top: 0`), constrain its width to `max-width: var(--max-content)` so it matches the content width below, center it with `margin: 0 auto`, and add `border-radius: 8px` for rounded corners. No box-shadow — use only the existing thin bottom border. Change `position` from `sticky` to `fixed` so it stays in place while content scrolls behind it and is visible in the gap above and to the left and right of the header. Add `padding-top` to the body or main content to account for the header no longer being in the document flow.

---

## Navigation

### 9. Nav links are hardcoded in article pages
Article HTML files have the nav links hardcoded rather than loading them from `nav.js`. This works for now, but means adding a new nav link (e.g., "Music") requires updating every existing article HTML file. The spec (section 1.7) says navigation should be configurable. Flag for the blog-manager: when generating article HTML, nav links should come from a shared config, not be baked in.

---

## Spec Updates Needed

### 10. Update Appendix A — tag filter mechanism
The implementor chose URL parameters (`?filter=<tag>`) for filtering. Appendix A still says "implementor's choice." Update to reflect the resolution.

### 11. Rewrite section 1.3 home page layout
Replace the manual `column_span` description with the fixed repeating row pattern: (3), (2,1), (1,2), (1,1,1). Document that every post must support all three widths. Remove references to `column_span` from the manifest throughout the spec.

### 12. Add hero image tile text overlay width rule to section 1.3.2.2
Document that the text overlay box is always 1 grid column wide, regardless of tile span.

### 13. Add hero image full-width rule to section 1.4
Document that the article page hero image should span up to ~1200px (wider than the 700px text column), centered.

### 14. Update section 2.5 header description
Update to describe the floating header: 18px from top, content-width, rounded corners, no shadow, content visible behind and around it.
