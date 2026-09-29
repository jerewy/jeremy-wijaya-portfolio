// Tiny 12x12 pixel icons for the HUD and panels, drawn to match the room.

type Px = [number, number, number, number];

const ICONS = {
  robot: [[5, 0, 2, 2], [2, 2, 8, 6], [1, 9, 10, 3]] as Px[],
  monitor: [[1, 1, 10, 7], [5, 8, 2, 2], [3, 10, 6, 2]] as Px[],
  book: [[1, 1, 3, 10], [5, 2, 2, 9], [8, 1, 3, 10]] as Px[],
  paper: [[2, 0, 8, 12]] as Px[],
  medal: [[3, 0, 2, 4], [7, 0, 2, 4], [2, 4, 8, 8]] as Px[],
  phone: [[1, 2, 10, 3], [0, 3, 2, 2], [10, 3, 2, 2], [2, 6, 8, 6]] as Px[],
  github: [[3, 0, 6, 2], [1, 2, 10, 7], [0, 4, 2, 3], [10, 4, 2, 3], [3, 9, 2, 3], [7, 9, 2, 3]] as Px[],
  linkedin: [[0, 0, 12, 12]] as Px[],
  mail: [[0, 2, 12, 8]] as Px[],
  check: [[1, 6, 2, 2], [3, 8, 2, 2], [5, 6, 2, 2], [7, 4, 2, 2], [9, 2, 2, 2]] as Px[],
  speaker: [[0, 4, 3, 4], [3, 3, 1, 6], [4, 2, 1, 8], [5, 1, 1, 10], [7, 5, 1, 2], [8, 3, 1, 1], [8, 8, 1, 1], [9, 4, 1, 4], [10, 2, 1, 1], [10, 9, 1, 1], [11, 3, 1, 6]] as Px[],
  mute: [[0, 4, 3, 4], [3, 3, 1, 6], [4, 2, 1, 8], [5, 1, 1, 10], [7, 3, 1, 1], [8, 4, 1, 1], [9, 5, 2, 2], [11, 3, 1, 1], [10, 4, 1, 1], [8, 7, 1, 1], [7, 8, 1, 1], [10, 7, 1, 1], [11, 8, 1, 1]] as Px[],
};

// Details punched out of the solid shapes above.
const HOLES: Partial<Record<keyof typeof ICONS, Px[]>> = {
  robot: [[4, 4, 1, 2], [7, 4, 1, 2]],
  monitor: [[2, 2, 8, 5]],
  paper: [[4, 3, 4, 1], [4, 6, 4, 1], [4, 9, 3, 1]],
  medal: [[5, 7, 2, 2]],
  phone: [[5, 8, 2, 2]],
  github: [[3, 4, 2, 2], [7, 4, 2, 2]],
  linkedin: [[2, 5, 2, 5], [2, 2, 2, 2], [6, 5, 2, 5], [8, 6, 2, 4]],
  mail: [[1, 3, 2, 1], [3, 4, 2, 1], [5, 5, 2, 1], [7, 4, 2, 1], [9, 3, 2, 1]],
};

export type PixelIconName = keyof typeof ICONS;

export function PixelIcon({ name, size = 16 }: { name: PixelIconName; size?: number }) {
  const holes = HOLES[name] ?? [];
  const maskId = `pixel-icon-${name}`;
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden>
      {holes.length > 0 && (
        <mask id={maskId}>
          <rect width="12" height="12" fill="#fff" />
          {holes.map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="#000" />
          ))}
        </mask>
      )}
      <g fill="currentColor" mask={holes.length > 0 ? `url(#${maskId})` : undefined}>
        {ICONS[name].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} />
        ))}
      </g>
    </svg>
  );
}
