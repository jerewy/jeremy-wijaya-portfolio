"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../room.module.css";
import { roomProjects } from "../room-data";

export function ProjectsPanel() {
  const [selectedId, setSelectedId] = useState(roomProjects[0].id);
  const project = roomProjects.find((p) => p.id === selectedId) ?? roomProjects[0];

  return (
    <div className={styles.projects}>
      <div role="tablist" aria-label="Projects" className={styles.cartridgeList}>
        {roomProjects.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={p.id === selectedId}
            className={styles.cartridgeTab}
            onClick={() => setSelectedId(p.id)}
          >
            <Image src={p.image} alt="" width={96} height={60} className={styles.cartridgeThumb} />
            <span className={styles.cartridgeName}>{p.fileName.replace(".exe", "")}</span>
            <span className={p.status === "Live" ? styles.statusLive : styles.statusWip}>
              {p.status}
            </span>
          </button>
        ))}
      </div>

      {/* key re-mounts the view so the enter animation replays on every switch */}
      <article key={project.id} role="tabpanel" className={`${styles.projectView} ${styles.stagger}`}>
        <div className={styles.screenFrame}>
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(max-width: 760px) 90vw, 640px"
            className={styles.screenImage}
          />
        </div>

        <div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.lead}>{project.tagline}</p>
        </div>

        {project.stats.length > 0 && (
          <div className={styles.statRow}>
            {project.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <ul className={styles.highlights}>
          {project.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className={styles.chips}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.chip}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          <a className={styles.buttonPrimary} href={project.liveLink} target="_blank" rel="noreferrer">
            Open live demo
          </a>
          <a className={styles.buttonSecondary} href={project.githubLink} target="_blank" rel="noreferrer">
            View source code
          </a>
        </div>
      </article>
    </div>
  );
}
