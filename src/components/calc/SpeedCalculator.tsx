'use client';

import { useState } from 'react';

export default function SpeedCalculator() {
  const [calculateFor, setCalculateFor] = useState<'speed' | 'distance' | 'time'>('speed');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [speed, setSpeed] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (calculateFor === 'speed') {
      const d = parseFloat(distance);
      const t = parseFloat(time);
      if (d > 0 && t > 0) {
        const speedResult = d / t;
        setResult({
          type: 'speed',
          value: speedResult,
          unit: 'mph',
          formula: `Speed = ${d} ÷ ${t} = ${speedResult.toFixed(2)} mph`
        });
      }
    } else if (calculateFor === 'distance') {
      const s = parseFloat(speed);
      const t = parseFloat(time);
      if (s > 0 && t > 0) {
        const distanceResult = s * t;
        setResult({
          type: 'distance',
          value: distanceResult,
          unit: 'miles',
          formula: `Distance = ${s} × ${t} = ${distanceResult.toFixed(2)} miles`
        });
      }
    } else if (calculateFor === 'time') {
      const d = parseFloat(distance);
      const s = parseFloat(speed);
      if (d > 0 && s > 0) {
        const timeResult = d / s;
        setResult({
          type: 'time',
          value: timeResult,
          unit: 'hours',
          formula: `Time = ${d} ÷ ${s} = ${timeResult.toFixed(2)} hours`
        });
      }
    }
  };

  const clear = () => {
    setDistance('');
    setTime('');
    setSpeed('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🏃</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Speed Calculator — Distance, Time & Velocity Calculator</h1>
          <p className="text-gray-600">Calculate speed, distance, or time using the formula: Speed = Distance ÷ Time</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Calculate For:</label>
          <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-1">
            <button
              onClick={() => setCalculateFor('speed')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                calculateFor === 'speed'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Speed
            </button>
            <button
              onClick={() => setCalculateFor('distance')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                calculateFor === 'distance'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Distance
            </button>
            <button
              onClick={() => setCalculateFor('time')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                calculateFor === 'time'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Time
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {calculateFor !== 'distance' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Distance (miles)</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter distance"
                step="0.1"
              />
            </div>
          )}

          {calculateFor !== 'time' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time (hours)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter time"
                step="0.1"
              />
            </div>
          )}

          {calculateFor !== 'speed' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Speed (mph)</label>
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter speed"
                step="0.1"
              />
            </div>
          )}
        </div>

        {result && (
          <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {result.value.toFixed(2)} {result.unit}
              </div>
              <div className="text-lg text-blue-700 capitalize">
                {result.type}
              </div>
              <div className="text-sm text-blue-600 mt-2 font-mono">
                {result.formula}
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-4 mt-6">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}