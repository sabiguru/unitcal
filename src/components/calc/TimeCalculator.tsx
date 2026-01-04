'use client';

import { useState } from 'react';

export default function TimeCalculator() {
  const [calculationType, setCalculationType] = useState('add');
  const [time1Hours, setTime1Hours] = useState('');
  const [time1Minutes, setTime1Minutes] = useState('');
  const [time1Seconds, setTime1Seconds] = useState('');
  const [time2Hours, setTime2Hours] = useState('');
  const [time2Minutes, setTime2Minutes] = useState('');
  const [time2Seconds, setTime2Seconds] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [results, setResults] = useState<any>(null);

  const timeToSeconds = (hours: number, minutes: number, seconds: number): number => {
    return hours * 3600 + minutes * 60 + seconds;
  };

  const secondsToTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  };

  const formatTime = (hours: number, minutes: number, seconds: number): string => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateTime = () => {
    if (calculationType === 'add' || calculationType === 'subtract') {
      const h1 = parseInt(time1Hours) || 0;
      const m1 = parseInt(time1Minutes) || 0;
      const s1 = parseInt(time1Seconds) || 0;
      const h2 = parseInt(time2Hours) || 0;
      const m2 = parseInt(time2Minutes) || 0;
      const s2 = parseInt(time2Seconds) || 0;

      const seconds1 = timeToSeconds(h1, m1, s1);
      const seconds2 = timeToSeconds(h2, m2, s2);

      let resultSeconds: number;
      if (calculationType === 'add') {
        resultSeconds = seconds1 + seconds2;
      } else {
        resultSeconds = Math.abs(seconds1 - seconds2);
      }

      const resultTime = secondsToTime(resultSeconds);
      const formatted = formatTime(resultTime.hours, resultTime.minutes, resultTime.seconds);

      setResults({
        type: calculationType === 'add' ? 'Addition' : 'Subtraction',
        result: formatted,
        totalSeconds: resultSeconds,
        breakdown: resultTime,
        time1: formatTime(h1, m1, s1),
        time2: formatTime(h2, m2, s2)
      });
    } else if (calculationType === 'difference') {
      if (!startTime || !endTime) return;

      const start = new Date(`2000-01-01T${startTime}:00`);
      const end = new Date(`2000-01-01T${endTime}:00`);
      
      // Handle crossing midnight
      if (end < start) {
        end.setDate(end.getDate() + 1);
      }

      const diffMs = end.getTime() - start.getTime();
      const diffSeconds = Math.floor(diffMs / 1000);
      const diffTime = secondsToTime(diffSeconds);
      
      const formatted = formatTime(diffTime.hours, diffTime.minutes, diffTime.seconds);

      // Calculate additional information
      const totalMinutes = Math.floor(diffSeconds / 60);
      const totalHours = diffSeconds / 3600;

      setResults({
        type: 'Time Difference',
        result: formatted,
        totalSeconds: diffSeconds,
        totalMinutes: totalMinutes,
        totalHours: totalHours,
        breakdown: diffTime,
        startTime: startTime,
        endTime: endTime,
        crossesMidnight: end.getDate() > start.getDate()
      });
    }
  };

  const convertTime = (totalSeconds: number) => {
    return {
      totalMinutes: Math.floor(totalSeconds / 60),
      totalHours: (totalSeconds / 3600).toFixed(2),
      totalDays: (totalSeconds / 86400).toFixed(3),
      totalWeeks: (totalSeconds / 604800).toFixed(4)
    };
  };

  const getTimeExamples = () => [
    { description: 'Standard Work Day', time: '08:00:00' },
    { description: 'Half Work Day', time: '04:00:00' },
    { description: 'Lunch Break', time: '01:00:00' },
    { description: 'Movie Length', time: '02:30:00' },
    { description: 'Quick Meeting', time: '00:30:00' },
    { description: 'Coffee Break', time: '00:15:00' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⏰</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Time Calculator — Add, Subtract & Convert Time</h1>
          <p className="text-gray-600">Add, subtract, and calculate time differences with hours, minutes, and seconds</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCalculationType('add')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'add'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Add Time
          </button>
          <button
            onClick={() => setCalculationType('subtract')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'subtract'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Subtract Time
          </button>
          <button
            onClick={() => setCalculationType('difference')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'difference'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Time Difference
          </button>
        </div>
      </div>

      {calculationType === 'difference' ? (
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">First Time</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Hours</label>
                <input
                  type="number"
                  min="0"
                  value={time1Hours}
                  onChange={(e) => setTime1Hours(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={time1Minutes}
                  onChange={(e) => setTime1Minutes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={time1Seconds}
                  onChange={(e) => setTime1Seconds(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Second Time</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Hours</label>
                <input
                  type="number"
                  min="0"
                  value={time2Hours}
                  onChange={(e) => setTime2Hours(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={time2Minutes}
                  onChange={(e) => setTime2Minutes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={time2Seconds}
                  onChange={(e) => setTime2Seconds(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={calculateTime}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">{results.type} Result</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {results.result}
              </div>
              <div className="text-sm text-blue-700">
                {results.breakdown.hours} hours, {results.breakdown.minutes} minutes, {results.breakdown.seconds} seconds
              </div>
              {results.crossesMidnight && (
                <div className="text-xs text-blue-600 mt-2">
                  * Time difference crosses midnight
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Seconds:</span>
                  <span className="font-medium">{results.totalSeconds.toLocaleString()}</span>
                </div>
                {results.totalMinutes && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Minutes:</span>
                    <span className="font-medium">{results.totalMinutes.toLocaleString()}</span>
                  </div>
                )}
                {results.totalHours && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hours:</span>
                    <span className="font-medium">{results.totalHours}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Conversions</h3>
              <div className="space-y-3">
                {results.totalSeconds > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-purple-800">Minutes:</span>
                      <span className="font-medium text-purple-900">
                        {convertTime(results.totalSeconds).totalMinutes}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-800">Hours:</span>
                      <span className="font-medium text-purple-900">
                        {convertTime(results.totalSeconds).totalHours}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-800">Days:</span>
                      <span className="font-medium text-purple-900">
                        {convertTime(results.totalSeconds).totalDays}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {(results.time1 && results.time2) && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Summary</h3>
              <div className="text-center">
                <div className="text-lg">
                  <span className="font-medium">{results.time1}</span>
                  <span className="mx-4 text-gray-500">
                    {results.type === 'Addition' ? '+' : '−'}
                  </span>
                  <span className="font-medium">{results.time2}</span>
                  <span className="mx-4 text-gray-500">=</span>
                  <span className="font-bold text-blue-600">{results.result}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">Common Time Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {getTimeExamples().map((example, index) => (
            <div key={index} className="text-sm">
              <div className="font-medium text-yellow-900">{example.description}</div>
              <div className="text-yellow-700 font-mono">{example.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}