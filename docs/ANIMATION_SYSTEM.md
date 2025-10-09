# Animation System Documentation

## Table of Contents

1. [Animation Architecture Overview](#animation-architecture-overview)
2. [Framer Motion Integration](#framer-motion-integration)
3. [Scroll-Triggered Animations](#scroll-triggered-animations)
4. [Component Animation Patterns](#component-animation-patterns)
5. [3D Graphics and WebGL Animations](#3d-graphics-and-webgl-animations)
6. [Canvas-Based Animations](#canvas-based-animations)
7. [Custom CSS Animations](#custom-css-animations)
8. [Performance Optimization](#performance-optimization)
9. [Accessibility Considerations](#accessibility-considerations)
10. [Animation Best Practices](#animation-best-practices)

## Animation Architecture Overview

The portfolio uses a multi-layered animation system combining Framer Motion for UI animations, React Three Fiber for 3D graphics, and custom canvas animations for background effects. The system is designed for performance, accessibility, and visual impact while maintaining smooth 60fps animations across all devices.

### Core Animation Libraries

```typescript
// Animation stack
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, Float } from '@react-three/drei';

// Animation configuration
const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1], // Custom ease curve
    bounce: [0.68, -0.55, 0.265, 1.55],
    linear: [0, 0, 1, 1],
  },
  stagger: {
    container: 0.1,
    item: 0.05,
  },
};
```

### Animation State Management

```typescript
// Animation state management
interface AnimationState {
  isReducedMotion: boolean;
  scrollY: number;
  mousePosition: { x: number; y: number };
  viewportSize: { width: number; height: number };
  isMobile: boolean;
}

export function useAnimationState(): AnimationState {
  const [state, setState] = useState<AnimationState>({
    isReducedMotion: false,
    scrollY: 0,
    mousePosition: { x: 0, y: 0 },
    viewportSize: { width: 0, height: 0 },
    isMobile: false,
  });

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setState(prev => ({ ...prev, isReducedMotion: mediaQuery.matches }));

    // Check for mobile device
    const mobileQuery = window.matchMedia('(pointer: coarse)');
    setState(prev => ({ ...prev, isMobile: mobileQuery.matches }));

    // Update viewport size
    const updateViewportSize = () => {
      setState(prev => ({
        ...prev,
        viewportSize: { width: window.innerWidth, height: window.innerHeight }
      }));
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);

    return () => {
      window.removeEventListener('resize', updateViewportSize);
    };
  }, []);

  return state;
}
```

## Framer Motion Integration

### Motion Components Setup

```typescript
// Base motion component configuration
const baseMotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: ANIMATION_CONFIG.duration.normal,
    ease: ANIMATION_CONFIG.easing.smooth,
  },
};

// Reusable animation variants
export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
};
```

### Scroll-Triggered Animations

```typescript
// Enhanced scroll reveal component
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = ANIMATION_CONFIG.duration.normal,
  threshold = 0.1,
  once = true,
  className = '',
}: {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
  });

  const variants = {
    ...animationVariants[direction],
    visible: {
      ...animationVariants[direction].visible,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: ANIMATION_CONFIG.easing.smooth,
      },
    },
    hidden: {
      ...animationVariants[direction].hidden,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration,
        ease: ANIMATION_CONFIG.easing.smooth,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered scroll reveal for lists
export function ScrollRevealStaggered({
  children,
  staggerDelay = ANIMATION_CONFIG.stagger.item,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode[];
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: animationVariants[direction].hidden,
    visible: {
      ...animationVariants[direction].visible,
      transition: {
        duration: shouldReduceMotion ? 0.01 : ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.easing.smooth,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          style={{ display: 'inline-block' }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Page Transition Animations

```typescript
// Page transition wrapper
export function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -20,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: ANIMATION_CONFIG.easing.smooth,
    duration: shouldReduceMotion ? 0.01 : ANIMATION_CONFIG.duration.normal,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

// Layout transition animations
export function LayoutTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: ANIMATION_CONFIG.duration.normal,
          ease: ANIMATION_CONFIG.easing.smooth,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

## Component Animation Patterns

### Interactive Button Animations

```typescript
// Animated button with hover and tap states
export function AnimatedButton({
  children,
  className = '',
  scale = 1.05,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  scale?: number;
}) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: scale }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Magnetic button effect (follows cursor slightly)
export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 1,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### Card Hover Animations

```typescript
// Animated card with 3D tilt effect
export function AnimatedCard({
  children,
  className = '',
  tiltStrength = 15,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  tiltStrength?: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    setTilt({
      x: percentY * tiltStrength,
      y: -percentX * tiltStrength,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

### Loading and Skeleton Animations

```typescript
// Skeleton loading animation
export function Skeleton({
  className = '',
  width = '100%',
  height = '1rem',
  variant = 'default',
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'default' | 'text' | 'circular' | 'rounded';
}) {
  const variants = {
    default: 'rounded-md',
    text: 'rounded',
    circular: 'rounded-full',
    rounded: 'rounded-lg',
  };

  return (
    <motion.div
      className={cn(
        'bg-muted',
        variants[variant],
        className
      )}
      style={{ width, height }}
      animate={{
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Pulse animation for loading states
export function Pulse({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      className={className}
      animate={{
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

## 3D Graphics and WebGL Animations

### Hero Scene 3D Animations

```typescript
// Main 3D hero scene component
export default function HeroScene() {
  const { theme } = useTheme();
  const pointer = useRef<PointerState>({ x: 0, y: 0, pulse: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const isIdle = useRef(true);
  const animationFrame = useRef<number | null>(null);
  const idleTimeout = useRef<number | null>(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  // Smooth pointer animation
  useEffect(() => {
    const animatePointer = () => {
      const now = Date.now() * 0.001;
      const autoX = Math.sin(now * 0.45) * 0.25;
      const autoY = Math.cos(now * 0.35) * 0.2;
      const targetX = isIdle.current ? autoX : pointerTarget.current.x;
      const targetY = isIdle.current ? autoY : pointerTarget.current.y;

      // Smooth interpolation
      pointer.current.x = THREE.MathUtils.lerp(
        pointer.current.x,
        targetX,
        0.07
      );
      pointer.current.y = THREE.MathUtils.lerp(
        pointer.current.y,
        targetY,
        0.07
      );
      pointer.current.pulse = THREE.MathUtils.lerp(
        pointer.current.pulse,
        0,
        0.06
      );

      animationFrame.current = window.requestAnimationFrame(animatePointer);
    };

    animatePointer();

    return () => {
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isCoarsePointer]);

  // Theme-aware colors
  const bgColor = theme === 'dark' ? '#0c1027' : '#f8fafc';
  const ambientIntensity = theme === 'dark' ? 0.92 : 0.6;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.7, 4.2], fov: 38 }}
        dpr={[1, 1.75]} // Dynamic pixel ratio for performance
        className="w-full h-full absolute inset-0"
      >
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={ambientIntensity} color={theme === 'dark' ? "#f3f0ff" : "#ffffff"} />

        {/* Lighting setup */}
        <spotLight
          position={[0, 2.4, 4.2]}
          angle={0.52}
          intensity={theme === 'dark' ? 1.2 : 0.8}
          color="#fcb383"
          penumbra={0.55}
        />
        <pointLight
          position={[3.2, 3.4, 3.6]}
          intensity={theme === 'dark' ? 1.05 : 0.7}
          color="#6edbff"
        />
        <pointLight
          position={[-3.4, 1.8, 4.2]}
          intensity={theme === 'dark' ? 0.95 : 0.6}
          color="#f59f9f"
        />

        {/* Animated elements */}
        {theme === 'dark' && <AuroraBackdrop />}
        <Sparkles
          color={theme === 'dark' ? "#9fdcff" : "#64748b"}
          count={theme === 'dark' ? 80 : 40}
          size={isCoarsePointer ? 2.2 : 3.2}
          scale={[9, 4, 2]}
          position={[0, 0.5, -1.8]}
          speed={0.2}
          opacity={theme === 'dark' ? 0.8 : 0.4}
        />
        {theme === 'dark' && (
          <Stars
            radius={60}
            depth={38}
            count={4200}
            factor={isCoarsePointer ? 2.1 : 2.8}
            saturation={0}
            fade
            speed={0.32}
          />
        )}
        <ShootingStarField count={theme === 'dark' ? 7 : 3} />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color={theme === 'dark' ? '#10163a' : '#e2e8f0'}
            emissive={theme === 'dark' ? '#1b285f' : '#cbd5e1'}
            emissiveIntensity={theme === 'dark' ? 0.3 : 0.1}
          />
        </mesh>
      </Canvas>

      {/* Post-processing effects for dark theme */}
      {theme === 'dark' && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(110,219,255,0.22),transparent_45%)]" />
          <div className={`absolute inset-0 bg-gradient-to-b from-[#0b0b1c]/70 via-[#090b1f]/60 to-[#05060f]/85 ${theme === 'dark' ? 'opacity-70' : 'opacity-30'}`} />
        </>
      )}
    </div>
  );
}
```

### Aurora Backdrop Animation

```typescript
// Animated aurora effect using custom shaders
function AuroraBackdrop() {
  const material = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0.2, -2.2]} scale={[9.5, 5.8, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color("#100b2b") },
          uColor2: { value: new THREE.Color("#1d2360") },
          uColor3: { value: new THREE.Color("#6edbff") },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin((uv.x * 6.0) + (uv.y * 4.0)) * 0.03;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;
          void main() {
            float wave = sin((vUv.y * 4.0) + (uTime * 0.4)) * 0.08;
            float wave2 = sin((vUv.x * 6.0) - (uTime * 0.55)) * 0.05;
            float mixVal = clamp(vUv.y + wave + wave2, 0.0, 1.0);
            vec3 base = mix(uColor1, uColor2, mixVal);
            float glow = smoothstep(0.45, 0.85, mixVal + sin(uTime * 0.8 + vUv.x * 10.0) * 0.18);
            vec3 color = mix(base, uColor3, glow);
            float alpha = 0.65 + glow * 0.2;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}
```

### Shooting Star Animation

```typescript
// Animated shooting stars using instanced rendering
function ShootingStarField({ count = 6 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const origins = useMemo(() => {
    return Array.from({ length: count }, () => ({
      start: new THREE.Vector3(
        -6 + Math.random() * 2,
        2.4 + Math.random() * 1.6,
        -2.5
      ),
      end: new THREE.Vector3(
        4.5 + Math.random() * 1.5,
        -0.6 + Math.random() * 0.8,
        -1.5
      ),
      speed: 0.2 + Math.random() * 0.25,
      offset: Math.random(),
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const time = clock.elapsedTime;

    origins.forEach((config, index) => {
      const progress = (time * config.speed + config.offset) % 1;
      const position = config.start.clone().lerp(config.end, progress);

      dummy.position.copy(position);
      dummy.rotation.set(-Math.PI / 5, Math.PI / 9, Math.PI / 8);
      const scalePulse = 0.8 + Math.sin(progress * Math.PI) * 0.25;
      dummy.scale.setScalar(scalePulse);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(index, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <coneGeometry args={[0.06, 0.5, 12, 1, true]} />
      <meshStandardMaterial
        color="#f6f6ff"
        emissive="#a5c7ff"
        emissiveIntensity={1.8}
        roughness={0.2}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
```

## Canvas-Based Animations

### Faulty Terminal Background

```typescript
// Terminal-style particle system with glitch effects
export function FaultyTerminal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Particle management
  const createParticle = useCallback((x: number, y: number, mouseInfluence = false): Particle => {
    const angle = mouseInfluence
      ? Math.atan2(y - mouseRef.current.y, x - mouseRef.current.x) + (Math.random() - 0.5) * Math.PI / 4
      : Math.random() * Math.PI * 2;

    const speed = mouseInfluence ? 0.5 + Math.random() * 1.5 : 0.2 + Math.random() * 0.8;

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: mouseInfluence ? 2 + Math.random() * 3 : 1 + Math.random() * 2,
      color: getRandomColor(),
      char: getRandomChar(),
      life: 1,
      maxLife: 60 + Math.random() * 120,
    };
  }, []);

  // Animation loop
  const updateParticles = useCallback((width: number, height: number) => {
    particlesRef.current = particlesRef.current.map(particle => {
      // Update position
      let newX = particle.x + particle.vx;
      let newY = particle.y + particle.vy;

      // Add glitch effect
      if (Math.random() < 0.02) {
        newX += (Math.random() - 0.5) * 10;
        newY += (Math.random() - 0.5) * 10;
      }

      // Wrap around edges
      if (newX < 0) newX = width;
      if (newX > width) newX = 0;
      if (newY < 0) newY = height;
      if (newY > height) newY = 0;

      // Mouse interaction
      const dx = newX - mouseRef.current.x;
      const dy = newY - mouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100 && distance > 0) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 0.2;
        particle.vy += (dy / distance) * force * 0.2;

        // Limit velocity
        const maxSpeed = 3;
        const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (currentSpeed > maxSpeed) {
          particle.vx = (particle.vx / currentSpeed) * maxSpeed;
          particle.vy = (particle.vy / currentSpeed) * maxSpeed;
        }
      }

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Update life
      const newLife = particle.life - (1 / particle.maxLife);

      return {
        ...particle,
        x: newX,
        y: newY,
        life: newLife,
        color: getRandomColor(),
      };
    }).filter(particle => particle.life > 0);

    // Maintain particle count
    const targetCount = Math.min(80, Math.floor((width * height) / 15000));
    while (particlesRef.current.length < targetCount) {
      particlesRef.current.push(createParticle(
        Math.random() * width,
        Math.random() * height
      ));
    }
  }, [createParticle]);

  // Rendering
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    particlesRef.current.forEach(particle => {
      const alpha = particle.life;

      // Draw character
      ctx.save();
      ctx.globalAlpha = alpha * 0.8;
      ctx.fillStyle = particle.color;
      ctx.font = `${particle.size * 4}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Glitch effect
      if (Math.random() < 0.1) {
        ctx.fillStyle = particle.color === 'var(--terminal-color)' ? 'var(--terminal-glitch)' : 'var(--terminal-color)';
      }

      ctx.fillText(particle.char, particle.x, particle.y);
      ctx.restore();
    });

    // Draw connections between nearby particles
    ctx.strokeStyle = 'rgba(189, 93, 58, 0.1)';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x;
        const dy = particlesRef.current[i].y - particlesRef.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          ctx.save();
          ctx.globalAlpha = (1 - distance / 80) * 0.2 *
                           particlesRef.current[i].life *
                           particlesRef.current[j].life;
          ctx.beginPath();
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateParticles(canvas.width, canvas.height);
    drawParticles(ctx);

    if (!isReducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [isReducedMotion, updateParticles]);

  // Initialize and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Create particles at mouse position
      if (Math.random() < 0.1 && particlesRef.current.length < 100) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY, true));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    if (!isReducedMotion) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isReducedMotion, animate, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="terminal-canvas"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.6,
      }}
    />
  );
}
```

### Custom Cursor Animation

```typescript
// Animated target cursor with trailing effect
export function TargetCursor() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
          setIsVisible(true);
          animationFrameRef.current = undefined;
        });
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .cursor-hover') ||
          target.closest('a, button, [role="button"], .cursor-hover')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .cursor-hover') ||
          target.closest('a, button, [role="button"], .cursor-hover')) {
        setIsHovering(false);
      }
    };

    const handleMouseLeaveDocument = () => {
      setIsVisible(false);
    };

    const handleMouseEnterDocument = () => {
      setIsVisible(true);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseLeaveDocument);
    document.addEventListener('mouseenter', handleMouseEnterDocument);

    // Add cursor class to html
    document.documentElement.classList.add('target-cursor');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseLeaveDocument);
      document.removeEventListener('mouseenter', handleMouseEnterDocument);
      document.documentElement.classList.remove('target-cursor');

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className={`target-cursor-element ${isHovering ? 'hover' : ''}`}
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          pointerEvents: 'none',
        }}
      />

      {/* Trailing dot */}
      <motion.div
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[9998]"
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
      />
    </>
  );
}
```

## Custom CSS Animations

### Keyframe Animations

```css
/* Glitch text effect */
@keyframes glitch {
  0%, 100% {
    text-shadow:
      2px 2px 0 var(--terminal-glitch),
      -2px -2px 0 var(--terminal-color);
  }
  25% {
    text-shadow:
      -2px 2px 0 var(--terminal-color),
      2px -2px 0 var(--terminal-glitch);
  }
  50% {
    text-shadow:
      2px -2px 0 var(--terminal-glitch),
      -2px 2px 0 var(--terminal-color);
  }
  75% {
    text-shadow:
      -2px -2px 0 var(--terminal-color),
      2px 2px 0 var(--terminal-glitch);
  }
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Pulse glow effect */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(189, 93, 58, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(189, 93, 58, 0.6);
  }
}

/* Logo marquee animation */
@keyframes logo-loop {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Mobile menu animations */
@keyframes mobile-menu-slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes mobile-menu-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Animation Utility Classes

```css
/* Reveal animations */
@layer utilities {
  [data-reveal] {
    opacity: 0;
    transform: translateY(var(--reveal-distance)) scale(0.98);
    filter: blur(var(--reveal-blur));
    transition-property: opacity, transform, filter;
    transition-duration: var(--reveal-duration);
    transition-timing-function: var(--reveal-ease);
    transition-delay: var(--reveal-delay, 0s);
  }

  [data-reveal="true"] {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* Hover effects */
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

/* Loading animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
```

## Performance Optimization

### Animation Performance Best Practices

```typescript
// Use transform and opacity for better performance
const performantAnimation = {
  // Good: GPU-accelerated properties
  transform: 'translateX(100px)',
  opacity: 0.5,

  // Bad: Layout-triggering properties
  // left: '100px',
  // width: '200px',
};

// Use will-change for complex animations
const complexAnimation = {
  willChange: 'transform, opacity',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
};

// Remove will-change after animation completes
const cleanupAnimation = {
  willChange: 'auto',
};
```

### Reduced Motion Support

```typescript
// Respect user's motion preferences
const useReducedMotionAnimations = () => {
  const shouldReduceMotion = useReducedMotion();

  const animationConfig = shouldReduceMotion ? {
    duration: 0.01,
    ease: 'linear',
  } : {
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1],
  };

  return { shouldReduceMotion, animationConfig };
};

// CSS media query for reduced motion
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Memory Management

```typescript
// Proper cleanup for animations
export function useAnimationCleanup() {
  const animationFrameRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const setFrame = useCallback((callback: FrameRequestCallback) => {
    animationFrameRef.current = requestAnimationFrame(callback);
  }, []);

  const setTimeout = useCallback((callback: () => void, delay: number) => {
    timeoutRef.current = window.setTimeout(callback, delay);
  }, []);

  return { setFrame, setTimeout };
}
```

## Accessibility Considerations

### Animation Accessibility

```typescript
// Accessible animation component
export function AccessibleAnimation({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Respect prefers-reduced-motion
const animationStyles = `
  @media (prefers-reduced-motion: reduce) {
    .animated-element {
      animation: none !important;
      transform: none !important;
    }
  }
`;
```

### Focus Management During Animations

```typescript
// Focus management for animated elements
export function useFocusManagement() {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  const preserveFocus = useCallback(() => {
    if (focusedElement) {
      focusedElement.focus();
    }
  }, [focusedElement]);

  const captureFocus = useCallback((element: HTMLElement) => {
    setFocusedElement(element);
  }, []);

  return { preserveFocus, captureFocus };
}
```

## Animation Best Practices

### 1. Performance Guidelines

```typescript
// DO: Use transform and opacity
<motion.div
  animate={{ x: 100, opacity: 0.5 }}
  transition={{ duration: 0.3 }}
/>

// DON'T: Use layout properties
<motion.div
  animate={{ left: 100, width: 200 }} // Triggers layout
  transition={{ duration: 0.3 }}
/>
```

### 2. Animation Duration

```typescript
// Recommended animation durations
const ANIMATION_DURATIONS = {
  instant: 0,      // No animation
  fast: 0.15,      // Micro-interactions
  normal: 0.3,     // Standard transitions
  slow: 0.5,       // Attention-grabbing
  slower: 0.8,     // Major state changes
};
```

### 3. Easing Functions

```typescript
// Common easing functions
const EASING = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  smooth: [0.22, 1, 0.36, 1], // Custom ease for this portfolio
};
```

### 4. Animation Testing

```typescript
// Test animation state
export function useAnimationState(initialState: string) {
  const [state, setState] = useState(initialState);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback((newState: string) => {
    setIsAnimating(true);
    setState(newState);

    // Reset animation state after duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, []);

  return { state, isAnimating, startAnimation };
}
```

This comprehensive animation system documentation demonstrates the sophisticated approach to creating smooth, performant, and accessible animations throughout the portfolio. The combination of modern animation libraries, custom canvas effects, and 3D graphics creates an engaging user experience while maintaining high performance and accessibility standards.