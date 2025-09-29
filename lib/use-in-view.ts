import { useCallback, useEffect, useMemo, useState } from "react";

type UseInViewOptions = IntersectionObserverInit;

type UseInViewResult<T extends Element> = {
  ref: (node: T | null) => void;
  isInView: boolean;
  isIntersecting: boolean;
  prefersReducedMotion: boolean;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    handleChange();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return prefersReducedMotion;
}

export function useInView<T extends Element>(
  options?: UseInViewOptions,
): UseInViewResult<T> {
  const [element, setElement] = useState<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = element;

    if (!node || typeof window === "undefined") {
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsIntersecting(true);
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsIntersecting(Boolean(entry?.isIntersecting));
    }, options);

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [element, options]);

  useEffect(() => {
    if (!element) {
      setIsIntersecting(false);
    }
  }, [element]);

  const ref = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  const isInView = useMemo(
    () => Boolean(isIntersecting && !prefersReducedMotion),
    [isIntersecting, prefersReducedMotion],
  );

  return {
    ref,
    isInView,
    isIntersecting,
    prefersReducedMotion,
  };
}

export type { UseInViewResult };
