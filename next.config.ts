import type { NextConfig } from "next";
const withMDX = require('@next/mdx')();

// Legacy URL redirects to preserve SEO after restructuring calculator and learn paths
const legacyRedirects = [
  { source: '/calculator/braille-translator', destination: '/calculator/conversions/braille-translator', permanent: true },
  { source: '/learn/binary-converter', destination: '/learn', permanent: true },
  { source: '/learn/volume', destination: '/learn', permanent: true },
  { source: '/learn/basic', destination: '/learn', permanent: true },
  { source: '/learn/percentage', destination: '/learn', permanent: true },
  { source: '/learn/prime', destination: '/learn', permanent: true },
  { source: '/category/construction', destination: '/calculator/construction', permanent: true },
  { source: '/learn/stoichiometry', destination: '/learn', permanent: true },
  { source: '/calculator/fuel-cost', destination: '/calculator/automotive/fuel-cost', permanent: true },
  { source: '/learn/tax', destination: '/learn', permanent: true },
  { source: '/learn/category/financial', destination: '/learn', permanent: true },
  { source: '/learn/mortgage', destination: '/learn', permanent: true },
  { source: '/calculator/capacitor', destination: '/calculator/engineering/capacitor', permanent: true },
  { source: '/learn/tile', destination: '/learn', permanent: true },
  { source: '/learn/paint', destination: '/learn', permanent: true },
  { source: '/learn/category/construction', destination: '/learn', permanent: true },
  { source: '/calculator/aquarium-volume', destination: '/calculator/unique/aquarium-volume', permanent: true },
  { source: '/learn/ev-range', destination: '/learn', permanent: true },
  { source: '/category/space', destination: '/calculator/space', permanent: true },
  { source: '/learn/space-weight', destination: '/learn', permanent: true },
  { source: '/calculator/npv-irr', destination: '/calculator/financial/npv-irr', permanent: true },
  { source: '/learn/tip', destination: '/learn', permanent: true },
  { source: '/learn/matrix', destination: '/learn', permanent: true },
  { source: '/calculator/alcohol-dilution', destination: '/calculator/cooking/alcohol-dilution', permanent: true },
  { source: '/calculator/mpg', destination: '/calculator/automotive/mpg', permanent: true },
  { source: '/calculator/molecular-weight', destination: '/calculator/education/molecular-weight', permanent: true },
  { source: '/learn/salary', destination: '/learn', permanent: true },
  { source: '/learn/carbon-footprint', destination: '/learn', permanent: true },
  { source: '/learn/concrete', destination: '/learn', permanent: true },
  { source: '/learn/investment', destination: '/learn', permanent: true },
  { source: '/learn/roofing', destination: '/learn', permanent: true },
  { source: '/learn/refinance', destination: '/learn', permanent: true },
  { source: '/learn/depreciation', destination: '/learn', permanent: true },
  { source: '/calculator/carbon-footprint', destination: '/calculator/energy/carbon-footprint', permanent: true },
  { source: '/calculator/tip', destination: '/calculator/mathematics/tip', permanent: true },
  { source: '/calculator/electrical', destination: '/calculator/engineering/electrical', permanent: true },
  { source: '/calculator/ev-range', destination: '/calculator/automotive/ev-range', permanent: true },
  { source: '/calculator/seed-spacing', destination: '/calculator/agriculture/seed-spacing', permanent: true },
  { source: '/calculator/compound-interest', destination: '/calculator/financial/compound-interest', permanent: true },
  { source: '/calculator/significant-figures', destination: '/calculator/mathematics/significant-figures', permanent: true },
  { source: '/calculator/timezone-converter', destination: '/calculator/everyday/timezone-converter', permanent: true },
  { source: '/calculator/sleep', destination: '/calculator/health/sleep', permanent: true },
  { source: '/calculator/depreciation', destination: '/calculator/financial/depreciation', permanent: true },
  { source: '/calculator/ph', destination: '/calculator/education/ph', permanent: true },
  { source: '/learn/discount', destination: '/learn', permanent: true },
  { source: '/learn/coffee-ratio', destination: '/learn', permanent: true },
  { source: '/calculator/roman-numerals', destination: '/calculator/conversions/roman-numerals', permanent: true },
  { source: '/calculator/baking', destination: '/calculator/cooking/baking', permanent: true },
  { source: '/learn/baking', destination: '/learn', permanent: true },
  { source: '/learn/loan', destination: '/learn', permanent: true },
  { source: '/calculator/stoichiometry', destination: '/calculator/education/stoichiometry', permanent: true },
  { source: '/calculator/tire-size', destination: '/calculator/automotive/tire-size', permanent: true },
  { source: '/calculator/recipe-converter', destination: '/calculator/cooking/recipe-converter', permanent: true },
  { source: '/learn/alcohol-dilution', destination: '/learn', permanent: true },
  { source: '/learn/molecular-weight', destination: '/learn', permanent: true },
  { source: '/calculator/tax', destination: '/calculator/financial/tax', permanent: true },
  { source: '/learn/ratio', destination: '/learn', permanent: true },
  { source: '/learn/equation-solver', destination: '/learn', permanent: true },
  { source: '/learn/retirement', destination: '/learn', permanent: true },
  { source: '/learn/calorie', destination: '/learn', permanent: true },
  { source: '/learn/bmr', destination: '/learn', permanent: true },
  { source: '/learn/solar-panel-savings', destination: '/learn', permanent: true },
  { source: '/learn/car-loan', destination: '/learn', permanent: true },
  { source: '/learn/car-lease', destination: '/learn', permanent: true },
  { source: '/calculator/credit-card-payoff', destination: '/calculator/financial/credit-card-payoff', permanent: true },
  { source: '/learn/fuel-cost', destination: '/learn', permanent: true },
  { source: '/learn/password-generator', destination: '/learn', permanent: true },
  { source: '/learn/water', destination: '/learn', permanent: true },
  { source: '/learn/gpa', destination: '/learn', permanent: true },
  { source: '/learn/roi', destination: '/learn', permanent: true },
  { source: '/learn/budget', destination: '/learn', permanent: true },
  { source: '/calculator/soroban-abacus', destination: '/calculator/mathematics/soroban-abacus', permanent: true },
  { source: '/calculator/love-calculator', destination: '/calculator/unique/love-calculator', permanent: true },
  { source: '/calculator/solar-panel-savings', destination: '/calculator/energy/solar-panel-savings', permanent: true },
  { source: '/learn/compound-interest', destination: '/learn', permanent: true },
  { source: '/learn/date', destination: '/learn', permanent: true },
  { source: '/learn/energy-usage', destination: '/learn', permanent: true },
  { source: '/learn/home-energy-audit', destination: '/learn', permanent: true },
  { source: '/learn/braille-translator', destination: '/learn', permanent: true },
  { source: '/calculator/password-generator', destination: '/calculator/engineering/password-generator', permanent: true },
  { source: '/calculator/fitness', destination: '/calculator/health/fitness', permanent: true },
  { source: '/learn/soroban-abacus', destination: '/learn', permanent: true },
  { source: '/calculator/investment', destination: '/calculator/financial/investment', permanent: true },
  { source: '/learn/electrical', destination: '/learn', permanent: true },
  { source: '/calculator/coffee-ratio', destination: '/calculator/cooking/coffee-ratio', permanent: true },
  { source: '/calculator/golf-balls-boeing-747', destination: '/calculator/unique/golf-balls-boeing-747', permanent: true },
  { source: '/calculator/discount', destination: '/calculator/financial/discount', permanent: true },
  { source: '/learn/cat-age', destination: '/learn', permanent: true },
  { source: '/calculator/morse-code', destination: '/calculator/conversions/morse-code', permanent: true },
  { source: '/learn/roman-numerals', destination: '/learn', permanent: true },
  { source: '/learn/graphing', destination: '/learn', permanent: true },
  { source: '/learn/bodyfat', destination: '/learn', permanent: true },
  { source: '/calculator/equation-solver', destination: '/calculator/mathematics/equation-solver', permanent: true },
  { source: '/category/financial', destination: '/calculator/financial', permanent: true },
  { source: '/calculator/ohms-law', destination: '/calculator/engineering/ohms-law', permanent: true },
  { source: '/calculator/countdown-timer', destination: '/calculator/everyday/countdown-timer', permanent: true },
  { source: '/learn/fitness', destination: '/learn', permanent: true },
  { source: '/category/engineering', destination: '/calculator/engineering', permanent: true },
  { source: '/learn/credit-card-payoff', destination: '/learn', permanent: true },
  { source: '/learn/mpg', destination: '/learn', permanent: true },
  { source: '/calculator/tile', destination: '/calculator/construction/tile', permanent: true },
  { source: '/learn/unit-converter', destination: '/learn', permanent: true },
  { source: '/learn/countdown-timer', destination: '/learn', permanent: true },
  { source: '/learn/subnet', destination: '/learn', permanent: true },
  { source: '/calculator/basic', destination: '/calculator/mathematics/basic', permanent: true },
  { source: '/calculator/gpa', destination: '/calculator/education/gpa', permanent: true },
  { source: '/learn/ph', destination: '/learn', permanent: true },
  { source: '/learn/planetary-years', destination: '/learn', permanent: true },
  { source: '/learn/recipe-converter', destination: '/learn', permanent: true },
  { source: '/learn/morse-code', destination: '/learn', permanent: true },
  { source: '/learn/timezone-converter', destination: '/learn', permanent: true },
  { source: '/calculator/scientific', destination: '/calculator/mathematics/scientific', permanent: true },
  { source: '/calculator/volume', destination: '/calculator/construction/volume', permanent: true },
  { source: '/calculator/car-loan', destination: '/calculator/financial/car-loan', permanent: true },
  { source: '/calculator/car-lease', destination: '/calculator/financial/car-lease', permanent: true },
  { source: '/learn/lifestyle', destination: '/learn', permanent: true },
  { source: '/category/conversions', destination: '/calculator/conversions', permanent: true },
  { source: '/calculator/paint', destination: '/calculator/construction/paint', permanent: true },
  { source: '/calculator/subnet', destination: '/calculator/engineering/subnet', permanent: true },
  { source: '/calculator/roofing', destination: '/calculator/construction/roofing', permanent: true },
  { source: '/calculator/cat-age', destination: '/calculator/animal-age/cat-age', permanent: true },
  { source: '/calculator/home-energy-audit', destination: '/calculator/energy/home-energy-audit', permanent: true },
  { source: '/learn/fraction', destination: '/learn', permanent: true },
  { source: '/learn/time', destination: '/learn', permanent: true },
  { source: '/learn/heartrate', destination: '/learn', permanent: true },
  { source: '/calculator/speed', destination: '/calculator/mathematics/speed', permanent: true },
  { source: '/learn/aquarium-volume', destination: '/learn', permanent: true },
  { source: '/calculator/dog-age', destination: '/calculator/animal-age/dog-age', permanent: true },
  { source: '/learn/patio', destination: '/learn', permanent: true },
  { source: '/learn/area', destination: '/learn', permanent: true },
  { source: '/learn/category/mathematics', destination: '/learn', permanent: true },
  { source: '/learn/category/engineering', destination: '/learn', permanent: true },
  { source: '/calculator/concrete', destination: '/calculator/construction/concrete', permanent: true },
  { source: '/learn/dog-age', destination: '/learn', permanent: true },
  { source: '/categories', destination: '/calculators', permanent: true },
  { source: '/learn/speed', destination: '/learn', permanent: true },
  { source: '/category/education', destination: '/calculator/education', permanent: true },
  { source: '/learn/suanpan-abacus', destination: '/learn', permanent: true },
  { source: '/learn/bmi', destination: '/learn', permanent: true },
  { source: '/category/unique', destination: '/calculator/unique', permanent: true },
  { source: '/learn/western-abacus', destination: '/learn', permanent: true },
  { source: '/learn/golf-balls-boeing-747', destination: '/learn', permanent: true },
  { source: '/learn/significant-figures', destination: '/learn', permanent: true },
  { source: '/learn/weight-on-mars', destination: '/learn', permanent: true },
  { source: '/privacy-policy', destination: '/privacy', permanent: true },
];

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
      ...legacyRedirects,
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
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
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
      {
        source: '/_next/static/chunks/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/_next/data/:path*.json',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
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
