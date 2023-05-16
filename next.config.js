/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    unoptimized : true,
    loader: 'imgix',
    path: '/',
  },
  trailingSlash: true

}

module.exports = nextConfig
