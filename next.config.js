/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn2.thedogapi.com'],
  },
}

module.exports = nextConfig
