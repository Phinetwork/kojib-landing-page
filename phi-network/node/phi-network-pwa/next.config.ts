import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    // ✅ Enables WebAssembly, Top-Level Await, and Layers
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true, // ✅ Fix for `entryOptions.layer` error
    };

    // ✅ Fixes `punycode` warning
    config.resolve.fallback = { punycode: false };

    return config;
  },

  // ✅ Disable Turbopack if needed (optional)
  turbo: false, 
};

export default nextConfig;
