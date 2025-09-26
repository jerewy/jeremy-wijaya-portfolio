"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [current, setCurrent] = useState(0);
  const totalSlides = slides.length;
  const autoplayDelay = 3200;

  const orderedSlides = useMemo(
    () => [...slides, ...slides.slice(0, 1)],
    [slides]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, autoplayDelay);

    return () => window.clearInterval(interval);
  }, [totalSlides]);

  const goTo = (index: number) => {
    setCurrent((index + totalSlides) % totalSlides);
  };

  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  return (
    <div className="relative">
      <div
        className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/70 shadow-lg backdrop-blur"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)`, width: `${orderedSlides.length * 100}%` }}
        >
          {orderedSlides.map((slide, index) => (
            <div
              key={`${slide.name}-${index}`}
              className="w-full flex-shrink-0 px-6 py-10 md:px-10"
            >
              <div className="flex flex-col gap-4 text-left">
                <span className="text-sm uppercase tracking-[0.4em] text-blue-400/70">
                  Hard Skill Spotlight
                </span>
                <h4 className="text-3xl font-semibold text-gray-100">{slide.name}</h4>
                <p className="text-gray-400 leading-relaxed">
                  {slide.description ?? "Add a description to highlight projects or experience with this skill."}
                </p>
                {slide.category && (
                  <span className="self-start rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                    {slide.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 flex items-center justify-between px-3">
        <button
          type="button"
          onClick={goPrev}
          className="cursor-hover hidden h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-gray-900/80 text-blue-200 shadow-lg transition hover:border-blue-400/60 hover:text-blue-100 md:flex"
          aria-label="Previous skill"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          className="cursor-hover hidden h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-gray-900/80 text-blue-200 shadow-lg transition hover:border-blue-400/60 hover:text-blue-100 md:flex"
          aria-label="Next skill"
        >
          ›
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.name}
            type="button"
            onClick={() => goTo(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition",
              current === index ? "bg-blue-400" : "bg-blue-500/30 hover:bg-blue-400/60"
            )}
            aria-label={`Go to ${slide.name}`}
          />
        ))}
      </div>
    </div>
  );
}
