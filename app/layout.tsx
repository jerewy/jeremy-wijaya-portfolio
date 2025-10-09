import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeremy Wijaya - AI Engineer & Full-Stack Developer",
  description:
    "Portfolio of Jeremy Wijaya, an aspiring AI Engineer and Full-Stack Developer specializing in intelligent systems and machine learning solutions.",
  keywords:
    "AI Engineer, Machine Learning, Full-Stack Developer, Computer Science, Next.js, Python, TensorFlow",
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
    title: "Jeremy Wijaya - AI Engineer & Full-Stack Developer",
    description: "Portfolio showcasing AI and full-stack development projects",
    type: "website",
    images: [
      {
        url: '/opengraph-image.svg',
        width: 1200,
        height: 630,
        alt: "Jeremy Wijaya - AI Engineer & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jeremy Wijaya - AI Engineer & Full-Stack Developer",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
