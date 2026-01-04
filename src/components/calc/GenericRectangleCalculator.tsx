'use client';

import { useState } from 'react';

export default function GenericRectangleCalculator() {
  const [poly1Terms, setPoly1Terms] = useState<string[]>(['', '']);
  const [poly2Terms, setPoly2Terms] = useState<string[]>(['', '']);
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');
  const [grid, setGrid] = useState<string>('');

  const multiplyTerms = (term1: string, term2: string): string => {
    const t1 = term1.trim();
    const t2 = term2.trim();

    if (!t1 || !t2) return '';

    // Parse coefficients and variables
    const parseCoef = (term: string): number => {
      const match = term.match(/^([+-]?\d*\.?\d*)/);
      if (!match || match[1] === '' || match[1] === '+') return 1;
      if (match[1] === '-') return -1;
      return parseFloat(match[1]);
    };

    const getVars = (term: string): string => {
      return term.replace(/^[+-]?\d*\.?\d*/, '');
    };

    const coef1 = parseCoef(t1);
    const coef2 = parseCoef(t2);
    const vars1 = getVars(t1);
    const vars2 = getVars(t2);

    const resultCoef = coef1 * coef2;
    const resultVars = vars1 + vars2;

    if (resultCoef === 0) return '0';

    let result = '';
    if (resultCoef !== 1 || !resultVars) {
      result = resultCoef.toString();
    } else if (resultCoef === -1 && resultVars) {
      result = '-';
    }

    return result + resultVars;
  };

  const calculate = () => {
    const p1 = poly1Terms.filter(t => t.trim());
    const p2 = poly2Terms.filter(t => t.trim());

    if (p1.length === 0 || p2.length === 0) {
      setResult('Enter polynomial terms');
      setSteps('');
      setGrid('');
      return;
    }

    // Create grid
    let gridStr = 'Generic Rectangle (Area Model):\n\n';
    gridStr += '     |';
    p2.forEach(term => {
      gridStr += ` ${term.padEnd(8)} |`;
    });
    gridStr += '\n';
    gridStr += '─'.repeat(10 + p2.length * 11) + '\n';

    const products: string[] = [];

    p1.forEach(term1 => {
      gridStr += `${term1.padEnd(5)}|`;
      p2.forEach(term2 => {
        const product = multiplyTerms(term1, term2);
        products.push(product);
        gridStr += ` ${product.padEnd(8)} |`;
      });
      gridStr += '\n';
    });

    setGrid(gridStr);

    // Combine all products
    const resultStr = products.filter(p => p && p !== '0').join(' + ').replace(/\+ -/g, '- ');

    setResult(resultStr || '0');
    setSteps(
      `Multiply each term in first polynomial by each term in second:\n\n` +
      `First polynomial: ${p1.join(', ')}\n` +
      `Second polynomial: ${p2.join(', ')}\n\n` +
      `Products:\n` +
      products.map((p, i) => {
        const row = Math.floor(i / p2.length);
        const col = i % p2.length;
        return `${p1[row]} × ${p2[col]} = ${p}`;
      }).join('\n') +
      `\n\nCombined result: ${resultStr || '0'}`
    );
  };

  const clear = () => {
    setPoly1Terms(['', '']);
    setPoly2Terms(['', '']);
    setResult('');
    setSteps('');
    setGrid('');
  };

  const addTerm = (polyNum: 1 | 2) => {
    if (polyNum === 1) {
      setPoly1Terms([...poly1Terms, '']);
    } else {
      setPoly2Terms([...poly2Terms, '']);
    }
  };

  const updateTerm = (polyNum: 1 | 2, index: number, value: string) => {
    if (polyNum === 1) {
      const newTerms = [...poly1Terms];
      newTerms[index] = value;
      setPoly1Terms(newTerms);
    } else {
      const newTerms = [...poly2Terms];
      newTerms[index] = value;
      setPoly2Terms(newTerms);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">▭</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generic Rectangle Calculator</h1>
          <p className="text-gray-600">Area model for polynomial multiplication</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6 whitespace-pre font-mono">
            {grid || ' '}
          </div>
          <div className="text-2xl font-mono text-right">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Polynomial Terms (e.g., 2x, 3, -x)
          </label>
          {poly1Terms.map((term, index) => (
            <input
              key={index}
              type="text"
              value={term}
              onChange={(e) => updateTerm(1, index, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
              placeholder={`Term ${index + 1}`}
            />
          ))}
          <button
            onClick={() => addTerm(1)}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            + Add term
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Second Polynomial Terms (e.g., x, 5, -2x)
          </label>
          {poly2Terms.map((term, index) => (
            <input
              key={index}
              type="text"
              value={term}
              onChange={(e) => updateTerm(2, index, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
              placeholder={`Term ${index + 1}`}
            />
          ))}
          <button
            onClick={() => addTerm(2)}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            + Add term
          </button>
        </div>
      </div>

      {/* Steps Display */}
      {steps && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <pre className="text-sm text-blue-900 whitespace-pre-wrap font-mono">{steps}</pre>
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

      {/* Formulas */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">📐</span>
          Generic Rectangle Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Step 1: Create Grid</div>
            <div className="text-sm text-blue-700">Draw rectangle with terms on sides</div>
            <div className="text-xs text-blue-600 mt-1">Rows for first, columns for second</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Step 2: Multiply</div>
            <div className="text-sm text-blue-700">Fill each cell with product</div>
            <div className="text-xs text-blue-600 mt-1">Row term × column term</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Step 3: Collect</div>
            <div className="text-sm text-blue-700">Add all products from cells</div>
            <div className="text-xs text-blue-600 mt-1">Sum represents total area</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Step 4: Simplify</div>
            <div className="text-sm text-blue-700">Combine like terms</div>
            <div className="text-xs text-blue-600 mt-1">Final polynomial form</div>
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
            <div className="font-semibold text-green-900 mb-2">Education</div>
            <div className="text-sm text-green-700">• Visual learning</div>
            <div className="text-sm text-green-700">• Area models</div>
            <div className="text-sm text-green-700">• Understanding distributive property</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Algebra</div>
            <div className="text-sm text-green-700">• Polynomial multiplication</div>
            <div className="text-sm text-green-700">• Expanding expressions</div>
            <div className="text-sm text-green-700">• Alternative to FOIL</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Geometry</div>
            <div className="text-sm text-green-700">• Area calculations</div>
            <div className="text-sm text-green-700">• Rectangle dimensions</div>
            <div className="text-sm text-green-700">• Visual proofs</div>
          </div>
        </div>
      </div>

      {/* Visual Guide */}
      <div className="mt-8 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl p-6 border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
          <span className="text-amber-600 mr-2">💡</span>
          Why "Generic Rectangle"?
        </h3>
        <div className="bg-white p-6 rounded-lg">
          <div className="text-sm text-amber-900 space-y-2">
            <p>The Generic Rectangle (or Area Model) visualizes polynomial multiplication as finding the area of a rectangle.</p>
            <p>Just as the area of a rectangle is length × width, the product of two polynomials can be found by creating a grid where:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Terms of first polynomial label the rows (height)</li>
              <li>Terms of second polynomial label the columns (width)</li>
              <li>Each cell contains the product of its row and column terms</li>
              <li>The sum of all cells gives the total "area" (product)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
