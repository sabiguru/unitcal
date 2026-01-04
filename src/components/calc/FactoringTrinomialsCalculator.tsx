'use client';

import { useState } from 'react';

export default function FactoringTrinomialsCalculator() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

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
      setResult('Not a quadratic trinomial');
      setSteps('Coefficient a must be non-zero');
      return;
    }

    // Check if integers
    if (!Number.isInteger(aVal) || !Number.isInteger(bVal) || !Number.isInteger(cVal)) {
      setResult('Please use integers');
      setSteps('Factoring works best with integer coefficients');
      return;
    }

    // Factor out GCD
    const commonFactor = gcd(gcd(Math.abs(aVal), Math.abs(bVal)), Math.abs(cVal));
    const a1 = aVal / commonFactor;
    const b1 = bVal / commonFactor;
    const c1 = cVal / commonFactor;

    // Calculate discriminant
    const discriminant = b1 * b1 - 4 * a1 * c1;

    if (discriminant < 0) {
      setResult('Prime (not factorable over integers)');
      setSteps(
        `${aVal}x² ${bVal >= 0 ? '+' : ''}${bVal}x ${cVal >= 0 ? '+' : ''}${cVal}\n\n` +
        `Discriminant = ${discriminant} < 0\n` +
        `No real roots, cannot factor over integers`
      );
      return;
    }

    // Try to find integer factors
    // For ax² + bx + c, we need two numbers that multiply to a*c and add to b
    const product = a1 * c1;
    let found = false;
    let m = 0, n = 0;

    // Find factors of product
    for (let i = 1; i <= Math.abs(product); i++) {
      if (product % i === 0) {
        const j = product / i;
        if (i + j === b1 || i - j === b1 || -i + j === b1 || -i - j === b1) {
          if (i + j === b1) {
            m = i;
            n = j;
          } else if (i - j === b1) {
            m = i;
            n = -j;
          } else if (-i + j === b1) {
            m = -i;
            n = j;
          } else {
            m = -i;
            n = -j;
          }
          found = true;
          break;
        }
      }
    }

    if (!found || Math.sqrt(discriminant) !== Math.floor(Math.sqrt(discriminant))) {
      setResult('Prime (not factorable over integers)');
      setSteps(
        `${aVal}x² ${bVal >= 0 ? '+' : ''}${bVal}x ${cVal >= 0 ? '+' : ''}${cVal}\n\n` +
        `Cannot find integer factors`
      );
      return;
    }

    // For simple case where a = 1
    if (a1 === 1) {
      const factorStr = commonFactor > 1
        ? `${commonFactor}(x ${m >= 0 ? '+' : ''}${m})(x ${n >= 0 ? '+' : ''}${n})`
        : `(x ${m >= 0 ? '+' : ''}${m})(x ${n >= 0 ? '+' : ''}${n})`;

      setResult(factorStr);
      setSteps(
        `${aVal}x² ${bVal >= 0 ? '+' : ''}${bVal}x ${cVal >= 0 ? '+' : ''}${cVal}\n\n` +
        (commonFactor > 1 ? `Factor out ${commonFactor}:\n${commonFactor}(x² ${b1 >= 0 ? '+' : ''}${b1}x ${c1 >= 0 ? '+' : ''}${c1})\n\n` : '') +
        `Find two numbers that:\n` +
        `• Multiply to ${c1}\n` +
        `• Add to ${b1}\n\n` +
        `Numbers: ${m} and ${n}\n` +
        `${m} × ${n} = ${m * n}\n` +
        `${m} + ${n} = ${m + n}\n\n` +
        `Factored form: ${factorStr}`
      );
    } else {
      // For a ≠ 1, use AC method
      setResult('Use quadratic formula for general case');
      setSteps(
        `${aVal}x² ${bVal >= 0 ? '+' : ''}${bVal}x ${cVal >= 0 ? '+' : ''}${cVal}\n\n` +
        `For a ≠ 1, factoring is complex.\n` +
        `Use quadratic formula:\n` +
        `x = (-b ± √(b² - 4ac)) / (2a)`
      );
    }
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
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">( )</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Factoring Trinomials Calculator</h1>
          <p className="text-gray-600">Factor ax² + bx + c into binomial factors</p>
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
            Coefficient a (x² term) - use integers
          </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter coefficient a"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coefficient b (x term) - use integers
          </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter coefficient b"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Constant c - use integers
          </label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter constant c"
            step="1"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
          <span className="text-yellow-600 mr-2">📐</span>
          Factoring Methods
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-yellow-900 mb-2">When a = 1</div>
            <div className="text-sm text-yellow-700 font-mono">x² + bx + c = (x + m)(x + n)</div>
            <div className="text-xs text-yellow-600 mt-1">m + n = b, m × n = c</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-yellow-900 mb-2">AC Method</div>
            <div className="text-sm text-yellow-700 font-mono">Find factors of a × c that add to b</div>
            <div className="text-xs text-yellow-600 mt-1">Split middle term</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-yellow-900 mb-2">Common Factor</div>
            <div className="text-sm text-yellow-700 font-mono">Always factor out GCD first</div>
            <div className="text-xs text-yellow-600 mt-1">Simplifies the problem</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-yellow-900 mb-2">Prime Check</div>
            <div className="text-sm text-yellow-700 font-mono">If Δ &lt; 0 or not perfect square</div>
            <div className="text-xs text-yellow-600 mt-1">Cannot factor over integers</div>
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
            <div className="text-sm text-blue-700">• Solving equations</div>
            <div className="text-sm text-blue-700">• Simplifying expressions</div>
            <div className="text-sm text-blue-700">• Finding roots</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Graphing</div>
            <div className="text-sm text-blue-700">• Finding x-intercepts</div>
            <div className="text-sm text-blue-700">• Vertex form conversion</div>
            <div className="text-sm text-blue-700">• Parabola analysis</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Calculus</div>
            <div className="text-sm text-blue-700">• Integration</div>
            <div className="text-sm text-blue-700">• Partial fractions</div>
            <div className="text-sm text-blue-700">• Limit evaluation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
