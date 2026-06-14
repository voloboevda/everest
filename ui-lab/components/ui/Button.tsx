"use client";

import type React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "nav" | "hero";
}

export function ShinyButton({
  children,
  className = "",
  size = "default",
  onClick,
  ...props
}: ShinyButtonProps) {
  const sizeStyles = {
    default: "px-10 py-4.5 text-base",
    nav: "h-9.4 px-4 text-[0.75rem]",
    hero: "px-10 py-4.5 text-lg",
  };

  return (
    <motion.button
      type="button"
      className={cn(
        "shiny-cta inline-flex items-center justify-center gap-1.4",
        sizeStyles[size],
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      {...props}
    >
      <span>{children}</span>
    </motion.button>
  );
}

interface OutlineButtonProps extends Omit<HTMLMotionProps<"a">, "children"> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  asButton?: boolean;
  onClick?: () => void;
}

export function OutlineButton({
  children,
  className = "",
  href = "#",
  asButton = false,
  onClick,
  ...props
}: OutlineButtonProps) {
  const Component = asButton ? "button" : "a";
  const motionComponent = motion[Component];

  return (
    <motionComponent
      className={cn(
        "outline-cta inline-flex items-center justify-center gap-3",
        "px-8.4 py-4.4 text-base font-medium",
        className
      )}
      href={asButton ? undefined : href}
      onClick={asButton ? onClick : undefined}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      {...props}
    >
      <span>
        <span className="outline-cta__dot" aria-hidden="true" />
        <span>{children}</span>
      </span>
    </motionComponent>
  );
}