'use client';

import { useState } from 'react';

export default function SquareBinomialCalculator() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [operation, setOperation] = useState<'plus' | 'minus'>('plus');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const aNum = parseFloat(a) || 0;
    const bNum = parseFloat(b) || 0;

    let output = '';

    if (operation === 'plus') {
      // (a + b)² = a² + 2ab + b²
      const squared = (aNum + bNum) ** 2;
      const aSquared = aNum ** 2;
      const twoAB = 2 * aNum * bNum;
      const bSquared = bNum ** 2;

      output += `(${aNum} + ${bNum})²\n\n`;
      output += 'Using formula: (a + b)² = a² + 2ab + b²\n\n';
      output += `= ${aNum}² + 2(${aNum})(${bNum}) + ${bNum}²\n`;
      output += `= ${aSquared} + ${twoAB} + ${bSquared}\n`;
      output += `= ${squared}\n\n`;
      output += `Direct calculation: (${aNum + bNum})² = ${squared}`;
    } else {
      // (a - b)² = a² - 2ab + b²
      const squared = (aNum - bNum) ** 2;
      const aSquared = aNum ** 2;
      const twoAB = 2 * aNum * bNum;
      const bSquared = bNum ** 2;

      output += `(${aNum} - ${bNum})²\n\n`;
      output += 'Using formula: (a - b)² = a² - 2ab + b²\n\n';
      output += `= ${aNum}² - 2(${aNum})(${bNum}) + ${bNum}²\n`;
      output += `= ${aSquared} - ${twoAB} + ${bSquared}\n`;
      output += `= ${squared}\n\n`;
      output += `Direct calculation: (${aNum - bNum})² = ${squared}`;
    }

    setResult(output);
  };

  const clear = () => {
    setA('');
    setB('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">²</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Square of Binomial Calculator</h1>
          <p className="text-gray-600">Calculate (a+b)² and (a-b)² using algebraic formulas</p>
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

      {/* Operation Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Operation Type</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setOperation('plus')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'plus'
                ? 'bg-rose-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            (a + b)²
          </button>
          <button
            onClick={() => setOperation('minus')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'minus'
                ? 'bg-rose-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            (a - b)²
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Value of a
          </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Enter a"
            step="any"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Value of b
          </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Enter b"
            step="any"
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

      {/* Binomial Square Formulas */}
      <div className="mt-8 bg-gradient-to-br from-rose-50 to-pink-100 rounded-xl p-6 border border-rose-200">
        <h3 className="text-lg font-semibold text-rose-900 mb-4 flex items-center">
          <span className="text-rose-600 mr-2">📐</span>
          Binomial Square Formulas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-rose-900 mb-2">Square of Sum</div>
            <div className="text-sm text-rose-700 font-mono mb-2">(a + b)² = a² + 2ab + b²</div>
            <div className="text-xs text-rose-600">First squared + twice product + second squared</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-rose-900 mb-2">Square of Difference</div>
            <div className="text-sm text-rose-700 font-mono mb-2">(a - b)² = a² - 2ab + b²</div>
            <div className="text-xs text-rose-600">First squared - twice product + second squared</div>
          </div>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="mt-8 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <span className="text-red-600 mr-2">⚠</span>
          Common Mistakes to Avoid
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Wrong: (a + b)² = a² + b²</div>
            <div className="text-sm text-red-700">Missing the middle term!</div>
            <div className="text-xs text-red-600 mt-1">You must include 2ab</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Correct: (a + b)² = a² + 2ab + b²</div>
            <div className="text-sm text-green-700">Don't forget the 2ab term</div>
            <div className="text-xs text-green-600 mt-1">All three terms needed</div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Worked Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">(3 + 4)²</div>
            <div className="text-sm text-blue-700">= 3² + 2(3)(4) + 4²</div>
            <div className="text-sm text-blue-700">= 9 + 24 + 16</div>
            <div className="text-sm text-blue-700 font-bold">= 49</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">(5 - 2)²</div>
            <div className="text-sm text-blue-700">= 5² - 2(5)(2) + 2²</div>
            <div className="text-sm text-blue-700">= 25 - 20 + 4</div>
            <div className="text-sm text-blue-700 font-bold">= 9</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">(x + 5)²</div>
            <div className="text-sm text-blue-700">= x² + 2(x)(5) + 5²</div>
            <div className="text-sm text-blue-700 font-bold">= x² + 10x + 25</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">(2x - 3)²</div>
            <div className="text-sm text-blue-700">= (2x)² - 2(2x)(3) + 3²</div>
            <div className="text-sm text-blue-700 font-bold">= 4x² - 12x + 9</div>
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
            <div className="text-sm text-green-700">• Factoring</div>
            <div className="text-sm text-green-700">• Simplification</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Geometry</div>
            <div className="text-sm text-green-700">• Area calculations</div>
            <div className="text-sm text-green-700">• Square dimensions</div>
            <div className="text-sm text-green-700">• Pythagorean theorem</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Number Theory</div>
            <div className="text-sm text-green-700">• Mental math tricks</div>
            <div className="text-sm text-green-700">• Quick calculations</div>
            <div className="text-sm text-green-700">• Pattern recognition</div>
          </div>
        </div>
      </div>
    </div>
  );
}
