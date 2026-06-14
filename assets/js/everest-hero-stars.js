/**
 * Everest Trade — hero starfield (white / blue / gold)
 * Canvas parallax; respects prefers-reduced-motion.
 */
(function () {
  "use strict";

  var COLORS = ["#dde8ee", "#6aafc4", "#c4a872"];
  var LAYERS = [
    { count: 320, size: 0.8, speed: 0.018 },
    { count: 140, size: 1.4, speed: 0.011 },
    { count: 70, size: 2.1, speed: 0.007 },
  ];

  function init() {
    var root = document.querySelector(".hero-stars");
    if (!root) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var canvas = document.createElement("canvas");
    canvas.className = "hero-stars__canvas";
    canvas.setAttribute("aria-hidden", "true");
    root.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var stars = [];
    var width = 0;
    var height = 0;
    var dpr = 1;
    var offsetX = 0;
    var offsetY = 0;
    var targetX = 0;
    var targetY = 0;
    var rafId = 0;
    var running = false;

    function buildStars() {
      stars = [];
      LAYERS.forEach(function (layer, layerIndex) {
        for (var i = 0; i < layer.count; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height * 2,
            size: layer.size,
            speed: layer.speed,
            color: COLORS[(i + layerIndex) % COLORS.length],
            twinkle: Math.random() * Math.PI * 2,
          });
        }
      });
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = root.clientWidth;
      height = root.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < stars.length; i++) {
        var star = stars[i];
        if (!reduced) {
          star.y -= star.speed * 60;
          if (star.y < -4) star.y = height + 4;
          star.twinkle += 0.02;
        }

        var alpha = reduced ? 0.62 : 0.52 + Math.sin(star.twinkle) * 0.22;
        var px = star.x + offsetX * (star.size * 0.35);
        var py = star.y + offsetY * (star.size * 0.35);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    }

    function tick() {
      offsetX += (targetX - offsetX) * 0.06;
      offsetY += (targetY - offsetY) * 0.06;
      draw();
      if (running) rafId = window.requestAnimationFrame(tick);
    }

    function onMove(e) {
      var rect = root.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      targetX = -(e.clientX - cx) * 0.035;
      targetY = -(e.clientY - cy) * 0.035;
    }

    function onLeave() {
      targetX = 0;
      targetY = 0;
    }

    resize();
    draw();

    if (!reduced) {
      running = true;
      rafId = window.requestAnimationFrame(tick);
      root.addEventListener("mousemove", onMove);
      root.addEventListener("mouseleave", onLeave);
    }

    window.addEventListener("resize", resize);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(rafId);
      } else if (!reduced) {
        running = true;
        rafId = window.requestAnimationFrame(tick);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
