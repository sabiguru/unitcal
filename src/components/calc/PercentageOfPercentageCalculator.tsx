'use client';

import { useState } from 'react';

export default function PercentageOfPercentageCalculator() {
  const [percentage1, setPercentage1] = useState<string>('');
  const [percentage2, setPercentage2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculate = () => {
    const p1 = parseFloat(percentage1);
    const p2 = parseFloat(percentage2);
    if (isNaN(p1) || isNaN(p2)) return;

    // percentage of percentage = (p1/100) * (p2/100) * 100 = (p1 * p2) / 100
    const resultValue = (p1 * p2) / 100;
    setResult(resultValue);
    setExpression(`${p1}% of ${p2}% = ${resultValue.toFixed(2)}%`);
  };

  const clear = () => {
    setPercentage1('');
    setPercentage2('');
    setResult(null);
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">%%</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Percentage of Percentage Calculator — Nested Percentage</h1>
          <p className="text-gray-600">Calculate what percentage a percentage represents (e.g., 20% of 50%)</p>
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
            {result !== null ? `${result.toFixed(2)}%` : '0%'}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Percentage (%)
          </label>
          <input
            type="number"
            value={percentage1}
            onChange={(e) => setPercentage1(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter first percentage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Second Percentage (%)
          </label>
          <input
            type="number"
            value={percentage2}
            onChange={(e) => setPercentage2(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter second percentage"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Percentage of Percentage Formula */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">📐</span>
          Percentage of Percentage Formula
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Basic Formula</div>
            <div className="text-sm text-purple-700 font-mono">Result = (Percentage₁ × Percentage₂) / 100</div>
            <div className="text-xs text-purple-600 mt-1">Multiply the percentages and divide by 100</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Example Calculation</div>
            <div className="text-sm text-purple-700">20% of 50% = (20 × 50) / 100 = 10%</div>
            <div className="text-xs text-purple-600 mt-1">This means 20% of 50% equals 10%</div>
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
            <div className="font-semibold text-blue-900 mb-2">Retail & Sales</div>
            <div className="text-sm text-blue-700">• Stacked discounts</div>
            <div className="text-sm text-blue-700">• Commission on commission</div>
            <div className="text-sm text-blue-700">• Promotional pricing</div>
            <div className="text-sm text-blue-700">• Loyalty rewards</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Finance</div>
            <div className="text-sm text-blue-700">• Tax on interest</div>
            <div className="text-sm text-blue-700">• Fee calculations</div>
            <div className="text-sm text-blue-700">• Compound penalties</div>
            <div className="text-sm text-blue-700">• Multi-tier pricing</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Analytics</div>
            <div className="text-sm text-blue-700">• Conversion rates</div>
            <div className="text-sm text-blue-700">• Subset analysis</div>
            <div className="text-sm text-blue-700">• Probability chains</div>
            <div className="text-sm text-blue-700">• Success rates</div>
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💡</span>
          Quick Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 50% of 50% = 25%</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 25% of 80% = 20%</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 10% of 100% = 10%</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 75% of 40% = 30%</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 100% of 50% = 50%</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 20% of 20% = 4%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
