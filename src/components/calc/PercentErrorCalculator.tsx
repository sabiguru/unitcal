'use client';

import { useState } from 'react';

export default function PercentErrorCalculator() {
  const [experimentalValue, setExperimentalValue] = useState<string>('');
  const [actualValue, setActualValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculate = () => {
    const experimental = parseFloat(experimentalValue);
    const actual = parseFloat(actualValue);
    if (isNaN(experimental) || isNaN(actual) || actual === 0) return;

    // Percent Error = |Experimental - Actual| / |Actual| × 100
    const error = (Math.abs(experimental - actual) / Math.abs(actual)) * 100;
    setResult(error);
    setExpression(`Percent error between ${experimental} and ${actual} = ${error.toFixed(2)}%`);
  };

  const clear = () => {
    setExperimentalValue('');
    setActualValue('');
    setResult(null);
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">%E</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Percent Error Calculator — Scientific Accuracy Calculator</h1>
          <p className="text-gray-600">Calculate the percent error between experimental and actual values</p>
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
            {result !== null ? `${result.toFixed(2)}%` : '0%'}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experimental Value
          </label>
          <input
            type="number"
            value={experimentalValue}
            onChange={(e) => setExperimentalValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter experimental/measured value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Actual Value (Theoretical)
          </label>
          <input
            type="number"
            value={actualValue}
            onChange={(e) => setActualValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter actual/theoretical value"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Percent Error Formula */}
      <div className="mt-8 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <span className="text-red-600 mr-2">📐</span>
          Percent Error Formula
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Standard Formula</div>
            <div className="text-sm text-red-700 font-mono">Percent Error = |Experimental - Actual| / |Actual| × 100</div>
            <div className="text-xs text-red-600 mt-1">Absolute value ensures error is always positive</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-900 mb-2">Components</div>
            <div className="text-sm text-red-700">• Experimental Value: Your measured/observed result</div>
            <div className="text-sm text-red-700">• Actual Value: The accepted/theoretical value</div>
            <div className="text-xs text-red-600 mt-1">Lower percent error indicates higher accuracy</div>
          </div>
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💼</span>
          Common Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Science Labs</div>
            <div className="text-sm text-blue-700">• Chemistry experiments</div>
            <div className="text-sm text-blue-700">• Physics measurements</div>
            <div className="text-sm text-blue-700">• Biology assays</div>
            <div className="text-sm text-blue-700">• Calibration testing</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Engineering</div>
            <div className="text-sm text-blue-700">• Quality control</div>
            <div className="text-sm text-blue-700">• Tolerance testing</div>
            <div className="text-sm text-blue-700">• Prototype evaluation</div>
            <div className="text-sm text-blue-700">• Instrument accuracy</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Education</div>
            <div className="text-sm text-blue-700">• Student lab reports</div>
            <div className="text-sm text-blue-700">• Science fair projects</div>
            <div className="text-sm text-blue-700">• Research papers</div>
            <div className="text-sm text-blue-700">• Data validation</div>
          </div>
        </div>
      </div>

      {/* Accuracy Guidelines */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💡</span>
          Accuracy Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 0-5%: Excellent accuracy</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 5-10%: Good accuracy</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 10-20%: Fair accuracy</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 20%+: Poor accuracy</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Always use absolute values</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Report with appropriate sig figs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
