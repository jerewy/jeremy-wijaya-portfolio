/**
 * Comprehensive TypeScript interfaces for mobile menu components
 * Provides type safety for enhanced mobile menu functionality
 */

import { MotionProps } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

/**
 * Theme types used throughout the application
 */
export type Theme = 'light' | 'dark';

/**
 * Animation variant types for mobile menu transitions
 */
export type MenuAnimationVariant = 'open' | 'closed';

/**
 * Accessibility focus trap configuration
 */
export interface FocusTrapConfig {
  /** Whether to enable focus trapping */
  enabled: boolean;
  /** Element to receive initial focus */
  initialFocus?: HTMLElement;
  /** Element to restore focus to on close */
  restoreFocus?: HTMLElement;
  /** Custom escape key handler */
  onEscape?: () => void;
}

/**
 * Scroll lock configuration options
 */
export interface ScrollLockConfig {
  /** Whether to enable scroll locking */
  enabled: boolean;
  /** Custom scroll offset calculation */
  scrollOffset?: number;
  /** Whether to preserve scroll position */
  preserveScrollPosition?: boolean;
}

/**
 * Base motion props interface for menu animations
 */
export interface MobileMenuMotionProps {
  /** Duration of animations in seconds */
  duration?: number;
  /** Easing function for animations */
  ease?: string | number[];
  /** Whether to respect reduced motion preferences */
  respectReducedMotion?: boolean;
  /** Custom animation variants */
  variants?: Record<MenuAnimationVariant, unknown>;
}

/**
 * Touch target configuration for accessibility compliance
 */
export interface TouchTargetConfig {
  /** Minimum touch target size in pixels */
  minSize: number;
  /** Preferred comfortable touch target size */
  comfortableSize: number;
  /** Whether to enforce WCAG AA compliance */
  enforceWCAGCompliance: boolean;
}

/**
 * Responsive breakpoint configuration
 */
export interface ResponsiveConfig {
  /** Breakpoint for mobile layout */
  mobile: number;
  /** Breakpoint for tablet layout */
  tablet: number;
  /** Breakpoint for desktop layout */
  desktop: number;
}

/**
 * Enhanced mobile menu props with comprehensive type safety
 */
export interface MobileMenuProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Array of navigation item names */
  navigationItems: string[];

  /** Optional custom class names for styling */
  className?: string;

  /** Optional motion props for animation customization */
  motionProps?: Partial<MotionProps> & MobileMenuMotionProps;

  /** Whether to enable body scroll lock (default: true) */
  enableScrollLock?: boolean;

  /** Scroll lock configuration options */
  scrollLockConfig?: ScrollLockConfig;

  /** Focus trap configuration */
  focusTrapConfig?: FocusTrapConfig;

  /** Touch target configuration */
  touchTargetConfig?: TouchTargetConfig;

  /** Whether the menu should be initially open */
  defaultOpen?: boolean;

  /** Callback function when menu state changes */
  onOpenChange?: (isOpen: boolean) => void;

  /** Custom close handler */
  onClose?: () => void;

  /** Custom open handler */
  onOpen?: () => void;

  /** Whether to disable animations */
  disableAnimations?: boolean;

  /** Whether to enable accessibility announcements */
  enableAriaAnnouncements?: boolean;

  /** Custom aria label for the menu */
  ariaLabel?: string;

  /** Custom aria label for the toggle button */
  toggleAriaLabel?: string;

  /** Whether to render a backdrop overlay */
  showBackdrop?: boolean;

  /** Backdrop click behavior */
  backdropClickClosesMenu?: boolean;

  /** Escape key behavior */
  escapeKeyClosesMenu?: boolean;

  /** Whether to enable keyboard navigation */
  enableKeyboardNavigation?: boolean;

  /** Responsive configuration */
  responsiveConfig?: ResponsiveConfig;

  /** Custom animation duration */
  animationDuration?: number;

  /** Whether to mount menu only when open */
  mountOnOpen?: boolean;

  /** Whether to unmount menu when closed */
  unmountOnClose?: boolean;
}

/**
 * Theme toggle component props
 */
export interface ThemeToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * Whether to render as a standalone button (default) or as content-only
   * When renderAsButton is false, only the toggle content is rendered without button wrapper
   */
  renderAsButton?: boolean;

  /**
   * Additional CSS classes for styling
   */
  className?: string;

  /**
   * Motion props for animation customization
   */
  motionProps?: Partial<MotionProps> & MobileMenuMotionProps;

  /**
   * Custom click handler for advanced use cases
   */
  onToggleClick?: () => void;

  /**
   * Size variant for the toggle
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant for the toggle
   */
  variant?: 'default' | 'minimal';

  /**
   * Whether to show loading state
   */
  loading?: boolean;

  /**
   * Custom aria label
   */
  ariaLabel?: string;

  /**
   * Whether to disable the toggle
   */
  disabled?: boolean;

  /**
   * Whether to show theme transition animation
   */
  enableTransition?: boolean;
}

/**
 * Mobile theme toggle specific props
 */
export interface MobileThemeToggleProps extends Omit<ThemeToggleProps, 'renderAsButton'> {
  /**
   * Whether to use compact layout for mobile
   */
  compact?: boolean;

  /**
   * Custom icon colors
   */
  iconColors?: {
    light: string;
    dark: string;
  };

  /**
   * Whether to show theme labels
   */
  showLabels?: boolean;

  /**
   * Custom label text
   */
  labels?: {
    light: string;
    dark: string;
    toggle: string;
  };
}

/**
 * CSS variable names for mobile menu styling
 */
export interface MobileMenuCSSVariables {
  /** Background color for the backdrop */
  '--mobile-menu-backdrop': string;

  /** Background color for the sidebar */
  '--mobile-menu-sidebar': string;

  /** Border color for menu elements */
  '--mobile-menu-border': string;

  /** Box shadow for the sidebar */
  '--mobile-menu-shadow': string;

  /** Text shadow for menu items */
  '--mobile-menu-text-shadow': string;

  /** Background color for hovered items */
  '--mobile-menu-item-hover': string;

  /** Background color for active items */
  '--mobile-menu-item-active': string;

  /** Text color for menu items */
  '--mobile-menu-item-text': string;

  /** Text color for headers */
  '--mobile-menu-header-text': string;

  /** Glass effect configuration */
  '--mobile-menu-glass-effect': string;

  /** Text font weight */
  '--mobile-menu-text-weight': string;

  /** Text letter spacing */
  '--mobile-menu-text-tracking': string;

  /** Text line height */
  '--mobile-menu-text-leading': string;

  /** Horizontal padding for menu items */
  '--mobile-menu-item-padding-x': string;

  /** Vertical padding for menu items */
  '--mobile-menu-item-padding-y': string;

  /** Border radius for menu items */
  '--mobile-menu-border-radius': string;

  /** Focus ring styling */
  '--mobile-menu-focus-ring': string;

  /** Minimum touch target size */
  '--mobile-menu-touch-target-min': string;

  /** Comfortable touch target size */
  '--mobile-menu-touch-target-comfortable': string;

  /** Small spacing value */
  '--mobile-menu-spacing-sm': string;

  /** Medium spacing value */
  '--mobile-menu-spacing-md': string;

  /** Large spacing value */
  '--mobile-menu-spacing-lg': string;
}

/**
 * Event handler types for mobile menu interactions
 */
export interface MobileMenuEventHandlers {
  /** Handler for menu open event */
  onOpen?: () => void;

  /** Handler for menu close event */
  onClose?: () => void;

  /** Handler for navigation item click */
  onNavigationClick?: (item: string) => void;

  /** Handler for theme toggle */
  onThemeToggle?: () => void;

  /** Handler for escape key press */
  onEscapeKey?: () => void;

  /** Handler for outside click */
  onOutsideClick?: (event: MouseEvent) => void;

  /** Handler for focus trap activation */
  onFocusTrapActivate?: () => void;

  /** Handler for focus trap deactivation */
  onFocusTrapDeactivate?: () => void;
}

/**
 * Performance optimization configuration
 */
export interface MobileMenuPerformanceConfig {
  /** Whether to enable animation optimizations */
  enableAnimationOptimizations?: boolean;

  /** Whether to use virtual scrolling for long lists */
  useVirtualScrolling?: boolean;

  /** Whether to lazy load menu content */
  lazyLoadContent?: boolean;

  /** Debounce time for resize handlers */
  resizeDebounceTime?: number;

  /** Whether to enable requestAnimationFrame optimizations */
  useRAFOptimizations?: boolean;
}

/**
 * Complete mobile menu configuration interface
 */
export interface MobileMenuConfig {
  /** Base props */
  props: MobileMenuProps;

  /** Event handlers */
  handlers: MobileMenuEventHandlers;

  /** Performance configuration */
  performance: MobileMenuPerformanceConfig;

  /** CSS variables */
  cssVariables: Partial<MobileMenuCSSVariables>;
}

/**
 * Validation result for mobile menu configuration
 */
export interface MobileMenuValidationResult {
  /** Whether the configuration is valid */
  isValid: boolean;

  /** Array of validation errors */
  errors: string[];

  /** Array of validation warnings */
  warnings: string[];

  /** Recommended fixes for issues */
  recommendations: string[];
}