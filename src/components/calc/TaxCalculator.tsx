'use client';

import { useState } from 'react';

export default function TaxCalculator() {
  const [income, setIncome] = useState('');
  const [filingStatus, setFilingStatus] = useState('single');
  const [result, setResult] = useState<{tax: number; afterTax: number; rate: number} | null>(null);

  const calculate = () => {
    const grossIncome = parseFloat(income);
    if (!grossIncome) return;

    // Simplified tax calculation
    let taxRate = 0.22; // 22% average rate
    if (grossIncome <= 40000) taxRate = 0.12;
    else if (grossIncome <= 85000) taxRate = 0.22;
    else if (grossIncome <= 165000) taxRate = 0.24;
    else taxRate = 0.32;

    if (filingStatus === 'marriedJoint') {
      taxRate *= 0.9; // Married filing jointly typically pays less
    }

    const taxOwed = grossIncome * taxRate;
    const afterTaxIncome = grossIncome - taxOwed;

    setResult({
      tax: Math.round(taxOwed),
      afterTax: Math.round(afterTaxIncome),
      rate: Math.round(taxRate * 100)
    });
  };

  const clear = () => {
    setIncome('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🧾</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Calculator — Income Tax & Withholding Calculator</h1>
          <p className="text-gray-600">Estimate federal income tax based on current tax brackets</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="75000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="single">Single</option>
              <option value="marriedJoint">Married Filing Jointly</option>
              <option value="marriedSeparate">Married Filing Separately</option>
              <option value="headOfHousehold">Head of Household</option>
            </select>
          </div>

          {result && (
            <div className="space-y-4">
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Tax Calculation Results</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-900">${result.tax.toLocaleString()}</div>
                    <div className="text-green-700">Tax Owed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-900">{result.rate}%</div>
                    <div className="text-green-700">Effective Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-900">${result.afterTax.toLocaleString()}</div>
                    <div className="text-green-700">After-Tax Income</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Calculate Tax
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