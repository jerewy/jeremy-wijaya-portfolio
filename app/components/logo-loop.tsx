"use client";

import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTensorflow,
  SiPytorch,
  SiSupabase,
  SiGit,
  SiFigma,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiDocker,
  SiVercel,
  SiTailwindcss,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { motion } from "framer-motion";

interface LogoItem {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

const logoItems: LogoItem[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  // { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  // { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  // { name: "AWS", icon: SiAmazon, color: "#FF9900" },
  // { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { name: "Java", icon: DiJava, color: "#5382A1" },
];

interface LogoLoopProps {
  className?: string;
}

export function LogoLoop({ className = "" }: LogoLoopProps) {
  // Duplicate the array for seamless loop
  const duplicatedLogos = [...logoItems, ...logoItems];

  return (
    <div
      className={`relative w-full -mx-screen left-1/2 -translate-x-1/2 overflow-x-clip ${className}`}
      role="marquee"
      aria-label="Skills and technologies carousel"
    >
      <div className="flex items-center" aria-hidden="true">
        <motion.div
          className="flex gap-8 md:gap-12 xl:gap-16"
          animate={{
            x: [0, -logoItems.length * 160], // Move left by the width of original items
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35, // Adjust for speed
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((item, index) => {
            const Icon = item.icon;
            const originalIndex = index % logoItems.length;

            return (
              <motion.div
                key={`${item.name}-${index}`}
                className="flex flex-col items-center gap-2 group px-4"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: originalIndex * 0.05,
                    duration: 0.5,
                  },
                }}
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 cursor-hover"
                  style={{
                    backgroundColor: `${item.color}10`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <Icon
                    className="w-8 h-8 md:w-12 md:h-12 xl:w-14 xl:h-14 transition-all duration-300 group-hover:scale-110"
                    style={{ color: item.color }}
                  />
                </div>
                <span className="text-xs md:text-sm xl:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Enhanced gradient fade edges with wider coverage */}
      <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-40 lg:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-40 lg:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
