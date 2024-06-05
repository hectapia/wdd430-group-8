/** @type {import('next').NextConfig} */
const nextConfig = {};

// module.exports = nextConfig;

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/dqmmdie8h/image/upload/**',
        },
      ],
    },
  }