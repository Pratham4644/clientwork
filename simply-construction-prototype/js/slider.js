/**
 * Simply Construction - Hero Slider & Testimonials Carousel
 * Version: 1.0.0
 */

(function () {
  'use strict';

  // Hero slider
  function initHeroSlider() {
    const slider = document.querySelector('.hero__slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero__slide');
    const prevBtn = document.querySelector('.hero__arrow--prev');
    const nextBtn = document.querySelector('.hero__arrow--next');

    if (slides.length < 2) {
      if (slides[0]) slides[0].classList.add('active');
      return;
    }

    let current = 0;
    let autoplay;

    function goTo(index) {
      slides[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startAutoplay() {
      autoplay = setInterval(next, 6000);
    }

    function stopAutoplay() {
      clearInterval(autoplay);
    }

    slides[0].classList.add('active');
    startAutoplay();

    if (prevBtn) prevBtn.addEventListener('click', function () { stopAutoplay(); prev(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stopAutoplay(); next(); startAutoplay(); });

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
  }

  // Testimonials carousel
  function initTestimonials() {
    const track = document.querySelector('.testimonials__track');
    const dots = document.querySelectorAll('.testimonials__dot');
    const slides = document.querySelectorAll('.testimonial-slide');

    if (!track || slides.length < 2) return;

    let current = 0;

    function goTo(index) {
      current = Math.max(0, Math.min(index, slides.length - 1));
      track.style.transform = 'translateX(-' + current * 100 + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
      });
    });

    goTo(0);

    // Optional: autoplay testimonials
    setInterval(function () {
      goTo((current + 1) % slides.length);
    }, 8000);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeroSlider();
    initTestimonials();
  });
})();
