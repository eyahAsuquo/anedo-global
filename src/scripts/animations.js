import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value, { immediate: true });
    }
    return lenis.scroll || 0;
  },
  scrollLeft(value) {
    return 0;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

const init = () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('[data-animate="hero-title"]', { y: 80, opacity: 0, duration: 1 })
    .from('[data-animate="hero-subtitle"]', { y: 40, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('[data-animate="hero-cta"]', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
    .from('[data-animate="hero-image"]', { scale: 0.9, opacity: 0, duration: 1.2 }, '-=0.6');

  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('[data-stagger]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      yPercent: -20,
      ease: 'none',
    });
  });

  gsap.utils.toArray('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;
    const suffix = el.dataset.suffix || '';
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        const val = Math.round(parseFloat(el.textContent));
        el.textContent = val + suffix;
      },
      onComplete: () => { el.textContent = target + suffix; },
    });
  });

  gsap.utils.toArray('[data-scale-in]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      scale: 0.85,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
  setTimeout(() => ScrollTrigger.refresh(), 500);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
