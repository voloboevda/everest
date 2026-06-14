(function () {
  "use strict";

  var STAGGER = 0.035;
  var root = document.getElementById("everest-app");
  if (!root) return;

  function buildCharRoll(el) {
    var text = (el.textContent || "").trim();
    if (!text) return;

    el.textContent = "";
    el.classList.add("text-roll--chars");

    Array.from(text).forEach(function (ch, i) {
      var glyph = ch === " " ? "\u00a0" : ch;
      var wrap = document.createElement("span");
      wrap.className = "text-roll-char";
      wrap.style.setProperty("--stagger", String(i * STAGGER) + "s");

      var top = document.createElement("span");
      top.className = "text-roll-char-top";
      top.textContent = glyph;

      var bottom = document.createElement("span");
      bottom.className = "text-roll-char-bottom";
      bottom.setAttribute("aria-hidden", "true");
      bottom.textContent = glyph;

      wrap.appendChild(top);
      wrap.appendChild(bottom);
      el.appendChild(wrap);
    });
  }

  function setMenuItemIndex() {
    root.querySelectorAll(".menu-list-item").forEach(function (item, index) {
      item.style.setProperty("--menu-i", String(index));
    });
  }

  function initMenuRoll() {
    root.querySelectorAll(".menu-list .text-roll[data-i18n]").forEach(function (el) {
      el.classList.remove("text-roll--chars");
      buildCharRoll(el);
    });
    setMenuItemIndex();
  }

  function scheduleInit() {
    window.requestAnimationFrame(initMenuRoll);
  }

  document.addEventListener("everest:langchange", scheduleInit);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleInit);
  } else {
    scheduleInit();
  }
})();
