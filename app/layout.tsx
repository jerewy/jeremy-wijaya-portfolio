import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeremy Wijaya - AI Engineer & Full-Stack Developer",
  description:
    "Portfolio of Jeremy Wijaya, an aspiring AI Engineer and Full-Stack Developer specializing in intelligent systems and machine learning solutions.",
  keywords:
    "AI Engineer, Machine Learning, Full-Stack Developer, Computer Science, Next.js, Python, TensorFlow",
  authors: [{ name: "Jeremy Wijaya" }],
  openGraph: {
    title: "Jeremy Wijaya - AI Engineer & Full-Stack Developer",
    description: "Portfolio showcasing AI and full-stack development projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
