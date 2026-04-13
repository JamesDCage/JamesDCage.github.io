/**
 * home.js
 * Renders the home page article grid from the manifest, with tag filtering
 * and infinite scroll.
 */

(function () {
  'use strict';

  const MANIFEST_URL   = '/manifest.json';
  const TILES_PER_PAGE = 9;

  // Fixed repeating row pattern: row1=span3, row2=(2,1), row3=(1,2), row4=(1,1,1)
  // Repeats every 7 articles: [3, 2, 1, 1, 2, 1, 1]
  const LAYOUT_PATTERN = [3, 2, 1, 1, 2, 1, 1];

  // ─── State ────────────────────────────────────────────────────────────────
  let allPosts   = [];   // all manifest entries, sorted newest-first
  let filtered   = [];   // posts after applying the active filter
  let loadedCount = 0;   // how many tiles are currently rendered
  let observer   = null; // IntersectionObserver for infinite scroll

  // ─── DOM references ───────────────────────────────────────────────────────
  const grid     = document.getElementById('tile-grid');
  const sentinel = document.getElementById('scroll-sentinel');

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /** Returns the column span (1, 2, or 3) for a post at position idx in the filtered list. */
  function columnSpanForIndex(idx) {
    return LAYOUT_PATTERN[idx % LAYOUT_PATTERN.length];
  }

  /** Returns the active filter string from ?filter=, or null. */
  function activeFilter() {
    return new URLSearchParams(window.location.search).get('filter') || null;
  }

  /** Sorts posts newest-first by date. */
  function sortByDate(posts) {
    return posts.slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  /** Filters posts by tag. */
  function applyFilter(posts, tag) {
    if (!tag) return posts;
    return posts.filter(function (p) {
      return Array.isArray(p.tags) && p.tags.includes(tag);
    });
  }

  /**
   * Extracts a YouTube video ID from a watch URL or embed URL.
   * e.g. "https://www.youtube.com/watch?v=dQw4w9WgXcQ" → "dQw4w9WgXcQ"
   */
  function youtubeId(url) {
    if (!url) return null;
    var match = url.match(/[?&]v=([^&]+)/) || url.match(/embed\/([^?&]+)/);
    return match ? match[1] : null;
  }

  // ─── Tile builders ────────────────────────────────────────────────────────

  /**
   * Builds a tile <article> element for a single manifest entry.
   * idx is the post's position in the full filtered list (used for layout pattern).
   * Dispatches to the correct tile builder based on post type and image_type.
   */
  function buildTile(post, idx) {
    var article = document.createElement('article');
    var span = columnSpanForIndex(idx);
    article.className = 'tile span-' + span;
    article.setAttribute('data-tags', JSON.stringify(post.tags || []));

    if (post.type === 'video') {
      article.classList.add('tile--video');
      article.appendChild(buildVideoTileContent(post));
    } else if (post.image_type === 'hero') {
      article.classList.add('tile--hero');
      article.appendChild(buildHeroTileContent(post));
    } else {
      article.classList.add('tile--main');
      article.appendChild(buildMainTileContent(post));
    }

    return article;
  }

  /** Tile for posts with a main image (text above, image below). */
  function buildMainTileContent(post) {
    var a = document.createElement('a');
    a.href = post.url;
    a.className = 'tile-link';

    var textDiv = document.createElement('div');
    textDiv.className = 'tile-text';
    textDiv.appendChild(makeOverline(post.overline));
    textDiv.appendChild(makeTitle(post.title));
    textDiv.appendChild(makeSummary(post.summary));

    var imgDiv = document.createElement('div');
    imgDiv.className = 'tile-image';
    imgDiv.appendChild(makeImg(post.image_url, post.title));

    a.appendChild(textDiv);
    a.appendChild(imgDiv);
    return a;
  }

  /** Tile for posts with a hero image (image fills tile, text overlay). */
  function buildHeroTileContent(post) {
    var a = document.createElement('a');
    a.href = post.url;
    a.className = 'tile-link';

    var img = makeImg(post.image_url, post.title);
    img.className = 'tile-hero-image';

    var overlay = document.createElement('div');
    overlay.className = 'tile-hero-overlay';
    overlay.appendChild(makeOverline(post.overline));
    overlay.appendChild(makeTitle(post.title));
    overlay.appendChild(makeSummary(post.summary));

    a.appendChild(img);
    a.appendChild(overlay);
    return a;
  }

  /** Tile for video-only posts (image top 5/6, caption bar bottom 1/6). */
  function buildVideoTileContent(post) {
    var vid = youtubeId(post.video_url);
    var videoPageUrl = vid
      ? '/video.html?v=' + encodeURIComponent(vid) + '&caption=' + encodeURIComponent(post.video_caption || '')
      : '#';

    var a = document.createElement('a');
    a.href = videoPageUrl;
    a.className = 'tile-link';

    // Image wrap
    var imgWrap = document.createElement('div');
    imgWrap.className = 'tile-video-image-wrap';

    var img = makeImg(post.image_url, post.video_caption || post.title);
    imgWrap.appendChild(img);

    // Play icon
    var play = document.createElement('div');
    play.className = 'tile-video-play';
    play.setAttribute('aria-hidden', 'true');
    play.textContent = '▶';
    imgWrap.appendChild(play);

    // Caption bar
    var caption = document.createElement('div');
    caption.className = 'tile-video-caption';
    caption.textContent = post.video_caption || '';

    a.appendChild(imgWrap);
    a.appendChild(caption);
    return a;
  }

  // ─── Element factories ────────────────────────────────────────────────────

  function makeOverline(text) {
    var p = document.createElement('p');
    p.className = 'tile-overline';
    p.textContent = text || '';
    return p;
  }

  function makeTitle(text) {
    var h2 = document.createElement('h2');
    h2.className = 'tile-title';
    h2.textContent = text || '';
    return h2;
  }

  function makeSummary(text) {
    var p = document.createElement('p');
    p.className = 'tile-summary';
    p.textContent = text || '';
    return p;
  }

  function makeImg(src, alt) {
    var img = document.createElement('img');
    img.src = src || '';
    img.alt = alt || '';
    img.loading = 'lazy';
    return img;
  }

  // ─── Rendering ────────────────────────────────────────────────────────────

  /** Appends the next batch of tiles to the grid. */
  function renderNextBatch() {
    var batch = filtered.slice(loadedCount, loadedCount + TILES_PER_PAGE);
    if (batch.length === 0) {
      disconnectObserver();
      return;
    }

    var startIdx = loadedCount; // capture before incrementing
    var frag = document.createDocumentFragment();
    batch.forEach(function (post, batchIdx) {
      frag.appendChild(buildTile(post, startIdx + batchIdx));
    });
    grid.appendChild(frag);
    loadedCount += batch.length;

    if (loadedCount >= filtered.length) {
      disconnectObserver();
    }
  }

  /** Clears the grid and re-renders from the beginning. */
  function renderGrid() {
    // Remove all tiles but keep the sentinel
    var tiles = grid.querySelectorAll('.tile');
    tiles.forEach(function (t) { t.remove(); });
    loadedCount = 0;

    renderNextBatch();
    setupObserver();
  }

  // ─── Infinite scroll ──────────────────────────────────────────────────────

  function setupObserver() {
    disconnectObserver();
    if (!sentinel || loadedCount >= filtered.length) return;

    observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        renderNextBatch();
      }
    }, { rootMargin: '200px' });

    observer.observe(sentinel);
  }

  function disconnectObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  // ─── Filter ───────────────────────────────────────────────────────────────

  /** Applies the current URL filter and re-renders the grid. */
  function applyCurrentFilter() {
    var tag = activeFilter();
    filtered = applyFilter(allPosts, tag);
    renderGrid();
  }

  // ─── Bootstrap ────────────────────────────────────────────────────────────

  function init() {
    if (!grid) return; // not on the home page

    fetch(MANIFEST_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load manifest: ' + res.status);
        return res.json();
      })
      .then(function (data) {
        allPosts = sortByDate(data);
        applyCurrentFilter();
      })
      .catch(function (err) {
        console.error(err);
        grid.innerHTML = '<p class="tile-grid-loading">Unable to load articles.</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
