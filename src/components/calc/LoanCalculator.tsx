'use client';

import { useState } from 'react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [termType, setTermType] = useState('years');
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  const [results, setResults] = useState<any>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const termInMonths = termType === 'years' ? parseFloat(loanTerm) * 12 : parseFloat(loanTerm);
    
    if (!principal || !rate || !termInMonths) return;

    // Calculate payments per year based on frequency
    const paymentsPerYear = {
      'weekly': 52,
      'bi-weekly': 26,
      'monthly': 12,
      'quarterly': 4,
      'semi-annually': 2,
      'annually': 1
    }[paymentFrequency] || 12;

    // Calculate total number of payments
    const totalPayments = (termInMonths / 12) * paymentsPerYear;
    
    // Calculate period interest rate
    const periodRate = rate / paymentsPerYear;
    
    // Calculate payment amount using loan payment formula
    const payment = principal * (periodRate * Math.pow(1 + periodRate, totalPayments)) / (Math.pow(1 + periodRate, totalPayments) - 1);
    const totalPayment = payment * totalPayments;
    const totalInterest = totalPayment - principal;

    // Generate payment schedule (show first 12 payments or all if less)
    const schedule = [];
    let balance = principal;
    const maxScheduleEntries = Math.min(totalPayments, 12);
    
    for (let period = 1; period <= maxScheduleEntries; period++) {
      const interestPayment = balance * periodRate;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        period,
        payment: payment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    setResults({
      payment,
      totalPayment,
      totalInterest,
      schedule,
      paymentFrequency,
      totalPayments,
      paymentsPerYear
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
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">💰</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Calculator — Loan Payment & Amortization Calculator</h1>
          <p className="text-gray-600">Calculate monthly payments, total interest, and amortization schedule</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="250000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate</label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="6.5"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="30"
            />
            <select
              value={termType}
              onChange={(e) => setTermType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Frequency</label>
          <select
            value={paymentFrequency}
            onChange={(e) => setPaymentFrequency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="weekly">Weekly (52/year)</option>
            <option value="bi-weekly">Bi-weekly (26/year)</option>
            <option value="monthly">Monthly (12/year)</option>
            <option value="quarterly">Quarterly (4/year)</option>
            <option value="semi-annually">Semi-annually (2/year)</option>
            <option value="annually">Annually (1/year)</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculateLoan}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Loan
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {formatCurrency(results.payment)}
                </div>
                <div className="text-sm text-green-700">
                  {results.paymentFrequency.charAt(0).toUpperCase() + results.paymentFrequency.slice(1).replace('-', ' ')} Payment
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {formatCurrency(results.totalPayment)}
                </div>
                <div className="text-sm text-blue-700">Total Payment</div>
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

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Amortization Schedule (First {Math.min(results.totalPayments, 12)} Payments)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3">Payment #</th>
                    <th className="text-right py-2 px-3">Payment</th>
                    <th className="text-right py-2 px-3">Principal</th>
                    <th className="text-right py-2 px-3">Interest</th>
                    <th className="text-right py-2 px-3">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map((payment: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-3 font-medium">{payment.period}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(payment.payment)}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(payment.principal)}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(payment.interest)}</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(payment.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}