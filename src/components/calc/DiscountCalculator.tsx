'use client';

import { useState } from 'react';

interface DiscountResults {
  discountAmount: number;
  salePrice: number;
  savings: number;
  discountPercentage: number;
}

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [salePrice, setSalePrice] = useState<string>('');
  const [results, setResults] = useState<DiscountResults | null>(null);
  const [calculationType, setCalculationType] = useState<'fromPercent' | 'fromSalePrice'>('fromPercent');

  const calculateFromPercent = () => {
    const original = parseFloat(originalPrice);
    const percent = parseFloat(discountPercent);

    if (isNaN(original) || isNaN(percent) || original <= 0 || percent < 0 || percent > 100) {
      return;
    }

    const discountAmount = (original * percent) / 100;
    const finalSalePrice = original - discountAmount;

    setResults({
      discountAmount,
      salePrice: finalSalePrice,
      savings: discountAmount,
      discountPercentage: percent
    });
  };

  const calculateFromSalePrice = () => {
    const original = parseFloat(originalPrice);
    const sale = parseFloat(salePrice);

    if (isNaN(original) || isNaN(sale) || original <= 0 || sale < 0 || sale > original) {
      return;
    }

    const discountAmount = original - sale;
    const discountPercentage = (discountAmount / original) * 100;

    setResults({
      discountAmount,
      salePrice: sale,
      savings: discountAmount,
      discountPercentage
    });
  };

  const handleCalculate = () => {
    if (calculationType === 'fromPercent') {
      calculateFromPercent();
    } else {
      calculateFromSalePrice();
    }
  };

  const resetCalculator = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setSalePrice('');
    setResults(null);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (percent: number): string => {
    return `${percent.toFixed(2)}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discount Calculator — Sale Price & Savings Calculator</h1>
        <p className="text-lg text-gray-600">Calculate discounts, sale prices, and savings amounts</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Calculation Type Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Calculation Type</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="fromPercent"
                checked={calculationType === 'fromPercent'}
                onChange={(e) => setCalculationType(e.target.value as 'fromPercent')}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">Calculate from discount percentage</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="fromSalePrice"
                checked={calculationType === 'fromSalePrice'}
                onChange={(e) => setCalculationType(e.target.value as 'fromSalePrice')}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">Calculate from sale price</span>
            </label>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="100.00"
              />
            </div>
          </div>

          {calculationType === 'fromPercent' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="20"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="80.00"
                />
              </div>
            </div>
          )}
        </div>

        {/* Calculate Button */}
        <div className="flex gap-3">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Calculate Discount
          </button>
          <button
            onClick={resetCalculator}
            className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-900 mb-1">
                    {formatCurrency(results.salePrice)}
                  </div>
                  <div className="text-sm text-green-700">Sale Price</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-1">
                    {formatPercentage(results.discountPercentage)}
                  </div>
                  <div className="text-sm text-blue-700">Discount</div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-900 mb-1">
                    {formatCurrency(results.discountAmount)}
                  </div>
                  <div className="text-sm text-orange-700">Discount Amount</div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900 mb-1">
                    {formatCurrency(results.savings)}
                  </div>
                  <div className="text-sm text-purple-700">Total Savings</div>
                </div>
              </div>
            </div>

            {/* Calculation Breakdown */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Original Price:</span>
                  <span className="font-medium">{formatCurrency(parseFloat(originalPrice))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount ({formatPercentage(results.discountPercentage)}):</span>
                  <span className="font-medium text-red-600">-{formatCurrency(results.discountAmount)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 text-lg">
                  <span>Final Price:</span>
                  <span className="text-green-600">{formatCurrency(results.salePrice)}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>You Save:</span>
                  <span>{formatCurrency(results.savings)}</span>
                </div>
              </div>
            </div>

            {/* Quick Examples */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-blue-900">Example 1: 20% off $100</div>
                  <div className="text-blue-700">
                    Discount: $20.00 | Sale Price: $80.00
                  </div>
                </div>
                <div>
                  <div className="font-medium text-blue-900">Example 2: $75 sale price on $100 item</div>
                  <div className="text-blue-700">
                    Discount: 25% | Savings: $25.00
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