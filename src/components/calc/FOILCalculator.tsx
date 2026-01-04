'use client';

import { useState } from 'react';

export default function FOILCalculator() {
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

    // FOIL: (a + b)(c + d) = ac + ad + bc + bd
    const first = aVal * cVal;     // First terms
    const outer = aVal * dVal;     // Outer terms
    const inner = bVal * cVal;     // Inner terms
    const last = bVal * dVal;      // Last terms

    // Combine like terms
    const x2Coef = first;
    const xCoef = outer + inner;
    const constant = last;

    let resultStr = '';
    if (x2Coef !== 0) {
      resultStr = `${x2Coef}x²`;
    }
    if (xCoef !== 0) {
      if (resultStr) {
        resultStr += xCoef >= 0 ? ` + ${xCoef}x` : ` - ${Math.abs(xCoef)}x`;
      } else {
        resultStr = `${xCoef}x`;
      }
    }
    if (constant !== 0) {
      if (resultStr) {
        resultStr += constant >= 0 ? ` + ${constant}` : ` - ${Math.abs(constant)}`;
      } else {
        resultStr = `${constant}`;
      }
    }

    if (!resultStr) resultStr = '0';

    setResult(resultStr);
    setSteps(
      `FOIL Method: (${aVal}x ${bVal >= 0 ? '+' : ''}${bVal})(${cVal}x ${dVal >= 0 ? '+' : ''}${dVal})\n\n` +
      `F - First: ${aVal}x × ${cVal}x = ${first}x²\n` +
      `O - Outer: ${aVal}x × ${dVal} = ${outer}x\n` +
      `I - Inner: ${bVal} × ${cVal}x = ${inner}x\n` +
      `L - Last: ${bVal} × ${dVal} = ${last}\n\n` +
      `Combine like terms:\n` +
      `x² term: ${first}x²\n` +
      `x term: ${outer}x + ${inner}x = ${xCoef}x\n` +
      `Constant: ${last}\n\n` +
      `Result: ${resultStr}`
    );
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
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">×</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FOIL Calculator</h1>
          <p className="text-gray-600">Multiply binomials using the FOIL method</p>
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
            First Binomial: (ax + b)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="a"
              step="0.1"
            />
            <span className="text-gray-600">x +</span>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="b"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Second Binomial: (cx + d)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="c"
              step="0.1"
            />
            <span className="text-gray-600">x +</span>
            <input
              type="number"
              value={d}
              onChange={(e) => setD(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="d"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">📐</span>
          FOIL Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">F - First</div>
            <div className="text-sm text-green-700 font-mono">Multiply first terms of each binomial</div>
            <div className="text-xs text-green-600 mt-1">(ax + b)(cx + d) → ax × cx</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">O - Outer</div>
            <div className="text-sm text-green-700 font-mono">Multiply outer terms</div>
            <div className="text-xs text-green-600 mt-1">(ax + b)(cx + d) → ax × d</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">I - Inner</div>
            <div className="text-sm text-green-700 font-mono">Multiply inner terms</div>
            <div className="text-xs text-green-600 mt-1">(ax + b)(cx + d) → b × cx</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">L - Last</div>
            <div className="text-sm text-green-700 font-mono">Multiply last terms of each binomial</div>
            <div className="text-xs text-green-600 mt-1">(ax + b)(cx + d) → b × d</div>
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
            <div className="text-sm text-blue-700">• Polynomial multiplication</div>
            <div className="text-sm text-blue-700">• Expanding expressions</div>
            <div className="text-sm text-blue-700">• Factoring verification</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Geometry</div>
            <div className="text-sm text-blue-700">• Area calculations</div>
            <div className="text-sm text-blue-700">• Rectangle dimensions</div>
            <div className="text-sm text-blue-700">• Visual proofs</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Education</div>
            <div className="text-sm text-blue-700">• Learning binomial multiplication</div>
            <div className="text-sm text-blue-700">• Mnemonic device</div>
            <div className="text-sm text-blue-700">• Foundation for advanced algebra</div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Common Patterns
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Square of Sum</div>
            <div className="text-sm text-purple-800">(x + a)² = x² + 2ax + a²</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Square of Difference</div>
            <div className="text-sm text-purple-800">(x - a)² = x² - 2ax + a²</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Difference of Squares</div>
            <div className="text-sm text-purple-800">(x + a)(x - a) = x² - a²</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">General Form</div>
            <div className="text-sm text-purple-800">(ax + b)(cx + d) = acx² + (ad+bc)x + bd</div>
          </div>
        </div>
      </div>
    </div>
  );
}
