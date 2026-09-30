import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeremy Wijaya - Full-Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Jeremy Wijaya, a full-stack developer and AI enthusiast studying Intelligent Systems at BINUS University.",
  keywords:
    "Full-Stack Developer, Frontend Developer, Machine Learning, AI, Computer Science, Next.js, Python, TensorFlow",
  authors: [{ name: "Jeremy Wijaya" }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
    other: [
      {
        rel: 'manifest',
        url: '/manifest.json',
      },
    ],
  },
  // Absolute base for link-preview URLs. Vercel sets this to the production domain;
  // local builds fall back to the dev server.
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  // The preview image comes from app/opengraph-image.tsx (a PNG; platforms reject SVG).
  openGraph: {
    title: "Jeremy Wijaya - Full-Stack Developer & AI Enthusiast",
    description:
      "Explore my portfolio: projects, skills, and resume in an interactive pixel-art room.",
    type: "website",
    url: "/",
    siteName: "Jeremy Wijaya",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jeremy Wijaya - Full-Stack Developer & AI Enthusiast",
    description:
      "Explore my portfolio: projects, skills, and resume in an interactive pixel-art room.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-20" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
