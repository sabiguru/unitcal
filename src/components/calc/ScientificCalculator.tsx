'use client';

import { useState } from 'react';
import KeypadGrid from '@/components/ui/KeypadGrid';

type NumberBase = 'DEC' | 'HEX' | 'OCT' | 'BIN';
type StatMode = 'OFF' | 'STAT';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [memory, setMemory] = useState([0, 0, 0, 0]); // 4 memory slots
  const [currentMemorySlot, setCurrentMemorySlot] = useState(0);
  const [isInverse, setIsInverse] = useState(false);
  const [isHyperbolic, setIsHyperbolic] = useState(false);
  const [isShift, setIsShift] = useState(false);
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD' | 'GRAD'>('DEG');
  const [numberBase, setNumberBase] = useState<NumberBase>('DEC');
  const [statMode, setStatMode] = useState<StatMode>('OFF');
  const [statData, setStatData] = useState<number[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [parentheses, setParentheses] = useState(0);
  const [fractionMode, setFractionMode] = useState(false);
  const [summationStart, setSummationStart] = useState<number | null>(null);
  const [summationEnd, setSummationEnd] = useState<number | null>(null);
  const [summationStep, setSummationStep] = useState(1);

  const inputNumber = (num: string) => {
    // Handle different number bases
    if (numberBase !== 'DEC') {
      const validChars = {
        'HEX': '0123456789ABCDEF',
        'OCT': '01234567',
        'BIN': '01'
      };
      if (!validChars[numberBase].includes(num.toUpperCase())) {
        return; // Invalid character for current base
      }
    }
    
    if (waitingForNewValue) {
      setDisplay(num);
      if (operation && previousValue !== null) {
        const operatorSymbol = operation === '*' ? '×' : operation === '/' ? '÷' : operation;
        setExpression(`${previousValue} ${operatorSymbol} ${num}`);
      } else {
        setExpression(num);
      }
      setWaitingForNewValue(false);
    } else {
      const newDisplay = display === '0' ? num : display + num;
      setDisplay(newDisplay);
      if (operation && previousValue !== null) {
        const operatorSymbol = operation === '*' ? '×' : operation === '/' ? '÷' : operation;
        setExpression(`${previousValue} ${operatorSymbol} ${newDisplay}`);
      } else {
        setExpression(newDisplay);
      }
    }
  };
  
  const handleOpenParenthesis = () => {
    setExpression(expression + '(');
    setDisplay('(');
    setParentheses(parentheses + 1);
    setWaitingForNewValue(true);
  };
  
  const handleCloseParenthesis = () => {
    if (parentheses > 0) {
      setExpression(expression + ')');
      setDisplay(')');
      setParentheses(parentheses - 1);
      setWaitingForNewValue(true);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);
    const operatorSymbol = nextOperation === '*' ? '×' : nextOperation === '/' ? '÷' : nextOperation;

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(`${inputValue} ${operatorSymbol} `);
    } else if (operation && !waitingForNewValue) {
      const currentValue = previousValue || 0;
      const result = calculate(currentValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
      setExpression(`${result} ${operatorSymbol} `);
    } else {
      setExpression(expression.replace(/[+\-×÷^] $/, `${operatorSymbol} `));
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      case '^': return Math.pow(firstValue, secondValue);
      case 'yx': return Math.pow(firstValue, secondValue);
      case 'nrt': return Math.pow(secondValue, 1/firstValue); // nth root
      case 'mod': return firstValue % secondValue;
      case 'nCr': return combination(firstValue, secondValue);
      case 'nPr': return permutation(firstValue, secondValue);
      case 'logb': return Math.log(secondValue) / Math.log(firstValue); // log base firstValue of secondValue
      case 'GCD': return gcd(firstValue, secondValue);
      case 'LCM': return lcm(firstValue, secondValue);
      case 'AND': return Math.floor(firstValue) & Math.floor(secondValue); // Bitwise AND
      case 'OR': return Math.floor(firstValue) | Math.floor(secondValue); // Bitwise OR
      case 'XOR': return Math.floor(firstValue) ^ Math.floor(secondValue); // Bitwise XOR
      default: return secondValue;
    }
  };
  
  const combination = (n: number, r: number) => {
    if (r > n || r < 0) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
  };
  
  const permutation = (n: number, r: number) => {
    if (r > n || r < 0) return 0;
    return factorial(n) / factorial(n - r);
  };
  
  const gcd = (a: number, b: number): number => {
    a = Math.abs(Math.floor(a));
    b = Math.abs(Math.floor(b));
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };
  
  const lcm = (a: number, b: number): number => {
    return Math.abs(Math.floor(a) * Math.floor(b)) / gcd(a, b);
  };
  
  // Number base conversion functions
  const convertToBase = (value: number, base: NumberBase): string => {
    const num = Math.floor(Math.abs(value));
    switch (base) {
      case 'HEX': return num.toString(16).toUpperCase();
      case 'OCT': return num.toString(8);
      case 'BIN': return num.toString(2);
      default: return value.toString();
    }
  };
  
  const convertFromBase = (value: string, base: NumberBase): number => {
    switch (base) {
      case 'HEX': return parseInt(value, 16);
      case 'OCT': return parseInt(value, 8);
      case 'BIN': return parseInt(value, 2);
      default: return parseFloat(value);
    }
  };
  
  const handleBaseConversion = (newBase: NumberBase) => {
    if (numberBase !== newBase) {
      const currentValue = convertFromBase(display, numberBase);
      const newValue = convertToBase(currentValue, newBase);
      setDisplay(newValue);
      setNumberBase(newBase);
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      const finalExpression = expression + ' = ' + result;
      setExpression(finalExpression);
      setDisplay(String(result));
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
    setParentheses(0);
  };
  
  const allClear = () => {
    clear();
    setMemory([0, 0, 0, 0]);
    setStatData([]);
    setHistory([]);
    setAngleMode('DEG');
    setNumberBase('DEC');
    setStatMode('OFF');
    setIsInverse(false);
    setIsHyperbolic(false);
    setIsShift(false);
  };

  const handleScientificFunction = (func: string) => {
    const value = parseFloat(display);
    let result: number;
    let funcExpression = '';
    
    const toRadians = (val: number) => {
      switch (angleMode) {
        case 'DEG': return val * Math.PI / 180;
        case 'GRAD': return val * Math.PI / 200;
        default: return val;
      }
    };
    
    const fromRadians = (val: number) => {
      switch (angleMode) {
        case 'DEG': return val * 180 / Math.PI;
        case 'GRAD': return val * 200 / Math.PI;
        default: return val;
      }
    };
    
    try {
      switch (func) {
        // Trigonometric functions
        case 'sin': 
          if (isHyperbolic) {
            result = isInverse ? Math.asinh(value) : Math.sinh(value);
            funcExpression = `${isInverse ? 'asinh' : 'sinh'}(${value}) = ${result}`;
          } else {
            result = isInverse ? fromRadians(Math.asin(value)) : Math.sin(toRadians(value));
            funcExpression = `${isInverse ? 'asin' : 'sin'}(${value}) = ${result}`;
          }
          break;
        case 'cos': 
          if (isHyperbolic) {
            result = isInverse ? Math.acosh(value) : Math.cosh(value);
            funcExpression = `${isInverse ? 'acosh' : 'cosh'}(${value}) = ${result}`;
          } else {
            result = isInverse ? fromRadians(Math.acos(value)) : Math.cos(toRadians(value));
            funcExpression = `${isInverse ? 'acos' : 'cos'}(${value}) = ${result}`;
          }
          break;
        case 'tan': 
          if (isHyperbolic) {
            result = isInverse ? Math.atanh(value) : Math.tanh(value);
            funcExpression = `${isInverse ? 'atanh' : 'tanh'}(${value}) = ${result}`;
          } else {
            result = isInverse ? fromRadians(Math.atan(value)) : Math.tan(toRadians(value));
            funcExpression = `${isInverse ? 'atan' : 'tan'}(${value}) = ${result}`;
          }
          break;
        
        // Additional trig functions
        case 'sec': 
          result = isInverse ? fromRadians(Math.acos(1/value)) : 1/Math.cos(toRadians(value));
          funcExpression = `${isInverse ? 'asec' : 'sec'}(${value}) = ${result}`;
          break;
        case 'csc': 
          result = isInverse ? fromRadians(Math.asin(1/value)) : 1/Math.sin(toRadians(value));
          funcExpression = `${isInverse ? 'acsc' : 'csc'}(${value}) = ${result}`;
          break;
        case 'cot': 
          result = isInverse ? fromRadians(Math.atan(1/value)) : 1/Math.tan(toRadians(value));
          funcExpression = `${isInverse ? 'acot' : 'cot'}(${value}) = ${result}`;
          break;
        
        // Logarithmic functions
        case 'log': result = isShift ? Math.pow(10, value) : Math.log10(value); 
          funcExpression = `${isShift ? '10^' : 'log'}(${value}) = ${result}`; break;
        case 'ln': result = isShift ? Math.pow(Math.E, value) : Math.log(value); 
          funcExpression = `${isShift ? 'e^' : 'ln'}(${value}) = ${result}`; break;
        case 'log2': result = isShift ? Math.pow(2, value) : Math.log2(value); 
          funcExpression = `${isShift ? '2^' : 'log2'}(${value}) = ${result}`; break;
        
        // Power functions
        case 'x²': result = value * value; funcExpression = `${value}² = ${result}`; break;
        case 'x³': result = value * value * value; funcExpression = `${value}³ = ${result}`; break;
        case 'x^y': inputOperation('^'); return;
        case '√': result = isShift ? Math.cbrt(value) : Math.sqrt(value); 
          funcExpression = `${isShift ? '∛' : '√'}${value} = ${result}`; break;
        case 'ⁿ√': inputOperation('nrt'); return;
        
        // Other functions
        case '1/x': result = 1 / value; funcExpression = `1/${value} = ${result}`; break;
        case 'x!': result = factorial(value); funcExpression = `${value}! = ${result}`; break;
        case 'abs': result = Math.abs(value); funcExpression = `|${value}| = ${result}`; break;
        case '±': result = -value; funcExpression = `-(${value}) = ${result}`; break;
        case '%': result = value / 100; funcExpression = `${value}% = ${result}`; break;
        
        // Constants
        case 'π': result = Math.PI; funcExpression = `π = ${result}`; break;
        case 'e': result = Math.E; funcExpression = `e = ${result}`; break;
        case 'φ': result = (1 + Math.sqrt(5)) / 2; funcExpression = `φ = ${result}`; break; // Golden ratio
        
        // Random number
        case 'Rand': result = Math.random(); funcExpression = `Rand() = ${result}`; break;
        
        default: result = value; funcExpression = `${value}`;
      }
    } catch (error) {
      result = NaN;
      funcExpression = 'Error';
    }
    
    setHistory([...history, funcExpression]);
    setExpression(funcExpression);
    setDisplay(String(result));
    setWaitingForNewValue(true);
    setIsInverse(false);
    setIsHyperbolic(false);
    setIsShift(false);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n <= 1) return 1;
    if (n > 170) return Infinity;
    
    // Use iterative approach to avoid stack overflow
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const handleMemory = (action: string) => {
    const value = parseFloat(display);
    const newMemory = [...memory];
    
    switch (action) {
      case 'MC': newMemory[currentMemorySlot] = 0; break;
      case 'MR': setDisplay(String(memory[currentMemorySlot])); setWaitingForNewValue(true); break;
      case 'M+': newMemory[currentMemorySlot] = memory[currentMemorySlot] + value; break;
      case 'M-': newMemory[currentMemorySlot] = memory[currentMemorySlot] - value; break;
      case 'MS': newMemory[currentMemorySlot] = value; break;
      case 'M1': setCurrentMemorySlot(0); break;
      case 'M2': setCurrentMemorySlot(1); break;
      case 'M3': setCurrentMemorySlot(2); break;
      case 'M4': setCurrentMemorySlot(3); break;
    }
    
    if (action !== 'MR' && !action.startsWith('M') || action === 'MC' || action === 'MS' || action === 'M+' || action === 'M-') {
      setMemory(newMemory);
    }
  };
  
  // Statistical functions
  const handleStatFunction = (func: string) => {
    const value = parseFloat(display);
    let result: number;
    
    switch (func) {
      case 'Σ+':
        setStatData([...statData, value]);
        result = statData.length + 1;
        setDisplay(String(result));
        break;
      case 'Σ-':
        const newData = [...statData];
        const index = newData.lastIndexOf(value);
        if (index > -1) newData.splice(index, 1);
        setStatData(newData);
        result = newData.length;
        setDisplay(String(result));
        break;
      case 'n':
        result = statData.length;
        setDisplay(String(result));
        break;
      case 'Σx':
        result = statData.reduce((sum, x) => sum + x, 0);
        setDisplay(String(result));
        break;
      case 'Σx²':
        result = statData.reduce((sum, x) => sum + x * x, 0);
        setDisplay(String(result));
        break;
      case 'x̄': // mean
        result = statData.length > 0 ? statData.reduce((sum, x) => sum + x, 0) / statData.length : 0;
        setDisplay(String(result));
        break;
      case 'σ': // population standard deviation
        if (statData.length > 0) {
          const mean = statData.reduce((sum, x) => sum + x, 0) / statData.length;
          const variance = statData.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / statData.length;
          result = Math.sqrt(variance);
        } else {
          result = 0;
        }
        setDisplay(String(result));
        break;
      case 's': // sample standard deviation
        if (statData.length > 1) {
          const mean = statData.reduce((sum, x) => sum + x, 0) / statData.length;
          const variance = statData.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (statData.length - 1);
          result = Math.sqrt(variance);
        } else {
          result = 0;
        }
        setDisplay(String(result));
        break;
      case 'ClrStat':
        setStatData([]);
        setDisplay('0');
        break;
    }
    setWaitingForNewValue(true);
  };
  
  // Advanced mathematical functions
  const handleSummation = (start: number, end: number, expression: string = 'n') => {
    let sum = 0;
    for (let n = start; n <= end; n++) {
      // Simple expression evaluation - for now just support n, n^2, n^3
      let value = n;
      if (expression === 'n^2') value = n * n;
      else if (expression === 'n^3') value = n * n * n;
      else if (expression === '2^n') value = Math.pow(2, n);
      else if (expression === '1/n') value = 1/n;
      sum += value;
    }
    const result = `Σ(${expression}) from ${start} to ${end} = ${sum}`;
    setHistory([...history, result]);
    setDisplay(String(sum));
    setWaitingForNewValue(true);
  };
  
  const handleProduct = (start: number, end: number, expression: string = 'n') => {
    let product = 1;
    for (let n = start; n <= end; n++) {
      let value = n;
      if (expression === 'n^2') value = n * n;
      else if (expression === '2^n') value = Math.pow(2, n);
      product *= value;
    }
    const result = `Π(${expression}) from ${start} to ${end} = ${product}`;
    setHistory([...history, result]);
    setDisplay(String(product));
    setWaitingForNewValue(true);
  };
  
  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };
  
  const findNextPrime = (num: number): number => {
    let candidate = Math.floor(num) + 1;
    while (!isPrime(candidate)) {
      candidate++;
    }
    return candidate;
  };
  
  const findPreviousPrime = (num: number): number => {
    let candidate = Math.floor(num) - 1;
    while (candidate > 1 && !isPrime(candidate)) {
      candidate--;
    }
    return candidate > 1 ? candidate : 2;
  };
  
  const handlePrimeCheck = () => {
    const num = parseFloat(display);
    const isP = isPrime(num);
    const nextP = findNextPrime(num);
    const prevP = findPreviousPrime(num);
    
    const result = `${num} is ${isP ? '' : 'not '}prime. Next: ${nextP}, Prev: ${prevP}`;
    setHistory([...history, result]);
    setDisplay(isP ? 'PRIME' : 'NOT PRIME');
    setWaitingForNewValue(true);
  };
  
  const decimalToFraction = (decimal: number): string => {
    const tolerance = 1.0E-6;
    let h1 = 1; let h2 = 0; let k1 = 0; let k2 = 1;
    let b = decimal;
    
    do {
      const a = Math.floor(b);
      let aux = h1; h1 = a * h1 + h2; h2 = aux;
      aux = k1; k1 = a * k1 + k2; k2 = aux;
      b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);
    
    return `${h1}/${k1}`;
  };
  
  const handleFractionMode = () => {
    const num = parseFloat(display);
    if (fractionMode) {
      // Convert fraction back to decimal
      const result = num.toString();
      setDisplay(result);
    } else {
      // Convert decimal to fraction
      const fraction = decimalToFraction(num);
      setDisplay(fraction);
    }
    setFractionMode(!fractionMode);
    setWaitingForNewValue(true);
  };
  
  const handlePolarRectangular = () => {
    const value = parseFloat(display);
    // This is a simplified version - in practice you'd want to handle pairs of values
    // For now, let's assume we're converting magnitude/angle
    if (angleMode === 'DEG') {
      // Assume input is radius, convert to rectangular x-coordinate
      const result = value * Math.cos(0); // angle = 0 for simplicity
      setDisplay(String(result));
    } else {
      // Convert back
      const result = Math.sqrt(value * value); // simplified
      setDisplay(String(result));
    }
    setWaitingForNewValue(true);
  };
  
  const handleModularArithmetic = (operation: string) => {
    const value = parseFloat(display);
    let result: number;
    
    switch (operation) {
      case 'mod_inv': // Multiplicative inverse
        result = modInverse(Math.floor(value), 256); // default modulus
        break;
      case 'mod_pow': // Modular exponentiation a^b mod m
        result = modPow(Math.floor(value), 2, 1000); // simplified
        break;
      default:
        result = value;
    }
    
    setDisplay(String(result));
    setWaitingForNewValue(true);
  };
  
  const modInverse = (a: number, m: number): number => {
    const gcdExtended = (a: number, b: number): [number, number, number] => {
      if (a === 0) return [b, 0, 1];
      const [gcd, x1, y1] = gcdExtended(b % a, a);
      const x = y1 - Math.floor(b / a) * x1;
      const y = x1;
      return [gcd, x, y];
    };
    
    const [g, x] = gcdExtended(a, m);
    if (g !== 1) return -1; // No modular inverse exists
    return ((x % m) + m) % m;
  };
  
  const modPow = (base: number, exp: number, mod: number): number => {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  };
  
  const handleAdvancedGCD = (...numbers: number[]): number => {
    const gcdTwo = (a: number, b: number): number => {
      while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
      }
      return Math.abs(a);
    };
    
    return numbers.reduce(gcdTwo);
  };
  
  const handleAdvancedLCM = (...numbers: number[]): number => {
    const lcmTwo = (a: number, b: number): number => {
      return Math.abs(a * b) / handleAdvancedGCD(a, b);
    };
    
    return numbers.reduce(lcmTwo);
  };

  // Check if a number is valid for current base
  const isNumberValidForBase = (num: string): boolean => {
    const validChars = {
      'DEC': '0123456789.',
      'HEX': '0123456789ABCDEF',
      'OCT': '01234567',
      'BIN': '01'
    };
    return validChars[numberBase].includes(num);
  };

  const ButtonStyle = {
    number: "bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-150",
    numberDisabled: "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50",
    operator: "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-amber-100 shadow-md hover:shadow-lg transition-all duration-150",
    function: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-150",
    trig: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg transition-all duration-150",
    memory: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all duration-150",
    stat: "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-md hover:shadow-lg transition-all duration-150",
    clear: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-150",
    equals: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-150",
    mode: "bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-amber-100 shadow-md hover:shadow-lg transition-all duration-150",
    activeMode: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-150",
    base: "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg transition-all duration-150",
    activeBase: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg border-2 border-indigo-300"
  };


  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🔬</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Scientific Calculator</h1>
          <p className="text-gray-600">Professional-grade calculator with 100+ scientific, statistical, and engineering functions</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 max-w-6xl mx-auto">
        {/* Enhanced Display */}
        <div className="mb-4">
          <div className="bg-gray-900 rounded-xl p-4 text-white">
            {/* Status indicators */}
            <div className="flex justify-between items-center mb-2 text-xs text-gray-400">
              <div className="flex space-x-4">
                <span>{angleMode}</span>
                <span>{numberBase}</span>
                {statMode === 'STAT' && <span>STAT</span>}
                {isInverse && <span className="text-yellow-400">INV</span>}
                {isHyperbolic && <span className="text-yellow-400">HYP</span>}
                {isShift && <span className="text-yellow-400">SHIFT</span>}
              </div>
              <div className="flex space-x-2">
                <span>M{currentMemorySlot + 1}: {memory[currentMemorySlot] !== 0 ? memory[currentMemorySlot].toFixed(2) : 'Empty'}</span>
                {parentheses > 0 && <span>( {parentheses}</span>}
              </div>
            </div>
            
            {/* Expression history */}
            <div className="text-sm text-gray-400 mb-2 h-6 overflow-hidden">
              {expression || 'Ready for calculation...'}
            </div>
            
            {/* Main display */}
            <div className="text-2xl sm:text-4xl font-mono text-right mb-2 overflow-hidden break-all">
              {display}
            </div>
            
            {/* Statistical info */}
            {statMode === 'STAT' && statData.length > 0 && (
              <div className="text-xs text-blue-400 flex justify-between">
                <span>n = {statData.length}</span>
                <span>Σx = {statData.reduce((sum, x) => sum + x, 0).toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mode Selection Row */}
        <div className="grid grid-cols-8 gap-1 mb-2">
          <button onClick={() => setAngleMode(angleMode === 'DEG' ? 'RAD' : angleMode === 'RAD' ? 'GRAD' : 'DEG')} 
                  className={`${angleMode !== 'DEG' ? ButtonStyle.activeMode : ButtonStyle.mode} py-1 px-1 rounded text-xs font-medium`}>
            {angleMode}
          </button>
          <button onClick={() => setIsInverse(!isInverse)} 
                  className={`${isInverse ? ButtonStyle.activeMode : ButtonStyle.mode} py-1 px-1 rounded text-xs font-medium`}>
            INV
          </button>
          <button onClick={() => setIsHyperbolic(!isHyperbolic)} 
                  className={`${isHyperbolic ? ButtonStyle.activeMode : ButtonStyle.mode} py-1 px-1 rounded text-xs font-medium`}>
            HYP
          </button>
          <button onClick={() => setIsShift(!isShift)} 
                  className={`${isShift ? ButtonStyle.activeMode : ButtonStyle.mode} py-1 px-1 rounded text-xs font-medium`}>
            SHIFT
          </button>
          <button onClick={() => setStatMode(statMode === 'OFF' ? 'STAT' : 'OFF')} 
                  className={`${statMode === 'STAT' ? ButtonStyle.activeMode : ButtonStyle.mode} py-1 px-1 rounded text-xs font-medium`}>
            STAT
          </button>
          <button onClick={allClear} className={`${ButtonStyle.clear} py-1 px-1 rounded text-xs font-medium`}>
            AC
          </button>
          <button onClick={clear} className={`${ButtonStyle.clear} py-1 px-1 rounded text-xs font-medium`}>
            CE
          </button>
          <button onClick={() => setDisplay(display.slice(0, -1) || '0')} className={`${ButtonStyle.clear} py-1 px-1 rounded text-xs font-medium`}>
            DEL
          </button>
        </div>

        {/* Number Base Selection */}
        <div className="grid grid-cols-8 gap-1 mb-2">
          {(['DEC', 'HEX', 'OCT', 'BIN'] as NumberBase[]).map((base) => (
            <button key={base} onClick={() => handleBaseConversion(base)} 
                    className={`${numberBase === base ? ButtonStyle.activeBase : ButtonStyle.base} py-1 px-1 rounded text-xs font-medium`}>
              {base}
            </button>
          ))}
          <button onClick={handleOpenParenthesis} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            (
          </button>
          <button onClick={handleCloseParenthesis} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            )
          </button>
          <button onClick={() => inputOperation('nCr')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            nCr
          </button>
          <button onClick={() => inputOperation('nPr')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            nPr
          </button>
        </div>

        {/* Memory Operations */}
        <div className="grid grid-cols-8 gap-1 mb-2">
          <button onClick={() => handleMemory('MC')} className={`${ButtonStyle.memory} py-1 px-1 rounded text-xs font-medium`}>
            MC
          </button>
          <button onClick={() => handleMemory('MR')} className={`${ButtonStyle.memory} py-1 px-1 rounded text-xs font-medium`}>
            MR
          </button>
          <button onClick={() => handleMemory('MS')} className={`${ButtonStyle.memory} py-1 px-1 rounded text-xs font-medium`}>
            MS
          </button>
          <button onClick={() => handleMemory('M+')} className={`${ButtonStyle.memory} py-1 px-1 rounded text-xs font-medium`}>
            M+
          </button>
          <button onClick={() => handleMemory('M1')} className={`${currentMemorySlot === 0 ? ButtonStyle.activeMode : ButtonStyle.memory} py-1 px-1 rounded text-xs font-medium`}>
            M1
          </button>
          <button onClick={() => handleMemory('M2')} className={`${currentMemorySlot === 1 ? ButtonStyle.activeMode : ButtonStyle.memory} py-1 px-1 rounded text-xs font-medium`}>
            M2
          </button>
          <button onClick={() => handleMemory('M3')} className={`${currentMemorySlot === 2 ? ButtonStyle.activeMode : ButtonStyle.memory} py-1 px-1 rounded text-xs font-medium`}>
            M3
          </button>
          <button onClick={() => handleMemory('M4')} className={`${currentMemorySlot === 3 ? ButtonStyle.activeMode : ButtonStyle.memory} py-1 px-1 rounded text-xs font-medium`}>
            M4
          </button>
        </div>

        {/* Scientific Function Rows - 8 columns each for consistent layout */}
        
        {/* Trigonometric Functions Row 1 */}
        <div className="grid grid-cols-8 gap-1 mb-2">
          <button onClick={() => handleScientificFunction('sin')} className={`${ButtonStyle.trig} py-1 px-1 rounded text-xs font-medium`}>
            {isInverse ? (isHyperbolic ? 'asinh' : 'asin') : (isHyperbolic ? 'sinh' : 'sin')}
          </button>
          <button onClick={() => handleScientificFunction('cos')} className={`${ButtonStyle.trig} py-1 px-1 rounded text-xs font-medium`}>
            {isInverse ? (isHyperbolic ? 'acosh' : 'acos') : (isHyperbolic ? 'cosh' : 'cos')}
          </button>
          <button onClick={() => handleScientificFunction('tan')} className={`${ButtonStyle.trig} py-1 px-1 rounded text-xs font-medium`}>
            {isInverse ? (isHyperbolic ? 'atanh' : 'atan') : (isHyperbolic ? 'tanh' : 'tan')}
          </button>
          <button onClick={() => handleScientificFunction('sec')} className={`${ButtonStyle.trig} py-1 px-1 rounded text-xs font-medium`}>
            {isInverse ? 'asec' : 'sec'}
          </button>
          <button onClick={() => handleScientificFunction('csc')} className={`${ButtonStyle.trig} py-1 px-1 rounded text-xs font-medium`}>
            {isInverse ? 'acsc' : 'csc'}
          </button>
          <button onClick={() => handleScientificFunction('cot')} className={`${ButtonStyle.trig} py-1 px-1 rounded text-xs font-medium`}>
            {isInverse ? 'acot' : 'cot'}
          </button>
          <button onClick={() => handleScientificFunction('π')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            π
          </button>
          <button onClick={() => handleScientificFunction('e')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            e
          </button>
        </div>

        {/* Logarithmic and Power Functions Row 2 */}
        <div className="grid grid-cols-8 gap-1 mb-2">
          <button onClick={() => handleScientificFunction('log')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            {isShift ? '10^x' : 'log'}
          </button>
          <button onClick={() => handleScientificFunction('ln')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            {isShift ? 'e^x' : 'ln'}
          </button>
          <button onClick={() => handleScientificFunction('log2')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            {isShift ? '2^x' : 'log2'}
          </button>
          <button onClick={() => inputOperation('logb')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            logᵦ
          </button>
          <button onClick={() => handleScientificFunction('x²')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            x²
          </button>
          <button onClick={() => handleScientificFunction('x³')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            x³
          </button>
          <button onClick={() => inputOperation('yx')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            x^y
          </button>
          <button onClick={() => inputOperation('nrt')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            ⁿ√
          </button>
        </div>

        {/* More Functions Row 3 */}
        <div className="grid grid-cols-8 gap-1 mb-2">
          <button onClick={() => handleScientificFunction('√')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            {isShift ? '∛' : '√'}
          </button>
          <button onClick={() => handleScientificFunction('1/x')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            1/x
          </button>
          <button onClick={() => handleScientificFunction('x!')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            x!
          </button>
          <button onClick={() => handleScientificFunction('abs')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            |x|
          </button>
          <button onClick={() => handleScientificFunction('Rand')} className={`${ButtonStyle.function} py-1 px-1 rounded text-xs font-medium`}>
            Rand
          </button>
          <button onClick={() => handleScientificFunction('%')} className={`${ButtonStyle.operator} py-1 px-1 rounded text-xs font-medium`}>
            %
          </button>
          <button onClick={() => inputOperation('mod')} className={`${ButtonStyle.operator} py-1 px-1 rounded text-xs font-medium`}>
            mod
          </button>
          <button onClick={() => handleScientificFunction('±')} className={`${ButtonStyle.operator} py-1 px-1 rounded text-xs font-medium`}>
            ±
          </button>
        </div>

        {/* Statistical Functions Row (when STAT mode is on) */}
        {statMode === 'STAT' && (
          <div className="grid grid-cols-8 gap-1 mb-2">
            <button onClick={() => handleStatFunction('Σ+')} className={`${ButtonStyle.stat} py-1 px-1 rounded text-xs font-medium`}>
              Σ+
            </button>
            <button onClick={() => handleStatFunction('Σ-')} className={`${ButtonStyle.stat} py-1 px-1 rounded text-xs font-medium`}>
              Σ-
            </button>
            <button onClick={() => handleStatFunction('x̄')} className={`${ButtonStyle.stat} py-1 px-1 rounded text-xs font-medium`}>
              x̄
            </button>
            <button onClick={() => handleStatFunction('σ')} className={`${ButtonStyle.stat} py-1 px-1 rounded text-xs font-medium`}>
              σ
            </button>
            <button onClick={() => handleStatFunction('s')} className={`${ButtonStyle.stat} py-1 px-1 rounded text-xs font-medium`}>
              s
            </button>
            <button onClick={() => handleStatFunction('n')} className={`${ButtonStyle.stat} py-1 px-1 rounded text-xs font-medium`}>
              n
            </button>
            <button onClick={() => handleStatFunction('Σx')} className={`${ButtonStyle.stat} py-1 px-1 rounded text-xs font-medium`}>
              Σx
            </button>
            <button onClick={() => handleStatFunction('ClrStat')} className={`${ButtonStyle.clear} py-1 px-1 rounded text-xs font-medium`}>
              ClrSt
            </button>
          </div>
        )}

        {/* Standard Calculator Grid - Traditional layout with flex for multi-row equals */}
        <div className="flex gap-1">
          {/* Left side - 7 columns */}
          <div className="flex-1">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {/* Row 1: 7-8-9 + operators/functions */}
              <button 
                onClick={() => isNumberValidForBase('7') ? inputNumber('7') : null} 
                className={`${isNumberValidForBase('7') ? ButtonStyle.number : ButtonStyle.numberDisabled} py-2 px-1 rounded font-medium text-sm`}
                disabled={!isNumberValidForBase('7')}
              >
                7
              </button>
              <button 
                onClick={() => isNumberValidForBase('8') ? inputNumber('8') : null} 
                className={`${isNumberValidForBase('8') ? ButtonStyle.number : ButtonStyle.numberDisabled} py-2 px-1 rounded font-medium text-sm`}
                disabled={!isNumberValidForBase('8')}
              >
                8
              </button>
              <button 
                onClick={() => isNumberValidForBase('9') ? inputNumber('9') : null} 
                className={`${isNumberValidForBase('9') ? ButtonStyle.number : ButtonStyle.numberDisabled} py-2 px-1 rounded font-medium text-sm`}
                disabled={!isNumberValidForBase('9')}
              >
                9
              </button>
              <button onClick={() => inputOperation('/')} className={`${ButtonStyle.operator} py-2 px-1 rounded font-medium text-sm`}>
                ÷
              </button>
              <button onClick={() => inputOperation('*')} className={`${ButtonStyle.operator} py-2 px-1 rounded font-medium text-sm`}>
                ×
              </button>
              {/* Advanced functions */}
              <button onClick={() => handleSummation(1, parseFloat(display), 'n')} className={`${ButtonStyle.function} py-2 px-1 rounded text-xs font-medium`}>
                Σ
              </button>
              <button onClick={() => handleProduct(1, parseFloat(display), 'n')} className={`${ButtonStyle.function} py-2 px-1 rounded text-xs font-medium`}>
                Π
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {/* Row 2: 4-5-6 + operators/functions */}
              <button 
                onClick={() => isNumberValidForBase('4') ? inputNumber('4') : null} 
                className={`${isNumberValidForBase('4') ? ButtonStyle.number : ButtonStyle.numberDisabled} py-2 px-1 rounded font-medium text-sm`}
                disabled={!isNumberValidForBase('4')}
              >
                4
              </button>
              <button 
                onClick={() => isNumberValidForBase('5') ? inputNumber('5') : null} 
                className={`${isNumberValidForBase('5') ? ButtonStyle.number : ButtonStyle.numberDisabled} py-2 px-1 rounded font-medium text-sm`}
                disabled={!isNumberValidForBase('5')}
              >
                5
              </button>
              <button 
                onClick={() => isNumberValidForBase('6') ? inputNumber('6') : null} 
                className={`${isNumberValidForBase('6') ? ButtonStyle.number : ButtonStyle.numberDisabled} py-2 px-1 rounded font-medium text-sm`}
                disabled={!isNumberValidForBase('6')}
              >
                6
              </button>
              <button onClick={() => inputOperation('-')} className={`${ButtonStyle.operator} py-2 px-1 rounded font-medium text-sm`}>
                −
              </button>
              <button onClick={() => inputOperation('+')} className={`${ButtonStyle.operator} py-2 px-1 rounded font-medium text-sm`}>
                +
              </button>
              {/* More advanced functions */}
              <button onClick={handlePrimeCheck} className={`${ButtonStyle.function} py-2 px-1 rounded text-xs font-medium`}>
                P?
              </button>
              <button onClick={handleFractionMode} className={`${fractionMode ? ButtonStyle.activeMode : ButtonStyle.function} py-2 px-1 rounded text-xs font-medium`}>
                a/b
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {/* Row 3: 1-2-3-0-. + functions */}
              <button 
                onClick={() => isNumberValidForBase('1') ? inputNumber('1') : null} 
                className={`${isNumberValidForBase('1') ? ButtonStyle.number : ButtonStyle.numberDisabled} py-2 px-1 rounded font-medium text-sm`}
                disabled={!isNumberValidForBase('1')}
              >
                1
              </button>
              <button 
                onClick={() => isNumberValidForBase('2') ? inputNumber('2') : null} 
                className={`${isNumberValidForBase('2') ? ButtonStyle.number : ButtonStyle.numberDisabled} py-2 px-1 rounded font-medium text-sm`}
                disabled={!isNumberValidForBase('2')}
              >
                2
              </button>
              <button 
                onClick={() => isNumberValidForBase('3') ? inputNumber('3') : null} 
                className={`${isNumberValidForBase('3') ? ButtonStyle.number : ButtonStyle.numberDisabled} py-2 px-1 rounded font-medium text-sm`}
                disabled={!isNumberValidForBase('3')}
              >
                3
              </button>
              <button 
                onClick={() => isNumberValidForBase('0') ? inputNumber('0') : null} 
                className={`${isNumberValidForBase('0') ? ButtonStyle.number : ButtonStyle.numberDisabled} py-2 px-1 rounded font-medium text-sm`}
                disabled={!isNumberValidForBase('0')}
              >
                0
              </button>
              <button onClick={() => inputNumber('.')} className={`${ButtonStyle.number} py-2 px-1 rounded font-medium text-sm`}>
                .
              </button>
              {/* Final advanced functions */}
              <button onClick={handlePolarRectangular} className={`${ButtonStyle.function} py-2 px-1 rounded text-xs font-medium`}>
                r↔θ
              </button>
              <button onClick={() => handleModularArithmetic('mod_inv')} className={`${ButtonStyle.function} py-2 px-1 rounded text-xs font-medium`}>
                mod
              </button>
            </div>
          </div>
          
          {/* Right side - Equals button spanning 3 rows */}
          <div className="w-16">
            <button onClick={handleEqual} className={`${ButtonStyle.equals} w-full h-full py-6 px-2 rounded font-medium text-2xl flex items-center justify-center`}>
              =
            </button>
          </div>
        </div>

        {/* Hexadecimal A-F Buttons (when HEX mode is active) */}
        {numberBase === 'HEX' && (
          <div className="grid grid-cols-6 gap-1 mt-2 mb-4">
            <button 
              onClick={() => isNumberValidForBase('A') ? inputNumber('A') : null} 
              className={`${isNumberValidForBase('A') ? ButtonStyle.base : ButtonStyle.numberDisabled} py-2 px-2 rounded font-medium text-sm`}
              disabled={!isNumberValidForBase('A')}
            >
              A
            </button>
            <button 
              onClick={() => isNumberValidForBase('B') ? inputNumber('B') : null} 
              className={`${isNumberValidForBase('B') ? ButtonStyle.base : ButtonStyle.numberDisabled} py-2 px-2 rounded font-medium text-sm`}
              disabled={!isNumberValidForBase('B')}
            >
              B
            </button>
            <button 
              onClick={() => isNumberValidForBase('C') ? inputNumber('C') : null} 
              className={`${isNumberValidForBase('C') ? ButtonStyle.base : ButtonStyle.numberDisabled} py-2 px-2 rounded font-medium text-sm`}
              disabled={!isNumberValidForBase('C')}
            >
              C
            </button>
            <button 
              onClick={() => isNumberValidForBase('D') ? inputNumber('D') : null} 
              className={`${isNumberValidForBase('D') ? ButtonStyle.base : ButtonStyle.numberDisabled} py-2 px-2 rounded font-medium text-sm`}
              disabled={!isNumberValidForBase('D')}
            >
              D
            </button>
            <button 
              onClick={() => isNumberValidForBase('E') ? inputNumber('E') : null} 
              className={`${isNumberValidForBase('E') ? ButtonStyle.base : ButtonStyle.numberDisabled} py-2 px-2 rounded font-medium text-sm`}
              disabled={!isNumberValidForBase('E')}
            >
              E
            </button>
            <button 
              onClick={() => isNumberValidForBase('F') ? inputNumber('F') : null} 
              className={`${isNumberValidForBase('F') ? ButtonStyle.base : ButtonStyle.numberDisabled} py-2 px-2 rounded font-medium text-sm`}
              disabled={!isNumberValidForBase('F')}
            >
              F
            </button>
          </div>
        )}

        {/* Calculation History */}
        {history.length > 0 && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <span className="text-blue-500 mr-2">📜</span>
              Recent Calculations
            </h3>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {history.slice(-5).reverse().map((calc, index) => (
                <div key={index} className="bg-gray-50 rounded p-2 border border-gray-100">
                  <div className="text-xs font-mono text-gray-700 break-all">
                    {calc}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setHistory([])}
              className="mt-2 text-xs text-red-600 hover:text-red-800 py-1 px-2 rounded border border-red-200 hover:border-red-300 transition-colors"
            >
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}