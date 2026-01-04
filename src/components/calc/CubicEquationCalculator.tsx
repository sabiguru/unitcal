'use client';

import { useState } from 'react';

export default function CubicEquationCalculator() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [d, setD] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const calculate = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);
    const dVal = parseFloat(d);

    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal) || isNaN(dVal)) {
      setResult('Invalid input');
      setSteps('Please enter valid numbers');
      return;
    }

    if (aVal === 0) {
      setResult('Error: a cannot be 0');
      setSteps('This is not a cubic equation');
      return;
    }

    // Convert to depressed cubic: t³ + pt + q = 0
    const p = (3 * aVal * cVal - bVal * bVal) / (3 * aVal * aVal);
    const q = (2 * bVal * bVal * bVal - 9 * aVal * bVal * cVal + 27 * aVal * aVal * dVal) / (27 * aVal * aVal * aVal);

    // Calculate discriminant
    const discriminant = -(4 * p * p * p + 27 * q * q);

    let stepsStr = `Equation: ${aVal}x³ ${bVal >= 0 ? '+' : ''}${bVal}x² ${cVal >= 0 ? '+' : ''}${cVal}x ${dVal >= 0 ? '+' : ''}${dVal} = 0\n\n`;
    stepsStr += `Depressed cubic parameters:\n`;
    stepsStr += `p = ${p.toFixed(4)}\n`;
    stepsStr += `q = ${q.toFixed(4)}\n`;
    stepsStr += `Discriminant: Δ = ${discriminant.toFixed(4)}\n\n`;

    let resultStr = '';

    if (discriminant > 0) {
      // Three distinct real roots (Vieta's trigonometric formula)
      const m = 2 * Math.sqrt(-p / 3);
      const theta = Math.acos((3 * q) / (p * m)) / 3;
      const offset = -bVal / (3 * aVal);

      const x1 = m * Math.cos(theta) + offset;
      const x2 = m * Math.cos(theta - (2 * Math.PI) / 3) + offset;
      const x3 = m * Math.cos(theta - (4 * Math.PI) / 3) + offset;

      resultStr = `x₁ = ${x1.toFixed(4)}\nx₂ = ${x2.toFixed(4)}\nx₃ = ${x3.toFixed(4)}`;
      stepsStr += `Three distinct real roots (Δ > 0):\n${resultStr}`;
    } else {
      // Use Cardano's formula for one real root
      const u = Math.cbrt(-q / 2 + Math.sqrt(-discriminant / 108));
      const v = Math.cbrt(-q / 2 - Math.sqrt(-discriminant / 108));
      const x1 = u + v - bVal / (3 * aVal);

      resultStr = `x₁ = ${x1.toFixed(4)} (real root)`;

      if (discriminant === 0) {
        // One real root and one repeated real root
        const x2 = -2 * u - bVal / (3 * aVal);
        resultStr += `\nx₂ = x₃ = ${x2.toFixed(4)} (repeated)`;
        stepsStr += `One simple and one double root (Δ = 0):\n${resultStr}`;
      } else {
        // One real root and two complex conjugate roots
        const realPart = -(u + v) / 2 - bVal / (3 * aVal);
        const imagPart = (Math.sqrt(3) / 2) * (u - v);
        resultStr += `\nx₂ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`;
        resultStr += `\nx₃ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;
        stepsStr += `One real and two complex roots (Δ < 0):\n${resultStr}`;
      }
    }

    setResult(resultStr);
    setSteps(stepsStr);
  };

  const clear = () => {
    setA('');
    setB('');
    setC('');
    setD('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">x³</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cubic Equation Calculator</h1>
          <p className="text-gray-600">Solve ax³ + bx² + cx + d = 0 using Cardano's formula</p>
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
            Coefficient a (x³ term)
          </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter coefficient a"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coefficient b (x² term)
          </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter coefficient b"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coefficient c (x term)
          </label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter coefficient c"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Constant d
          </label>
          <input
            type="number"
            value={d}
            onChange={(e) => setD(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter constant d"
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
      <div className="mt-8 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <span className="text-red-600 mr-2">📐</span>
          Cubic Equation Methods
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Standard Form</div>
            <div className="text-sm text-red-700 font-mono">ax³ + bx² + cx + d = 0</div>
            <div className="text-xs text-red-600 mt-1">General cubic equation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Cardano's Formula</div>
            <div className="text-sm text-red-700 font-mono">Complex algebraic solution</div>
            <div className="text-xs text-red-600 mt-1">16th century discovery</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Depressed Cubic</div>
            <div className="text-sm text-red-700 font-mono">t³ + pt + q = 0</div>
            <div className="text-xs text-red-600 mt-1">Eliminates x² term</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Discriminant</div>
            <div className="text-sm text-red-700 font-mono">Δ = -4p³ - 27q²</div>
            <div className="text-xs text-red-600 mt-1">Determines root types</div>
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
            <div className="text-sm text-blue-700">• Projectile motion</div>
            <div className="text-sm text-blue-700">• Fluid dynamics</div>
            <div className="text-sm text-blue-700">• Thermodynamics</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Engineering</div>
            <div className="text-sm text-blue-700">• Structural analysis</div>
            <div className="text-sm text-blue-700">• Control systems</div>
            <div className="text-sm text-blue-700">• Signal processing</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Mathematics</div>
            <div className="text-sm text-blue-700">• Polynomial factoring</div>
            <div className="text-sm text-blue-700">• Root finding</div>
            <div className="text-sm text-blue-700">• Algebraic geometry</div>
          </div>
        </div>
      </div>
    </div>
  );
}
