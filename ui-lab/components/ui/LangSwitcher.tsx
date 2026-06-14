"use client";

import type React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Locale = "ru" | "en" | "zh";

interface LangSwitcherProps {
  currentLang: Locale;
  onChange: (lang: Locale) => void;
  variant?: "header" | "menu" | "footer";
  className?: string;
}

const LOCALES: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: "ru", label: "RU", nativeLabel: "РУ" },
  { code: "en", label: "ENG", nativeLabel: "ENG" },
  { code: "zh", label: "CHI", nativeLabel: "中文" },
];

export function LangSwitcher({
  currentLang,
  onChange,
  variant = "header",
  className = "",
}: LangSwitcherProps) {
  const isSegments = variant === "menu";

  return (
    <div
      className={cn(
        "lang-switcher inline-flex items-center gap-1.8 font-mono uppercase tracking-[0.08em] text-white/45",
        variant === "header" && "text-[0.72rem]",
        variant === "menu" && "text-[0.72rem]",
        variant === "footer" && "text-[0.6875rem]",
        className
      )}
      role="group"
      aria-label="Language switcher"
    >
      {LOCALES.map(({ code, label, nativeLabel }) => {
        const isActive = code === currentLang;
        const displayLabel = variant === "header" ? label : nativeLabel;

        return (
          <motion.button
            key={code}
            type="button"
            className={cn(
              "lang-btn lang-switcher-btn relative px-1.5 py-0.5",
              "transition-colors duration-200 ease-out",
              isActive
                ? "text-[var(--accent,#3d7f96)] cursor-default"
                : "hover:text-white",
              isSegments && "rounded-0"
            )}
            onClick={() => onChange(code)}
            aria-pressed={isActive}
            data-lang={code}
            data-active={isActive ? "true" : undefined}
            whileHover={isActive ? undefined : { scale: 1.05 }}
            whileTap={isActive ? undefined : { scale: 0.95 }}
          >
            {displayLabel}
          </motion.button>
        );
      })}
    </div>
  );
}