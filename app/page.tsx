"use client";

import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Brain,
  Cpu,
  Award,
  BookOpen,
  Code,
  Users,
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
import { useEffect, useState } from "react";
import AnimatedBackground from "./components/animated-background";
import CustomCursor from "./components/custom-cursor";
import Image from "next/image";

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "Jernih - AI-powered Water Quality Analysis Platform",
      summary:
        "Co-developed a full-stack web platform for water contamination analysis, achieving 85.37% ML model accuracy on 3278 measurements.",
      image: "/jernih.png",
      width: 500,
      height: 300,
      liveLink: "https://jernih.vercel.app/",
      githubLink: "https://github.com/jerewy/jernih-repo",
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
      value: "3.95/4.00",
      description: "Academic Excellence",
    },
    {
      icon: Code,
      label: "Projects",
      value: "10+",
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

  const hardSkills = [
    {
      category: "Programming Languages",
      skills: ["Python", "Java", "JavaScript", "C"],
    },
    {
      category: "AI/ML Technologies",
      skills: [
        "Machine Learning",
        "Deep Learning",
        "NLP",
        "Speech Recognition",
      ],
    },
    {
      category: "Web Development",
      skills: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    },
    {
      category: "Databases & Tools",
      skills: ["MySQL", "Supabase", "Git"],
    },
  ];

  const softSkills = [
    "Problem-Solving & Analytical Thinking",
    "Adaptability & Continuous Learning",
    "Collaboration & Communication",
    "Mentorship & Leadership",
    "Strong Work Ethic & Social Responsibility",
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-hidden">
      <CustomCursor />
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-400 cursor-hover">
              JW
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#about"
                className="text-gray-300 hover:text-blue-400 transition-colors cursor-hover"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-gray-300 hover:text-blue-400 transition-colors cursor-hover"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-blue-400 transition-colors cursor-hover"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center justify-center relative">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold pb-4 mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            Jeremy Wijaya
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
            Aspiring AI Engineer | Building Impactful Intelligent Systems
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            A driven Computer Science student (Intelligent Systems
            specialization) at BINUS University, completing my second year with
            a passion for developing full-stack AI solutions to solve real-world
            problems and drive positive societal change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-hover transform hover:scale-105 transition-all"
            >
              <a href="#projects" className="flex items-center gap-2">
                Explore My Work
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 cursor-hover transform hover:scale-105 transition-all"
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
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">
            About Me
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Stats Section - Replacing the image */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/80 border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-hover transform hover:scale-105"
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
                    3.95/4.00
                  </p>
                  <p>
                    <strong>Certifications:</strong> Microsoft Azure AI
                    Fundamentals (AI-900T00-A)
                  </p>
                </div>
              </div>

              {/* Animated Code Terminal */}
              <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
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

            <div className="space-y-8">
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  A driven Computer Science student (Intelligent Systems
                  specialization) at BINUS University, completing my second year
                  with a passion for building impactful AI solutions. My journey
                  into AI is fueled by a deep belief in its transformative power
                  to enhance human efficiency, responsibly harness resources,
                  and fundamentally improve society.
                </p>
                <p>
                  I thrive in open, collaborative team environments where
                  diverse perspectives are encouraged, fostering brainstorming
                  that leads to innovative solutions and optimal outcomes. I
                  view challenges as invaluable opportunities for personal and
                  professional growth.
                </p>
              </div>

              <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Technical Skills
                </h3>
                <div className="grid gap-4">
                  {hardSkills.map((skillGroup, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-200 mb-2">
                        {skillGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-gray-800 text-gray-300 cursor-hover hover:bg-blue-600 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Soft Skills
                </h3>
                <div className="grid gap-2">
                  {softSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
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
      <section id="projects" className="py-20 px-4 bg-gray-900/30 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-gray-900/80 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-hover transform pt-0"
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
                <CardContent className="pt-0">
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
                  <div className="flex gap-3">
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
      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-400">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            I&apos;m always excited to connect, collaborate on innovative AI
            projects, or discuss new opportunities in AI engineering. Feel free
            to reach out through any of the channels below!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-900/80 border-gray-700 hover:border-blue-500 transition-all cursor-hover transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-gray-100">Email</h3>
                <a
                  href="mailto:jeremywijaya81@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors break-all cursor-hover"
                >
                  jeremywijaya81@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 border-gray-700 hover:border-blue-500 transition-all cursor-hover transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <Linkedin className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-gray-100">LinkedIn</h3>
                <a
                  href="https://linkedin.com/in/jeremy-wijaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors cursor-hover"
                >
                  jeremy-wijaya
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 border-gray-700 hover:border-blue-500 transition-all cursor-hover transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <Github className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-gray-100">GitHub</h3>
                <a
                  href="https://github.com/jerewy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors cursor-hover"
                >
                  jerewy
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 border-gray-700 hover:border-blue-500 transition-all cursor-hover transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-gray-100">Phone</h3>
                <p className="text-gray-400">+6285817540995</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 relative">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Jeremy Wijaya. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
