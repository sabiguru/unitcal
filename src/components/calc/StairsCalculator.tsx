'use client';

import { useState } from 'react';

export default function StairsCalculator() {
  const [totalRise, setTotalRise] = useState('');
  const [totalRun, setTotalRun] = useState('');
  const [result, setResult] = useState<{steps: number; riser: number; tread: number} | null>(null);

  const calculate = () => {
    const rise = parseFloat(totalRise);
    const run = parseFloat(totalRun);

    if (isNaN(rise) || isNaN(run) || rise <= 0 || run <= 0) return;

    // Calculate stairs
    const numberOfSteps = Math.round(rise / 7.5);
    const riserHeight = rise / numberOfSteps;
    const treadDepth = run / (numberOfSteps - 1);

    setResult({
      steps: numberOfSteps,
      riser: Math.round(riserHeight * 100) / 100,
      tread: Math.round(treadDepth * 100) / 100
    });
  };

  const clear = () => {
    setTotalRise('');
    setTotalRun('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🪜</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stairs Calculator — Stair Rise, Run & Construction Calculator</h1>
          <p className="text-gray-600">Calculate stair dimensions and building code compliance</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Rise (inches)</label>
              <input
                type="number"
                value={totalRise}
                onChange={(e) => setTotalRise(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="96"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Run (inches)</label>
              <input
                type="number"
                value={totalRun}
                onChange={(e) => setTotalRun(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="120"
              />
            </div>
          </div>

          {result && (
            <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Stair Dimensions</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-900">{result.steps}</div>
                  <div className="text-amber-700">Steps</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-900">{result.riser}"</div>
                  <div className="text-amber-700">Riser Height</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-900">{result.tread}"</div>
                  <div className="text-amber-700">Tread Depth</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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