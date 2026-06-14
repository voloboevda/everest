"use client";

import type React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface NavBurgerProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  "aria-label"?: string;
}

export function NavBurger({
  isOpen,
  onClick,
  className = "",
  "aria-label": ariaLabel = "Menu",
}: NavBurgerProps) {
  return (
    <motion.button
      type="button"
      className={cn(
        "nav-burger inline-flex flex-col justify-center shrink-0 gap-1.25",
        "w-10 h-10 p-0",
        "border border-white/14 border-solid",
        "bg-white/[0.03]",
        "cursor-pointer",
        "transition-all duration-250 ease-out",
        isOpen && "border-transparent bg-[#e8e6df]",
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      aria-controls="menu-overlay"
      whileHover={!isOpen ? { backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.22)" } : undefined}
      whileTap={!isOpen ? { scale: 0.95 } : undefined}
    >
      <span
        className={cn(
          "block w-[14px] h-[1.5px] mx-auto",
          "bg-white/90",
          "rounded-none",
          "transition-all duration-250 ease-out",
          isOpen && "bg-[#0a0a0b]",
          isOpen && "origin-center"
        )}
        style={{
          transform: isOpen ? "translateY(3.25px) rotate(45deg)" : undefined,
        }}
        aria-hidden="true"
      />
      <span
        className={cn(
          "block w-[14px] h-[1.5px] mx-auto",
          "bg-white/90",
          "rounded-none",
          "transition-all duration-250 ease-out",
          isOpen && "bg-[#0a0a0b]",
          isOpen && "origin-center"
        )}
        style={{
          transform: isOpen ? "translateY(-3.25px) rotate(-45deg)" : undefined,
        }}
        aria-hidden="true"
      />
    </motion.button>
  );
}