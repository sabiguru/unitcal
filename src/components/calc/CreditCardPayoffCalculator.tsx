'use client';

import { useState } from 'react';

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [payoffStrategy, setPayoffStrategy] = useState('fixed');
  const [payoffTime, setPayoffTime] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculatePayoff = () => {
    const currentBalance = parseFloat(balance);
    const rate = parseFloat(interestRate) / 100;
    const payment = parseFloat(monthlyPayment);
    const time = parseFloat(payoffTime);

    if (!currentBalance || !rate) return;

    const monthlyRate = rate / 12;
    // Minimum payment: higher of $25 or 2% of balance, but typically includes interest + 1% principal
    const minimumPayment = Math.max(25, Math.max(currentBalance * 0.02, currentBalance * monthlyRate + currentBalance * 0.01));

    let payoffResults: any = {};

    if (payoffStrategy === 'fixed' && payment) {
      // Calculate payoff time with fixed payment
      if (payment <= currentBalance * monthlyRate) {
        payoffResults = {
          error: 'Payment too low - only covers interest',
          minimumRequired: currentBalance * monthlyRate + 1
        };
      } else {
        const months = Math.ceil(
          -Math.log(1 - (currentBalance * monthlyRate) / payment) / 
          Math.log(1 + monthlyRate)
        );
        const totalPaid = payment * months;
        const totalInterest = totalPaid - currentBalance;

        payoffResults = {
          months,
          years: months / 12,
          totalPaid,
          totalInterest,
          monthlySavings: payment - minimumPayment
        };
      }
    } else if (payoffStrategy === 'time' && time) {
      // Calculate required payment for specific time
      const months = time * 12;
      const requiredPayment = (currentBalance * monthlyRate) / 
        (1 - Math.pow(1 + monthlyRate, -months));
      const totalPaid = requiredPayment * months;
      const totalInterest = totalPaid - currentBalance;

      payoffResults = {
        months,
        years: time,
        requiredPayment,
        totalPaid,
        totalInterest
      };
    }

    // Calculate minimum payment scenario - this shows how long it takes with ONLY minimum payments
    const minimumPayoffTime = Math.ceil(
      -Math.log(1 - (currentBalance * monthlyRate) / minimumPayment) / 
      Math.log(1 + monthlyRate)
    );
    const minimumTotalPaid = minimumPayment * minimumPayoffTime;
    const minimumTotalInterest = minimumTotalPaid - currentBalance;

    payoffResults.minimumScenario = {
      months: minimumPayoffTime,
      years: minimumPayoffTime / 12,
      totalPaid: minimumTotalPaid,
      totalInterest: minimumTotalInterest
    };

    // Calculate avalanche vs snowball if multiple cards
    const interestSavings = payoffResults.totalInterest ? 
      minimumTotalInterest - payoffResults.totalInterest : 0;

    payoffResults.savings = {
      interestSaved: interestSavings,
      timeSaved: minimumPayoffTime - (payoffResults.months || 0)
    };

    setResults(payoffResults);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatTime = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">💳</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Card Payoff Calculator — Debt Payoff & Interest Calculator</h1>
          <p className="text-gray-600">Calculate payoff time and interest savings strategies</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="5000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Interest Rate (APR)</label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="18.99"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Payoff Strategy</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPayoffStrategy('fixed')}
              className={`p-3 rounded-lg border-2 transition-all ${
                payoffStrategy === 'fixed'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Fixed Monthly Payment
            </button>
            <button
              onClick={() => setPayoffStrategy('time')}
              className={`p-3 rounded-lg border-2 transition-all ${
                payoffStrategy === 'time'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Target Payoff Time
            </button>
          </div>
        </div>

        {payoffStrategy === 'fixed' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Payment</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="200"
              />
            </div>
          </div>
        )}

        {payoffStrategy === 'time' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payoff Time (Years)</label>
            <input
              type="number"
              step="0.5"
              value={payoffTime}
              onChange={(e) => setPayoffTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="2"
            />
          </div>
        )}
      </div>

      <button
        onClick={calculatePayoff}
        className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-4 px-6 rounded-lg font-medium hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Payoff
      </button>

      {results && !results.error && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {formatTime(results.months)}
                </div>
                <div className="text-sm text-green-700">Payoff Time</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {formatCurrency(results.totalPaid)}
                </div>
                <div className="text-sm text-blue-700">Total Paid</div>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-900 mb-1">
                  {formatCurrency(results.totalInterest)}
                </div>
                <div className="text-sm text-red-700">Total Interest</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Payoff Plan</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Payment</span>
                  <span className="font-medium">{formatCurrency(results.requiredPayment || parseFloat(monthlyPayment))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payoff Time</span>
                  <span className="font-medium">{formatTime(results.months)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-medium">{formatCurrency(results.totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid</span>
                  <span className="font-medium">{formatCurrency(results.totalPaid)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Minimum Payment Scenario</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payoff Time</span>
                  <span className="font-medium">{formatTime(results.minimumScenario.months)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-medium">{formatCurrency(results.minimumScenario.totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid</span>
                  <span className="font-medium">{formatCurrency(results.minimumScenario.totalPaid)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Savings Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {formatCurrency(results.savings.interestSaved)}
                </div>
                <div className="text-sm text-green-700">Interest Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {formatTime(results.savings.timeSaved)}
                </div>
                <div className="text-sm text-green-700">Time Saved</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {results && results.error && (
        <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="text-center">
            <div className="text-red-900 font-semibold mb-2">Payment Too Low</div>
            <div className="text-sm text-red-700">
              Your payment only covers interest. Minimum required: {formatCurrency(results.minimumRequired)}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}