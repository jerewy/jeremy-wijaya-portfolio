"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./room.module.css";
import {
  OBJECT_BOXES,
  RoomScene,
  SCENE_H,
  SCENE_W,
  type HoverTarget,
  type RoomObject,
} from "./room-scene";
import { PANEL_META, PanelContent } from "./panels";
import { PixelIcon } from "./pixel-icons";
import { botLines } from "./room-data";
import { RoomAudioContext, useRoomAudio } from "./use-room-audio";

// Status line on the title bar. Set to null to hide it.
const AVAILABILITY: string | null = "Now: Frontend Developer Intern at BCA";

// Hidden for now: flip to true to show the link back to the classic homepage.
const SHOW_CLASSIC_LINK = false;

const SHORT_SCREEN_QUERY = "(max-height: 500px)";

const HUD_ORDER: RoomObject[] = [
  "robot",
  "computer",
  "shelf",
  "board",
  "certs",
  "phone",
];
// Matches the panel exit animation in room.module.css.
const PANEL_EXIT_MS = 140;
const TYPE_SPEED_MS = 18;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

function useTypewriter(text: string, onChar: () => void) {
  const [count, setCount] = useState(0);
  const onCharRef = useRef(onChar);
  onCharRef.current = onChar;
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    setCount(0);
    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) clearInterval(timer);
        // A soft blip every third letter, like RPG dialogue.
        else if (c % 3 === 0 && text[c] !== " ") onCharRef.current();
        return Math.min(c + 1, text.length);
      });
    }, TYPE_SPEED_MS);
    return () => clearInterval(timer);
  }, [text]);
  return { shown: text.slice(0, count), isDone: count >= text.length };
}

export default function PixelRoom({ fontClass }: { fontClass: string }) {
  const [openObject, setOpenObject] = useState<RoomObject | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [hovered, setHovered] = useState<HoverTarget | null>(null);
  const [visited, setVisited] = useState<Set<RoomObject>>(new Set());
  const [botLine, setBotLine] = useState(botLines.intro);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [isNight, setIsNight] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);
  const audio = useRoomAudio();
  const { sfx } = audio;
  const { shown, isDone } = useTypewriter(botLine, () => sfx("type"));
  const visitedRef = useRef(visited);
  visitedRef.current = visited;

  const open = useCallback(
    (object: RoomObject) => {
      sfx("open");
      if (!visitedRef.current.has(object)) setTimeout(() => sfx("check"), 220);
      setIsClosing(false);
      setOpenObject(object);
      setVisited((prev) => new Set(prev).add(object));
    },
    [sfx],
  );

  const close = useCallback(() => {
    sfx("close");
    setIsClosing(true);
    setTimeout(() => {
      setOpenObject(null);
      setIsClosing(false);
    }, PANEL_EXIT_MS);
  }, [sfx]);

  const onHover = (target: HoverTarget | null) => {
    setHovered(target);
    if (target) {
      sfx("hover");
      setBotLine(botLines[target]);
    }
  };

  const toggleNight = () => {
    sfx("toggle");
    setIsNight((v) => !v);
  };

  // Once everything has been seen, Bit nudges the visitor toward contact.
  useEffect(() => {
    if (!openObject && visited.size === HUD_ORDER.length)
      setBotLine(botLines.done);
  }, [openObject, visited]);

  // Landscape phones are too short for the dialog and the room; start with Bit collapsed.
  useEffect(() => {
    if (window.matchMedia(SHORT_SCREEN_QUERY).matches) setIsDialogOpen(false);
  }, []);

  // On portrait phones the room is wider than the screen; start centered on the desk.
  useEffect(() => {
    const el = viewportRef.current;
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && openObject && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openObject, close]);

  const hoverBox =
    hovered && hovered !== "window" ? OBJECT_BOXES[hovered] : null;
  const meta = openObject ? PANEL_META[openObject] : null;

  return (
    <RoomAudioContext.Provider value={sfx}>
      <main className={`${styles.page} ${fontClass}`}>
        {/* Always visible, so first-time visitors know whose portfolio this is. */}
        <header className={styles.nameplate}>
          <p className={styles.nameplateEyebrow}>Portfolio</p>
          <h1 className={styles.nameplateName}>Jeremy Wijaya</h1>
          <p className={styles.nameplateRole}>Full-Stack Developer · AI Enthusiast</p>
          {AVAILABILITY && (
            <p className={styles.availability}>
              <span className={styles.availabilityDot} aria-hidden />
              {AVAILABILITY}
            </p>
          )}
        </header>

        <div ref={viewportRef} className={styles.viewport}>
          <div className={styles.stage}>
            <RoomScene
              isNight={isNight}
              onOpen={open}
              onHover={onHover}
              onToggleNight={toggleNight}
            />

            {hoverBox && !openObject && (
              <div
                className={styles.hoverLabel}
                style={{
                  left: pct(hoverBox.x + hoverBox.w / 2, SCENE_W),
                  top: pct(hoverBox.y, SCENE_H),
                }}
              >
                {hoverBox.label}
              </div>
            )}
          </div>
        </div>

        {isDialogOpen ? (
          <div className={styles.dialog} role="status">
            <div className={styles.dialogPortrait}>
              <PixelIcon name="robot" size={36} />
            </div>
            <div className={styles.dialogText}>
              <span className={styles.dialogName}>Bit</span>
              <p>
                {shown}
                {isDone && (
                  <span className={styles.dialogCursor} aria-hidden>
                    ▼
                  </span>
                )}
              </p>
            </div>
            <button
              className={styles.dialogHide}
              onClick={() => setIsDialogOpen(false)}
              aria-label="Hide Bit"
            >
              ×
            </button>
          </div>
        ) : (
          <button
            className={styles.dialogShow}
            onClick={() => setIsDialogOpen(true)}
          >
            <PixelIcon name="robot" size={18} /> Talk to Bit
          </button>
        )}

        {/* Every section is also one click away here, for visitors who skip the room. */}
        <nav className={styles.hud} aria-label="Sections">
          <div className={styles.hudButtons}>
            {HUD_ORDER.map((object) => (
              <button
                key={object}
                className={`${styles.hudButton} ${visited.has(object) ? styles.hudVisited : ""}`}
                onClick={() => open(object)}
                onPointerEnter={() => setBotLine(botLines[object])}
              >
                <PixelIcon name={PANEL_META[object].icon} />
                <span className={styles.hudLabel}>{PANEL_META[object].title}</span>
                {PANEL_META[object].shortTitle && (
                  <span className={styles.hudLabelShort} aria-hidden>
                    {PANEL_META[object].shortTitle}
                  </span>
                )}
                {visited.has(object) && (
                  <span className={styles.hudCheck} aria-label="visited">
                    <PixelIcon name="check" size={12} />
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className={styles.hudRight}>
            <button
              className={`${styles.soundButton} ${audio.isOn ? styles.soundOn : ""}`}
              onClick={audio.toggle}
              aria-pressed={audio.isOn}
              aria-label={audio.isOn ? "Turn sound off" : "Turn sound on"}
            >
              <PixelIcon name={audio.isOn ? "speaker" : "mute"} size={18} />
              <span>{audio.isOn ? "Sound on" : "Sound off"}</span>
            </button>
            <div
              className={styles.progress}
              aria-label={`Explored ${visited.size} of ${HUD_ORDER.length}`}
            >
              <span className={styles.progressLabel}>Explored</span>
              <span className={styles.progressBar}>
                <span
                  className={styles.progressFill}
                  style={{ width: pct(visited.size, HUD_ORDER.length) }}
                />
              </span>
              <span className={styles.progressCount}>
                {visited.size}/{HUD_ORDER.length}
              </span>
            </div>
            {SHOW_CLASSIC_LINK && (
              <Link href="/classic" className={styles.hudLink}>
                Classic view
              </Link>
            )}
          </div>
        </nav>

        {openObject && meta && (
          <div
            className={`${styles.backdrop} ${isClosing ? styles.backdropClosing : ""}`}
            onClick={close}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-label={meta.title}
              className={`${styles.panel} ${meta.isWide ? styles.panelWide : ""} ${
                isClosing ? styles.panelClosing : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <header className={styles.panelHeader}>
                <span className={styles.panelIcon}>
                  <PixelIcon name={meta.icon} size={24} />
                </span>
                <div>
                  <p className={styles.panelSubtitle}>{meta.subtitle}</p>
                  <h2 className={styles.panelTitle}>{meta.title}</h2>
                </div>
                <button
                  className={styles.panelClose}
                  aria-label="Close"
                  onClick={close}
                  autoFocus
                >
                  ×
                </button>
              </header>
              <div className={styles.panelBody}>
                <PanelContent object={openObject} onNavigate={open} />
              </div>
            </section>
          </div>
        )}
      </main>
    </RoomAudioContext.Provider>
  );
}
