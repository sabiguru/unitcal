'use client';

import { useState } from 'react';

export default function CoffeeRatioCalculator() {
  const [brewMethod, setBrewMethod] = useState('drip');
  const [coffeeAmount, setCoffeeAmount] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const [calculationType, setCalculationType] = useState('coffee-to-water');
  const [results, setResults] = useState<any>(null);

  const brewMethods = {
    'drip': { ratio: 15, name: 'Drip Coffee', strength: 'Medium' },
    'espresso': { ratio: 2, name: 'Espresso', strength: 'Strong' },
    'french-press': { ratio: 12, name: 'French Press', strength: 'Medium-Strong' },
    'pour-over': { ratio: 16, name: 'Pour Over', strength: 'Light-Medium' },
    'cold-brew': { ratio: 8, name: 'Cold Brew', strength: 'Strong' },
    'aeropress': { ratio: 14, name: 'AeroPress', strength: 'Medium' }
  };

  const calculateCoffeeRatio = () => {
    const coffee = parseFloat(coffeeAmount);
    const water = parseFloat(waterAmount);
    const method = brewMethods[brewMethod as keyof typeof brewMethods];

    if (calculationType === 'coffee-to-water' && coffee) {
      const requiredWater = coffee * method.ratio;
      const waterOunces = requiredWater / 29.5735; // ml to fl oz
      const waterCups = requiredWater / 240; // ml to cups
      
      setResults({
        coffeeGrams: coffee,
        waterMl: requiredWater,
        waterOunces: waterOunces,
        waterCups: waterCups,
        ratio: `1:${method.ratio}`,
        method: method.name,
        strength: method.strength
      });
    } else if (calculationType === 'water-to-coffee' && water) {
      const requiredCoffee = water / method.ratio;
      const coffeeOunces = requiredCoffee / 28.35; // grams to oz
      const coffeeTablespoons = requiredCoffee / 6; // approx 6g per tbsp
      
      setResults({
        coffeeGrams: requiredCoffee,
        coffeeOunces: coffeeOunces,
        coffeeTablespoons: coffeeTablespoons,
        waterMl: water,
        ratio: `1:${method.ratio}`,
        method: method.name,
        strength: method.strength
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">☕</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Coffee Ratio Calculator</h1>
          <p className="text-gray-600">Perfect coffee brewing ratios for every method</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brew Method</label>
          <select
            value={brewMethod}
            onChange={(e) => setBrewMethod(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {Object.entries(brewMethods).map(([key, method]) => (
              <option key={key} value={key}>{method.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Calculate From</label>
          <select
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="coffee-to-water">Coffee Amount → Water Needed</option>
            <option value="water-to-coffee">Water Amount → Coffee Needed</option>
          </select>
        </div>

        {calculationType === 'coffee-to-water' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Coffee Amount (grams)</label>
            <input
              type="number"
              value={coffeeAmount}
              onChange={(e) => setCoffeeAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="30"
            />
          </div>
        )}

        {calculationType === 'water-to-coffee' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Water Amount (ml)</label>
            <input
              type="number"
              value={waterAmount}
              onChange={(e) => setWaterAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="480"
            />
          </div>
        )}
      </div>

      <button
        onClick={calculateCoffeeRatio}
        className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white py-4 px-6 rounded-lg font-medium hover:from-amber-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Perfect Ratio
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Perfect {results.method} Recipe</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-900 mb-1">
                  {results.coffeeGrams.toFixed(1)}g
                </div>
                <div className="text-sm text-amber-700">Coffee</div>
                {results.coffeeOunces && (
                  <div className="text-xs text-amber-600 mt-1">
                    {results.coffeeOunces.toFixed(1)}oz • {results.coffeeTablespoons.toFixed(1)} tbsp
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-900 mb-1">
                  {results.waterMl.toFixed(0)}ml
                </div>
                <div className="text-sm text-amber-700">Water</div>
                {results.waterOunces && (
                  <div className="text-xs text-amber-600 mt-1">
                    {results.waterOunces.toFixed(1)}fl oz • {results.waterCups.toFixed(1)} cups
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mt-4 pt-4 border-t border-amber-200">
              <div className="text-lg font-semibold text-amber-900">
                Ratio: {results.ratio} • Strength: {results.strength}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Brewing Guide for {results.method}</h3>
            <div className="space-y-3 text-sm">
              {brewMethod === 'drip' && (
                <>
                  <p>• Use medium grind coffee</p>
                  <p>• Water temperature: 195-205°F (90-96°C)</p>
                  <p>• Brewing time: 4-6 minutes</p>
                </>
              )}
              {brewMethod === 'espresso' && (
                <>
                  <p>• Use fine grind coffee</p>
                  <p>• Water temperature: 190-196°F (88-91°C)</p>
                  <p>• Extraction time: 25-30 seconds</p>
                </>
              )}
              {brewMethod === 'french-press' && (
                <>
                  <p>• Use coarse grind coffee</p>
                  <p>• Water temperature: 195-205°F (90-96°C)</p>
                  <p>• Steeping time: 4 minutes</p>
                </>
              )}
              {brewMethod === 'pour-over' && (
                <>
                  <p>• Use medium-fine grind coffee</p>
                  <p>• Water temperature: 195-205°F (90-96°C)</p>
                  <p>• Total brew time: 2:30-4:00 minutes</p>
                </>
              )}
              {brewMethod === 'cold-brew' && (
                <>
                  <p>• Use coarse grind coffee</p>
                  <p>• Room temperature or cold water</p>
                  <p>• Steeping time: 12-24 hours</p>
                </>
              )}
              {brewMethod === 'aeropress' && (
                <>
                  <p>• Use medium-fine grind coffee</p>
                  <p>• Water temperature: 185-195°F (85-90°C)</p>
                  <p>• Brewing time: 1-2 minutes</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}