'use client';

import { useState } from 'react';

export default function PercentageDifferenceCalculator() {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculate = () => {
    const a = parseFloat(value1);
    const b = parseFloat(value2);
    if (isNaN(a) || isNaN(b)) return;

    // |A - B| / average * 100
    const average = (a + b) / 2;
    if (average === 0) return;

    const difference = (Math.abs(a - b) / average) * 100;
    setResult(difference);
    setExpression(`Percentage difference between ${a} and ${b} = ${difference.toFixed(2)}%`);
  };

  const clear = () => {
    setValue1('');
    setValue2('');
    setResult(null);
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">±%</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Percentage Difference Calculator — Compare Values</h1>
          <p className="text-gray-600">Calculate the absolute percentage difference between two values</p>
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
            First Value
          </label>
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter first value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Second Value
          </label>
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter second value"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Percentage Difference Formula */}
      <div className="mt-8 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
          <span className="text-orange-600 mr-2">📐</span>
          Percentage Difference Formula
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Absolute Difference</div>
            <div className="text-sm text-orange-700 font-mono">Percentage Difference = |A - B| / ((A + B) / 2) × 100</div>
            <div className="text-xs text-orange-600 mt-1">Uses the average of both values as the base</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Symmetric Comparison</div>
            <div className="text-sm text-orange-700">The result is the same regardless of which value is listed first</div>
            <div className="text-xs text-orange-600 mt-1">Unlike percentage change which depends on the starting value</div>
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
            <div className="font-semibold text-blue-900 mb-2">Science</div>
            <div className="text-sm text-blue-700">• Comparing measurements</div>
            <div className="text-sm text-blue-700">• Experimental data</div>
            <div className="text-sm text-blue-700">• Quality control</div>
            <div className="text-sm text-blue-700">• Statistical analysis</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Business</div>
            <div className="text-sm text-blue-700">• Price comparisons</div>
            <div className="text-sm text-blue-700">• Performance metrics</div>
            <div className="text-sm text-blue-700">• Market analysis</div>
            <div className="text-sm text-blue-700">• Competitor benchmarking</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Finance</div>
            <div className="text-sm text-blue-700">• Investment returns</div>
            <div className="text-sm text-blue-700">• Budget variance</div>
            <div className="text-sm text-blue-700">• Cost analysis</div>
            <div className="text-sm text-blue-700">• Forecasting accuracy</div>
          </div>
        </div>
      </div>

      {/* Key Differences */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Percentage Difference vs Percentage Change
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm font-semibold text-purple-900 mb-1">Percentage Difference</div>
            <div className="text-sm text-purple-800">• Symmetric comparison</div>
            <div className="text-sm text-purple-800">• Uses average as base</div>
            <div className="text-sm text-purple-800">• Order doesn't matter</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm font-semibold text-purple-900 mb-1">Percentage Change</div>
            <div className="text-sm text-purple-800">• Shows direction of change</div>
            <div className="text-sm text-purple-800">• Uses initial value as base</div>
            <div className="text-sm text-purple-800">• Order matters (old to new)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
