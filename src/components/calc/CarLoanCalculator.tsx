'use client';

import { useState } from 'react';

export default function CarLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [tradeInValue, setTradeInValue] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [salesTax, setSalesTax] = useState('');
  const [fees, setFees] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateCarLoan = () => {
    const price = parseFloat(vehiclePrice);
    const down = parseFloat(downPayment) || 0;
    const tradeIn = parseFloat(tradeInValue) || 0;
    const rate = parseFloat(interestRate) / 100;
    const term = parseFloat(loanTerm);
    const tax = parseFloat(salesTax) / 100 || 0;
    const additionalFees = parseFloat(fees) || 0;

    if (!price || !rate || !term) return;

    // Calculate taxable amount (price minus trade-in)
    const taxableAmount = Math.max(0, price - tradeIn);
    const taxAmount = taxableAmount * tax;
    
    // Total amount to finance
    const totalCost = price + taxAmount + additionalFees;
    const loanAmount = totalCost - down - tradeIn;

    if (loanAmount <= 0) {
      setResults({
        error: 'Loan amount must be positive. Adjust down payment or trade-in value.'
      });
      return;
    }

    // Calculate monthly payment
    const monthlyRate = rate / 12;
    const numPayments = term * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Calculate totals
    const totalPayments = monthlyPayment * numPayments;
    const totalInterest = totalPayments - loanAmount;
    const totalCostOfOwnership = totalCost + totalInterest - tradeIn;

    // Generate payment schedule (first 12 payments)
    const paymentSchedule = [];
    let balance = loanAmount;
    
    for (let month = 1; month <= Math.min(numPayments, 12); month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      paymentSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    // Cost breakdown
    const costBreakdown = {
      vehiclePrice: price,
      downPayment: down,
      tradeInValue: tradeIn,
      salesTax: taxAmount,
      fees: additionalFees,
      loanAmount: loanAmount,
      totalInterest: totalInterest,
      totalCost: totalCostOfOwnership
    };

    // Affordability analysis
    const monthlyIncomeNeeded = monthlyPayment / 0.15; // 15% of income rule
    const annualIncomeNeeded = monthlyIncomeNeeded * 12;

    setResults({
      monthlyPayment,
      loanAmount,
      totalPayments,
      totalInterest,
      totalCostOfOwnership,
      paymentSchedule,
      costBreakdown,
      monthlyIncomeNeeded,
      annualIncomeNeeded,
      numPayments
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
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🚗</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Loan Calculator — Auto Loan Payment Calculator</h1>
          <p className="text-gray-600">Calculate monthly payments and total costs for your auto loan</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30000"
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
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trade-in Value</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={tradeInValue}
                    onChange={(e) => setTradeInValue(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8000"
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
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="4.5"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term</label>
                <div className="relative">
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full pr-16 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">years</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sales Tax</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={salesTax}
                    onChange={(e) => setSalesTax(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8.5"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Fees</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
                <div className="text-xs text-gray-500 pt-3">
                  Registration, documentation, extended warranty, etc.
                </div>
              </div>
            </div>

            <button
              onClick={calculateCarLoan}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Calculate Car Loan
            </button>

            {results && !results.error && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-900 mb-1">
                        {formatCurrency(results.monthlyPayment)}
                      </div>
                      <div className="text-sm text-blue-700">Monthly Payment</div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-900 mb-1">
                        {formatCurrency(results.loanAmount)}
                      </div>
                      <div className="text-sm text-green-700">Loan Amount</div>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Vehicle Price:</span>
                      <span className="font-medium">{formatCurrency(results.costBreakdown.vehiclePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Down Payment:</span>
                      <span className="font-medium text-green-600">-{formatCurrency(results.costBreakdown.downPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trade-in Value:</span>
                      <span className="font-medium text-green-600">-{formatCurrency(results.costBreakdown.tradeInValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sales Tax:</span>
                      <span className="font-medium">{formatCurrency(results.costBreakdown.salesTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Additional Fees:</span>
                      <span className="font-medium">{formatCurrency(results.costBreakdown.fees)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Amount Financed:</span>
                      <span className="font-medium">{formatCurrency(results.costBreakdown.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span className="font-medium">{formatCurrency(results.costBreakdown.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-semibold">
                      <span>Total Cost:</span>
                      <span>{formatCurrency(results.costBreakdown.totalCost)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Affordability Guide</h3>
                  <div className="space-y-2 text-sm text-yellow-800">
                    <div>Recommended monthly income: <strong>{formatCurrency(results.monthlyIncomeNeeded)}</strong></div>
                    <div>Recommended annual income: <strong>{formatCurrency(results.annualIncomeNeeded)}</strong></div>
                    <div className="text-xs mt-2">Based on 15% of income rule for auto loans</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Schedule (First 12 Months)</h3>
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
                        {results.paymentSchedule.map((payment: any, index: number) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 px-3 font-medium">{payment.month}</td>
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

            {results && results.error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{results.error}</p>
              </div>
            )}
      </div>

      {/* Loan Tips */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Loan Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800"><strong>Shop around:</strong> Compare rates from multiple lenders</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800"><strong>Improve credit:</strong> Higher scores get better rates</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800"><strong>Larger down payment:</strong> Reduces loan amount and interest</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800"><strong>Shorter terms:</strong> Higher payments but less total interest</div>
          </div>
        </div>
      </div>

      {/* Typical Auto Loan Terms */}
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="text-indigo-600 mr-2">📊</span>
          Typical Auto Loan Terms
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">New Cars</span>
            <span className="text-indigo-600 text-sm">2-7 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">Used Cars</span>
            <span className="text-indigo-600 text-sm">2-5 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">Typical Rate</span>
            <span className="text-indigo-600 text-sm">3-8%</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">Down Payment</span>
            <span className="text-indigo-600 text-sm">10-20%</span>
          </div>
        </div>
      </div>

      {/* Hidden Costs */}
      <div className="mt-8 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
          <span className="text-orange-600 mr-2">⚠️</span>
          Hidden Costs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-orange-800">• Insurance premiums</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-orange-800">• Registration and license fees</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-orange-800">• Maintenance and repairs</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-orange-800">• Depreciation</div>
          </div>
        </div>
      </div>
    </div>
  );
}