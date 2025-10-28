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
      'bmi', 'bmr', 'bodyfat', 'calorie', 'protein', 'heartrate', 'fitness', 'sleep', 'water'
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
      primaryKeyword: seoData?.primaryKeyword || slug.replace(/-/g, ' ')
    };
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
      'bmi', 'bmr', 'bodyfat', 'calorie', 'protein', 'heartrate', 'fitness', 'sleep', 'water'
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

export default async function LearnCategoryPage({ params }: LearnCategoryPageProps) {
  const { slug } = await params;
  const categoryData = calculatorCategories.find(cat => cat.slug === slug);

  if (!categoryData) {
    notFound();
  }

  const learnArticles = getLearnArticlesForCategory(slug);

  if (learnArticles.length === 0) {
    notFound();
  }

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
    "description": `${learnArticles.length} comprehensive guides for ${categoryData.title.toLowerCase()}. Learn calculation methods, formulas, and practical examples.`,
    "url": `https://calcfort.com/learn/category/${slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": learnArticles.length,
      "itemListElement": learnArticles.map((article, index) => ({
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
        <div className="grid grid-cols-12 gap-6">
          <main className="col-span-12">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{categoryData.icon}</div>
                  <h1 className="text-3xl font-bold text-slate-700 mb-4">
                    Learn {categoryData.title} — Calculator Tutorials & Guides
                  </h1>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {learnArticles.length} step-by-step guides for {categoryData.title.toLowerCase()}.
                    Master calculation methods with detailed examples and practical tips.
                  </p>
                </div>

                {/* Learn Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {learnArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/learn/${article.slug}`}
                      className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 p-6"
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {article.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          <span>Read Guide</span>
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          Calculator Available
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Related Categories */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    Explore Other Categories
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {calculatorCategories
                      .filter(cat => cat.slug !== slug)
                      .slice(0, 5)
                      .map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/learn/category/${cat.slug}`}
                          className="group text-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                            {cat.icon}
                          </div>
                          <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                            {cat.title}
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}