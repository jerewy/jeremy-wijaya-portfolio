"use client";

import { useEffect, useRef, useState } from "react";

type CursorPosition = {
  x: number;
  y: number;
};

export default function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({
    x: -100,
    y: -100,
  });
  const [trailPosition, setTrailPosition] = useState<CursorPosition>({
    x: -100,
    y: -100,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const livePosition = useRef<CursorPosition>(position);
  const hasShownRef = useRef(false);

  useEffect(() => {
    livePosition.current = position;
  }, [position]);

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      const next = { x: event.clientX, y: event.clientY };
      setPosition(next);
      if (!hasShownRef.current) {
        hasShownRef.current = true;
        setTrailPosition(next);
      }
      setIsVisible(true);
      if (!isVisible) {
        setTrailPosition(next);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseExit = () => {
      hasShownRef.current = false;
      setIsVisible(false);
    };

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleMouseExit);

    const interactiveElements = document.querySelectorAll(
      '.cursor-hover, button, a, [role="button"]'
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        hasShownRef.current = false;
        setIsVisible(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseExit);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isVisible) {
      root.classList.add("cursor-hidden");
    } else {
      root.classList.remove("cursor-hidden");
    }

    return () => {
      root.classList.remove("cursor-hidden");
    };
  }, [isVisible]);

  useEffect(() => {
    let frame: number;

    const animateTrail = () => {
      setTrailPosition((prev) => {
        const target = livePosition.current;
        const next = {
          x: prev.x + (target.x - prev.x) * 0.18,
          y: prev.y + (target.y - prev.y) * 0.18,
        };
        return next;
      });
      frame = window.requestAnimationFrame(animateTrail);
    };

    frame = window.requestAnimationFrame(animateTrail);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed z-[60] -translate-x-1/2 -translate-y-1/2 transform-gpu pointer-events-none"
        style={{ left: position.x, top: position.y }}
      >
        <div
          className="relative flex h-12 w-12 items-center justify-center"
          style={{ transition: "transform 0.2s ease-out" }}
        >
          <div
            className="absolute inset-0 rounded-full border border-sky-400/60 bg-sky-500/10 backdrop-blur-sm transition-all"
            style={{
              boxShadow: isHovering
                ? "0 0 22px rgba(56, 189, 248, 0.35)"
                : "0 0 14px rgba(56, 189, 248, 0.18)",
              transform: `scale(${isHovering ? 1.05 : 0.95})`,
            }}
          />
          <div
            className="absolute inset-3 rounded-full border border-indigo-400/50 bg-indigo-500/10 mix-blend-screen transition-all"
            style={{
              opacity: isHovering ? 0.85 : 0.6,
              transform: `scale(${isHovering ? 1.08 : 1})`,
            }}
          />
          <div
            className="absolute h-3 w-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
            style={{
              transform: `scale(${isHovering ? 0.9 : 1})`,
            }}
          />
          <div className="absolute h-16 w-16 rounded-full bg-sky-400/20 blur-2xl" />
        </div>
      </div>

      <div
        className="fixed z-[55] -translate-x-1/2 -translate-y-1/2 transform-gpu pointer-events-none"
        style={{ left: trailPosition.x, top: trailPosition.y }}
      >
        <div
          className="h-16 w-16 rounded-full bg-gradient-to-br from-sky-500/30 via-indigo-500/20 to-purple-500/10 blur-2xl opacity-80 transition-all"
          style={{
            transform: `scale(${isHovering ? 1.15 : 1})`,
            opacity: isHovering ? 0.9 : 0.7,
          }}
        />
      </div>
    </>
  );
}
