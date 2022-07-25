/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['api.lorem.space', 'images.pexels.com'],
  },
};

module.exports = nextConfig;
