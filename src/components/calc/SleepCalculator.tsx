'use client';

import { useState } from 'react';

interface SleepResult {
  sleepTimes: string[];
  recommendations: string[];
  sleepDuration?: number;
  sleepQuality?: string;
}

export default function SleepCalculator() {
  const [age, setAge] = useState<string>('');
  const [wakeTime, setWakeTime] = useState<string>('');
  const [bedTime, setBedTime] = useState<string>('');
  const [calculationType, setCalculationType] = useState<'bedtime' | 'waketime' | 'analyze'>('bedtime');
  const [result, setResult] = useState<SleepResult | null>(null);

  const getRecommendedSleep = (ageNum: number): { min: number; max: number; optimal: number } => {
    if (ageNum <= 2) return { min: 11, max: 17, optimal: 14 };
    if (ageNum <= 5) return { min: 10, max: 13, optimal: 11.5 };
    if (ageNum <= 13) return { min: 9, max: 11, optimal: 10 };
    if (ageNum <= 17) return { min: 8, max: 10, optimal: 9 };
    if (ageNum <= 25) return { min: 7, max: 9, optimal: 8 };
    if (ageNum <= 64) return { min: 7, max: 9, optimal: 8 };
    return { min: 7, max: 8, optimal: 7.5 };
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const calculateSleepCycles = (baseTime: Date, isWakeTime: boolean): string[] => {
    const cycleDuration = 90; // minutes
    const fallAsleepTime = 15; // minutes to fall asleep
    const cycles = [4, 5, 6]; // recommended sleep cycles
    
    const sleepTimes: string[] = [];
    
    cycles.forEach(cycleCount => {
      const totalSleepMinutes = cycleCount * cycleDuration;
      const totalTimeNeeded = totalSleepMinutes + fallAsleepTime;
      
      let calculatedTime: Date;
      if (isWakeTime) {
        calculatedTime = new Date(baseTime.getTime() - totalTimeNeeded * 60000);
      } else {
        calculatedTime = new Date(baseTime.getTime() + totalTimeNeeded * 60000);
      }
      
      const hours = totalSleepMinutes / 60;
      sleepTimes.push(`${formatTime(calculatedTime)} (${hours}h - ${cycleCount} cycles)`);
    });
    
    return sleepTimes;
  };

  const calculateSleep = () => {
    if (calculationType === 'bedtime' && wakeTime) {
      const [hours, minutes] = wakeTime.split(':').map(Number);
      const wakeDate = new Date();
      wakeDate.setHours(hours, minutes, 0, 0);
      
      const sleepTimes = calculateSleepCycles(wakeDate, true);
      const ageNum = parseInt(age);
      const recommended = ageNum ? getRecommendedSleep(ageNum) : null;
      
      const recommendations = [
        'Go to bed 15 minutes before these times to account for falling asleep',
        'Avoid screens 1 hour before bedtime',
        'Keep your bedroom cool (60-67°F) and dark'
      ];
      
      if (recommended) {
        recommendations.push(`For your age, aim for ${recommended.min}-${recommended.max} hours of sleep`);
      }
      
      setResult({ sleepTimes, recommendations });
      
    } else if (calculationType === 'waketime' && bedTime) {
      const [hours, minutes] = bedTime.split(':').map(Number);
      const bedDate = new Date();
      bedDate.setHours(hours, minutes, 0, 0);
      
      const sleepTimes = calculateSleepCycles(bedDate, false);
      
      const recommendations = [
        'These times account for 15 minutes to fall asleep',
        'Set multiple alarms if you have trouble waking up',
        'Expose yourself to bright light immediately upon waking'
      ];
      
      setResult({ sleepTimes, recommendations });
      
    } else if (calculationType === 'analyze' && bedTime && wakeTime) {
      const [bedHours, bedMinutes] = bedTime.split(':').map(Number);
      const [wakeHours, wakeMinutes] = wakeTime.split(':').map(Number);
      
      const bedDate = new Date();
      bedDate.setHours(bedHours, bedMinutes, 0, 0);
      
      const wakeDate = new Date();
      wakeDate.setHours(wakeHours, wakeMinutes, 0, 0);
      
      if (wakeDate < bedDate) {
        wakeDate.setDate(wakeDate.getDate() + 1);
      }
      
      const sleepDuration = (wakeDate.getTime() - bedDate.getTime()) / (1000 * 60 * 60);
      const ageNum = parseInt(age);
      const recommended = ageNum ? getRecommendedSleep(ageNum) : null;
      
      let sleepQuality = 'Good';
      if (recommended) {
        if (sleepDuration < recommended.min) sleepQuality = 'Too Short';
        else if (sleepDuration > recommended.max) sleepQuality = 'Too Long';
        else sleepQuality = 'Optimal';
      }
      
      const recommendations = [
        `You're getting ${sleepDuration.toFixed(1)} hours of sleep`,
        sleepQuality === 'Optimal' ? 'Your sleep duration is in the optimal range' : 
        sleepQuality === 'Too Short' ? 'Consider going to bed earlier or waking up later' :
        'You might be oversleeping, which can affect sleep quality'
      ];
      
      if (recommended) {
        recommendations.push(`Recommended for your age: ${recommended.min}-${recommended.max} hours`);
      }
      
      setResult({ 
        sleepTimes: [`${sleepDuration.toFixed(1)} hours of sleep`], 
        recommendations,
        sleepDuration,
        sleepQuality 
      });
    }
  };

  const clear = () => {
    setAge('');
    setWakeTime('');
    setBedTime('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">😴</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sleep Calculator — Sleep Cycle & Bedtime Calculator</h1>
          <p className="text-gray-600">Calculate optimal bedtime and wake time based on sleep cycles</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          {/* Calculator Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setCalculationType('bedtime')}
          className={`p-4 rounded-lg border-2 transition-all ${
            calculationType === 'bedtime'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          Find Bedtime
        </button>
        <button
          onClick={() => setCalculationType('waketime')}
          className={`p-4 rounded-lg border-2 transition-all ${
            calculationType === 'waketime'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          Find Wake Time
        </button>
        <button
          onClick={() => setCalculationType('analyze')}
          className={`p-4 rounded-lg border-2 transition-all ${
            calculationType === 'analyze'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          Analyze Sleep
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age (optional)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="25"
          />
        </div>

        {(calculationType === 'bedtime' || calculationType === 'analyze') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Wake Up Time</label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        )}

        {(calculationType === 'waketime' || calculationType === 'analyze') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bed Time</label>
            <input
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={calculateSleep}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
        >
          Clear
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">
              {calculationType === 'analyze' ? 'Sleep Analysis' : 'Recommended Times'}
            </h3>
            <div className="space-y-2">
              {result.sleepTimes.map((time, index) => (
                <div key={index} className="text-indigo-800 font-medium">
                  {time}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Sleep Tips</h3>
            <div className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-blue-800">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
        </div>
      </div>

      {/* Sleep Cycles Science */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">🧠</span>
          Sleep Cycles Science
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Complete Cycle</div>
            <div className="text-sm text-purple-700">90 minutes average</div>
            <div className="text-xs text-purple-600 mt-1">NREM + REM stages</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">Optimal Cycles</div>
            <div className="text-sm text-purple-700">4-6 complete cycles</div>
            <div className="text-xs text-purple-600 mt-1">6-9 hours total sleep</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">NREM Sleep</div>
            <div className="text-sm text-purple-700">75% of sleep time</div>
            <div className="text-xs text-purple-600 mt-1">Physical restoration</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-900 mb-2">REM Sleep</div>
            <div className="text-sm text-purple-700">25% of sleep time</div>
            <div className="text-xs text-purple-600 mt-1">Memory consolidation</div>
          </div>
        </div>
      </div>

      {/* Age-Based Sleep Recommendations */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-blue-600 mr-2">👶</span>
          Sleep Needs by Age
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Infants (0-2 years)</div>
            <div className="text-sm text-blue-700">11-17 hours</div>
            <div className="text-xs text-blue-600 mt-1">Including naps</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Children (3-13 years)</div>
            <div className="text-sm text-blue-700">9-11 hours</div>
            <div className="text-xs text-blue-600 mt-1">Growth and development</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Teens (14-17 years)</div>
            <div className="text-sm text-blue-700">8-10 hours</div>
            <div className="text-xs text-blue-600 mt-1">Brain development</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Adults (18-64 years)</div>
            <div className="text-sm text-blue-700">7-9 hours</div>
            <div className="text-xs text-blue-600 mt-1">Optimal performance</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-blue-900 mb-2">Seniors (65+ years)</div>
            <div className="text-sm text-blue-700">7-8 hours</div>
            <div className="text-xs text-blue-600 mt-1">Quality over quantity</div>
          </div>
        </div>
      </div>

      {/* Sleep Hygiene Tips */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <span className="text-green-600 mr-2">💡</span>
          Sleep Hygiene Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Consistent sleep schedule, even on weekends</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Cool, dark, and quiet bedroom (60-67°F)</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• No screens 1 hour before bedtime</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Avoid caffeine 6 hours before sleep</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Regular exercise, but not close to bedtime</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-green-800">• Comfortable mattress and pillows</div>
          </div>
        </div>
      </div>
    </div>
  );
}