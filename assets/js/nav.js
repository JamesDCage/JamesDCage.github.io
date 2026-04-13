/**
 * nav.js
 * Manages the site navigation bar: renders nav links from config,
 * marks the active link, and handles the hamburger menu toggle.
 */

// =============================================================================
// NAV LINK CONFIGURATION
// To add or remove navigation links, edit NAV_LINKS only.
// Each entry: { label: string, filter: string|null }
//   filter: null   → home (clears any active filter)
//   filter: 'Tag'  → filters home page to posts tagged with that value
// =============================================================================
const NAV_LINKS = [
  { label: 'Home',    filter: null },
  { label: 'Reviews', filter: 'Reviews' },
  { label: 'Videos',  filter: 'Videos' },
];

// ─────────────────────────────────────────────────────────────────────────────

(function () {
  'use strict';

  /** Returns the href for a nav link entry. */
  function linkHref(entry) {
    if (!entry.filter) return '/';
    return '/?filter=' + encodeURIComponent(entry.filter);
  }

  /** Returns true if the given entry matches the current page/filter state. */
  function isActive(entry) {
    const params = new URLSearchParams(window.location.search);
    const currentFilter = params.get('filter') || null;
    const onHome = (window.location.pathname === '/' ||
                    window.location.pathname === '/index.html');

    if (!onHome) return false; // non-home pages: no nav link is active
    return entry.filter === currentFilter;
  }

  /** Builds an <li><a> element for the desktop nav list. */
  function buildDesktopItem(entry) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = linkHref(entry);
    a.textContent = entry.label;
    a.className = 'site-nav__link';
    if (isActive(entry)) {
      a.setAttribute('aria-current', 'page');
    }
    li.appendChild(a);
    return li;
  }

  /** Builds an <li><a> element for the mobile nav list. */
  function buildMobileItem(entry) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = linkHref(entry);
    a.textContent = entry.label;
    a.className = 'site-nav__mobile-link';
    if (isActive(entry)) {
      a.setAttribute('aria-current', 'page');
    }
    li.appendChild(a);
    return li;
  }

  /** Populates the desktop nav list and mobile nav list from NAV_LINKS. */
  function renderNavLinks() {
    const desktopList = document.getElementById('nav-links');
    const mobileList  = document.getElementById('nav-links-mobile');

    if (desktopList) {
      NAV_LINKS.forEach(function (entry) {
        desktopList.appendChild(buildDesktopItem(entry));
      });
    }

    if (mobileList) {
      NAV_LINKS.forEach(function (entry) {
        mobileList.appendChild(buildMobileItem(entry));
      });
    }
  }

  /** Wires up the hamburger button to toggle the mobile menu. */
  function initHamburger() {
    const btn  = document.getElementById('nav-hamburger');
    const menu = document.getElementById('nav-mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu when a link inside it is clicked
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });

    // Close mobile menu when viewport becomes desktop-sized
    const mq = window.matchMedia('(min-width: 768px)');
    mq.addEventListener('change', function (e) {
      if (e.matches) {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function init() {
    renderNavLinks();
    initHamburger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
