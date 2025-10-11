'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userData = {
    name: session.user?.name || 'User',
    email: session.user?.email || '',
    plan: 'Free',
    joinDate: '2024-01-15',
    calculationsUsed: 27,
    calculationsLimit: 50,
    favoriteCalculators: 8
  };

  const recentCalculations = [
    { type: 'Compound Interest', result: '$15,432.18', date: '2024-01-20', category: 'Financial' },
    { type: 'BMI Calculator', result: '22.5 (Normal)', date: '2024-01-19', category: 'Health' },
    { type: 'Loan Calculator', result: '$1,247.50/month', date: '2024-01-18', category: 'Financial' },
    { type: 'Percentage Calculator', result: '25% increase', date: '2024-01-17', category: 'Mathematics' },
    { type: 'Age Calculator', result: '28 years, 5 months', date: '2024-01-16', category: 'Everyday' }
  ];

  const favoriteCalculators = [
    { name: 'Compound Interest', category: 'Financial', icon: '💰', link: '/calculator/compound-interest' },
    { name: 'BMI Calculator', category: 'Health', icon: '🏃‍♂️', link: '/calculator/bmi' },
    { name: 'Loan Calculator', category: 'Financial', icon: '🏦', link: '/calculator/loan' },
    { name: 'Percentage Calculator', category: 'Mathematics', icon: '🧮', link: '/calculator/percentage' },
    { name: 'Date Calculator', category: 'Everyday', icon: '📅', link: '/calculator/date' },
    { name: 'Tip Calculator', category: 'Everyday', icon: '💡', link: '/calculator/tip' },
    { name: 'Unit Converter', category: 'Engineering', icon: '⚡', link: '/calculator/unit-converter' },
    { name: 'Calorie Calculator', category: 'Health', icon: '🍎', link: '/calculator/calorie' }
  ];

  const calculatorCategories = [
    { title: 'Mathematics & Basic Tools', icon: '🧮', slug: 'mathematics', count: 12 },
    { title: 'Health & Fitness', icon: '🏃‍♂️', slug: 'health', count: 9 },
    { title: 'Financial & Business', icon: '💰', slug: 'financial', count: 14 },
    { title: 'Engineering & Technology', icon: '⚡', slug: 'engineering', count: 8 },
    { title: 'Automotive', icon: '🚗', slug: 'automotive', count: 7 },
    { title: 'Cooking & Food', icon: '👨‍🍳', slug: 'cooking', count: 4 },
    { title: 'Education & Science', icon: '🔬', slug: 'education', count: 5 },
    { title: 'Everyday Life', icon: '📅', slug: 'everyday', count: 6 },
    { title: 'Construction & DIY', icon: '🏗️', slug: 'construction', count: 7 },
    { title: 'Specialized Conversions', icon: '🔄', slug: 'conversions', count: 3 },
    { title: 'Unique & Niche', icon: '🎲', slug: 'unique', count: 4 }
  ];

  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };

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

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
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
                        {calculatorCategories.map((cat, index) => (
                          <Link
                            key={index}
                            href={`/category/${cat.slug}`}
                            className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-lg">{cat.icon}</span>
                            <div>
                              <div className="font-medium text-gray-900">{cat.title}</div>
                              <div className="text-xs text-gray-500">{cat.count} calculators</div>
                            </div>
                          </Link>
                        ))}
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
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{userData.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <span className="hidden sm:block">{userData.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-medium text-gray-900">{userData.name}</p>
                      <p className="text-sm text-gray-600">{userData.email}</p>
                      <p className="text-xs text-blue-600 font-medium">{userData.plan} Plan</p>
                    </div>
                    <div className="p-2">
                      <Link href="/account/dashboard" className="w-full flex items-center space-x-3 px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                        </svg>
                        <span>Dashboard</span>
                      </Link>
                      <Link href="/account/settings" className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                      </Link>
                      <button onClick={logout} className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userData.name.split(' ')[0]}!</h1>
          <p className="text-gray-600">Here's your calculation activity and saved tools.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Plan Status</p>
                <p className="text-2xl font-bold text-gray-900">{userData.plan}</p>
                <p className="text-xs text-blue-600">Member since {new Date(userData.joinDate).toLocaleDateString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👤</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calculations This Month</p>
                <p className="text-2xl font-bold text-gray-900">{userData.calculationsUsed}</p>
                <p className="text-xs text-gray-500">{userData.plan === 'Free' ? `${userData.calculationsLimit} limit` : 'Unlimited'}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favorite Calculators</p>
                <p className="text-2xl font-bold text-gray-900">{userData.favoriteCalculators}</p>
                <p className="text-xs text-gray-500">Quick access tools</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Account Status</p>
                <p className="text-2xl font-bold text-green-600">Active</p>
                <Link href="/account/settings" className="text-xs text-blue-600 hover:text-blue-800">Manage account</Link>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Calculations */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Calculations</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentCalculations.map((calc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{calc.type}</p>
                    <p className="text-sm text-gray-600">{calc.result}</p>
                    <p className="text-xs text-gray-500">{calc.category} • {new Date(calc.date).toLocaleDateString()}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Calculators */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Favorite Calculators</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {favoriteCalculators.map((calc, index) => (
                <Link
                  key={index}
                  href={calc.link}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{calc.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{calc.name}</p>
                      <p className="text-xs text-gray-500">{calc.category}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Upgrade Prompt for Free Users */}
        {userData.plan === 'Free' && (
          <div className="mt-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl shadow-xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="text-purple-100 mb-4">
                  Unlock unlimited calculations, advanced features, and priority support.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span>✓</span>
                    <span>Unlimited calculations</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>✓</span>
                    <span>Export results</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>✓</span>
                    <span>No ads</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">$9.99</div>
                <div className="text-purple-200 text-sm mb-4">per month</div>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}