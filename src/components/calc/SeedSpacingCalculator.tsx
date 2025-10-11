'use client';

import { useState } from 'react';

type Unit = 'feet' | 'inches' | 'meters' | 'centimeters';

interface PlantSpacing {
  plantSpacing: number;
  rowSpacing: number;
  unit: string;
}

interface SpacingResult {
  totalPlants: number;
  plantsPerRow: number;
  numberOfRows: number;
  areaPerPlant: number;
  gardenArea: number;
  plantingPattern: string;
}

export default function SeedSpacingCalculator() {
  const [gardenLength, setGardenLength] = useState<string>('');
  const [gardenWidth, setGardenWidth] = useState<string>('');
  const [plantSpacing, setPlantSpacing] = useState<string>('');
  const [rowSpacing, setRowSpacing] = useState<string>('');
  const [unit, setUnit] = useState<Unit>('feet');
  const [plantType, setPlantType] = useState<string>('custom');
  const [result, setResult] = useState<SpacingResult | null>(null);

  const commonPlants: Record<string, PlantSpacing> = {
    tomatoes: { plantSpacing: 24, rowSpacing: 36, unit: 'inches' },
    lettuce: { plantSpacing: 6, rowSpacing: 12, unit: 'inches' },
    carrots: { plantSpacing: 2, rowSpacing: 6, unit: 'inches' },
    peppers: { plantSpacing: 18, rowSpacing: 24, unit: 'inches' },
    beans: { plantSpacing: 4, rowSpacing: 18, unit: 'inches' },
    corn: { plantSpacing: 8, rowSpacing: 30, unit: 'inches' },
    squash: { plantSpacing: 36, rowSpacing: 48, unit: 'inches' },
    onions: { plantSpacing: 4, rowSpacing: 12, unit: 'inches' },
    spinach: { plantSpacing: 4, rowSpacing: 12, unit: 'inches' },
    radishes: { plantSpacing: 1, rowSpacing: 6, unit: 'inches' }
  };

  const handlePlantTypeChange = (type: string) => {
    setPlantType(type);
    if (type !== 'custom' && commonPlants[type]) {
      const plant = commonPlants[type];
      setPlantSpacing(plant.plantSpacing.toString());
      setRowSpacing(plant.rowSpacing.toString());
    }
  };

  const convertToInches = (value: number, fromUnit: string): number => {
    switch (fromUnit) {
      case 'feet': return value * 12;
      case 'inches': return value;
      case 'meters': return value * 39.3701;
      case 'centimeters': return value * 0.393701;
      default: return value;
    }
  };

  const calculate = () => {
    const lengthNum = parseFloat(gardenLength);
    const widthNum = parseFloat(gardenWidth);
    const plantSpacingNum = parseFloat(plantSpacing);
    const rowSpacingNum = parseFloat(rowSpacing);

    if (isNaN(lengthNum) || isNaN(widthNum) || isNaN(plantSpacingNum) || isNaN(rowSpacingNum)) return;

    // Convert all measurements to inches for calculation
    const lengthInches = convertToInches(lengthNum, unit);
    const widthInches = convertToInches(widthNum, unit);
    const plantSpacingInches = convertToInches(plantSpacingNum, unit);
    const rowSpacingInches = convertToInches(rowSpacingNum, unit);

    // Calculate number of plants per row
    const plantsPerRow = Math.floor(lengthInches / plantSpacingInches);
    
    // Calculate number of rows
    const numberOfRows = Math.floor(widthInches / rowSpacingInches);
    
    // Total plants
    const totalPlants = plantsPerRow * numberOfRows;
    
    // Area per plant in square inches
    const areaPerPlant = plantSpacingInches * rowSpacingInches;
    
    // Garden area in square inches
    const gardenArea = lengthInches * widthInches;
    
    setResult({
      totalPlants,
      plantsPerRow,
      numberOfRows,
      areaPerPlant,
      gardenArea,
      plantingPattern: `${plantsPerRow} plants × ${numberOfRows} rows`
    });
  };

  const clear = () => {
    setGardenLength('');
    setGardenWidth('');
    setPlantSpacing('');
    setRowSpacing('');
    setPlantType('custom');
    setResult(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🌱</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seed Spacing Calculator — Garden Plant Spacing Calculator</h1>
          <p className="text-gray-600">Calculate optimal plant spacing and garden capacity</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Plant Type</label>
        <select
          value={plantType}
          onChange={(e) => handlePlantTypeChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="custom">Custom</option>
          <option value="tomatoes">Tomatoes</option>
          <option value="lettuce">Lettuce</option>
          <option value="carrots">Carrots</option>
          <option value="peppers">Peppers</option>
          <option value="beans">Beans</option>
          <option value="corn">Corn</option>
          <option value="squash">Squash</option>
          <option value="onions">Onions</option>
          <option value="spinach">Spinach</option>
          <option value="radishes">Radishes</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
        <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-1">
          <button
            onClick={() => setUnit('feet')}
            className={`flex-1 py-2 px-2 rounded-md text-sm font-medium transition-colors ${
              unit === 'feet'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Feet
          </button>
          <button
            onClick={() => setUnit('inches')}
            className={`flex-1 py-2 px-2 rounded-md text-sm font-medium transition-colors ${
              unit === 'inches'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Inches
          </button>
          <button
            onClick={() => setUnit('meters')}
            className={`flex-1 py-2 px-2 rounded-md text-sm font-medium transition-colors ${
              unit === 'meters'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Meters
          </button>
          <button
            onClick={() => setUnit('centimeters')}
            className={`flex-1 py-2 px-2 rounded-md text-sm font-medium transition-colors ${
              unit === 'centimeters'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            CM
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Garden Length ({unit})
            </label>
            <input
              type="number"
              value={gardenLength}
              onChange={(e) => setGardenLength(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Length"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Garden Width ({unit})
            </label>
            <input
              type="number"
              value={gardenWidth}
              onChange={(e) => setGardenWidth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Width"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plant Spacing ({unit})
            </label>
            <input
              type="number"
              value={plantSpacing}
              onChange={(e) => setPlantSpacing(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Distance between plants"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Row Spacing ({unit})
            </label>
            <input
              type="number"
              value={rowSpacing}
              onChange={(e) => setRowSpacing(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Distance between rows"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-200">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-green-900 mb-2">
              {result.totalPlants}
            </div>
            <div className="text-lg text-green-700">Total Plants</div>
          </div>
          
          <div className="border-t border-green-200 pt-4 space-y-3">
            <div className="flex justify-between">
              <span>Planting Pattern:</span>
              <span className="font-medium">{result.plantingPattern}</span>
            </div>
            <div className="flex justify-between">
              <span>Plants per Row:</span>
              <span className="font-medium">{result.plantsPerRow}</span>
            </div>
            <div className="flex justify-between">
              <span>Number of Rows:</span>
              <span className="font-medium">{result.numberOfRows}</span>
            </div>
            <div className="flex justify-between">
              <span>Space per Plant:</span>
              <span className="font-medium">{(result.areaPerPlant / 144).toFixed(2)} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span>Garden Area:</span>
              <span className="font-medium">{(result.gardenArea / 144).toFixed(2)} sq ft</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-4 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Common Spacing Reference */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Spacing (inches)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tomatoes:</span>
              <span className="font-medium">24" × 36"</span>
            </div>
            <div className="flex justify-between">
              <span>Lettuce:</span>
              <span className="font-medium">6" × 12"</span>
            </div>
            <div className="flex justify-between">
              <span>Carrots:</span>
              <span className="font-medium">2" × 6"</span>
            </div>
            <div className="flex justify-between">
              <span>Peppers:</span>
              <span className="font-medium">18" × 24"</span>
            </div>
            <div className="flex justify-between">
              <span>Beans:</span>
              <span className="font-medium">4" × 18"</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Corn:</span>
              <span className="font-medium">8" × 30"</span>
            </div>
            <div className="flex justify-between">
              <span>Squash:</span>
              <span className="font-medium">36" × 48"</span>
            </div>
            <div className="flex justify-between">
              <span>Onions:</span>
              <span className="font-medium">4" × 12"</span>
            </div>
            <div className="flex justify-between">
              <span>Spinach:</span>
              <span className="font-medium">4" × 12"</span>
            </div>
            <div className="flex justify-between">
              <span>Radishes:</span>
              <span className="font-medium">1" × 6"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing Tips */}
      <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Spacing Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Consider mature plant size when spacing</li>
          <li>• Account for air circulation to prevent disease</li>
          <li>• Plan for harvest accessibility between rows</li>
          <li>• Follow seed packet recommendations as guidelines</li>
          <li>• Adjust spacing based on growing conditions and climate</li>
        </ul>
      </div>
    </div>
  );
}