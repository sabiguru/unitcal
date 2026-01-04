'use client';

import { useState } from 'react';

export default function AbsoluteValueEquationCalculator() {
  const [expression, setExpression] = useState<string>('');
  const [constant, setConstant] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const calculate = () => {
    const c = parseFloat(constant);
    if (isNaN(c)) return;

    const expr = expression.trim();

    // Handle simple |x| = c
    if (expr === 'x' || expr === '|x|') {
      if (c < 0) {
        setResult('No solution');
        setSteps('|x| cannot equal a negative number');
      } else if (c === 0) {
        setResult('x = 0');
        setSteps('|x| = 0, so x = 0');
      } else {
        setResult(`x = ${c} or x = ${-c}`);
        setSteps(`|x| = ${c}\nx = ${c} or x = ${-c}`);
      }
      return;
    }

    // Handle |ax + b| = c format
    const match = expr.match(/([+-]?\d*\.?\d*)x\s*([+-]\s*\d+\.?\d*)?/);
    if (match) {
      const a = match[1] ? (match[1] === '+' || match[1] === '' ? 1 : match[1] === '-' ? -1 : parseFloat(match[1])) : 1;
      const b = match[2] ? parseFloat(match[2].replace(/\s/g, '')) : 0;

      if (c < 0) {
        setResult('No solution');
        setSteps(`|${a}x ${b >= 0 ? '+' : ''} ${b}| cannot equal a negative number`);
        return;
      }

      // Solve ax + b = c and ax + b = -c
      const x1 = (c - b) / a;
      const x2 = (-c - b) / a;

      setResult(`x = ${x1.toFixed(4)} or x = ${x2.toFixed(4)}`);
      setSteps(`|${a}x ${b >= 0 ? '+' : ''} ${b}| = ${c}\n\nCase 1: ${a}x ${b >= 0 ? '+' : ''} ${b} = ${c}\nx = ${x1.toFixed(4)}\n\nCase 2: ${a}x ${b >= 0 ? '+' : ''} ${b} = ${-c}\nx = ${x2.toFixed(4)}`);
    } else {
      setResult('Invalid expression format');
      setSteps('Please enter expression in format: ax + b');
    }
  };

  const clear = () => {
    setExpression('');
    setConstant('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">|x|</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Absolute Value Equation Calculator</h1>
          <p className="text-gray-600">Solve absolute value equations like |x| = 5 or |2x - 3| = 7</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {steps || ' '}
          </div>
          <div className="text-2xl font-mono text-right">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expression inside absolute value (e.g., x, 2x - 3, -3x + 5)
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter expression (e.g., 2x - 3)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equals (constant value)
          </label>
          <input
            type="number"
            value={constant}
            onChange={(e) => setConstant(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter constant (e.g., 7)"
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

      {/* Formulas */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">📐</span>
          Absolute Value Equation Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Basic Form</div>
            <div className="text-sm text-purple-700 font-mono">|x| = c has solutions x = c and x = -c</div>
            <div className="text-xs text-purple-600 mt-1">When c ≥ 0</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">No Solution</div>
            <div className="text-sm text-purple-700 font-mono">|x| = c has no solution when c &lt; 0</div>
            <div className="text-xs text-purple-600 mt-1">Absolute value is always non-negative</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">General Form</div>
            <div className="text-sm text-purple-700 font-mono">|ax + b| = c</div>
            <div className="text-xs text-purple-600 mt-1">Solve: ax + b = c and ax + b = -c</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Zero Case</div>
            <div className="text-sm text-purple-700 font-mono">|x| = 0 only when x = 0</div>
            <div className="text-xs text-purple-600 mt-1">Unique solution at zero</div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💼</span>
          Common Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Distance Problems</div>
            <div className="text-sm text-blue-700">• Finding points equidistant from origin</div>
            <div className="text-sm text-blue-700">• Tolerance calculations</div>
            <div className="text-sm text-blue-700">• Error margins</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Physics</div>
            <div className="text-sm text-blue-700">• Displacement magnitude</div>
            <div className="text-sm text-blue-700">• Velocity problems</div>
            <div className="text-sm text-blue-700">• Energy calculations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Algebra</div>
            <div className="text-sm text-blue-700">• Solving equations</div>
            <div className="text-sm text-blue-700">• Finding critical points</div>
            <div className="text-sm text-blue-700">• Optimization problems</div>
          </div>
        </div>
      </div>
    </div>
  );
}
