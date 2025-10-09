"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

export function TargetCursor() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Check if device supports touch (mobile/tablet)
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
      if (
        target.matches('a, button, [role="button"], .cursor-hover, input, textarea, select') ||
        target.closest('a, button, [role="button"], .cursor-hover')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches('a, button, [role="button"], .cursor-hover, input, textarea, select') ||
        target.closest('a, button, [role="button"], .cursor-hover')
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseLeaveDocument = () => {
      setIsVisible(false);
    };

    const handleMouseEnterDocument = () => {
      setIsVisible(true);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseLeaveDocument);
    document.addEventListener('mouseenter', handleMouseEnterDocument);

    // Add target cursor class to html
    document.documentElement.classList.add('target-cursor');

    return () => {
      // Clean up
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