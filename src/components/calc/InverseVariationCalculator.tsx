'use client';

import { useState } from 'react';

export default function InverseVariationCalculator() {
  const [calculationType, setCalculationType] = useState<'findK' | 'findY' | 'findX'>('findK');
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculate = () => {
    const x1Num = parseFloat(x1);
    const y1Num = parseFloat(y1);
    const x2Num = parseFloat(x2);

    if (calculationType === 'findK') {
      if (isNaN(x1Num) || isNaN(y1Num) || x1Num === 0) return;
      const k = x1Num * y1Num;
      setResult(k);
      setExpression(`k = xy = ${x1Num} × ${y1Num} = ${k}\nEquation: y = ${k}/x`);
    } else if (calculationType === 'findY') {
      if (isNaN(x1Num) || isNaN(y1Num) || isNaN(x2Num) || x2Num === 0) return;
      const k = x1Num * y1Num;
      const y2 = k / x2Num;
      setResult(y2);
      setExpression(`k = ${k}\nWhen x = ${x2Num}, y = ${k}/${x2Num} = ${y2}`);
    } else if (calculationType === 'findX') {
      if (isNaN(x1Num) || isNaN(y1Num) || isNaN(x2Num) || x2Num === 0) return;
      const k = x1Num * y1Num;
      const x = k / x2Num;
      setResult(x);
      setExpression(`k = ${k}\nWhen y = ${x2Num}, x = ${k}/${x2Num} = ${x}`);
    }
  };

  const clear = () => {
    setX1('');
    setY1('');
    setX2('');
    setResult(null);
    setExpression('');
  };

  const getInputLabels = () => {
    switch (calculationType) {
      case 'findK':
        return {
          label1: 'x value',
          label2: 'y value',
          label3: '',
          showThird: false,
          placeholder1: 'Enter x',
          placeholder2: 'Enter y',
          placeholder3: ''
        };
      case 'findY':
        return {
          label1: 'Known x₁',
          label2: 'Known y₁',
          label3: 'New x₂',
          showThird: true,
          placeholder1: 'Enter x₁',
          placeholder2: 'Enter y₁',
          placeholder3: 'Enter x₂'
        };
      case 'findX':
        return {
          label1: 'Known x₁',
          label2: 'Known y₁',
          label3: 'New y₂',
          showThird: true,
          placeholder1: 'Enter x₁',
          placeholder2: 'Enter y₁',
          placeholder3: 'Enter y₂'
        };
    }
  };

  const labels = getInputLabels();

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">∝</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inverse Variation Calculator</h1>
          <p className="text-gray-600">Solve inverse variation problems: y = k/x</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[50px]">
            {expression || ' '}
          </div>
          <div className="text-3xl font-mono text-right">
            {result !== null ? result.toFixed(4) : '0'}
          </div>
        </div>
      </div>

      {/* Calculation Type Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">What to Find</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setCalculationType('findK')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'findK'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Find k
          </button>
          <button
            onClick={() => setCalculationType('findY')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'findY'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Find y
          </button>
          <button
            onClick={() => setCalculationType('findX')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'findX'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Find x
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.label1}
          </label>
          <input
            type="number"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={labels.placeholder1}
            step="any"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.label2}
          </label>
          <input
            type="number"
            value={y1}
            onChange={(e) => setY1(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder={labels.placeholder2}
            step="any"
          />
        </div>

        {labels.showThird && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {labels.label3}
            </label>
            <input
              type="number"
              value={x2}
              onChange={(e) => setX2(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder={labels.placeholder3}
              step="any"
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Inverse Variation Formulas */}
      <div className="mt-8 bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl p-6 border border-pink-200">
        <h3 className="text-lg font-semibold text-pink-900 mb-4 flex items-center">
          <span className="text-pink-600 mr-2">📐</span>
          Inverse Variation Formulas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-pink-900 mb-2">Basic Formula</div>
            <div className="text-sm text-pink-700 font-mono">y = k/x or xy = k</div>
            <div className="text-xs text-pink-600 mt-1">k is the constant of variation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-pink-900 mb-2">Finding k</div>
            <div className="text-sm text-pink-700 font-mono">k = xy</div>
            <div className="text-xs text-pink-600 mt-1">Multiply x and y values</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-pink-900 mb-2">Finding y</div>
            <div className="text-sm text-pink-700 font-mono">y = k/x</div>
            <div className="text-xs text-pink-600 mt-1">Divide k by x value</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-pink-900 mb-2">Finding x</div>
            <div className="text-sm text-pink-700 font-mono">x = k/y</div>
            <div className="text-xs text-pink-600 mt-1">Divide k by y value</div>
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
            <div className="font-semibold text-green-900 mb-2">Physics</div>
            <div className="text-sm text-green-700">• Pressure and volume</div>
            <div className="text-sm text-green-700">• Speed and time</div>
            <div className="text-sm text-green-700">• Force and distance</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Economics</div>
            <div className="text-sm text-green-700">• Supply and demand</div>
            <div className="text-sm text-green-700">• Price and quantity</div>
            <div className="text-sm text-green-700">• Workers and time</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Engineering</div>
            <div className="text-sm text-green-700">• Gear ratios</div>
            <div className="text-sm text-green-700">• Resistance and current</div>
            <div className="text-sm text-green-700">• Intensity and distance</div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Key Concepts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• As x increases, y decreases proportionally</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• The product xy is always constant (k)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• Graph is a hyperbola</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• Opposite of direct variation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
