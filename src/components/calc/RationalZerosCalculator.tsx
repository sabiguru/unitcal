'use client';

import { useState } from 'react';

export default function RationalZerosCalculator() {
  const [coefficients, setCoefficients] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const getDivisors = (n: number): number[] => {
    const divisors: number[] = [];
    const absN = Math.abs(n);

    for (let i = 1; i <= absN; i++) {
      if (absN % i === 0) {
        divisors.push(i);
        if (i !== absN / i) {
          divisors.push(-i);
        }
      }
    }
    divisors.push(-absN);

    return divisors.sort((a, b) => a - b);
  };

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const calculate = () => {
    if (!coefficients.trim()) {
      setResult('Please enter coefficients');
      return;
    }

    const coeffs = coefficients.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

    if (coeffs.length < 2) {
      setResult('Please enter at least 2 coefficients');
      return;
    }

    const leadingCoeff = coeffs[0];
    const constantTerm = coeffs[coeffs.length - 1];

    if (leadingCoeff === 0) {
      setResult('Leading coefficient cannot be 0');
      return;
    }

    if (constantTerm === 0) {
      setResult('x = 0 is a zero (constant term is 0)');
      return;
    }

    const pFactors = getDivisors(constantTerm);
    const qFactors = getDivisors(leadingCoeff);

    const possibleZeros = new Set<string>();

    for (const p of pFactors) {
      for (const q of qFactors) {
        if (q !== 0) {
          const divisor = gcd(Math.abs(p), Math.abs(q));
          const simplified = `${p / divisor}/${q / divisor}`;
          const value = p / q;

          if (q === 1 || q === -1) {
            possibleZeros.add((p / q).toString());
          } else {
            possibleZeros.add(simplified);
          }
        }
      }
    }

    const zerosArray = Array.from(possibleZeros).sort();

    let output = 'Rational Root Theorem:\n\n';
    output += `Polynomial coefficients: [${coeffs.join(', ')}]\n`;
    output += `Leading coefficient (a₀): ${leadingCoeff}\n`;
    output += `Constant term (aₙ): ${constantTerm}\n\n`;
    output += `Factors of ${constantTerm} (p): ${pFactors.join(', ')}\n`;
    output += `Factors of ${leadingCoeff} (q): ${qFactors.join(', ')}\n\n`;
    output += `Possible rational zeros (p/q):\n`;
    output += zerosArray.join(', ');

    setResult(output);
  };

  const clear = () => {
    setCoefficients('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">ℚ</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rational Zeros Calculator</h1>
          <p className="text-gray-600">Find possible rational zeros using the Rational Root Theorem</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[150px] overflow-y-auto max-h-[300px]">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Polynomial Coefficients (comma-separated)
          </label>
          <input
            type="text"
            value={coefficients}
            onChange={(e) => setCoefficients(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="e.g., 2, -3, -1, 6 for 2x³ - 3x² - x + 6"
          />
          <div className="text-xs text-gray-500 mt-1">
            Enter coefficients from highest to lowest degree
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Find Zeros
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Rational Root Theorem */}
      <div className="mt-8 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
          <span className="text-yellow-600 mr-2">📐</span>
          Rational Root Theorem
        </h3>
        <div className="bg-white p-6 rounded-lg">
          <div className="font-semibold text-yellow-900 mb-3">
            For polynomial: aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀ = 0
          </div>
          <div className="text-sm text-yellow-700 mb-2">
            If p/q is a rational zero (in lowest terms), then:
          </div>
          <div className="text-sm text-yellow-700 font-mono mb-2">
            • p is a factor of the constant term (a₀)
          </div>
          <div className="text-sm text-yellow-700 font-mono">
            • q is a factor of the leading coefficient (aₙ)
          </div>
        </div>
      </div>

      {/* Example */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Example: 2x³ - 3x² - x + 6 = 0
        </h3>
        <div className="bg-white p-4 rounded-lg space-y-2">
          <div className="text-sm text-blue-700">Leading coefficient: 2</div>
          <div className="text-sm text-blue-700">Constant term: 6</div>
          <div className="text-sm text-blue-700 mt-3">Factors of 6 (p): ±1, ±2, ±3, ±6</div>
          <div className="text-sm text-blue-700">Factors of 2 (q): ±1, ±2</div>
          <div className="text-sm text-blue-900 font-semibold mt-3">
            Possible rational zeros (p/q):
          </div>
          <div className="text-sm text-blue-700">
            ±1, ±2, ±3, ±6, ±1/2, ±3/2
          </div>
          <div className="text-sm text-blue-900 font-semibold mt-3">
            Test each to find actual zeros!
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
            <div className="text-sm text-green-700">• Finding polynomial roots</div>
            <div className="text-sm text-green-700">• Factoring polynomials</div>
            <div className="text-sm text-green-700">• Solving equations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Mathematics</div>
            <div className="text-sm text-green-700">• Number theory</div>
            <div className="text-sm text-green-700">• Root finding</div>
            <div className="text-sm text-green-700">• Polynomial analysis</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Calculus</div>
            <div className="text-sm text-green-700">• Critical points</div>
            <div className="text-sm text-green-700">• Optimization</div>
            <div className="text-sm text-green-700">• Curve sketching</div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💭</span>
          Important Notes
        </h3>
        <div className="space-y-2 bg-white p-4 rounded-lg">
          <div className="text-sm text-purple-800">• The theorem gives POSSIBLE zeros, not guaranteed zeros</div>
          <div className="text-sm text-purple-800">• You must test each candidate by substitution</div>
          <div className="text-sm text-purple-800">• Once found, use synthetic division to factor</div>
          <div className="text-sm text-purple-800">• Irrational and complex zeros won't appear in this list</div>
          <div className="text-sm text-purple-800">• The list can be long for polynomials with many factors</div>
        </div>
      </div>
    </div>
  );
}
