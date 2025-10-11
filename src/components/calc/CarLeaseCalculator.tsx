'use client';

import { useState } from 'react';

export default function CarLeaseCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [residualValue, setResidualValue] = useState('');
  const [leaseTerm, setLeaseTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [salesTax, setSalesTax] = useState('');
  const [tradeinValue, setTradeinValue] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateLease = () => {
    const msrp = parseFloat(vehiclePrice);
    const down = parseFloat(downPayment) || 0;
    const residual = parseFloat(residualValue);
    const term = parseFloat(leaseTerm);
    const rate = parseFloat(interestRate) / 100;
    const tax = parseFloat(salesTax) / 100;
    const tradein = parseFloat(tradeinValue) || 0;

    if (!msrp || !residual || !term || !rate) return;

    // Calculate lease components
    const netCapCost = msrp - down - tradein;
    const residualAmount = msrp * (residual / 100);
    const depreciation = netCapCost - residualAmount;
    const monthlyDepreciation = depreciation / term;
    
    // Money factor calculation (APR ÷ 2400)
    const moneyFactor = rate / 24;
    const monthlyFinanceCharge = (netCapCost + residualAmount) * moneyFactor;
    
    const baseMonthlyPayment = monthlyDepreciation + monthlyFinanceCharge;
    const salesTaxAmount = baseMonthlyPayment * tax;
    const totalMonthlyPayment = baseMonthlyPayment + salesTaxAmount;
    
    // Total costs
    const totalLeasePayments = totalMonthlyPayment * term;
    const totalCostOfLease = totalLeasePayments + down;
    const totalInterest = monthlyFinanceCharge * term;

    // Compare to financing
    const loanMonthlyPayment = (msrp - down - tradein) * 
      (rate / 12 * Math.pow(1 + rate / 12, term)) / 
      (Math.pow(1 + rate / 12, term) - 1);
    
    setResults({
      vehiclePrice: msrp,
      downPayment: down,
      tradeinValue: tradein,
      netCapCost,
      residualPercentage: residual,
      residualAmount,
      leaseTerm: term,
      interestRate: rate * 100,
      moneyFactor,
      depreciation,
      monthlyDepreciation,
      monthlyFinanceCharge,
      baseMonthlyPayment,
      salesTaxAmount,
      totalMonthlyPayment,
      totalLeasePayments,
      totalCostOfLease,
      totalInterest,
      loanComparison: {
        monthlyPayment: loanMonthlyPayment,
        totalCost: (loanMonthlyPayment * term) + down,
        savings: (loanMonthlyPayment * term) + down - totalCostOfLease
      }
    });
  };

  const getLeaseAdvice = (payment: number, msrp: number) => {
    const paymentToMSRP = (payment * 12) / msrp;
    
    if (paymentToMSRP < 0.01) return { rating: 'Excellent', color: 'green', message: 'Outstanding lease deal' };
    if (paymentToMSRP < 0.012) return { rating: 'Very Good', color: 'blue', message: 'Great lease terms' };
    if (paymentToMSRP < 0.015) return { rating: 'Good', color: 'yellow', message: 'Acceptable lease deal' };
    if (paymentToMSRP < 0.018) return { rating: 'Fair', color: 'orange', message: 'Higher than ideal payment' };
    return { rating: 'Poor', color: 'red', message: 'Consider negotiating or financing' };
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🚗</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Lease Calculator — Monthly Lease Payment Calculator</h1>
          <p className="text-gray-600">Calculate monthly lease payments and compare financing options</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Price (MSRP)</label>
                <input
                  type="number"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="35000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment ($)</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Residual Value (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={residualValue}
                  onChange={(e) => setResidualValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="55"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lease Term (months)</label>
                <select
                  value={leaseTerm}
                  onChange={(e) => setLeaseTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Term</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="39">39 months</option>
                  <option value="48">48 months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (APR %)</label>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sales Tax (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={salesTax}
                  onChange={(e) => setSalesTax(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="8.5"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Trade-in Value (Optional)</label>
                <input
                  type="number"
                  value={tradeinValue}
                  onChange={(e) => setTradeinValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="12000"
                />
              </div>
            </div>

            <button
              onClick={calculateLease}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Calculate Lease Payment
            </button>

            {results && (
              <div className="mt-8 space-y-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Monthly Lease Payment</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 mb-2">
                      ${results.totalMonthlyPayment.toFixed(2)}
                    </div>
                    <div className="text-sm text-blue-700">per month</div>
                  </div>
                  
                  {results.vehiclePrice && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      {(() => {
                        const advice = getLeaseAdvice(results.totalMonthlyPayment, results.vehiclePrice);
                        return (
                          <div className={`text-center text-${advice.color}-700`}>
                            <div className="font-semibold">{advice.rating} Deal</div>
                            <div className="text-sm">{advice.message}</div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Depreciation</span>
                        <span className="font-medium">${results.monthlyDepreciation.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Finance Charge</span>
                        <span className="font-medium">${results.monthlyFinanceCharge.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sales Tax</span>
                        <span className="font-medium">${results.salesTaxAmount.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                        <span>Total Monthly</span>
                        <span>${results.totalMonthlyPayment.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lease Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Net Cap Cost</span>
                        <span className="font-medium">${results.netCapCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Residual Value</span>
                        <span className="font-medium">${results.residualAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Money Factor</span>
                        <span className="font-medium">{results.moneyFactor.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Depreciation</span>
                        <span className="font-medium">${results.depreciation.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Total Lease Cost</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-900">${results.downPayment.toLocaleString()}</div>
                      <div className="text-sm text-green-700">Down Payment</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-900">${results.totalLeasePayments.toLocaleString()}</div>
                      <div className="text-sm text-green-700">Total Payments</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-900">${results.totalCostOfLease.toLocaleString()}</div>
                      <div className="text-sm text-green-700">Total Cost</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">Lease vs Finance Comparison</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-900 mb-1">Lease</div>
                      <div className="text-2xl font-bold text-purple-900">${results.totalMonthlyPayment.toFixed(2)}/mo</div>
                      <div className="text-sm text-purple-700">Total: ${results.totalCostOfLease.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-900 mb-1">Finance</div>
                      <div className="text-2xl font-bold text-purple-900">${results.loanComparison.monthlyPayment.toFixed(2)}/mo</div>
                      <div className="text-sm text-purple-700">Total: ${results.loanComparison.totalCost.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-center mt-4 pt-4 border-t border-purple-200">
                    <div className="text-lg font-semibold text-purple-900">
                      Lease saves ${Math.abs(results.loanComparison.savings).toLocaleString()} 
                      {results.loanComparison.savings < 0 ? ' less than financing' : ' compared to financing'}
                    </div>
                  </div>
                </div>
              </div>
            )}
      </div>

      {/* Lease Terms Guide */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📋</span>
          Lease Terms Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Residual Value</div>
            <div className="text-sm text-blue-700">Vehicle's worth at lease end</div>
            <div className="text-xs text-blue-600 mt-1">Typically 50-60% of MSRP</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Money Factor</div>
            <div className="text-sm text-blue-700">Interest rate equivalent</div>
            <div className="text-xs text-blue-600 mt-1">APR ÷ 2400</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Cap Cost</div>
            <div className="text-sm text-blue-700">Adjusted vehicle price</div>
            <div className="text-xs text-blue-600 mt-1">MSRP - incentives - trade-in</div>
          </div>
        </div>
      </div>

      {/* When to Lease */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">✅</span>
          When to Lease vs Buy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Lease Benefits</div>
            <div className="text-sm text-green-700">• Lower monthly payments</div>
            <div className="text-sm text-green-700">• Always drive newer cars</div>
            <div className="text-sm text-green-700">• Warranty coverage</div>
            <div className="text-sm text-green-700">• No long-term commitment</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Buy Benefits</div>
            <div className="text-sm text-green-700">• Build equity/ownership</div>
            <div className="text-sm text-green-700">• No mileage restrictions</div>
            <div className="text-sm text-green-700">• Modify as desired</div>
            <div className="text-sm text-green-700">• Lower total cost</div>
          </div>
        </div>
      </div>
    </div>
  );
}