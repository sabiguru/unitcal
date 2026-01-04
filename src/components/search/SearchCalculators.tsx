// components/search/SearchCalculators.tsx
'use client';
type Props = { fullWidth?: boolean };
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Calculator } from './types';
import SearchResults from './SearchResults';

import { calculatorCategories } from '@/data/categoryData';
import { flattenCalculators, searchCalculators } from '@/lib/calculators';

export default function SearchCalculators({ fullWidth }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null); // anchor for positioning
  const router = useRouter();

  // Build flat list once
  const flatList = useMemo(() => flattenCalculators(calculatorCategories), []);
  const outcome = useMemo(
    () => searchCalculators(query, flatList, { threshold: 0.30, max: 20 }),
    [query, flatList]
  );

  // track mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []
  );

  const results: Calculator[] = useMemo(
    () =>
      outcome.results.map(({ item }) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        path: item.path,
        keywords: item.keywords,
      })),
    [outcome.results]
  );

  useEffect(() => setMounted(true), []);

  // Close on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!anchorRef.current) return;
      if (anchorRef.current.contains(e.target as Node)) return;
      
      // Check if click is inside the dropdown portal
      const dropdownElement = document.querySelector('[data-search-dropdown]');
      if (dropdownElement && dropdownElement.contains(e.target as Node)) return;
      
      setIsOpen(false);
    };
    
    // Use both mousedown and touchstart for better mobile support
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, []);

  // Reposition portal popover
  const [rect, setRect] = useState<DOMRect | null>(null);
  useEffect(() => {
    const update = () => {
      if (!anchorRef.current) return;
      setRect(anchorRef.current.getBoundingClientRect());
    };
    update();

    // Only listen to resize since header is sticky/fixed
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('resize', update);
    };
  }, [isOpen]);

  const onFocus = () => setIsOpen(true);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };
  const onClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (results.length > 0 && results[0].path && results[0].path !== '#') {
        router.push(results[0].path);
        setIsOpen(false);
      } else if (outcome.suggestion?.item.path && outcome.suggestion.item.path !== '#') {
        router.push(outcome.suggestion.item.path);
        setIsOpen(false);
      }
    }
  };

  const showDropdown = isOpen && query.trim().length > 0;

  // The popover UI (rendered in a portal)
  const Popover: React.FC = () => {
  const hasContent =
    (!!outcome.suggestion && outcome.suggestion.item?.path !== '#') ||
    results.length > 0;

  if (!mounted || !rect || !showDropdown || !hasContent) return null;

  const headerRect = document.getElementById('site-header')?.getBoundingClientRect();
  const headerBottom = headerRect ? headerRect.bottom : 0;

  const top = Math.max(rect.bottom + 4, headerBottom + 4);

  // 👇 Mobile layout: full viewport width minus 16px gutters
  const gutter = 16;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const panelLeft = isMobile ? gutter : rect.left;
  const panelWidth = isMobile ? Math.max(240, vw - gutter * 2) : rect.width;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top,
        left: 0,
        right: 0,
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <div
        data-search-dropdown
        style={{
          position: 'absolute',
          left: panelLeft,
          width: panelWidth,
          minHeight: 44,
          maxHeight: '24rem',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
          pointerEvents: 'auto',
          isolation: 'isolate',
        }}
        className="bg-white rounded-lg shadow-lg"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {outcome.suggestion?.item?.path && outcome.suggestion.item.path !== '#' && (
          <Link
            href={outcome.suggestion.item.path}
            className="block px-4 py-2 text-sm bg-amber-50 text-amber-900 hover:bg-amber-100 border-b border-amber-200"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          >
            Did you mean: <span className="font-semibold">{outcome.suggestion.text}</span>?{' '}
            <span className="text-amber-700">({outcome.suggestion.item.name})</span>
          </Link>
        )}

        <SearchResults
          results={results}
          onSelect={(path?: string) => {
            if (path && path !== '#') router.push(path);
            setIsOpen(false);
          }}
        />
      </div>
    </div>,
    document.body
  );
};
  return (
    <div ref={anchorRef} className="relative w-full max-w-xl">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg pl-3 pr-2 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          type="text"
          placeholder="Search calculators…"
          className="w-full outline-none text-sm"
          aria-label="Search calculators"
        />
        {query && (
          <button
            onClick={onClear}
            className="ml-2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Portal popover */}
      <Popover />
    </div>
  );
}
