/**
 * Simply Construction - Main Entry Point
 * Version: 1.0.0
 */

(function () {
  'use strict';

  // Preloader
  function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    let progress = 0;
    const bar = preloader.querySelector('.preloader__progress');
    const interval = setInterval(function () {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        bar.style.width = '100%';
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        setTimeout(function () {
          preloader.remove();
        }, 500);
      } else {
        bar.style.width = progress + '%';
      }
    }, 100);

    window.addEventListener('load', function () {
      clearInterval(interval);
      bar.style.width = '100%';
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(function () {
        preloader.remove();
      }, 500);
    });
  }

  // Set active nav link based on current page
  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || '';
    const current = (path === '' || path === 'index.html') ? 'index.html' : path;
    document.querySelectorAll('.main-nav__link[href]').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Sticky header shrink on scroll
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    const scrollHandler = function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  // Cookie consent
  function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-banner .btn');
    if (!banner || !acceptBtn) return;

    if (!localStorage.getItem('cookieConsent')) {
      setTimeout(function () {
        banner.classList.add('show');
      }, 2000);
    }

    acceptBtn.addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'true');
      banner.classList.remove('show');
    });
  }

  // Konami code easter egg
  function initKonamiCode() {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    document.addEventListener('keydown', function (e) {
      if (e.key === konami[index]) {
        index++;
        if (index === konami.length) {
          index = 0;
          const msg = document.createElement('div');
          msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:var(--color-primary-accent);color:var(--color-primary-dark);padding:16px 24px;border-radius:8px;font-weight:bold;z-index:9999;animation:fadeIn 0.3s ease;';
          msg.textContent = '🏗️ Simply Construction - Building Excellence Since 1953!';
          document.body.appendChild(msg);
          setTimeout(function () {
            msg.remove();
          }, 3000);
        }
      } else {
        index = 0;
      }
    });
  }

  // Init on DOM ready
  function init() {
    initPreloader();
    setActiveNav();
    initSmoothScroll();
    initStickyHeader();
    initCookieBanner();
    initKonamiCode();

    // Dispatch custom event for other scripts
    document.dispatchEvent(new CustomEvent('simplyConstructionReady'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
