'use client';

import { useState } from 'react';

export default function AreaCalculator() {
  const [shape, setShape] = useState<'rectangle' | 'circle' | 'triangle' | 'trapezoid'>('rectangle');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [radius, setRadius] = useState('');
  const [base1, setBase1] = useState('');
  const [base2, setBase2] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'feet' | 'meters' | 'inches' | 'yards'>('feet');
  const [result, setResult] = useState<any>(null);

  const calculateArea = () => {
    let area = 0;
    
    switch (shape) {
      case 'rectangle':
        const l = parseFloat(length);
        const w = parseFloat(width);
        if (!isNaN(l) && !isNaN(w)) area = l * w;
        break;
      case 'circle':
        const r = parseFloat(radius);
        if (!isNaN(r)) area = Math.PI * r * r;
        break;
      case 'triangle':
        const b = parseFloat(length);
        const h = parseFloat(height);
        if (!isNaN(b) && !isNaN(h)) area = 0.5 * b * h;
        break;
      case 'trapezoid':
        const b1 = parseFloat(base1);
        const b2 = parseFloat(base2);
        const h2 = parseFloat(height);
        if (!isNaN(b1) && !isNaN(b2) && !isNaN(h2)) area = 0.5 * (b1 + b2) * h2;
        break;
    }

    // Convert to different units
    const conversions = {
      'square feet': area,
      'square meters': unit === 'feet' ? area * 0.092903 : unit === 'meters' ? area : area * (unit === 'inches' ? 0.00064516 : 0.836127),
      'square inches': unit === 'feet' ? area * 144 : unit === 'meters' ? area * 1550.0031 : unit === 'inches' ? area : area * 1296,
      'square yards': unit === 'feet' ? area / 9 : unit === 'meters' ? area * 1.19599 : unit === 'inches' ? area / 1296 : area,
      'acres': unit === 'feet' ? area / 43560 : unit === 'meters' ? area / 4047 : area / (unit === 'inches' ? 6272640 : 4840)
    };

    setResult({
      area,
      conversions,
      perimeter: calculatePerimeter()
    });
  };

  const calculatePerimeter = () => {
    switch (shape) {
      case 'rectangle':
        const l = parseFloat(length);
        const w = parseFloat(width);
        return !isNaN(l) && !isNaN(w) ? 2 * (l + w) : 0;
      case 'circle':
        const r = parseFloat(radius);
        return !isNaN(r) ? 2 * Math.PI * r : 0;
      default:
        return 0;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">📐</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Area Calculator — Square Footage & Shape Area Calculator</h1>
          <p className="text-gray-600">Calculate area and perimeter for various shapes</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
        {/* Shape Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['rectangle', 'circle', 'triangle', 'trapezoid'] as const).map((shapeOption) => (
              <button
                key={shapeOption}
                onClick={() => setShape(shapeOption)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  shape === shapeOption
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {shapeOption.charAt(0).toUpperCase() + shapeOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
          <div className="grid grid-cols-4 gap-4">
            {(['feet', 'meters', 'inches', 'yards'] as const).map((unitOption) => (
              <button
                key={unitOption}
                onClick={() => setUnit(unitOption)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  unit === unitOption
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {unitOption}
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields Based on Shape */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shape === 'rectangle' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length ({unit})</label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width ({unit})</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="8"
                />
              </div>
            </>
          )}

          {shape === 'circle' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Radius ({unit})</label>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="5"
              />
            </div>
          )}

          {shape === 'triangle' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base ({unit})</label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height ({unit})</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="6"
                />
              </div>
            </>
          )}

          {shape === 'trapezoid' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base 1 ({unit})</label>
                <input
                  type="number"
                  value={base1}
                  onChange={(e) => setBase1(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base 2 ({unit})</label>
                <input
                  type="number"
                  value={base2}
                  onChange={(e) => setBase2(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height ({unit})</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="4"
                />
              </div>
            </>
          )}
        </div>

        <button
          onClick={calculateArea}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate Area
        </button>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Area Conversions</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(result.conversions).map(([unit, value]) => (
                      <div key={unit} className="flex justify-between">
                        <span>{unit}:</span>
                        <span className="font-medium">{(value as number).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {result.perimeter > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Perimeter</h4>
                    <div className="text-2xl font-bold text-green-900">
                      {result.perimeter.toFixed(2)} {unit}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}