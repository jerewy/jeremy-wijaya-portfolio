"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type BlurRevealTextProps = {
  text: string;
  delay?: number;
  interval?: number;
  className?: string;
  repeat?: boolean;
};

export function BlurRevealText({
  text,
  delay = 200,
  interval = 45,
  className,
  repeat = true,
}: BlurRevealTextProps) {
  const characters = useMemo(() => text.split(""), [text]);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let progressTimer: number | undefined;
    let restartTimer: number | undefined;
    let index = 0;
    const total = characters.length;

    const animate = () => {
      if (index < total) {
        index += 1;
        setVisibleCount(index);
        if (index < total) {
          progressTimer = window.setTimeout(animate, interval);
        } else if (repeat) {
          restartTimer = window.setTimeout(() => {
            index = 0;
            setVisibleCount(0);
            animate();
          }, delay + 600);
        }
      }
    };

    setVisibleCount(0);
    const startTimer = window.setTimeout(animate, delay);

    return () => {
      if (progressTimer) window.clearTimeout(progressTimer);
      if (restartTimer) window.clearTimeout(restartTimer);
      window.clearTimeout(startTimer);
    };
  }, [characters.length, delay, interval, repeat]);

  return (
    <span className={cn("inline-flex flex-wrap justify-center gap-x-1", className)}>
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={cn(
            "transition-all duration-500 ease-out",
            index < visibleCount ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          )}
          style={{ transitionDelay: `${Math.min(index, 6) * 40}ms` }}
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </span>
  );
}
