import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizaciones para BDJ Remixer
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configuración de imágenes para Google Drive
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
    // Configuración de calidades permitidas para Next.js 16+
    qualities: [25, 50, 75, 100],
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
