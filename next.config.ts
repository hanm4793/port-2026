import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js ecosystem packages
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // Enable Turbopack (Next.js 16 default)
  turbopack: {},
};

export default nextConfig;
