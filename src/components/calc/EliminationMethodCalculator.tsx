'use client';

import { useState } from 'react';

export default function EliminationMethodCalculator() {
  const [a1, setA1] = useState<string>('');
  const [b1, setB1] = useState<string>('');
  const [c1, setC1] = useState<string>('');
  const [a2, setA2] = useState<string>('');
  const [b2, setB2] = useState<string>('');
  const [c2, setC2] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const calculate = () => {
    const a1Val = parseFloat(a1);
    const b1Val = parseFloat(b1);
    const c1Val = parseFloat(c1);
    const a2Val = parseFloat(a2);
    const b2Val = parseFloat(b2);
    const c2Val = parseFloat(c2);

    if (isNaN(a1Val) || isNaN(b1Val) || isNaN(c1Val) || isNaN(a2Val) || isNaN(b2Val) || isNaN(c2Val)) {
      setResult('Invalid input');
      setSteps('Please enter valid numbers');
      return;
    }

    // Calculate determinant
    const det = a1Val * b2Val - a2Val * b1Val;

    if (det === 0) {
      // Check if equations are parallel or same line
      const ratio1 = a1Val / a2Val;
      const ratio2 = b1Val / b2Val;
      const ratio3 = c1Val / c2Val;

      if (Math.abs(ratio1 - ratio2) < 0.0001 && Math.abs(ratio2 - ratio3) < 0.0001) {
        setResult('Infinite solutions (same line)');
        setSteps('The equations represent the same line');
      } else {
        setResult('No solution (parallel lines)');
        setSteps('The equations represent parallel lines');
      }
      return;
    }

    // Solve using elimination
    const x = (c1Val * b2Val - c2Val * b1Val) / det;
    const y = (a1Val * c2Val - a2Val * c1Val) / det;

    setResult(`x = ${x.toFixed(4)}, y = ${y.toFixed(4)}`);

    // Generate step-by-step solution
    let stepsStr = `System of equations:\n`;
    stepsStr += `${a1Val}x ${b1Val >= 0 ? '+' : ''}${b1Val}y = ${c1Val}\n`;
    stepsStr += `${a2Val}x ${b2Val >= 0 ? '+' : ''}${b2Val}y = ${c2Val}\n\n`;

    // Decide which variable to eliminate
    const elimX = Math.abs(a1Val) <= Math.abs(b1Val);

    if (elimX) {
      // Eliminate x
      const mult1 = a2Val;
      const mult2 = a1Val;

      stepsStr += `Step 1: Eliminate x\n`;
      stepsStr += `Multiply equation 1 by ${mult1}:\n`;
      stepsStr += `${a1Val * mult1}x ${b1Val * mult1 >= 0 ? '+' : ''}${b1Val * mult1}y = ${c1Val * mult1}\n\n`;
      stepsStr += `Multiply equation 2 by ${mult2}:\n`;
      stepsStr += `${a2Val * mult2}x ${b2Val * mult2 >= 0 ? '+' : ''}${b2Val * mult2}y = ${c2Val * mult2}\n\n`;

      const newB = b1Val * mult1 - b2Val * mult2;
      const newC = c1Val * mult1 - c2Val * mult2;

      stepsStr += `Subtract equations:\n`;
      stepsStr += `${newB}y = ${newC}\n`;
      stepsStr += `y = ${y.toFixed(4)}\n\n`;

      stepsStr += `Step 2: Substitute y back\n`;
      stepsStr += `${a1Val}x ${b1Val >= 0 ? '+' : ''}${b1Val}(${y.toFixed(4)}) = ${c1Val}\n`;
      stepsStr += `x = ${x.toFixed(4)}`;
    } else {
      // Eliminate y
      const mult1 = b2Val;
      const mult2 = b1Val;

      stepsStr += `Step 1: Eliminate y\n`;
      stepsStr += `Multiply equation 1 by ${mult1}:\n`;
      stepsStr += `${a1Val * mult1}x ${b1Val * mult1 >= 0 ? '+' : ''}${b1Val * mult1}y = ${c1Val * mult1}\n\n`;
      stepsStr += `Multiply equation 2 by ${mult2}:\n`;
      stepsStr += `${a2Val * mult2}x ${b2Val * mult2 >= 0 ? '+' : ''}${b2Val * mult2}y = ${c2Val * mult2}\n\n`;

      const newA = a1Val * mult1 - a2Val * mult2;
      const newC = c1Val * mult1 - c2Val * mult2;

      stepsStr += `Subtract equations:\n`;
      stepsStr += `${newA}x = ${newC}\n`;
      stepsStr += `x = ${x.toFixed(4)}\n\n`;

      stepsStr += `Step 2: Substitute x back\n`;
      stepsStr += `${a1Val}(${x.toFixed(4)}) ${b1Val >= 0 ? '+' : ''}${b1Val}y = ${c1Val}\n`;
      stepsStr += `y = ${y.toFixed(4)}`;
    }

    setSteps(stepsStr);
  };

  const clear = () => {
    setA1('');
    setB1('');
    setC1('');
    setA2('');
    setB2('');
    setC2('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">×</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Elimination Method Calculator</h1>
          <p className="text-gray-600">Solve systems of linear equations using elimination</p>
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
            Equation 1: a₁x + b₁y = c₁
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={a1}
              onChange={(e) => setA1(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="a₁"
              step="0.1"
            />
            <input
              type="number"
              value={b1}
              onChange={(e) => setB1(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="b₁"
              step="0.1"
            />
            <input
              type="number"
              value={c1}
              onChange={(e) => setC1(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="c₁"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equation 2: a₂x + b₂y = c₂
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={a2}
              onChange={(e) => setA2(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="a₂"
              step="0.1"
            />
            <input
              type="number"
              value={b2}
              onChange={(e) => setB2(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="b₂"
              step="0.1"
            />
            <input
              type="number"
              value={c2}
              onChange={(e) => setC2(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="c₂"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl p-6 border border-teal-200">
        <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
          <span className="text-teal-600 mr-2">📐</span>
          Elimination Method Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Step 1: Multiply</div>
            <div className="text-sm text-teal-700">Multiply equations to match coefficients</div>
            <div className="text-xs text-teal-600 mt-1">Make one variable eliminable</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Step 2: Add/Subtract</div>
            <div className="text-sm text-teal-700">Eliminate one variable</div>
            <div className="text-xs text-teal-600 mt-1">Add or subtract equations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Step 3: Solve</div>
            <div className="text-sm text-teal-700">Find value of remaining variable</div>
            <div className="text-xs text-teal-600 mt-1">Simple linear equation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-teal-900 mb-2">Step 4: Substitute</div>
            <div className="text-sm text-teal-700">Find other variable value</div>
            <div className="text-xs text-teal-600 mt-1">Back-substitute into original</div>
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
            <div className="font-semibold text-blue-900 mb-2">Mathematics</div>
            <div className="text-sm text-blue-700">• Linear systems</div>
            <div className="text-sm text-blue-700">• Matrix operations</div>
            <div className="text-sm text-blue-700">• Equation solving</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Engineering</div>
            <div className="text-sm text-blue-700">• Circuit analysis</div>
            <div className="text-sm text-blue-700">• Structural problems</div>
            <div className="text-sm text-blue-700">• Optimization</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Economics</div>
            <div className="text-sm text-blue-700">• Supply and demand</div>
            <div className="text-sm text-blue-700">• Break-even analysis</div>
            <div className="text-sm text-blue-700">• Market equilibrium</div>
          </div>
        </div>
      </div>
    </div>
  );
}
