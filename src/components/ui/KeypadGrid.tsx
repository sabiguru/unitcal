'use client';
import React from 'react';

type KeyDef = {
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  span?: number;       // grid-column span (e.g., 2 for the "0" key in Basic)
  ariaLabel?: string;
};

export default function KeypadGrid({ keys, cols }: { keys: KeyDef[]; cols: number }) {
  return (
    <div
      className="grid gap-1 sm:gap-2 w-full"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      role="grid"
    >
      {keys.map((k, i) => (
        <button
          key={i}
          onClick={k.onClick}
          aria-label={k.ariaLabel ?? (typeof k.label === 'string' ? k.label : `key-${i}`)}
          className={`w-full min-w-0 py-2 px-1 select-none rounded font-medium text-sm focus:outline-none focus:ring focus:ring-blue-300 ${k.className ?? ''}`}
          style={k.span ? { gridColumn: `span ${k.span} / span ${k.span}` } : undefined}
        >
          {k.label}
        </button>
      ))}
    </div>
  );
}