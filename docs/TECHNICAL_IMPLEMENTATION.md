# Technical Implementation Guide

## Table of Contents

1. [Theme System Implementation](#theme-system-implementation)
2. [Mobile Menu System](#mobile-menu-system)
3. [Animation Architecture](#animation-architecture)
4. [3D Graphics Integration](#3d-graphics-integration)
5. [Component Patterns](#component-patterns)
6. [Performance Optimization](#performance-optimization)
7. [State Management](#state-management)
8. [Error Handling & Edge Cases](#error-handling--edge-cases)

## Theme System Implementation

### Architecture Overview

The theme system is built using React Context API with localStorage persistence, providing seamless light/dark mode switching with server-side rendering compatibility.

### Core Implementation

```typescript
// app/components/theme-provider.tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

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

  // ... rest of implementation
}
```

### CSS Custom Properties Strategy

The theme system uses CSS custom properties defined in `globals.css`:

```css
:root {
  /* Light theme colors */
  --background: 47 18% 96%;
  --foreground: 30 16% 18%;
  --primary: 18 59% 58%;
  /* ... more colors */
}

.dark {
  /* Dark theme colors */
  --background: 222 84% 5%;
  --foreground: 210 40% 98%;
  --primary: 18 91% 60%;
  /* ... more colors */
}
```

### Key Technical Decisions

1. **Client-side Theme Detection**: Theme preference is handled client-side to avoid hydration mismatches
2. **CSS Custom Properties**: Enables smooth theme transitions and dynamic updates
3. **LocalStorage Persistence**: Maintains user preference across sessions
4. **Default Light Mode**: Chosen for better initial user experience

### Usage Pattern

```typescript
// Using the theme hook
const { theme, toggleTheme } = useTheme();

// Theme-aware styling
<div style={{
  backgroundColor: `hsl(var(--background))`,
  color: `hsl(var(--foreground))`
}}>
  Content
</div>
```

## Mobile Menu System

### Architecture Overview

The mobile menu system addresses several complex requirements:
- Accessibility compliance (WCAG AA)
- Hydration error prevention
- Touch-friendly interface
- Maximum readability with solid backgrounds

### Core Implementation Patterns

#### 1. TypeScript Interface Safety

```typescript
// app/types/mobile-menu.types.ts
export interface MobileMenuProps {
  navigationItems: string[] | NavigationItem[];
  enableScrollLock?: boolean;
  animationDuration?: number;
  onBackdropClick?: () => void;
  // ... more props
}
```

#### 2. Nested Button Prevention

```typescript
// app/components/theme-toggle.tsx
export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ renderAsButton = true, ...props }, ref) => {
    const toggleContent = (
      <motion.div>
        {theme === 'light' ? <Moon /> : <Sun />}
      </motion.div>
    );

    if (!renderAsButton) {
      return toggleContent; // Content-only for embedding
    }

    return (
      <motion.button ref={ref} {...props}>
        {toggleContent}
      </motion.button>
    );
  }
);
```

#### 3. Maximum Contrast System

```css
/* 100% solid backgrounds - no transparency */
.mobile-menu-backdrop {
  background-color: var(--mobile-menu-backdrop);
}

/* Enhanced typography for readability */
.mobile-menu-item {
  font-weight: var(--mobile-menu-text-weight); /* 700 - Extra bold */
  color: var(--mobile-menu-item-text); /* Maximum contrast */
  min-height: var(--mobile-menu-touch-target-min); /* 44px - WCAG AA */
}
```

#### 4. Scroll Lock Implementation

```typescript
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
    // Cleanup on unmount
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
  };
}, [isOpen, enableScrollLock]);
```

### Accessibility Implementation

```typescript
// Focus management
useEffect(() => {
  if (isOpen && firstFocusableRef.current) {
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

// Keyboard navigation
const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
  if (event.key === "Tab") {
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableRef.current) {
        event.preventDefault();
        themeToggleRef.current?.focus();
      }
    } else {
      if (document.activeElement === themeToggleRef.current) {
        event.preventDefault();
        firstFocusableRef.current?.focus();
      }
    }
  }
}, []);
```

## Animation Architecture

### Framer Motion Integration

The animation system uses Framer Motion for declarative, performant animations with accessibility support.

#### 1. Animation Variants Pattern

```typescript
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
```

#### 2. Scroll Reveal Implementation

```typescript
// app/components/enhanced-scroll-reveal.tsx
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  threshold = 0.1
}: ScrollRevealProps) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
```

#### 3. Reduced Motion Support

```typescript
const shouldReduceMotion = useReducedMotion();

// Applied to all animations
const animationConfig = {
  duration: shouldReduceMotion ? 0.01 : 0.3,
  ease: shouldReduceMotion ? "linear" : [0.22, 1, 0.36, 1],
};
```

## 3D Graphics Integration

### React Three Fiber Setup

The 3D scene uses React Three Fiber for declarative 3D graphics with React.

#### 1. Scene Configuration

```typescript
// app/components/hero-scene.tsx
export default function HeroScene() {
  const { theme } = useTheme();

  // Theme-aware colors
  const bgColor = theme === 'dark' ? '#0c1027' : '#f8fafc';
  const ambientIntensity = theme === 'dark' ? 0.92 : 0.6;

  return (
    <Canvas
      camera={{ position: [0, 0.7, 4.2], fov: 38 }}
      dpr={[1, 1.75]}
    >
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={ambientIntensity} />
      {/* 3D components */}
    </Canvas>
  );
}
```

#### 2. Shader Implementation

```typescript
function AuroraBackdrop() {
  const material = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={material}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color("#100b2b") },
          uColor2: { value: new THREE.Color("#1d2360") },
          uColor3: { value: new THREE.Color("#6edbff") },
        }}
        vertexShader={`/* GLSL vertex shader */`}
        fragmentShader={`/* GLSL fragment shader */`}
      />
    </mesh>
  );
}
```

#### 3. Performance Optimization

```typescript
// Device detection for performance adaptation
const [isCoarsePointer, setIsCoarsePointer] = useState(false);

useEffect(() => {
  const mql = window.matchMedia("(pointer: coarse)");
  setIsCoarsePointer(mql.matches);
}, []);

// Adaptive particle count
<Sparkles
  count={theme === 'dark' ? 80 : 40}
  size={isCoarsePointer ? 2.2 : 3.2}
/>
```

## Component Patterns

### 1. Compound Component Pattern

```typescript
// Card compound component
const Card = ({ children, className, ...props }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

// Usage
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>
```

### 2. Render Props Pattern

```typescript
// Theme toggle with flexible rendering
<ThemeToggle renderAsButton={false} />
```

### 3. Higher-Order Component Pattern

```typescript
// withAnimation HOC
export function withAnimation<T>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Component {...props} />
    </motion.div>
  );
}
```

## Performance Optimization

### 1. Animation Performance

```typescript
// RequestAnimationFrame for smooth animations
const animationFrameRef = useRef<number | undefined>();

const handleMouseMove = (e: MouseEvent) => {
  if (!animationFrameRef.current) {
    animationFrameRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      animationFrameRef.current = undefined;
    });
  }
};
```

### 2. Memory Management

```typescript
// Proper cleanup in useEffect
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const animate = () => {
    // Animation logic
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, []);
```

### 3. Bundle Optimization

```typescript
// Dynamic imports for heavy components
const HeroScene = dynamic(() => import('./hero-scene'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
```

## State Management

### 1. Local State with useState

```typescript
// Simple component state
const [isOpen, setIsOpen] = useState(false);
const [position, setPosition] = useState({ x: 0, y: 0 });
```

### 2. Global State with Context

```typescript
// Theme context for global state
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 3. Derived State

```typescript
// Computed values without additional state
const isHovering = useMemo(() =>
  target.matches('a, button, [role="button"]') ||
  target.closest('a, button, [role="button"]'),
  [target]
);
```

## Error Handling & Edge Cases

### 1. Hydration Error Prevention

```typescript
// Avoiding hydration mismatches
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return null; // Prevents hydration errors
}
```

### 2. Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

### 3. Graceful Degradation

```typescript
// Canvas 3D scene fallback
const [isSupported, setIsSupported] = useState(true);

useEffect(() => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  setIsSupported(!!gl);
}, []);

if (!isSupported) {
  return <div className="fallback-background">Fallback content</div>;
}
```

### 4. Network Error Handling

```typescript
// Image error handling
<Image
  src={project.image}
  alt={project.title}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
    const parent = target.parentElement;
    if (parent) {
      parent.innerHTML = `
        <div class="w-full h-full flex items-center justify-center">
          <div class="text-center">
            <div class="text-4xl mb-2">🚀</div>
            <div class="text-sm">Project Preview</div>
          </div>
        </div>
      `;
    }
  }}
/>
```

## Testing Strategy

### 1. Component Testing

```typescript
// Testing with React Testing Library
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './theme-provider';

test('renders theme provider', () => {
  render(
    <ThemeProvider>
      <div>Test content</div>
    </ThemeProvider>
  );

  expect(screen.getByText('Test content')).toBeInTheDocument();
});
```

### 2. Accessibility Testing

```typescript
// Accessibility testing with jest-axe
import { axe, toHaveNoViolations } from 'jest-axe';
import { MobileMenu } from './mobile-menu';

test('mobile menu should be accessible', async () => {
  const { container } = render(<MobileMenu navigationItems={['Home', 'About']} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

This technical implementation guide provides deep insights into the architectural decisions, patterns, and best practices used throughout the portfolio codebase. Each section demonstrates practical implementations that can serve as reference examples for similar features in other projects.