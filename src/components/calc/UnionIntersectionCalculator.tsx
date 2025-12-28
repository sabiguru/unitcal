'use client';

import { useState } from 'react';

export default function UnionIntersectionCalculator() {
  const [set1, setSet1] = useState<string>('');
  const [set2, setSet2] = useState<string>('');
  const [operation, setOperation] = useState<'union' | 'intersection' | 'difference' | 'symmetric'>('union');
  const [result, setResult] = useState<string>('');

  const parseSet = (input: string): Set<string> => {
    return new Set(input.split(',').map(s => s.trim()).filter(s => s));
  };

  const union = (s1: Set<string>, s2: Set<string>): Set<string> => {
    return new Set([...s1, ...s2]);
  };

  const intersection = (s1: Set<string>, s2: Set<string>): Set<string> => {
    return new Set([...s1].filter(x => s2.has(x)));
  };

  const difference = (s1: Set<string>, s2: Set<string>): Set<string> => {
    return new Set([...s1].filter(x => !s2.has(x)));
  };

  const symmetricDifference = (s1: Set<string>, s2: Set<string>): Set<string> => {
    const diff1 = difference(s1, s2);
    const diff2 = difference(s2, s1);
    return union(diff1, diff2);
  };

  const calculate = () => {
    if (!set1.trim() || !set2.trim()) {
      setResult('Please enter both sets');
      return;
    }

    const s1 = parseSet(set1);
    const s2 = parseSet(set2);

    let output = `Set A: {${Array.from(s1).join(', ')}}\n`;
    output += `Set B: {${Array.from(s2).join(', ')}}\n\n`;
    output += `|A| = ${s1.size}\n`;
    output += `|B| = ${s2.size}\n\n`;

    let resultSet: Set<string>;
    let operationSymbol = '';
    let operationName = '';

    switch (operation) {
      case 'union':
        resultSet = union(s1, s2);
        operationSymbol = '∪';
        operationName = 'Union';
        output += `${operationName} (A ${operationSymbol} B):\n`;
        output += 'All elements in either A or B (or both)\n\n';
        break;
      case 'intersection':
        resultSet = intersection(s1, s2);
        operationSymbol = '∩';
        operationName = 'Intersection';
        output += `${operationName} (A ${operationSymbol} B):\n`;
        output += 'Elements in both A and B\n\n';
        break;
      case 'difference':
        resultSet = difference(s1, s2);
        operationSymbol = '\\';
        operationName = 'Difference';
        output += `${operationName} (A ${operationSymbol} B):\n`;
        output += 'Elements in A but not in B\n\n';
        break;
      case 'symmetric':
        resultSet = symmetricDifference(s1, s2);
        operationSymbol = '△';
        operationName = 'Symmetric Difference';
        output += `${operationName} (A ${operationSymbol} B):\n`;
        output += 'Elements in A or B but not in both\n\n';
        break;
    }

    if (resultSet.size === 0) {
      output += `Result: ∅ (empty set)\n`;
      output += `|A ${operationSymbol} B| = 0`;
    } else {
      output += `Result: {${Array.from(resultSet).join(', ')}}\n`;
      output += `|A ${operationSymbol} B| = ${resultSet.size}`;
    }

    setResult(output);
  };

  const clear = () => {
    setSet1('');
    setSet2('');
    setResult('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">∪∩</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Union & Intersection Calculator</h1>
          <p className="text-gray-600">Calculate set union, intersection, and differences</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[120px]">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Operation Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Set Operation</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setOperation('union')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'union'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Union (∪)
          </button>
          <button
            onClick={() => setOperation('intersection')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'intersection'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Intersection (∩)
          </button>
          <button
            onClick={() => setOperation('difference')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'difference'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Difference (\)
          </button>
          <button
            onClick={() => setOperation('symmetric')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'symmetric'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Symmetric (△)
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Set A (comma-separated elements)
          </label>
          <input
            type="text"
            value={set1}
            onChange={(e) => setSet1(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., 1, 2, 3, 4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Set B (comma-separated elements)
          </label>
          <input
            type="text"
            value={set2}
            onChange={(e) => setSet2(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., 3, 4, 5, 6"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Set Operations */}
      <div className="mt-8 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
          <span className="text-orange-600 mr-2">📐</span>
          Set Operation Definitions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Union (A ∪ B)</div>
            <div className="text-sm text-orange-700">All elements in A or B (or both)</div>
            <div className="text-xs text-orange-600 mt-1">{'{'}x : x ∈ A or x ∈ B{'}'}</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Intersection (A ∩ B)</div>
            <div className="text-sm text-orange-700">Elements in both A and B</div>
            <div className="text-xs text-orange-600 mt-1">{'{'}x : x ∈ A and x ∈ B{'}'}</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Difference (A \ B)</div>
            <div className="text-sm text-orange-700">Elements in A but not in B</div>
            <div className="text-xs text-orange-600 mt-1">{'{'}x : x ∈ A and x ∉ B{'}'}</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Symmetric Difference (A △ B)</div>
            <div className="text-sm text-orange-700">Elements in A or B but not both</div>
            <div className="text-xs text-orange-600 mt-1">(A \ B) ∪ (B \ A)</div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">A = {'{'}1, 2, 3{'}'}, B = {'{'}3, 4, 5{'}'}</div>
            <div className="text-sm text-blue-700">A ∪ B = {'{'}1, 2, 3, 4, 5{'}'}</div>
            <div className="text-sm text-blue-700">A ∩ B = {'{'}3{'}'}</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">A = {'{'}1, 2, 3{'}'}, B = {'{'}3, 4, 5{'}'}</div>
            <div className="text-sm text-blue-700">A \ B = {'{'}1, 2{'}'}</div>
            <div className="text-sm text-blue-700">A △ B = {'{'}1, 2, 4, 5{'}'}</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">A = {'{'}a, b{'}'}, B = {'{'}c, d{'}'}</div>
            <div className="text-sm text-blue-700">A ∪ B = {'{'}a, b, c, d{'}'}</div>
            <div className="text-sm text-blue-700">A ∩ B = ∅</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">A = {'{'}1, 2{'}'}, B = {'{'}1, 2{'}'}</div>
            <div className="text-sm text-blue-700">A ∪ B = {'{'}1, 2{'}'}</div>
            <div className="text-sm text-blue-700">A ∩ B = {'{'}1, 2{'}'}</div>
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">🔢</span>
          Set Operation Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Commutative</div>
            <div className="text-sm text-purple-700">A ∪ B = B ∪ A</div>
            <div className="text-sm text-purple-700">A ∩ B = B ∩ A</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Associative</div>
            <div className="text-sm text-purple-700">(A ∪ B) ∪ C = A ∪ (B ∪ C)</div>
            <div className="text-sm text-purple-700">(A ∩ B) ∩ C = A ∩ (B ∩ C)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Distributive</div>
            <div className="text-sm text-purple-700">A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</div>
            <div className="text-sm text-purple-700">A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Identity</div>
            <div className="text-sm text-purple-700">A ∪ ∅ = A</div>
            <div className="text-sm text-purple-700">A ∩ U = A (U = universal set)</div>
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
            <div className="font-semibold text-green-900 mb-2">Computer Science</div>
            <div className="text-sm text-green-700">• Database queries</div>
            <div className="text-sm text-green-700">• Set operations</div>
            <div className="text-sm text-green-700">• Data filtering</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Statistics</div>
            <div className="text-sm text-green-700">• Sample spaces</div>
            <div className="text-sm text-green-700">• Event combinations</div>
            <div className="text-sm text-green-700">• Venn diagrams</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Logic</div>
            <div className="text-sm text-green-700">• Boolean operations</div>
            <div className="text-sm text-green-700">• Set theory</div>
            <div className="text-sm text-green-700">• Category theory</div>
          </div>
        </div>
      </div>
    </div>
  );
}
