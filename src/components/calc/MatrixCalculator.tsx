'use client';

import { useState } from 'react';

export default function MatrixCalculator() {
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'determinant' | 'transpose'>('add');
  const [matrixA, setMatrixA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[5, 6], [7, 8]]);
  const [result, setResult] = useState<number[][] | number | null>(null);
  const [expression, setExpression] = useState<string>('');

  const updateMatrixA = (row: number, col: number, value: string) => {
    const newMatrix = [...matrixA];
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrixA(newMatrix);
  };

  const updateMatrixB = (row: number, col: number, value: string) => {
    const newMatrix = [...matrixB];
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrixB(newMatrix);
  };

  const addMatrices = (a: number[][], b: number[][]): number[][] => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      throw new Error('Matrices must have same dimensions');
    }
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  const subtractMatrices = (a: number[][], b: number[][]): number[][] => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      throw new Error('Matrices must have same dimensions');
    }
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  };

  const multiplyMatrices = (a: number[][], b: number[][]): number[][] => {
    if (a[0].length !== b.length) {
      throw new Error('Matrix A columns must equal Matrix B rows');
    }
    const result: number[][] = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < a[0].length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  };

  const determinant = (matrix: number[][]): number => {
    const n = matrix.length;
    if (n !== matrix[0].length) {
      throw new Error('Matrix must be square');
    }
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    
    let det = 0;
    for (let i = 0; i < n; i++) {
      const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
      det += Math.pow(-1, i) * matrix[0][i] * determinant(subMatrix);
    }
    return det;
  };

  const transpose = (matrix: number[][]): number[][] => {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
  };

  const calculate = () => {
    try {
      let result: number[][] | number;
      let expr = '';

      switch (operation) {
        case 'add':
          result = addMatrices(matrixA, matrixB);
          expr = 'A + B = ';
          break;
        case 'subtract':
          result = subtractMatrices(matrixA, matrixB);
          expr = 'A - B = ';
          break;
        case 'multiply':
          result = multiplyMatrices(matrixA, matrixB);
          expr = 'A × B = ';
          break;
        case 'determinant':
          result = determinant(matrixA);
          expr = 'det(A) = ';
          break;
        case 'transpose':
          result = transpose(matrixA);
          expr = 'A^T = ';
          break;
        default:
          result = matrixA;
          expr = '';
      }

      setResult(result);
      setExpression(expr);
    } catch (error) {
      setExpression(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setResult(null);
    }
  };

  const clear = () => {
    setMatrixA([[1, 2], [3, 4]]);
    setMatrixB([[5, 6], [7, 8]]);
    setResult(null);
    setExpression('');
  };

  const formatMatrix = (matrix: number[][]): string => {
    return '[' + matrix.map(row => '[' + row.join(', ') + ']').join(', ') + ']';
  };

  const addRow = (isMatrixA: boolean) => {
    if (isMatrixA) {
      const newRow = new Array(matrixA[0].length).fill(0);
      setMatrixA([...matrixA, newRow]);
    } else {
      const newRow = new Array(matrixB[0].length).fill(0);
      setMatrixB([...matrixB, newRow]);
    }
  };

  const addColumn = (isMatrixA: boolean) => {
    if (isMatrixA) {
      setMatrixA(matrixA.map(row => [...row, 0]));
    } else {
      setMatrixB(matrixB.map(row => [...row, 0]));
    }
  };

  const removeRow = (isMatrixA: boolean) => {
    if (isMatrixA && matrixA.length > 1) {
      setMatrixA(matrixA.slice(0, -1));
    } else if (!isMatrixA && matrixB.length > 1) {
      setMatrixB(matrixB.slice(0, -1));
    }
  };

  const removeColumn = (isMatrixA: boolean) => {
    if (isMatrixA && matrixA[0].length > 1) {
      setMatrixA(matrixA.map(row => row.slice(0, -1)));
    } else if (!isMatrixA && matrixB[0].length > 1) {
      setMatrixB(matrixB.map(row => row.slice(0, -1)));
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🗗️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Matrix Calculator — Linear Algebra & Matrix Operations</h1>
          <p className="text-gray-600">Perform matrix operations including multiplication and determinants</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {expression || ' '}
          </div>
          <div className="text-lg font-mono">
            {typeof result === 'number' ? result.toFixed(4) : 
             result ? formatMatrix(result) : '0'}
          </div>
        </div>
      </div>

      {/* Operation Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Operation</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { key: 'add', label: 'Add (A + B)' },
            { key: 'subtract', label: 'Subtract (A - B)' },
            { key: 'multiply', label: 'Multiply (A × B)' },
            { key: 'determinant', label: 'Determinant' },
            { key: 'transpose', label: 'Transpose' }
          ].map(op => (
            <button
              key={op.key}
              onClick={() => setOperation(op.key as any)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                operation === op.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>

      {/* Matrix Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Matrix A */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-900">Matrix A</h3>
            <div className="flex space-x-2">
              <button onClick={() => addRow(true)} className="text-sm bg-blue-500 text-white px-2 py-1 rounded">+Row</button>
              <button onClick={() => addColumn(true)} className="text-sm bg-blue-500 text-white px-2 py-1 rounded">+Col</button>
              <button onClick={() => removeRow(true)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">-Row</button>
              <button onClick={() => removeColumn(true)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">-Col</button>
            </div>
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixA[0].length}, minmax(0, 1fr))` }}>
            {matrixA.flatMap((row, i) =>
              row.map((val, j) => (
                <input
                  key={`a-${i}-${j}`}
                  type="number"
                  value={val}
                  onChange={(e) => updateMatrixA(i, j, e.target.value)}
                  className="w-16 h-12 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))
            )}
          </div>
        </div>

        {/* Matrix B (only show for binary operations) */}
        {['add', 'subtract', 'multiply'].includes(operation) && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-900">Matrix B</h3>
              <div className="flex space-x-2">
                <button onClick={() => addRow(false)} className="text-sm bg-blue-500 text-white px-2 py-1 rounded">+Row</button>
                <button onClick={() => addColumn(false)} className="text-sm bg-blue-500 text-white px-2 py-1 rounded">+Col</button>
                <button onClick={() => removeRow(false)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">-Row</button>
                <button onClick={() => removeColumn(false)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">-Col</button>
              </div>
            </div>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixB[0].length}, minmax(0, 1fr))` }}>
              {matrixB.flatMap((row, i) =>
                row.map((val, j) => (
                  <input
                    key={`b-${i}-${j}`}
                    type="number"
                    value={val}
                    onChange={(e) => updateMatrixB(i, j, e.target.value)}
                    className="w-16 h-12 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-8">
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
    </div>
  );
}