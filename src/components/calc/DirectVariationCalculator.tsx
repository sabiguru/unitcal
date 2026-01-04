'use client';

import { useState } from 'react';

export default function DirectVariationCalculator() {
  const [mode, setMode] = useState<'findK' | 'findY' | 'findX'>('findK');
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [k, setK] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const calculate = () => {
    if (mode === 'findK') {
      const xVal = parseFloat(x1);
      const yVal = parseFloat(y1);

      if (isNaN(xVal) || isNaN(yVal)) {
        setResult('Invalid input');
        setSteps('Please enter valid numbers');
        return;
      }

      if (xVal === 0) {
        setResult('Error: x cannot be 0');
        setSteps('Division by zero');
        return;
      }

      const kVal = yVal / xVal;
      setResult(`k = ${kVal.toFixed(4)}`);
      setSteps(
        `Direct variation: y = kx\n\n` +
        `Given: x = ${xVal}, y = ${yVal}\n\n` +
        `Solve for k:\n` +
        `k = y / x\n` +
        `k = ${yVal} / ${xVal}\n` +
        `k = ${kVal.toFixed(4)}\n\n` +
        `Equation: y = ${kVal.toFixed(4)}x`
      );
    } else if (mode === 'findY') {
      const xVal = parseFloat(x2);
      const kVal = parseFloat(k);

      if (isNaN(xVal) || isNaN(kVal)) {
        setResult('Invalid input');
        setSteps('Please enter valid numbers');
        return;
      }

      const yVal = kVal * xVal;
      setResult(`y = ${yVal.toFixed(4)}`);
      setSteps(
        `Direct variation: y = kx\n\n` +
        `Given: k = ${kVal}, x = ${xVal}\n\n` +
        `Calculate y:\n` +
        `y = kx\n` +
        `y = ${kVal} × ${xVal}\n` +
        `y = ${yVal.toFixed(4)}`
      );
    } else {
      // findX
      const yVal = parseFloat(y1);
      const kVal = parseFloat(k);

      if (isNaN(yVal) || isNaN(kVal)) {
        setResult('Invalid input');
        setSteps('Please enter valid numbers');
        return;
      }

      if (kVal === 0) {
        setResult('Error: k cannot be 0');
        setSteps('Division by zero');
        return;
      }

      const xVal = yVal / kVal;
      setResult(`x = ${xVal.toFixed(4)}`);
      setSteps(
        `Direct variation: y = kx\n\n` +
        `Given: k = ${kVal}, y = ${yVal}\n\n` +
        `Solve for x:\n` +
        `x = y / k\n` +
        `x = ${yVal} / ${kVal}\n` +
        `x = ${xVal.toFixed(4)}`
      );
    }
  };

  const clear = () => {
    setX1('');
    setY1('');
    setX2('');
    setK('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-lime-500 to-green-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">∝</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Direct Variation Calculator</h1>
          <p className="text-gray-600">Solve y = kx direct variation problems</p>
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

      {/* Mode Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">What to Find?</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setMode('findK')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              mode === 'findK'
                ? 'bg-lime-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Find k
          </button>
          <button
            onClick={() => setMode('findY')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              mode === 'findY'
                ? 'bg-lime-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Find y
          </button>
          <button
            onClick={() => setMode('findX')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              mode === 'findX'
                ? 'bg-lime-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Find x
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        {mode === 'findK' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">x value</label>
              <input
                type="number"
                value={x1}
                onChange={(e) => setX1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="Enter x"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">y value</label>
              <input
                type="number"
                value={y1}
                onChange={(e) => setY1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="Enter y"
                step="0.1"
              />
            </div>
          </>
        )}

        {mode === 'findY' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Constant k</label>
              <input
                type="number"
                value={k}
                onChange={(e) => setK(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="Enter k"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">x value</label>
              <input
                type="number"
                value={x2}
                onChange={(e) => setX2(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="Enter x"
                step="0.1"
              />
            </div>
          </>
        )}

        {mode === 'findX' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Constant k</label>
              <input
                type="number"
                value={k}
                onChange={(e) => setK(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="Enter k"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">y value</label>
              <input
                type="number"
                value={y1}
                onChange={(e) => setY1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="Enter y"
                step="0.1"
              />
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-lime-500 hover:bg-lime-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-lime-50 to-green-100 rounded-xl p-6 border border-lime-200">
        <h3 className="text-lg font-semibold text-lime-900 mb-4 flex items-center">
          <span className="text-lime-600 mr-2">📐</span>
          Direct Variation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-lime-900 mb-2">Basic Formula</div>
            <div className="text-sm text-lime-700 font-mono">y = kx</div>
            <div className="text-xs text-lime-600 mt-1">k is constant of variation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-lime-900 mb-2">Alternative Form</div>
            <div className="text-sm text-lime-700 font-mono">y ∝ x (y varies directly with x)</div>
            <div className="text-xs text-lime-600 mt-1">Proportional relationship</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-lime-900 mb-2">Finding k</div>
            <div className="text-sm text-lime-700 font-mono">k = y / x</div>
            <div className="text-xs text-lime-600 mt-1">Given a point (x, y)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-lime-900 mb-2">Graph Property</div>
            <div className="text-sm text-lime-700 font-mono">Straight line through origin</div>
            <div className="text-xs text-lime-600 mt-1">Slope = k</div>
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
            <div className="font-semibold text-blue-900 mb-2">Physics</div>
            <div className="text-sm text-blue-700">• Distance and time</div>
            <div className="text-sm text-blue-700">• Force and acceleration</div>
            <div className="text-sm text-blue-700">• Hooke's law</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Economics</div>
            <div className="text-sm text-blue-700">• Cost and quantity</div>
            <div className="text-sm text-blue-700">• Wages and hours</div>
            <div className="text-sm text-blue-700">• Price relationships</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Science</div>
            <div className="text-sm text-blue-700">• Chemical concentrations</div>
            <div className="text-sm text-blue-700">• Proportional growth</div>
            <div className="text-sm text-blue-700">• Linear relationships</div>
          </div>
        </div>
      </div>
    </div>
  );
}
