'use client';

import { useState } from 'react';

interface Fraction {
  numerator: number;
  denominator: number;
}

export default function FractionCalculator() {
  const [fractions, setFractions] = useState<Fraction[]>([
    { numerator: 0, denominator: 1 },
    { numerator: 0, denominator: 1 }
  ]);
  const [operations, setOperations] = useState<string[]>(['+']);
  const [result, setResult] = useState<Fraction | null>(null);
  const [expression, setExpression] = useState<string>('');

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const reduceFraction = (fraction: Fraction): Fraction => {
    if (fraction.denominator === 0) return { numerator: 0, denominator: 1 };
    const divisor = gcd(fraction.numerator, fraction.denominator);
    return {
      numerator: fraction.numerator / divisor,
      denominator: fraction.denominator / divisor
    };
  };

  const addFractions = (f1: Fraction, f2: Fraction): Fraction => {
    const numerator = f1.numerator * f2.denominator + f2.numerator * f1.denominator;
    const denominator = f1.denominator * f2.denominator;
    return reduceFraction({ numerator, denominator });
  };

  const subtractFractions = (f1: Fraction, f2: Fraction): Fraction => {
    const numerator = f1.numerator * f2.denominator - f2.numerator * f1.denominator;
    const denominator = f1.denominator * f2.denominator;
    return reduceFraction({ numerator, denominator });
  };

  const multiplyFractions = (f1: Fraction, f2: Fraction): Fraction => {
    const numerator = f1.numerator * f2.numerator;
    const denominator = f1.denominator * f2.denominator;
    return reduceFraction({ numerator, denominator });
  };

  const divideFractions = (f1: Fraction, f2: Fraction): Fraction => {
    const numerator = f1.numerator * f2.denominator;
    const denominator = f1.denominator * f2.numerator;
    return reduceFraction({ numerator, denominator });
  };

  const calculateOperation = (f1: Fraction, f2: Fraction, operation: string): Fraction => {
    switch (operation) {
      case '+': return addFractions(f1, f2);
      case '-': return subtractFractions(f1, f2);
      case '*': return multiplyFractions(f1, f2);
      case '/': return divideFractions(f1, f2);
      default: return { numerator: 0, denominator: 1 };
    }
  };

  const calculate = () => {
    if (fractions.length === 0) return;
    
    let result = fractions[0];
    let expressionStr = `${fractions[0].numerator}/${fractions[0].denominator}`;
    
    for (let i = 1; i < fractions.length; i++) {
      const operation = operations[i - 1] || '+';
      const nextFraction = fractions[i];
      result = calculateOperation(result, nextFraction, operation);
      expressionStr += ` ${operation} ${nextFraction.numerator}/${nextFraction.denominator}`;
    }
    
    setResult(result);
    setExpression(`${expressionStr} = ${result.numerator}/${result.denominator}`);
  };

  const clear = () => {
    setFractions([
      { numerator: 0, denominator: 1 },
      { numerator: 0, denominator: 1 }
    ]);
    setOperations(['+']);
    setResult(null);
    setExpression('');
  };

  const addFraction = () => {
    if (fractions.length < 5) {
      setFractions([...fractions, { numerator: 0, denominator: 1 }]);
      setOperations([...operations, '+']);
    }
  };

  const removeFraction = (index: number) => {
    if (fractions.length > 2) {
      const newFractions = fractions.filter((_, i) => i !== index);
      const newOperations = operations.filter((_, i) => i !== index - 1);
      setFractions(newFractions);
      setOperations(newOperations);
    }
  };

  const updateFraction = (index: number, field: 'numerator' | 'denominator', value: number) => {
    const newFractions = [...fractions];
    newFractions[index] = { ...newFractions[index], [field]: value };
    setFractions(newFractions);
  };

  const updateOperation = (index: number, operation: string) => {
    const newOperations = [...operations];
    newOperations[index] = operation;
    setOperations(newOperations);
  };

  const formatFraction = (fraction: Fraction): string => {
    if (fraction.denominator === 1) {
      return fraction.numerator.toString();
    }
    return `${fraction.numerator}/${fraction.denominator}`;
  };

  const toDecimal = (fraction: Fraction): string => {
    if (fraction.denominator === 0) return 'Undefined';
    return (fraction.numerator / fraction.denominator).toFixed(4);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🔢</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fraction Calculator — Add, Subtract, Multiply & Divide Fractions</h1>
          <p className="text-gray-600">Add, subtract, multiply, and divide up to 5 fractions with ease</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Expression Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {expression || ' '}
          </div>
          <div className="text-2xl font-mono text-right">
            {result ? formatFraction(result) : '0'}
          </div>
          {result && (
            <div className="text-sm text-gray-400 text-right mt-2">
              ≈ {toDecimal(result)}
            </div>
          )}
        </div>
      </div>

      {/* Fractions Input */}
      <div className="space-y-4">
        {fractions.map((fraction, index) => (
          <div key={index}>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Fraction {index + 1}
                </h3>
                {fractions.length > 2 && (
                  <button
                    onClick={() => removeFraction(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-2 flex-wrap">
                <input
                  type="number"
                  value={fraction.numerator}
                  onChange={(e) => updateFraction(index, 'numerator', parseInt(e.target.value) || 0)}
                  className="w-16 sm:w-20 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
                <span className="text-2xl text-gray-400">/</span>
                <input
                  type="number"
                  value={fraction.denominator}
                  onChange={(e) => updateFraction(index, 'denominator', parseInt(e.target.value) || 1)}
                  className="w-16 sm:w-20 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1"
                />
                <span className="text-xs sm:text-sm text-gray-500 ml-2 sm:ml-4 break-all">
                  = {toDecimal(fraction)}
                </span>
              </div>
            </div>

            {/* Operation selector (except for last fraction) */}
            {index < fractions.length - 1 && (
              <div className="text-center py-2">
                <select
                  value={operations[index] || '+'}
                  onChange={(e) => updateOperation(index, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="+">+</option>
                  <option value="-">−</option>
                  <option value="*">×</option>
                  <option value="/">÷</option>
                </select>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Fraction Button */}
      {fractions.length < 5 && (
        <div className="mt-4">
          <button
            onClick={addFraction}
            className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            + Add Another Fraction
          </button>
        </div>
      )}

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
    </div>
  );
}