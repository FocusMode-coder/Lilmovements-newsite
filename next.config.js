/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Production optimizations for Render
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Faster startup
  experimental: {
    serverComponentsExternalPackages: ['prisma', '@prisma/client'],
  },
  // Optimize static generation
  output: 'standalone',
  // Performance optimizations
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
};
module.exports = nextConfig;
