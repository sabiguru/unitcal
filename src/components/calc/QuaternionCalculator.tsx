'use client';

import { useState } from 'react';

type Quaternion = {
  w: number;
  x: number;
  y: number;
  z: number;
};

export default function QuaternionCalculator() {
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'conjugate' | 'norm' | 'inverse'>('add');
  const [q1w, setQ1w] = useState<string>('');
  const [q1x, setQ1x] = useState<string>('');
  const [q1y, setQ1y] = useState<string>('');
  const [q1z, setQ1z] = useState<string>('');
  const [q2w, setQ2w] = useState<string>('');
  const [q2x, setQ2x] = useState<string>('');
  const [q2y, setQ2y] = useState<string>('');
  const [q2z, setQ2z] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const formatQuaternion = (q: Quaternion): string => {
    return `${q.w.toFixed(4)} + ${q.x.toFixed(4)}i + ${q.y.toFixed(4)}j + ${q.z.toFixed(4)}k`;
  };

  const addQuaternions = (q1: Quaternion, q2: Quaternion): Quaternion => {
    return {
      w: q1.w + q2.w,
      x: q1.x + q2.x,
      y: q1.y + q2.y,
      z: q1.z + q2.z
    };
  };

  const subtractQuaternions = (q1: Quaternion, q2: Quaternion): Quaternion => {
    return {
      w: q1.w - q2.w,
      x: q1.x - q2.x,
      y: q1.y - q2.y,
      z: q1.z - q2.z
    };
  };

  const multiplyQuaternions = (q1: Quaternion, q2: Quaternion): Quaternion => {
    return {
      w: q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z,
      x: q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
      y: q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,
      z: q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w
    };
  };

  const conjugate = (q: Quaternion): Quaternion => {
    return {
      w: q.w,
      x: -q.x,
      y: -q.y,
      z: -q.z
    };
  };

  const norm = (q: Quaternion): number => {
    return Math.sqrt(q.w * q.w + q.x * q.x + q.y * q.y + q.z * q.z);
  };

  const inverse = (q: Quaternion): Quaternion | null => {
    const n = norm(q);
    if (n === 0) return null;
    const conj = conjugate(q);
    const nSquared = n * n;
    return {
      w: conj.w / nSquared,
      x: conj.x / nSquared,
      y: conj.y / nSquared,
      z: conj.z / nSquared
    };
  };

  const calculate = () => {
    const q1: Quaternion = {
      w: parseFloat(q1w) || 0,
      x: parseFloat(q1x) || 0,
      y: parseFloat(q1y) || 0,
      z: parseFloat(q1z) || 0
    };

    const q2: Quaternion = {
      w: parseFloat(q2w) || 0,
      x: parseFloat(q2x) || 0,
      y: parseFloat(q2y) || 0,
      z: parseFloat(q2z) || 0
    };

    let output = `q₁ = ${formatQuaternion(q1)}\n`;

    if (operation !== 'conjugate' && operation !== 'norm' && operation !== 'inverse') {
      output += `q₂ = ${formatQuaternion(q2)}\n\n`;
    } else {
      output += '\n';
    }

    switch (operation) {
      case 'add':
        const sum = addQuaternions(q1, q2);
        output += `q₁ + q₂ = ${formatQuaternion(sum)}`;
        break;
      case 'subtract':
        const diff = subtractQuaternions(q1, q2);
        output += `q₁ - q₂ = ${formatQuaternion(diff)}`;
        break;
      case 'multiply':
        const prod = multiplyQuaternions(q1, q2);
        output += `q₁ × q₂ = ${formatQuaternion(prod)}`;
        break;
      case 'conjugate':
        const conj = conjugate(q1);
        output += `q₁* = ${formatQuaternion(conj)}`;
        break;
      case 'norm':
        const n = norm(q1);
        output += `‖q₁‖ = ${n.toFixed(4)}`;
        break;
      case 'inverse':
        const inv = inverse(q1);
        if (inv) {
          output += `q₁⁻¹ = ${formatQuaternion(inv)}`;
        } else {
          output += 'Inverse does not exist (quaternion is zero)';
        }
        break;
    }

    setResult(output);
  };

  const clear = () => {
    setQ1w('');
    setQ1x('');
    setQ1y('');
    setQ1z('');
    setQ2w('');
    setQ2x('');
    setQ2y('');
    setQ2z('');
    setResult('');
  };

  const needsQ2 = operation === 'add' || operation === 'subtract' || operation === 'multiply';

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">ℍ</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quaternion Calculator</h1>
          <p className="text-gray-600">Perform operations on 4D quaternion numbers</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 whitespace-pre-line min-h-[60px]">
            {result || ' '}
          </div>
        </div>
      </div>

      {/* Operation Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Operation</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setOperation('add')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'add'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Add
          </button>
          <button
            onClick={() => setOperation('subtract')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'subtract'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Subtract
          </button>
          <button
            onClick={() => setOperation('multiply')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'multiply'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Multiply
          </button>
          <button
            onClick={() => setOperation('conjugate')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'conjugate'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Conjugate
          </button>
          <button
            onClick={() => setOperation('norm')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'norm'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Norm
          </button>
          <button
            onClick={() => setOperation('inverse')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              operation === 'inverse'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Inverse
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quaternion q₁ = w + xi + yj + zk</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <input
              type="number"
              value={q1w}
              onChange={(e) => setQ1w(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              placeholder="w"
              step="any"
            />
            <input
              type="number"
              value={q1x}
              onChange={(e) => setQ1x(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              placeholder="x (i)"
              step="any"
            />
            <input
              type="number"
              value={q1y}
              onChange={(e) => setQ1y(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              placeholder="y (j)"
              step="any"
            />
            <input
              type="number"
              value={q1z}
              onChange={(e) => setQ1z(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              placeholder="z (k)"
              step="any"
            />
          </div>
        </div>

        {needsQ2 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quaternion q₂ = w + xi + yj + zk</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <input
                type="number"
                value={q2w}
                onChange={(e) => setQ2w(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="w"
                step="any"
              />
              <input
                type="number"
                value={q2x}
                onChange={(e) => setQ2x(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="x (i)"
                step="any"
              />
              <input
                type="number"
                value={q2y}
                onChange={(e) => setQ2y(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="y (j)"
                step="any"
              />
              <input
                type="number"
                value={q2z}
                onChange={(e) => setQ2z(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="z (k)"
                step="any"
              />
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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

      {/* Quaternion Basics */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">📐</span>
          Quaternion Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Form</div>
            <div className="text-sm text-purple-700 font-mono">q = w + xi + yj + zk</div>
            <div className="text-xs text-purple-600 mt-1">Four components (4D number)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Basis Units</div>
            <div className="text-sm text-purple-700">i² = j² = k² = ijk = -1</div>
            <div className="text-xs text-purple-600 mt-1">Fundamental relations</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Conjugate</div>
            <div className="text-sm text-purple-700 font-mono">q* = w - xi - yj - zk</div>
            <div className="text-xs text-purple-600 mt-1">Negates vector part</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Norm</div>
            <div className="text-sm text-purple-700 font-mono">‖q‖ = √(w² + x² + y² + z²)</div>
            <div className="text-xs text-purple-600 mt-1">Magnitude in 4D space</div>
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
            <div className="font-semibold text-green-900 mb-2">Computer Graphics</div>
            <div className="text-sm text-green-700">• 3D rotations</div>
            <div className="text-sm text-green-700">• Animation</div>
            <div className="text-sm text-green-700">• Camera control</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Robotics</div>
            <div className="text-sm text-green-700">• Orientation tracking</div>
            <div className="text-sm text-green-700">• Motion planning</div>
            <div className="text-sm text-green-700">• Gimbal lock avoidance</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Physics</div>
            <div className="text-sm text-green-700">• Quantum mechanics</div>
            <div className="text-sm text-green-700">• Relativity theory</div>
            <div className="text-sm text-green-700">• Angular momentum</div>
          </div>
        </div>
      </div>
    </div>
  );
}
