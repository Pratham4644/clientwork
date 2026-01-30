/**
 * Prototype - Chatbot
 * Version: 1.0.0
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'simplyConstructionChat';

  const responses = {
    services: {
      text: 'We offer: Residential Construction, Commercial Building, Renovation & Remodeling, Interior Design, Project Management, and Consulting Services. <a href="services.html">View all services</a>',
      quickReplies: []
    },
    quote: {
      text: "I'd be happy to help you get a quote. I can open our contact form for you, or you can call us at (001) 2455 258 365.",
      quickReplies: [
        { label: 'Open Contact Form', action: 'openContact' },
        { label: 'Call Now', action: 'call' }
      ]
    },
    contact: {
      text: '📞 Phone: (001) 2455 258 365 | 📧 Email: info@simplyconstruction.com | 📍 Visit our <a href="contact.html">Contact page</a> for full details and a map.',
      quickReplies: []
    },
    projects: {
      text: 'Check out our completed projects! <a href="projects.html">View Projects Gallery</a>',
      quickReplies: []
    },
    hours: {
      text: 'Our business hours are: Monday - Friday 7:30 AM - 9:30 PM, Saturday 8:00 AM - 6:00 PM. Closed Sundays.',
      quickReplies: []
    },
    faq: {
      text: 'We have answers to common questions. <a href="faq.html">Visit our FAQ page</a>.',
      quickReplies: []
    },
    pricing: {
      text: 'We offer Basic, Standard, and Premium packages. <a href="pricing.html">View pricing</a> or request a custom quote.',
      quickReplies: []
    },
    timeline: {
      text: 'Typical timelines: Small renovation 2-4 weeks, Residential build 4-8 months, Commercial 6-18 months. Each project is unique—we\'ll provide a detailed timeline after consultation.',
      quickReplies: []
    },
    default: {
      text: "I can connect you with our team. Would you like to leave a message or get a callback? You can also fill out our <a href='contact.html'>contact form</a> or call (001) 2455 258 365.",
      quickReplies: [
        { label: 'Request a Quote', action: 'openContact' },
        { label: 'Talk to Human', action: 'human' }
      ]
    }
  };

  const triggers = {
    service: ['service', 'services', 'construction', 'build', 'renovation', 'remodel', 'residential', 'commercial'],
    quote: ['quote', 'price', 'cost', 'estimate', 'how much'],
    contact: ['contact', 'phone', 'email', 'address', 'where'],
    projects: ['project', 'projects', 'portfolio', 'work', 'completed'],
    hours: ['hour', 'hours', 'open', 'when', 'time', 'schedule'],
    faq: ['faq', 'question', 'help', 'what', 'how'],
    pricing: ['pricing', 'price', 'cost', 'package'],
    timeline: ['timeline', 'how long', 'duration', 'when finish', 'deadline']
  };

  function getResponse(message) {
    const lower = message.toLowerCase().trim();
    for (const [key, words] of Object.entries(triggers)) {
      if (words.some(function (w) { return lower.indexOf(w) !== -1; })) {
        return responses[key] || responses.default;
      }
    }
    return responses.default;
  }

  function renderQuickReplies(container, quickReplies, sendMessage) {
    if (!quickReplies || !quickReplies.length) return;
    container.innerHTML = quickReplies.map(function (r) {
      return '<button type="button" class="chatbot-quick-reply" data-action="' + (r.action || '') + '">' + r.label + '</button>';
    }).join('');
    container.querySelectorAll('.chatbot-quick-reply').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const action = this.getAttribute('data-action');
        if (action === 'openContact') {
          window.location.href = 'contact.html';
        } else if (action === 'call') {
          window.location.href = 'tel:+0012455258365';
        } else if (action === 'human') {
          sendMessage('Talk to Human');
        } else {
          sendMessage(this.textContent);
        }
      });
    });
  }

  function initChatbot() {
    const triggerBtn = document.querySelector('.chatbot-trigger');
    const windowEl = document.querySelector('.chatbot-window');
    if (!triggerBtn || !windowEl) return;

    const body = windowEl.querySelector('.chatbot-window__body');
    const input = windowEl.querySelector('.chatbot-input-row input');
    const sendBtn = windowEl.querySelector('.chatbot-send');
    const minimizeBtn = windowEl.querySelector('[data-chatbot-minimize]');
    const closeBtn = windowEl.querySelector('[data-chatbot-close]');

    let messages = [];
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) messages = JSON.parse(stored);
    } catch (e) { }

    function addMessage(text, isUser, quickReplies) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const msgEl = document.createElement('div');
      msgEl.className = 'chatbot-message chatbot-message--' + (isUser ? 'user' : 'bot');
      msgEl.innerHTML = '<div class="chatbot-message__text">' + text + '</div><span class="chatbot-message__time">' + time + '</span>';
      if (quickReplies && quickReplies.length) {
        const qrEl = document.createElement('div');
        qrEl.className = 'chatbot-quick-replies';
        msgEl.appendChild(qrEl);
        body.appendChild(msgEl);
        renderQuickReplies(qrEl, quickReplies, sendMessage);
      } else {
        body.appendChild(msgEl);
      }
      body.scrollTop = body.scrollHeight;
      messages.push({ text: text, isUser: isUser });
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (e) { }
    }

    function showTyping(callback) {
      const typing = document.createElement('div');
      typing.className = 'chatbot-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      body.appendChild(typing);
      body.scrollTop = body.scrollHeight;
      setTimeout(function () {
        typing.remove();
        if (callback) callback();
      }, 800);
    }

    function sendMessage(text) {
      if (!text || !text.trim()) return;
      addMessage(text.replace(/</g, '&lt;').replace(/>/g, '&gt;'), true);
      input.value = '';

      showTyping(function () {
        const res = getResponse(text);
        addMessage(res.text, false, res.quickReplies);
      });
    }

    triggerBtn.addEventListener('click', function () {
      windowEl.classList.toggle('open');
      triggerBtn.classList.remove('has-badge');
      if (windowEl.classList.contains('open') && messages.length === 0) {
        addMessage("Hi! 👋 I'm Simply Assistant. How can I help you today?", false, [
          { label: '🏗️ Our Services', action: '' },
          { label: '📋 Request a Quote', action: 'openContact' },
          { label: '📞 Contact Information', action: '' },
          { label: '💼 View Projects', action: '' },
          { label: '⏰ Business Hours', action: '' },
          { label: '❓ FAQ', action: '' }
        ]);
        const qr = body.querySelector('.chatbot-quick-replies');
        if (qr) {
          qr.querySelectorAll('.chatbot-quick-reply').forEach(function (btn) {
            btn.addEventListener('click', function () {
              const action = btn.getAttribute('data-action');
              if (action === 'openContact') window.location.href = 'contact.html';
              else sendMessage(btn.textContent);
            });
          });
        }
      }
    });

    if (minimizeBtn) minimizeBtn.addEventListener('click', function () { windowEl.classList.remove('open'); });
    if (closeBtn) closeBtn.addEventListener('click', function () { windowEl.classList.remove('open'); });

    sendBtn.addEventListener('click', function () {
      sendMessage(input.value);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendMessage(input.value);
    });

    // Restore history
    messages.forEach(function (m) {
      addMessage(m.text.replace(/</g, '&lt;').replace(/>/g, '&gt;'), m.isUser);
    });
    messages = [];
  }

  document.addEventListener('DOMContentLoaded', initChatbot);
})();

