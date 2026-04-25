/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  reactStrictMode: true,
  compress: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'three': path.resolve(__dirname, 'node_modules/three'),
      'three/build/three.module.js': path.resolve(__dirname, 'node_modules/three/build/three.module.js'),
      'three/src/Three.js': path.resolve(__dirname, 'node_modules/three/src/Three.js'),
      '@react-three/fiber': path.resolve(__dirname, 'node_modules/@react-three/fiber'),
    };
    return config;
  },

  experimental: {
    serverActions: {},
    // turbo: true, // optional: explicitly opt-in
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              process.env.NODE_ENV === 'production'
                ? 'public, max-age=31536000, immutable'
                : 'no-store',
          },
        ],
      },
    ];
  },
});

export default nextConfig;
