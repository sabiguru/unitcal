'use client';

import { useState } from 'react';

export default function BrailleTranslatorCalculator() {
  const [input, setInput] = useState('');
  const [conversionType, setConversionType] = useState('text-to-braille');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const brailleMap: { [key: string]: string } = {
    'A': '⠁', 'B': '⠃', 'C': '⠉', 'D': '⠙', 'E': '⠑', 'F': '⠋',
    'G': '⠛', 'H': '⠓', 'I': '⠊', 'J': '⠚', 'K': '⠅', 'L': '⠇',
    'M': '⠍', 'N': '⠝', 'O': '⠕', 'P': '⠏', 'Q': '⠟', 'R': '⠗',
    'S': '⠎', 'T': '⠞', 'U': '⠥', 'V': '⠧', 'W': '⠺', 'X': '⠭',
    'Y': '⠽', 'Z': '⠵', '0': '⠴', '1': '⠂', '2': '⠆', '3': '⠒',
    '4': '⠲', '5': '⠢', '6': '⠖', '7': '⠶', '8': '⠦', '9': '⠔',
    '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', ';': '⠆', ':': '⠒',
    "'": '⠄', '"': '⠐⠂', '-': '⠤', '(': '⠐⠣', ')': '⠐⠜',
    ' ': ' '
  };

  const reverseBrailleMap: { [key: string]: string } = {};
  Object.keys(brailleMap).forEach(key => {
    reverseBrailleMap[brailleMap[key]] = key;
  });

  const textToBraille = (text: string): string => {
    return text
      .toUpperCase()
      .split('')
      .map(char => brailleMap[char] || char)
      .join('');
  };

  const brailleToText = (braille: string): string => {
    return braille
      .split('')
      .map(char => {
        if (char === ' ') return ' ';
        return reverseBrailleMap[char] || '?';
      })
      .join('');
  };

  const convert = () => {
    setError('');
    setResult('');

    if (!input.trim()) {
      setError('Please enter text or Braille to convert');
      return;
    }

    try {
      if (conversionType === 'text-to-braille') {
        const brailleResult = textToBraille(input);
        setResult(brailleResult);
      } else {
        // Validate Braille input
        const validBraillePattern = /^[⠁-⠿\s]*$/;
        if (!validBraillePattern.test(input)) {
          setError('Please enter valid Braille characters');
          return;
        }
        const textResult = brailleToText(input);
        setResult(textResult);
      }
    } catch (err) {
      setError('Conversion error occurred');
    }
  };

  const clear = () => {
    setInput('');
    setResult('');
    setError('');
  };

  const commonWords = [
    { text: 'HELLO', braille: '⠓⠑⠇⠇⠕' },
    { text: 'WORLD', braille: '⠺⠕⠗⠇⠙' },
    { text: 'LOVE', braille: '⠇⠕⠧⠑' },
    { text: 'PEACE', braille: '⠏⠑⠁⠉⠑' },
    { text: 'HELP', braille: '⠓⠑⠇⠏' },
    { text: 'THANK YOU', braille: '⠞⠓⠁⠝⠅ ⠽⠕⠥' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⠃</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Braille Translator</h1>
          <p className="text-gray-600">Convert between text and Braille characters</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setConversionType('text-to-braille')}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  conversionType === 'text-to-braille'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Text → Braille
              </button>
              <button
                onClick={() => setConversionType('braille-to-text')}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  conversionType === 'braille-to-text'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Braille → Text
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {conversionType === 'text-to-braille' ? 'Enter Text' : 'Enter Braille'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              rows={4}
              placeholder={conversionType === 'text-to-braille' ? 'e.g., Hello World' : 'e.g., ⠓⠑⠇⠇⠕ ⠺⠕⠗⠇⠙'}
              style={conversionType === 'braille-to-text' ? { fontSize: '24px', lineHeight: '1.2' } : {}}
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={convert}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Convert
            </button>
            <button
              onClick={clear}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-sm text-green-700 mb-2">Result:</div>
                <div 
                  className="text-lg font-mono bg-white p-4 rounded border text-green-900 break-all"
                  style={conversionType === 'text-to-braille' ? { fontSize: '24px', lineHeight: '1.2' } : {}}
                >
                  {result}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="text-red-800 text-center">{error}</div>
            </div>
          )}
        </div>
      </div>

      {/* Braille Alphabet */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">⠁</span>
          Braille Alphabet
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(brailleMap).slice(0, 26).map(([letter, braille]) => (
            <div key={letter} className="bg-white p-3 rounded-lg flex flex-col items-center">
              <span className="font-bold text-blue-900">{letter}</span>
              <span className="font-mono text-lg text-blue-600">{braille}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Numbers & Punctuation */}
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="text-indigo-600 mr-2">⠼</span>
          Numbers & Punctuation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {Object.entries(brailleMap).slice(26).filter(([char]) => char !== ' ').map(([char, braille]) => (
            <div key={char} className="bg-white p-3 rounded-lg flex flex-col items-center">
              <span className="font-bold text-indigo-900">{char}</span>
              <span className="font-mono text-lg text-indigo-600">{braille}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Examples */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💬</span>
          Common Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonWords.map((word, index) => (
            <div key={index} className="bg-white p-4 rounded-lg">
              <div className="font-bold text-green-900 mb-2">{word.text}</div>
              <div className="font-mono text-xl text-green-600">{word.braille}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About Braille */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">ℹ️</span>
          About Braille
        </h3>
        <div className="bg-white p-4 rounded-lg">
          <p className="text-sm text-purple-800">
            Braille is a tactile writing system invented by Louis Braille in 1824. Each character consists of six raised dots arranged in a 3×2 grid, allowing blind and visually impaired people to read through touch.
          </p>
        </div>
      </div>
    </div>
  );
}