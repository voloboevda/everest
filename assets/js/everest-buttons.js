/**
 * Everest Trade — joly-style button spotlight (mouse-follow highlight)
 */
(function () {
  "use strict";

  function initSpotlight(btn) {
    var fx = btn.querySelector(".btn-fx");
    if (!fx) return;

    btn.addEventListener("mousemove", function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      fx.style.background =
        "radial-gradient(circle at " +
        x +
        "px " +
        y +
        "px, rgba(255,255,255,0.18), transparent 80%)";
      fx.style.opacity = "1";
    });

    btn.addEventListener("mouseleave", function () {
      fx.style.opacity = "0";
    });
  }

  function init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll(".btn-joly").forEach(initSpotlight);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
