'use client';

import { useState } from 'react';

export default function GraphingInequalitiesNumberLineCalculator() {
  const [inequality, setInequality] = useState<string>('');
  const [variable, setVariable] = useState<string>('x');
  const [result, setResult] = useState<string>('');
  const [graphPoints, setGraphPoints] = useState<{ value: number; inclusive: boolean; direction: 'left' | 'right' | 'none' } | null>(null);

  const calculate = () => {
    if (!inequality.trim()) return;

    try {
      // Parse simple inequalities like "x > 5", "x <= -3", etc.
      const match = inequality.match(/([a-z])\s*([<>]=?)\s*(-?\d+\.?\d*)/i);
      if (!match) {
        setResult('Invalid inequality format. Use format like: x > 5');
        setGraphPoints(null);
        return;
      }

      const [, varName, operator, valueStr] = match;
      const value = parseFloat(valueStr);

      const inclusive = operator.includes('=');
      const direction = operator.startsWith('>') ? 'right' : 'left';

      setGraphPoints({ value, inclusive, direction });

      let description = `${varName} ${operator} ${value}\n`;
      description += `Point at ${value} is ${inclusive ? 'filled (inclusive)' : 'open (exclusive)'}\n`;
      description += `Arrow points ${direction === 'right' ? 'right (→)' : 'left (←)'}`;

      setResult(description);
    } catch (error) {
      setResult('Error parsing inequality');
      setGraphPoints(null);
    }
  };

  const clear = () => {
    setInequality('');
    setVariable('x');
    setResult('');
    setGraphPoints(null);
  };

  const renderNumberLine = () => {
    if (!graphPoints) return null;

    const { value, inclusive, direction } = graphPoints;
    const lineValues = [];
    for (let i = value - 5; i <= value + 5; i++) {
      lineValues.push(i);
    }

    return (
      <div className="mt-4 p-4 bg-white rounded-lg">
        <div className="flex items-center justify-center relative h-16">
          {/* Number line */}
          <div className="absolute w-full h-0.5 bg-gray-400"></div>

          {/* Tick marks */}
          {lineValues.map((v, i) => (
            <div key={i} className="absolute flex flex-col items-center" style={{ left: `${((i / (lineValues.length - 1)) * 100)}%` }}>
              <div className="w-0.5 h-3 bg-gray-400 -mt-1.5"></div>
              <span className="text-xs mt-2 text-gray-600">{v}</span>
            </div>
          ))}

          {/* Critical point */}
          <div className="absolute flex items-center justify-center" style={{ left: '50%' }}>
            <div className={`w-4 h-4 rounded-full border-2 border-blue-600 ${inclusive ? 'bg-blue-600' : 'bg-white'}`}></div>
          </div>

          {/* Arrow */}
          {direction === 'right' && (
            <div className="absolute left-1/2 w-1/2 h-1 bg-blue-500 opacity-50"></div>
          )}
          {direction === 'left' && (
            <div className="absolute right-1/2 w-1/2 h-1 bg-blue-500 opacity-50"></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">━</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Graphing Inequalities Number Line Calculator</h1>
          <p className="text-gray-600">Graph inequalities on a number line with visual representation</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6 whitespace-pre-line">
            {result || ' '}
          </div>
          <div className="text-xl font-mono">
            {inequality || 'Enter inequality'}
          </div>
        </div>
        {renderNumberLine()}
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inequality Expression
          </label>
          <input
            type="text"
            value={inequality}
            onChange={(e) => setInequality(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., x > 5 or x <= -3"
          />
          <div className="text-xs text-gray-500 mt-1">Use format: x {'>'}{'>'} 5, x {'<'}{'='} -3, etc.</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Graph
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Inequality Symbols */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">📐</span>
          Inequality Symbols
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Greater Than ({'>'}) </div>
            <div className="text-sm text-purple-700">Open circle, arrow to the right</div>
            <div className="text-xs text-purple-600 mt-1">x {'>'} 5 means x is greater than 5</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Less Than ({'<'})</div>
            <div className="text-sm text-purple-700">Open circle, arrow to the left</div>
            <div className="text-xs text-purple-600 mt-1">x {'<'} 5 means x is less than 5</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Greater Than or Equal ({'>'}=)</div>
            <div className="text-sm text-purple-700">Filled circle, arrow to the right</div>
            <div className="text-xs text-purple-600 mt-1">x {'>'}= 5 includes 5</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Less Than or Equal ({'<'}=)</div>
            <div className="text-sm text-purple-700">Filled circle, arrow to the left</div>
            <div className="text-xs text-purple-600 mt-1">x {'<'}= 5 includes 5</div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💼</span>
          Common Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Mathematics</div>
            <div className="text-sm text-green-700">• Solving inequalities</div>
            <div className="text-sm text-green-700">• Range of solutions</div>
            <div className="text-sm text-green-700">• Domain restrictions</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Real World</div>
            <div className="text-sm text-green-700">• Budget constraints</div>
            <div className="text-sm text-green-700">• Age requirements</div>
            <div className="text-sm text-green-700">• Temperature ranges</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Science</div>
            <div className="text-sm text-green-700">• Measurement bounds</div>
            <div className="text-sm text-green-700">• Valid data ranges</div>
            <div className="text-sm text-green-700">• Safety thresholds</div>
          </div>
        </div>
      </div>
    </div>
  );
}
