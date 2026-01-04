'use client';

import { useState } from 'react';

export default function DepreciationCalculator() {
  const [assetValue, setAssetValue] = useState('');
  const [salvageValue, setSalvageValue] = useState('');
  const [usefulLife, setUsefulLife] = useState('');
  const [depreciationMethod, setDepreciationMethod] = useState('straight-line');
  const [currentYear, setCurrentYear] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateDepreciation = () => {
    const cost = parseFloat(assetValue);
    const salvage = parseFloat(salvageValue) || 0;
    const life = parseFloat(usefulLife);
    const year = parseFloat(currentYear) || 1;

    if (!cost || !life || year > life) return;

    const depreciableAmount = cost - salvage;
    let annualDepreciation = 0;
    let accumulatedDepreciation = 0;
    let bookValue = cost;
    let yearlySchedule = [];

    switch (depreciationMethod) {
      case 'straight-line':
        annualDepreciation = depreciableAmount / life;
        accumulatedDepreciation = annualDepreciation * year;
        bookValue = cost - accumulatedDepreciation;

        for (let i = 1; i <= life; i++) {
          const yearDepreciation = annualDepreciation;
          const yearAccumulated = annualDepreciation * i;
          const yearBookValue = cost - yearAccumulated;
          
          yearlySchedule.push({
            year: i,
            depreciation: yearDepreciation,
            accumulated: yearAccumulated,
            bookValue: Math.max(yearBookValue, salvage)
          });
        }
        break;
    }

    const annualDepreciationRate = (annualDepreciation / cost) * 100;
    const totalDepreciationRate = (accumulatedDepreciation / cost) * 100;
    const taxSavings = annualDepreciation * 0.25;
    const netCost = cost - (accumulatedDepreciation * 0.25);

    setResults({
      method: depreciationMethod,
      originalCost: cost,
      salvageValue: salvage,
      depreciableAmount,
      usefulLife: life,
      currentYear: year,
      annualDepreciation,
      accumulatedDepreciation,
      bookValue,
      annualDepreciationRate,
      totalDepreciationRate,
      taxSavings,
      netCost,
      yearlySchedule: yearlySchedule.slice(0, 10)
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">📉</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Depreciation Calculator — Asset Value Decline Calculator</h1>
          <p className="text-gray-600">Calculate asset depreciation using different methods for tax and accounting</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asset Cost</label>
              <input
                type="number"
                value={assetValue}
                onChange={(e) => setAssetValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salvage Value</label>
              <input
                type="number"
                value={salvageValue}
                onChange={(e) => setSalvageValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Useful Life (years)</label>
              <input
                type="number"
                value={usefulLife}
                onChange={(e) => setUsefulLife(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Year</label>
              <input
                type="number"
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Method</label>
            <select
              value={depreciationMethod}
              onChange={(e) => setDepreciationMethod(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="straight-line">Straight-Line</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateDepreciation}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Calculate
        </button>

        {results && (
          <div className="mt-6 space-y-4">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatCurrency(results.annualDepreciation)}
                </div>
                <div className="text-lg text-gray-600">Annual Depreciation</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {formatCurrency(results.accumulatedDepreciation)}
                  </div>
                  <div className="text-sm text-gray-600">Total Depreciation</div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {formatCurrency(results.bookValue)}
                  </div>
                  <div className="text-sm text-gray-600">Current Book Value</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Depreciation Methods */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📊</span>
          Depreciation Methods
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Straight-Line</div>
            <div className="text-sm text-blue-700">Equal annual depreciation</div>
            <div className="text-xs text-blue-600 mt-1">Most common method</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Declining Balance</div>
            <div className="text-sm text-blue-700">Higher initial depreciation</div>
            <div className="text-xs text-blue-600 mt-1">Accelerated method</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Units of Production</div>
            <div className="text-sm text-blue-700">Based on actual usage</div>
            <div className="text-xs text-blue-600 mt-1">For equipment/machinery</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Sum of Years</div>
            <div className="text-sm text-blue-700">Accelerated depreciation</div>
            <div className="text-xs text-blue-600 mt-1">Complex calculation</div>
          </div>
        </div>
      </div>

      {/* Asset Categories */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">🏢</span>
          Common Asset Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Office Equipment</div>
            <div className="text-sm text-green-700">5-7 years</div>
            <div className="text-xs text-green-600 mt-1">Computers, furniture</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Vehicles</div>
            <div className="text-sm text-green-700">5 years</div>
            <div className="text-xs text-green-600 mt-1">Cars, trucks</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Machinery</div>
            <div className="text-sm text-green-700">7-10 years</div>
            <div className="text-xs text-green-600 mt-1">Manufacturing equipment</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Buildings</div>
            <div className="text-sm text-green-700">27.5-39 years</div>
            <div className="text-xs text-green-600 mt-1">Commercial/residential</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Software</div>
            <div className="text-sm text-green-700">3 years</div>
            <div className="text-xs text-green-600 mt-1">Technology assets</div>
          </div>
        </div>
      </div>

      {/* Tax Benefits */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💰</span>
          Tax Benefits & Considerations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• Depreciation reduces taxable income</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• Section 179 allows immediate expensing</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• Bonus depreciation for qualifying assets</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• Consult tax professional for specifics</div>
          </div>
        </div>
      </div>
    </div>
  );
}