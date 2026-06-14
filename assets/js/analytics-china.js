/**
 * China analytics stub — Baidu Tongji (百度统计)
 * Load only on CHI / zh language version
 */
(function () {
  "use strict";

  window.EVEREST_ANALYTICS = window.EVEREST_ANALYTICS || {};
  window.EVEREST_ANALYTICS.baiduId = null; // e.g. 'xxxxxxxx'

  function initBaidu() {
    var id = window.EVEREST_ANALYTICS.baiduId;
    if (!id) return;

    window._hmt = window._hmt || [];
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?" + id;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  }

  window.everestLoadChinaAnalytics = initBaidu;

  if (document.documentElement.lang === "zh" || document.body.classList.contains("t-lang-zh")) {
    initBaidu();
  }
})();
