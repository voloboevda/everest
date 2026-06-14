"use client";

import type React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { ShinyButton } from "./Button";
import { LangSwitcher } from "./LangSwitcher";
import { NavBurger } from "./NavBurger";
import { cn } from "@/lib/utils";

type Locale = "ru" | "en" | "zh";

interface NavProps {
  logoSrc?: string;
  onRequestClick: () => void;
  currentLang: Locale;
  onLangChange: (lang: Locale) => void;
  className?: string;
}

const NAV_LINKS = [
  { href: "#about", key: "footer_about", label: "О компании" },
  { href: "#sectors", key: "footer_sectors", label: "Направления" },
  { href: "#geography", key: "footer_geography", label: "География" },
  { href: "#cooperation", key: "footer_cooperation", label: "Сотрудничество" },
  { href: "#request", key: "footer_request", label: "Отправить запрос", isCTA: true },
] as const;

export function Nav({
  logoSrc = "/everest-logo-nav.png",
  onRequestClick,
  currentLang,
  onLangChange,
  className = "",
}: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.nav
        className={cn(
          "nav header fixed top-0 left-0 right-0 z-500",
          "pointer-events-none",
          className
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "transparent", border: "none" }}
      >
        <motion.div
          className={cn(
            "nav-inner pointer-events-auto inline-flex items-center gap-0",
            "w-fit max-w-[calc(100vw-2rem)] mx-auto",
            "px-2.2 py-1.8",
            "border border-white/14 border-solid rounded-none",
            "bg-[#0a0a0b]/42 backdrop-blur-[10px] -webkit-backdrop-blur-[10px]",
            "transition-all duration-350 ease-out",
            isScrolled &&
              "bg-white/[0.02] border-white/8 backdrop-blur-[10px] -webkit-backdrop-blur-[10px]"
          )}
          animate={isScrolled ? { backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" } : {}}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <a
            href="#"
            className={cn(
              "nav-brand logo inline-flex items-center shrink-0",
              "mr-4.8",
              "pr-0.6 pl-1",
              "text-decoration-none"
            )}
            aria-label="Everest Trade — главная"
          >
            <img
              className="nav-logo block h-14 w-auto max-w-none object-contain object-left"
              src={logoSrc}
              alt=""
              width={871}
              height={685}
              decoding="async"
            />
          </a>

          <ShinyButton
            size="nav"
            onClick={onRequestClick}
            className="mr-4.8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>
              <span>Отправить запрос</span>
              <span className="shiny-cta__arrow" aria-hidden="true">→</span>
            </span>
          </ShinyButton>

          <NavBurger
            ref={burgerRef}
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </motion.div>
      </motion.nav>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="menu-overlay fixed inset-0 z-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-title"
          >
            <motion.div
              className="menu-overlay-bg absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />

            <div className="menu-overlay-inner relative z-10 flex flex-col h-full items-center justify-center px-6">
              <motion.ul
                className="menu-list flex flex-col items-center gap-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 }}
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.li key={link.key} className="menu-list-item">
                    {link.isCTA ? (
                      <motion.button
                        type="button"
                        className="menu-link menu-link--btn text-roll"
                        onClick={() => {
                          onRequestClick();
                          closeMenu();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.label}
                      </motion.button>
                    ) : (
                      <motion.a
                        href={link.href}
                        className="menu-link text-roll"
                        onClick={closeMenu}
                        whileHover={{ color: "var(--accent,#3d7f96)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.label}
                      </motion.a>
                    )}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="menu-foot flex flex-col items-center gap-4 mt-10 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
              >
                <LangSwitcher
                  currentLang={currentLang}
                  onChange={onLangChange}
                  variant="menu"
                />
                <motion.a
                  href="mailto:info@everestcentr.com"
                  className="menu-email text-white/70 hover:text-white transition-colors"
                  onClick={closeMenu}
                >
                  info@everestcentr.com
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}