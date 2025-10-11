'use client';

import { useState } from 'react';

export default function EVRangeCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [currentCharge, setCurrentCharge] = useState('');
  const [targetCharge, setTargetCharge] = useState('');
  const [temperature, setTemperature] = useState('');
  const [drivingConditions, setDrivingConditions] = useState('mixed');
  const [results, setResults] = useState<any>(null);

  const conditionFactors = {
    'highway': 0.9,
    'city': 1.1,
    'mixed': 1.0,
    'eco': 1.2
  };

  const temperatureImpact = (temp: number) => {
    // Temperature impact on battery efficiency
    if (temp >= 20 && temp <= 25) return 1.0; // Optimal range
    if (temp >= 15 && temp < 20) return 0.95;
    if (temp >= 10 && temp < 15) return 0.90;
    if (temp >= 5 && temp < 10) return 0.85;
    if (temp >= 0 && temp < 5) return 0.80;
    if (temp >= -5 && temp < 0) return 0.75;
    if (temp < -5) return 0.70;
    if (temp > 25 && temp <= 30) return 0.95;
    if (temp > 30) return 0.90;
    return 1.0;
  };

  const calculateEVRange = () => {
    const capacity = parseFloat(batteryCapacity);
    const eff = parseFloat(efficiency);
    const current = parseFloat(currentCharge) || 0;
    const target = parseFloat(targetCharge) || 100;
    const temp = parseFloat(temperature) || 22;

    if (!capacity || !eff) return;

    const conditionFactor = conditionFactors[drivingConditions as keyof typeof conditionFactors];
    const tempFactor = temperatureImpact(temp);
    
    const adjustedEfficiency = eff * conditionFactor * tempFactor;
    const maxRange = capacity * adjustedEfficiency;
    
    const usableCapacity = capacity * (target - current) / 100;
    const currentRange = usableCapacity * adjustedEfficiency;
    
    // Charging calculations
    const chargingSpeed = {
      level1: 1.4, // kW
      level2: 7.2, // kW
      dcFast: 50 // kW (average)
    };

    const timeToCharge = {
      level1: usableCapacity / chargingSpeed.level1,
      level2: usableCapacity / chargingSpeed.level2,
      dcFast: usableCapacity / chargingSpeed.dcFast
    };

    setResults({
      maxRange,
      currentRange,
      adjustedEfficiency,
      usableCapacity,
      conditionFactor,
      tempFactor,
      timeToCharge,
      rangeAtSpeeds: {
        '50mph': currentRange * 1.1,
        '65mph': currentRange * 1.0,
        '80mph': currentRange * 0.85
      }
    });
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🔋</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EV Range Calculator — Electric Vehicle Range Estimator</h1>
          <p className="text-gray-600">Calculate electric vehicle range and charging needs</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Battery Capacity (kWh)</label>
          <input
            type="number"
            value={batteryCapacity}
            onChange={(e) => setBatteryCapacity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="75"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Efficiency (miles/kWh)</label>
          <input
            type="number"
            step="0.1"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="3.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Charge (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={currentCharge}
            onChange={(e) => setCurrentCharge(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Charge (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={targetCharge}
            onChange={(e) => setTargetCharge(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="80"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="22"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Driving Conditions</label>
          <select
            value={drivingConditions}
            onChange={(e) => setDrivingConditions(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="highway">Highway</option>
            <option value="city">City</option>
            <option value="mixed">Mixed</option>
            <option value="eco">Eco Mode</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculateEVRange}
        className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate EV Range
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {results.currentRange.toFixed(0)} miles
                </div>
                <div className="text-sm text-green-700">Available Range</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {results.maxRange.toFixed(0)} miles
                </div>
                <div className="text-sm text-blue-700">Max Range (100%)</div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {results.adjustedEfficiency.toFixed(1)} mi/kWh
                </div>
                <div className="text-sm text-purple-700">Adjusted Efficiency</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Range at Different Speeds</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">50 mph</span>
                  <span className="font-medium">{results.rangeAtSpeeds['50mph'].toFixed(0)} miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">65 mph</span>
                  <span className="font-medium">{results.rangeAtSpeeds['65mph'].toFixed(0)} miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">80 mph</span>
                  <span className="font-medium">{results.rangeAtSpeeds['80mph'].toFixed(0)} miles</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Charging Time</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level 1 (120V)</span>
                  <span className="font-medium">{formatTime(results.timeToCharge.level1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level 2 (240V)</span>
                  <span className="font-medium">{formatTime(results.timeToCharge.level2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">DC Fast Charging</span>
                  <span className="font-medium">{formatTime(results.timeToCharge.dcFast)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Efficiency Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Driving Conditions</span>
                  <span className="font-medium text-yellow-900">{(results.conditionFactor * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Temperature Impact</span>
                  <span className="font-medium text-yellow-900">{(results.tempFactor * 100).toFixed(0)}%</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Usable Capacity</span>
                  <span className="font-medium text-yellow-900">{results.usableCapacity.toFixed(1)} kWh</span>
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