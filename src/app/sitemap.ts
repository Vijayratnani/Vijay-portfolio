import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { posts } from "@/content/writing";
import { projects } from "@/data/projects";

// Required for the static export used on GitHub Pages.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const published = posts.filter((p) => p.status === "published");
  return [
    { url: siteUrl, priority: 1 },
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, priority: 0.8 })),
    ...(published.length ? [{ url: `${siteUrl}/writing`, priority: 0.6 }] : []),
    ...published.map((p) => ({ url: `${siteUrl}/writing/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
}
