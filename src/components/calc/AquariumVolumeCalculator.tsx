'use client';

import { useState } from 'react';

export default function AquariumVolumeCalculator() {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [shape, setShape] = useState<'rectangular' | 'cylindrical' | 'bow-front'>('rectangular');
  const [unit, setUnit] = useState<'inches' | 'feet' | 'centimeters' | 'meters'>('inches');
  const [waterLevel, setWaterLevel] = useState<string>('90');
  const [result, setResult] = useState<any>(null);

  const convertToInches = (value: number, fromUnit: string): number => {
    switch (fromUnit) {
      case 'inches': return value;
      case 'feet': return value * 12;
      case 'centimeters': return value / 2.54;
      case 'meters': return value * 39.3701;
      default: return value;
    }
  };

  const calculateVolume = () => {
    const lengthNum = parseFloat(length);
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);
    const waterLevelPercent = parseFloat(waterLevel) / 100;

    if (isNaN(lengthNum) || isNaN(widthNum) || isNaN(heightNum)) return;

    // Convert all measurements to inches
    const lengthInches = convertToInches(lengthNum, unit);
    const widthInches = convertToInches(widthNum, unit);
    const heightInches = convertToInches(heightNum, unit);

    let volumeCubicInches = 0;

    switch (shape) {
      case 'rectangular':
        volumeCubicInches = lengthInches * widthInches * heightInches;
        break;
      case 'cylindrical':
        const radius = lengthInches / 2;
        volumeCubicInches = Math.PI * radius * radius * heightInches;
        break;
      case 'bow-front':
        volumeCubicInches = lengthInches * widthInches * heightInches * 1.05;
        break;
    }

    // Apply water level percentage
    volumeCubicInches = volumeCubicInches * waterLevelPercent;

    // Convert to different units
    const volumeGallons = volumeCubicInches / 231;
    const volumeLiters = volumeGallons * 3.78541;
    const volumeCubicFeet = volumeCubicInches / 1728;

    // Calculate weights
    const waterWeight = volumeGallons * 8.34;
    const gravelWeight = volumeGallons * 1.5;
    const totalWeight = waterWeight + gravelWeight;

    // Equipment recommendations
    const fishCapacity = Math.floor(volumeGallons / 10) + " medium fish";
    const filterRecommendation = `${Math.ceil(volumeGallons * 4)} GPH filter`;
    const heaterRecommendation = `${Math.ceil(volumeGallons * 3)} watt heater`;

    setResult({
      volume: {
        gallons: volumeGallons,
        liters: volumeLiters,
        cubicInches: volumeCubicInches,
        cubicFeet: volumeCubicFeet
      },
      weight: {
        water: waterWeight,
        gravel: gravelWeight,
        total: totalWeight
      },
      recommendations: {
        fish: fishCapacity,
        filter: filterRecommendation,
        heater: heaterRecommendation
      }
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🐠</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Aquarium Volume Calculator</h1>
          <p className="text-gray-600">Calculate aquarium volume, water weight, and equipment recommendations</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
        {/* Shape Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tank Shape</label>
          <div className="grid grid-cols-3 gap-4">
            {(['rectangular', 'cylindrical', 'bow-front'] as const).map((shapeOption) => (
              <button
                key={shapeOption}
                onClick={() => setShape(shapeOption)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  shape === shapeOption
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {shapeOption.charAt(0).toUpperCase() + shapeOption.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
          <div className="grid grid-cols-4 gap-4">
            {(['inches', 'feet', 'centimeters', 'meters'] as const).map((unitOption) => (
              <button
                key={unitOption}
                onClick={() => setUnit(unitOption)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  unit === unitOption
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {unitOption}
              </button>
            ))}
          </div>
        </div>

        {/* Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {shape === 'cylindrical' ? 'Diameter' : 'Length'} ({unit})
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="48"
            />
          </div>

          {shape !== 'cylindrical' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width ({unit})</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height ({unit})</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="20"
            />
          </div>
        </div>

        {/* Water Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Water Level (%)</label>
          <input
            type="number"
            min="1"
            max="100"
            value={waterLevel}
            onChange={(e) => setWaterLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="90"
          />
        </div>

        <button
          onClick={calculateVolume}
          className="w-full bg-gradient-to-r from-blue-500 to-teal-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate Volume
        </button>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Volume Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{result.volume.gallons.toFixed(1)}</div>
                  <div className="text-sm text-blue-700">Gallons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{result.volume.liters.toFixed(1)}</div>
                  <div className="text-sm text-blue-700">Liters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{result.volume.cubicFeet.toFixed(2)}</div>
                  <div className="text-sm text-blue-700">Cubic Feet</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{result.volume.cubicInches.toFixed(0)}</div>
                  <div className="text-sm text-blue-700">Cubic Inches</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Weight Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Water weight:</span>
                    <span className="font-medium">{result.weight.water.toFixed(1)} lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gravel weight (approx):</span>
                    <span className="font-medium">{result.weight.gravel.toFixed(1)} lbs</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total weight:</span>
                    <span>{result.weight.total.toFixed(1)} lbs</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Equipment Recommendations</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Fish capacity:</span> {result.recommendations.fish}
                  </div>
                  <div>
                    <span className="font-medium">Filter:</span> {result.recommendations.filter}
                  </div>
                  <div>
                    <span className="font-medium">Heater:</span> {result.recommendations.heater}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}