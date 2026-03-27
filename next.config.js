/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*'
        }
      ]
    }
  }
}

module.exports = nextConfig
