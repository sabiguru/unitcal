'use client';

import { useState } from 'react';

export default function RatioCalculator() {
  const [calculationType, setCalculationType] = useState<'simplify' | 'proportion' | 'scale'>('simplify');
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [expression, setExpression] = useState<string>('');

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const simplifyRatio = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    if (isNaN(num1) || isNaN(num2)) return;
    
    const divisor = gcd(num1, num2);
    const simplified1 = num1 / divisor;
    const simplified2 = num2 / divisor;
    
    setResult(`${simplified1}:${simplified2}`);
    setExpression(`${num1}:${num2} simplified = ${simplified1}:${simplified2}`);
  };

  const solveProportion = () => {
    const a = parseFloat(value1);
    const b = parseFloat(value2);
    const c = parseFloat(value3);
    
    if (isNaN(a) || isNaN(b) || isNaN(c)) return;
    
    // Solve for x in a:b = c:x
    const x = (b * c) / a;
    setValue4(x.toString());
    setResult(x.toFixed(4));
    setExpression(`${a}:${b} = ${c}:${x.toFixed(4)}`);
  };

  const calculateScale = () => {
    const original = parseFloat(value1);
    const scale = parseFloat(value2);
    
    if (isNaN(original) || isNaN(scale)) return;
    
    const scaled = original * scale;
    setResult(scaled.toString());
    setExpression(`${original} × ${scale} = ${scaled}`);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'simplify':
        simplifyRatio();
        break;
      case 'proportion':
        solveProportion();
        break;
      case 'scale':
        calculateScale();
        break;
    }
  };

  const clear = () => {
    setValue1('');
    setValue2('');
    setValue3('');
    setValue4('');
    setResult('');
    setExpression('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⚖️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ratio Calculator — Proportion & Ratio Solver</h1>
          <p className="text-gray-600">Find ratios, proportions, and scale factors</p>
        </div>
      </div>
      
      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {expression || ' '}
          </div>
          <div className="text-3xl font-mono text-right">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Calculation Type Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Calculation Type</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setCalculationType('simplify')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'simplify'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Simplify Ratio
          </button>
          <button
            onClick={() => setCalculationType('proportion')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'proportion'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Proportion
          </button>
          <button
            onClick={() => setCalculationType('scale')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'scale'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Scale Factor
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        {calculationType === 'simplify' && (
          <>
            <div className="grid grid-cols-3 gap-4 items-center">
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="First number"
              />
              <div className="text-center text-2xl font-bold text-gray-400">:</div>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Second number"
              />
            </div>
          </>
        )}

        {calculationType === 'proportion' && (
          <>
            <div className="text-center mb-4">
              <span className="text-lg font-medium text-gray-700">Solve: a : b = c : x</span>
            </div>
            <div className="grid grid-cols-5 gap-2 items-center">
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="a"
              />
              <div className="text-center text-xl font-bold text-gray-400">:</div>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="b"
              />
              <div className="text-center text-xl font-bold text-gray-400">=</div>
              <input
                type="number"
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="c"
              />
            </div>
            <div className="grid grid-cols-5 gap-2 items-center">
              <div></div>
              <div className="text-center text-xl font-bold text-gray-400">:</div>
              <div></div>
              <div className="text-center text-xl font-bold text-gray-400">=</div>
              <input
                type="number"
                value={value4}
                readOnly
                className="px-3 py-3 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="x (result)"
              />
            </div>
          </>
        )}

        {calculationType === 'scale' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Value
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter original value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scale Factor
              </label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter scale factor"
              />
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
  );
}