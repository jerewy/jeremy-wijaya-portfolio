# Portfolio Architecture Overview

## Executive Summary

This document provides a comprehensive architectural overview of Jeremy Wijaya's Next.js portfolio website. The portfolio is built using modern web technologies and best practices, showcasing advanced React patterns, responsive design, and accessibility considerations.

## Technology Stack

### Core Framework
- **Next.js 15** - React framework with server-side rendering and static site generation
- **React 19** - Component library for building user interfaces
- **TypeScript 5** - Static type checking for improved development experience

### Styling and UI
- **Tailwind CSS 3.4** - Utility-first CSS framework for rapid styling
- **Framer Motion 12** - Animation library for fluid user interactions
- **Radix UI** - Accessible component primitives for forms and dialogs
- **Lucide React** - Icon library for consistent iconography

### Performance and Optimization
- **React Icons** - Optimized icon components
- **Tailwind CSS Animate** - Animation utilities
- **CVA (Class Variance Authority)** - Component styling variants
- **Tailwind Merge** - Utility class merging

### 3D and Advanced Features
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                         │
├─────────────────────────────────────────────────────────────┤
│  Layout (app/layout.tsx)                                    │
│  ├── ThemeProvider                                          │
│  ├── Metadata & SEO                                         │
│  └── Global Styles                                          │
├─────────────────────────────────────────────────────────────┤
│  Main Page (app/page.tsx)                                   │
│  ├── Navigation Components                                  │
│  ├── Hero Section                                           │
│  ├── Content Sections (About, Projects, etc.)               │
│  └── Footer                                                 │
├─────────────────────────────────────────────────────────────┤
│  Component Layer (app/components/)                          │
│  ├── UI Components (badge, button, card, dialog)           │
│  ├── Feature Components (theme, mobile-menu, animations)   │
│  └── Specialized Components (3D, custom cursor, terminal)  │
├─────────────────────────────────────────────────────────────┤
│  Utilities & Hooks (lib/, app/hooks/)                       │
│  ├── Utility Functions                                      │
│  ├── Custom Hooks                                           │
│  └── Type Definitions                                       │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
Portfolio (app/page.tsx)
├── TargetCursor (Custom cursor effect)
├── FaultyTerminal (Terminal background animation)
├── Navigation
│   ├── ThemeToggle
│   └── MobileMenu
├── HeroScene (3D animated background)
├── Content Sections
│   ├── ScrollReveal Components
│   ├── Project Cards
│   ├── Experience Timeline
│   └── Certification Cards
└── Footer
```

## Design Patterns

### 1. Provider Pattern
The application uses React Context API for state management:

- **ThemeProvider**: Manages light/dark theme state across the application
- Custom hooks (`useTheme`) for consuming context
- Persistent theme storage in localStorage

### 2. Component Composition Pattern
- Highly reusable UI components in `components/ui/`
- Composable feature components that combine multiple UI elements
- Flexible prop interfaces for customization

### 3. Animation-First Approach
- Framer Motion for all animations
- Staggered animations for lists and sections
- Reduced motion support for accessibility
- Custom animation variants for consistent motion design

### 4. Mobile-First Responsive Design
- Mobile menu with enhanced accessibility
- Responsive breakpoints using Tailwind CSS
- Touch-friendly interface elements
- Progressive enhancement for larger screens

### 5. TypeScript Type Safety
- Comprehensive type definitions for all components
- Interface-based prop validation
- Generic utility types
- Strict type checking enabled

## Key Architectural Decisions

### 1. App Router vs Pages Router
**Decision**: Next.js 15 App Router
**Rationale**:
- Better support for React Server Components
- Improved performance with selective client-side hydration
- Enhanced developer experience with TypeScript support
- Future-proof architecture aligned with Next.js roadmap

### 2. Client-Side Theme Management
**Decision**: Client-side theme provider with localStorage persistence
**Rationale**:
- Immediate theme switching without server roundtrip
- Respects user's system preferences as default
- Persistent theme choice across sessions
- Smooth transitions between themes

### 3. Animation Strategy
**Decision**: Framer Motion with custom variants
**Rationale**:
- Declarative animation syntax
- Performance-optimized animations
- Reduced motion support for accessibility
- Consistent animation system across components

### 4. Component Architecture
**Decision**: Separation of UI and feature components
**Rationale**:
- Reusability of UI components
- Clear separation of concerns
- Easier testing and maintenance
- Scalable component architecture

### 5. Styling Approach
**Decision**: Tailwind CSS with CSS-in-JS fallbacks
**Rationale**:
- Rapid development with utility classes
- Consistent design system
- Responsive design utilities
- Small bundle size with tree-shaking

## Data Flow

### Theme Management Flow
```
User Action → ThemeToggle → ThemeContext → localStorage + DOM Classes → Re-render
```

### Mobile Menu Flow
```
Menu Click → useState → Animation State → Focus Management → Scroll Lock → Menu Display
```

### Scroll Reveal Flow
```
Scroll Event → Intersection Observer → State Update → Animation Trigger
```

## Security Considerations

### 1. Content Security Policy
- Proper meta tags for security headers
- Safe external link handling with `rel="noopener noreferrer"`
- Input validation in form components

### 2. Dependency Management
- Regular security updates via npm audit
- Minimal third-party dependencies
- Trusted libraries with active maintenance

### 3. Data Protection
- No personal data collection
- Client-side only theme preferences
- Secure external link handling

## Performance Optimizations

### 1. Bundle Optimization
- Dynamic imports for large components
- Code splitting by route
- Tree-shaking for unused code

### 2. Image Optimization
- Next.js Image component for automatic optimization
- Responsive image serving
- WebP format support

### 3. Animation Performance
- GPU-accelerated animations
- Reduced motion for performance-sensitive users
- Debounced scroll handlers

### 4. Critical CSS
- Tailwind CSS purging for minimal bundle size
- Critical CSS inlining for fast initial render
- Non-blocking CSS loading

## Accessibility Architecture

### 1. Semantic HTML
- Proper heading hierarchy
- Landmark elements for navigation
- Semantic form elements

### 2. Keyboard Navigation
- Full keyboard accessibility
- Focus management in modals
- Skip links for navigation

### 3. Screen Reader Support
- ARIA labels and descriptions
- Live regions for dynamic content
- Alternative text for images

### 4. Visual Accessibility
- High contrast ratios
- Responsive text sizing
- Clear focus indicators

## Deployment Architecture

### 1. Build Process
- TypeScript compilation
- Tailwind CSS processing
- Asset optimization
- Bundle analysis

### 2. Static Site Generation
- Pre-rendered pages for performance
- CDN-ready static assets
- Optimized loading strategies

### 3. Environment Configuration
- Environment-specific variables
- Build-time optimizations
- Development vs production settings

## Future Scalability

### 1. Content Management
- Headless CMS integration readiness
- Dynamic content loading capabilities
- API integration points

### 2. Performance Monitoring
- Analytics integration ready
- Performance metrics collection
- Error tracking setup

### 3. Feature Expansion
- Modular component system
- Plugin architecture potential
- Internationalization support

## Conclusion

The portfolio architecture demonstrates modern web development best practices with a focus on performance, accessibility, and maintainability. The component-based architecture, TypeScript integration, and modern tooling provide a solid foundation for future enhancements while maintaining excellent user experience across all devices and abilities.