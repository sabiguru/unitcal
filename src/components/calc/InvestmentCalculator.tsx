'use client';

import { useState } from 'react';

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('12');
  const [inflationRate, setInflationRate] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateInvestment = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualReturn) / 100;
    const years = parseFloat(investmentPeriod);
    const compounds = parseFloat(compoundingFrequency);
    const inflation = parseFloat(inflationRate) / 100 || 0;

    if (!rate || !years) return;

    const monthlyRate = rate / 12;
    const totalMonths = years * 12;
    
    // Future value of initial investment
    const futureValueInitial = initial * Math.pow(1 + rate / compounds, compounds * years);
    
    // Future value of monthly contributions (annuity)
    const futureValueMonthly = monthly * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    
    const totalFutureValue = futureValueInitial + futureValueMonthly;
    const totalContributions = initial + (monthly * totalMonths);
    const totalGains = totalFutureValue - totalContributions;
    
    // Inflation-adjusted value
    const inflationAdjustedValue = totalFutureValue / Math.pow(1 + inflation, years);
    
    // Calculate year-by-year breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= Math.min(years, 10); year++) {
      const yearlyInitial = initial * Math.pow(1 + rate / compounds, compounds * year);
      const yearlyMonthly = monthly * (Math.pow(1 + monthlyRate, year * 12) - 1) / monthlyRate;
      const yearlyTotal = yearlyInitial + yearlyMonthly;
      const yearlyContributions = initial + (monthly * year * 12);
      
      yearlyBreakdown.push({
        year,
        balance: yearlyTotal,
        contributions: yearlyContributions,
        gains: yearlyTotal - yearlyContributions
      });
    }

    setResults({
      totalFutureValue,
      totalContributions,
      totalGains,
      inflationAdjustedValue,
      yearlyBreakdown,
      returnOnInvestment: (totalGains / totalContributions) * 100
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">📈</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Calculator — Investment Growth & Returns Calculator</h1>
          <p className="text-gray-600">Calculate investment growth with compound interest and regular contributions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Contribution</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Return Rate</label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="8.5"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period</label>
          <div className="relative">
            <input
              type="number"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(e.target.value)}
              className="w-full pr-16 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="20"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">years</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Compounding Frequency</label>
          <select
            value={compoundingFrequency}
            onChange={(e) => setCompoundingFrequency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Inflation Rate (optional)</label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3.0"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>
      </div>

      <button
        onClick={calculateInvestment}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Investment
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {formatCurrency(results.totalFutureValue)}
                </div>
                <div className="text-sm text-green-700">Future Value</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {formatCurrency(results.totalContributions)}
                </div>
                <div className="text-sm text-blue-700">Total Contributions</div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {formatCurrency(results.totalGains)}
                </div>
                <div className="text-sm text-purple-700">Total Gains</div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-900 mb-1">
                  {results.returnOnInvestment.toFixed(1)}%
                </div>
                <div className="text-sm text-orange-700">Total ROI</div>
              </div>
            </div>
          </div>

          {results.inflationAdjustedValue && (
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Inflation-Adjusted Value</h3>
                <div className="text-3xl font-bold text-yellow-900 mb-1">
                  {formatCurrency(results.inflationAdjustedValue)}
                </div>
                <div className="text-sm text-yellow-700">
                  Purchasing power in today's dollars
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Growth by Year</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3">Year</th>
                    <th className="text-right py-2 px-3">Balance</th>
                    <th className="text-right py-2 px-3">Contributions</th>
                    <th className="text-right py-2 px-3">Gains</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyBreakdown.map((year: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-3 font-medium">{year.year}</td>
                      <td className="py-2 px-3 text-right font-medium">{formatCurrency(year.balance)}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(year.contributions)}</td>
                      <td className="py-2 px-3 text-right text-green-600">{formatCurrency(year.gains)}</td>
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