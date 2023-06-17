/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
}

export default nextConfig
