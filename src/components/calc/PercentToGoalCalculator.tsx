'use client';

import { useState } from 'react';

export default function PercentToGoalCalculator() {
  const [currentValue, setCurrentValue] = useState<string>('');
  const [goalValue, setGoalValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculate = () => {
    const current = parseFloat(currentValue);
    const goal = parseFloat(goalValue);
    if (isNaN(current) || isNaN(goal) || goal === 0) return;

    const percentage = (current / goal) * 100;
    const remainingAmount = goal - current;
    setResult(percentage);
    setRemaining(remainingAmount);

    if (percentage >= 100) {
      setExpression(`Goal achieved! ${current} is ${percentage.toFixed(2)}% of ${goal}`);
    } else {
      setExpression(`${current} of ${goal} = ${percentage.toFixed(2)}% complete (${remainingAmount.toFixed(2)} remaining)`);
    }
  };

  const clear = () => {
    setCurrentValue('');
    setGoalValue('');
    setResult(null);
    setRemaining(null);
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🎯</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Percent to Goal Calculator — Goal Progress Calculator</h1>
          <p className="text-gray-600">Calculate your percentage progress toward achieving a goal</p>
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
          {remaining !== null && remaining > 0 && (
            <div className="text-sm text-gray-400 text-right mt-2">
              {remaining.toFixed(2)} to go
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {result !== null && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 flex items-center justify-center text-white text-sm font-medium ${
                result >= 100 ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gradient-to-r from-blue-500 to-emerald-600'
              }`}
              style={{ width: `${Math.min(result, 100)}%` }}
            >
              {result >= 10 && `${result.toFixed(1)}%`}
            </div>
          </div>
        </div>
      )}

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Value
          </label>
          <input
            type="number"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Enter current progress"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal Value
          </label>
          <input
            type="number"
            value={goalValue}
            onChange={(e) => setGoalValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Enter target goal"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Goal Progress Formula */}
      <div className="mt-8 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 border border-emerald-200">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
          <span className="text-emerald-600 mr-2">📐</span>
          Goal Progress Formula
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-emerald-900 mb-2">Percentage Complete</div>
            <div className="text-sm text-emerald-700 font-mono">% Complete = (Current / Goal) × 100</div>
            <div className="text-xs text-emerald-600 mt-1">Shows how far you've progressed</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-emerald-900 mb-2">Remaining Amount</div>
            <div className="text-sm text-emerald-700 font-mono">Remaining = Goal - Current</div>
            <div className="text-xs text-emerald-600 mt-1">How much more is needed</div>
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
            <div className="text-sm text-blue-700">• Savings goals</div>
            <div className="text-sm text-blue-700">• Investment targets</div>
            <div className="text-sm text-blue-700">• Debt payoff</div>
            <div className="text-sm text-blue-700">• Budget tracking</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Health & Fitness</div>
            <div className="text-sm text-blue-700">• Weight loss goals</div>
            <div className="text-sm text-blue-700">• Exercise milestones</div>
            <div className="text-sm text-blue-700">• Step counts</div>
            <div className="text-sm text-blue-700">• Calorie targets</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Projects & Work</div>
            <div className="text-sm text-blue-700">• Task completion</div>
            <div className="text-sm text-blue-700">• Sales quotas</div>
            <div className="text-sm text-blue-700">• Fundraising campaigns</div>
            <div className="text-sm text-blue-700">• Learning progress</div>
          </div>
        </div>
      </div>

      {/* Progress Milestones */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Progress Milestones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 25% - Quarter way there</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 50% - Halfway to goal</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 75% - Three quarters done</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 90% - Almost there!</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 100% - Goal achieved!</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 100%+ - Exceeded goal</div>
          </div>
        </div>
      </div>
    </div>
  );
}
