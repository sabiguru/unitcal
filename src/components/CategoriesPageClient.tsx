'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculatorCategories } from '@/data/categoryData';

export default function CategoriesPageClient() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header/Navbar */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BC</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Calculator Fort</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculator Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive collection of calculators organized by category. 
            From basic math to advanced engineering calculations.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorCategories.map((category, index) => (
            <Link
              key={index}
              href={`/category/${category.slug}`}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 block"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                    <span className="text-white text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-500">{category.calculators.length} calculators</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                
                {/* Show popular calculators */}
                {category.calculators.filter(calc => calc.popular).length > 0 && (
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <p className="text-xs text-gray-500 mb-2">Popular calculators:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.calculators
                        .filter(calc => calc.popular)
                        .slice(0, 3)
                        .map((calc, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {calc.name}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    <span>View Category</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Calculator Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {calculatorCategories.length}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {calculatorCategories.reduce((total, cat) => total + cat.calculators.length, 0)}+
              </div>
              <div className="text-gray-600">Calculators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {calculatorCategories.reduce((total, cat) => 
                  total + cat.calculators.filter(calc => calc.popular).length, 0
                )}
              </div>
              <div className="text-gray-600">Popular Tools</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}