# Styling and Theme System Documentation

## Table of Contents

1. [Theme System Overview](#theme-system-overview)
2. [Tailwind CSS Configuration](#tailwind-css-configuration)
3. [Color System](#color-system)
4. [Typography System](#typography-system)
5. [Component Styling Patterns](#component-styling-patterns)
6. [Responsive Design](#responsive-design)
7. [Animation and Transitions](#animation-and-transitions)
8. [Custom CSS Architecture](#custom-css-architecture)
9. [Theme Customization](#theme-customization)
10. [Best Practices](#best-practices)

## Theme System Overview

The portfolio uses a sophisticated theme system built on Tailwind CSS with custom CSS properties for dynamic theming. The system supports both light and dark themes with smooth transitions and comprehensive customization options.

### Core Architecture

```typescript
// Theme provider structure
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// CSS custom properties strategy
:root {
  --background: 47 18% 96%;
  --foreground: 30 16% 18%;
  --primary: 18 59% 58%;
  // ... more colors
}

.dark {
  --background: 222 84% 5%;
  --foreground: 210 40% 98%;
  --primary: 18 91% 60%;
  // ... more colors
}
```

### Theme Switching Implementation

```typescript
// app/components/theme-provider.tsx
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      setTheme('light'); // Default to light mode
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## Tailwind CSS Configuration

### Configuration File Structure

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Claude AI inspired colors
        claude: {
          bg: "#eeece2",
          text: "#3d3929",
          accent: "#bd5d3a",
          'accent-light': "#d17a5a",
          'accent-dark': "#a34a2c",
        },
        // CSS custom properties integration
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... complete color system
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        'screen': '100vw', // Custom screen utility
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### Custom Plugins and Extensions

```javascript
// Custom animation plugin
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities, theme }) {
  const newUtilities = {
    '.text-shadow': {
      textShadow: '0 2px 4px rgba(0,0,0,0.10)',
    },
    '.text-shadow-md': {
      textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
    },
    '.text-shadow-lg': {
      textShadow: '0 15px 35px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.08)',
    },
    '.glass': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    '.glass-dark': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  };

  addUtilities(newUtilities);
});
```

## Color System

### Primary Color Palette

The color system uses HSL values for easy manipulation and theming:

```css
/* Light Theme Colors */
:root {
  /* Core semantic colors */
  --background: 47 18% 96%;      /* Light cream background */
  --foreground: 30 16% 18%;      /* Dark text */
  --primary: 18 59% 58%;         /* Warm orange accent */
  --primary-foreground: 0 0% 100%; /* White text on primary */

  /* Neutral colors */
  --secondary: 47 12% 88%;       /* Light gray */
  --secondary-foreground: 30 16% 18%;
  --muted: 47 12% 88%;           /* Subtle gray */
  --muted-foreground: 30 8% 45%; /* Light gray text */

  /* Interactive colors */
  --accent: 18 59% 58%;          /* Same as primary */
  --accent-foreground: 0 0% 100%;
  --destructive: 0 62% 31%;      /* Red for errors */
  --destructive-foreground: 0 0% 100%;

  /* Border and input colors */
  --border: 47 12% 82%;          /* Light borders */
  --input: 47 12% 82%;           /* Input fields */
  --ring: 18 59% 58%;            /* Focus rings */

  /* Radius and spacing */
  --radius: 0.75rem;             /* Default border radius */
}
```

### Dark Theme Colors

```css
/* Dark Theme Colors */
.dark {
  /* Core semantic colors */
  --background: 222 84% 5%;      /* Very dark blue */
  --foreground: 210 40% 98%;     /* Light text */
  --primary: 18 91% 60%;         /* Brighter orange */
  --primary-foreground: 222 84% 5%;

  /* Neutral colors */
  --secondary: 217 33% 17%;      /* Dark gray */
  --secondary-foreground: 210 40% 98%;
  --muted: 217 33% 17%;          /* Subtle dark gray */
  --muted-foreground: 215 20% 65%;

  /* Interactive colors */
  --accent: 18 91% 60%;          /* Bright accent */
  --accent-foreground: 222 84% 5%;
  --destructive: 0 63% 31%;      /* Dark red */
  --destructive-foreground: 210 40% 98%;

  /* Border and input colors */
  --border: 217 33% 17%;         /* Dark borders */
  --input: 217 33% 17%;          /* Dark input fields */
  --ring: 224 76% 94%;           /* Light focus rings */
}
```

### Color Usage Patterns

```typescript
// Semantic color usage
<div className="bg-background text-foreground">
  <h1 className="text-primary">Primary heading</h1>
  <p className="text-muted-foreground">Subtle text</p>
  <button className="bg-primary text-primary-foreground">
    Primary action
  </button>
  <div className="bg-secondary text-secondary-foreground">
    Secondary content
  </div>
</div>
```

### Mobile Menu Specific Colors

```css
/* Maximum contrast system for mobile menu readability */
:root {
  /* Mobile menu overlay - 100% solid background */
  --mobile-menu-backdrop: hsl(47 18% 96% / 1);
  --mobile-menu-backdrop-blur: none;
  --mobile-menu-backdrop-filter: none;

  /* Enhanced solid background with warmth */
  --mobile-menu-sidebar: hsl(47 18% 95%);
  --mobile-menu-border: hsl(47 15% 75%);
  --mobile-menu-shadow: 0 25px 50px -12px hsl(30 16% 18% / 0.35);

  /* Maximum contrast text colors */
  --mobile-menu-item-text: hsl(30 20% 15%);
  --mobile-menu-header-text: hsl(30 22% 12%);

  /* Enhanced readability variables */
  --mobile-menu-text-weight: 700;
  --mobile-menu-text-tracking: -0.025em;
  --mobile-menu-text-leading: 1.4;
  --mobile-menu-item-padding-x: 20px;
  --mobile-menu-item-padding-y: 16px;
}

.dark {
  /* Dark theme mobile menu colors */
  --mobile-menu-backdrop: hsl(222 84% 5% / 1);
  --mobile-menu-sidebar: hsl(222 84% 4%);
  --mobile-menu-border: hsl(217 33% 25%);
  --mobile-menu-item-text: hsl(210 40% 100%);
  --mobile-menu-header-text: hsl(210 40% 100%);
}
```

## Typography System

### Font Configuration

```typescript
// Font family setup
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

// Application font usage
<body className={`${inter.className} antialiased`}>
```

### Typography Scale

```css
/* Base typography */
:root {
  /* Font families */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Font sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 3.75rem;    /* 60px */

  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Letter spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
}
```

### Typography Usage Patterns

```typescript
// Typography component examples
export function TypographyExamples() {
  return (
    <div className="space-y-6">
      {/* Headings */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        Hero Title
      </h1>

      <h2 className="text-2xl md:text-4xl font-semibold">
        Section Title
      </h2>

      <h3 className="text-xl md:text-2xl font-medium">
        Subsection Title
      </h3>

      {/* Body text */}
      <p className="text-base md:text-lg leading-relaxed">
        Body text with comfortable line height for readability.
      </p>

      {/* Small text */}
      <p className="text-sm text-muted-foreground">
        Small caption or metadata text.
      </p>

      {/* Monospace text */}
      <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
        Code snippet
      </code>
    </div>
  );
}
```

### Responsive Typography

```typescript
// Responsive typography implementation
export function ResponsiveTypography() {
  return (
    <div>
      {/* Responsive heading sizes */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
        Responsive Hero Title
      </h1>

      {/* Fluid typography with clamp() */}
      <h2
        className="font-semibold"
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        }}
      >
        Fluid Heading
      </h2>

      {/* Responsive body text */}
      <p className="text-sm md:text-base lg:text-lg leading-relaxed">
        Responsive paragraph text that scales with viewport.
      </p>
    </div>
  );
}
```

## Component Styling Patterns

### Compound Component Pattern

```typescript
// Card compound component with consistent styling
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

// Usage
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>Card content</CardContent>
</Card>
```

### Variant-based Styling

```typescript
// Button variants using class-variance-authority
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### State-based Styling

```typescript
// Component with multiple visual states
export function InteractiveCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card p-6",
        "transition-all duration-200 ease-out",
        "hover:shadow-lg hover:scale-[1.02]",
        "active:scale-[0.98]",
        isHovered && "border-primary/50",
        isPressed && "bg-muted"
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTapCancel={() => setIsPressed(false)}
      onTap={() => setIsPressed(false)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative z-10">
        <h3 className="text-lg font-semibold">Interactive Card</h3>
        <p className="text-muted-foreground">Hover and interact with this card</p>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
```

## Responsive Design

### Breakpoint System

```javascript
// Tailwind's default breakpoints
const screens = {
  'sm': '640px',   // Small screens
  'md': '768px',   // Medium screens (tablets)
  'lg': '1024px',  // Large screens (laptops)
  'xl': '1280px',  // Extra large screens
  '2xl': '1536px', // 2X large screens
};
```

### Mobile-First Approach

```typescript
// Mobile-first responsive patterns
export function ResponsiveLayout() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <nav className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between py-4 md:py-0">
          <Logo />
          <ThemeToggle className="md:hidden" />
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navigationItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <MobileMenu navigationItems={navigationItems} />
        </div>
      </nav>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
```

### Advanced Responsive Patterns

```typescript
// Complex responsive layouts
export function AdvancedLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with complex responsive behavior */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent z-10" />

        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6">
            Responsive Hero Title
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Responsive subtitle that adapts to screen size
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              Primary Action
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Secondary Action
            </Button>
          </div>
        </div>
      </section>

      {/* Adaptive grid layout */}
      <section className="px-4 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 bg-card rounded-lg border"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

## Animation and Transitions

### Smooth Theme Transitions

```css
/* Global theme transition */
* {
  transition: background-color 0.3s ease,
              color 0.3s ease,
              border-color 0.3s ease !important;
}

/* Specific component transitions */
.theme-toggle {
  transition: transform 0.2s ease,
              background-color 0.3s ease,
              color 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.05);
}

.theme-toggle:active {
  transform: scale(0.95);
}
```

### Custom Animations

```css
/* Reveal animations */
@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes reveal-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes reveal-left {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes reveal-right {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Utility classes for animations */
.animate-reveal-up {
  animation: reveal-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-reveal-down {
  animation: reveal-down 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-reveal-left {
  animation: reveal-left 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-reveal-right {
  animation: reveal-right 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

### Framer Motion Integration

```typescript
// Animated component with variants
export function AnimatedSection({ children, delay = 0 }: {
  children: React.ReactNode;
  delay?: number;
}) {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// Staggered animations for lists
export function AnimatedList({ items }: { items: string[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="py-2"
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## Custom CSS Architecture

### CSS Custom Properties Strategy

```css
/* Organized CSS custom properties by purpose */

/* === Core Design Tokens === */
:root {
  /* Spacing system */
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* Z-index scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

/* === Component-specific tokens === */
:root {
  /* Mobile menu specific */
  --mobile-menu-width: clamp(280px, 85vw, 320px);
  --mobile-menu-animation-duration: 300ms;
  --mobile-menu-animation-ease: cubic-bezier(0.22, 1, 0.36, 1);

  /* Scroll reveal animations */
  --reveal-duration: 650ms;
  --reveal-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --reveal-distance: 28px;
  --reveal-blur: 14px;

  /* Terminal effects */
  --terminal-color: #bd5d3a;
  --terminal-glitch: #3d3929;
}
```

### Utility Classes Generation

```css
/* Generate utility classes from custom properties */

/* Spacing utilities */
@layer utilities {
  .p-xs { padding: var(--space-xs); }
  .p-sm { padding: var(--space-sm); }
  .p-md { padding: var(--space-md); }
  .p-lg { padding: var(--space-lg); }
  .p-xl { padding: var(--space-xl); }
  .p-2xl { padding: var(--space-2xl); }
  .p-3xl { padding: var(--space-3xl); }

  .m-xs { margin: var(--space-xs); }
  .m-sm { margin: var(--space-sm); }
  .m-md { margin: var(--space-md); }
  .m-lg { margin: var(--space-lg); }
  .m-xl { margin: var(--space-xl); }
  .m-2xl { margin: var(--space-2xl); }
  .m-3xl { margin: var(--space-3xl); }
}

/* Radius utilities */
@layer utilities {
  .rounded-sm { border-radius: var(--radius-sm); }
  .rounded-md { border-radius: var(--radius-md); }
  .rounded-lg { border-radius: var(--radius-lg); }
  .rounded-xl { border-radius: var(--radius-xl); }
  .rounded-full { border-radius: var(--radius-full); }
}

/* Shadow utilities */
@layer utilities {
  .shadow-sm { box-shadow: var(--shadow-sm); }
  .shadow-md { box-shadow: var(--shadow-md); }
  .shadow-lg { box-shadow: var(--shadow-lg); }
  .shadow-xl { box-shadow: var(--shadow-xl); }
}
```

### Component-specific CSS

```css
/* Mobile menu component styles */
@layer components {
  .mobile-menu-backdrop {
    background-color: var(--mobile-menu-backdrop);
    position: fixed;
    inset: 0;
    z-index: var(--z-modal-backdrop);
  }

  .mobile-menu-sidebar {
    background-color: var(--mobile-menu-sidebar);
    border-color: var(--mobile-menu-border);
    box-shadow: var(--mobile-menu-shadow);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--mobile-menu-width);
    z-index: var(--z-modal);
    transform: translateX(-100%);
    transition: transform var(--mobile-menu-animation-duration) var(--mobile-menu-animation-ease);
  }

  .mobile-menu-sidebar.open {
    transform: translateX(0);
  }

  .mobile-menu-item {
    color: var(--mobile-menu-item-text);
    font-weight: var(--mobile-menu-text-weight);
    letter-spacing: var(--mobile-menu-text-tracking);
    line-height: var(--mobile-menu-text-leading);
    padding: var(--mobile-menu-item-padding-y) var(--mobile-menu-item-padding-x);
    min-height: var(--mobile-menu-touch-target-min);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: var(--mobile-menu-border-radius);
    transition: all 0.2s ease;
  }

  .mobile-menu-item:hover {
    background-color: var(--mobile-menu-item-hover);
    transform: translateX(4px);
  }

  .mobile-menu-item:focus {
    background-color: var(--mobile-menu-item-hover);
    box-shadow: var(--mobile-menu-focus-ring);
    outline: none;
  }

  .mobile-menu-item:active {
    background-color: var(--mobile-menu-item-active);
    color: hsl(var(--primary-foreground));
  }
}
```

## Theme Customization

### Creating Custom Themes

```typescript
// Theme customization system
interface CustomTheme {
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    // ... more colors
  };
  typography: {
    fontFamily: string;
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Example custom theme
const darkBlueTheme: CustomTheme = {
  name: 'dark-blue',
  colors: {
    background: '220 90% 6%',
    foreground: '210 40% 98%',
    primary: '217 91% 60%',
    secondary: '215 28% 17%',
    accent: '217 91% 60%',
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
};
```

### Dynamic Theme Application

```typescript
// Theme application utility
export function applyCustomTheme(theme: CustomTheme) {
  const root = document.documentElement;

  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  // Apply typography
  if (theme.typography.fontFamily) {
    root.style.setProperty('--font-sans', theme.typography.fontFamily);
  }

  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--text-${key}`, value);
  });

  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value.toString());
  });

  // Apply spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--space-${key}`, value);
  });

  // Apply border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });
}
```

## Best Practices

### 1. Consistent Spacing System

```typescript
// Use design tokens for consistent spacing
<div className="p-4 md:p-6 lg:p-8">
  <h2 className="mb-4 md:mb-6">
    <div className="space-y-2 md:space-y-4">
      {/* Content */}
    </div>
  </h2>
</div>
```

### 2. Responsive-First Approach

```typescript
// Always design mobile-first
<div className="w-full md:w-auto">
  <button className="w-full sm:w-auto">
    Responsive Button
  </button>
</div>
```

### 3. Semantic Color Usage

```typescript
// Use semantic colors for consistency
<div className="bg-background text-foreground">
  <header className="bg-primary text-primary-foreground">
    <h1 className="text-2xl font-bold">Title</h1>
  </header>
  <main className="bg-secondary text-secondary-foreground">
    <p className="text-muted-foreground">Content</p>
  </main>
</div>
```

### 4. Performance Considerations

```typescript
// Use CSS transforms for animations (better performance)
<div className="transform transition-transform duration-200 hover:scale-105">
  Content
</div>

// Avoid layout-triggering properties
// Bad: top, left, width, height
// Good: transform, opacity
```

### 5. Accessibility Considerations

```typescript
// Ensure sufficient color contrast
<div className="bg-background text-foreground">
  {/* High contrast text */}
</div>

// Provide focus indicators
<button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Accessible Button
</button>

// Respect user preferences
@media (prefers-reduced-motion: reduce) {
  .animate-reveal-up {
    animation: none;
  }
}
```

This comprehensive styling and theming documentation provides a complete guide to the portfolio's design system, from basic color usage to advanced theming patterns and best practices.