'use client';

import { useState } from 'react';

export default function HomeEnergyAuditCalculator() {
  const [homeSize, setHomeSize] = useState('');
  const [homeAge, setHomeAge] = useState('');
  const [insulation, setInsulation] = useState('fair');
  const [windows, setWindows] = useState('single');
  const [hvacAge, setHvacAge] = useState('');
  const [thermostatType, setThermostatType] = useState('manual');
  const [lightingType, setLightingType] = useState('incandescent');
  const [applianceAge, setApplianceAge] = useState('mixed');
  const [waterHeaterType, setWaterHeaterType] = useState('electric');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [electricityRate, setElectricityRate] = useState('0.13');
  const [results, setResults] = useState<any>(null);

  const auditHome = () => {
    const size = parseFloat(homeSize);
    const age = parseInt(homeAge);
    const hvacYears = parseInt(hvacAge);
    const bill = parseFloat(monthlyBill);
    const rate = parseFloat(electricityRate);
    
    if (!size || !age || !bill) return;

    // Calculate baseline energy usage
    const baselineKWh = bill / rate;
    const kwhPerSqFt = baselineKWh / size;
    
    // Efficiency scoring (0-100)
    let efficiencyScore = 50; // Start with baseline
    let recommendations = [];
    let potentialSavings = [];
    
    // Home age factor
    if (age < 10) efficiencyScore += 15;
    else if (age < 20) efficiencyScore += 5;
    else if (age > 30) efficiencyScore -= 10;
    
    // Insulation assessment
    const insulationScores = { excellent: 20, good: 10, fair: 0, poor: -15 };
    efficiencyScore += insulationScores[insulation as keyof typeof insulationScores];
    
    if (insulation === 'poor' || insulation === 'fair') {
      recommendations.push({
        category: 'Insulation',
        description: 'Upgrade insulation to reduce heating/cooling costs',
        savings: '$200-500/year',
        priority: 'High'
      });
      potentialSavings.push({ item: 'Insulation Upgrade', annual: 350 });
    }
    
    // Windows assessment
    const windowScores = { triple: 15, double: 5, single: -10 };
    efficiencyScore += windowScores[windows as keyof typeof windowScores];
    
    if (windows === 'single') {
      recommendations.push({
        category: 'Windows',
        description: 'Replace single-pane windows with double or triple-pane',
        savings: '$150-300/year',
        priority: 'Medium'
      });
      potentialSavings.push({ item: 'Window Replacement', annual: 225 });
    }
    
    // HVAC assessment
    if (hvacYears > 15) {
      efficiencyScore -= 10;
      recommendations.push({
        category: 'HVAC',
        description: 'Consider upgrading to energy-efficient HVAC system',
        savings: '$300-600/year',
        priority: 'High'
      });
      potentialSavings.push({ item: 'HVAC Upgrade', annual: 450 });
    } else if (hvacYears > 10) {
      efficiencyScore -= 5;
    }
    
    // Thermostat assessment
    if (thermostatType === 'manual') {
      efficiencyScore -= 5;
      recommendations.push({
        category: 'Thermostat',
        description: 'Install programmable or smart thermostat',
        savings: '$100-200/year',
        priority: 'Medium'
      });
      potentialSavings.push({ item: 'Smart Thermostat', annual: 150 });
    } else if (thermostatType === 'programmable') {
      efficiencyScore += 5;
    } else if (thermostatType === 'smart') {
      efficiencyScore += 10;
    }
    
    // Lighting assessment
    if (lightingType === 'incandescent') {
      efficiencyScore -= 10;
      recommendations.push({
        category: 'Lighting',
        description: 'Replace incandescent bulbs with LED',
        savings: '$75-150/year',
        priority: 'Low'
      });
      potentialSavings.push({ item: 'LED Lighting', annual: 112 });
    } else if (lightingType === 'cfl') {
      efficiencyScore -= 5;
      recommendations.push({
        category: 'Lighting',
        description: 'Upgrade CFL to LED bulbs',
        savings: '$50-100/year',
        priority: 'Low'
      });
      potentialSavings.push({ item: 'CFL to LED Upgrade', annual: 75 });
    } else if (lightingType === 'led') {
      efficiencyScore += 10;
    }
    
    // Appliance assessment
    if (applianceAge === 'old') {
      efficiencyScore -= 15;
      recommendations.push({
        category: 'Appliances',
        description: 'Replace old appliances with ENERGY STAR certified models',
        savings: '$200-400/year',
        priority: 'Medium'
      });
      potentialSavings.push({ item: 'Appliance Upgrades', annual: 300 });
    } else if (applianceAge === 'mixed') {
      efficiencyScore -= 5;
    } else if (applianceAge === 'new') {
      efficiencyScore += 10;
    }
    
    // Water heater assessment
    if (waterHeaterType === 'electric') {
      recommendations.push({
        category: 'Water Heater',
        description: 'Consider tankless or heat pump water heater',
        savings: '$100-250/year',
        priority: 'Medium'
      });
      potentialSavings.push({ item: 'Water Heater Upgrade', annual: 175 });
    }
    
    // Additional recommendations
    recommendations.push(
      {
        category: 'Air Sealing',
        description: 'Seal air leaks around windows, doors, and ducts',
        savings: '$50-150/year',
        priority: 'High'
      },
      {
        category: 'Maintenance',
        description: 'Regular HVAC filter changes and system maintenance',
        savings: '$75-125/year',
        priority: 'High'
      }
    );
    
    potentialSavings.push(
      { item: 'Air Sealing', annual: 100 },
      { item: 'HVAC Maintenance', annual: 100 }
    );
    
    // Calculate potential total savings
    const totalPotentialSavings = potentialSavings.reduce((sum, saving) => sum + saving.annual, 0);
    const potentialNewBill = Math.max(bill - (totalPotentialSavings / 12), bill * 0.3);
    
    // Energy efficiency rating
    let rating = 'F';
    let ratingColor = 'red';
    
    if (efficiencyScore >= 80) { rating = 'A'; ratingColor = 'green'; }
    else if (efficiencyScore >= 70) { rating = 'B'; ratingColor = 'lime'; }
    else if (efficiencyScore >= 60) { rating = 'C'; ratingColor = 'yellow'; }
    else if (efficiencyScore >= 50) { rating = 'D'; ratingColor = 'orange'; }
    else if (efficiencyScore >= 40) { rating = 'E'; ratingColor = 'red'; }
    
    // Comparison with similar homes
    const avgKwhPerSqFt = size < 1500 ? 8 : size < 2500 ? 7 : 6;
    const vsAverage = ((kwhPerSqFt - avgKwhPerSqFt) / avgKwhPerSqFt) * 100;
    
    setResults({
      efficiencyScore: Math.max(0, Math.min(100, efficiencyScore)),
      rating,
      ratingColor,
      currentKwh: baselineKWh,
      kwhPerSqFt,
      vsAverage,
      recommendations: recommendations.sort((a, b) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      }),
      potentialSavings,
      totalPotentialSavings,
      potentialNewBill,
      annualSavingsPercent: (totalPotentialSavings / (bill * 12)) * 100
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🏠</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Home Energy Audit Calculator</h1>
          <p className="text-gray-600">Evaluate your home's energy efficiency and get improvement recommendations</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Home Size (sq ft)</label>
            <input
              type="number"
              value={homeSize}
              onChange={(e) => setHomeSize(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Home Age (years)</label>
            <input
              type="number"
              value={homeAge}
              onChange={(e) => setHomeAge(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="15"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Insulation Quality</label>
            <select
              value={insulation}
              onChange={(e) => setInsulation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Window Type</label>
            <select
              value={windows}
              onChange={(e) => setWindows(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="triple">Triple-pane</option>
              <option value="double">Double-pane</option>
              <option value="single">Single-pane</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">HVAC System Age (years)</label>
            <input
              type="number"
              value={hvacAge}
              onChange={(e) => setHvacAge(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thermostat Type</label>
            <select
              value={thermostatType}
              onChange={(e) => setThermostatType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="smart">Smart Thermostat</option>
              <option value="programmable">Programmable</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Lighting Type</label>
            <select
              value={lightingType}
              onChange={(e) => setLightingType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="led">LED</option>
              <option value="cfl">CFL</option>
              <option value="incandescent">Incandescent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Appliance Age</label>
            <select
              value={applianceAge}
              onChange={(e) => setApplianceAge(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="new">Mostly New (0-5 years)</option>
              <option value="mixed">Mixed Ages</option>
              <option value="old">Mostly Old (10+ years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Water Heater Type</label>
            <select
              value={waterHeaterType}
              onChange={(e) => setWaterHeaterType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="tankless">Tankless</option>
              <option value="electric">Electric Tank</option>
              <option value="gas">Gas Tank</option>
              <option value="heat_pump">Heat Pump</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average Monthly Electric Bill ($)</label>
            <input
              type="number"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Electricity Rate ($/kWh)</label>
            <input
              type="number"
              step="0.001"
              value={electricityRate}
              onChange={(e) => setElectricityRate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.13"
            />
          </div>
        </div>
      </div>

      <button
        onClick={auditHome}
        className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Perform Energy Audit
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`bg-${results.ratingColor}-50 rounded-xl p-6 border border-${results.ratingColor}-200`}>
              <div className="text-center">
                <div className={`text-3xl font-bold text-${results.ratingColor}-900 mb-1`}>
                  {results.rating}
                </div>
                <div className={`text-sm text-${results.ratingColor}-700`}>Energy Rating</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {results.efficiencyScore}
                </div>
                <div className="text-sm text-blue-700">Efficiency Score</div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {results.kwhPerSqFt.toFixed(1)}
                </div>
                <div className="text-sm text-purple-700">kWh per sq ft</div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  ${results.totalPotentialSavings.toFixed(0)}
                </div>
                <div className="text-sm text-green-700">Potential Savings/Year</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Usage Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Monthly Usage:</span>
                  <span className="font-medium">{results.currentKwh.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Usage per sq ft:</span>
                  <span className="font-medium">{results.kwhPerSqFt.toFixed(1)} kWh/sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">vs Average Home:</span>
                  <span className={`font-medium ${results.vsAverage > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {results.vsAverage > 0 ? '+' : ''}{results.vsAverage.toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Potential New Bill:</span>
                  <span className="font-medium text-green-600">${results.potentialNewBill.toFixed(0)}/month</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">Improvement Potential</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-yellow-800">Potential Annual Savings:</span>
                  <span className="font-medium text-yellow-900">${results.totalPotentialSavings.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">Savings Percentage:</span>
                  <span className="font-medium text-yellow-900">{results.annualSavingsPercent.toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">Monthly Savings:</span>
                  <span className="font-medium text-yellow-900">${(results.totalPotentialSavings / 12).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Recommendations</h3>
            <div className="space-y-4">
              {results.recommendations.slice(0, 6).map((rec: any, index: number) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{rec.category}</div>
                    <div className="text-sm text-gray-600 mt-1">{rec.description}</div>
                    <div className="text-sm text-green-600 font-medium mt-1">{rec.savings}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}