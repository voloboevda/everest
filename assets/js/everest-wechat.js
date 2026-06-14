/**
 * WeChat button + QR placeholder popup
 */
(function () {
  "use strict";

  var POPUP_ID = "everest-wechat-popup";

  function ensurePopup() {
    if (document.getElementById(POPUP_ID)) return;

    var html =
      '<div id="' +
      POPUP_ID +
      '" class="everest-wechat-popup" role="dialog" aria-label="WeChat">' +
      '<div class="everest-wechat-popup__card">' +
      '<strong>WeChat</strong>' +
      '<div class="everest-wechat-popup__qr">QR code<br>coming soon</div>' +
      '<button type="button" class="everest-btn-secondary everest-wechat-close">Close</button>' +
      "</div></div>";

    document.body.insertAdjacentHTML("beforeend", html);

    var popup = document.getElementById(POPUP_ID);
    popup.addEventListener("click", function (e) {
      if (e.target === popup) closePopup();
    });
    popup.querySelector(".everest-wechat-close").addEventListener("click", closePopup);
  }

  function openPopup() {
    ensurePopup();
    document.getElementById(POPUP_ID).classList.add("is-open");
    if (window.everestTrackEvent) window.everestTrackEvent("wechat_open");
  }

  function closePopup() {
    var el = document.getElementById(POPUP_ID);
    if (el) el.classList.remove("is-open");
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".everest-wechat-btn");
    if (btn) {
      e.preventDefault();
      openPopup();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePopup();
  });
})();
