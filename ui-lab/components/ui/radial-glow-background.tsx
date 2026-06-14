import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type RadialGlowVariant = "blue" | "gold" | "blue-gold";

const GLOW_LAYERS: Record<RadialGlowVariant, CSSProperties["backgroundImage"]> = {
  blue: "radial-gradient(circle 500px at 50% 200px, rgba(42, 95, 115, 0.28), transparent)",
  gold: "radial-gradient(circle 500px at 50% 100px, rgba(200, 164, 90, 0.28), transparent)",
  "blue-gold":
    "radial-gradient(circle 500px at 50% 100px, rgba(200, 164, 90, 0.22), transparent), radial-gradient(circle 500px at 50% 200px, rgba(42, 95, 115, 0.14), transparent)",
};

export interface RadialGlowBackgroundProps {
  variant?: RadialGlowVariant;
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

export function RadialGlowBackground({
  variant = "blue-gold",
  className,
  contentClassName,
  children,
}: RadialGlowBackgroundProps) {
  return (
    <div
      className={cn(className)}
      style={{
        position: "relative",
        minHeight: "100dvh",
        width: "100%",
        backgroundColor: "#0a0a0b",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: GLOW_LAYERS[variant],
        }}
      />
      {children ? (
        <div className={cn(contentClassName)} style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
