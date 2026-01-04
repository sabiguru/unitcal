'use client';

import { useState } from 'react';

export default function PercentageCalculator() {
  const [calculationType, setCalculationType] = useState<'basic' | 'change' | 'of' | 'increase' | 'decrease'>('basic');
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const calculateBasic = () => {
    const num = parseFloat(value1);
    const percent = parseFloat(value2);
    if (isNaN(num) || isNaN(percent)) return;
    
    const result = (num * percent) / 100;
    setResult(result);
    setExpression(`${percent}% of ${num} = ${result}`);
  };

  const calculateChange = () => {
    const oldValue = parseFloat(value1);
    const newValue = parseFloat(value2);
    if (isNaN(oldValue) || isNaN(newValue) || oldValue === 0) return;
    
    const change = ((newValue - oldValue) / oldValue) * 100;
    setResult(change);
    setExpression(`Change from ${oldValue} to ${newValue} = ${change.toFixed(2)}%`);
  };

  const calculateOf = () => {
    const part = parseFloat(value1);
    const whole = parseFloat(value2);
    if (isNaN(part) || isNaN(whole) || whole === 0) return;
    
    const percentage = (part / whole) * 100;
    setResult(percentage);
    setExpression(`${part} is ${percentage.toFixed(2)}% of ${whole}`);
  };

  const calculateIncrease = () => {
    const num = parseFloat(value1);
    const percent = parseFloat(value2);
    if (isNaN(num) || isNaN(percent)) return;
    
    const result = num + (num * percent) / 100;
    setResult(result);
    setExpression(`${num} + ${percent}% = ${result}`);
  };

  const calculateDecrease = () => {
    const num = parseFloat(value1);
    const percent = parseFloat(value2);
    if (isNaN(num) || isNaN(percent)) return;
    
    const result = num - (num * percent) / 100;
    setResult(result);
    setExpression(`${num} - ${percent}% = ${result}`);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'basic':
        calculateBasic();
        break;
      case 'change':
        calculateChange();
        break;
      case 'of':
        calculateOf();
        break;
      case 'increase':
        calculateIncrease();
        break;
      case 'decrease':
        calculateDecrease();
        break;
    }
  };

  const clear = () => {
    setValue1('');
    setValue2('');
    setResult(null);
    setExpression('');
  };

  const getInputLabels = () => {
    switch (calculationType) {
      case 'basic':
        return { label1: 'Number', label2: 'Percentage', placeholder1: 'Enter number', placeholder2: 'Enter percentage' };
      case 'change':
        return { label1: 'Old Value', label2: 'New Value', placeholder1: 'Enter old value', placeholder2: 'Enter new value' };
      case 'of':
        return { label1: 'Part', label2: 'Whole', placeholder1: 'Enter part', placeholder2: 'Enter whole' };
      case 'increase':
        return { label1: 'Number', label2: 'Increase %', placeholder1: 'Enter number', placeholder2: 'Enter percentage' };
      case 'decrease':
        return { label1: 'Number', label2: 'Decrease %', placeholder1: 'Enter number', placeholder2: 'Enter percentage' };
      default:
        return { label1: 'Value 1', label2: 'Value 2', placeholder1: 'Enter value', placeholder2: 'Enter value' };
    }
  };

  const labels = getInputLabels();

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">%</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Percentage Calculator — Percent Change & Math Calculator</h1>
          <p className="text-gray-600">Calculate percentages, percentage change, and percentage of amounts</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      
      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {expression || ' '}
          </div>
          <div className="text-3xl font-mono text-right">
            {result !== null ? result.toFixed(2) : '0'}
          </div>
        </div>
      </div>

      {/* Calculation Type Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Calculation Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setCalculationType('basic')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'basic'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            X% of Y
          </button>
          <button
            onClick={() => setCalculationType('change')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'change'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            % Change
          </button>
          <button
            onClick={() => setCalculationType('of')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'of'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            X is Y% of Z
          </button>
          <button
            onClick={() => setCalculationType('increase')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'increase'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            % Increase
          </button>
          <button
            onClick={() => setCalculationType('decrease')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'decrease'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            % Decrease
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.label1}
          </label>
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={labels.placeholder1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.label2}
          </label>
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={labels.placeholder2}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Percentage Formulas */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📐</span>
          Percentage Formulas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Basic Percentage</div>
            <div className="text-sm text-blue-700 font-mono">Percentage = (Part / Whole) × 100</div>
            <div className="text-xs text-blue-600 mt-1">What percent is X of Y?</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Percentage of a Number</div>
            <div className="text-sm text-blue-700 font-mono">Result = (Percentage / 100) × Number</div>
            <div className="text-xs text-blue-600 mt-1">X% of Y is what?</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Percentage Change</div>
            <div className="text-sm text-blue-700 font-mono">Change = ((New - Old) / Old) × 100</div>
            <div className="text-xs text-blue-600 mt-1">Growth or decline rate</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Percentage Increase/Decrease</div>
            <div className="text-sm text-blue-700 font-mono">New = Old ± (Old × Percentage / 100)</div>
            <div className="text-xs text-blue-600 mt-1">Apply percentage to value</div>
          </div>
        </div>
      </div>

      {/* Common Percentage Uses */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💼</span>
          Common Percentage Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Finance</div>
            <div className="text-sm text-green-700">• Interest rates</div>
            <div className="text-sm text-green-700">• Tax calculations</div>
            <div className="text-sm text-green-700">• Investment returns</div>
            <div className="text-sm text-green-700">• Discounts and markups</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Business</div>
            <div className="text-sm text-green-700">• Sales growth</div>
            <div className="text-sm text-green-700">• Market share</div>
            <div className="text-sm text-green-700">• Profit margins</div>
            <div className="text-sm text-green-700">• Employee performance</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Daily Life</div>
            <div className="text-sm text-green-700">• Tips and gratuity</div>
            <div className="text-sm text-green-700">• Grade calculations</div>
            <div className="text-sm text-green-700">• Statistics and polls</div>
            <div className="text-sm text-green-700">• Recipe adjustments</div>
          </div>
        </div>
      </div>

      {/* Percentage Tips */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Quick Percentage Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 10% = Move decimal one place left</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 1% = Move decimal two places left</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 50% = Divide by 2</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 25% = Divide by 4</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 20% = Divide by 5</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• 100% increase = Double the original</div>
          </div>
        </div>
      </div>
    </div>
  );
}