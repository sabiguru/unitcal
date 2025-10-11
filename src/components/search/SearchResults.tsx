// src/components/search/SearchResults.tsx
'use client';

import Link from 'next/link';
import { Calculator } from './types';

type Props = {
  results: Calculator[];
  onSelect: (path?: string) => void;
};

export default function SearchResults({ results, onSelect }: Props) {
  if (!results || results.length === 0) {
    return (
      <div className="px-4 py-3 text-sm text-gray-500">
        No results
      </div>
    );
  }

  return (
    <div className="py-1">
      {results.map((item) => (
        <Link
          key={item.path || `${item.id}-${item.category}`}
          href={item.path || '#'}
          onClick={() => onSelect(item.path)}
          className="block px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-900">{item.name}</span>
            <span className="ml-3 text-xs text-gray-500">{item.category}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
