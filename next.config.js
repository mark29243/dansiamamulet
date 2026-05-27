/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      // WooCommerce origin
      { protocol: 'https', hostname: 'amulets-dansiam.com' },
      // Supabase Storage
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
      // Cloudflare R2
      { protocol: 'https', hostname: 'pub-37c44db5189443e5945025e6f5b8855f.r2.dev' },
      // Common image CDNs
      { protocol: 'https', hostname: '*.cloudinary.com' },
      { protocol: 'https', hostname: '*.imgix.net' },
    ],
    // Cache images for 1 week
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  // Strip X-Powered-By header
  poweredByHeader: false,
  // Strict React mode
  reactStrictMode: true,
  // Compress output
  compress: true,
};

module.exports = nextConfig;
