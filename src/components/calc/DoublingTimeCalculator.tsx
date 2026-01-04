'use client';

import { useState } from 'react';

export default function DoublingTimeCalculator() {
  const [growthRate, setGrowthRate] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculate = () => {
    const rate = parseFloat(growthRate);
    if (isNaN(rate) || rate <= 0) return;

    // Time = ln(2) / ln(1 + rate/100)
    const time = Math.log(2) / Math.log(1 + rate / 100);
    setResult(time);
    setExpression(`At ${rate}% growth rate, doubling time = ${time.toFixed(2)} periods`);
  };

  const clear = () => {
    setGrowthRate('');
    setResult(null);
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">2x</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doubling Time Calculator — Growth Rate Calculator</h1>
          <p className="text-gray-600">Calculate how long it takes for a quantity to double at a given growth rate</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {expression || ' '}
          </div>
          <div className="text-3xl font-mono text-right">
            {result !== null ? `${result.toFixed(2)} periods` : '0'}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Growth Rate (%)
          </label>
          <input
            type="number"
            value={growthRate}
            onChange={(e) => setGrowthRate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter growth rate percentage"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Doubling Time Formula */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-teal-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">📐</span>
          Doubling Time Formula
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Compound Growth Formula</div>
            <div className="text-sm text-green-700 font-mono">Time = ln(2) / ln(1 + rate/100)</div>
            <div className="text-xs text-green-600 mt-1">Where ln is the natural logarithm</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Rule of 70 (Approximation)</div>
            <div className="text-sm text-green-700 font-mono">Time ≈ 70 / growth rate</div>
            <div className="text-xs text-green-600 mt-1">Quick estimate for small growth rates</div>
          </div>
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💼</span>
          Common Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Finance</div>
            <div className="text-sm text-blue-700">• Investment growth</div>
            <div className="text-sm text-blue-700">• Compound interest</div>
            <div className="text-sm text-blue-700">• Retirement planning</div>
            <div className="text-sm text-blue-700">• Wealth accumulation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Business</div>
            <div className="text-sm text-blue-700">• Revenue growth</div>
            <div className="text-sm text-blue-700">• User base expansion</div>
            <div className="text-sm text-blue-700">• Market penetration</div>
            <div className="text-sm text-blue-700">• Sales forecasting</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Science</div>
            <div className="text-sm text-blue-700">• Population growth</div>
            <div className="text-sm text-blue-700">• Bacterial cultures</div>
            <div className="text-sm text-blue-700">• Radioactive decay</div>
            <div className="text-sm text-blue-700">• Epidemic modeling</div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Quick Reference Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 1% growth = ~70 years to double</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 2% growth = ~35 years to double</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 5% growth = ~14 years to double</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 7% growth = ~10 years to double</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 10% growth = ~7 years to double</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• Higher rates = faster doubling time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
