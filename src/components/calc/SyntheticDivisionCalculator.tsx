'use client';

import { useState } from 'react';

export default function SyntheticDivisionCalculator() {
  const [coefficients, setCoefficients] = useState<string>('');
  const [divisor, setDivisor] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const syntheticDivision = (coeffs: number[], k: number): { quotient: number[], remainder: number } => {
    const result = [coeffs[0]];

    for (let i = 1; i < coeffs.length; i++) {
      result.push(coeffs[i] + k * result[i - 1]);
    }

    const remainder = result[result.length - 1];
    const quotient = result.slice(0, -1);

    return { quotient, remainder };
  };

  const calculate = () => {
    if (!coefficients.trim() || !divisor.trim()) {
      setResult('Please enter coefficients and divisor');
      return;
    }

    const coeffs = coefficients.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const k = parseFloat(divisor);

    if (coeffs.length < 2) {
      setResult('Please enter at least 2 coefficients');
      return;
    }

    if (isNaN(k)) {
      setResult('Please enter a valid divisor');
      return;
    }

    const { quotient, remainder } = syntheticDivision(coeffs, k);

    let output = 'Synthetic Division:\n\n';
    output += `Dividing by: (x - (${k})) or (x ${k >= 0 ? '-' : '+'} ${Math.abs(k)})\n`;
    output += `Polynomial coefficients: [${coeffs.join(', ')}]\n\n`;

    output += 'Synthetic Division Table:\n';
    output += `     ${coeffs.join('   ')}\n`;
    output += `${k}  |  `;

    // Build the calculation steps
    const steps: number[] = [coeffs[0]];
    output += `\n     ${coeffs[0]}`;

    for (let i = 1; i < coeffs.length; i++) {
      const product = k * steps[i - 1];
      const sum = coeffs[i] + product;
      steps.push(sum);

      if (i === 1) output += '\n        ';
      output += `  ${product >= 0 ? ' ' : ''}${product.toFixed(2)}`;
    }

    output += '\n    ';
    output += '-'.repeat(coeffs.length * 6);
    output += '\n     ';
    steps.forEach(val => {
      output += `${val.toFixed(2)}  `;
    });

    output += '\n\nQuotient coefficients: [' + quotient.map(q => q.toFixed(2)).join(', ') + ']\n';
    output += `Remainder: ${remainder.toFixed(2)}\n\n`;

    // Build quotient polynomial
    let quotientPoly = '';
    const degree = quotient.length - 1;
    quotient.forEach((coeff, idx) => {
      const power = degree - idx;
      if (coeff !== 0) {
        if (quotientPoly && coeff > 0) quotientPoly += ' + ';
        if (coeff < 0) quotientPoly += quotientPoly ? ' - ' : '-';

        const absCoeff = Math.abs(coeff);
        if (power === 0) {
          quotientPoly += absCoeff.toFixed(2);
        } else if (power === 1) {
          quotientPoly += absCoeff === 1 ? 'x' : `${absCoeff.toFixed(2)}x`;
        } else {
          quotientPoly += absCoeff === 1 ? `x^${power}` : `${absCoeff.toFixed(2)}x^${power}`;
        }
      }
    });

    output += `Quotient: ${quotientPoly || '0'}\n`;
    output += `Remainder: ${remainder.toFixed(2)}`;

    if (remainder === 0) {
      output += `\n\n(x ${k >= 0 ? '-' : '+'} ${Math.abs(k)}) is a factor!`;
    }

    setResult(output);
  };

  const clear = () => {
    setCoefficients('');
    setDivisor('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⟌</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Synthetic Division Calculator</h1>
          <p className="text-gray-600">Divide polynomials quickly using synthetic division</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre font-mono min-h-[200px] overflow-x-auto">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Polynomial Coefficients (comma-separated)
          </label>
          <input
            type="text"
            value={coefficients}
            onChange={(e) => setCoefficients(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="e.g., 1, -3, 2, 5 for x³ - 3x² + 2x + 5"
          />
          <div className="text-xs text-gray-500 mt-1">
            Enter coefficients from highest to lowest degree
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Divisor Value (k)
          </label>
          <input
            type="number"
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="e.g., 2 for dividing by (x - 2)"
            step="any"
          />
          <div className="text-xs text-gray-500 mt-1">
            For divisor (x - k), enter the value of k
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Divide
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Synthetic Division Steps */}
      <div className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl p-6 border border-teal-200">
        <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
          <span className="text-teal-600 mr-2">📐</span>
          Synthetic Division Process
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Step 1: Set Up</div>
            <div className="text-sm text-teal-700">Write coefficients in a row, write k to the left</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Step 2: Bring Down</div>
            <div className="text-sm text-teal-700">Bring down the first coefficient</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Step 3: Multiply and Add</div>
            <div className="text-sm text-teal-700">Multiply by k, add to next coefficient, repeat</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Step 4: Result</div>
            <div className="text-sm text-teal-700">Bottom row = quotient coefficients + remainder (last value)</div>
          </div>
        </div>
      </div>

      {/* Advantages */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Why Use Synthetic Division?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Faster</div>
            <div className="text-sm text-blue-700">Much quicker than long division</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Less Writing</div>
            <div className="text-sm text-blue-700">Fewer steps and calculations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Find Roots</div>
            <div className="text-sm text-blue-700">Test potential zeros quickly</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Remainder Theorem</div>
            <div className="text-sm text-blue-700">Remainder = f(k) by theorem</div>
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
            <div className="text-sm text-green-700">• Finding polynomial roots</div>
            <div className="text-sm text-green-700">• Factoring polynomials</div>
            <div className="text-sm text-green-700">• Simplifying expressions</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Calculus</div>
            <div className="text-sm text-green-700">• Partial fractions</div>
            <div className="text-sm text-green-700">• Integration</div>
            <div className="text-sm text-green-700">• Limit evaluation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Engineering</div>
            <div className="text-sm text-green-700">• Transfer functions</div>
            <div className="text-sm text-green-700">• System analysis</div>
            <div className="text-sm text-green-700">• Signal processing</div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-8 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
          <span className="text-yellow-600 mr-2">⚠</span>
          Important Notes
        </h3>
        <div className="space-y-2 bg-white p-4 rounded-lg">
          <div className="text-sm text-yellow-800">• Only works for divisors of form (x - k)</div>
          <div className="text-sm text-yellow-800">• Must include ALL coefficients (use 0 for missing terms)</div>
          <div className="text-sm text-yellow-800">• If remainder is 0, then (x - k) is a factor</div>
          <div className="text-sm text-yellow-800">• Sign of k: dividing by (x - 2) means k = 2, not -2</div>
        </div>
      </div>
    </div>
  );
}
