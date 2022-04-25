/** @type {import('next').NextConfig} */
const withYaml = require('next-plugin-yaml');

const nextConfig = {
  reactStrictMode: true,

  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  images: {
    domains: ['www.crisoldecuerda.com'],
  },
};

module.exports = withYaml(nextConfig);
