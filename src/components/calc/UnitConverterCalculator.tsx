'use client';

import { useState } from 'react';

interface ConversionFactors {
  [key: string]: { [key: string]: number };
}

interface UnitLabels {
  [key: string]: { [key: string]: string };
}

interface CategoryLabels {
  [key: string]: string;
}

export default function UnitConverterCalculator() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const conversions: ConversionFactors = {
    length: {
      'meter': 1,
      'kilometer': 0.001,
      'centimeter': 100,
      'millimeter': 1000,
      'inch': 39.3701,
      'foot': 3.28084,
      'yard': 1.09361,
      'mile': 0.000621371,
      'micrometer': 1000000,
      'nanometer': 1000000000
    },
    weight: {
      'kilogram': 1,
      'gram': 1000,
      'pound': 2.20462,
      'ounce': 35.274,
      'ton': 0.001,
      'stone': 0.157473,
      'milligram': 1000000,
      'microgram': 1000000000
    },
    area: {
      'square_meter': 1,
      'square_kilometer': 0.000001,
      'square_centimeter': 10000,
      'square_millimeter': 1000000,
      'square_inch': 1550.0031,
      'square_foot': 10.7639,
      'square_yard': 1.19599,
      'acre': 0.000247105,
      'hectare': 0.0001
    },
    volume: {
      'liter': 1,
      'milliliter': 1000,
      'cubic_meter': 0.001,
      'cubic_centimeter': 1000,
      'gallon_us': 0.264172,
      'gallon_uk': 0.219969,
      'quart': 1.05669,
      'pint': 2.11338,
      'cup': 4.22675,
      'fluid_ounce': 33.814
    },
    time: {
      'second': 1,
      'minute': 1/60,
      'hour': 1/3600,
      'day': 1/86400,
      'week': 1/604800,
      'month': 1/2629746,
      'year': 1/31556952,
      'millisecond': 1000,
      'microsecond': 1000000,
      'nanosecond': 1000000000
    },
    energy: {
      'joule': 1,
      'kilojoule': 0.001,
      'calorie': 0.239006,
      'kilocalorie': 0.000239006,
      'watt_hour': 0.000277778,
      'kilowatt_hour': 0.000000277778,
      'btu': 0.000947817
    }
  };

  const unitLabels: UnitLabels = {
    length: {
      'meter': 'Meter (m)',
      'kilometer': 'Kilometer (km)',
      'centimeter': 'Centimeter (cm)',
      'millimeter': 'Millimeter (mm)',
      'inch': 'Inch (in)',
      'foot': 'Foot (ft)',
      'yard': 'Yard (yd)',
      'mile': 'Mile (mi)',
      'micrometer': 'Micrometer (μm)',
      'nanometer': 'Nanometer (nm)'
    },
    weight: {
      'kilogram': 'Kilogram (kg)',
      'gram': 'Gram (g)',
      'pound': 'Pound (lb)',
      'ounce': 'Ounce (oz)',
      'ton': 'Ton (t)',
      'stone': 'Stone (st)',
      'milligram': 'Milligram (mg)',
      'microgram': 'Microgram (μg)'
    },
    area: {
      'square_meter': 'Square Meter (m²)',
      'square_kilometer': 'Square Kilometer (km²)',
      'square_centimeter': 'Square Centimeter (cm²)',
      'square_millimeter': 'Square Millimeter (mm²)',
      'square_inch': 'Square Inch (in²)',
      'square_foot': 'Square Foot (ft²)',
      'square_yard': 'Square Yard (yd²)',
      'acre': 'Acre',
      'hectare': 'Hectare (ha)'
    },
    volume: {
      'liter': 'Liter (L)',
      'milliliter': 'Milliliter (mL)',
      'cubic_meter': 'Cubic Meter (m³)',
      'cubic_centimeter': 'Cubic Centimeter (cm³)',
      'gallon_us': 'US Gallon (gal)',
      'gallon_uk': 'UK Gallon (gal)',
      'quart': 'Quart (qt)',
      'pint': 'Pint (pt)',
      'cup': 'Cup',
      'fluid_ounce': 'Fluid Ounce (fl oz)'
    },
    time: {
      'second': 'Second (s)',
      'minute': 'Minute (min)',
      'hour': 'Hour (hr)',
      'day': 'Day',
      'week': 'Week',
      'month': 'Month',
      'year': 'Year',
      'millisecond': 'Millisecond (ms)',
      'microsecond': 'Microsecond (μs)',
      'nanosecond': 'Nanosecond (ns)'
    },
    energy: {
      'joule': 'Joule (J)',
      'kilojoule': 'Kilojoule (kJ)',
      'calorie': 'Calorie (cal)',
      'kilocalorie': 'Kilocalorie (kcal)',
      'watt_hour': 'Watt Hour (Wh)',
      'kilowatt_hour': 'Kilowatt Hour (kWh)',
      'btu': 'British Thermal Unit (BTU)'
    }
  };

  const categoryLabels: CategoryLabels = {
    'length': 'Length',
    'weight': 'Weight & Mass',
    'area': 'Area',
    'volume': 'Volume',
    'time': 'Time',
    'energy': 'Energy'
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(conversions[newCategory]);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setResult(null);
    setInputValue('');
  };

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    const fromFactor = conversions[category][fromUnit];
    const toFactor = conversions[category][toUnit];
    
    // Convert to base unit first, then to target unit
    const baseValue = value / fromFactor;
    const convertedValue = baseValue * toFactor;
    
    setResult(convertedValue);
  };

  const clear = () => {
    setInputValue('');
    setResult(null);
  };

  const getCurrentUnits = () => {
    return Object.keys(conversions[category] || {});
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">🔄</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit Converter</h1>
        <p className="text-gray-600">Convert between different units of measurement with ease</p>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`p-3 rounded-lg text-center transition-colors ${
                category === key
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium text-sm">{label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Value */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Value to Convert
        </label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter value"
        />
      </div>

      {/* Unit Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {getCurrentUnits().map(unit => (
              <option key={unit} value={unit}>
                {unitLabels[category]?.[unit] || unit}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {getCurrentUnits().map(unit => (
              <option key={unit} value={unit}>
                {unitLabels[category]?.[unit] || unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={convert}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Convert
        </button>
        <button
          onClick={clear}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-4 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">
              {inputValue} {unitLabels[category]?.[fromUnit]} equals
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {result.toLocaleString(undefined, { maximumFractionDigits: 10 })}
            </div>
            <div className="text-sm text-gray-600">
              {unitLabels[category]?.[toUnit]}
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reference - Common Conversions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>1 meter:</span>
              <span className="font-medium">3.28 feet</span>
            </div>
            <div className="flex justify-between">
              <span>1 kilogram:</span>
              <span className="font-medium">2.20 pounds</span>
            </div>
            <div className="flex justify-between">
              <span>1 liter:</span>
              <span className="font-medium">0.26 US gallons</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>1 kilometer:</span>
              <span className="font-medium">0.62 miles</span>
            </div>
            <div className="flex justify-between">
              <span>1 acre:</span>
              <span className="font-medium">4,047 m²</span>
            </div>
            <div className="flex justify-between">
              <span>1 hour:</span>
              <span className="font-medium">3,600 seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Conversion Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Double-check your unit selections before converting</li>
          <li>• For scientific work, consider significant figures in your results</li>
          <li>• Use the clear button to reset and start fresh conversions</li>
          <li>• Results are displayed with high precision for accuracy</li>
          <li>• Switch categories using the buttons above for different types of measurements</li>
        </ul>
      </div>
    </div>
  );
}