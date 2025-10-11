'use client';

import { useState } from 'react';

export default function ResistorCalculator() {
  const [calculationType, setCalculationType] = useState('color-to-value');
  const [band1, setBand1] = useState('');
  const [band2, setBand2] = useState('');
  const [band3, setBand3] = useState('');
  const [band4, setBand4] = useState('');
  const [band5, setBand5] = useState('');
  const [resistorValue, setResistorValue] = useState('');
  const [tolerance, setTolerance] = useState('');
  const [seriesResistors, setSeriesResistors] = useState(['', '']);
  const [parallelResistors, setParallelResistors] = useState(['', '']);
  const [results, setResults] = useState<any>(null);

  const colorCodes = {
    'black': { value: 0, multiplier: 1, tolerance: null, color: '#000000' },
    'brown': { value: 1, multiplier: 10, tolerance: 1, color: '#8B4513' },
    'red': { value: 2, multiplier: 100, tolerance: 2, color: '#FF0000' },
    'orange': { value: 3, multiplier: 1000, tolerance: null, color: '#FFA500' },
    'yellow': { value: 4, multiplier: 10000, tolerance: null, color: '#FFFF00' },
    'green': { value: 5, multiplier: 100000, tolerance: 0.5, color: '#008000' },
    'blue': { value: 6, multiplier: 1000000, tolerance: 0.25, color: '#0000FF' },
    'violet': { value: 7, multiplier: 10000000, tolerance: 0.1, color: '#8A2BE2' },
    'grey': { value: 8, multiplier: 100000000, tolerance: 0.05, color: '#808080' },
    'white': { value: 9, multiplier: 1000000000, tolerance: null, color: '#FFFFFF' },
    'gold': { value: null, multiplier: 0.1, tolerance: 5, color: '#FFD700' },
    'silver': { value: null, multiplier: 0.01, tolerance: 10, color: '#C0C0C0' }
  };

  const calculateResistorValue = () => {
    if (calculationType === 'color-to-value') {
      if (!band1 || !band2 || !band3) return;
      
      const color1 = colorCodes[band1 as keyof typeof colorCodes];
      const color2 = colorCodes[band2 as keyof typeof colorCodes];
      const multiplier = colorCodes[band3 as keyof typeof colorCodes];
      const toleranceColor = band4 ? colorCodes[band4 as keyof typeof colorCodes] : null;
      const tempCoeff = band5 ? colorCodes[band5 as keyof typeof colorCodes] : null;

      let value: number;
      let toleranceValue: number = 20; // Default tolerance

      if (band5) {
        // 5-band resistor: color1-color2-color3-multiplier-tolerance
        const color3 = colorCodes[band3 as keyof typeof colorCodes];
        const mult = colorCodes[band4 as keyof typeof colorCodes];
        value = ((color1.value! * 100) + (color2.value! * 10) + color3.value!) * mult.multiplier;
        toleranceValue = toleranceColor?.tolerance || 20;
      } else {
        // 4-band resistor: color1-color2-multiplier-tolerance
        value = ((color1.value! * 10) + color2.value!) * multiplier.multiplier;
        toleranceValue = toleranceColor?.tolerance || 20;
      }

      setResults({
        type: 'Color Code to Value',
        value: value,
        tolerance: toleranceValue,
        minValue: value * (1 - toleranceValue / 100),
        maxValue: value * (1 + toleranceValue / 100),
        formattedValue: formatResistorValue(value),
        bands: band5 ? [band1, band2, band3, band4, band5] : [band1, band2, band3, band4],
        powerRating: getStandardPowerRating(value)
      });
    } else if (calculationType === 'value-to-color') {
      const value = parseFloat(resistorValue);
      if (!value) return;

      const colorBands = getColorBands(value);
      setResults({
        type: 'Value to Color Code',
        value: value,
        colorBands: colorBands,
        formattedValue: formatResistorValue(value),
        tolerance: parseFloat(tolerance) || 5,
        standardValues: getStandardValues(value)
      });
    } else if (calculationType === 'series') {
      const values = seriesResistors.map(r => parseFloat(r)).filter(v => !isNaN(v));
      if (values.length < 2) return;

      const totalResistance = values.reduce((sum, val) => sum + val, 0);
      setResults({
        type: 'Series Resistance',
        values: values,
        totalResistance: totalResistance,
        formattedTotal: formatResistorValue(totalResistance),
        formula: values.join(' + ') + ' = ' + formatResistorValue(totalResistance)
      });
    } else if (calculationType === 'parallel') {
      const values = parallelResistors.map(r => parseFloat(r)).filter(v => !isNaN(v));
      if (values.length < 2) return;

      const reciprocalSum = values.reduce((sum, val) => sum + (1 / val), 0);
      const totalResistance = 1 / reciprocalSum;
      setResults({
        type: 'Parallel Resistance',
        values: values,
        totalResistance: totalResistance,
        formattedTotal: formatResistorValue(totalResistance),
        formula: `1 / (${values.map(v => '1/' + v).join(' + ')}) = ${formatResistorValue(totalResistance)}`
      });
    }
  };

  const formatResistorValue = (value: number): string => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + 'MΩ';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + 'kΩ';
    } else {
      return value.toFixed(2) + 'Ω';
    }
  };

  const getColorBands = (value: number) => {
    // Simplified color band calculation for 4-band resistor
    let workingValue = value;
    let multiplier = 1;
    
    // Find appropriate multiplier
    while (workingValue >= 100 && multiplier < 10000000) {
      workingValue /= 10;
      multiplier *= 10;
    }

    const digit1 = Math.floor(workingValue / 10);
    const digit2 = Math.floor(workingValue % 10);

    // Find color names from values
    const getColorName = (val: number, type: 'value' | 'multiplier') => {
      for (const [colorName, colorData] of Object.entries(colorCodes)) {
        if (type === 'value' && colorData.value === val) return colorName;
        if (type === 'multiplier' && colorData.multiplier === multiplier) return colorName;
      }
      return 'black';
    };

    return {
      band1: getColorName(digit1, 'value'),
      band2: getColorName(digit2, 'value'),
      band3: getColorName(multiplier, 'multiplier'),
      band4: 'gold' // Default 5% tolerance
    };
  };

  const getStandardValues = (value: number) => {
    const e12Series = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
    let multiplier = 1;
    let workingValue = value;

    while (workingValue >= 10) {
      workingValue /= 10;
      multiplier *= 10;
    }

    return e12Series.map(val => val * multiplier).filter(val => 
      Math.abs(val - value) / value < 0.5
    ).slice(0, 3);
  };

  const getStandardPowerRating = (resistance: number): string => {
    if (resistance < 100) return '1/2W or higher';
    if (resistance < 1000) return '1/4W';
    if (resistance < 10000) return '1/8W';
    return '1/16W';
  };

  const addSeriesResistor = () => {
    setSeriesResistors([...seriesResistors, '']);
  };

  const updateSeriesResistor = (index: number, value: string) => {
    const updated = [...seriesResistors];
    updated[index] = value;
    setSeriesResistors(updated);
  };

  const addParallelResistor = () => {
    setParallelResistors([...parallelResistors, '']);
  };

  const updateParallelResistor = (index: number, value: string) => {
    const updated = [...parallelResistors];
    updated[index] = value;
    setParallelResistors(updated);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🔌</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resistor Calculator — Color Code & Resistance Calculator</h1>
          <p className="text-gray-600">Calculate resistor values, color codes, and combinations</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setCalculationType('color-to-value')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'color-to-value'
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Color to Value
          </button>
          <button
            onClick={() => setCalculationType('value-to-color')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'value-to-color'
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Value to Color
          </button>
          <button
            onClick={() => setCalculationType('series')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'series'
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Series
          </button>
          <button
            onClick={() => setCalculationType('parallel')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'parallel'
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Parallel
          </button>
        </div>
      </div>

      {calculationType === 'color-to-value' && (
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Band 1</label>
              <select
                value={band1}
                onChange={(e) => setBand1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select Color</option>
                {Object.entries(colorCodes).filter(([_, data]) => data.value !== null).map(([color, data]) => (
                  <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Band 2</label>
              <select
                value={band2}
                onChange={(e) => setBand2(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select Color</option>
                {Object.entries(colorCodes).filter(([_, data]) => data.value !== null).map(([color, data]) => (
                  <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Band 3 (Multiplier)</label>
              <select
                value={band3}
                onChange={(e) => setBand3(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select Color</option>
                {Object.entries(colorCodes).map(([color, data]) => (
                  <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Band 4 (Tolerance)</label>
              <select
                value={band4}
                onChange={(e) => setBand4(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select Color</option>
                {Object.entries(colorCodes).filter(([_, data]) => data.tolerance !== null).map(([color, data]) => (
                  <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)} ({data.tolerance}%)</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Resistor Visualization</div>
              <div className="flex justify-center items-center space-x-1">
                {[band1, band2, band3, band4].map((band, index) => (
                  <div
                    key={index}
                    className="w-8 h-16 border-2 border-gray-300 rounded"
                    style={{ 
                      backgroundColor: band ? colorCodes[band as keyof typeof colorCodes].color : '#f3f4f6',
                      border: band === 'white' ? '2px solid #000' : '2px solid #666'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {calculationType === 'value-to-color' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resistor Value (Ω)</label>
            <input
              type="number"
              value={resistorValue}
              onChange={(e) => setResistorValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tolerance (%)</label>
            <select
              value={tolerance}
              onChange={(e) => setTolerance(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="5">5% (Gold)</option>
              <option value="10">10% (Silver)</option>
              <option value="1">1% (Brown)</option>
              <option value="2">2% (Red)</option>
            </select>
          </div>
        </div>
      )}

      {calculationType === 'series' && (
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Series Resistors</h3>
            <button
              onClick={addSeriesResistor}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add Resistor
            </button>
          </div>
          {seriesResistors.map((resistor, index) => (
            <div key={index} className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 w-20">R{index + 1}:</label>
              <input
                type="number"
                value={resistor}
                onChange={(e) => updateSeriesResistor(index, e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Resistance (Ω)"
              />
              <span className="text-gray-500">Ω</span>
            </div>
          ))}
        </div>
      )}

      {calculationType === 'parallel' && (
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Parallel Resistors</h3>
            <button
              onClick={addParallelResistor}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add Resistor
            </button>
          </div>
          {parallelResistors.map((resistor, index) => (
            <div key={index} className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 w-20">R{index + 1}:</label>
              <input
                type="number"
                value={resistor}
                onChange={(e) => updateParallelResistor(index, e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Resistance (Ω)"
              />
              <span className="text-gray-500">Ω</span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={calculateResistorValue}
        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-900 mb-4">{results.type}</h3>
            
            {results.value && (
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-orange-900 mb-1">
                  {results.formattedValue}
                </div>
                <div className="text-sm text-orange-700">
                  {results.tolerance && `±${results.tolerance}%`}
                </div>
              </div>
            )}

            {results.totalResistance && (
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-orange-900 mb-1">
                  {results.formattedTotal}
                </div>
                <div className="text-sm text-orange-700">{results.type}</div>
                <div className="text-xs text-orange-600 mt-2">{results.formula}</div>
              </div>
            )}

            {results.colorBands && (
              <div className="bg-white rounded-lg p-4 mt-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Color Code</div>
                  <div className="flex justify-center items-center space-x-1 mb-2">
                    {Object.values(results.colorBands).map((color: any, index: number) => (
                      <div
                        key={index}
                        className="w-8 h-16 border-2 border-gray-300 rounded"
                        style={{ 
                          backgroundColor: colorCodes[color as keyof typeof colorCodes].color,
                          border: color === 'white' ? '2px solid #000' : '2px solid #666'
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-600">
                    {Object.values(results.colorBands).map((color: any) => 
                      color.charAt(0).toUpperCase() + color.slice(1)
                    ).join(' - ')}
                  </div>
                </div>
              </div>
            )}

            {results.minValue && results.maxValue && (
              <div className="bg-white rounded-lg p-4 mt-4">
                <div className="text-sm text-gray-600 mb-2">Tolerance Range</div>
                <div className="flex justify-between text-sm">
                  <span>Min: {formatResistorValue(results.minValue)}</span>
                  <span>Max: {formatResistorValue(results.maxValue)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}