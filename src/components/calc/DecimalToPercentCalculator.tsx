'use client';

import { useState } from 'react';

export default function DecimalToPercentCalculator() {
  const [decimal, setDecimal] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationType, setCalculationType] = useState<'toPercent' | 'toDecimal'>('toPercent');

  const calculate = () => {
    const value = parseFloat(decimal);
    if (isNaN(value)) return;

    if (calculationType === 'toPercent') {
      setResult(value * 100);
    } else {
      setResult(value / 100);
    }
  };

  const clear = () => {
    setDecimal('');
    setResult(null);
  };

  const commonDecimals = [
    { val: 0.25, label: '0.25' },
    { val: 0.5, label: '0.5' },
    { val: 0.75, label: '0.75' },
    { val: 1.0, label: '1.0' },
    { val: 1.5, label: '1.5' },
    { val: 2.0, label: '2.0' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">.%</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Decimal to Percent Converter — Convert Decimals & Percentages</h1>
          <p className="text-gray-600">Convert between decimal and percentage formats</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        {/* Display */}
        <div className="mb-6">
          <div className="bg-gray-900 rounded-xl p-4 text-white">
            <div className="text-sm text-gray-400 mb-2 h-6">
              {result !== null ? `${decimal} ${calculationType === 'toPercent' ? '→' : '←'} ${result}${calculationType === 'toPercent' ? '%' : ''}` : ' '}
            </div>
            <div className="text-3xl font-mono text-right">
              {result !== null ? `${result.toFixed(6)}${calculationType === 'toPercent' ? '%' : ''}` : '0'}
            </div>
          </div>
        </div>

        {/* Conversion Type Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Conversion Type</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setCalculationType('toPercent')}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                calculationType === 'toPercent'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Decimal → Percent
            </button>
            <button
              onClick={() => setCalculationType('toDecimal')}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                calculationType === 'toDecimal'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Percent → Decimal
            </button>
          </div>
        </div>

        {/* Quick Select */}
        {calculationType === 'toPercent' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Select
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {commonDecimals.map((dec) => (
                <button
                  key={dec.label}
                  onClick={() => setDecimal(dec.val.toString())}
                  className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  {dec.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {calculationType === 'toPercent' ? 'Decimal Value' : 'Percentage Value'}
          </label>
          <input
            type="number"
            step="any"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={calculationType === 'toPercent' ? 'e.g., 0.75' : 'e.g., 75'}
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Convert
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Results Details */}
        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Conversion Details</h3>
            <div className="space-y-1 text-sm text-blue-800">
              {calculationType === 'toPercent' ? (
                <>
                  <div>Decimal: {decimal}</div>
                  <div>Percentage: {result.toFixed(2)}%</div>
                  <div className="text-xs text-blue-600 mt-2">
                    Calculation: {decimal} × 100 = {result.toFixed(2)}%
                  </div>
                </>
              ) : (
                <>
                  <div>Percentage: {decimal}%</div>
                  <div>Decimal: {result.toFixed(6)}</div>
                  <div className="text-xs text-blue-600 mt-2">
                    Calculation: {decimal} ÷ 100 = {result.toFixed(6)}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Formula Information */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📐</span>
          Conversion Formulas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Decimal to Percent</div>
            <div className="text-sm text-blue-700 font-mono">Percent = Decimal × 100</div>
            <div className="text-xs text-blue-600 mt-2">Example: 0.75 × 100 = 75%</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Percent to Decimal</div>
            <div className="text-sm text-blue-700 font-mono">Decimal = Percent ÷ 100</div>
            <div className="text-xs text-blue-600 mt-2">Example: 75 ÷ 100 = 0.75</div>
          </div>
        </div>
      </div>

      {/* Common Conversions Reference */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">📊</span>
          Common Decimal-Percent Conversions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">0.01 = 1%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">0.1 = 10%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">0.25 = 25%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">0.5 = 50%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">0.75 = 75%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">1.0 = 100%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">1.5 = 150%</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="text-sm font-semibold text-green-900">2.0 = 200%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
