/**
 * Everest Trade — sticky stacking cards (#expertise only)
 * Requires: gsap.min.js, ScrollTrigger.min.js
 */
(function () {
  "use strict";

  var REDUCED =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MIN_WIDTH = 980;
  var STICKY_TOP = 112;
  var triggers = [];

  function destroy() {
    triggers.forEach(function (st) {
      st.kill();
    });
    triggers = [];
  }

  function parseNum(value, fallback) {
    var n = parseFloat(value);
    return isNaN(n) ? fallback : n;
  }

  function resetCards(root) {
    gsap.utils.toArray(".stack-card", root).forEach(function (card, i) {
      card.style.zIndex = String(i + 1);
      if (window.gsap) {
        gsap.set(card, { clearProps: "scale,filter,transform" });
      }
    });
  }

  function init() {
    destroy();

    document.querySelectorAll("#expertise [data-stack-cards]").forEach(function (root) {
      var cards = gsap.utils.toArray(".stack-card", root);
      if (!cards.length) return;

      resetCards(root);

      if (
        REDUCED ||
        window.innerWidth < MIN_WIDTH ||
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
      ) {
        return;
      }

      var scaleAmt = parseNum(root.dataset.stackScale, 0.1);
      var dimAmt = parseNum(root.dataset.stackDim, 0.1);
      var scrub = parseNum(root.dataset.stackScrub, 0.1);

      gsap.registerPlugin(ScrollTrigger);

      cards.forEach(function (card, index) {
        if (index === cards.length - 1) return;

        var nextCard = cards[index + 1];

        triggers.push(
          ScrollTrigger.create({
            trigger: nextCard,
            start: "top bottom",
            end: "top " + STICKY_TOP,
            scrub: scrub,
            onUpdate: function (self) {
              var progress = self.progress;
              gsap.set(card, {
                scale: 1 - progress * scaleAmt,
                filter: "brightness(" + (1 - progress * dimAmt) + ")",
                transformOrigin: "50% 0%",
              });
            },
          })
        );
      });
    });

    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  }

  window.EverestStackCardsInit = init;
  window.EverestExpertiseStackInit = init;

  var resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(init, 200);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
