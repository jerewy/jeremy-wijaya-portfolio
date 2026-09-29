import type { Metadata } from "next";
import ClassicPortfolio from "./classic-portfolio";

export const metadata: Metadata = {
  title: "Jeremy Wijaya - Classic Portfolio",
  // The pixel room at / is the main portfolio; keep this older layout out of search results.
  robots: { index: false, follow: false },
};

export default function ClassicPage() {
  return <ClassicPortfolio />;
}
