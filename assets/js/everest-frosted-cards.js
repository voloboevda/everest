/**
 * Everest Trade — frosted glass card tilt + cursor glare
 * Pairs with .frosted-card in everest-site.css
 */
(function () {
  "use strict";

  var REDUCED =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function wrapCard(card) {
    var parent = card.parentElement;
    if (!parent || parent.classList.contains("frosted-card-container")) return;
    var wrap = document.createElement("div");
    wrap.className = "frosted-card-container";
    parent.insertBefore(wrap, card);
    wrap.appendChild(card);
  }

  function bindCard(card) {
    if (REDUCED || card.dataset.frostedBound === "1") return;
    card.dataset.frostedBound = "1";

    function onMove(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateY = ((x - centerX) / centerX) * 6;
      var rotateX = ((y - centerY) / centerY) * -6;

      card.style.transform =
        "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
      card.style.setProperty("--mouse-x", x + "px");
      card.style.setProperty("--mouse-y", y + "px");
    }

    function onLeave() {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    }

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
  }

  function init() {
    var cards = document.querySelectorAll(".everest-root .card.frosted-card");
    cards.forEach(function (card) {
      wrapCard(card);
      bindCard(card);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
