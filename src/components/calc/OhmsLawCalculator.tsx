'use client';

import { useState } from 'react';

export default function OhmsLawCalculator() {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');
  const [results, setResults] = useState<{
    voltage: number;
    current: number;
    resistance: number;
    power: number;
  } | null>(null);

  const calculateOhmsLaw = () => {
    const V = parseFloat(voltage) || 0;
    const I = parseFloat(current) || 0;
    const R = parseFloat(resistance) || 0;
    const P = parseFloat(power) || 0;

    let calculatedV = V;
    let calculatedI = I;
    let calculatedR = R;
    let calculatedP = P;

    // Calculate missing values based on available inputs
    if (V && I && !R && !P) {
      calculatedR = V / I;
      calculatedP = V * I;
    } else if (V && R && !I && !P) {
      calculatedI = V / R;
      calculatedP = (V * V) / R;
    } else if (I && R && !V && !P) {
      calculatedV = I * R;
      calculatedP = I * I * R;
    } else if (V && P && !I && !R) {
      calculatedI = P / V;
      calculatedR = V / calculatedI;
    } else if (I && P && !V && !R) {
      calculatedV = P / I;
      calculatedR = calculatedV / I;
    } else if (R && P && !V && !I) {
      calculatedV = Math.sqrt(P * R);
      calculatedI = calculatedV / R;
    } else if (V && I && R && !P) {
      calculatedP = V * I;
    } else if (V && I && P && !R) {
      calculatedR = V / I;
    } else if (V && R && P && !I) {
      calculatedI = V / R;
    } else if (I && R && P && !V) {
      calculatedV = I * R;
    }

    setResults({
      voltage: Math.round(calculatedV * 1000) / 1000,
      current: Math.round(calculatedI * 1000) / 1000,
      resistance: Math.round(calculatedR * 1000) / 1000,
      power: Math.round(calculatedP * 1000) / 1000
    });
  };

  const clear = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    setResults(null);
  };

  const getFormula = () => {
    if (!results) return null;
    
    return [
      `V = I × R = ${results.current} × ${results.resistance} = ${results.voltage} V`,
      `I = V ÷ R = ${results.voltage} ÷ ${results.resistance} = ${results.current} A`,
      `R = V ÷ I = ${results.voltage} ÷ ${results.current} = ${results.resistance} Ω`,
      `P = V × I = ${results.voltage} × ${results.current} = ${results.power} W`
    ];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⚡</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ohm's Law Calculator — V=IR Voltage, Current & Resistance</h1>
          <p className="text-gray-600">Calculate voltage, current, resistance, and power using Ohm's Law</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voltage (V) - Volts
          </label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter voltage in volts"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current (I) - Amperes
          </label>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter current in amperes"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resistance (R) - Ohms
          </label>
          <input
            type="number"
            value={resistance}
            onChange={(e) => setResistance(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter resistance in ohms"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Power (P) - Watts
          </label>
          <input
            type="number"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter power in watts"
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">📋 How to use:</h3>
        <p className="text-blue-800 text-sm">
          Enter any two values to calculate the remaining two. You can calculate voltage, current, resistance, and power using Ohm's Law formulas.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={calculateOhmsLaw}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{results.voltage}</div>
                <div className="text-sm text-gray-600">Voltage (V)</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">{results.current}</div>
                <div className="text-sm text-gray-600">Current (A)</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{results.resistance}</div>
                <div className="text-sm text-gray-600">Resistance (Ω)</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{results.power}</div>
                <div className="text-sm text-gray-600">Power (W)</div>
              </div>
            </div>
          </div>

          {/* Formulas Used */}
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-3">📐 Formulas Used:</h4>
            <div className="space-y-2 text-sm text-yellow-800 font-mono">
              {getFormula()?.map((formula, index) => (
                <div key={index}>{formula}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}