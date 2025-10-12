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
};

export default nextConfig;
