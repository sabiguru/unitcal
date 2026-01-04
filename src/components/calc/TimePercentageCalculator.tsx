'use client';

import { useState } from 'react';

export default function TimePercentageCalculator() {
  const [calculationType, setCalculationType] = useState<'elapsed' | 'remaining'>('elapsed');
  const [elapsedTime, setElapsedTime] = useState<string>('');
  const [totalTime, setTotalTime] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculate = () => {
    const elapsed = parseFloat(elapsedTime);
    const total = parseFloat(totalTime);
    if (isNaN(elapsed) || isNaN(total) || total === 0) return;

    if (calculationType === 'elapsed') {
      const percentage = (elapsed / total) * 100;
      setResult(percentage);
      setExpression(`${elapsed} of ${total} = ${percentage.toFixed(2)}% elapsed`);
    } else {
      const remaining = total - elapsed;
      const percentage = (remaining / total) * 100;
      setResult(percentage);
      setExpression(`${remaining} of ${total} remaining = ${percentage.toFixed(2)}%`);
    }
  };

  const clear = () => {
    setElapsedTime('');
    setTotalTime('');
    setResult(null);
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⏱</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Time Percentage Calculator — Elapsed Time Calculator</h1>
          <p className="text-gray-600">Calculate what percentage of a time period has elapsed or remains</p>
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

      {/* Calculation Type Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Calculation Type</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setCalculationType('elapsed')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'elapsed'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Time Elapsed
          </button>
          <button
            onClick={() => setCalculationType('remaining')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'remaining'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Time Remaining
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Elapsed Time (in same units)
          </label>
          <input
            type="number"
            value={elapsedTime}
            onChange={(e) => setElapsedTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter elapsed time"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Time Period (in same units)
          </label>
          <input
            type="number"
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter total time period"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Time Percentage Formulas */}
      <div className="mt-8 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-6 border border-cyan-200">
        <h3 className="text-lg font-semibold text-cyan-900 mb-4 flex items-center">
          <span className="text-cyan-600 mr-2">📐</span>
          Time Percentage Formulas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-cyan-900 mb-2">Elapsed Percentage</div>
            <div className="text-sm text-cyan-700 font-mono">% Elapsed = (Elapsed / Total) × 100</div>
            <div className="text-xs text-cyan-600 mt-1">How much time has passed</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-cyan-900 mb-2">Remaining Percentage</div>
            <div className="text-sm text-cyan-700 font-mono">% Remaining = ((Total - Elapsed) / Total) × 100</div>
            <div className="text-xs text-cyan-600 mt-1">How much time is left</div>
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
            <div className="font-semibold text-green-900 mb-2">Project Management</div>
            <div className="text-sm text-green-700">• Timeline tracking</div>
            <div className="text-sm text-green-700">• Milestone progress</div>
            <div className="text-sm text-green-700">• Deadline monitoring</div>
            <div className="text-sm text-green-700">• Sprint completion</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Personal Planning</div>
            <div className="text-sm text-green-700">• Year progress</div>
            <div className="text-sm text-green-700">• Day completion</div>
            <div className="text-sm text-green-700">• Event countdowns</div>
            <div className="text-sm text-green-700">• Goal tracking</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Business</div>
            <div className="text-sm text-green-700">• Contract duration</div>
            <div className="text-sm text-green-700">• Trial periods</div>
            <div className="text-sm text-green-700">• Subscription terms</div>
            <div className="text-sm text-green-700">• Campaign duration</div>
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Quick Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 6 months of 12 = 50% elapsed</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 30 days of 365 = 8.2% of year</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 3 hours of 8 = 37.5% of workday</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 15 minutes of 60 = 25% of hour</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 90 days of 180 = 50% of semester</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• Use consistent time units!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
