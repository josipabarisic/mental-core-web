import type { NextConfig } from "next";

// Set when building the static bundle that gets published to GitHub Pages.
// Pages serves project sites from /<repo>, so assets need that prefix.
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // The sketch is reviewed through a forwarded URL whose host is not
  // localhost. Next treats those as cross-origin and blocks its own dev
  // resources, which leaves the page rendered but never hydrated.
  allowedDevOrigins: [
    "127.0.0.1",
    "0.0.0.0",
    "localhost",
    "*.cursor.sh",
    "*.cursor.com",
    "*.csb.app",
    "*",
  ],
  agentRules: false,
  // Overlaps the review bar and confuses the client during a design review.
  devIndicators: false,

  ...(staticExport
    ? {
        output: "export" as const,
        images: { unoptimized: true },
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
      }
    : {}),
};

export default nextConfig;
