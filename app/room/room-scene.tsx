"use client";

import type { KeyboardEvent, ReactNode } from "react";
import styles from "./room.module.css";

// The room is drawn on a 192x108 pixel grid (16:9) and scaled up with crisp edges.
export const SCENE_W = 192;
export const SCENE_H = 108;

export type RoomObject = "computer" | "shelf" | "board" | "certs" | "phone" | "robot";

// x, y, width, height, color
type Px = [number, number, number, number, string];

function Pixels({ px }: { px: Px[] }) {
  return (
    <>
      {px.map(([x, y, w, h, fill], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </>
  );
}

// Hit areas, also used to place hover labels in the HTML layer.
export const OBJECT_BOXES: Record<RoomObject, { x: number; y: number; w: number; h: number; label: string }> = {
  computer: { x: 69, y: 41, w: 31, h: 26, label: "Projects" },
  shelf: { x: 165, y: 29, w: 25, h: 63, label: "Skills" },
  board: { x: 95, y: 9, w: 35, h: 27, label: "Resume" },
  certs: { x: 133, y: 11, w: 31, h: 17, label: "Certificates" },
  phone: { x: 101, y: 58, w: 15, h: 9, label: "Contact" },
  robot: { x: 26, y: 72, w: 18, h: 25, label: "About me" },
};

type Theme = { wall: string; stripe: string; sky: string };
const NIGHT: Theme = { wall: "#3d2f52", stripe: "#43345a", sky: "#1b2a55" };
const DAY: Theme = { wall: "#7d6aa0", stripe: "#8674a8", sky: "#8fd3ff" };

// Wall and floor run far past the 192x108 frame. The SVG paints overflow, so on
// screens wider or taller than 16:9 the room fills the space instead of leaving bars.
const BLEED = 400;
const FULL_X = -BLEED;
const FULL_W = SCENE_W + BLEED * 2;
const STRIPES = Math.ceil(FULL_W / 16);

const wall = (t: Theme): Px[] => [
  [FULL_X, -BLEED, FULL_W, 70 + BLEED, t.wall],
  ...Array.from({ length: STRIPES }, (_, i): Px => [FULL_X + i * 16 + 8, -BLEED, 4, 68 + BLEED, t.stripe]),
];

const WINDOW_BOX = { x: 14, y: 8, w: 40, h: 36 };

const PLANK_ROWS = 6 + Math.ceil(BLEED / 6);

const ROOM: Px[] = [
  [FULL_X, 66, FULL_W, 4, "#2a2038"],
  // floor planks
  [FULL_X, 70, FULL_W, 38 + BLEED, "#7a4b30"],
  ...Array.from({ length: PLANK_ROWS }, (_, i): Px => [FULL_X, 75 + i * 6, FULL_W, 1, "#6a4028"]),
  // plank seams, staggered so rows don't line up
  ...Array.from({ length: PLANK_ROWS * 6 }, (_, i): Px => [
    FULL_X + ((i * 97) % FULL_W),
    71 + Math.floor(i / 6) * 6,
    1,
    5,
    "#6a4028",
  ]),
  // rug
  [52, 97, 76, 8, "#8e3b46"],
  [50, 99, 80, 4, "#8e3b46"],
  [56, 99, 68, 4, "#b9525e"],
  [60, 100, 60, 2, "#8e3b46"],
];

const windowFrame = (t: Theme): Px[] => [
  [14, 8, 4, 38, "#a23b4a"],
  [50, 8, 4, 38, "#a23b4a"],
  [15, 8, 2, 38, "#b84b5a"],
  [18, 10, 32, 30, "#c9a26b"],
  [20, 12, 28, 26, t.sky],
];

const WINDOW_BARS: Px[] = [
  [33, 12, 2, 26, "#c9a26b"],
  [20, 24, 28, 2, "#c9a26b"],
  [16, 40, 36, 3, "#b08a55"],
];

const MOON: Px[] = [
  // full moon, rounded by trimming the corners
  [41, 14, 4, 1, "#f5e6a8"],
  [40, 15, 6, 4, "#f5e6a8"],
  [41, 19, 4, 1, "#f5e6a8"],
  [41, 16, 1, 1, "#d9c98a"],
  [43, 17, 2, 1, "#d9c98a"],
];

const SUN_AND_CLOUDS: Px[] = [
  [40, 14, 5, 1, "#ffd84d"],
  [39, 15, 7, 4, "#ffd84d"],
  [40, 19, 5, 1, "#ffd84d"],
  [22, 29, 9, 3, "#ffffff"],
  [24, 27, 5, 2, "#ffffff"],
  [38, 31, 8, 2, "#ffffff"],
];

// Afternoon light falling from the window onto the floor.
const SUNBEAM = "54,43 86,108 150,108 70,43";

const STARS: Px[] = [
  [23, 15, 1, 1, "#fff"],
  [29, 19, 1, 1, "#fff"],
  [37, 29, 1, 1, "#fff"],
  [24, 32, 1, 1, "#fff"],
  [45, 33, 1, 1, "#fff"],
];

const DESK: Px[] = [
  [58, 66, 66, 3, "#9c6b43"],
  [58, 66, 66, 1, "#b98458"],
  [60, 69, 3, 26, "#7a5232"],
  [119, 69, 3, 26, "#7a5232"],
  [100, 69, 19, 10, "#8a5b37"],
  [108, 73, 3, 1, "#d9b44a"],
  // mug
  [117, 61, 4, 5, "#e8e2d0"],
  [121, 62, 1, 2, "#e8e2d0"],
];

const COMPUTER: Px[] = [
  [70, 42, 29, 20, "#d8d4c8"],
  [70, 61, 29, 1, "#b3ae9f"],
  [73, 45, 23, 14, "#0e3b2e"],
  [81, 62, 7, 4, "#b3ae9f"],
  [72, 64, 25, 2, "#cfcabb"],
];

// Two copies of the same 12-row block so the scroll loops seamlessly.
const CODE_BLOCK: [number, number, string][] = [
  [0, 10, "#4ade80"],
  [2, 15, "#4ade80"],
  [2, 9, "#86efac"],
  [4, 12, "#4ade80"],
  [2, 6, "#facc15"],
  [0, 8, "#4ade80"],
];
const CODE: Px[] = [0, 12].flatMap((offset) =>
  CODE_BLOCK.map(([indent, width, color], row): Px => [75 + indent, 47 + offset + row * 2, width, 1, color])
);

const CURSOR: Px[] = [[90, 57, 2, 1, "#86efac"]];

const SHELF: Px[] = [
  [166, 30, 23, 61, "#6b4226"],
  [168, 32, 19, 57, "#3a2415"],
  [168, 44, 19, 2, "#6b4226"],
  [168, 58, 19, 2, "#6b4226"],
  [168, 72, 19, 2, "#6b4226"],
  // books, shelf by shelf
  [169, 35, 3, 9, "#c0392b"], [172, 34, 2, 10, "#2e86de"], [174, 36, 3, 8, "#f1c40f"],
  [178, 35, 2, 9, "#27ae60"], [180, 37, 5, 2, "#8e44ad"], [180, 39, 5, 2, "#e67e22"],
  [180, 41, 5, 3, "#16a085"],
  [169, 49, 2, 9, "#e67e22"], [171, 48, 3, 10, "#34495e"], [174, 50, 2, 8, "#c0392b"],
  [177, 49, 3, 9, "#2e86de"], [181, 51, 4, 7, "#9b59b6"],
  [169, 63, 4, 9, "#27ae60"], [173, 62, 2, 10, "#f1c40f"], [176, 64, 3, 8, "#c0392b"],
  [180, 66, 5, 6, "#b98458"], [181, 64, 3, 2, "#4ade80"],
  [169, 77, 3, 12, "#2e86de"], [172, 78, 3, 11, "#e67e22"], [176, 80, 8, 9, "#8e3b46"],
];

const BOARD: Px[] = [
  [96, 10, 33, 25, "#8a5a36"],
  [98, 12, 29, 21, "#c68d52"],
  // resume page
  [101, 14, 12, 17, "#f2efe6"],
  [103, 17, 8, 1, "#3d2f52"],
  [103, 20, 7, 1, "#8899aa"],
  [103, 22, 8, 1, "#8899aa"],
  [103, 24, 6, 1, "#8899aa"],
  [103, 26, 8, 1, "#8899aa"],
  [106, 13, 2, 2, "#e74c3c"],
  // sticky notes
  [116, 15, 8, 8, "#f7dc6f"],
  [117, 17, 6, 1, "#b7950b"],
  [117, 19, 4, 1, "#b7950b"],
  [117, 25, 7, 6, "#85c1e9"],
];

const CERTS: Px[] = [
  [134, 12, 13, 15, "#d9b44a"],
  [136, 14, 9, 11, "#f3ead0"],
  [138, 16, 5, 1, "#8a6d2b"],
  [138, 18, 5, 1, "#b8a66e"],
  [139, 21, 3, 3, "#c0392b"],
  [150, 12, 13, 15, "#d9b44a"],
  [152, 14, 9, 11, "#f3ead0"],
  [154, 16, 5, 1, "#8a6d2b"],
  [154, 18, 5, 1, "#b8a66e"],
  [155, 21, 3, 3, "#2e86de"],
];

const PHONE: Px[] = [
  [102, 62, 13, 4, "#c0392b"],
  [103, 60, 11, 2, "#e04b3b"],
  [101, 59, 3, 2, "#e04b3b"],
  [113, 59, 3, 2, "#e04b3b"],
  [106, 63, 5, 2, "#f2efe6"],
];

const ROBOT: Px[] = [
  [34, 72, 1, 4, "#9fb3c8"],
  [33, 71, 3, 2, "#ff6b6b"],
  [29, 76, 12, 9, "#9fb3c8"],
  [30, 77, 10, 7, "#c9d6e3"],
  [28, 86, 14, 8, "#7f93a8"],
  [32, 88, 6, 3, "#5ef0ff"],
  [27, 94, 16, 3, "#2c2c3a"],
];

const ROBOT_EYES: Px[] = [
  [32, 79, 2, 2, "#1b2a55"],
  [36, 79, 2, 2, "#1b2a55"],
];

const PLANT: Px[] = [
  [150, 84, 10, 9, "#b5651d"],
  [149, 83, 12, 2, "#c97a32"],
  [154, 72, 2, 11, "#2f6f3a"],
  [150, 74, 4, 3, "#3f8f4a"],
  [156, 70, 4, 3, "#3f8f4a"],
  [149, 78, 5, 3, "#4fae5a"],
  [156, 76, 5, 3, "#4fae5a"],
];

export type HoverTarget = RoomObject | "window";

type SceneProps = {
  isNight: boolean;
  onOpen: (object: RoomObject) => void;
  onHover: (target: HoverTarget | null) => void;
  onToggleNight: () => void;
};

export function RoomScene({ isNight, onOpen, onHover, onToggleNight }: SceneProps) {
  const theme = isNight ? NIGHT : DAY;

  const interactive = (
    id: HoverTarget,
    box: { x: number; y: number; w: number; h: number },
    label: string,
    onActivate: () => void,
    children: ReactNode
  ) => (
    <g
      className={styles.obj}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={onActivate}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      onPointerEnter={() => onHover(id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
    >
      {/* Invisible hit area so thin objects are still easy to click. */}
      <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="transparent" />
      {children}
    </g>
  );

  const obj = (id: RoomObject, children: ReactNode) =>
    interactive(id, OBJECT_BOXES[id], OBJECT_BOXES[id].label, () => onOpen(id), children);

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className={styles.scene}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Jeremy's pixel-art room"
    >
      <defs>
        <clipPath id="screen-clip">
          <rect x={74} y={46} width={21} height={12} />
        </clipPath>
      </defs>
      <Pixels px={wall(theme)} />
      <Pixels px={ROOM} />
      {interactive(
        "window",
        WINDOW_BOX,
        isNight ? "Window: switch to day" : "Window: switch to night",
        onToggleNight,
        <>
          <Pixels px={windowFrame(theme)} />
          {isNight ? (
            <>
              <g className={styles.twinkle}>
                <Pixels px={STARS} />
              </g>
              <Pixels px={MOON} />
            </>
          ) : (
            <g className={styles.clouds}>
              <Pixels px={SUN_AND_CLOUDS} />
            </g>
          )}
          <Pixels px={WINDOW_BARS} />
        </>
      )}
      {!isNight && <polygon points={SUNBEAM} fill="#fff4c2" opacity={0.08} pointerEvents="none" />}
      <Pixels px={DESK} />
      <Pixels px={PLANT} />
      {obj("board", <Pixels px={BOARD} />)}
      {obj("certs", <Pixels px={CERTS} />)}
      {obj("shelf", <Pixels px={SHELF} />)}
      {obj(
        "computer",
        <>
          <Pixels px={COMPUTER} />
          <g clipPath="url(#screen-clip)">
            <g className={styles.codeScroll}>
              <Pixels px={CODE} />
            </g>
          </g>
          <g className={styles.blink}>
            <Pixels px={CURSOR} />
          </g>
        </>
      )}
      {obj("phone", <Pixels px={PHONE} />)}
      {obj(
        "robot",
        <g className={styles.robotBob}>
          <Pixels px={ROBOT} />
          <g className={styles.robotEyes}>
            <Pixels px={ROBOT_EYES} />
          </g>
        </g>
      )}
    </svg>
  );
}
