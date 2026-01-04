'use client';

import { useState } from 'react';

export default function ElectricalCalculator() {
  const [calculationType, setCalculationType] = useState('power');
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');
  const [energy, setEnergy] = useState('');
  const [time, setTime] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateElectrical = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const R = parseFloat(resistance);
    const P = parseFloat(power);
    const E = parseFloat(energy);
    const T = parseFloat(time);

    let calculationResults: any = {};

    switch (calculationType) {
      case 'power':
        if (V && I) {
          calculationResults = {
            type: 'Power from V and I',
            formula: 'P = V × I',
            power: V * I,
            voltage: V,
            current: I,
            resistance: V / I,
            energy: time ? (V * I * T) : null
          };
        } else if (V && R) {
          calculationResults = {
            type: 'Power from V and R',
            formula: 'P = V² / R',
            power: (V * V) / R,
            voltage: V,
            resistance: R,
            current: V / R,
            energy: time ? ((V * V / R) * T) : null
          };
        } else if (I && R) {
          calculationResults = {
            type: 'Power from I and R',
            formula: 'P = I² × R',
            power: I * I * R,
            current: I,
            resistance: R,
            voltage: I * R,
            energy: time ? (I * I * R * T) : null
          };
        }
        break;

      case 'energy':
        if (P && T) {
          calculationResults = {
            type: 'Energy from Power and Time',
            formula: 'E = P × t',
            energy: P * T,
            power: P,
            time: T,
            cost: null
          };
        } else if (V && I && T) {
          const power = V * I;
          calculationResults = {
            type: 'Energy from V, I, and Time',
            formula: 'E = V × I × t',
            energy: power * T,
            power: power,
            voltage: V,
            current: I,
            time: T
          };
        }
        break;

      case 'cost':
        if (P && T) {
          const energyKWh = (P * T) / 1000; // Convert to kWh
          const costPerKWh = 0.12; // Default rate
          calculationResults = {
            type: 'Electricity Cost',
            formula: 'Cost = (P × t / 1000) × Rate',
            energy: P * T,
            energyKWh: energyKWh,
            power: P,
            time: T,
            costPerKWh: costPerKWh,
            totalCost: energyKWh * costPerKWh
          };
        }
        break;

      case 'frequency':
        const frequency = parseFloat(voltage); // Reusing voltage field for frequency
        const inductance = parseFloat(current); // Reusing current field for inductance
        const capacitance = parseFloat(resistance); // Reusing resistance field for capacitance

        if (inductance && capacitance) {
          const resonantFreq = 1 / (2 * Math.PI * Math.sqrt(inductance * capacitance));
          calculationResults = {
            type: 'Resonant Frequency',
            formula: 'f = 1 / (2π√LC)',
            frequency: resonantFreq,
            inductance: inductance,
            capacitance: capacitance,
            angularFreq: 2 * Math.PI * resonantFreq
          };
        } else if (frequency && inductance) {
          const reactance = 2 * Math.PI * frequency * inductance;
          calculationResults = {
            type: 'Inductive Reactance',
            formula: 'XL = 2πfL',
            frequency: frequency,
            inductance: inductance,
            reactance: reactance,
            impedance: reactance
          };
        } else if (frequency && capacitance) {
          const reactance = 1 / (2 * Math.PI * frequency * capacitance);
          calculationResults = {
            type: 'Capacitive Reactance',
            formula: 'XC = 1 / (2πfC)',
            frequency: frequency,
            capacitance: capacitance,
            reactance: reactance,
            impedance: reactance
          };
        }
        break;
    }

    setResults(calculationResults);
  };

  const getUnitLabel = (type: string) => {
    switch (type) {
      case 'voltage': return 'V';
      case 'current': return 'A';
      case 'resistance': return 'Ω';
      case 'power': return 'W';
      case 'energy': return 'J';
      case 'time': return 's';
      case 'frequency': return 'Hz';
      case 'inductance': return 'H';
      case 'capacitance': return 'F';
      default: return '';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⚡</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Electrical Calculator</h1>
          <p className="text-gray-600">Calculate electrical parameters, power consumption, and circuit analysis</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setCalculationType('power')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'power'
                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Power & Ohm's Law
          </button>
          <button
            onClick={() => setCalculationType('energy')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'energy'
                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Energy
          </button>
          <button
            onClick={() => setCalculationType('cost')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'cost'
                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Electricity Cost
          </button>
          <button
            onClick={() => setCalculationType('frequency')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'frequency'
                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            AC Circuits
          </button>
        </div>
      </div>

      {calculationType === 'power' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voltage (V)</label>
            <input
              type="number"
              step="0.01"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="12"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current (A)</label>
            <input
              type="number"
              step="0.01"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="2.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resistance (Ω)</label>
            <input
              type="number"
              step="0.01"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="4.8"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time (hours) - Optional</label>
            <input
              type="number"
              step="0.01"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="2"
            />
          </div>
        </div>
      )}

      {calculationType === 'energy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Power (W)</label>
            <input
              type="number"
              step="0.01"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time (hours)</label>
            <input
              type="number"
              step="0.01"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="8"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voltage (V) - Optional</label>
            <input
              type="number"
              step="0.01"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="120"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current (A) - Optional</label>
            <input
              type="number"
              step="0.01"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="0.83"
            />
          </div>
        </div>
      )}

      {calculationType === 'cost' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Power (W)</label>
            <input
              type="number"
              step="0.01"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="1500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time (hours/day)</label>
            <input
              type="number"
              step="0.01"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="6"
            />
          </div>
        </div>
      )}

      {calculationType === 'frequency' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency (Hz)</label>
            <input
              type="number"
              step="0.01"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Inductance (H)</label>
            <input
              type="number"
              step="0.001"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Capacitance (F)</label>
            <input
              type="number"
              step="0.000001"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="0.000001"
            />
          </div>
        </div>
      )}

      <button
        onClick={calculateElectrical}
        className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 px-6 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">{results.type}</h3>
            <div className="text-center mb-4">
              <div className="text-sm text-yellow-700 mb-2">Formula: {results.formula}</div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {results.voltage && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-900">{results.voltage.toFixed(2)}</div>
                  <div className="text-sm text-yellow-700">Voltage (V)</div>
                </div>
              )}
              {results.current && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-900">{results.current.toFixed(2)}</div>
                  <div className="text-sm text-yellow-700">Current (A)</div>
                </div>
              )}
              {results.resistance && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-900">{results.resistance.toFixed(2)}</div>
                  <div className="text-sm text-yellow-700">Resistance (Ω)</div>
                </div>
              )}
              {results.power && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-900">{results.power.toFixed(2)}</div>
                  <div className="text-sm text-yellow-700">Power (W)</div>
                </div>
              )}
              {results.energy && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-900">{results.energy.toFixed(2)}</div>
                  <div className="text-sm text-yellow-700">Energy (Wh)</div>
                </div>
              )}
              {results.frequency && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-900">{results.frequency.toFixed(2)}</div>
                  <div className="text-sm text-yellow-700">Frequency (Hz)</div>
                </div>
              )}
              {results.reactance && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-900">{results.reactance.toFixed(2)}</div>
                  <div className="text-sm text-yellow-700">Reactance (Ω)</div>
                </div>
              )}
              {results.totalCost && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-900">${results.totalCost.toFixed(2)}</div>
                  <div className="text-sm text-yellow-700">Daily Cost</div>
                </div>
              )}
              {results.energyKWh && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-900">{results.energyKWh.toFixed(3)}</div>
                  <div className="text-sm text-yellow-700">Energy (kWh)</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}