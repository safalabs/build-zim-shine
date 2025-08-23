/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true,
  },
  trailingSlash: false,
  output: 'export',
  distDir: 'dist',
}

module.exports = nextConfig