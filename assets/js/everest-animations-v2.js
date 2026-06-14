/**
 * Everest Trade v2 — section scroll choreography (Xtract / Landio inspired)
 * Requires: gsap.min.js, ScrollTrigger.min.js
 */
(function () {
  "use strict";

  var REDUCED =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var REVEAL_Y = 28;
  var REVEAL_DURATION = 0.52;
  var REVEAL_STAGGER = 0.09;
  var REVEAL_EASE = "power3.out";

  function showStatic(nodes) {
    nodes.forEach(function (el) {
      el.classList.add("is-revealed");
      if (window.gsap) {
        gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
      }
    });
  }

  function collectRevealTargets(section) {
    var id = section.id;
    var targets = [];

    /* Selective content reveal — About + Cooperation only */
    if (id === "about") {
      targets = gsap.utils.toArray(
        section.querySelectorAll(".about-v2__story, .about-v2__principle")
      );
    } else if (id === "cooperation") {
      targets = gsap.utils.toArray(section.querySelectorAll(".coop-v2__column"));
    }

    return targets;
  }

  function revealItemsInColumn(column) {
    return gsap.utils.toArray(column.querySelectorAll(".coop-v2__item"));
  }

  function initSectionHeaders() {
    document.querySelectorAll(".everest-root--v2 .section.will-animate").forEach(function (section) {
      var header = section.querySelector(".section-header");
      if (!header || header.dataset.v2HeaderBound === "1") return;
      header.dataset.v2HeaderBound = "1";

      var eyebrow = header.querySelector(".block-eyebrow");
      var line = header.querySelector(".block-eyebrow__line");
      var title = header.querySelector(".section-title");
      var subtitle = header.querySelector(".section-subtitle");

      if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 8 });
      if (title) gsap.set(title, { opacity: 0, y: 14 });
      if (subtitle) gsap.set(subtitle, { opacity: 0, y: 10 });

      function revealHeader() {
        if (header.dataset.v2HeaderRevealed === "1") return;
        header.dataset.v2HeaderRevealed = "1";
        var tl = gsap.timeline({ defaults: { ease: REVEAL_EASE } });
        if (line) tl.to(line, { scaleX: 1, duration: 0.34 });
        if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.38 }, "-=0.18");
        if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.48 }, "-=0.24");
        if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");
      }

      ScrollTrigger.create({
        trigger: header,
        start: "top 88%",
        once: true,
        onEnter: revealHeader,
      });

      if (ScrollTrigger.isInViewport(header, 0.12)) {
        revealHeader();
      }
    });
  }

  function initScrollReveal() {
    document.querySelectorAll(".everest-root--v2 .section.will-animate").forEach(function (section) {
      if (section.id === "expertise" || section.id === "sectors") return;

      var targets = collectRevealTargets(section);
      if (!targets.length) return;

      if (REDUCED) {
        showStatic(targets);
        targets.forEach(function (column) {
          showStatic(revealItemsInColumn(column));
        });
        return;
      }

      targets.forEach(function (target) {
        if (target.dataset.v2RevealBound === "1") return;
        target.dataset.v2RevealBound = "1";
        gsap.set(target, { opacity: 0, y: REVEAL_Y });

        var items = revealItemsInColumn(target);
        if (items.length) {
          gsap.set(items, { opacity: 0, y: 18 });
        }

        ScrollTrigger.create({
          trigger: target,
          start: "top 86%",
          once: true,
          onEnter: function () {
            revealTarget(target, items);
          },
        });

        if (ScrollTrigger.isInViewport(target, 0.12)) {
          revealTarget(target, items);
        }
      });
    });
  }

  function revealTarget(target, items) {
    if (target.dataset.v2Revealed === "1") return;
    target.dataset.v2Revealed = "1";
    target.classList.add("is-revealed");
    var tl = gsap.timeline({ defaults: { ease: REVEAL_EASE } });
    tl.to(target, { opacity: 1, y: 0, duration: REVEAL_DURATION });
    if (items.length) {
      tl.to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 0.44,
          stagger: REVEAL_STAGGER,
        },
        "-=0.28"
      );
    }
  }

  function init() {
    if (!document.querySelector(".everest-root--v2")) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    initSectionHeaders();
    initScrollReveal();
    ScrollTrigger.refresh();
  }

  window.EverestAnimationsV2Init = init;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
