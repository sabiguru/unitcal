'use client';

import { useState } from 'react';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [employerMatch, setEmployerMatch] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [desiredIncome, setDesiredIncome] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateRetirement = () => {
    const age = parseFloat(currentAge);
    const retAge = parseFloat(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const match = parseFloat(employerMatch) || 0;
    const returnRate = parseFloat(expectedReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const income = parseFloat(desiredIncome);

    if (!age || !retAge || !returnRate || retAge <= age) return;

    const yearsToRetirement = retAge - age;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyReturn = returnRate / 12;
    const totalMonthlyContribution = monthly + match;

    // Future value of current savings
    const currentSavingsFV = savings * Math.pow(1 + returnRate, yearsToRetirement);

    // Future value of monthly contributions
    const monthlyContributionsFV = totalMonthlyContribution * 
      (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn;

    const totalRetirementSavings = currentSavingsFV + monthlyContributionsFV;

    // Calculate required savings for desired income
    const requiredSavings = income ? (income * 12) / (returnRate * 0.04) : 0; // 4% rule

    // Inflation-adjusted values
    const inflationAdjustedSavings = totalRetirementSavings / Math.pow(1 + inflation, yearsToRetirement);
    const inflationAdjustedIncome = income / Math.pow(1 + inflation, yearsToRetirement);

    // Monthly income from retirement savings (4% rule)
    const monthlyRetirementIncome = (totalRetirementSavings * 0.04) / 12;
    const inflationAdjustedMonthlyIncome = (inflationAdjustedSavings * 0.04) / 12;

    // Calculate shortfall/surplus
    const shortfall = income ? Math.max(0, requiredSavings - totalRetirementSavings) : 0;
    const surplus = income ? Math.max(0, totalRetirementSavings - requiredSavings) : 0;

    // Calculate additional monthly savings needed
    const additionalMonthlyNeeded = shortfall > 0 ? 
      (shortfall * monthlyReturn) / (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) : 0;

    // Milestone analysis
    const milestones = [];
    for (let year = 5; year <= yearsToRetirement; year += 5) {
      const yearlyMonths = year * 12;
      const currentSavingsAtYear = savings * Math.pow(1 + returnRate, year);
      const contributionsAtYear = totalMonthlyContribution * 
        (Math.pow(1 + monthlyReturn, yearlyMonths) - 1) / monthlyReturn;
      const totalAtYear = currentSavingsAtYear + contributionsAtYear;
      
      milestones.push({
        year: age + year,
        savings: totalAtYear,
        monthlyIncome: (totalAtYear * 0.04) / 12
      });
    }

    setResults({
      yearsToRetirement,
      totalRetirementSavings,
      currentSavingsFV,
      monthlyContributionsFV,
      requiredSavings,
      inflationAdjustedSavings,
      monthlyRetirementIncome,
      inflationAdjustedMonthlyIncome,
      shortfall,
      surplus,
      additionalMonthlyNeeded,
      milestones,
      totalContributions: totalMonthlyContribution * monthsToRetirement + savings
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatLargeCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return formatCurrency(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🏖️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Retirement Calculator</h1>
          <p className="text-gray-600">Plan your retirement savings and estimate future income needs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Retirement Age</label>
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="65"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Savings</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="25000"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Employer Match (Monthly)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={employerMatch}
              onChange={(e) => setEmployerMatch(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="250"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return</label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="7"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Inflation Rate</label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Desired Monthly Income</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={desiredIncome}
              onChange={(e) => setDesiredIncome(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5000"
            />
          </div>
        </div>
      </div>

      <button
        onClick={calculateRetirement}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Retirement Plan
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-900 mb-1">
                  {formatLargeCurrency(results.totalRetirementSavings)}
                </div>
                <div className="text-sm text-blue-700">Total Retirement Savings</div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-xl font-bold text-green-900 mb-1">
                  {formatCurrency(results.monthlyRetirementIncome)}
                </div>
                <div className="text-sm text-green-700">Monthly Income (4% Rule)</div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-900 mb-1">
                  {results.yearsToRetirement}
                </div>
                <div className="text-sm text-purple-700">Years to Retirement</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 border ${
              results.shortfall > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            }`}>
              <div className="text-center">
                <div className={`text-xl font-bold mb-1 ${
                  results.shortfall > 0 ? 'text-red-900' : 'text-green-900'
                }`}>
                  {results.shortfall > 0 ? 'Shortfall' : 'On Track'}
                </div>
                <div className={`text-sm ${
                  results.shortfall > 0 ? 'text-red-700' : 'text-green-700'
                }`}>
                  {results.shortfall > 0 ? formatLargeCurrency(results.shortfall) : 'Goal Met'}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Retirement Projection</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Savings Growth</span>
                  <span className="font-medium">{formatLargeCurrency(results.currentSavingsFV)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Future Contributions</span>
                  <span className="font-medium">{formatLargeCurrency(results.monthlyContributionsFV)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total at Retirement</span>
                  <span className="font-medium">{formatLargeCurrency(results.totalRetirementSavings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Inflation-Adjusted Value</span>
                  <span className="font-medium">{formatLargeCurrency(results.inflationAdjustedSavings)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Income (Today's $)</span>
                  <span className="font-medium">{formatCurrency(results.monthlyRetirementIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Inflation-Adjusted Income</span>
                  <span className="font-medium">{formatCurrency(results.inflationAdjustedMonthlyIncome)}</span>
                </div>
                {results.additionalMonthlyNeeded > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Additional Monthly Needed</span>
                    <span className="font-medium text-red-600">{formatCurrency(results.additionalMonthlyNeeded)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Retirement Milestones</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3">Age</th>
                    <th className="text-right py-2 px-3">Projected Savings</th>
                    <th className="text-right py-2 px-3">Monthly Income</th>
                  </tr>
                </thead>
                <tbody>
                  {results.milestones.map((milestone: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-3 font-medium">{milestone.year}</td>
                      <td className="py-2 px-3 text-right">{formatLargeCurrency(milestone.savings)}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(milestone.monthlyIncome)}</td>
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