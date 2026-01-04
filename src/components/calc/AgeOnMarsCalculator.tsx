'use client';

import { useState } from 'react';

export default function AgeOnMarsCalculator() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>('');
  const [result, setResult] = useState<{
    earthAge: number;
    marsAge: number;
    earthDays: number;
    marsDays: number;
    comparison: {
      planet: string;
      age: number;
      year: number;
    }[];
  } | null>(null);

  // Orbital periods in Earth days
  const planetYears = {
    Mercury: 88,
    Venus: 225,
    Earth: 365.25,
    Mars: 687,
    Jupiter: 4333,
    Saturn: 10759,
    Uranus: 30687,
    Neptune: 60190
  };

  const calculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();
    
    // Calculate age in Earth days
    const earthDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    
    if (earthDays < 0) return;

    // Calculate Earth age in years
    const earthAge = earthDays / 365.25;
    
    // Calculate Mars age
    const marsAge = earthDays / planetYears.Mars;
    const marsDays = earthDays;

    // Calculate age on all planets for comparison
    const planetComparisons = Object.entries(planetYears).map(([planet, yearLength]) => ({
      planet,
      age: earthDays / yearLength,
      year: yearLength
    }));

    setResult({
      earthAge,
      marsAge,
      earthDays,
      marsDays,
      comparison: planetComparisons
    });
  };

  const clear = () => {
    setBirthDate('');
    setTargetDate('');
    setResult(null);
  };

  const formatAge = (age: number): string => {
    if (age < 1) {
      return `${(age * 12).toFixed(1)} months`;
    }
    return `${age.toFixed(2)} years`;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🚀</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">How Old Would You Be on Mars?</h1>
          <p className="text-gray-600">Calculate your age on Mars and other planets in our solar system</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculate Age As Of (optional)
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to use today&apos;s date</p>
          </div>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900 mb-2">
                    {formatAge(result.earthAge)}
                  </div>
                  <div className="text-lg text-blue-700">Age on Earth</div>
                  <div className="text-sm text-blue-600 mt-1">
                    {result.earthDays.toLocaleString()} days
                  </div>
                </div>
              </div>

              <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-900 mb-2">
                    {formatAge(result.marsAge)}
                  </div>
                  <div className="text-lg text-red-700">Age on Mars</div>
                  <div className="text-sm text-red-600 mt-1">
                    {(result.marsAge * planetYears.Mars).toFixed(0)} Mars days
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Your Age on All Planets</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {result.comparison.map((planet) => (
                  <div key={planet.planet} className="flex justify-between items-center py-2 px-3 bg-white rounded-lg">
                    <span className="font-medium">{planet.planet}:</span>
                    <span className="text-gray-600">{formatAge(planet.age)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        <div className="flex space-x-4 mt-6">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Calculate Age
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Why Different Ages */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">🌍</span>
          Why Different Ages?
        </h3>
        <div className="space-y-3 text-sm text-blue-800">
          <p>Planets orbit the Sun at different speeds and distances. The farther a planet is from the Sun, the longer its orbital period (year).</p>
          <p>Your age on any planet depends on how many times that planet has orbited the Sun since you were born.</p>
        </div>
      </div>

      {/* Planet Facts */}
      <div className="mt-8 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <span className="text-red-600 mr-2">🪐</span>
          Mars Facts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-red-900">Orbital Period</div>
            <div className="text-sm text-red-800">687 Earth days</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-red-900">Day Length</div>
            <div className="text-sm text-red-800">24 hours 37 minutes</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-red-900">Gravity</div>
            <div className="text-sm text-red-800">38% of Earth's gravity</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-red-900">Distance from Sun</div>
            <div className="text-sm text-red-800">142 million miles</div>
          </div>
        </div>
      </div>
    </div>
  );
}