/* =============================================
   NEZZEL PORTFOLIO — script.js
   Features:
   1. Theme toggle (dark/light)
   2. Mobile hamburger menu
   3. Active nav link on scroll
   4. Scroll-reveal animations
   5. Skill bar animations (triggered once in view)
   6. Smooth contact form handling
   ============================================= */


/* ── 1. THEME TOGGLE ───────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Load saved theme (or default to dark)
const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});


/* ── 2. MOBILE HAMBURGER MENU ──────────────── */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});


/* ── 3. ACTIVE NAV LINK ON SCROLL ─────────── */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const setActiveLink = () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.getAttribute('id');
    }
  });

  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink(); // Run once on load


/* ── 4. SCROLL-REVEAL ANIMATIONS ──────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Unobserve after revealing so it doesn't un-reveal
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


/* ── 5. SKILL BAR ANIMATIONS ──────────────── */
const skillBars = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width  = target.getAttribute('data-width');
      // Small delay so the reveal animation plays first
      setTimeout(() => {
        target.style.width = width + '%';
      }, 300);
      barObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));


/* ── 6. CONTACT FORM ───────────────────────── */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = contactForm.name.value.trim();
  const email   = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showStatus('⚠ Please fill in all fields.', '#f7856a');
    return;
  }

  if (!isValidEmail(email)) {
    showStatus('Please Enter Your Valid Email.', '#f7856a');
    return;
  }

  // Simulate sending (replace with real fetch/AJAX as needed)
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    showStatus('✓ Message sent! I\'ll get back to you soon.', 'var(--accent)');
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
  }, 1400);
});

function showStatus(message, color) {
  formStatus.textContent = message;
  formStatus.style.color = color;
  // Clear after 4 seconds
  setTimeout(() => { formStatus.textContent = ''; }, 4000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ── NAVBAR SHADOW ON SCROLL ──────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });
