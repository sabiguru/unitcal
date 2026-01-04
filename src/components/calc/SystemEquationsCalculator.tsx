'use client';

import { useState } from 'react';

export default function SystemEquationsCalculator() {
  const [method, setMethod] = useState<'elimination' | 'matrix'>('elimination');
  const [a1, setA1] = useState<string>('');
  const [b1, setB1] = useState<string>('');
  const [c1, setC1] = useState<string>('');
  const [a2, setA2] = useState<string>('');
  const [b2, setB2] = useState<string>('');
  const [c2, setC2] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const solveByElimination = (a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): string => {
    let output = 'Elimination Method:\n\n';
    output += `Equation 1: ${a1}x ${b1 >= 0 ? '+' : ''}${b1}y = ${c1}\n`;
    output += `Equation 2: ${a2}x ${b2 >= 0 ? '+' : ''}${b2}y = ${c2}\n\n`;

    // Multiply equations to eliminate x
    const mult1 = a2;
    const mult2 = a1;

    output += `Step 1: Eliminate x by multiplying:\n`;
    output += `Equation 1 × ${mult1}: ${a1 * mult1}x ${(b1 * mult1) >= 0 ? '+' : ''}${b1 * mult1}y = ${c1 * mult1}\n`;
    output += `Equation 2 × ${mult2}: ${a2 * mult2}x ${(b2 * mult2) >= 0 ? '+' : ''}${b2 * mult2}y = ${c2 * mult2}\n\n`;

    const newB = b1 * mult1 - b2 * mult2;
    const newC = c1 * mult1 - c2 * mult2;

    output += `Step 2: Subtract equations:\n`;
    output += `${newB}y = ${newC}\n`;

    if (newB === 0) {
      if (Math.abs(newC) < 0.0001) {
        return output + '\nInfinite solutions (dependent system)';
      } else {
        return output + '\nNo solution (inconsistent system)';
      }
    }

    const y = newC / newB;
    output += `y = ${y.toFixed(4)}\n\n`;

    output += `Step 3: Substitute y into equation 1:\n`;
    output += `${a1}x ${b1 >= 0 ? '+' : ''}${b1}(${y.toFixed(4)}) = ${c1}\n`;

    const x = (c1 - b1 * y) / a1;
    output += `${a1}x = ${(c1 - b1 * y).toFixed(4)}\n`;
    output += `x = ${x.toFixed(4)}\n\n`;

    output += `Solution:\n`;
    output += `x = ${x.toFixed(4)}\n`;
    output += `y = ${y.toFixed(4)}`;

    return output;
  };

  const solveByMatrix = (a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): string => {
    let output = 'Matrix Method (Cramer\'s Rule):\n\n';
    output += `System:\n`;
    output += `${a1}x ${b1 >= 0 ? '+' : ''}${b1}y = ${c1}\n`;
    output += `${a2}x ${b2 >= 0 ? '+' : ''}${b2}y = ${c2}\n\n`;

    // Coefficient matrix determinant
    const det = a1 * b2 - a2 * b1;

    output += `Step 1: Calculate determinant D:\n`;
    output += `D = |${a1}  ${b1}| = ${a1}(${b2}) - ${a2}(${b1})\n`;
    output += `    |${a2}  ${b2}|\n`;
    output += `D = ${det}\n\n`;

    if (Math.abs(det) < 0.0001) {
      if (Math.abs(c1 * a2 - c2 * a1) < 0.0001) {
        return output + 'D = 0: Infinite solutions (dependent system)';
      } else {
        return output + 'D = 0: No solution (inconsistent system)';
      }
    }

    // Determinant for x
    const detX = c1 * b2 - c2 * b1;
    output += `Step 2: Calculate Dx (replace x column with constants):\n`;
    output += `Dx = |${c1}  ${b1}| = ${c1}(${b2}) - ${c2}(${b1})\n`;
    output += `     |${c2}  ${b2}|\n`;
    output += `Dx = ${detX}\n\n`;

    // Determinant for y
    const detY = a1 * c2 - a2 * c1;
    output += `Step 3: Calculate Dy (replace y column with constants):\n`;
    output += `Dy = |${a1}  ${c1}| = ${a1}(${c2}) - ${a2}(${c1})\n`;
    output += `     |${a2}  ${c2}|\n`;
    output += `Dy = ${detY}\n\n`;

    const x = detX / det;
    const y = detY / det;

    output += `Step 4: Apply Cramer's Rule:\n`;
    output += `x = Dx/D = ${detX}/${det} = ${x.toFixed(4)}\n`;
    output += `y = Dy/D = ${detY}/${det} = ${y.toFixed(4)}\n\n`;

    output += `Solution:\n`;
    output += `x = ${x.toFixed(4)}\n`;
    output += `y = ${y.toFixed(4)}`;

    return output;
  };

  const calculate = () => {
    const a1Num = parseFloat(a1);
    const b1Num = parseFloat(b1);
    const c1Num = parseFloat(c1);
    const a2Num = parseFloat(a2);
    const b2Num = parseFloat(b2);
    const c2Num = parseFloat(c2);

    if (isNaN(a1Num) || isNaN(b1Num) || isNaN(c1Num) || isNaN(a2Num) || isNaN(b2Num) || isNaN(c2Num)) {
      setResult('Please enter all coefficients');
      return;
    }

    let output = '';
    if (method === 'elimination') {
      output = solveByElimination(a1Num, b1Num, c1Num, a2Num, b2Num, c2Num);
    } else {
      output = solveByMatrix(a1Num, b1Num, c1Num, a2Num, b2Num, c2Num);
    }

    setResult(output);
  };

  const clear = () => {
    setA1('');
    setB1('');
    setC1('');
    setA2('');
    setB2('');
    setC2('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">=</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System of Equations Calculator</h1>
          <p className="text-gray-600">Solve systems of linear equations using elimination or matrix methods</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[200px] overflow-y-auto max-h-[400px]">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Method Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Solution Method</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMethod('elimination')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              method === 'elimination'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Elimination
          </button>
          <button
            onClick={() => setMethod('matrix')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              method === 'matrix'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Matrix (Cramer's Rule)
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Equation 1: a₁x + b₁y = c₁
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              value={a1}
              onChange={(e) => setA1(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="a₁"
              step="any"
            />
            <input
              type="number"
              value={b1}
              onChange={(e) => setB1(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="b₁"
              step="any"
            />
            <input
              type="number"
              value={c1}
              onChange={(e) => setC1(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="c₁"
              step="any"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Equation 2: a₂x + b₂y = c₂
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              value={a2}
              onChange={(e) => setA2(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="a₂"
              step="any"
            />
            <input
              type="number"
              value={b2}
              onChange={(e) => setB2(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="b₂"
              step="any"
            />
            <input
              type="number"
              value={c2}
              onChange={(e) => setC2(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="c₂"
              step="any"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Solve
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Solution Methods */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📐</span>
          Solution Methods
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Elimination Method</div>
            <div className="text-sm text-blue-700">Multiply equations to eliminate one variable</div>
            <div className="text-xs text-blue-600 mt-1">Best for simple coefficients</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Matrix Method</div>
            <div className="text-sm text-blue-700">Use determinants (Cramer's Rule)</div>
            <div className="text-xs text-blue-600 mt-1">Systematic and organized</div>
          </div>
        </div>
      </div>

      {/* Types of Solutions */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Types of Solutions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">One Solution</div>
            <div className="text-sm text-purple-700">Lines intersect at one point</div>
            <div className="text-xs text-purple-600 mt-1">Consistent and independent</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">No Solution</div>
            <div className="text-sm text-purple-700">Parallel lines (never intersect)</div>
            <div className="text-xs text-purple-600 mt-1">Inconsistent system</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Infinite Solutions</div>
            <div className="text-sm text-purple-700">Same line (coincident)</div>
            <div className="text-xs text-purple-600 mt-1">Consistent and dependent</div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💼</span>
          Real-World Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Business</div>
            <div className="text-sm text-green-700">• Supply and demand</div>
            <div className="text-sm text-green-700">• Cost optimization</div>
            <div className="text-sm text-green-700">• Break-even analysis</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Engineering</div>
            <div className="text-sm text-green-700">• Circuit analysis</div>
            <div className="text-sm text-green-700">• Structural loads</div>
            <div className="text-sm text-green-700">• Network flow</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Science</div>
            <div className="text-sm text-green-700">• Chemical mixtures</div>
            <div className="text-sm text-green-700">• Physics problems</div>
            <div className="text-sm text-green-700">• Rate problems</div>
          </div>
        </div>
      </div>
    </div>
  );
}
