'use client';

import { useState } from 'react';

export default function DateCalculator() {
  const [calculationType, setCalculationType] = useState('add');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [days, setDays] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateDate = () => {
    if (!startDate) return;

    const start = new Date(startDate);
    
    if (calculationType === 'add' || calculationType === 'subtract') {
      const yearsNum = parseInt(years) || 0;
      const monthsNum = parseInt(months) || 0;
      const daysNum = parseInt(days) || 0;

      const result = new Date(start);
      
      if (calculationType === 'add') {
        result.setFullYear(result.getFullYear() + yearsNum);
        result.setMonth(result.getMonth() + monthsNum);
        result.setDate(result.getDate() + daysNum);
      } else {
        result.setFullYear(result.getFullYear() - yearsNum);
        result.setMonth(result.getMonth() - monthsNum);
        result.setDate(result.getDate() - daysNum);
      }

      const dayOfWeek = result.toLocaleDateString('en-US', { weekday: 'long' });
      const formattedDate = result.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      setResults({
        type: calculationType === 'add' ? 'Date Addition' : 'Date Subtraction',
        resultDate: result.toISOString().split('T')[0],
        formattedDate: formattedDate,
        dayOfWeek: dayOfWeek,
        isWeekend: result.getDay() === 0 || result.getDay() === 6,
        weekNumber: getWeekNumber(result),
        dayOfYear: getDayOfYear(result),
        quarter: getQuarter(result),
        isLeapYear: isLeapYear(result.getFullYear())
      });
    } else if (calculationType === 'difference') {
      if (!endDate) return;

      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Calculate exact difference
      let yearDiff = end.getFullYear() - start.getFullYear();
      let monthDiff = end.getMonth() - start.getMonth();
      let dayDiff = end.getDate() - start.getDate();

      if (dayDiff < 0) {
        monthDiff--;
        const daysInPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
        dayDiff += daysInPrevMonth;
      }

      if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
      }

      const weeksDiff = Math.floor(diffDays / 7);
      const businessDays = calculateBusinessDays(start, end);

      setResults({
        type: 'Date Difference',
        totalDays: diffDays,
        totalWeeks: weeksDiff,
        exactYears: yearDiff,
        exactMonths: monthDiff,
        exactDays: dayDiff,
        businessDays: businessDays,
        weekendDays: diffDays - businessDays,
        startDate: start.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        endDate: end.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      });
    }
  };

  const calculateBusinessDays = (start: Date, end: Date): number => {
    let businessDays = 0;
    const current = new Date(start);
    
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return businessDays;
  };

  const getWeekNumber = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  };

  const getDayOfYear = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getQuarter = (date: Date): number => {
    return Math.floor((date.getMonth() / 3)) + 1;
  };

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">📅</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Date Calculator — Date Difference & Duration Calculator</h1>
          <p className="text-gray-600">Add, subtract, or find the difference between dates</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCalculationType('add')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'add'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Add Time
          </button>
          <button
            onClick={() => setCalculationType('subtract')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'subtract'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Subtract Time
          </button>
          <button
            onClick={() => setCalculationType('difference')}
            className={`p-4 rounded-lg border-2 transition-all ${
              calculationType === 'difference'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Find Difference
          </button>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {calculationType === 'difference' ? 'Start Date' : 'Date'}
          </label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              onClick={() => setStartDate(getToday())}
              className="px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        {calculationType === 'difference' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time to {calculationType === 'add' ? 'Add' : 'Subtract'}
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Years</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Months</label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Days</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={calculateDate}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">{results.type}</h3>
            
            {results.type === 'Date Difference' ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-900">{results.totalDays}</div>
                    <div className="text-sm text-emerald-700">Total Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-900">{results.totalWeeks}</div>
                    <div className="text-sm text-emerald-700">Total Weeks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-900">
                      {results.exactYears}y {results.exactMonths}m {results.exactDays}d
                    </div>
                    <div className="text-sm text-emerald-700">Exact Time</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-900 mb-3">Date Range</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">From:</span>
                        <span className="ml-2 font-medium">{results.startDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">To:</span>
                        <span className="ml-2 font-medium">{results.endDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-900 mb-3">Business Days</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Business days:</span>
                        <span className="font-medium">{results.businessDays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weekend days:</span>
                        <span className="font-medium">{results.weekendDays}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-emerald-900 mb-2">
                    {results.formattedDate}
                  </div>
                  <div className="text-lg text-emerald-700">{results.dayOfWeek}</div>
                  {results.isWeekend && (
                    <div className="text-sm text-emerald-600 mt-1">Weekend</div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="font-bold text-emerald-900">{results.weekNumber}</div>
                    <div className="text-emerald-700">Week of Year</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="font-bold text-emerald-900">{results.dayOfYear}</div>
                    <div className="text-emerald-700">Day of Year</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="font-bold text-emerald-900">Q{results.quarter}</div>
                    <div className="text-emerald-700">Quarter</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="font-bold text-emerald-900">{results.isLeapYear ? 'Yes' : 'No'}</div>
                    <div className="text-emerald-700">Leap Year</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}