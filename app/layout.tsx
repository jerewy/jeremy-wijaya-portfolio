import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { siteConfig, siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  // Absolute URLs for OG/Twitter cards are resolved against this. Hardcoding
  // localhost here silently breaks every shared link in production.
  metadataBase: new URL(siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Full-Stack Developer",
    "Computer Science",
    "Next.js",
    "Python",
    "TensorFlow",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    // images are supplied by app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    // images are supplied by app/twitter-image.tsx
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth scroll-pt-20"
      suppressHydrationWarning
    >
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
