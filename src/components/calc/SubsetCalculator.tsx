'use client';

import { useState } from 'react';

export default function SubsetCalculator() {
  const [set1, setSet1] = useState<string>('');
  const [set2, setSet2] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const parseSet = (input: string): Set<string> => {
    return new Set(input.split(',').map(s => s.trim()).filter(s => s));
  };

  const isSubset = (subset: Set<string>, superset: Set<string>): boolean => {
    for (const element of subset) {
      if (!superset.has(element)) {
        return false;
      }
    }
    return true;
  };

  const isProperSubset = (subset: Set<string>, superset: Set<string>): boolean => {
    return isSubset(subset, superset) && subset.size < superset.size;
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

    const aSubsetB = isSubset(s1, s2);
    const bSubsetA = isSubset(s2, s1);
    const aProperSubsetB = isProperSubset(s1, s2);
    const bProperSubsetA = isProperSubset(s2, s1);

    output += 'Subset Relationships:\n\n';

    if (aSubsetB && bSubsetA) {
      output += 'A = B (sets are equal)\n';
      output += 'A ⊆ B ✓\n';
      output += 'B ⊆ A ✓\n';
      output += 'A ⊂ B ✗ (not proper subset)\n';
      output += 'B ⊂ A ✗ (not proper subset)';
    } else if (aSubsetB) {
      output += 'A ⊆ B ✓ (A is a subset of B)\n';
      if (aProperSubsetB) {
        output += 'A ⊂ B ✓ (A is a proper subset of B)\n';
      }
      output += 'B ⊆ A ✗\n';
      output += 'B ⊂ A ✗';
    } else if (bSubsetA) {
      output += 'A ⊆ B ✗\n';
      output += 'A ⊂ B ✗\n';
      output += 'B ⊆ A ✓ (B is a subset of A)\n';
      if (bProperSubsetA) {
        output += 'B ⊂ A ✓ (B is a proper subset of A)';
      }
    } else {
      output += 'A ⊆ B ✗\n';
      output += 'B ⊆ A ✗\n';
      output += 'Neither set is a subset of the other';
    }

    // Find elements in A but not in B
    const aMinusB = Array.from(s1).filter(x => !s2.has(x));
    const bMinusA = Array.from(s2).filter(x => !s1.has(x));

    if (aMinusB.length > 0 || bMinusA.length > 0) {
      output += '\n\nDifferences:\n';
      if (aMinusB.length > 0) {
        output += `Elements in A but not in B: {${aMinusB.join(', ')}}\n`;
      }
      if (bMinusA.length > 0) {
        output += `Elements in B but not in A: {${bMinusA.join(', ')}}`;
      }
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
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⊆</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subset Calculator</h1>
          <p className="text-gray-600">Check subset and proper subset relationships between sets</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[150px]">
            {result || ' '}
          </div>
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., 1, 2, 3"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., 1, 2, 3, 4, 5"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Check Relationship
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
      </div>

      {/* Subset Definitions */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">📐</span>
          Subset Definitions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Subset (A ⊆ B)</div>
            <div className="text-sm text-green-700">Every element of A is in B</div>
            <div className="text-xs text-green-600 mt-1">A can equal B</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Proper Subset (A ⊂ B)</div>
            <div className="text-sm text-green-700">A ⊆ B and A ≠ B</div>
            <div className="text-xs text-green-600 mt-1">At least one element in B not in A</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Empty Set</div>
            <div className="text-sm text-green-700">∅ is a subset of every set</div>
            <div className="text-xs text-green-600 mt-1">Including itself</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Equal Sets</div>
            <div className="text-sm text-green-700">A = B if A ⊆ B and B ⊆ A</div>
            <div className="text-xs text-green-600 mt-1">Same elements in both</div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💡</span>
          Subset Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">{'{'}1, 2{'}'} ⊆ {'{'}1, 2, 3{'}'}</div>
            <div className="text-sm text-blue-700">True - proper subset</div>
            <div className="text-xs text-blue-600 mt-1">All elements of first are in second</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">{'{'}1, 2{'}'} ⊆ {'{'}1, 2{'}'}</div>
            <div className="text-sm text-blue-700">True - but not proper</div>
            <div className="text-xs text-blue-600 mt-1">Sets are equal</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">{'{'}1, 4{'}'} ⊆ {'{'}1, 2, 3{'}'}</div>
            <div className="text-sm text-blue-700">False</div>
            <div className="text-xs text-blue-600 mt-1">4 is not in second set</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">∅ ⊆ {'{'}1, 2{'}'}</div>
            <div className="text-sm text-blue-700">True - always</div>
            <div className="text-xs text-blue-600 mt-1">Empty set is subset of all sets</div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💼</span>
          Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Mathematics</div>
            <div className="text-sm text-purple-700">• Set theory</div>
            <div className="text-sm text-purple-700">• Proof techniques</div>
            <div className="text-sm text-purple-700">• Relations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Computer Science</div>
            <div className="text-sm text-purple-700">• Database queries</div>
            <div className="text-sm text-purple-700">• Set operations</div>
            <div className="text-sm text-purple-700">• Data structures</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Logic</div>
            <div className="text-sm text-purple-700">• Boolean algebra</div>
            <div className="text-sm text-purple-700">• Venn diagrams</div>
            <div className="text-sm text-purple-700">• Set membership</div>
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="mt-8 bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
          <span className="text-orange-600 mr-2">🔢</span>
          Subset Properties
        </h3>
        <div className="space-y-2 bg-white p-4 rounded-lg">
          <div className="text-sm text-orange-800">• Reflexive: A ⊆ A for any set A</div>
          <div className="text-sm text-orange-800">• Transitive: If A ⊆ B and B ⊆ C, then A ⊆ C</div>
          <div className="text-sm text-orange-800">• Anti-symmetric: If A ⊆ B and B ⊆ A, then A = B</div>
          <div className="text-sm text-orange-800">• Empty set: ∅ ⊆ A for any set A</div>
          <div className="text-sm text-orange-800">• Every set is a subset of itself</div>
        </div>
      </div>
    </div>
  );
}
