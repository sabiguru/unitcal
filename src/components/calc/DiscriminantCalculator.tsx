'use client';

import { useState } from 'react';

export default function DiscriminantCalculator() {
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

    const discriminant = bVal * bVal - 4 * aVal * cVal;

    let rootType = '';
    let rootDescription = '';

    if (discriminant > 0) {
      rootType = 'Two distinct real roots';
      rootDescription = 'The parabola crosses the x-axis twice';
      const sqrt = Math.sqrt(discriminant);
      const x1 = (-bVal + sqrt) / (2 * aVal);
      const x2 = (-bVal - sqrt) / (2 * aVal);
      rootDescription += `\n\nRoots:\nx₁ = ${x1.toFixed(4)}\nx₂ = ${x2.toFixed(4)}`;
    } else if (discriminant === 0) {
      rootType = 'One repeated real root';
      rootDescription = 'The parabola touches the x-axis at one point (vertex)';
      const x = -bVal / (2 * aVal);
      rootDescription += `\n\nRoot:\nx = ${x.toFixed(4)}`;
    } else {
      rootType = 'Two complex conjugate roots';
      rootDescription = 'The parabola does not cross the x-axis';
      const realPart = -bVal / (2 * aVal);
      const imagPart = Math.sqrt(-discriminant) / (2 * aVal);
      rootDescription += `\n\nRoots:\nx₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`;
      rootDescription += `\nx₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;
    }

    setResult(`Δ = ${discriminant.toFixed(4)}`);
    setSteps(
      `Equation: ${aVal}x² ${bVal >= 0 ? '+' : ''}${bVal}x ${cVal >= 0 ? '+' : ''}${cVal} = 0\n\n` +
      `Discriminant formula: Δ = b² - 4ac\n\n` +
      `Calculation:\n` +
      `Δ = (${bVal})² - 4(${aVal})(${cVal})\n` +
      `Δ = ${bVal * bVal} - ${4 * aVal * cVal}\n` +
      `Δ = ${discriminant.toFixed(4)}\n\n` +
      `Root type: ${rootType}\n` +
      `${rootDescription}`
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
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">Δ</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discriminant Calculator</h1>
          <p className="text-gray-600">Calculate b² - 4ac for quadratic equations</p>
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
            Coefficient a (x² term)
          </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter constant c"
            step="0.1"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="text-indigo-600 mr-2">📐</span>
          Discriminant Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Formula</div>
            <div className="text-sm text-indigo-700 font-mono">Δ = b² - 4ac</div>
            <div className="text-xs text-indigo-600 mt-1">For ax² + bx + c = 0</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Δ &gt; 0</div>
            <div className="text-sm text-indigo-700 font-mono">Two distinct real roots</div>
            <div className="text-xs text-indigo-600 mt-1">Parabola crosses x-axis twice</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Δ = 0</div>
            <div className="text-sm text-indigo-700 font-mono">One repeated real root</div>
            <div className="text-xs text-indigo-600 mt-1">Parabola touches x-axis once</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Δ &lt; 0</div>
            <div className="text-sm text-indigo-700 font-mono">Two complex conjugate roots</div>
            <div className="text-xs text-indigo-600 mt-1">Parabola doesn't touch x-axis</div>
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
            <div className="text-sm text-green-700">• Determining root nature</div>
            <div className="text-sm text-green-700">• Solving quadratics</div>
            <div className="text-sm text-green-700">• Factorability check</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Graphing</div>
            <div className="text-sm text-green-700">• X-intercepts prediction</div>
            <div className="text-sm text-green-700">• Parabola behavior</div>
            <div className="text-sm text-green-700">• Function analysis</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Problem Solving</div>
            <div className="text-sm text-green-700">• Solution existence</div>
            <div className="text-sm text-green-700">• Optimization problems</div>
            <div className="text-sm text-green-700">• Physics applications</div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Quick Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Perfect Square</div>
            <div className="text-sm text-purple-800">Δ = 0 means equation is a perfect square trinomial</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Integer Roots</div>
            <div className="text-sm text-purple-800">Δ is a perfect square suggests rational roots</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">In Quadratic Formula</div>
            <div className="text-sm text-purple-800">x = (-b ± √Δ) / (2a)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
