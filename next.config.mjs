/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
    return config;
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['my-stocks-next.ru'],
    },
  },
};

export default nextConfig;
