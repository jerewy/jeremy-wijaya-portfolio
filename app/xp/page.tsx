import type { Metadata } from "next";
import XpDesktop from "./xp-desktop";

export const metadata: Metadata = {
  title: "Jeremy Wijaya - Desktop",
  description: "Jeremy Wijaya's portfolio as an XP-style desktop.",
  // Unfinished mockup: reachable by URL but kept out of search results.
  robots: { index: false, follow: false },
};

export default function XpPage() {
  return <XpDesktop />;
}
