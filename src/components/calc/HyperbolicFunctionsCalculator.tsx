'use client';

import { useState } from 'react';

export default function HyperbolicFunctionsCalculator() {
  const [x, setX] = useState<string>('');
  const [functionType, setFunctionType] = useState<'sinh' | 'cosh' | 'tanh' | 'csch' | 'sech' | 'coth'>('sinh');
  const [result, setResult] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const sinh = (x: number) => (Math.exp(x) - Math.exp(-x)) / 2;
  const cosh = (x: number) => (Math.exp(x) + Math.exp(-x)) / 2;
  const tanh = (x: number) => sinh(x) / cosh(x);
  const csch = (x: number) => 1 / sinh(x);
  const sech = (x: number) => 1 / cosh(x);
  const coth = (x: number) => cosh(x) / sinh(x);

  const calculate = () => {
    const xNum = parseFloat(x);
    if (isNaN(xNum)) return;

    let res: number;
    let funcName: string;

    switch (functionType) {
      case 'sinh':
        res = sinh(xNum);
        funcName = 'sinh';
        break;
      case 'cosh':
        res = cosh(xNum);
        funcName = 'cosh';
        break;
      case 'tanh':
        res = tanh(xNum);
        funcName = 'tanh';
        break;
      case 'csch':
        if (xNum === 0) {
          setExpression('csch(0) is undefined');
          setResult(null);
          return;
        }
        res = csch(xNum);
        funcName = 'csch';
        break;
      case 'sech':
        res = sech(xNum);
        funcName = 'sech';
        break;
      case 'coth':
        if (xNum === 0) {
          setExpression('coth(0) is undefined');
          setResult(null);
          return;
        }
        res = coth(xNum);
        funcName = 'coth';
        break;
    }

    setResult(res);
    setExpression(`${funcName}(${xNum}) = ${res.toFixed(6)}`);
  };

  const clear = () => {
    setX('');
    setResult(null);
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">∞</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hyperbolic Functions Calculator</h1>
          <p className="text-gray-600">Calculate sinh, cosh, tanh, csch, sech, and coth functions</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {expression || ' '}
          </div>
          <div className="text-3xl font-mono text-right">
            {result !== null ? result.toFixed(6) : '0'}
          </div>
        </div>
      </div>

      {/* Function Type Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Hyperbolic Function</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setFunctionType('sinh')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              functionType === 'sinh'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            sinh(x)
          </button>
          <button
            onClick={() => setFunctionType('cosh')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              functionType === 'cosh'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            cosh(x)
          </button>
          <button
            onClick={() => setFunctionType('tanh')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              functionType === 'tanh'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            tanh(x)
          </button>
          <button
            onClick={() => setFunctionType('csch')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              functionType === 'csch'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            csch(x)
          </button>
          <button
            onClick={() => setFunctionType('sech')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              functionType === 'sech'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            sech(x)
          </button>
          <button
            onClick={() => setFunctionType('coth')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              functionType === 'coth'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            coth(x)
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Value of x
          </label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter value"
            step="any"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Hyperbolic Function Formulas */}
      <div className="mt-8 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
          <span className="text-orange-600 mr-2">📐</span>
          Hyperbolic Function Definitions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Hyperbolic Sine</div>
            <div className="text-sm text-orange-700 font-mono">sinh(x) = (e^x - e^(-x)) / 2</div>
            <div className="text-xs text-orange-600 mt-1">Odd function</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Hyperbolic Cosine</div>
            <div className="text-sm text-orange-700 font-mono">cosh(x) = (e^x + e^(-x)) / 2</div>
            <div className="text-xs text-orange-600 mt-1">Even function</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Hyperbolic Tangent</div>
            <div className="text-sm text-orange-700 font-mono">tanh(x) = sinh(x) / cosh(x)</div>
            <div className="text-xs text-orange-600 mt-1">Range: (-1, 1)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Hyperbolic Cosecant</div>
            <div className="text-sm text-orange-700 font-mono">csch(x) = 1 / sinh(x)</div>
            <div className="text-xs text-orange-600 mt-1">Undefined at x = 0</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Hyperbolic Secant</div>
            <div className="text-sm text-orange-700 font-mono">sech(x) = 1 / cosh(x)</div>
            <div className="text-xs text-orange-600 mt-1">Range: (0, 1]</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Hyperbolic Cotangent</div>
            <div className="text-sm text-orange-700 font-mono">coth(x) = cosh(x) / sinh(x)</div>
            <div className="text-xs text-orange-600 mt-1">Undefined at x = 0</div>
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
            <div className="text-sm text-green-700">• Special relativity</div>
            <div className="text-sm text-green-700">• Wave equations</div>
            <div className="text-sm text-green-700">• Catenary curves</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Engineering</div>
            <div className="text-sm text-green-700">• Cable design</div>
            <div className="text-sm text-green-700">• Heat transfer</div>
            <div className="text-sm text-green-700">• Electric transmission</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Mathematics</div>
            <div className="text-sm text-green-700">• Complex analysis</div>
            <div className="text-sm text-green-700">• Differential equations</div>
            <div className="text-sm text-green-700">• Geometry</div>
          </div>
        </div>
      </div>
    </div>
  );
}
