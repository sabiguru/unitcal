'use client';

import { useState } from 'react';

export default function BinomialCoefficientCalculator() {
  const [n, setN] = useState<string>('');
  const [k, setK] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const factorial = (num: number): bigint => {
    if (num <= 1) return BigInt(1);
    let result = BigInt(1);
    for (let i = 2; i <= num; i++) {
      result *= BigInt(i);
    }
    return result;
  };

  const binomialCoefficient = (n: number, k: number): bigint => {
    if (k > n) return BigInt(0);
    if (k === 0 || k === n) return BigInt(1);

    // Use smaller k for efficiency: C(n,k) = C(n,n-k)
    k = Math.min(k, n - k);

    let result = BigInt(1);
    for (let i = 0; i < k; i++) {
      result *= BigInt(n - i);
      result /= BigInt(i + 1);
    }
    return result;
  };

  const calculate = () => {
    const nVal = parseInt(n);
    const kVal = parseInt(k);

    if (isNaN(nVal) || isNaN(kVal)) {
      setResult('Invalid input');
      setSteps('Please enter valid integers');
      return;
    }

    if (nVal < 0 || kVal < 0) {
      setResult('Values must be non-negative');
      setSteps('n and k must be ≥ 0');
      return;
    }

    if (kVal > nVal) {
      setResult('0');
      setSteps('C(n,k) = 0 when k > n');
      return;
    }

    try {
      const coefficient = binomialCoefficient(nVal, kVal);
      const nFactorial = factorial(nVal);
      const kFactorial = factorial(kVal);
      const nMinusKFactorial = factorial(nVal - kVal);

      setResult(coefficient.toString());
      setSteps(
        `C(${nVal}, ${kVal}) = ${nVal}! / (${kVal}! × (${nVal - kVal})!)\n` +
        `= ${nFactorial.toString()} / (${kFactorial.toString()} × ${nMinusKFactorial.toString()})\n` +
        `= ${coefficient.toString()}`
      );
    } catch (error) {
      setResult('Calculation error');
      setSteps('Number too large to compute');
    }
  };

  const clear = () => {
    setN('');
    setK('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">C</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Binomial Coefficient Calculator</h1>
          <p className="text-gray-600">Calculate C(n,k) = n!/(k!(n-k)!)</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6 whitespace-pre-line">
            {steps || ' '}
          </div>
          <div className="text-3xl font-mono text-right break-all">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            n (total items)
          </label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter n"
            min="0"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            k (items to choose)
          </label>
          <input
            type="number"
            value={k}
            onChange={(e) => setK(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter k"
            min="0"
            step="1"
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

      {/* Formulas */}
      <div className="mt-8 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-6 border border-cyan-200">
        <h3 className="text-lg font-semibold text-cyan-900 mb-4 flex items-center">
          <span className="text-cyan-600 mr-2">📐</span>
          Binomial Coefficient Formulas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-cyan-900 mb-2">Basic Formula</div>
            <div className="text-sm text-cyan-700 font-mono">C(n,k) = n! / (k! × (n-k)!)</div>
            <div className="text-xs text-cyan-600 mt-1">Combination formula</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-cyan-900 mb-2">Alternative Notation</div>
            <div className="text-sm text-cyan-700 font-mono">(n choose k) = nCk</div>
            <div className="text-xs text-cyan-600 mt-1">Common notations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-cyan-900 mb-2">Symmetry Property</div>
            <div className="text-sm text-cyan-700 font-mono">C(n,k) = C(n, n-k)</div>
            <div className="text-xs text-cyan-600 mt-1">Useful for optimization</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-cyan-900 mb-2">Pascal's Identity</div>
            <div className="text-sm text-cyan-700 font-mono">C(n,k) = C(n-1,k-1) + C(n-1,k)</div>
            <div className="text-xs text-cyan-600 mt-1">Recursive relation</div>
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
            <div className="font-semibold text-green-900 mb-2">Combinatorics</div>
            <div className="text-sm text-green-700">• Choosing combinations</div>
            <div className="text-sm text-green-700">• Counting problems</div>
            <div className="text-sm text-green-700">• Pascal's triangle</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Probability</div>
            <div className="text-sm text-green-700">• Binomial distribution</div>
            <div className="text-sm text-green-700">• Probability calculations</div>
            <div className="text-sm text-green-700">• Statistical analysis</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Algebra</div>
            <div className="text-sm text-green-700">• Binomial theorem</div>
            <div className="text-sm text-green-700">• Polynomial expansion</div>
            <div className="text-sm text-green-700">• Series calculations</div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Special Values
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">C(n, 0) = 1</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">C(n, 1) = n</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">C(n, n) = 1</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">C(n, 2) = n(n-1)/2</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">C(n, n-1) = n</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">C(n, k) = 0 if k &gt; n</div>
          </div>
        </div>
      </div>
    </div>
  );
}
