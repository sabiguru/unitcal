import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import { calculatorCategories } from '@/data/categoryData';
import { getAvailableLearnSlugs, getLearnSeo } from '@/data/learnSeoBySlug';

interface LearnCategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// Function to map learn articles to categories (same as in main page)
function getLearnArticlesForCategory(categorySlug: string) {
  const availableLearnSlugs = getAvailableLearnSlugs();

  const categoryMapping: Record<string, string[]> = {
    'mathematics': [
      'basic', 'scientific', 'graphing', 'fraction', 'percentage', 'ratio', 'prime', 'matrix',
      'equation-solver', 'significant-figures', 'binary-converter', 'suanpan-abacus',
      'soroban-abacus', 'western-abacus', 'speed'
    ],
    'health': [
      'bmi', 'bmr', 'bodyfat', 'calorie', 'protein', 'heartrate', 'fitness', 'sleep', 'water',
      'wearable-tech-data-driven-fitness', 'strength-training-building-muscle-healthgoal',
      'holistic-recovery-mobility-low-impact-training'
    ],
    'financial': [
      'budget', 'compound-interest', 'credit-card-payoff', 'currency-converter', 'depreciation',
      'discount', 'interest', 'investment', 'loan', 'mortgage', 'npv-irr', 'refinance',
      'retirement', 'roi', 'salary', 'tax', 'car-lease', 'car-loan'
    ],
    'engineering': [
      'capacitor', 'electrical', 'ohms-law', 'resistor', 'subnet', 'password-generator'
    ],
    'automotive': [
      'mpg', 'fuel-cost', 'ev-range', 'tire-size'
    ],
    'construction': [
      'paint', 'patio', 'concrete', 'roofing', 'stairs', 'tile', 'area', 'volume'
    ],
    'cooking': [
      'baking', 'recipe-converter', 'coffee-ratio', 'alcohol-dilution'
    ],
    'education': [
      'gpa', 'molecular-weight', 'stoichiometry', 'ph'
    ],
    'everyday': [
      'age', 'date', 'tip', 'time', 'timezone-converter', 'countdown-timer'
    ],
    'conversions': [
      'unit-converter', 'roman-numerals', 'morse-code', 'braille-translator'
    ],
    'energy': [
      'solar-panel-savings', 'seed-spacing', 'energy-usage', 'carbon-footprint', 'home-energy-audit'
    ],
    'animal-age': [
      'dog-age', 'cat-age'
    ],
    'space': [
      'age-on-mars', 'space-weight', 'planetary-years', 'time-on-mars', 'weight-on-mars'
    ],
    'unique': [
      'love-calculator', 'golf-balls-boeing-747', 'aquarium-volume'
    ]
  };

  const learnSlugs = categoryMapping[categorySlug] || [];
  const availableArticles = learnSlugs.filter(slug => availableLearnSlugs.includes(slug));

  return availableArticles.map(slug => {
    const seoData = getLearnSeo(slug);
    return {
      slug,
      title: seoData?.metaTitle?.replace(' — ', ' - ') || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: seoData?.metaDescription || `Learn how to use the ${slug.replace(/-/g, ' ')} calculator`,
      primaryKeyword: seoData?.primaryKeyword || slug.replace(/-/g, ' '),
      lastResearched: seoData?.lastResearched || '2025-01-01'
    };
  }).sort((a, b) => {
    // Sort newest first by lastResearched date
    return new Date(b.lastResearched).getTime() - new Date(a.lastResearched).getTime();
  });
}

// Enhanced metadata generation for category learn pages
export async function generateMetadata({ params }: LearnCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = calculatorCategories.find(cat => cat.slug === slug);

  if (!categoryData) {
    return {
      title: 'Learn Category Not Found | Calcfort',
      description: 'The requested learn category could not be found.'
    };
  }

  const learnArticles = getLearnArticlesForCategory(slug);

  return {
    title: `Learn ${categoryData.title} | Calcfort`,
    description: `${learnArticles.length} comprehensive guides for ${categoryData.title.toLowerCase()}. Learn calculation methods, formulas, and practical examples.`,
    keywords: [
      `learn ${categoryData.title.toLowerCase()}`,
      `how to use ${categoryData.title.toLowerCase()} calculators`,
      'calculator tutorials',
      'step by step guides',
      'calculation methods explained',
      'Calcfort'
    ],
    openGraph: {
      title: `Learn ${categoryData.title} | Calcfort`,
      description: `${learnArticles.length} guides for ${categoryData.title.toLowerCase()}. ${categoryData.description}`,
      url: `https://calcfort.com/learn/category/${slug}`,
      siteName: 'Calcfort',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Learn ${categoryData.title} | Calcfort`,
      description: `${learnArticles.length} guides for ${categoryData.title.toLowerCase()}.`,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://calcfort.com/learn/category/${slug}`,
    },
  };
}

// Generate static params for all categories that have learn content
export function generateStaticParams() {
  const availableLearnSlugs = getAvailableLearnSlugs();

  const categoryMapping: Record<string, string[]> = {
    'mathematics': [
      'basic', 'scientific', 'graphing', 'fraction', 'percentage', 'ratio', 'prime', 'matrix',
      'equation-solver', 'significant-figures', 'binary-converter', 'suanpan-abacus',
      'soroban-abacus', 'western-abacus', 'speed'
    ],
    'health': [
      'bmi', 'bmr', 'bodyfat', 'calorie', 'protein', 'heartrate', 'fitness', 'sleep', 'water',
      'wearable-tech-data-driven-fitness', 'strength-training-building-muscle-healthgoal',
      'holistic-recovery-mobility-low-impact-training'
    ],
    'financial': [
      'budget', 'compound-interest', 'credit-card-payoff', 'currency-converter', 'depreciation',
      'discount', 'interest', 'investment', 'loan', 'mortgage', 'npv-irr', 'refinance',
      'retirement', 'roi', 'salary', 'tax', 'car-lease', 'car-loan'
    ],
    'engineering': [
      'capacitor', 'electrical', 'ohms-law', 'resistor', 'subnet', 'password-generator'
    ],
    'automotive': [
      'mpg', 'fuel-cost', 'ev-range', 'tire-size'
    ],
    'construction': [
      'paint', 'patio', 'concrete', 'roofing', 'stairs', 'tile', 'area', 'volume'
    ],
    'cooking': [
      'baking', 'recipe-converter', 'coffee-ratio', 'alcohol-dilution'
    ],
    'education': [
      'gpa', 'molecular-weight', 'stoichiometry', 'ph'
    ],
    'everyday': [
      'age', 'date', 'tip', 'time', 'timezone-converter', 'countdown-timer'
    ],
    'conversions': [
      'unit-converter', 'roman-numerals', 'morse-code', 'braille-translator'
    ],
    'energy': [
      'solar-panel-savings', 'seed-spacing', 'energy-usage', 'carbon-footprint', 'home-energy-audit'
    ],
    'animal-age': [
      'dog-age', 'cat-age'
    ],
    'space': [
      'age-on-mars', 'space-weight', 'planetary-years', 'time-on-mars', 'weight-on-mars'
    ],
    'unique': [
      'love-calculator', 'golf-balls-boeing-747', 'aquarium-volume'
    ]
  };

  return calculatorCategories
    .filter(category => {
      const learnSlugs = categoryMapping[category.slug] || [];
      const availableArticles = learnSlugs.filter(slug => availableLearnSlugs.includes(slug));
      return availableArticles.length > 0;
    })
    .map(category => ({
      slug: category.slug,
    }));
}

export default async function LearnCategoryPage({ params, searchParams }: LearnCategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  const categoryData = calculatorCategories.find(cat => cat.slug === slug);

  if (!categoryData) {
    notFound();
  }

  const allLearnArticles = getLearnArticlesForCategory(slug);

  if (allLearnArticles.length === 0) {
    notFound();
  }

  // Pagination settings
  const POSTS_PER_PAGE = 8;
  const totalPosts = allLearnArticles.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Get current page from query params
  const currentPage = Math.max(1, Math.min(parseInt(pageParam || '1', 10), totalPages));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const learnArticles = allLearnArticles.slice(startIndex, endIndex);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/learn' },
    { label: categoryData.title, current: true }
  ];

  // Category learn page schema
  const categoryLearnSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Learn ${categoryData.title} - Step-by-Step Guides`,
    "description": `${totalPosts} comprehensive guides for ${categoryData.title.toLowerCase()}. Learn calculation methods, formulas, and practical examples.`,
    "url": `https://calcfort.com/learn/category/${slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": totalPosts,
      "itemListElement": allLearnArticles.map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Article",
          "name": article.title,
          "description": article.description,
          "url": `https://calcfort.com/learn/${article.slug}`
        }
      }))
    },
    "publisher": {
      "@type": "Organization",
      "name": "Calcfort"
    }
  };

  // Get related calculators for sidebar
  const relatedCalculators = calculatorCategories
    .filter(cat => cat.slug !== slug)
    .slice(0, 6);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoryLearnSchema)
        }}
      />

      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={breadcrumbs} />

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="text-center">
            <div className="text-6xl mb-4">{categoryData.icon}</div>
            <h1 className="text-3xl font-bold text-slate-700 mb-4">
              Learn {categoryData.title} — Calculator Tutorials & Guides
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {totalPosts} step-by-step guides for {categoryData.title.toLowerCase()}.
              Master calculation methods with detailed examples and practical tips.
            </p>
          </div>
        </div>

        {/* Main Content Area - Classic Blog Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Blog Posts */}
          <main className="col-span-12 lg:col-span-8">
            <div className="space-y-6">
              {learnArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/learn/${article.slug}`}
                  className="group block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                        {categoryData.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(article.lastResearched).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                      {article.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                        <span>Read Full Guide</span>
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
                        Calculator Available
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {currentPage > 1 ? (
                  <Link
                    href={`/learn/category/${slug}?page=${currentPage - 1}`}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </Link>
                ) : (
                  <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
                    Previous
                  </span>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    page === currentPage ? (
                      <span
                        key={page}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white"
                      >
                        {page}
                      </span>
                    ) : (
                      <Link
                        key={page}
                        href={`/learn/category/${slug}?page=${page}`}
                        className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        {page}
                      </Link>
                    )
                  ))}
                </div>

                {currentPage < totalPages ? (
                  <Link
                    href={`/learn/category/${slug}?page=${currentPage + 1}`}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </Link>
                ) : (
                  <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
                    Next
                  </span>
                )}
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              {/* Ad Space Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8">
                <div className="text-center">
                  <div className="text-gray-400 text-sm font-medium mb-2">Advertisement</div>
                  <div className="text-gray-300 text-xs">Ad Space (300x250)</div>
                </div>
              </div>

              {/* Related Calculators */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Related Calculators
                </h3>
                <div className="space-y-3">
                  {relatedCalculators.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/learn/category/${cat.slug}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <div className="text-2xl group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {cat.title}
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Second Ad Space */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8">
                <div className="text-center">
                  <div className="text-gray-400 text-sm font-medium mb-2">Advertisement</div>
                  <div className="text-gray-300 text-xs">Ad Space (300x600)</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}