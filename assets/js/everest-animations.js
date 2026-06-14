/**
 * Everest Trade — GSAP animations (corporate tempo, scroll-reversible)
 * Requires: gsap.min.js, ScrollTrigger.min.js
 */
(function () {
  "use strict";

  var REVEAL_EASE = "power3.out";
  var HERO_SCENE_EASE = "power2.out";
  var SCROLL_SCRUB = 0.35;

  function showStatic(el) {
    el.classList.add("is-visible");
  }

  function markHeroRevealed(hero) {
    if (!hero) return;
    hero.classList.remove("hero--pending-reveal");
    hero.classList.add("hero--revealed");
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".hero").forEach(markHeroRevealed);
    document
      .querySelectorAll(".will-animate, .will-animate-footer, .will-animate-header")
      .forEach(showStatic);
    return;
  }

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    document.querySelectorAll(".hero").forEach(markHeroRevealed);
    document
      .querySelectorAll(".will-animate, .will-animate-footer, .will-animate-header")
      .forEach(showStatic);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  function initHeader() {
    var header = document.querySelector(".nav.header, .header");
    if (!header) return;

    gsap.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: REVEAL_EASE,
      delay: 0.2,
      onStart: function () {
        header.classList.add("is-visible");
      },
    });

    ScrollTrigger.create({
      start: "top -40",
      onUpdate: function (self) {
        header.classList.toggle("is-scrolled", self.scroll() > 24);
      },
    });
  }

  function initHeroScrollParallax(hero, scene) {
    if (!hero || !scene) return;

    gsap.fromTo(
      scene,
      { opacity: 1, y: 0 },
      {
        opacity: 0.92,
        y: 36,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }
    );

    var heroCopy = hero.querySelector(".hero-copy");
    if (heroCopy) {
      gsap.fromTo(
        heroCopy,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "center top",
            scrub: SCROLL_SCRUB,
          },
        }
      );
    }
  }

  function initHeroReveal() {
    var hero = document.querySelector(".hero");
    if (!hero || hero.dataset.heroRevealBound === "1") return;

    if (document.querySelector(".everest-root--v3")) {
      hero.dataset.heroRevealBound = "1";
      markHeroRevealed(hero);
      var scene = hero.querySelector(".hero-scene");
      initHeroScrollParallax(hero, scene);
      return;
    }

    hero.dataset.heroRevealBound = "1";

    hero.classList.add("hero--pending-reveal");

    var scene = hero.querySelector(".hero-scene");
    var heroImage = hero.querySelector(".hero-image");
    var shade = hero.querySelector(".hero-scene-shade");
    var stars = hero.querySelector(".hero-stars");
    var glow = hero.querySelector(".hero-glow");
    var eyebrow = hero.querySelector(".hero-copy .block-eyebrow");
    var eyebrowLine = hero.querySelector(".hero-copy .block-eyebrow__line");
    var title = hero.querySelector(".hero-title");
    var subtitle = hero.querySelector(".hero-subtitle");
    var heroButtons = hero.querySelector(".hero-buttons");

    if (typeof window.everestApplyHeroVariant === "function") {
      window.everestApplyHeroVariant();
    }

    var lines = title ? title.querySelectorAll(".hero-line") : [];

    if (scene) gsap.set(scene, { opacity: 0 });
    if (heroImage) gsap.set(heroImage, { scale: 1.04, transformOrigin: "58% 50%" });
    if (shade) gsap.set(shade, { opacity: 0 });
    if (stars) gsap.set(stars, { opacity: 0 });
    if (glow) gsap.set(glow, { opacity: 0 });
    if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 14 });
    if (eyebrowLine) gsap.set(eyebrowLine, { scaleX: 0, transformOrigin: "left center" });
    if (lines.length) gsap.set(lines, { opacity: 0, yPercent: 105 });
    else if (title) gsap.set(title, { opacity: 0, y: 22 });
    if (subtitle) gsap.set(subtitle, { opacity: 0, y: 18 });
    if (heroButtons) gsap.set(heroButtons, { autoAlpha: 0, y: 18 });

    function finishReveal() {
      markHeroRevealed(hero);
      gsap.set([scene, stars, glow, shade], { clearProps: "opacity" });
      if (heroImage) gsap.set(heroImage, { clearProps: "scale" });
      if (heroButtons) gsap.set(heroButtons, { clearProps: "transform" });
      if (title) gsap.set(title, { clearProps: "opacity,transform" });
      if (lines.length) gsap.set(lines, { clearProps: "opacity,transform" });
      if (subtitle) gsap.set(subtitle, { clearProps: "opacity,transform" });
      if (eyebrow) gsap.set(eyebrow, { clearProps: "opacity,transform" });
      initHeroScrollParallax(hero, scene);
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    }

    var safety = window.setTimeout(finishReveal, 2600);

    var tl = gsap.timeline({
      defaults: { ease: REVEAL_EASE },
      onComplete: function () {
        window.clearTimeout(safety);
        finishReveal();
      },
    });

    if (scene) tl.to(scene, { opacity: 1, duration: 0.75, ease: HERO_SCENE_EASE }, 0);
    if (heroImage) tl.to(heroImage, { scale: 1, duration: 0.9, ease: HERO_SCENE_EASE }, 0);
    if (shade) tl.to(shade, { opacity: 1, duration: 0.55 }, 0.12);
    if (stars) tl.to(stars, { opacity: 1, duration: 0.6 }, 0.22);
    if (glow) tl.to(glow, { opacity: 1, duration: 0.6 }, 0.28);
    if (eyebrowLine) tl.to(eyebrowLine, { scaleX: 1, duration: 0.38, ease: HERO_SCENE_EASE }, 0.38);
    if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.42 }, 0.44);
    if (lines.length) {
      tl.to(lines, { opacity: 1, yPercent: 0, duration: 0.55, stagger: 0.06 }, 0.52);
    } else if (title) {
      tl.to(title, { opacity: 1, y: 0, duration: 0.58 }, 0.52);
    }
    if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.48 }, lines.length ? "-=0.26" : "-=0.34");
    if (heroButtons) {
      tl.to(heroButtons, { autoAlpha: 1, y: 0, duration: 0.42 }, "-=0.22");
    }
  }

  function showSectionStatic(section) {
    section.classList.add("is-visible");
    gsap.set(section, { opacity: 1, filter: "none" });
    var container = section.querySelector(".container");
    if (container) gsap.set(container, { opacity: 1, y: 0, filter: "none" });
  }

  function initSectionCurtain() {
    var v2Root = document.querySelector(".everest-root--v2");
    var v3Root = document.querySelector(".everest-root--v3");
    if (v2Root || v3Root) {
      var rootSel = v2Root ? ".everest-root--v2" : ".everest-root--v3";
      gsap.utils.toArray(rootSel + " .section.will-animate").forEach(function (section) {
        showSectionStatic(section);
        var container = section.querySelector(".container");
        if (container) gsap.set(container, { x: 0, y: 0, clearProps: "transform" });
      });
      gsap.utils.toArray(".will-animate-footer").forEach(function (el) {
        el.classList.add("is-visible");
        gsap.set(el, { opacity: 1, y: 0, filter: "none" });
      });
      return;
    }

    gsap.utils.toArray(".section.will-animate").forEach(function (section) {
      var container = section.querySelector(".container");
      if (!container) return;

      var isStackPin = section.classList.contains("section--stack-pin");

      if (isStackPin) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          once: true,
          onEnter: function () {
            section.classList.add("is-visible");
            gsap.set(container, { opacity: 1, y: 0, filter: "none" });
          },
        });
        return;
      }

      gsap.fromTo(
        section,
        { opacity: 1 },
        {
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: SCROLL_SCRUB,
          },
        }
      );

      gsap.fromTo(
        container,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 100%",
            end: "top 62%",
            scrub: SCROLL_SCRUB,
            onEnter: function () {
              section.classList.add("is-visible");
            },
            onEnterBack: function () {
              section.classList.add("is-visible");
            },
          },
        }
      );
    });

    gsap.utils.toArray(".will-animate-footer").forEach(function (el, i) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        delay: 0.06 + i * 0.06,
        ease: REVEAL_EASE,
        scrollTrigger: {
          trigger: el.closest(".footer") || el,
          start: "top 92%",
          toggleActions: "play none none none",
        },
        onStart: function () {
          el.classList.add("is-visible");
        },
      });
    });
  }

  function boot() {
    initHeader();
    window.requestAnimationFrame(function () {
      initHeroReveal();
      initSectionCurtain();
    });
  }

  window.EverestAnimationsInit = function () {
    initSectionCurtain();
    var hero = document.querySelector(".hero");
    if (hero && !hero.classList.contains("hero--revealed") && !document.querySelector(".everest-root--v3")) {
      hero.dataset.heroRevealBound = "";
      initHeroReveal();
    }
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  };

  boot();
})();
