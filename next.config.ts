import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/posts/:slug",
      },
    ];
  },
};

export default nextConfig;
