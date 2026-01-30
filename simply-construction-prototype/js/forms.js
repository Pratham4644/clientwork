/**
 * Prototype - Form Validation & UX
 * Version: 1.0.0
 */

(function () {
  'use strict';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;

  function showError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('error');
    let errEl = group.querySelector('.error-message');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'error-message';
      input.parentNode.appendChild(errEl);
    }
    errEl.textContent = message;
  }

  function clearError(input) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('error');
    const errEl = group.querySelector('.error-message');
    if (errEl) errEl.textContent = '';
  }

  function validateEmail(email) {
    return emailRegex.test(email.trim());
  }

  function validatePhone(phone) {
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  function validateRequired(value) {
    return value.trim().length > 0;
  }

  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(function (input) {
        clearError(input);
        if (!validateRequired(input.value)) {
          showError(input, 'This field is required.');
          valid = false;
        }
      });

      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value && !validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address.');
        valid = false;
      }

      const phoneInput = form.querySelector('input[type="tel"]');
      if (phoneInput && phoneInput.value && !validatePhone(phoneInput.value)) {
        showError(phoneInput, 'Please enter a valid phone number.');
        valid = false;
      }

      if (valid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
          setTimeout(function () {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#27ae60';
            form.reset();
            setTimeout(function () {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Send Message';
              submitBtn.style.background = '';
            }, 3000);
          }, 1000);
        }
      }
    });

    form.querySelectorAll('input, textarea, select').forEach(function (input) {
      input.addEventListener('blur', function () {
        if (input.hasAttribute('required') && !validateRequired(input.value)) {
          showError(input, 'This field is required.');
        } else {
          clearError(input);
        }
      });
    });
  }

  function initQuoteModal() {
    const quoteTriggers = document.querySelectorAll('[data-open-quote]');
    const quoteModal = document.querySelector('#quote-modal');
    const quoteClose = document.querySelector('#quote-modal .modal__close');

    if (!quoteModal) return;

    function openQuote() {
      quoteModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeQuote() {
      quoteModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    quoteTriggers.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openQuote();
      });
    });

    if (quoteClose) quoteClose.addEventListener('click', closeQuote);
    quoteModal.addEventListener('click', function (e) {
      if (e.target === quoteModal) closeQuote();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && quoteModal.classList.contains('open')) closeQuote();
    });
  }

  function initLoginForm() {
    const form = document.querySelector('.auth-card form');
    if (!form || !form.action || form.closest('.auth-page') === null) return;

    form.addEventListener('submit', function (e) {
      const email = form.querySelector('input[type="email"], input[name="email"]');
      const password = form.querySelector('input[type="password"]');
      let valid = true;

      if (email && !validateEmail(email.value)) {
        showError(email, 'Please enter a valid email.');
        valid = false;
      }
      if (password && !validateRequired(password.value)) {
        showError(password, 'Password is required.');
        valid = false;
      }

      if (!valid) e.preventDefault();
    });
  }

  function initRegisterSteps() {
    const form = document.querySelector('.register-form');
    if (!form) return;

    const steps = form.querySelectorAll('.register-step-content');
    const stepIndicators = form.querySelectorAll('.register-step');
    if (steps.length < 2) return;

    let currentStep = 0;

    function showStep(index) {
      steps.forEach(function (s, i) {
        s.style.display = i === index ? 'block' : 'none';
      });
      stepIndicators.forEach(function (s, i) {
        s.classList.remove('active');
        if (i < index) s.classList.add('done');
        else s.classList.remove('done');
        if (i === index) s.classList.add('active');
      });
      currentStep = index;
    }

    form.querySelectorAll('[data-next-step]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentStep < steps.length - 1) showStep(currentStep + 1);
      });
    });

    form.querySelectorAll('[data-prev-step]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentStep > 0) showStep(currentStep - 1);
      });
    });

    showStep(0);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initQuoteModal();
    initLoginForm();
    initRegisterSteps();
  });
})();

