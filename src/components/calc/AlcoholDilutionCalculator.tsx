'use client';

import { useState } from 'react';

export default function AlcoholDilutionCalculator() {
  const [currentVolume, setCurrentVolume] = useState('');
  const [currentABV, setCurrentABV] = useState('');
  const [targetABV, setTargetABV] = useState('');
  const [calculationType, setCalculationType] = useState('dilute');
  const [results, setResults] = useState<any>(null);

  const calculateDilution = () => {
    const volume = parseFloat(currentVolume);
    const current = parseFloat(currentABV);
    const target = parseFloat(targetABV);

    if (!volume || !current || !target) return;

    if (calculationType === 'dilute') {
      // Calculate water needed to dilute
      if (target >= current) {
        setResults({ error: 'Target ABV must be lower than current ABV for dilution' });
        return;
      }

      const finalVolume = (volume * current) / target;
      const waterToAdd = finalVolume - volume;
      const dilutionRatio = finalVolume / volume;

      setResults({
        type: 'dilution',
        currentVolume: volume,
        currentABV: current,
        targetABV: target,
        waterToAdd: waterToAdd,
        finalVolume: finalVolume,
        dilutionRatio: dilutionRatio,
        alcoholContent: volume * (current / 100),
        proofReduction: (current - target) * 2
      });
    } else {
      // Calculate how much alcohol to add to reach target ABV
      if (target <= current) {
        setResults({ error: 'Target ABV must be higher than current ABV for fortification' });
        return;
      }

      // Assuming adding pure alcohol (95% ABV)
      const alcoholToAdd = (volume * (target - current)) / (95 - target);
      const finalVolume = volume + alcoholToAdd;

      setResults({
        type: 'fortification',
        currentVolume: volume,
        currentABV: current,
        targetABV: target,
        alcoholToAdd: alcoholToAdd,
        finalVolume: finalVolume,
        alcoholStrength: 95,
        proofIncrease: (target - current) * 2
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🍷</span>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Alcohol Dilution Calculator</h2>
          <p className="text-gray-600">Calculate alcohol dilution, fortification, and blending</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCalculationType('dilute')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'dilute'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Dilute with Water
          </button>
          <button
            onClick={() => setCalculationType('fortify')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'fortify'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Fortify with Alcohol
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Volume (ml)</label>
          <input
            type="number"
            value={currentVolume}
            onChange={(e) => setCurrentVolume(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="750"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current ABV (%)</label>
          <input
            type="number"
            step="0.1"
            value={currentABV}
            onChange={(e) => setCurrentABV(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {calculationType === 'dilute' ? 'Target ABV (%)' : 'Target ABV (%)'}
          </label>
          <input
            type="number"
            step="0.1"
            value={targetABV}
            onChange={(e) => setTargetABV(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder={calculationType === 'dilute' ? '35' : '45'}
          />
        </div>
      </div>

      <button
        onClick={calculateDilution}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate {calculationType === 'dilute' ? 'Dilution' : 'Fortification'}
      </button>

      {results && !results.error && (
        <div className="mt-8 space-y-6">
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">
              {results.type === 'dilution' ? 'Dilution Results' : 'Fortification Results'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.type === 'dilution' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-900 mb-1">
                      {results.waterToAdd.toFixed(0)}ml
                    </div>
                    <div className="text-sm text-purple-700">Water to Add</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-900 mb-1">
                      {results.finalVolume.toFixed(0)}ml
                    </div>
                    <div className="text-sm text-purple-700">Final Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-900 mb-1">
                      {results.dilutionRatio.toFixed(2)}:1
                    </div>
                    <div className="text-sm text-purple-700">Dilution Ratio</div>
                  </div>
                </>
              )}
              {results.type === 'fortification' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-900 mb-1">
                      {results.alcoholToAdd.toFixed(0)}ml
                    </div>
                    <div className="text-sm text-purple-700">Alcohol to Add (95%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-900 mb-1">
                      {results.finalVolume.toFixed(0)}ml
                    </div>
                    <div className="text-sm text-purple-700">Final Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-900 mb-1">
                      +{results.proofIncrease.toFixed(1)}
                    </div>
                    <div className="text-sm text-purple-700">Proof Increase</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Starting ABV:</span>
                <span className="font-medium">{results.currentABV}% ({(results.currentABV * 2).toFixed(1)} proof)</span>
              </div>
              <div className="flex justify-between">
                <span>Target ABV:</span>
                <span className="font-medium">{results.targetABV}% ({(results.targetABV * 2).toFixed(1)} proof)</span>
              </div>
              <div className="flex justify-between">
                <span>Original Volume:</span>
                <span className="font-medium">{results.currentVolume}ml</span>
              </div>
              {results.alcoholContent && (
                <div className="flex justify-between">
                  <span>Pure Alcohol Content:</span>
                  <span className="font-medium">{results.alcoholContent.toFixed(1)}ml</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {results && results.error && (
        <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="text-red-800 font-medium">{results.error}</div>
        </div>
      )}
      </div>

      {/* Common ABV Levels */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">🍷</span>
          Common ABV Levels
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-purple-900">Beer</span>
            <span className="text-purple-600 text-sm">3-12%</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-purple-900">Wine</span>
            <span className="text-purple-600 text-sm">11-15%</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-purple-900">Fortified Wine</span>
            <span className="text-purple-600 text-sm">15-20%</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-purple-900">Liqueurs</span>
            <span className="text-purple-600 text-sm">15-30%</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-purple-900">Spirits</span>
            <span className="text-purple-600 text-sm">40-50%</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-purple-900">Cask Strength</span>
            <span className="text-purple-600 text-sm">50-65%</span>
          </div>
        </div>
      </div>

      {/* Safety Notes */}
      <div className="mt-8 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <span className="text-red-600 mr-2">⚠️</span>
          Safety Notes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-red-800">• Always add water to alcohol, not alcohol to water</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-red-800">• Use distilled water for best results</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-red-800">• Allow mixture to settle before final measurement</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-red-800">• Temperature affects ABV measurements</div>
          </div>
        </div>
      </div>
    </div>
  );
}