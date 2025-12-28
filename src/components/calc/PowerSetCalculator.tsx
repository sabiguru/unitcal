'use client';

import { useState } from 'react';

export default function PowerSetCalculator() {
  const [setInput, setSetInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const generatePowerSet = (arr: string[]): string[][] => {
    const powerSet: string[][] = [[]];

    for (const element of arr) {
      const length = powerSet.length;
      for (let i = 0; i < length; i++) {
        powerSet.push([...powerSet[i], element]);
      }
    }

    return powerSet;
  };

  const calculate = () => {
    if (!setInput.trim()) {
      setResult('Please enter a set');
      return;
    }

    // Parse input - support comma-separated values
    const elements = setInput.split(',').map(s => s.trim()).filter(s => s);

    if (elements.length === 0) {
      setResult('Please enter at least one element');
      return;
    }

    if (elements.length > 6) {
      setResult('Set too large. Maximum 6 elements (64 subsets)');
      return;
    }

    const powerSet = generatePowerSet(elements);

    let output = `Set: {${elements.join(', ')}}\n\n`;
    output += `Number of elements: ${elements.length}\n`;
    output += `Power set size: 2^${elements.length} = ${powerSet.length}\n\n`;
    output += 'Power Set (all subsets):\n';

    powerSet.forEach((subset, index) => {
      if (subset.length === 0) {
        output += `${index + 1}. ∅ (empty set)\n`;
      } else {
        output += `${index + 1}. {${subset.join(', ')}}\n`;
      }
    });

    setResult(output);
  };

  const clear = () => {
    setSetInput('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-lime-500 to-green-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">℘</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Power Set Calculator</h1>
          <p className="text-gray-600">Generate all possible subsets of a given set</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[200px] overflow-y-auto max-h-[400px]">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Set Elements (comma-separated)
          </label>
          <input
            type="text"
            value={setInput}
            onChange={(e) => setSetInput(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            placeholder="e.g., a, b, c or 1, 2, 3"
          />
          <div className="text-xs text-gray-500 mt-1">
            Maximum 6 elements. Separate with commas.
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-lime-500 hover:bg-lime-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Generate
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Power Set Properties */}
      <div className="mt-8 bg-gradient-to-br from-lime-50 to-green-100 rounded-xl p-6 border border-lime-200">
        <h3 className="text-lg font-semibold text-lime-900 mb-4 flex items-center">
          <span className="text-lime-600 mr-2">📐</span>
          Power Set Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-lime-900 mb-2">Definition</div>
            <div className="text-sm text-lime-700">Set of all subsets of a set</div>
            <div className="text-xs text-lime-600 mt-1">Including empty set and the set itself</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-lime-900 mb-2">Size Formula</div>
            <div className="text-sm text-lime-700 font-mono">|P(S)| = 2^|S|</div>
            <div className="text-xs text-lime-600 mt-1">Where |S| is the number of elements</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-lime-900 mb-2">Empty Set</div>
            <div className="text-sm text-lime-700">Always included in power set</div>
            <div className="text-xs text-lime-600 mt-1">∅ ∈ P(S) for any set S</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-lime-900 mb-2">Original Set</div>
            <div className="text-sm text-lime-700">Always included in power set</div>
            <div className="text-xs text-lime-600 mt-1">S ∈ P(S) for any set S</div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Power Set Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">P({'{}'}) = ?</div>
            <div className="text-sm text-blue-700">{'{'} ∅ {'}'}</div>
            <div className="text-xs text-blue-600 mt-1">Power set of empty set has 1 element</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">P({'{'}a{'}'}) = ?</div>
            <div className="text-sm text-blue-700">{'{'} ∅, {'{'}a{'}'} {'}'}</div>
            <div className="text-xs text-blue-600 mt-1">2 subsets: empty and original</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">P({'{'}a, b{'}'}) = ?</div>
            <div className="text-sm text-blue-700">{'{'} ∅, {'{'}a{'}'}, {'{'}b{'}'}, {'{'}a,b{'}'} {'}'}</div>
            <div className="text-xs text-blue-600 mt-1">4 subsets total</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">P({'{'}1, 2, 3{'}'}) = ?</div>
            <div className="text-sm text-blue-700">8 subsets (2³)</div>
            <div className="text-xs text-blue-600 mt-1">Includes all combinations</div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💼</span>
          Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Mathematics</div>
            <div className="text-sm text-green-700">• Set theory</div>
            <div className="text-sm text-green-700">• Combinatorics</div>
            <div className="text-sm text-green-700">• Topology</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Computer Science</div>
            <div className="text-sm text-green-700">• Algorithm design</div>
            <div className="text-sm text-green-700">• Database queries</div>
            <div className="text-sm text-green-700">• Complexity analysis</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Logic</div>
            <div className="text-sm text-green-700">• Boolean algebra</div>
            <div className="text-sm text-green-700">• Propositional logic</div>
            <div className="text-sm text-green-700">• Truth tables</div>
          </div>
        </div>
      </div>
    </div>
  );
}
