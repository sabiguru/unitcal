'use client';

import { useState } from 'react';

export default function DogAgeCalculator() {
  const [dogAge, setDogAge] = useState('');
  const [dogSize, setDogSize] = useState('medium');
  const [conversionType, setConversionType] = useState('dog-to-human');
  const [humanAge, setHumanAge] = useState('');
  const [result, setResult] = useState<any>(null);

  const sizeCategories = {
    small: 'Small (under 20 lbs)',
    medium: 'Medium (21-50 lbs)',
    large: 'Large (51-90 lbs)',
    giant: 'Giant (over 90 lbs)'
  };

  const calculateDogToHuman = (dogYears: number, size: string) => {
    if (dogYears <= 0) return 0;
    
    let humanYears = 0;
    
    if (dogYears >= 1) {
      humanYears += 15;
      dogYears -= 1;
    } else {
      return dogYears * 15;
    }
    
    if (dogYears >= 1) {
      humanYears += 9;
      dogYears -= 1;
    } else {
      return humanYears + (dogYears * 9);
    }
    
    if (dogYears > 0) {
      let yearlyRate;
      switch (size) {
        case 'small': yearlyRate = 4; break;
        case 'medium': yearlyRate = 5; break;
        case 'large': yearlyRate = 6; break;
        case 'giant': yearlyRate = 7; break;
        default: yearlyRate = 5;
      }
      humanYears += dogYears * yearlyRate;
    }
    
    return Math.round(humanYears);
  };

  const getLifeStage = (dogYears: number, size: string) => {
    if (dogYears < 1) return { stage: 'Puppy', description: 'Growing and learning' };
    if (dogYears < 2) return { stage: 'Adolescent', description: 'Full of energy and curiosity' };
    
    let adultThreshold, seniorThreshold;
    switch (size) {
      case 'small':
        adultThreshold = 7;
        seniorThreshold = 10;
        break;
      case 'medium':
        adultThreshold = 6;
        seniorThreshold = 8;
        break;
      case 'large':
        adultThreshold = 5;
        seniorThreshold = 7;
        break;
      case 'giant':
        adultThreshold = 4;
        seniorThreshold = 6;
        break;
      default:
        adultThreshold = 6;
        seniorThreshold = 8;
    }
    
    if (dogYears < adultThreshold) return { stage: 'Adult', description: 'Prime of life' };
    if (dogYears < seniorThreshold) return { stage: 'Mature Adult', description: 'Experienced and settled' };
    return { stage: 'Senior', description: 'Wise and distinguished' };
  };

  const calculate = () => {
    if (conversionType === 'dog-to-human') {
      const dogYears = parseFloat(dogAge);
      if (!dogYears || dogYears < 0) return;
      
      const humanEquivalent = calculateDogToHuman(dogYears, dogSize);
      const lifeStage = getLifeStage(dogYears, dogSize);
      
      setResult({
        type: 'dog-to-human',
        dogAge: dogYears,
        humanAge: humanEquivalent,
        lifeStage,
        size: dogSize
      });
    }
  };

  const clear = () => {
    setDogAge('');
    setHumanAge('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🐕</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dog Age Calculator — Dog to Human Years Converter</h1>
          <p className="text-gray-600">Convert between dog years and human years with scientific accuracy</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setConversionType('dog-to-human')}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  conversionType === 'dog-to-human'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🐕 Dog → Human Age
              </button>
              <button
                onClick={() => setConversionType('human-to-dog')}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  conversionType === 'human-to-dog'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                👤 Human → Dog Age
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dog Size Category</label>
            <select
              value={dogSize}
              onChange={(e) => setDogSize(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(sizeCategories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dog's Age</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={dogAge}
                onChange={(e) => setDogAge(e.target.value)}
                className="w-full pr-16 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="3.5"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">years</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🔢 Calculate Age
            </button>
            <button
              onClick={clear}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
                <div className="text-4xl mb-4">🐕➡️👤</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {result.dogAge} dog years = {result.humanAge} human years
                </h3>
                <p className="text-lg text-blue-700">
                  Life Stage: <span className="font-semibold">{result.lifeStage.stage}</span>
                </p>
                <p className="text-sm text-blue-600 mt-1">{result.lifeStage.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}