import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered to PNG at build time. Social platforms (X, LinkedIn, Facebook,
// WhatsApp) do not render SVG previews, so this replaces the old .svg cards.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0c1027 0%, #1b1533 55%, #2b1a1f 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            color: "#D37B55",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#D37B55",
            }}
          />
          Portfolio
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 700,
            marginTop: 28,
            lineHeight: 1.05,
          }}
        >
          Jeremy Wijaya
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 44,
            marginTop: 16,
            color: "#cbd5e1",
          }}
        >
          AI Engineer &amp; Full-Stack Developer
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginTop: 40,
            color: "#94a3b8",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Computer Science student specializing in Intelligent Systems, building
          AI solutions with real-world impact.
        </div>
      </div>
    ),
    size
  );
}
