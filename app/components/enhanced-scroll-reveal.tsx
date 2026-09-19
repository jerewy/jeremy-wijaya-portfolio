"use client";

import {
  motion,
  useAnimation,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Children, useEffect, type ReactNode } from "react";
import { useInView as useInViewObserver } from "react-intersection-observer";

type Direction = "up" | "down" | "left" | "right" | "fade";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Offsets for the hidden state. `fade` is the reduced-motion target too: the
 * global CSS `prefers-reduced-motion` rule only neutralises CSS animations,
 * and Framer Motion drives inline styles from JS, so it has to opt out here.
 */
function hiddenState(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { opacity: 0, y: distance };
    case "down":
      return { opacity: 0, y: -distance };
    case "left":
      return { opacity: 0, x: -distance };
    case "right":
      return { opacity: 0, x: distance };
    case "fade":
      return { opacity: 0 };
  }
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  once?: boolean;
  threshold?: number;
  staggerChildren?: number;
  id?: string;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
  threshold = 0.1,
  staggerChildren = 0,
  id,
}: ScrollRevealProps) {
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInViewObserver({
    threshold,
    triggerOnce: once,
  });

  // Reduced motion keeps the fade (so the reveal still reads as intentional)
  // but drops the travel that triggers vestibular discomfort.
  const effectiveDirection: Direction = prefersReducedMotion
    ? "fade"
    : direction;
  const effectiveDuration = prefersReducedMotion ? 0.01 : duration;

  const itemVariants: Variants = {
    hidden: hiddenState(effectiveDirection, 60),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: effectiveDuration, ease: EASE, delay },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
        delayChildren: delay,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [inView, controls, once]);

  if (staggerChildren > 0) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        id={id}
      >
        {/* Children are plain elements at every call site, so they cannot
            inherit the stagger on their own. Wrap each one in a motion item
            that carries the variants the container drives. */}
        {Children.map(children, (child, index) => (
          <ScrollRevealItem key={index} direction={effectiveDirection}>
            {child}
          </ScrollRevealItem>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={itemVariants}
      id={id}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealStaggeredProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function ScrollRevealStaggered({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  duration = 0.6,
  once = true,
  threshold = 0.1,
}: ScrollRevealStaggeredProps) {
  return (
    <ScrollReveal
      className={className}
      delay={delay}
      duration={duration}
      once={once}
      threshold={threshold}
      staggerChildren={staggerDelay}
    >
      {children}
    </ScrollReveal>
  );
}

export function ScrollRevealItem({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const effectiveDirection: Direction = prefersReducedMotion
    ? "fade"
    : direction;

  const variants: Variants = {
    hidden: hiddenState(effectiveDirection, 40),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay,
        ease: EASE,
      },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
