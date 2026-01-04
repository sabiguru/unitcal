'use client';

import { useState } from 'react';

export default function RelativeChangeCalculator() {
  const [oldValue, setOldValue] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [absoluteChange, setAbsoluteChange] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculate = () => {
    const oldVal = parseFloat(oldValue);
    const newVal = parseFloat(newValue);
    if (isNaN(oldVal) || isNaN(newVal) || oldVal === 0) return;

    // Relative Change = (New - Old) / Old × 100
    const relativeChange = ((newVal - oldVal) / oldVal) * 100;
    const absChange = newVal - oldVal;
    setResult(relativeChange);
    setAbsoluteChange(absChange);

    const direction = relativeChange > 0 ? 'increase' : relativeChange < 0 ? 'decrease' : 'no change';
    setExpression(`From ${oldVal} to ${newVal}: ${Math.abs(relativeChange).toFixed(2)}% ${direction}`);
  };

  const clear = () => {
    setOldValue('');
    setNewValue('');
    setResult(null);
    setAbsoluteChange(null);
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">Δ%</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Relative Change Calculator — Percentage Change Calculator</h1>
          <p className="text-gray-600">Calculate the relative percentage change between two values</p>
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
            {result !== null ? (
              <span className={result > 0 ? 'text-green-400' : result < 0 ? 'text-red-400' : 'text-white'}>
                {result > 0 && '+'}{result.toFixed(2)}%
              </span>
            ) : '0%'}
          </div>
          {absoluteChange !== null && (
            <div className="text-sm text-gray-400 text-right mt-2">
              Absolute change: {absoluteChange > 0 && '+'}{absoluteChange.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Old Value (Initial)
          </label>
          <input
            type="number"
            value={oldValue}
            onChange={(e) => setOldValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter original value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Value (Final)
          </label>
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter new value"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Relative Change Formula */}
      <div className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl p-6 border border-teal-200">
        <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
          <span className="text-teal-600 mr-2">📐</span>
          Relative Change Formula
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Percentage Change</div>
            <div className="text-sm text-teal-700 font-mono">Relative Change = ((New - Old) / Old) × 100</div>
            <div className="text-xs text-teal-600 mt-1">Positive = increase, Negative = decrease</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Absolute vs Relative</div>
            <div className="text-sm text-teal-700">Absolute Change = New - Old (simple difference)</div>
            <div className="text-sm text-teal-700">Relative Change = Percentage difference (context matters)</div>
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
            <div className="text-sm text-blue-700">• Stock price changes</div>
            <div className="text-sm text-blue-700">• Revenue growth</div>
            <div className="text-sm text-blue-700">• Portfolio performance</div>
            <div className="text-sm text-blue-700">• Profit margins</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Business</div>
            <div className="text-sm text-blue-700">• Sales trends</div>
            <div className="text-sm text-blue-700">• Customer growth</div>
            <div className="text-sm text-blue-700">• Market share</div>
            <div className="text-sm text-blue-700">• KPI tracking</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Analytics</div>
            <div className="text-sm text-blue-700">• Website traffic</div>
            <div className="text-sm text-blue-700">• Conversion rates</div>
            <div className="text-sm text-blue-700">• Performance metrics</div>
            <div className="text-sm text-blue-700">• Year-over-year growth</div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💡</span>
          Quick Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 50 to 75 = +50% increase</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 100 to 50 = -50% decrease</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 200 to 300 = +50% increase</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 80 to 40 = -50% decrease</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 1000 to 2000 = +100% (doubled)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 100 to 0 = -100% (to zero)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
