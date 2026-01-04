'use client';

import React, { useState } from 'react';

export default function EquationSolverCalculator() {
  const [equation, setEquation] = useState<string>('');
  const [solution, setSolution] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [equationType, setEquationType] = useState<'linear' | 'quadratic'>('linear');

  const solveLinearEquation = (eq: string): { solution: string; steps: string[] } => {
    // Simple linear equation solver for equations like "2x + 3 = 7"
    try {
      const cleanEq = eq.replace(/\s/g, '');
      const [left, right] = cleanEq.split('=');
      
      if (!left || !right) {
        throw new Error('Invalid equation format');
      }

      // Parse right side (constant)
      const rightValue = parseFloat(right);
      
      // Parse left side (ax + b format)
      let coefficient = 1;
      let constant = 0;
      
      // Extract coefficient and constant from left side
      const terms = left.split(/([+-])/);
      
      for (let i = 0; i < terms.length; i++) {
        const term = terms[i].trim();
        if (term === '+' || term === '-' || term === '') continue;
        
        if (term.includes('x')) {
          const coeff = term.replace('x', '');
          if (coeff === '' || coeff === '+') coefficient = 1;
          else if (coeff === '-') coefficient = -1;
          else coefficient = parseFloat(coeff);
          
          if (i > 0 && terms[i-1] === '-') coefficient = -coefficient;
        } else {
          let value = parseFloat(term);
          if (i > 0 && terms[i-1] === '-') value = -value;
          constant += value;
        }
      }
      
      // Solve: ax + b = c => x = (c - b) / a
      const x = (rightValue - constant) / coefficient;
      
      const steps = [
        `Original equation: ${eq}`,
        `Rearrange to isolate x: ${coefficient}x = ${rightValue} - ${constant}`,
        `Simplify: ${coefficient}x = ${rightValue - constant}`,
        `Divide both sides by ${coefficient}: x = ${rightValue - constant}/${coefficient}`,
        `Solution: x = ${x}`
      ];
      
      return { solution: `x = ${x}`, steps };
    } catch (error) {
      return { solution: 'Error: Invalid equation format', steps: ['Please enter a valid linear equation like "2x + 3 = 7"'] };
    }
  };

  const solveQuadraticEquation = (eq: string): { solution: string; steps: string[] } => {
    // Simple quadratic equation solver for equations like "x^2 + 2x - 3 = 0"
    try {
      const cleanEq = eq.replace(/\s/g, '').replace(/\^2/g, '²');
      const [left, right] = cleanEq.split('=');
      
      if (!left || right !== '0') {
        throw new Error('Please enter in the form ax² + bx + c = 0');
      }

      // Extract coefficients a, b, c from ax² + bx + c
      let a = 0, b = 0, c = 0;
      
      // This is a simplified parser - in a real app you'd want a more robust one
      const xSquaredMatch = left.match(/([+-]?\d*\.?\d*)x²/);
      const xMatch = left.match(/([+-]?\d*\.?\d*)x(?!²)/);
      const constantMatch = left.match(/([+-]?\d+\.?\d*)(?!.*x)/);
      
      if (xSquaredMatch) {
        const coeff = xSquaredMatch[1];
        a = coeff === '' || coeff === '+' ? 1 : coeff === '-' ? -1 : parseFloat(coeff);
      }
      
      if (xMatch) {
        const coeff = xMatch[1];
        b = coeff === '' || coeff === '+' ? 1 : coeff === '-' ? -1 : parseFloat(coeff);
      }
      
      if (constantMatch) {
        c = parseFloat(constantMatch[1]);
      }

      if (a === 0) {
        throw new Error('Not a quadratic equation (coefficient of x² is 0)');
      }

      // Use quadratic formula: x = (-b ± √(b² - 4ac)) / 2a
      const discriminant = b * b - 4 * a * c;
      
      let solution: string;
      const steps = [
        `Original equation: ${eq}`,
        `Coefficients: a = ${a}, b = ${b}, c = ${c}`,
        `Using quadratic formula: x = (-b ± √(b² - 4ac)) / 2a`,
        `Discriminant: Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`
      ];

      if (discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        solution = `x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`;
        steps.push(`Two real solutions:`);
        steps.push(`x₁ = (-${b} + √${discriminant}) / ${2 * a} = ${x1.toFixed(4)}`);
        steps.push(`x₂ = (-${b} - √${discriminant}) / ${2 * a} = ${x2.toFixed(4)}`);
      } else if (discriminant === 0) {
        const x = -b / (2 * a);
        solution = `x = ${x}`;
        steps.push(`One real solution: x = -${b} / ${2 * a} = ${x}`);
      } else {
        solution = 'No real solutions (complex solutions exist)';
        steps.push('Discriminant < 0: No real solutions');
      }
      
      return { solution, steps };
    } catch (error) {
      return { solution: 'Error: Invalid equation format', steps: ['Please enter a valid quadratic equation like "x^2 + 2x - 3 = 0"'] };
    }
  };

  const solveEquation = () => {
    if (!equation.trim()) {
      setSolution('Please enter an equation');
      setSteps([]);
      return;
    }

    let result;
    if (equationType === 'linear') {
      result = solveLinearEquation(equation);
    } else {
      result = solveQuadraticEquation(equation);
    }
    
    setSolution(result.solution);
    setSteps(result.steps);
  };

  const clearAll = () => {
    setEquation('');
    setSolution(null);
    setSteps([]);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🧮</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Equation Solver Calculator — Linear & Quadratic Equation Solver</h1>
          <p className="text-gray-600">Solve linear and quadratic equations with step-by-step solutions</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="mb-6">
        <div className="space-y-6">
          {/* Equation Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Equation Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="linear"
                  checked={equationType === 'linear'}
                  onChange={(e) => setEquationType(e.target.value as 'linear')}
                  className="mr-2"
                />
                <span>Linear (ax + b = c)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="quadratic"
                  checked={equationType === 'quadratic'}
                  onChange={(e) => setEquationType(e.target.value as 'quadratic')}
                  className="mr-2"
                />
                <span>Quadratic (ax² + bx + c = 0)</span>
              </label>
            </div>
          </div>

          {/* Equation Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Equation
            </label>
            <input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder={equationType === 'linear' ? "e.g., 2x + 3 = 7" : "e.g., x^2 + 2x - 3 = 0"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              {equationType === 'linear' 
                ? "Format: ax + b = c (e.g., 2x + 3 = 7, 5x - 2 = 8)"
                : "Format: ax^2 + bx + c = 0 (e.g., x^2 + 2x - 3 = 0, 2x^2 - 4x + 1 = 0)"
              }
            </p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={solveEquation}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Solve Equation
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {solution && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Solution</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold text-blue-900">{solution}</p>
          </div>

          {steps.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Solution</h3>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}