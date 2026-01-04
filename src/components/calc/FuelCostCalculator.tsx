'use client';

import { useState } from 'react';

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [unitSystem, setUnitSystem] = useState('imperial');
  const [tripType, setTripType] = useState('one-way');
  const [results, setResults] = useState<any>(null);

  const calculateFuelCost = () => {
    const dist = parseFloat(distance);
    const efficiency = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);

    if (!dist || !efficiency || !price) return;

    const totalDistance = tripType === 'round-trip' ? dist * 2 : dist;
    const fuelNeeded = totalDistance / efficiency;
    const totalCost = fuelNeeded * price;

    // Convert to alternative units for display
    let distanceAlt, efficiencyAlt, fuelNeededAlt;
    if (unitSystem === 'imperial') {
      distanceAlt = totalDistance * 1.60934; // miles to km
      efficiencyAlt = efficiency * 0.425144; // mpg to km/l
      fuelNeededAlt = fuelNeeded * 3.78541; // gallons to liters
    } else {
      distanceAlt = totalDistance * 0.621371; // km to miles
      efficiencyAlt = efficiency * 2.35214; // km/l to mpg
      fuelNeededAlt = fuelNeeded * 0.264172; // liters to gallons
    }

    const costPerMile = unitSystem === 'imperial' ? totalCost / totalDistance : totalCost / totalDistance;
    const costPer100Units = unitSystem === 'imperial' ? (totalCost / totalDistance) * 100 : (totalCost / totalDistance) * 100;

    setResults({
      totalDistance,
      fuelNeeded,
      totalCost,
      distanceAlt,
      efficiencyAlt,
      fuelNeededAlt,
      costPerMile,
      costPer100Units
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getDistanceUnit = () => unitSystem === 'imperial' ? 'miles' : 'km';
  const getEfficiencyUnit = () => unitSystem === 'imperial' ? 'MPG' : 'km/L';
  const getFuelUnit = () => unitSystem === 'imperial' ? 'gallons' : 'liters';
  const getAltDistanceUnit = () => unitSystem === 'imperial' ? 'km' : 'miles';
  const getAltEfficiencyUnit = () => unitSystem === 'imperial' ? 'km/L' : 'MPG';
  const getAltFuelUnit = () => unitSystem === 'imperial' ? 'liters' : 'gallons';

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⛽</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fuel Cost Calculator — Trip Cost & Gas Price Calculator</h1>
          <p className="text-gray-600">Calculate fuel costs for your trips and optimize your travel budget</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
          <div className="relative">
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full pr-16 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="300"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {getDistanceUnit()}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Efficiency</label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={fuelEfficiency}
              onChange={(e) => setFuelEfficiency(e.target.value)}
              className="w-full pr-16 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={unitSystem === 'imperial' ? '25' : '10.6'}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {getEfficiencyUnit()}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              className="w-full pl-8 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="imperial">Imperial (Miles, MPG, Gallons)</option>
            <option value="metric">Metric (Kilometers, km/L, Liters)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTripType('one-way')}
              className={`p-3 rounded-lg border-2 transition-all ${
                tripType === 'one-way'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              One-way Trip
            </button>
            <button
              onClick={() => setTripType('round-trip')}
              className={`p-3 rounded-lg border-2 transition-all ${
                tripType === 'round-trip'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              Round Trip
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={calculateFuelCost}
        className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Fuel Cost
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {formatCurrency(results.totalCost)}
                </div>
                <div className="text-sm text-green-700">Total Fuel Cost</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {results.fuelNeeded.toFixed(2)}
                </div>
                <div className="text-sm text-blue-700">Fuel Needed ({getFuelUnit()})</div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {results.totalDistance.toFixed(1)}
                </div>
                <div className="text-sm text-purple-700">Total Distance ({getDistanceUnit()})</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance ({getDistanceUnit()})</span>
                  <span className="font-medium">{results.totalDistance.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance ({getAltDistanceUnit()})</span>
                  <span className="font-medium">{results.distanceAlt.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fuel Needed ({getFuelUnit()})</span>
                  <span className="font-medium">{results.fuelNeeded.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fuel Needed ({getAltFuelUnit()})</span>
                  <span className="font-medium">{results.fuelNeededAlt.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost per {getDistanceUnit().slice(0, -1)}</span>
                  <span className="font-medium">{formatCurrency(results.costPerMile)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost per 100 {getDistanceUnit()}</span>
                  <span className="font-medium">{formatCurrency(results.costPer100Units)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Trip Cost</span>
                  <span className="font-medium text-lg">{formatCurrency(results.totalCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}