"use client";


import { type CSSProperties, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type SkillSlide = {
  name: string;
  description?: string;
  category?: string;
};

type SkillSliderProps = {
  slides: SkillSlide[];
};

export default function SkillSlider({ slides }: SkillSliderProps) {
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [isPaused, setIsPaused] = useState(false);

  const marqueeSlides = useMemo(() => [...slides, ...slides], [slides]);

  const marqueeStyle = useMemo<CSSProperties>(
    () => ({
      animation: "skill-marquee 26s linear infinite",
      animationDirection: direction === "left" ? "normal" : "reverse",
      animationPlayState: isPaused ? "paused" : "running",
    }),
    [direction, isPaused]
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 text-sm text-blue-100">
        <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium tracking-[0.24em] uppercase text-blue-200/80">
            Hard Skills in Motion
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-300/80">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          Hover to pause • Use arrows to change direction
        </div>
      </div>

      <div className="rounded-[2.25rem] bg-gradient-to-r from-sky-500/40 via-indigo-500/30 to-purple-500/40 p-[1px] shadow-[0_10px_60px_-25px_rgba(59,130,246,0.6)]">
        <div
          className="relative overflow-hidden rounded-[calc(2.25rem-1px)] bg-gray-950/85 px-6 py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-950 via-gray-950/95 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-950 via-gray-950/95 to-transparent" />

          <div className="flex min-w-max items-stretch gap-6" style={marqueeStyle}>
            {marqueeSlides.map((slide, index) => (
              <article
                key={`${slide.name}-${index}`}
                className="min-w-[240px] max-w-[280px] rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/20 p-5 text-left text-slate-100 shadow-[0_10px_30px_-20px_rgba(59,130,246,0.45)] backdrop-blur-sm"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-blue-300/70">
                    {slide.category ?? "Core Skill"}
                  </span>
                  <h4 className="text-xl font-semibold leading-tight text-slate-100">{slide.name}</h4>
                  <p className="text-sm leading-relaxed text-slate-300/80">
                    {slide.description ?? "Add a description to highlight projects or experience with this skill."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 text-xs text-slate-300/80">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-200">
            {slides.length} featured skills
          </span>
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-purple-200">
            Auto-scroll enabled
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setDirection("right");
              setIsPaused(false);
            }}
            className={cn(
              "cursor-hover group flex items-center gap-2 rounded-full border border-blue-500/30 px-4 py-2 text-sm font-medium transition",
              direction === "right"
                ? "bg-blue-500/20 text-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                : "bg-blue-500/10 text-blue-200 hover:bg-blue-500/20"
            )}
            aria-label="Scroll skills to the right"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Reverse
          </button>
          <button
            type="button"
            onClick={() => {
              setDirection("left");
              setIsPaused(false);
            }}
            className={cn(
              "cursor-hover group flex items-center gap-2 rounded-full border border-sky-500/40 px-4 py-2 text-sm font-medium transition",
              direction === "left"
                ? "bg-sky-500/25 text-blue-50 shadow-[0_0_24px_rgba(14,165,233,0.45)]"
                : "bg-sky-500/10 text-blue-100 hover:bg-sky-500/20"
            )}
            aria-label="Scroll skills to the left"
          >
            Forward
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
