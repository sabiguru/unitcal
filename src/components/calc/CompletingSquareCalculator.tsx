'use client';

import { useState } from 'react';

export default function CompletingSquareCalculator() {
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

    // Step 1: Divide by a if a ≠ 1
    const dividedB = bVal / aVal;
    const dividedC = cVal / aVal;

    // Step 2: Move constant to right side
    // x² + (b/a)x = -c/a

    // Step 3: Complete the square
    // Add (b/2a)² to both sides
    const halfB = dividedB / 2;
    const squareTerm = halfB * halfB;

    // Step 4: Factor left side
    // (x + b/2a)² = (b/2a)² - c/a

    const rightSide = squareTerm - dividedC;

    // Step 5: Vertex form
    const h = -halfB;
    const k = -rightSide * aVal;

    // Step 6: Solutions
    let solutionStr = '';
    if (rightSide < 0) {
      solutionStr = 'No real solutions';
    } else if (rightSide === 0) {
      solutionStr = `x = ${h.toFixed(4)}`;
    } else {
      const sqrt = Math.sqrt(rightSide);
      const x1 = -halfB + sqrt;
      const x2 = -halfB - sqrt;
      solutionStr = `x = ${x1.toFixed(4)} or x = ${x2.toFixed(4)}`;
    }

    const vertexForm = `${aVal}(x ${h >= 0 ? '-' : '+'} ${Math.abs(h).toFixed(4)})² ${k >= 0 ? '+' : ''} ${k.toFixed(4)}`;

    setResult(vertexForm);
    setSteps(
      `Original: ${aVal}x² ${bVal >= 0 ? '+' : ''}${bVal}x ${cVal >= 0 ? '+' : ''}${cVal} = 0\n\n` +
      `Step 1: Divide by ${aVal}\n` +
      `x² ${dividedB >= 0 ? '+' : ''}${dividedB.toFixed(4)}x ${dividedC >= 0 ? '+' : ''}${dividedC.toFixed(4)} = 0\n\n` +
      `Step 2: Move constant\n` +
      `x² ${dividedB >= 0 ? '+' : ''}${dividedB.toFixed(4)}x = ${(-dividedC).toFixed(4)}\n\n` +
      `Step 3: Add (b/2)² = (${halfB.toFixed(4)})² = ${squareTerm.toFixed(4)}\n` +
      `x² ${dividedB >= 0 ? '+' : ''}${dividedB.toFixed(4)}x + ${squareTerm.toFixed(4)} = ${rightSide.toFixed(4)}\n\n` +
      `Step 4: Factor\n` +
      `(x ${halfB >= 0 ? '+' : ''}${halfB.toFixed(4)})² = ${rightSide.toFixed(4)}\n\n` +
      `Vertex form: ${vertexForm}\n` +
      `Vertex: (${h.toFixed(4)}, ${k.toFixed(4)})\n\n` +
      `Solutions: ${solutionStr}`
    );
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
        <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">□²</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Completing the Square Calculator</h1>
          <p className="text-gray-600">Complete the square for quadratic equations ax² + bx + c = 0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6 whitespace-pre-line">
            {steps || ' '}
          </div>
          <div className="text-2xl font-mono text-right">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Enter coefficient a"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Enter coefficient b"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Enter constant c"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-rose-50 to-pink-100 rounded-xl p-6 border border-rose-200">
        <h3 className="text-lg font-semibold text-rose-900 mb-4 flex items-center">
          <span className="text-rose-600 mr-2">📐</span>
          Completing the Square Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-rose-900 mb-2">Standard Form</div>
            <div className="text-sm text-rose-700 font-mono">ax² + bx + c = 0</div>
            <div className="text-xs text-rose-600 mt-1">Starting equation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-rose-900 mb-2">Vertex Form</div>
            <div className="text-sm text-rose-700 font-mono">a(x - h)² + k = 0</div>
            <div className="text-xs text-rose-600 mt-1">Completed square form</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-rose-900 mb-2">Key Step</div>
            <div className="text-sm text-rose-700 font-mono">Add (b/2a)² to both sides</div>
            <div className="text-xs text-rose-600 mt-1">Creates perfect square</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-rose-900 mb-2">Vertex</div>
            <div className="text-sm text-rose-700 font-mono">(h, k) = (-b/2a, f(-b/2a))</div>
            <div className="text-xs text-rose-600 mt-1">Parabola vertex</div>
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
            <div className="text-sm text-blue-700">• Solving quadratics</div>
            <div className="text-sm text-blue-700">• Finding vertex</div>
            <div className="text-sm text-blue-700">• Deriving quadratic formula</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Graphing</div>
            <div className="text-sm text-blue-700">• Parabola vertex</div>
            <div className="text-sm text-blue-700">• Axis of symmetry</div>
            <div className="text-sm text-blue-700">• Maximum/minimum</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Calculus</div>
            <div className="text-sm text-blue-700">• Optimization</div>
            <div className="text-sm text-blue-700">• Integration</div>
            <div className="text-sm text-blue-700">• Conic sections</div>
          </div>
        </div>
      </div>
    </div>
  );
}
