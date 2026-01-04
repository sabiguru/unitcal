'use client';

import { useState } from 'react';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('18');
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [customTip, setCustomTip] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const people = parseInt(numberOfPeople);
    const tip = parseFloat(customTip || tipPercentage);

    if (!bill || bill <= 0 || !people || people <= 0 || !tip || tip < 0) return;

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const tipPerPerson = tipAmount / people;
    const totalPerPerson = totalAmount / people;
    const billPerPerson = bill / people;

    // Service quality assessment
    let serviceQuality = '';
    if (tip < 10) serviceQuality = 'Below Average';
    else if (tip < 15) serviceQuality = 'Average';
    else if (tip < 20) serviceQuality = 'Good';
    else if (tip < 25) serviceQuality = 'Great';
    else serviceQuality = 'Excellent';

    // Different tip scenarios
    const tipScenarios = [
      { percentage: 10, amount: (bill * 0.10), total: bill + (bill * 0.10), quality: 'Below Average' },
      { percentage: 15, amount: (bill * 0.15), total: bill + (bill * 0.15), quality: 'Average' },
      { percentage: 18, amount: (bill * 0.18), total: bill + (bill * 0.18), quality: 'Good' },
      { percentage: 20, amount: (bill * 0.20), total: bill + (bill * 0.20), quality: 'Great' },
      { percentage: 25, amount: (bill * 0.25), total: bill + (bill * 0.25), quality: 'Excellent' }
    ];

    setResults({
      billAmount: bill,
      tipPercentage: tip,
      tipAmount: tipAmount,
      totalAmount: totalAmount,
      numberOfPeople: people,
      billPerPerson: billPerPerson,
      tipPerPerson: tipPerPerson,
      totalPerPerson: totalPerPerson,
      serviceQuality: serviceQuality,
      tipScenarios: tipScenarios
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const setQuickTip = (percentage: string) => {
    setTipPercentage(percentage);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    if (value) {
      setTipPercentage('');
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">💰</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tip Calculator — Restaurant Tip & Bill Calculator</h1>
          <p className="text-gray-600">Calculate tips and split bills easily</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bill Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tip Percentage</label>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {['15', '18', '20', '25'].map((percent) => (
              <button
                key={percent}
                onClick={() => setQuickTip(percent)}
                className={`py-2 px-4 rounded-lg font-medium transition-all ${
                  tipPercentage === percent && !customTip
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={customTip}
              onChange={(e) => handleCustomTipChange(e.target.value)}
              className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Custom tip percentage"
            />
            <span className="absolute right-3 top-3 text-gray-500">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of People</label>
          <input
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="1"
          />
        </div>
      </div>

      <button
        onClick={calculateTip}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 px-6 rounded-lg font-medium hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Tip
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Tip Calculation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-900">{formatCurrency(results.tipAmount)}</div>
                <div className="text-sm text-amber-700">Tip Amount</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-900">{formatCurrency(results.totalAmount)}</div>
                <div className="text-sm text-amber-700">Total Amount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-900">{results.serviceQuality}</div>
                <div className="text-sm text-amber-700">Service Quality</div>
              </div>
            </div>

            {results.numberOfPeople > 1 && (
              <div className="bg-white rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-amber-900 mb-3">Per Person Breakdown</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-xl font-bold text-amber-900">{formatCurrency(results.billPerPerson)}</div>
                    <div className="text-amber-700">Bill Per Person</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-amber-900">{formatCurrency(results.tipPerPerson)}</div>
                    <div className="text-amber-700">Tip Per Person</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-amber-900">{formatCurrency(results.totalPerPerson)}</div>
                    <div className="text-amber-700">Total Per Person</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-amber-900 mb-3">Tip Scenarios</h4>
              <div className="space-y-2 text-sm">
                {results.tipScenarios.map((scenario: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{scenario.percentage}%</span>
                      <span className="text-gray-600">{scenario.quality}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-amber-700">{formatCurrency(scenario.amount)} tip</span>
                      <span className="font-medium">{formatCurrency(scenario.total)} total</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Tipping Guidelines */}
      <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
          <span className="text-amber-600 mr-2">📝</span>
          Tipping Guidelines by Service
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Restaurants</div>
            <div className="text-sm text-amber-700">Full service: 18-22%</div>
            <div className="text-xs text-amber-600 mt-1">Fine dining: 20-25%</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Delivery Services</div>
            <div className="text-sm text-amber-700">Food delivery: 15-20%</div>
            <div className="text-xs text-amber-600 mt-1">Minimum $3-5 per order</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Bars</div>
            <div className="text-sm text-amber-700">$1-2 per drink</div>
            <div className="text-xs text-amber-600 mt-1">20% for complex cocktails</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Coffee Shops</div>
            <div className="text-sm text-amber-700">10-15% or round up</div>
            <div className="text-xs text-amber-600 mt-1">$1 for simple orders</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Taxis/Rideshare</div>
            <div className="text-sm text-amber-700">15-20% of fare</div>
            <div className="text-xs text-amber-600 mt-1">Round up to nearest dollar</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-amber-900 mb-2">Personal Services</div>
            <div className="text-sm text-amber-700">Hair/nails: 18-22%</div>
            <div className="text-xs text-amber-600 mt-1">Spa services: 20%</div>
          </div>
        </div>
      </div>

      {/* Tipping Etiquette */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">🤝</span>
          Tipping Etiquette
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Tip based on pre-tax amount</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Cash tips are often preferred</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Tip more for exceptional service</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Consider local customs when traveling</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Don't reduce tip for kitchen mistakes</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Include tip when calculating total budget</div>
          </div>
        </div>
      </div>

      {/* International Tipping */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">🌍</span>
          International Tipping Customs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">United States</div>
            <div className="text-sm text-green-700">Expected 18-22%</div>
            <div className="text-xs text-green-600 mt-1">Service industry wages rely on tips</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Europe</div>
            <div className="text-sm text-green-700">5-10% or round up</div>
            <div className="text-xs text-green-600 mt-1">Service charge often included</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Japan</div>
            <div className="text-sm text-green-700">No tipping expected</div>
            <div className="text-xs text-green-600 mt-1">May be considered rude</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Australia</div>
            <div className="text-sm text-green-700">Round up bill</div>
            <div className="text-xs text-green-600 mt-1">10% for exceptional service</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Canada</div>
            <div className="text-sm text-green-700">15-20% standard</div>
            <div className="text-xs text-green-600 mt-1">Similar to US customs</div>
          </div>
        </div>
      </div>
    </div>
  );
}