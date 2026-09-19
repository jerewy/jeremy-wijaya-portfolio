/**
 * Canonical origin for absolute URLs (metadata, OG images, sitemap).
 *
 * Resolution order matters: NEXT_PUBLIC_SITE_URL is the only value that
 * survives a custom domain, so it wins. VERCEL_URL is set automatically on
 * preview deploys and keeps their OG tags self-referential instead of
 * pointing at production. localhost is the dev fallback.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteConfig = {
  name: "Jeremy Wijaya",
  title: "Jeremy Wijaya — AI Engineer & Full-Stack Developer",
  description:
    "Portfolio of Jeremy Wijaya, a Computer Science student specializing in Intelligent Systems, building AI solutions that drive positive societal change.",
  url: siteUrl,
} as const;
