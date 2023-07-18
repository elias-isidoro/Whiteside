/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com', 'ik.imagekit.io/'],
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
