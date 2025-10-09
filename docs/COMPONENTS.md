# Component Documentation

## Table of Contents

1. [Core Infrastructure Components](#core-infrastructure-components)
2. [Navigation Components](#navigation-components)
3. [Interactive Components](#interactive-components)
4. [Animation Components](#animation-components)
5. [UI Components](#ui-components)
6. [Content Components](#content-components)
7. [Utility Components](#utility-components)

## Core Infrastructure Components

### ThemeProvider (`app/components/theme-provider.tsx`)

**Purpose**: Global theme management with light/dark mode support and persistent preferences.

**Key Features**:
- Context-based theme state management
- LocalStorage persistence for user preferences
- Server-side rendering compatibility with hydration handling
- Automatic theme detection and fallback

**Props**:
```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
}
```

**Usage Example**:
```typescript
<ThemeProvider>
  <App />
</ThemeProvider>
```

**Implementation Details**:
- Uses React Context API for global state
- Handles SSR hydration with `mounted` state
- Default theme preference: light mode
- Persists theme choice in localStorage

**Hooks**:
- `useTheme()`: Access theme state and toggle function

---

## Navigation Components

### MobileMenu (`app/components/mobile-menu.tsx`)

**Purpose**: Responsive mobile navigation menu with enhanced accessibility and animations.

**Key Features**:
- TypeScript-safe component with comprehensive type definitions
- Enhanced focus management and keyboard navigation
- Solid background design (100% opacity) for maximum readability
- Smooth animations with Framer Motion
- Scroll lock functionality to prevent background scrolling
- Touch-friendly interface with WCAG AA compliant touch targets
- Nested button prevention (theme toggle integration)

**Props**:
```typescript
interface MobileMenuProps {
  navigationItems: string[] | NavigationItem[];
  className?: string;
  enableScrollLock?: boolean;
  animationDuration?: number;
  onBackdropClick?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
}
```

**Usage Example**:
```typescript
<MobileMenu
  navigationItems={["About", "Projects", "Contact"]}
  enableScrollLock={true}
  onClose={() => setIsOpen(false)}
/>
```

**Implementation Highlights**:
- **Hydration Error Prevention**: Uses flexible rendering to avoid nested button HTML validation errors
- **Maximum Contrast System**: 100% solid backgrounds with no transparency for optimal readability
- **Enhanced Typography**: Extra bold fonts (weight: 700-800) with optimized letter spacing
- **Responsive Design**: Clamp-based responsive width (280px-320px)
- **Accessibility**: Full keyboard navigation, ARIA labels, and focus trap

**Recent Improvements**:
- Fixed nested button hydration error with TypeScript interfaces
- Enhanced mobile menu readability with 100% solid backgrounds
- Improved typography with maximum contrast
- WCAG AA compliance for touch targets (minimum 44px)

### ThemeToggle (`app/components/theme-toggle.tsx`)

**Purpose**: Theme switching component with flexible rendering options.

**Key Features**:
- Flexible rendering as standalone button or content-only
- Smooth icon animations with Framer Motion
- Enhanced focus indicators and accessibility
- TypeScript-safe props interface

**Props**:
```typescript
interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  renderAsButton?: boolean;
  className?: string;
  onToggleClick?: () => void;
  motionProps?: Partial<MotionProps>;
}
```

**Usage Examples**:
```typescript
// Standalone button
<ThemeToggle renderAsButton={true} />

// Embedded in another component
<Button>
  <ThemeToggle renderAsButton={false} />
  Theme Settings
</Button>
```

**Implementation Details**:
- Prevents nested button HTML validation errors
- Animated icon transitions (Moon ↔ Sun)
- Theme-aware color adaptation
- 48px minimum touch target for accessibility

---

## Interactive Components

### TargetCursor (`app/components/target-cursor.tsx`)

**Purpose**: Custom animated cursor that follows mouse movement and responds to interactive elements.

**Key Features**:
- Animated circular cursor with trailing dot
- Hover state detection and scaling
- Touch device detection and automatic disabling
- Performance-optimized with requestAnimationFrame
- Spring-based smooth animations

**Implementation**:
```typescript
// Automatically detects and follows mouse movement
// Scales up on hover over interactive elements
// Disabled on touch devices for better UX
```

**Performance Features**:
- Uses `requestAnimationFrame` for smooth 60fps animations
- Event listener cleanup on unmount
- Touch device detection to avoid conflicts

### FaultyTerminal (`app/components/faulty-terminal.tsx`)

**Purpose**: Animated terminal background with particle effects and mouse interaction.

**Key Features**:
- Canvas-based particle system with terminal characters
- Mouse interaction with particle repulsion effects
- Random glitch effects for terminal aesthetic
- Responsive particle density based on screen size
- Reduced motion support for accessibility

**Technical Implementation**:
- Uses HTML5 Canvas for high-performance rendering
- Particle physics with velocity and friction
- Dynamic particle creation and lifecycle management
- CSS custom properties for theme-aware colors

**Performance Optimizations**:
- Adaptive particle count based on screen resolution
- Efficient particle pooling and lifecycle management
- Reduced motion support for performance-sensitive users

### HeroScene (`app/components/hero-scene.tsx`)

**Purpose**: 3D animated background scene using React Three Fiber.

**Key Features**:
- WebGL-powered 3D graphics with Three.js
- Interactive mouse and device orientation support
- Theme-aware lighting and colors
- Animated aurora backdrop and shooting stars
- Performance optimization with device detection

**Components Included**:
- **AuroraBackdrop**: Animated gradient aurora effect using shaders
- **ShootingStarField**: Animated shooting stars with instanced rendering
- **Sparkles**: Particle effects for ambient atmosphere
- **Stars**: Starfield background for dark theme

**Technical Highlights**:
- Custom GLSL shaders for aurora effects
- Instanced rendering for performance with multiple objects
- Device orientation support for mobile devices
- Automatic performance adaptation based on device capabilities

---

## Animation Components

### ScrollReveal (`app/components/enhanced-scroll-reveal.tsx`)

**Purpose**: Advanced scroll-triggered animations with intersection observer.

**Key Features**:
- Intersection Observer API for performance
- Staggered animations for lists and grids
- Customizable animation variants
- Reduced motion support
- One-time and repeatable animation options

**Usage Example**:
```typescript
<ScrollReveal direction="up" delay={0.2}>
  <div>Content that animates on scroll</div>
</ScrollReveal>

<ScrollRevealStaggered>
  {items.map((item, index) => (
    <div key={index}>{item}</div>
  ))}
</ScrollRevealStaggered>
```

### BlurRevealText (`app/components/blur-reveal-text.tsx`)

**Purpose**: Text animation with blur-to-focus effect.

**Implementation**:
- Animated blur to focus transition
- Customizable blur amount and duration
- Staggered character animations

### AnimatedBackground (`app/components/animated-background.tsx`)

**Purpose**: Subtle animated background effects.

**Features**:
- Gradient animations
- Floating particle effects
- Theme-aware color schemes

---

## UI Components

### Button (`components/ui/button.tsx`)

**Purpose**: Reusable button component with multiple variants and sizes.

**Variants**:
- `default`: Standard button style
- `destructive`: Danger/action button
- `outline`: Outlined button
- `secondary`: Secondary button
- `ghost`: Minimal button
- `link`: Link-style button

**Sizes**:
- `default`: Standard size
- `sm`: Small button
- `lg`: Large button
- `icon`: Icon-only button

### Card (`components/ui/card.tsx`)

**Purpose**: Flexible card container component.

**Components**:
- `Card`: Main container
- `CardHeader`: Header section
- `CardTitle`: Title text
- `CardDescription`: Description text
- `CardContent`: Main content area
- `CardFooter`: Footer section

### Badge (`components/ui/badge.tsx`)

**Purpose**: Small status or category indicators.

**Variants**:
- `default`: Standard badge
- `secondary`: Secondary style
- `destructive`: Error/danger indicator
- `outline`: Outlined badge

---

## Content Components

### CertificationCard (`app/components/certification-card.tsx`)

**Purpose**: Display certification and achievement credentials.

**Key Features**:
- PDF preview and download functionality
- Modal integration for detailed views
- Hover animations and transitions
- Responsive design for mobile devices

**Props Interface**:
```typescript
interface CertificationCardProps {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  previewImage: string;
  description: string;
  credentialUrl: string;
}
```

### ExperienceTimeline (`app/components/experience-timeline.tsx`)

**Purpose**: Visual timeline component for professional experience.

**Features**:
- Vertical timeline layout
- Animated entry points
- Date and position indicators
- Responsive design

### SkillSlider (`app/components/skill-slider.tsx`)

**Purpose**: Animated skill showcase with automatic scrolling.

**Features**:
- Infinite scrolling animation
- Touch-enabled drag interactions
- Responsive grid layout
- Performance-optimized rendering

---

## Utility Components

### LogoLoop (`app/components/logo-loop.tsx`)

**Purpose**: Animated logo showcase with continuous scrolling.

**Implementation**:
- CSS animation for smooth scrolling
- Duplicate content for seamless loop
- Responsive sizing and speed adjustment

### CustomCursor (`app/components/custom-cursor.tsx`)

**Purpose**: Enhanced cursor customization (alternative to TargetCursor).

**Features**:
- Custom cursor shapes and animations
- Hover state management
- Device detection for touch screens

---

## Component Best Practices

### 1. TypeScript Integration
All components use comprehensive TypeScript interfaces:
```typescript
interface ComponentProps {
  // Required props
  requiredProp: string;

  // Optional props with defaults
  optionalProp?: boolean;

  // Event handlers
  onClick?: () => void;

  // Children support
  children?: React.ReactNode;
}
```

### 2. Accessibility Standards
- Semantic HTML elements
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- WCAG AA compliance for touch targets (minimum 44px)

### 3. Performance Optimization
- Lazy loading for heavy components
- Intersection Observer for scroll animations
- RequestAnimationFrame for smooth animations
- Proper cleanup in useEffect hooks
- Component memoization where appropriate

### 4. Responsive Design
- Mobile-first approach
- Flexible layouts with Tailwind CSS
- Touch-friendly interface elements
- Adaptive animations based on device capabilities

### 5. Theme Integration
- CSS custom properties for dynamic theming
- Automatic color adaptation
- Smooth theme transitions
- Component-level theme awareness

## Component Development Guidelines

### When Creating New Components:

1. **Define Clear Interfaces**: Use TypeScript for all props
2. **Consider Accessibility**: Include ARIA labels and keyboard support
3. **Optimize Performance**: Use proper React patterns and cleanup
4. **Test Responsiveness**: Ensure mobile-first design
5. **Document Usage**: Include examples and prop descriptions
6. **Handle Edge Cases**: Consider loading states, errors, and empty states

### Component Naming Conventions:
- Use PascalCase for component names
- Descriptive names that indicate purpose
- Group related components in directories
- Use index files for clean imports

### File Structure:
```
components/
├── ui/                    # Reusable UI primitives
├── feature-components/    # Business logic components
├── layout-components/     # Layout and structure
└── utility-components/    # Helper and utility components
```

This component architecture provides a solid foundation for building scalable, accessible, and performant web applications while maintaining code quality and developer experience.