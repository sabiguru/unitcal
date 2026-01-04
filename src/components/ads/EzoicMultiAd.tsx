'use client';

import { useEffect } from 'react';

interface EzoicMultiAdProps {
  placements: Array<{
    id: number;
    className?: string;
  }>;
}

declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>;
      showAds: (...ids: number[]) => void;
    };
  }
}

export default function EzoicMultiAd({ placements }: EzoicMultiAdProps) {
  useEffect(() => {
    // Ensure ezstandalone is available
    if (typeof window !== 'undefined' && window.ezstandalone && placements.length > 0) {
      window.ezstandalone.cmd.push(() => {
        const placementIds = placements.map(p => p.id);
        window.ezstandalone?.showAds(...placementIds);
      });
    }
  }, [placements]);

  return (
    <>
      {placements.map(({ id, className = '' }) => (
        <div key={id} className={className}>
          <div id={`ezoic-pub-ad-placeholder-${id}`}></div>
        </div>
      ))}
    </>
  );
}