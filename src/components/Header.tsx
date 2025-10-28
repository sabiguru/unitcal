'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchCalculators from './search/SearchCalculators';

export default function Header() {
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showLearnDropdown, setShowLearnDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header id="site-header" className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-amber-200 font-bold text-sm">CF</span>
              </div>
              <div className="text-2xl font-bold text-slate-700">Calcfort</div>
            </Link>
          </div>

          {/* Search - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <SearchCalculators />
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <button
                  onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span>Categories</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showCategoriesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <Link href="/categories" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors mb-2 border-b border-gray-100">
                        <span className="text-lg">📋</span>
                        <div>
                          <div className="font-medium text-gray-900">All Categories</div>
                          <div className="text-xs text-gray-500">Browse all calculator types</div>
                        </div>
                      </Link>
                      <Link href="/category/mathematics" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">🧮</span>
                        <div>
                          <div className="font-medium text-gray-900">Mathematics & Basic Tools</div>
                          <div className="text-xs text-gray-500">12 calculators</div>
                        </div>
                      </Link>
                      <Link href="/category/health" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">🏃‍♂️</span>
                        <div>
                          <div className="font-medium text-gray-900">Health & Fitness</div>
                          <div className="text-xs text-gray-500">9 calculators</div>
                        </div>
                      </Link>
                      <Link href="/category/financial" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">💰</span>
                        <div>
                          <div className="font-medium text-gray-900">Financial & Business</div>
                          <div className="text-xs text-gray-500">14 calculators</div>
                        </div>
                      </Link>
                      <Link href="/category/engineering" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">⚡</span>
                        <div>
                          <div className="font-medium text-gray-900">Engineering & Technology</div>
                          <div className="text-xs text-gray-500">8 calculators</div>
                        </div>
                      </Link>
                      <Link href="/category/automotive" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">🚗</span>
                        <div>
                          <div className="font-medium text-gray-900">Automotive</div>
                          <div className="text-xs text-gray-500">7 calculators</div>
                        </div>
                      </Link>
                      <Link href="/category/space" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">🚀</span>
                        <div>
                          <div className="font-medium text-gray-900">Space & Astronomy</div>
                          <div className="text-xs text-gray-500">2 calculators</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowLearnDropdown(!showLearnDropdown)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span>Learn</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showLearnDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <Link href="/learn" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors mb-2 border-b border-gray-100">
                        <span className="text-lg">📚</span>
                        <div>
                          <div className="font-medium text-gray-900">All Learn Articles</div>
                          <div className="text-xs text-gray-500">Browse all learning content</div>
                        </div>
                      </Link>
                      <Link href="/learn/category/mathematics" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">🧮</span>
                        <div>
                          <div className="font-medium text-gray-900">Mathematics & Basic Tools</div>
                          <div className="text-xs text-gray-500">Learn calculation methods</div>
                        </div>
                      </Link>
                      <Link href="/learn/category/health" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">🏃‍♂️</span>
                        <div>
                          <div className="font-medium text-gray-900">Health & Fitness</div>
                          <div className="text-xs text-gray-500">Learn health calculations</div>
                        </div>
                      </Link>
                      <Link href="/learn/category/financial" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">💰</span>
                        <div>
                          <div className="font-medium text-gray-900">Financial & Business</div>
                          <div className="text-xs text-gray-500">Learn financial formulas</div>
                        </div>
                      </Link>
                      <Link href="/learn/category/engineering" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">⚡</span>
                        <div>
                          <div className="font-medium text-gray-900">Engineering & Technology</div>
                          <div className="text-xs text-gray-500">Learn technical concepts</div>
                        </div>
                      </Link>
                      <Link href="/learn/category/automotive" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">🚗</span>
                        <div>
                          <div className="font-medium text-gray-900">Automotive</div>
                          <div className="text-xs text-gray-500">Learn car calculations</div>
                        </div>
                      </Link>
                      <Link href="/learn/category/space" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">🚀</span>
                        <div>
                          <div className="font-medium text-gray-900">Space & Astronomy</div>
                          <div className="text-xs text-gray-500">Learn space concepts</div>
                        </div>
                      </Link>
                      <Link href="/learn/category/lifestyle" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-lg">📅</span>
                        <div>
                          <div className="font-medium text-gray-900">Lifestyle</div>
                          <div className="text-xs text-gray-500">Learn everyday calculations</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden sm:block">Account</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <Link
                      href="/auth/login"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Sign in with Email
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu - visible only on mobile */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-4">
              {/* Mobile search */}
              <div className="px-2">
                <SearchCalculators />
              </div>
              
              {/* Mobile navigation */}
              <div className="space-y-2">
                <Link
                  href="/categories"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  All Categories
                </Link>
                <Link
                  href="/learn"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Learn
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Contact
                </Link>
              </div>
              
              {/* Mobile account section */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign in with Email
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}