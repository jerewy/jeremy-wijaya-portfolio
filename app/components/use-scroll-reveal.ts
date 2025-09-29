"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type ScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

type ScrollRevealState = {
  ref: (node: HTMLElement | null) => void;
  isRevealed: boolean;
  prefersReducedMotion: boolean;
};

export function useScrollReveal(
  { threshold = 0.2, rootMargin = "0px", once = true }: ScrollRevealOptions = {}
): ScrollRevealState {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      if (event.matches) {
        setIsRevealed(true);
      } else if (!once && !event.matches) {
        setIsRevealed(false);
      }
    };

    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsRevealed(true);
    }

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [once]);

  useEffect(() => {
    if (!element || prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setIsRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, prefersReducedMotion, threshold, rootMargin, once]);

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
    if (node && prefersReducedMotion) {
      setIsRevealed(true);
    }
  }, [prefersReducedMotion]);

  return useMemo(
    () => ({
      ref,
      isRevealed,
      prefersReducedMotion,
    }),
    [ref, isRevealed, prefersReducedMotion]
  );
}
