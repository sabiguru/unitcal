'use client';

import { useState } from 'react';

export default function MultiplyingPolynomialsCalculator() {
  const [poly1, setPoly1] = useState<string>('');
  const [poly2, setPoly2] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const parsePolynomial = (polyStr: string): Map<number, number> => {
    const terms = new Map<number, number>();
    // Simple parser for polynomials like "2x^2 + 3x - 5" or "x^2 + 1"
    const termRegex = /([+-]?\s*\d*\.?\d*)\s*\*?\s*x?\^?(\d*)/g;

    let match;
    while ((match = termRegex.exec(polyStr)) !== null) {
      let coeff = match[1].replace(/\s/g, '');
      const power = match[2] ? parseInt(match[2]) : (polyStr.includes('x') && match[0].includes('x') ? 1 : 0);

      if (coeff === '' || coeff === '+') coeff = '1';
      if (coeff === '-') coeff = '-1';
      if (!match[0].includes('x') && match[2] === '') {
        // Constant term
        const currentConst = terms.get(0) || 0;
        terms.set(0, currentConst + parseFloat(coeff));
      } else {
        const currentCoeff = terms.get(power) || 0;
        terms.set(power, currentCoeff + parseFloat(coeff));
      }
    }

    return terms;
  };

  const multiplyPolynomials = (p1: Map<number, number>, p2: Map<number, number>): Map<number, number> => {
    const result = new Map<number, number>();

    for (const [pow1, coeff1] of p1.entries()) {
      for (const [pow2, coeff2] of p2.entries()) {
        const newPower = pow1 + pow2;
        const newCoeff = coeff1 * coeff2;
        const current = result.get(newPower) || 0;
        result.set(newPower, current + newCoeff);
      }
    }

    return result;
  };

  const formatPolynomial = (terms: Map<number, number>): string => {
    const powers = Array.from(terms.keys()).sort((a, b) => b - a);
    let result = '';

    for (const power of powers) {
      const coeff = terms.get(power)!;
      if (Math.abs(coeff) < 0.0001) continue;

      if (result && coeff > 0) result += ' + ';
      if (coeff < 0) result += result ? ' - ' : '-';

      const absCoeff = Math.abs(coeff);

      if (power === 0) {
        result += absCoeff;
      } else if (power === 1) {
        result += absCoeff === 1 ? 'x' : `${absCoeff}x`;
      } else {
        result += absCoeff === 1 ? `x^${power}` : `${absCoeff}x^${power}`;
      }
    }

    return result || '0';
  };

  const calculate = () => {
    if (!poly1.trim() || !poly2.trim()) {
      setResult('Please enter both polynomials');
      return;
    }

    try {
      const p1 = parsePolynomial(poly1);
      const p2 = parsePolynomial(poly2);
      const product = multiplyPolynomials(p1, p2);
      const formatted = formatPolynomial(product);

      setResult(`Result: ${formatted}`);
    } catch (error) {
      setResult('Error: Invalid polynomial format');
    }
  };

  const clear = () => {
    setPoly1('');
    setPoly2('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-fuchsia-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">∏</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Multiplying Polynomials Calculator</h1>
          <p className="text-gray-600">Multiply polynomial expressions of any degree</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 min-h-[40px]">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Polynomial
          </label>
          <input
            type="text"
            value={poly1}
            onChange={(e) => setPoly1(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            placeholder="e.g., x^2 + 3x + 2"
          />
          <div className="text-xs text-gray-500 mt-1">
            Use format: x^2 + 3x + 2 or 2x^3 - 5x + 1
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Second Polynomial
          </label>
          <input
            type="text"
            value={poly2}
            onChange={(e) => setPoly2(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            placeholder="e.g., x + 1"
          />
          <div className="text-xs text-gray-500 mt-1">
            Use ^ for exponents (x^2, x^3, etc.)
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-fuchsia-500 hover:bg-fuchsia-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Multiply
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Multiplication Methods */}
      <div className="mt-8 bg-gradient-to-br from-fuchsia-50 to-pink-100 rounded-xl p-6 border border-fuchsia-200">
        <h3 className="text-lg font-semibold text-fuchsia-900 mb-4 flex items-center">
          <span className="text-fuchsia-600 mr-2">📐</span>
          Polynomial Multiplication Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-fuchsia-900 mb-2">Distributive Property</div>
            <div className="text-sm text-fuchsia-700">Multiply each term by every term</div>
            <div className="text-xs text-fuchsia-600 mt-1">a(b + c) = ab + ac</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-fuchsia-900 mb-2">Exponent Rule</div>
            <div className="text-sm text-fuchsia-700">Add exponents when multiplying</div>
            <div className="text-xs text-fuchsia-600 mt-1">x^a × x^b = x^(a+b)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-fuchsia-900 mb-2">Coefficient Rule</div>
            <div className="text-sm text-fuchsia-700">Multiply coefficients together</div>
            <div className="text-xs text-fuchsia-600 mt-1">2x × 3x = 6x²</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-fuchsia-900 mb-2">Combine Like Terms</div>
            <div className="text-sm text-fuchsia-700">Add coefficients of same power</div>
            <div className="text-xs text-fuchsia-600 mt-1">2x² + 3x² = 5x²</div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Step-by-Step Examples
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">(x + 2)(x² + 3x + 1)</div>
            <div className="text-sm text-blue-700">= x(x² + 3x + 1) + 2(x² + 3x + 1)</div>
            <div className="text-sm text-blue-700">= x³ + 3x² + x + 2x² + 6x + 2</div>
            <div className="text-sm text-blue-700 font-semibold">= x³ + 5x² + 7x + 2</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">(2x - 1)(x² + x - 3)</div>
            <div className="text-sm text-blue-700">= 2x(x² + x - 3) - 1(x² + x - 3)</div>
            <div className="text-sm text-blue-700">= 2x³ + 2x² - 6x - x² - x + 3</div>
            <div className="text-sm text-blue-700 font-semibold">= 2x³ + x² - 7x + 3</div>
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
            <div className="font-semibold text-green-900 mb-2">Algebra</div>
            <div className="text-sm text-green-700">• Expression expansion</div>
            <div className="text-sm text-green-700">• Equation solving</div>
            <div className="text-sm text-green-700">• Simplification</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Calculus</div>
            <div className="text-sm text-green-700">• Derivatives</div>
            <div className="text-sm text-green-700">• Integration</div>
            <div className="text-sm text-green-700">• Taylor series</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Engineering</div>
            <div className="text-sm text-green-700">• Signal processing</div>
            <div className="text-sm text-green-700">• Control systems</div>
            <div className="text-sm text-green-700">• Transfer functions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
