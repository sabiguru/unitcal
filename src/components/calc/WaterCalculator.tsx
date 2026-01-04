'use client';

import { useState } from 'react';

interface WaterIntakeResult {
  daily: number;
  perHour: number;
  recommendations: string[];
  activityAdjustment?: number;
  climateAdjustment?: number;
}

export default function WaterCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'intense'>('moderate');
  const [climate, setClimate] = useState<'cool' | 'moderate' | 'hot' | 'very_hot'>('moderate');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [pregnant, setPregnant] = useState(false);
  const [breastfeeding, setBreastfeeding] = useState(false);
  const [result, setResult] = useState<WaterIntakeResult | null>(null);

  const getBaseWaterIntake = (weightKg: number, ageNum: number, genderValue: string): number => {
    // Base calculation: 35ml per kg of body weight
    let baseIntake = weightKg * 35; // ml per day
    
    // Age adjustments
    if (ageNum > 65) {
      baseIntake *= 0.9; // Older adults need slightly less
    } else if (ageNum < 18) {
      baseIntake *= 1.1; // Children and teenagers need more
    }
    
    // Gender adjustments (men typically need more)
    if (genderValue === 'male') {
      baseIntake *= 1.1;
    }
    
    return baseIntake;
  };

  const getActivityAdjustment = (level: string): number => {
    switch (level) {
      case 'sedentary': return 1.0;
      case 'light': return 1.2;
      case 'moderate': return 1.4;
      case 'intense': return 1.6;
      default: return 1.2;
    }
  };

  const getClimateAdjustment = (climateType: string): number => {
    switch (climateType) {
      case 'cool': return 1.0;
      case 'moderate': return 1.1;
      case 'hot': return 1.3;
      case 'very_hot': return 1.5;
      default: return 1.1;
    }
  };

  const calculateWaterIntake = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum)) return;

    // Convert to kg if imperial
    const weightKg = unit === 'imperial' ? weightNum * 0.453592 : weightNum;
    const ageNum = age ? parseInt(age) : 30; // Default age if not provided

    // Calculate base water intake
    let dailyIntake = getBaseWaterIntake(weightKg, ageNum, gender);

    // Apply activity adjustment
    const activityMultiplier = getActivityAdjustment(activityLevel);
    const activityAdjustment = dailyIntake * (activityMultiplier - 1);
    dailyIntake *= activityMultiplier;

    // Apply climate adjustment
    const climateMultiplier = getClimateAdjustment(climate);
    const climateAdjustment = dailyIntake * (climateMultiplier - 1) / climateMultiplier;
    dailyIntake *= climateMultiplier;

    // Special conditions
    if (pregnant) {
      dailyIntake += 300; // Additional 300ml for pregnancy
    }
    if (breastfeeding) {
      dailyIntake += 700; // Additional 700ml for breastfeeding
    }

    // Convert to liters and calculate per hour
    const dailyLiters = dailyIntake / 1000;
    const perHour = dailyLiters / 16; // Assuming 16 waking hours

    // Generate recommendations
    const recommendations = [
      'Start your day with a glass of water',
      'Drink water before, during, and after exercise',
      'Keep a water bottle with you throughout the day'
    ];

    if (activityLevel === 'intense') {
      recommendations.push('Increase intake significantly during intense exercise');
      recommendations.push('Consider electrolyte replacement for long workouts');
    }

    if (climate === 'hot' || climate === 'very_hot') {
      recommendations.push('Drink extra water in hot weather');
      recommendations.push('Watch for signs of dehydration');
    }

    if (pregnant) {
      recommendations.push('Pregnancy increases your fluid needs');
    }

    if (breastfeeding) {
      recommendations.push('Breastfeeding mothers need extra fluids');
    }

    recommendations.push('Monitor urine color - pale yellow indicates good hydration');

    setResult({
      daily: dailyLiters,
      perHour: perHour,
      recommendations,
      activityAdjustment,
      climateAdjustment
    });
  };

  const clear = () => {
    setWeight('');
    setAge('');
    setResult(null);
  };

  const getHydrationTips = () => [
    { tip: 'Drink a glass of water when you wake up', icon: '🌅' },
    { tip: 'Keep a water bottle at your desk', icon: '🏢' },
    { tip: 'Set reminders to drink water regularly', icon: '⏰' },
    { tip: 'Eat water-rich foods like fruits and vegetables', icon: '🥒' },
    { tip: 'Drink before you feel thirsty', icon: '💧' },
    { tip: 'Monitor your urine color', icon: '🟡' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">💧</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Water Intake Calculator — Daily Hydration Calculator</h1>
          <p className="text-gray-600">Calculate your daily water needs based on your lifestyle and environment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={unit === 'metric' ? 'Weight in kg' : 'Weight in lbs'}
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Age in years"
            min="1"
            max="120"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as 'sedentary' | 'light' | 'moderate' | 'intense')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="sedentary">Sedentary (minimal exercise)</option>
            <option value="light">Light Activity (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderate Activity (exercise 3-5 days/week)</option>
            <option value="intense">Intense Activity (hard exercise 6-7 days/week)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Climate</label>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value as 'cool' | 'moderate' | 'hot' | 'very_hot')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="cool">Cool (below 20°C/68°F)</option>
            <option value="moderate">Moderate (20-25°C/68-77°F)</option>
            <option value="hot">Hot (25-35°C/77-95°F)</option>
            <option value="very_hot">Very Hot (above 35°C/95°F)</option>
          </select>
        </div>
      </div>

      {gender === 'female' && (
        <div className="mb-8 p-4 bg-pink-50 rounded-lg border border-pink-200">
          <h3 className="font-medium text-pink-900 mb-3">Special Conditions</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={pregnant}
                onChange={(e) => setPregnant(e.target.checked)}
                className="rounded border-pink-300 text-pink-600 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-pink-900">Pregnant</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={breastfeeding}
                onChange={(e) => setBreastfeeding(e.target.checked)}
                className="rounded border-pink-300 text-pink-600 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-pink-900">Breastfeeding</span>
            </label>
          </div>
        </div>
      )}

      <div className="flex space-x-4 mb-8">
        <button
          onClick={calculateWaterIntake}
          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate Water Intake
        </button>
        <button
          onClick={clear}
          className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-1">{result.daily.toFixed(1)}L</div>
                <div className="text-sm text-blue-700">Daily Water Intake</div>
              </div>
            </div>
            <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-900 mb-1">{Math.round(result.perHour * 1000)}ml</div>
                <div className="text-sm text-cyan-700">Per Hour (awake)</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Personalized Recommendations</h4>
            <div className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hydration Tips */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hydration Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getHydrationTips().map((tip, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg">
              <span className="text-2xl">{tip.icon}</span>
              <span className="text-gray-700">{tip.tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}