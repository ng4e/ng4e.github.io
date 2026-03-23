import { useState, useEffect, useRef, useCallback } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

// ANIM-04 audit: Motion v12 (motion/react) respects prefers-reduced-motion
// by default. The overlay animation (200ms opacity + translateY) is functional
// UI feedback, not decorative -- it provides spatial context for menu state.
// The hamburger CSS morph (transition-all duration-300) is also functional.
// Both are retained in reduced-motion mode per D-13 reasoning.
interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  links: NavLink[];
  currentLocale?: "fr" | "en";
  frUrl?: string;
  enUrl?: string;
}

function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean
) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const container = containerRef.current;
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, containerRef]);
}

export default function MobileMenu({ links, currentLocale = "fr", frUrl = "/", enUrl = "/en" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus trap
  useFocusTrap(overlayRef, isOpen);

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        type="button"
        className="md:hidden w-11 h-11 flex flex-col justify-center items-center gap-[6px] relative z-50"
        onClick={handleToggle}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
      >
        <span
          className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isOpen ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isOpen ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={overlayRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#1B2A4A" }}
          >
            <nav aria-label="Menu de navigation principal">
              <ul className="flex flex-col items-center gap-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xl font-semibold text-white hover:text-white/80 transition-colors duration-200"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-2 mt-8 text-sm font-semibold">
              <a
                href={frUrl}
                className={`transition-colors duration-200 ${currentLocale === "fr" ? "text-white" : "text-white/50 hover:text-white"}`}
                onClick={handleLinkClick}
              >
                FR
              </a>
              <span className="text-white/30">|</span>
              <a
                href={enUrl}
                className={`transition-colors duration-200 ${currentLocale === "en" ? "text-white" : "text-white/50 hover:text-white"}`}
                onClick={handleLinkClick}
              >
                EN
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
