'use client';

import Link from 'next/link';

interface AdsSidebarProps {
  hidePopularCalculators?: boolean;
  hideCalculatorStats?: boolean;
  hideCalculationTips?: boolean;
  customCalculationTips?: Array<{ tip: string; icon: string }>;
}

export default function AdsSidebar({
  hidePopularCalculators = false,
  hideCalculatorStats = false,
  hideCalculationTips = false,
  customCalculationTips
}: AdsSidebarProps) {
  const popularCalculators = [
    { name: 'BMI Calculator', link: '/calculator/bmi', icon: '💪' },
    { name: 'Percentage Calculator', link: '/calculator/percentage', icon: '📊' },
    { name: 'Loan Calculator', link: '/calculator/loan', icon: '💰' },
    { name: 'Age Calculator', link: '/calculator/age', icon: '🎂' },
    { name: 'Currency Converter', link: '/calculator/currency-converter', icon: '💱' },
    { name: 'Tip Calculator', link: '/calculator/tip', icon: '🍽️' }
  ];

  const calculationTips = [
    { tip: 'Double-check your inputs for accuracy', icon: '✅' },
    { tip: 'Round final results appropriately', icon: '🔢' },
    { tip: 'Save frequently used calculations', icon: '💾' },
    { tip: 'Use scientific notation for large numbers', icon: '🔬' }
  ];

  const howToUseSteps = [
    { step: 'Enter your values in the input fields', icon: '📝' },
    { step: 'Select appropriate units if available', icon: '⚖️' },
    { step: 'Click Calculate to get results', icon: '🎯' },
    { step: 'Review the detailed explanation below', icon: '📚' }
  ];

  const quickConverters = [
    { from: 'Currency', to: 'Exchange Rates', link: '/calculator/currency-converter' },
    { from: 'Binary', to: 'Decimal', link: '/calculator/binary-converter' },
    { from: 'Various Units', to: 'Convert Anything', link: '/calculator/unit-converter' },
    { from: 'Fractions', to: 'Decimals', link: '/calculator/fraction' }
  ];

  return (
    <div className="space-y-6">
      {/* 1. How to Use Calculator */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="text-indigo-600 mr-2">❓</span>
          How to Use Calculator
        </h3>
        <div className="space-y-3">
          {howToUseSteps.map((step, index) => (
            <div key={index} className="flex items-start">
              <span className="text-lg mr-3 mt-0.5">{step.icon}</span>
              <div>
                <span className="inline-block bg-indigo-200 text-indigo-800 text-xs font-semibold px-2 py-1 rounded mr-2">
                  {index + 1}
                </span>
                <p className="text-sm text-indigo-800 inline">{step.step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Calculation Tips */}
      {!hideCalculationTips && (
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
            <span className="text-purple-600 mr-2">💡</span>
            Calculation Tips
          </h3>
          <div className="space-y-3">
            {(customCalculationTips || calculationTips).map((tip, index) => (
              <div key={index} className="flex items-start">
                <span className="text-lg mr-3 mt-0.5">{tip.icon}</span>
                <p className="text-sm text-purple-800">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Quick Converters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-blue-500 mr-2">⚡</span>
          Quick Converters
        </h3>
        <div className="space-y-2">
          {quickConverters.map((converter, index) => (
            <Link
              key={index}
              href={converter.link}
              className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200"
            >
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{converter.from}</span>
                <span className="mx-2 text-gray-400">→</span>
                <span className="font-medium text-gray-900">{converter.to}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Popular Calculators */}
      {!hidePopularCalculators && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-orange-500 mr-2">🔥</span>
            Popular Calculators
          </h3>
          <div className="space-y-3">
            {popularCalculators.map((calc, index) => (
              <Link
                key={index}
                href={calc.link}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100 hover:border-gray-200"
              >
                <span className="text-lg mr-3">{calc.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1">
                  {calc.name}
                </span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 5. Calculator Stats */}
      {!hideCalculatorStats && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-gray-600 mr-2">📈</span>
            Calculator Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">81+</div>
              <div className="text-xs text-gray-600">Calculators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-xs text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Free</div>
              <div className="text-xs text-gray-600">To Use</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">Fast</div>
              <div className="text-xs text-gray-600">Results</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}