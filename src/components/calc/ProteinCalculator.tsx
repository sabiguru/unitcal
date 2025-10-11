'use client';

import React, { useState } from 'react';

export default function ProteinCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<{
    daily: number;
    perMeal: number;
    perKg: number;
    recommendations: string[];
  } | null>(null);

  const activityLevels = {
    sedentary: { label: 'Sedentary (desk job, minimal exercise)', multiplier: 0.8 },
    light: { label: 'Light Activity (light exercise 1-3 days/week)', multiplier: 1.0 },
    moderate: { label: 'Moderate Activity (exercise 3-5 days/week)', multiplier: 1.2 },
    active: { label: 'Very Active (hard exercise 6-7 days/week)', multiplier: 1.4 },
    athlete: { label: 'Athlete (very hard exercise, physical job)', multiplier: 1.6 }
  };

  const goals = {
    maintain: { label: 'Maintain Weight', multiplier: 1.0 },
    lose: { label: 'Lose Weight', multiplier: 1.2 },
    gain: { label: 'Gain Muscle', multiplier: 1.4 },
    bulk: { label: 'Bulk (Rapid Muscle Gain)', multiplier: 1.6 }
  };

  const calculateProtein = () => {
    const weightNum = parseFloat(weight);
    const ageNum = parseFloat(age);
    
    if (isNaN(weightNum)) return;

    // Convert to kg if imperial
    const weightKg = unit === 'imperial' ? weightNum * 0.453592 : weightNum;

    // Base protein requirement (g/kg body weight)
    let baseProtein = 0.8; // RDA minimum

    // Adjust for activity level
    const activityMultiplier = activityLevels[activityLevel as keyof typeof activityLevels].multiplier;
    baseProtein *= activityMultiplier;

    // Adjust for goal
    const goalMultiplier = goals[goal as keyof typeof goals].multiplier;
    baseProtein *= goalMultiplier;

    // Age adjustment (older adults need more protein)
    if (!isNaN(ageNum) && ageNum >= 65) {
      baseProtein *= 1.25;
    }

    // Calculate daily protein needs
    const dailyProtein = Math.round(weightKg * baseProtein);
    const proteinPerMeal = Math.round(dailyProtein / 3);
    const proteinPerKg = parseFloat(baseProtein.toFixed(2));

    // Generate recommendations
    const recommendations = [];
    
    if (goal === 'lose') {
      recommendations.push('Higher protein helps preserve muscle during weight loss');
      recommendations.push('Spread protein intake across all meals');
    } else if (goal === 'gain' || goal === 'bulk') {
      recommendations.push('Consume protein within 2 hours post-workout');
      recommendations.push('Include complete proteins (all essential amino acids)');
    }

    if (activityLevel === 'athlete') {
      recommendations.push('Consider protein timing around workouts');
      recommendations.push('May need up to 2.0g/kg for intense training');
    }

    recommendations.push('Include variety: lean meats, fish, eggs, dairy, legumes');
    recommendations.push('Stay hydrated when increasing protein intake');

    setResult({
      daily: dailyProtein,
      perMeal: proteinPerMeal,
      perKg: proteinPerKg,
      recommendations
    });
  };

  const clear = () => {
    setWeight('');
    setAge('');
    setResult(null);
  };

  const getProteinSources = () => [
    { name: 'Chicken Breast (100g)', protein: 31, calories: 165 },
    { name: 'Salmon (100g)', protein: 25, calories: 208 },
    { name: 'Greek Yogurt (1 cup)', protein: 20, calories: 130 },
    { name: 'Eggs (2 large)', protein: 12, calories: 140 },
    { name: 'Quinoa (1 cup cooked)', protein: 8, calories: 222 },
    { name: 'Lentils (1 cup cooked)', protein: 18, calories: 230 },
    { name: 'Almonds (30g)', protein: 6, calories: 174 },
    { name: 'Protein Powder (1 scoop)', protein: 25, calories: 120 }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🥩</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Protein Calculator — Daily Protein Needs Calculator</h1>
          <p className="text-gray-600">Calculate your daily protein needs based on your goals and activity level</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={unit === 'metric' ? 'Weight in kg' : 'Weight in lbs'}
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="metric">kg</option>
              <option value="imperial">lbs</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age (optional)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Age in years"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as 'male' | 'female')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {Object.entries(activityLevels).map(([key, level]) => (
              <option key={key} value={key}>{level.label}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {Object.entries(goals).map(([key, goalItem]) => (
              <option key={key} value={key}>{goalItem.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={calculateProtein}
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate Protein Needs
        </button>
        <button
          onClick={clear}
          className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-900 mb-1">{result.daily}g</div>
                <div className="text-sm text-orange-700">Daily Protein</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-1">{result.perMeal}g</div>
                <div className="text-sm text-blue-700">Per Meal</div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-900 mb-1">{result.perKg}g/kg</div>
                <div className="text-sm text-green-700">Per Body Weight</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Protein Sources</h3>
              <div className="space-y-3">
                {getProteinSources().slice(0, 6).map((source, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{source.name}</div>
                      <div className="text-xs text-gray-500">{source.calories} calories</div>
                    </div>
                    <div className="text-lg font-bold text-orange-600">{source.protein}g</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}