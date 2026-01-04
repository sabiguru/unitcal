'use client';

import { useState } from 'react';
import KeypadGrid from '@/components/ui/KeypadGrid';
import Decimal from 'decimal.js';

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<Decimal | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const toDecimal = (value: string | Decimal) => new Decimal(value || '0');

  const formatDisplay = (value: Decimal | number | string) => {
    if (value instanceof Decimal) {
      const str = value.toString();
      return str.includes('.') ? str.replace(/\.?0+$/, '') || '0' : str;
    }
    return String(value);
  };

  const inputNumber = (num: string) => {
    if (!waitingForNewValue && num === '.' && display.includes('.')) {
      return;
    }

    if (waitingForNewValue) {
      const nextValue = num === '.' ? '0.' : num;
      setDisplay(nextValue);
      if (operation && previousValue !== null) {
        const operatorSymbol = operation === '*' ? '×' : operation === '/' ? '÷' : operation;
        setExpression(`${previousValue} ${operatorSymbol} ${nextValue}`);
      } else {
        setExpression(nextValue);
      }
      setWaitingForNewValue(false);
    } else {
      const newDisplay = display === '0' && num !== '.' ? num : display + num;
      setDisplay(newDisplay);
      if (operation && previousValue !== null) {
        const operatorSymbol = operation === '*' ? '×' : operation === '/' ? '÷' : operation;
        setExpression(`${previousValue} ${operatorSymbol} ${newDisplay}`);
      } else {
        setExpression(newDisplay);
      }
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = toDecimal(display);
    const operatorSymbol = nextOperation === '*' ? '×' : nextOperation === '/' ? '÷' : nextOperation;

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(`${inputValue} ${operatorSymbol} `);
    } else if (operation && !waitingForNewValue) {
      const currentValue = previousValue;
      const result = calculate(currentValue, inputValue, operation);
      setDisplay(formatDisplay(result));
      setPreviousValue(result);
      setExpression(`${result} ${operatorSymbol} `);
    } else {
      setExpression(expression.replace(/[+\-×÷] $/, `${operatorSymbol} `));
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: Decimal, secondValue: Decimal, operation: string) => {
    switch (operation) {
      case '+': return firstValue.plus(secondValue);
      case '-': return firstValue.minus(secondValue);
      case '*': return firstValue.times(secondValue);
      case '/': return firstValue.dividedBy(secondValue);
      default: return secondValue;
    }
  };

  const handleEqual = () => {
    const inputValue = toDecimal(display);
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      const finalExpression = expression + ' = ' + result;
      setExpression(finalExpression);
      setDisplay(formatDisplay(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const ButtonStyle = {
    number: "bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-150",
    operator: "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-amber-100 shadow-md hover:shadow-lg transition-all duration-150",
    equals: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-150",
    clear: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-150"
  };

  const keys = [
    // Row 1
    { label: 'C', onClick: clear, className: ButtonStyle.clear },
    { label: 'CE', onClick: clearEntry, className: ButtonStyle.clear },
    { label: '⌫', onClick: () => setDisplay(display.slice(0, -1) || '0'), className: ButtonStyle.operator },
    { label: '÷', onClick: () => inputOperation('/'), className: ButtonStyle.operator },
    
    // Row 2
    { label: '7', onClick: () => inputNumber('7'), className: ButtonStyle.number },
    { label: '8', onClick: () => inputNumber('8'), className: ButtonStyle.number },
    { label: '9', onClick: () => inputNumber('9'), className: ButtonStyle.number },
    { label: '×', onClick: () => inputOperation('*'), className: ButtonStyle.operator },
    
    // Row 3
    { label: '4', onClick: () => inputNumber('4'), className: ButtonStyle.number },
    { label: '5', onClick: () => inputNumber('5'), className: ButtonStyle.number },
    { label: '6', onClick: () => inputNumber('6'), className: ButtonStyle.number },
    { label: '−', onClick: () => inputOperation('-'), className: ButtonStyle.operator },
    
    // Row 4
    { label: '1', onClick: () => inputNumber('1'), className: ButtonStyle.number },
    { label: '2', onClick: () => inputNumber('2'), className: ButtonStyle.number },
    { label: '3', onClick: () => inputNumber('3'), className: ButtonStyle.number },
    { label: '+', onClick: () => inputOperation('+'), className: ButtonStyle.operator },
    
    // Row 5
    { label: '0', onClick: () => inputNumber('0'), className: ButtonStyle.number, span: 2 },
    { label: '.', onClick: () => inputNumber('.'), className: ButtonStyle.number },
    { label: '=', onClick: handleEqual, className: ButtonStyle.equals }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
          <span className="text-amber-200 text-lg sm:text-2xl">🧮</span>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Basic Calculator — Free Online Calculator</h1>
          <p className="text-sm sm:text-base text-gray-600">Perform standard arithmetic operations with a simple interface</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 max-w-sm mx-auto">
        {/* Display */}
        <div className="mb-4">
          <div className="bg-gray-900 rounded-xl p-4 text-white">
            <div className="text-sm text-gray-400 mb-2 h-6 overflow-hidden">
              {expression || 'Ready for calculation...'}
            </div>
            <div className="text-2xl sm:text-3xl font-mono text-right mb-2 overflow-hidden break-all">
              {display}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <KeypadGrid keys={keys} cols={4} />
      </div>
    </div>
  );
}
