'use client';

import { useState } from 'react';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('30');
  const [pmi, setPmi] = useState('');
  const [propertyTax, setPropertyTax] = useState('');
  const [homeInsurance, setHomeInsurance] = useState('');
  const [hoaFees, setHoaFees] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) / 100;
    const term = parseFloat(loanTerm);
    const pmiAmount = parseFloat(pmi) || 0;
    const tax = parseFloat(propertyTax) || 0;
    const insurance = parseFloat(homeInsurance) || 0;
    const hoa = parseFloat(hoaFees) || 0;

    if (!price || !rate || !term) return;

    const loanAmount = price - down;
    const monthlyRate = rate / 12;
    const termInMonths = term * 12;

    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) / (Math.pow(1 + monthlyRate, termInMonths) - 1);
    
    const monthlyTax = tax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyPmi = pmiAmount / 12;
    const monthlyHoa = hoa / 12;

    const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance + monthlyPmi + monthlyHoa;
    const totalInterest = (monthlyPayment * termInMonths) - loanAmount;
    const totalPayment = loanAmount + totalInterest;

    const downPaymentPercent = (down / price) * 100;

    setResults({
      loanAmount,
      monthlyPayment,
      totalMonthlyPayment,
      totalInterest,
      totalPayment,
      downPaymentPercent,
      monthlyTax,
      monthlyInsurance,
      monthlyPmi,
      monthlyHoa
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
          <span className="text-white text-2xl">🏠</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mortgage Calculator — Home Loan Payment Calculator</h1>
          <p className="text-gray-600">Calculate home loan payments including PMI and property taxes</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Home Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="400000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="80000"
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
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="15">15 Years</option>
            <option value="30">30 Years</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PMI (Annual)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={pmi}
              onChange={(e) => setPmi(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="2400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Tax (Annual)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="6000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Home Insurance (Annual)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={homeInsurance}
              onChange={(e) => setHomeInsurance(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="1200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">HOA Fees (Annual)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={hoaFees}
              onChange={(e) => setHoaFees(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="1800"
            />
          </div>
        </div>
      </div>

      <button
        onClick={calculateMortgage}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Mortgage
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Monthly Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Principal & Interest</span>
                  <span className="font-medium text-green-900">{formatCurrency(results.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Property Tax</span>
                  <span className="font-medium text-green-900">{formatCurrency(results.monthlyTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Home Insurance</span>
                  <span className="font-medium text-green-900">{formatCurrency(results.monthlyInsurance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">PMI</span>
                  <span className="font-medium text-green-900">{formatCurrency(results.monthlyPmi)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">HOA Fees</span>
                  <span className="font-medium text-green-900">{formatCurrency(results.monthlyHoa)}</span>
                </div>
                <div className="border-t border-green-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-green-700 font-medium">Total Monthly Payment</span>
                    <span className="font-bold text-green-900 text-lg">{formatCurrency(results.totalMonthlyPayment)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Loan Amount</span>
                  <span className="font-medium text-blue-900">{formatCurrency(results.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Down Payment</span>
                  <span className="font-medium text-blue-900">{results.downPaymentPercent.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Interest</span>
                  <span className="font-medium text-blue-900">{formatCurrency(results.totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Payment</span>
                  <span className="font-medium text-blue-900">{formatCurrency(results.totalPayment)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}