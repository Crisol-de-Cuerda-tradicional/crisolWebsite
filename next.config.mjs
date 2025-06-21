/** @type {import('next').NextConfig} */
import withYaml from 'next-plugin-yaml';

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
};

export default withYaml(nextConfig);
