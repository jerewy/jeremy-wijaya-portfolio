"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseOut = () => setIsVisible(false);

    // Add event listeners
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseout", handleMouseOut);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      '.cursor-hover, button, a, [role="button"]'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseout", handleMouseOut);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[60]"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          transform: `scale(${isHovering ? 1.15 : 1})`,
          transition: "transform 0.18s ease-out",
        }}
      >
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-indigo-400 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.45)]">
          <span className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-white" />
          <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-white" />
          <span
            className="absolute bottom-3 h-1 w-3 rounded-full bg-white/70 transition-transform"
            style={{ transform: `scaleX(${isHovering ? 1.2 : 1})` }}
          />
          <div className="absolute inset-0 rounded-full border-2 border-white/40" />
        </div>
      </div>

      <div
        className="fixed pointer-events-none z-[55]"
        style={{
          left: position.x - 30,
          top: position.y - 30,
          transform: `scale(${isHovering ? 1.4 : 1})`,
          transition: "transform 0.25s ease-out",
        }}
      >
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-sky-500/20 to-purple-500/10 blur-md" />
      </div>
    </>
  );
}
