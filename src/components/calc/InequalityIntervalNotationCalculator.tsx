'use client';

import { useState } from 'react';

export default function InequalityIntervalNotationCalculator() {
  const [inequality, setInequality] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    if (!inequality.trim()) return;

    try {
      // Parse various inequality formats
      let output = '';

      // Simple inequalities: x > 5, x <= -3, etc.
      const simpleMatch = inequality.match(/([a-z])\s*([<>]=?)\s*(-?\d+\.?\d*)/i);
      if (simpleMatch) {
        const [, variable, operator, value] = simpleMatch;
        const num = parseFloat(value);

        if (operator === '>') {
          output = `Interval: (${num}, ∞)`;
        } else if (operator === '>=') {
          output = `Interval: [${num}, ∞)`;
        } else if (operator === '<') {
          output = `Interval: (-∞, ${num})`;
        } else if (operator === '<=') {
          output = `Interval: (-∞, ${num}]`;
        }

        setResult(output);
        return;
      }

      // Compound inequalities: 1 < x < 5, -2 <= x <= 3
      const compoundMatch = inequality.match(/(-?\d+\.?\d*)\s*([<>]=?)\s*([a-z])\s*([<>]=?)\s*(-?\d+\.?\d*)/i);
      if (compoundMatch) {
        const [, val1, op1, variable, op2, val2] = compoundMatch;
        const num1 = parseFloat(val1);
        const num2 = parseFloat(val2);

        const leftBracket = op1.includes('=') ? '[' : '(';
        const rightBracket = op2.includes('=') ? ']' : ')';

        output = `Interval: ${leftBracket}${num1}, ${num2}${rightBracket}`;
        setResult(output);
        return;
      }

      setResult('Invalid format. Use: x > 5, x <= 3, or 1 < x < 5');
    } catch (error) {
      setResult('Error parsing inequality');
    }
  };

  const clear = () => {
    setInequality('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">[∞)</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inequality to Interval Notation Calculator</h1>
          <p className="text-gray-600">Convert inequalities to interval notation format</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {result || ' '}
          </div>
          <div className="text-2xl font-mono text-right">
            {inequality || 'Enter inequality'}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inequality Expression
          </label>
          <input
            type="text"
            value={inequality}
            onChange={(e) => setInequality(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="e.g., x > 5 or 1 < x <= 3"
          />
          <div className="text-xs text-gray-500 mt-1">
            Examples: x {'>'} 5, x {'<'}= -3, 1 {'<'} x {'<'} 5, -2 {'<'}= x {'<'}= 3
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      </div>

      {/* Interval Notation Guide */}
      <div className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl p-6 border border-teal-200">
        <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
          <span className="text-teal-600 mr-2">📐</span>
          Interval Notation Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Parentheses ( )</div>
            <div className="text-sm text-teal-700">Use for {'<'} or {'>'} (exclusive)</div>
            <div className="text-xs text-teal-600 mt-1">x {'>'} 5 becomes (5, ∞)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Brackets [ ]</div>
            <div className="text-sm text-teal-700">Use for ≤ or ≥ (inclusive)</div>
            <div className="text-xs text-teal-600 mt-1">x ≤ 5 becomes (-∞, 5]</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Infinity ∞</div>
            <div className="text-sm text-teal-700">Always use parentheses with ∞</div>
            <div className="text-xs text-teal-600 mt-1">Never [∞ or -∞]</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Compound Intervals</div>
            <div className="text-sm text-teal-700">Use both brackets for ranges</div>
            <div className="text-xs text-teal-600 mt-1">1 {'<'} x ≤ 5 becomes (1, 5]</div>
          </div>
        </div>
      </div>

      {/* Conversion Examples */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Common Conversions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">x {'>'} 3 → (3, ∞)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">x ≥ 3 → [3, ∞)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">x {'<'} -2 → (-∞, -2)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">x ≤ -2 → (-∞, -2]</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">1 {'<'} x {'<'} 5 → (1, 5)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">-2 ≤ x ≤ 3 → [-2, 3]</div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💼</span>
          Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Mathematics</div>
            <div className="text-sm text-green-700">• Domain and range</div>
            <div className="text-sm text-green-700">• Solution sets</div>
            <div className="text-sm text-green-700">• Function intervals</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Statistics</div>
            <div className="text-sm text-green-700">• Confidence intervals</div>
            <div className="text-sm text-green-700">• Data ranges</div>
            <div className="text-sm text-green-700">• Valid values</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Science</div>
            <div className="text-sm text-green-700">• Measurement bounds</div>
            <div className="text-sm text-green-700">• Valid parameters</div>
            <div className="text-sm text-green-700">• Error margins</div>
          </div>
        </div>
      </div>
    </div>
  );
}
