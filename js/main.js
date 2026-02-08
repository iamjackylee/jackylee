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

  // --- Animated Number Counters (re-animates on scroll back) ---
  const statNumbers = document.querySelectorAll('.stat__number[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
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
      } else {
        // Reset to 0 when scrolled away so it re-counts next time
        el.textContent = '0';
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // --- Testimonial Carousel with Typewriter ---
  const allTestimonials = [
    {
      quote: "Your knowledge and professional acumen have greatly contributed to setting the high standard and the rigorous judging framework that were central to the contest's success.",
      name: "Dr. Benoit Guenard",
      role: "Director, Hong Kong Biodiversity Museum",
      avatar: "images/testimonials/benoit-guenard.jpg"
    },
    {
      quote: "The art photo galleries, showcasing the gorgeous natural scenery and city landscape of Hong Kong, was well received by the visitors in the art revitalization project.",
      name: "Charles Lee",
      role: "Chairperson, Association for Sha Tau Kok Cultural and Ecology",
      avatar: "images/testimonials/charles-lee.jpg"
    },
    {
      quote: "I must congratulate you, Jacky, on the excellent images on your website. You have some beautiful work there. We're really impressed.",
      name: "Elaine Herbert",
      role: "Royal Photographic Society President's Medal Recipient 2025",
      avatar: "images/testimonials/elaine-herbert.jpg"
    },
    {
      quote: "Thank you for your enthusiasm to participate in our organization. You are just the kind of member we are looking for. Congratulations on your achievements and honours!",
      name: "Kay Larkin",
      role: "President, International Association of Panoramic Photographers",
      avatar: "images/testimonials/kay-larkin.jpg"
    },
    {
      quote: "With your possession of good knowledge and sound experience in drone photography, I firmly believe that the aforementioned topic would be of interest to our members who will find pleasure in reading your sharing.",
      name: "Dr. Michael Mui",
      role: "Editor-in-Chief, Newsletter Editorial Board, Hong Kong Dental Association",
      avatar: "images/testimonials/michael-mui.jpg"
    },
    {
      quote: "You had been generously sharing your knowledge and time in guiding the public on how to capture the historic sites in Central, Hong Kong from an artistic point of view.",
      name: "Paul Chan",
      role: "CEO, Walk in Hong Kong",
      avatar: "images/testimonials/paul-chan.jpg"
    },
    {
      quote: "Team PSA is extremely impressed with your profile and would like to welcome you among our distinguished Mentors.",
      name: "Sanjoy Sengupta",
      role: "Director, Consultant Services, Photographic Society of America",
      avatar: "images/testimonials/sanjoy-sengupta.jpg"
    },
    {
      quote: "Your expertise was instrumental in the campaign's resounding success. Your selection of photographs that captured the village's essence not only showcased your artistic talent but also amplified our efforts to promote the conservation of cultural heritage.",
      name: "Sylvia Chung",
      role: "Chief Business Impact Officer, Chinachem Group",
      avatar: "images/testimonials/sylvia-chung-yt-wong.jpg"
    },
    {
      quote: "The seminar was well received by our course students. The information and skills you have shared with them were fascinating and inspirational.",
      name: "Dr. Y.T. Wong",
      role: "Course Coordinator, School of Chinese, The University of Hong Kong",
      avatar: "images/partners/hku.jpg"
    }
  ];

  const carousel = document.getElementById('testimonials-carousel');
  if (carousel) {
    const slots = carousel.querySelectorAll('.testimonial-card');
    let currentIndices = [0, 1, 2, 3];
    let nextToReplace = 0;
    let nextTestimonialIdx = 4;
    let carouselStarted = false;

    // Populate a card slot with a specific testimonial (syncs ALL fields)
    const populateSlot = (slot, testimonial) => {
      slot.querySelector('.testimonial-card__quote').textContent = testimonial.quote;
      slot.querySelector('.testimonial-card__name').textContent = testimonial.name;
      slot.querySelector('.testimonial-card__role').textContent = testimonial.role;
      const avatar = slot.querySelector('.testimonial-card__avatar');
      avatar.src = testimonial.avatar;
      avatar.alt = testimonial.name;
    };

    // Typewriter function for a single quote element
    const typewriteQuote = (quoteEl, text) => {
      quoteEl.textContent = '';
      quoteEl.classList.remove('typewriter--done');
      quoteEl.classList.add('typewriter--active');

      let i = 0;
      const speed = 20;

      const type = () => {
        if (i < text.length) {
          quoteEl.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          quoteEl.classList.remove('typewriter--active');
          quoteEl.classList.add('typewriter--done');
        }
      };
      type();
    };

    // Ensure initial HTML matches the JS data exactly
    slots.forEach((slot, idx) => populateSlot(slot, allTestimonials[idx]));

    // Rotate one card at a time
    const rotateNextCard = () => {
      const slot = slots[nextToReplace];
      const testimonial = allTestimonials[nextTestimonialIdx];

      // Fade out entire card
      slot.classList.add('testimonial-card--fading-out');

      setTimeout(() => {
        // Update ALL content while card is invisible
        populateSlot(slot, testimonial);
        const quoteEl = slot.querySelector('.testimonial-card__quote');
        quoteEl.textContent = '';
        quoteEl.classList.remove('typewriter--active', 'typewriter--done');

        // Fade in
        slot.classList.remove('testimonial-card--fading-out');
        slot.classList.add('testimonial-card--fading-in');

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            slot.classList.remove('testimonial-card--fading-in');
            // Typewriter the quote after card is visible
            typewriteQuote(quoteEl, testimonial.quote);
          });
        });

        // Advance indices
        currentIndices[nextToReplace] = nextTestimonialIdx;
        nextToReplace = (nextToReplace + 1) % 4;
        nextTestimonialIdx = (nextTestimonialIdx + 1) % allTestimonials.length;

        // Skip already-visible testimonials
        let safetyCount = 0;
        while (currentIndices.includes(nextTestimonialIdx) && safetyCount < allTestimonials.length) {
          nextTestimonialIdx = (nextTestimonialIdx + 1) % allTestimonials.length;
          safetyCount++;
        }
      }, 600); // Wait for fade-out to finish
    };

    // Start carousel when section scrolls into view
    const carouselObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !carouselStarted) {
          carouselStarted = true;
          // Start rotating after a short viewing pause
          setTimeout(() => {
            setInterval(rotateNextCard, 6000);
          }, 4000);
          carouselObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    carouselObserver.observe(carousel);
  }

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
          const staggerChildren = parent.querySelectorAll('.card, .award-card, .stat');

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
