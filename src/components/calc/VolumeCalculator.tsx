'use client';

import { useState } from 'react';

export default function VolumeCalculator() {
  const [shape, setShape] = useState<'rectangular' | 'cylindrical' | 'spherical' | 'cubic'>('rectangular');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [radius, setRadius] = useState<string>('');
  const [side, setSide] = useState<string>('');
  const [unit, setUnit] = useState<'feet' | 'meters' | 'inches'>('feet');
  const [result, setResult] = useState<{volume: number; unitLabel: string} | null>(null);

  const calculate = () => {
    let volume = 0;

    switch (shape) {
      case 'rectangular':
        const l = parseFloat(length);
        const w = parseFloat(width);
        const h = parseFloat(height);
        if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) return;
        volume = l * w * h;
        break;
      
      case 'cubic':
        const s = parseFloat(side);
        if (isNaN(s) || s <= 0) return;
        volume = s * s * s;
        break;
      
      case 'cylindrical':
        const r = parseFloat(radius);
        const cylH = parseFloat(height);
        if (isNaN(r) || isNaN(cylH) || r <= 0 || cylH <= 0) return;
        volume = Math.PI * r * r * cylH;
        break;
      
      case 'spherical':
        const sphereR = parseFloat(radius);
        if (isNaN(sphereR) || sphereR <= 0) return;
        volume = (4/3) * Math.PI * sphereR * sphereR * sphereR;
        break;
    }

    const unitMap = {
      feet: 'ft³',
      meters: 'm³',
      inches: 'in³'
    };

    setResult({
      volume: Math.round(volume * 100) / 100,
      unitLabel: unitMap[unit]
    });
  };

  const clear = () => {
    setLength('');
    setWidth('');
    setHeight('');
    setRadius('');
    setSide('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">📦</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Volume Calculator — Spheres, Cylinders & More</h1>
          <p className="text-gray-600">Calculate volume for various geometric shapes</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
            <div className="grid grid-cols-2 gap-2">
              {(['rectangular', 'cubic', 'cylindrical', 'spherical'] as const).map((shapeType) => (
                <button
                  key={shapeType}
                  onClick={() => setShape(shapeType)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    shape === shapeType
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {shapeType.charAt(0).toUpperCase() + shapeType.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
            <div className="grid grid-cols-3 gap-2">
              {(['feet', 'meters', 'inches'] as const).map((unitType) => (
                <button
                  key={unitType}
                  onClick={() => setUnit(unitType)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    unit === unitType
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {unitType}
                </button>
              ))}
            </div>
          </div>

          {shape === 'rectangular' && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="6"
                />
              </div>
            </div>
          )}

          {shape === 'cubic' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Side Length</label>
              <input
                type="number"
                value={side}
                onChange={(e) => setSide(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5"
              />
            </div>
          )}

          {shape === 'cylindrical' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Radius</label>
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="8"
                />
              </div>
            </div>
          )}

          {shape === 'spherical' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Radius</label>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="4"
              />
            </div>
          )}

          {result && (
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-1">
                  {result.volume} {result.unitLabel}
                </div>
                <div className="text-blue-700">Volume</div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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