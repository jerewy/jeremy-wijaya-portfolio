"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, MotionProps } from "framer-motion";
import { X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import type {
  FocusTrapConfig,
  ScrollLockConfig,
  MobileMenuEventHandlers,
  MobileMenuPerformanceConfig
} from "../types/mobile-menu";

/**
 * Enhanced MobileMenu component props with comprehensive type safety
 */
export interface MobileMenuProps {
  /** Array of navigation item names */
  navigationItems: string[];

  /** Optional custom class names for styling */
  className?: string;

  /** Optional motion props for animation customization */
  motionProps?: Partial<MotionProps>;

  /** Whether to enable body scroll lock (default: true) */
  enableScrollLock?: boolean;

  /** Scroll lock configuration */
  scrollLockConfig?: ScrollLockConfig;

  /** Focus trap configuration */
  focusTrapConfig?: FocusTrapConfig;

  /** Event handlers */
  handlers?: MobileMenuEventHandlers;

  /** Performance configuration */
  performance?: MobileMenuPerformanceConfig;
}

/**
 * Enhanced Mobile Menu component with proper TypeScript interfaces
 * and resolved nested button hydration issues
 */

export function MobileMenu({
  navigationItems,
  enableScrollLock = true
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const themeToggleRef = useRef<HTMLButtonElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  // Handle click outside to close with debouncing
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClose]);

  // Handle body scroll lock with better mobile support (optional)
  useEffect(() => {
    if (!enableScrollLock) return;

    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen, enableScrollLock]);

  // Handle focus trap with improved focus management
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      // Small delay to ensure the menu is rendered
      animationTimeoutRef.current = setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableRef.current) {
          event.preventDefault();
          themeToggleRef.current?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === themeToggleRef.current) {
          event.preventDefault();
          firstFocusableRef.current?.focus();
        }
      }
    }
  }, []);

  const handleNavigationClick = useCallback((item: string) => {
    handleClose();
    // Smooth scroll to section with improved offset
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [handleClose]);

  // Enhanced animation variants with accessibility support
  const menuVariants = {
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : "-100%",
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.3,
      },
    },
  };

  return (
    <>
      {/* Hamburger Menu Button with enhanced accessibility and touch targets */}
      <Button
        ref={firstFocusableRef}
        variant="ghost"
        size="lg"
        className="md:hidden relative z-50 transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation min-h-[48px] min-w-[48px] p-3"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
      >
        <Menu className="h-6 w-6 transition-transform duration-200" />
      </Button>

      {/* Mobile Menu Overlay with enhanced backdrop */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Solid Backdrop - 100% solid background with no transparency */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden mobile-menu-backdrop mobile-menu-backdrop-enhanced"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Enhanced Mobile Menu Sidebar - Redesigned Layout */}
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              className="fixed top-0 left-0 bottom-0 z-50 md:hidden mobile-menu-sidebar border-r shadow-2xl"
              style={{
                width: 'clamp(280px, 85vw, 320px)', // Responsive width
                backgroundColor: 'var(--mobile-menu-sidebar)',
                borderColor: 'var(--mobile-menu-border)',
              }}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              onKeyDown={handleKeyDown}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Enhanced Menu Header - Improved spacing and collision prevention */}
              <header
                className="flex items-center justify-between px-6 py-5 border-b border-border"
                style={{
                  backgroundColor: 'var(--mobile-menu-sidebar)',
                  borderColor: 'var(--mobile-menu-border)',
                  minHeight: '64px', // Ensures consistent touch target height
                }}
              >
                <h2
                  className="text-xl font-bold tracking-tight flex-1 pr-4"
                  style={{
                    color: 'var(--mobile-menu-header-text)',
                  }}
                >
                  Navigation
                </h2>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleClose}
                  aria-label="Close navigation menu"
                  className="min-h-[48px] min-w-[48px] transition-all duration-200 hover:scale-105 active:scale-95 p-3 touch-manipulation"
                  style={{
                    color: 'var(--mobile-menu-header-text)',
                  }}
                >
                  <X className="h-6 w-6" />
                </Button>
              </header>

              {/* Enhanced Navigation Items - Improved touch targets and spacing */}
              <nav
                className="flex-1 px-4 py-6 overflow-y-auto"
                role="navigation"
                aria-label="Main navigation"
                style={{
                  maxHeight: 'calc(100vh - 220px)', // Prevents overflow on small screens
                }}
              >
                <ul className="space-y-1" role="menu">
                  {navigationItems.map((item, index) => (
                    <motion.li
                      key={item}
                      variants={itemVariants}
                      role="none"
                      className="mobile-menu-item-animate"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <motion.button
                        className={`
                          mobile-menu-item mobile-menu-item-enhanced mobile-menu-item-ripple w-full text-left
                          transition-all duration-200 relative overflow-hidden
                          focus:outline-none focus:ring-2 focus:ring-primary
                          focus:ring-offset-2 flex items-center justify-between
                          mobile-menu-item-primary
                        `}
                        onClick={() => handleNavigationClick(item)}
                        role="menuitem"
                        tabIndex={isOpen ? 0 : -1}
                        whileHover={{
                          backgroundColor: 'var(--mobile-menu-item-hover)',
                          scale: 1.02,
                        }}
                        whileTap={{
                          backgroundColor: 'var(--mobile-menu-item-active)',
                          color: 'hsl(var(--primary-foreground))',
                          scale: 0.98,
                        }}
                      >
                        <span className="relative z-10 font-semibold">{item}</span>
                        <span className="mobile-menu-item-arrow text-muted-foreground opacity-60 text-sm">
                          →
                        </span>
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Enhanced Theme Toggle - Redesigned positioning and spacing */}
              <footer
                className="border-t border-border"
                style={{
                  backgroundColor: 'var(--mobile-menu-sidebar)',
                  borderColor: 'var(--mobile-menu-border)',
                }}
              >
                <div className="p-6">
                  <div className="mobile-menu-theme-toggle">
                    <div className="flex items-center space-x-3 flex-1">
                      <span
                        className="text-base font-semibold mobile-menu-header"
                      >
                        Theme
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ThemeToggle
                        ref={themeToggleRef}
                        renderAsButton={true}
                        className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                        aria-label="Toggle theme"
                      />
                    </div>
                  </div>
                </div>
              </footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}