# Prototype – Prototype

**Version:** 1.0.0  
**Stack:** Pure HTML5, CSS3, Vanilla JavaScript (no frameworks)  
**Design:** Mobile-first, responsive (CSS Grid, Flexbox, CSS Variables)

---

## Quick Start

1. **Open the site**  
   Open `index.html` in a browser, or run a local server (recommended for correct routing and assets):

   ```bash
   # From project root (simply-construction-prototype/)
   npx serve .
   # or
   python -m http.server 8000
   ```

2. **Navigate**  
   Use the main menu: Home, About, Services, Pages (Team, FAQ, Testimonials, Pricing, Careers, 404), Projects, Blog, Contact. Top bar: Login, Register, GET NOW.

3. **Chatbot**  
   Click the yellow chat button (bottom-right) to open Simply Assistant with quick replies and rule-based answers.

---

## File Structure

```
simply-construction-prototype/
├── index.html          # Homepage
├── about.html
├── services.html
├── projects.html
├── project-detail.html
├── blog.html
├── blog-post.html
├── contact.html
├── login.html
├── register.html
├── forgot-password.html
├── dashboard.html      # Client dashboard (prototype)
├── team.html
├── faq.html
├── testimonials.html
├── pricing.html
├── careers.html
├── 404.html
├── css/
│   ├── variables.css   # Design tokens (colors, typography, spacing)
│   ├── reset.css
│   ├── main.css
│   ├── navigation.css
│   ├── components.css
│   ├── pages.css
│   ├── responsive.css
│   └── chatbot.css
├── js/
│   ├── main.js         # Preloader, sticky header, smooth scroll, cookie banner
│   ├── navigation.js  # Mobile menu, dropdowns, search modal
│   ├── slider.js       # Hero slider, testimonials carousel
│   ├── animations.js   # Scroll reveal, counter animation
│   ├── forms.js       # Validation, quote modal, register steps
│   ├── gallery.js     # Project filter, lightbox, FAQ accordion, lazy load
│   └── chatbot.js     # Simply Assistant (rule-based)
├── images/             # Add logo.png, logo-white.png, favicon.ico, hero/, projects/, etc.
└── README.md
```

---

## Design System

- **Primary dark:** `#2c3e50`  
- **Accent:** `#f39c12`  
- **Secondary:** `#34495e`  
- **Fonts:** Montserrat (headings), Open Sans (body), Roboto (accent/numbers)

Breakpoints: mobile &lt; 768px, tablet 768–1023px, desktop 1024px+, large 1440px+.

---

## Features

- **Preloader** with progress bar  
- **Sticky header** that shrinks on scroll  
- **Hero slider** (4 slides, arrows, autoplay)  
- **Feature cards,** about, services preview, **projects grid** with filter (All / Residential / Commercial / Renovation)  
- **Stats counters** (70+ years, 500+ projects, 350+ clients, 50+ team)  
- **Testimonials** carousel with dots  
- **Blog** preview and full blog + sidebar  
- **Contact form** with validation (name, email, phone, subject, budget, message, file)  
- **Quote modal** (trigger: “Request Quote” on homepage; add `data-open-quote` on other pages to open the same modal)  
- **Search modal** (header search icon)  
- **Cookie consent** banner (Accept stores in `localStorage`)  
- **Chatbot** (Simply Assistant): quick replies, rule-based answers (services, quote, contact, projects, hours, FAQ, pricing, timeline), session history  
- **Login / Register / Forgot password** (UI only; register has 3-step flow)  
- **Dashboard** (sidebar: Dashboard, My Projects, Messages, Documents, Invoices, Profile; placeholder content)  
- **FAQ** accordion  
- **Pricing** (Basic / Standard / Premium)  
- **Careers** (job list + culture + apply CTA)  
- **404** branded page with search and nav  
- **Konami code** easter egg (↑↑↓↓←→←→BA)

---

## Customization

- **Images:** Replace Unsplash URLs in HTML with your own. Add `images/logo.png`, `images/logo-white.png`, `images/favicon.ico`, and folders (e.g. `hero/`, `projects/`, `team/`, `blog/`) as needed.  
- **Content:** Edit copy and links in each HTML file.  
- **Colors/fonts:** Adjust `css/variables.css`.  
- **Backend:** Contact form, login, register, and quote modal are front-end only; wire to your API and add a `.env` (see below) when you add server-side logic.

---

## Environment (for future backend)

Create a `.env` in the project root when you integrate a backend (e.g. form submission, auth):

```env
# .env.example – copy to .env and fill in
# API_BASE_URL=https://api.example.com
# CONTACT_FORM_ENDPOINT=/contact
# AUTH_ENDPOINT=/auth
```

Static prototype works without `.env`.

---

## Performance

- Lazy loading on images (`loading="lazy"`).  
- Minimal JS (vanilla, no jQuery).  
- CSS is split by concern; for production you can concatenate/minify.  
- Target: &lt;2s load, 90+ Lighthouse (optimize images and hosting for best results).

---

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses CSS Grid, Flexbox, and ES5-friendly JS.

---

## License & Contact

Prototype for client presentation. Replace placeholder content and assets before production.  
For questions or backend integration, refer to your development team or project brief.

