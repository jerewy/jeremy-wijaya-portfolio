"use client";

import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Brain,
  Cpu,
  Award,
  BookOpen,
  Code,
  Users,
  FileText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedBackground from "./components/animated-background";
import CustomCursor from "./components/custom-cursor";
import HeroScene from "./components/hero-scene";
import { BlurRevealText } from "./components/blur-reveal-text";
import SkillSlider, { type SkillSlide } from "./components/skill-slider";
import Image from "next/image";

export default function Portfolio() {
  const projects = [
    {
      title: "Jernih - AI-powered Water Quality Analysis Platform",
      summary:
        "Co-developed a full-stack web platform for water contamination analysis, achieving 85.37% ML model accuracy on 3278 measurements.",
      image: "/jernih.png",
      width: 500,
      height: 300,
      liveLink: "https://jernih.vercel.app/",
      githubLink: "https://github.com/Allen-pie/Jernih_Frontend",
      tags: ["Next.js", "Python", "ML", "Supabase"],
    },
    {
      title: "AI-driven Health Predictors",
      summary:
        "Developed & deployed interactive ML models for diabetes risk (Streamlit) using large datasets.",
      image: "/glucoguard_cropped.png",
      width: 500,
      height: 300,
      liveLink: "https://glucoguard-app.streamlit.app/",
      githubLink: "https://github.com/jerewy/diabetes-risk-predictor",
      tags: ["Python", "Streamlit", "Healthcare AI"],
    },
    {
      title: "CodeJoin - Interactive Coding Environment (Work In Progress)",
      summary:
        "Developing web-based coding platform mimicking VS Code/CodeSandbox, integrating AI chatbot features with LLMs.",
      image: "/code_join_cropped.png",
      width: 500,
      height: 300,
      liveLink: null,
      githubLink: "https://github.com/jerewy/codejoin-new",
      tags: ["React", "Monaco Editor", "AI Integration", "WebRTC"],
    },
  ];

  const stats = [
    {
      icon: Award,
      label: "GPA",
      value: "3.96/4.00",
      description: "Academic Excellence",
    },
    {
      icon: Code,
      label: "Projects",
      value: "5+",
      description: "AI & Web Development",
    },
    {
      icon: BookOpen,
      label: "Certifications",
      value: "2+",
      description: "Microsoft Azure AI",
    },
    {
      icon: Users,
      label: "Team Projects",
      value: "5+",
      description: "Collaborative Development",
    },
  ];

  const hardSkillSlides: SkillSlide[] = [
    {
      name: "Python",
      description:
        "Building data pipelines, FastAPI services, and production-ready ML workflows.",
      category: "AI Engineering",
    },
    {
      name: "JavaScript & TypeScript",
      description:
        "Crafting performant web apps and design systems across React and Next.js ecosystems.",
      category: "Frontend/Full-stack",
    },
    {
      name: "Next.js",
      description:
        "Designing SSR/ISR experiences, API routes, and AI-enabled dashboards at scale.",
      category: "Web Platform",
    },
    {
      name: "TensorFlow & PyTorch",
      description:
        "Experimenting with deep learning architectures for vision, NLP, and structured data.",
      category: "Machine Learning",
    },
    {
      name: "Supabase",
      description:
        "Deploying realtime backends, auth flows, and storage integrations for prototypes.",
      category: "Backend as a Service",
    },
    {
      name: "Git & Collaboration",
      description:
        "Leading version-controlled workflows, code reviews, and GitHub Actions automation.",
      category: "Team Practices",
    },
    {
      name: "Figma",
      description:
        "Translating UX wireframes into polished UI libraries and interaction specs.",
      category: "Product Design",
    },
    {
      name: "HTML & CSS",
      description:
        "Delivering responsive, accessible interfaces with Tailwind CSS and semantic markup.",
      category: "Frontend Fundamentals",
    },
    {
      name: "C & Java",
      description:
        "Grounding AI work with systems-level understanding and object-oriented design patterns.",
      category: "Software Foundations",
    },
    {
      name: "Add your next skill",
      description:
        "Duplicate this slide and update the copy to keep showcasing new technologies you learn.",
      category: "Future Highlight",
    },
    {
      name: "HTML & CSS",
      description:
        "Delivering responsive, accessible interfaces with Tailwind CSS and semantic markup.",
      category: "Frontend Fundamentals",
    },
    {
      name: "C & Java",
      description:
        "Grounding AI work with systems-level understanding and object-oriented design patterns.",
      category: "Software Foundations",
    },
    // {
    //   name: "Add your next skill",
    //   description:
    //     "Duplicate this slide and update the copy to keep showcasing new technologies you learn.",
    //   category: "Future Highlight",
    // },
  ];

  const quickSkills = [
    "Python",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "TensorFlow",
    "PyTorch",
    "Supabase",
    "Git",
    "Figma",
    "HTML",
    "CSS",
    "C",
    "Java",
  ];

  const softSkills = [
    "Problem-Solving & Analytical Thinking",
    "Adaptability & Continuous Learning",
    "Collaboration & Communication",
    "Mentorship & Leadership",
    "Strong Work Ethic & Social Responsibility",
  ];

  const contactMethods = [
    {
      label: "Email",
      value: "jeremywijaya81@gmail.com",
      href: "mailto:jeremywijaya81@gmail.com",
      icon: Mail,
      helper: "Say hello",
    },
    {
      label: "LinkedIn",
      value: "jeremy-wijaya",
      href: "https://linkedin.com/in/jeremy-wijaya",
      icon: Linkedin,
      helper: "Let’s connect",
    },
    {
      label: "GitHub",
      value: "jerewy",
      href: "https://github.com/jerewy",
      icon: Github,
      helper: "View my code",
    },
  ];

  return (
    <div
      id="top"
      className="min-h-screen bg-gray-950 text-gray-100 relative overflow-hidden"
    >
      <CustomCursor />
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3">
          <div className="hidden md:block">
            <div className="rounded-full bg-gradient-to-r from-sky-500/50 via-indigo-500/40 to-purple-500/50 p-[1px] shadow-[0_12px_60px_-25px_rgba(59,130,246,0.65)]">
              <div className="flex items-center justify-between rounded-full bg-gray-950/90 px-6 py-3 backdrop-blur-xl">
                <a
                  href="#top"
                  className="cursor-hover flex items-center gap-3 text-left"
                >
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-slate-100">
                      Jeremy Wijaya
                    </p>
                    <p className="text-xs uppercase tracking-[0.32em] text-blue-300/70">
                      AI Engineer &amp; Developer
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-2 rounded-full bg-gray-900/70 px-6 py-2 text-sm font-medium text-slate-200 shadow-inner">
                  <a
                    href="#about"
                    className="cursor-hover rounded-full px-3 py-1 transition hover:bg-sky-500/20 hover:text-sky-100"
                  >
                    About
                  </a>
                  <a
                    href="#projects"
                    className="cursor-hover rounded-full px-3 py-1 transition hover:bg-sky-500/20 hover:text-sky-100"
                  >
                    Projects
                  </a>
                  <a
                    href="#contact"
                    className="cursor-hover rounded-full px-3 py-1 transition hover:bg-sky-500/20 hover:text-sky-100"
                  >
                    Contact
                  </a>
                </div>
                <a
                  href="#contact"
                  className="cursor-hover group flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_35px_-20px_rgba(59,130,246,0.8)] transition hover:shadow-[0_18px_45px_-18px_rgba(59,130,246,0.9)]"
                >
                  Let&apos;s collaborate
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-full border border-slate-800/70 bg-gray-950/90 px-4 py-2 shadow-md md:hidden">
            <span className="text-lg font-semibold text-blue-200">JW</span>
            <div className="flex items-center gap-4 text-sm text-slate-200">
              <a href="#projects" className="cursor-hover">
                Work
              </a>
              <a
                href="#contact"
                className="cursor-hover flex items-center gap-1 rounded-full bg-sky-500/20 px-3 py-1 text-sky-100"
              >
                Contact
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-4 pt-28 sm:px-6 md:pt-32">
        <HeroScene />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-0 text-center sm:px-4">
          <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-200 shadow-lg backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            Building intelligent products with empathy
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text pb-4 text-5xl font-bold text-transparent md:text-7xl">
            Jeremy Wijaya
          </h1>
          <h2 className="mb-8 text-2xl font-light text-sky-100/90 md:text-3xl">
            <BlurRevealText
              text="Aspiring AI Engineer | Building Impactful Intelligent Systems"
              className="text-balance"
            />
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-300">
            A driven Computer Science student (Intelligent Systems
            specialization) at BINUS University, completing my third year with a
            passion for developing full-stack AI solutions to solve real-world
            problems and drive positive societal change.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-blue-600 text-white transition-all hover:scale-105 hover:bg-blue-700 cursor-hover sm:w-auto"
            >
              <a href="#projects" className="flex items-center gap-2">
                Explore My Work
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-gray-600 text-gray-300 transition-all hover:scale-105 hover:bg-gray-800 cursor-hover sm:w-auto"
            >
              <a
                href="https://linkedin.com/in/jeremy-wijaya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Connect on LinkedIn
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            <Button
              size="lg"
              className="w-full bg-purple-600 text-white transition-all hover:scale-105 hover:bg-purple-700 cursor-hover sm:w-auto"
            >
              <a
                href="/jeremy-wijaya-cv.pdf"
                download
                className="flex items-center gap-2"
              >
                Download CV
                <FileText className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.4em] text-blue-300">
              About
            </span>
            <h2 className="text-4xl font-bold text-blue-100 sm:text-5xl">
              About Me
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-400">
              A quick snapshot of my journey, experience, and the skills I bring to collaborative AI-driven projects.
            </p>
          </div>
          <div className="grid items-stretch gap-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-14">
            {/* Stats Section - Replacing the image */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/80 border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500 cursor-hover"
                  >
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-blue-400 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {stat.description}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">
                  Qualifications
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>Education:</strong> Bachelor of Computer Science
                    (Intelligent Systems), BINUS University (2023-Present), GPA:
                    3.96/4.00
                  </p>
                  <p>
                    <strong>Certifications:</strong> Microsoft Azure AI
                    Fundamentals (AI-900T00-A)
                  </p>
                </div>
              </div>

              {/* Animated Code Terminal */}
              <div className="rounded-xl border border-gray-800 bg-gray-900/80 p-6 font-mono text-sm">
                <div className="mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-2">
                    jeremy@ai-engineer:~$
                  </span>
                </div>
                <div className="space-y-2 text-green-400">
                  <div className="animate-pulse">
                    {"> python train_model.py"}
                  </div>
                  <div className="text-gray-400">Training AI model...</div>
                  <div className="text-blue-400">Accuracy: 85.37% ✓</div>
                  <div className="animate-pulse">
                    {"> git push origin main"}
                  </div>
                  <div className="text-gray-400">
                    Deploying to production...
                  </div>
                  <div className="text-green-400">Success! 🚀</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/15 via-slate-900/50 to-purple-500/15 p-8 shadow-lg">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-blue-200">
                  <Sparkles className="h-5 w-5" />
                  Who I Am
                </h3>
                <div className="space-y-4 text-base leading-relaxed text-gray-200">
                  <p>
                    A driven Computer Science student (Intelligent Systems specialization) at BINUS University, completing my third year with a passion for building impactful AI solutions. My journey into AI is fueled by a deep belief in its transformative power to enhance human efficiency, responsibly harness resources, and fundamentally improve society.
                  </p>
                  <p>
                    I thrive in open, collaborative team environments where diverse perspectives are encouraged, fostering brainstorming that leads to innovative solutions and optimal outcomes. I view challenges as invaluable opportunities for personal and professional growth.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-1">
                <div className="rounded-xl border border-gray-800 bg-gray-900/80 p-6 shadow-lg">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-300">
                    <Cpu className="w-5 h-5" />
                    Technical Skills
                  </h3>
                  <SkillSlider slides={hardSkillSlides} />
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900/70 p-6 shadow-lg">
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-blue-400/80">
                    Quick View
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {quickSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-gray-800/80 text-gray-200 transition hover:bg-blue-500/80 cursor-hover"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-800 bg-gray-900/85 p-6 shadow-lg">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-300">
                  <Brain className="w-5 h-5" />
                  Soft Skills
                </h3>
                <div className="grid gap-2 text-gray-200">
                  {softSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative bg-gray-900/30 py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="flex h-full flex-col border-gray-700 bg-gray-900/80 pt-0 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500 cursor-hover"
              >
                {/* <CardHeader className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-t-lg flex items-center justify-center">
                    <Code className="w-16 h-16 text-blue-400" />
                  </div>
                </CardHeader> */}
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={project.width}
                    height={project.height}
                    className="w-full h-auto object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex flex-1 flex-col pt-0">
                  <CardTitle className="text-xl mb-3 text-gray-100">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mb-4 leading-relaxed">
                    {project.summary}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="border-blue-500 text-blue-400 cursor-hover"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-3">
                    {project.liveLink && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 cursor-hover"
                      >
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 cursor-hover"
                    >
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-400">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            I&apos;m always excited to connect, collaborate on innovative AI
            projects, or discuss new opportunities in AI engineering. Feel free
            to reach out through any of the channels below!
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const isExternal = method.href.startsWith("http");

              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group h-full"
                >
                  <Card className="h-full border-gray-700 bg-gray-900/80 transition-all group-hover:border-blue-500 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] cursor-hover">
                    <CardContent className="flex h-full flex-col items-center gap-3 p-6 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 shadow-inner">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-gray-100">
                          {method.label}
                        </h3>
                        {/* <p className="text-sm uppercase tracking-[0.3em] text-blue-400/60">
                          {method.helper}
                        </p> */}
                      </div>
                      <p className="break-all text-gray-300 transition group-hover:text-blue-200">
                        {method.value}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Jeremy Wijaya. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
