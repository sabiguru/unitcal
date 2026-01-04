'use client';

import AbacusCalculator from './AbacusCalculator';
import { westernTips } from '@/lib/abacusTips';

export default function WesternAbacusCalculator() {
  return (
    <div>
      <AbacusCalculator type="western" />
      
      {/* Western abacus-specific calculation tips */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <span className="text-purple-600 mr-2">💡</span>
          Western Counting Frame Tips
        </h3>
        <div className="space-y-3">
          {westernTips.map((tip, index) => (
            <div key={index} className="flex items-start">
              <span className="text-lg mr-3 mt-0.5">{tip.icon}</span>
              <p className="text-sm text-purple-800">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}