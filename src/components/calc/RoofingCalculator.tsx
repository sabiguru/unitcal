'use client';

import { useState } from 'react';

export default function RoofingCalculator() {
  const [roofType, setRoofType] = useState('gable');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [pitch, setPitch] = useState('6');
  const [materialType, setMaterialType] = useState('shingles');
  const [result, setResult] = useState<{area: number; squares: number} | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const p = parseFloat(pitch) || 6;

    if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return;

    // Simple calculation
    const baseArea = l * w;
    const pitchMultiplier = Math.sqrt(1 + (p / 12) * (p / 12));
    const roofArea = baseArea * pitchMultiplier * 1.1; // Add 10% for waste
    const squares = roofArea / 100;

    setResult({
      area: Math.round(roofArea),
      squares: Math.round(squares * 10) / 10
    });
  };

  const clear = () => {
    setLength('');
    setWidth('');
    setPitch('6');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🏠</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Roofing Calculator — Shingles & Roofing Materials Calculator</h1>
          <p className="text-gray-600">Calculate roofing materials and costs for your project</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Roof Type</label>
            <select
              value={roofType}
              onChange={(e) => setRoofType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="gable">Gable</option>
              <option value="hip">Hip</option>
              <option value="shed">Shed</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width (ft)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Roof Pitch</label>
            <input
              type="number"
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="6"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Material Type</label>
            <select
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="shingles">Asphalt Shingles</option>
              <option value="metal">Metal Roofing</option>
              <option value="tile">Clay Tile</option>
            </select>
          </div>

          {result && (
            <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-900 mb-4">Results</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-900">{result.area} ft²</div>
                  <div className="text-orange-700">Total Area</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-900">{result.squares}</div>
                  <div className="text-orange-700">Roofing Squares</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
    </div>
  );
}