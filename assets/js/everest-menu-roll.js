(function () {
  "use strict";

  var STAGGER = 0.035;
  var root = document.getElementById("everest-app");
  if (!root) return;

  function resolveMenuLabel(el) {
    var key = el.getAttribute("data-i18n");
    if (key && window.EVEREST_I18N) {
      var lang = localStorage.getItem("everest_lang") || "ru";
      var pack = window.EVEREST_I18N[lang] || window.EVEREST_I18N.ru;
      if (pack && pack[key]) return String(pack[key]).trim();
    }
    return (el.getAttribute("data-roll-text") || "").trim();
  }

  function shouldUseCharRoll() {
    return (
      window.matchMedia &&
      !window.matchMedia("(hover: none), (max-width: 768px)").matches
    );
  }

  function buildCharRoll(el) {
    var text = resolveMenuLabel(el);
    if (!text) return;

    el.setAttribute("data-roll-text", text);
    el.textContent = "";
    el.classList.remove("text-roll--chars");

    if (!shouldUseCharRoll()) {
      el.textContent = text;
      return;
    }

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

  if (window.EVEREST_I18N) {
    scheduleInit();
  }
})();
