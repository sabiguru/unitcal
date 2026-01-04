'use client';

import { useState } from 'react';

export default function SubstitutionMethodCalculator() {
  const [a1, setA1] = useState<string>('');
  const [b1, setB1] = useState<string>('');
  const [c1, setC1] = useState<string>('');
  const [a2, setA2] = useState<string>('');
  const [b2, setB2] = useState<string>('');
  const [c2, setC2] = useState<string>('');
  const [result, setResult] = useState<string>('');

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

    let output = 'System of Equations:\n';
    output += `Equation 1: ${a1Num}x ${b1Num >= 0 ? '+' : ''}${b1Num}y = ${c1Num}\n`;
    output += `Equation 2: ${a2Num}x ${b2Num >= 0 ? '+' : ''}${b2Num}y = ${c2Num}\n\n`;

    // Solve using substitution method
    // From equation 1, solve for x (or y if easier)
    output += 'Substitution Method:\n\n';

    if (b1Num !== 0) {
      // Solve equation 1 for y
      output += `Step 1: Solve equation 1 for y\n`;
      output += `${b1Num}y = ${c1Num} - ${a1Num}x\n`;
      output += `y = (${c1Num} - ${a1Num}x) / ${b1Num}\n\n`;

      output += `Step 2: Substitute into equation 2\n`;
      output += `${a2Num}x + ${b2Num}((${c1Num} - ${a1Num}x) / ${b1Num}) = ${c2Num}\n\n`;

      output += `Step 3: Solve for x\n`;
      // Multiply through by b1Num
      const leftCoeff = a2Num * b1Num + b2Num * (-a1Num);
      const rightSide = c2Num * b1Num - b2Num * c1Num;

      if (leftCoeff === 0) {
        if (Math.abs(rightSide) < 0.0001) {
          output += 'Infinite solutions (dependent equations)';
        } else {
          output += 'No solution (inconsistent system)';
        }
        setResult(output);
        return;
      }

      const x = rightSide / leftCoeff;
      output += `${leftCoeff}x = ${rightSide}\n`;
      output += `x = ${x.toFixed(4)}\n\n`;

      output += `Step 4: Substitute x back to find y\n`;
      const y = (c1Num - a1Num * x) / b1Num;
      output += `y = (${c1Num} - ${a1Num}(${x.toFixed(4)})) / ${b1Num}\n`;
      output += `y = ${y.toFixed(4)}\n\n`;

      output += `Solution:\n`;
      output += `x = ${x.toFixed(4)}\n`;
      output += `y = ${y.toFixed(4)}`;

    } else if (a1Num !== 0) {
      // Solve equation 1 for x
      output += `Step 1: Solve equation 1 for x\n`;
      output += `${a1Num}x = ${c1Num}\n`;
      output += `x = ${(c1Num / a1Num).toFixed(4)}\n\n`;

      const x = c1Num / a1Num;

      output += `Step 2: Substitute into equation 2\n`;
      output += `${a2Num}(${x.toFixed(4)}) + ${b2Num}y = ${c2Num}\n\n`;

      output += `Step 3: Solve for y\n`;
      const y = (c2Num - a2Num * x) / b2Num;
      output += `${b2Num}y = ${c2Num} - ${(a2Num * x).toFixed(4)}\n`;
      output += `y = ${y.toFixed(4)}\n\n`;

      output += `Solution:\n`;
      output += `x = ${x.toFixed(4)}\n`;
      output += `y = ${y.toFixed(4)}`;
    } else {
      output += 'Cannot solve: first equation has no variables';
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
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">xy</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Substitution Method Calculator</h1>
          <p className="text-gray-600">Solve systems of linear equations using substitution</p>
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
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="a₁"
              step="any"
            />
            <input
              type="number"
              value={b1}
              onChange={(e) => setB1(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="b₁"
              step="any"
            />
            <input
              type="number"
              value={c1}
              onChange={(e) => setC1(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="a₂"
              step="any"
            />
            <input
              type="number"
              value={b2}
              onChange={(e) => setB2(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="b₂"
              step="any"
            />
            <input
              type="number"
              value={c2}
              onChange={(e) => setC2(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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

      {/* Substitution Steps */}
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="text-indigo-600 mr-2">📐</span>
          Substitution Method Steps
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Step 1: Solve for One Variable</div>
            <div className="text-sm text-indigo-700">Choose one equation and solve for x or y</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Step 2: Substitute</div>
            <div className="text-sm text-indigo-700">Replace that variable in the other equation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Step 3: Solve</div>
            <div className="text-sm text-indigo-700">Solve the resulting single-variable equation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Step 4: Back-Substitute</div>
            <div className="text-sm text-indigo-700">Use the value to find the other variable</div>
          </div>
        </div>
      </div>

      {/* Example */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Example
        </h3>
        <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-1">
          <div className="text-purple-900 font-bold">System:</div>
          <div className="text-purple-700">x + y = 5</div>
          <div className="text-purple-700">2x - y = 1</div>
          <div className="text-purple-900 font-bold mt-3">Step 1: From eq. 1:</div>
          <div className="text-purple-700">y = 5 - x</div>
          <div className="text-purple-900 font-bold mt-3">Step 2: Substitute into eq. 2:</div>
          <div className="text-purple-700">2x - (5 - x) = 1</div>
          <div className="text-purple-900 font-bold mt-3">Step 3: Solve for x:</div>
          <div className="text-purple-700">3x - 5 = 1</div>
          <div className="text-purple-700">x = 2</div>
          <div className="text-purple-900 font-bold mt-3">Step 4: Find y:</div>
          <div className="text-purple-700">y = 5 - 2 = 3</div>
          <div className="text-purple-900 font-bold mt-3">Solution: (2, 3)</div>
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
            <div className="font-semibold text-green-900 mb-2">Business</div>
            <div className="text-sm text-green-700">• Supply and demand</div>
            <div className="text-sm text-green-700">• Cost analysis</div>
            <div className="text-sm text-green-700">• Break-even points</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Physics</div>
            <div className="text-sm text-green-700">• Motion problems</div>
            <div className="text-sm text-green-700">• Force equations</div>
            <div className="text-sm text-green-700">• Circuit analysis</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Chemistry</div>
            <div className="text-sm text-green-700">• Mixture problems</div>
            <div className="text-sm text-green-700">• Reaction rates</div>
            <div className="text-sm text-green-700">• Concentration</div>
          </div>
        </div>
      </div>
    </div>
  );
}
