import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// GITHUB_PAGES=true builds a static export served from /Vijay-portfolio/ on GitHub Pages
// (see .github/workflows/pages.yml). Otherwise it's a normal Next.js server build (local, Vercel).
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? "/Vijay-portfolio" : "";

// Cache Components stays off: static export (GitHub Pages) needs `dynamic = "force-static"` on
// metadata routes, which Cache Components rejects, and this site has no request-time data.
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(pages && {
    output: "export",
    basePath,
    // /projects/x/index.html, which GitHub Pages serves without extra config.
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
