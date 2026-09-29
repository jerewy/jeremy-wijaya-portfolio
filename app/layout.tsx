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
  metadataBase: new URL('http://localhost:3003'),
  openGraph: {
    title: "Jeremy Wijaya - Full-Stack Developer & AI Enthusiast",
    description: "Portfolio showcasing AI and full-stack development projects",
    type: "website",
    images: [
      {
        url: '/opengraph-image.svg',
        width: 1200,
        height: 630,
        alt: "Jeremy Wijaya - Full-Stack Developer & AI Enthusiast",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jeremy Wijaya - Full-Stack Developer & AI Enthusiast",
    description: "Portfolio showcasing AI and full-stack development projects",
    images: ['/twitter-image.svg'],
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
