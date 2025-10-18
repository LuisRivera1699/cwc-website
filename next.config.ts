import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Desactivar ESLint durante el build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Desactivar TypeScript durante el build (opcional)
    ignoreBuildErrors: true,
  },
  // Asegurar que los archivos estáticos se sirvan correctamente
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/apple-touch-icon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
