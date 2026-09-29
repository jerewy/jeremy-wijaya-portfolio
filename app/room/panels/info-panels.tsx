"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../room.module.css";
import { contacts, CV_PATH } from "../../xp/data";
import {
  aboutStats,
  certificates,
  education,
  experiences,
  projectsUsing,
  skillGroups,
} from "../room-data";
import type { RoomObject } from "../room-scene";
import { PixelIcon } from "../pixel-icons";
import { useSfx } from "../use-room-audio";

type Navigate = (object: RoomObject) => void;

export function AboutPanel({ onNavigate }: { onNavigate: Navigate }) {
  return (
    <div className={styles.stagger}>
      <div className={styles.aboutTop}>
        <div className={styles.portraitFrame}>
          <Image
            src="/pasfoto_jere.jpeg"
            alt="Portrait of Jeremy Wijaya"
            width={360}
            height={360}
            className={styles.portrait}
          />
        </div>
        <div>
          <p className={styles.eyebrow}>Full-Stack Developer · AI Enthusiast</p>
          <h3 className={styles.displayTitle}>Hi, I&apos;m Jeremy.</h3>
          <p className={styles.lead}>
            I turn machine learning models into tools people can actually use.
          </p>
        </div>
      </div>
      <p>
        I&apos;m in my seventh semester of Computer Science at BINUS University, specializing in
        Intelligent Systems. So far that has meant a real-time water quality monitor, a
        diabetes risk checker, and a collaborative code editor I&apos;m building right now.
      </p>
      <p>
        Right now I&apos;m interning as a frontend developer at BCA. Outside of work and my own
        projects, I mentor other students through the hard parts of computer science.
      </p>
      <div className={styles.statRow}>
        {aboutStats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <button className={styles.buttonPrimary} onClick={() => onNavigate("computer")}>
          See my projects
        </button>
        <button className={styles.buttonSecondary} onClick={() => onNavigate("board")}>
          Read my resume
        </button>
      </div>
    </div>
  );
}

export function SkillsPanel() {
  const [selected, setSelected] = useState<string | null>(null);
  const usedIn = selected ? projectsUsing(selected) : [];

  return (
    <div className={styles.stagger}>
      <p className={styles.muted}>Hover or tap a skill to see where I&apos;ve used it.</p>
      {skillGroups.map((group) => (
        <section key={group.name} className={styles.skillGroup}>
          <h3 className={styles.eyebrow}>{group.name}</h3>
          <div className={styles.slots}>
            {group.items.map((item) => (
              <button
                key={item}
                className={`${styles.slot} ${selected === item ? styles.slotActive : ""}`}
                onPointerEnter={() => setSelected(item)}
                onFocus={() => setSelected(item)}
                onClick={() => setSelected(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      ))}
      <div className={styles.skillDetail} aria-live="polite">
        {selected ? (
          <>
            <strong>{selected}</strong>
            <span>
              {usedIn.length > 0 ? `Used in ${usedIn.join(" and ")}` : "Part of my everyday toolkit"}
            </span>
          </>
        ) : (
          <span>Pick a skill above.</span>
        )}
      </div>
    </div>
  );
}

export function ResumePanel() {
  return (
    <div className={styles.stagger}>
      <div className={styles.eduCard}>
        <p className={styles.eyebrow}>Education</p>
        <h3 className={styles.itemTitle}>{education.title}</h3>
        <p className={styles.meta}>
          {education.org} · {education.period}
        </p>
      </div>

      <p className={styles.eyebrow}>Experience</p>
      <ol className={styles.timeline}>
        {experiences.map((exp) => (
          <li key={exp.title}>
            <h3 className={styles.itemTitle}>{exp.title}</h3>
            <p className={styles.meta}>
              {exp.org} · {exp.period}
            </p>
            {exp.points.length > 0 && (
              <ul className={styles.highlights}>
                {exp.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>

      <div className={styles.actions}>
        <a className={styles.buttonPrimary} href={CV_PATH} target="_blank" rel="noreferrer">
          Download full CV (PDF)
        </a>
      </div>
    </div>
  );
}

export function CertificatesPanel() {
  return (
    <div className={`${styles.certGrid} ${styles.stagger}`}>
      {certificates.map((cert) => (
        <article key={cert.title} className={styles.certCard}>
          <div className={styles.certBadge}>
            <PixelIcon name="medal" size={28} />
          </div>
          <p className={styles.eyebrow}>Achievement unlocked</p>
          <h3 className={styles.itemTitle}>{cert.title}</h3>
          <p className={styles.meta}>
            {cert.issuer} · {cert.date}
          </p>
          <p>{cert.covered}</p>
          <a className={styles.buttonSecondary} href={cert.file} target="_blank" rel="noreferrer">
            View certificate
          </a>
        </article>
      ))}
    </div>
  );
}

const COPY_RESET_MS = 1800;

export function ContactPanel() {
  const [isCopied, setIsCopied] = useState(false);
  const sfx = useSfx();
  const email = contacts.find((c) => c.label === "Email");
  const socials = contacts.filter((c) => c.label !== "Email");

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email.value);
      sfx("copy");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), COPY_RESET_MS);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); the mailto link still works.
      window.location.href = email.href;
    }
  };

  return (
    <div className={styles.stagger}>
      <h3 className={styles.displayTitle}>Let&apos;s build something.</h3>
      <p className={styles.lead}>
        I&apos;m always excited to collaborate on AI projects, talk about new opportunities, or
        meet fellow developers.
      </p>
      {email && (
        <div className={styles.emailCard}>
          <PixelIcon name="mail" size={24} />
          <span className={styles.emailText}>{email.value}</span>
          <div className={styles.emailActions}>
            <button className={styles.buttonSecondary} onClick={copyEmail}>
              {isCopied ? "Copied!" : "Copy"}
            </button>
            <a className={styles.buttonPrimary} href={email.href}>
              Send email
            </a>
          </div>
        </div>
      )}
      <div className={styles.socials}>
        {socials.map((social) => (
          <a
            key={social.label}
            className={styles.socialLink}
            href={social.href}
            target="_blank"
            rel="noreferrer"
          >
            <PixelIcon name={social.label === "GitHub" ? "github" : "linkedin"} size={24} />
            <span>
              <strong>{social.label}</strong>
              <span className={styles.meta}>{social.value}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
