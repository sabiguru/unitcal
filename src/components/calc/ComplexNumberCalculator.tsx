'use client';

import { useState } from 'react';

export default function ComplexNumberCalculator() {
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [real1, setReal1] = useState<string>('');
  const [imag1, setImag1] = useState<string>('');
  const [real2, setReal2] = useState<string>('');
  const [imag2, setImag2] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const calculate = () => {
    const a1 = parseFloat(real1);
    const b1 = parseFloat(imag1);
    const a2 = parseFloat(real2);
    const b2 = parseFloat(imag2);

    if (isNaN(a1) || isNaN(b1) || isNaN(a2) || isNaN(b2)) {
      setResult('Invalid input');
      setSteps('Please enter valid numbers');
      return;
    }

    const z1Str = `${a1} ${b1 >= 0 ? '+' : ''}${b1}i`;
    const z2Str = `${a2} ${b2 >= 0 ? '+' : ''}${b2}i`;

    let resultReal: number = 0;
    let resultImag: number = 0;
    let stepText: string = '';

    switch (operation) {
      case 'add':
        resultReal = a1 + a2;
        resultImag = b1 + b2;
        stepText = `(${z1Str}) + (${z2Str})\n= (${a1} + ${a2}) + (${b1} + ${b2})i\n= ${resultReal} ${resultImag >= 0 ? '+' : ''}${resultImag}i`;
        break;

      case 'subtract':
        resultReal = a1 - a2;
        resultImag = b1 - b2;
        stepText = `(${z1Str}) - (${z2Str})\n= (${a1} - ${a2}) + (${b1} - ${b2})i\n= ${resultReal} ${resultImag >= 0 ? '+' : ''}${resultImag}i`;
        break;

      case 'multiply':
        // (a1 + b1i)(a2 + b2i) = (a1a2 - b1b2) + (a1b2 + b1a2)i
        resultReal = a1 * a2 - b1 * b2;
        resultImag = a1 * b2 + b1 * a2;
        stepText = `(${z1Str}) × (${z2Str})\n` +
          `= (${a1}×${a2} - ${b1}×${b2}) + (${a1}×${b2} + ${b1}×${a2})i\n` +
          `= ${resultReal.toFixed(4)} ${resultImag >= 0 ? '+' : ''}${resultImag.toFixed(4)}i`;
        break;

      case 'divide':
        // (a1 + b1i) / (a2 + b2i) = [(a1 + b1i)(a2 - b2i)] / (a2² + b2²)
        const denominator = a2 * a2 + b2 * b2;
        if (denominator === 0) {
          setResult('Division by zero');
          setSteps('Cannot divide by 0 + 0i');
          return;
        }
        resultReal = (a1 * a2 + b1 * b2) / denominator;
        resultImag = (b1 * a2 - a1 * b2) / denominator;
        stepText = `(${z1Str}) ÷ (${z2Str})\n` +
          `= (${z1Str}) × (${a2} - ${b2}i) / (${a2}² + ${b2}²)\n` +
          `= ${resultReal.toFixed(4)} ${resultImag >= 0 ? '+' : ''}${resultImag.toFixed(4)}i`;
        break;
    }

    setResult(`${resultReal.toFixed(4)} ${resultImag >= 0 ? '+' : ''}${resultImag.toFixed(4)}i`);
    setSteps(stepText);
  };

  const clear = () => {
    setReal1('');
    setImag1('');
    setReal2('');
    setImag2('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-fuchsia-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">i</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complex Number Calculator</h1>
          <p className="text-gray-600">Add, subtract, multiply, and divide complex numbers</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6 whitespace-pre-line">
            {steps || ' '}
          </div>
          <div className="text-3xl font-mono text-right">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Operation Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Operation</h3>
        <div className="grid grid-cols-4 gap-2">
          {(['add', 'subtract', 'multiply', 'divide'] as const).map((op) => (
            <button
              key={op}
              onClick={() => setOperation(op)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                operation === op
                  ? 'bg-fuchsia-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {op.charAt(0).toUpperCase() + op.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Complex Number (a + bi)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={real1}
              onChange={(e) => setReal1(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              placeholder="Real part (a)"
              step="0.1"
            />
            <input
              type="number"
              value={imag1}
              onChange={(e) => setImag1(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              placeholder="Imaginary part (b)"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Second Complex Number (c + di)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={real2}
              onChange={(e) => setReal2(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              placeholder="Real part (c)"
              step="0.1"
            />
            <input
              type="number"
              value={imag2}
              onChange={(e) => setImag2(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              placeholder="Imaginary part (d)"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-fuchsia-500 hover:bg-fuchsia-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-fuchsia-50 to-pink-100 rounded-xl p-6 border border-fuchsia-200">
        <h3 className="text-lg font-semibold text-fuchsia-900 mb-4 flex items-center">
          <span className="text-fuchsia-600 mr-2">📐</span>
          Complex Number Operations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-fuchsia-900 mb-2">Addition</div>
            <div className="text-sm text-fuchsia-700 font-mono">(a + bi) + (c + di) = (a+c) + (b+d)i</div>
            <div className="text-xs text-fuchsia-600 mt-1">Add real and imaginary parts</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-fuchsia-900 mb-2">Subtraction</div>
            <div className="text-sm text-fuchsia-700 font-mono">(a + bi) - (c + di) = (a-c) + (b-d)i</div>
            <div className="text-xs text-fuchsia-600 mt-1">Subtract real and imaginary parts</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-fuchsia-900 mb-2">Multiplication</div>
            <div className="text-sm text-fuchsia-700 font-mono">(a+bi)(c+di) = (ac-bd) + (ad+bc)i</div>
            <div className="text-xs text-fuchsia-600 mt-1">Use FOIL and i² = -1</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-fuchsia-900 mb-2">Division</div>
            <div className="text-sm text-fuchsia-700 font-mono">(a+bi)/(c+di) = multiply by (c-di)/(c-di)</div>
            <div className="text-xs text-fuchsia-600 mt-1">Multiply by conjugate</div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">💼</span>
          Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Electrical Engineering</div>
            <div className="text-sm text-blue-700">• AC circuit analysis</div>
            <div className="text-sm text-blue-700">• Impedance calculations</div>
            <div className="text-sm text-blue-700">• Signal processing</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Physics</div>
            <div className="text-sm text-blue-700">• Quantum mechanics</div>
            <div className="text-sm text-blue-700">• Wave phenomena</div>
            <div className="text-sm text-blue-700">• Electromagnetic theory</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Mathematics</div>
            <div className="text-sm text-blue-700">• Polynomial roots</div>
            <div className="text-sm text-blue-700">• Fourier transforms</div>
            <div className="text-sm text-blue-700">• Complex analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
}
