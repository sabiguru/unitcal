'use client';

import { useState } from 'react';

export default function MultiplyingBinomialsCalculator() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [d, setD] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [expression, setExpression] = useState<string>('');

  const calculate = () => {
    const aNum = parseFloat(a) || 0;
    const bNum = parseFloat(b) || 0;
    const cNum = parseFloat(c) || 0;
    const dNum = parseFloat(d) || 0;

    // (ax + b)(cx + d) = acx² + (ad + bc)x + bd
    const x2Coeff = aNum * cNum;
    const xCoeff = aNum * dNum + bNum * cNum;
    const constant = bNum * dNum;

    let resultStr = '';
    let steps = 'FOIL Method:\n';
    steps += `First: ${aNum}x × ${cNum}x = ${x2Coeff}x²\n`;
    steps += `Outer: ${aNum}x × ${dNum} = ${aNum * dNum}x\n`;
    steps += `Inner: ${bNum} × ${cNum}x = ${bNum * cNum}x\n`;
    steps += `Last: ${bNum} × ${dNum} = ${constant}\n\n`;

    // Build result string
    if (x2Coeff !== 0) {
      resultStr += x2Coeff === 1 ? 'x²' : x2Coeff === -1 ? '-x²' : `${x2Coeff}x²`;
    }

    if (xCoeff !== 0) {
      if (resultStr && xCoeff > 0) resultStr += ' + ';
      if (xCoeff < 0) {
        resultStr += resultStr ? ' - ' : '-';
        resultStr += Math.abs(xCoeff) === 1 ? 'x' : `${Math.abs(xCoeff)}x`;
      } else {
        resultStr += xCoeff === 1 ? 'x' : `${xCoeff}x`;
      }
    }

    if (constant !== 0) {
      if (resultStr && constant > 0) resultStr += ' + ';
      if (constant < 0) resultStr += resultStr ? ` - ${Math.abs(constant)}` : `${constant}`;
      else resultStr += `${constant}`;
    }

    if (!resultStr) resultStr = '0';

    setResult(resultStr);
    setExpression(steps + `Result: ${resultStr}`);
  };

  const clear = () => {
    setA('');
    setB('');
    setC('');
    setD('');
    setResult('');
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">×</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Multiplying Binomials Calculator</h1>
          <p className="text-gray-600">Multiply two binomials using the FOIL method: (a+b)(c+d)</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[100px]">
            {expression || ' '}
          </div>
          <div className="text-2xl font-mono text-right">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          First Binomial: (ax + b)
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coefficient a
            </label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Enter a"
              step="any"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Constant b
            </label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Enter b"
              step="any"
            />
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Second Binomial: (cx + d)
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coefficient c
            </label>
            <input
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Enter c"
              step="any"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Enter d"
              step="any"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-violet-500 hover:bg-violet-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Multiply
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* FOIL Method */}
      <div className="mt-8 bg-gradient-to-br from-violet-50 to-purple-100 rounded-xl p-6 border border-violet-200">
        <h3 className="text-lg font-semibold text-violet-900 mb-4 flex items-center">
          <span className="text-violet-600 mr-2">📐</span>
          FOIL Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-violet-900 mb-2">F - First</div>
            <div className="text-sm text-violet-700">Multiply the first terms</div>
            <div className="text-xs text-violet-600 mt-1 font-mono">(ax)(cx) = acx²</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-violet-900 mb-2">O - Outer</div>
            <div className="text-sm text-violet-700">Multiply the outer terms</div>
            <div className="text-xs text-violet-600 mt-1 font-mono">(ax)(d) = adx</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-violet-900 mb-2">I - Inner</div>
            <div className="text-sm text-violet-700">Multiply the inner terms</div>
            <div className="text-xs text-violet-600 mt-1 font-mono">(b)(cx) = bcx</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-violet-900 mb-2">L - Last</div>
            <div className="text-sm text-violet-700">Multiply the last terms</div>
            <div className="text-xs text-violet-600 mt-1 font-mono">(b)(d) = bd</div>
          </div>
        </div>
        <div className="mt-4 bg-white p-4 rounded-lg">
          <div className="font-semibold text-violet-900 mb-2">Combine Like Terms</div>
          <div className="text-sm text-violet-700 font-mono">acx² + (ad + bc)x + bd</div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Common Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">(x + 2)(x + 3)</div>
            <div className="text-sm text-blue-700">= x² + 3x + 2x + 6</div>
            <div className="text-sm text-blue-700 font-semibold">= x² + 5x + 6</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">(x - 4)(x + 5)</div>
            <div className="text-sm text-blue-700">= x² + 5x - 4x - 20</div>
            <div className="text-sm text-blue-700 font-semibold">= x² + x - 20</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">(2x + 1)(3x - 2)</div>
            <div className="text-sm text-blue-700">= 6x² - 4x + 3x - 2</div>
            <div className="text-sm text-blue-700 font-semibold">= 6x² - x - 2</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">(x + 5)(x - 5)</div>
            <div className="text-sm text-blue-700">= x² - 5x + 5x - 25</div>
            <div className="text-sm text-blue-700 font-semibold">= x² - 25</div>
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
            <div className="text-sm text-green-700">• Expanding expressions</div>
            <div className="text-sm text-green-700">• Solving equations</div>
            <div className="text-sm text-green-700">• Factoring practice</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Geometry</div>
            <div className="text-sm text-green-700">• Area calculations</div>
            <div className="text-sm text-green-700">• Rectangle dimensions</div>
            <div className="text-sm text-green-700">• Perimeter problems</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Calculus</div>
            <div className="text-sm text-green-700">• Polynomial expansion</div>
            <div className="text-sm text-green-700">• Differentiation</div>
            <div className="text-sm text-green-700">• Integration prep</div>
          </div>
        </div>
      </div>
    </div>
  );
}
