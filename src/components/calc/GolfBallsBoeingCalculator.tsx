'use client';

import { useState } from 'react';

export default function GolfBallsBoeingCalculator() {
  const [customLength, setCustomLength] = useState<string>('');
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');
  const [result, setResult] = useState<{
    boeing747: number;
    custom?: number;
    golfBallVolume: number;
    boeing747Volume: number;
    customVolume?: number;
  } | null>(null);

  const boeing747Dimensions = {
    length: 231, // feet
    width: 195,  // feet (wingspan)
    height: 63   // feet
  };

  const golfBallDiameter = 1.68; // inches
  const golfBallRadius = golfBallDiameter / 2 / 12; // feet

  const calculate = () => {
    // Golf ball volume in cubic feet
    const golfBallVolume = (4/3) * Math.PI * Math.pow(golfBallRadius, 3);
    
    // Boeing 747 cargo volume (approximate)
    const boeing747Volume = boeing747Dimensions.length * boeing747Dimensions.width * boeing747Dimensions.height * 0.6; // 60% usable space
    
    // Number of golf balls in Boeing 747
    const golfBallsInBoeing747 = Math.floor(boeing747Volume / golfBallVolume);
    
    let customResult = undefined;
    let customVolumeResult = undefined;
    
    if (customLength && customWidth && customHeight) {
      const lengthNum = parseFloat(customLength);
      const widthNum = parseFloat(customWidth);
      const heightNum = parseFloat(customHeight);
      
      if (!isNaN(lengthNum) && !isNaN(widthNum) && !isNaN(heightNum)) {
        let volumeFeet = lengthNum * widthNum * heightNum;
        
        if (unit === 'meters') {
          volumeFeet = volumeFeet * 35.3147; // convert cubic meters to cubic feet
        }
        
        customVolumeResult = volumeFeet;
        customResult = Math.floor(volumeFeet / golfBallVolume);
      }
    }
    
    setResult({
      boeing747: golfBallsInBoeing747,
      custom: customResult,
      golfBallVolume: golfBallVolume * 1728, // convert to cubic inches for display
      boeing747Volume,
      customVolume: customVolumeResult
    });
  };

  const clear = () => {
    setCustomLength('');
    setCustomWidth('');
    setCustomHeight('');
    setResult(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⚪</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Golf Balls Fit in a Boeing 747</h1>
          <p className="text-gray-600">Calculate how many golf balls can fit in various spaces</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Space (Optional)</h3>
          <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-1 mb-4">
            <button
              onClick={() => setUnit('feet')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                unit === 'feet'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Feet
            </button>
            <button
              onClick={() => setUnit('meters')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                unit === 'meters'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Meters
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length ({unit})
            </label>
            <input
              type="number"
              value={customLength}
              onChange={(e) => setCustomLength(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter length in ${unit}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width ({unit})
            </label>
            <input
              type="number"
              value={customWidth}
              onChange={(e) => setCustomWidth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter width in ${unit}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height ({unit})
            </label>
            <input
              type="number"
              value={customHeight}
              onChange={(e) => setCustomHeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter height in ${unit}`}
            />
          </div>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">
                  {result.boeing747.toLocaleString()}
                </div>
                <div className="text-lg text-blue-700">Golf Balls in Boeing 747</div>
                <div className="text-sm text-blue-600 mt-2">
                  Volume: {result.boeing747Volume.toLocaleString()} cubic feet
                </div>
              </div>
            </div>
            
            {result.custom && (
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-900 mb-2">
                    {result.custom.toLocaleString()}
                  </div>
                  <div className="text-lg text-green-700">Golf Balls in Custom Space</div>
                  <div className="text-sm text-green-600 mt-2">
                    Volume: {result.customVolume?.toLocaleString()} cubic feet
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Calculation Details:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Golf ball diameter: {golfBallDiameter} inches</div>
                <div>• Golf ball volume: {result.golfBallVolume.toFixed(3)} cubic inches</div>
                <div>• Boeing 747 dimensions: 231' × 195' × 63'</div>
                <div>• Assumes 60% packing efficiency</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-4 mt-6">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Other Comparisons */}
      <div className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
          <span className="text-orange-600 mr-2">🏀</span>
          Other Comparisons
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm text-orange-800">
          <div className="flex justify-between items-center py-2 px-3 bg-white rounded-lg">
            <span>Ping pong balls:</span>
            <span className="font-medium">~22 million</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 bg-white rounded-lg">
            <span>Tennis balls:</span>
            <span className="font-medium">~375,000</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 bg-white rounded-lg">
            <span>Basketballs:</span>
            <span className="font-medium">~2,747</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 bg-white rounded-lg">
            <span>Beach balls:</span>
            <span className="font-medium">~287</span>
          </div>
        </div>
      </div>
    </div>
  );
}