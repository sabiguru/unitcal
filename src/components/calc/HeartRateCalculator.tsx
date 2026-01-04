'use client';

import { useState } from 'react';

interface HeartRateResults {
  maxHR: number;
  zones: { [key: string]: { lower: number; upper: number; percentage: string } };
}

export default function HeartRateCalculator() {
  const [age, setAge] = useState<string>('');
  const [restingHR, setRestingHR] = useState<string>('');
  const [method, setMethod] = useState<'karvonen' | 'hrr' | 'maxhr'>('karvonen');
  const [results, setResults] = useState<HeartRateResults | null>(null);

  const calculateHeartRate = () => {
    const ageNum = parseFloat(age);
    if (isNaN(ageNum)) return;

    const maxHR = 220 - ageNum;
    let zones: { [key: string]: { lower: number; upper: number; percentage: string } } = {};

    if (method === 'karvonen' || method === 'hrr') {
      const restingHRNum = parseFloat(restingHR);
      if (isNaN(restingHRNum)) return;

      const hrReserve = maxHR - restingHRNum;

      // Karvonen Formula: Target HR = ((Max HR - Resting HR) × intensity%) + Resting HR
      zones = {
        'Active Recovery': {
          lower: Math.round((hrReserve * 0.30) + restingHRNum),
          upper: Math.round((hrReserve * 0.40) + restingHRNum),
          percentage: '30-40%'
        },
        'Aerobic Base': {
          lower: Math.round((hrReserve * 0.40) + restingHRNum),
          upper: Math.round((hrReserve * 0.50) + restingHRNum),
          percentage: '40-50%'
        },
        'Aerobic': {
          lower: Math.round((hrReserve * 0.50) + restingHRNum),
          upper: Math.round((hrReserve * 0.70) + restingHRNum),
          percentage: '50-70%'
        },
        'Threshold': {
          lower: Math.round((hrReserve * 0.70) + restingHRNum),
          upper: Math.round((hrReserve * 0.80) + restingHRNum),
          percentage: '70-80%'
        },
        'VO2 Max': {
          lower: Math.round((hrReserve * 0.80) + restingHRNum),
          upper: Math.round((hrReserve * 0.90) + restingHRNum),
          percentage: '80-90%'
        },
        'Neuromuscular': {
          lower: Math.round((hrReserve * 0.90) + restingHRNum),
          upper: maxHR,
          percentage: '90-100%'
        }
      };
    } else {
      // Simple Max HR method (less accurate)
      zones = {
        'Zone 1 (Recovery)': {
          lower: Math.round(maxHR * 0.50),
          upper: Math.round(maxHR * 0.60),
          percentage: '50-60%'
        },
        'Zone 2 (Aerobic)': {
          lower: Math.round(maxHR * 0.60),
          upper: Math.round(maxHR * 0.70),
          percentage: '60-70%'
        },
        'Zone 3 (Aerobic)': {
          lower: Math.round(maxHR * 0.70),
          upper: Math.round(maxHR * 0.80),
          percentage: '70-80%'
        },
        'Zone 4 (Threshold)': {
          lower: Math.round(maxHR * 0.80),
          upper: Math.round(maxHR * 0.90),
          percentage: '80-90%'
        },
        'Zone 5 (VO2 Max)': {
          lower: Math.round(maxHR * 0.90),
          upper: maxHR,
          percentage: '90-100%'
        }
      };
    }

    setResults({ maxHR, zones });
  };

  const clear = () => {
    setAge('');
    setRestingHR('');
    setResults(null);
  };

  const getZoneColor = (zoneName: string) => {
    if (zoneName.includes('Recovery') || zoneName.includes('Zone 1')) return 'bg-blue-50 border-blue-200 text-blue-800';
    if (zoneName.includes('Base') || zoneName.includes('Zone 2')) return 'bg-green-50 border-green-200 text-green-800';
    if (zoneName.includes('Aerobic') || zoneName.includes('Zone 3')) return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    if (zoneName.includes('Threshold') || zoneName.includes('Zone 4')) return 'bg-orange-50 border-orange-200 text-orange-800';
    if (zoneName.includes('VO2') || zoneName.includes('Zone 5')) return 'bg-red-50 border-red-200 text-red-800';
    if (zoneName.includes('Neuromuscular')) return 'bg-purple-50 border-purple-200 text-purple-800';
    return 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const getTrainingTips = () => [
    { zone: 'Active Recovery', tip: 'Light activity to promote recovery', icon: '😌' },
    { zone: 'Aerobic Base', tip: 'Build aerobic fitness and endurance', icon: '🚶' },
    { zone: 'Aerobic', tip: 'Improve cardiovascular efficiency', icon: '🏃' },
    { zone: 'Threshold', tip: 'Increase lactate threshold', icon: '💪' },
    { zone: 'VO2 Max', tip: 'Maximize oxygen uptake', icon: '🔥' },
    { zone: 'Neuromuscular', tip: 'Develop speed and power', icon: '⚡' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">❤️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Heart Rate Calculator</h1>
          <p className="text-gray-600">Calculate your target heart rate zones for optimal training</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as 'karvonen' | 'hrr' | 'maxhr')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="karvonen">Karvonen Formula (Most Accurate)</option>
          <option value="hrr">Heart Rate Reserve Method</option>
          <option value="maxhr">Simple Max HR Method</option>
        </select>
        <p className="text-sm text-gray-500 mt-1">
          {method === 'karvonen' && 'Uses your resting heart rate for more accurate calculations'}
          {method === 'hrr' && 'Similar to Karvonen, uses heart rate reserve'}
          {method === 'maxhr' && 'Basic method using only age and max heart rate'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter your age"
            min="1"
            max="120"
          />
        </div>

        {(method === 'karvonen' || method === 'hrr') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resting Heart Rate (BPM)</label>
            <input
              type="number"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g., 60"
              min="30"
              max="120"
            />
            <p className="text-sm text-gray-500 mt-1">
              Measure first thing in the morning before getting out of bed
            </p>
          </div>
        )}
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={calculateHeartRate}
          className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 px-6 rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate Heart Rate Zones
        </button>
        <button
          onClick={clear}
          className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-red-900 mb-1">{results.maxHR} BPM</div>
              <div className="text-sm text-red-700">Maximum Heart Rate</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(results.zones).map(([zoneName, zone]) => (
              <div key={zoneName} className={`rounded-xl p-4 border ${getZoneColor(zoneName)}`}>
                <h3 className="font-semibold text-lg mb-2">{zoneName}</h3>
                <div className="text-2xl font-bold mb-1">
                  {zone.lower} - {zone.upper} BPM
                </div>
                <div className="text-sm opacity-75">
                  {zone.percentage} of Max HR
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Zone Guide</h3>
            <div className="space-y-3">
              {getTrainingTips().map((tip, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{tip.zone}</div>
                    <div className="text-sm text-gray-600">{tip.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Measure Resting Heart Rate</h3>
        <div className="space-y-2 text-blue-800 text-sm">
          <p>• Measure first thing in the morning, before getting out of bed</p>
          <p>• Use your index and middle finger to find your pulse on your wrist or neck</p>
          <p>• Count beats for 60 seconds, or count for 15 seconds and multiply by 4</p>
          <p>• Take measurements for 3 consecutive days and use the average</p>
          <p>• Normal resting heart rate for adults: 60-100 BPM</p>
          <p>• Athletes may have resting heart rates as low as 40-50 BPM</p>
        </div>
      </div>
      </div>
    </div>
  );
}