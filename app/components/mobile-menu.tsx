"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

interface MobileMenuProps {
  navigationItems: string[];
}

export function MobileMenu({ navigationItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [supportsBackdropFilter, setSupportsBackdropFilter] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Check backdrop filter support
  useEffect(() => {
    const checkBackdropFilterSupport = () => {
      const testElement = document.createElement('div');
      testElement.style.cssText = 'backdrop-filter: blur(1px); -webkit-backdrop-filter: blur(1px);';
      document.body.appendChild(testElement);
      const computedStyle = window.getComputedStyle(testElement);
      const hasBackdropFilter = computedStyle.backdropFilter !== 'none' ||
                                ('webkitBackdropFilter' in computedStyle && computedStyle.webkitBackdropFilter !== 'none');
      document.body.removeChild(testElement);
      setSupportsBackdropFilter(hasBackdropFilter);
    };

    checkBackdropFilterSupport();
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

  // Handle body scroll lock with better mobile support
  useEffect(() => {
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
  }, [isOpen]);

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
          lastFocusableRef.current?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableRef.current) {
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
      {/* Hamburger Menu Button with enhanced accessibility */}
      <Button
        ref={firstFocusableRef}
        variant="ghost"
        size="sm"
        className="md:hidden relative z-50 transition-all duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
      >
        <Menu className="h-5 w-5 transition-transform duration-200" />
      </Button>

      {/* Mobile Menu Overlay with enhanced backdrop */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Enhanced Backdrop with better visual separation */}
            <motion.div
              className={`fixed inset-0 z-40 md:hidden ${
                supportsBackdropFilter
                  ? 'mobile-menu-backdrop supports-backdrop-filter'
                  : 'mobile-menu-backdrop no-backdrop-filter'
              }`}
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={handleClose}
              aria-hidden="true"
              style={{
                backgroundColor: supportsBackdropFilter
                  ? 'var(--mobile-menu-backdrop)'
                  : 'hsl(var(--background) / 0.95)',
              }}
            />

            {/* Enhanced Mobile Menu Sidebar */}
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              className="fixed top-0 left-0 bottom-0 z-50 md:hidden mobile-menu-sidebar mobile-menu-glass border-r"
              style={{
                width: 'clamp(280px, 85vw, 320px)', // Responsive width
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
              {/* Enhanced Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border mobile-menu-glass">
                <h2 className="text-xl font-bold mobile-menu-header tracking-tight">
                  Navigation
                </h2>
                <Button
                  ref={lastFocusableRef}
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  aria-label="Close navigation menu"
                  className="transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Enhanced Navigation Items with improved contrast and accessibility */}
              <nav
                className="flex flex-col p-4 space-y-1"
                role="navigation"
                aria-label="Main navigation"
              >
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item}
                    variants={itemVariants}
                    className={`
                      text-left px-4 py-4 rounded-xl text-lg font-medium
                      mobile-menu-item transition-all duration-200
                      hover:scale-[1.02] active:scale-[0.98]
                      focus:outline-none focus:ring-2 focus:ring-primary
                      focus:ring-offset-2 relative overflow-hidden
                      ${index === 0 ? 'mt-2' : ''}
                    `}
                    onClick={() => handleNavigationClick(item)}
                    role="menuitem"
                    tabIndex={isOpen ? 0 : -1}
                    style={{
                      color: 'var(--mobile-menu-item-text)',
                      textShadow: 'var(--mobile-menu-text-shadow)',
                    }}
                  >
                    <span className="relative z-10">{item}</span>
                    {/* Subtle hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                  </motion.button>
                ))}
              </nav>

              {/* Enhanced Theme Toggle with better positioning */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card/30 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm font-medium mobile-menu-header mr-3">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}