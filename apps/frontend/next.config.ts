import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oq1gkkfo4q0hj5xi.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
