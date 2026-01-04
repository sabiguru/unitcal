'use client';

import { useState } from 'react';

export default function PerfectSquareTrinomialCalculator() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [mode, setMode] = useState<'check' | 'create'>('check');
  const [result, setResult] = useState<string>('');

  const checkPerfectSquare = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      setResult('Please enter valid coefficients');
      return;
    }

    // For ax² + bx + c to be a perfect square trinomial:
    // It must factor as (√a·x + √c)² or (√a·x - √c)²
    // Which expands to: a·x² ± 2√(ac)·x + c
    // Therefore: b = ±2√(ac)

    const sqrtA = Math.sqrt(Math.abs(aNum));
    const sqrtC = Math.sqrt(Math.abs(cNum));
    const expectedB1 = 2 * sqrtA * sqrtC;
    const expectedB2 = -2 * sqrtA * sqrtC;

    let output = `Trinomial: ${aNum}x² ${bNum >= 0 ? '+' : ''}${bNum}x ${cNum >= 0 ? '+' : ''}${cNum}\n\n`;

    if (Math.abs(bNum) - expectedB1 < 0.0001 || Math.abs(bNum) - Math.abs(expectedB2) < 0.0001) {
      const sign = bNum > 0 ? '+' : '-';
      const factor1 = sqrtA === 1 ? 'x' : `${sqrtA}x`;
      const factor2 = sqrtC;

      output += '✓ This IS a perfect square trinomial!\n\n';
      output += `Factored form: (${factor1} ${sign} ${factor2})²\n\n`;
      output += `Verification:\n`;
      output += `b² = ${bNum * bNum}\n`;
      output += `4ac = ${4 * aNum * cNum}\n`;
      output += `b² = 4ac ✓`;
    } else {
      output += '✗ This is NOT a perfect square trinomial\n\n';
      output += `Expected middle term: ±${expectedB1.toFixed(2)}x\n`;
      output += `Actual middle term: ${bNum}x\n\n`;
      output += `To make it perfect square, change b to ${expectedB1.toFixed(2)} or ${expectedB2.toFixed(2)}`;
    }

    setResult(output);
  };

  const createPerfectSquare = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);

    if (isNaN(aNum) || isNaN(bNum)) {
      setResult('Please enter values for a and b');
      return;
    }

    // Create (ax + b)²
    const x2Coeff = aNum * aNum;
    const xCoeff = 2 * aNum * bNum;
    const constant = bNum * bNum;

    let output = `Expanding: (${aNum}x ${bNum >= 0 ? '+' : ''}${bNum})²\n\n`;
    output += `Result: ${x2Coeff}x² ${xCoeff >= 0 ? '+' : ''}${xCoeff}x ${constant >= 0 ? '+' : ''}${constant}\n\n`;
    output += `Breakdown:\n`;
    output += `• First term: (${aNum}x)² = ${x2Coeff}x²\n`;
    output += `• Middle term: 2(${aNum}x)(${bNum}) = ${xCoeff}x\n`;
    output += `• Last term: (${bNum})² = ${constant}`;

    setResult(output);
  };

  const calculate = () => {
    if (mode === 'check') {
      checkPerfectSquare();
    } else {
      createPerfectSquare();
    }
  };

  const clear = () => {
    setA('');
    setB('');
    setC('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">²</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Perfect Square Trinomial Calculator</h1>
          <p className="text-gray-600">Check or create perfect square trinomials</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[120px]">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Mode</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode('check')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              mode === 'check'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Check if Perfect Square
          </button>
          <button
            onClick={() => setMode('create')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              mode === 'create'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Create Perfect Square
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        {mode === 'check' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coefficient a (x²)
              </label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter a"
                step="any"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coefficient b (x)
              </label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter b"
                step="any"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter c"
                step="any"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First term coefficient (a in ax)
              </label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter a"
                step="any"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second term constant (b in +b)
              </label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter b"
                step="any"
              />
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          {mode === 'check' ? 'Check' : 'Create'}
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Perfect Square Patterns */}
      <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
          <span className="text-amber-600 mr-2">📐</span>
          Perfect Square Trinomial Patterns
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Positive Pattern</div>
            <div className="text-sm text-amber-700 font-mono">(a + b)² = a² + 2ab + b²</div>
            <div className="text-xs text-amber-600 mt-1">Square of a sum</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Negative Pattern</div>
            <div className="text-sm text-amber-700 font-mono">(a - b)² = a² - 2ab + b²</div>
            <div className="text-xs text-amber-600 mt-1">Square of a difference</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Recognition Rule</div>
            <div className="text-sm text-amber-700">b² = 4ac</div>
            <div className="text-xs text-amber-600 mt-1">Middle term squared = 4 × first × last</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">General Form</div>
            <div className="text-sm text-amber-700 font-mono">ax² ± 2√(ac)x + c</div>
            <div className="text-xs text-amber-600 mt-1">Perfect square structure</div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Common Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">x² + 6x + 9</div>
            <div className="text-sm text-blue-700">= (x + 3)²</div>
            <div className="text-xs text-blue-600 mt-1">Perfect square ✓</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">x² - 10x + 25</div>
            <div className="text-sm text-blue-700">= (x - 5)²</div>
            <div className="text-xs text-blue-600 mt-1">Perfect square ✓</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">4x² + 12x + 9</div>
            <div className="text-sm text-blue-700">= (2x + 3)²</div>
            <div className="text-xs text-blue-600 mt-1">Perfect square ✓</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">9x² - 30x + 25</div>
            <div className="text-sm text-blue-700">= (3x - 5)²</div>
            <div className="text-xs text-blue-600 mt-1">Perfect square ✓</div>
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
            <div className="text-sm text-green-700">• Factoring trinomials</div>
            <div className="text-sm text-green-700">• Completing the square</div>
            <div className="text-sm text-green-700">• Solving equations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Geometry</div>
            <div className="text-sm text-green-700">• Area calculations</div>
            <div className="text-sm text-green-700">• Square dimensions</div>
            <div className="text-sm text-green-700">• Pythagorean theorem</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Calculus</div>
            <div className="text-sm text-green-700">• Integration</div>
            <div className="text-sm text-green-700">• Optimization</div>
            <div className="text-sm text-green-700">• Curve analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
}
