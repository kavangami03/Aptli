import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { launchPages, site } from "@/lib/site";

/**
 * Built from launchPages in src/lib/site.ts. Only pages marked `live` are listed,
 * so the sitemap never points at a 404. Flip `live: true` when a page ships.
 * Uses a fixed date (site.lastUpdated). Never call new Date() here (Cache Components).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return launchPages
    .filter((p) => p.live)
    .map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: site.lastUpdated,
      changeFrequency: p.path === "/" ? "weekly" : "monthly",
      priority: p.priority,
    }));
}
