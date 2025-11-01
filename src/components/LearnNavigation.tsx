'use client';

interface LearnNavigationProps {
  slug: string;
}

export default function LearnNavigation({ slug }: LearnNavigationProps) {
  const scrollToSection = (sectionType: 'intro' | 'examples' | 'faq') => {
    // Common heading patterns in learn articles
    const headingPatterns: Record<string, string[]> = {
      intro: ['introduction', 'what is', 'overview', 'understanding'],
      examples: ['example', 'worked example', 'practice', 'how to calculate'],
      faq: ['faq', 'frequently asked questions', 'common questions']
    };

    const patterns = headingPatterns[sectionType];
    const allHeadings = document.querySelectorAll('h2, h3');

    for (const heading of allHeadings) {
      const headingText = heading.textContent?.toLowerCase() || '';
      const matchesPattern = patterns.some(pattern => headingText.includes(pattern));

      if (matchesPattern) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Add offset for fixed header if needed
        window.scrollBy(0, -100);
        return;
      }
    }

    // Fallback: scroll to top if no matching section found
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            onClick={() => scrollToSection('intro')}
            className="text-blue-600 hover:text-blue-800 transition-colors w-full text-left hover:underline"
          >
            📖 Introduction
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('examples')}
            className="text-blue-600 hover:text-blue-800 transition-colors w-full text-left hover:underline"
          >
            💡 Examples & Practice
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-blue-600 hover:text-blue-800 transition-colors w-full text-left hover:underline"
          >
            ❓ FAQ
          </button>
        </li>
        <li>
          <a href={`/calculator/${slug}`} className="block text-green-600 hover:text-green-800 transition-colors font-medium hover:underline">
            🧮 Try the Calculator
          </a>
        </li>
      </ul>
    </div>
  );
}