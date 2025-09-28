"use client";

import { useMemo } from "react";

export type SkillTickerItem = {
  name: string;
  short: string;
  color: string;
  emphasis?: string;
};

type SkillTickerProps = {
  skills: SkillTickerItem[];
};

export default function SkillTicker({ skills }: SkillTickerProps) {
  const loopedSkills = useMemo(() => [...skills, ...skills], [skills]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-slate-300/80">
        <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 uppercase tracking-[0.4em] text-blue-200">
          Marquee
        </div>
        <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[0.7rem] font-medium text-emerald-200/90">
          Auto-scroll enabled
        </span>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gray-950/80 p-4 shadow-[0_20px_50px_-45px_rgba(59,130,246,0.9)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-950 via-gray-950/95 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-950 via-gray-950/95 to-transparent" />

        <div className="flex min-w-max items-center gap-5 animate-[skill-marquee_24s_linear_infinite]">
          {loopedSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="group flex min-w-[190px] items-center gap-4 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-900/30 px-5 py-3 shadow-[0_12px_30px_-24px_rgba(59,130,246,0.85)] transition hover:border-blue-400/60"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-semibold text-white shadow-inner"
                style={{ backgroundColor: skill.color }}
              >
                {skill.short}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-100">{skill.name}</span>
                {skill.emphasis && (
                  <span className="text-xs text-slate-400">{skill.emphasis}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
