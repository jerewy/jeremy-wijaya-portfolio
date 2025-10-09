"use client";

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef } from 'react';

/**
 * Props interface for ThemeToggle component
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
   * Custom click handler for advanced use cases
   */
  onToggleClick?: () => void;
}

/**
 * Enhanced ThemeToggle component with flexible rendering options
 *
 * This component can render either as a standalone button (default behavior)
 * or as content-only when used inside another button element to prevent
 * nested button HTML validation errors.
 */
export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({
    renderAsButton = true,
    className = "",
    onToggleClick,
    ...buttonProps
  }, ref) => {
    const { theme, toggleTheme } = useTheme();

    const handleClick = () => {
      if (onToggleClick) {
        onToggleClick();
      } else {
        toggleTheme();
      }
    };

    // Extract only essential props that are definitely compatible with motion.button
    const {
      id,
      disabled,
      form,
      title
    } = buttonProps;

    const safeButtonProps = {
      id,
      disabled,
      form,
      title
    };

    const toggleContent = (
      <>
        <motion.div
          initial={false}
          animate={{
            rotate: theme === 'dark' ? 180 : 0,
            scale: 1
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="flex items-center justify-center"
        >
          {theme === 'light' ? (
            <Moon
              className="h-6 w-6"
              style={{
                color: 'hsl(var(--foreground))'
              }}
            />
          ) : (
            <Sun
              className="h-6 w-6"
              style={{
                color: 'hsl(var(--foreground))'
              }}
            />
          )}
        </motion.div>

        {/* Enhanced focus indicator */}
        <span
          className="absolute inset-0 rounded-full opacity-0 hover:opacity-10 transition-opacity duration-200"
          style={{
            backgroundColor: 'hsl(var(--primary))',
          }}
        />
      </>
    );

    // When renderAsButton is false, return only the content for embedding in other buttons
    if (!renderAsButton) {
      return toggleContent;
    }

    // Default behavior: render as a standalone button
    return (
      <motion.button
        ref={ref}
        onClick={handleClick}
        className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-border shadow-sm transition-all duration-200 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
        style={{
          backgroundColor: 'hsl(var(--background))',
          borderColor: 'hsl(var(--border))',
          minHeight: '48px', // WCAG AA compliant touch target
          minWidth: '48px',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
        aria-live="polite"
        {...safeButtonProps}
      >
        {toggleContent}
      </motion.button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';