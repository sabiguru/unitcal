'use client';

import { useEffect } from 'react';

interface EzoicAdProps {
  placementId: number;
  className?: string;
}

declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>;
      showAds: (...ids: number[]) => void;
    };
  }
}

export default function EzoicAd({ placementId, className = '' }: EzoicAdProps) {
  useEffect(() => {
    // Ensure ezstandalone is available
    if (typeof window !== 'undefined' && window.ezstandalone) {
      window.ezstandalone.cmd.push(() => {
        window.ezstandalone?.showAds(placementId);
      });
    }
  }, [placementId]);

  return (
    <div className={className}>
      <div id={`ezoic-pub-ad-placeholder-${placementId}`}></div>
    </div>
  );
}