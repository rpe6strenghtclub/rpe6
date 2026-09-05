(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const imageLoads = new WeakMap();

  // Shared readiness check: settle on load, error or timeout and remove listeners.
  const readyImage = image => {
    if (!image) return Promise.resolve(false);
    if (imageLoads.has(image)) return imageLoads.get(image);
    const promise = new Promise(resolve => {
      let timer;
      const finish = () => {
        clearTimeout(timer);
        image.removeEventListener('load', finish);
        image.removeEventListener('error', finish);
        resolve(image.complete && image.naturalWidth > 0);
      };
      image.addEventListener('load', finish);
      image.addEventListener('error', finish);
      timer = setTimeout(finish, 15000);
      image.loading = 'eager';
      if (image.dataset.src) {
        if (image.dataset.sizes) image.sizes = image.dataset.sizes;
        if (image.dataset.srcset) image.srcset = image.dataset.srcset;
        image.src = image.dataset.src;
        image.alt = image.dataset.alt || '';
        image.removeAttribute('aria-hidden');
        for (const key of ['src', 'srcset', 'sizes', 'alt']) delete image.dataset[key];
      }
      if (image.complete) finish();
    });
    imageLoads.set(image, promise);
    return promise;
  };

  // One-shot proximity observation with a passive fallback.
  const onApproach = (elements, margin, callback) => {
    const pending = new Set(elements);
    try {
      if (!('IntersectionObserver' in window)) throw new Error('Observer unavailable');
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !pending.delete(entry.target)) continue;
          observer.unobserve(entry.target);
          callback(entry.target);
        }
        if (!pending.size) observer.disconnect();
      }, { rootMargin: margin + 'px 0px' });
      pending.forEach(element => observer.observe(element));
      return;
    } catch { /* Keep lazy behavior without an observer. */ }
    let frame = 0;
    const check = () => {
      frame = 0;
      for (const element of pending) {
        const rect = element.getBoundingClientRect();
        if (rect.top > innerHeight + margin || rect.bottom < -margin) continue;
        pending.delete(element);
        callback(element);
      }
      if (!pending.size) {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(check); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    check();
  };

  const initParallax = () => {
    const background = document.querySelector('.parallax-background');
    if (!background) return;
    const desktop = window.matchMedia('(min-width: 761px)');
    const tallViewport = window.matchMedia('(max-aspect-ratio: 1/1)');
    let frame = 0;
    const enabled = () => desktop.matches && !reducedMotion.matches;
    const update = () => {
      frame = 0;
      if (!enabled()) return;
      const range = document.documentElement.scrollHeight - innerHeight;
      const progress = Math.max(0, Math.min(1, range > 0 ? scrollY / range : 0));
      const imageHeight = innerWidth * (tallViewport.matches ? 4096 / 1844 : 1);
      background.style.transform = 'translate3d(0, ' + (-Math.max(0, imageHeight - innerHeight) * progress) + 'px, 0)';
    };
    const schedule = () => { if (enabled() && !frame) frame = requestAnimationFrame(update); };
    const sync = () => {
      window.removeEventListener('scroll', schedule);
      if (enabled()) {
        window.addEventListener('scroll', schedule, { passive: true });
        schedule();
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        background.style.transform = '';
      }
    };
    window.addEventListener('resize', schedule);
    desktop.addEventListener('change', sync);
    tallViewport.addEventListener('change', schedule);
    reducedMotion.addEventListener('change', sync);
    sync();
  };

  const initCarousels = () => {
    const carousels = document.querySelectorAll('.academy-carousel, .method-carousel, .final-community-carousel');
    const start = async carousel => {
      const slides = [...carousel.firstElementChild.children];
      const failed = new Set();
      const show = index => {
        slides.forEach((slide, i) => {
          slide.classList.toggle('is-current', i === index);
          slide.setAttribute('aria-hidden', String(i !== index));
        });
      };
      const nextReady = async from => {
        for (let step = 1; step <= slides.length; step++) {
          const index = (from + step) % slides.length;
          if (failed.has(index)) continue;
          if (await readyImage(slides[index].querySelector('img'))) return index;
          failed.add(index);
        }
        return -1;
      };
      let current = await nextReady(-1);
      if (current < 0) return;
      show(current);
      carousel.classList.add('carousel-managed');
      while (carousel.isConnected && failed.size < slides.length - 1) {
        await delay(4000);
        const upcoming = nextReady(current);
        await delay(1000);
        const next = await upcoming;
        if (next < 0 || next === current) break;
        show(next);
        current = next;
      }
    };
    carousels.forEach(carousel => {
      carousel.classList.add('carousel-waiting');
      carousel.firstElementChild.firstElementChild.classList.add('is-current');
    });
    onApproach(carousels, 900, carousel => {
      start(carousel).catch(() => carousel.classList.add('carousel-managed'));
    });
  };

  const initReveals = () => {
    const elements = document.querySelectorAll('.reveal');
    const reveal = element => element.classList.add('is-revealed');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      elements.forEach(reveal);
      return;
    }
    let observer;
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const image = entry.target.classList.contains('reveal-media') && entry.target.querySelector('img');
          if (image) readyImage(image).then(() => reveal(entry.target));
          else reveal(entry.target);
        });
      }, { rootMargin: '0px 0px -10%', threshold: 0.1 });
      elements.forEach(element => observer.observe(element));
      document.documentElement.classList.add('reveal-ready');
      reducedMotion.addEventListener('change', () => {
        if (!reducedMotion.matches) return;
        observer.disconnect();
        elements.forEach(reveal);
      });
    } catch {
      observer?.disconnect();
      elements.forEach(reveal);
    }
  };

  for (const init of [initParallax, initCarousels, initReveals]) {
    try { init(); } catch (error) { console.warn('RPE6 component initialization:', error); }
  }
})();
