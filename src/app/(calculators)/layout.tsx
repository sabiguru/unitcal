import type { ReactNode } from 'react';
import Header from '@/components/Header';
import AdsSidebar from '@/components/ads/AdsSidebar';

export default function CalculatorsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="lg:max-w-7xl lg:mx-auto lg:px-4 lg:py-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-6">
            <main className="lg:col-span-8">
              <div className="py-6 lg:px-0">
                {children}
              </div>
            </main>
            <aside className="lg:col-span-4">
              <AdsSidebar />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}