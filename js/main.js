/* ============================================
   Jacky Lee - The Artist | Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll effect ---
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('header--scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile navigation ---
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const navOverlay = document.querySelector('.nav-overlay');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      navToggle.classList.toggle('nav-toggle--active', isOpen);
      if (navOverlay) navOverlay.classList.toggle('nav-overlay--visible', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
        navOverlay.classList.remove('nav-overlay--visible');
        document.body.style.overflow = '';
      });
    }

    // Close nav on link click (mobile)
    nav.querySelectorAll('.nav__link:not(.nav__dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
        if (navOverlay) navOverlay.classList.remove('nav-overlay--visible');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Mobile dropdown toggle ---
  document.querySelectorAll('.nav__dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        toggle.closest('.nav__dropdown').classList.toggle('nav__dropdown--open');
      }
    });
  });

  // --- Scroll Progress Indicator ---
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // --- Hero Parallax Effect ---
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    let ticking = false;
    const parallax = () => {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (scrolled < heroHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(parallax);
        ticking = true;
      }
    }, { passive: true });

    heroBg.style.transition = 'none';
  }

  // --- Hero Mouse-Follow Glow ---
  const hero = document.querySelector('.hero');
  if (hero) {
    const glow = document.createElement('div');
    glow.classList.add('hero__glow');
    hero.appendChild(glow);

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - rect.left) + 'px';
      glow.style.top = (e.clientY - rect.top) + 'px';
    });
  }

  // --- Animated Number Counters ---
  const statNumbers = document.querySelectorAll('.stat__number[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutQuart(progress);
          const current = Math.floor(easedProgress * target);
          el.textContent = current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target.toLocaleString() + suffix;
          }
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // --- Testimonial Typewriter Effect ---
  const testimonialQuotes = document.querySelectorAll('.testimonial-card__quote');
  const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const fullText = el.dataset.text || el.textContent;
        el.dataset.text = fullText;
        el.textContent = '';
        el.classList.add('typewriter--active');

        let i = 0;
        const speed = 25; // ms per character

        const type = () => {
          if (i < fullText.length) {
            el.textContent += fullText.charAt(i);
            i++;
            setTimeout(type, speed);
          } else {
            el.classList.remove('typewriter--active');
            el.classList.add('typewriter--done');
          }
        };

        type();
        typewriterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  testimonialQuotes.forEach(el => typewriterObserver.observe(el));

  // --- Gallery Card 3D Tilt Effect ---
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  // --- Staggered Scroll-Triggered Reveal Animations ---
  const animateElements = document.querySelectorAll('.animate-in');
  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add staggered delay for child elements within grids
          const parent = entry.target;
          const staggerChildren = parent.querySelectorAll('.card, .award-card, .testimonial-card, .stat, .partner-logo');

          if (staggerChildren.length > 0) {
            staggerChildren.forEach((child, index) => {
              child.style.opacity = '0';
              child.style.transform = 'translateY(20px)';
              child.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  child.style.opacity = '1';
                  child.style.transform = 'translateY(0)';
                });
              });
            });
          }

          entry.target.classList.add('animate-in--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  }

  // --- Lightbox ---
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox__close');

    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.dataset.lightbox || item.querySelector('img')?.src;
        if (src && lightboxImg) {
          lightboxImg.src = src;
          lightbox.classList.add('lightbox--active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('lightbox--active');
      document.body.style.overflow = '';
    };

    lightbox.addEventListener('click', closeLightbox);
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Magnetic Effect on CTA Buttons ---
  document.querySelectorAll('.cta-section .btn--primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) translateY(0)';
      btn.style.transition = 'transform 0.3s ease';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s ease';
    });
  });

});
