'use client';

import { useState } from 'react';

export default function SlopePercentageCalculator() {
  const [calculationType, setCalculationType] = useState<'rise-run' | 'angle'>('rise-run');
  const [rise, setRise] = useState<string>('');
  const [run, setRun] = useState<string>('');
  const [angle, setAngle] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [angleResult, setAngleResult] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculateFromRiseRun = () => {
    const riseVal = parseFloat(rise);
    const runVal = parseFloat(run);
    if (isNaN(riseVal) || isNaN(runVal) || runVal === 0) return;

    // Slope percentage = (rise / run) × 100
    const slopePercent = (riseVal / runVal) * 100;
    // Angle in degrees = arctan(rise/run) × 180/π
    const angleInDegrees = Math.atan(riseVal / runVal) * (180 / Math.PI);

    setResult(slopePercent);
    setAngleResult(angleInDegrees);
    setExpression(`Rise ${riseVal} / Run ${runVal} = ${slopePercent.toFixed(2)}% (${angleInDegrees.toFixed(2)}°)`);
  };

  const calculateFromAngle = () => {
    const angleDegrees = parseFloat(angle);
    if (isNaN(angleDegrees)) return;

    // Convert to radians
    const angleRadians = angleDegrees * (Math.PI / 180);
    // Slope percentage = tan(angle) × 100
    const slopePercent = Math.tan(angleRadians) * 100;

    setResult(slopePercent);
    setAngleResult(angleDegrees);
    setExpression(`${angleDegrees}° angle = ${slopePercent.toFixed(2)}% slope`);
  };

  const calculate = () => {
    if (calculationType === 'rise-run') {
      calculateFromRiseRun();
    } else {
      calculateFromAngle();
    }
  };

  const clear = () => {
    setRise('');
    setRun('');
    setAngle('');
    setResult(null);
    setAngleResult(null);
    setExpression('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⛰</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Slope Percentage Calculator — Grade & Incline Calculator</h1>
          <p className="text-gray-600">Calculate slope as a percentage from rise/run or angle</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {expression || ' '}
          </div>
          <div className="text-3xl font-mono text-right">
            {result !== null ? `${result.toFixed(2)}%` : '0%'}
          </div>
          {angleResult !== null && calculationType === 'rise-run' && (
            <div className="text-sm text-gray-400 text-right mt-2">
              Angle: {angleResult.toFixed(2)}°
            </div>
          )}
        </div>
      </div>

      {/* Calculation Type Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Calculation Method</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setCalculationType('rise-run')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'rise-run'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rise / Run
          </button>
          <button
            onClick={() => setCalculationType('angle')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'angle'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            From Angle
          </button>
        </div>
      </div>

      {/* Input Fields */}
      {calculationType === 'rise-run' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rise (Vertical Change)
            </label>
            <input
              type="number"
              value={rise}
              onChange={(e) => setRise(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter rise (height)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Run (Horizontal Distance)
            </label>
            <input
              type="number"
              value={run}
              onChange={(e) => setRun(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter run (distance)"
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Angle (Degrees)
          </label>
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter angle in degrees"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Slope Formulas */}
      <div className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
          <span className="text-yellow-600 mr-2">📐</span>
          Slope Percentage Formulas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-yellow-900 mb-2">From Rise and Run</div>
            <div className="text-sm text-yellow-700 font-mono">Slope % = (Rise / Run) × 100</div>
            <div className="text-xs text-yellow-600 mt-1">Where rise is vertical change, run is horizontal distance</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-yellow-900 mb-2">From Angle</div>
            <div className="text-sm text-yellow-700 font-mono">Slope % = tan(angle) × 100</div>
            <div className="text-xs text-yellow-600 mt-1">Where angle is in degrees from horizontal</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-yellow-900 mb-2">To Angle</div>
            <div className="text-sm text-yellow-700 font-mono">Angle = arctan(Rise / Run)</div>
            <div className="text-xs text-yellow-600 mt-1">Convert slope to degrees</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-yellow-900 mb-2">Ratio Notation</div>
            <div className="text-sm text-yellow-700">1:10 slope = 10% grade</div>
            <div className="text-xs text-yellow-600 mt-1">Rise of 1 per 10 units of run</div>
          </div>
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💼</span>
          Common Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Construction</div>
            <div className="text-sm text-blue-700">• Roof pitch</div>
            <div className="text-sm text-blue-700">• Ramp design</div>
            <div className="text-sm text-blue-700">• Stairs and steps</div>
            <div className="text-sm text-blue-700">• Drainage systems</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Transportation</div>
            <div className="text-sm text-blue-700">• Road grades</div>
            <div className="text-sm text-blue-700">• Railway inclines</div>
            <div className="text-sm text-blue-700">• Bike paths</div>
            <div className="text-sm text-blue-700">• Runway slopes</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Outdoor Activities</div>
            <div className="text-sm text-blue-700">• Hiking trails</div>
            <div className="text-sm text-blue-700">• Ski slopes</div>
            <div className="text-sm text-blue-700">• Mountain biking</div>
            <div className="text-sm text-blue-700">• Rock climbing routes</div>
          </div>
        </div>
      </div>

      {/* Common Slopes */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💡</span>
          Common Slope Percentages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 1% = Minimum for drainage</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 2% = Gentle slope, walkways</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 5% = Moderate slope, driveways</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 8.33% = 1:12 ADA ramp maximum</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 15% = Steep road grade</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• 100% = 45° angle (1:1 ratio)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
