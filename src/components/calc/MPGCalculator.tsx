'use client';

import { useState } from 'react';

export default function MPGCalculator() {
  const [distance, setDistance] = useState('');
  const [fuelUsed, setFuelUsed] = useState('');
  const [unitSystem, setUnitSystem] = useState('imperial');
  const [fuelPrice, setFuelPrice] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateMPG = () => {
    const dist = parseFloat(distance);
    const fuel = parseFloat(fuelUsed);
    const price = parseFloat(fuelPrice) || 0;

    if (!dist || !fuel) return;

    const mpg = dist / fuel;
    const costPerMile = price ? (price / mpg) : 0;
    const costPer100Miles = costPerMile * 100;

    // Convert to alternative units
    let mpgAlt, costPerKm, costPer100Km;
    if (unitSystem === 'imperial') {
      mpgAlt = mpg * 0.425144; // MPG to km/L
      costPerKm = costPerMile * 0.621371; // cost per mile to cost per km
      costPer100Km = costPer100Miles * 0.621371; // cost per 100 miles to cost per 100 km
    } else {
      mpgAlt = mpg * 2.35214; // km/L to MPG
      costPerKm = costPerMile * 1.60934; // cost per km to cost per mile
      costPer100Km = costPer100Miles * 1.60934; // cost per 100 km to cost per 100 miles
    }

    // Calculate annual costs if fuel price is provided
    const annualMiles = 12000; // Average annual miles
    const annualFuelCost = price ? (annualMiles / mpg) * price : 0;

    // Efficiency rating
    let efficiencyRating = '';
    if (unitSystem === 'imperial') {
      if (mpg >= 40) efficiencyRating = 'Excellent';
      else if (mpg >= 30) efficiencyRating = 'Good';
      else if (mpg >= 20) efficiencyRating = 'Fair';
      else efficiencyRating = 'Poor';
    } else {
      if (mpg >= 17) efficiencyRating = 'Excellent';
      else if (mpg >= 12.8) efficiencyRating = 'Good';
      else if (mpg >= 8.5) efficiencyRating = 'Fair';
      else efficiencyRating = 'Poor';
    }

    setResults({
      mpg,
      mpgAlt,
      costPerMile,
      costPerKm,
      costPer100Miles,
      costPer100Km,
      annualFuelCost,
      efficiencyRating
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getDistanceUnit = () => unitSystem === 'imperial' ? 'miles' : 'km';
  const getFuelUnit = () => unitSystem === 'imperial' ? 'gallons' : 'liters';
  const getEfficiencyUnit = () => unitSystem === 'imperial' ? 'MPG' : 'km/L';
  const getAltEfficiencyUnit = () => unitSystem === 'imperial' ? 'km/L' : 'MPG';

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🚗</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MPG Calculator — Fuel Economy & Mileage Calculator</h1>
          <p className="text-gray-600">Calculate your vehicle's fuel efficiency and cost per mile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Distance Traveled</label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full pr-16 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="300"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {getDistanceUnit()}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Used</label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={fuelUsed}
              onChange={(e) => setFuelUsed(e.target.value)}
              className="w-full pr-16 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={unitSystem === 'imperial' ? '12' : '45'}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {getFuelUnit()}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Price (optional)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              className="w-full pl-8 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={unitSystem === 'imperial' ? '3.50' : '0.92'}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              per {getFuelUnit().slice(0, -1)}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
          <select
            value={unitSystem}
            onChange={(e) => setUnitSystem(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="imperial">Imperial (Miles, Gallons)</option>
            <option value="metric">Metric (Kilometers, Liters)</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculateMPG}
        className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate MPG
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-900 mb-1">
                  {results.mpg.toFixed(1)}
                </div>
                <div className="text-sm text-green-700 mb-2">{getEfficiencyUnit()}</div>
                <div className="text-xs text-green-600">
                  {results.mpgAlt.toFixed(1)} {getAltEfficiencyUnit()}
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-6 border text-center ${
              results.efficiencyRating === 'Excellent' ? 'bg-green-50 border-green-200' :
              results.efficiencyRating === 'Good' ? 'bg-blue-50 border-blue-200' :
              results.efficiencyRating === 'Fair' ? 'bg-yellow-50 border-yellow-200' :
              'bg-red-50 border-red-200'
            }`}>
              <div className={`text-2xl font-bold mb-1 ${
                results.efficiencyRating === 'Excellent' ? 'text-green-900' :
                results.efficiencyRating === 'Good' ? 'text-blue-900' :
                results.efficiencyRating === 'Fair' ? 'text-yellow-900' :
                'text-red-900'
              }`}>
                {results.efficiencyRating}
              </div>
              <div className={`text-sm ${
                results.efficiencyRating === 'Excellent' ? 'text-green-700' :
                results.efficiencyRating === 'Good' ? 'text-blue-700' :
                results.efficiencyRating === 'Fair' ? 'text-yellow-700' :
                'text-red-700'
              }`}>
                Efficiency Rating
              </div>
            </div>
          </div>

          {fuelPrice && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-900 mb-1">
                    {formatCurrency(results.costPerMile)}
                  </div>
                  <div className="text-sm text-blue-700">Cost per {getDistanceUnit().slice(0, -1)}</div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-900 mb-1">
                    {formatCurrency(results.costPer100Miles)}
                  </div>
                  <div className="text-sm text-purple-700">Cost per 100 {getDistanceUnit()}</div>
                </div>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-900 mb-1">
                    {formatCurrency(results.annualFuelCost)}
                  </div>
                  <div className="text-sm text-orange-700">Annual Fuel Cost</div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fuel Efficiency Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fuel Efficiency</span>
                  <span className="font-medium">{results.mpg.toFixed(1)} {getEfficiencyUnit()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alternative Unit</span>
                  <span className="font-medium">{results.mpgAlt.toFixed(1)} {getAltEfficiencyUnit()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Efficiency Rating</span>
                  <span className="font-medium">{results.efficiencyRating}</span>
                </div>
              </div>
              {fuelPrice && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost per {getDistanceUnit().slice(0, -1)}</span>
                    <span className="font-medium">{formatCurrency(results.costPerMile)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost per 100 {getDistanceUnit()}</span>
                    <span className="font-medium">{formatCurrency(results.costPer100Miles)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Fuel Cost</span>
                    <span className="font-medium">{formatCurrency(results.annualFuelCost)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}