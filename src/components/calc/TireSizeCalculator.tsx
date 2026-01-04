'use client';

import { useState } from 'react';

interface TireResults {
  original: {
    width: number;
    ratio: number;
    wheel: number;
    sidewall: number;
    diameter: number;
    circumference: number;
    revolutions: number;
    tireSize: string;
  };
  comparison: {
    tire1: {
      width: number;
      ratio: number;
      wheel: number;
      sidewall: number;
      diameter: number;
      circumference: number;
      revolutions: number;
    };
    tire2: {
      width: number;
      ratio: number;
      wheel: number;
      sidewall: number;
      diameter: number;
      circumference: number;
      revolutions: number;
    };
    differences: {
      diameter: number;
      diameterPercentage: number;
      circumference: number;
      circumferencePercentage: number;
    };
    actualSpeeds: {
      indicated: number;
      actual: number;
      difference: number;
    } | null;
  } | null;
}

export default function TireSizeCalculator() {
  const [tireWidth1, setTireWidth1] = useState('');
  const [aspectRatio1, setAspectRatio1] = useState('');
  const [wheelDiameter1, setWheelDiameter1] = useState('');
  const [tireWidth2, setTireWidth2] = useState('');
  const [aspectRatio2, setAspectRatio2] = useState('');
  const [wheelDiameter2, setWheelDiameter2] = useState('');
  const [speedometer, setSpeedometer] = useState('');
  const [results, setResults] = useState<TireResults | null>(null);

  const calculateTireSize = () => {
    const width1 = parseFloat(tireWidth1);
    const ratio1 = parseFloat(aspectRatio1);
    const wheel1 = parseFloat(wheelDiameter1);
    const width2 = parseFloat(tireWidth2);
    const ratio2 = parseFloat(aspectRatio2);
    const wheel2 = parseFloat(wheelDiameter2);

    if (!width1 || !ratio1 || !wheel1) return;

    // Calculate original tire dimensions
    const sidewallHeight1 = (width1 * ratio1) / 100;
    const tireDiameter1 = (wheel1 * 25.4) + (2 * sidewallHeight1); // Convert wheel to mm and add sidewalls
    const circumference1 = Math.PI * tireDiameter1;
    const revolutionsPerMile1 = 1609344 / circumference1; // mm per mile

    let comparison = null;
    if (width2 && ratio2 && wheel2) {
      const sidewallHeight2 = (width2 * ratio2) / 100;
      const tireDiameter2 = (wheel2 * 25.4) + (2 * sidewallHeight2);
      const circumference2 = Math.PI * tireDiameter2;
      const revolutionsPerMile2 = 1609344 / circumference2;
      
      const diameterDifference = tireDiameter2 - tireDiameter1;
      const diameterPercentage = (diameterDifference / tireDiameter1) * 100;
      const circumferenceDifference = circumference2 - circumference1;
      const circumferencePercentage = (circumferenceDifference / circumference1) * 100;

      // Speedometer calculations
      let actualSpeeds = null;
      if (speedometer) {
        const speed = parseFloat(speedometer);
        const actualSpeed = speed * (circumference2 / circumference1);
        const speedDifference = actualSpeed - speed;
        actualSpeeds = {
          indicated: speed,
          actual: actualSpeed,
          difference: speedDifference
        };
      }

      comparison = {
        tire1: {
          width: width1,
          ratio: ratio1,
          wheel: wheel1,
          sidewall: sidewallHeight1,
          diameter: tireDiameter1,
          circumference: circumference1,
          revolutions: revolutionsPerMile1
        },
        tire2: {
          width: width2,
          ratio: ratio2,
          wheel: wheel2,
          sidewall: sidewallHeight2,
          diameter: tireDiameter2,
          circumference: circumference2,
          revolutions: revolutionsPerMile2
        },
        differences: {
          diameter: diameterDifference,
          diameterPercentage: diameterPercentage,
          circumference: circumferenceDifference,
          circumferencePercentage: circumferencePercentage
        },
        actualSpeeds
      };
    }

    setResults({
      original: {
        width: width1,
        ratio: ratio1,
        wheel: wheel1,
        sidewall: sidewallHeight1,
        diameter: tireDiameter1,
        circumference: circumference1,
        revolutions: revolutionsPerMile1,
        tireSize: `${width1}/${ratio1}R${wheel1}`
      },
      comparison
    });
  };

  const getTireRecommendations = (width: number, ratio: number, wheel: number) => {
    const alternatives = [];
    
    // Plus sizing recommendations (larger wheel, lower profile)
    if (wheel < 20) {
      const newWheel = wheel + 1;
      const newRatio = Math.round(ratio * 0.9);
      alternatives.push({
        type: 'Plus 1',
        size: `${width}/${newRatio}R${newWheel}`,
        description: 'Larger wheel, lower profile for sportier look'
      });
    }

    // Wider tire options
    const widerWidth = width + 10;
    const adjustedRatio = Math.round(ratio * 0.95);
    alternatives.push({
      type: 'Wider',
      size: `${widerWidth}/${adjustedRatio}R${wheel}`,
      description: 'Wider tire for better grip'
    });

    // Higher profile for comfort
    if (ratio < 70) {
      const higherRatio = ratio + 10;
      alternatives.push({
        type: 'Comfort',
        size: `${width}/${higherRatio}R${wheel}`,
        description: 'Higher profile for more comfortable ride'
      });
    }

    return alternatives;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-black rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🛞</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tire Size Calculator</h1>
          <p className="text-gray-600">Compare tire sizes and calculate speedometer differences</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Original Tire */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Original Tire Size</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tire Width (mm)</label>
              <input
                type="number"
                value={tireWidth1}
                onChange={(e) => setTireWidth1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="225"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio (%)</label>
              <input
                type="number"
                value={aspectRatio1}
                onChange={(e) => setAspectRatio1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wheel Diameter (in)</label>
              <input
                type="number"
                value={wheelDiameter1}
                onChange={(e) => setWheelDiameter1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="16"
              />
            </div>
          </div>
        </div>

        {/* Comparison Tire */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare With (Optional)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tire Width (mm)</label>
              <input
                type="number"
                value={tireWidth2}
                onChange={(e) => setTireWidth2(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="245"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio (%)</label>
              <input
                type="number"
                value={aspectRatio2}
                onChange={(e) => setAspectRatio2(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="45"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wheel Diameter (in)</label>
              <input
                type="number"
                value={wheelDiameter2}
                onChange={(e) => setWheelDiameter2(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="17"
              />
            </div>
          </div>
        </div>

        {/* Speedometer Check */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Speedometer Accuracy Check</h3>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-2">Speedometer Reading (mph)</label>
            <input
              type="number"
              value={speedometer}
              onChange={(e) => setSpeedometer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="60"
            />
          </div>
        </div>
      </div>

      <button
        onClick={calculateTireSize}
        className="w-full mt-8 bg-gradient-to-r from-gray-700 to-black text-white py-4 px-6 rounded-lg font-medium hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Tire Specifications
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Original Tire: {results.original.tireSize}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-gray-900">{results.original.sidewall.toFixed(1)}mm</div>
                <div className="text-gray-600">Sidewall Height</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{(results.original.diameter / 25.4).toFixed(1)}"</div>
                <div className="text-gray-600">Overall Diameter</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{(results.original.circumference / 25.4).toFixed(1)}"</div>
                <div className="text-gray-600">Circumference</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{results.original.revolutions.toFixed(0)}</div>
                <div className="text-gray-600">Rev/Mile</div>
              </div>
            </div>
          </div>

          {results.comparison && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Comparison Tire: {results.comparison.tire2.width}/{results.comparison.tire2.ratio}R{results.comparison.tire2.wheel}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-blue-900">{results.comparison.tire2.sidewall.toFixed(1)}mm</div>
                    <div className="text-blue-700">Sidewall Height</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-900">{(results.comparison.tire2.diameter / 25.4).toFixed(1)}"</div>
                    <div className="text-blue-700">Overall Diameter</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-900">{(results.comparison.tire2.circumference / 25.4).toFixed(1)}"</div>
                    <div className="text-blue-700">Circumference</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-900">{results.comparison.tire2.revolutions.toFixed(0)}</div>
                    <div className="text-blue-700">Rev/Mile</div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">Differences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Diameter Difference:</span>
                    <span className="font-medium">
                      {results.comparison.differences.diameter > 0 ? '+' : ''}{(results.comparison.differences.diameter / 25.4).toFixed(2)}" 
                      ({results.comparison.differences.diameterPercentage > 0 ? '+' : ''}{results.comparison.differences.diameterPercentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Circumference Difference:</span>
                    <span className="font-medium">
                      {results.comparison.differences.circumference > 0 ? '+' : ''}{(results.comparison.differences.circumference / 25.4).toFixed(2)}" 
                      ({results.comparison.differences.circumferencePercentage > 0 ? '+' : ''}{results.comparison.differences.circumferencePercentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {results.comparison.actualSpeeds && (
                  <div className="mt-4 pt-4 border-t border-yellow-200">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-yellow-900">
                        When speedometer reads {results.comparison.actualSpeeds.indicated}mph, 
                        actual speed is {results.comparison.actualSpeeds.actual.toFixed(1)}mph
                      </div>
                      <div className="text-sm text-yellow-700 mt-1">
                        Difference: {results.comparison.actualSpeeds.difference > 0 ? '+' : ''}{results.comparison.actualSpeeds.difference.toFixed(1)}mph
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {results.original && (
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Alternative Tire Sizes</h3>
              <div className="space-y-3">
                {getTireRecommendations(results.original.width, results.original.ratio, results.original.wheel).map((alt, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-green-900">{alt.size}</div>
                      <div className="text-sm text-green-700">{alt.description}</div>
                    </div>
                    <div className="text-sm font-medium text-green-800">{alt.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}