'use client';

import { useState } from 'react';

export default function NPVIRRCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [cashFlows, setCashFlows] = useState<string[]>(['', '', '', '', '']);
  const [results, setResults] = useState<any>(null);

  const updateCashFlow = (index: number, value: string) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = value;
    setCashFlows(newCashFlows);
  };

  const addCashFlow = () => {
    setCashFlows([...cashFlows, '']);
  };

  const removeCashFlow = (index: number) => {
    if (cashFlows.length > 1) {
      const newCashFlows = cashFlows.filter((_, i) => i !== index);
      setCashFlows(newCashFlows);
    }
  };

  const calculateNPV = (rate: number, flows: number[]) => {
    let npv = -Math.abs(parseFloat(initialInvestment));
    for (let i = 0; i < flows.length; i++) {
      npv += flows[i] / Math.pow(1 + rate, i + 1);
    }
    return npv;
  };

  const calculateIRR = (flows: number[]) => {
    const initialInv = -Math.abs(parseFloat(initialInvestment));
    const allFlows = [initialInv, ...flows];
    
    // Use Newton-Raphson method to find IRR
    let rate = 0.1; // Starting guess
    const maxIterations = 100;
    const tolerance = 0.0001;
    
    for (let i = 0; i < maxIterations; i++) {
      let npv = 0;
      let dnpv = 0; // Derivative of NPV
      
      for (let j = 0; j < allFlows.length; j++) {
        const period = j;
        npv += allFlows[j] / Math.pow(1 + rate, period);
        if (period > 0) {
          dnpv -= (period * allFlows[j]) / Math.pow(1 + rate, period + 1);
        }
      }
      
      if (Math.abs(npv) < tolerance) {
        return rate;
      }
      
      if (Math.abs(dnpv) < tolerance) {
        return null; // Cannot find IRR
      }
      
      rate = rate - npv / dnpv;
      
      if (rate < -1) {
        return null; // Invalid IRR
      }
    }
    
    return null; // Did not converge
  };

  const calculateMetrics = () => {
    const investment = parseFloat(initialInvestment);
    const rate = parseFloat(discountRate) / 100;
    
    if (!investment || !rate) return;
    
    const flows = cashFlows
      .filter(flow => flow.trim() !== '')
      .map(flow => parseFloat(flow))
      .filter(flow => !isNaN(flow));
    
    if (flows.length === 0) return;
    
    // Calculate NPV
    const npv = calculateNPV(rate, flows);
    
    // Calculate IRR
    const irr = calculateIRR(flows);
    
    // Calculate Payback Period
    let cumulativeCashFlow = -investment;
    let paybackPeriod = null;
    let paybackPeriodDiscounted = null;
    let cumulativeDiscountedCashFlow = -investment;
    
    for (let i = 0; i < flows.length; i++) {
      cumulativeCashFlow += flows[i];
      cumulativeDiscountedCashFlow += flows[i] / Math.pow(1 + rate, i + 1);
      
      if (paybackPeriod === null && cumulativeCashFlow >= 0) {
        const previousCumulative = cumulativeCashFlow - flows[i];
        paybackPeriod = i + Math.abs(previousCumulative) / flows[i];
      }
      
      if (paybackPeriodDiscounted === null && cumulativeDiscountedCashFlow >= 0) {
        const discountedFlow = flows[i] / Math.pow(1 + rate, i + 1);
        const previousDiscountedCumulative = cumulativeDiscountedCashFlow - discountedFlow;
        paybackPeriodDiscounted = i + Math.abs(previousDiscountedCumulative) / discountedFlow;
      }
    }
    
    // Calculate Profitability Index
    const pvOfFutureCashFlows = flows.reduce((pv, flow, index) => {
      return pv + flow / Math.pow(1 + rate, index + 1);
    }, 0);
    const profitabilityIndex = pvOfFutureCashFlows / investment;
    
    // Year-by-year breakdown
    const yearlyBreakdown = [];
    let runningNPV = -investment;
    let runningCashFlow = -investment;
    
    for (let i = 0; i < flows.length; i++) {
      const discountedFlow = flows[i] / Math.pow(1 + rate, i + 1);
      runningNPV += discountedFlow;
      runningCashFlow += flows[i];
      
      yearlyBreakdown.push({
        year: i + 1,
        cashFlow: flows[i],
        discountedCashFlow: discountedFlow,
        cumulativeCashFlow: runningCashFlow,
        cumulativeNPV: runningNPV
      });
    }
    
    setResults({
      npv,
      irr: irr ? irr * 100 : null,
      paybackPeriod,
      paybackPeriodDiscounted,
      profitabilityIndex,
      pvOfFutureCashFlows,
      yearlyBreakdown
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">📈</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NPV & IRR Calculator</h1>
          <p className="text-gray-600">Calculate Net Present Value and Internal Rate of Return for investment analysis</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount Rate (Required Return)</label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
                className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">Future Cash Flows by Year</label>
            <button
              onClick={addCashFlow}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Add Year
            </button>
          </div>
          
          <div className="space-y-3">
            {cashFlows.map((flow, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-16 text-sm text-gray-600">Year {index + 1}:</div>
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={flow}
                    onChange={(e) => updateCashFlow(index, e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="25000"
                  />
                </div>
                {cashFlows.length > 1 && (
                  <button
                    onClick={() => removeCashFlow(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={calculateMetrics}
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate NPV & IRR
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`rounded-xl p-4 border ${results.npv >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="text-center">
                <div className={`text-lg font-bold mb-1 ${results.npv >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                  {formatCurrency(results.npv)}
                </div>
                <div className={`text-xs ${results.npv >= 0 ? 'text-green-700' : 'text-red-700'}`}>NPV</div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-900 mb-1">
                  {results.irr ? formatPercent(results.irr) : 'N/A'}
                </div>
                <div className="text-xs text-blue-700">IRR</div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-900 mb-1">
                  {results.profitabilityIndex.toFixed(2)}
                </div>
                <div className="text-xs text-purple-700">Profitability Index</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-900 mb-1">
                  {results.paybackPeriod ? results.paybackPeriod.toFixed(1) : 'N/A'}
                </div>
                <div className="text-xs text-yellow-700">Payback (years)</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Decision</h3>
            <div className="space-y-2">
              <div className={`p-3 rounded-lg ${results.npv >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <strong>NPV Decision:</strong> {results.npv >= 0 ? 'ACCEPT' : 'REJECT'} - 
                {results.npv >= 0 ? ' Investment creates value' : ' Investment destroys value'}
              </div>
              {results.irr && (
                <div className={`p-3 rounded-lg ${results.irr >= parseFloat(discountRate) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <strong>IRR Decision:</strong> {results.irr >= parseFloat(discountRate) ? 'ACCEPT' : 'REJECT'} - 
                  IRR {results.irr >= parseFloat(discountRate) ? 'exceeds' : 'below'} required return
                </div>
              )}
            </div>
          </div>

          {results.yearlyBreakdown.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3">Year</th>
                      <th className="text-right py-2 px-3">Cash Flow</th>
                      <th className="text-right py-2 px-3">Present Value</th>
                      <th className="text-right py-2 px-3">Cumulative Cash</th>
                      <th className="text-right py-2 px-3">Cumulative NPV</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 font-medium">0</td>
                      <td className="py-2 px-3 text-right text-red-600">-{formatCurrency(parseFloat(initialInvestment))}</td>
                      <td className="py-2 px-3 text-right text-red-600">-{formatCurrency(parseFloat(initialInvestment))}</td>
                      <td className="py-2 px-3 text-right text-red-600">-{formatCurrency(parseFloat(initialInvestment))}</td>
                      <td className="py-2 px-3 text-right text-red-600">-{formatCurrency(parseFloat(initialInvestment))}</td>
                    </tr>
                    {results.yearlyBreakdown.map((year: any, index: number) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-3 font-medium">{year.year}</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(year.cashFlow)}</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(year.discountedCashFlow)}</td>
                        <td className={`py-2 px-3 text-right ${year.cumulativeCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(year.cumulativeCashFlow)}
                        </td>
                        <td className={`py-2 px-3 text-right ${year.cumulativeNPV >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(year.cumulativeNPV)}
                        </td>
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
  );
}