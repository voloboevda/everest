(function () {
  "use strict";

  var CFG = window.__EVEREST_CONFIG || {};
  var LANG_KEY = "everest_lang";
  var currentLang = localStorage.getItem(LANG_KEY) || "ru";

  function t(key) {
    var pack = window.EVEREST_I18N && window.EVEREST_I18N[currentLang];
    return (pack && pack[key]) || (window.EVEREST_I18N.ru && window.EVEREST_I18N.ru[key]) || key;
  }

  function applyI18n() {
    document.documentElement.lang = currentLang === "zh" ? "zh" : currentLang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var label = el.querySelector(".btn-text");
      if (label) {
        label.textContent = t(key);
      } else if (el.classList.contains("text-roll")) {
        el.setAttribute("data-roll-text", t(key));
      } else {
        el.textContent = t(key);
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var alt = t(el.getAttribute("data-i18n-alt"));
      if (alt) el.setAttribute("alt", alt);
    });

    document.querySelectorAll("[data-aria-i18n]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-aria-i18n")));
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === currentLang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      if (active) {
        btn.setAttribute("data-active", "true");
      } else {
        btn.removeAttribute("data-active");
      }
    });

    if (currentLang === "zh" && window.everestLoadChinaAnalytics) {
      window.everestLoadChinaAnalytics();
    }
    if (window.everestTrackEvent) window.everestTrackEvent("lang_switch", { lang: currentLang });

    document.dispatchEvent(
      new CustomEvent("everest:langchange", { detail: { lang: currentLang } })
    );
  }

  function setLang(lang) {
    if (!window.EVEREST_I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyI18n();
  }

  function initLangSwitch() {
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
    applyI18n();
  }

  function initYear() {
    var y = document.getElementById("current-year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function buildMessageBody(data) {
    var parts = [];
    if (data.phone) parts.push("Phone: " + data.phone);
    if (data.website) parts.push("Website: " + data.website);
    if (data.message) {
      if (parts.length) parts.push("---");
      parts.push(data.message);
    }
    return parts.join("\n");
  }

  function readFormData(form) {
    return {
      firstName: (form.FirstName && form.FirstName.value.trim()) || "",
      lastName: (form.LastName && form.LastName.value.trim()) || "",
      email: (form.Email && form.Email.value.trim()) || "",
      phone: (form.Phone && form.Phone.value.trim()) || "",
      company: (form.Company && form.Company.value.trim()) || "",
      website: (form.Website && form.Website.value.trim()) || "",
      message: (form.Message && form.Message.value.trim()) || "",
      consent: form.Consent && form.Consent.checked,
    };
  }

  function copyToTildaForm(data) {
    var form = document.querySelector(CFG.tildaFormSelector || "#form2091691681");
    if (!form) return false;

    var fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
    var map = {
      name: fullName,
      Company: data.company,
      Country: "",
      Email: data.email,
      Message: buildMessageBody(data),
    };

    Object.keys(map).forEach(function (name) {
      var input = form.querySelector('[name="' + name + '"]');
      if (input) {
        input.value = map[name] || "";
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    var consent = form.querySelector('[name="Consent"]');
    if (consent) consent.checked = !!data.consent;

    var submit = form.querySelector('button[type="submit"], .t-submit');
    if (submit) {
      submit.click();
      return true;
    }
    return false;
  }

  async function postWebhook(data) {
    if (!CFG.webhookUrl) return;
    await fetch(CFG.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.assign({}, data, { lang: currentLang, source: location.href })
      ),
    });
  }

  function clearFormErrors(form) {
    form.querySelectorAll(".contact-field-input, .contact-checkbox input").forEach(function (el) {
      el.removeAttribute("aria-invalid");
      el.classList.remove("is-invalid");
    });
    form.querySelectorAll(".contact-checkbox.is-invalid").forEach(function (el) {
      el.classList.remove("is-invalid");
    });
    var status = form.querySelector(".form-status");
    if (status) {
      status.textContent = "";
      status.classList.remove("is-error", "is-success");
    }
  }

  function setFormStatus(form, message, type) {
    var status = form.querySelector(".form-status");
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", type === "error");
    status.classList.toggle("is-success", type === "success");
  }

  function markInvalidField(el) {
    el.setAttribute("aria-invalid", "true");
    el.classList.add("is-invalid");
    if (el.type === "checkbox") {
      var wrap = el.closest(".contact-checkbox");
      if (wrap) wrap.classList.add("is-invalid");
    }
  }

  function validateForm(form) {
    clearFormErrors(form);
    var firstInvalid = null;

    form.querySelectorAll("input, textarea, select").forEach(function (el) {
      if (el.closest(".form-honeypot")) return;
      if (el.type === "checkbox") return;
      if (!el.checkValidity()) {
        markInvalidField(el);
        if (!firstInvalid) firstInvalid = el;
      }
    });

    var consent = form.querySelector('[name="Consent"]');
    if (consent && !consent.checked) {
      markInvalidField(consent);
      if (!firstInvalid) firstInvalid = consent;
    }

    if (firstInvalid) {
      setFormStatus(form, t("form_invalid"), "error");
      firstInvalid.focus({ preventScroll: true });
      return false;
    }

    return true;
  }

  function initForm() {
    document.querySelectorAll(".contact-form").forEach(function (form) {
      form.addEventListener("input", function (e) {
        var el = e.target;
        if (!el || !el.classList || !el.classList.contains("is-invalid")) return;
        if (el.type === "checkbox" ? el.checked : el.checkValidity()) {
          el.removeAttribute("aria-invalid");
          el.classList.remove("is-invalid");
          if (el.type === "checkbox") {
            var wrap = el.closest(".contact-checkbox");
            if (wrap) wrap.classList.remove("is-invalid");
          }
        }
      });

      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        var status = form.querySelector(".form-status");
        var honeypot = form.querySelector('[name="website_hp"]');
        if (honeypot && honeypot.value) return;

        if (!validateForm(form)) return;

        var data = readFormData(form);

        var submitBtn = form.querySelector(".contact-form-submit");
        if (submitBtn) submitBtn.classList.add("is-loading");

        var payload = Object.assign({}, data, {
          name: [data.firstName, data.lastName].filter(Boolean).join(" "),
          source_form: form.id || "contact-form",
        });

        try {
          var viaTilda = copyToTildaForm(data);
          await postWebhook(payload);
          if (window.everestTrackRfqSubmit) window.everestTrackRfqSubmit();
          setFormStatus(form, t("form_success"), "success");
          if (viaTilda) form.reset();
        } catch (err) {
          setFormStatus(form, t("form_error"), "error");
          console.error(err);
        } finally {
          if (submitBtn) submitBtn.classList.remove("is-loading");
        }
      });
    });
  }

  function initModals() {
    document.querySelectorAll(".doc-action").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var modal = document.getElementById("doc-modal");
        var img = document.getElementById("doc-modal-image");
        if (!modal || !img) return;
        img.src = btn.getAttribute("data-file") || "";
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
      });
    });

    document.querySelectorAll(".modal-close").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var modal = btn.closest(".modal");
        if (modal) {
          modal.classList.remove("is-open");
          modal.setAttribute("aria-hidden", "true");
        }
      });
    });
  }

  function init() {
    initLangSwitch();
    initYear();
    initForm();
    initModals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
