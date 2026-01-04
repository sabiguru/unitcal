import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import { calculatorCategories } from '@/data/categoryData';
import { getAvailableLearnSlugs } from '@/data/learnSeoBySlug';
import { getSlugsForCategory } from '@/utils/learnCategoryMapping';

export const metadata: Metadata = {
  title: 'Learn How to Use Calculators - Guides & Tutorials | Calcfort',
  description: 'Master our calculators with step-by-step guides, examples, and tutorials. Learn calculation methods for math, finance, health, and engineering.',
  keywords: [
    'calculator tutorials',
    'how to use calculators',
    'calculation guides',
    'math tutorials',
    'calculator help',
    'step by step guides',
    'calculation examples'
  ],
  openGraph: {
    title: 'Learn How to Use Calculators - Guides & Tutorials | Calcfort',
    description: 'Master our calculators with step-by-step guides, examples, and tutorials. Learn calculation methods for math, finance, health, and engineering.',
    url: 'https://calcfort.com/learn',
    siteName: 'Calcfort',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn How to Use Calculators - Guides & Tutorials | Calcfort',
    description: 'Master our calculators with step-by-step guides, examples, and tutorials.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://calcfort.com/learn',
  },
};

// Function to map learn articles to categories
function mapLearnArticlesToCategories() {
  const availableLearnSlugs = getAvailableLearnSlugs();

  // Count articles per category and only include those with content
  const categoriesWithLearnContent = calculatorCategories
    .map(category => {
      const learnSlugs = getSlugsForCategory(category.slug);
      const availableArticles = learnSlugs.filter(slug => availableLearnSlugs.includes(slug));

      return {
        ...category,
        learnCount: availableArticles.length,
        learnSlugs: availableArticles
      };
    }).filter(category => category.learnCount > 0);

  return categoriesWithLearnContent;
}

export default function LearnIndexPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Learn', current: true }
  ];

  const categoriesWithLearnContent = mapLearnArticlesToCategories();
  const totalArticles = categoriesWithLearnContent.reduce((sum, cat) => sum + cat.learnCount, 0);

  // Learn categories page schema
  const learnSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Calculator Learning Guides - Tutorials & How-To Guides",
    "description": "Master our calculators with step-by-step guides, examples, and tutorials. Learn calculation methods for math, finance, health, and engineering.",
    "url": "https://calcfort.com/learn",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": categoriesWithLearnContent.length,
      "itemListElement": categoriesWithLearnContent.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "name": `Learn ${category.title}`,
          "description": `${category.learnCount} learning guides for ${category.title.toLowerCase()}`,
          "url": `https://calcfort.com/learn/${category.slug}`
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
          __html: JSON.stringify(learnSchema)
        }}
      />

      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={breadcrumbs} />
        <div className="grid grid-cols-12 gap-6">
          <main className="col-span-12">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-slate-700 mb-4">Calculator Learning Center</h1>
                  <p className="text-gray-600">Master our calculators with {totalArticles} step-by-step guides and tutorials</p>
                </div>

                <h2 className="text-2xl font-bold text-slate-700 mb-4 text-center">Browse Learning Guides by Category</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoriesWithLearnContent.map((category, index) => (
                    <Link
                      key={index}
                      href={`/learn/${category.slug}`}
                      className="group p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          Learn {category.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {category.learnCount} guides
                        </p>
                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                          Step-by-step tutorials for {category.title.toLowerCase()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

// Export the mapping function for use in other components
export { mapLearnArticlesToCategories };
