'use client';

import { useState, useCallback } from 'react';

export default function PasswordGeneratorCalculator() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [customSymbols, setCustomSymbols] = useState('');
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);
  const [passwordCount, setPasswordCount] = useState(1);
  const [generationType, setGenerationType] = useState('standard');
  const [memorableWords, setMemorableWords] = useState(4);
  const [separator, setSeparator] = useState('-');
  const [includeNumbers2, setIncludeNumbers2] = useState(true);
  const [analysis, setAnalysis] = useState<any>(null);

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const ambiguousChars = 'il1Lo0O';
  
  const commonWords = [
    'apple', 'beach', 'chair', 'dance', 'eagle', 'flame', 'grape', 'house',
    'ice', 'jazz', 'kite', 'lemon', 'music', 'night', 'ocean', 'peace',
    'quiet', 'river', 'stone', 'tree', 'unity', 'voice', 'water', 'youth',
    'zebra', 'bright', 'calm', 'dream', 'energy', 'forest', 'garden', 'happy'
  ];

  const analyzePassword = useCallback((password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
    
    let score = 0;
    let feedback = [];
    
    // Length scoring
    if (password.length >= 12) score += 25;
    else if (password.length >= 8) score += 15;
    else score += 5;
    
    // Character variety scoring
    if (hasUppercase) score += 15;
    else feedback.push('Add uppercase letters');
    
    if (hasLowercase) score += 15;
    else feedback.push('Add lowercase letters');
    
    if (hasNumbers) score += 15;
    else feedback.push('Add numbers');
    
    if (hasSymbols) score += 20;
    else feedback.push('Add symbols');
    
    // Pattern analysis
    const repeatedChars = password.match(/(.)\1{2,}/g);
    if (repeatedChars) {
      score -= 10;
      feedback.push('Avoid repeated characters');
    }
    
    const sequentialChars = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/i.test(password);
    if (sequentialChars) {
      score -= 15;
      feedback.push('Avoid sequential characters');
    }
    
    // Calculate entropy
    let charsetSize = 0;
    if (hasUppercase) charsetSize += 26;
    if (hasLowercase) charsetSize += 26;
    if (hasNumbers) charsetSize += 10;
    if (hasSymbols) charsetSize += 32;
    
    const entropy = Math.log2(Math.pow(charsetSize, password.length));
    
    let strength = 'Very Weak';
    let strengthColor = 'text-red-600';
    
    if (score >= 80) {
      strength = 'Very Strong';
      strengthColor = 'text-green-600';
    } else if (score >= 60) {
      strength = 'Strong';
      strengthColor = 'text-blue-600';
    } else if (score >= 40) {
      strength = 'Moderate';
      strengthColor = 'text-yellow-600';
    } else if (score >= 20) {
      strength = 'Weak';
      strengthColor = 'text-orange-600';
    }
    
    // Time to crack estimation
    const possibleCombinations = Math.pow(charsetSize, password.length);
    const guessesPerSecond = 1000000000; // 1 billion guesses per second
    const timeSeconds = possibleCombinations / (2 * guessesPerSecond);
    
    let timeToBreak = '';
    if (timeSeconds < 60) {
      timeToBreak = 'Less than a minute';
    } else if (timeSeconds < 3600) {
      timeToBreak = `${Math.round(timeSeconds / 60)} minutes`;
    } else if (timeSeconds < 86400) {
      timeToBreak = `${Math.round(timeSeconds / 3600)} hours`;
    } else if (timeSeconds < 31536000) {
      timeToBreak = `${Math.round(timeSeconds / 86400)} days`;
    } else if (timeSeconds < 31536000000) {
      timeToBreak = `${Math.round(timeSeconds / 31536000)} years`;
    } else {
      timeToBreak = 'Centuries';
    }
    
    return {
      score: Math.min(100, Math.max(0, score)),
      strength,
      strengthColor,
      entropy: Math.round(entropy),
      timeToBreak,
      feedback,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSymbols,
      length: password.length
    };
  }, []);

  const generateStandardPassword = useCallback(() => {
    let charset = '';
    
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) {
      charset += customSymbols || symbolChars;
    }
    
    if (excludeAmbiguous) {
      for (const char of ambiguousChars) {
        charset = charset.replace(new RegExp(char, 'g'), '');
      }
    }
    
    if (charset === '') {
      alert('Please select at least one character type');
      return '';
    }
    
    let password = '';
    
    // Ensure at least one character from each selected type
    if (includeUppercase) password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    if (includeLowercase) password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    if (includeNumbers) password += numberChars[Math.floor(Math.random() * numberChars.length)];
    if (includeSymbols) {
      const symbols = customSymbols || symbolChars;
      password += symbols[Math.floor(Math.random() * symbols.length)];
    }
    
    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeAmbiguous, customSymbols]);

  const generateMemorablePassword = useCallback(() => {
    const selectedWords = [];
    for (let i = 0; i < memorableWords; i++) {
      const word = commonWords[Math.floor(Math.random() * commonWords.length)];
      let processedWord = word;
      
      // Randomly capitalize some words
      if (Math.random() > 0.5) {
        processedWord = word.charAt(0).toUpperCase() + word.slice(1);
      }
      
      selectedWords.push(processedWord);
    }
    
    let password = selectedWords.join(separator);
    
    // Add numbers if enabled
    if (includeNumbers2) {
      password += Math.floor(Math.random() * 100);
    }
    
    return password;
  }, [memorableWords, separator, includeNumbers2]);

  const generatePasswords = () => {
    const passwords = [];
    
    for (let i = 0; i < passwordCount; i++) {
      let password = '';
      
      if (generationType === 'standard') {
        password = generateStandardPassword();
      } else {
        password = generateMemorablePassword();
      }
      
      if (password) {
        passwords.push(password);
      }
    }
    
    setGeneratedPasswords(passwords);
    
    // Analyze the first password
    if (passwords.length > 0) {
      setAnalysis(analyzePassword(passwords[0]));
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Password copied to clipboard!');
    } catch (err) {
      alert('Failed to copy password');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🔐</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Generator</h1>
          <p className="text-gray-600">Generate secure passwords and analyze password strength</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setGenerationType('standard')}
            className={`p-4 rounded-lg border-2 transition-all ${
              generationType === 'standard'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Standard Password
          </button>
          <button
            onClick={() => setGenerationType('memorable')}
            className={`p-4 rounded-lg border-2 transition-all ${
              generationType === 'memorable'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Memorable Password
          </button>
        </div>
      </div>

      {generationType === 'standard' ? (
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Length</label>
              <input
                type="range"
                min="4"
                max="128"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>4</span>
                <span className="font-medium">{length}</span>
                <span>128</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Passwords</label>
              <input
                type="number"
                min="1"
                max="10"
                value={passwordCount}
                onChange={(e) => setPasswordCount(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm">Numbers (0-9)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm">Symbols (!@#$)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={excludeAmbiguous}
                  onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm">Exclude ambiguous characters (il1Lo0O)</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Symbols (optional)</label>
              <input
                type="text"
                value={customSymbols}
                onChange={(e) => setCustomSymbols(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="!@#$%^&*"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Words</label>
              <input
                type="number"
                min="2"
                max="8"
                value={memorableWords}
                onChange={(e) => setMemorableWords(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Separator</label>
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="-">Hyphen (-)</option>
                <option value="_">Underscore (_)</option>
                <option value=".">Period (.)</option>
                <option value="">None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers2}
                  onChange={(e) => setIncludeNumbers2(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm">Add numbers</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={generatePasswords}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Generate Password{passwordCount > 1 ? 's' : ''}
      </button>

      {generatedPasswords.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Generated Passwords</h3>
          {generatedPasswords.map((password, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="font-mono text-lg break-all">{password}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(password)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          ))}

          {analysis && (
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h4 className="text-lg font-semibold text-purple-900 mb-4">Password Analysis</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${analysis.strengthColor}`}>{analysis.strength}</div>
                  <div className="text-sm text-purple-700">Strength</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">{analysis.score}/100</div>
                  <div className="text-sm text-purple-700">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">{analysis.entropy}</div>
                  <div className="text-sm text-purple-700">Entropy (bits)</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-900">{analysis.timeToBreak}</div>
                  <div className="text-sm text-purple-700">Time to break</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Strength Score</span>
                  <span>{analysis.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      analysis.score >= 80 ? 'bg-green-500' :
                      analysis.score >= 60 ? 'bg-blue-500' :
                      analysis.score >= 40 ? 'bg-yellow-500' :
                      analysis.score >= 20 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${analysis.score}%` }}
                  ></div>
                </div>
              </div>

              {analysis.feedback.length > 0 && (
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-purple-900 mb-2">Recommendations</h5>
                  <ul className="space-y-1 text-sm">
                    {analysis.feedback.map((item: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}