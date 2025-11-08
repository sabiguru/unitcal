'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { calculatorCategories } from '@/data/categoryData';
import EzoicAd from '@/components/ads/EzoicAd';
import AdsSidebar from '@/components/ads/AdsSidebar';
import { EZOIC_PLACEMENTS } from '@/config/ezoicPlacements';

export default function Home() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isInverse, setIsInverse] = useState(false);
  const [isHyperbolic, setIsHyperbolic] = useState(false);
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD' | 'GRAD'>('DEG');
  const [history, setHistory] = useState<string[]>([]);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const inputNumber = (num: string) => {
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
      case 'mod': return firstValue % secondValue;
      case 'nCr': return combination(firstValue, secondValue);
      case 'nPr': return permutation(firstValue, secondValue);
      default: return secondValue;
    }
  };

  const combination = (n: number, r: number) => {
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const permutation = (n: number, r: number) => {
    return factorial(n) / factorial(n - r);
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      const finalExpression = expression + ' = ' + result;
      setHistory([...history, finalExpression]);
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
    
    switch (func) {
      case 'sin': 
        result = isHyperbolic ? Math.sinh(value) : Math.sin(isInverse ? Math.asin(value) : toRadians(value));
        funcExpression = `${isHyperbolic ? 'sinh' : isInverse ? 'asin' : 'sin'}(${value}) = ${result}`;
        break;
      case 'cos': 
        result = isHyperbolic ? Math.cosh(value) : Math.cos(isInverse ? Math.acos(value) : toRadians(value));
        funcExpression = `${isHyperbolic ? 'cosh' : isInverse ? 'acos' : 'cos'}(${value}) = ${result}`;
        break;
      case 'tan': 
        result = isHyperbolic ? Math.tanh(value) : Math.tan(isInverse ? Math.atan(value) : toRadians(value));
        funcExpression = `${isHyperbolic ? 'tanh' : isInverse ? 'atan' : 'tan'}(${value}) = ${result}`;
        break;
      case 'log': result = Math.log10(value); funcExpression = `log(${value}) = ${result}`; break;
      case 'ln': result = Math.log(value); funcExpression = `ln(${value}) = ${result}`; break;
      case '10^x': result = Math.pow(10, value); funcExpression = `10^${value} = ${result}`; break;
      case 'e^x': result = Math.pow(Math.E, value); funcExpression = `e^${value} = ${result}`; break;
      case 'x²': result = value * value; funcExpression = `${value}² = ${result}`; break;
      case 'x³': result = value * value * value; funcExpression = `${value}³ = ${result}`; break;
      case '√': result = Math.sqrt(value); funcExpression = `√${value} = ${result}`; break;
      case '1/x': result = 1 / value; funcExpression = `1/${value} = ${result}`; break;
      case 'x!': result = factorial(value); funcExpression = `${value}! = ${result}`; break;
      case 'π': result = Math.PI; funcExpression = `π = ${result}`; break;
      case 'e': result = Math.E; funcExpression = `e = ${result}`; break;
      case '±': result = -value; funcExpression = `-(${value}) = ${result}`; break;
      case 'abs': result = Math.abs(value); funcExpression = `|${value}| = ${result}`; break;
      default: result = value; funcExpression = `${value}`;
    }
    
    setHistory([...history, funcExpression]);
    setExpression(funcExpression);
    setDisplay(String(result));
    setWaitingForNewValue(true);
    setIsInverse(false);
    setIsHyperbolic(false);
  };

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    if (n > 170) return Infinity;
    return n * factorial(n - 1);
  };

  const handleMemory = (action: string) => {
    const value = parseFloat(display);
    switch (action) {
      case 'MC': setMemory(0); break;
      case 'MR': setDisplay(String(memory)); setWaitingForNewValue(true); break;
      case 'M+': setMemory(memory + value); break;
      case 'M-': setMemory(memory - value); break;
      case 'MS': setMemory(value); break;
    }
  };

  const toggleCategory = (categorySlug: string) => {
    setExpandedCategories(prev => 
      prev.includes(categorySlug) 
        ? prev.filter(slug => slug !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const ButtonStyle = {
    number: "bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-150",
    operator: "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-amber-100 shadow-md hover:shadow-lg transition-all duration-150",
    function: "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md hover:shadow-lg transition-all duration-150",
    memory: "bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-amber-100 shadow-md hover:shadow-lg transition-all duration-150",
    clear: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-150",
    equals: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-150",
    mode: "bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-amber-100 shadow-md hover:shadow-lg transition-all duration-150"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Header/Navbar */}
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main SEO Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 mb-4">
            Free Online Calculators
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            90+ fast calculators for maths, finance, health, and engineering.
          </p>
        </div>

        {/* Category Selector */}
        <div className="mb-6 hidden md:block">
          <div className="flex items-center justify-end">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Categories</option>
                {calculatorCategories.map((category) => (
                  <option key={category.slug} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Top Section - Calculator, Categories, and Ads */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Left Column - Calculator */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 w-full max-w-sm mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-700">Scientific Calculator</h2>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Display */}
                <div className="mb-4">
                  <div className="bg-gray-900 rounded-xl p-4 text-white">
                    {/* Status indicators */}
                    <div className="flex justify-between items-center mb-2 text-xs text-gray-400">
                      <div className="flex space-x-4">
                        <span>{angleMode}</span>
                        {memory !== 0 && <span>M</span>}
                      </div>
                      <div className="flex space-x-2">
                        {isInverse && <span className="text-amber-300">INV</span>}
                        {isHyperbolic && <span className="text-amber-300">HYP</span>}
                      </div>
                    </div>
                    
                    {/* Expression history */}
                    <div className="text-sm text-gray-400 mb-2 h-6 overflow-hidden">
                      {expression || 'Ready to calculate...'}
                    </div>
                    
                    {/* Main display */}
                    <div className="text-2xl sm:text-3xl font-mono text-right mb-2 overflow-hidden break-all">
                      {display}
                    </div>
                  </div>
                </div>

                {/* Mode and Memory Row */}
                <div className="grid grid-cols-6 gap-1 mb-2">
                  <button
                    onClick={() => setAngleMode(angleMode === 'DEG' ? 'RAD' : angleMode === 'RAD' ? 'GRAD' : 'DEG')}
                    className={`${ButtonStyle.mode} py-1 px-2 rounded text-xs font-medium`}
                  >
                    {angleMode}
                  </button>
                  <button
                    onClick={() => setIsInverse(!isInverse)}
                    className={`${isInverse ? ButtonStyle.equals : ButtonStyle.mode} py-1 px-2 rounded text-xs font-medium`}
                  >
                    INV
                  </button>
                  <button
                    onClick={() => setIsHyperbolic(!isHyperbolic)}
                    className={`${isHyperbolic ? ButtonStyle.equals : ButtonStyle.mode} py-1 px-2 rounded text-xs font-medium`}
                  >
                    HYP
                  </button>
                  <button onClick={() => handleMemory('MC')} className={`${ButtonStyle.memory} py-1 px-2 rounded text-xs font-medium`}>
                    MC
                  </button>
                  <button onClick={() => handleMemory('MR')} className={`${ButtonStyle.memory} py-1 px-2 rounded text-xs font-medium`}>
                    MR
                  </button>
                  <button onClick={() => handleMemory('MS')} className={`${ButtonStyle.memory} py-1 px-2 rounded text-xs font-medium`}>
                    MS
                  </button>
                </div>

                {/* Scientific Functions Row 1 */}
                <div className="grid grid-cols-6 gap-1 mb-2">
                  <button onClick={() => handleScientificFunction('sin')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    sin
                  </button>
                  <button onClick={() => handleScientificFunction('cos')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    cos
                  </button>
                  <button onClick={() => handleScientificFunction('tan')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    tan
                  </button>
                  <button onClick={() => handleScientificFunction('log')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    log
                  </button>
                  <button onClick={() => handleScientificFunction('ln')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    ln
                  </button>
                  <button onClick={() => handleScientificFunction('x!')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    x!
                  </button>
                </div>

                {/* Scientific Functions Row 2 */}
                <div className="grid grid-cols-6 gap-1 mb-2">
                  <button onClick={() => handleScientificFunction('10^x')} className={`${ButtonStyle.function} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                    10^x
                  </button>
                  <button onClick={() => handleScientificFunction('e^x')} className={`${ButtonStyle.function} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                    e^x
                  </button>
                  <button onClick={() => handleScientificFunction('√')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    √
                  </button>
                  <button onClick={() => handleScientificFunction('x²')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    x²
                  </button>
                  <button onClick={() => handleScientificFunction('1/x')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    1/x
                  </button>
                  <button onClick={() => inputOperation('yx')} className={`${ButtonStyle.function} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                    y^x
                  </button>
                </div>

                {/* Constants and Clear Row */}
                <div className="grid grid-cols-6 gap-1 mb-2">
                  <button onClick={() => handleScientificFunction('π')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    π
                  </button>
                  <button onClick={() => handleScientificFunction('e')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    e
                  </button>
                  <button onClick={() => handleScientificFunction('abs')} className={`${ButtonStyle.function} py-2 px-2 rounded text-xs font-medium`}>
                    |x|
                  </button>
                  <button onClick={() => handleScientificFunction('±')} className={`${ButtonStyle.operator} py-2 px-2 rounded text-xs font-medium`}>
                    ±
                  </button>
                  <button onClick={clear} className={`${ButtonStyle.clear} py-2 px-2 rounded text-xs font-medium`}>
                    AC
                  </button>
                  <button onClick={() => setDisplay(display.slice(0, -1) || '0')} className={`${ButtonStyle.clear} py-2 px-2 rounded text-xs font-medium`}>
                    DEL
                  </button>
                </div>

              {/* Main Calculator Grid */}
              <div className="grid [grid-template-columns:repeat(4,minmax(0,1fr))] gap-1 w-full mx-auto">
                {/* Row 1 */}
                <button onClick={() => inputNumber('7')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  7
                </button>
                <button onClick={() => inputNumber('8')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  8
                </button>
                <button onClick={() => inputNumber('9')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  9
                </button>
                <button onClick={() => inputOperation('/')} className={`${ButtonStyle.operator} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  ÷
                </button>

                {/* Row 2 */}
                <button onClick={() => inputNumber('4')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  4
                </button>
                <button onClick={() => inputNumber('5')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  5
                </button>
                <button onClick={() => inputNumber('6')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  6
                </button>
                <button onClick={() => inputOperation('*')} className={`${ButtonStyle.operator} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  ×
                </button>

                {/* Row 3 */}
                <button onClick={() => inputNumber('1')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  1
                </button>
                <button onClick={() => inputNumber('2')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  2
                </button>
                <button onClick={() => inputNumber('3')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  3
                </button>
                <button onClick={() => inputOperation('-')} className={`${ButtonStyle.operator} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  −
                </button>

                {/* Row 4 */}
                <button onClick={() => inputNumber('0')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  0
                </button>
                <button onClick={() => inputNumber('.')} className={`${ButtonStyle.number} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  .
                </button>
                <button onClick={() => inputOperation('+')} className={`${ButtonStyle.operator} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  +
                </button>
                <button onClick={handleEqual} className={`${ButtonStyle.equals} min-w-0 leading-tight whitespace-nowrap py-2 px-2 rounded text-xs font-medium`}>
                  =
                </button>
              </div>
                
              {/* Recent Calculations History */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="text-blue-500 mr-2">📜</span>
                  Recent Calculations
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {history.length > 0 ? (
                    history.slice(-5).reverse().map((calc, index) => (
                      <div key={index} className="bg-gray-50 rounded p-2 border border-gray-100">
                        <div className="text-xs font-mono text-gray-700 break-all">
                          {calc}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-3">
                      <div className="text-gray-600 text-xs">No calculations yet</div>
                      <div className="text-xs text-gray-600 mt-1">Start calculating to see your history</div>
                    </div>
                  )}
                </div>
                {history.length > 0 && (
                  <button
                    onClick={() => setHistory([])}
                    className="mt-2 w-full text-xs text-red-600 hover:text-red-800 py-1 px-2 rounded border border-red-200 hover:border-red-300 transition-colors"
                  >
                    Clear History
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Middle Column - Calculator Categories */}
          <div className="col-span-12 lg:col-span-4">
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-700 mb-2">Calculator Categories</h2>
                <p className="text-gray-600 text-sm">Choose from our comprehensive collection of specialized calculators</p>
              </div>

              <div className="grid gap-4 flex-grow">
                {calculatorCategories
                  .filter(category => selectedCategory === 'All Categories' || category.title === selectedCategory)
                  .slice(0, 3)
                  .map((category, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex-grow">
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-lg">{category.icon}</span>
                        </div>
                        <div className="flex-1">
                          <Link href={`/category/${category.slug}`}>
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                              {category.title}
                            </h3>
                          </Link>
                          <p className="text-xs text-gray-500">{category.calculators.length} calculators</p>
                        </div>
                        <Link href={`/category/${category.slug}`} className="text-blue-600 hover:text-blue-800 transition-colors p-3 -m-3" aria-label={`View all ${category.title} calculators`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="sr-only">View all {category.title} calculators</span>
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {category.calculators.slice(0, 6).map((calculator, calcIndex) => (
                          <Link
                            key={calcIndex}
                            href={typeof calculator === 'string' ? '#' : calculator.link}
                            className="group p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:shadow-sm border border-gray-100 hover:border-gray-200 block"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-900 group-hover:text-gray-700">
                                {typeof calculator === 'string' ? calculator : calculator.name}
                              </span>
                              <svg className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        ))}
                      </div>
                      
                      {category.calculators.length > 6 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <Link
                            href={`/category/${category.slug}`}
                            className="inline-block text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors py-2"
                          >
                            View all {category.calculators.length} calculators →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar with Ads */}
          <div className="col-span-12 lg:col-span-4">
            <EzoicAd placementId={EZOIC_PLACEMENTS.HOME_SIDEBAR_TOP} className="mb-6" />
            
            <AdsSidebar 
              hidePopularCalculators={true}
              hideCalculatorStats={true}
              hideCalculationTips={true}
            />
            
            <EzoicAd placementId={EZOIC_PLACEMENTS.HOME_SIDEBAR_BOTTOM} className="mt-6" />
          </div>
        </div>

        {/* Banner Advertisement */}
        <div className="mb-12">
          <EzoicAd placementId={EZOIC_PLACEMENTS.HOME_BANNER} className="text-center" />
        </div>

        {/* Bottom Section - All Calculator Categories */}
        <div className="mt-6 hidden md:block">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-700 mb-2">All Calculator Categories</h2>
              <p className="text-gray-600">Explore our complete collection of specialized calculators</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {calculatorCategories.map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.slug}`}
                  className="group p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {category.calculators.length} tools
                    </p>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}