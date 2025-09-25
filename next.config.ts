import type { NextConfig } from "next";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-f1fd80427d5e489a98fb6022fd6f176b.r2.dev",
      },
    ],
  },
};

export default nextConfig;
