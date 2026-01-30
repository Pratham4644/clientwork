/**
 * Simply Construction - Navigation
 * Version: 1.0.0
 */

(function () {
  'use strict';

  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const body = document.body;

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 767) {
          toggle.classList.remove('active');
          nav.classList.remove('open');
          body.style.overflow = '';
        }
      });
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        body.style.overflow = '';
      }
    });
  }

  function initDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
      const toggle = dropdown.querySelector('.nav-dropdown__toggle');
      if (!toggle) return;

      toggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 767) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    });
  }

  function initSearchModal() {
    const searchTrigger = document.querySelector('.nav-search');
    const searchModal = document.querySelector('.search-modal');
    const searchClose = document.querySelector('.search-modal__close');
    const searchInput = document.querySelector('.search-modal input[type="search"], .search-modal input[type="text"]');

    if (!searchTrigger || !searchModal) return;

    searchTrigger.addEventListener('click', function () {
      searchModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (searchInput) {
        setTimeout(function () {
          searchInput.focus();
        }, 100);
      }
    });

    function closeSearch() {
      searchModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (searchClose) searchClose.addEventListener('click', closeSearch);

    searchModal.addEventListener('click', function (e) {
      if (e.target === searchModal) closeSearch();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchModal.classList.contains('open')) closeSearch();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initDropdowns();
    initSearchModal();
  });
})();
