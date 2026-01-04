'use client';

import { useState } from 'react';

export default function PercentagePointCalculator() {
  const [percentage1, setPercentage1] = useState<string>('');
  const [percentage2, setPercentage2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculate = () => {
    const p1 = parseFloat(percentage1);
    const p2 = parseFloat(percentage2);
    if (isNaN(p1) || isNaN(p2)) return;

    // Percentage point difference = p2 - p1
    const pointDiff = p2 - p1;
    setResult(pointDiff);

    // Also calculate the percentage change for comparison
    if (p1 !== 0) {
      const pctChange = ((p2 - p1) / p1) * 100;
      setPercentageChange(pctChange);
      setExpression(`${p2}% - ${p1}% = ${pointDiff.toFixed(2)} percentage points (${pctChange.toFixed(2)}% change)`);
    } else {
      setPercentageChange(null);
      setExpression(`${p2}% - ${p1}% = ${pointDiff.toFixed(2)} percentage points`);
    }
  };

  const clear = () => {
    setPercentage1('');
    setPercentage2('');
    setResult(null);
    setPercentageChange(null);
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">pp</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Percentage Point Calculator — Percentage Point Difference</h1>
          <p className="text-gray-600">Calculate the difference in percentage points between two percentages</p>
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
            {result !== null ? `${result.toFixed(2)} pp` : '0 pp'}
          </div>
          {percentageChange !== null && (
            <div className="text-sm text-gray-400 text-right mt-2">
              Percentage change: {percentageChange.toFixed(2)}%
            </div>
          )}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Percentage (%)
          </label>
          <input
            type="number"
            value={percentage1}
            onChange={(e) => setPercentage1(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter initial percentage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Final Percentage (%)
          </label>
          <input
            type="number"
            value={percentage2}
            onChange={(e) => setPercentage2(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter final percentage"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Percentage Point Formula */}
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="text-indigo-600 mr-2">📐</span>
          Percentage Point Formula
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Percentage Point Difference</div>
            <div className="text-sm text-indigo-700 font-mono">Difference = Final% - Initial%</div>
            <div className="text-xs text-indigo-600 mt-1">Simple arithmetic difference between percentages</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Example</div>
            <div className="text-sm text-indigo-700">25% - 20% = 5 percentage points</div>
            <div className="text-xs text-indigo-600 mt-1">But this represents a 25% increase (5/20 × 100)</div>
          </div>
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💼</span>
          Common Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Economics</div>
            <div className="text-sm text-green-700">• Interest rate changes</div>
            <div className="text-sm text-green-700">• Inflation rates</div>
            <div className="text-sm text-green-700">• GDP growth</div>
            <div className="text-sm text-green-700">• Unemployment shifts</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Politics</div>
            <div className="text-sm text-green-700">• Poll results</div>
            <div className="text-sm text-green-700">• Voter turnout</div>
            <div className="text-sm text-green-700">• Approval ratings</div>
            <div className="text-sm text-green-700">• Election outcomes</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Business</div>
            <div className="text-sm text-green-700">• Market share changes</div>
            <div className="text-sm text-green-700">• Conversion rates</div>
            <div className="text-sm text-green-700">• Success rates</div>
            <div className="text-sm text-green-700">• Performance metrics</div>
          </div>
        </div>
      </div>

      {/* Key Distinction */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Percentage Points vs Percentage Change
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm font-semibold text-purple-900 mb-2">25% to 30%</div>
            <div className="text-sm text-purple-800">• Percentage point increase: 5 pp</div>
            <div className="text-sm text-purple-800">• Percentage increase: 20%</div>
            <div className="text-xs text-purple-600 mt-1">(5/25 × 100 = 20%)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm font-semibold text-purple-900 mb-2">50% to 60%</div>
            <div className="text-sm text-purple-800">• Percentage point increase: 10 pp</div>
            <div className="text-sm text-purple-800">• Percentage increase: 20%</div>
            <div className="text-xs text-purple-600 mt-1">(10/50 × 100 = 20%)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm font-semibold text-purple-900 mb-2">10% to 15%</div>
            <div className="text-sm text-purple-800">• Percentage point increase: 5 pp</div>
            <div className="text-sm text-purple-800">• Percentage increase: 50%</div>
            <div className="text-xs text-purple-600 mt-1">(5/10 × 100 = 50%)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm font-semibold text-purple-900 mb-2">Key Insight</div>
            <div className="text-sm text-purple-800">Same percentage point change can represent vastly different percentage changes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
