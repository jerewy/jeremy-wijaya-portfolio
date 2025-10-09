"use client";

import { motion, useAnimation } from 'framer-motion';
import { useEffect, ReactNode } from 'react';
import { useInView as useInViewObserver } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
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
  direction = 'up',
  duration = 0.6,
  once = true,
  threshold = 0.1,
  staggerChildren = 0,
  id
}: ScrollRevealProps) {
  const controls = useAnimation();
  const { ref, inView } = useInViewObserver({
    threshold,
    triggerOnce: once,
  });

  const getInitialVariant = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 60 };
      case 'down':
        return { opacity: 0, y: -60 };
      case 'left':
        return { opacity: 0, x: -60 };
      case 'right':
        return { opacity: 0, x: 60 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 60 };
    }
  };

  const getFinalVariant = () => {
    switch (direction) {
      case 'up':
        return { opacity: 1, y: 0 };
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
        return { opacity: 1, x: 0 };
      case 'right':
        return { opacity: 1, x: 0 };
      case 'fade':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: getInitialVariant(),
    visible: {
      ...getFinalVariant(),
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
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
        {children}
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

// Staggered container for multiple children
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

// Individual item for staggered animations
export function ScrollRevealItem({
  children,
  className = "",
  direction = 'up',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
}) {
  const getInitialVariant = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 40 };
      case 'down':
        return { opacity: 0, y: -40 };
      case 'left':
        return { opacity: 0, x: -40 };
      case 'right':
        return { opacity: 0, x: 40 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 40 };
    }
  };

  const variants = {
    hidden: getInitialVariant(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}