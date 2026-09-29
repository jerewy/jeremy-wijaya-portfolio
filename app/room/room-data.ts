// Room-view content. Facts come from the classic page (app/page.tsx) and the
// project screenshots; merge with ../xp/data into one shared module once a
// design direction is chosen.

import { projects as baseProjects } from "../xp/data";
import type { RoomObject } from "./room-scene";

type ProjectExtra = {
  status: "Live" | "In progress";
  tagline: string;
  highlights: string[];
  stats: { value: string; label: string }[];
};

const projectExtras: Record<string, ProjectExtra> = {
  jernih: {
    status: "Live",
    tagline: "Monitor water quality in real time and catch contamination early.",
    highlights: [
      "Co-developed the full platform: Next.js front end, Python ML model, Supabase data layer.",
      "Trained the contamination model on 3,278 real water measurements.",
    ],
    stats: [
      { value: "85.37%", label: "model accuracy" },
      { value: "3,278", label: "measurements" },
    ],
  },
  glucoguard: {
    status: "Live",
    tagline: "Fill in a short health form, get an instant diabetes risk estimate.",
    highlights: [
      "Built and trained ML models for diabetes risk on large health datasets.",
      "Shipped it as an interactive Streamlit app that anyone can try in the browser.",
    ],
    stats: [],
  },
  codejoin: {
    status: "In progress",
    tagline: "A browser code editor where people write code together, with an AI helper built in.",
    highlights: [
      "Editor built on Monaco, the same engine that powers VS Code.",
      "AI chatbot integration and real-time collaboration features.",
    ],
    stats: [],
  },
};

export const roomProjects = baseProjects.map((project) => ({
  ...project,
  ...projectExtras[project.id],
}));

export type RoomProject = (typeof roomProjects)[number];

export const aboutStats = [
  { value: "3.95", label: "GPA out of 4.00" },
  { value: "3", label: "projects built" },
  { value: "14", label: "students mentored" },
  { value: "2", label: "AI certificates" },
];

export const skillGroups = [
  { name: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java"] },
  { name: "AI / ML", items: ["TensorFlow", "PyTorch", "Streamlit"] },
  { name: "Web", items: ["React", "Next.js", "Node.js", "Tailwind CSS"] },
  { name: "Tools", items: ["Supabase", "Docker", "Git", "Vercel", "Figma"] },
];

// Which projects use a skill, derived from project tags so it stays truthful.
export function projectsUsing(skill: string) {
  return roomProjects.filter((p) => p.tags.includes(skill)).map((p) => p.fileName.replace(".exe", ""));
}

export const education = {
  title: "B.Sc. Computer Science, Intelligent Systems",
  org: "BINUS University",
  period: "Semester 7 · GPA 3.95 / 4.00",
};

export const experiences = [
  {
    title: "Frontend Developer Intern",
    org: "BCA (Bank Central Asia)",
    period: "Feb 2026 - Present (until Feb 2027)",
    // Summarized from the internship logbook; internal system names left out on purpose.
    points: [
      "Build and fix frontend features for a merchant management web app: multi-step forms, group and user settings, and OTP flows.",
      "Resolve UAT (user acceptance testing) findings each release cycle: form validation, unsaved-changes prompts, browser back/refresh behavior, and responsive navigation.",
      "Support environment migration and regression testing to keep the app stable before release.",
    ],
  },
  {
    title: "SASC Scholarship Senior Mentor",
    org: "BINUS University",
    period: "Sep 2025 - Jan 2026",
    points: [
      "Mentored 2 students across the semester on complex technical concepts.",
      "Supported academic growth and study habits with structured check-ins.",
    ],
  },
  {
    title: "SASC Scholarship New Mentor",
    org: "BINUS University",
    period: "Sep 2024 - Jan 2025",
    points: [
      "Guided 3 students through a challenging semester.",
      "Explained difficult CS topics with tailored communication.",
    ],
  },
  {
    title: "Freshmen Partner",
    org: "BINUS University",
    period: "Sep 2024 - Jun 2025",
    points: [
      "Onboarded a cohort of 9 freshmen to academics and campus life.",
      "Kept their transition smooth throughout the first year.",
    ],
  },
];

export const certificates = [
  {
    title: "Azure AI Fundamentals (AI-900T00-A)",
    issuer: "GreatNusa",
    date: "Apr 28, 2025",
    covered: "Core AI concepts, responsible AI, and Azure AI services: Azure ML, Computer Vision, Language & Speech, Azure OpenAI.",
    file: "/msai900t00_JeremyWijaya.pdf",
  },
  {
    title: "Microsoft AI Beginner Fundamental",
    issuer: "GreatNusa",
    date: "Apr 26, 2025",
    covered: "Essential AI concepts plus introductory hands-on labs.",
    file: "/sertifikat_jeremy.pdf",
  },
];

// What the robot says when a visitor points at something.
export const botLines: Record<RoomObject | "window" | "intro" | "done", string> = {
  intro:
    "Welcome to Jeremy Wijaya's portfolio! Everything in this room is part of it: projects, skills, resume, and more. Hover over something (or tap it on a phone) to start exploring.",
  computer: "That's Jeremy's computer. Three projects are loaded on it. Click to boot them up.",
  shelf: "The bookshelf holds every tool Jeremy works with, from Python to PyTorch.",
  board: "The corkboard has Jeremy's resume pinned on it: the frontend internship at BCA, mentoring, and a CV download.",
  certs: "Two AI certificates from 2025, framed on the wall. Click to take a closer look.",
  phone: "Want to talk to Jeremy? Pick up the phone.",
  robot: "That's me! Click me and I'll introduce Jeremy properly.",
  window: "Click the window to switch between day and night.",
  done: "You've explored the whole room! If you liked what you saw, the phone is right there.",
};
