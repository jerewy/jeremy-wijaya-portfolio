// Mockup copy of the portfolio content. If the XP view ships, move this into a
// shared module and have app/page.tsx read from it too.

export type Project = {
  id: string;
  title: string;
  fileName: string;
  summary: string;
  image: string;
  liveLink: string;
  githubLink: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "jernih",
    title: "Jernih - AI-powered Water Quality Analysis Platform",
    fileName: "Jernih.exe",
    summary:
      "Co-developed a full-stack web platform for water contamination analysis, achieving 85.37% ML model accuracy on 3278 measurements.",
    image: "/jernih.png",
    liveLink: "https://jernih.vercel.app/",
    githubLink: "https://github.com/Allen-pie/Jernih_Frontend",
    tags: ["Next.js", "Python", "ML", "Supabase"],
  },
  {
    id: "glucoguard",
    title: "AI-driven Health Predictors",
    fileName: "GlucoGuard.exe",
    summary:
      "Developed & deployed interactive ML models for diabetes risk (Streamlit) using large datasets.",
    image: "/glucoguard_cropped.png",
    liveLink: "https://glucoguard-app.streamlit.app/",
    githubLink: "https://github.com/jerewy/diabetes-risk-predictor",
    tags: ["Python", "Streamlit", "Healthcare AI"],
  },
  {
    id: "codejoin",
    title: "CodeJoin - Interactive Coding Environment",
    fileName: "CodeJoin.exe",
    summary:
      "Developing web-based coding platform with AI chatbot integration and real-time collaboration features.",
    image: "/codejoin.vercel.app_.png",
    liveLink: "https://codejoin.vercel.app/",
    githubLink: "https://github.com/jerewy/codejoin-new",
    tags: ["React", "Monaco Editor", "AI Integration"],
  },
];

export const contacts = [
  { label: "Email", value: "jeremywijaya81@gmail.com", href: "mailto:jeremywijaya81@gmail.com" },
  { label: "LinkedIn", value: "jeremy-wijaya", href: "https://linkedin.com/in/jeremy-wijaya" },
  { label: "GitHub", value: "jerewy", href: "https://github.com/jerewy" },
];

export const CV_PATH = "/Jeremy_CV_ATS_81025.pdf";
