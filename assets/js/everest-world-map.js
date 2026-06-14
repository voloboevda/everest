/**
 * Everest Trade — WorldMap (21st.dev / dotted-map template, vanilla port)
 * Original projectPoint + dotted-map background; only locations changed.
 */
import DottedMapPkg from "https://cdn.jsdelivr.net/npm/dotted-map@2.2.3/+esm";

var DottedMap = DottedMapPkg.default || DottedMapPkg;

var VIEW_W = 800;
var VIEW_H = 400;
var LINE_COLOR = "#C8A45A";

/** Real coordinates — Moscow, Beijing, New Delhi, Dubai, Singapore */
var MARKERS = [
  { lat: 55.7558, lng: 37.6173, key: "geo_russia" },
  { lat: 39.9042, lng: 116.4074, key: "geo_china" },
  { lat: 28.6139, lng: 77.209, key: "geo_india" },
  { lat: 25.2048, lng: 55.2708, key: "geo_middle_east" },
  { lat: 1.3521, lng: 103.8198, key: "geo_southeast_asia" },
];

function t(key) {
  var lang = localStorage.getItem("everest_lang") || "ru";
  var pack = window.EVEREST_I18N && window.EVEREST_I18N[lang];
  return (pack && pack[key]) || (window.EVEREST_I18N && window.EVEREST_I18N.ru && window.EVEREST_I18N.ru[key]) || key;
}

function projectPoint(lat, lng) {
  return {
    x: (lng + 180) * (VIEW_W / 360),
    y: (90 - lat) * (VIEW_H / 180),
  };
}

function buildDotsSvg() {
  var map = new DottedMap({ height: 100, grid: "diagonal" });
  return map.getSVG({
    radius: 0.22,
    color: "#00304840",
    shape: "circle",
    backgroundColor: "white",
  });
}

function createMarkerPoint(marker, index, mobileTip, setHovered) {
  var point = projectPoint(marker.lat, marker.lng);
  var label = t(marker.key);
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("data-i18n-key", marker.key);
  g.classList.add("world-map__marker");
  g.style.cursor = "pointer";

  var pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  pulse.setAttribute("cx", String(point.x));
  pulse.setAttribute("cy", String(point.y));
  pulse.setAttribute("r", "3");
  pulse.setAttribute("fill", LINE_COLOR);
  pulse.setAttribute("opacity", "0.5");

  var animR = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  animR.setAttribute("attributeName", "r");
  animR.setAttribute("from", "3");
  animR.setAttribute("to", "12");
  animR.setAttribute("dur", "2s");
  animR.setAttribute("begin", index * 0.5 + "s");
  animR.setAttribute("repeatCount", "indefinite");
  pulse.appendChild(animR);

  var animO = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  animO.setAttribute("attributeName", "opacity");
  animO.setAttribute("from", "0.6");
  animO.setAttribute("to", "0");
  animO.setAttribute("dur", "2s");
  animO.setAttribute("begin", index * 0.5 + "s");
  animO.setAttribute("repeatCount", "indefinite");
  pulse.appendChild(animO);

  var core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  core.setAttribute("cx", String(point.x));
  core.setAttribute("cy", String(point.y));
  core.setAttribute("r", "3");
  core.setAttribute("fill", LINE_COLOR);
  core.setAttribute("filter", "url(#world-map-glow)");

  g.appendChild(pulse);
  g.appendChild(core);

  var labelG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  labelG.classList.add("world-map__label-group");
  labelG.setAttribute("pointer-events", "none");

  var fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
  fo.setAttribute("x", String(point.x - 50));
  fo.setAttribute("y", String(point.y - 35));
  fo.setAttribute("width", "100");
  fo.setAttribute("height", "30");
  fo.innerHTML =
    '<div xmlns="http://www.w3.org/1999/xhtml" class="world-map__label-chip"><span></span></div>';
  fo.querySelector("span").textContent = label;
  labelG.appendChild(fo);
  g.appendChild(labelG);

  function show() {
    setHovered(label);
    g.classList.add("is-hovered");
  }
  function hide() {
    setHovered(null);
    g.classList.remove("is-hovered");
  }

  g.addEventListener("mouseenter", show);
  g.addEventListener("mouseleave", hide);
  g.addEventListener("focus", show);
  g.addEventListener("blur", hide);
  g.setAttribute("tabindex", "0");
  g.setAttribute("role", "button");
  g.setAttribute("aria-label", label);

  return g;
}

function updateLabels(root) {
  root.querySelectorAll(".world-map__marker").forEach(function (g) {
    var key = g.getAttribute("data-i18n-key");
    if (!key) return;
    var label = t(key);
    g.setAttribute("aria-label", label);
    var span = g.querySelector(".world-map__label-chip span");
    if (span) span.textContent = label;
  });
}

function initWorldMap(container) {
  if (!container || container.dataset.mapReady === "1") return;

  var svgMap = buildDotsSvg();
  var hovered = null;
  var mobileTip;

  function setHovered(value) {
    hovered = value;
    if (mobileTip) {
      if (value) {
        mobileTip.textContent = value;
        mobileTip.hidden = false;
      } else {
        mobileTip.hidden = true;
      }
    }
  }

  container.innerHTML = "";
  container.classList.add("world-map");

  var frame = document.createElement("div");
  frame.className = "world-map__frame";

  var img = document.createElement("img");
  img.className = "world-map__bg";
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgMap);
  img.alt = "";
  img.setAttribute("draggable", "false");
  img.width = 1056;
  img.height = 495;
  frame.appendChild(img);

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 " + VIEW_W + " " + VIEW_H);
  svg.classList.add("world-map__svg");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML =
    '<filter id="world-map-glow"><feMorphology operator="dilate" radius="0.5"/><feGaussianBlur stdDeviation="1" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
  svg.appendChild(defs);

  MARKERS.forEach(function (marker, i) {
    svg.appendChild(createMarkerPoint(marker, i, null, setHovered));
  });

  frame.appendChild(svg);

  mobileTip = document.createElement("div");
  mobileTip.className = "world-map__mobile-tip";
  mobileTip.hidden = true;
  frame.appendChild(mobileTip);

  container.appendChild(frame);
  container.dataset.mapReady = "1";

  document.addEventListener("everest:langchange", function () {
    updateLabels(container);
  });
}

function tryInit() {
  var container = document.querySelector(".everest-world-map");
  if (container) initWorldMap(container);
}

function boot() {
  tryInit();
  if (document.querySelector(".everest-world-map[data-map-ready='1']")) return;

  var observer = new MutationObserver(function () {
    tryInit();
    if (document.querySelector(".everest-world-map[data-map-ready='1']")) observer.disconnect();
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      observer.observe(document.body, { childList: true, subtree: true });
      tryInit();
    });
  }
}

window.everestInitWorldMap = tryInit;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
