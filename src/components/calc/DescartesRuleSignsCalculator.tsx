'use client';

import { useState } from 'react';

export default function DescartesRuleSignsCalculator() {
  const [polynomial, setPolynomial] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const parsePolynomial = (poly: string): number[] => {
    const coefficients: number[] = [];
    const cleanPoly = poly.replace(/\s/g, '');
    const termRegex = /([+-]?\d*\.?\d*)x\^?(\d+)|([+-]?\d*\.?\d*)x|([+-]?\d+\.?\d*)/g;
    const terms = new Map<number, number>();

    let match;
    while ((match = termRegex.exec(cleanPoly)) !== null) {
      if (match[1] !== undefined) {
        const coef = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseFloat(match[1]);
        const exp = parseInt(match[2]);
        terms.set(exp, (terms.get(exp) || 0) + coef);
      } else if (match[3] !== undefined) {
        const coef = match[3] === '' || match[3] === '+' ? 1 : match[3] === '-' ? -1 : parseFloat(match[3]);
        terms.set(1, (terms.get(1) || 0) + coef);
      } else if (match[4] !== undefined) {
        const coef = parseFloat(match[4]);
        terms.set(0, (terms.get(0) || 0) + coef);
      }
    }

    const maxDegree = Math.max(...Array.from(terms.keys()));
    for (let i = maxDegree; i >= 0; i--) {
      coefficients.push(terms.get(i) || 0);
    }

    return coefficients.filter(c => c !== 0);
  };

  const countSignChanges = (coeffs: number[]): number => {
    let changes = 0;
    for (let i = 1; i < coeffs.length; i++) {
      if (Math.sign(coeffs[i]) !== Math.sign(coeffs[i - 1])) {
        changes++;
      }
    }
    return changes;
  };

  const calculate = () => {
    try {
      const coefficients = parsePolynomial(polynomial);

      if (coefficients.length === 0) {
        setResult('Invalid polynomial');
        setSteps('Please enter a valid polynomial');
        return;
      }

      // Count sign changes for positive roots
      const positiveChanges = countSignChanges(coefficients);

      // For negative roots, substitute -x and count sign changes
      const negativeCoeffs = coefficients.map((c, i) => (i % 2 === 1 ? -c : c));
      const negativeChanges = countSignChanges(negativeCoeffs);

      // Possible number of positive roots
      const possiblePositive: number[] = [];
      for (let i = positiveChanges; i >= 0; i -= 2) {
        possiblePositive.push(i);
      }

      // Possible number of negative roots
      const possibleNegative: number[] = [];
      for (let i = negativeChanges; i >= 0; i -= 2) {
        possibleNegative.push(i);
      }

      let resultStr = `Positive real roots: ${possiblePositive.join(' or ')}\n`;
      resultStr += `Negative real roots: ${possibleNegative.join(' or ')}`;

      let stepsStr = `Polynomial coefficients: ${coefficients.join(', ')}\n\n`;
      stepsStr += `Sign changes for P(x): ${positiveChanges}\n`;
      stepsStr += `Possible positive roots: ${possiblePositive.join(', ')}\n\n`;
      stepsStr += `Sign changes for P(-x): ${negativeChanges}\n`;
      stepsStr += `Possible negative roots: ${possibleNegative.join(', ')}\n\n`;
      stepsStr += `Note: Actual number differs by multiples of 2`;

      setResult(resultStr);
      setSteps(stepsStr);
    } catch (error) {
      setResult('Error parsing polynomial');
      setSteps('Check polynomial format');
    }
  };

  const clear = () => {
    setPolynomial('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">±</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Descartes Rule of Signs Calculator</h1>
          <p className="text-gray-600">Count possible positive and negative real roots</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6 whitespace-pre-line">
            {steps || ' '}
          </div>
          <div className="text-2xl font-mono text-right whitespace-pre-line">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Polynomial (e.g., x^3 - 2x^2 + 3x - 4)
          </label>
          <input
            type="text"
            value={polynomial}
            onChange={(e) => setPolynomial(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Enter polynomial"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-sky-50 to-blue-100 rounded-xl p-6 border border-sky-200">
        <h3 className="text-lg font-semibold text-sky-900 mb-4 flex items-center">
          <span className="text-sky-600 mr-2">📐</span>
          Descartes' Rule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-sky-900 mb-2">Positive Roots</div>
            <div className="text-sm text-sky-700 font-mono">Count sign changes in P(x)</div>
            <div className="text-xs text-sky-600 mt-1">Maximum number or less by 2k</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-sky-900 mb-2">Negative Roots</div>
            <div className="text-sm text-sky-700 font-mono">Count sign changes in P(-x)</div>
            <div className="text-xs text-sky-600 mt-1">Substitute -x for x</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-sky-900 mb-2">Sign Change</div>
            <div className="text-sm text-sky-700 font-mono">+ to - or - to +</div>
            <div className="text-xs text-sky-600 mt-1">Adjacent non-zero terms</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-sky-900 mb-2">Complex Roots</div>
            <div className="text-sm text-sky-700 font-mono">Come in conjugate pairs</div>
            <div className="text-xs text-sky-600 mt-1">Remaining roots are complex</div>
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
            <div className="text-sm text-green-700">• Root analysis</div>
            <div className="text-sm text-green-700">• Polynomial study</div>
            <div className="text-sm text-green-700">• Equation solving</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Calculus</div>
            <div className="text-sm text-green-700">• Critical points</div>
            <div className="text-sm text-green-700">• Function analysis</div>
            <div className="text-sm text-green-700">• Graphing assistance</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Number Theory</div>
            <div className="text-sm text-green-700">• Root bounds</div>
            <div className="text-sm text-green-700">• Polynomial properties</div>
            <div className="text-sm text-green-700">• Theoretical analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
}
