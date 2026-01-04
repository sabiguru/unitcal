'use client';

import { useState } from 'react';

export default function QuadraticFormulaCalculator() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      setResult('Please enter valid coefficients');
      return;
    }

    if (aNum === 0) {
      setResult('Error: a cannot be 0 (not a quadratic equation)');
      return;
    }

    const discriminant = bNum * bNum - 4 * aNum * cNum;

    let output = `Equation: ${aNum}x² ${bNum >= 0 ? '+' : ''}${bNum}x ${cNum >= 0 ? '+' : ''}${cNum} = 0\n\n`;
    output += `Discriminant: b² - 4ac = ${bNum}² - 4(${aNum})(${cNum})\n`;
    output += `Δ = ${discriminant}\n\n`;

    if (discriminant > 0) {
      const x1 = (-bNum + Math.sqrt(discriminant)) / (2 * aNum);
      const x2 = (-bNum - Math.sqrt(discriminant)) / (2 * aNum);

      output += 'Two distinct real roots:\n\n';
      output += `x₁ = (-b + √Δ) / (2a)\n`;
      output += `x₁ = (${-bNum} + √${discriminant}) / ${2 * aNum}\n`;
      output += `x₁ = ${x1.toFixed(4)}\n\n`;
      output += `x₂ = (-b - √Δ) / (2a)\n`;
      output += `x₂ = (${-bNum} - √${discriminant}) / ${2 * aNum}\n`;
      output += `x₂ = ${x2.toFixed(4)}`;
    } else if (discriminant === 0) {
      const x = -bNum / (2 * aNum);

      output += 'One repeated real root:\n\n';
      output += `x = -b / (2a)\n`;
      output += `x = ${-bNum} / ${2 * aNum}\n`;
      output += `x = ${x.toFixed(4)}`;
    } else {
      const realPart = -bNum / (2 * aNum);
      const imagPart = Math.sqrt(-discriminant) / (2 * aNum);

      output += 'Two complex conjugate roots:\n\n';
      output += `x₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i\n`;
      output += `x₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;
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
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">x²</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quadratic Formula Calculator</h1>
          <p className="text-gray-600">Solve quadratic equations: ax² + bx + c = 0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[150px]">
            {result || ' '}
          </div>
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter c"
            step="any"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Quadratic Formula */}
      <div className="mt-8 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <span className="text-red-600 mr-2">📐</span>
          Quadratic Formula
        </h3>
        <div className="bg-white p-6 rounded-lg text-center">
          <div className="text-2xl text-red-900 font-mono mb-2">
            x = (-b ± √(b² - 4ac)) / (2a)
          </div>
          <div className="text-sm text-red-700 mt-4">
            For equation: ax² + bx + c = 0
          </div>
        </div>
      </div>

      {/* Discriminant */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Discriminant (Δ = b² - 4ac)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Δ {'>'} 0</div>
            <div className="text-sm text-blue-700">Two distinct real roots</div>
            <div className="text-xs text-blue-600 mt-1">Parabola crosses x-axis twice</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Δ = 0</div>
            <div className="text-sm text-blue-700">One repeated real root</div>
            <div className="text-xs text-blue-600 mt-1">Parabola touches x-axis once</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Δ {'<'} 0</div>
            <div className="text-sm text-blue-700">Two complex roots</div>
            <div className="text-xs text-blue-600 mt-1">Parabola doesn't cross x-axis</div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">🔢</span>
          Common Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">x² - 5x + 6 = 0</div>
            <div className="text-sm text-purple-700">a=1, b=-5, c=6</div>
            <div className="text-sm text-purple-700">x = 2 or x = 3</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">x² + 4x + 4 = 0</div>
            <div className="text-sm text-purple-700">a=1, b=4, c=4</div>
            <div className="text-sm text-purple-700">x = -2 (repeated)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">2x² - 3x - 2 = 0</div>
            <div className="text-sm text-purple-700">a=2, b=-3, c=-2</div>
            <div className="text-sm text-purple-700">x = 2 or x = -0.5</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">x² + x + 1 = 0</div>
            <div className="text-sm text-purple-700">a=1, b=1, c=1</div>
            <div className="text-sm text-purple-700">Complex roots</div>
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
            <div className="text-sm text-green-700">• Free fall problems</div>
            <div className="text-sm text-green-700">• Wave equations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Engineering</div>
            <div className="text-sm text-green-700">• Circuit analysis</div>
            <div className="text-sm text-green-700">• Structural design</div>
            <div className="text-sm text-green-700">• Optimization</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Business</div>
            <div className="text-sm text-green-700">• Profit maximization</div>
            <div className="text-sm text-green-700">• Break-even analysis</div>
            <div className="text-sm text-green-700">• Revenue modeling</div>
          </div>
        </div>
      </div>
    </div>
  );
}
