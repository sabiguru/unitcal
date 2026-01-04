'use client';

import React, { useState } from 'react';

export default function CalorieCalculator() {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('sedentary');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain'>('maintain');
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    goalCalories: number;
  } | null>(null);

  const activityLevels = {
    sedentary: { name: 'Sedentary (little or no exercise)', factor: 1.2 },
    light: { name: 'Light activity (light exercise 1-3 days/week)', factor: 1.375 },
    moderate: { name: 'Moderate activity (moderate exercise 3-5 days/week)', factor: 1.55 },
    active: { name: 'Active (hard exercise 6-7 days/week)', factor: 1.725 },
    very_active: { name: 'Very active (very hard exercise, physical job)', factor: 1.9 }
  };

  const calculateCalories = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum)) return;

    // Convert to metric if imperial
    const weightKg = unit === 'metric' ? weightNum : weightNum * 0.453592;
    const heightCm = unit === 'metric' ? heightNum : heightNum * 2.54;

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageNum);
    } else {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageNum);
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityFactor = activityLevels[activityLevel as keyof typeof activityLevels].factor;
    const tdee = bmr * activityFactor;

    // Calculate goal calories
    let goalCalories: number;
    switch (goal) {
      case 'lose':
        goalCalories = tdee - 500; // 500 calorie deficit for ~1 lb/week loss
        break;
      case 'gain':
        goalCalories = tdee + 500; // 500 calorie surplus for ~1 lb/week gain
        break;
      default:
        goalCalories = tdee;
    }

    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), goalCalories: Math.round(goalCalories) });
  };

  const clear = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🔥</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Calorie Calculator — Daily Calorie Needs & TDEE Calculator</h1>
          <p className="text-gray-600">Calculate your daily calorie needs based on your goals and activity level</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

            {/* Unit Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Units</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setUnit('metric')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    unit === 'metric'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Metric (cm, kg)
                </button>
                <button
                  onClick={() => setUnit('imperial')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    unit === 'imperial'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Imperial (in, lbs)
                </button>
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
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    gender === 'female'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your age"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your weight"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height ({unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your height"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Activity Level</label>
              <div className="space-y-2">
                {Object.entries(activityLevels).map(([key, level]) => (
                  <button
                    key={key}
                    onClick={() => setActivityLevel(key)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      activityLevel === key
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-medium">{level.name}</div>
                    <div className="text-sm opacity-75">Multiplier: {level.factor}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Goal</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setGoal('lose')}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    goal === 'lose'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">Lose Weight</div>
                  <div className="text-sm opacity-75">-500 cal/day</div>
                </button>
                <button
                  onClick={() => setGoal('maintain')}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    goal === 'maintain'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">Maintain Weight</div>
                  <div className="text-sm opacity-75">No change</div>
                </button>
                <button
                  onClick={() => setGoal('gain')}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    goal === 'gain'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">Gain Weight</div>
                  <div className="text-sm opacity-75">+500 cal/day</div>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={calculateCalories}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Calculate Calories
              </button>
              <button
                onClick={clear}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Calorie Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{result.bmr}</div>
                      <div className="text-sm text-gray-600">BMR (Base Metabolic Rate)</div>
                      <div className="text-xs text-gray-500">Calories at rest</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{result.tdee}</div>
                      <div className="text-sm text-gray-600">TDEE (Maintenance)</div>
                      <div className="text-xs text-gray-500">Total daily energy expenditure</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{result.goalCalories}</div>
                      <div className="text-sm text-gray-600">Goal Calories</div>
                      <div className="text-xs text-gray-500">
                        To {goal === 'lose' ? 'lose' : goal === 'gain' ? 'gain' : 'maintain'} weight
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">💡 Understanding Your Results:</h4>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• <strong>BMR:</strong> Calories your body burns at rest</li>
                    <li>• <strong>TDEE:</strong> Total calories needed to maintain current weight</li>
                    <li>• <strong>Goal:</strong> Calories to eat daily for your selected goal</li>
                    <li>• Safe weight loss/gain is 1-2 lbs per week (500-1000 cal deficit/surplus)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
              <span className="text-green-600 mr-2">💡</span>
              Quick Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-800">
              <div className="flex items-start py-2 px-3 bg-white rounded-lg">
                <span className="text-green-500 mr-2">•</span>
                <span>Track your food intake for more accurate results</span>
              </div>
              <div className="flex items-start py-2 px-3 bg-white rounded-lg">
                <span className="text-green-500 mr-2">•</span>
                <span>Adjust calories based on weekly weight changes</span>
              </div>
              <div className="flex items-start py-2 px-3 bg-white rounded-lg">
                <span className="text-green-500 mr-2">•</span>
                <span>Focus on nutrient-dense foods for better health</span>
              </div>
              <div className="flex items-start py-2 px-3 bg-white rounded-lg">
                <span className="text-green-500 mr-2">•</span>
                <span>Stay hydrated and get adequate sleep</span>
              </div>
              <div className="flex items-start py-2 px-3 bg-white rounded-lg">
                <span className="text-green-500 mr-2">•</span>
                <span>Combine diet with regular exercise</span>
              </div>
            </div>
          </div>
        </div>
      );
}