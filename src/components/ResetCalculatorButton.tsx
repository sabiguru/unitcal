'use client';

import { useRouter } from 'next/navigation';

export default function ResetCalculatorButton() {
  const router = useRouter();

  return (
    <div className="flex justify-end mt-3">
      <button
        onClick={() => router.refresh()}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 transition-colors"
        type="button"
      >
        Clear
      </button>
    </div>
  );
}
