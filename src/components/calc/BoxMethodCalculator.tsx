'use client';

import { useState } from 'react';

export default function BoxMethodCalculator() {
  const [term1a, setTerm1a] = useState<string>('');
  const [term1b, setTerm1b] = useState<string>('');
  const [term2a, setTerm2a] = useState<string>('');
  const [term2b, setTerm2b] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');
  const [boxDisplay, setBoxDisplay] = useState<string>('');

  const calculate = () => {
    const t1a = parseFloat(term1a) || 0;
    const t1b = parseFloat(term1b) || 0;
    const t2a = parseFloat(term2a) || 0;
    const t2b = parseFloat(term2b) || 0;

    // Calculate each box section
    const topLeft = t1a * t2a;
    const topRight = t1a * t2b;
    const bottomLeft = t1b * t2a;
    const bottomRight = t1b * t2b;

    // Create box visualization
    const box =
      `┌─────────┬─────────┐\n` +
      `│  ${topLeft}x²  │  ${topRight}x   │\n` +
      `├─────────┼─────────┤\n` +
      `│  ${bottomLeft}x   │  ${bottomRight}    │\n` +
      `└─────────┴─────────┘`;

    setBoxDisplay(box);

    // Combine like terms
    const x2Coef = topLeft;
    const xCoef = topRight + bottomLeft;
    const constant = bottomRight;

    let resultStr = '';
    if (x2Coef !== 0) {
      resultStr += `${x2Coef}x²`;
    }
    if (xCoef !== 0) {
      resultStr += `${xCoef >= 0 && resultStr ? ' + ' : ' '}${xCoef}x`;
    }
    if (constant !== 0) {
      resultStr += `${constant >= 0 && resultStr ? ' + ' : ' '}${constant}`;
    }

    setResult(resultStr || '0');
    setSteps(
      `(${t1a}x ${t1b >= 0 ? '+' : ''} ${t1b})(${t2a}x ${t2b >= 0 ? '+' : ''} ${t2b})\n\n` +
      `Top Left: ${t1a} × ${t2a} = ${topLeft}x²\n` +
      `Top Right: ${t1a} × ${t2b} = ${topRight}x\n` +
      `Bottom Left: ${t1b} × ${t2a} = ${bottomLeft}x\n` +
      `Bottom Right: ${t1b} × ${t2b} = ${bottomRight}\n\n` +
      `Combine: ${resultStr}`
    );
  };

  const clear = () => {
    setTerm1a('');
    setTerm1b('');
    setTerm2a('');
    setTerm2b('');
    setResult('');
    setSteps('');
    setBoxDisplay('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⊞</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Box Method Calculator</h1>
          <p className="text-gray-600">Multiply polynomials using the box/area method</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6 whitespace-pre font-mono">
            {boxDisplay || ' '}
          </div>
          <div className="text-2xl font-mono text-right">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First polynomial: ax + b
            </label>
            <div className="flex space-x-2 items-center">
              <input
                type="number"
                value={term1a}
                onChange={(e) => setTerm1a(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="a"
              />
              <span className="text-gray-600">x +</span>
              <input
                type="number"
                value={term1b}
                onChange={(e) => setTerm1b(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="b"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Second polynomial: cx + d
            </label>
            <div className="flex space-x-2 items-center">
              <input
                type="number"
                value={term2a}
                onChange={(e) => setTerm2a(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="c"
              />
              <span className="text-gray-600">x +</span>
              <input
                type="number"
                value={term2b}
                onChange={(e) => setTerm2b(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="d"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Steps Display */}
      {steps && (
        <div className="mt-4 p-4 bg-amber-50 rounded-lg">
          <pre className="text-sm text-amber-900 whitespace-pre-wrap font-mono">{steps}</pre>
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
          <span className="text-amber-600 mr-2">📐</span>
          Box Method Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Step 1: Draw Box</div>
            <div className="text-sm text-amber-700">Create a 2×2 grid</div>
            <div className="text-xs text-amber-600 mt-1">Label rows and columns with terms</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Step 2: Multiply</div>
            <div className="text-sm text-amber-700">Fill each box with products</div>
            <div className="text-xs text-amber-600 mt-1">Multiply corresponding terms</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Step 3: Combine</div>
            <div className="text-sm text-amber-700">Add all terms together</div>
            <div className="text-xs text-amber-600 mt-1">Collect like terms</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Step 4: Simplify</div>
            <div className="text-sm text-amber-700">Write in standard form</div>
            <div className="text-xs text-amber-600 mt-1">ax² + bx + c</div>
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
            <div className="font-semibold text-blue-900 mb-2">Education</div>
            <div className="text-sm text-blue-700">• Visual learning</div>
            <div className="text-sm text-blue-700">• Understanding FOIL</div>
            <div className="text-sm text-blue-700">• Area models</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Algebra</div>
            <div className="text-sm text-blue-700">• Binomial multiplication</div>
            <div className="text-sm text-blue-700">• Polynomial expansion</div>
            <div className="text-sm text-blue-700">• Factoring verification</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Geometry</div>
            <div className="text-sm text-blue-700">• Area calculations</div>
            <div className="text-sm text-blue-700">• Rectangle problems</div>
            <div className="text-sm text-blue-700">• Visual proofs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
