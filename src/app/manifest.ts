import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: hotel revenue reconciliation`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#fafaf7",
    theme_color: "#fafaf7",
    icons: [{ src: "/brand/aptli-mark.png", sizes: "512x512", type: "image/png" }],
  };
}
