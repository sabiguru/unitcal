'use client';

import { useState } from 'react';

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState<string>('');
  const [roomWidth, setRoomWidth] = useState<string>('');
  const [tileLength, setTileLength] = useState<string>('');
  const [tileWidth, setTileWidth] = useState<string>('');
  const [unit, setUnit] = useState<'feet' | 'inches' | 'meters' | 'cm'>('feet');
  const [wastage, setWastage] = useState<string>('10');
  const [costPerTile, setCostPerTile] = useState<string>('');
  const [result, setResult] = useState<{
    roomArea: number;
    tileArea: number;
    tilesNeeded: number;
    tilesWithWastage: number;
    totalCost: number;
    unitLabel: string;
  } | null>(null);

  const calculate = () => {
    const rLength = parseFloat(roomLength);
    const rWidth = parseFloat(roomWidth);
    const tLength = parseFloat(tileLength);
    const tWidth = parseFloat(tileWidth);
    const waste = parseFloat(wastage) || 0;
    const cost = parseFloat(costPerTile) || 0;

    if (isNaN(rLength) || isNaN(rWidth) || isNaN(tLength) || isNaN(tWidth) || 
        rLength <= 0 || rWidth <= 0 || tLength <= 0 || tWidth <= 0) return;

    // Convert everything to square feet for consistency
    let roomAreaSqFt = rLength * rWidth;
    let tileAreaSqFt = tLength * tWidth;

    // Convert based on unit
    switch (unit) {
      case 'inches':
        roomAreaSqFt = roomAreaSqFt / 144; // sq inches to sq feet
        tileAreaSqFt = tileAreaSqFt / 144;
        break;
      case 'meters':
        roomAreaSqFt = roomAreaSqFt * 10.764; // sq meters to sq feet
        tileAreaSqFt = tileAreaSqFt * 10.764;
        break;
      case 'cm':
        roomAreaSqFt = roomAreaSqFt / 929.03; // sq cm to sq feet
        tileAreaSqFt = tileAreaSqFt / 929.03;
        break;
    }

    const tilesNeeded = Math.ceil(roomAreaSqFt / tileAreaSqFt);
    const tilesWithWastage = Math.ceil(tilesNeeded * (1 + waste / 100));
    const totalCost = tilesWithWastage * cost;

    const unitMap = {
      feet: 'ft',
      inches: 'in',
      meters: 'm',
      cm: 'cm'
    };

    setResult({
      roomArea: Math.round(rLength * rWidth * 100) / 100,
      tileArea: Math.round(tLength * tWidth * 100) / 100,
      tilesNeeded,
      tilesWithWastage,
      totalCost: Math.round(totalCost * 100) / 100,
      unitLabel: unitMap[unit]
    });
  };

  const clear = () => {
    setRoomLength('');
    setRoomWidth('');
    setTileLength('');
    setTileWidth('');
    setCostPerTile('');
    setResult(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">🔲</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tile Calculator — Tile & Flooring Materials Calculator</h1>
        <p className="text-gray-600">Calculate tiles needed and costs for your project</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as any)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="feet">Feet</option>
            <option value="inches">Inches</option>
            <option value="meters">Meters</option>
            <option value="cm">Centimeters</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Length</label>
            <input
              type="number"
              value={roomLength}
              onChange={(e) => setRoomLength(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter length"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Width</label>
            <input
              type="number"
              value={roomWidth}
              onChange={(e) => setRoomWidth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter width"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tile Length</label>
            <input
              type="number"
              value={tileLength}
              onChange={(e) => setTileLength(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter tile length"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tile Width</label>
            <input
              type="number"
              value={tileWidth}
              onChange={(e) => setTileWidth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter tile width"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Wastage (%)</label>
            <input
              type="number"
              value={wastage}
              onChange={(e) => setWastage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10"
              min="0"
              max="50"
              step="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cost per Tile ($)</label>
            <input
              type="number"
              value={costPerTile}
              onChange={(e) => setCostPerTile(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Optional"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="flex space-x-4">
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

        {result && (
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-1">
                    {result.roomArea}
                  </div>
                  <div className="text-sm text-blue-700">Room Area ({result.unitLabel}²)</div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-900 mb-1">
                    {result.tileArea}
                  </div>
                  <div className="text-sm text-green-700">Tile Area ({result.unitLabel}²)</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-900 mb-1">
                    {result.tilesNeeded}
                  </div>
                  <div className="text-sm text-purple-700">Tiles Needed</div>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-900 mb-1">
                    {result.tilesWithWastage}
                  </div>
                  <div className="text-sm text-orange-700">With Wastage</div>
                </div>
              </div>
            </div>
            
            {result.totalCost > 0 && (
              <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${result.totalCost}
                  </div>
                  <div className="text-lg text-gray-700">Total Cost</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}