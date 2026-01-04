'use client';

import { useState } from 'react';

export default function BakingCalculator() {
  const [amount, setAmount] = useState('');
  const [fromUnit, setFromUnit] = useState('cups');
  const [toUnit, setToUnit] = useState('grams');
  const [result, setResult] = useState<number | null>(null);

  const conversions = {
    'cups-to-grams': 120, // All-purpose flour
    'grams-to-cups': 1/120,
    'tablespoons-to-grams': 7.5,
    'grams-to-tablespoons': 1/7.5
  };

  const calculate = () => {
    const inputAmount = parseFloat(amount);
    if (!inputAmount) return;

    let convertedAmount = 0;
    if (fromUnit === 'cups' && toUnit === 'grams') {
      convertedAmount = inputAmount * conversions['cups-to-grams'];
    } else if (fromUnit === 'grams' && toUnit === 'cups') {
      convertedAmount = inputAmount * conversions['grams-to-cups'];
    } else {
      convertedAmount = inputAmount; // Same unit
    }

    setResult(Math.round(convertedAmount * 100) / 100);
  };

  const clear = () => {
    setAmount('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🧁</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Baking Calculator — Recipe Converter & Baking Measurements</h1>
          <p className="text-gray-600">Convert baking measurements and calculate baker's percentages</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="cups">Cups</option>
                <option value="grams">Grams</option>
                <option value="tablespoons">Tablespoons</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="cups">Cups</option>
                <option value="grams">Grams</option>
                <option value="tablespoons">Tablespoons</option>
              </select>
            </div>
          </div>

          {result !== null && (
            <div className="p-6 bg-pink-50 rounded-xl border border-pink-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-900 mb-1">
                  {result} {toUnit}
                </div>
                <div className="text-pink-700">Converted Amount</div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
        </div>
      </div>
    </div>
  );
}