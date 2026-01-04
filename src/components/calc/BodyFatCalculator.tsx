'use client';

import React, { useState } from 'react';

export default function BodyFatCalculator() {
  const [method, setMethod] = useState<'navy' | 'army' | 'ymca' | 'covert-bailey'>('navy');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [wrist, setWrist] = useState<string>('');
  const [forearm, setForearm] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const getBodyFatCategory = (bodyFat: number, gender: string): string => {
    if (gender === 'male') {
      if (bodyFat < 6) return 'Essential Fat';
      if (bodyFat < 14) return 'Athletes';
      if (bodyFat < 18) return 'Fitness';
      if (bodyFat < 25) return 'Average';
      return 'Obese';
    } else {
      if (bodyFat < 14) return 'Essential Fat';
      if (bodyFat < 21) return 'Athletes';
      if (bodyFat < 25) return 'Fitness';
      if (bodyFat < 32) return 'Average';
      return 'Obese';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Essential Fat': return 'text-red-600';
      case 'Athletes': return 'text-green-600';
      case 'Fitness': return 'text-blue-600';
      case 'Average': return 'text-yellow-600';
      case 'Obese': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const calculateBodyFat = () => {
    const heightNum = parseFloat(height);
    const neckNum = parseFloat(neck);
    const waistNum = parseFloat(waist);
    const hipNum = parseFloat(hip);
    const weightNum = parseFloat(weight);
    const wristNum = parseFloat(wrist);
    const forearmNum = parseFloat(forearm);
    const ageNum = parseFloat(age);

    if (isNaN(heightNum) || isNaN(neckNum) || isNaN(waistNum)) return;

    let bodyFat = 0;

    // Convert to inches if metric
    const heightInches = unit === 'metric' ? heightNum / 2.54 : heightNum;
    const neckInches = unit === 'metric' ? neckNum / 2.54 : neckNum;
    const waistInches = unit === 'metric' ? waistNum / 2.54 : waistNum;
    const hipInches = unit === 'metric' ? hipNum / 2.54 : hipNum;
    const wristInches = unit === 'metric' ? wristNum / 2.54 : wristNum;
    const forearmInches = unit === 'metric' ? forearmNum / 2.54 : forearmNum;
    const weightLbs = unit === 'metric' ? weightNum * 2.20462 : weightNum;

    switch (method) {
      case 'navy':
        if (gender === 'male') {
          bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistInches - neckInches) + 0.15456 * Math.log10(heightInches)) - 450;
        } else {
          if (isNaN(hipInches)) return;
          bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistInches + hipInches - neckInches) + 0.22100 * Math.log10(heightInches)) - 450;
        }
        break;

      case 'army':
        if (gender === 'male') {
          bodyFat = 86.010 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76;
        } else {
          if (isNaN(hipInches)) return;
          bodyFat = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInches) - 78.387;
        }
        break;

      case 'ymca':
        if (isNaN(weightLbs)) return;
        if (gender === 'male') {
          bodyFat = (4.15 * waistInches - 0.082 * weightLbs - 76.76);
        } else {
          bodyFat = (4.15 * waistInches - 0.082 * weightLbs - 76.76);
        }
        break;

      case 'covert-bailey':
        if (isNaN(wristInches) || isNaN(forearmInches) || isNaN(ageNum)) return;
        // Simplified Covert Bailey formula
        const wristToHeight = wristInches / heightInches;
        const forearmToHeight = forearmInches / heightInches;
        bodyFat = (waistInches * 0.74) - (weightLbs * 0.082) - (wristToHeight * 34.89) + (forearmToHeight * 42.56) + (ageNum * 0.15) - 98.42;
        break;
    }

    setResult(bodyFat);
    setCategory(getBodyFatCategory(bodyFat, gender));
  };

  const clear = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setNeck('');
    setWaist('');
    setHip('');
    setWrist('');
    setForearm('');
    setResult(null);
    setCategory('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🏃‍♂️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Body Fat Calculator — Body Fat Percentage Calculator</h1>
          <p className="text-gray-600">Calculate your body fat percentage using various proven methods</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Calculation Method</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { key: 'navy', label: 'US Navy Method', desc: 'Uses neck, waist, hip measurements' },
            { key: 'army', label: 'US Army Method', desc: 'Uses neck, waist, hip measurements' },
            { key: 'ymca', label: 'YMCA Method', desc: 'Uses weight and waist only' },
            { key: 'covert-bailey', label: 'Covert Bailey', desc: 'Uses multiple measurements' }
          ].map(methodItem => (
            <button
              key={methodItem.key}
              onClick={() => setMethod(methodItem.key as any)}
              className={`p-4 rounded-lg text-left transition-colors ${
                method === methodItem.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium">{methodItem.label}</div>
              <div className="text-sm opacity-75">{methodItem.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Gender Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setGender('male')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              gender === 'male'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Male
          </button>
          <button
            onClick={() => setGender('female')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              gender === 'female'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Female
          </button>
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Units</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setUnit('metric')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              unit === 'metric'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Metric (cm, kg)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              unit === 'imperial'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Imperial (in, lbs)
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter height"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Neck ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter neck circumference"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Waist ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter waist circumference"
          />
        </div>

        {((method === 'navy' || method === 'army') && gender === 'female') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hip ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter hip circumference"
            />
          </div>
        )}

        {(method === 'ymca' || method === 'covert-bailey') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter weight"
            />
          </div>
        )}

        {method === 'covert-bailey' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wrist ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                value={wrist}
                onChange={(e) => setWrist(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter wrist circumference"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forearm ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                value={forearm}
                onChange={(e) => setForearm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter forearm circumference"
              />
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={calculateBodyFat}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Calculate Body Fat
        </button>
        <button
          onClick={clear}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {result.toFixed(1)}%
            </div>
            <div className={`text-lg font-semibold mb-2 ${getCategoryColor(category)}`}>
              {category}
            </div>
            <div className="text-sm text-gray-600">
              Body Fat Percentage using {method.replace('-', ' ')} method
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}