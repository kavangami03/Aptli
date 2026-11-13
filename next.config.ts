import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Brief URL rule: lowercase, hyphenated, trailing slash.
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Next 16 Cache Components + Partial Prefetching (static shell, instant nav).
  cacheComponents: true,
  partialPrefetching: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 390, 480, 576, 768, 992, 1024, 1280, 1440, 1536, 1680, 1920, 2560],
    imageSizes: [32, 64, 96, 128, 160, 256, 384],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
