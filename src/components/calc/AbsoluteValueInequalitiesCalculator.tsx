'use client';

import { useState } from 'react';

export default function AbsoluteValueInequalitiesCalculator() {
  const [expression, setExpression] = useState<string>('');
  const [constant, setConstant] = useState<string>('');
  const [inequalityType, setInequalityType] = useState<'<' | '<=' | '>' | '>='>('<');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const calculate = () => {
    const c = parseFloat(constant);
    if (isNaN(c)) return;

    const expr = expression.trim();

    // Handle simple |x| < c, |x| > c, etc.
    if (expr === 'x' || expr === '|x|') {
      if (inequalityType === '<' || inequalityType === '<=') {
        if (c <= 0) {
          setResult(c < 0 ? 'No solution' : 'x = 0');
          setSteps(c < 0 ? '|x| is always ≥ 0' : '|x| ≤ 0 only when x = 0');
        } else {
          const op = inequalityType === '<' ? '<' : '≤';
          setResult(`-${c} ${op} x ${op} ${c}`);
          setSteps(`|x| ${inequalityType} ${c}\nSolution: -${c} ${op} x ${op} ${c}`);
        }
      } else {
        const op = inequalityType === '>' ? '>' : '≥';
        if (c < 0) {
          setResult('All real numbers');
          setSteps('|x| is always ≥ 0');
        } else if (c === 0) {
          setResult(inequalityType === '>' ? 'x ≠ 0' : 'All real numbers');
          setSteps(inequalityType === '>' ? '|x| > 0 for all x except 0' : '|x| ≥ 0 for all real numbers');
        } else {
          setResult(`x ${op} ${c} or x ${op} -${c}`);
          setSteps(`|x| ${inequalityType} ${c}\nSolution: x ${op} ${c} or x ${op} -${c}`);
        }
      }
      return;
    }

    // Handle |ax + b| format
    const match = expr.match(/([+-]?\d*\.?\d*)x\s*([+-]\s*\d+\.?\d*)?/);
    if (match) {
      const a = match[1] ? (match[1] === '+' || match[1] === '' ? 1 : match[1] === '-' ? -1 : parseFloat(match[1])) : 1;
      const b = match[2] ? parseFloat(match[2].replace(/\s/g, '')) : 0;

      if (inequalityType === '<' || inequalityType === '<=') {
        if (c <= 0) {
          setResult(c < 0 ? 'No solution' : `x = ${(-b/a).toFixed(4)}`);
          setSteps(c < 0 ? 'Absolute value cannot be negative' : `Only when ${a}x + ${b} = 0`);
        } else {
          const x1 = (c - b) / a;
          const x2 = (-c - b) / a;
          const left = Math.min(x1, x2);
          const right = Math.max(x1, x2);
          const op = inequalityType === '<' ? '<' : '≤';
          setResult(`${left.toFixed(4)} ${op} x ${op} ${right.toFixed(4)}`);
          setSteps(`|${a}x ${b >= 0 ? '+' : ''} ${b}| ${inequalityType} ${c}\nSolution: ${left.toFixed(4)} ${op} x ${op} ${right.toFixed(4)}`);
        }
      } else {
        const x1 = (c - b) / a;
        const x2 = (-c - b) / a;
        const left = Math.min(x1, x2);
        const right = Math.max(x1, x2);
        const op = inequalityType === '>' ? '>' : '≥';
        setResult(`x ${op} ${right.toFixed(4)} or x ${op} ${left.toFixed(4)}`);
        setSteps(`|${a}x ${b >= 0 ? '+' : ''} ${b}| ${inequalityType} ${c}\nSolution: x ${op} ${right.toFixed(4)} or x ${op} ${left.toFixed(4)}`);
      }
    } else {
      setResult('Invalid expression');
      setSteps('Enter expression in format: ax + b');
    }
  };

  const clear = () => {
    setExpression('');
    setConstant('');
    setResult('');
    setSteps('');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">|x|≤</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Absolute Value Inequalities Calculator</h1>
          <p className="text-gray-600">Solve inequalities like |x| &gt; 3 or |x - 2| ≤ 5</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {steps || ' '}
          </div>
          <div className="text-2xl font-mono text-right">
            {result || '0'}
          </div>
        </div>
      </div>

      {/* Inequality Type Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Inequality Type</h3>
        <div className="grid grid-cols-4 gap-2">
          {(['<', '<=', '>', '>='] as const).map((type) => (
            <button
              key={type}
              onClick={() => setInequalityType(type)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                inequalityType === type
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type === '<=' ? '≤' : type === '>=' ? '≥' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expression inside absolute value
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., x, 2x - 3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Constant value
          </label>
          <input
            type="number"
            value={constant}
            onChange={(e) => setConstant(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter constant"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
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
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="text-indigo-600 mr-2">📐</span>
          Inequality Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Less Than</div>
            <div className="text-sm text-indigo-700 font-mono">|x| &lt; c means -c &lt; x &lt; c</div>
            <div className="text-xs text-indigo-600 mt-1">Conjunction (AND)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Greater Than</div>
            <div className="text-sm text-indigo-700 font-mono">|x| &gt; c means x &gt; c or x &lt; -c</div>
            <div className="text-xs text-indigo-600 mt-1">Disjunction (OR)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Less Than or Equal</div>
            <div className="text-sm text-indigo-700 font-mono">|x| ≤ c means -c ≤ x ≤ c</div>
            <div className="text-xs text-indigo-600 mt-1">Includes endpoints</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-indigo-900 mb-2">Greater Than or Equal</div>
            <div className="text-sm text-indigo-700 font-mono">|x| ≥ c means x ≥ c or x ≤ -c</div>
            <div className="text-xs text-indigo-600 mt-1">Includes endpoints</div>
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
            <div className="font-semibold text-green-900 mb-2">Engineering</div>
            <div className="text-sm text-green-700">• Tolerance ranges</div>
            <div className="text-sm text-green-700">• Quality control</div>
            <div className="text-sm text-green-700">• Measurement error</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Science</div>
            <div className="text-sm text-green-700">• Temperature ranges</div>
            <div className="text-sm text-green-700">• Experimental error</div>
            <div className="text-sm text-green-700">• Data validation</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-900 mb-2">Mathematics</div>
            <div className="text-sm text-green-700">• Domain restrictions</div>
            <div className="text-sm text-green-700">• Interval notation</div>
            <div className="text-sm text-green-700">• Graph analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
}
