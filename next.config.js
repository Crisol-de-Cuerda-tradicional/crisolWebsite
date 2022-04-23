/** @type {import('next').NextConfig} */
const withYaml = require('next-plugin-yaml');

const nextConfig = {
  reactStrictMode: true,

  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
};

module.exports = withYaml(nextConfig);
