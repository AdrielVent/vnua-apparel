import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages uses a subpath, e.g. /vnua-apparel
  basePath: isGithubActions ? '/vnua-apparel' : '',
};

export default nextConfig;

