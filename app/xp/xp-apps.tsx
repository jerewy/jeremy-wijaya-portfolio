"use client";

import Image from "next/image";
import styles from "./xp.module.css";
import { projects, contacts, CV_PATH, type Project } from "./data";
import { ExeIcon } from "./xp-icons";

// Touch screens have no real double-click, so a single tap opens things there.
const isCoarsePointer = () => window.matchMedia("(pointer: coarse)").matches;

export type AppKind = "welcome" | "projects" | "project" | "about" | "contact";

type OpenApp = (kind: AppKind, projectId?: string) => void;

export function WelcomeApp({ open }: { open: OpenApp }) {
  return (
    <div className={styles.welcome}>
      <Image
        src="/pasfoto_jere.jpeg"
        alt="Jeremy Wijaya"
        width={88}
        height={88}
        className={styles.avatar}
      />
      <div>
        <h1 className={styles.welcomeName}>Jeremy Wijaya</h1>
        <p className={styles.welcomeRole}>Full-Stack Developer &amp; AI Enthusiast</p>
        <p>
          Seventh-semester Computer Science student at BINUS University, specializing in
          Intelligent Systems.
        </p>
        <div className={styles.welcomeButtons}>
          <button className={styles.xpButton} onClick={() => open("projects")}>
            View Projects
          </button>
          <a className={styles.xpButton} href={CV_PATH} target="_blank" rel="noreferrer">
            Resume (PDF)
          </a>
          <button className={styles.xpButton} onClick={() => open("contact")}>
            Contact
          </button>
        </div>
        <p className={styles.hint}>
          Tip: double-click the desktop icons, or use the Start menu.
        </p>
      </div>
    </div>
  );
}

export function ProjectsApp({ open }: { open: OpenApp }) {
  return (
    <div className={styles.explorer}>
      <aside className={styles.explorerSide}>
        <div className={styles.sidePanel}>
          <div className={styles.sidePanelTitle}>Project Tasks</div>
          <p>Double-click a program to see details and live links.</p>
        </div>
      </aside>
      <div className={styles.explorerFiles}>
        {projects.map((project) => (
          <button
            key={project.id}
            className={styles.fileItem}
            onClick={() => isCoarsePointer() && open("project", project.id)}
            onDoubleClick={() => open("project", project.id)}
            onKeyDown={(e) => e.key === "Enter" && open("project", project.id)}
          >
            <ExeIcon size={40} />
            <span>{project.fileName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectApp({ project }: { project: Project }) {
  return (
    <div className={styles.projectDetail}>
      <Image
        src={project.image}
        alt={project.title}
        width={500}
        height={300}
        className={styles.projectImage}
      />
      <h2>{project.title}</h2>
      <p>{project.summary}</p>
      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.welcomeButtons}>
        <a className={styles.xpButton} href={project.liveLink} target="_blank" rel="noreferrer">
          Live demo
        </a>
        <a className={styles.xpButton} href={project.githubLink} target="_blank" rel="noreferrer">
          Source code
        </a>
      </div>
    </div>
  );
}

export function AboutApp() {
  const specs = [
    ["User", "Jeremy Wijaya"],
    ["Location", "Indonesia"],
    ["Education", "BINUS University, Computer Science (Intelligent Systems)"],
    ["Processor", "Python, TypeScript"],
    ["Frameworks", "Next.js, React, TensorFlow, Streamlit"],
    ["Data", "Supabase, SQL"],
  ];
  return (
    <div className={styles.about}>
      <fieldset className={styles.fieldset}>
        <legend>System</legend>
        <dl className={styles.specs}>
          {specs.map(([key, value]) => (
            <div key={key}>
              <dt>{key}:</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </fieldset>
      <p>
        Passionate about building AI solutions that enhance human efficiency and drive
        meaningful change.
      </p>
    </div>
  );
}

export function ContactApp() {
  return (
    <div className={styles.about}>
      <fieldset className={styles.fieldset}>
        <legend>Reach me</legend>
        <dl className={styles.specs}>
          {contacts.map((contact) => (
            <div key={contact.label}>
              <dt>{contact.label}:</dt>
              <dd>
                <a href={contact.href} target="_blank" rel="noreferrer">
                  {contact.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </fieldset>
    </div>
  );
}
