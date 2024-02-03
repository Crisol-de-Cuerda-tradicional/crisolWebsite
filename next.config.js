/** @type {import('next').NextConfig} */
const withYaml = require('next-plugin-yaml');

const nextConfig = {
  reactStrictMode: true,

  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.crisoldecuerda.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'crisoldecuerda.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withYaml(nextConfig);
