'use client';

import Link from 'next/link';
import { type CategoryData } from '@/data/categoryData';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/Breadcrumbs';

interface CategoryPageClientProps {
  category: CategoryData;
  breadcrumbs: BreadcrumbItem[];
}

export default function CategoryPageClient({ category, breadcrumbs }: CategoryPageClientProps) {
  const popularCalculators = category.calculators.filter(calc => calc.popular);

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="py-8">
        <div>
            {/* Category Header */}
            <div className="flex items-center mb-12">
              <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl shadow-lg mr-6 flex-shrink-0`}>
                <span className="text-white text-2xl">{category.icon}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.title} Calculators — Free Online Tools</h1>
                <p className="text-lg text-gray-600">{category.description}</p>
              </div>
            </div>


            {/* Popular Calculators */}
            {popularCalculators.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Popular {category.title} Calculators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {popularCalculators.slice(0, 2).map((calculator, index) => (
                    <Link
                      key={index}
                      href={calculator.link || '#'}
                      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 block"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <span className="text-white text-lg">🧮</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {calculator.name}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">🔥</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {calculator.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                            <span className="text-sm">Use Calculator</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          <div className="text-xs text-gray-400">
                            Free • Instant
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All Calculators Grid */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">All {category.title} Calculators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.calculators.map((calculator, index) => (
                  <Link
                    key={index}
                    href={calculator.link || '#'}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 block"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white text-lg">🧮</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {calculator.name}
                            </h3>
                          </div>
                        </div>
                        {calculator.popular && (
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">🔥</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {calculator.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                          <span className="text-sm">Use Calculator</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="text-xs text-gray-400">
                          Free • Instant
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Literature Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">About {category.title}</h3>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {category.literature.introduction}
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Topics Covered</h3>
                <ul className="space-y-2 mb-6">
                  {category.literature.keyTopics.map((topic, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Practical Applications</h3>
                <p className="text-gray-700 leading-relaxed">
                  {category.literature.useCases}
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
