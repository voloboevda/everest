"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

export interface PulseMarker {
  id: string;
  location: [number, number];
  delay: number;
  label?: string;
}

export interface GlobeRoute {
  id: string;
  from: [number, number];
  to: [number, number];
  fromId: string;
  toId: string;
}

export type GlobeLang = "ru" | "en" | "zh";

/** Mirrors `tilda/js/everest-i18n.js` geo keys */
export const GEO_GLOBE_I18N: Record<GlobeLang, Record<string, string>> = {
  ru: {
    russia: "Россия",
    china: "Китай",
    india: "Индия",
    middle_east: "ОАЭ",
    southeast_asia: "ЮВА",
    abbr_russia: "РФ",
    abbr_china: "Кит",
    abbr_india: "Инд",
    abbr_middle_east: "БВ",
    abbr_southeast_asia: "ЮВА",
  },
  en: {
    russia: "Russia",
    china: "China",
    india: "India",
    middle_east: "UAE",
    southeast_asia: "SEA",
    abbr_russia: "RUS",
    abbr_china: "CHN",
    abbr_india: "IND",
    abbr_middle_east: "ME",
    abbr_southeast_asia: "SEA",
  },
  zh: {
    russia: "俄罗斯",
    china: "中国",
    india: "印度",
    middle_east: "阿联酋",
    southeast_asia: "东南亚",
    abbr_russia: "俄",
    abbr_china: "中",
    abbr_india: "印",
    abbr_middle_east: "中东",
    abbr_southeast_asia: "东南亚",
  },
};

export function geoMarkerName(id: string, lang: GlobeLang) {
  return GEO_GLOBE_I18N[lang][id] ?? id;
}

export function geoMarkerAbbr(id: string, lang: GlobeLang) {
  return GEO_GLOBE_I18N[lang][`abbr_${id}`] ?? geoMarkerName(id, lang);
}

export function geoRouteLabel(route: GlobeRoute, lang: GlobeLang) {
  return `${geoMarkerName(route.fromId, lang)} → ${geoMarkerName(route.toId, lang)}`;
}

export interface GlobePulseProps {
  markers?: PulseMarker[];
  routes?: GlobeRoute[];
  className?: string;
  lang?: GlobeLang;
  /** Spin when no routes are shown */
  spinSpeedIdle?: number;
  /** Spin when routes are visible */
  spinSpeedWithRoutes?: number;
  routesPerView?: number;
  routeHoldMs?: number;
  routeGapMs?: number;
}

/** Cobe palette from 21.dev GlobePulse reference */
const COBE_STYLE = {
  dark: 1,
  diffuse: 1.5,
  mapSamples: 16000,
  mapBrightness: 10,
  baseColor: [0.5, 0.5, 0.5] as [number, number, number],
  markerColor: [0.2, 0.8, 0.9] as [number, number, number],
  glowColor: [0.05, 0.05, 0.05] as [number, number, number],
  arcColor: [0.2, 0.8, 0.9] as [number, number, number],
  arcWidth: 0.5,
  arcHeight: 0.25,
  opacity: 0.7,
  markerElevation: 0,
  markerSize: 0.025,
};

const PULSE_COLOR = "#33ccdd";

export const EVEREST_MARKERS: PulseMarker[] = [
  { id: "russia", location: [55.7558, 37.6173], delay: 0 },
  { id: "china", location: [39.9042, 116.4074], delay: 0.35 },
  { id: "india", location: [28.6139, 77.209], delay: 0.7 },
  { id: "middle_east", location: [25.2048, 55.2708], delay: 1.05 },
  { id: "southeast_asia", location: [1.3521, 103.8198], delay: 1.4 },
];

export function buildEverestRoutes(markers: PulseMarker[]): GlobeRoute[] {
  const routes: GlobeRoute[] = [];
  for (let i = 0; i < markers.length; i++) {
    for (let j = i + 1; j < markers.length; j++) {
      const from = markers[i];
      const to = markers[j];
      routes.push({
        id: `route-${from.id}-${to.id}`,
        from: from.location,
        to: to.location,
        fromId: from.id,
        toId: to.id,
      });
    }
  }
  return routes;
}

function pairKey(routes: GlobeRoute[]) {
  return routes
    .map((r) => r.id)
    .sort()
    .join("|");
}

function pickRouteBatch(routes: GlobeRoute[], count: number, excludeKey?: string): GlobeRoute[] {
  if (routes.length <= count) return routes;

  const shuffled = [...routes].sort(() => Math.random() - 0.5);

  for (let i = 0; i < shuffled.length; i++) {
    const batch: GlobeRoute[] = [shuffled[i]];
    const usedIds = new Set([shuffled[i].fromId, shuffled[i].toId]);

    for (let j = 0; j < shuffled.length && batch.length < count; j++) {
      if (j === i) continue;
      const candidate = shuffled[j];
      if (usedIds.has(candidate.fromId) || usedIds.has(candidate.toId)) continue;
      batch.push(candidate);
      usedIds.add(candidate.fromId);
      usedIds.add(candidate.toId);
    }

    if (batch.length === count) {
      const key = pairKey(batch);
      if (key !== excludeKey) return batch;
    }
  }

  return shuffled.slice(0, count);
}

export function GlobePulse({
  markers = EVEREST_MARKERS,
  routes: routesProp,
  className,
  lang = "ru",
  spinSpeedIdle = 0.0055,
  spinSpeedWithRoutes = 0.002,
  routesPerView = 2,
  routeHoldMs = 5000,
  routeGapMs = 1200,
}: GlobePulseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(4.2);
  const thetaOffsetRef = useRef(0.15);
  const isPausedRef = useRef(false);

  const routes = routesProp ?? buildEverestRoutes(markers);
  const initialBatch = pickRouteBatch(routes, routesPerView);

  const [displayRoutes, setDisplayRoutes] = useState<GlobeRoute[]>(initialBatch);
  const [routePhase, setRoutePhase] = useState<"show" | "gap">("show");
  const [reducedMotion, setReducedMotion] = useState(false);

  const routeEndpointIds = new Set(displayRoutes.flatMap((r) => [r.fromId, r.toId]));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let phi = 0;

    let phase: "show" | "gap" = "show";
    let phaseStartedAt = Date.now();
    let activeRoutes = pickRouteBatch(routes, routesPerView);
    let lastPairKey = pairKey(activeRoutes);

    if (!reducedMotion) {
      setDisplayRoutes(activeRoutes);
    } else {
      setDisplayRoutes([]);
    }

    function maybeRotateRoutes() {
      if (reducedMotion) return;
      const elapsed = Date.now() - phaseStartedAt;
      if (phase === "show" && elapsed >= routeHoldMs) {
        phase = "gap";
        phaseStartedAt = Date.now();
        activeRoutes = [];
        setDisplayRoutes([]);
        setRoutePhase("gap");
      } else if (phase === "gap" && elapsed >= routeGapMs) {
        phase = "show";
        phaseStartedAt = Date.now();
        activeRoutes = pickRouteBatch(routes, routesPerView, lastPairKey);
        lastPairKey = pairKey(activeRoutes);
        setDisplayRoutes(activeRoutes);
        setRoutePhase("show");
      }
    }

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: phiOffsetRef.current,
        theta: 0.2 + thetaOffsetRef.current,
        ...COBE_STYLE,
        markers: markers.map((m) => ({
          location: m.location,
          size: COBE_STYLE.markerSize,
          id: m.id,
        })),
        arcs: [],
      });

      function animate() {
        maybeRotateRoutes();
        if (!isPausedRef.current) {
          const spin =
            reducedMotion || phase !== "show" || activeRoutes.length === 0
              ? spinSpeedIdle
              : spinSpeedWithRoutes;
          phi += spin;
        }

        const arcList = reducedMotion
          ? []
          : activeRoutes.map((r) => ({ id: r.id, from: r.from, to: r.to }));

        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
          markers: markers.map((m) => ({
            location: m.location,
            size: COBE_STYLE.markerSize,
            id: m.id,
          })),
          arcs: arcList,
          arcColor: COBE_STYLE.arcColor,
          markerColor: COBE_STYLE.markerColor,
        });

        animationId = requestAnimationFrame(animate);
      }

      animate();
      requestAnimationFrame(() => {
        canvas.style.opacity = "1";
      });
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(animationId);
      globe?.destroy();
    };
  }, [
    markers,
    reducedMotion,
    routeGapMs,
    routeHoldMs,
    routes,
    routesPerView,
    spinSpeedIdle,
    spinSpeedWithRoutes,
  ]);

  return (
    <div className={cn("relative aspect-square w-full select-none", className)}>
      <style>{`
        @keyframes pulse-expand {
          0% { transform: scaleX(0.3) scaleY(0.3); opacity: 0.8; }
          100% { transform: scaleX(1.5) scaleY(1.5); opacity: 0; }
        }
        .globe-country-label.is-hidden-for-route {
          visibility: hidden;
          opacity: 0 !important;
          filter: none !important;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="h-full w-full cursor-grab rounded-full opacity-0 transition-opacity duration-[1200ms] ease-out touch-none"
      />
      {markers.map((m) => (
        <div
          key={m.id}
          className="pointer-events-none absolute flex h-10 w-10 items-center justify-center"
          style={{
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(center)",
            left: "anchor(center)",
            translate: "-50% 50%",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: "opacity 0.4s, filter 0.4s",
          }}
        >
          <span
            className="absolute inset-0 rounded-full border-2 opacity-0"
            style={{
              borderColor: PULSE_COLOR,
              animation: reducedMotion
                ? "none"
                : `pulse-expand 2s ease-out infinite ${m.delay}s`,
            }}
          />
          <span
            className="absolute inset-0 rounded-full border-2 opacity-0"
            style={{
              borderColor: PULSE_COLOR,
              animation: reducedMotion
                ? "none"
                : `pulse-expand 2s ease-out infinite ${m.delay + 0.5}s`,
            }}
          />
          <span
            className="relative z-[1] h-2.5 w-2.5 rounded-full"
            style={{
              background: PULSE_COLOR,
              boxShadow: `0 0 0 3px #111, 0 0 0 5px ${PULSE_COLOR}`,
            }}
          />
        </div>
      ))}
      {markers.map((m) => (
        <div
          key={`label-${m.id}`}
          className={cn(
            "globe-country-label pointer-events-none absolute whitespace-nowrap border border-[#33ccdd]/30 bg-[#0a0a0b]/92 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-white/90",
            routePhase === "show" && routeEndpointIds.has(m.id) && "is-hidden-for-route"
          )}
          style={{
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            marginBottom: "10px",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: "opacity 0.3s ease, filter 0.3s ease, visibility 0.25s ease",
          }}
        >
          {geoMarkerName(m.id, lang)}
        </div>
      ))}
      {displayRoutes.map((route) => (
        <div
          key={route.id}
          className="pointer-events-none absolute whitespace-nowrap border border-[#33ccdd]/45 bg-[#0a0a0b]/92 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-white/90"
          style={{
            positionAnchor: `--cobe-arc-${route.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% -10px",
            opacity: `var(--cobe-visible-arc-${route.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-arc-${route.id}, 0)) * 6px))`,
            transition: "opacity 0.35s ease, filter 0.35s ease",
          }}
        >
          {geoRouteLabel(route, lang)}
        </div>
      ))}
    </div>
  );
}
