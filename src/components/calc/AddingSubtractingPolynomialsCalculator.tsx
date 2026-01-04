'use client';

import { useState } from 'react';

export default function AddingSubtractingPolynomialsCalculator() {
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [poly1, setPoly1] = useState<string>('');
  const [poly2, setPoly2] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const parsePolynomial = (poly: string): Map<number, number> => {
    const terms = new Map<number, number>();
    // Match terms like 3x^2, -2x, 5, etc.
    const regex = /([+-]?\d*\.?\d*)\s*x?\^?(\d*)/g;
    let match;

    const cleanPoly = poly.replace(/\s/g, '');
    const termRegex = /([+-]?\d*\.?\d*)x\^?(\d+)|([+-]?\d*\.?\d*)x|([+-]?\d+\.?\d*)/g;

    while ((match = termRegex.exec(cleanPoly)) !== null) {
      if (match[1] !== undefined) {
        // Term like 3x^2
        const coef = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseFloat(match[1]);
        const exp = parseInt(match[2]);
        terms.set(exp, (terms.get(exp) || 0) + coef);
      } else if (match[3] !== undefined) {
        // Term like 3x
        const coef = match[3] === '' || match[3] === '+' ? 1 : match[3] === '-' ? -1 : parseFloat(match[3]);
        terms.set(1, (terms.get(1) || 0) + coef);
      } else if (match[4] !== undefined) {
        // Constant term
        const coef = parseFloat(match[4]);
        terms.set(0, (terms.get(0) || 0) + coef);
      }
    }

    return terms;
  };

  const formatPolynomial = (terms: Map<number, number>): string => {
    const sorted = Array.from(terms.entries()).sort((a, b) => b[0] - a[0]);
    let result = '';

    for (const [exp, coef] of sorted) {
      if (coef === 0) continue;

      const sign = coef > 0 && result ? '+' : '';
      const absCoef = Math.abs(coef);
      const coefStr = absCoef === 1 && exp > 0 ? '' : absCoef.toString();

      if (exp === 0) {
        result += `${sign}${coef}`;
      } else if (exp === 1) {
        result += `${sign}${coef < 0 ? '-' : ''}${coefStr}x`;
      } else {
        result += `${sign}${coef < 0 ? '-' : ''}${coefStr}x^${exp}`;
      }
    }

    return result || '0';
  };

  const calculate = () => {
    try {
      const terms1 = parsePolynomial(poly1);
      const terms2 = parsePolynomial(poly2);
      const resultTerms = new Map<number, number>();

      // Add all terms from first polynomial
      for (const [exp, coef] of terms1) {
        resultTerms.set(exp, coef);
      }

      // Add or subtract terms from second polynomial
      for (const [exp, coef] of terms2) {
        const current = resultTerms.get(exp) || 0;
        resultTerms.set(exp, operation === 'add' ? current + coef : current - coef);
      }

      const resultStr = formatPolynomial(resultTerms);
      setResult(resultStr);
      setSteps(`(${poly1}) ${operation === 'add' ? '+' : '-'} (${poly2})\n= ${resultStr}`);
    } catch (error) {
      setResult('Error parsing polynomials');
      setSteps('Please check your polynomial format');
    }
  };

  const clear = () => {
    setPoly1('');
    setPoly2('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">x²+</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Adding & Subtracting Polynomials Calculator</h1>
          <p className="text-gray-600">Add or subtract polynomials and combine like terms</p>
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

      {/* Operation Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Operation</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setOperation('add')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'add'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Addition
          </button>
          <button
            onClick={() => setOperation('subtract')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'subtract'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Subtraction
          </button>
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., 3x^2 + 2x - 5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Second Polynomial
          </label>
          <input
            type="text"
            value={poly2}
            onChange={(e) => setPoly2(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., x^2 - 4x + 3"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-green-50 to-teal-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">📐</span>
          Polynomial Operations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Like Terms</div>
            <div className="text-sm text-green-700 font-mono">Combine terms with same variable and exponent</div>
            <div className="text-xs text-green-600 mt-1">3x² + 2x² = 5x²</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Addition</div>
            <div className="text-sm text-green-700 font-mono">(a + b) + (c + d) = (a + c) + (b + d)</div>
            <div className="text-xs text-green-600 mt-1">Add coefficients of like terms</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Subtraction</div>
            <div className="text-sm text-green-700 font-mono">(a + b) - (c + d) = (a - c) + (b - d)</div>
            <div className="text-xs text-green-600 mt-1">Distribute negative sign</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Standard Form</div>
            <div className="text-sm text-green-700 font-mono">Write in descending order of exponents</div>
            <div className="text-xs text-green-600 mt-1">x³ + 2x² - 3x + 1</div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💼</span>
          Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Algebra</div>
            <div className="text-sm text-blue-700">• Simplifying expressions</div>
            <div className="text-sm text-blue-700">• Solving equations</div>
            <div className="text-sm text-blue-700">• Function operations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Calculus</div>
            <div className="text-sm text-blue-700">• Derivative rules</div>
            <div className="text-sm text-blue-700">• Integration</div>
            <div className="text-sm text-blue-700">• Taylor series</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Physics</div>
            <div className="text-sm text-blue-700">• Motion equations</div>
            <div className="text-sm text-blue-700">• Energy calculations</div>
            <div className="text-sm text-blue-700">• Modeling systems</div>
          </div>
        </div>
      </div>
    </div>
  );
}
