import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// URLs that should return 410 Gone status
// These pages no longer exist and will not be coming back
const goneUrls = new Set([
  '/learn/mathematics/basic',
  '/learn/engineering/ohms-law',
  '/learn/mathematics/equation-solver',
  '/learn/construction/stairs',
  '/learutomotive/fuel-cost',
  '/learn/mathematics/age',
  '/learn/unique/love-calculator',
  '/learn/financial/compound-interest',
  '/learn/mathematics/time',
  '/learn/mathematics/roman-numerals',
  '/learn/financial/mortgage',
  '/learn/mathematics/matrix',
  '/learn/mathematics/tip',
  '/learn/engineering/carbon-footprint',
  '/learn/mathematics/significant-figures',
  '/learn/engineering/ph',
  '/learn/engineering/energy-usage',
  '/learn/engineering/electrical',
  '/learn/financial/tax',
  '/learn/lifestyle/suanpan-abacus',
  '/learn/mathematics/speed',
  '/learn/mathematics/ratio',
  '/learn/mathematics/binary-converter',
  '/learn/cooking/baking',
  '/learn/financial/npv-irr',
  '/learn/scientific',
  '/calculator/loan',
  '/calculator/bmr',
  '/calculator/currency-converter',
  '/learn/love-calculator',
  '/calculator/area',
  '/learn/npv-irr',
  '/learn/ohms-law',
  '/learn/protein',
  '/calculator/age',
  '/calculator/age-on-mars',
  '/calculator/stairs',
  '/calculator/resistor',
  '/calculator/suanpan-abacus',
  '/category/automotive',
  '/category/animal-age',
  '/learlcohol-dilution',
  '/learquarium-volume',
  '/learrea',
  '/learn/tire-size',
  '/learn/sleep',
  '/learn/mathematics/percentage',
  '/learn/health/bmr',
  '/learn/space/age-on-mars',
  '/learn/engineering/password-generator',
  '/leargriculture',
  '/learn/everyday/date',
  '/learn/mathematics/fraction',
  '/learn/unique',
  '/learnimal-age',
  '/learn/financial/loan',
  '/learn/financial/roi',
  '/learn/mathematics/graphing',
  '/learn/financial/credit-card-payoff',
  '/learn/conversions/morse-code',
  '/learn/energy/seed-spacing',
  '/learn/engineering/resistor',
  '/learn/construction/roofing',
  '/learn/lifestyle/soroban-abacus',
  '/learn/lifestyle/western-abacus',
  '/learn/energy/solar-panel-savings',
  '/learn/financial/salary',
  '/learn/mathematics/prime',
  '/learn/health/bodyfat',
  '/learn/financial/discount',
  '/learn/space/space-weight',
  '/learn/energy/home-energy-audit',
  '/learn/construction/concrete',
  '/learn/financial/currency-converter',
  '/learn/cooking/recipe-converter',
  '/learn/mathematics',
  '/learn/mathematics/scientific',
  '/learutomotive/ev-range',
  '/learn/everyday/countdown-timer',
  '/learn/engineering/capacitor',
  '/learn/construction/tile',
  '/learn/mathematics/unit-converter',
  '/learn/everyday/timezone-converter',
  '/learn/engineering/stoichiometry',
  '/learn/health/bmi',
  '/learn/lifestyle/password-generator',
  '/learn/mathematics/volume',
  '/learn/construction',
  '/learn/health/sleep',
  '/learn/financial/budget',
  '/learn/education/gpa',
  '/learn/financial/refinance',
  '/learn/construction/paint',
  '/learutomotive',
  '/learn/conversions/braille-translator',
  '/learn/cooking/coffee-ratio',
  '/learn/engineering/subnet',
  '/learn/financial/investment',
  '/learn/unique/golf-balls-boeing-747',
  '/learn/health/fitness',
  '/learutomotive/mpg',
  '/learn/health/heartrate',
  '/learn/construction/patio',
  '/learn/mathematics/area',
  '/learn/engineering/molecular-weight',
  '/learnimal-age/cat-age',
  '/learn/financial/car-loan',
  '/learutomotive/tire-size',
  '/learnimal-age/dog-age',
  '/learn/financial/depreciation',
  '/calculator/constructiorea',
  '/learn/financial/car-lease',
  '/learn/cooking/alcohol-dilution',
  '/learn/financial/interest',
  '/learn/health/calorie',
  '/learn/unique/aquarium-volume',
  '/learn/financial/retirement',
  '/calculator/date',
  '/calculator/space-weight',
  '/learn/holistic-recovery-mobility-low-impact-training',
  '/learn/time-on-mars',
  '/learn/wearable-tech-data-driven-fitness',
  '/learn/category/space',
  '/learn/strength-training-building-muscle-healthgoal',
  '/learge-on-mars',
  '/calculator/protein',
  '/_next/static/media/93f479601ee12b01-s.p.woff2',
  '/category/mathematics',
  '/calculator/graphing',
  '/calculator/mortgage',
  '/calculator/roi',
  '/category/energy',
  '/calculator/ratio',
  '/category/health',
  '/calculator/retirement',
  '/calculator/bmi',
  '/calculator/fraction',
  '/calculator/interest',
  '/calculator/calorie',
  '/calculator/budget',
  '/category/everyday',
  '/calculator/bodyfat',
  '/_next/static/media/4cf2300e9c8272f7-s.p.woff2',
  '/category/cooking',
  '/calculator/unit-converter',
  '/learn/category/automotive',
  '/calculator/heartrate',
  '/learn/seed-spacing',
  '/calculator/energy-usage',
  '/calculator/refinance',
  '/calculator/salary',
  '/learge',
  '/learn/currency-converter',
  '/learn/capacitor',
  '/calculator/binary-converter',
  '/learn/resistor',
  '/learn/category/health',
  '/learn/interest',
  '/calculator/water',
  '/calculator/western-abacus',
  '/calculator/time',
  '/calculator/percentage',
  '/learn/stairs',
  '/calculator/prime',
  '/calculator/matrix',
  '/learn/construction/area',
  '/learn/construction/volume',
  '/learn/health/protein',
]);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the URL should return 410 Gone
  if (goneUrls.has(pathname)) {
    // Return a 410 Gone response with a simple HTML page
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>410 - Page Gone</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
      color: #333;
    }
    .container {
      text-align: center;
      padding: 2rem;
      max-width: 600px;
    }
    h1 {
      font-size: 4rem;
      margin: 0;
      color: #666;
    }
    h2 {
      font-size: 1.5rem;
      margin: 1rem 0;
      font-weight: 400;
    }
    p {
      line-height: 1.6;
      color: #666;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>410</h1>
    <h2>This page is gone</h2>
    <p>The page you're looking for has been permanently removed and will not be coming back.</p>
    <p><a href="/">Return to homepage</a></p>
  </div>
</body>
</html>`,
      {
        status: 410,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=31536000', // Cache for 1 year since these pages are gone permanently
        },
      }
    );
  }

  // Continue with normal request processing
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
