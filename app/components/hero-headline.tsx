"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type HeroVariant = "clean" | "gradient" | "reveal";

const BASE =
  "text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-[0.95]";

export function HeroHeadline({
  text,
  variant,
  className,
}: {
  text: string;
  variant: HeroVariant;
  className?: string;
}) {
  if (variant === "clean") {
    return <h1 className={cn(BASE, "text-foreground", className)}>{text}</h1>;
  }

  if (variant === "gradient") {
    return (
      <h1
        className={cn(
          BASE,
          // No text-shadow here: it would paint over a transparent fill and
          // swallow the gradient entirely.
          "bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent",
          className
        )}
      >
        {text}
      </h1>
    );
  }

  // "reveal": each word rises out of its own clipping box on load.
  const words = text.split(" ");

  return (
    <h1 className={cn(BASE, "text-foreground", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex flex-wrap justify-center gap-x-[0.25em]">
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden py-[0.08em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );
}
