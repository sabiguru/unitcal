'use client';

import { useState } from 'react';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundFrequency, setCompoundFrequency] = useState('12');
  const [additionalContribution, setAdditionalContribution] = useState('');
  const [contributionFrequency, setContributionFrequency] = useState('12');
  const [results, setResults] = useState<any>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundFrequency);
    const PMT = parseFloat(additionalContribution) || 0;
    const pmt_n = parseFloat(contributionFrequency);

    if (!P || !r || !t) return;

    // Basic compound interest (principal only)
    const basicAmount = P * Math.pow(1 + r / n, n * t);
    const basicInterest = basicAmount - P;

    // With additional contributions
    let totalAmount = basicAmount;
    let totalContributions = P;
    
    if (PMT > 0) {
      // Future value of annuity formula
      const annuityFV = PMT * (Math.pow(1 + r / pmt_n, pmt_n * t) - 1) / (r / pmt_n);
      totalAmount = basicAmount + annuityFV;
      totalContributions = P + (PMT * pmt_n * t);
    }

    const totalInterest = totalAmount - totalContributions;

    // Year-by-year breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= Math.min(t, 10); year++) {
      const yearAmount = P * Math.pow(1 + r / n, n * year);
      let yearWithContributions = yearAmount;
      let yearTotalContributions = P;
      
      if (PMT > 0) {
        const yearAnnuity = PMT * (Math.pow(1 + r / pmt_n, pmt_n * year) - 1) / (r / pmt_n);
        yearWithContributions = yearAmount + yearAnnuity;
        yearTotalContributions = P + (PMT * pmt_n * year);
      }
      
      yearlyBreakdown.push({
        year,
        amount: yearWithContributions,
        contributions: yearTotalContributions,
        interest: yearWithContributions - yearTotalContributions
      });
    }

    const effectiveRate = Math.pow(1 + r / n, n) - 1;
    const doubleTime = Math.log(2) / (n * Math.log(1 + r / n));

    setResults({
      basicAmount,
      basicInterest,
      totalAmount,
      totalContributions,
      totalInterest,
      effectiveRate: effectiveRate * 100,
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

  const getFrequencyLabel = (freq: string) => {
    const labels: { [key: string]: string } = {
      '1': 'Annually',
      '2': 'Semi-annually', 
      '4': 'Quarterly',
      '12': 'Monthly',
      '52': 'Weekly',
      '365': 'Daily'
    };
    return labels[freq] || 'Monthly';
  };

  return (
    <div className="mb-8 calculator-container">
      <div className="flex items-center mb-6 calculator-header">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
          <span className="text-white text-lg sm:text-2xl">📈</span>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Compound Interest Calculator — Investment Growth Calculator</h1>
          <p className="text-sm sm:text-base text-gray-600">Calculate compound interest with optional regular contributions</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-8 calculator-form">
      
      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Initial Principal</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full pl-8 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
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
              className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="7"
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
              className="w-full pr-16 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">years</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Compound Frequency</label>
          <select
            value={compoundFrequency}
            onChange={(e) => setCompoundFrequency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="52">Weekly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Contribution (Optional)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={additionalContribution}
              onChange={(e) => setAdditionalContribution(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contribution Frequency</label>
          <select
            value={contributionFrequency}
            onChange={(e) => setContributionFrequency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="52">Weekly</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculateCompoundInterest}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Compound Interest
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {formatCurrency(results.totalAmount)}
                </div>
                <div className="text-sm text-green-700">Final Amount</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {formatCurrency(results.totalInterest)}
                </div>
                <div className="text-sm text-blue-700">Total Interest</div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {results.effectiveRate.toFixed(2)}%
                </div>
                <div className="text-sm text-purple-700">Effective Rate</div>
              </div>
            </div>
          </div>

          {results.yearlyBreakdown.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Over Time</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3">Year</th>
                      <th className="text-right py-2 px-3">Total Amount</th>
                      <th className="text-right py-2 px-3">Contributions</th>
                      <th className="text-right py-2 px-3">Interest Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyBreakdown.map((year: any, index: number) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-3 font-medium">{year.year}</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(year.amount)}</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(year.contributions)}</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(year.interest)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}