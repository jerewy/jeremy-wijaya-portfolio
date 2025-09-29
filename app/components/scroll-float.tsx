"use client";

import {
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

import styles from "./scroll-float.module.css";

type ScrollFloatConfig = {
  /** Starting scroll position for the animation timeline. */
  start?: string;
  /** Ending scroll position for the animation timeline. */
  end?: string;
  /** Duration for the initial reveal segment. */
  duration?: number;
  /** Stagger interval applied between floating elements. */
  stagger?: number;
  /** Base offset (in pixels) each element starts from on the Y axis. */
  offsetY?: number;
  /** How far (in pixels) each element drifts once revealed. */
  drift?: number;
  /** Overall easing applied to the reveal segment. */
  ease?: string | gsap.EaseFunction;
  /** Value passed to ScrollTrigger's `scrub` option. */
  scrub?: boolean | number;
  /** Maximum rotation (in degrees) applied during the reveal. */
  rotate?: number;
  /** Blur radius (in pixels) used during the reveal. */
  blur?: number;
  /** Toggles the glowing backdrop style from the CSS module. */
  glow?: boolean;
};

type ScrollFloatProps = {
  children: ReactNode;
  className?: string;
} & ScrollFloatConfig;

type RequiredSettings = Required<Omit<ScrollFloatConfig, "glow">>;

const DEFAULTS: RequiredSettings = {
  start: "top 78%",
  end: "bottom 35%",
  duration: 1.45,
  stagger: 0.12,
  offsetY: 56,
  drift: 22,
  ease: "expo.out",
  scrub: 0.6,
  rotate: 7,
  blur: 14,
};

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useScrollFloat(
  containerRef: MutableRefObject<HTMLDivElement | null>,
  settings: RequiredSettings
) {
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll<HTMLElement>("[data-float]")
      );

      if (!targets.length) return;

      if (prefersReducedMotion) {
        gsap.set(targets, {
          opacity: 1,
          y: 0,
          x: 0,
          rotate: 0,
          filter: "none",
        });
        return;
      }

      gsap.set(targets, {
        opacity: 0,
        y: settings.offsetY,
        x: 0,
        z: 0,
        transformPerspective: 800,
        force3D: true,
        rotate: (_index: number) => (_index % 2 ? -settings.rotate : settings.rotate),
        filter: `blur(${settings.blur}px)`,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: settings.ease,
        },
        scrollTrigger: {
          trigger: container,
          start: settings.start,
          end: settings.end,
          scrub: settings.scrub,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(targets, {
          opacity: 1,
          y: 0,
          rotate: 0,
          filter: "blur(0px)",
          duration: settings.duration,
          stagger: settings.stagger,
        })
        .to(
          targets,
          {
            x: (_index: number) =>
              _index % 3 === 0
                ? settings.drift * 0.55
                : _index % 3 === 1
                ? -settings.drift * 0.4
                : settings.drift * 0.25,
            y: (_index: number) =>
              _index % 2 === 0 ? -settings.drift : settings.drift * 0.9,
            skewY: (_index: number) =>
              _index % 2 === 0 ? -settings.rotate * 0.25 : settings.rotate * 0.25,
            ease: "sine.inOut",
            duration: settings.duration * 1.35,
          },
          "<+=0.45"
        );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [settings]);
}

export function ScrollFloat({
  children,
  className,
  start,
  end,
  duration,
  stagger,
  offsetY,
  drift,
  ease,
  scrub,
  rotate,
  blur,
  glow = false,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const settings = useMemo<RequiredSettings>(
    () => ({
      start: start ?? DEFAULTS.start,
      end: end ?? DEFAULTS.end,
      duration: duration ?? DEFAULTS.duration,
      stagger: stagger ?? DEFAULTS.stagger,
      offsetY: offsetY ?? DEFAULTS.offsetY,
      drift: drift ?? DEFAULTS.drift,
      ease: ease ?? DEFAULTS.ease,
      scrub: scrub ?? DEFAULTS.scrub,
      rotate: rotate ?? DEFAULTS.rotate,
      blur: blur ?? DEFAULTS.blur,
    }),
    [start, end, duration, stagger, offsetY, drift, ease, scrub, rotate, blur]
  );

  useScrollFloat(containerRef, settings);

  return (
    <div
      ref={containerRef}
      className={cn(styles.container, className)}
      data-glow={glow ? "true" : undefined}
    >
      {children}
    </div>
  );
}
