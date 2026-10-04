/* =========================
   animations.js
   Scroll animations, counters, gallery, testimonials
========================= */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Scroll reveal (matches .reveal / .reveal-visible ক্লাস) ----------
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            // চাইলে .reveal-visible-strong ব্যবহার করতে পারো
            // entry.target.classList.add('reveal-visible-strong');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ---------- Counters (যদি data-counter / data-target থাকে) ----------
  const counterEls = document.querySelectorAll('[data-counter]');

  if (counterEls.length) {
    const counterObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10) || 0;
          let start = 0;
          const duration = 1600;
          const startTime = performance.now();

          const tick = now => {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value;
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    counterEls.forEach(el => counterObserver.observe(el));
  }

  // ---------- Gallery lightbox (simple, premium feel) ----------
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryItems.length) {
    // overlay তৈরি
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(15,23,42,0.9)';
    overlay.style.display = 'none';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '80';
    overlay.style.padding = '1.5rem';

    const inner = document.createElement('div');
    inner.style.maxWidth = '960px';
    inner.style.width = '100%';
    inner.style.position = 'relative';

    const img = document.createElement('img');
    img.style.width = '100%';
    img.style.borderRadius = '20px';
    img.style.boxShadow = '0 24px 80px rgba(0,0,0,0.7)';
    img.style.display = 'block';

    const caption = document.createElement('div');
    caption.style.marginTop = '0.6rem';
    caption.style.color = '#e5e7eb';
    caption.style.fontSize = '0.9rem';
    caption.style.display = 'flex';
    caption.style.justifyContent = 'space-between';
    caption.style.gap = '0.75rem';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', 'Close gallery');
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '-10px';
    closeBtn.style.right = '-10px';
    closeBtn.style.borderRadius = '999px';
    closeBtn.style.border = '1px solid rgba(148,163,184,0.7)';
    closeBtn.style.background = '#020617';
    closeBtn.style.color = '#e5e7eb';
    closeBtn.style.width = '32px';
    closeBtn.style.height = '32px';
    closeBtn.style.cursor = 'pointer';

    inner.appendChild(img);
    inner.appendChild(closeBtn);
    inner.appendChild(caption);
    overlay.appendChild(inner);
    document.body.appendChild(overlay);

    const openLightbox = (src, textLeft, textRight) => {
      img.src = src;
      caption.innerHTML = `
        <span>${textLeft || ''}</span>
        <span style="opacity:0.8;">${textRight || ''}</span>
      `;
      overlay.style.display = 'flex';
    };

    const closeLightbox = () => {
      overlay.style.display = 'none';
    };

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const image = item.querySelector('img');
        const cap = item.querySelector('.gallery-caption');
        let left = '';
        let right = '';
        if (cap) {
          const spans = cap.querySelectorAll('span');
          left = spans[0] ? spans[0].textContent : '';
          right = spans[1] ? spans[1].textContent : '';
        }
        if (image) {
          openLightbox(image.src, left, right);
        }
      });
    });

    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target === closeBtn) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.style.display === 'flex') {
        closeLightbox();
      }
    });
  }

  // ---------- Testimonials auto slider (optional) ----------
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  if (testimonialCards.length > 1) {
    let currentIndex = 0;

    const showTestimonial = index => {
      testimonialCards.forEach((card, i) => {
        if (i === index) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          card.classList.add('testimonial-active');
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px) scale(0.97)';
          card.classList.remove('testimonial-active');
        }
      });
    };

    showTestimonial(currentIndex);

    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonialCards.length;
      showTestimonial(currentIndex);
    }, 6000);
  }
});
