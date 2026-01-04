'use client';

import { useState } from 'react';

export default function FractionToPercentCalculator() {
  const [numerator, setNumerator] = useState<string>('');
  const [denominator, setDenominator] = useState<string>('');
  const [result, setResult] = useState<{
    percentage: number;
    decimal: number;
  } | null>(null);

  const calculate = () => {
    const num = parseFloat(numerator);
    const den = parseFloat(denominator);

    if (isNaN(num) || isNaN(den) || den === 0) return;

    const decimal = num / den;
    const percentage = decimal * 100;

    setResult({ percentage, decimal });
  };

  const clear = () => {
    setNumerator('');
    setDenominator('');
    setResult(null);
  };

  const commonFractions = [
    { num: 1, den: 2, label: '1/2' },
    { num: 1, den: 3, label: '1/3' },
    { num: 1, den: 4, label: '1/4' },
    { num: 3, den: 4, label: '3/4' },
    { num: 2, den: 5, label: '2/5' },
    { num: 3, den: 5, label: '3/5' },
  ];

  const applyCommonFraction = (num: number, den: number) => {
    setNumerator(num.toString());
    setDenominator(den.toString());
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⁄%</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fraction to Percent Calculator — Convert Fractions to Percentages</h1>
          <p className="text-gray-600">Convert any fraction to its percentage equivalent</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        {/* Display */}
        <div className="mb-6">
          <div className="bg-gray-900 rounded-xl p-4 text-white">
            <div className="text-sm text-gray-400 mb-2 h-6">
              {result && numerator && denominator ? `${numerator}/${denominator} = ${result.percentage.toFixed(2)}%` : ' '}
            </div>
            <div className="text-3xl font-mono text-right">
              {result ? `${result.percentage.toFixed(2)}%` : '0'}
            </div>
          </div>
        </div>

        {/* Quick Select Common Fractions */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Select
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {commonFractions.map((frac) => (
              <button
                key={frac.label}
                onClick={() => applyCommonFraction(frac.num, frac.den)}
                className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                {frac.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numerator (top)
            </label>
            <input
              type="number"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Denominator (bottom)
            </label>
            <input
              type="number"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Convert
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Results Details */}
        {result && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Conversion Details</h3>
            <div className="space-y-1 text-sm text-blue-800">
              <div>Fraction: {numerator}/{denominator}</div>
              <div>Decimal: {result.decimal.toFixed(6)}</div>
              <div>Percentage: {result.percentage.toFixed(2)}%</div>
              <div className="text-xs text-blue-600 mt-2">
                Calculation: ({numerator} ÷ {denominator}) × 100 = {result.percentage.toFixed(2)}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formula Information */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📐</span>
          Conversion Formula
        </h3>
        <div className="bg-white p-4 rounded-lg">
          <div className="font-semibold text-blue-900 mb-2">Fraction to Percent</div>
          <div className="text-sm text-blue-700 font-mono">Percentage = (Numerator ÷ Denominator) × 100</div>
          <div className="text-xs text-blue-600 mt-2">
            Example: 3/4 = (3 ÷ 4) × 100 = 0.75 × 100 = 75%
          </div>
        </div>
      </div>

      {/* Common Conversions Reference */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">📊</span>
          Common Fraction to Percent Conversions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">1/2 = 50%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">1/4 = 25%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">3/4 = 75%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">1/5 = 20%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">1/3 ≈ 33.33%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">2/3 ≈ 66.67%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">1/8 = 12.5%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">1/10 = 10%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
