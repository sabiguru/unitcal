'use client';

import { useState } from 'react';

export default function StoichiometryCalculator() {
  const [equation, setEquation] = useState('');
  const [reactantAmount, setReactantAmount] = useState('');
  const [selectedReactant, setSelectedReactant] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    if (!equation || !reactantAmount || !selectedReactant || !selectedProduct) return;
    
    // Simplified calculation for demonstration
    const amount = parseFloat(reactantAmount);
    if (isNaN(amount)) return;
    
    setResult(`Calculated: ${amount} mol of ${selectedReactant} produces approximately ${(amount * 1.5).toFixed(2)} mol of ${selectedProduct}`);
  };

  const clear = () => {
    setEquation('');
    setReactantAmount('');
    setSelectedReactant('');
    setSelectedProduct('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⚗️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stoichiometry Calculator</h1>
          <p className="text-gray-600">Calculate molar relationships and quantities in chemical reactions</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chemical Equation</label>
            <input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter equation (e.g., 2H2 + O2 -> 2H2O)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Known Reactant</label>
              <input
                type="text"
                value={selectedReactant}
                onChange={(e) => setSelectedReactant(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="H2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Desired Product</label>
              <input
                type="text"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="H2O"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (moles)</label>
            <input
              type="number"
              value={reactantAmount}
              onChange={(e) => setReactantAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="1.0"
              step="0.1"
            />
          </div>

          {result && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-green-800">{result}</div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      </div>
    </div>
  );
}