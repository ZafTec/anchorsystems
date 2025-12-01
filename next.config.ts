import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  // Enable React Compiler for automatic optimizations
  experimental: {
    reactCompiler: true,
  },

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable SWC minification
  swcMinify: true,
};

export default nextConfig;
