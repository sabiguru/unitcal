'use client';

import { useState } from 'react';

export default function IntervalNotationCalculator() {
  const [interval, setInterval] = useState<string>('');
  const [operationType, setOperationType] = useState<'parse' | 'union' | 'intersection'>('parse');
  const [interval2, setInterval2] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const parseInterval = (int: string): { left: number; right: number; leftInc: boolean; rightInc: boolean } | null => {
    // Parse interval like (1, 5], [-2, 3), etc.
    const match = int.match(/([(\[])\s*(-?\d+\.?\d*|-?∞)\s*,\s*(-?\d+\.?\d*|∞)\s*([)\]])/);
    if (!match) return null;

    const [, leftBracket, leftVal, rightVal, rightBracket] = match;

    return {
      left: leftVal === '-∞' ? -Infinity : parseFloat(leftVal),
      right: rightVal === '∞' ? Infinity : parseFloat(rightVal),
      leftInc: leftBracket === '[',
      rightInc: rightBracket === ']'
    };
  };

  const formatInterval = (left: number, right: number, leftInc: boolean, rightInc: boolean): string => {
    const leftBracket = leftInc && left !== -Infinity ? '[' : '(';
    const rightBracket = rightInc && right !== Infinity ? ']' : ')';
    const leftVal = left === -Infinity ? '-∞' : left;
    const rightVal = right === Infinity ? '∞' : right;
    return `${leftBracket}${leftVal}, ${rightVal}${rightBracket}`;
  };

  const calculate = () => {
    if (!interval.trim()) return;

    if (operationType === 'parse') {
      const parsed = parseInterval(interval);
      if (!parsed) {
        setResult('Invalid interval format');
        return;
      }

      const { left, right, leftInc, rightInc } = parsed;
      let output = 'Interval Analysis:\n\n';
      output += `Left endpoint: ${left === -Infinity ? '-∞' : left} (${leftInc ? 'inclusive' : 'exclusive'})\n`;
      output += `Right endpoint: ${right === Infinity ? '∞' : right} (${rightInc ? 'inclusive' : 'exclusive'})\n\n`;

      if (left === -Infinity && right === Infinity) {
        output += 'Inequality: All real numbers';
      } else if (left === -Infinity) {
        output += `Inequality: x ${rightInc ? '≤' : '<'} ${right}`;
      } else if (right === Infinity) {
        output += `Inequality: x ${leftInc ? '≥' : '>'} ${left}`;
      } else {
        output += `Inequality: ${left} ${leftInc ? '≤' : '<'} x ${rightInc ? '≤' : '<'} ${right}`;
      }

      setResult(output);
    } else if (operationType === 'union' || operationType === 'intersection') {
      const int1 = parseInterval(interval);
      const int2 = parseInterval(interval2);

      if (!int1 || !int2) {
        setResult('Invalid interval format');
        return;
      }

      if (operationType === 'union') {
        const left = Math.min(int1.left, int2.left);
        const right = Math.max(int1.right, int2.right);
        const leftInc = (left === int1.left ? int1.leftInc : int2.leftInc);
        const rightInc = (right === int1.right ? int1.rightInc : int2.rightInc);

        setResult(`Union: ${formatInterval(left, right, leftInc, rightInc)}`);
      } else {
        // Intersection
        const left = Math.max(int1.left, int2.left);
        const right = Math.min(int1.right, int2.right);

        if (left > right) {
          setResult('Intersection: ∅ (empty set)');
          return;
        }

        const leftInc = (left === int1.left ? int1.leftInc : int2.leftInc);
        const rightInc = (right === int1.right ? int1.rightInc : int2.rightInc);

        setResult(`Intersection: ${formatInterval(left, right, leftInc, rightInc)}`);
      }
    }
  };

  const clear = () => {
    setInterval('');
    setInterval2('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">[ ]</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interval Notation Calculator</h1>
          <p className="text-gray-600">Work with interval notation, union, and intersection</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[60px]">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Operation Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Operation Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setOperationType('parse')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operationType === 'parse'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Parse
          </button>
          <button
            onClick={() => setOperationType('union')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operationType === 'union'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Union (∪)
          </button>
          <button
            onClick={() => setOperationType('intersection')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operationType === 'intersection'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Intersection (∩)
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {operationType === 'parse' ? 'Interval' : 'First Interval'}
          </label>
          <input
            type="text"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="e.g., (1, 5] or [-2, 3)"
          />
        </div>

        {(operationType === 'union' || operationType === 'intersection') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Second Interval
            </label>
            <input
              type="text"
              value={interval2}
              onChange={(e) => setInterval2(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="e.g., (3, 8]"
            />
          </div>
        )}
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

      {/* Interval Notation Basics */}
      <div className="mt-8 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-6 border border-cyan-200">
        <h3 className="text-lg font-semibold text-cyan-900 mb-4 flex items-center">
          <span className="text-cyan-600 mr-2">📐</span>
          Interval Notation Basics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-cyan-900 mb-2">Parentheses ( )</div>
            <div className="text-sm text-cyan-700">Endpoint NOT included</div>
            <div className="text-xs text-cyan-600 mt-1">(1, 5) means 1 {'<'} x {'<'} 5</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-cyan-900 mb-2">Brackets [ ]</div>
            <div className="text-sm text-cyan-700">Endpoint IS included</div>
            <div className="text-xs text-cyan-600 mt-1">[1, 5] means 1 ≤ x ≤ 5</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-cyan-900 mb-2">Mixed Notation</div>
            <div className="text-sm text-cyan-700">Combine ( ) and [ ]</div>
            <div className="text-xs text-cyan-600 mt-1">(1, 5] means 1 {'<'} x ≤ 5</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-cyan-900 mb-2">Infinity</div>
            <div className="text-sm text-cyan-700">Always use parentheses</div>
            <div className="text-xs text-cyan-600 mt-1">(-∞, 5) or (3, ∞)</div>
          </div>
        </div>
      </div>

      {/* Operations */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Set Operations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Union (∪)</div>
            <div className="text-sm text-purple-700">All elements in either set</div>
            <div className="text-xs text-purple-600 mt-1">(1,3) ∪ (2,5) = (1,5)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Intersection (∩)</div>
            <div className="text-sm text-purple-700">Elements in both sets</div>
            <div className="text-xs text-purple-600 mt-1">(1,4) ∩ (2,5) = (2,4)</div>
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
            <div className="text-sm text-green-700">• Domain/range</div>
            <div className="text-sm text-green-700">• Solution sets</div>
            <div className="text-sm text-green-700">• Continuity</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Statistics</div>
            <div className="text-sm text-green-700">• Confidence intervals</div>
            <div className="text-sm text-green-700">• Data ranges</div>
            <div className="text-sm text-green-700">• Distributions</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Computer Science</div>
            <div className="text-sm text-green-700">• Valid ranges</div>
            <div className="text-sm text-green-700">• Set operations</div>
            <div className="text-sm text-green-700">• Data validation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
