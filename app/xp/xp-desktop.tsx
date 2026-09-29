"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import styles from "./xp.module.css";
import { projects, CV_PATH } from "./data";
import {
  AboutApp,
  ContactApp,
  ProjectApp,
  ProjectsApp,
  WelcomeApp,
  type AppKind,
} from "./xp-apps";
import {
  ComputerIcon,
  DocumentIcon,
  ExeIcon,
  FolderIcon,
  MailIcon,
  StartOrb,
} from "./xp-icons";

type Win = {
  id: string;
  kind: AppKind;
  projectId?: string;
  title: string;
  x: number;
  y: number;
  width: number;
  z: number;
  isMinimized: boolean;
  isMaximized: boolean;
};

const APP_META: Record<Exclude<AppKind, "project">, { title: string; width: number }> = {
  welcome: { title: "Welcome", width: 520 },
  projects: { title: "My Projects", width: 560 },
  about: { title: "System Properties", width: 440 },
  contact: { title: "Contact", width: 400 },
};

const DEEP_LINKABLE: AppKind[] = ["welcome", "projects", "about", "contact"];
// Each new window opens a little lower and to the right of the previous one.
const CASCADE_STEP = 28;

// Touch screens have no real double-click, so a single tap opens things there.
const isCoarsePointer = () => window.matchMedia("(pointer: coarse)").matches;

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    tick();
    const timer = setInterval(tick, 15_000);
    return () => clearInterval(timer);
  }, []);
  return time;
}

export default function XpDesktop() {
  const [windows, setWindows] = useState<Win[]>([]);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const zCounter = useRef(1);
  const time = useClock();

  const focus = useCallback((id: string) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, z, isMinimized: false } : w))
    );
  }, []);

  const open = useCallback(
    (kind: AppKind, projectId?: string) => {
      setIsStartOpen(false);
      const id = projectId ? `project-${projectId}` : kind;
      zCounter.current += 1;
      const z = zCounter.current;
      setWindows((prev) => {
        if (prev.some((w) => w.id === id)) {
          return prev.map((w) => (w.id === id ? { ...w, z, isMinimized: false } : w));
        }
        const project = projects.find((p) => p.id === projectId);
        const meta =
          kind === "project"
            ? { title: project?.fileName ?? "Project", width: 520 }
            : APP_META[kind];
        const offset = (prev.length % 6) * CASCADE_STEP;
        const next: Win = {
          id,
          kind,
          projectId,
          title: meta.title,
          width: meta.width,
          x: 140 + offset,
          y: 40 + offset,
          z,
          isMinimized: false,
          isMaximized: false,
        };
        return [...prev, next];
      });
    },
    []
  );

  const close = (id: string) => setWindows((prev) => prev.filter((w) => w.id !== id));
  const patch = (id: string, changes: Partial<Win>) =>
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, ...changes } : w)));

  // ?open=projects lets you send a recruiter straight to one window.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("open");
    const kind = DEEP_LINKABLE.find((k) => k === requested);
    open(kind ?? "welcome");
  }, [open]);

  const topId = windows.reduce<Win | null>(
    (top, w) => (!w.isMinimized && (!top || w.z > top.z) ? w : top),
    null
  )?.id;

  const renderContent = (win: Win): ReactNode => {
    switch (win.kind) {
      case "welcome":
        return <WelcomeApp open={open} />;
      case "projects":
        return <ProjectsApp open={open} />;
      case "about":
        return <AboutApp />;
      case "contact":
        return <ContactApp />;
      case "project": {
        const project = projects.find((p) => p.id === win.projectId);
        return project ? <ProjectApp project={project} /> : null;
      }
    }
  };

  const desktopIcons = [
    { label: "My Computer", icon: <ComputerIcon />, onOpen: () => open("about") },
    { label: "My Projects", icon: <FolderIcon />, onOpen: () => open("projects") },
    {
      label: "Resume.pdf",
      icon: <DocumentIcon />,
      onOpen: () => window.open(CV_PATH, "_blank", "noreferrer"),
    },
    { label: "Contact", icon: <MailIcon />, onOpen: () => open("contact") },
    { label: "Welcome", icon: <ExeIcon />, onOpen: () => open("welcome") },
  ];

  return (
    <div className={styles.screen} onPointerDown={() => setIsStartOpen(false)}>
      <div className={styles.desktop}>
        <ul className={styles.icons}>
          {desktopIcons.map((item) => (
            <li key={item.label}>
              <button
                aria-label={item.label}
                className={styles.desktopIcon}
                onClick={() => isCoarsePointer() && item.onOpen()}
                onDoubleClick={item.onOpen}
                onKeyDown={(e) => e.key === "Enter" && item.onOpen()}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {windows.map((win) => (
          <XpWindow
            key={win.id}
            win={win}
            isActive={win.id === topId}
            onFocus={() => focus(win.id)}
            onClose={() => close(win.id)}
            onMinimize={() => patch(win.id, { isMinimized: true })}
            onToggleMaximize={() => patch(win.id, { isMaximized: !win.isMaximized })}
            onMove={(x, y) => patch(win.id, { x, y })}
          >
            {renderContent(win)}
          </XpWindow>
        ))}
      </div>

      {isStartOpen && (
        <div className={styles.startMenu} onPointerDown={(e) => e.stopPropagation()}>
          <div className={styles.startHeader}>Jeremy Wijaya</div>
          <div className={styles.startBody}>
            {desktopIcons.map((item) => (
              <button
                key={item.label}
                className={styles.startItem}
                onClick={() => {
                  setIsStartOpen(false);
                  item.onOpen();
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.startFooter}>
            <Link href="/classic" className={styles.startFooterLink}>
              Classic view
            </Link>
          </div>
        </div>
      )}

      <footer className={styles.taskbar}>
        <button
          className={styles.startButton}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setIsStartOpen((v) => !v)}
          aria-expanded={isStartOpen}
        >
          <StartOrb />
          <span>start</span>
        </button>
        <div className={styles.taskButtons}>
          {windows.map((win) => (
            <button
              key={win.id}
              className={`${styles.taskButton} ${win.id === topId ? styles.taskButtonActive : ""}`}
              onClick={() =>
                win.id === topId ? patch(win.id, { isMinimized: true }) : focus(win.id)
              }
            >
              {win.title}
            </button>
          ))}
        </div>
        <div className={styles.tray}>{time}</div>
      </footer>
    </div>
  );
}

type XpWindowProps = {
  win: Win;
  isActive: boolean;
  children: ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
};

function XpWindow({
  win,
  isActive,
  children,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
}: XpWindowProps) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const onTitlePointerDown = (e: React.PointerEvent) => {
    if (win.isMaximized || (e.target as HTMLElement).closest("button")) return;
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onTitlePointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    // Keep the title bar reachable so a window can never be lost off-screen.
    const x = Math.min(Math.max(e.clientX - drag.current.dx, -win.width + 80), window.innerWidth - 80);
    const y = Math.min(Math.max(e.clientY - drag.current.dy, 0), window.innerHeight - 70);
    onMove(x, y);
  };

  return (
    <section
      role="dialog"
      aria-label={win.title}
      className={`${styles.window} ${isActive ? "" : styles.windowInactive} ${
        win.isMaximized ? styles.windowMax : ""
      }`}
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        zIndex: win.z,
        display: win.isMinimized ? "none" : undefined,
      }}
      onPointerDown={onFocus}
    >
      <header
        className={styles.titleBar}
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={() => (drag.current = null)}
        onDoubleClick={onToggleMaximize}
      >
        <span className={styles.titleText}>{win.title}</span>
        <div className={styles.titleControls}>
          <button aria-label="Minimize" className={styles.ctrl} onClick={onMinimize}>
            _
          </button>
          <button aria-label="Maximize" className={styles.ctrl} onClick={onToggleMaximize}>
            □
          </button>
          <button aria-label="Close" className={`${styles.ctrl} ${styles.ctrlClose}`} onClick={onClose}>
            ×
          </button>
        </div>
      </header>
      <div className={styles.windowBody}>{children}</div>
    </section>
  );
}
