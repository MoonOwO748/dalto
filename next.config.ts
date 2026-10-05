import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old UNME host preserves paths when redirecting to this site.
      { source: '/contact', destination: '/reserve', permanent: true },
      { source: '/ko/contact', destination: '/reserve', permanent: true },
      { source: '/wp-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
    ];
  },
};

export default nextConfig;
