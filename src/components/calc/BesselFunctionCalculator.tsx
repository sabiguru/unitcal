'use client';

import { useState } from 'react';

export default function BesselFunctionCalculator() {
  const [order, setOrder] = useState<string>('');
  const [x, setX] = useState<string>('');
  const [functionType, setFunctionType] = useState<'J' | 'Y'>('J');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  // Simplified Bessel function approximations
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const besselJ = (n: number, x: number, terms: number = 20): number => {
    let sum = 0;
    for (let k = 0; k < terms; k++) {
      const num = Math.pow(-1, k) * Math.pow(x / 2, n + 2 * k);
      const denom = factorial(k) * factorial(n + k);
      sum += num / denom;
    }
    return sum;
  };

  const besselY = (n: number, x: number): number => {
    // Simple approximation for Y_n(x) using relation with J_n
    const jn = besselJ(n, x);
    const jnMinus = besselJ(n - 1, x);
    // Simplified Neumann function approximation
    return (2 / Math.PI) * (Math.log(x / 2) * jn);
  };

  const calculate = () => {
    const n = parseFloat(order);
    const xVal = parseFloat(x);

    if (isNaN(n) || isNaN(xVal)) {
      setResult('Invalid input');
      setSteps('Please enter valid numbers');
      return;
    }

    if (!Number.isInteger(n) || n < 0) {
      setResult('Order must be non-negative integer');
      setSteps('n must be 0, 1, 2, 3, ...');
      return;
    }

    if (xVal < 0) {
      setResult('x must be non-negative');
      setSteps('Bessel functions require x ≥ 0');
      return;
    }

    try {
      let value: number;
      if (functionType === 'J') {
        value = besselJ(n, xVal);
        setSteps(`Bessel function of first kind: J_${n}(${xVal})`);
      } else {
        value = besselY(n, xVal);
        setSteps(`Bessel function of second kind: Y_${n}(${xVal})`);
      }
      setResult(value.toFixed(6));
    } catch (error) {
      setResult('Calculation error');
      setSteps('Unable to compute Bessel function');
    }
  };

  const clear = () => {
    setOrder('');
    setX('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">J</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bessel Function Calculator</h1>
          <p className="text-gray-600">Calculate Bessel functions J_n(x) and Y_n(x)</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {steps || ' '}
          </div>
          <div className="text-3xl font-mono text-right">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Function Type Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Function Type</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setFunctionType('J')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              functionType === 'J'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            J_n(x) - First Kind
          </button>
          <button
            onClick={() => setFunctionType('Y')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              functionType === 'Y'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Y_n(x) - Second Kind
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order (n) - must be non-negative integer
          </label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter order (0, 1, 2, ...)"
            min="0"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Argument (x)
          </label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter x value"
            step="0.1"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
          <span className="text-orange-600 mr-2">📐</span>
          Bessel Function Formulas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">First Kind</div>
            <div className="text-sm text-orange-700 font-mono">J_n(x) = Σ((-1)^k / (k!(n+k)!)) × (x/2)^(n+2k)</div>
            <div className="text-xs text-orange-600 mt-1">Series expansion</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Second Kind</div>
            <div className="text-sm text-orange-700 font-mono">Y_n(x) = Neumann function</div>
            <div className="text-xs text-orange-600 mt-1">Also called Weber function</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Recurrence Relation</div>
            <div className="text-sm text-orange-700 font-mono">J_(n-1)(x) + J_(n+1)(x) = (2n/x)J_n(x)</div>
            <div className="text-xs text-orange-600 mt-1">Useful for computation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Differential Equation</div>
            <div className="text-sm text-orange-700 font-mono">x²y'' + xy' + (x² - n²)y = 0</div>
            <div className="text-xs text-orange-600 mt-1">Bessel's equation</div>
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
            <div className="font-semibold text-blue-900 mb-2">Physics</div>
            <div className="text-sm text-blue-700">• Wave propagation</div>
            <div className="text-sm text-blue-700">• Heat conduction</div>
            <div className="text-sm text-blue-700">• Vibrating membranes</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Engineering</div>
            <div className="text-sm text-blue-700">• Signal processing</div>
            <div className="text-sm text-blue-700">• Antenna design</div>
            <div className="text-sm text-blue-700">• Acoustic analysis</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Mathematics</div>
            <div className="text-sm text-blue-700">• Cylindrical coordinates</div>
            <div className="text-sm text-blue-700">• Special functions</div>
            <div className="text-sm text-blue-700">• Fourier analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
}
