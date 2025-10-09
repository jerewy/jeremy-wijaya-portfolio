"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Building } from "lucide-react";
import { ScrollRevealStaggered } from "./enhanced-scroll-reveal";

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: "work" | "education" | "achievement";
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  className?: string;
}

export function ExperienceTimeline({
  experiences,
  className = "",
}: ExperienceTimelineProps) {
  const sortedExperiences = [...experiences].sort((a, b) => {
    // Sort by date (most recent first)
    const dateA = new Date(a.period.split(" - ")[0]);
    const dateB = new Date(b.period.split(" - ")[0]);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className={`relative max-w-4xl mx-auto ${className}`}>
      {/* Vertical timeline line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2" />

      {/* Progress indicator line */}
      <div
        className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary to-primary/30 transform md:-translate-x-1/2 transition-all duration-1000 ease-out"
        style={{
          height: `${Math.min(100, sortedExperiences.length * 25)}%`,
        }}
      />

      <ScrollRevealStaggered className="space-y-12 md:space-y-16">
        {sortedExperiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
            total={experiences.length}
          />
        ))}
      </ScrollRevealStaggered>
    </div>
  );
}

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  total: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const getTypeColor = (type: ExperienceItem["type"]) => {
    switch (type) {
      case "work":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "education":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "achievement":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const getTypeIcon = (type: ExperienceItem["type"]) => {
    switch (type) {
      case "work":
        return Building;
      case "education":
        return Calendar;
      case "achievement":
        return MapPin;
      default:
        return Calendar;
    }
  };

  const Icon = getTypeIcon(experience.type);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className="relative flex items-center"
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Timeline dot */}
      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
        <motion.div
          className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-4 ${getTypeColor(
            experience.type
          )} bg-background cursor-hover shadow-lg`}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>

      {/* Content card */}
      <div
        className={`
          w-full md:w-5/12
          ${
            isLeft
              ? "md:pr-12 md:mr-auto md:text-right"
              : "md:pl-12 md:ml-auto md:text-left"
          }
          ml-20 md:ml-0
        `}
      >
        <motion.div
          className={`p-6 md:p-8 rounded-xl border transition-all duration-300 hover:shadow-xl cursor-hover backdrop-blur-sm
            ${getTypeColor(experience.type)}
            hover:scale-[1.02]
          `}
          whileHover={{ y: -5 }}
        >
          {/* Type indicator */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-2 rounded-lg ${getTypeColor(experience.type)}`}>
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span
              className={`text-xs md:text-sm font-medium ${
                getTypeColor(experience.type).split(" ")[1]
              }`}
            >
              {experience.type.charAt(0).toUpperCase() +
                experience.type.slice(1)}
            </span>
          </div>

          {/* Header */}
          <div
            className={`${
              isLeft && !isLeft ? "md:text-right" : "md:text-left"
            }`}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
              {experience.title}
            </h3>
            <p className="text-lg md:text-xl font-medium text-muted-foreground mb-3">
              {experience.company}
            </p>

            <div
              className={`flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4 ${
                isLeft && !isLeft ? "md:justify-end" : "md:justify-start"
              }`}
            >
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {experience.period}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            {experience.description.map((point, pointIndex) => (
              <p
                key={pointIndex}
                className="text-sm md:text-base leading-relaxed text-muted-foreground"
              >
                {point}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Updated data for the timeline
export const sampleExperiences: ExperienceItem[] = [
  // WORK / LEADERSHIP
  {
    id: "exp-sasc-senior-mentor",
    title: "SASC Scholarship Senior Mentor",
    company: "BINUS University",
    location: "Alam Sutera, Indonesia",
    period: "Sep 2025 – Present",
    type: "work",
    description: [
      "Mentored 2 students across the semester on complex technical concepts",
      "Supported academic growth and study habits with structured check-ins",
    ],
  },
  {
    id: "exp-sasc-new-mentor",
    title: "SASC Scholarship New Mentor",
    company: "BINUS University",
    location: "Alam Sutera, Indonesia",
    period: "Sep 2024 – Jan 2025",
    type: "work",
    description: [
      "Guided 3 students through a challenging semester",
      "Explained difficult CS topics with tailored communication",
    ],
  },
  {
    id: "exp-freshmen-partner",
    title: "Freshmen Partner",
    company: "BINUS University",
    location: "Alam Sutera, Indonesia",
    period: "Sep 2024 – Jun 2025",
    type: "work",
    description: [
      "Onboarded a cohort of 9 freshmen to academics and campus life",
      "Ensured smooth transition and integration throughout the first year",
    ],
  },
];
