/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Use WebP/AVIF for modern browsers — huge size reduction automatically
    formats: ['image/avif', 'image/webp'],
    // Serve correctly-sized images at common breakpoints
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    // Cache optimized images for 30 days
    minimumCacheTTL: 2592000,
  },

  // Compress responses with gzip
  compress: true,

  // Strip console.* in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;

