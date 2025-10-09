"use client";

import { useEffect, useRef } from "react";
import { EnhancedCVPreviewModal } from "./enhanced-cv-modal";

interface AccessibleCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function AccessibleCVModal({
  isOpen,
  onClose,
  title = "Jeremy Wijaya - Curriculum Vitae",
  description = "Professional CV preview and download options for Jeremy Wijaya, AI Engineer & Full-Stack Developer",
}: AccessibleCVModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  // Accessibility: Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      lastFocusRef.current = document.activeElement as HTMLElement;

      // Focus the modal when it opens
      setTimeout(() => {
        const closeButton = modalRef.current?.querySelector('[data-modal-close]') as HTMLElement;
        if (closeButton) {
          closeButton.focus();
        }
      }, 100);

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.overflow = "";

      // Restore focus to the last focused element
      if (lastFocusRef.current) {
        lastFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Accessibility: Trap focus within modal
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Screen reader announcements
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      aria-describedby="cv-modal-description"
      className="fixed inset-0 z-50"
    >
      {/* Invisible description for screen readers */}
      <div id="cv-modal-description" className="sr-only">
        {description}
      </div>

      {/* Main modal with all accessibility features */}
      <EnhancedCVPreviewModal
        isOpen={isOpen}
        onClose={() => {
          announceToScreenReader("CV modal closed");
          onClose();
        }}
      />

      {/* Screen reader announcements */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        id="cv-modal-announcements"
      />
    </div>
  );
}

// Touch-friendly mobile gesture handler
export function useMobileGestures(onSwipeDown?: () => void, onSwipeUp?: () => void) {
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    touchEndY.current = null;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current) return;

    const distance = touchStartY.current - touchEndY.current;
    const isDownSwipe = distance > minSwipeDistance;
    const isUpSwipe = distance < -minSwipeDistance;

    if (isDownSwipe && onSwipeDown) {
      onSwipeDown();
    }
    if (isUpSwipe && onSwipeUp) {
      onSwipeUp();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

// Responsive utilities
export const responsive = {
  // Breakpoint-aware class utilities
  isMobile: () => typeof window !== "undefined" && window.innerWidth < 768,
  isTablet: () => typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1024,
  isDesktop: () => typeof window !== "undefined" && window.innerWidth >= 1024,

  // Touch device detection
  isTouchDevice: () => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  },

  // Responsive value helpers
  value: (mobile: any, tablet?: any, desktop?: any) => {
    if (responsive.isDesktop() && desktop !== undefined) return desktop;
    if (responsive.isTablet() && tablet !== undefined) return tablet;
    return mobile;
  },

  // Breakpoint-specific styles
  modalSize: () => {
    if (responsive.isMobile()) return "w-[95vw] h-[90vh]";
    if (responsive.isTablet()) return "w-[90vw] h-[85vh]";
    return "max-w-7xl max-h-[90vh]";
  },

  // Touch-friendly sizing
  touchTarget: (size: "small" | "medium" | "large" = "medium") => {
    const sizes = {
      small: "min-h-[44px] min-w-[44px]",
      medium: "min-h-[48px] min-w-[48px]",
      large: "min-h-[56px] min-w-[56px]",
    };
    return responsive.isTouchDevice() ? sizes[size] : "";
  },
};

// Performance optimization utilities
export const performance = {
  // Debounce function for search/filter operations
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function for scroll events
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Lazy loading for PDF
  lazyLoadPDF: (src: string, callback: () => void) => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 100);
    }
  },
};

// Accessibility helpers
export const a11y = {
  // Generate unique IDs for accessibility
  generateId: (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`,

  // Announce changes to screen readers
  announce: (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Check if element is in viewport
  isInViewport: (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Focus trap helper
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    return () => container.removeEventListener("keydown", handleTabKey);
  },
};