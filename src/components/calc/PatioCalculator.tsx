'use client';

import { useState } from 'react';

export default function PatioCalculator() {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');
  const [materialType, setMaterialType] = useState<'concrete' | 'pavers' | 'flagstone' | 'brick'>('concrete');
  const [result, setResult] = useState<{
    area: number;
    materials: {
      concrete?: { bags: number; cost: number };
      pavers?: { quantity: number; cost: number };
      flagstone?: { tons: number; cost: number };
      brick?: { quantity: number; cost: number };
    };
  } | null>(null);

  const materialCosts = {
    concrete: { bagsPerSqFt: 0.017, costPerBag: 4.50 },
    pavers: { piecesPerSqFt: 4.5, costPerPiece: 0.50 },
    flagstone: { tonsPerSqFt: 0.083, costPerTon: 300 },
    brick: { piecesPerSqFt: 4.5, costPerPiece: 0.35 }
  };

  const calculate = () => {
    const lengthNum = parseFloat(length);
    const widthNum = parseFloat(width);

    if (isNaN(lengthNum) || isNaN(widthNum)) return;

    let areaSqFt = lengthNum * widthNum;
    if (unit === 'meters') {
      areaSqFt = areaSqFt * 10.764;
    }

    const materials: any = {};

    switch (materialType) {
      case 'concrete':
        const bags = Math.ceil(areaSqFt * materialCosts.concrete.bagsPerSqFt);
        materials.concrete = {
          bags,
          cost: bags * materialCosts.concrete.costPerBag
        };
        break;
      case 'pavers':
        const paverQty = Math.ceil(areaSqFt * materialCosts.pavers.piecesPerSqFt);
        materials.pavers = {
          quantity: paverQty,
          cost: paverQty * materialCosts.pavers.costPerPiece
        };
        break;
      case 'flagstone':
        const tons = (areaSqFt * materialCosts.flagstone.tonsPerSqFt).toFixed(2);
        materials.flagstone = {
          tons: parseFloat(tons),
          cost: parseFloat(tons) * materialCosts.flagstone.costPerTon
        };
        break;
      case 'brick':
        const brickQty = Math.ceil(areaSqFt * materialCosts.brick.piecesPerSqFt);
        materials.brick = {
          quantity: brickQty,
          cost: brickQty * materialCosts.brick.costPerPiece
        };
        break;
    }

    setResult({
      area: areaSqFt,
      materials
    });
  };

  const clear = () => {
    setLength('');
    setWidth('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🏡</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patio Calculator — Pavers, Sand & Materials Calculator</h1>
          <p className="text-gray-600">Calculate patio area and material requirements</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-1">
            <button
              onClick={() => setUnit('feet')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                unit === 'feet'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Feet
            </button>
            <button
              onClick={() => setUnit('meters')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                unit === 'meters'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Meters
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length ({unit})
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter length in ${unit}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width ({unit})
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter width in ${unit}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Material Type</label>
            <select
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value as any)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="concrete">Concrete</option>
              <option value="pavers">Pavers</option>
              <option value="flagstone">Flagstone</option>
              <option value="brick">Brick</option>
            </select>
          </div>
        </div>

        {result && (
          <div className="mt-6 p-6 bg-gray-50 rounded-xl">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {result.area.toFixed(1)} sq ft
              </div>
              <div className="text-lg text-gray-600">Patio Area</div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Material Requirements:</h4>
              {result.materials.concrete && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Concrete Bags (80lb):</span>
                    <span className="font-medium">{result.materials.concrete.bags}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Cost:</span>
                    <span className="font-medium text-green-600">${result.materials.concrete.cost.toFixed(2)}</span>
                  </div>
                </div>
              )}
              {result.materials.pavers && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Pavers Needed:</span>
                    <span className="font-medium">{result.materials.pavers.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Cost:</span>
                    <span className="font-medium text-green-600">${result.materials.pavers.cost.toFixed(2)}</span>
                  </div>
                </div>
              )}
              {result.materials.flagstone && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Flagstone (tons):</span>
                    <span className="font-medium">{result.materials.flagstone.tons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Cost:</span>
                    <span className="font-medium text-green-600">${result.materials.flagstone.cost.toFixed(2)}</span>
                  </div>
                </div>
              )}
              {result.materials.brick && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Bricks Needed:</span>
                    <span className="font-medium">{result.materials.brick.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Cost:</span>
                    <span className="font-medium text-green-600">${result.materials.brick.cost.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex space-x-4 mt-6">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}