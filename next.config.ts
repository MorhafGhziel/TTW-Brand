import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Editorial and product photography is served from Unsplash until the
    // brand's own shoot is delivered. Swapping to a CDN later is a change here
    // and in `src/lib/products.ts` only.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
