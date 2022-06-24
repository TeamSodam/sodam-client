/** @type {import('next').NextConfig} */

const path = require('path');

module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: [
      'sodam-bucket-2.s3.ap-northeast-2.amazonaws.com',
      'sodam-bucket.s3.ap-northeast-2.amazonaws.com',
      'sodam-bucket-2.s3.ap-northeast-2.amazonaws.com',
      'search.pstatic.net',
      'source.unsplash.com',
      'pcmap.place.naver.com'
    ],
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/:path*',
            destination: 'https://server.sodam.me/:path*',
          },
        ]
      : [];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(__dirname, 'src/components'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      constants: path.resolve(__dirname, 'src/constants'),
      public: path.resolve(__dirname, 'public'),
      styles: path.resolve(__dirname, 'src/styles'),
      libs: path.resolve(__dirname, 'src/libs'),
      map: path.resolve(__dirname, 'src/map'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      types: path.resolve(__dirname, 'src/types'),
      app: path.resolve(__dirname, 'src/app'),
      pages: path.resolve(__dirname, 'src/pages'),
      features: path.resolve(__dirname, 'src/features'),
      assets: path.resolve(__dirname, 'assets'),
    };

    return config;
  },
};
