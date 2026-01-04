'use client';

import { useState } from 'react';

export default function GammaFunctionCalculator() {
  const [x, setX] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  // Lanczos approximation for gamma function
  const gamma = (z: number): number => {
    if (z < 0.5) {
      // Reflection formula: Γ(z)Γ(1-z) = π/sin(πz)
      return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }

    // Lanczos coefficients
    const g = 7;
    const coef = [
      0.99999999999980993,
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.13857109526572012,
      9.9843695780195716e-6,
      1.5056327351493116e-7
    ];

    z -= 1;
    let x = coef[0];
    for (let i = 1; i < g + 2; i++) {
      x += coef[i] / (z + i);
    }

    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
  };

  const calculate = () => {
    const xVal = parseFloat(x);

    if (isNaN(xVal)) {
      setResult('Invalid input');
      setSteps('Please enter a valid number');
      return;
    }

    if (xVal <= 0 && Number.isInteger(xVal)) {
      setResult('Undefined');
      setSteps('Gamma function is undefined for non-positive integers');
      return;
    }

    try {
      const value = gamma(xVal);

      let stepsStr = `Gamma Function: Γ(x)\n\n`;
      stepsStr += `Γ(${xVal}) = ${value.toFixed(6)}\n\n`;

      // Special cases
      if (Number.isInteger(xVal) && xVal > 0) {
        const factorial = xVal - 1;
        stepsStr += `Note: Γ(n) = (n-1)! for positive integers\n`;
        stepsStr += `Γ(${xVal}) = ${factorial}!\n\n`;
      }

      stepsStr += `Definition:\n`;
      stepsStr += `Γ(x) = ∫₀^∞ t^(x-1) e^(-t) dt\n\n`;

      stepsStr += `Properties:\n`;
      stepsStr += `• Γ(x+1) = x·Γ(x)\n`;
      stepsStr += `• Γ(n) = (n-1)! for positive integers\n`;
      stepsStr += `• Γ(1/2) = √π ≈ 1.7724\n`;
      stepsStr += `• Γ(1) = 1`;

      setResult(value.toFixed(6));
      setSteps(stepsStr);
    } catch (error) {
      setResult('Calculation error');
      setSteps('Unable to compute gamma function for this value');
    }
  };

  const clear = () => {
    setX('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">Γ</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gamma Function Calculator</h1>
          <p className="text-gray-600">Calculate the Gamma function Γ(x)</p>
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

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            x value (avoid non-positive integers)
          </label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter x"
            step="0.1"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-red-50 to-pink-100 rounded-xl p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <span className="text-red-600 mr-2">📐</span>
          Gamma Function Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Definition</div>
            <div className="text-sm text-red-700 font-mono">Γ(x) = ∫₀^∞ t^(x-1) e^(-t) dt</div>
            <div className="text-xs text-red-600 mt-1">Euler's integral</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Factorial Extension</div>
            <div className="text-sm text-red-700 font-mono">Γ(n) = (n-1)!</div>
            <div className="text-xs text-red-600 mt-1">For positive integers n</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Recurrence</div>
            <div className="text-sm text-red-700 font-mono">Γ(x+1) = x·Γ(x)</div>
            <div className="text-xs text-red-600 mt-1">Fundamental property</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Reflection Formula</div>
            <div className="text-sm text-red-700 font-mono">Γ(x)·Γ(1-x) = π/sin(πx)</div>
            <div className="text-xs text-red-600 mt-1">Euler's reflection formula</div>
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
            <div className="text-sm text-blue-700">• Probability distributions</div>
            <div className="text-sm text-blue-700">• Beta function</div>
            <div className="text-sm text-blue-700">• Chi-squared distribution</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Physics</div>
            <div className="text-sm text-blue-700">• Quantum mechanics</div>
            <div className="text-sm text-blue-700">• Statistical mechanics</div>
            <div className="text-sm text-blue-700">• Special functions</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Mathematics</div>
            <div className="text-sm text-blue-700">• Complex analysis</div>
            <div className="text-sm text-blue-700">• Number theory</div>
            <div className="text-sm text-blue-700">• Integral calculus</div>
          </div>
        </div>
      </div>

      {/* Special Values */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💡</span>
          Special Values
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">Γ(1) = 1</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">Γ(2) = 1</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">Γ(1/2) = √π ≈ 1.7724</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">Γ(3) = 2</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">Γ(4) = 6</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">Γ(5) = 24</div>
          </div>
        </div>
      </div>
    </div>
  );
}
