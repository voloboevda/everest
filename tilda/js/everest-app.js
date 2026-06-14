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

  function readField(form, name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el && typeof el.value === "string" ? el.value.trim() : "";
  }

  function readFormData(form) {
    var consent = form.querySelector('[name="Consent"]');
    return {
      firstName: readField(form, "FirstName"),
      lastName: readField(form, "LastName"),
      email: readField(form, "Email"),
      phone: readField(form, "Phone"),
      company: readField(form, "Company"),
      website: readField(form, "Website"),
      message: readField(form, "Message"),
      consent: !!(consent && consent.checked),
    };
  }

  var bridgeSubmitQueue = Promise.resolve();

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
    rec.style.setProperty("display", "block", "important");
    rec.style.setProperty("z-index", "-1", "important");
  }

  function clearTildaFormErrors(form) {
    form.querySelectorAll(".t-input-error").forEach(function (el) {
      el.textContent = "";
    });
  }

  function disableBridgePhoneField(form) {
    form.querySelectorAll('[data-field-name="Phone"], [data-field-type="ph"]').forEach(function (group) {
      group.style.setProperty("display", "none", "important");
    });
    form.querySelectorAll('[name="Phone"], .js-phonemask-input').forEach(function (el) {
      el.value = "";
      el.removeAttribute("required");
      el.removeAttribute("aria-required");
    });
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
    if (box && box.style.display !== "none" && getComputedStyle(box).display !== "none") {
      return true;
    }
    return isTildaGlobalSuccess();
  }

  function isTildaGlobalSuccess() {
    var popup = document.querySelector(
      ".t-popup.t-popup_show, .t-popup_show, .t-form-success-popup.t-popup_show, .t-form-success-popup_show"
    );
    if (popup && popup.offsetParent !== null) return true;

    var nodes = document.querySelectorAll(".t-popup, .t-form-success-popup, .t-overlay");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (getComputedStyle(node).display === "none" || getComputedStyle(node).visibility === "hidden") {
        continue;
      }
      var text = (node.textContent || "").toLowerCase();
      if (
        text.indexOf("спасибо") !== -1 ||
        text.indexOf("thank") !== -1 ||
        text.indexOf("успешно отправлен") !== -1 ||
        text.indexOf("successfully") !== -1
      ) {
        return true;
      }
    }
    return false;
  }

  function dismissTildaSuccessUi() {
    document.querySelectorAll(
      ".t-popup__close, .t-popup .t-close, .t-form-success-popup .t-btn, .t-form-success-popup button"
    ).forEach(function (btn) {
      try {
        btn.click();
      } catch (e) {}
    });
    document.querySelectorAll(".t-popup, .t-form-success-popup, .t-overlay").forEach(function (el) {
      el.classList.remove("t-popup_show");
      el.style.display = "none";
    });
  }

  function initTildaBridgeGuard(form) {
    if (!form || form.dataset.everestBridgeGuard) return;
    form.dataset.everestBridgeGuard = "1";
    form.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
      },
      true
    );
  }

  function triggerTildaBridgeSubmit(form, submit) {
    if (window.tildaForm && typeof window.tildaForm.send === "function") {
      window.tildaForm.send(form, submit);
      return;
    }
    if (typeof form.requestSubmit === "function") {
      try {
        form.requestSubmit(submit);
      } catch (e) {
        submit.click();
      }
      return;
    }
    submit.click();
  }

  function resetTildaBridgeForm(form) {
    if (!form) return;
    dismissTildaSuccessUi();

    form.classList.remove("js-send-form-success", "t-form_success", "t-form_send");
    var rec = form.closest('[id^="rec"]');
    if (rec) {
      rec.classList.remove("t-form_send", "t-form_success", "js-send-form-success");
    }

    form.querySelectorAll(".js-successbox, .t-form__successbox").forEach(function (box) {
      box.style.display = "none";
      box.style.visibility = "hidden";
      box.setAttribute("aria-hidden", "true");
    });
    form.querySelectorAll(".js-errorbox, .t-form__errorbox").forEach(function (box) {
      box.style.display = "none";
    });

    clearTildaFormErrors(form);
    disableBridgePhoneField(form);
  }

  function sawTildaFormNetworkSuccess(sinceMs) {
    if (!window.performance || !performance.getEntriesByType) return false;
    var entries = performance.getEntriesByType("resource");
    for (var i = entries.length - 1; i >= 0; i--) {
      var entry = entries[i];
      if (entry.startTime < sinceMs) break;
      if (!/\/forms\.tildacdn\.com\/|\/api\/forms\/|forms\.tildaapi\.com/i.test(entry.name)) continue;
      if (!entry.responseStatus || entry.responseStatus < 200 || entry.responseStatus >= 400) continue;
      return true;
    }
    return false;
  }

  function isBridgeFormEvent(form, e) {
    if (!e) return false;
    var target = e.target;
    if (target === form) return true;
    if (target && target.id && target.id === form.id) return true;
    if (e.detail && e.detail.form === form) return true;
    return false;
  }

  function waitForTildaFormResult(form, timeoutMs, startedAt) {
    var deadline = Date.now() + (timeoutMs || 15000);
    var errorsAfter = Date.now() + 1500;
    var perfSince = typeof startedAt === "number" ? startedAt : performance.timeOrigin || 0;
    var resolved = false;
    var hadInlineSuccess = (function () {
      var box = form.querySelector(".js-successbox");
      return !!(
        box &&
        box.style.display !== "none" &&
        getComputedStyle(box).display !== "none"
      );
    })();

    return new Promise(function (resolve) {
      function finish(ok) {
        if (resolved) return;
        resolved = true;
        observer.disconnect();
        form.removeEventListener("tildaform:aftersuccess", onSuccess);
        form.removeEventListener("tildaform:aftererror", onError);
        document.removeEventListener("tildaform:aftersuccess", onDocSuccess);
        document.removeEventListener("tildaform:aftererror", onDocError);
        document.body.classList.remove("everest-rfq-pending");
        if (ok) dismissTildaSuccessUi();
        resolve(ok);
      }

      function onSuccess(e) {
        if (isBridgeFormEvent(form, e)) finish(true);
      }

      function onError(e) {
        if (isBridgeFormEvent(form, e)) finish(false);
      }

      function onDocSuccess(e) {
        onSuccess(e);
      }

      function onDocError(e) {
        onError(e);
      }

      form.addEventListener("tildaform:aftersuccess", onSuccess);
      form.addEventListener("tildaform:aftererror", onError);
      document.addEventListener("tildaform:aftersuccess", onDocSuccess);
      document.addEventListener("tildaform:aftererror", onDocError);

      function check() {
        if (sawTildaFormNetworkSuccess(perfSince)) {
          finish(true);
          return;
        }
        var box = form.querySelector(".js-successbox");
        var inlineSuccess =
          box &&
          box.style.display !== "none" &&
          getComputedStyle(box).display !== "none";
        if (inlineSuccess && !hadInlineSuccess) {
          finish(true);
          return;
        }
        if (isTildaGlobalSuccess()) {
          finish(true);
        }
      }

      var observer = new MutationObserver(check);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });

      function poll() {
        check();
        if (resolved) return;
        if (Date.now() >= errorsAfter) {
          var errors = getTildaFormErrors(form);
          if (errors.length) {
            console.warn("Everest: Tilda bridge validation:", errors.join("; "));
            finish(false);
            return;
          }
        }
        if (Date.now() >= deadline) {
          console.warn("Everest: Tilda bridge submit timeout");
          finish(false);
          return;
        }
        window.setTimeout(poll, 120);
      }
      poll();
    });
  }

  function buildBridgeComments(data, sourceForm) {
    var parts = [];
    if (sourceForm) parts.push("Source: " + sourceForm);
    var body = buildMessageBody(data);
    if (body) {
      if (parts.length) parts.push("---");
      parts.push(body);
    }
    return parts.join("\n");
  }

  async function copyToTildaFormOnce(data, sourceForm) {
    var form = getTildaBridgeForm();
    if (!form) return false;

    resetTildaBridgeForm(form);

    var fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
    setTildaField(form, ["name", "Name"], fullName);
    setTildaField(form, ["Company", "company"], data.company);
    setTildaField(form, ["Country", "country"], "");
    setTildaField(form, ["Email", "email"], data.email);
    setTildaField(
      form,
      ["Message", "message", "Comments", "comments", "form"],
      buildBridgeComments(data, sourceForm)
    );

    var consent = form.querySelector('[name="Consent"], [name="consent"]');
    if (consent) consent.checked = !!data.consent;

    var submit = form.querySelector('button[type="submit"], .t-submit');
    if (!submit) return false;

    document.body.classList.add("everest-rfq-pending");
    var perfMark = performance.now ? performance.now() : 0;

    triggerTildaBridgeSubmit(form, submit);

    var ok = await waitForTildaFormResult(form, 15000, perfMark);
    if (!ok) resetTildaBridgeForm(form);
    return ok;
  }

  function copyToTildaForm(data, sourceForm) {
    var job = bridgeSubmitQueue.then(function () {
      return copyToTildaFormOnce(data, sourceForm);
    });
    bridgeSubmitQueue = job.catch(function () {});
    return job;
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

  function closeRfqModal() {
    var root = document.getElementById("everest-app");
    if (!root || !root.classList.contains("rfq-open")) return;
    root.classList.remove("rfq-open");
    var modal = document.getElementById("rfq-modal");
    var backdrop = document.getElementById("rfq-backdrop");
    if (modal) modal.setAttribute("aria-hidden", "true");
    if (backdrop) backdrop.setAttribute("aria-hidden", "true");
    if (!root.classList.contains("menu-open")) {
      root.classList.remove("is-locked");
      document.documentElement.style.overflow = "";
    }
  }

  function initForm() {
    var bridge = getTildaBridgeForm();
    hideTildaBridgeBlock(bridge);
    disableBridgePhoneField(bridge);
    initTildaBridgeGuard(bridge);

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
          var viaTilda = await copyToTildaForm(data, form.id || "contact-form");
          if (CFG.tildaFormRequired && !viaTilda) {
            setFormStatus(form, t("form_error"), "error");
            console.error("Everest: Tilda bridge submit failed. Check form notifications in Tilda.");
            return;
          }
          await postWebhook(payload);
          if (window.everestTrackRfqSubmit) window.everestTrackRfqSubmit();
          setFormStatus(form, t("form_success"), "success");
          form.reset();
          if (form.id === "contact-form") {
            window.setTimeout(closeRfqModal, 1800);
          }
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
