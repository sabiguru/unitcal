'use client';

import { useState } from 'react';

export default function ComplexConjugateCalculator() {
  const [realPart, setRealPart] = useState<string>('');
  const [imagPart, setImagPart] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const calculate = () => {
    const a = parseFloat(realPart);
    const b = parseFloat(imagPart);

    if (isNaN(a) || isNaN(b)) {
      setResult('Invalid input');
      setSteps('Please enter valid numbers');
      return;
    }

    // Conjugate of a + bi is a - bi
    const conjugateReal = a;
    const conjugateImag = -b;

    // Calculate magnitude
    const magnitude = Math.sqrt(a * a + b * b);

    // Calculate product with conjugate (always real)
    const product = a * a + b * b;

    const originalStr = `${a} ${b >= 0 ? '+' : ''}${b}i`;
    const conjugateStr = `${conjugateReal} ${conjugateImag >= 0 ? '+' : ''}${conjugateImag}i`;

    setResult(conjugateStr);
    setSteps(
      `Original number: z = ${originalStr}\n\n` +
      `Conjugate: z̄ = ${conjugateStr}\n\n` +
      `Magnitude: |z| = √(${a}² + ${b}²) = ${magnitude.toFixed(4)}\n\n` +
      `Product z × z̄ = ${product.toFixed(4)}\n` +
      `(Always a real number equal to |z|²)`
    );
  };

  const clear = () => {
    setRealPart('');
    setImagPart('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">z̄</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complex Conjugate Calculator</h1>
          <p className="text-gray-600">Find the conjugate of complex number a + bi</p>
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
            Real Part (a)
          </label>
          <input
            type="number"
            value={realPart}
            onChange={(e) => setRealPart(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter real part"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imaginary Part (b)
          </label>
          <input
            type="number"
            value={imagPart}
            onChange={(e) => setImagPart(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter imaginary part"
            step="0.1"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-violet-500 hover:bg-violet-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-violet-50 to-purple-100 rounded-xl p-6 border border-violet-200">
        <h3 className="text-lg font-semibold text-violet-900 mb-4 flex items-center">
          <span className="text-violet-600 mr-2">📐</span>
          Complex Conjugate Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-violet-900 mb-2">Definition</div>
            <div className="text-sm text-violet-700 font-mono">z̄ = a - bi for z = a + bi</div>
            <div className="text-xs text-violet-600 mt-1">Negate imaginary part</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-violet-900 mb-2">Product Property</div>
            <div className="text-sm text-violet-700 font-mono">z × z̄ = |z|² = a² + b²</div>
            <div className="text-xs text-violet-600 mt-1">Always real and non-negative</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-violet-900 mb-2">Sum Property</div>
            <div className="text-sm text-violet-700 font-mono">z + z̄ = 2a</div>
            <div className="text-xs text-violet-600 mt-1">Always real</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-violet-900 mb-2">Difference Property</div>
            <div className="text-sm text-violet-700 font-mono">z - z̄ = 2bi</div>
            <div className="text-xs text-violet-600 mt-1">Always purely imaginary</div>
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
            <div className="text-sm text-blue-700">• Rationalizing denominators</div>
            <div className="text-sm text-blue-700">• Complex division</div>
            <div className="text-sm text-blue-700">• Finding real/imaginary parts</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Engineering</div>
            <div className="text-sm text-blue-700">• Signal processing</div>
            <div className="text-sm text-blue-700">• Impedance calculations</div>
            <div className="text-sm text-blue-700">• Control systems</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Physics</div>
            <div className="text-sm text-blue-700">• Quantum mechanics</div>
            <div className="text-sm text-blue-700">• Wave functions</div>
            <div className="text-sm text-blue-700">• Electromagnetic fields</div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💡</span>
          Conjugate Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• (z̄)̄ = z (double conjugate)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• (z + w)̄ = z̄ + w̄ (sum rule)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• (z × w)̄ = z̄ × w̄ (product rule)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• (z/w)̄ = z̄/w̄ (quotient rule)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
