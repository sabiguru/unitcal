'use client';

import { useState } from 'react';

export default function PrimeCalculator() {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [factors, setFactors] = useState<number[]>([]);
  const [primes, setPrimes] = useState<number[]>([]);
  const [calculationType, setCalculationType] = useState<'check' | 'factors' | 'generate'>('check');

  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const getPrimeFactors = (n: number): number[] => {
    const factors: number[] = [];
    let divisor = 2;
    
    while (n > 1) {
      while (n % divisor === 0) {
        factors.push(divisor);
        n = n / divisor;
      }
      divisor++;
      if (divisor * divisor > n && n > 1) {
        factors.push(n);
        break;
      }
    }
    return factors;
  };

  const generatePrimes = (limit: number): number[] => {
    const primes: number[] = [];
    for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }
    return primes;
  };

  const checkPrime = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 1) {
      setResult('Please enter a valid positive number');
      return;
    }
    
    const prime = isPrime(num);
    setResult(`${num} is ${prime ? '' : 'NOT '}a prime number`);
    setFactors([]);
    setPrimes([]);
  };

  const calculateFactors = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 1) {
      setResult('Please enter a valid positive number');
      return;
    }
    
    const primeFactors = getPrimeFactors(num);
    setFactors(primeFactors);
    setResult(`Prime factors of ${num}:`);
    setPrimes([]);
  };

  const generatePrimeList = () => {
    const limit = parseInt(number);
    if (isNaN(limit) || limit < 2 || limit > 1000) {
      setResult('Please enter a number between 2 and 1000');
      return;
    }
    
    const primeList = generatePrimes(limit);
    setPrimes(primeList);
    setResult(`Prime numbers up to ${limit} (${primeList.length} found):`);
    setFactors([]);
  };

  const calculate = () => {
    switch (calculationType) {
      case 'check':
        checkPrime();
        break;
      case 'factors':
        calculateFactors();
        break;
      case 'generate':
        generatePrimeList();
        break;
    }
  };

  const clear = () => {
    setNumber('');
    setResult('');
    setFactors([]);
    setPrimes([]);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🔢</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prime Number Calculator — Prime Check & Factorization Tool</h1>
          <p className="text-gray-600">Check if numbers are prime and find prime factorizations</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      
      {/* Display */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-4 text-white">
          <div className="text-sm text-gray-400 mb-2 h-6">
            {result || ' '}
          </div>
          <div className="text-lg font-mono">
            {factors.length > 0 && (
              <div className="text-blue-400">
                {factors.join(' × ')}
              </div>
            )}
            {primes.length > 0 && (
              <div className="text-green-400 max-h-32 overflow-y-auto">
                {primes.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calculation Type Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Calculation Type</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setCalculationType('check')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'check'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Prime Check
          </button>
          <button
            onClick={() => setCalculationType('factors')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'factors'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Prime Factors
          </button>
          <button
            onClick={() => setCalculationType('generate')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              calculationType === 'generate'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Generate Primes
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {calculationType === 'check' ? 'Number to Check' : 
           calculationType === 'factors' ? 'Number to Factor' : 
           'Generate Primes up to'}
        </label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={calculationType === 'generate' ? 'Max 1000' : 'Enter a number'}
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
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