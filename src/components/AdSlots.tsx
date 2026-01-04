// components/AdSlots.tsx
'use client';
import React from 'react';

export function LeaderboardAd() {
  return (
    <div className="my-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="text-center">
        <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
          <span className="text-gray-600 text-sm font-medium">728x90 Banner Ad</span>
        </div>
        <p className="text-xs text-gray-500">Advertisement</p>
      </div>
    </div>
  );
}

export function MediumRectangleAd() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
      <div className="text-center">
        <div className="text-4xl mb-3">📊</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Featured Tools</h3>
        <p className="text-sm text-gray-700 mb-4">Professional calculators and converters</p>
        <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <span className="text-gray-600 text-sm font-medium">300x250 Ad Space</span>
        </div>
      </div>
    </div>
  );
}
