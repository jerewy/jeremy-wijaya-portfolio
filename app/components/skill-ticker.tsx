"use client";

import { type ComponentType, useMemo } from "react";

import LogoLoop from "@/components/logo-loop";

export type SkillTickerItem = {
  name: string;
  short: string;
  color: string;
  icon?: ComponentType<{ className?: string }>;
  emphasis?: string;
};

type SkillTickerProps = {
  skills: SkillTickerItem[];
};

export default function SkillTicker({ skills }: SkillTickerProps) {
  const logoItems = useMemo(
    () =>
      skills.map((skill) => {
        const Icon = skill.icon;

        return {
          node: (
            <div className="group flex min-w-[190px] items-center gap-4 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-900/30 px-5 py-3 shadow-[0_12px_30px_-24px_rgba(59,130,246,0.85)] transition hover:border-blue-400/60">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-semibold text-white shadow-inner"
                style={{ backgroundColor: skill.color }}
              >
                {Icon ? (
                  <Icon className="h-6 w-6 text-white" aria-hidden />
                ) : (
                  <span>{skill.short}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-100">{skill.name}</span>
                {skill.emphasis && (
                  <span className="text-xs text-slate-400">{skill.emphasis}</span>
                )}
              </div>
            </div>
          ),
          ariaLabel: skill.name,
          title: skill.name,
        };
      }),
    [skills],
  );

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

      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gray-950/80 shadow-[0_20px_50px_-45px_rgba(59,130,246,0.9)]">
        <LogoLoop
          logos={logoItems}
          speed={100}
          direction="left"
          logoHeight={72}
          gap={32}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="rgba(15, 23, 42, 0.95)"
          ariaLabel="Technology partners"
          className="px-4 py-5"
        />
      </div>
    </div>
  );
}
