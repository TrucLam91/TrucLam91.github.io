/* ═══════════════════════════════════════
   TRUC LAM PORTFOLIO v3 — script.js
   ★ FIX: Experience items are ALWAYS
     visible. JS only handles nav, scroll,
     and language bars.
═══════════════════════════════════════ */

// ── YouTube Shorts facade — click thumbnail to load video ──
document.querySelectorAll('.short-frame').forEach(frame => {
  frame.addEventListener('click', () => {
    const id = frame.dataset.vid;
    frame.innerHTML = `<iframe
      src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>`;
  });
});


const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── Navbar shrink on scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Smooth scroll (offset for fixed navbar) ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 10;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

// ── Language bars — animate fill when visible ──
const langList = document.getElementById('langList');
if (langList) {
  window.addEventListener('load', () => {
    document.querySelectorAll('.fill').forEach(bar => {
      const w = bar.dataset.w + '%';
      bar.style.width = '0%';
      bar.style.transition = 'width 1.3s cubic-bezier(.4,0,.2,1)';
      setTimeout(() => { bar.style.width = w; }, 400);
    });
  });
}

// ── Active nav link highlight ──
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === id ? 'var(--g-dk)' : '';
      });
    }
  });
}, { threshold: 0.4 }).observe && sections.forEach(s =>
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + e.target.id
            ? 'var(--g-dk)' : '';
        });
      }
    });
  }, { threshold: 0.35 }).observe(s)
);
