/**
 * Everest Trade — hero orbs over image (gold: beam / blue: left → center)
 */
(function () {
  "use strict";

  function init() {
    var root = document.querySelector(".hero-glow");
    var hero = document.querySelector(".hero");
    if (!root || !hero) return;

    var gold = root.querySelector(".hero-glow__orb--gold");
    var blue = root.querySelector(".hero-glow__orb--blue");
    if (!gold || !blue) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var scrollFade = 1;
    var scrollGoldY = 0;
    var scrollBlueY = 0;
    var rafId = 0;
    var running = false;
    var t = Math.random() * Math.PI * 2;

    function updateScroll() {
      var rect = hero.getBoundingClientRect();
      var progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      scrollFade = 1 - progress * 0.35;
      scrollGoldY = progress * 8;
      scrollBlueY = progress * 5;
    }

    function apply(goldX, goldY, goldO, blueX, blueY, blueO) {
      gold.style.transform =
        "translate3d(" + goldX + "%, " + (goldY + scrollGoldY) + "%, 0)";
      gold.style.opacity = String(Math.max(0, goldO * scrollFade));
      blue.style.transform =
        "translate3d(" + blueX + "%, " + (blueY + scrollBlueY) + "%, 0)";
      blue.style.opacity = String(Math.max(0, blueO * scrollFade));
    }

    function tick() {
      t += 0.0095;
      var goldX = -6 + Math.sin(t * 1.18) * 6 + Math.sin(t * 0.5) * 3;
      var goldY = -16 + Math.cos(t * 1.08) * 6 + Math.sin(t * 0.4) * 2;
      var goldO = 0.34 + Math.sin(t * 0.8) * 0.1;
      var blueX = 8 + Math.sin(t * 0.98) * 16 + Math.sin(t * 0.42) * 5;
      var blueY = 28 + Math.sin(t * 0.88) * 11 + Math.cos(t * 0.38) * 5;
      var blueO = 0.38 + Math.sin(t * 0.72 + 1.1) * 0.11;
      apply(goldX, goldY, goldO, blueX, blueY, blueO);
      if (running) rafId = window.requestAnimationFrame(tick);
    }

    updateScroll();

    if (reduced) {
      apply(-2, -12, 0.3, 10, 28, 0.34);
      window.addEventListener(
        "scroll",
        function () {
          updateScroll();
          apply(-2, -12, 0.3, 10, 28, 0.34);
        },
        { passive: true },
      );
      return;
    }

    running = true;
    rafId = window.requestAnimationFrame(tick);

    window.addEventListener(
      "scroll",
      function () {
        updateScroll();
      },
      { passive: true },
    );

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(rafId);
      } else if (!reduced) {
        running = true;
        rafId = window.requestAnimationFrame(tick);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
