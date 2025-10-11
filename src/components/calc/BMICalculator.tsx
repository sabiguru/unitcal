'use client';

import { useState } from 'react';

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [feet, setFeet] = useState<string>('');
  const [inches, setInches] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    let heightNum = parseFloat(height);

    if (unit === 'imperial') {
      const feetNum = parseFloat(feet);
      const inchesNum = parseFloat(inches);
      if (isNaN(weightNum) || isNaN(feetNum) || isNaN(inchesNum)) return;
      
      // Convert to metric
      const weightKg = weightNum * 0.453592;
      const heightCm = (feetNum * 12 + inchesNum) * 2.54;
      
      const bmiValue = weightKg / Math.pow(heightCm / 100, 2);
      setBmi(bmiValue);
      setBMICategory(bmiValue);
    } else {
      if (isNaN(weightNum) || isNaN(heightNum)) return;
      
      const bmiValue = weightNum / Math.pow(heightNum / 100, 2);
      setBmi(bmiValue);
      setBMICategory(bmiValue);
    }
  };

  const setBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 25) setCategory('Normal weight');
    else if (bmiValue < 30) setCategory('Overweight');
    else setCategory('Obese');
  };

  const clear = () => {
    setWeight('');
    setHeight('');
    setFeet('');
    setInches('');
    setBmi(null);
    setCategory('');
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Underweight': return 'text-blue-600';
      case 'Normal weight': return 'text-green-600';
      case 'Overweight': return 'text-yellow-600';
      case 'Obese': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryBg = (cat: string) => {
    switch (cat) {
      case 'Underweight': return 'bg-blue-50 border-blue-200';
      case 'Normal weight': return 'bg-green-50 border-green-200';
      case 'Overweight': return 'bg-yellow-50 border-yellow-200';
      case 'Obese': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⚖️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BMI Calculator — Body Mass Index Calculator</h1>
          <p className="text-gray-600">Calculate your Body Mass Index and health category</p>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
          {unit === 'metric' ? (
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Height in cm"
            />
          ) : (
            <div className="flex space-x-2">
              <input
                type="number"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Feet"
              />
              <input
                type="number"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Inches"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={calculateBMI}
          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate BMI
        </button>
        <button
          onClick={clear}
          className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>

      {bmi && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-1">{bmi.toFixed(1)}</div>
                <div className="text-sm text-blue-700">Your BMI</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 border ${getCategoryBg(category)}`}>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${getCategoryColor(category)}`}>
                  {category}
                </div>
                <div className={`text-sm ${getCategoryColor(category)}`}>BMI Category</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">BMI Categories</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">Underweight</span>
                <span className="text-gray-600">BMI less than 18.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-medium">Normal weight</span>
                <span className="text-gray-600">BMI 18.5 - 24.9</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-600 font-medium">Overweight</span>
                <span className="text-gray-600">BMI 25 - 29.9</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-600 font-medium">Obese</span>
                <span className="text-gray-600">BMI 30 or greater</span>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Health Insights */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💚</span>
          Understanding BMI
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">What BMI Measures</div>
            <div className="text-sm text-green-700">Body fat based on height and weight</div>
            <div className="text-xs text-green-600 mt-1">General health screening tool</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">BMI Limitations</div>
            <div className="text-sm text-green-700">Doesn't distinguish muscle vs fat</div>
            <div className="text-xs text-green-600 mt-1">Athletes may have high BMI</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Age Considerations</div>
            <div className="text-sm text-green-700">Different standards for children</div>
            <div className="text-xs text-green-600 mt-1">Consult pediatrician for kids</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Health Assessment</div>
            <div className="text-sm text-green-700">Use with other health factors</div>
            <div className="text-xs text-green-600 mt-1">See healthcare provider</div>
          </div>
        </div>
      </div>

      {/* Health Risks */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">🏥</span>
          Health Risk Factors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Underweight Risks</div>
            <div className="text-sm text-blue-700">• Nutritional deficiencies</div>
            <div className="text-sm text-blue-700">• Weakened immune system</div>
            <div className="text-sm text-blue-700">• Osteoporosis risk</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Overweight Risks</div>
            <div className="text-sm text-blue-700">• Type 2 diabetes</div>
            <div className="text-sm text-blue-700">• High blood pressure</div>
            <div className="text-sm text-blue-700">• Heart disease</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Obesity Risks</div>
            <div className="text-sm text-blue-700">• Sleep apnea</div>
            <div className="text-sm text-blue-700">• Stroke risk</div>
            <div className="text-sm text-blue-700">• Certain cancers</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Normal Weight Benefits</div>
            <div className="text-sm text-blue-700">• Lower disease risk</div>
            <div className="text-sm text-blue-700">• Better energy levels</div>
            <div className="text-sm text-blue-700">• Improved mobility</div>
          </div>
        </div>
      </div>

      {/* Healthy Lifestyle Tips */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">🌟</span>
          Healthy Lifestyle Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Nutrition</div>
            <div className="text-sm text-purple-700">• Balanced, varied diet</div>
            <div className="text-sm text-purple-700">• Portion control</div>
            <div className="text-sm text-purple-700">• Stay hydrated</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Exercise</div>
            <div className="text-sm text-purple-700">• 150 min moderate activity/week</div>
            <div className="text-sm text-purple-700">• Strength training 2x/week</div>
            <div className="text-sm text-purple-700">• Find activities you enjoy</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Lifestyle</div>
            <div className="text-sm text-purple-700">• Adequate sleep (7-9 hours)</div>
            <div className="text-sm text-purple-700">• Stress management</div>
            <div className="text-sm text-purple-700">• Regular health checkups</div>
          </div>
        </div>
      </div>
    </div>
  );
}