import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Link preview card (LinkedIn, WhatsApp, X, Slack...). These platforms reject SVG,
// so Next renders this to a PNG at build time.

export const alt = "Jeremy Wijaya - Full-Stack Developer & AI Enthusiast portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const WALL = "#3d2f52";
const STRIPE = "#43345a";
const FLOOR = "#7a4b30";
const INK = "#1d1626";
const ACCENT = "#ffcc4d";
const PAPER = "#f7f0de";
const STRIPE_COUNT = 19;

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "pasfoto_jere.jpeg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: WALL }}>
        {/* Room backdrop: striped wall and a wooden floor, like the site. */}
        {Array.from({ length: STRIPE_COUNT }, (_, i) => (
          <div
            key={i}
            style={{ position: "absolute", top: 0, left: i * 64 + 32, width: 16, height: 470, background: STRIPE }}
          />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, height: 14, background: "#2a2038" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 484, bottom: 0, background: FLOOR }} />

        <div
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            top: 95,
            bottom: 95,
            display: "flex",
            alignItems: "center",
            gap: 48,
            padding: "0 56px",
            background: INK,
            border: `8px solid ${ACCENT}`,
          }}
        >
          <div style={{ display: "flex", padding: 10, background: "#d9b44a" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
            <img src={photoSrc} alt="" width={250} height={250} style={{ objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "4px 14px",
                background: ACCENT,
                color: INK,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 4,
              }}
            >
              PORTFOLIO
            </div>
            <div style={{ display: "flex", marginTop: 14, fontSize: 76, fontWeight: 700, color: PAPER }}>
              Jeremy Wijaya
            </div>
            <div style={{ display: "flex", marginTop: 6, fontSize: 34, color: "#c9bce0" }}>
              Full-Stack Developer · AI Enthusiast
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 26, fontSize: 26, color: "#8fe3a4" }}>
              <div style={{ width: 16, height: 16, marginRight: 12, background: "#3fa65a" }} />
              Frontend Developer Intern at BCA
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
