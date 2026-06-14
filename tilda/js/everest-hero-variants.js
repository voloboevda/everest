/**
 * Everest Trade — hero display typography variants (A / B / C / plain).
 * Console: everestSetHeroVariant('a'|'b'|'c'|'plain'), everestClearHeroVariant()
 */
(function () {
  "use strict";

  var STORAGE_KEY = "everest_hero_variant";
  var DEFAULT = "a";

  function getLang() {
    return localStorage.getItem("everest_lang") || "ru";
  }

  function getVariant() {
    if (window.__EVEREST_HERO_VARIANT) return window.__EVEREST_HERO_VARIANT;
    var stored = localStorage.getItem(STORAGE_KEY);
    if (!stored || stored === "plain") return DEFAULT;
    return stored;
  }

  function t(key, lang) {
    lang = lang || getLang();
    var pack = window.EVEREST_I18N && window.EVEREST_I18N[lang];
    if (pack && pack[key]) return pack[key];
    var ru = window.EVEREST_I18N && window.EVEREST_I18N.ru;
    return (ru && ru[key]) || "";
  }

  function applyHeroVariant(langOverride) {
    var variant = getVariant();
    var lang = langOverride || getLang();
    var titleEl = document.querySelector(".hero-title");
    var subEl = document.querySelector(".hero-subtitle");
    if (!titleEl) return;

    if (variant === "plain") {
      titleEl.classList.remove("hero-title--display", "hero-title--whipped");
      titleEl.textContent = t("hero_title", lang);
      if (subEl) subEl.textContent = t("hero_subtitle", lang);
      return;
    }

    titleEl.classList.add("hero-title--display", "hero-title--whipped");
    titleEl.innerHTML = t("hero_title_" + variant, lang) || t("hero_title_a", lang);
    if (subEl) {
      subEl.textContent = t("hero_subtitle_" + variant, lang) || t("hero_subtitle", lang);
    }
  }

  window.everestGetHeroVariant = function () {
    return getVariant();
  };

  window.everestSetHeroVariant = function (variant) {
    if (!variant) {
      window.everestClearHeroVariant();
      return;
    }
    var allowed = { a: 1, b: 1, c: 1, plain: 1 };
    if (!allowed[variant]) {
      console.warn("[Everest] Unknown hero variant:", variant, "— use a, b, c, or plain");
      return;
    }
    window.__EVEREST_HERO_VARIANT = variant;
    localStorage.setItem(STORAGE_KEY, variant);
    applyHeroVariant();
    console.info("[Everest] Hero variant →", variant);
  };

  window.everestClearHeroVariant = function () {
    localStorage.removeItem(STORAGE_KEY);
    window.__EVEREST_HERO_VARIANT = DEFAULT;
    applyHeroVariant();
    console.info("[Everest] Hero variant →", DEFAULT);
  };

  window.everestApplyHeroVariant = applyHeroVariant;

  document.addEventListener("everest:langchange", function (e) {
    applyHeroVariant(e.detail && e.detail.lang);
  });

  if (localStorage.getItem(STORAGE_KEY) === "plain") {
    localStorage.removeItem(STORAGE_KEY);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyHeroVariant);
  } else {
    applyHeroVariant();
  }
})();
