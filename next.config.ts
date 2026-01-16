import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Cloudinary-hosted images (e.g. res.cloudinary.com/<cloud_name>/ ...)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
