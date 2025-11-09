/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,

  images: {
    unoptimized: true,
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

  // Configure Turbopack to use yaml-loader for .yml and .yaml files
  turbopack: {
    rules: {
      '*.yml': {
        loaders: ['yaml-loader'],
        as: '*.js',
      },
      '*.yaml': {
        loaders: ['yaml-loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
