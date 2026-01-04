'use client';

import { useState } from 'react';

export default function BinaryConverterCalculator() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [hexadecimal, setHexadecimal] = useState('');
  const [octal, setOctal] = useState('');

  const convertFromDecimal = (value: string) => {
    const num = parseInt(value);
    if (isNaN(num)) {
      setBinary('');
      setHexadecimal('');
      setOctal('');
      return;
    }
    
    setBinary(num.toString(2));
    setHexadecimal(num.toString(16).toUpperCase());
    setOctal(num.toString(8));
  };

  const convertFromBinary = (value: string) => {
    const num = parseInt(value, 2);
    if (isNaN(num)) {
      setDecimal('');
      setHexadecimal('');
      setOctal('');
      return;
    }
    
    setDecimal(num.toString());
    setHexadecimal(num.toString(16).toUpperCase());
    setOctal(num.toString(8));
  };

  const convertFromHex = (value: string) => {
    const num = parseInt(value, 16);
    if (isNaN(num)) {
      setDecimal('');
      setBinary('');
      setOctal('');
      return;
    }
    
    setDecimal(num.toString());
    setBinary(num.toString(2));
    setOctal(num.toString(8));
  };

  const convertFromOctal = (value: string) => {
    const num = parseInt(value, 8);
    if (isNaN(num)) {
      setDecimal('');
      setBinary('');
      setHexadecimal('');
      return;
    }
    
    setDecimal(num.toString());
    setBinary(num.toString(2));
    setHexadecimal(num.toString(16).toUpperCase());
  };

  const clearAll = () => {
    setDecimal('');
    setBinary('');
    setHexadecimal('');
    setOctal('');
  };

  const getBinaryRepresentation = (value: string) => {
    if (!value) return '';
    const binary = value;
    const groups = [];
    for (let i = binary.length; i > 0; i -= 4) {
      groups.unshift(binary.slice(Math.max(0, i - 4), i));
    }
    return groups.join(' ');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">💻</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Binary & Hex Converter</h1>
          <p className="text-gray-600">Convert between binary, decimal, hexadecimal, and octal number systems</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Number System Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Number Systems</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div><strong>Binary (Base 2):</strong> Uses digits 0, 1</div>
            <div><strong>Decimal (Base 10):</strong> Uses digits 0-9</div>
          </div>
          <div className="space-y-2">
            <div><strong>Hexadecimal (Base 16):</strong> Uses 0-9, A-F</div>
            <div><strong>Octal (Base 8):</strong> Uses digits 0-7</div>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Decimal (Base 10)</label>
          <input
            type="number"
            value={decimal}
            onChange={(e) => {
              setDecimal(e.target.value);
              convertFromDecimal(e.target.value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            placeholder="Enter decimal number (e.g., 255)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Binary (Base 2)</label>
          <input
            type="text"
            value={binary}
            onChange={(e) => {
              const value = e.target.value.replace(/[^01]/g, '');
              setBinary(value);
              convertFromBinary(value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            placeholder="Enter binary number (e.g., 11111111)"
          />
          {binary && (
            <div className="mt-2 text-sm text-gray-600">
              Grouped: {getBinaryRepresentation(binary)}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hexadecimal (Base 16)</label>
          <input
            type="text"
            value={hexadecimal}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
              setHexadecimal(value);
              convertFromHex(value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            placeholder="Enter hexadecimal number (e.g., FF)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Octal (Base 8)</label>
          <input
            type="text"
            value={octal}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-7]/g, '');
              setOctal(value);
              convertFromOctal(value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            placeholder="Enter octal number (e.g., 377)"
          />
        </div>
      </div>

      <button
        onClick={clearAll}
        className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-6 rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Clear All
      </button>

      {decimal && (
        <div className="mt-8 space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600">Decimal</div>
                <div className="text-xl font-mono font-bold text-gray-900">{decimal}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600">Binary</div>
                <div className="text-xl font-mono font-bold text-blue-600">{binary}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600">Hexadecimal</div>
                <div className="text-xl font-mono font-bold text-purple-600">{hexadecimal}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600">Octal</div>
                <div className="text-xl font-mono font-bold text-green-600">{octal}</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Binary Breakdown</h3>
            {binary && (
              <div className="space-y-3">
                <div className="text-sm text-blue-700">
                  <strong>Bit Length:</strong> {binary.length} bits
                </div>
                <div className="text-sm text-blue-700">
                  <strong>Grouped (4-bit):</strong> {getBinaryRepresentation(binary)}
                </div>
                <div className="text-sm text-blue-700">
                  <strong>Byte Size:</strong> {Math.ceil(binary.length / 8)} byte(s)
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}