'use client';

import { useState } from 'react';

export default function SolarPanelSavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<string>('');
  const [electricityRate, setElectricityRate] = useState<string>('0.13');
  const [systemSize, setSystemSize] = useState<string>('');
  const [systemCost, setSystemCost] = useState<string>('');
  const [sunHours, setSunHours] = useState<string>('5');
  const [incentives, setIncentives] = useState<string>('');
  const [annualIncrease, setAnnualIncrease] = useState<string>('3');
  const [location, setLocation] = useState<string>('average');
  const [result, setResult] = useState<{
    monthlyProduction: number;
    monthlySavings: number;
    annualSavings: number;
    paybackPeriod: number;
    totalSavings20Years: number;
    netCost: number;
    roi: number;
    carbonOffset: number;
  } | null>(null);

  const locationMultipliers = {
    // Global Average
    average: 5.0,
    
    // North America
    'usa-arizona': 6.5,
    'usa-california': 5.8,
    'usa-florida': 5.2,
    'usa-texas': 5.0,
    'usa-nevada': 6.2,
    'usa-colorado': 5.5,
    'usa-northeast': 4.2,
    'usa-northwest': 3.8,
    'usa-southeast': 4.8,
    'canada-ontario': 3.5,
    'canada-alberta': 4.2,
    'canada-british-columbia': 3.8,
    'mexico': 6.0,
    
    // South America
    'brazil': 5.5,
    'chile': 5.8,
    'argentina': 4.5,
    'colombia': 4.8,
    'peru': 5.2,
    
    // Europe
    'germany': 3.0,
    'spain': 4.8,
    'italy': 4.2,
    'france': 3.5,
    'uk': 2.8,
    'portugal': 4.5,
    'greece': 4.7,
    'netherlands': 2.9,
    'poland': 3.2,
    'turkey': 4.0,
    
    // Africa
    'south-africa': 4.9,
    'morocco': 5.2,
    'egypt': 6.0,
    'kenya': 5.8,
    'nigeria': 4.5,
    'tunisia': 5.0,
    'algeria': 5.5,
    
    // Asia
    'china': 4.2,
    'india': 5.0,
    'japan': 3.8,
    'south-korea': 3.6,
    'thailand': 4.8,
    'australia': 5.5,
    'philippines': 4.5,
    'indonesia': 4.6,
    'malaysia': 4.4,
    'singapore': 4.2,
    'vietnam': 4.3,
    'israel': 6.2,
    'saudi-arabia': 6.5,
    'uae': 6.0,
    
    // Middle East
    'iran': 5.0,
    'jordan': 5.8,
    'lebanon': 4.8
  };

  const calculate = () => {
    const monthlyBillNum = parseFloat(monthlyBill);
    const rateNum = parseFloat(electricityRate);
    const systemSizeNum = parseFloat(systemSize);
    const systemCostNum = parseFloat(systemCost);
    const sunHoursNum = parseFloat(sunHours);
    const incentivesNum = parseFloat(incentives) || 0;
    const increaseNum = parseFloat(annualIncrease) / 100;

    if (isNaN(monthlyBillNum) || isNaN(rateNum) || isNaN(systemSizeNum) || isNaN(systemCostNum)) return;

    // Calculate monthly energy production (kWh)
    const dailyProduction = systemSizeNum * sunHoursNum * 0.85; // 85% efficiency factor
    const monthlyProduction = dailyProduction * 30.44; // Average days per month

    // Calculate current monthly usage
    const monthlyUsage = monthlyBillNum / rateNum;

    // Calculate monthly savings
    const energyOffset = Math.min(monthlyProduction, monthlyUsage);
    const monthlySavings = energyOffset * rateNum;

    // Calculate annual savings
    const annualSavings = monthlySavings * 12;

    // Calculate net system cost after incentives
    const netCost = systemCostNum - incentivesNum;

    // Calculate payback period
    const paybackPeriod = netCost / annualSavings;

    // Calculate 20-year savings with annual electricity rate increases
    let totalSavings = 0;
    let currentAnnualSavings = annualSavings;
    
    for (let year = 1; year <= 20; year++) {
      totalSavings += currentAnnualSavings;
      currentAnnualSavings *= (1 + increaseNum);
    }

    // Subtract the system cost from total savings
    const netSavings20Years = totalSavings - netCost;

    // Calculate ROI
    const roi = (netSavings20Years / netCost) * 100;

    // Calculate carbon offset (average 0.92 lbs CO2 per kWh)
    const annualProduction = monthlyProduction * 12;
    const carbonOffset = annualProduction * 0.92; // lbs CO2 per year

    setResult({
      monthlyProduction,
      monthlySavings,
      annualSavings,
      paybackPeriod,
      totalSavings20Years: netSavings20Years,
      netCost,
      roi,
      carbonOffset
    });
  };

  const clear = () => {
    setMonthlyBill('');
    setSystemSize('');
    setSystemCost('');
    setIncentives('');
    setResult(null);
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    setSunHours(locationMultipliers[newLocation as keyof typeof locationMultipliers].toString());
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">☀️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Solar Panel Savings Calculator — Solar ROI & Payback Calculator</h1>
          <p className="text-gray-600">Calculate potential savings, payback period, and ROI for solar installation</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Electric Bill ($)
            </label>
            <input
              type="number"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electricity Rate ($/kWh)
            </label>
            <input
              type="number"
              value={electricityRate}
              onChange={(e) => setElectricityRate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.13"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Size (kW)
            </label>
            <input
              type="number"
              value={systemSize}
              onChange={(e) => setSystemSize(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="8"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Cost ($)
            </label>
            <input
              type="number"
              value={systemCost}
              onChange={(e) => setSystemCost(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="20000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="average">Global Average</option>
            
            <optgroup label="🇺🇸 United States">
              <option value="usa-arizona">Arizona</option>
              <option value="usa-california">California</option>
              <option value="usa-florida">Florida</option>
              <option value="usa-texas">Texas</option>
              <option value="usa-nevada">Nevada</option>
              <option value="usa-colorado">Colorado</option>
              <option value="usa-northeast">Northeast US</option>
              <option value="usa-northwest">Northwest US</option>
              <option value="usa-southeast">Southeast US</option>
            </optgroup>
            
            <optgroup label="🇨🇦 Canada & 🇲🇽 Mexico">
              <option value="canada-ontario">Ontario, Canada</option>
              <option value="canada-alberta">Alberta, Canada</option>
              <option value="canada-british-columbia">British Columbia, Canada</option>
              <option value="mexico">Mexico</option>
            </optgroup>
            
            <optgroup label="🌎 South America">
              <option value="brazil">Brazil</option>
              <option value="chile">Chile</option>
              <option value="argentina">Argentina</option>
              <option value="colombia">Colombia</option>
              <option value="peru">Peru</option>
            </optgroup>
            
            <optgroup label="🇪🇺 Europe">
              <option value="germany">Germany</option>
              <option value="spain">Spain</option>
              <option value="italy">Italy</option>
              <option value="france">France</option>
              <option value="uk">United Kingdom</option>
              <option value="portugal">Portugal</option>
              <option value="greece">Greece</option>
              <option value="netherlands">Netherlands</option>
              <option value="poland">Poland</option>
              <option value="turkey">Turkey</option>
            </optgroup>
            
            <optgroup label="🌍 Africa">
              <option value="south-africa">South Africa</option>
              <option value="morocco">Morocco</option>
              <option value="egypt">Egypt</option>
              <option value="kenya">Kenya</option>
              <option value="nigeria">Nigeria</option>
              <option value="tunisia">Tunisia</option>
              <option value="algeria">Algeria</option>
            </optgroup>
            
            <optgroup label="🌏 Asia & Oceania">
              <option value="china">China</option>
              <option value="india">India</option>
              <option value="japan">Japan</option>
              <option value="south-korea">South Korea</option>
              <option value="thailand">Thailand</option>
              <option value="australia">Australia</option>
              <option value="philippines">Philippines</option>
              <option value="indonesia">Indonesia</option>
              <option value="malaysia">Malaysia</option>
              <option value="singapore">Singapore</option>
              <option value="vietnam">Vietnam</option>
            </optgroup>
            
            <optgroup label="🕌 Middle East">
              <option value="israel">Israel</option>
              <option value="saudi-arabia">Saudi Arabia</option>
              <option value="uae">United Arab Emirates</option>
              <option value="iran">Iran</option>
              <option value="jordan">Jordan</option>
              <option value="lebanon">Lebanon</option>
            </optgroup>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peak Sun Hours
            </label>
            <input
              type="number"
              value={sunHours}
              onChange={(e) => setSunHours(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Incentives ($)
            </label>
            <input
              type="number"
              value={incentives}
              onChange={(e) => setIncentives(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="6000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate Increase (%/year)
            </label>
            <input
              type="number"
              value={annualIncrease}
              onChange={(e) => setAnnualIncrease(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.1"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Calculate Savings
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-900 mb-1">
                    ${result.monthlySavings.toFixed(0)}
                  </div>
                  <div className="text-sm text-green-700">Monthly Savings</div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-1">
                    ${result.annualSavings.toFixed(0)}
                  </div>
                  <div className="text-sm text-blue-700">Annual Savings</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-900 mb-1">
                    {result.paybackPeriod.toFixed(1)} years
                  </div>
                  <div className="text-xs text-purple-700">Payback Period</div>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-900 mb-1">
                    {result.roi.toFixed(0)}%
                  </div>
                  <div className="text-xs text-orange-700">20-Year ROI</div>
                </div>
              </div>
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                <div className="text-center">
                  <div className="text-xl font-bold text-teal-900 mb-1">
                    {(result.carbonOffset / 1000).toFixed(1)}k
                  </div>
                  <div className="text-xs text-teal-700">lbs CO₂/year</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Financial Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>System Cost:</span>
                  <span className="font-medium">${result.netCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Production:</span>
                  <span className="font-medium">{result.monthlyProduction.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>20-Year Net Savings:</span>
                  <span className="font-medium text-green-600">${result.totalSavings20Years.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbon Offset (20 years):</span>
                  <span className="font-medium">{(result.carbonOffset * 20 / 1000).toFixed(0)}k lbs CO₂</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}