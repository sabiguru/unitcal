'use client';

import { useState } from 'react';

export default function CatAgeCalculator() {
  const [age, setAge] = useState<string>('');
  const [catType, setCatType] = useState<'indoor' | 'outdoor'>('indoor');
  const [result, setResult] = useState<{
    humanAge: number;
    lifeStage: string;
    description: string;
    tips: string[];
  } | null>(null);

  const calculateCatAge = (ageYears: number, type: string): number => {
    if (ageYears <= 0) return 0;
    
    // Indoor cats typically live longer
    const multiplier = type === 'indoor' ? 1 : 1.2;
    
    if (ageYears === 1) return Math.round(15 * multiplier);
    if (ageYears === 2) return Math.round(24 * multiplier);
    
    return Math.round((24 + (ageYears - 2) * 4) * multiplier);
  };

  const getLifeStage = (humanAge: number): { stage: string; description: string } => {
    if (humanAge < 15) return { stage: 'Kitten', description: 'Curious and playful' };
    if (humanAge < 30) return { stage: 'Young Adult', description: 'Active and independent' };
    if (humanAge < 50) return { stage: 'Adult', description: 'Established personality' };
    if (humanAge < 70) return { stage: 'Senior', description: 'May show signs of aging' };
    return { stage: 'Geriatric', description: 'Needs gentle care and monitoring' };
  };

  const getCareTips = (humanAge: number): string[] => {
    const tips: string[] = [];
    
    if (humanAge < 15) {
      tips.push('Provide safe environment for exploration');
      tips.push('Schedule kitten vaccinations');
      tips.push('Introduce litter box training');
      tips.push('Begin socialization');
    } else if (humanAge < 30) {
      tips.push('Indoor environment recommended');
      tips.push('Regular play sessions for exercise');
      tips.push('Annual veterinary care');
      tips.push('Maintain dental hygiene');
    } else if (humanAge < 50) {
      tips.push('Monitor weight and diet');
      tips.push('Regular health checkups');
      tips.push('Environmental enrichment');
      tips.push('Dental care maintenance');
    } else if (humanAge < 70) {
      tips.push('Increase veterinary visit frequency');
      tips.push('Monitor for kidney and thyroid issues');
      tips.push('Senior diet considerations');
      tips.push('Comfortable resting areas');
    } else {
      tips.push('Regular blood work monitoring');
      tips.push('Pain and comfort management');
      tips.push('Easy access to food and water');
      tips.push('Gentle handling and care');
    }
    
    return tips;
  };

  const calculate = () => {
    const ageNum = parseFloat(age);
    if (isNaN(ageNum) || ageNum < 0) return;

    const humanAge = calculateCatAge(ageNum, catType);
    const lifeStageInfo = getLifeStage(humanAge);
    const careTips = getCareTips(humanAge);

    setResult({
      humanAge,
      lifeStage: lifeStageInfo.stage,
      description: lifeStageInfo.description,
      tips: careTips
    });
  };

  const clear = () => {
    setAge('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🐱</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cat Age Calculator — Cat to Human Years Converter</h1>
          <p className="text-gray-600">Convert your cat's age to human years and get care tips</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cat Age (years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter age in years"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lifestyle</label>
              <select
                value={catType}
                onChange={(e) => setCatType(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="indoor">Indoor Cat</option>
                <option value="outdoor">Outdoor Cat</option>
              </select>
            </div>
          </div>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">
                    {result.humanAge} years
                  </div>
                  <div className="text-lg text-blue-700">Human Equivalent Age</div>
                  <div className="text-sm text-blue-600 mt-2">
                    Life Stage: {result.lifeStage}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Life Stage Description</h4>
                <p className="text-sm text-gray-600">{result.description}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-3">Care Recommendations</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {result.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex space-x-4 mt-6">
            <button
              onClick={calculate}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Calculate Age
            </button>
            <button
              onClick={clear}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>
      </div>

      {/* Cat Age Conversion Chart */}
      <div className="mt-8 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
          <span className="text-orange-600 mr-2">📊</span>
          Age Conversion Chart
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-orange-900">1 year</span>
            <span className="text-orange-600 text-sm">15 human years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-orange-900">2 years</span>
            <span className="text-orange-600 text-sm">24 human years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-orange-900">5 years</span>
            <span className="text-orange-600 text-sm">36 human years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-orange-900">10 years</span>
            <span className="text-orange-600 text-sm">56 human years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-orange-900">15 years</span>
            <span className="text-orange-600 text-sm">76 human years</span>
          </div>
        </div>
      </div>

      {/* Factors Affecting Cat Age */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">🔬</span>
          Factors Affecting Cat Age
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Breed and genetics</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Indoor vs outdoor lifestyle</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Diet and nutrition quality</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Regular veterinary care</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Spay/neuter status</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-blue-800">• Exercise and mental stimulation</div>
          </div>
        </div>
      </div>

      {/* Cat Life Stages */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">🐾</span>
          Cat Life Stages
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-green-900">Kitten</span>
            <span className="text-green-600 text-sm">0-6 months</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-green-900">Junior</span>
            <span className="text-green-600 text-sm">7m - 2 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-green-900">Prime</span>
            <span className="text-green-600 text-sm">3-6 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-green-900">Mature</span>
            <span className="text-green-600 text-sm">7-10 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-green-900">Senior</span>
            <span className="text-green-600 text-sm">11-14 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-green-900">Geriatric</span>
            <span className="text-green-600 text-sm">15+ years</span>
          </div>
        </div>
      </div>

      {/* Life Expectancy */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💝</span>
          Life Expectancy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <span className="font-bold text-purple-900">Indoor Cats</span>
            <span className="text-purple-600">13-17 years</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <span className="font-bold text-purple-900">Outdoor Cats</span>
            <span className="text-purple-600">7-12 years</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <span className="font-bold text-purple-900">Mixed Indoor/Outdoor</span>
            <span className="text-purple-600">9-15 years</span>
          </div>
        </div>
      </div>
    </div>
  );
}