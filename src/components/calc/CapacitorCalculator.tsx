'use client';

import { useState } from 'react';

export default function CapacitorCalculator() {
  const [calculationType, setCalculationType] = useState('capacitance');
  const [capacitance, setCapacitance] = useState('');
  const [frequency, setFrequency] = useState('');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [seriesCapacitors, setSeriesCapacitors] = useState(['', '']);
  const [parallelCapacitors, setParallelCapacitors] = useState(['', '']);
  const [plateArea, setPlateArea] = useState('');
  const [plateDistance, setPlateDistance] = useState('');
  const [dielectricConstant, setDielectricConstant] = useState('');
  const [results, setResults] = useState<any>(null);

  const dielectricMaterials = {
    'vacuum': 1.0,
    'air': 1.0006,
    'paper': 3.7,
    'glass': 7.5,
    'mica': 6.0,
    'ceramic': 6.0,
    'polyester': 3.3,
    'polystyrene': 2.6,
    'teflon': 2.1,
    'tantalum_oxide': 11.0,
    'aluminum_oxide': 8.5
  };

  const calculateCapacitor = () => {
    const C = parseFloat(capacitance);
    const f = parseFloat(frequency);
    const V = parseFloat(voltage);
    const I = parseFloat(current);

    switch (calculationType) {
      case 'capacitance':
        if (plateArea && plateDistance && dielectricConstant) {
          const A = parseFloat(plateArea) / 1000000; // Convert mm² to m²
          const d = parseFloat(plateDistance) / 1000; // Convert mm to m
          const epsilon_r = parseFloat(dielectricConstant);
          const epsilon_0 = 8.854e-12; // Permittivity of free space
          
          const calculatedCapacitance = (epsilon_0 * epsilon_r * A) / d;
          
          setResults({
            type: 'Capacitance from Physical Parameters',
            capacitance: calculatedCapacitance,
            capacitanceFormatted: formatCapacitance(calculatedCapacitance),
            plateArea: A,
            plateDistance: d,
            dielectricConstant: epsilon_r,
            formula: 'C = ε₀ × εᵣ × A / d'
          });
        }
        break;

      case 'reactance':
        if (C && f) {
          const Xc = 1 / (2 * Math.PI * f * (C * 1e-6)); // Convert µF to F
          const impedance = Xc;
          
          setResults({
            type: 'Capacitive Reactance',
            capacitance: C,
            frequency: f,
            reactance: Xc,
            impedance: impedance,
            formula: 'Xc = 1 / (2πfC)',
            phaseAngle: -90
          });
        }
        break;

      case 'energy':
        if (C && V) {
          const energy = 0.5 * (C * 1e-6) * V * V; // Energy in Joules
          const charge = (C * 1e-6) * V; // Charge in Coulombs
          
          setResults({
            type: 'Capacitor Energy Storage',
            capacitance: C,
            voltage: V,
            energy: energy,
            charge: charge,
            formula: 'E = ½CV²',
            chargeFormula: 'Q = CV'
          });
        }
        break;

      case 'charging':
        if (C && V && frequency) {
          const RC = (parseFloat(frequency) * 1000) * (C * 1e-6); // RC time constant
          const timeConstant = RC;
          const chargeTime_63 = timeConstant;
          const chargeTime_95 = 3 * timeConstant;
          const chargeTime_99 = 5 * timeConstant;
          
          setResults({
            type: 'Capacitor Charging Time',
            capacitance: C,
            resistance: parseFloat(frequency) * 1000, // Using frequency field for resistance
            voltage: V,
            timeConstant: timeConstant,
            chargeTime_63: chargeTime_63,
            chargeTime_95: chargeTime_95,
            chargeTime_99: chargeTime_99,
            formula: 'τ = RC'
          });
        }
        break;

      case 'series':
        const seriesValues = seriesCapacitors.map(c => parseFloat(c)).filter(v => !isNaN(v));
        if (seriesValues.length >= 2) {
          const reciprocalSum = seriesValues.reduce((sum, val) => sum + (1 / val), 0);
          const totalCapacitance = 1 / reciprocalSum;
          
          setResults({
            type: 'Series Capacitance',
            values: seriesValues,
            totalCapacitance: totalCapacitance,
            formattedTotal: formatCapacitance(totalCapacitance * 1e-6),
            formula: `1/Ctotal = ${seriesValues.map(v => '1/' + v).join(' + ')}`
          });
        }
        break;

      case 'parallel':
        const parallelValues = parallelCapacitors.map(c => parseFloat(c)).filter(v => !isNaN(v));
        if (parallelValues.length >= 2) {
          const totalCapacitance = parallelValues.reduce((sum, val) => sum + val, 0);
          
          setResults({
            type: 'Parallel Capacitance',
            values: parallelValues,
            totalCapacitance: totalCapacitance,
            formattedTotal: formatCapacitance(totalCapacitance * 1e-6),
            formula: `Ctotal = ${parallelValues.join(' + ')} = ${totalCapacitance}µF`
          });
        }
        break;
    }
  };

  const formatCapacitance = (capacitance: number): string => {
    if (capacitance >= 1e-3) {
      return (capacitance * 1e3).toFixed(3) + 'mF';
    } else if (capacitance >= 1e-6) {
      return (capacitance * 1e6).toFixed(3) + 'µF';
    } else if (capacitance >= 1e-9) {
      return (capacitance * 1e9).toFixed(3) + 'nF';
    } else {
      return (capacitance * 1e12).toFixed(3) + 'pF';
    }
  };

  const formatTime = (time: number): string => {
    if (time >= 1) {
      return time.toFixed(3) + 's';
    } else if (time >= 1e-3) {
      return (time * 1e3).toFixed(3) + 'ms';
    } else if (time >= 1e-6) {
      return (time * 1e6).toFixed(3) + 'µs';
    } else {
      return (time * 1e9).toFixed(3) + 'ns';
    }
  };

  const addSeriesCapacitor = () => {
    setSeriesCapacitors([...seriesCapacitors, '']);
  };

  const updateSeriesCapacitor = (index: number, value: string) => {
    const updated = [...seriesCapacitors];
    updated[index] = value;
    setSeriesCapacitors(updated);
  };

  const addParallelCapacitor = () => {
    setParallelCapacitors([...parallelCapacitors, '']);
  };

  const updateParallelCapacitor = (index: number, value: string) => {
    const updated = [...parallelCapacitors];
    updated[index] = value;
    setParallelCapacitors(updated);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🔋</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Capacitor Calculator — Capacitance & Electronics Calculator</h1>
          <p className="text-gray-600">Calculate capacitance, reactance, energy storage, and combinations</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setCalculationType('capacitance')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    calculationType === 'capacitance'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Capacitance
                </button>
                <button
                  onClick={() => setCalculationType('reactance')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    calculationType === 'reactance'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Reactance
                </button>
                <button
                  onClick={() => setCalculationType('energy')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    calculationType === 'energy'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Energy
                </button>
                <button
                  onClick={() => setCalculationType('charging')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    calculationType === 'charging'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Charging
                </button>
                <button
                  onClick={() => setCalculationType('series')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    calculationType === 'series'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Series
                </button>
                <button
                  onClick={() => setCalculationType('parallel')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    calculationType === 'parallel'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Parallel
                </button>
              </div>
            </div>

            {calculationType === 'capacitance' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plate Area (mm²)</label>
                  <input
                    type="number"
                    value={plateArea}
                    onChange={(e) => setPlateArea(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plate Distance (mm)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={plateDistance}
                    onChange={(e) => setPlateDistance(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dielectric Material</label>
                  <select
                    value={dielectricConstant}
                    onChange={(e) => setDielectricConstant(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Material</option>
                    {Object.entries(dielectricMaterials).map(([material, constant]) => (
                      <option key={material} value={constant}>
                        {material.replace('_', ' ').toUpperCase()} (εᵣ = {constant})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {calculationType === 'reactance' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacitance (µF)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={capacitance}
                    onChange={(e) => setCapacitance(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency (Hz)</label>
                  <input
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="60"
                  />
                </div>
              </div>
            )}

            {calculationType === 'energy' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacitance (µF)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={capacitance}
                    onChange={(e) => setCapacitance(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Voltage (V)</label>
                  <input
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="12"
                  />
                </div>
              </div>
            )}

            {calculationType === 'charging' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacitance (µF)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={capacitance}
                    onChange={(e) => setCapacitance(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resistance (kΩ)</label>
                  <input
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Voltage (V)</label>
                  <input
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5"
                  />
                </div>
              </div>
            )}

            {calculationType === 'series' && (
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Series Capacitors</h3>
                  <button
                    onClick={addSeriesCapacitor}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Capacitor
                  </button>
                </div>
                {seriesCapacitors.map((capacitor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <label className="text-sm font-medium text-gray-700 w-20">C{index + 1}:</label>
                    <input
                      type="number"
                      value={capacitor}
                      onChange={(e) => updateSeriesCapacitor(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Capacitance (µF)"
                    />
                    <span className="text-gray-500">µF</span>
                  </div>
                ))}
              </div>
            )}

            {calculationType === 'parallel' && (
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Parallel Capacitors</h3>
                  <button
                    onClick={addParallelCapacitor}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Capacitor
                  </button>
                </div>
                {parallelCapacitors.map((capacitor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <label className="text-sm font-medium text-gray-700 w-20">C{index + 1}:</label>
                    <input
                      type="number"
                      value={capacitor}
                      onChange={(e) => updateParallelCapacitor(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Capacitance (µF)"
                    />
                    <span className="text-gray-500">µF</span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={calculateCapacitor}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Calculate
            </button>

            {results && (
              <div className="mt-8 space-y-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">{results.type}</h3>
                  
                  {results.formula && (
                    <div className="text-center mb-4">
                      <div className="text-sm text-blue-700 mb-2">Formula: {results.formula}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.capacitanceFormatted && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{results.capacitanceFormatted}</div>
                        <div className="text-sm text-blue-700">Capacitance</div>
                      </div>
                    )}
                    {results.reactance && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{results.reactance.toFixed(2)}Ω</div>
                        <div className="text-sm text-blue-700">Reactance</div>
                      </div>
                    )}
                    {results.energy && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{results.energy.toFixed(6)}J</div>
                        <div className="text-sm text-blue-700">Energy</div>
                      </div>
                    )}
                    {results.charge && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{(results.charge * 1000).toFixed(3)}mC</div>
                        <div className="text-sm text-blue-700">Charge</div>
                      </div>
                    )}
                    {results.timeConstant && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{formatTime(results.timeConstant)}</div>
                        <div className="text-sm text-blue-700">Time Constant (τ)</div>
                      </div>
                    )}
                    {results.formattedTotal && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{results.formattedTotal}</div>
                        <div className="text-sm text-blue-700">Total Capacitance</div>
                      </div>
                    )}
                  </div>

                  {results.chargeTime_63 && (
                    <div className="mt-6 bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3">Charging Times</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-blue-900">{formatTime(results.chargeTime_63)}</div>
                          <div className="text-blue-700">63% Charge</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-blue-900">{formatTime(results.chargeTime_95)}</div>
                          <div className="text-blue-700">95% Charge</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-blue-900">{formatTime(results.chargeTime_99)}</div>
                          <div className="text-blue-700">99% Charge</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {results.formula && results.values && (
                    <div className="mt-4 text-center text-sm text-blue-700">
                      {results.formula}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

      {/* Capacitor Types */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-blue-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">🔋</span>
          Capacitor Types
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-purple-800">
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium">Electrolytic</div>
            <div className="text-purple-600">High capacitance, polarized</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium">Ceramic</div>
            <div className="text-purple-600">Small, stable, non-polarized</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium">Film</div>
            <div className="text-purple-600">Low loss, high voltage</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium">Tantalum</div>
            <div className="text-purple-600">High capacitance, stable</div>
          </div>
        </div>
      </div>

      {/* Key Formulas */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📐</span>
          Key Formulas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-800">
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium">Capacitance</div>
            <div className="text-blue-600 font-mono">C = ε₀εᵣA/d</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium">Reactance</div>
            <div className="text-blue-600 font-mono">Xc = 1/(2πfC)</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium">Energy</div>
            <div className="text-blue-600 font-mono">E = ½CV²</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium">Time Constant</div>
            <div className="text-blue-600 font-mono">τ = RC</div>
          </div>
        </div>
      </div>
    </div>
  );
}