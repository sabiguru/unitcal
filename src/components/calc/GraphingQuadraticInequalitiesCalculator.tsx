'use client';

import { useState } from 'react';

export default function GraphingQuadraticInequalitiesCalculator() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [inequality, setInequality] = useState<'greater' | 'less' | 'greaterEqual' | 'lessEqual'>('greater');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum) || aNum === 0) {
      setResult('Invalid input. a cannot be 0.');
      return;
    }

    // Calculate discriminant
    const discriminant = bNum * bNum - 4 * aNum * cNum;

    // Calculate vertex
    const h = -bNum / (2 * aNum);
    const k = aNum * h * h + bNum * h + cNum;

    let inequalitySymbol = '';
    switch (inequality) {
      case 'greater': inequalitySymbol = '>'; break;
      case 'less': inequalitySymbol = '<'; break;
      case 'greaterEqual': inequalitySymbol = '≥'; break;
      case 'lessEqual': inequalitySymbol = '≤'; break;
    }

    let output = `Quadratic: ${aNum}x² ${bNum >= 0 ? '+' : ''}${bNum}x ${cNum >= 0 ? '+' : ''}${cNum} ${inequalitySymbol} 0\n\n`;
    output += `Vertex: (${h.toFixed(2)}, ${k.toFixed(2)})\n`;
    output += `Opens: ${aNum > 0 ? 'Upward' : 'Downward'}\n\n`;

    if (discriminant > 0) {
      const x1 = (-bNum + Math.sqrt(discriminant)) / (2 * aNum);
      const x2 = (-bNum - Math.sqrt(discriminant)) / (2 * aNum);
      const left = Math.min(x1, x2);
      const right = Math.max(x1, x2);

      output += `Roots: x = ${left.toFixed(2)}, x = ${right.toFixed(2)}\n\n`;

      // Determine solution based on parabola opening and inequality
      if (inequality === 'greater' || inequality === 'greaterEqual') {
        if (aNum > 0) {
          output += `Solution: x < ${left.toFixed(2)} or x > ${right.toFixed(2)}`;
        } else {
          output += `Solution: ${left.toFixed(2)} < x < ${right.toFixed(2)}`;
        }
      } else {
        if (aNum > 0) {
          output += `Solution: ${left.toFixed(2)} < x < ${right.toFixed(2)}`;
        } else {
          output += `Solution: x < ${left.toFixed(2)} or x > ${right.toFixed(2)}`;
        }
      }
    } else if (discriminant === 0) {
      const x = -bNum / (2 * aNum);
      output += `One root: x = ${x.toFixed(2)}\n`;
      output += `Solution: Only x = ${x.toFixed(2)} (touches x-axis)`;
    } else {
      output += 'No real roots (parabola does not cross x-axis)\n';
      if ((aNum > 0 && (inequality === 'greater' || inequality === 'greaterEqual')) ||
          (aNum < 0 && (inequality === 'less' || inequality === 'lessEqual'))) {
        output += 'Solution: All real numbers';
      } else {
        output += 'Solution: No solution';
      }
    }

    setResult(output);
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
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">∪</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Graphing Quadratic Inequalities Calculator</h1>
          <p className="text-gray-600">Solve and graph quadratic inequalities ax² + bx + c {'>'} 0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[100px]">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Inequality Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Inequality Type</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setInequality('greater')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              inequality === 'greater'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {'>'} 0
          </button>
          <button
            onClick={() => setInequality('less')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              inequality === 'less'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {'<'} 0
          </button>
          <button
            onClick={() => setInequality('greaterEqual')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              inequality === 'greaterEqual'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ≥ 0
          </button>
          <button
            onClick={() => setInequality('lessEqual')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              inequality === 'lessEqual'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ≤ 0
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coefficient a (x²)
          </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter coefficient a"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter coefficient b"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter constant c"
            step="any"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Formulas */}
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="text-indigo-600 mr-2">📐</span>
          Quadratic Inequality Formulas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Standard Form</div>
            <div className="text-sm text-indigo-700 font-mono">ax² + bx + c {'>'} 0</div>
            <div className="text-xs text-indigo-600 mt-1">Where a ≠ 0</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Discriminant</div>
            <div className="text-sm text-indigo-700 font-mono">Δ = b² - 4ac</div>
            <div className="text-xs text-indigo-600 mt-1">Determines number of roots</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Vertex</div>
            <div className="text-sm text-indigo-700 font-mono">h = -b/(2a), k = f(h)</div>
            <div className="text-xs text-indigo-600 mt-1">Minimum or maximum point</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Roots</div>
            <div className="text-sm text-indigo-700 font-mono">x = (-b ± √Δ) / (2a)</div>
            <div className="text-xs text-indigo-600 mt-1">Where parabola crosses x-axis</div>
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
            <div className="font-semibold text-green-900 mb-2">Physics</div>
            <div className="text-sm text-green-700">• Projectile motion</div>
            <div className="text-sm text-green-700">• Height constraints</div>
            <div className="text-sm text-green-700">• Energy bounds</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Engineering</div>
            <div className="text-sm text-green-700">• Structural limits</div>
            <div className="text-sm text-green-700">• Optimization</div>
            <div className="text-sm text-green-700">• Safety margins</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Economics</div>
            <div className="text-sm text-green-700">• Profit analysis</div>
            <div className="text-sm text-green-700">• Cost constraints</div>
            <div className="text-sm text-green-700">• Revenue modeling</div>
          </div>
        </div>
      </div>
    </div>
  );
}
