"use client";

import * as React from "react";
import {
  type HTMLMotionProps,
  motion,
  type SpringOptions,
  type Transition,
  useMotionValue,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

/** Muted Everest palette — white, blue, gold */
export const EVEREST_STAR_COLORS = ["#dde8ee", "#6aafc4", "#c4a872"] as const;

type StarLayerProps = HTMLMotionProps<"div"> & {
  count: number;
  size: number;
  transition: Transition;
  starColors: readonly string[];
};

function generateStars(count: number, starColors: readonly string[]) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    const color = starColors[i % starColors.length] ?? starColors[0];
    shadows.push(`${x}px ${y}px ${color}`);
  }
  return shadows.join(", ");
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColors = EVEREST_STAR_COLORS,
  className,
  ...props
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>("");

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColors));
  }, [count, starColors]);

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn("absolute top-0 left-0 w-full h-[2000px]", className)}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColors?: readonly string[];
  /** When true, no solid backdrop — for hero image underneath */
  overlay?: boolean;
};

export function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColors = EVEREST_STAR_COLORS,
  overlay = false,
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      data-slot="stars-background"
      className={cn(
        "relative size-full overflow-hidden",
        overlay
          ? "bg-transparent"
          : "bg-[radial-gradient(ellipse_at_bottom,_#1a2430_0%,_#060608_55%,_#000_100%)]",
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[4%] -top-[22%] left-auto h-[min(1080px,108vw)] w-[min(1080px,108vw)] rounded-full blur-[42px]"
        style={{
          background:
            "radial-gradient(circle at 48% 42%, rgba(232,210,150,0.48) 0%, rgba(200,164,90,0.26) 34%, rgba(200,164,90,0.08) 52%, transparent 72%)",
        }}
        animate={{
          x: ["-6%", "3%", "-9%", "-1%", "-6%"],
          y: ["-16%", "-10%", "-18%", "-12%", "-16%"],
          opacity: [0.34, 0.44, 0.3, 0.4, 0.34],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[20%] top-[18%] h-[min(1080px,108vw)] w-[min(1080px,108vw)] rounded-full blur-[46px]"
        style={{
          background:
            "radial-gradient(circle at 50% 58%, rgba(114,216,245,0.42) 0%, rgba(61,127,150,0.24) 36%, rgba(42,95,115,0.08) 54%, transparent 74%)",
        }}
        animate={{
          x: ["8%", "20%", "4%", "16%", "8%"],
          y: ["28%", "36%", "24%", "32%", "28%"],
          opacity: [0.38, 0.48, 0.32, 0.44, 0.38],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ x: springX, y: springY }}
        aria-hidden
      >
        <StarLayer
          count={1000}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
          starColors={starColors}
        />
        <StarLayer
          count={400}
          size={2}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: "linear",
          }}
          starColors={starColors}
        />
        <StarLayer
          count={200}
          size={3}
          transition={{
            repeat: Infinity,
            duration: speed * 3,
            ease: "linear",
          }}
          starColors={starColors}
        />
      </motion.div>
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
