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
    return lenis.scroll;
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

const ready = (cb) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
};

window.addEventListener('load', () => ScrollTrigger.refresh());

ready(() => {

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('[data-animate="hero-title"]', {
    y: 80,
    opacity: 0,
    duration: 1,
  })
  .from('[data-animate="hero-subtitle"]', {
    y: 40,
    opacity: 0,
    duration: 0.8,
  }, '-=0.4')
  .from('[data-animate="hero-cta"]', {
    y: 30,
    opacity: 0,
    duration: 0.6,
  }, '-=0.3')
  .from('[data-animate="hero-image"]', {
    scale: 0.9,
    opacity: 0,
    duration: 1.2,
  }, '-=0.6');

  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('[data-stagger]').forEach((parent) => {
    const children = parent.children;
    gsap.from(children, {
      scrollTrigger: {
        trigger: parent,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      yPercent: -20,
      ease: 'none',
    });
  });

  const counters = gsap.utils.toArray('[data-count]');
  counters.forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        const val = Math.round(parseFloat(el.textContent));
        el.textContent = val + suffix;
      },
      onComplete: () => {
        el.textContent = target + suffix;
      },
    });
  });

  gsap.utils.toArray('[data-scale-in]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      scale: 0.85,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  });
});
