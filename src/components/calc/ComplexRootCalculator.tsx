'use client';

import { useState } from 'react';

export default function ComplexRootCalculator() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const calculate = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);

    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal)) {
      setResult('Invalid input');
      setSteps('Please enter valid numbers');
      return;
    }

    if (aVal === 0) {
      setResult('Error: a cannot be 0');
      setSteps('This is not a quadratic equation');
      return;
    }

    // Calculate discriminant
    const discriminant = bVal * bVal - 4 * aVal * cVal;

    let resultStr = '';
    let stepsStr = `Equation: ${aVal}x² ${bVal >= 0 ? '+' : ''}${bVal}x ${cVal >= 0 ? '+' : ''}${cVal} = 0\n\n`;
    stepsStr += `Discriminant: Δ = b² - 4ac\n`;
    stepsStr += `Δ = (${bVal})² - 4(${aVal})(${cVal})\n`;
    stepsStr += `Δ = ${discriminant.toFixed(4)}\n\n`;

    if (discriminant >= 0) {
      // Real roots
      const sqrt = Math.sqrt(discriminant);
      const x1 = (-bVal + sqrt) / (2 * aVal);
      const x2 = (-bVal - sqrt) / (2 * aVal);

      resultStr = `x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`;
      stepsStr += `Real roots (Δ ≥ 0):\n`;
      stepsStr += `x = (-b ± √Δ) / (2a)\n`;
      stepsStr += `x₁ = ${x1.toFixed(4)}\n`;
      stepsStr += `x₂ = ${x2.toFixed(4)}`;
    } else {
      // Complex roots
      const realPart = -bVal / (2 * aVal);
      const imagPart = Math.sqrt(-discriminant) / (2 * aVal);

      resultStr = `x₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i\n`;
      resultStr += `x₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;

      stepsStr += `Complex roots (Δ < 0):\n`;
      stepsStr += `x = (-b ± i√|Δ|) / (2a)\n`;
      stepsStr += `Real part: -b/(2a) = ${realPart.toFixed(4)}\n`;
      stepsStr += `Imaginary part: √|Δ|/(2a) = ${imagPart.toFixed(4)}\n\n`;
      stepsStr += `x₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i\n`;
      stepsStr += `x₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;
    }

    setResult(resultStr);
    setSteps(stepsStr);
  };

  const clear = () => {
    setA('');
    setB('');
    setC('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">√i</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complex Root Calculator</h1>
          <p className="text-gray-600">Find complex roots of quadratic equations</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6 whitespace-pre-line">
            {steps || ' '}
          </div>
          <div className="text-2xl font-mono text-right whitespace-pre-line">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coefficient a (x² term)
          </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Enter coefficient a"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coefficient b (x term)
          </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Enter coefficient b"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Constant c
          </label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Enter constant c"
            step="0.1"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl p-6 border border-emerald-200">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
          <span className="text-emerald-600 mr-2">📐</span>
          Quadratic Formula
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-emerald-900 mb-2">General Formula</div>
            <div className="text-sm text-emerald-700 font-mono">x = (-b ± √(b² - 4ac)) / (2a)</div>
            <div className="text-xs text-emerald-600 mt-1">For ax² + bx + c = 0</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-emerald-900 mb-2">Discriminant</div>
            <div className="text-sm text-emerald-700 font-mono">Δ = b² - 4ac</div>
            <div className="text-xs text-emerald-600 mt-1">Determines root type</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-emerald-900 mb-2">Real Roots</div>
            <div className="text-sm text-emerald-700 font-mono">Δ ≥ 0: Two real roots</div>
            <div className="text-xs text-emerald-600 mt-1">May be distinct or equal</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-emerald-900 mb-2">Complex Roots</div>
            <div className="text-sm text-emerald-700 font-mono">Δ &lt; 0: Two complex conjugates</div>
            <div className="text-xs text-emerald-600 mt-1">a ± bi form</div>
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
            <div className="font-semibold text-blue-900 mb-2">Engineering</div>
            <div className="text-sm text-blue-700">• Control systems</div>
            <div className="text-sm text-blue-700">• Oscillation analysis</div>
            <div className="text-sm text-blue-700">• Circuit design</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Physics</div>
            <div className="text-sm text-blue-700">• Quantum mechanics</div>
            <div className="text-sm text-blue-700">• Wave equations</div>
            <div className="text-sm text-blue-700">• Damped oscillations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Mathematics</div>
            <div className="text-sm text-blue-700">• Polynomial factoring</div>
            <div className="text-sm text-blue-700">• Complex analysis</div>
            <div className="text-sm text-blue-700">• Eigenvalue problems</div>
          </div>
        </div>
      </div>
    </div>
  );
}
