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
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[60]"
        style={{
          left: position.x - 12,
          top: position.y - 12,
          transform: `scale(${isHovering ? 1.5 : 1})`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="w-6 h-6 border-2 border-blue-400 rounded-full bg-transparent" />
      </div>

      {/* Trailing cursor */}
      <div
        className="fixed pointer-events-none z-[55]"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          transform: `scale(${isHovering ? 1.8 : 1})`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="w-10 h-10 border border-blue-400/30 rounded-full bg-transparent" />
      </div>
    </>
  );
}
