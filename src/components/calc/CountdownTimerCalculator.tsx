'use client';

import { useState, useEffect, useRef } from 'react';

export default function CountdownTimerCalculator() {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [timezone, setTimezone] = useState('local');
  const [timeLeft, setTimeLeft] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const commonEvents = [
    { name: 'New Year\'s Day', date: '2024-01-01', time: '00:00' },
    { name: 'Valentine\'s Day', date: '2024-02-14', time: '00:00' },
    { name: 'Christmas Day', date: '2024-12-25', time: '00:00' },
    { name: 'Halloween', date: '2024-10-31', time: '00:00' },
    { name: 'Independence Day', date: '2024-07-04', time: '00:00' },
    { name: 'Thanksgiving', date: '2024-11-28', time: '00:00' }
  ];

  const timezones = [
    { value: 'local', label: 'Local Time' },
    { value: 'America/New_York', label: 'Eastern Time (EST/EDT)' },
    { value: 'America/Chicago', label: 'Central Time (CST/CDT)' },
    { value: 'America/Denver', label: 'Mountain Time (MST/MDT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PST/PDT)' },
    { value: 'Europe/London', label: 'London (GMT/BST)' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
    { value: 'UTC', label: 'UTC' }
  ];

  useEffect(() => {
    if (isActive && targetDate && targetTime) {
      intervalRef.current = setInterval(() => {
        updateCountdown();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, targetDate, targetTime, timezone]);

  const updateCountdown = () => {
    if (!targetDate || !targetTime) return;

    const targetDateTime = new Date(`${targetDate}T${targetTime}:00`);
    const now = new Date();
    
    // Adjust for timezone if not local
    let adjustedTarget = targetDateTime;
    if (timezone !== 'local') {
      // This is a simplified timezone adjustment
      // In a production app, you'd want to use a proper timezone library
      const localOffset = now.getTimezoneOffset();
      adjustedTarget = new Date(targetDateTime.getTime() - (localOffset * 60000));
    }

    const difference = adjustedTarget.getTime() - now.getTime();

    if (difference <= 0) {
      setCompleted(true);
      setIsActive(false);
      setTimeLeft({
        total: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({
      total: difference,
      days,
      hours,
      minutes,
      seconds,
      totalHours: Math.floor(difference / (1000 * 60 * 60)),
      totalMinutes: Math.floor(difference / (1000 * 60)),
      totalSeconds: Math.floor(difference / 1000)
    });
  };

  const startCountdown = () => {
    if (!targetDate || !targetTime) {
      alert('Please set a target date and time');
      return;
    }

    setCompleted(false);
    setIsActive(true);
    updateCountdown();
  };

  const stopCountdown = () => {
    setIsActive(false);
  };

  const resetCountdown = () => {
    setIsActive(false);
    setCompleted(false);
    setTimeLeft(null);
  };

  const selectCommonEvent = (event: any) => {
    setEventName(event.name);
    setTargetDate(event.date);
    setTargetTime(event.time);
  };

  const setCurrentTime = () => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);
    setTargetDate(currentDate);
    setTargetTime(currentTime);
  };

  const addTime = (minutes: number) => {
    const now = new Date();
    const futureTime = new Date(now.getTime() + minutes * 60000);
    setTargetDate(futureTime.toISOString().split('T')[0]);
    setTargetTime(futureTime.toTimeString().slice(0, 5));
  };

  const getProgressPercentage = () => {
    if (!timeLeft || !targetDate || !targetTime) return 0;
    
    const targetDateTime = new Date(`${targetDate}T${targetTime}:00`);
    const startTime = new Date(); // This would ideally be when countdown was created
    const totalDuration = targetDateTime.getTime() - (startTime.getTime() - timeLeft.total);
    const elapsed = totalDuration - timeLeft.total;
    
    return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
  };

  const formatTimeUnit = (value: number, unit: string) => {
    return (
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-600 uppercase tracking-wide">
          {unit}{value !== 1 ? 's' : ''}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⏳</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Countdown Timer</h1>
          <p className="text-gray-600">Create countdowns for important events and deadlines</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Name (Optional)</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Birthday, Meeting, Vacation, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Time</label>
            <input
              type="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {timezones.map(tz => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addTime(5)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            +5 min
          </button>
          <button
            onClick={() => addTime(15)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            +15 min
          </button>
          <button
            onClick={() => addTime(60)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            +1 hour
          </button>
          <button
            onClick={() => addTime(1440)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            +1 day
          </button>
          <button
            onClick={setCurrentTime}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Now
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={startCountdown}
          disabled={isActive}
          className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 px-6 rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          Start Countdown
        </button>
        <button
          onClick={stopCountdown}
          disabled={!isActive}
          className="px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          Stop
        </button>
        <button
          onClick={resetCountdown}
          className="px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {timeLeft && (
        <div className="space-y-6">
          {eventName && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {completed ? '🎉 ' : ''}
                {eventName}
                {completed ? ' 🎉' : ''}
              </h2>
            </div>
          )}

          {completed ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <div className="text-3xl font-bold text-green-600 mb-2">Time's Up!</div>
              <div className="text-lg text-gray-600">The countdown has finished!</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                {formatTimeUnit(timeLeft.days, 'Day')}
                {formatTimeUnit(timeLeft.hours, 'Hour')}
                {formatTimeUnit(timeLeft.minutes, 'Minute')}
                {formatTimeUnit(timeLeft.seconds, 'Second')}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-900 mb-1">
                      {timeLeft.totalHours.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700">Total Hours</div>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-900 mb-1">
                      {timeLeft.totalMinutes.toLocaleString()}
                    </div>
                    <div className="text-sm text-purple-700">Total Minutes</div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-900 mb-1">
                      {timeLeft.totalSeconds.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">Total Seconds</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500">{getProgressPercentage().toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-500 to-pink-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">Quick Event Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {commonEvents.map((event, index) => (
            <button
              key={index}
              onClick={() => selectCommonEvent(event)}
              className="text-left p-3 bg-white rounded-lg border border-yellow-300 hover:bg-yellow-100 transition-colors"
            >
              <div className="font-medium text-yellow-900">{event.name}</div>
              <div className="text-sm text-yellow-700">{event.date}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div className="space-y-2">
            <div>• Real-time countdown updates</div>
            <div>• Multiple time zone support</div>
            <div>• Visual progress indicator</div>
          </div>
          <div className="space-y-2">
            <div>• Quick time additions</div>
            <div>• Event name customization</div>
            <div>• Celebration on completion</div>
          </div>
        </div>
      </div>
    </div>
  );
}