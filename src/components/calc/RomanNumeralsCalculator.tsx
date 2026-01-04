'use client';

import { useState } from 'react';

export default function RomanNumeralsCalculator() {
  const [decimal, setDecimal] = useState('');
  const [roman, setRoman] = useState('');
  const [mode, setMode] = useState<'decimal-to-roman' | 'roman-to-decimal'>('decimal-to-roman');

  const decimalToRoman = (num: number): string => {
    if (num <= 0 || num > 3999) return '';
    
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    
    let result = '';
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += symbols[i];
        num -= values[i];
      }
    }
    return result;
  };

  const romanToDecimal = (roman: string): number => {
    const romanMap: { [key: string]: number } = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
    };
    
    let result = 0;
    const cleanRoman = roman.toUpperCase().replace(/[^IVXLCDM]/g, '');
    
    for (let i = 0; i < cleanRoman.length; i++) {
      const current = romanMap[cleanRoman[i]];
      const next = romanMap[cleanRoman[i + 1]];
      
      if (next && current < next) {
        result += next - current;
        i++;
      } else {
        result += current;
      }
    }
    
    return result;
  };

  const convert = () => {
    if (mode === 'decimal-to-roman') {
      const num = parseInt(decimal);
      if (num >= 1 && num <= 3999) {
        setRoman(decimalToRoman(num));
      }
    } else {
      const num = romanToDecimal(roman);
      if (num > 0) {
        setDecimal(num.toString());
      }
    }
  };

  const clear = () => {
    setDecimal('');
    setRoman('');
  };

  const examples = [
    { decimal: 1, roman: 'I' },
    { decimal: 4, roman: 'IV' },
    { decimal: 9, roman: 'IX' },
    { decimal: 27, roman: 'XXVII' },
    { decimal: 48, roman: 'XLVIII' },
    { decimal: 2023, roman: 'MMXXIII' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🔢</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Roman Numerals Calculator — Roman to Decimal Converter</h1>
          <p className="text-gray-600">Convert between decimal numbers and Roman numerals</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-1">
            <button
              onClick={() => setMode('decimal-to-roman')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'decimal-to-roman'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Number → Roman
            </button>
            <button
              onClick={() => setMode('roman-to-decimal')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'roman-to-decimal'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Roman → Number
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'decimal-to-roman' ? 'Decimal Number (1-3999)' : 'Roman Numeral'}
            </label>
            <input
              type={mode === 'decimal-to-roman' ? 'number' : 'text'}
              value={mode === 'decimal-to-roman' ? decimal : roman}
              onChange={(e) => mode === 'decimal-to-roman' ? setDecimal(e.target.value) : setRoman(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder={mode === 'decimal-to-roman' ? 'Enter a number (1-3999)' : 'Enter Roman numerals (I, V, X, L, C, D, M)'}
              min={mode === 'decimal-to-roman' ? '1' : undefined}
              max={mode === 'decimal-to-roman' ? '3999' : undefined}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'decimal-to-roman' ? 'Roman Numeral' : 'Decimal Number'}
            </label>
            <input
              type="text"
              value={mode === 'decimal-to-roman' ? roman : decimal}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg font-mono"
              placeholder={mode === 'decimal-to-roman' ? 'Roman numeral will appear here' : 'Decimal number will appear here'}
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={convert}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Convert
            </button>
            <button
              onClick={clear}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Examples</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {examples.map((example, index) => (
              <div
                key={index}
                onClick={() => {
                  setDecimal(example.decimal.toString());
                  setRoman(example.roman);
                  setMode('decimal-to-roman');
                }}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer text-center"
              >
                <div className="font-bold text-blue-900">{example.decimal}</div>
                <div className="font-mono text-blue-600">{example.roman}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}