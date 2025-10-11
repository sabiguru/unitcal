'use client';

import { useState } from 'react';

export default function LoveCalculator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) {
      return;
    }

    // Clean and prepare names
    const cleanName1 = name1.trim().toLowerCase().replace(/[^a-z]/g, '');
    const cleanName2 = name2.trim().toLowerCase().replace(/[^a-z]/g, '');
    
    if (!cleanName1 || !cleanName2) {
      return;
    }

    // FLAMES algorithm implementation
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    const meanings = {
      'F': 'Friends',
      'L': 'Lovers',
      'A': 'Affection',
      'M': 'Marriage',
      'E': 'Enemies',
      'S': 'Siblings'
    };

    // Count common letters and remove them
    let str1 = cleanName1.split('');
    let str2 = cleanName2.split('');
    
    // Remove common characters
    for (let i = 0; i < str1.length; i++) {
      for (let j = 0; j < str2.length; j++) {
        if (str1[i] === str2[j]) {
          str1[i] = '';
          str2[j] = '';
          break;
        }
      }
    }
    
    // Count remaining characters
    const remainingCount = str1.filter(c => c !== '').length + str2.filter(c => c !== '').length;
    
    // Calculate FLAMES result
    let flamesArray = [...flames];
    let index = 0;
    
    while (flamesArray.length > 1) {
      index = (index + remainingCount - 1) % flamesArray.length;
      flamesArray.splice(index, 1);
      if (index === flamesArray.length) {
        index = 0;
      }
    }
    
    const flamesResult = flamesArray[0];
    
    // Calculate love percentage using a different method
    let loveScore = 0;
    const combined = (cleanName1 + cleanName2).split('');
    
    // Sum ASCII values and apply some fun calculations
    for (let char of combined) {
      loveScore += char.charCodeAt(0);
    }
    
    // Normalize to percentage (0-100)
    const percentage = ((loveScore % 101) + Math.abs((cleanName1.length - cleanName2.length) * 7)) % 101;
    
    // Ensure percentage is at least 1
    const finalPercentage = Math.max(1, percentage);
    
    // Generate compatibility message based on percentage
    let compatibilityLevel = '';
    let message = '';
    let color = '';
    
    if (finalPercentage >= 80) {
      compatibilityLevel = 'Excellent';
      message = 'You two are made for each other! Perfect match!';
      color = 'green';
    } else if (finalPercentage >= 60) {
      compatibilityLevel = 'Very Good';
      message = 'Great compatibility! You complement each other well.';
      color = 'green';
    } else if (finalPercentage >= 40) {
      compatibilityLevel = 'Good';
      message = 'Good potential! With effort, this could work beautifully.';
      color = 'yellow';
    } else if (finalPercentage >= 20) {
      compatibilityLevel = 'Fair';
      message = 'Some challenges ahead, but love conquers all!';
      color = 'orange';
    } else {
      compatibilityLevel = 'Challenging';
      message = 'Opposites attract! Sometimes different is exactly what we need.';
      color = 'red';
    }

    // Fun facts based on names
    const funFacts = [
      `Your names together have ${combined.length} letters`,
      `Common starting letter: ${cleanName1[0] === cleanName2[0] ? 'Yes!' : 'No, but that\'s unique!'}`,
      `Name length difference: ${Math.abs(cleanName1.length - cleanName2.length)} letters`,
      `Most common letter: ${getMostCommonLetter(combined)}`
    ];

    setResult({
      percentage: finalPercentage,
      flames: flamesResult,
      flamesMessage: meanings[flamesResult as keyof typeof meanings],
      compatibilityLevel,
      message,
      color,
      funFacts,
      name1: name1.trim(),
      name2: name2.trim()
    });
  };

  const getMostCommonLetter = (letters: string[]) => {
    const frequency: { [key: string]: number } = {};
    letters.forEach(letter => {
      frequency[letter] = (frequency[letter] || 0) + 1;
    });
    
    let maxCount = 0;
    let mostCommon = '';
    
    Object.entries(frequency).forEach(([letter, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = letter.toUpperCase();
      }
    });
    
    return mostCommon || 'None';
  };

  const clear = () => {
    setName1('');
    setName2('');
    setResult(null);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'orange':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'red':
        return 'bg-red-50 border-red-200 text-red-900';
      default:
        return 'bg-pink-50 border-pink-200 text-pink-900';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">❤️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Love Calculator</h1>
          <p className="text-gray-600">Discover your love compatibility and relationship potential</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Names</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Person's Name</label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
              placeholder="e.g., Alex"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Second Person's Name</label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
              placeholder="e.g., Jordan"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={calculateLove}
            disabled={!name1.trim() || !name2.trim()}
            className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            💕 Calculate Love
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-6">
            {/* Love Percentage */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="text-white text-2xl font-bold">
                    {result.percentage}%
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 text-2xl">💖</div>
                <div className="absolute -bottom-2 -left-2 text-2xl">✨</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {result.name1} ❤️ {result.name2}
              </h3>
              <p className="text-lg text-gray-600">
                Love Compatibility: <span className="font-semibold text-pink-600">{result.compatibilityLevel}</span>
              </p>
            </div>

            {/* FLAMES Result */}
            <div className={`rounded-xl p-6 border ${getColorClasses(result.color)}`}>
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">
                  FLAMES Result: {result.flames} - {result.flamesMessage}
                </h4>
                <p className="text-sm">{result.message}</p>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Fun Facts About Your Names</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.funFacts.map((fact: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-pink-500">•</span>
                    <span className="text-sm text-gray-700">{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Love Tips */}
            <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
              <h4 className="text-lg font-semibold text-pink-900 mb-3">💝 Love Tips</h4>
              <div className="space-y-2 text-sm text-pink-800">
                <div>• Communication is key to any successful relationship</div>
                <div>• Respect each other's differences and embrace uniqueness</div>
                <div>• Remember that compatibility grows with understanding and effort</div>
                <div>• Have fun together and create beautiful memories</div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}