"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

interface ScrollFloatProps {
  children: ReactNode;
  className?: string;
  /** Delay the start of the animation in milliseconds. */
  delay?: number;
  /** Allow the element to animate again when it re-enters the viewport. */
  repeat?: boolean;
  /** IntersectionObserver threshold between 0 and 1. */
  threshold?: number;
}

export function ScrollFloat({
  children,
  className,
  delay = 0,
  repeat = false,
  threshold = 0.35,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
            if (!repeat) {
              observer.unobserve(entry.target);
            }
          } else if (repeat) {
            setIsActive(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [repeat, threshold]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative will-change-transform transition-transform transition-opacity duration-700 ease-out",
        isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default ScrollFloat;
