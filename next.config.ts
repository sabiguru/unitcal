import type { NextConfig } from "next";
const withMDX = require('@next/mdx')();

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: { 
    mdxRs: true
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  devIndicators: false,
  compress: true, // enables gzip from Next's server
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable modern JavaScript output for better performance
  transpilePackages: [],
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.calcfort.com',
          },
        ],
        destination: 'https://calcfort.com/:path*',
        permanent: true,
      },
      {
        source: '/ads.txt',
        destination: 'https://srv.adstxtmanager.com/80705/calcfort.com',
        permanent: true, // 301 redirect
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/_next/static/css/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Vary', value: 'Accept-Encoding' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Vary', value: 'Accept-Encoding' },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' }, // 1 day
        ],
      },
      {
        source: '/(.*\\.(?:jpg|jpeg|png|gif|svg|webp)$)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000' }, // 30 days
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Enable CSS optimization
      config.optimization.minimize = true;

      // Aggressive code splitting for better performance
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 100000,
        cacheGroups: {
          // Create smaller calculator chunks
          calculatorsBasic: {
            test: /[\\/]components[\\/]calc[\\/](Basic|Percentage|Tip|Calorie|BMI)Calculator\./,
            name: 'calculators-basic',
            chunks: 'all',
            priority: 20,
          },
          calculatorsFinance: {
            test: /[\\/]components[\\/]calc[\\/](Loan|Mortgage|Interest|Investment|Compound).*Calculator\./,
            name: 'calculators-finance', 
            chunks: 'all',
            priority: 20,
          },
          calculatorsMath: {
            test: /[\\/]components[\\/]calc[\\/](Scientific|Matrix|Fraction|Prime|Graphing).*Calculator\./,
            name: 'calculators-math',
            chunks: 'all', 
            priority: 20,
          },
          calculatorsOther: {
            test: /[\\/]components[\\/]calc[\\/]/,
            name: 'calculators-other',
            chunks: 'all',
            priority: 15,
          },
          // Separate vendor chunks by functionality
          reactVendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
            priority: 40,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
        },
      };
      
      // Optimize for modern browsers
      config.target = ['web', 'es2017'];
      
      // Enable tree shaking and dead code elimination
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.innerGraph = true;
      
      // Minimize polyfills
      config.resolve.alias = {
        ...config.resolve.alias,
        // Reduce core-js usage
        'core-js/stable': 'core-js/es',
      };
    }
    return config;
  },
};

export default withMDX(nextConfig);
