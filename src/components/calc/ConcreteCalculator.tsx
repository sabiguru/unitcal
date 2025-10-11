'use client';

import { useState } from 'react';

export default function ConcreteCalculator() {
  const [shape, setShape] = useState<'slab' | 'footing' | 'column' | 'stairs'>('slab');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [thickness, setThickness] = useState<string>('');
  const [depth, setDepth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [steps, setSteps] = useState<string>('');
  const [bagSize, setBagSize] = useState<string>('80');
  const [bagCost, setBagCost] = useState<string>('');
  const [result, setResult] = useState<{
    volume: number;
    cubicYards: number;
    bags: number;
    totalCost: number;
  } | null>(null);

  const calculate = () => {
    let volume = 0; // in cubic feet
    const size = parseFloat(bagSize) || 80;
    const cost = parseFloat(bagCost) || 0;

    switch (shape) {
      case 'slab':
        const l = parseFloat(length);
        const w = parseFloat(width);
        const t = parseFloat(thickness);
        if (isNaN(l) || isNaN(w) || isNaN(t) || l <= 0 || w <= 0 || t <= 0) return;
        volume = l * w * (t / 12); // thickness in inches to feet
        break;
      
      case 'footing':
        const fL = parseFloat(length);
        const fW = parseFloat(width);
        const fD = parseFloat(depth);
        if (isNaN(fL) || isNaN(fW) || isNaN(fD) || fL <= 0 || fW <= 0 || fD <= 0) return;
        volume = fL * fW * (fD / 12); // depth in inches to feet
        break;
      
      case 'column':
        const cW = parseFloat(width);
        const cH = parseFloat(height);
        if (isNaN(cW) || isNaN(cH) || cW <= 0 || cH <= 0) return;
        volume = cW * cW * cH; // square column
        break;
      
      case 'stairs':
        const sW = parseFloat(width);
        const sL = parseFloat(length);
        const sSteps = parseFloat(steps) || 1;
        if (isNaN(sW) || isNaN(sL) || sW <= 0 || sL <= 0) return;
        // Approximate volume for stairs
        volume = sW * sL * 0.5 * sSteps; // rough estimate
        break;
    }

    const cubicYards = volume / 27; // convert cubic feet to cubic yards
    
    // Calculate bags needed based on bag size
    let coverage = 0;
    switch (size) {
      case 40:
        coverage = 0.011; // cubic yards per 40lb bag
        break;
      case 60:
        coverage = 0.017; // cubic yards per 60lb bag
        break;
      case 80:
      default:
        coverage = 0.022; // cubic yards per 80lb bag
        break;
    }
    
    const bags = Math.ceil(cubicYards / coverage);
    const totalCost = bags * cost;

    setResult({
      volume: Math.round(volume * 100) / 100,
      cubicYards: Math.round(cubicYards * 100) / 100,
      bags,
      totalCost: Math.round(totalCost * 100) / 100
    });
  };

  const clear = () => {
    setLength('');
    setWidth('');
    setThickness('');
    setDepth('');
    setHeight('');
    setSteps('');
    setBagCost('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🏗️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Concrete Calculator — Volume & Materials Calculator</h1>
          <p className="text-gray-600">Calculate concrete volume and material requirements for your project</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['slab', 'footing', 'column', 'stairs'] as const).map((shapeType) => (
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

          <div className="space-y-6">
            {shape === 'slab' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length (ft)</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width (ft)</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thickness (inches)</label>
                  <input
                    type="number"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="4"
                    min="0"
                    step="0.5"
                  />
                </div>
              </>
            )}

            {shape === 'footing' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length (ft)</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width (ft)</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Depth (inches)</label>
                  <input
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="24"
                    min="0"
                    step="1"
                  />
                </div>
              </>
            )}

            {shape === 'column' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Width (ft)</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (ft)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter height"
                    min="0"
                    step="0.1"
                  />
                </div>
              </>
            )}

            {shape === 'stairs' && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width (ft)</label>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length (ft)</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Steps</label>
                    <input
                      type="number"
                      value={steps}
                      onChange={(e) => setSteps(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="3"
                      min="1"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bag Size (lbs)</label>
                <select
                  value={bagSize}
                  onChange={(e) => setBagSize(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="40">40 lb</option>
                  <option value="60">60 lb</option>
                  <option value="80">80 lb</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cost per Bag ($)</label>
                <input
                  type="number"
                  value={bagCost}
                  onChange={(e) => setBagCost(e.target.value)}
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
                      {result.volume} ft³
                    </div>
                    <div className="text-sm text-blue-700">Volume</div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900 mb-1">
                      {result.cubicYards} yd³
                    </div>
                    <div className="text-sm text-green-700">Cubic Yards</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-900 mb-2">
                    {result.bags} bags
                  </div>
                  <div className="text-lg text-purple-700">{bagSize} lb bags needed</div>
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

      {/* Bag Coverage */}
      <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-gray-600 mr-2">📦</span>
          Bag Coverage
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <span className="font-bold text-gray-900">40 lb</span>
            <span className="text-gray-600 text-sm">~0.011 yd³</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <span className="font-bold text-gray-900">60 lb</span>
            <span className="text-gray-600 text-sm">~0.017 yd³</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <span className="font-bold text-gray-900">80 lb</span>
            <span className="text-gray-600 text-sm">~0.022 yd³</span>
          </div>
        </div>
      </div>

      {/* Common Thickness */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📏</span>
          Common Thickness
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <span className="font-bold text-blue-900">Sidewalk</span>
            <span className="text-blue-600 text-sm">4 inches</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <span className="font-bold text-blue-900">Driveway</span>
            <span className="text-blue-600 text-sm">4-6 inches</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <span className="font-bold text-blue-900">Patio</span>
            <span className="text-blue-600 text-sm">4 inches</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <span className="font-bold text-blue-900">Garage</span>
            <span className="text-blue-600 text-sm">6 inches</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💡</span>
          Construction Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Order 5-10% extra material</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Consider delivery costs in budget</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Check local building codes</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Use proper reinforcement (rebar)</div>
          </div>
        </div>
      </div>
    </div>
  );
}