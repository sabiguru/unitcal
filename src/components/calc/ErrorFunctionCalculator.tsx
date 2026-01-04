'use client';

import { useState } from 'react';

export default function ErrorFunctionCalculator() {
  const [x, setX] = useState<string>('');
  const [functionType, setFunctionType] = useState<'erf' | 'erfc'>('erf');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  // Error function approximation using Taylor series
  const erf = (x: number): number => {
    // For small x, use Taylor series
    if (Math.abs(x) < 3) {
      const sqrtPi = Math.sqrt(Math.PI);
      let sum = 0;
      const terms = 50;

      for (let n = 0; n < terms; n++) {
        const numerator = Math.pow(-1, n) * Math.pow(x, 2 * n + 1);
        let denominator = 1;
        for (let i = 1; i <= n; i++) {
          denominator *= i;
        }
        denominator *= (2 * n + 1);
        sum += numerator / denominator;
      }

      return (2 / sqrtPi) * sum;
    } else {
      // For large x, use approximation
      const sign = Math.sign(x);
      const absX = Math.abs(x);

      // Abramowitz and Stegun approximation
      const a1 = 0.254829592;
      const a2 = -0.284496736;
      const a3 = 1.421413741;
      const a4 = -1.453152027;
      const a5 = 1.061405429;
      const p = 0.3275911;

      const t = 1 / (1 + p * absX);
      const erfApprox = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

      return sign * erfApprox;
    }
  };

  const erfc = (x: number): number => {
    return 1 - erf(x);
  };

  const calculate = () => {
    const xVal = parseFloat(x);

    if (isNaN(xVal)) {
      setResult('Invalid input');
      setSteps('Please enter a valid number');
      return;
    }

    let value: number;
    let stepsStr: string;

    if (functionType === 'erf') {
      value = erf(xVal);
      stepsStr = `Error function: erf(x)\n\n`;
      stepsStr += `erf(${xVal}) = ${value.toFixed(6)}\n\n`;
      stepsStr += `Definition:\n`;
      stepsStr += `erf(x) = (2/√π) ∫₀ˣ e^(-t²) dt\n\n`;
      stepsStr += `Properties:\n`;
      stepsStr += `erf(0) = 0\n`;
      stepsStr += `erf(∞) = 1\n`;
      stepsStr += `erf(-x) = -erf(x)`;
    } else {
      value = erfc(xVal);
      stepsStr = `Complementary error function: erfc(x)\n\n`;
      stepsStr += `erfc(${xVal}) = ${value.toFixed(6)}\n\n`;
      stepsStr += `Definition:\n`;
      stepsStr += `erfc(x) = 1 - erf(x)\n`;
      stepsStr += `erfc(x) = (2/√π) ∫ₓ^∞ e^(-t²) dt\n\n`;
      stepsStr += `Properties:\n`;
      stepsStr += `erfc(0) = 1\n`;
      stepsStr += `erfc(∞) = 0\n`;
      stepsStr += `erfc(-x) = 2 - erfc(x)`;
    }

    setResult(value.toFixed(6));
    setSteps(stepsStr);
  };

  const clear = () => {
    setX('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">erf</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Error Function Calculator</h1>
          <p className="text-gray-600">Calculate erf(x) and erfc(x)</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6 whitespace-pre-line">
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
            onClick={() => setFunctionType('erf')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              functionType === 'erf'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            erf(x) - Error Function
          </button>
          <button
            onClick={() => setFunctionType('erfc')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              functionType === 'erfc'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            erfc(x) - Complementary
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            x value
          </label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter x"
            step="0.1"
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
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">📐</span>
          Error Function Formulas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Error Function</div>
            <div className="text-sm text-purple-700 font-mono">erf(x) = (2/√π) ∫₀ˣ e^(-t²) dt</div>
            <div className="text-xs text-purple-600 mt-1">Probability integral</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Complementary</div>
            <div className="text-sm text-purple-700 font-mono">erfc(x) = 1 - erf(x)</div>
            <div className="text-xs text-purple-600 mt-1">Tail probability</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Symmetry</div>
            <div className="text-sm text-purple-700 font-mono">erf(-x) = -erf(x)</div>
            <div className="text-xs text-purple-600 mt-1">Odd function</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Relation to Normal</div>
            <div className="text-sm text-purple-700 font-mono">Φ(x) = (1 + erf(x/√2)) / 2</div>
            <div className="text-xs text-purple-600 mt-1">Standard normal CDF</div>
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
            <div className="font-semibold text-blue-900 mb-2">Statistics</div>
            <div className="text-sm text-blue-700">• Normal distribution</div>
            <div className="text-sm text-blue-700">• Probability calculations</div>
            <div className="text-sm text-blue-700">• Hypothesis testing</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Physics</div>
            <div className="text-sm text-blue-700">• Heat diffusion</div>
            <div className="text-sm text-blue-700">• Particle physics</div>
            <div className="text-sm text-blue-700">• Quantum mechanics</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Engineering</div>
            <div className="text-sm text-blue-700">• Communications theory</div>
            <div className="text-sm text-blue-700">• Signal processing</div>
            <div className="text-sm text-blue-700">• Reliability analysis</div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💡</span>
          Special Values
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">erf(0) = 0</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">erf(∞) = 1</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">erf(1) ≈ 0.8427</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">erfc(0) = 1</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">erfc(∞) = 0</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">erf(x) + erfc(x) = 1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
