"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STAGGER = 0.035;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{ lineHeight: 0.85 }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={`top-${i}`}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={`bottom-${i}`}
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export type AnimatedMenuItem = {
  name: string;
  href: string;
};

export function AnimatedMenuList({
  items,
  className,
}: {
  items: AnimatedMenuItem[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "flex w-full flex-col items-start gap-1.5 py-3",
        className
      )}
    >
      {items.map((item) => (
        <li key={item.href} className="relative overflow-visible">
          <a href={item.href} className="block">
            <TextRoll className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] lg:text-5xl">
              {item.name}
            </TextRoll>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** @deprecated Use TextRoll */
export const Component = TextRoll;
