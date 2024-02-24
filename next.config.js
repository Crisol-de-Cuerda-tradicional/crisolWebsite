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
        hostname: '**.crisoldecuerda.com',
        port: '',
        pathname: '/**',
      },
      {
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
