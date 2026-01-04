'use client';

import { useState } from 'react';

export default function PolynomialDivisionCalculator() {
  const [dividend, setDividend] = useState<string>('');
  const [divisor, setDivisor] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    if (!dividend.trim() || !divisor.trim()) {
      setResult('Please enter both dividend and divisor');
      return;
    }

    let output = 'Polynomial Long Division:\n\n';
    output += `Dividend: ${dividend}\n`;
    output += `Divisor: ${divisor}\n\n`;
    output += 'Steps:\n';
    output += '1. Divide the leading term of dividend by leading term of divisor\n';
    output += '2. Multiply the divisor by this quotient term\n';
    output += '3. Subtract the result from the dividend\n';
    output += '4. Bring down the next term\n';
    output += '5. Repeat until degree of remainder < degree of divisor\n\n';
    output += 'Note: This calculator shows the method.\n';
    output += 'Parse your polynomials and follow the steps\n';
    output += 'to complete the division manually.';

    setResult(output);
  };

  const clear = () => {
    setDividend('');
    setDivisor('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">÷</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Polynomial Division Calculator</h1>
          <p className="text-gray-600">Divide polynomials using long division method</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[150px]">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dividend (polynomial being divided)
          </label>
          <input
            type="text"
            value={dividend}
            onChange={(e) => setDividend(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="e.g., x^3 + 2x^2 - 5x + 3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Divisor (dividing by)
          </label>
          <input
            type="text"
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="e.g., x - 1"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Divide
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Division Steps */}
      <div className="mt-8 bg-gradient-to-br from-sky-50 to-blue-100 rounded-xl p-6 border border-sky-200">
        <h3 className="text-lg font-semibold text-sky-900 mb-4 flex items-center">
          <span className="text-sky-600 mr-2">📐</span>
          Long Division Algorithm
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-sky-900 mb-2">Step 1: Divide</div>
            <div className="text-sm text-sky-700">Divide the first term of dividend by first term of divisor</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-sky-900 mb-2">Step 2: Multiply</div>
            <div className="text-sm text-sky-700">Multiply the entire divisor by the quotient term</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-sky-900 mb-2">Step 3: Subtract</div>
            <div className="text-sm text-sky-700">Subtract the product from the dividend</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-sky-900 mb-2">Step 4: Repeat</div>
            <div className="text-sm text-sky-700">Continue process with the remainder</div>
          </div>
        </div>
      </div>

      {/* Example */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Example: (x³ + 2x² - 5x + 3) ÷ (x - 1)
        </h3>
        <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-1">
          <div className="text-purple-900">Step 1: x³ ÷ x = x²</div>
          <div className="text-purple-700">Step 2: x²(x - 1) = x³ - x²</div>
          <div className="text-purple-700">Step 3: (x³ + 2x²) - (x³ - x²) = 3x²</div>
          <div className="text-purple-900 mt-2">Step 4: 3x² ÷ x = 3x</div>
          <div className="text-purple-700">Step 5: 3x(x - 1) = 3x² - 3x</div>
          <div className="text-purple-700">Step 6: (3x² - 5x) - (3x² - 3x) = -2x</div>
          <div className="text-purple-900 mt-2">Step 7: -2x ÷ x = -2</div>
          <div className="text-purple-700">Step 8: -2(x - 1) = -2x + 2</div>
          <div className="text-purple-700">Step 9: (-2x + 3) - (-2x + 2) = 1</div>
          <div className="text-purple-900 font-bold mt-3">Quotient: x² + 3x - 2</div>
          <div className="text-purple-900 font-bold">Remainder: 1</div>
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
            <div className="font-semibold text-green-900 mb-2">Algebra</div>
            <div className="text-sm text-green-700">• Simplifying expressions</div>
            <div className="text-sm text-green-700">• Finding factors</div>
            <div className="text-sm text-green-700">• Solving equations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Calculus</div>
            <div className="text-sm text-green-700">• Integration</div>
            <div className="text-sm text-green-700">• Partial fractions</div>
            <div className="text-sm text-green-700">• Limit evaluation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Engineering</div>
            <div className="text-sm text-green-700">• Signal processing</div>
            <div className="text-sm text-green-700">• Control theory</div>
            <div className="text-sm text-green-700">• System analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
}
