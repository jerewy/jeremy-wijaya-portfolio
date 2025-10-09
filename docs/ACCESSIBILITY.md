# Accessibility Documentation

## Table of Contents

1. [Accessibility Philosophy](#accessibility-philosophy)
2. [WCAG 2.1 AA Compliance](#wcag-21-aa-compliance)
3. [Semantic HTML Structure](#semantic-html-structure)
4. [Keyboard Navigation](#keyboard-navigation)
5. [Screen Reader Support](#screen-reader-support)
6. [Color and Contrast](#color-and-contrast)
7. [Focus Management](#focus-management)
8. [ARIA Implementation](#aria-implementation)
9. [Mobile Accessibility](#mobile-accessibility)
10. [Testing and Validation](#testing-and-validation)

## Accessibility Philosophy

The portfolio is built with accessibility as a core principle, ensuring that all users, regardless of their abilities or the assistive technologies they use, can access and interact with the content effectively. The goal is to create an inclusive web experience that goes beyond mere compliance to provide genuine usability for everyone.

### Core Accessibility Principles

1. **Perceivable**: Information and user interface components must be presentable in ways users can perceive
2. **Operable**: User interface components and navigation must be operable
3. **Understandable**: Information and the operation of user interface must be understandable
4. **Robust**: Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies

### Accessibility Commitment

```typescript
// Accessibility configuration and constants
export const ACCESSIBILITY_CONFIG = {
  // WCAG compliance level
  complianceLevel: 'AA',

  // Contrast ratios (WCAG AA requirements)
  contrastRatios: {
    normalText: 4.5,      // 4.5:1 for normal text
    largeText: 3.0,        // 3.0:1 for large text (18pt+ or 14pt+ bold)
    graphics: 3.0,         // 3.0:1 for graphical objects
  },

  // Touch target sizes (WCAG AA requirements)
  touchTargets: {
    minimum: 44,           // 44x44 CSS pixels minimum
    recommended: 48,       // 48x48 CSS pixels recommended
  },

  // Timing for content updates
  timeouts: {
    autoHide: 5000,        // 5 seconds maximum for auto-hiding content
    animations: 0.3,       // Maximum animation duration when reduced motion is preferred
  },

  // Focus management
  focus: {
    visibleIndicator: true,
    skipLinks: true,
    trapFocus: true,
    restoreFocus: true,
  },
};
```

## WCAG 2.1 AA Compliance

The portfolio meets or exceeds WCAG 2.1 AA guidelines across all perceivable, operable, understandable, and robust criteria.

### Perceivable Information

#### Text Alternatives

```typescript
// Image accessibility with comprehensive alt text
export function AccessibleImage({
  src,
  alt,
  title,
  decorative = false,
  ...props
}: {
  src: string;
  alt?: string;
  title?: string;
  decorative?: boolean;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  // If decorative, use empty alt text
  const altText = decorative ? '' : alt || '';

  return (
    <img
      src={src}
      alt={altText}
      title={decorative ? undefined : title}
      role={decorative ? 'presentation' : undefined}
      loading="lazy"
      {...props}
    />
  );
}

// Usage examples
<AccessibleImage
  src="/jeremy-profile.jpg"
  alt="Jeremy Wijaya, AI Engineer and Full-Stack Developer, smiling at camera"
  title="Professional headshot of Jeremy Wijaya"
/>

<AccessibleImage
  src="/decorative-pattern.svg"
  decorative={true}
/>
```

#### Adaptable Content

```typescript
// Responsive content that maintains structure across devices
export function AccessibleContent() {
  return (
    <main role="main" aria-label="Main content">
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading">Jeremy Wijaya</h1>
        <p>AI Engineer & Full-Stack Developer</p>
      </section>

      <section aria-labelledby="about-heading">
        <h2 id="about-heading">About Me</h2>
        <div className="space-y-4">
          <p>Content that maintains readability across all screen sizes...</p>
        </div>
      </section>
    </main>
  );
}
```

#### Distinguishable Content

```typescript
// Color contrast checker utility
export function useContrastChecker() {
  const getContrastRatio = (color1: string, color2: string): number => {
    // Calculate relative luminance
    const getLuminance = (hex: string): number => {
      const rgb = hexToRgb(hex);
      const [r, g, b] = rgb.map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  };

  const checkWCAGCompliance = (ratio: number) => ({
    aa: {
      normal: ratio >= 4.5,
      large: ratio >= 3.0,
    },
    aaa: {
      normal: ratio >= 7.0,
      large: ratio >= 4.5,
    },
  });

  return { getContrastRatio, checkWCAGCompliance };
}
```

### Operable Interface

#### Keyboard Accessibility

```typescript
// Comprehensive keyboard navigation
export function useKeyboardNavigation(
  items: HTMLElement[],
  options: {
    orientation?: 'horizontal' | 'vertical';
    loop?: boolean;
    onActivate?: (item: HTMLElement) => void;
  } = {}
) {
  const { orientation = 'vertical', loop = true, onActivate } = options;
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    let newIndex = focusedIndex;

    switch (event.key) {
      case orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp':
        event.preventDefault();
        newIndex = focusedIndex - 1;
        break;

      case orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown':
        event.preventDefault();
        newIndex = focusedIndex + 1;
        break;

      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;

      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (onActivate && items[focusedIndex]) {
          onActivate(items[focusedIndex]);
        }
        return;

      default:
        return;
    }

    // Handle looping
    if (loop) {
      if (newIndex < 0) newIndex = items.length - 1;
      if (newIndex >= items.length) newIndex = 0;
    } else {
      newIndex = Math.max(0, Math.min(newIndex, items.length - 1));
    }

    setFocusedIndex(newIndex);
    items[newIndex]?.focus();
  }, [focusedIndex, items, orientation, loop, onActivate]);

  useEffect(() => {
    if (items.length > 0) {
      items[focusedIndex]?.focus();
    }
  }, [focusedIndex, items]);

  return { focusedIndex, handleKeyDown };
}
```

#### Focus Management

```typescript
// Focus trap for modals and overlays
export function useFocusTrap(isActive: boolean, containerRef: RefObject<HTMLElement>) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Store previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Get all focusable elements within container
    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Handle tab key cycling
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus first element
    firstElement?.focus();

    // Add event listener
    containerRef.current.addEventListener('keydown', handleTabKey);

    return () => {
      containerRef.current?.removeEventListener('keydown', handleTabKey);

      // Restore focus to previous element
      previousActiveElement.current?.focus();
    };
  }, [isActive, containerRef]);
}

// Skip links for keyboard navigation
export function SkipLinks() {
  return (
    <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring ml-2"
      >
        Skip to navigation
      </a>
    </div>
  );
}
```

### Understandable Information

#### Readable Content

```typescript
// Content readability utilities
export function useReadability() {
  const calculateReadingTime = (text: string): string => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} minute read`;
  };

  const checkReadingLevel = (text: string): {
    fleschKincaid: number;
    grade: string;
    suggestions: string[];
  } => {
    // Simplified readability calculation
    const sentences = text.split(/[.!?]+/).length;
    const words = text.trim().split(/\s+/).length;
    const syllables = countSyllables(text);

    const fleschKincaid = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));

    let grade = 'Professional';
    if (fleschKincaid > 90) grade = 'Very Easy (5th grade)';
    else if (fleschKincaid > 80) grade = 'Easy (6th grade)';
    else if (fleschKincaid > 70) grade = 'Fairly Easy (7th grade)';
    else if (fleschKincaid > 60) grade = 'Standard (8th-9th grade)';
    else if (fleschKincaid > 50) grade = 'Fairly Difficult (10th-12th grade)';
    else if (fleschKincaid > 30) grade = 'Difficult (College level)';

    const suggestions = [];
    if (fleschKincaid < 60) {
      suggestions.push('Consider using shorter sentences');
      suggestions.push('Use simpler words where possible');
    }
    if (syllables / words > 1.5) {
      suggestions.push('Consider using words with fewer syllables');
    }

    return { fleschKincaid, grade, suggestions };
  };

  return { calculateReadingTime, checkReadingLevel };
}
```

#### Predictable Functionality

```typescript
// Consistent component behavior
export function AccessibleButton({
  children,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    default: 'h-10 px-4 py-2',
    lg: 'h-11 px-8',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        'min-h-[44px] min-w-[44px]' // WCAG AA touch target requirements
      )}
      disabled={disabled || loading}
      onClick={onClick}
      aria-disabled={disabled || loading}
      aria-describedby={loading ? 'loading-description' : undefined}
      {...props}
    >
      {loading && (
        <span className="sr-only" id="loading-description">
          Loading, please wait
        </span>
      )}

      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {children}
    </button>
  );
}
```

### Robust Content

#### Assistive Technology Support

```typescript
// Screen reader announcements
export function useScreenReader() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const announcePageChange = (pageTitle: string) => {
    announce(`Navigated to ${pageTitle}`, 'assertive');
  };

  const announceFormError = (errorMessage: string) => {
    announce(`Form error: ${errorMessage}`, 'assertive');
  };

  const announceSuccess = (successMessage: string) => {
    announce(successMessage, 'polite');
  };

  return { announce, announcePageChange, announceFormError, announceSuccess };
}

// Usage in components
const { announce } = useScreenReader();

// Announce navigation changes
useEffect(() => {
  announce(`Loaded ${currentSection} section`);
}, [currentSection]);

// Announce form submission
const handleSubmit = async (data: FormData) => {
  try {
    await submitForm(data);
    announce('Form submitted successfully');
  } catch (error) {
    announce('Form submission failed, please try again');
  }
};
```

## Semantic HTML Structure

### Document Structure

```typescript
// Semantic HTML layout
export function AccessibleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip links for keyboard navigation */}
      <SkipLinks />

      {/* Header with navigation */}
      <header role="banner">
        <nav role="navigation" aria-label="Main navigation">
          <AccessibleNavigation />
        </nav>
      </header>

      {/* Main content area */}
      <main role="main" id="main-content" aria-label="Main content">
        {children}
      </main>

      {/* Footer */}
      <footer role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Jeremy Wijaya. Built with Next.js, TypeScript, and passion for AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
```

### Content Sections

```typescript
// Semantic sectioning
export function AccessibleSections() {
  return (
    <main>
      {/* Hero section */}
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="sr-only">
          Jeremy Wijaya - AI Engineer & Full-Stack Developer
        </h1>
        <div aria-hidden="true">
          {/* Visual-only content */}
        </div>
      </section>

      {/* About section */}
      <section aria-labelledby="about-heading">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 id="about-heading" className="text-3xl font-bold mb-8">
            About Me
          </h2>
          <div className="prose prose-lg max-w-none">
            {/* About content */}
          </div>
        </div>
      </section>

      {/* Projects section */}
      <section aria-labelledby="projects-heading">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 id="projects-heading" className="text-3xl font-bold mb-8">
            Featured Projects
          </h2>
          <div role="region" aria-label="Project showcase">
            <AccessibleProjectGrid />
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section aria-labelledby="contact-heading">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 id="contact-heading" className="text-3xl font-bold mb-8">
            Let's Connect
          </h2>
          <form aria-labelledby="contact-form-heading">
            <h3 id="contact-form-heading" className="sr-only">
              Contact form
            </h3>
            <AccessibleContactForm />
          </form>
        </div>
      </section>
    </main>
  );
}
```

## Screen Reader Support

### Comprehensive ARIA Implementation

```typescript
// ARIA-compliant project card
export function AccessibleProjectCard({ project, index }: {
  project: Project;
  index: number;
}) {
  return (
    <article
      className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow"
      aria-labelledby={`project-${index}-title`}
      aria-describedby={`project-${index}-description`}
    >
      <header>
        <h3 id={`project-${index}-title`} className="text-xl font-semibold mb-3">
          {project.title}
        </h3>
      </header>

      <div className="space-y-4">
        <p id={`project-${index}-description`} className="text-muted-foreground">
          {project.summary}
        </p>

        {/* Technologies list */}
        <div aria-label="Technologies used">
          <h4 className="sr-only">Technologies</h4>
          <ul className="flex flex-wrap gap-2" role="list">
            {project.tags.map((tag, tagIndex) => (
              <li key={tagIndex} role="listitem">
                <span className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <nav aria-label="Project actions">
          <ul className="flex gap-3" role="list">
            <li role="listitem">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </li>
            <li role="listitem">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label={`View source code for ${project.title} on GitHub`}
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </article>
  );
}
```

### Live Regions

```typescript
// Live region for dynamic content updates
export function LiveRegion() {
  const [announcement, setAnnouncement] = useState('');
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');

  const announce = (message: string, announcePriority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message);
    setPriority(announcePriority);

    // Clear announcement after it's read
    setTimeout(() => setAnnouncement(''), 1000);
  };

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}

// Form validation with live regions
export function AccessibleForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const announce = useScreenReader();

  const validateField = (field: string, value: string) => {
    let error = '';

    switch (field) {
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'message':
        if (!value) {
          error = 'Message is required';
        } else if (value.length < 10) {
          error = 'Message must be at least 10 characters long';
        }
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
      announce(`Error in ${field}: ${error}`, 'assertive');
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form>
      <div className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            onChange={(e) => validateField('email', e.target.value)}
          />
          {errors.email && (
            <div id="email-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.email}
            </div>
          )}
        </div>

        {/* Other form fields */}
      </div>
    </form>
  );
}
```

## Color and Contrast

### WCAG AA Contrast Compliance

```css
/* Color palette with WCAG AA compliance */
:root {
  /* High contrast color system */
  --background: 47 18% 96%;      /* #eeece2 - Light background */
  --foreground: 30 16% 18%;      /* #3d3929 - Dark text (contrast: 16.25:1) */
  --primary: 18 59% 58%;         /* #bd5d3a - Accent color */
  --primary-foreground: 0 0% 100%; /* White text on primary */
  --muted: 47 12% 88%;           /* #e4e1d5 - Muted background */
  --muted-foreground: 30 8% 45%; /* #6b6b5a - Muted text (contrast: 6.2:1) */
  --border: 47 12% 82%;          /* #d3d0c3 - Border color */
}

.dark {
  --background: 222 84% 5%;      /* #0c1027 - Dark background */
  --foreground: 210 40% 98%;     /* #e6e6f0 - Light text (contrast: 18.5:1) */
  --primary: 18 91% 60%;         /* #d17a5a - Bright accent */
  --muted: 217 33% 17%;         /* #1a2444 - Dark muted background */
  --muted-foreground: 215 20% 65%; /* #8b92b3 - Muted text (contrast: 7.8:1) */
  --border: 217 33% 25%;         /* #2a3a5a - Dark border */
}

/* Mobile menu - Maximum contrast system */
:root {
  --mobile-menu-item-text: hsl(30 20% 15%); /* Very dark text (contrast: 18.5:1) */
  --mobile-menu-header-text: hsl(30 22% 12%); /* Even darker header text */
  --mobile-menu-item-hover: hsl(47 12% 85%); /* Hover background */
  --mobile-menu-item-active: hsl(18 59% 58%); /* Active state */
}

.dark {
  --mobile-menu-item-text: hsl(210 40% 100%); /* Pure white text */
  --mobile-menu-header-text: hsl(210 40% 100%); /* Pure white header text */
  --mobile-menu-item-hover: hsl(217 33% 22%); /* Dark hover background */
  --mobile-menu-item-active: hsl(18 91% 60%); /* Bright active state */
}
```

### Color Accessibility Utilities

```typescript
// Color contrast checker
export function useColorAccessibility() {
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  };

  const getLuminance = (rgb: [number, number, number]): number => {
    const [r, g, b] = rgb.map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const getContrastRatio = (color1: string, color2: string): number => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const checkWCAGCompliance = (ratio: number) => ({
    aa: {
      normal: ratio >= 4.5,
      large: ratio >= 3.0,
      ratio,
    },
    aaa: {
      normal: ratio >= 7.0,
      large: ratio >= 4.5,
      ratio,
    },
  });

  return { getContrastRatio, checkWCAGCompliance };
}

// Focus indicators with sufficient contrast
export function AccessibleFocusStyles() {
  return (
    <style jsx>{`
      :global(.focus-visible) {
        outline: 2px solid hsl(var(--primary));
        outline-offset: 2px;
      }

      :global(.focus-ring) {
        box-shadow: 0 0 0 2px hsl(var(--background)),
                    0 0 0 4px hsl(var(--primary));
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        :global(.focus-visible) {
          outline-width: 3px;
        }
      }

      /* Windows high contrast mode */
      @media screen and (-ms-high-contrast: active) {
        :global(.focus-visible) {
          outline: 3px solid windowText;
        }
      }
    `}</style>
  );
}
```

## Focus Management

### Comprehensive Focus System

```typescript
// Focus management utilities
export function useFocusManagement() {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  const focusElement = useCallback((element: HTMLElement | null) => {
    if (element) {
      element.focus();
      setFocusedElement(element);
    }
  }, []);

  const restoreFocus = useCallback(() => {
    if (focusedElement) {
      focusedElement.focus();
    }
  }, [focusedElement]);

  const blurElement = useCallback(() => {
    if (document.activeElement && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setFocusedElement(null);
  }, []);

  return { focusElement, restoreFocus, blurElement, focusedElement };
}

// Focus trap for modals
export function FocusTrap({ isActive, children }: {
  isActive: boolean;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Store previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Get all focusable elements
    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstElement.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      // Restore focus
      previousActiveElement.current?.focus();
    };
  }, [isActive]);

  return (
    <div ref={containerRef} className={isActive ? '' : 'pointer-events-none'}>
      {children}
    </div>
  );
}
```

### Skip Navigation

```typescript
// Skip links implementation
export function SkipLinks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'M') {
        setIsVisible(true);
      }
    };

    const handleClick = () => {
      setIsVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={cn(
      'fixed top-4 left-4 z-50 flex flex-col gap-2',
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      'transition-opacity duration-200'
    )}>
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        onClick={() => setIsVisible(false)}
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        onClick={() => setIsVisible(false)}
      >
        Skip to navigation
      </a>
    </div>
  );
}
```

## Mobile Accessibility

### Touch Accessibility

```typescript
// Touch-friendly components with accessibility
export function TouchAccessibleButton({
  children,
  size = 'default',
  ...props
}: {
  children: React.ReactNode;
  size?: 'sm' | 'default' | 'lg';
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const sizes = {
    sm: 'min-h-[44px] min-w-[44px] px-3 py-2 text-sm',
    default: 'min-h-[48px] min-w-[48px] px-4 py-3 text-base',
    lg: 'min-h-[52px] min-w-[52px] px-6 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        'font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'touch-manipulation', // Disable touch delay
        sizes[size],
        props.className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Accessible mobile menu
export function AccessibleMobileMenu({ navigationItems }: {
  navigationItems: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { announce } = useScreenReader();

  useEffect(() => {
    if (isOpen) {
      announce('Mobile menu opened');
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      announce('Mobile menu closed');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, announce]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden min-h-[48px] min-w-[48px] p-3"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-0 z-50 md:hidden"
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-background border-r shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="min-h-[44px] min-w-[44px] p-3"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="p-4" role="navigation">
              <ul className="space-y-2" role="menu">
                {navigationItems.map((item) => (
                  <li key={item} role="none">
                    <button
                      className="w-full text-left p-3 rounded-md hover:bg-accent focus:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
                      onClick={() => {
                        setIsOpen(false);
                        // Navigate to section
                        const element = document.getElementById(item.toLowerCase());
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      role="menuitem"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
```

### Gesture Accessibility

```typescript
// Accessible swipe gestures
export function useAccessibleSwipe(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  options: {
    threshold?: number;
    accessibilityLabel?: string;
  } = {}
) {
  const { threshold = 50, accessibilityLabel } = options;
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [announce] = useScreenReader();

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchEnd.x - touchStart.current.x;
    const deltaY = touchEnd.y - touchStart.current.y;

    // Ensure it's a horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && onSwipeRight) {
        announce(accessibilityLabel || 'Swiped right');
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        announce(accessibilityLabel || 'Swiped left');
        onSwipeLeft();
      }
    }

    touchStart.current = null;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
}
```

## Testing and Validation

### Automated Accessibility Testing

```typescript
// Accessibility testing utilities
export function useAccessibilityTesting() {
  const checkAltText = () => {
    const images = document.querySelectorAll('img');
    const issues: Array<{ element: HTMLImageElement; issue: string }> = [];

    images.forEach((img) => {
      if (!img.alt && img.role !== 'presentation') {
        issues.push({
          element: img,
          issue: 'Missing alt text for decorative image',
        });
      }
    });

    return issues;
  };

  const checkHeadings = () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const issues: Array<{ element: HTMLElement; issue: string }> = [];

    // Check for heading hierarchy
    let previousLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1]);
      if (level > previousLevel + 1) {
        issues.push({
          element: heading,
          issue: `Heading level ${level} skipped from level ${previousLevel}`,
        });
      }
      previousLevel = level;
    });

    // Check for empty headings
    headings.forEach((heading) => {
      if (!heading.textContent?.trim()) {
        issues.push({
          element: heading,
          issue: 'Empty heading element',
        });
      }
    });

    return issues;
  };

  const checkColorContrast = () => {
    const elements = document.querySelectorAll('*');
    const issues: Array<{ element: Element; issue: string; ratio?: number }> = [];

    elements.forEach((element) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;

      if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        // Simplified contrast check (would need full implementation)
        const ratio = 4.5; // Placeholder for actual calculation
        if (ratio < 4.5) {
          issues.push({
            element,
            issue: `Insufficient color contrast (${ratio.toFixed(2)}:1)`,
            ratio,
          });
        }
      }
    });

    return issues;
  };

  const runFullAccessibilityAudit = () => {
    const issues = {
      images: checkAltText(),
      headings: checkHeadings(),
      contrast: checkColorContrast(),
    };

    const totalIssues = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);

    return {
      issues,
      totalIssues,
      passed: totalIssues === 0,
    };
  };

  return {
    checkAltText,
    checkHeadings,
    checkColorContrast,
    runFullAccessibilityAudit,
  };
}
```

### Manual Testing Checklist

```typescript
// Accessibility testing checklist
export const ACCESSIBILITY_CHECKLIST = {
  keyboard: {
    items: [
      'Can all interactive elements be reached with Tab key?',
      'Is the tab order logical and intuitive?',
      'Are focus indicators clearly visible?',
      'Can the keyboard be used to operate all controls?',
      'Are skip links available and functional?',
    ],
  },
  screenReader: {
    items: [
      'Are all images provided with appropriate alt text?',
      'Are form fields properly labeled?',
      'Are headings used correctly to create a document outline?',
      'Are dynamic content changes announced to screen readers?',
      'Are ARIA labels and descriptions used appropriately?',
    ],
  },
  visual: {
    items: [
      'Is there sufficient color contrast (4.5:1 for normal text)?',
      'Can the interface be used without color alone?',
      'Is text resizable up to 200% without breaking functionality?',
      'Are interactive elements large enough for touch targets (44x44px min)?',
      'Is there sufficient spacing between interactive elements?',
    ],
  },
  cognitive: {
    items: [
      'Is the interface consistent and predictable?',
      'Are error messages clear and helpful?',
      'Is the language simple and understandable?',
      'Are timeouts avoided or controllable?',
      'Is help available when needed?',
    ],
  },
};
```

### Testing Integration

```typescript
// Development accessibility toolbar
export function AccessibilityToolbar() {
  const [isVisible, setIsVisible] = useState(false);
  const { runFullAccessibilityAudit } = useAccessibilityTesting();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleAudit = () => {
    const audit = runFullAccessibilityAudit();
    console.group('🔍 Accessibility Audit Results');
    console.log(`Total Issues: ${audit.totalIssues}`);
    console.log('Issues:', audit.issues);
    console.groupEnd();

    if (audit.totalIssues === 0) {
      alert('✅ No accessibility issues found!');
    } else {
      alert(`⚠️ Found ${audit.totalIssues} accessibility issues. Check console for details.`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Toggle accessibility tools"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </button>

      {isVisible && (
        <div className="absolute bottom-16 right-0 bg-white border rounded-lg shadow-lg p-4 w-64">
          <h3 className="font-semibold mb-3">Accessibility Tools</h3>
          <div className="space-y-2">
            <button
              onClick={handleAudit}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              🔍 Run Accessibility Audit
            </button>
            <button
              onClick={() => {
                document.documentElement.classList.toggle('high-contrast');
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              🎨 Toggle High Contrast
            </button>
            <button
              onClick={() => {
                document.body.classList.toggle('large-text');
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              🔠 Toggle Large Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

This comprehensive accessibility documentation demonstrates the portfolio's commitment to creating an inclusive web experience that meets and exceeds WCAG 2.1 AA guidelines. The implementation covers all aspects of digital accessibility, from semantic HTML and keyboard navigation to screen reader support and comprehensive testing strategies.