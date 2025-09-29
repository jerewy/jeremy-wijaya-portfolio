"use client";

import { Slot } from "@radix-ui/react-slot";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type MutableRefObject,
} from "react";

import { cn } from "@/lib/utils";

type ScrollRevealProps = ComponentPropsWithoutRef<"section"> & {
  asChild?: boolean;
};

const ScrollReveal = forwardRef<HTMLElement, ScrollRevealProps>(
  ({ asChild = false, className, children, ...props }, forwardedRef) => {
    const [isRevealed, setIsRevealed] = useState(() => {
      if (typeof window === "undefined") {
        return false;
      }

      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const node = localRef.current;

      if (!node || typeof window === "undefined") {
        return;
      }

      const mediaQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

      if (mediaQuery.matches) {
        if (!isRevealed) {
          setIsRevealed(true);
        }
        return;
      }

      if (isRevealed) {
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    }, [isRevealed]);

    const setRefs = useCallback(
      (node: HTMLElement | null) => {
        localRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [forwardedRef]
    );

    const Component = asChild ? Slot : "section";

    return (
      <Component
        ref={setRefs}
        data-reveal={isRevealed ? "true" : "false"}
        className={cn("will-change-transform", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
