/**
 * Everest Trade v2 — sector rich cards (Wibify [03] pattern)
 * Requires: gsap.min.js, ScrollTrigger.min.js
 */
(function () {
  "use strict";

  var EASE = "power3.out";
  var REDUCED =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showStatic(section) {
    section.querySelectorAll("[data-sector-card]").forEach(function (card) {
      card.removeAttribute("data-sector-pending");
      card.classList.add("is-revealed");
      gsap.set(card, { clearProps: "opacity,transform" });
      card.querySelectorAll("[data-sector-desc], [data-sector-item], [data-sector-icon]").forEach(function (el) {
        gsap.set(el, { clearProps: "opacity,transform" });
      });
    });
  }

  function runReveal() {
    var section = document.getElementById("sectors");
    if (!section || section.dataset.sectorRevealed === "1") return;
    section.dataset.sectorRevealed = "1";

    var cards = section.querySelectorAll("[data-sector-card]");
    if (!cards.length) return;

    var icons = section.querySelectorAll("[data-sector-icon]");

    var tl = gsap.timeline({
      defaults: { ease: EASE },
      onComplete: function () {
        showStatic(section);
      },
    });

    if (icons.length) {
      tl.to(
        icons,
        { opacity: 1, scale: 1, rotation: 0, duration: 0.55, stagger: 0.07 },
        0
      );
    }

    cards.forEach(function (card, index) {
      var desc = card.querySelector("[data-sector-desc]");
      var items = card.querySelectorAll("[data-sector-item]");
      var at = 0.08 + index * 0.08;

      if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 0.48 }, at);
      if (items.length) {
        tl.to(items, { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 }, at + 0.06);
      }
    });
  }

  function init() {
    var root = document.querySelector(".everest-root--v2");
    var section = document.getElementById("sectors");
    if (!root || !section) return;

    var cards = section.querySelectorAll("[data-sector-card]");
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.classList.remove("is-revealed");
      card.setAttribute("data-sector-pending", "1");
    });
    section.dataset.sectorRevealed = "";

    if (REDUCED) {
      showStatic(section);
      return;
    }

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      showStatic(section);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.getAll().forEach(function (st) {
      if (st.trigger === section) st.kill();
    });

    cards.forEach(function (card) {
      var desc = card.querySelector("[data-sector-desc]");
      var items = card.querySelectorAll("[data-sector-item]");
      var icon = card.querySelector("[data-sector-icon]");

      gsap.set(card, { opacity: 1, y: 0 });
      if (icon) gsap.set(icon, { opacity: 0, scale: 0.82, rotation: -8 });
      if (desc) gsap.set(desc, { opacity: 0, y: 12 });
      if (items.length) gsap.set(items, { opacity: 0, x: -8 });
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top 82%",
      once: true,
      onEnter: runReveal,
    });

    ScrollTrigger.refresh();
    if (ScrollTrigger.isInViewport(section, 0.15)) {
      runReveal();
    }

    window.setTimeout(function () {
      if (section.dataset.sectorRevealed !== "1") showStatic(section);
    }, 2400);
  }

  window.EverestSectorCardsInit = init;

  init();
})();
