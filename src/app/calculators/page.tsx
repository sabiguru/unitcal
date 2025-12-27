import type { Metadata } from 'next';
import Link from 'next/link';
import { calculatorCategories } from '@/data/categoryData';
import Breadcrumbs from '@/components/Breadcrumbs';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Calculator Categories - Browse All Tools | CalcFort',
  description: 'Browse calculator categories: mathematics, finance, engineering, health, and more tools.',
  keywords: [
    'calculator categories',
    'online calculators',
    'math calculators',
    'financial calculators',
    'engineering calculators',
    'health calculators',
    'conversion tools',
    'calculation tools'
  ],
  openGraph: {
    title: 'Calculator Categories - Browse All Tools | CalcFort',
    description: 'Browse calculator categories: mathematics, finance, engineering, health, and more tools.',
    url: 'https://calcfort.com/calculators',
    siteName: 'CalcFort',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator Categories - Browse All Tools | CalcFort',
    description: 'Browse calculator categories: mathematics, finance, engineering, health, and more tools.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://calcfort.com/calculators',
  },
};

export default function CategoriesPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', current: true }
  ];

  // Main categories page schema
  const categoriesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Calculator Categories - Browse All Tools",
    "description": "Browse calculator categories: mathematics, finance, engineering, health, and more tools.",
    "url": "https://calcfort.com/calculators",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": calculatorCategories.length,
      "itemListElement": calculatorCategories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "name": category.title,
          "description": category.description,
          "url": `https://calcfort.com/calculator/${category.slug}`
        }
      }))
    },
    "publisher": {
      "@type": "Organization",
      "name": "CalcFort"
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoriesSchema)
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
                  <h1 className="text-3xl font-bold text-slate-700 mb-4">Browse All Calculator Categories</h1>
                  <p className="text-gray-600">Explore our complete collection of specialized calculator tools</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {calculatorCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/calculator/${category.slug}`}
                      className="group p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {category.calculators.length} calculator tools
                        </p>
                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                          {category.description}
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
