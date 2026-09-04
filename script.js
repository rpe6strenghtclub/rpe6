(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const initParallax = () => {
    const background = document.querySelector('.parallax-background');
    if (!background) return;

    const desktop = window.matchMedia('(min-width: 761px)');
    const tallViewport = window.matchMedia('(max-aspect-ratio: 1/1)');
    let frame = 0;

    const update = () => {
      frame = 0;

      if (!desktop.matches || reducedMotion.matches) {
        background.style.transform = '';
        return;
      }

      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const imageRatio = tallViewport.matches ? 4096 / 1844 : 1;
      const imageHeight = window.innerWidth * imageRatio;
      const availableTravel = Math.max(0, imageHeight - window.innerHeight);
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;

      background.style.transform = `translate3d(0, ${-availableTravel * progress}px, 0)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    desktop.addEventListener('change', requestUpdate);
    tallViewport.addEventListener('change', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);
    requestUpdate();
  };

  const initReveals = () => {
    const elements = document.querySelectorAll('.reveal');
    const reveal = (element) => element.classList.add('is-revealed');

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      elements.forEach(reveal);
      return;
    }

    const revealWhenReady = (element) => {
      if (!element.classList.contains('reveal-media')) {
        reveal(element);
        return;
      }

      const image = element.querySelector('img');
      if (!image || image.complete) {
        reveal(element);
        return;
      }

      image.addEventListener('load', () => reveal(element), { once: true });
      image.addEventListener('error', () => reveal(element), { once: true });
    };

    let observer;
    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          revealWhenReady(entry.target);
        });
      }, { rootMargin: '0px 0px -10%', threshold: 0.1 });
    } catch {
      elements.forEach(reveal);
      return;
    }

    document.documentElement.classList.add('reveal-ready');
    elements.forEach((element) => observer.observe(element));
  };

  initParallax();
  initReveals();
})();
