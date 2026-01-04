'use client';

import { useState } from 'react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [calculationType, setCalculationType] = useState('current');
  const [results, setResults] = useState<any>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = calculationType === 'current' ? new Date() : new Date(targetDate);
    
    if (!target || target < birth) return;

    // Calculate exact age
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total time periods
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Calculate next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    // Day of week born
    const dayOfWeekBorn = birth.toLocaleDateString('en-US', { weekday: 'long' });

    // Age milestones
    const milestones: Array<{age: number, date: string, description: string}> = [];
    
    // Check for completed milestones
    const milestoneAges = [1, 5, 10, 13, 16, 18, 21, 25, 30, 40, 50, 65, 75, 100];
    milestoneAges.forEach(age => {
      const milestoneDate = new Date(birth.getFullYear() + age, birth.getMonth(), birth.getDate());
      if (milestoneDate <= target) {
        milestones.push({
          age: age,
          date: milestoneDate.toLocaleDateString(),
          description: getMilestoneDescription(age)
        });
      }
    });

    // Next milestone
    const nextMilestone = milestoneAges.find(age => {
      const milestoneDate = new Date(birth.getFullYear() + age, birth.getMonth(), birth.getDate());
      return milestoneDate > target;
    });

    let nextMilestoneInfo = null;
    if (nextMilestone) {
      const milestoneDate = new Date(birth.getFullYear() + nextMilestone, birth.getMonth(), birth.getDate());
      const daysToMilestone = Math.ceil((milestoneDate.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
      nextMilestoneInfo = {
        age: nextMilestone,
        date: milestoneDate.toLocaleDateString(),
        daysUntil: daysToMilestone,
        description: getMilestoneDescription(nextMilestone)
      };
    }

    // Fun facts
    const heartBeats = Math.floor(totalMinutes * 72); // Average 72 beats per minute
    const breathsTaken = Math.floor(totalMinutes * 15); // Average 15 breaths per minute

    setResults({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToNextBirthday,
      nextBirthday: nextBirthday.toLocaleDateString(),
      dayOfWeekBorn,
      milestones,
      nextMilestone: nextMilestoneInfo,
      heartBeats,
      breathsTaken,
      birthDate: birth.toLocaleDateString(),
      targetDate: target.toLocaleDateString()
    });
  };

  const getMilestoneDescription = (age: number): string => {
    const descriptions: { [key: number]: string } = {
      1: 'First birthday!',
      5: 'Started kindergarten age',
      10: 'Double digits!',
      13: 'Became a teenager',
      16: 'Sweet sixteen',
      18: 'Legal adult',
      21: 'Legal drinking age (US)',
      25: 'Quarter century',
      30: 'The big 3-0',
      40: 'Life begins at 40',
      50: 'Half a century',
      65: 'Traditional retirement age',
      75: 'Senior milestone',
      100: 'Centenarian!'
    };
    return descriptions[age] || 'Special milestone';
  };

  const getAgeCategory = (years: number): string => {
    if (years < 1) return 'Infant';
    if (years < 3) return 'Toddler';
    if (years < 13) return 'Child';
    if (years < 20) return 'Teenager';
    if (years < 40) return 'Young Adult';
    if (years < 65) return 'Adult';
    return 'Senior';
  };

  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🎂</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Age Calculator — Calculate Exact Age in Years, Months & Days</h1>
          <p className="text-gray-600">Calculate your exact age and discover interesting facts about your life</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setCalculationType('current')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'current'
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Current Age
          </button>
          <button
            onClick={() => setCalculationType('specific')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'specific'
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Age on Specific Date
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {calculationType === 'specific' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      <button
        onClick={calculateAge}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Age
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Your Age</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-900">{results.years}</div>
                <div className="text-sm text-indigo-700">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-900">{results.months}</div>
                <div className="text-sm text-indigo-700">Months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-900">{results.days}</div>
                <div className="text-sm text-indigo-700">Days</div>
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="text-lg font-semibold text-indigo-900">
                You are in the "{getAgeCategory(results.years)}" life stage
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="font-bold text-indigo-900">{results.totalDays.toLocaleString()}</div>
                <div className="text-indigo-700">Total Days</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="font-bold text-indigo-900">{results.totalWeeks.toLocaleString()}</div>
                <div className="text-indigo-700">Total Weeks</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="font-bold text-indigo-900">{results.totalMonths}</div>
                <div className="text-indigo-700">Total Months</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="font-bold text-indigo-900">{formatLargeNumber(results.totalHours)}</div>
                <div className="text-indigo-700">Total Hours</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Birthday Information</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>You were born on:</span>
                  <span className="font-medium">{results.dayOfWeekBorn}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next birthday:</span>
                  <span className="font-medium">{results.nextBirthday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Days until birthday:</span>
                  <span className="font-medium">{results.daysToNextBirthday}</span>
                </div>
              </div>
            </div>

          </div>

          {results.nextMilestone && (
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-3">Next Milestone</h4>
              <div className="text-sm">
                <div className="mb-2">
                  <span className="text-yellow-700">Your {results.nextMilestone.age}th birthday</span>
                  <span className="mx-2">•</span>
                  <span className="text-yellow-700">{results.nextMilestone.description}</span>
                </div>
                <div className="font-medium text-yellow-900">
                  {results.nextMilestone.daysUntil} days until {results.nextMilestone.date}
                </div>
              </div>
            </div>
          )}

          {results.milestones.length > 0 && (
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Milestones Reached</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {results.milestones.slice(-6).map((milestone: {age: number, date: string, description: string}, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="font-medium">Age {milestone.age}</div>
                    <div className="text-gray-600">{milestone.description}</div>
                    <div className="text-xs text-gray-500">{milestone.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      </div>

      {/* Life Stages */}
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="text-indigo-600 mr-2">📅</span>
          Life Stages
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">Infant</span>
            <span className="text-indigo-600 text-sm">0-1 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">Toddler</span>
            <span className="text-indigo-600 text-sm">1-3 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">Child</span>
            <span className="text-indigo-600 text-sm">3-13 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">Teenager</span>
            <span className="text-indigo-600 text-sm">13-20 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">Young Adult</span>
            <span className="text-indigo-600 text-sm">20-40 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">Adult</span>
            <span className="text-indigo-600 text-sm">40-65 years</span>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col items-center">
            <span className="font-bold text-indigo-900">Senior</span>
            <span className="text-indigo-600 text-sm">65+ years</span>
          </div>
        </div>
      </div>

      {/* Interesting Facts */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Did You Know?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• Your heart beats about 100,000 times per day</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• You take approximately 20,000 breaths daily</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• The average human lifespan is about 700,000 hours</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-purple-800">• You'll spend about 1/3 of your life sleeping</div>
          </div>
        </div>
      </div>
    </div>
  );
}