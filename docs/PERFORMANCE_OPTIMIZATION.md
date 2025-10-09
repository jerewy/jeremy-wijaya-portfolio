# Performance Optimization Documentation

## Table of Contents

1. [Performance Strategy Overview](#performance-strategy-overview)
2. [Bundle Optimization](#bundle-optimization)
3. [Image Optimization](#image-optimization)
4. [Animation Performance](#animation-performance)
5. [Rendering Optimization](#rendering-optimization)
6. [Network Performance](#network-performance)
7. [Memory Management](#memory-management)
8. [Core Web Vitals](#core-web-vitals)
9. [Performance Monitoring](#performance-monitoring)
10. [Optimization Best Practices](#optimization-best-practices)

## Performance Strategy Overview

The portfolio implements a comprehensive performance optimization strategy focusing on delivering an exceptional user experience across all devices and network conditions. The approach combines modern web technologies, smart resource management, and continuous performance monitoring to achieve fast load times, smooth interactions, and optimal resource utilization.

### Performance Goals

```typescript
// Performance targets and thresholds
export const PERFORMANCE_TARGETS = {
  // Core Web Vitals targets
  webVitals: {
    LCP: 2.5,      // Largest Contentful Paint: < 2.5s
    FID: 100,      // First Input Delay: < 100ms
    CLS: 0.1,      // Cumulative Layout Shift: < 0.1
    FCP: 1.8,      // First Contentful Paint: < 1.8s
    TTFB: 600,     // Time to First Byte: < 600ms
  },

  // Bundle size targets
  bundleSize: {
    total: 250,    // Total bundle: < 250KB gzipped
    vendor: 100,   // Vendor bundle: < 100KB gzipped
    images: 500,   // Images: < 500KB total initial load
  },

  // Runtime performance
  runtime: {
    jank: 16,      // Frame time: < 16ms (60fps)
    memory: 50,    // Memory usage: < 50MB
    cpu: 10,       // CPU usage: < 10% idle
  },

  // Network performance
  network: {
    requests: 20,  // Total requests: < 20
    compression: 80, // Compression ratio: > 80%
    cacheHitRate: 90, // Cache hit rate: > 90%
  },
};
```

### Performance Monitoring Setup

```typescript
// Performance monitoring utilities
export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState({
    LCP: 0,
    FID: 0,
    CLS: 0,
    FCP: 0,
    TTFB: 0,
  });

  useEffect(() => {
    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, LCP: lastEntry.startTime }));
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-input') {
            setMetrics(prev => ({ ...prev, FID: entry.processingStart - entry.startTime }));
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        setMetrics(prev => ({ ...prev, CLS: clsValue }));
      }).observe({ entryTypes: ['layout-shift'] });
    };

    observeWebVitals();

    // Custom performance tracking
    const trackPageLoad = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      setMetrics(prev => ({
        ...prev,
        FCP: navigation.responseStart - navigation.requestStart,
        TTFB: navigation.responseStart - navigation.requestStart,
      }));
    };

    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad);
      return () => window.removeEventListener('load', trackPageLoad);
    }
  }, []);

  return metrics;
}
```

## Bundle Optimization

### Code Splitting Strategy

```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

// Heavy components loaded on demand
const HeroScene = dynamic(() => import('@/components/hero-scene'), {
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-lg" />,
  ssr: false, // Client-side only for 3D content
});

const FaultyTerminal = dynamic(() => import('@/components/faulty-terminal'), {
  loading: () => <div className="animate-pulse bg-muted h-64 rounded-lg" />,
  ssr: false,
});

const ExperienceTimeline = dynamic(() => import('@/components/experience-timeline'), {
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-lg" />,
});

// Usage in page component
export function OptimizedPortfolio() {
  return (
    <div className="min-h-screen">
      {/* Critical content loaded immediately */}
      <HeroSection />

      {/* Heavy components loaded dynamically */}
      <Suspense fallback={<div>Loading hero scene...</div>}>
        <HeroScene />
      </Suspense>

      <Suspense fallback={<div>Loading terminal...</div>}>
        <FaultyTerminal />
      </Suspense>

      {/* Other content */}
      <AboutSection />

      {/* Component loaded when scrolled into view */}
      <ScrollReveal>
        <Suspense fallback={<div>Loading timeline...</div>}>
          <ExperienceTimeline />
        </Suspense>
      </ScrollReveal>
    </div>
  );
}
```

### Tree Shaking Configuration

```javascript
// next.config.js - Optimized build configuration
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Optimize images
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Experimental features for performance
  experimental: {
    // Optimize CSS
    optimizeCss: true,
    // Optimize fonts
    optimizeFonts: true,
    // Enable modern build targets
    modern: true,
  },

  // Webpack configuration for bundle optimization
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    };

    // Tree shake unused exports
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;

    return config;
  },

  // Compression
  compress: true,

  // Production optimizations
  swcMinify: true,
};

module.exports = nextConfig;
```

### Bundle Analysis

```typescript
// Bundle analysis utilities
export function useBundleAnalysis() {
  const analyzeBundle = async () => {
    if (typeof window === 'undefined') return;

    // Get bundle information
    const bundleInfo = {
      totalSize: 0,
      chunks: [] as Array<{
        name: string;
        size: number;
        modules: number;
      }>,
    };

    // Analyze loaded resources
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    resources.forEach((resource) => {
      if (resource.name.includes('.js') || resource.name.includes('.css')) {
        const size = resource.transferSize || 0;
        bundleInfo.totalSize += size;

        bundleInfo.chunks.push({
          name: resource.name.split('/').pop() || 'unknown',
          size,
          modules: 1, // Simplified for demo
        });
      }
    });

    // Identify optimization opportunities
    const recommendations = [];

    if (bundleInfo.totalSize > PERFORMANCE_TARGETS.bundleSize.total * 1024) {
      recommendations.push('Consider code splitting for large bundles');
    }

    const largeChunks = bundleInfo.chunks.filter(chunk => chunk.size > 100 * 1024);
    if (largeChunks.length > 0) {
      recommendations.push(`Split large chunks: ${largeChunks.map(c => c.name).join(', ')}`);
    }

    return {
      ...bundleInfo,
      recommendations,
      withinTarget: bundleInfo.totalSize <= PERFORMANCE_TARGETS.bundleSize.total * 1024,
    };
  };

  return { analyzeBundle };
}
```

## Image Optimization

### Next.js Image Optimization

```typescript
// Optimized image component
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  className = '',
  sizes,
  ...props
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  className?: string;
  sizes?: string;
} & React.ComponentProps<typeof Image>) {
  // Generate responsive sizes
  const responsiveSizes = sizes || `
    (max-width: 640px) 100vw,
    (max-width: 768px) 50vw,
    (max-width: 1024px) 33vw,
    25vw
  `;

  // Adaptive quality based on device capabilities
  const adaptiveQuality = useMemo(() => {
    if (typeof window === 'undefined') return quality;

    const connection = (navigator as any).connection;
    if (connection) {
      if (connection.effectiveType.includes('2g')) return 50;
      if (connection.effectiveType.includes('3g')) return 65;
      if (connection.effectiveType.includes('4g')) return 85;
    }

    // Check device memory
    const memory = (navigator as any).deviceMemory;
    if (memory && memory < 4) return 60;

    return quality;
  }, [quality]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={adaptiveQuality}
      placeholder={placeholder}
      sizes={responsiveSizes}
      className={cn(
        'transition-opacity duration-300',
        className
      )}
      style={{
        objectFit: 'cover',
      }}
      {...props}
    />
  );
}
```

### Lazy Loading Strategy

```typescript
// Intersection Observer based lazy loading
export function useLazyLoad(threshold = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          setHasLoaded(true);
        }
      },
      {
        threshold,
        rootMargin: '50px 0px', // Start loading 50px before element comes into view
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, hasLoaded]);

  return { ref, isIntersecting, hasLoaded };
}

// Lazy loaded image component
export function LazyImage({
  src,
  alt,
  className = '',
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  const { ref, isIntersecting } = useLazyLoad();

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {!isIntersecting && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {isIntersecting && (
        <OptimizedImage
          src={src}
          alt={alt}
          width={500}
          height={300}
          className={cn(
            'transition-opacity duration-500',
            isIntersecting ? 'opacity-100' : 'opacity-0'
          )}
          {...props}
        />
      )}
    </div>
  );
}
```

### Progressive Image Loading

```typescript
// Progressive image loading with blur effect
export function ProgressiveImage({
  src,
  alt,
  placeholderSrc,
  className = '',
}: {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={cn(
          'object-cover transition-all duration-500',
          isLoading ? 'scale-110 blur-2xl' : 'scale-100 blur-0'
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
}
```

## Animation Performance

### GPU-Accelerated Animations

```typescript
// GPU-optimized animation utilities
export function useGPUAnimation() {
  const shouldReduceMotion = useReducedMotion();
  const isLowEndDevice = useLowEndDevice();

  const getOptimizedTransition = () => {
    if (shouldReduceMotion) {
      return {
        duration: 0.01,
        ease: 'linear',
      };
    }

    if (isLowEndDevice) {
      return {
        duration: 0.2,
        ease: 'ease-out',
      };
    }

    return {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    };
  };

  const animateWithGPU = (element: HTMLElement, properties: Record<string, any>) => {
    // Use transform and opacity for GPU acceleration
    const gpuProperties = {
      transform: properties.transform,
      opacity: properties.opacity,
      filter: properties.filter,
    };

    // Apply styles
    Object.assign(element.style, gpuProperties);

    // Ensure GPU acceleration
    element.style.willChange = 'transform, opacity';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';

    return () => {
      // Clean up will-change after animation
      setTimeout(() => {
        element.style.willChange = 'auto';
      }, 1000);
    };
  };

  return { getOptimizedTransition, animateWithGPU };
}

// Performance-optimized motion component
export function OptimizedMotion({
  children,
  animate,
  transition,
  whileHover,
  whileTap,
  ...props
}: MotionProps) {
  const shouldReduceMotion = useReducedMotion();
  const isLowEndDevice = useLowEndDevice();

  // Adjust animations based on device capabilities
  const optimizedTransition = useMemo(() => {
    if (shouldReduceMotion) {
      return { duration: 0.01 };
    }

    if (isLowEndDevice) {
      return { duration: 0.2, ease: 'ease-out' };
    }

    return transition || { duration: 0.3, ease: [0.22, 1, 0.36, 1] };
  }, [shouldReduceMotion, isLowEndDevice, transition]);

  // Disable hover animations on touch devices
  const optimizedWhileHover = isTouchDevice() ? undefined : whileHover;

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : animate}
      transition={optimizedTransition}
      whileHover={optimizedWhileHover}
      whileTap={!isTouchDevice() && !shouldReduceMotion ? whileTap : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

### Performance-Aware Animations

```typescript
// Performance monitoring for animations
export function useAnimationPerformance() {
  const [fps, setFps] = useState(60);
  const [jank, setJank] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  const measurePerformance = useCallback(() => {
    frameCount.current++;
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime.current;

    if (deltaTime >= 1000) {
      const currentFps = Math.round((frameCount.current * 1000) / deltaTime);
      setFps(currentFps);

      // Calculate jank (frames > 16ms)
      const expectedFrames = Math.floor(deltaTime / 16);
      setJank(Math.max(0, expectedFrames - frameCount.current));

      frameCount.current = 0;
      lastTime.current = currentTime;
    }

    requestAnimationFrame(measurePerformance);
  }, []);

  useEffect(() => {
    const animationId = requestAnimationFrame(measurePerformance);
    return () => cancelAnimationFrame(animationId);
  }, [measurePerformance]);

  const isPerformanceGood = fps >= 55 && jank <= 5;

  return { fps, jank, isPerformanceGood };
}

// Adaptive animation quality
export function useAdaptiveAnimationQuality() {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const { fps, isPerformanceGood } = useAnimationPerformance();

  useEffect(() => {
    if (!isPerformanceGood) {
      if (fps < 30) {
        setQuality('low');
      } else if (fps < 45) {
        setQuality('medium');
      }
    } else {
      setQuality('high');
    }
  }, [fps, isPerformanceGood]);

  return quality;
}
```

## Rendering Optimization

### Virtual Scrolling

```typescript
// Virtual scrolling for large lists
export function VirtualList({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
}: {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  overscan?: number;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleStart = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleEnd = Math.min(
    items.length,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${visibleStart * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={visibleStart + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, visibleStart + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Memoization Strategies

```typescript
// Smart memoization for expensive components
export const MemoizedProjectCard = React.memo(
  function ProjectCard({ project }: { project: Project }) {
    return (
      <Card className="group border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="p-0 overflow-hidden rounded-t-lg">
          <div className="relative h-48 bg-muted">
            <OptimizedImage
              src={project.image}
              alt={project.title}
              width={500}
              height={300}
              priority={false}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-xl mb-3">{project.title}</CardTitle>
          <CardDescription className="mb-4">{project.summary}</CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3">
            <Button size="sm">
              <ExternalLink className="w-3 h-3 mr-1" />
              Live
            </Button>
            <Button size="sm" variant="outline">
              <Github className="w-3 h-3 mr-1" />
              Code
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function
    return (
      prevProps.project.id === nextProps.project.id &&
      prevProps.project.title === nextProps.project.title &&
      prevProps.project.image === nextProps.project.image
    );
  }
);

// Expensive calculation memoization
export function useExpensiveCalculation(input: any[]) {
  return useMemo(() => {
    // Expensive computation
    return input.reduce((result, item) => {
      // Complex calculation
      return result + processData(item);
    }, 0);
  }, [input]);
}

// Callback memoization for event handlers
export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps);
}
```

## Network Performance

### Resource Hints

```typescript
// Resource optimization with prefetching and preloading
export function ResourceOptimization() {
  return (
    <>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//github.com" />

      {/* Preconnect for critical external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Preload critical resources */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />

      {/* Prefetch next pages */}
      <link rel="prefetch" href="/about" />
      <link rel="prefetch" href="/projects" />
    </>
  );
}

// Service Worker for caching
export function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);
}

// Cache strategy for API calls
export function useCachedFetch<T>(
  url: string,
  options: RequestInit = {},
  cacheTime = 5 * 60 * 1000 // 5 minutes
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `cache-${url}`;
      const cached = localStorage.getItem(cacheKey);

      // Check cache first
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheTime) {
          setData(cachedData);
          return;
        }
      }

      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        setData(result);

        // Cache the result
        localStorage.setItem(cacheKey, JSON.stringify({
          data: result,
          timestamp: Date.now(),
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options), cacheTime]);

  return { data, loading, error };
}
```

### Request Optimization

```typescript
// Request batching and debouncing
export function useBatchedRequests<T>(
  requests: Array<{ url: string; options?: RequestInit }>,
  batchDelay = 100
) {
  const [results, setResults] = useState<Map<string, T>>(new Map());
  const [loading, setLoading] = useState(false);
  const batchTimeoutRef = useRef<NodeJS.Timeout>();

  const addToBatch = useCallback((request: { url: string; options?: RequestInit }) => {
    if (batchTimeoutRef.current) {
      clearTimeout(batchTimeoutRef.current);
    }

    batchTimeoutRef.current = setTimeout(() => {
      executeBatch();
    }, batchDelay);
  }, [batchDelay]);

  const executeBatch = useCallback(async () => {
    setLoading(true);
    try {
      const promises = requests.map(async (request) => {
        const response = await fetch(request.url, request.options);
        if (!response.ok) throw new Error(`Failed to fetch ${request.url}`);
        const data = await response.json();
        return { url: request.url, data };
      });

      const results = await Promise.all(promises);
      const resultMap = new Map(results.map(r => [r.url, r.data]));
      setResults(resultMap);
    } catch (error) {
      console.error('Batch request failed:', error);
    } finally {
      setLoading(false);
    }
  }, [requests]);

  return { results, loading, addToBatch };
}

// Optimized API client with retries and caching
export class OptimizedAPIClient {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  async fetch<T>(
    url: string,
    options: RequestInit = {},
    retries = 3
  ): Promise<T> {
    // Check cache first
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    // Implement exponential backoff retry
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Cache the result
        this.cache.set(url, { data, timestamp: Date.now() });

        return data;
      } catch (error) {
        if (attempt === retries - 1) throw error;

        // Exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new Error('All retry attempts failed');
  }

  clearCache() {
    this.cache.clear();
  }
}
```

## Memory Management

### Memory Leak Prevention

```typescript
// Memory management utilities
export function useMemoryManagement() {
  const [memoryUsage, setMemoryUsage] = useState({
    used: 0,
    total: 0,
    percentage: 0,
  });

  useEffect(() => {
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMemoryUsage({
          used: Math.round(memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(memory.totalJSHeapSize / 1048576), // MB
          percentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100),
        });
      }
    };

    const interval = setInterval(updateMemoryUsage, 5000);
    updateMemoryUsage();

    return () => clearInterval(interval);
  }, []);

  const isMemoryHigh = memoryUsage.percentage > 80;

  return { memoryUsage, isMemoryHigh };
}

// Cleanup utility for components
export function useCleanup(cleanupFn: () => void, deps: React.DependencyList = []) {
  useEffect(() => {
    return cleanupFn;
  }, deps);
}

// Optimized event listener management
export function useEventListener<K extends keyof WindowEventMap>(
  target: EventTarget,
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions
) {
  useEffect(() => {
    target.addEventListener(event, handler, options);
    return () => {
      target.removeEventListener(event, handler, options);
    };
  }, [event, handler, options]);
}
```

### Resource Cleanup

```typescript
// Canvas cleanup for animations
export function useCanvasCleanup(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    return () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Remove event listeners
      canvas.removeEventListener('resize', () => {});

      // Cancel any ongoing animations
      const animationId = canvas.getAttribute('data-animation-id');
      if (animationId) {
        cancelAnimationFrame(parseInt(animationId));
      }
    };
  }, [canvasRef]);
}

// Animation frame cleanup
export function useAnimationFrame(callback: () => void, deps: React.DependencyList = []) {
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      callback();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, deps);
}
```

## Core Web Vitals

### Web Vitals Monitoring

```typescript
// Core Web Vitals monitoring and optimization
export function useWebVitals() {
  const [vitals, setVitals] = useState({
    LCP: 0,
    FID: 0,
    CLS: 0,
    FCP: 0,
    TTFB: 0,
    INP: 0, // Interaction to Next Paint
  });

  useEffect(() => {
    // Largest Contentful Paint
    const observerLCP = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      setVitals(prev => ({ ...prev, LCP: lastEntry.startTime }));
    });
    observerLCP.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay / Interaction to Next Paint
    const observerFID = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-input') {
          setVitals(prev => ({ ...prev, FID: entry.processingStart - entry.startTime }));
        } else if (entry.entryType === 'event') {
          setVitals(prev => ({ ...prev, INP: entry.processingStart - entry.startTime }));
        }
      });
    });
    observerFID.observe({ entryTypes: ['first-input', 'event'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const observerCLS = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      setVitals(prev => ({ ...prev, CLS: clsValue }));
    });
    observerCLS.observe({ entryTypes: ['layout-shift'] });

    // First Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        setVitals(prev => ({ ...prev, FCP: fcpEntry.startTime }));
      }
    }).observe({ entryTypes: ['paint'] });

    return () => {
      observerLCP.disconnect();
      observerFID.disconnect();
      observerCLS.disconnect();
    };
  }, []);

  return vitals;
}

// Web Vitals optimization suggestions
export function useWebVitalsOptimizations() {
  const vitals = useWebVitals();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const optimizations = [];

    // LCP optimizations
    if (vitals.LCP > PERFORMANCE_TARGETS.webVitals.LCP * 1000) {
      optimizations.push('Optimize largest contentful paint by preloading critical resources');
      optimizations.push('Consider using priority hints for important images');
      optimizations.push('Remove render-blocking resources');
    }

    // FID/INP optimizations
    if (vitals.FID > PERFORMANCE_TARGETS.webVitals.FID) {
      optimizations.push('Reduce JavaScript execution time');
      optimizations.push('Break up long tasks');
      optimizations.push('Optimize event listeners');
    }

    // CLS optimizations
    if (vitals.CLS > PERFORMANCE_TARGETS.webVitals.CLS) {
      optimizations.push('Include size attributes for images and videos');
      optimizations.push('Reserve space for dynamic content');
      optimizations.push('Avoid inserting content above existing content');
    }

    // FCP optimizations
    if (vitals.FCP > PERFORMANCE_TARGETS.webVitals.FCP * 1000) {
      optimizations.push('Minimize server response time');
      optimizations.push('Optimize CSS delivery');
      optimizations.push('Remove unused CSS');
    }

    setSuggestions(optimizations);
  }, [vitals]);

  return suggestions;
}
```

### Performance Score Calculation

```typescript
// Performance score calculation
export function usePerformanceScore() {
  const vitals = useWebVitals();

  const calculateScore = useCallback(() => {
    let score = 100;

    // LCP scoring (0-100)
    if (vitals.LCP > 4000) score -= 25;
    else if (vitals.LCP > 2500) score -= 15;
    else if (vitals.LCP > 1800) score -= 5;

    // FID scoring (0-100)
    if (vitals.FID > 300) score -= 25;
    else if (vitals.FID > 100) score -= 15;
    else if (vitals.FID > 50) score -= 5;

    // CLS scoring (0-100)
    if (vitals.CLS > 0.25) score -= 25;
    else if (vitals.CLS > 0.1) score -= 15;
    else if (vitals.CLS > 0.05) score -= 5;

    // FCP scoring (0-100)
    if (vitals.FCP > 3000) score -= 25;
    else if (vitals.FCP > 1800) score -= 15;
    else if (vitals.FCP > 1000) score -= 5;

    return Math.max(0, score);
  }, [vitals]);

  const score = calculateScore();
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';

  return { score, grade, vitals };
}
```

## Performance Monitoring

### Real-time Monitoring

```typescript
// Performance monitoring dashboard
export function PerformanceMonitor() {
  const { score, grade, vitals } = usePerformanceScore();
  const { memoryUsage, isMemoryHigh } = useMemoryManagement();
  const { fps, jank, isPerformanceGood } = useAnimationPerformance();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-background/90 backdrop-blur-sm border rounded-lg p-4 text-xs font-mono z-50">
      <h3 className="font-semibold mb-2">Performance Monitor</h3>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Score:</span>
          <span className={cn(
            score >= 90 ? 'text-green-600' :
            score >= 80 ? 'text-yellow-600' :
            score >= 70 ? 'text-orange-600' : 'text-red-600'
          )}>
            {grade} ({score})
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>LCP: {vitals.LCP.toFixed(0)}ms</div>
          <div>FID: {vitals.FID.toFixed(0)}ms</div>
          <div>CLS: {vitals.CLS.toFixed(3)}</div>
          <div>FCP: {vitals.FCP.toFixed(0)}ms</div>
          <div>FPS: {fps}</div>
          <div>Jank: {jank}</div>
          <div>Memory: {memoryUsage.used}MB</div>
          <div>Usage: {memoryUsage.percentage}%</div>
        </div>

        {isMemoryHigh && (
          <div className="text-red-600 mt-2">⚠️ High memory usage</div>
        )}

        {!isPerformanceGood && (
          <div className="text-red-600 mt-2">⚠️ Performance issues detected</div>
        )}
      </div>
    </div>
  );
}
```

### Performance Analytics

```typescript
// Performance analytics and reporting
export function usePerformanceAnalytics() {
  const vitals = useWebVitals();
  const { score } = usePerformanceScore();

  useEffect(() => {
    // Send performance data to analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // Core Web Vitals
      (window as any).gtag('event', 'LCP', {
        value: vitals.LCP,
        event_category: 'Web Vitals',
        non_interaction: true,
      });

      (window as any).gtag('event', 'FID', {
        value: vitals.FID,
        event_category: 'Web Vitals',
        non_interaction: true,
      });

      (window as any).gtag('event', 'CLS', {
        value: vitals.CLS * 1000,
        event_category: 'Web Vitals',
        non_interaction: true,
      });

      // Overall performance score
      (window as any).gtag('event', 'performance_score', {
        value: score,
        event_category: 'Performance',
        non_interaction: true,
      });
    }
  }, [vitals, score]);

  // Custom performance events
  const trackCustomEvent = useCallback((
    name: string,
    value: number,
    category: string = 'Performance'
  ) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', name, {
        value,
        event_category: category,
        non_interaction: true,
      });
    }
  }, []);

  return { trackCustomEvent };
}
```

## Optimization Best Practices

### Performance Checklist

```typescript
// Performance optimization checklist
export const PERFORMANCE_CHECKLIST = {
  bundle: [
    'Implement code splitting for large components',
    'Use dynamic imports for non-critical components',
    'Optimize webpack bundle splitting',
    'Remove unused dependencies and code',
    'Minimize bundle size with tree shaking',
  ],

  images: [
    'Use Next.js Image component for optimization',
    'Implement lazy loading for below-fold images',
    'Use appropriate image formats (WebP, AVIF)',
    'Optimize image quality based on device capabilities',
    'Implement progressive image loading',
  ],

  animations: [
    'Use CSS transforms instead of layout properties',
    'Implement will-change for complex animations',
    'Respect prefers-reduced-motion',
    'Use requestAnimationFrame for smooth animations',
    'Implement animation performance monitoring',
  ],

  network: [
    'Implement resource preloading and prefetching',
    'Use service worker for caching',
    'Optimize API requests with batching',
    'Implement request debouncing and throttling',
    'Use HTTP/2 and compression',
  ],

  rendering: [
    'Implement virtual scrolling for large lists',
    'Use React.memo for expensive components',
    'Implement proper cleanup for event listeners',
    'Optimize re-renders with useMemo and useCallback',
    'Use Intersection Observer for lazy loading',
  ],

  monitoring: [
    'Monitor Core Web Vitals',
    'Implement performance budgets',
    'Track user experience metrics',
    'Set up performance alerts',
    'Regular performance audits',
  ],
};
```

### Performance Budget

```typescript
// Performance budget configuration
export const PERFORMANCE_BUDGET = {
  // Bundle size limits (in KB)
  bundleSize: {
    total: 250,
    vendor: 100,
    css: 50,
    images: {
      initial: 500,
      additional: 1000,
    },
  },

  // Performance metrics limits
  metrics: {
    LCP: 2500,      // Largest Contentful Paint (ms)
    FID: 100,       // First Input Delay (ms)
    CLS: 0.1,       // Cumulative Layout Shift
    FCP: 1800,      // First Contentful Paint (ms)
    TTFB: 600,      // Time to First Byte (ms)
  },

  // Resource limits
  resources: {
    totalRequests: 20,
    totalSize: 2000, // KB
    imageCount: 10,
    scriptCount: 5,
    styleCount: 3,
  },

  // Runtime limits
  runtime: {
    memoryUsage: 50,     // MB
    scriptExecutionTime: 50, // ms
    layoutShifts: 5,
    longTasks: 3,        // tasks > 50ms
  },
};

// Budget validation
export function validatePerformanceBudget(metrics: any) {
  const violations = [];

  // Check bundle size
  if (metrics.bundleSize > PERFORMANCE_BUDGET.bundleSize.total) {
    violations.push(`Bundle size exceeds limit: ${metrics.bundleSize}KB > ${PERFORMANCE_BUDGET.bundleSize.total}KB`);
  }

  // Check Core Web Vitals
  if (metrics.LCP > PERFORMANCE_BUDGET.metrics.LCP) {
    violations.push(`LCP exceeds limit: ${metrics.LCP}ms > ${PERFORMANCE_BUDGET.metrics.LCP}ms`);
  }

  if (metrics.FID > PERFORMANCE_BUDGET.metrics.FID) {
    violations.push(`FID exceeds limit: ${metrics.FID}ms > ${PERFORMANCE_BUDGET.metrics.FID}ms`);
  }

  if (metrics.CLS > PERFORMANCE_BUDGET.metrics.CLS) {
    violations.push(`CLS exceeds limit: ${metrics.CLS} > ${PERFORMANCE_BUDGET.metrics.CLS}`);
  }

  return {
    passed: violations.length === 0,
    violations,
  };
}
```

This comprehensive performance optimization documentation demonstrates the portfolio's commitment to delivering exceptional user experience through systematic optimization techniques, continuous monitoring, and adherence to web performance best practices. The implementation covers all aspects of performance from bundle optimization to runtime efficiency, ensuring fast load times and smooth interactions across all devices.