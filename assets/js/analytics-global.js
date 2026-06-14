/**
 * Global analytics stub — replace IDs when Matomo/GA4 chosen
 */
(function () {
  "use strict";

  window.EVEREST_ANALYTICS = window.EVEREST_ANALYTICS || {
    globalProvider: null, // 'matomo' | 'ga4'
    globalId: null,
  };

  window.everestTrackEvent = function (name, params) {
    if (!window.EVEREST_ANALYTICS.globalId) {
      if (typeof console !== "undefined" && console.debug) {
        console.debug("[everest analytics]", name, params || {});
      }
      return;
    }

    var cfg = window.EVEREST_ANALYTICS;
    if (cfg.globalProvider === "ga4" && typeof gtag === "function") {
      gtag("event", name, params || {});
    }
    if (cfg.globalProvider === "matomo" && typeof _paq !== "undefined") {
      _paq.push(["trackEvent", "Everest", name, JSON.stringify(params || {})]);
    }
  };

  // RFQ success hook — call from Tilda success callback if needed
  window.everestTrackRfqSubmit = function () {
    window.everestTrackEvent("rfq_submit");
  };
})();
