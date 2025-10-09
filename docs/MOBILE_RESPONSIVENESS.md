# Mobile Responsiveness Documentation

## Table of Contents

1. [Responsive Design Philosophy](#responsive-design-philosophy)
2. [Breakpoint System](#breakpoint-system)
3. [Mobile-First Approach](#mobile-first-approach)
4. [Responsive Components](#responsive-components)
5. [Mobile Menu System](#mobile-menu-system)
6. [Touch Interactions](#touch-interactions)
7. [Performance Optimization](#performance-optimization)
8. [Device Detection](#device-detection)
9. [Responsive Typography](#responsive-typography)
10. [Testing Strategies](#testing-strategies)

## Responsive Design Philosophy

The portfolio follows a mobile-first responsive design approach, ensuring optimal user experience across all devices. The design philosophy prioritizes accessibility, performance, and usability on mobile devices while progressively enhancing the experience on larger screens.

### Core Principles

1. **Mobile-First Development**: Start with mobile layouts and progressively enhance for larger screens
2. **Content-Driven Design**: Content dictates layout structure across all viewport sizes
3. **Touch-First Interactions**: All interactive elements are optimized for touch input
4. **Performance-First**: Lightweight components and optimized assets for mobile networks
5. **Universal Accessibility**: Consistent experience across devices and input methods

### Responsive Design Goals

```typescript
// Responsive design objectives
const RESPONSIVE_GOALS = {
  // Layout objectives
  maintainContentHierarchy: true,
  optimizeReadingExperience: true,
  ensureNavigationAccessibility: true,

  // Performance objectives
  optimizeForMobileNetworks: true,
  minimizeLayoutShifts: true,
  ensureFastInteractions: true,

  // User experience objectives
  touchFriendlyInterface: true,
  readableTextOnAllSizes: true,
  accessibleNavigation: true,
};
```

## Breakpoint System

The portfolio uses Tailwind CSS's responsive breakpoint system with custom additions for precise control over layout behavior.

### Standard Breakpoints

```javascript
// Tailwind CSS default breakpoints
const BREAKPOINTS = {
  sm: '640px',   // Small screens (landscape phones)
  md: '768px',   // Medium screens (tablets)
  lg: '1024px',  // Large screens (laptops)
  xl: '1280px',  // Extra large screens (desktops)
  2xl: '1536px', // 2X large screens (large desktops)
};

// Custom breakpoints for specific use cases
const CUSTOM_BREAKPOINTS = {
  xs: '475px',   // Extra small screens (small phones)
  screen: '100vw', // Viewport-based units
  '3xl': '1920px', // Ultra-wide screens
};
```

### Breakpoint Usage Patterns

```typescript
// Responsive component patterns
export function ResponsiveComponent() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Mobile-first text sizing */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        Responsive Heading
      </h1>

      {/* Adaptive spacing */}
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {/* Content that adapts to screen size */}
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Grid items */}
      </div>
    </div>
  );
}
```

### Fluid Typography with clamp()

```css
/* Fluid typography using CSS clamp() */
.fluid-text {
  font-size: clamp(1rem, 4vw, 2rem);
  line-height: clamp(1.5rem, 5vw, 2.5rem);
}

/* Responsive spacing with clamp() */
.fluid-spacing {
  padding: clamp(1rem, 5vw, 3rem);
  margin: clamp(0.5rem, 3vw, 2rem);
}
```

## Mobile-First Approach

### Base Mobile Layout

```typescript
// Mobile-first component structure
export function MobileFirstLayout() {
  return (
    <div className="min-h-screen">
      {/* Header - always visible */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo />
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <MobileMenu navigationItems={navigationItems} />
          </div>
        </div>
      </header>

      {/* Main content - full width on mobile */}
      <main className="w-full">
        {/* Hero section - optimized for mobile */}
        <section className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-lg">
            <h1 className="text-4xl font-bold mb-6">
              Mobile-First Hero
            </h1>
            <p className="text-lg mb-8">
              Content optimized for mobile reading
            </p>
            <div className="flex flex-col space-y-4">
              <Button size="lg" className="w-full">
                Primary Action
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                Secondary Action
              </Button>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Content blocks */}
          </div>
        </section>
      </main>
    </div>
  );
}
```

### Progressive Enhancement

```typescript
// Progressive enhancement for larger screens
export function ProgressiveEnhancement() {
  return (
    <div>
      {/* Mobile layout (base styles) */}
      <div className="w-full px-4">
        <h2 className="text-xl font-semibold mb-4">
          Section Title
        </h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-card p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet enhancement */}
      <div className="hidden sm:block sm:px-6">
        <div className="grid grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop enhancement */}
      <div className="hidden lg:block lg:px-8">
        <div className="grid grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card key={index} className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Responsive Components

### Responsive Navigation

```typescript
// Adaptive navigation component
export function ResponsiveNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - responsive sizing */}
          <motion.a
            href="#top"
            className="flex items-center space-x-2 text-lg sm:text-xl font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="hidden sm:inline">Jeremy Wijaya</span>
            <span className="sm:hidden">JW</span>
          </motion.a>

          {/* Desktop navigation - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigationItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Theme toggle - responsive positioning */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenu navigationItems={navigationItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
```

### Responsive Cards

```typescript
// Adaptive card component
export function ResponsiveCard({ project }: { project: Project }) {
  return (
    <Card className="group border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      {/* Card header with responsive image */}
      <CardHeader className="p-0 overflow-hidden rounded-t-lg">
        <div className="relative aspect-video sm:aspect-[16/10] lg:aspect-[16/9] bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </CardHeader>

      {/* Card content with responsive typography */}
      <CardContent className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>

        <CardDescription className="text-sm sm:text-base mb-4 leading-relaxed">
          {project.summary}
        </CardDescription>

        {/* Responsive tag layout */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Responsive button layout */}
        <div className="flex flex-col sm:flex-row gap-3">
          {project.liveLink && (
            <Button size="sm" className="w-full sm:w-auto">
              <ExternalLink className="w-3 h-3 mr-1" />
              Live
            </Button>
          )}

          <Button size="sm" variant="outline" className="w-full sm:w-auto">
            <Github className="w-3 h-3 mr-1" />
            Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Responsive Grid Layouts

```typescript
// Adaptive grid system
export function ResponsiveGridLayout() {
  return (
    <div className="w-full">
      {/* Single column on mobile */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div className="bg-card p-4 rounded-lg">Full width item</div>
      </div>

      {/* Two columns on small screens */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg">Half width item</div>
        <div className="bg-card p-6 rounded-lg">Half width item</div>
      </div>

      {/* Three columns on medium screens */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-8 mb-8">
        <div className="bg-card p-8 rounded-lg">Third width item</div>
        <div className="bg-card p-8 rounded-lg">Third width item</div>
        <div className="bg-card p-8 rounded-lg">Third width item</div>
      </div>

      {/* Complex responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "bg-card p-4 sm:p-6 lg:p-8 rounded-lg",
              // Responsive column spans
              index === 0 && "col-span-1 sm:col-span-2 lg:col-span-1",
              index === 1 && "col-span-1 sm:col-span-2 lg:col-span-2"
            )}
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Mobile Menu System

The mobile menu is a cornerstone of the responsive experience, featuring accessibility, performance, and usability optimizations.

### Enhanced Mobile Menu Implementation

```typescript
// Mobile menu with comprehensive responsive features
export function MobileMenu({
  navigationItems,
  enableScrollLock = true,
  className = '',
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const themeToggleRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Responsive menu width
  const menuWidth = useMemo(() => {
    if (typeof window === 'undefined') return '320px';
    const screenWidth = window.innerWidth;
    return `clamp(280px, 85vw, 320px)`;
  }, []);

  // Handle scroll lock with mobile consideration
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

  // Responsive animation variants
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

  return (
    <>
      {/* Menu button - mobile only */}
      <Button
        ref={firstFocusableRef}
        variant="ghost"
        size="lg"
        className="md:hidden min-h-[48px] min-w-[48px] p-3"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile menu overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop with mobile optimization */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden mobile-menu-backdrop"
              variants={{
                closed: { opacity: 0 },
                open: { opacity: 1 },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu sidebar with responsive width */}
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              className="fixed top-0 left-0 bottom-0 z-50 md:hidden mobile-menu-sidebar border-r shadow-2xl"
              style={{
                width: menuWidth,
              }}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Menu header */}
              <header className="flex items-center justify-between px-6 py-5 border-b border-border min-h-[64px]">
                <h2 className="text-xl font-bold tracking-tight flex-1 pr-4">
                  Navigation
                </h2>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="min-h-[48px] min-w-[48px] p-3"
                >
                  <X className="h-6 w-6" />
                </Button>
              </header>

              {/* Navigation items with mobile optimization */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto" role="navigation">
                <ul className="space-y-1" role="menu">
                  {navigationItems.map((item, index) => (
                    <motion.li
                      key={item}
                      variants={{
                        closed: { opacity: 0, y: 20 },
                        open: { opacity: 1, y: 0 },
                      }}
                      role="none"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <motion.button
                        className={cn(
                          "mobile-menu-item w-full text-left",
                          "transition-all duration-200 relative overflow-hidden",
                          "focus:outline-none focus:ring-2 focus:ring-primary",
                          "min-h-[44px] px-5 py-4 rounded-lg"
                        )}
                        onClick={() => {
                          handleNavigationClick(item);
                          setIsOpen(false);
                        }}
                        role="menuitem"
                        whileHover={{
                          backgroundColor: 'var(--mobile-menu-item-hover)',
                          scale: 1.02,
                        }}
                        whileTap={{
                          backgroundColor: 'var(--mobile-menu-item-active)',
                          scale: 0.98,
                        }}
                      >
                        <span className="font-semibold text-base">{item}</span>
                        <span className="text-muted-foreground opacity-60 text-sm ml-auto">
                          →
                        </span>
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Theme toggle in mobile menu */}
              <footer className="border-t border-border p-6">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">Theme</span>
                  <ThemeToggle
                    ref={themeToggleRef}
                    renderAsButton={true}
                    className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
                    aria-label="Toggle theme"
                  />
                </div>
              </footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

### Mobile Menu Navigation Handler

```typescript
// Mobile navigation with smooth scrolling and offset
const handleNavigationClick = useCallback((item: string) => {
  const element = document.getElementById(item.toLowerCase());
  if (element) {
    const offset = 80; // Account for fixed header on mobile
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}, []);
```

## Touch Interactions

### Touch-Friendly Components

```typescript
// Touch-optimized interactive elements
export function TouchOptimizedButton({
  children,
  className = '',
  size = 'default',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const touchSize = {
    sm: 'min-h-[44px] min-w-[44px] px-3 py-2',
    default: 'min-h-[48px] min-w-[48px] px-4 py-3',
    lg: 'min-h-[52px] min-w-[52px] px-6 py-4',
  };

  return (
    <motion.button
      className={cn(
        'touch-manipulation',
        'inline-flex items-center justify-center',
        'font-medium text-sm transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        touchSize[size],
        className
      )}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### Swipe Gestures

```typescript
// Swipe gesture handling for mobile interactions
export function useSwipeGesture(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  threshold = 50
) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const minSwipeDistance = threshold;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;

    const distance = touchStart.current.x - touchEnd.current.x;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    } else if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

// Usage in component
export function SwipeableCard({ children, onSwipeLeft, onSwipeRight }: {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}) {
  const swipeHandlers = useSwipeGesture(onSwipeLeft, onSwipeRight);

  return (
    <div
      {...swipeHandlers}
      className="touch-pan-y"
    >
      {children}
    </div>
  );
}
```

### Touch Feedback

```typescript
// Touch feedback system
export function TouchFeedback({ children }: { children: React.ReactNode }) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div
      className="relative overflow-hidden touch-manipulation"
      onMouseDown={createRipple}
    >
      {children}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute bg-current opacity-30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'ease-out' }}
        />
      ))}
    </div>
  );
}
```

## Performance Optimization

### Mobile Performance Strategies

```typescript
// Mobile performance optimization hooks
export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const mobileQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(mobileQuery.matches);

    // Detect low-end device
    const memory = (navigator as any).deviceMemory;
    const connection = (navigator as any).connection;
    const isLowEnd = memory && memory < 4 || connection && connection.effectiveType.includes('2g');
    setIsLowEndDevice(isLowEnd);

    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mobileQuery.addEventListener('change', handleMobileChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return { isMobile, isLowEndDevice, reducedMotion };
}

// Adaptive quality settings
export function useAdaptiveQuality() {
  const { isMobile, isLowEndDevice } = useMobileOptimization();

  const qualitySettings = useMemo(() => {
    if (isLowEndDevice) {
      return {
        animationQuality: 'low',
        imageQuality: 0.7,
        particleCount: 20,
        enableShadows: false,
        enableGlow: false,
      };
    } else if (isMobile) {
      return {
        animationQuality: 'medium',
        imageQuality: 0.8,
        particleCount: 40,
        enableShadows: false,
        enableGlow: true,
      };
    } else {
      return {
        animationQuality: 'high',
        imageQuality: 0.9,
        particleCount: 80,
        enableShadows: true,
        enableGlow: true,
      };
    }
  }, [isMobile, isLowEndDevice]);

  return qualitySettings;
}
```

### Image Optimization for Mobile

```typescript
// Mobile-optimized image component
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  const { isMobile, isLowEndDevice } = useMobileOptimization();

  // Responsive image sizes
  const sizes = useMemo(() => {
    if (isMobile) {
      return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw';
    }
    return '(max-width: 768px) 50vw, 33vw';
  }, [isMobile]);

  // Quality adjustment based on device
  const quality = useMemo(() => {
    if (isLowEndDevice) return 60;
    if (isMobile) return 75;
    return 85;
  }, [isMobile, isLowEndDevice]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={cn(
        'object-cover transition-transform duration-300',
        'group-hover:scale-105',
        className
      )}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
  );
}
```

## Device Detection

### Comprehensive Device Detection

```typescript
// Device detection utilities
export function useDeviceDetection() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouch: false,
    isRetina: false,
    orientation: 'portrait' as 'portrait' | 'landscape',
    pixelRatio: 1,
    screenWidth: 0,
    screenHeight: 0,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        isRetina: pixelRatio > 1,
        orientation: width > height ? 'landscape' : 'portrait',
        pixelRatio,
        screenWidth: width,
        screenHeight: height,
      });
    };

    updateDeviceInfo();

    const handleResize = () => {
      updateDeviceInfo();
    };

    const handleOrientationChange = () => {
      setTimeout(updateDeviceInfo, 100); // Delay for orientation change
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return deviceInfo;
}

// Responsive hook for device-specific behavior
export function useResponsiveValue<T>(values: {
  mobile: T;
  tablet?: T;
  desktop: T;
}): T {
  const deviceInfo = useDeviceDetection();

  if (deviceInfo.isMobile) return values.mobile;
  if (deviceInfo.isTablet && values.tablet) return values.tablet;
  return values.desktop;
}
```

### Orientation Handling

```typescript
// Orientation-specific component behavior
export function useOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isOrientationSupported, setIsOrientationSupported] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const angle = window.orientation || (screen.orientation?.angle || 0);
      const newOrientation = (angle === 0 || angle === 180) ? 'portrait' : 'landscape';
      setOrientation(newOrientation);
    };

    // Check if orientation is supported
    setIsOrientationSupported('orientation' in screen);

    updateOrientation();

    if ('orientation' in screen) {
      screen.orientation.addEventListener('change', updateOrientation);
    } else {
      window.addEventListener('orientationchange', updateOrientation);
    }

    return () => {
      if ('orientation' in screen) {
        screen.orientation.removeEventListener('change', updateOrientation);
      } else {
        window.removeEventListener('orientationchange', updateOrientation);
      }
    };
  }, []);

  return { orientation, isOrientationSupported };
}

// Orientation-aware component
export function OrientationAwareComponent() {
  const { orientation } = useOrientation();

  return (
    <div className={cn(
      "p-4",
      orientation === 'portrait' ? "space-y-4" : "space-y-2"
    )}>
      <h2 className="text-lg font-semibold">
        {orientation === 'portrait' ? 'Portrait View' : 'Landscape View'}
      </h2>
      <p className="text-muted-foreground">
        Content optimized for {orientation} orientation
      </p>
    </div>
  );
}
```

## Responsive Typography

### Fluid Typography System

```css
/* Fluid typography with clamp() */
:root {
  /* Fluid font sizes */
  --fluid-xs: clamp(0.75rem, 2vw, 0.875rem);
  --fluid-sm: clamp(0.875rem, 2.5vw, 1rem);
  --fluid-base: clamp(1rem, 3vw, 1.125rem);
  --fluid-lg: clamp(1.125rem, 3.5vw, 1.25rem);
  --fluid-xl: clamp(1.25rem, 4vw, 1.5rem);
  --fluid-2xl: clamp(1.5rem, 5vw, 2rem);
  --fluid-3xl: clamp(2rem, 6vw, 3rem);
  --fluid-4xl: clamp(3rem, 8vw, 4rem);

  /* Fluid spacing */
  --fluid-space-xs: clamp(0.25rem, 1vw, 0.5rem);
  --fluid-space-sm: clamp(0.5rem, 2vw, 1rem);
  --fluid-space-md: clamp(1rem, 3vw, 1.5rem);
  --fluid-space-lg: clamp(1.5rem, 4vw, 2rem);
  --fluid-space-xl: clamp(2rem, 5vw, 3rem);
}

/* Responsive typography classes */
.text-fluid-xs { font-size: var(--fluid-xs); }
.text-fluid-sm { font-size: var(--fluid-sm); }
.text-fluid-base { font-size: var(--fluid-base); }
.text-fluid-lg { font-size: var(--fluid-lg); }
.text-fluid-xl { font-size: var(--fluid-xl); }
.text-fluid-2xl { font-size: var(--fluid-2xl); }
.text-fluid-3xl { font-size: var(--fluid-3xl); }
.text-fluid-4xl { font-size: var(--fluid-4xl); }
```

### Reading Optimization

```typescript
// Reading-optimized text component
export function ReadingOptimizedText({
  children,
  maxLineWidth = '65ch',
  className = '',
}: {
  children: React.ReactNode;
  maxLineWidth?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'leading-relaxed text-foreground',
        'text-fluid-base md:text-fluid-lg',
        className
      )}
      style={{
        maxWidth: maxLineWidth,
        lineHeight: '1.7',
        letterSpacing: '0.01em',
      }}
    >
      {children}
    </div>
  );
}

// Responsive heading component
export function ResponsiveHeading({
  level = 1,
  children,
  className = '',
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}) {
  const headingClasses = {
    1: 'text-fluid-3xl md:text-fluid-4xl font-bold tracking-tight',
    2: 'text-fluid-2xl md:text-fluid-3xl font-semibold tracking-tight',
    3: 'text-fluid-xl md:text-fluid-2xl font-semibold',
    4: 'text-fluid-lg md:text-fluid-xl font-medium',
    5: 'text-fluid-base md:text-fluid-lg font-medium',
    6: 'text-fluid-sm md:text-fluid-base font-medium',
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={cn(headingClasses[level], className)}>
      {children}
    </Tag>
  );
}
```

## Testing Strategies

### Responsive Testing Tools

```typescript
// Responsive testing utilities
export function useResponsiveTest() {
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [breakpoint, setBreakpoint] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');

  useEffect(() => {
    const updateViewportSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewportSize({ width, height });

      // Update current breakpoint
      if (width < 475) setBreakpoint('xs');
      else if (width < 640) setBreakpoint('sm');
      else if (width < 768) setBreakpoint('md');
      else if (width < 1024) setBreakpoint('lg');
      else if (width < 1280) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);

    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  return { viewportSize, breakpoint };
}

// Component for testing responsive behavior
export function ResponsiveDebugger() {
  const { viewportSize, breakpoint } = useResponsiveTest();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-background/90 backdrop-blur-sm border rounded-lg p-3 text-xs font-mono">
      <div>Viewport: {viewportSize.width} × {viewportSize.height}</div>
      <div>Breakpoint: {breakpoint}</div>
      <div>Device: {viewportSize.width < 768 ? 'Mobile' : viewportSize.width < 1024 ? 'Tablet' : 'Desktop'}</div>
    </div>
  );
}
```

### Visual Regression Testing

```typescript
// Visual regression testing setup
export const ResponsiveTestStories = {
  'Mobile View': {
    viewport: { width: 375, height: 667 },
    components: ['MobileMenu', 'Navigation', 'HeroSection'],
  },
  'Tablet View': {
    viewport: { width: 768, height: 1024 },
    components: ['CardGrid', 'ProjectList', 'ContactForm'],
  },
  'Desktop View': {
    viewport: { width: 1920, height: 1080 },
    components: ['FullLayout', 'Dashboard', 'Analytics'],
  },
};

// Storybook responsive testing
export default {
  title: 'Responsive/Components',
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
    },
  },
};
```

This comprehensive mobile responsiveness documentation demonstrates the portfolio's commitment to providing an optimal user experience across all devices. The mobile-first approach, combined with advanced responsive techniques and performance optimizations, ensures that the portfolio is accessible, performant, and usable on any device.