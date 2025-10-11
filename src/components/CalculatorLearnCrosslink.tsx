import Link from 'next/link';
import { getAvailableLearnSlugs } from '@/data/learnSeoBySlug';

interface CalculatorLearnCrosslinkProps {
  calculatorSlug: string;
  calculatorTitle: string;
}

export default function CalculatorLearnCrosslink({ calculatorSlug, calculatorTitle }: CalculatorLearnCrosslinkProps) {
  const availableLearnSlugs = getAvailableLearnSlugs();

  // Check if learn article exists for this calculator
  const hasLearnArticle = availableLearnSlugs.includes(calculatorSlug);

  if (!hasLearnArticle) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📖</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📚 Learn How to Use This Calculator
          </h3>
          <p className="text-blue-700 mb-4">
            Master the {calculatorTitle.toLowerCase()} with our comprehensive step-by-step guide,
            complete with examples, tips, and frequently asked questions.
          </p>
          <Link
            href={`/learn/${calculatorSlug}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <span className="mr-2">📖</span>
            Read the Guide
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}