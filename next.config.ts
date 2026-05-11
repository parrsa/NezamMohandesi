// import type { NextConfig } from "next";

import { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.0.1.141",
        port: "8082",
        pathname: "/Api/**",
      },
      {
        protocol: 'https',
        hostname: 'your-domain.com',
        pathname: '**',
      },
    ],
  }
};

module.exports = nextConfig;
