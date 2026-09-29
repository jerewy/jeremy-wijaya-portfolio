import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Pixelify_Sans, Press_Start_2P } from "next/font/google";
import PixelRoom from "./room/pixel-room";

// Pixel display face for titles and UI, a plain sans for reading, mono for labels.
const display = Pixelify_Sans({ subsets: ["latin"], variable: "--font-display" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
// Pixelify's digits blur together (3/5/8); this arcade face keeps numbers legible.
const numbers = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-numbers" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Jeremy Wijaya · Full-Stack Developer & AI Enthusiast Portfolio",
  description:
    "Portfolio of Jeremy Wijaya, a full-stack developer and AI enthusiast. Explore projects, skills, and resume in an interactive pixel-art room.",
};

export default function RoomPage() {
  return <PixelRoom fontClass={`${display.variable} ${body.variable} ${mono.variable} ${numbers.variable}`} />;
}
