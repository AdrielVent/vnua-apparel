import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY; // e.g. "AdrielVent/VNUA"
const repoName = repository ? repository.split('/')[1] : '';
const basePath = repoName ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Automatically match the repository name for GitHub Pages subpath compatibility
  basePath: basePath,
};

export default nextConfig;

