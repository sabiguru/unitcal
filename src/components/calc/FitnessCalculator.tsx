'use client';

import React, { useState } from 'react';

export default function FitnessCalculator() {
  const [calculationType, setCalculationType] = useState<'1rm' | 'calories' | 'pace' | 'vo2max'>('1rm');
  
  // 1RM Calculator
  const [weight, setWeight] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [oneRM, setOneRM] = useState<number | null>(null);
  
  // Calorie Burn Calculator
  const [activity, setActivity] = useState<string>('running');
  const [duration, setDuration] = useState<string>('');
  const [bodyWeight, setBodyWeight] = useState<string>('');
  const [caloriesBurned, setCaloriesBurned] = useState<number | null>(null);
  
  // Running Pace Calculator
  const [distance, setDistance] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [pace, setPace] = useState<string>('');
  
  // VO2 Max Calculator
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [fitnessLevel, setFitnessLevel] = useState<string>('average');
  const [vo2Max, setVo2Max] = useState<number | null>(null);

  const activities = {
    running: { name: 'Running (8 mph)', met: 11.5 },
    jogging: { name: 'Jogging (6 mph)', met: 9.8 },
    walking: { name: 'Walking (3.5 mph)', met: 4.3 },
    cycling: { name: 'Cycling (moderate)', met: 8.0 },
    swimming: { name: 'Swimming (moderate)', met: 8.3 },
    weightlifting: { name: 'Weight Lifting', met: 6.0 },
    yoga: { name: 'Yoga', met: 3.0 },
    basketball: { name: 'Basketball', met: 8.0 },
    tennis: { name: 'Tennis', met: 7.3 },
    hiking: { name: 'Hiking', met: 6.0 }
  };

  const calculate1RM = () => {
    const weightNum = parseFloat(weight);
    const repsNum = parseFloat(reps);
    
    if (isNaN(weightNum) || isNaN(repsNum) || repsNum < 1 || repsNum > 20) return;
    
    // Epley formula: 1RM = weight × (1 + reps/30)
    const result = weightNum * (1 + repsNum / 30);
    setOneRM(Math.round(result));
  };

  const calculateCalories = () => {
    const durationNum = parseFloat(duration);
    const bodyWeightNum = parseFloat(bodyWeight);
    
    if (isNaN(durationNum) || isNaN(bodyWeightNum)) return;
    
    const selectedActivity = activities[activity as keyof typeof activities];
    // Calories = METs × weight(kg) × time(hours)
    const weightKg = bodyWeightNum * 0.453592; // Convert lbs to kg
    const timeHours = durationNum / 60; // Convert minutes to hours
    const calories = selectedActivity.met * weightKg * timeHours;
    
    setCaloriesBurned(Math.round(calories));
  };

  const calculatePace = () => {
    const distanceNum = parseFloat(distance);
    const timeNum = parseFloat(time);
    
    if (isNaN(distanceNum) || isNaN(timeNum)) return;
    
    // Pace = time per mile/km
    const paceMinutes = timeNum / distanceNum;
    const minutes = Math.floor(paceMinutes);
    const seconds = Math.round((paceMinutes - minutes) * 60);
    
    setPace(`${minutes}:${seconds.toString().padStart(2, '0')}`);
  };

  const calculateVO2Max = () => {
    const ageNum = parseFloat(age);
    
    if (isNaN(ageNum)) return;
    
    // Simplified VO2 Max estimation based on age, gender, and fitness level
    let baseVO2: number;
    
    if (gender === 'male') {
      baseVO2 = 60 - (ageNum - 25) * 0.5;
    } else {
      baseVO2 = 50 - (ageNum - 25) * 0.4;
    }
    
    // Adjust for fitness level
    const fitnessAdjustment = {
      poor: -10,
      below_average: -5,
      average: 0,
      above_average: 5,
      excellent: 10,
      superior: 15
    };
    
    const adjustment = fitnessAdjustment[fitnessLevel as keyof typeof fitnessAdjustment] || 0;
    const result = Math.max(20, baseVO2 + adjustment);
    
    setVo2Max(Math.round(result * 10) / 10);
  };

  const clearAll = () => {
    setWeight('');
    setReps('');
    setOneRM(null);
    setDuration('');
    setBodyWeight('');
    setCaloriesBurned(null);
    setDistance('');
    setTime('');
    setPace('');
    setAge('');
    setVo2Max(null);
  };

  const renderCalculator = () => {
    switch (calculationType) {
      case '1rm':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight Lifted (lbs)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repetitions (1-20)
                </label>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter reps"
                  min="1"
                  max="20"
                />
              </div>
            </div>
            
            <button
              onClick={calculate1RM}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Calculate 1RM
            </button>
            
            {oneRM && (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{oneRM} lbs</div>
                  <div className="text-sm text-gray-600">One Rep Max (1RM)</div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'calories':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(activities).map(([key, act]) => (
                  <option key={key} value={key}>{act.name} (MET: {act.met})</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter duration"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Weight (lbs)
                </label>
                <input
                  type="number"
                  value={bodyWeight}
                  onChange={(e) => setBodyWeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter weight"
                />
              </div>
            </div>
            
            <button
              onClick={calculateCalories}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Calculate Calories Burned
            </button>
            
            {caloriesBurned && (
              <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-6 border border-green-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{caloriesBurned}</div>
                  <div className="text-sm text-gray-600">Calories Burned</div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'pace':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance (miles)
                </label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter distance"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time (minutes)
                </label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter total time"
                />
              </div>
            </div>
            
            <button
              onClick={calculatePace}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Calculate Pace
            </button>
            
            {pace && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{pace}</div>
                  <div className="text-sm text-gray-600">Minutes per Mile</div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'vo2max':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="flex space-x-4">
                  <button
                    onClick={() => setGender('male')}
                    className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                      gender === 'male'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                      gender === 'female'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Level</label>
              <select
                value={fitnessLevel}
                onChange={(e) => setFitnessLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="poor">Poor</option>
                <option value="below_average">Below Average</option>
                <option value="average">Average</option>
                <option value="above_average">Above Average</option>
                <option value="excellent">Excellent</option>
                <option value="superior">Superior</option>
              </select>
            </div>
            
            <button
              onClick={calculateVO2Max}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Estimate VO2 Max
            </button>
            
            {vo2Max && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{vo2Max}</div>
                  <div className="text-sm text-gray-600">ml/kg/min (VO2 Max)</div>
                </div>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">💪</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fitness Calculator — 1RM, VO2 Max & Training Calculator</h1>
          <p className="text-gray-600">Calculate 1RM, calories burned, running pace, and VO2 max</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Calculator Type Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">Calculator Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setCalculationType('1rm')}
            className={`p-4 rounded-lg text-center transition-colors ${
              calculationType === '1rm'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="font-medium">1RM</div>
            <div className="text-xs opacity-75">One Rep Max</div>
          </button>
          <button
            onClick={() => setCalculationType('calories')}
            className={`p-4 rounded-lg text-center transition-colors ${
              calculationType === 'calories'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="font-medium">Calories</div>
            <div className="text-xs opacity-75">Calories Burned</div>
          </button>
          <button
            onClick={() => setCalculationType('pace')}
            className={`p-4 rounded-lg text-center transition-colors ${
              calculationType === 'pace'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="font-medium">Pace</div>
            <div className="text-xs opacity-75">Running Pace</div>
          </button>
          <button
            onClick={() => setCalculationType('vo2max')}
            className={`p-4 rounded-lg text-center transition-colors ${
              calculationType === 'vo2max'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="font-medium">VO2 Max</div>
            <div className="text-xs opacity-75">Fitness Level</div>
          </button>
        </div>
      </div>

      {/* Calculator Content */}
      {renderCalculator()}

      <div className="mt-6">
        <button
          onClick={clearAll}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear All
        </button>
      </div>
      </div>
    </div>
  );
}