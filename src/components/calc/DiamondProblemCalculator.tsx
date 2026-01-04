'use client';

import { useState } from 'react';

export default function DiamondProblemCalculator() {
  const [product, setProduct] = useState<string>('');
  const [sum, setSum] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const calculate = () => {
    const p = parseFloat(product);
    const s = parseFloat(sum);

    if (isNaN(p) || isNaN(s)) {
      setResult('Invalid input');
      setSteps('Please enter valid numbers');
      return;
    }

    // We need to find two numbers x and y such that:
    // x + y = s
    // x * y = p
    // This gives us a quadratic: t² - st + p = 0

    const a = 1;
    const b = -s;
    const c = p;

    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
      setResult('No real solution');
      setSteps(
        `Looking for two numbers that:\n` +
        `Multiply to: ${p}\n` +
        `Add to: ${s}\n\n` +
        `Discriminant = ${discriminant.toFixed(4)} < 0\n` +
        `No real numbers satisfy these conditions`
      );
      return;
    }

    const sqrtDisc = Math.sqrt(discriminant);
    const x1 = (-b + sqrtDisc) / (2 * a);
    const x2 = (-b - sqrtDisc) / (2 * a);

    setResult(`${x1.toFixed(4)} and ${x2.toFixed(4)}`);
    setSteps(
      `Looking for two numbers that:\n` +
      `Multiply to: ${p}\n` +
      `Add to: ${s}\n\n` +
      `Using quadratic formula:\n` +
      `t² - ${s}t + ${p} = 0\n\n` +
      `Discriminant: ${discriminant.toFixed(4)}\n` +
      `√Discriminant: ${sqrtDisc.toFixed(4)}\n\n` +
      `Number 1: ${x1.toFixed(4)}\n` +
      `Number 2: ${x2.toFixed(4)}\n\n` +
      `Verification:\n` +
      `${x1.toFixed(4)} + ${x2.toFixed(4)} = ${(x1 + x2).toFixed(4)}\n` +
      `${x1.toFixed(4)} × ${x2.toFixed(4)} = ${(x1 * x2).toFixed(4)}`
    );
  };

  const clear = () => {
    setProduct('');
    setSum('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">◆</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Diamond Problem Calculator</h1>
          <p className="text-gray-600">Find two numbers that multiply to X and add to Y</p>
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
            Product (bottom of diamond)
          </label>
          <input
            type="number"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Numbers multiply to this"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sum (top of diamond)
          </label>
          <input
            type="number"
            value={sum}
            onChange={(e) => setSum(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Numbers add to this"
            step="0.1"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl p-6 border border-pink-200">
        <h3 className="text-lg font-semibold text-pink-900 mb-4 flex items-center">
          <span className="text-pink-600 mr-2">📐</span>
          Diamond Problem Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-pink-900 mb-2">Setup</div>
            <div className="text-sm text-pink-700 font-mono">Find x and y where x + y = S, xy = P</div>
            <div className="text-xs text-pink-600 mt-1">Two unknowns, two equations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-pink-900 mb-2">Quadratic Form</div>
            <div className="text-sm text-pink-700 font-mono">t² - St + P = 0</div>
            <div className="text-xs text-pink-600 mt-1">Convert to quadratic equation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-pink-900 mb-2">Solution</div>
            <div className="text-sm text-pink-700 font-mono">t = (S ± √(S² - 4P)) / 2</div>
            <div className="text-xs text-pink-600 mt-1">Quadratic formula</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-pink-900 mb-2">Factoring Connection</div>
            <div className="text-sm text-pink-700 font-mono">x² + Sx + P = (x - t₁)(x - t₂)</div>
            <div className="text-xs text-pink-600 mt-1">Used in factoring trinomials</div>
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
            <div className="font-semibold text-blue-900 mb-2">Factoring</div>
            <div className="text-sm text-blue-700">• Trinomial factoring</div>
            <div className="text-sm text-blue-700">• Quadratic equations</div>
            <div className="text-sm text-blue-700">• Polynomial manipulation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Problem Solving</div>
            <div className="text-sm text-blue-700">• Number puzzles</div>
            <div className="text-sm text-blue-700">• Algebraic thinking</div>
            <div className="text-sm text-blue-700">• Pattern recognition</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Education</div>
            <div className="text-sm text-blue-700">• Visual learning</div>
            <div className="text-sm text-blue-700">• Factor pairs</div>
            <div className="text-sm text-blue-700">• Algebraic concepts</div>
          </div>
        </div>
      </div>

      {/* Visual Guide */}
      <div className="mt-8 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl p-6 border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
          <span className="text-amber-600 mr-2">💡</span>
          Diamond Visual
        </h3>
        <div className="bg-white p-6 rounded-lg text-center">
          <div className="font-mono text-amber-900">
            <div className="mb-2">Top: Sum (x + y)</div>
            <div className="text-3xl mb-2">◆</div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>Left: x</div>
              <div>Right: y</div>
            </div>
            <div>Bottom: Product (x × y)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
