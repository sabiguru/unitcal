'use client';

import { useState } from 'react';

interface SignificantFiguresResult {
  count: number;
  breakdown: string[];
  rules: string[];
}

interface RoundResult {
  original: string;
  rounded: string;
  targetSigFigs: number;
}

interface CalculateResult {
  number1: string;
  number2: string;
  operation: string;
  result: string;
  sigFigs: number;
  explanation: string;
}

type Results = {
  type: 'count';
  number: string;
  count: number;
  breakdown: string[];
  rules: string[];
} | {
  type: 'round';
  original: string;
  rounded: string;
  targetSigFigs: number;
} | {
  type: 'calculate';
  number1: string;
  number2: string;
  operation: string;
  result: string;
  sigFigs: number;
  explanation: string;
};

export default function SignificantFiguresCalculator() {
  const [number, setNumber] = useState('');
  const [operation, setOperation] = useState('count');
  const [targetSigFigs, setTargetSigFigs] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [operationType, setOperationType] = useState('add');
  const [results, setResults] = useState<Results | null>(null);

  const countSignificantFigures = (num: string): SignificantFiguresResult => {
    const cleanNum = num.replace(/[+\-\s]/g, '').toLowerCase();
    
    if (!cleanNum || isNaN(parseFloat(cleanNum))) {
      return { count: 0, breakdown: [], rules: [] };
    }

    const breakdown: string[] = [];
    const rules: string[] = [];
    let sigFigs = 0;
    
    // Handle scientific notation
    let baseNumber = cleanNum;
    if (cleanNum.includes('e')) {
      baseNumber = cleanNum.split('e')[0];
    }
    
    // Remove decimal point for processing
    const hasDecimal = baseNumber.includes('.');
    const beforeDecimal = baseNumber.split('.')[0] || '';
    const afterDecimal = baseNumber.split('.')[1] || '';
    
    // Count significant figures
    let leadingZeros = true;
    
    // Process digits before decimal
    for (let i = 0; i < beforeDecimal.length; i++) {
      const digit = beforeDecimal[i];
      if (digit !== '0') {
        leadingZeros = false;
        sigFigs++;
        breakdown.push(`${digit} - significant (non-zero)`);
        if (!rules.includes('Non-zero digits are always significant')) {
          rules.push('Non-zero digits are always significant');
        }
      } else if (!leadingZeros) {
        sigFigs++;
        breakdown.push(`${digit} - significant (between non-zeros)`);
        if (!rules.includes('Zeros between non-zero digits are significant')) {
          rules.push('Zeros between non-zero digits are significant');
        }
      } else {
        breakdown.push(`${digit} - not significant (leading zero)`);
      }
    }
    
    // Process digits after decimal
    for (let i = 0; i < afterDecimal.length; i++) {
      const digit = afterDecimal[i];
      if (digit !== '0' || sigFigs > 0) {
        sigFigs++;
        if (digit === '0') {
          breakdown.push(`${digit} - significant (trailing zero after decimal)`);
          if (!rules.includes('Trailing zeros after decimal point are significant')) {
            rules.push('Trailing zeros after decimal point are significant');
          }
        } else {
          breakdown.push(`${digit} - significant (non-zero after decimal)`);
          if (!rules.includes('Non-zero digits are always significant')) {
            rules.push('Non-zero digits are always significant');
          }
        }
      } else {
        breakdown.push(`${digit} - not significant (leading zero after decimal)`);
      }
    }
    
    return { count: sigFigs, breakdown, rules };
  };

  const roundToSigFigs = (num: number, sigFigs: number): string => {
    if (num === 0) return '0';
    
    const sign = num < 0 ? -1 : 1;
    const absNum = Math.abs(num);
    const magnitude = Math.floor(Math.log10(absNum));
    const rounded = sign * Math.round(absNum / Math.pow(10, magnitude - sigFigs + 1)) * Math.pow(10, magnitude - sigFigs + 1);
    
    if (magnitude >= sigFigs - 1) {
      return rounded.toFixed(0);
    } else {
      return rounded.toFixed(sigFigs - magnitude - 1);
    }
  };

  const performCalculation = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    
    if (isNaN(num1) || isNaN(num2)) return null;
    
    const sig1 = countSignificantFigures(number1).count;
    const sig2 = countSignificantFigures(number2).count;
    
    let result: number;
    let resultSigFigs: number;
    let explanation: string;
    
    if (operationType === 'add' || operationType === 'subtract') {
      // Addition/subtraction: result has same decimal places as the number with fewer decimal places
      const dec1 = number1.includes('.') ? number1.split('.')[1].length : 0;
      const dec2 = number2.includes('.') ? number2.split('.')[1].length : 0;
      const minDecimals = Math.min(dec1, dec2);
      
      result = operationType === 'add' ? num1 + num2 : num1 - num2;
      resultSigFigs = Math.min(sig1, sig2); // Approximation for display
      explanation = `Addition/subtraction: Result rounded to ${minDecimals} decimal places`;
    } else {
      // Multiplication/division: result has same sig figs as the number with fewer sig figs
      result = operationType === 'multiply' ? num1 * num2 : num1 / num2;
      resultSigFigs = Math.min(sig1, sig2);
      explanation = `Multiplication/division: Result has ${resultSigFigs} significant figures`;
    }
    
    return {
      number1,
      number2,
      operation: operationType,
      result: roundToSigFigs(result, resultSigFigs),
      sigFigs: resultSigFigs,
      explanation
    };
  };

  const calculateSignificantFigures = () => {
    if (operation === 'count') {
      if (!number) return;
      const result = countSignificantFigures(number);
      setResults({
        type: 'count',
        number: number,
        count: result.count,
        breakdown: result.breakdown,
        rules: result.rules
      });
    } else if (operation === 'round') {
      if (!number || !targetSigFigs) return;
      const num = parseFloat(number);
      const sigFigs = parseInt(targetSigFigs);
      if (isNaN(num) || isNaN(sigFigs)) return;
      
      const rounded = roundToSigFigs(num, sigFigs);
      setResults({
        type: 'round',
        original: number,
        rounded: rounded,
        targetSigFigs: sigFigs
      });
    } else if (operation === 'calculate') {
      const calcResult = performCalculation();
      if (calcResult) {
        setResults({
          type: 'calculate',
          ...calcResult
        });
      }
    }
  };

  const clear = () => {
    setNumber('');
    setTargetSigFigs('');
    setNumber1('');
    setNumber2('');
    setResults(null);
  };

  const getExampleNumbers = () => [
    { value: '123.45', description: '5 sig figs' },
    { value: '0.00123', description: '3 sig figs' },
    { value: '1200', description: 'Ambiguous (2-4 sig figs)' },
    { value: '1200.', description: '4 sig figs' },
    { value: '1.20e3', description: '3 sig figs' },
    { value: '0.00100', description: '3 sig figs' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🔢</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Significant Figures Calculator — Sig Figs & Precision Calculator</h1>
          <p className="text-gray-600">Count, round, and calculate with significant figures</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

        {/* Operation Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="count">Count Significant Figures</option>
            <option value="round">Round to Significant Figures</option>
            <option value="calculate">Calculate with Sig Figs</option>
          </select>
        </div>

        {/* Input Fields */}
        {operation === 'count' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter a number (e.g., 123.45, 0.00123, 1.20e3)"
            />
          </div>
        )}

        {operation === 'round' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter number to round"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Sig Figs</label>
              <input
                type="number"
                value={targetSigFigs}
                onChange={(e) => setTargetSigFigs(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., 3"
                min="1"
              />
            </div>
          </div>
        )}

        {operation === 'calculate' && (
          <div className="space-y-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Number</label>
                <input
                  type="text"
                  value={number1}
                  onChange={(e) => setNumber1(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter first number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Second Number</label>
                <input
                  type="text"
                  value={number2}
                  onChange={(e) => setNumber2(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter second number"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Operation</label>
              <select
                value={operationType}
                onChange={(e) => setOperationType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="add">Addition (+)</option>
                <option value="subtract">Subtraction (-)</option>
                <option value="multiply">Multiplication (×)</option>
                <option value="divide">Division (÷)</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex space-x-4 mb-8">
          <button
            onClick={calculateSignificantFigures}
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {results.type === 'count' && (
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">
                  Number: {results.number} has {results.count} significant figures
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-800 mb-3">Digit Breakdown:</h4>
                    <div className="space-y-2">
                      {results.breakdown.map((item, index) => (
                        <div key={index} className="text-sm text-purple-700 font-mono bg-white p-2 rounded">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-purple-800 mb-3">Rules Applied:</h4>
                    <div className="space-y-2">
                      {results.rules.map((rule, index) => (
                        <div key={index} className="text-sm text-purple-700 bg-white p-2 rounded">
                          {rule}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {results.type === 'round' && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Rounded Result</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900">{results.original}</div>
                    <div className="text-sm text-blue-700">Original</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900">{results.rounded}</div>
                    <div className="text-sm text-blue-700">Rounded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900">{results.targetSigFigs}</div>
                    <div className="text-sm text-blue-700">Target Sig Figs</div>
                  </div>
                </div>
              </div>
            )}

            {results.type === 'calculate' && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Calculation Result</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-900">
                      {results.number1} {results.operation === 'add' ? '+' : results.operation === 'subtract' ? '-' : results.operation === 'multiply' ? '×' : '÷'} {results.number2} = {results.result}
                    </div>
                    <div className="text-sm text-green-700 mt-2">{results.explanation}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Examples */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getExampleNumbers().map((example, index) => (
              <button
                key={index}
                onClick={() => setNumber(example.value)}
                className="text-left p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-200"
              >
                <div className="font-mono text-gray-900">{example.value}</div>
                <div className="text-sm text-gray-600">{example.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Significant Figures Rules */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">📏</span>
          Significant Figures Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-purple-900">Non-zero digits</div>
            <div className="text-sm text-purple-800">Always significant (1, 2, 3...)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-purple-900">Leading zeros</div>
            <div className="text-sm text-purple-800">Never significant (0.0123 = 3 sig figs)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-purple-900">Captive zeros</div>
            <div className="text-sm text-purple-800">Always significant (105 = 3 sig figs)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-purple-900">Trailing zeros</div>
            <div className="text-sm text-purple-800">Significant if after decimal point</div>
          </div>
        </div>
      </div>

      {/* Calculation Rules */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">🧮</span>
          Calculation Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-blue-900">Addition & Subtraction</div>
            <div className="text-sm text-blue-800">Result has same decimal places as the number with fewest decimal places</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-blue-900">Multiplication & Division</div>
            <div className="text-sm text-blue-800">Result has same number of sig figs as the number with fewest sig figs</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-blue-900">Scientific Notation</div>
            <div className="text-sm text-blue-800">Clear way to show exact number of sig figs (1.23 × 10³)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-blue-900">Exact Numbers</div>
            <div className="text-sm text-blue-800">Have infinite sig figs (counted items, defined conversions)</div>
          </div>
        </div>
      </div>
    </div>
  );
}