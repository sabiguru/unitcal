'use client';

import { useState } from 'react';

export default function MorseCodeCalculator() {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const morseCode: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };

  const reverseMorseCode = Object.fromEntries(
    Object.entries(morseCode).map(([key, value]) => [value, key])
  );

  const encodeToMorse = (input: string) => {
    return input.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
  };

  const decodeFromMorse = (input: string) => {
    return input.split(' ').map(code => reverseMorseCode[code] || code).join('');
  };

  const handleConvert = () => {
    if (mode === 'encode') {
      setMorse(encodeToMorse(text));
    } else {
      setText(decodeFromMorse(morse));
    }
  };

  const clear = () => {
    setText('');
    setMorse('');
  };

  const playMorseAudio = () => {
    if (!morse) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const dotDuration = 100;
    const dashDuration = dotDuration * 3;
    const gapDuration = dotDuration;
    const letterGap = dotDuration * 3;
    const wordGap = dotDuration * 7;
    const frequency = 600;

    let currentTime = audioContext.currentTime;

    morse.split('').forEach(symbol => {
      if (symbol === '.') {
        playBeep(audioContext, frequency, currentTime, dotDuration);
        currentTime += (dotDuration + gapDuration) / 1000;
      } else if (symbol === '-') {
        playBeep(audioContext, frequency, currentTime, dashDuration);
        currentTime += (dashDuration + gapDuration) / 1000;
      } else if (symbol === ' ') {
        currentTime += letterGap / 1000;
      } else if (symbol === '/') {
        currentTime += wordGap / 1000;
      }
    });
  };

  const playBeep = (audioContext: AudioContext, frequency: number, startTime: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0.1, startTime + duration - 0.01);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  };

  const commonWords = [
    { text: 'SOS', morse: '... --- ...' },
    { text: 'HELLO', morse: '.... . .-.. .-.. ---' },
    { text: 'WORLD', morse: '.-- --- .-. .-.. -..' },
    { text: 'MORSE', morse: '-- --- .-. ... .' },
    { text: 'CODE', morse: '-.-. --- -.. .' },
    { text: 'HELP', morse: '.... . .-.. .--.' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">📡</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Morse Code Calculator — Text to Morse Code Converter</h1>
          <p className="text-gray-600">Convert text to Morse code and vice versa</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-1">
            <button
              onClick={() => setMode('encode')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'encode'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Text → Morse
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'decode'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Morse → Text
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'encode' ? 'Text Input' : 'Morse Code Input'}
            </label>
            <textarea
              value={mode === 'encode' ? text : morse}
              onChange={(e) => mode === 'encode' ? setText(e.target.value) : setMorse(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder={mode === 'encode' ? 'Enter text to convert to Morse code' : 'Enter Morse code (use dots, dashes, and spaces)'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'encode' ? 'Morse Code Output' : 'Text Output'}
            </label>
            <textarea
              value={mode === 'encode' ? morse : text}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              rows={4}
              placeholder={mode === 'encode' ? 'Morse code will appear here' : 'Decoded text will appear here'}
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleConvert}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Convert
            </button>
            {morse && (
              <button
                onClick={playMorseAudio}
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                🔊 Play
              </button>
            )}
            <button
              onClick={clear}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Words</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commonWords.map((word, index) => (
              <div
                key={index}
                onClick={() => {
                  setText(word.text);
                  setMorse(word.morse);
                  setMode('encode');
                }}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer text-center"
              >
                <div className="font-medium text-gray-900">{word.text}</div>
                <div className="font-mono text-green-600 text-xs mt-1">{word.morse}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}