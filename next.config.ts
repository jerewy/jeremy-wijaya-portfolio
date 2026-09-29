import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The room used to live at /room during the redesign; it is the homepage now.
  async redirects() {
    return [{ source: "/room", destination: "/", permanent: false }];
  },
};

export default nextConfig;
