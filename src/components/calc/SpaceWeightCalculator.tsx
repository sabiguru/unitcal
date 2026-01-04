'use client';

import { useState } from 'react';

export default function SpaceWeightCalculator() {
  const [earthWeight, setEarthWeight] = useState('');
  const [unit, setUnit] = useState('lbs');
  const [results, setResults] = useState<any>(null);

  const celestialBodies = {
    mercury: { name: 'Mercury', gravity: 3.7, emoji: '☷️', description: 'Closest to the Sun' },
    venus: { name: 'Venus', gravity: 8.87, emoji: '♀️', description: 'Hottest planet' },
    earth: { name: 'Earth', gravity: 9.8, emoji: '🌍', description: 'Our home planet' },
    mars: { name: 'Mars', gravity: 3.71, emoji: '♂️', description: 'The Red Planet' },
    jupiter: { name: 'Jupiter', gravity: 24.79, emoji: '♃', description: 'Largest planet' },
    saturn: { name: 'Saturn', gravity: 10.44, emoji: '♄', description: 'Ring system' },
    uranus: { name: 'Uranus', gravity: 8.69, emoji: '♅', description: 'Ice giant' },
    neptune: { name: 'Neptune', gravity: 11.15, emoji: '♆', description: 'Windiest planet' },
    moon: { name: 'Moon', gravity: 1.62, emoji: '🌙', description: 'Earth\'s satellite' },
    sun: { name: 'Sun', gravity: 274, emoji: '☀️', description: 'Our star' },
    pluto: { name: 'Pluto', gravity: 0.62, emoji: '♇', description: 'Dwarf planet' },
    io: { name: 'Io', gravity: 1.796, emoji: '🌋', description: 'Jupiter\'s volcanic moon' },
    europa: { name: 'Europa', gravity: 1.314, emoji: '🧊', description: 'Jupiter\'s icy moon' },
    titan: { name: 'Titan', gravity: 1.352, emoji: '🪐', description: 'Saturn\'s largest moon' }
  };

  const calculateWeights = () => {
    const weight = parseFloat(earthWeight);
    if (!weight || weight <= 0) return;

    // Convert to kg if input is in lbs
    const weightInKg = unit === 'lbs' ? weight * 0.453592 : weight;
    
    // Calculate mass (mass = weight / gravity)
    const mass = weightInKg / 9.8; // Earth's gravity is 9.8 m/s²

    const calculations = Object.entries(celestialBodies).map(([key, body]) => {
      const weightOnBody = mass * body.gravity;
      const weightInOriginalUnit = unit === 'lbs' ? weightOnBody * 2.20462 : weightOnBody;
      
      return {
        key,
        name: body.name,
        emoji: body.emoji,
        description: body.description,
        gravity: body.gravity,
        weight: weightInOriginalUnit,
        ratio: body.gravity / 9.8
      };
    });

    // Sort by weight
    calculations.sort((a, b) => a.weight - b.weight);

    const earthData = calculations.find(c => c.key === 'earth');
    const lightest = calculations[0];
    const heaviest = calculations[calculations.length - 1];

    setResults({
      originalWeight: weight,
      unit,
      mass,
      calculations,
      earthData,
      lightest,
      heaviest,
      funFacts: generateFunFacts(calculations, weight, unit)
    });
  };

  const generateFunFacts = (calculations: any[], originalWeight: number, unit: string) => {
    const sunWeight = calculations.find(c => c.key === 'sun')?.weight || 0;
    const moonWeight = calculations.find(c => c.key === 'moon')?.weight || 0;
    const jupiterWeight = calculations.find(c => c.key === 'jupiter')?.weight || 0;
    
    return [
      `On the Sun, you'd weigh ${Math.round(sunWeight)} ${unit} - that's ${Math.round(sunWeight / originalWeight)}x heavier!`,
      `On the Moon, you'd weigh only ${Math.round(moonWeight)} ${unit} - about 1/6th of your Earth weight`,
      `Jupiter would make you feel ${Math.round(jupiterWeight / originalWeight * 10) / 10}x heavier`,
      `Your mass (${Math.round(calculations.find(c => c.key === 'earth')?.weight || 0 / 9.8 * 100) / 100} kg) stays the same everywhere`
    ];
  };

  const clear = () => {
    setEarthWeight('');
    setResults(null);
  };

  const formatWeight = (weight: number, unit: string) => {
    return `${Math.round(weight * 100) / 100} ${unit}`;
  };

  const getWeightCategory = (ratio: number) => {
    if (ratio < 0.2) return { category: 'Ultra Light', color: 'bg-blue-50 border-blue-200 text-blue-900' };
    if (ratio < 0.5) return { category: 'Very Light', color: 'bg-green-50 border-green-200 text-green-900' };
    if (ratio < 0.9) return { category: 'Light', color: 'bg-yellow-50 border-yellow-200 text-yellow-900' };
    if (ratio < 1.1) return { category: 'Earth-like', color: 'bg-gray-50 border-gray-200 text-gray-900' };
    if (ratio < 2) return { category: 'Heavy', color: 'bg-orange-50 border-orange-200 text-orange-900' };
    return { category: 'Very Heavy', color: 'bg-red-50 border-red-200 text-red-900' };
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🚀</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Space Weight Calculator — Planet & Moon Weight Calculator</h1>
          <p className="text-gray-600">Discover how much you would weigh on different planets and moons</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Weight on Earth</label>
              <input
                type="number"
                value={earthWeight}
                onChange={(e) => setEarthWeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="lbs">Pounds (lbs)</option>
                <option value="kg">Kilograms (kg)</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={calculateWeights}
              disabled={!earthWeight}
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🌌 Calculate Space Weights
            </button>
            <button
              onClick={clear}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>

          {results && (
            <div className="mt-8 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-900 mb-1">
                      {results.lightest.emoji} {formatWeight(results.lightest.weight, results.unit)}
                    </div>
                    <div className="text-xs text-blue-700">Lightest: {results.lightest.name}</div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-900 mb-1">
                      {results.earthData.emoji} {formatWeight(results.earthData.weight, results.unit)}
                    </div>
                    <div className="text-xs text-green-700">Earth Weight</div>
                  </div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-900 mb-1">
                      {results.heaviest.emoji} {formatWeight(results.heaviest.weight, results.unit)}
                    </div>
                    <div className="text-xs text-red-700">Heaviest: {results.heaviest.name}</div>
                  </div>
                </div>
              </div>

              {/* All Celestial Bodies */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Weight Throughout the Solar System</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.calculations.map((calc: any) => {
                    const weightCat = getWeightCategory(calc.ratio);
                    return (
                      <div key={calc.key} className={`rounded-lg p-4 border ${weightCat.color}`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{calc.emoji}</div>
                          <h4 className="font-semibold text-sm mb-1">{calc.name}</h4>
                          <div className="text-lg font-bold mb-1">
                            {formatWeight(calc.weight, results.unit)}
                          </div>
                          <div className="text-xs opacity-75 mb-2">
                            {Math.round(calc.ratio * 100)}% of Earth weight
                          </div>
                          <div className="text-xs opacity-60">{calc.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Extreme Weights */}
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="text-indigo-600 mr-2">⚖️</span>
          Extreme Weights
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm text-indigo-800">
          <div className="flex flex-col items-center py-2 px-3 bg-white rounded-lg">
            <span className="text-lg">☀️</span>
            <span className="font-medium">Sun</span>
            <span className="text-xs">28× heavier!</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 bg-white rounded-lg">
            <span className="text-lg">♃</span>
            <span className="font-medium">Jupiter</span>
            <span className="text-xs">2.5× heavier</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 bg-white rounded-lg">
            <span className="text-lg">🌍</span>
            <span className="font-medium">Earth</span>
            <span className="text-xs">Reference (1×)</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 bg-white rounded-lg">
            <span className="text-lg">🌙</span>
            <span className="font-medium">Moon</span>
            <span className="text-xs">6× lighter</span>
          </div>
          <div className="flex flex-col items-center py-2 px-3 bg-white rounded-lg">
            <span className="text-lg">♇</span>
            <span className="font-medium">Pluto</span>
            <span className="text-xs">16× lighter</span>
          </div>
        </div>
      </div>

      {/* Understanding Weight vs Mass */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-blue-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">🧠</span>
          Understanding Weight vs Mass
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-green-900">Weight</div>
            <div className="text-sm text-green-800">Force due to gravity (changes by location)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-green-900">Mass</div>
            <div className="text-sm text-green-800">Amount of matter (stays constant)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-green-900">Gravity</div>
            <div className="text-sm text-green-800">Acceleration due to planet's mass</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-green-900">Formula</div>
            <div className="text-sm text-green-800">Weight = Mass × Gravity</div>
          </div>
        </div>
      </div>
    </div>
  );
}