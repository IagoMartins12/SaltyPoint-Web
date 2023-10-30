/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/social/:path*',
        destination: 'http://localhost:3000/social/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
