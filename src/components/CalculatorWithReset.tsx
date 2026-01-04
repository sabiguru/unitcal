'use client';

import { useState, cloneElement, isValidElement, type ReactElement } from 'react';

interface CalculatorWithResetProps {
  children: ReactElement;
}

// Wraps a calculator component and provides a Clear control that remounts it.
export default function CalculatorWithReset({ children }: CalculatorWithResetProps) {
  const [instanceKey, setInstanceKey] = useState(0);

  const calc = isValidElement(children) ? cloneElement(children, { key: instanceKey }) : children;

  return (
    <div className="bg-white rounded-none sm:rounded-xl shadow-lg border-0 sm:border border-gray-200 overflow-hidden">
      <div className="flex justify-end p-3 sm:p-6 pt-4">
        <button
          type="button"
          onClick={() => setInstanceKey((key) => key + 1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="p-3 sm:p-6 pt-0">
        {calc}
      </div>
    </div>
  );
}
