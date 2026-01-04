'use client';

import { useState, useEffect } from 'react';

export default function TimeZoneConverterCalculator() {
  const [sourceTime, setSourceTime] = useState('');
  const [sourceDate, setSourceDate] = useState('');
  const [sourceTimeZone, setSourceTimeZone] = useState('America/New_York');
  const [targetTimeZones, setTargetTimeZones] = useState(['America/Los_Angeles', 'Europe/London', 'Asia/Tokyo']);
  const [results, setResults] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const timeZones = [
    // North America
    { value: 'America/New_York', label: 'New York (EST/EDT)', region: 'North America' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', region: 'North America' },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT)', region: 'North America' },
    { value: 'America/Denver', label: 'Denver (MST/MDT)', region: 'North America' },
    { value: 'America/Phoenix', label: 'Phoenix (MST)', region: 'North America' },
    { value: 'America/Anchorage', label: 'Anchorage (AKST/AKDT)', region: 'North America' },
    { value: 'America/Halifax', label: 'Halifax (AST/ADT)', region: 'North America' },
    { value: 'America/Toronto', label: 'Toronto (EST/EDT)', region: 'North America' },
    { value: 'America/Vancouver', label: 'Vancouver (PST/PDT)', region: 'North America' },
    { value: 'America/Mexico_City', label: 'Mexico City (CST/CDT)', region: 'North America' },
    
    // Europe
    { value: 'Europe/London', label: 'London (GMT/BST)', region: 'Europe' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)', region: 'Europe' },
    { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)', region: 'Europe' },
    { value: 'Europe/Rome', label: 'Rome (CET/CEST)', region: 'Europe' },
    { value: 'Europe/Madrid', label: 'Madrid (CET/CEST)', region: 'Europe' },
    { value: 'Europe/Amsterdam', label: 'Amsterdam (CET/CEST)', region: 'Europe' },
    { value: 'Europe/Zurich', label: 'Zurich (CET/CEST)', region: 'Europe' },
    { value: 'Europe/Moscow', label: 'Moscow (MSK)', region: 'Europe' },
    { value: 'Europe/Istanbul', label: 'Istanbul (TRT)', region: 'Europe' },
    { value: 'Europe/Athens', label: 'Athens (EET/EEST)', region: 'Europe' },
    
    // Asia-Pacific
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', region: 'Asia-Pacific' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)', region: 'Asia-Pacific' },
    { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)', region: 'Asia-Pacific' },
    { value: 'Asia/Seoul', label: 'Seoul (KST)', region: 'Asia-Pacific' },
    { value: 'Asia/Singapore', label: 'Singapore (SGT)', region: 'Asia-Pacific' },
    { value: 'Asia/Bangkok', label: 'Bangkok (ICT)', region: 'Asia-Pacific' },
    { value: 'Asia/Mumbai', label: 'Mumbai (IST)', region: 'Asia-Pacific' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)', region: 'Asia-Pacific' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', region: 'Asia-Pacific' },
    { value: 'Australia/Melbourne', label: 'Melbourne (AEST/AEDT)', region: 'Asia-Pacific' },
    { value: 'Australia/Perth', label: 'Perth (AWST)', region: 'Asia-Pacific' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)', region: 'Asia-Pacific' },
    
    // South America
    { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', region: 'South America' },
    { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (ART)', region: 'South America' },
    { value: 'America/Lima', label: 'Lima (PET)', region: 'South America' },
    { value: 'America/Bogota', label: 'Bogotá (COT)', region: 'South America' },
    { value: 'America/Santiago', label: 'Santiago (CLT/CLST)', region: 'South America' },
    
    // Africa & Middle East
    { value: 'Africa/Cairo', label: 'Cairo (EET)', region: 'Africa & Middle East' },
    { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)', region: 'Africa & Middle East' },
    { value: 'Africa/Lagos', label: 'Lagos (WAT)', region: 'Africa & Middle East' },
    { value: 'Asia/Jerusalem', label: 'Jerusalem (IST/IDT)', region: 'Africa & Middle East' },
    { value: 'Asia/Riyadh', label: 'Riyadh (AST)', region: 'Africa & Middle East' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-set current date and time
    const now = new Date();
    setSourceDate(now.toISOString().split('T')[0]);
    setSourceTime(now.toTimeString().slice(0, 5));
  }, []);

  const addTimeZone = () => {
    if (targetTimeZones.length < 6) {
      setTargetTimeZones([...targetTimeZones, 'UTC']);
    }
  };

  const removeTimeZone = (index: number) => {
    if (targetTimeZones.length > 1) {
      setTargetTimeZones(targetTimeZones.filter((_, i) => i !== index));
    }
  };

  const updateTimeZone = (index: number, value: string) => {
    const updated = targetTimeZones.map((tz, i) => i === index ? value : tz);
    setTargetTimeZones(updated);
  };

  const convertTime = () => {
    if (!sourceTime || !sourceDate) return;

    const sourceDateTime = new Date(`${sourceDate}T${sourceTime}:00`);
    
    // Create results for each target timezone
    const conversions = targetTimeZones.map(targetTZ => {
      try {
        // Get time in source timezone
        const sourceFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: sourceTimeZone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });

        // Get time in target timezone
        const targetFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: targetTZ,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          weekday: 'short'
        });

        const target12HourFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: targetTZ,
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });

        // Convert the source datetime to target timezone
        const targetTime = new Date(sourceDateTime.toLocaleString('en-US', { timeZone: sourceTimeZone }));
        const adjustedTargetTime = new Date(targetTime.getTime() + (targetTime.getTimezoneOffset() * 60000));
        
        const targetParts = targetFormatter.formatToParts(adjustedTargetTime);
        const target12Parts = target12HourFormatter.formatToParts(adjustedTargetTime);
        
        const targetDate = `${targetParts.find(p => p.type === 'year')?.value}-${targetParts.find(p => p.type === 'month')?.value}-${targetParts.find(p => p.type === 'day')?.value}`;
        const targetTimeStr = `${targetParts.find(p => p.type === 'hour')?.value}:${targetParts.find(p => p.type === 'minute')?.value}`;
        const target12TimeStr = target12Parts.map(p => p.value).join('');
        const weekday = targetParts.find(p => p.type === 'weekday')?.value;

        const timeZoneInfo = timeZones.find(tz => tz.value === targetTZ);
        
        // Calculate offset
        const now = new Date();
        const sourceOffset = new Date(now.toLocaleString('en-US', { timeZone: sourceTimeZone })).getTime() - 
                           new Date(now.getTime()).getTime();
        const targetOffset = new Date(now.toLocaleString('en-US', { timeZone: targetTZ })).getTime() - 
                           new Date(now.getTime()).getTime();
        const offsetHours = (targetOffset - sourceOffset) / (1000 * 60 * 60);
        
        return {
          timeZone: targetTZ,
          label: timeZoneInfo?.label || targetTZ,
          date: targetDate,
          time24: targetTimeStr,
          time12: target12TimeStr,
          weekday: weekday,
          offset: offsetHours > 0 ? `+${offsetHours}h` : `${offsetHours}h`,
          dayDifference: new Date(targetDate).getDate() - new Date(sourceDate).getDate()
        };
      } catch (error) {
        console.error(`Error converting to ${targetTZ}:`, error);
        return null;
      }
    }).filter(Boolean);

    const sourceInfo = timeZones.find(tz => tz.value === sourceTimeZone);
    
    setResults({
      sourceDateTime: `${sourceDate} ${sourceTime}`,
      sourceTimeZone: sourceInfo?.label || sourceTimeZone,
      conversions
    });
  };

  const getCurrentTimeInZone = (timeZone: string) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      return formatter.format(currentTime);
    } catch {
      return '--:--:--';
    }
  };

  const groupedTimeZones = timeZones.reduce((groups, tz) => {
    const region = tz.region;
    if (!groups[region]) {
      groups[region] = [];
    }
    groups[region].push(tz);
    return groups;
  }, {} as Record<string, typeof timeZones>);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🌐</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Time Zone Converter</h1>
          <p className="text-gray-600">Convert time between different time zones around the world</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={sourceDate}
              onChange={(e) => setSourceDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              type="time"
              value={sourceTime}
              onChange={(e) => setSourceTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Source Time Zone</label>
            <select
              value={sourceTimeZone}
              onChange={(e) => setSourceTimeZone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {Object.entries(groupedTimeZones).map(([region, zones]) => (
                <optgroup key={region} label={region}>
                  {zones.map(tz => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">Target Time Zones</label>
            <button
              onClick={addTimeZone}
              className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
              disabled={targetTimeZones.length >= 6}
            >
              + Add Time Zone
            </button>
          </div>
          
          <div className="space-y-3">
            {targetTimeZones.map((tz, index) => (
              <div key={index} className="flex gap-3">
                <select
                  value={tz}
                  onChange={(e) => updateTimeZone(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  {Object.entries(groupedTimeZones).map(([region, zones]) => (
                    <optgroup key={region} label={region}>
                      {zones.map(zone => (
                        <option key={zone.value} value={zone.value}>{zone.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg min-w-[100px] text-center font-mono">
                  {getCurrentTimeInZone(tz)}
                </div>
                <button
                  onClick={() => removeTimeZone(index)}
                  className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  disabled={targetTimeZones.length === 1}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={convertTime}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Convert Time Zones
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
            <h3 className="text-lg font-semibold text-cyan-900 mb-4">Conversion Results</h3>
            <div className="text-center mb-4">
              <div className="text-sm text-cyan-700">Converting from:</div>
              <div className="text-xl font-bold text-cyan-900">
                {results.sourceDateTime} ({results.sourceTimeZone})
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {results.conversions.map((conversion: any, index: number) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {conversion.label}
                    </div>
                    <div className="text-sm text-gray-600">{conversion.timeZone}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {conversion.time24}
                    </div>
                    <div className="text-sm text-gray-600">
                      {conversion.time12}
                    </div>
                    <div className="text-sm text-gray-500">
                      {conversion.weekday}, {conversion.date}
                      {conversion.dayDifference !== 0 && (
                        <span className="ml-2 text-orange-600">
                          ({conversion.dayDifference > 0 ? '+' : ''}{conversion.dayDifference} day{Math.abs(conversion.dayDifference) !== 1 ? 's' : ''})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-blue-600">
                  Time difference: {conversion.offset}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Tips</h3>
            <div className="text-sm text-yellow-800 space-y-2">
              <div>• Times shown include daylight saving adjustments where applicable</div>
              <div>• Day differences are shown when the date changes across time zones</div>
              <div>• Current times for each zone are displayed live in the converter</div>
              <div>• All conversions account for current DST rules</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}