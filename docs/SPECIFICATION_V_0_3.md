# Blog Site — Specification

**Version:** 0.3  
**Date:** April 12, 2026  
**Author:** James  
**Status:** Draft  

---
## Overview
This document defines the design, structure, and behavior of a personal blog website. It is intended as a complete specification for an LLM developer building the site. The site will serve approximately 20 readers at launch. It must be responsive (desktop and mobile), elegant, and reading-focused.

The website will not include an editor for blog posts, or any user-facing mechanism to schedule or post new articles. The blog posts will be generated in an external program as HTML files (one file per blog post). The blog site will use client-side code to incorporate and display the blog posts. 

The reference site is GatesNotes. This spec captures the patterns and principles that make that site work, adapted for a small personal blog with no commercial purpose. Wherever this document says "like GatesNotes," it means the functional pattern — not a visual copy.

---

## Part 1: What the Site Does


### 1.1 Purpose and Audience
The owner wants to replace social media as a way to stay in touch with friends and family. He also occasionally has fiction and non-fiction articles published on sites such as Medium, and wants a way to post about those successes. The owner is an avid reader and would like to share his reviews of books, movies, board games, and other products and experiences.

### 1.2 Site Map
The complete list of pages and their URL patterns.

### 1.3 Home Page
The default landing page, showing all available articles as tiles in reverse chronological order. This will be an "infinite scroll", with on-demand loading of new articles as the user scrolls to the bottom of the list. 

When displayed on a large monitor, the home page will consist of a 3 column grid. Individual tiles may occupy 1, 2, or 3 columns, but will always be 1 row high. The layout of the tile will vary based on how it is displayed and the type of content (see below). 

#### 1.3.1 Video-only Posts

The user will post videos in addition to article-type blog posts. The tile for videos will be structured the same for 1, 2, and 3-column wide display: A static image taken from the video will occupy the upper 5/6ths of the frame. The bottom of the frame will have a caption in black text on a light gray background. The caption text will be san-serif. Clicking anywhere in the tile will open a page on my site that displays the videos. The background of this page will be black with a close icon in the upper-right corner of the page. Clicking the close icon will return the user to the previous page. Videos will be posted on YouTube. The page displaying them should block "related videos" from appearing when the video has ended, if possible.

The image below shows two examples of video-only tiles. 

![Example of Tiles and Videos](images/tile-video-tile-examples.jpg)


#### 1.3.2 Blog Posts

All blog posts that are not video-only will include body text and at least one image.   

Here is an example of a blog post tile. 

![Example of Blog Post Tile](images/tile-1column-image-under.jpg)

The following will be present on all blog post tiles:

* **Overline:** An "eyebrow headline" or kicker to set context. In the example above, the Overline is "TURN UP THE HEAT." This will be in a san-serif font on the tile. 
* **Headline:** The primary article title, rendered in a bold, high-contrast serif font. In the example: "Utah’s hottest new power source is 15,000 feet below the ground." This will be a serif font.
* **Summary:** A brief lead-in or excerpt that provides a preview of the content. In the example: "I recently visited Cape Station, the future home of the world’s largest enhanced..." This will be a san-serif font. 
* **Featured Image:** A visual anchor for the article. The Featured image may be a Main Image or a Hero Image. See below for placement of the image. 

Clicking any text element on the tile will open the blog post. 

All posts will have a "main image" or a "hero image" (but not both). The image will be identified in the `manifest.json` file as either a main or a hero. The layout of the tile will vary based on the type of image (see below).


##### 1.3.2.1 Posts With Main Images

Posts that have a main image will display that image below the summary on its tile. See the example in "Section 1.3.2 Blog Posts". 


##### 1.3.2.2 Hero Image Blog Posts 

On tiles for posts that contain a "hero image", the image will fill the tile. The Overline, Headline, and Summary will appear in a 1-column wide gray box. Here is an example of a 2-column wide tile with a hero image:

![Example of Blog Post With Hero Image Tile](images/tile-2-column-hero-image.jpg)




### 1.4 Article Page
The main or hero image for the article will appear at the top of the Article Page, filling the full width of the reading area. The Overline, Headline, and Summary will appear under the image. On the Aricle page, the Overline will be in a san-serif font, the headline in a serif font, and the summary in a san-serif font. 

The author's byline will appear under the summary: By James Cage, Published on <Day>, <Mmm>, <d>, <yyyy>. For example:

By James Cage, Published on Sunday, April 12, 2026.

The text of the article will follow with a two-line drop cap. The drop cap will be san-serif, and the text will be serif. 


### 1.5 About Page
TBD

### 1.6 Error Page
If a site URL does not exist, the site will display an error page. The error page will have a white background with the header and footer visible. A large "404" graphic will appear in the center of the page, with the words, "Uh Oh. That page doesn't exist" in san-serif font underneath. The 404 grpahic should show the number "404" in bold san-serif font in black. Here is an example of the 404 graphic:

![Example of 404 graphic](images/a-404-knockout_400x186.png)

### 1.7 Navigation
What links exist, where they go, and how the menu behaves on different devices.

### 1.8 Tagging and Filtering
How articles are categorized behind the scenes and how readers can narrow the article list.

---

## Part 2: What the Site Looks Like

### 2.1 Design Philosophy

The site exists to be read. Every design decision serves the reading experience. These principles are non-negotiable:

**Content dominates.** No sidebars, no widgets, no social sharing buttons, no visual clutter competing with the article text. The page is the article. Everything else gets out of the way.

**Generous whitespace.** Space between elements creates calm. GatesNotes uses wide margins around a constrained content column, leaving the majority of the screen on desktop as breathing room. This is intentional, not wasted space. The blog should feel spacious, not packed.

**Minimal navigation.** The site has very few pages. Navigation should be a quiet presence — always available, never demanding attention. GatesNotes keeps its nav bar to a logo and a handful of links. This blog should have fewer.

**Warm and personal.** This is not a corporate site or a news outlet. The tone should feel like opening a letter, not visiting a storefront. Design choices — color warmth, font personality, casual image treatment — should reinforce that this is one person writing for people he knows.

**Works without images.** Many articles will be pure text. The design must look complete and intentional with no images at all — not like a template with a missing photo. GatesNotes relies heavily on hero images; this blog cannot, and the design must account for that.

**Works with images.** When an article includes a hero image or inline images, they should feel natural and well-integrated, not bolted on.

### 2.2 Layout

GatesNotes uses a centered, constrained content column on article pages. The text does not stretch to fill the browser window. On a wide desktop monitor, the article text occupies roughly 700-720px of width in the center, with the rest of the screen as margin. This keeps line length in the 55-75 character range — the typographic standard for comfortable sustained reading.

**Article page layout:**
- Content column: maximum width of approximately 700px, centered horizontally.
- On desktop, the content column sits in the middle of the viewport with generous empty margins. These margins are part of the design — they rest the eye and focus attention on the text.
- On tablet, the content column widens slightly relative to the viewport but maintains comfortable side padding (32-40px).
- On mobile, the content fills the viewport width with 16-24px of side padding.

**Home page layout:**
- The home page has a wider content area than the article page, to accommodate article cards.
- Maximum content width: approximately 1000-1100px, centered.
- GatesNotes leads with a large featured article card (the most recent post), followed by a grid of smaller cards for older articles.
- Below the hero card, articles are arranged in a responsive grid: 2-3 columns on desktop, 2 on tablet, 1 on mobile.

**All pages share a common header and footer.** The content area between them varies by page type.

### 2.3 Typography

The site uses two font families: a serif for body text and headlines (matching the literary, warm personality in 2.1), and a sans-serif for overlines, summaries, navigation, captions, and metadata (matching GatesNotes' clean supporting text).

**Font families:**

- **Serif (headlines and body text):** Lora (Google Fonts). Lora is a well-balanced serif designed for screen reading, with good contrast and a warm personality. Fallback stack: `"Lora", Georgia, serif`.
- **Sans-serif (overlines, summaries, navigation, metadata, captions):** Inter (Google Fonts). Inter is a highly readable sans-serif designed for screens, with clean lines and neutral personality. Fallback stack: `"Inter", "Helvetica Neue", Arial, sans-serif`.

**Font loading:** Load both from Google Fonts with `font-display: swap` so text renders immediately with system font fallbacks.

| Element | Font | Size | Weight | Line height |
|---------|------|------|--------|-------------|
| Body text | Lora (serif) | 19px | Normal (400) | 1.65 |
| Article headline | Lora (serif) | 36px | Bold (700) | 1.15 |
| Overline | Inter (sans-serif) | 13px | Semi-bold (600), uppercase, letter-spacing 1px | 1.3 |
| Summary/excerpt | Inter (sans-serif) | 16px | Normal (400) | 1.5 |
| H2 in article | Lora (serif) | 26px | Bold (700) | 1.25 |
| H3 in article | Lora (serif) | 21px | Semi-bold (600) | 1.3 |
| Navigation links | Inter (sans-serif) | 15px | Normal (400) | — |
| Date/byline | Inter (sans-serif) | 14px | Normal (400) | 1.4 |
| Captions | Inter (sans-serif) | 14px | Normal (400) | 1.4 |
| Drop cap | Inter (sans-serif) | ~3.5em | Bold (700) | — |

**Text color:** Body text is dark gray (#333333) on an off-white background. Not pure black on pure white — the softer contrast reduces eye strain for sustained reading.

**Text alignment:** Always left-aligned. Never justified — justified text creates uneven word spacing on the web.

**Paragraph spacing:** 1.3em between paragraphs. No first-line indent — use space between paragraphs instead.

### 2.4 Color Palette

The site uses a restrained, GatesNotes-inspired palette. Color is used for links and occasional UI elements, not for decoration. There is no dark mode.

| Role | Value | Notes |
|------|-------|-------|
| Page background | #FAFAFA | Warm off-white. Not pure white — avoids a clinical feel. |
| Content/card background | #FFFFFF | White cards on the off-white page create subtle lift. |
| Body text | #333333 | Dark gray. Softer than pure black for sustained reading. |
| Headline text | #222222 | Slightly darker than body for emphasis through density, not color. |
| Muted text (dates, captions, metadata) | #888888 | Medium gray. Informational, not prominent. |
| Overline text | #555555 | Darker than muted, but not as strong as body text. |
| Links | #1A73E8 | Blue, similar to GatesNotes. Sufficient contrast on white/off-white. |
| Link hover | #0D47A1 | Darker blue on hover. |
| Card borders/shadows | `rgba(0,0,0,0.08)` | Very subtle box-shadow. Not a hard border. |
| Card hover shadow | `rgba(0,0,0,0.15)` | Slightly deeper on hover to indicate interactivity. |
| Header background | #FFFFFF | White, with a thin bottom border or subtle shadow. |
| Header border | #E0E0E0 | Thin 1px bottom border to separate from content. |
| Footer text | #999999 | Light gray. Understated. |
| Accent color | #1A73E8 | Same as link color. Used sparingly — links and active filter tags only. |

### 2.5 Header and Footer

**Header:**

GatesNotes uses a clean top bar with the site name/logo on the left and a small number of navigation links on the right. The header has a white or light background, a thin bottom border or subtle shadow, and does not demand attention.

- Site name or logo: left-aligned. Text-based is fine (no graphic logo needed). Set in the heading font at a moderate size — large enough to identify the site, not so large it dominates the page.
- Navigation links: right-aligned. Home, About, and possibly one more. Three links maximum on the bar.
- **Sticky behavior:** The header is sticky — it remains fixed at the top of the viewport while scrolling, appearing over the content. It should have a white background so content does not show through.
- On tablet and mobile: navigation links collapse into a hamburger menu icon (three horizontal lines). Tapping it reveals the links as a dropdown, slide-in panel, or full-screen overlay.

**Footer:**

GatesNotes has a relatively substantial footer with links, social icons, and newsletter signup. For this blog, the footer should be minimal:

- A single line or small block at the bottom of every page.
- Contents: copyright notice (e.g., "© 2026 James"), optionally a short personal tagline or favorite quote.
- Visual style: small text, generous top margin separating it from content above. Muted color. Not a dark contrasting band — keep it light and part of the page, not a separate zone.

### 2.6 Home Page Design

GatesNotes opens with a large featured article that dominates the above-the-fold area, followed by a grid of article cards.

**Featured article (hero position):**

The most recent article occupies a prominent position at the top of the page.

- *With hero image:* Display the image large (full content width), with the article title overlaid on the lower portion of the image (white text on a darkened overlay) or positioned directly below the image. GatesNotes overlays text on images.
- *Without hero image:* Display a large title with the article's excerpt/preview on a clean background. This should look like a deliberate design choice, not a broken image. Consider a subtle background color or a typographic treatment that gives the title visual weight without needing a photo.
- The entire featured card is a clickable link to the full article.

**Article card grid (below hero):**

Older articles appear as cards in a responsive grid.

Each card contains:
- Article title (linked)
- Publication date
- Category or primary tag (optional, displayed as a small label)
- A 1-2 sentence excerpt or preview
- Thumbnail image if the article has a hero image; no image placeholder if it doesn't (do not use a generic stock placeholder)

Card styling:
- Subtle border or soft box-shadow to define the card boundary.
- Slight hover effect (e.g., shadow deepens, card lifts slightly) to indicate interactivity.
- Consistent card height within each row. Cards may span 1, 2, or 3 columns but are always 1 row high (see 1.3).

**Filter controls:**

Filtering is handled through navigation targets (e.g., "Reviews," "Music") rather than visible tag pills on the home page. Tags are behind the scenes — assigned in the manifest, not displayed on cards. When a reader selects a navigation target, the home page filters to show only articles with the matching tag. The implementation mechanism (JavaScript show/hide or URL parameters) is at the implementor's discretion.

### 2.7 Article Reading Experience

This is the most important page on the site. GatesNotes gives articles a clean, distraction-free reading environment. The blog should do the same.

**Article header:**
- Title: large, bold, at the top of the content column.
- Metadata line: date published, and optionally the primary tag. Displayed below the title in smaller, muted text. Not prominent.
- Hero image (if present): displayed full content-column width below the metadata, above the body text. If no hero image, the body text begins immediately after the metadata — no gap or empty space suggesting something is missing.
- An "originally published" note, if the article was first published elsewhere, displayed as a small italic line below the metadata.

**Body text:**
- Left-aligned, in the body font at 18-20px, with line height of 1.6-1.7.
- Paragraphs separated by whitespace (1.2-1.5em), no first-line indent.
- The reading column is the constrained 700px width described in 2.2.

**Block quotes:**
- Visually distinct from body text. GatesNotes uses a left border accent.
- Recommended: a 3-4px left border in the accent color or a muted gray, with the text slightly indented (20-40px left padding). Text may be in italic or in a slightly different color to differentiate from the author's voice.
- Block quotes should feel like a pause — a different voice — not just indented body text.

**Inline images:**
- Display at full content column width.
- Optional caption below in 14px muted text.
- Images should have explicit width and height attributes to prevent layout shift during loading.

**Inline links:**
- Clearly distinguishable from body text. Use the accent color, with either a persistent underline or an underline that appears on hover.
- Visited links may shift to a slightly muted shade of the accent color. *[OPTIONAL.]*

**Lists (bulleted and numbered):**
- Standard indentation. Adequate spacing between items (at least 0.5em) so items don't feel cramped.
- Bullet style: a simple disc or circle. Numbered lists use standard numerals.

**Code blocks (if ever used):**
- Monospaced font (system monospace stack is fine).
- Subtle background color (e.g., light gray) to distinguish from body text.
- Horizontal scroll if the content is too wide for the column.
- Inline code (within a sentence) also gets the monospaced font and a subtle background.

**Horizontal rules:**
- Used sparingly to indicate major section breaks within an article.
- Thin, muted, centered. Not a heavy black line.

**Article footer area:**
- A subtle visual break (whitespace or a light horizontal rule) between the end of the article and the page footer.

### 2.8 Responsive Behavior

The site must work well on three device classes. GatesNotes handles this smoothly — the layout reflows without feeling like a different site on each device.

**Desktop (viewport width > 1024px):**
- Article content column: ~700px, centered with large side margins.
- Home page content area: ~1000-1100px, centered.
- Article cards in 2-3 column grid.
- Navigation links visible in header.
- Full hover effects on cards and links.

**Tablet (viewport width 768px–1024px):**
- Article content column fills more of the width; side margins shrink but remain comfortable (32-40px).
- Home page card grid reduces to 2 columns.
- Navigation collapses to hamburger menu (matching GatesNotes behavior on tablet).
- Touch-friendly tap targets (minimum 44px height).

**Mobile (viewport width < 768px):**
- Article content column fills viewport with 16-24px side padding.
- Home page cards stack in a single column.
- Navigation collapses to hamburger menu.
- Hero/featured article image scales to full width, maintaining aspect ratio.
- Font sizes may decrease slightly but body text must not go below 16px.
- Touch-friendly tap targets throughout.
- No hover effects (hover is not meaningful on touch devices). Interactive feedback comes from active/pressed states instead.

**Breakpoint strategy:** Use CSS media queries at 768px and 1024px. Design mobile-first — the base CSS should be the mobile layout, with media queries adding complexity for larger screens.

### 2.9 Image Handling

**Hero images:**
- Displayed at full content-column width on the article page.
- Displayed large on the home page for the featured article.
- Displayed as thumbnails in article cards.
- Aspect ratio preserved always — never stretched or cropped to fit a fixed container unless specifically designed for that (e.g., a fixed-ratio card thumbnail may crop).
- All hero images should have descriptive `alt` text.

**Inline images (within article body):**
- Full content-column width by default.
- Optional caption below.
- Responsive: `max-width: 100%` so they scale down on small screens.
- Must include `width` and `height` attributes in the HTML to prevent layout shift.

**No image:**
- When an article has no hero image, the design must still look intentional.
- On the home page card: the card should work as a text-only card — title, date, excerpt — without a blank image area or placeholder graphic.
- On the article page: the title and metadata flow directly into the body text with comfortable spacing.

**Image formats:**
- JPEG for photographs. WebP as a progressive enhancement if supported by the serving infrastructure.
- PNG for screenshots or graphics with sharp edges.
- All images should be reasonably optimized for file size before uploading.

### 2.10 Accessibility

**Color contrast:**
- All text must meet WCAG AA contrast ratios: 4.5:1 for body text (under 18px or under 14px bold), 3:1 for large text (18px+ or 14px+ bold).
- After the color palette is finalized, verify all text/background combinations with a contrast checker tool. The design consultation LLM should be asked to verify this.

**Semantic HTML:**
- Use proper HTML5 elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`.
- One `<h1>` per page (the article title on article pages, the site name or "Recent Articles" on the home page).
- Heading levels must not skip (no jumping from H1 to H3).
- Navigation should be wrapped in `<nav>` with an `aria-label`.

**Keyboard navigation:**
- All interactive elements (links, buttons, filter controls, hamburger menu) must be reachable and operable via keyboard Tab/Enter/Space.
- Focus indicators must be visible — do not remove the browser's default focus outline without providing a styled alternative.

**Images:**
- All content images must have descriptive `alt` text.
- Decorative images (if any) must have `alt=""` so screen readers skip them.

**Font sizing:**
- Use relative units (`rem` or `em`) for font sizes so users can override with browser settings.
- Do not set a fixed pixel font-size on the `<html>` or `<body>` element that would prevent user scaling.

**Motion:**
- If any animations or transitions are used (e.g., card hover effects), they should respect `prefers-reduced-motion` by providing a static alternative.

---

## Part 3: How It's Built

### 3.0 

### 3.1 Technology Stack

### 3.2 Project Directory Structure

The following directory structure is proposed, however, the implementor will have freedom to add directories and files as needed. Any additions or changes must be documented here by the implementor. 

PRIME DIRECTIVE: The `JamesDCage.github.io/img` directory and its existing contents must NOT be modified, renamed, added to, or deleted under any circumstances!!!

```
JamesDCage.github.io/
├── index.html           # Homepage 
├── manifest.json        # Global site data for client-side JS-driven filtering
├── img/                 # [SYSTEM RESERVED] - DO NOT MODIFY!!
├── assets/              # Global site-wide design assets
│   ├── css/
│   │   └── main.css     # Typography and layout (GatesNotes clone)
│   └── js/
│       └── router.js    # Client-side JS to fetch manifest and render views
└── posts/               # All blog content
    ├── images/          # Images specific to blog posts (e.g., drone shots)
    │   ├── 2026-04-10-solar-panel.jpg
    │   └── 2026-04-05-book-cover.png
    ├── 2026-04-10-future-of-energy.html
    ├── 2026-04-05-gatsby-review.html
    └── 2026-03-20-meet-james.html
```

### 3.3 manifest.json Structure, Contents, and Role

The manifest file will list the available blog posts along with information necessary for sorting and filtering the posts. See below for a proposed structure of the file. Implementer can add to or modify this structure, but must update this document if so. 

```
[
  {
    "title": "Review: The Great Gatsby",
    "slug": "2026-04-10-gatsby-review",
    "date": "2026-04-10",
    "tags": ["Reviews", "Books"],
    "url": "/posts/2026-04-10-gatsby-review.html"
  },
  {
    "title": "A New Chapter in Gwinnett Services",
    "slug": "2026-04-05-gwinnett-publication",
    "date": "2026-04-05",
    "tags": ["Work"],
    "url": "/posts/2026-04-05-gwinnett-publication.html"
  },
  {
    "title": "My Favorite Books",
    "slug": "2026-03-20-favorite-books",
    "date": "2026-03-20",
    "tags": ["Meet James", "Reviews"],
    "url": "/posts/2026-03-20-meet-favorite-books.html"
  }
]
```




### 3.4 Blog Post Structure and Tags

Blog posts will have HTML tags, but no style information. All styles will be defined in one or more CSS files. 

Implementor shall define the HTML tags needed in each blog post file and document them here. 





### 3.6 Single-Purpose Module Design

Modules should do one thing and do it well. A developer reading a module's filename and docstring should know what it contains without opening it. A developer opening it should be able to read it in one sitting.

**Principles:**

**Each module has a single, stated purpose.** The module docstring declares what the module is responsible for. If the docstring requires the word "and," the module is probably doing two things. For example, a module that "manages article loading" is focused; a module that "manages article loading and renders the home page" should be two modules.

**Modules communicate through public interfaces.** A module exposes a small set of public methods or classes. Other modules call those methods rather than reaching into internal state, private attributes, or widget hierarchies. This means a module can be rewritten internally without breaking its callers.

**Dependencies flow in one direction.** A module receives what it needs — through constructor arguments, method parameters, or callbacks — rather than importing and accessing other modules' internals. When module A needs something from module B, it should be clear from A's constructor or function signatures, not hidden in the middle of a method body.

**Keep modules short enough to read as a unit.** There is no hard line count, but when a module grows long enough that a developer loses track of its contents, it should be split. As a practical guideline, a module over 300 lines likely contains more than one purpose. A module under 50 lines may not justify its own file. These are signals to reconsider, not rules to enforce.

**The application entry point reads like a table of contents.** The top-level module should show what the application is made of — what components exist, how they connect, and what starts the application. Implementation details live in the modules it references. A new developer reading only this file should understand the application's structure.

---

## Appendices

### A. Open Design Decisions
A collected list of unresolved choices that need to be made before or during implementation.

No open decsions at this time. 

**Resolved decisions (for reference):**

| Decision | Resolution |
|----------|-----------|
| Sticky header | Yes — fixed at top, appears over content (2.5) |
| Card grid layout | 3-column, consistent row height, tiles span 1/2/3 columns (1.3) |
| Body font | Lora (serif) for body/headlines, Inter (sans-serif) for supporting text (2.3) |
| Dark mode | No (2.4) |
| Hamburger on tablet | Yes — collapses on tablet and mobile (2.5, 2.8) |
| Previous/Next links | No (2.7) |
| Article metadata format | Separate manifest.json file (3.3) |

### B. Out of Scope
Features handled by the separate local management application, not by this website:

- Newsletter generation and sending
- Subscriber management
- Article tracking (which articles have been published, sent in newsletters, etc.)
- Markdown to HTML conversion and preview
- Content publishing

### C. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 0.0 | 2026-04-01 | Structure draft — headings only |
| 0.1 | 2026-04-01 | Added Part 1.1 content, Part 3 content, section descriptions |
| 0.2 | 2026-04-06 | Changed from Flask to Django. Populated Part 2 from GatesNotes analysis. Added open design decisions appendix. |
| 0.3 | 2026-04-12 | Resolved open design decisions. Set fonts (Lora serif + Inter sans-serif), color palette, sticky header, tablet hamburger, no dark mode, no prev/next links. Cleaned up Part 2 throughout. |
