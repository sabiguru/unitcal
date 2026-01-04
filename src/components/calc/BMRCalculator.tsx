'use client';

import React, { useState } from 'react';

export default function BMRCalculator() {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [feet, setFeet] = useState<string>('');
  const [inches, setInches] = useState<string>('');
  const [bmr, setBmr] = useState<number | null>(null);
  const [formula, setFormula] = useState<'mifflin' | 'harris' | 'katch'>('mifflin');
  const [bodyFat, setBodyFat] = useState<string>('');

  const calculateBMR = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    let heightNum = parseFloat(height);

    if (unit === 'imperial') {
      const feetNum = parseFloat(feet);
      const inchesNum = parseFloat(inches);
      if (isNaN(weightNum) || isNaN(feetNum) || isNaN(inchesNum) || isNaN(ageNum)) return;
      
      // Convert to metric
      const weightKg = weightNum * 0.453592;
      const heightCm = (feetNum * 12 + inchesNum) * 2.54;
      
      setBmr(calculateBMRValue(weightKg, heightCm, ageNum));
    } else {
      if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum)) return;
      setBmr(calculateBMRValue(weightNum, heightNum, ageNum));
    }
  };

  const calculateBMRValue = (weight: number, height: number, age: number): number => {
    switch (formula) {
      case 'mifflin':
        // Mifflin-St Jeor Equation (most accurate)
        return gender === 'male' 
          ? 10 * weight + 6.25 * height - 5 * age + 5
          : 10 * weight + 6.25 * height - 5 * age - 161;
      
      case 'harris':
        // Harris-Benedict Equation (revised)
        return gender === 'male'
          ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
          : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      
      case 'katch':
        // Katch-McArdle Formula (requires body fat percentage)
        const bodyFatNum = parseFloat(bodyFat);
        if (isNaN(bodyFatNum)) return 0;
        const leanMass = weight * (1 - bodyFatNum / 100);
        return 370 + (21.6 * leanMass);
      
      default:
        return 0;
    }
  };

  const clear = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setFeet('');
    setInches('');
    setBodyFat('');
    setBmr(null);
  };

  const getBMRCategory = (bmr: number): string => {
    if (bmr < 1200) return 'Very Low';
    if (bmr < 1500) return 'Low';
    if (bmr < 1800) return 'Normal';
    if (bmr < 2100) return 'High';
    return 'Very High';
  };

  const getCategoryColor = (bmr: number): string => {
    const category = getBMRCategory(bmr);
    switch (category) {
      case 'Very Low': return 'text-red-600';
      case 'Low': return 'text-orange-600';
      case 'Normal': return 'text-green-600';
      case 'High': return 'text-blue-600';
      case 'Very High': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⚡</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BMR Calculator — Basal Metabolic Rate Calculator</h1>
          <p className="text-gray-600">Calculate your Basal Metabolic Rate using multiple formulas</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      
      {/* Formula Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Formula</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setFormula('mifflin')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              formula === 'mifflin'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mifflin-St Jeor
          </button>
          <button
            onClick={() => setFormula('harris')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              formula === 'harris'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Harris-Benedict
          </button>
          <button
            onClick={() => setFormula('katch')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              formula === 'katch'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Katch-McArdle
          </button>
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="mb-6">
        <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-1">
          <button
            onClick={() => setUnit('metric')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              unit === 'metric'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Metric (kg, cm)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              unit === 'imperial'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Imperial (lbs, ft/in)
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
          />
        </div>

        {unit === 'metric' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter height in cm"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (ft/in)</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Feet"
              />
              <input
                type="number"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Inches"
              />
            </div>
          </div>
        )}

        {formula === 'katch' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Fat Percentage (%)</label>
            <input
              type="number"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter body fat percentage"
            />
          </div>
        )}
      </div>

      {/* Result Display */}
      {bmr && (
        <div className="mt-6 p-6 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {Math.round(bmr)}
            </div>
            <div className="text-lg text-gray-600 mb-2">Calories per day</div>
            <div className={`text-sm font-semibold ${getCategoryColor(bmr)}`}>
              {getBMRCategory(bmr)} BMR
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="font-semibold text-gray-900">Daily Calories</div>
              <div className="text-2xl font-bold text-blue-600">{Math.round(bmr)}</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="font-semibold text-gray-900">Weekly Calories</div>
              <div className="text-2xl font-bold text-green-600">{Math.round(bmr * 7)}</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="font-semibold text-gray-900">Monthly Calories</div>
              <div className="text-2xl font-bold text-purple-600">{Math.round(bmr * 30)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculateBMR}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate BMR
        </button>
        <button
          onClick={clear}
          className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>
      </div>
    </div>
  );
}