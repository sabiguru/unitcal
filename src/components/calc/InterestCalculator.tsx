'use client';

import { useState } from 'react';

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundFrequency, setCompoundFrequency] = useState('12');
  const [calculationType, setCalculationType] = useState('compound');
  const [results, setResults] = useState<any>(null);

  const calculateInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundFrequency);

    if (!P || !r || !t) return;

    let simpleInterest = P * r * t;
    let simpleAmount = P + simpleInterest;

    let compoundAmount = P * Math.pow(1 + r / n, n * t);
    let compoundInterest = compoundAmount - P;

    // Calculate year-by-year breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= Math.min(t, 10); year++) {
      const simpleYearAmount = P + (P * r * year);
      const compoundYearAmount = P * Math.pow(1 + r / n, n * year);
      const simpleYearInterest = simpleYearAmount - P;
      const compoundYearInterest = compoundYearAmount - P;
      
      yearlyBreakdown.push({
        year,
        simpleAmount: simpleYearAmount,
        compoundAmount: compoundYearAmount,
        simpleInterest: simpleYearInterest,
        compoundInterest: compoundYearInterest,
        difference: compoundYearInterest - simpleYearInterest
      });
    }

    const difference = compoundInterest - simpleInterest;
    const effectiveRate = (compoundAmount / P - 1) / t * 100;
    const doubleTime = Math.log(2) / Math.log(1 + r / n); // Rule of 72 approximation

    setResults({
      simpleInterest,
      simpleAmount,
      compoundInterest,
      compoundAmount,
      difference,
      effectiveRate,
      doubleTime,
      yearlyBreakdown
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">💰</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interest Calculator — Simple & Compound Interest Calculator</h1>
          <p className="text-gray-600">Calculate simple and compound interest on your investments and loans</p>
        </div>
      </div>

      {/* Interest Type Toggle */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setCalculationType('simple')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              calculationType === 'simple'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Simple Interest
          </button>
          <button
            onClick={() => setCalculationType('compound')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              calculationType === 'compound'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Compound Interest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Principal Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="10000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Interest Rate</label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="5.5"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
          <div className="relative">
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full pr-16 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="5"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">years</span>
          </div>
        </div>

        {calculationType === 'compound' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Compounding Frequency</label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="1">Annually</option>
              <option value="2">Semi-annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="52">Weekly</option>
              <option value="365">Daily</option>
            </select>
          </div>
        )}
      </div>

      <button
        onClick={calculateInterest}
        className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Interest
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Simple Interest</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Interest Earned</span>
                  <span className="font-bold text-blue-900">{formatCurrency(results.simpleInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Amount</span>
                  <span className="font-bold text-blue-900">{formatCurrency(results.simpleAmount)}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Compound Interest</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Interest Earned</span>
                  <span className="font-bold text-green-900">{formatCurrency(results.compoundInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total Amount</span>
                  <span className="font-bold text-green-900">{formatCurrency(results.compoundAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {formatCurrency(results.difference)}
                </div>
                <div className="text-sm text-purple-700">Compound Advantage</div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-900 mb-1">
                  {formatPercentage(results.effectiveRate)}
                </div>
                <div className="text-sm text-orange-700">Effective Annual Rate</div>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-900 mb-1">
                  {results.doubleTime.toFixed(1)}
                </div>
                <div className="text-sm text-red-700">Years to Double</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-by-Year Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3">Year</th>
                    <th className="text-right py-2 px-3">Simple Interest</th>
                    <th className="text-right py-2 px-3">Compound Interest</th>
                    <th className="text-right py-2 px-3">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyBreakdown.map((year: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-3 font-medium">{year.year}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(year.simpleAmount)}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(year.compoundAmount)}</td>
                      <td className="py-2 px-3 text-right text-green-600">{formatCurrency(year.difference)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}