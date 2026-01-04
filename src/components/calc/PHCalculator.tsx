'use client';

import { useState } from 'react';

export default function PHCalculator() {
  const [calculationType, setCalculationType] = useState('concentration-to-ph');
  const [concentration, setConcentration] = useState('');
  const [phValue, setPhValue] = useState('');
  const [acidType, setAcidType] = useState('strong');
  const [baseType, setBaseType] = useState('strong');
  const [solutionType, setSolutionType] = useState('acid');
  const [results, setResults] = useState<any>(null);

  const calculatePH = () => {
    if (calculationType === 'concentration-to-ph') {
      const conc = parseFloat(concentration);
      if (!conc) return;

      let ph, poh, hConc, ohConc;

      if (solutionType === 'acid') {
        if (acidType === 'strong') {
          hConc = conc;
          ph = -Math.log10(hConc);
          poh = 14 - ph;
          ohConc = Math.pow(10, -poh);
        } else {
          // Weak acid approximation (simplified)
          hConc = Math.sqrt(conc * 1.8e-5); // Using Ka for acetic acid as example
          ph = -Math.log10(hConc);
          poh = 14 - ph;
          ohConc = Math.pow(10, -poh);
        }
      } else {
        if (baseType === 'strong') {
          ohConc = conc;
          poh = -Math.log10(ohConc);
          ph = 14 - poh;
          hConc = Math.pow(10, -ph);
        } else {
          // Weak base approximation
          ohConc = Math.sqrt(conc * 1.8e-5); // Using Kb for ammonia as example
          poh = -Math.log10(ohConc);
          ph = 14 - poh;
          hConc = Math.pow(10, -ph);
        }
      }

      setResults({
        type: 'concentration-to-ph',
        ph: ph,
        poh: poh,
        hConcentration: hConc,
        ohConcentration: ohConc,
        solutionType: solutionType,
        acidityLevel: getAcidityLevel(ph),
        isAcidic: ph < 7,
        isBasic: ph > 7,
        isNeutral: Math.abs(ph - 7) < 0.01
      });
    } else {
      const ph = parseFloat(phValue);
      if (!ph) return;

      const poh = 14 - ph;
      const hConc = Math.pow(10, -ph);
      const ohConc = Math.pow(10, -poh);

      setResults({
        type: 'ph-to-concentration',
        ph: ph,
        poh: poh,
        hConcentration: hConc,
        ohConcentration: ohConc,
        acidityLevel: getAcidityLevel(ph),
        isAcidic: ph < 7,
        isBasic: ph > 7,
        isNeutral: Math.abs(ph - 7) < 0.01
      });
    }
  };

  const getAcidityLevel = (ph: number) => {
    if (ph < 1) return { level: 'Extremely Acidic', color: 'red-700', description: 'Battery acid level' };
    if (ph < 3) return { level: 'Very Acidic', color: 'red-600', description: 'Lemon juice, vinegar' };
    if (ph < 5) return { level: 'Acidic', color: 'orange-600', description: 'Coffee, tomatoes' };
    if (ph < 6) return { level: 'Mildly Acidic', color: 'yellow-600', description: 'Bread, fish' };
    if (ph < 7.5) return { level: 'Neutral', color: 'green-600', description: 'Pure water, milk' };
    if (ph < 9) return { level: 'Mildly Basic', color: 'blue-600', description: 'Baking soda' };
    if (ph < 11) return { level: 'Basic', color: 'indigo-600', description: 'Ammonia, soap' };
    if (ph < 13) return { level: 'Very Basic', color: 'purple-600', description: 'Bleach' };
    return { level: 'Extremely Basic', color: 'purple-700', description: 'Household lye' };
  };

  const getCommonSolutions = () => [
    { name: 'Battery Acid', ph: 0.5 },
    { name: 'Lemon Juice', ph: 2.0 },
    { name: 'Vinegar', ph: 2.4 },
    { name: 'Coffee', ph: 5.0 },
    { name: 'Pure Water', ph: 7.0 },
    { name: 'Baking Soda', ph: 9.0 },
    { name: 'Ammonia', ph: 11.0 },
    { name: 'Bleach', ph: 12.5 }
  ];

  const formatScientific = (num: number) => {
    if (num === 0) return '0';
    const exp = Math.floor(Math.log10(Math.abs(num)));
    const mantissa = num / Math.pow(10, exp);
    return `${mantissa.toFixed(2)} × 10^${exp}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🧪</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">pH Calculator — Acid & Base Chemistry Calculator</h1>
          <p className="text-gray-600">Calculate pH, pOH, and ion concentrations</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCalculationType('concentration-to-ph')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'concentration-to-ph'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Concentration → pH
          </button>
          <button
            onClick={() => setCalculationType('ph-to-concentration')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'ph-to-concentration'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            pH → Concentration
          </button>
        </div>
      </div>

      {calculationType === 'concentration-to-ph' && (
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Solution Type</label>
            <select
              value={solutionType}
              onChange={(e) => setSolutionType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="acid">Acid</option>
              <option value="base">Base</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {solutionType === 'acid' ? 'Acid Type' : 'Base Type'}
              </label>
              <select
                value={solutionType === 'acid' ? acidType : baseType}
                onChange={(e) => solutionType === 'acid' ? setAcidType(e.target.value) : setBaseType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="strong">Strong</option>
                <option value="weak">Weak</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Concentration (M)</label>
              <input
                type="number"
                step="0.001"
                value={concentration}
                onChange={(e) => setConcentration(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.1"
              />
            </div>
          </div>
        </div>
      )}

      {calculationType === 'ph-to-concentration' && (
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">pH Value</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="14"
            value={phValue}
            onChange={(e) => setPhValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="7.0"
          />
        </div>
      )}

      <button
        onClick={calculatePH}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate pH
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className={`bg-${results.acidityLevel.color.replace('-', '-')}bg-opacity-10 rounded-xl p-6 border border-${results.acidityLevel.color.replace('-', '-')}border-opacity-30`}>
            <h3 className={`text-lg font-semibold text-${results.acidityLevel.color} mb-4`}>
              {results.acidityLevel.level} Solution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold text-${results.acidityLevel.color} mb-1`}>
                  {results.ph.toFixed(2)}
                </div>
                <div className={`text-sm text-${results.acidityLevel.color}`}>pH</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold text-${results.acidityLevel.color} mb-1`}>
                  {results.poh.toFixed(2)}
                </div>
                <div className={`text-sm text-${results.acidityLevel.color}`}>pOH</div>
              </div>
            </div>
            <div className={`text-center mt-4 text-sm text-${results.acidityLevel.color}`}>
              {results.acidityLevel.description}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ion Concentrations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>[H⁺]:</span>
                  <span className="font-medium">{formatScientific(results.hConcentration)} M</span>
                </div>
                <div className="flex justify-between">
                  <span>[OH⁻]:</span>
                  <span className="font-medium">{formatScientific(results.ohConcentration)} M</span>
                </div>
                <div className="flex justify-between">
                  <span>Kw:</span>
                  <span className="font-medium">1.0 × 10^-14</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Solution Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Nature:</span>
                  <span className="font-medium">
                    {results.isAcidic ? 'Acidic' : results.isBasic ? 'Basic' : 'Neutral'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>pH + pOH:</span>
                  <span className="font-medium">{(results.ph + results.poh).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span className="font-medium">{results.acidityLevel.level}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">pH Scale Reference</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white rounded p-2">
                <span className="font-medium">0-1: Extremely Acidic</span>
                <span className="text-sm text-red-600">Battery acid</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded p-2">
                <span className="font-medium">2-3: Very Acidic</span>
                <span className="text-sm text-orange-600">Lemon juice</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded p-2">
                <span className="font-medium">4-6: Acidic</span>
                <span className="text-sm text-yellow-600">Coffee</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded p-2">
                <span className="font-medium">7: Neutral</span>
                <span className="text-sm text-green-600">Pure water</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded p-2">
                <span className="font-medium">8-10: Basic</span>
                <span className="text-sm text-blue-600">Baking soda</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded p-2">
                <span className="font-medium">11-14: Very Basic</span>
                <span className="text-sm text-purple-600">Bleach</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Common Solutions */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Common Solutions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {getCommonSolutions().map((solution, index) => (
            <button
              key={index}
              onClick={() => setPhValue(solution.ph.toString())}
              className="text-left p-3 bg-white rounded-lg border border-blue-300 hover:bg-blue-100 transition-colors"
            >
              <div className="font-medium text-blue-900">{solution.name}</div>
              <div className="text-sm text-blue-700">pH {solution.ph}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}