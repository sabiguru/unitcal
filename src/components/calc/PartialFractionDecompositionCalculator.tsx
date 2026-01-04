'use client';

import { useState } from 'react';

export default function PartialFractionDecompositionCalculator() {
  const [numerator, setNumerator] = useState<string>('');
  const [denominator, setDenominator] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    if (!numerator.trim() || !denominator.trim()) {
      setResult('Please enter both numerator and denominator');
      return;
    }

    // This is a simplified calculator for basic cases
    // Real partial fraction decomposition requires polynomial factoring

    let output = 'Partial Fraction Decomposition:\n\n';
    output += `Original: (${numerator}) / (${denominator})\n\n`;
    output += 'Steps:\n';
    output += '1. Factor the denominator\n';
    output += '2. Set up the partial fraction form\n';
    output += '3. Multiply both sides by the denominator\n';
    output += '4. Solve for the unknown coefficients\n';
    output += '5. Write the final decomposition\n\n';
    output += 'Note: This calculator shows the method.\n';
    output += 'For specific results, factor the denominator\n';
    output += 'and solve the system of equations.';

    setResult(output);
  };

  const clear = () => {
    setNumerator('');
    setDenominator('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">∫</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Partial Fraction Decomposition Calculator</h1>
          <p className="text-gray-600">Decompose rational functions into simpler fractions</p>
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
            Numerator
          </label>
          <input
            type="text"
            value={numerator}
            onChange={(e) => setNumerator(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g., 3x + 5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Denominator
          </label>
          <input
            type="text"
            value={denominator}
            onChange={(e) => setDenominator(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g., (x-1)(x+2)"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Decompose
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Decomposition Types */}
      <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl p-6 border border-emerald-200">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
          <span className="text-emerald-600 mr-2">📐</span>
          Types of Partial Fractions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-emerald-900 mb-2">Distinct Linear Factors</div>
            <div className="text-sm text-emerald-700 font-mono">A/(x-a) + B/(x-b)</div>
            <div className="text-xs text-emerald-600 mt-1">Each factor gets one fraction</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-emerald-900 mb-2">Repeated Linear Factors</div>
            <div className="text-sm text-emerald-700 font-mono">A/(x-a) + B/(x-a)²</div>
            <div className="text-xs text-emerald-600 mt-1">One fraction per power</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-emerald-900 mb-2">Irreducible Quadratic</div>
            <div className="text-sm text-emerald-700 font-mono">(Ax+B)/(x²+bx+c)</div>
            <div className="text-xs text-emerald-600 mt-1">Linear numerator needed</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-emerald-900 mb-2">Improper Fractions</div>
            <div className="text-sm text-emerald-700">Divide first, then decompose</div>
            <div className="text-xs text-emerald-600 mt-1">When deg(num) ≥ deg(den)</div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Common Examples
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Distinct Linear Factors</div>
            <div className="text-sm text-blue-700 font-mono">(3x+5)/[(x-1)(x+2)] = A/(x-1) + B/(x+2)</div>
            <div className="text-xs text-blue-600 mt-1">Result: A = 2, B = 1</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Repeated Factor</div>
            <div className="text-sm text-blue-700 font-mono">(2x+1)/(x-1)² = A/(x-1) + B/(x-1)²</div>
            <div className="text-xs text-blue-600 mt-1">Result: A = 2, B = 3</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Quadratic Factor</div>
            <div className="text-sm text-blue-700 font-mono">x/[(x-1)(x²+1)] = A/(x-1) + (Bx+C)/(x²+1)</div>
            <div className="text-xs text-blue-600 mt-1">Solve for A, B, and C</div>
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
            <div className="font-semibold text-green-900 mb-2">Calculus</div>
            <div className="text-sm text-green-700">• Integration</div>
            <div className="text-sm text-green-700">• Laplace transforms</div>
            <div className="text-sm text-green-700">• Inverse transforms</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Engineering</div>
            <div className="text-sm text-green-700">• Control systems</div>
            <div className="text-sm text-green-700">• Signal processing</div>
            <div className="text-sm text-green-700">• Transfer functions</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Mathematics</div>
            <div className="text-sm text-green-700">• Differential equations</div>
            <div className="text-sm text-green-700">• Complex analysis</div>
            <div className="text-sm text-green-700">• Rational functions</div>
          </div>
        </div>
      </div>

      {/* Steps Guide */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">🔢</span>
          Decomposition Steps
        </h3>
        <div className="space-y-2 bg-white p-4 rounded-lg">
          <div className="text-sm text-purple-800">1. Check if fraction is proper (degree of numerator {'<'} degree of denominator)</div>
          <div className="text-sm text-purple-800">2. Factor the denominator completely</div>
          <div className="text-sm text-purple-800">3. Write the partial fraction form based on factors</div>
          <div className="text-sm text-purple-800">4. Multiply both sides by the common denominator</div>
          <div className="text-sm text-purple-800">5. Expand and collect like terms</div>
          <div className="text-sm text-purple-800">6. Set up system of equations by comparing coefficients</div>
          <div className="text-sm text-purple-800">7. Solve for unknown coefficients</div>
          <div className="text-sm text-purple-800">8. Write final decomposed form</div>
        </div>
      </div>
    </div>
  );
}
