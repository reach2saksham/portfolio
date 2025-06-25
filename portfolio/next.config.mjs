/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  reactStrictMode: true, // Helps detect bad patterns in dev
  swcMinify: true,        // Enable faster, smaller builds
  compress: true,         // Enable gzip/brotli compression
  experimental: {
    serverActions: true,  // Only if you're using server components
  },
  images: {
    formats: ['image/avif', 'image/webp'], // Optimize image payload
    domains: ['your-image-domain.com'],    // Allow remote images
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
});

export default nextConfig;
