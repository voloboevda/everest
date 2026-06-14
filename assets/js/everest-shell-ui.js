(function () {
  "use strict";

  var root = document.getElementById("everest-app");
  if (!root) return;

  var burger = document.getElementById("nav-burger");
  var menu = document.getElementById("menu-overlay");
  var rfqModal = document.getElementById("rfq-modal");
  var rfqBackdrop = document.getElementById("rfq-backdrop");

  function lockScroll(on) {
    root.classList.toggle("is-locked", on);
    document.documentElement.style.overflow = on ? "hidden" : "";
  }

  function isMenuOpen() {
    return root.classList.contains("menu-open");
  }

  function isRfqOpen() {
    return root.classList.contains("rfq-open");
  }

  function openMenu() {
    root.classList.add("menu-open");
    if (burger) {
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Close menu");
    }
    if (menu) menu.setAttribute("aria-hidden", "false");
    lockScroll(true);
  }

  function closeMenu() {
    root.classList.remove("menu-open");
    if (burger) {
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Menu");
    }
    if (menu) menu.setAttribute("aria-hidden", "true");
    if (!isRfqOpen()) lockScroll(false);
  }

  function toggleMenu() {
    if (isMenuOpen()) closeMenu();
    else openMenu();
  }

  function openRfq() {
    closeMenu();
    root.classList.add("rfq-open");
    if (rfqModal) {
      rfqModal.setAttribute("aria-hidden", "false");
      var first = rfqModal.querySelector(".contact-form input:not([tabindex='-1'])");
      if (first) window.setTimeout(function () { first.focus(); }, 50);
    }
    if (rfqBackdrop) rfqBackdrop.setAttribute("aria-hidden", "false");
    lockScroll(true);
    if (window.everestTrackEvent) window.everestTrackEvent("rfq_modal_open", {});
  }

  function closeRfq() {
    root.classList.remove("rfq-open");
    if (rfqModal) rfqModal.setAttribute("aria-hidden", "true");
    if (rfqBackdrop) rfqBackdrop.setAttribute("aria-hidden", "true");
    if (!isMenuOpen()) lockScroll(false);
  }

  function initMenu() {
    if (burger) burger.addEventListener("click", toggleMenu);

    root.querySelectorAll("[data-menu-close]").forEach(function (el) {
      el.addEventListener("click", closeMenu);
    });

    if (menu) {
      menu.addEventListener("click", function (e) {
        if (e.target === menu || e.target.classList.contains("menu-overlay-bg")) {
          closeMenu();
        }
      });
    }
  }

  function initRfq() {
    root.querySelectorAll("[data-open-rfq]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        openRfq();
      });
    });

    root.querySelectorAll("[data-close-rfq]").forEach(function (el) {
      el.addEventListener("click", closeRfq);
    });

    if (rfqBackdrop) {
      rfqBackdrop.addEventListener("click", closeRfq);
    }

  }

  function initEscape() {
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (isRfqOpen()) closeRfq();
      else if (isMenuOpen()) closeMenu();
    });
  }

  function init() {
    initMenu();
    initRfq();
    initEscape();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
