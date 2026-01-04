'use client';

import { useState } from 'react';

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [additionalInvestments, setAdditionalInvestments] = useState('');
  const [dividends, setDividends] = useState('');
  const [calculationType, setCalculationType] = useState('simple');
  const [results, setResults] = useState<any>(null);

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const time = parseFloat(timeFrame);
    const additional = parseFloat(additionalInvestments) || 0;
    const dividendsReceived = parseFloat(dividends) || 0;

    if (!initial || !final) return;

    const totalInvestment = initial + additional;
    const totalReturns = final + dividendsReceived;
    const totalGain = totalReturns - totalInvestment;
    
    // Simple ROI
    const simpleROI = (totalGain / totalInvestment) * 100;
    
    // Annualized ROI
    const annualizedROI = time > 0 ? (Math.pow(totalReturns / totalInvestment, 1 / time) - 1) * 100 : 0;
    
    // ROI with dividends
    const dividendYield = dividendsReceived > 0 ? (dividendsReceived / totalInvestment) * 100 : 0;
    
    // Additional metrics
    const totalReturnPercentage = (totalReturns / totalInvestment - 1) * 100;
    const profitMargin = (totalGain / totalReturns) * 100;
    const investmentMultiplier = totalReturns / totalInvestment;
    
    // Break-even analysis
    const breakEvenPoint = totalInvestment;
    const currentStatus = totalReturns >= totalInvestment ? 'Profitable' : 'Loss';
    
    // Risk-adjusted returns (simplified)
    const riskAdjustedReturn = annualizedROI; // Simplified - would need volatility data for proper calculation
    
    setResults({
      totalInvestment,
      totalReturns,
      totalGain,
      simpleROI,
      annualizedROI,
      dividendYield,
      totalReturnPercentage,
      profitMargin,
      investmentMultiplier,
      breakEvenPoint,
      currentStatus,
      riskAdjustedReturn
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getStatusColor = (status: string) => {
    return status === 'Profitable' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusBgColor = (status: string) => {
    return status === 'Profitable' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">📊</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ROI Calculator — Return on Investment Calculator</h1>
          <p className="text-gray-600">Calculate Return on Investment for your business and investment decisions</p>
        </div>
      </div>

      {/* ROI Formula Info */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Formula</h3>
        <div className="text-sm space-y-2">
          <div><strong>Simple ROI:</strong> (Total Returns - Total Investment) / Total Investment × 100</div>
          <div><strong>Annualized ROI:</strong> (Total Returns / Total Investment)^(1/Years) - 1 × 100</div>
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
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="10000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Final Value</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="15000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Frame (Years)</label>
          <input
            type="number"
            step="0.1"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Investments</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={additionalInvestments}
              onChange={(e) => setAdditionalInvestments(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Dividends/Income Received</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={dividends}
              onChange={(e) => setDividends(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <button
        onClick={calculateROI}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate ROI
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {formatPercentage(results.simpleROI)}
                </div>
                <div className="text-sm text-blue-700">Simple ROI</div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {formatPercentage(results.annualizedROI)}
                </div>
                <div className="text-sm text-green-700">Annualized ROI</div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {formatCurrency(results.totalGain)}
                </div>
                <div className="text-sm text-purple-700">Total Gain/Loss</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 border ${getStatusBgColor(results.currentStatus)}`}>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${getStatusColor(results.currentStatus)}`}>
                  {results.currentStatus}
                </div>
                <div className={`text-sm ${getStatusColor(results.currentStatus)}`}>Investment Status</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Investment</span>
                  <span className="font-medium">{formatCurrency(results.totalInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Returns</span>
                  <span className="font-medium">{formatCurrency(results.totalReturns)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Gain/Loss</span>
                  <span className={`font-medium ${results.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.totalGain)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Multiplier</span>
                  <span className="font-medium">{results.investmentMultiplier.toFixed(2)}x</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Simple ROI</span>
                  <span className="font-medium">{formatPercentage(results.simpleROI)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annualized ROI</span>
                  <span className="font-medium">{formatPercentage(results.annualizedROI)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dividend Yield</span>
                  <span className="font-medium">{formatPercentage(results.dividendYield)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Return %</span>
                  <span className="font-medium">{formatPercentage(results.totalReturnPercentage)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Investment Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-yellow-700 mb-2">
                  <strong>Break-even Point:</strong> {formatCurrency(results.breakEvenPoint)}
                </p>
                <p className="text-yellow-700">
                  <strong>Current Status:</strong> Your investment is currently showing a {results.currentStatus.toLowerCase()}
                </p>
              </div>
              <div>
                <p className="text-yellow-700 mb-2">
                  <strong>Performance:</strong> {results.simpleROI > 0 ? 'Positive' : 'Negative'} return of {formatPercentage(Math.abs(results.simpleROI))}
                </p>
                <p className="text-yellow-700">
                  <strong>Annualized:</strong> {formatPercentage(results.annualizedROI)} per year
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}