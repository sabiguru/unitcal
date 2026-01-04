'use client';

import { useState } from 'react';

export default function CarbonFootprintCalculator() {
  const [electricity, setElectricity] = useState('');
  const [gas, setGas] = useState('');
  const [carMiles, setCarMiles] = useState('');
  const [carMpg, setCarMpg] = useState('');
  const [flights, setFlights] = useState('');
  const [diet, setDiet] = useState('mixed');
  const [results, setResults] = useState<any>(null);

  const emissionFactors = {
    electricity: 0.92, // lbs CO2 per kWh (US average)
    naturalGas: 11.7, // lbs CO2 per therm
    gasoline: 19.6, // lbs CO2 per gallon
    flights: {
      short: 0.24, // lbs CO2 per mile (domestic flights under 300 miles)
      medium: 0.18, // lbs CO2 per mile (300-2300 miles)
      long: 0.19 // lbs CO2 per mile (over 2300 miles)
    },
    diet: {
      vegan: 1.5, // tons CO2 per year
      vegetarian: 1.7,
      pescatarian: 1.9,
      mixed: 2.5,
      heavy_meat: 3.3
    }
  };

  const calculateCarbonFootprint = () => {
    const electricityEmissions = (parseFloat(electricity) || 0) * emissionFactors.electricity * 12;
    const gasEmissions = (parseFloat(gas) || 0) * emissionFactors.naturalGas * 12;
    
    const milesPerYear = (parseFloat(carMiles) || 0) * 12;
    const gallonsPerYear = milesPerYear / (parseFloat(carMpg) || 25);
    const carEmissions = gallonsPerYear * emissionFactors.gasoline;
    
    const flightMiles = parseFloat(flights) || 0;
    let flightEmissions = 0;
    if (flightMiles <= 300) {
      flightEmissions = flightMiles * emissionFactors.flights.short;
    } else if (flightMiles <= 2300) {
      flightEmissions = flightMiles * emissionFactors.flights.medium;
    } else {
      flightEmissions = flightMiles * emissionFactors.flights.long;
    }
    
    const dietEmissions = emissionFactors.diet[diet as keyof typeof emissionFactors.diet] * 2204; // convert tons to lbs
    
    const totalEmissions = electricityEmissions + gasEmissions + carEmissions + flightEmissions + dietEmissions;
    const totalTons = totalEmissions / 2204;
    
    // Calculate comparisons
    const treesNeeded = Math.round(totalEmissions / 48); // 48 lbs CO2 absorbed per tree per year
    const avgAmericanEmissions = 16; // tons per year
    const comparison = (totalTons / avgAmericanEmissions) * 100;
    
    // Calculate costs to offset
    const offsetCostPerTon = 15; // $15 per ton CO2 average
    const offsetCost = totalTons * offsetCostPerTon;

    setResults({
      electricity: electricityEmissions,
      gas: gasEmissions,
      car: carEmissions,
      flights: flightEmissions,
      diet: dietEmissions,
      total: totalEmissions,
      totalTons: totalTons,
      treesNeeded,
      comparison,
      offsetCost,
      breakdown: [
        { category: 'Electricity', value: electricityEmissions, percentage: (electricityEmissions / totalEmissions) * 100 },
        { category: 'Natural Gas', value: gasEmissions, percentage: (gasEmissions / totalEmissions) * 100 },
        { category: 'Transportation', value: carEmissions, percentage: (carEmissions / totalEmissions) * 100 },
        { category: 'Air Travel', value: flightEmissions, percentage: (flightEmissions / totalEmissions) * 100 },
        { category: 'Diet', value: dietEmissions, percentage: (dietEmissions / totalEmissions) * 100 }
      ].filter(item => item.value > 0)
    });
  };

  const getRecommendations = () => [
    'Switch to renewable energy sources',
    'Improve home insulation and weatherization',
    'Use public transportation or bike more often',
    'Choose more fuel-efficient vehicles',
    'Reduce meat consumption',
    'Buy local and seasonal produce',
    'Minimize air travel or purchase carbon offsets',
    'Use LED light bulbs',
    'Unplug electronics when not in use',
    'Consider a plant-based diet'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🌍</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon Footprint Calculator</h1>
          <p className="text-gray-600">Calculate your annual carbon emissions and environmental impact</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Electricity Usage (kWh)
            </label>
            <input
              type="number"
              value={electricity}
              onChange={(e) => setElectricity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Natural Gas Usage (therms)
            </label>
            <input
              type="number"
              value={gas}
              onChange={(e) => setGas(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Driving Miles
            </label>
            <input
              type="number"
              value={carMiles}
              onChange={(e) => setCarMiles(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Car Fuel Efficiency (MPG)
            </label>
            <input
              type="number"
              value={carMpg}
              onChange={(e) => setCarMpg(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Flight Miles
            </label>
            <input
              type="number"
              value={flights}
              onChange={(e) => setFlights(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="2000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Diet Type</label>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="mixed">Mixed Diet</option>
              <option value="heavy_meat">Heavy Meat Eater</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={calculateCarbonFootprint}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Carbon Footprint
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-900 mb-1">
                  {results.totalTons.toFixed(1)}
                </div>
                <div className="text-sm text-red-700">Tons CO₂/Year</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-1">
                  {results.comparison.toFixed(0)}%
                </div>
                <div className="text-sm text-blue-700">vs Avg American</div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-900 mb-1">
                  {results.treesNeeded}
                </div>
                <div className="text-sm text-green-700">Trees to Offset</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emissions Breakdown</h3>
              <div className="space-y-3">
                {results.breakdown.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{item.category}</span>
                    <div className="text-right">
                      <span className="font-medium">{(item.value / 2204).toFixed(1)} tons</span>
                      <div className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">Carbon Offset Options</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-yellow-800">Annual Offset Cost:</span>
                  <span className="font-medium text-yellow-900">${results.offsetCost.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">Monthly Cost:</span>
                  <span className="font-medium text-yellow-900">${(results.offsetCost / 12).toFixed(0)}</span>
                </div>
                <div className="text-sm text-yellow-700 mt-3">
                  Based on $15/ton CO₂ average offset price
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Reduction Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getRecommendations().map((rec, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-blue-800">
                  <span>•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-900">US Average</div>
                <div className="text-gray-600">16 tons CO₂/year</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Global Average</div>
                <div className="text-gray-600">4.8 tons CO₂/year</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Climate Goal</div>
                <div className="text-gray-600">2.3 tons CO₂/year</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}