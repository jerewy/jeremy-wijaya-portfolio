"use client";

import {
  Children,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

import styles from "./scroll-float.module.css";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const charClassName = styles.char;

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName,
  textClassName,
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const content = useMemo(() => {
    if (typeof children === "string") {
      return children;
    }

    return Children.toArray(children)
      .map((child) => {
        if (typeof child === "string" || typeof child === "number") {
          return String(child);
        }

        return "";
      })
      .join("");
  }, [children]);

  const characters = useMemo(
    () =>
      content.split("").map((char, index) => (
        <span className={styles.char} key={index}>
          {char === " " ? "\u00A0" : char}
        </span>
      )),
    [content]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const charElements = Array.from(
        el.getElementsByClassName(charClassName)
      );

      if (!charElements.length) return;

      const animation = gsap.fromTo(
        charElements,
        {
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: "50% 0%",
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
            ...(scrollContainerRef?.current
              ? { scroller: scrollContainerRef.current }
              : {}),
          },
        }
      );

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    }, el);

    return () => {
      ctx.revert();
    };
  }, [
    animationDuration,
    ease,
    scrollContainerRef,
    scrollEnd,
    scrollStart,
    stagger,
    content,
  ]);

  if (!content) {
    return null;
  }

  return (
    <h2
      ref={containerRef}
      className={cn(styles.scrollFloat, containerClassName)}
    >
      <span className={cn(styles.scrollFloatText, textClassName)}>
        {characters}
      </span>
    </h2>
  );
};

export default ScrollFloat;
