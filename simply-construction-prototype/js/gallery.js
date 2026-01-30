/**
 * Simply Construction - Image Gallery, Lightbox, Project Filter
 * Version: 1.0.0
 */

(function () {
  'use strict';

  // Project filter
  function initProjectFilter() {
    const filterBar = document.querySelector('.filter-bar');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    if (!filterBar || !projectCards.length) return;

    filterBar.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach(function (card) {
        const cardCategory = card.getAttribute('data-category') || '';
        const show = category === 'all' || cardCategory.toLowerCase().indexOf(category.toLowerCase()) !== -1;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  // Lightbox
  function initLightbox() {
    const gallery = document.querySelectorAll('[data-lightbox]');
    let lightboxEl = document.querySelector('.lightbox');

    if (!lightboxEl) {
      lightboxEl = document.createElement('div');
      lightboxEl.className = 'lightbox';
      lightboxEl.innerHTML = '<div class="lightbox__content"><button class="lightbox__close" aria-label="Close">&times;</button><img src="" alt=""></div>';
      document.body.appendChild(lightboxEl);
    }

    const img = lightboxEl.querySelector('img');
    const closeBtn = lightboxEl.querySelector('.lightbox__close');

    function open(src, alt) {
      img.src = src;
      img.alt = alt || 'Image';
      lightboxEl.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightboxEl.classList.remove('open');
      document.body.style.overflow = '';
    }

    gallery.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href') || this.getAttribute('data-src');
        const alt = this.getAttribute('data-alt') || this.querySelector('img')?.alt || '';
        if (href) open(href, alt);
      });
    });

    document.querySelectorAll('.project-card img, .blog-card__image img').forEach(function (imgEl) {
      imgEl.parentElement.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
          open(e.target.src, e.target.alt);
        }
      });
    });

    closeBtn.addEventListener('click', close);
    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxEl.classList.contains('open')) close();
    });
  }

  // Lazy load images
  function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src') || img.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '50px' }
    );

    images.forEach(function (img) {
      observer.observe(img);
    });
  }

  // FAQ accordion
  function initFaqAccordion() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      const question = item.querySelector('.faq-item__question');
      if (!question) return;

      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function (i) {
          i.classList.remove('open');
        });
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initProjectFilter();
    initLightbox();
    initLazyLoad();
    initFaqAccordion();
  });
})();
