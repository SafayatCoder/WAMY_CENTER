/* =========================
   main.js
   Global interactions for Wamy Center Bangladesh
========================= */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Navbar & Mobile Menu (only if elements exist) ----------
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    // close on nav link click (mobile)
    mainNav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('open');
        }
      });
    });
  }

  // ---------- Smooth scroll for internal links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 80;
          const rect = targetEl.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ---------- Back to top button ----------
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Dark / light mode toggle ----------
  const body = document.body;
  const modeToggle = document.querySelector('.mode-toggle');
  const THEME_KEY = 'wamy_theme';

  // apply saved theme
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark') {
    body.classList.add('theme-dark');
  } else if (savedTheme === 'light') {
    body.classList.remove('theme-dark');
  }

  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('theme-dark');
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    });
  }

  // ---------- AOS (scroll animations) – only if library loaded ----------
  if (window.AOS) {
    AOS.init({
      duration: 800,
      once: true
    });
  }

  // ---------- VanillaTilt (card 3D hover) ----------
  if (window.VanillaTilt) {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    if (tiltElements.length) {
      VanillaTilt.init(tiltElements, {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2
      });
    }
  }

  // ---------- Simple parallax on elements with data-parallax ----------
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = 0.22;
        el.style.transform = `translateY(${scrolled * speed * -0.2}px)`;
      });
    });
  }

  // ---------- Page transition overlay ----------
  const pageOverlay = document.querySelector('.page-transition');
  if (pageOverlay) {
    // on load – play exit animation
    requestAnimationFrame(() => {
      pageOverlay.classList.add('page-transition--enter');
    });

    // when clicking internal links to another html, show overlay briefly
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      const url = link.getAttribute('href');
      // same tab navigation only
      link.addEventListener('click', e => {
        // allow normal hash links
        if (url.startsWith('#')) return;

        e.preventDefault();
        pageOverlay.style.transition = 'none';
        pageOverlay.style.transform = 'scaleY(1)';
        pageOverlay.style.opacity = '1';
        pageOverlay.offsetHeight; // force reflow
        pageOverlay.classList.remove('page-transition--enter');
        setTimeout(() => {
          window.location.href = url;
        }, 250);
      });
    });
  }

  // ---------- Cursor highlight effect ----------
  const highlightEls = document.querySelectorAll('.cursor-highlight');
  if (highlightEls.length) {
    highlightEls.forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--cursor-x', `${x}%`);
        el.style.setProperty('--cursor-y', `${y}%`);
      });
    });
  }

  // ---------- Simple active nav highlight (index page only) ----------
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = mainNav ? mainNav.querySelectorAll('a[href^="#"]') : [];

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }
});
