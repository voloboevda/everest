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

  function buildMessageBody(data, opts) {
    var parts = [];
    var skipPhone = opts && opts.skipPhone;
    if (data.phone && !skipPhone) parts.push("Phone: " + data.phone);
    if (data.website) parts.push("Website: " + data.website);
    if (data.company) parts.push("Company: " + data.company);
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

  function getTildaBridgeForm() {
    if (CFG.tildaFormSelector) {
      var target = document.querySelector(CFG.tildaFormSelector);
      if (target) return target.tagName === "FORM" ? target : target.querySelector("form");
    }

    var forms = document.querySelectorAll('form[id^="form"]');
    for (var i = 0; i < forms.length; i++) {
      var candidate = forms[i];
      if (candidate.closest(".everest-root")) continue;
      var hasEmail = candidate.querySelector('[name="Email"], [name="email"]');
      var hasName = candidate.querySelector('[name="name"], [name="Name"]');
      if (hasEmail && hasName) return candidate;
    }
    return null;
  }

  function hideTildaBridgeBlock(form) {
    if (!form) return;
    var rec = CFG.tildaFormRecId
      ? document.getElementById(CFG.tildaFormRecId)
      : form.closest('[id^="rec"]');
    if (!rec) return;
    rec.setAttribute("data-everest-tilda-bridge", "hidden");
    rec.style.setProperty("position", "fixed", "important");
    rec.style.setProperty("left", "-10000px", "important");
    rec.style.setProperty("top", "0", "important");
    rec.style.setProperty("width", "1px", "important");
    rec.style.setProperty("height", "1px", "important");
    rec.style.setProperty("overflow", "hidden", "important");
    rec.style.setProperty("opacity", "0", "important");
    rec.style.setProperty("pointer-events", "none", "important");
    rec.style.setProperty("display", "block", "important");
  }

  function setTildaField(form, names, value) {
    var list = Array.isArray(names) ? names : [names];
    for (var i = 0; i < list.length; i++) {
      var input = form.querySelector('[name="' + list[i] + '"]');
      if (!input) continue;
      input.value = value || "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      input.dispatchEvent(new Event("blur", { bubbles: true }));
      return true;
    }
    return false;
  }

  function getTildaFormErrors(form) {
    return Array.prototype.map.call(
      form.querySelectorAll(".t-input-error"),
      function (el) {
        return (el.textContent || "").trim();
      }
    ).filter(Boolean);
  }

  function isTildaFormSuccess(form) {
    var box = form.querySelector(".js-successbox");
    if (!box) return false;
    return box.style.display !== "none" && getComputedStyle(box).display !== "none";
  }

  function waitForTildaFormResult(form, timeoutMs) {
    var deadline = Date.now() + (timeoutMs || 8000);
    return new Promise(function (resolve) {
      function poll() {
        if (isTildaFormSuccess(form)) {
          resolve(true);
          return;
        }
        var errors = getTildaFormErrors(form);
        if (errors.length) {
          console.warn("Everest: Tilda bridge validation:", errors.join("; "));
          resolve(false);
          return;
        }
        if (Date.now() >= deadline) {
          console.warn("Everest: Tilda bridge submit timeout");
          resolve(false);
          return;
        }
        window.setTimeout(poll, 120);
      }
      poll();
    });
  }

  async function copyToTildaForm(data) {
    var form = getTildaBridgeForm();
    if (!form) return false;

    var fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
    setTildaField(form, ["name", "Name"], fullName);
    setTildaField(form, ["Company", "company"], data.company);
    setTildaField(form, ["Country", "country"], "");
    setTildaField(form, ["Email", "email"], data.email);
    // Skip Phone on bridge — Tilda phonemask rejects programmatic values; phone goes to Comments.
    setTildaField(form, ["Phone", "phone"], "");
    setTildaField(
      form,
      ["Message", "message", "Comments", "comments", "form"],
      buildMessageBody(data)
    );

    var consent = form.querySelector('[name="Consent"], [name="consent"]');
    if (consent) consent.checked = !!data.consent;

    var submit = form.querySelector('button[type="submit"], .t-submit');
    if (!submit) return false;

    submit.click();
    return waitForTildaFormResult(form, 8000);
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
    hideTildaBridgeBlock(getTildaBridgeForm());

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
          var viaTilda = await copyToTildaForm(data);
          if (CFG.tildaFormRequired && !viaTilda) {
            setFormStatus(form, t("form_error"), "error");
            console.error("Everest: Tilda bridge submit failed. Check form notifications in Tilda.");
            return;
          }
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
