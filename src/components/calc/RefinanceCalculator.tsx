'use client';

import { useState } from 'react';

export default function RefinanceCalculator() {
  const [currentLoanBalance, setCurrentLoanBalance] = useState('');
  const [currentInterestRate, setCurrentInterestRate] = useState('');
  const [currentMonthsRemaining, setCurrentMonthsRemaining] = useState('');
  const [newInterestRate, setNewInterestRate] = useState('');
  const [newLoanTerm, setNewLoanTerm] = useState('');
  const [closingCosts, setClosingCosts] = useState('');
  const [cashOut, setCashOut] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateRefinance = () => {
    const balance = parseFloat(currentLoanBalance);
    const currentRate = parseFloat(currentInterestRate) / 100;
    const monthsLeft = parseFloat(currentMonthsRemaining);
    const newRate = parseFloat(newInterestRate) / 100;
    const newTerm = parseFloat(newLoanTerm);
    const costs = parseFloat(closingCosts) || 0;
    const cashOutAmount = parseFloat(cashOut) || 0;

    if (!balance || !currentRate || !monthsLeft || !newRate || !newTerm) return;

    // Current loan calculations
    const currentMonthlyRate = currentRate / 12;
    const currentPayment = balance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, monthsLeft)) / (Math.pow(1 + currentMonthlyRate, monthsLeft) - 1);
    const currentTotalPayments = currentPayment * monthsLeft;
    const currentTotalInterest = currentTotalPayments - balance;

    // New loan calculations
    const newLoanAmount = balance + costs + cashOutAmount;
    const newMonthlyRate = newRate / 12;
    const newTermMonths = newTerm * 12;
    const newPayment = newLoanAmount * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newTermMonths)) / (Math.pow(1 + newMonthlyRate, newTermMonths) - 1);
    const newTotalPayments = newPayment * newTermMonths;
    const newTotalInterest = newTotalPayments - newLoanAmount;

    // Comparisons
    const monthlySavings = currentPayment - newPayment;
    const totalInterestSavings = currentTotalInterest - newTotalInterest;
    const breakEvenMonths = costs / Math.abs(monthlySavings);

    // Generate amortization comparison (first 12 months)
    const comparisonSchedule = [];
    let currentBalance = balance;
    let newBalance = newLoanAmount;

    for (let month = 1; month <= 12; month++) {
      // Current loan
      const currentInterestPayment = currentBalance * currentMonthlyRate;
      const currentPrincipalPayment = currentPayment - currentInterestPayment;
      currentBalance -= currentPrincipalPayment;

      // New loan
      const newInterestPayment = newBalance * newMonthlyRate;
      const newPrincipalPayment = newPayment - newInterestPayment;
      newBalance -= newPrincipalPayment;

      comparisonSchedule.push({
        month,
        currentPayment,
        newPayment,
        currentBalance: Math.max(0, currentBalance),
        newBalance: Math.max(0, newBalance),
        monthlySavings: currentPayment - newPayment
      });
    }

    setResults({
      currentPayment,
      newPayment,
      monthlySavings,
      currentTotalInterest,
      newTotalInterest,
      totalInterestSavings,
      breakEvenMonths,
      newLoanAmount,
      comparisonSchedule
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
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🏡</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mortgage Refinance Calculator — Refi Savings Calculator</h1>
          <p className="text-gray-600">Compare your current mortgage with a new refinanced loan</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Current Loan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Remaining Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={currentLoanBalance}
                  onChange={(e) => setCurrentLoanBalance(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="250000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Interest Rate</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={currentInterestRate}
                  onChange={(e) => setCurrentInterestRate(e.target.value)}
                  className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="6.5"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Months Remaining</label>
              <input
                type="number"
                value={currentMonthsRemaining}
                onChange={(e) => setCurrentMonthsRemaining(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="240"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">New Loan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Interest Rate</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={newInterestRate}
                  onChange={(e) => setNewInterestRate(e.target.value)}
                  className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5.5"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Loan Term</label>
              <div className="relative">
                <input
                  type="number"
                  value={newLoanTerm}
                  onChange={(e) => setNewLoanTerm(e.target.value)}
                  className="w-full pr-16 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">years</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Closing Costs</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cash Out (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={cashOut}
                  onChange={(e) => setCashOut(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={calculateRefinance}
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Refinance Savings
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {formatCurrency(Math.abs(results.monthlySavings))}
                </div>
                <div className="text-sm text-green-700">
                  Monthly {results.monthlySavings >= 0 ? 'Savings' : 'Increase'}
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {formatCurrency(Math.abs(results.totalInterestSavings))}
                </div>
                <div className="text-sm text-blue-700">
                  Interest {results.totalInterestSavings >= 0 ? 'Savings' : 'Increase'}
                </div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {Math.round(results.breakEvenMonths)}
                </div>
                <div className="text-sm text-purple-700">Break-even (months)</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Comparison (First 12 Months)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3">Month</th>
                    <th className="text-right py-2 px-3">Current Payment</th>
                    <th className="text-right py-2 px-3">New Payment</th>
                    <th className="text-right py-2 px-3">Monthly Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {results.comparisonSchedule.map((month: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-3 font-medium">{month.month}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(month.currentPayment)}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(month.newPayment)}</td>
                      <td className={`py-2 px-3 text-right ${month.monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(Math.abs(month.monthlySavings))}
                      </td>
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