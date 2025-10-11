'use client';

interface LearnNavigationProps {
  slug: string;
}

export default function LearnNavigation({ slug }: LearnNavigationProps) {
  const handleTabClick = (tabType: 'intro' | 'examples' | 'faq') => {
    const tabButtons = document.querySelectorAll('[role="tab"]');
    let targetTab: HTMLButtonElement | null = null;

    switch (tabType) {
      case 'intro':
        targetTab = Array.from(tabButtons).find(btn =>
          btn.textContent?.toLowerCase().includes('guide') ||
          btn.textContent?.toLowerCase().includes('complete')
        ) as HTMLButtonElement;
        break;
      case 'examples':
        targetTab = Array.from(tabButtons).find(btn =>
          btn.textContent?.toLowerCase().includes('example') ||
          btn.textContent?.toLowerCase().includes('practice')
        ) as HTMLButtonElement;
        break;
      case 'faq':
        targetTab = Array.from(tabButtons).find(btn =>
          btn.textContent?.toLowerCase().includes('faq')
        ) as HTMLButtonElement;
        break;
    }

    if (targetTab) {
      targetTab.click();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="text-blue-500 mr-2">🧭</span>
        Quick Navigation
      </h3>
      <ul className="space-y-3 text-sm">
        <li>
          <button
            onClick={() => handleTabClick('intro')}
            className="text-blue-600 hover:text-blue-800 transition-colors w-full text-left"
          >
            📖 Introduction
          </button>
        </li>
        <li>
          <button
            onClick={() => handleTabClick('examples')}
            className="text-blue-600 hover:text-blue-800 transition-colors w-full text-left"
          >
            💡 Examples & Practice
          </button>
        </li>
        <li>
          <button
            onClick={() => handleTabClick('faq')}
            className="text-blue-600 hover:text-blue-800 transition-colors w-full text-left"
          >
            ❓ FAQ
          </button>
        </li>
        <li>
          <a href={`/calculator/${slug}`} className="text-green-600 hover:text-green-800 transition-colors font-medium">
            🧮 Try the Calculator
          </a>
        </li>
      </ul>
    </div>
  );
}