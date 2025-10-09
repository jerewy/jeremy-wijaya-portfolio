/**
 * TypeScript Type Definitions for Mobile Menu Component
 *
 * This file contains comprehensive type definitions for the mobile menu system
 * to ensure type safety and proper interface contracts throughout the application.
 */

import { MotionProps } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

/**
 * Base navigation item interface
 */
export interface NavigationItem {
  /** Unique identifier for the navigation item */
  id: string;

  /** Display text for the navigation item */
  label: string;

  /** Optional href for external navigation */
  href?: string;

  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>;

  /** Whether the item is currently active */
  isActive?: boolean;

  /** Accessibility properties */
  aria?: {
    label?: string;
    describedBy?: string;
  };
}

/**
 * Enhanced Theme Toggle component props interface
 */
export interface ThemeToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Whether to render as a standalone button (default) or as content-only */
  renderAsButton?: boolean;

  /** Additional CSS classes for styling */
  className?: string;

  /** Motion props for animation customization */
  motionProps?: Partial<MotionProps>;

  /** Custom click handler for advanced use cases */
  onToggleClick?: () => void;

  /** Theme variant options */
  variant?: 'default' | 'minimal' | 'icon-only';

  /** Size options for the theme toggle */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Mobile Menu component props interface with enhanced type safety
 */
export interface MobileMenuProps {
  /** Array of navigation item names or full navigation objects */
  navigationItems: string[] | NavigationItem[];

  /** Optional custom class names for styling */
  className?: string;

  /** Optional motion props for animation customization */
  motionProps?: Partial<MotionProps>;

  /** Whether to enable body scroll lock (default: true) */
  enableScrollLock?: boolean;

  /** Custom animation duration in milliseconds */
  animationDuration?: number;

  /** Whether to enable reduced motion animations */
  reduceMotion?: boolean;

  /** Custom backdrop click handler */
  onBackdropClick?: () => void;

  /** Custom menu close handler */
  onClose?: () => void;

  /** Custom menu open handler */
  onOpen?: () => void;

  /** Initial open state */
  initialIsOpen?: boolean;

  /** Theme toggle configuration */
  themeToggle?: {
    /** Whether to show theme toggle in mobile menu */
    show: boolean;
    /** Custom theme toggle position */
    position?: 'header' | 'footer';
    /** Custom theme toggle props */
    props?: Partial<ThemeToggleProps>;
  };
}

/**
 * Mobile Menu state interface for internal state management
 */
export interface MobileMenuState {
  /** Whether the mobile menu is currently open */
  isOpen: boolean;

  /** Current focused element index for keyboard navigation */
  focusedIndex: number;

  /** Whether focus trap is active */
  isFocusTrapActive: boolean;

  /** Current scroll position when menu is opened */
  scrollPosition: number;
}

/**
 * Focus management configuration interface
 */
export interface FocusManagementConfig {
  /** Array of focusable element selectors */
  focusableSelectors: string[];

  /** Whether to enable focus trap (default: true) */
  enableFocusTrap: boolean;

  /** Custom focus restoration handler */
  onRestoreFocus?: (previousElement: HTMLElement | null) => void;

  /** Whether to wrap focus navigation (default: true) */
  wrapFocus: boolean;
}

/**
 * Animation variants interface for mobile menu
 */
export interface MobileMenuAnimationVariants {
  /** Menu container animation variants */
  menu: {
    open: {
      opacity?: number;
      x?: string | number;
      transition?: {
        duration?: number;
        ease?: readonly [number, number, number, number];
        staggerChildren?: number;
        delayChildren?: number;
      };
    };
    closed: {
      opacity?: number;
      x?: string | number;
      transition?: {
        duration?: number;
        ease?: readonly [number, number, number, number];
      };
    };
  };

  /** Backdrop animation variants */
  backdrop: {
    open: {
      opacity?: number;
      transition?: {
        duration?: number;
      };
    };
    closed: {
      opacity?: number;
      transition?: {
        duration?: number;
      };
    };
  };

  /** Menu items animation variants */
  item: {
    open: {
      opacity?: number;
      y?: number;
      transition?: {
        duration?: number;
        ease?: readonly [number, number, number, number];
      };
    };
    closed: {
      opacity?: number;
      y?: number;
      transition?: {
        duration?: number;
        ease?: readonly [number, number, number, number];
      };
    };
  };
}

/**
 * Accessibility configuration interface
 */
export interface AccessibilityConfig {
  /** ARIA labels for various menu elements */
  ariaLabels: {
    menu: string;
    closeButton: string;
    openButton: string;
    themeToggle: string;
    navigation: string;
  };

  /** Whether to announce menu state changes to screen readers */
  announceStateChanges: boolean;

  /** Custom screen reader announcement handler */
  onAnnounce?: (message: string) => void;

  /** Keyboard navigation configuration */
  keyboard: {
    /** Keys that can close the menu */
    closeKeys: string[];
    /** Whether to enable arrow key navigation */
    enableArrowNavigation: boolean;
  };
}

/**
 * Mobile menu hook return type for state management
 */
export interface UseMobileMenuReturn {
  /** Current menu open state */
  isOpen: boolean;

  /** Function to toggle menu open state */
  toggleMenu: () => void;

  /** Function to open menu */
  openMenu: () => void;

  /** Function to close menu */
  closeMenu: () => void;

  /** Current focused index */
  focusedIndex: number;

  /** Function to set focused index */
  setFocusedIndex: (index: number) => void;

  /** Ref objects for DOM elements */
  refs: {
    menuRef: React.RefObject<HTMLDivElement>;
    firstFocusableRef: React.RefObject<HTMLButtonElement>;
    themeToggleRef: React.RefObject<HTMLButtonElement>;
  };

  /** Event handlers */
  handlers: {
    handleKeyDown: (event: React.KeyboardEvent) => void;
    handleNavigationClick: (item: string | NavigationItem) => void;
    handleBackdropClick: () => void;
  };
}

/**
 * Type guard function to check if item is NavigationItem
 */
export function isNavigationItem(item: string | NavigationItem): item is NavigationItem {
  return typeof item === 'object' && 'id' in item && 'label' in item;
}

/**
 * Default animation variants for mobile menu
 */
export const DEFAULT_MOBILE_MENU_VARIANTS: MobileMenuAnimationVariants = {
  menu: {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  },
  backdrop: {
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  },
  item: {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  },
} as const;

/**
 * Default accessibility configuration
 */
export const DEFAULT_ACCESSIBILITY_CONFIG: AccessibilityConfig = {
  ariaLabels: {
    menu: "Navigation menu",
    closeButton: "Close navigation menu",
    openButton: "Open navigation menu",
    themeToggle: "Toggle theme",
    navigation: "Main navigation",
  },
  announceStateChanges: true,
  keyboard: {
    closeKeys: ["Escape"],
    enableArrowNavigation: true,
  },
} as const;