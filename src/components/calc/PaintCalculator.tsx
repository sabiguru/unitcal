'use client';

import React, { useState } from 'react';

export default function PaintCalculator() {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('8');
  const [doors, setDoors] = useState<string>('2');
  const [windows, setWindows] = useState<string>('4');
  const [coats, setCoats] = useState<string>('2');
  const [coverage, setCoverage] = useState<string>('350');
  const [paintCost, setPaintCost] = useState<string>('');
  const [result, setResult] = useState<{
    wallArea: number;
    paintableArea: number;
    gallonsNeeded: number;
    totalCost: number;
  } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const d = parseFloat(doors) || 0;
    const win = parseFloat(windows) || 0;
    const c = parseFloat(coats) || 1;
    const cov = parseFloat(coverage) || 350;
    const cost = parseFloat(paintCost) || 0;

    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) return;

    const wallArea = 2 * (l * h) + 2 * (w * h);
    const doorArea = d * 20;
    const windowArea = win * 12;
    
    const paintableArea = Math.max(0, wallArea - doorArea - windowArea);
    const totalAreaToPaint = paintableArea * c;
    const gallonsNeeded = Math.ceil(totalAreaToPaint / cov);
    const totalCost = gallonsNeeded * cost;

    setResult({
      wallArea: Math.round(wallArea),
      paintableArea: Math.round(paintableArea),
      gallonsNeeded,
      totalCost: Math.round(totalCost * 100) / 100
    });
  };

  const clear = () => {
    setLength('');
    setWidth('');
    setHeight('8');
    setDoors('2');
    setWindows('4');
    setCoats('2');
    setCoverage('350');
    setPaintCost('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🎨</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paint Calculator — Room Paint & Coverage Calculator</h1>
          <p className="text-gray-600">Calculate paint needed and costs for your room</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter length"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Width (ft)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter width"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (ft)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doors</label>
              <input
                type="number"
                value={doors}
                onChange={(e) => setDoors(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Windows</label>
              <input
                type="number"
                value={windows}
                onChange={(e) => setWindows(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Coats</label>
              <input
                type="number"
                value={coats}
                onChange={(e) => setCoats(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Coverage (sq ft/gal)</label>
              <input
                type="number"
                value={coverage}
                onChange={(e) => setCoverage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="200"
                max="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paint Cost ($/gal)</label>
              <input
                type="number"
                value={paintCost}
                onChange={(e) => setPaintCost(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-1">
                    {result.wallArea} ft²
                  </div>
                  <div className="text-sm text-blue-700">Total Wall Area</div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-900 mb-1">
                    {result.paintableArea} ft²
                  </div>
                  <div className="text-sm text-green-700">Paintable Area</div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">
                  {result.gallonsNeeded} gallons
                </div>
                <div className="text-lg text-purple-700">Paint Needed</div>
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