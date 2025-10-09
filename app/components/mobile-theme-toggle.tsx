"use client";

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { motion } from 'framer-motion';

export interface MobileThemeToggleProps {
  className?: string;
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
}

export function MobileThemeToggle({
  className = "",
  ariaLabel = "Toggle theme",
  size = 'md',
  variant = 'default'
}: MobileThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <motion.div
      className={`
        relative inline-flex items-center justify-center rounded-lg transition-all duration-200
        ${variant === 'default' ? 'border border-border shadow-sm' : ''}
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        backgroundColor: 'hsl(var(--background))',
        borderColor: variant === 'default' ? 'hsl(var(--border))' : 'transparent',
        minHeight: '44px', // WCAG AA compliant touch target
        minWidth: '44px',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-live="polite"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }}
    >
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
            className={iconSizes[size]}
            style={{
              color: 'hsl(var(--foreground))'
            }}
          />
        ) : (
          <Sun
            className={iconSizes[size]}
            style={{
              color: 'hsl(var(--foreground))'
            }}
          />
        )}
      </motion.div>

      {/* Enhanced focus indicator */}
      <motion.span
        className="absolute inset-0 rounded-lg opacity-0"
        style={{
          backgroundColor: 'hsl(var(--primary))',
        }}
        whileFocus={{ opacity: 0.1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}