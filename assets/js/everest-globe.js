/**
 * Everest Trade — cobe globe (Bundle D palette), 2 routes per cycle.
 */
import createGlobe from "https://cdn.jsdelivr.net/npm/cobe/+esm";

var MARKERS = [
  { id: "russia", key: "geo_russia", abbrKey: "geo_abbr_russia", location: [55.7558, 37.6173], delay: 0 },
  { id: "china", key: "geo_china", abbrKey: "geo_abbr_china", location: [39.9042, 116.4074], delay: 0.35 },
  { id: "india", key: "geo_india", abbrKey: "geo_abbr_india", location: [28.6139, 77.209], delay: 0.7 },
  { id: "middle_east", key: "geo_middle_east", abbrKey: "geo_abbr_middle_east", location: [25.2048, 55.2708], delay: 1.05 },
  { id: "southeast_asia", key: "geo_southeast_asia", abbrKey: "geo_abbr_southeast_asia", location: [1.3521, 103.8198], delay: 1.4 },
];

var MARKER_BY_ID = {};
MARKERS.forEach(function (m) {
  MARKER_BY_ID[m.id] = m;
});

/** Premium dark globe — deep ocean base, warm land dots, unified overlays */
var OCEAN_RGB = [0.03, 0.07, 0.11];
var LAND_GLOW_RGB = [0.14, 0.22, 0.28];
var MARKER_RGB = [0.92, 0.9, 0.86];
var ARC_RGB = [0.78, 0.64, 0.35];

var COBE_STYLE = {
  dark: 1,
  diffuse: 1.15,
  mapBrightness: 4.2,
  mapBaseBrightness: 0.04,
  baseColor: OCEAN_RGB,
  markerColor: MARKER_RGB,
  glowColor: LAND_GLOW_RGB,
  arcColor: ARC_RGB,
  arcWidth: 0.32,
  arcHeight: 0.18,
  opacity: 0.94,
  markerSize: 0.024,
};

var ROUTE_HOLD_MS = 5000;
var ROUTE_GAP_MS = 1200;
var ROUTES_PER_VIEW = 2;
/** Single constant spin — no slow/fast when routes show/hide */
var SPIN_SPEED = 0.0042;

function buildRoutes() {
  var routes = [];
  for (var i = 0; i < MARKERS.length; i++) {
    for (var j = i + 1; j < MARKERS.length; j++) {
      var from = MARKERS[i];
      var to = MARKERS[j];
      routes.push({
        id: "route-" + from.id + "-" + to.id,
        from: from.location,
        to: to.location,
        fromId: from.id,
        toId: to.id,
      });
    }
  }
  return routes;
}

var ROUTES = buildRoutes();

function t(key) {
  var lang = localStorage.getItem("everest_lang") || "ru";
  var pack = window.EVEREST_I18N && window.EVEREST_I18N[lang];
  return (pack && pack[key]) || (window.EVEREST_I18N && window.EVEREST_I18N.ru && window.EVEREST_I18N.ru[key]) || key;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function markerName(marker) {
  if (!marker) return "";
  return t(marker.key) || marker.id;
}

function routeLabel(route) {
  var from = MARKER_BY_ID[route.fromId];
  var to = MARKER_BY_ID[route.toId];
  return markerName(from) + " → " + markerName(to);
}

function pairKey(routes) {
  return routes
    .map(function (r) {
      return r.id;
    })
    .sort()
    .join("|");
}

function pickRouteBatch(count, excludeKey) {
  if (ROUTES.length <= count) return ROUTES.slice();

  var shuffled = ROUTES.slice().sort(function () {
    return Math.random() - 0.5;
  });

  for (var i = 0; i < shuffled.length; i++) {
    var batch = [shuffled[i]];
    var usedIds = {};
    usedIds[shuffled[i].fromId] = true;
    usedIds[shuffled[i].toId] = true;

    for (var j = 0; j < shuffled.length && batch.length < count; j++) {
      if (j === i) continue;
      var candidate = shuffled[j];
      if (usedIds[candidate.fromId] || usedIds[candidate.toId]) continue;
      batch.push(candidate);
      usedIds[candidate.fromId] = true;
      usedIds[candidate.toId] = true;
    }

    if (batch.length === count) {
      var key = pairKey(batch);
      if (key !== excludeKey) return batch;
    }
  }

  return shuffled.slice(0, count);
}

function buildCountryLabel(marker) {
  var el = document.createElement("div");
  el.className = "everest-globe__label";
  el.setAttribute("data-marker-id", marker.id);
  el.style.positionAnchor = "--cobe-" + marker.id;

  var text = document.createElement("span");
  text.className = "everest-globe__label-text";
  text.setAttribute("data-i18n-key", marker.key);
  text.textContent = markerName(marker);

  el.appendChild(text);
  return el;
}

function buildPulseOverlay(marker) {
  var hub = document.createElement("div");
  hub.className = "everest-globe__hub";
  hub.setAttribute("data-marker-id", marker.id);
  hub.style.positionAnchor = "--cobe-" + marker.id;
  hub.style.opacity = "var(--cobe-visible-" + marker.id + ", 0)";
  hub.style.filter = "blur(calc((1 - var(--cobe-visible-" + marker.id + ", 0)) * 6px))";

  var pulse1 = document.createElement("span");
  pulse1.className = "everest-globe__hub-pulse";
  pulse1.style.animationDelay = marker.delay + "s";

  var pulse2 = document.createElement("span");
  pulse2.className = "everest-globe__hub-pulse everest-globe__hub-pulse--delay";
  pulse2.style.animationDelay = marker.delay + 0.5 + "s";

  var core = document.createElement("span");
  core.className = "everest-globe__hub-core";

  hub.appendChild(pulse1);
  hub.appendChild(pulse2);
  hub.appendChild(core);
  return hub;
}

function initGlobe(container) {
  if (!container || container.dataset.globeReady === "1") return;

  container.innerHTML = "";
  container.classList.add("everest-globe");

  var stage = document.createElement("div");
  stage.className = "everest-globe__stage";

  var canvas = document.createElement("canvas");
  canvas.className = "everest-globe__canvas";
  canvas.setAttribute("aria-hidden", "true");
  stage.appendChild(canvas);

  MARKERS.forEach(function (m) {
    stage.appendChild(buildPulseOverlay(m));
    stage.appendChild(buildCountryLabel(m));
  });

  container.appendChild(stage);
  container.dataset.globeReady = "1";

  var activeRoutes = prefersReducedMotion() ? [] : pickRouteBatch(ROUTES_PER_VIEW);
  var lastPairKey = pairKey(activeRoutes);
  var phase = prefersReducedMotion() ? "gap" : "show";
  var phaseStartedAt = Date.now();
  var arcLabelEls = {};

  function syncArcLabels() {
    Object.keys(arcLabelEls).forEach(function (id) {
      if (arcLabelEls[id] && arcLabelEls[id].parentNode) {
        arcLabelEls[id].parentNode.removeChild(arcLabelEls[id]);
      }
      delete arcLabelEls[id];
    });

    if (phase !== "show") return;

    activeRoutes.forEach(function (route) {
      var el = document.createElement("div");
      el.className = "everest-globe__arc-label";
      el.setAttribute("data-route-id", route.id);
      el.setAttribute("aria-live", "polite");
      el.style.positionAnchor = "--cobe-arc-" + route.id;
      el.style.setProperty("--arc-vis", "var(--cobe-visible-arc-" + route.id + ", 0)");
      el.textContent = routeLabel(route);
      stage.appendChild(el);
      arcLabelEls[route.id] = el;
    });
  }

  function updateCountryLabels() {
    var endpointIds = {};
    if (phase === "show") {
      activeRoutes.forEach(function (route) {
        endpointIds[route.fromId] = true;
        endpointIds[route.toId] = true;
      });
    }

    stage.querySelectorAll(".everest-globe__label").forEach(function (el) {
      var id = el.getAttribute("data-marker-id");
      el.classList.toggle("is-hidden-for-route", !!endpointIds[id]);
    });
  }

  function syncRouteUI() {
    syncArcLabels();
    updateCountryLabels();
  }

  syncRouteUI();

  function currentSpinSpeed() {
    if (prefersReducedMotion()) return 0.001;
    return SPIN_SPEED;
  }

  function maybeRotateRoutes() {
    if (prefersReducedMotion()) return;
    var elapsed = Date.now() - phaseStartedAt;
    if (phase === "show" && elapsed >= ROUTE_HOLD_MS) {
      phase = "gap";
      phaseStartedAt = Date.now();
      activeRoutes = [];
      syncRouteUI();
    } else if (phase === "gap" && elapsed >= ROUTE_GAP_MS) {
      phase = "show";
      phaseStartedAt = Date.now();
      activeRoutes = pickRouteBatch(ROUTES_PER_VIEW, lastPairKey);
      lastPairKey = pairKey(activeRoutes);
      syncRouteUI();
    }
  }

  function arcPayload() {
    if (prefersReducedMotion() || phase !== "show") return [];
    return activeRoutes.map(function (route) {
      return {
        id: route.id,
        from: route.from,
        to: route.to,
        color: COBE_STYLE.arcColor,
      };
    });
  }

  function markerPayload() {
    return MARKERS.map(function (m) {
      return {
        id: m.id,
        location: m.location,
        size: COBE_STYLE.markerSize,
        color: MARKER_RGB,
      };
    });
  }

  var pointerInteracting = null;
  var dragOffset = { phi: 0, theta: 0 };
  var phiOffset = 4.2;
  var thetaOffset = 0.15;
  var isPaused = false;
  var globe = null;
  var animationId = 0;
  var phi = 0;

  function onPointerDown(e) {
    pointerInteracting = { x: e.clientX, y: e.clientY };
    canvas.style.cursor = "grabbing";
    isPaused = true;
  }

  function onPointerMove(e) {
    if (!pointerInteracting) return;
    dragOffset = {
      phi: (e.clientX - pointerInteracting.x) / 300,
      theta: (e.clientY - pointerInteracting.y) / 1000,
    };
  }

  function onPointerUp() {
    if (pointerInteracting) {
      phiOffset += dragOffset.phi;
      thetaOffset += dragOffset.theta;
      dragOffset = { phi: 0, theta: 0 };
    }
    pointerInteracting = null;
    canvas.style.cursor = "grab";
    isPaused = false;
  }

  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });

  function startGlobe() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var renderSize = 520 * dpr;
    if (globe) return;

    globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: renderSize,
      height: renderSize,
      phi: phiOffset,
      theta: 0.2 + thetaOffset,
      dark: COBE_STYLE.dark,
      diffuse: COBE_STYLE.diffuse,
      mapSamples: prefersReducedMotion() ? 8000 : 16000,
      mapBrightness: COBE_STYLE.mapBrightness,
      mapBaseBrightness: COBE_STYLE.mapBaseBrightness,
      baseColor: COBE_STYLE.baseColor,
      markerColor: COBE_STYLE.markerColor,
      glowColor: COBE_STYLE.glowColor,
      markerElevation: 0,
      markers: markerPayload(),
      arcs: arcPayload(),
      arcColor: COBE_STYLE.arcColor,
      arcWidth: COBE_STYLE.arcWidth,
      arcHeight: COBE_STYLE.arcHeight,
      opacity: COBE_STYLE.opacity,
    });

    canvas.style.opacity = "1";

    function animate() {
      maybeRotateRoutes();
      if (!isPaused) phi += currentSpinSpeed();
      globe.update({
        phi: phi + phiOffset + dragOffset.phi,
        theta: 0.2 + thetaOffset + dragOffset.theta,
        markers: markerPayload(),
        arcs: arcPayload(),
        mapBrightness: COBE_STYLE.mapBrightness,
        mapBaseBrightness: COBE_STYLE.mapBaseBrightness,
        baseColor: COBE_STYLE.baseColor,
        arcColor: COBE_STYLE.arcColor,
        markerColor: COBE_STYLE.markerColor,
        glowColor: COBE_STYLE.glowColor,
      });

      activeRoutes.forEach(function (route) {
        var el = arcLabelEls[route.id];
        if (el) {
          el.style.setProperty("--arc-vis", "var(--cobe-visible-arc-" + route.id + ", 0)");
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();
  }

  if (canvas.offsetWidth > 0) startGlobe();
  else {
    var ro = new ResizeObserver(function (entries) {
      if (entries[0] && entries[0].contentRect.width > 0) {
        ro.disconnect();
        startGlobe();
      }
    });
    ro.observe(canvas);
  }

  function refreshTexts() {
    stage.querySelectorAll(".everest-globe__label-text[data-i18n-key]").forEach(function (text) {
      var key = text.getAttribute("data-i18n-key");
      if (key) text.textContent = t(key);
    });
    activeRoutes.forEach(function (route) {
      var el = arcLabelEls[route.id];
      if (el) el.textContent = routeLabel(route);
    });
  }

  document.addEventListener("everest:langchange", refreshTexts);

  container._everestGlobeDestroy = function () {
    cancelAnimationFrame(animationId);
    if (globe) globe.destroy();
    canvas.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    document.removeEventListener("everest:langchange", refreshTexts);
  };
}

function tryInit() {
  var container = document.querySelector(".everest-globe-root");
  if (container && container.dataset.globeReady !== "1") initGlobe(container);
}

function boot() {
  tryInit();
  if (document.querySelector(".everest-globe-root[data-globe-ready='1']")) return;

  var observer = new MutationObserver(function () {
    tryInit();
    if (document.querySelector(".everest-globe-root[data-globe-ready='1']")) observer.disconnect();
  });

  if (document.body) observer.observe(document.body, { childList: true, subtree: true });
  else {
    document.addEventListener("DOMContentLoaded", function () {
      observer.observe(document.body, { childList: true, subtree: true });
      tryInit();
    });
  }
}

window.everestInitGlobe = tryInit;

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
