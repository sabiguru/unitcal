'use client';

import { useState } from 'react';

export default function EnergyUsageCalculator() {
  const [appliances, setAppliances] = useState([
    { name: '', wattage: '', hoursPerDay: '', daysPerMonth: '' }
  ]);
  const [electricityRate, setElectricityRate] = useState('0.13');
  const [results, setResults] = useState<any>(null);

  const commonAppliances = [
    { name: 'Refrigerator', wattage: 400, hours: 24 },
    { name: 'LED Light Bulb', wattage: 9, hours: 5 },
    { name: 'Desktop Computer', wattage: 300, hours: 8 },
    { name: 'Air Conditioner', wattage: 3000, hours: 8 },
    { name: 'Washing Machine', wattage: 500, hours: 1 },
    { name: 'Dishwasher', wattage: 1800, hours: 1 },
    { name: 'Television (LED 55")', wattage: 150, hours: 5 },
    { name: 'Microwave', wattage: 1000, hours: 0.5 },
    { name: 'Water Heater', wattage: 4000, hours: 3 },
    { name: 'Dryer', wattage: 3000, hours: 1 }
  ];

  const addAppliance = () => {
    setAppliances([...appliances, { name: '', wattage: '', hoursPerDay: '', daysPerMonth: '30' }]);
  };

  const removeAppliance = (index: number) => {
    if (appliances.length > 1) {
      setAppliances(appliances.filter((_, i) => i !== index));
    }
  };

  const updateAppliance = (index: number, field: string, value: string) => {
    const updated = appliances.map((appliance, i) => 
      i === index ? { ...appliance, [field]: value } : appliance
    );
    setAppliances(updated);
  };

  const selectCommonAppliance = (index: number, appliance: any) => {
    updateAppliance(index, 'name', appliance.name);
    updateAppliance(index, 'wattage', appliance.wattage.toString());
    updateAppliance(index, 'hoursPerDay', appliance.hours.toString());
    updateAppliance(index, 'daysPerMonth', '30');
  };

  const calculateEnergyUsage = () => {
    const rate = parseFloat(electricityRate);
    
    const applianceResults = appliances
      .filter(app => app.name && app.wattage && app.hoursPerDay)
      .map(app => {
        const wattage = parseFloat(app.wattage);
        const hoursPerDay = parseFloat(app.hoursPerDay);
        const daysPerMonth = parseFloat(app.daysPerMonth) || 30;
        
        const dailyKWh = (wattage * hoursPerDay) / 1000;
        const monthlyKWh = dailyKWh * daysPerMonth;
        const annualKWh = dailyKWh * 365;
        const monthlyCost = monthlyKWh * rate;
        const annualCost = annualKWh * rate;
        
        return {
          name: app.name,
          wattage,
          hoursPerDay,
          daysPerMonth,
          dailyKWh,
          monthlyKWh,
          annualKWh,
          monthlyCost,
          annualCost
        };
      });

    const totals = applianceResults.reduce((acc, app) => ({
      monthlyKWh: acc.monthlyKWh + app.monthlyKWh,
      annualKWh: acc.annualKWh + app.annualKWh,
      monthlyCost: acc.monthlyCost + app.monthlyCost,
      annualCost: acc.annualCost + app.annualCost
    }), { monthlyKWh: 0, annualKWh: 0, monthlyCost: 0, annualCost: 0 });

    setResults({
      appliances: applianceResults,
      totals,
      avgDailyCost: totals.annualCost / 365,
      avgHourlyUsage: totals.annualKWh / (365 * 24),
      co2Emissions: totals.annualKWh * 0.92 // lbs CO2 per kWh average
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
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⚡</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Energy Usage Calculator</h1>
          <p className="text-gray-600">Calculate electricity consumption and costs for your home appliances</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Electricity Rate ($/kWh)</label>
        <input
          type="number"
          step="0.001"
          value={electricityRate}
          onChange={(e) => setElectricityRate(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="0.13"
        />
        <div className="text-sm text-gray-500 mt-1">Average US rate is $0.13/kWh</div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Appliances</h3>
          <button
            onClick={addAppliance}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Add Appliance
          </button>
        </div>

        <div className="space-y-4">
          {appliances.map((appliance, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-end p-4 bg-gray-50 rounded-lg">
              <div className="col-span-12 md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appliance
                  <span className="text-xs text-gray-500 ml-1">(type name or select below)</span>
                </label>
                <input
                  type="text"
                  value={appliance.name}
                  onChange={(e) => updateAppliance(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter appliance name..."
                />
                <div className="mt-2">
                  <select
                    onChange={(e) => {
                      const selected = commonAppliances[parseInt(e.target.value)];
                      if (selected) selectCommonAppliance(index, selected);
                    }}
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1 bg-blue-50"
                  >
                    <option value="">📋 Quick Select Common Appliance</option>
                    {commonAppliances.map((app, i) => (
                      <option key={i} value={i}>{app.name} ({app.wattage}W, {app.hours}h/day)</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-4 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Wattage</label>
                <input
                  type="number"
                  value={appliance.wattage}
                  onChange={(e) => updateAppliance(index, 'wattage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="100"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Hours/Day</label>
                <input
                  type="number"
                  step="0.5"
                  value={appliance.hoursPerDay}
                  onChange={(e) => updateAppliance(index, 'hoursPerDay', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="8"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Days/Month</label>
                <input
                  type="number"
                  value={appliance.daysPerMonth}
                  onChange={(e) => updateAppliance(index, 'daysPerMonth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="30"
                />
              </div>
              <div className="col-span-12 md:col-span-1">
                <button
                  onClick={() => removeAppliance(index)}
                  className="w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  disabled={appliances.length === 1}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={calculateEnergyUsage}
        className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 px-6 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Energy Usage
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-900 mb-1">
                  {results.totals.monthlyKWh.toFixed(1)}
                </div>
                <div className="text-sm text-yellow-700">Monthly kWh</div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-900 mb-1">
                  {formatCurrency(results.totals.monthlyCost)}
                </div>
                <div className="text-sm text-orange-700">Monthly Cost</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {results.totals.annualKWh.toFixed(0)}
                </div>
                <div className="text-sm text-blue-700">Annual kWh</div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {formatCurrency(results.totals.annualCost)}
                </div>
                <div className="text-sm text-green-700">Annual Cost</div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Environmental Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-red-900 mb-1">
                  {(results.co2Emissions / 1000).toFixed(1)}k lbs
                </div>
                <div className="text-sm text-red-700">CO₂ Emissions/Year</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-900 mb-1">
                  {(results.co2Emissions / 2204).toFixed(1)} tons
                </div>
                <div className="text-sm text-red-700">Carbon Footprint/Year</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Appliance Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Appliance</th>
                    <th className="text-right py-2">Monthly kWh</th>
                    <th className="text-right py-2">Monthly Cost</th>
                    <th className="text-right py-2">Annual Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {results.appliances.map((app: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 font-medium">{app.name}</td>
                      <td className="py-2 text-right">{app.monthlyKWh.toFixed(1)}</td>
                      <td className="py-2 text-right">{formatCurrency(app.monthlyCost)}</td>
                      <td className="py-2 text-right">{formatCurrency(app.annualCost)}</td>
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