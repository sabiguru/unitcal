'use client';

import { useState } from 'react';

export default function AveragePercentageCalculator() {
  const [percentages, setPercentages] = useState<string>('');
  const [result, setResult] = useState<{
    average: number;
    sum: number;
    count: number;
  } | null>(null);

  const calculate = () => {
    const values = percentages
      .split(',')
      .map(v => parseFloat(v.trim()))
      .filter(v => !isNaN(v));

    if (values.length === 0) return;

    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;

    setResult({
      average,
      sum,
      count: values.length
    });
  };

  const clear = () => {
    setPercentages('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">%̄</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Average Percentage Calculator — Find Mean of Percentages</h1>
          <p className="text-gray-600">Calculate the average of multiple percentage values</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        {/* Display */}
        <div className="mb-6">
          <div className="bg-gray-900 rounded-xl p-4 text-white">
            <div className="text-sm text-gray-400 mb-2 h-6">
              {result ? `Average of ${result.count} percentages` : ' '}
            </div>
            <div className="text-3xl font-mono text-right">
              {result ? `${result.average.toFixed(2)}%` : '0'}
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Percentages (comma-separated)
            </label>
            <input
              type="text"
              value={percentages}
              onChange={(e) => setPercentages(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 25, 50, 75, 90"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter percentages separated by commas
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

        {/* Results Details */}
        {result && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Calculation Details</h3>
            <div className="space-y-1 text-sm text-blue-800">
              <div>Sum: {result.sum.toFixed(2)}%</div>
              <div>Count: {result.count} values</div>
              <div>Average: {result.sum.toFixed(2)} ÷ {result.count} = {result.average.toFixed(2)}%</div>
            </div>
          </div>
        )}
      </div>

      {/* Formula Information */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📐</span>
          Average Percentage Formula
        </h3>
        <div className="bg-white p-4 rounded-lg">
          <div className="font-semibold text-blue-900 mb-2">Formula</div>
          <div className="text-sm text-blue-700 font-mono">Average % = (Sum of all percentages) ÷ (Number of percentages)</div>
          <div className="text-xs text-blue-600 mt-2">
            Example: Average of 10%, 20%, 30% = (10 + 20 + 30) ÷ 3 = 20%
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💼</span>
          Common Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Academic</div>
            <div className="text-sm text-green-700">Average of test scores</div>
            <div className="text-sm text-green-700">Grade calculations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Business</div>
            <div className="text-sm text-green-700">Average growth rates</div>
            <div className="text-sm text-green-700">Performance metrics</div>
          </div>
        </div>
      </div>
    </div>
  );
}
