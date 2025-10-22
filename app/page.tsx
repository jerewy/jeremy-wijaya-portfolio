"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./components/theme-toggle";
import { MobileMenu } from "./components/mobile-menu";
import { TargetCursor } from "./components/target-cursor";
import { FaultyTerminal } from "./components/faulty-terminal";
import { LogoLoop } from "./components/logo-loop";
import {
  ScrollReveal,
  ScrollRevealStaggered,
} from "./components/enhanced-scroll-reveal";
import {
  ExperienceTimeline,
  sampleExperiences,
} from "./components/experience-timeline";
import {
  CertificationCard,
  CVDownloadButton,
} from "./components/certification-card";
import Image from "next/image";
import { useTheme } from "./components/theme-provider";
import HeroScene from "./components/hero-scene";

export default function Portfolio() {
  const { theme } = useTheme();

  const navigationItems = [
    "About",
    "CV",
    "Skills",
    "Projects",
    "Experience",
    "Certifications",
    "Contact",
  ];

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
      title: "CodeJoin - Interactive Coding Environment",
      summary:
        "Developing web-based coding platform with AI chatbot integration and real-time collaboration features.",
      image: "/codejoin.vercel.app_.png",
      width: 500,
      height: 300,
      liveLink: "https://codejoin.vercel.app/",
      githubLink: "https://github.com/jerewy/codejoin-new",
      tags: ["React", "Monaco Editor", "AI Integration"],
    },
  ];

  const certifications = [
    {
      id: "azure-ai-900t00-greatnusa",
      title: "Azure AI Fundamentals (AI-900T00-A) — Course Completion",
      issuer: "GreatNusa",
      issueDate: "April 28, 2025",
      credentialId: "AI-900T00-A",
      previewImage: "/msai900t00_JeremyWijaya.pdf",
      description:
        "Completed the Azure AI Fundamentals training aligned to Microsoft AI-900: core AI concepts, responsible AI, and Azure AI services (Azure ML, Computer Vision, Language & Speech, Azure OpenAI).",
      credentialUrl:
        "https://www.greatnusa.com/product/microsoft-ai-900t00-a-azure-ai-fundamentals",
    },
    {
      id: "microsoft-ai-beginner-fundamental-greatnusa",
      title: "Microsoft AI Beginner Fundamental — Course Completion",
      issuer: "GreatNusa",
      issueDate: "April 26, 2025",
      credentialId: "—",
      previewImage: "/sertifikat_jeremy.pdf",
      description:
        "Completed the Microsoft AI Beginner Fundamental course covering essential AI concepts and introductory hands-on labs.",
      credentialUrl:
        "https://www.greatnusa.com/product/microsoft-ai-beginner-fundamental",
    },
  ];

  const contactMethods = [
    {
      label: "Email",
      value: "jeremywijaya81@gmail.com",
      href: "mailto:jeremywijaya81@gmail.com",
      icon: Mail,
    },
    {
      label: "LinkedIn",
      value: "jeremy-wijaya",
      href: "https://linkedin.com/in/jeremy-wijaya",
      icon: Linkedin,
    },
    {
      label: "GitHub",
      value: "jerewy",
      href: "https://github.com/jerewy",
      icon: Github,
    },
  ];

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <TargetCursor />
      <FaultyTerminal />

      {/* Simple Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="#top"
              className="group flex items-center gap-2 text-xl font-bold text-foreground relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary/80 group-hover:to-primary/40">
                Jeremy Wijaya
              </span>
              <div className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </motion.a>

            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <MobileMenu navigationItems={navigationItems} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Typography Focus */}
      <section
        id="top"
        className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden"
      >
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent z-10" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={textVariants} className="mb-6">
            <Badge variant="secondary" className="mb-4 text-xs">
              Building intelligent products with empathy
            </Badge>
          </motion.div>

          <motion.h1
            variants={textVariants}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            style={{
              fontFamily: theme === "dark" ? "Inter, serif" : "Inter, serif",
            }}
          >
            <span className="glitch-text" data-text="Jeremy Wijaya">
              Jeremy Wijaya
            </span>
          </motion.h1>

          <motion.h2
            variants={textVariants}
            className="text-2xl md:text-4xl font-light text-muted-foreground mb-8"
          >
            AI Engineer & Full-Stack Developer
          </motion.h2>

          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            A driven Computer Science student specializing in Intelligent
            Systems, passionate about developing AI solutions that drive
            positive societal change.
          </motion.p>

          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto"
          >
            <Button size="lg" className="group w-full sm:w-auto">
              <a href="#projects" className="flex items-center gap-2">
                Explore My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="#contact" className="flex items-center gap-2">
                Get In Touch
                <Mail className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Fade transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* About Section */}
      <ScrollReveal id="about" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Picture */}
            <ScrollReveal direction="left">
              <div className="relative max-w-sm mx-auto lg:max-w-none">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src="/jere_profile_linkedin.png" // Add your profile picture here
                    alt="Jeremy Wijaya"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
                    }}
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 lg:-bottom-4 lg:-right-4 bg-primary text-primary-foreground px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-semibold">
                  Available for work
                </div>
              </div>
            </ScrollReveal>

            {/* About Content */}
            <ScrollReveal direction="right" className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  About Me
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Crafting AI Solutions with Purpose
                </h2>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A third-year Computer Science student at BINUS University
                  specializing in Intelligent Systems, I&apos;m passionate about
                  building AI solutions that enhance human efficiency and drive
                  meaningful change.
                </p>

                <p>
                  My journey in AI is fueled by a deep belief in
                  technology&apos;s transformative power to solve real-world
                  problems responsibly. I thrive in collaborative environments
                  where diverse perspectives lead to innovation.
                </p>

                <p>
                  Currently maintaining a 3.96/4.00 GPA while working on
                  impactful projects that bridge machine learning with practical
                  applications.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">
                    3.96/4.00
                  </div>
                  <div className="text-sm text-muted-foreground">GPA</div>
                </div>
                <div className="text-center p-4 rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">5+</div>
                  <div className="text-sm text-muted-foreground">
                    AI Projects
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* CV Section */}
      <ScrollReveal
        id="cv"
        className="relative px-4 py-20 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <Badge variant="secondary" className="mb-4">
              Resume
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Download My CV
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Get a comprehensive overview of my skills, experience, projects,
              and qualifications in AI engineering and full-stack development.
            </p>
          </ScrollReveal>

          <ScrollReveal className="max-w-md mx-auto">
            <CVDownloadButton />
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Skills Section */}
      <ScrollReveal
        id="skills"
        className="relative py-20 sm:py-24 lg:py-32 bg-muted/30 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <ScrollReveal className="text-center">
            <Badge variant="secondary" className="mb-4">
              Skills
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technologies I Work With
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Continuously learning and applying modern technologies to build
              intelligent, scalable solutions.
            </p>
          </ScrollReveal>
        </div>

        {/* Full-width skills slider container */}
        <div className="relative w-full">
          <LogoLoop className="py-8" />
        </div>
      </ScrollReveal>

      {/* Projects Section */}
      <ScrollReveal
        id="projects"
        className="relative px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Projects
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of my recent work showcasing AI integration,
              full-stack development, and problem-solving skills.
            </p>
          </ScrollReveal>

          <ScrollRevealStaggered className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-hover"
              >
                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                  <div className="relative h-48 bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center text-muted-foreground">
                              <div class="text-center">
                                <div class="text-4xl mb-2">🚀</div>
                                <div class="text-sm">Project Preview</div>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>

                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                    {project.summary}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.liveLink && (
                      <Button size="sm" className="group">
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Live
                        </a>
                      </Button>
                    )}

                    <Button size="sm" variant="outline">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollRevealStaggered>
        </div>
      </ScrollReveal>

      {/* Experience Section */}
      <ScrollReveal
        id="experience"
        className="relative px-4 py-20 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Experience
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Education, work experience, and achievements that have shaped my
              professional growth.
            </p>
          </ScrollReveal>

          <ExperienceTimeline experiences={sampleExperiences} />
        </div>
      </ScrollReveal>

      {/* Certifications Section */}
      <ScrollReveal
        id="certifications"
        className="relative px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Certifications
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Credentials
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Certifications and professional development that validate my
              expertise and commitment to continuous learning.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {certifications.map((cert) => (
              <CertificationCard key={cert.id} {...cert} />
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Contact Section */}
      <ScrollReveal
        id="contact"
        className="relative px-4 py-20 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <Badge variant="secondary" className="mb-4">
              Contact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              I&apos;m always excited to collaborate on innovative AI projects,
              discuss new opportunities, or connect with fellow developers. Feel
              free to reach out through any of these channels!
            </p>
          </ScrollReveal>

          <ScrollRevealStaggered className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const isExternal = method.href.startsWith("http");

              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group block h-full"
                >
                  <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50 cursor-hover">
                    <CardContent className="flex h-full flex-col items-center gap-4 p-6 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {method.label}
                        </h3>
                        <p className="text-sm text-muted-foreground break-all transition-colors group-hover:text-foreground">
                          {method.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </ScrollRevealStaggered>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Jeremy Wijaya. Built with Next.js, TypeScript, and passion
            for AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
