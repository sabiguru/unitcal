import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import CalculatorCategoryGrid from '@/components/CalculatorCategoryGrid';

export const metadata: Metadata = {
  title: 'About CalcFort - Free Online Calculator Tools',
  description: 'Discover CalcFort\'s mission to deliver fast, accurate, free calculators for math, finance, health, engineering, and everyday use.',
  alternates: {
    canonical: 'https://calcfort.com/about',
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', current: true }
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Precision & Accuracy',
      description: 'All calculations are mathematically verified and tested for accuracy across different scenarios and edge cases.'
    },
    {
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'Every calculator works seamlessly on desktop, tablet, and mobile devices with optimized touch interfaces.'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Instant calculations with real-time results as you type, powered by optimized algorithms.'
    },
    {
      icon: '🔒',
      title: 'Privacy Focused',
      description: 'No data tracking, no cookies for calculations, and all computations happen locally in your browser.'
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Clean, intuitive interfaces designed for clarity and ease of use by users of all skill levels.'
    },
    {
      icon: '🌍',
      title: 'Globally Accessible',
      description: 'Available 24/7 from anywhere in the world, supporting multiple units and international standards.'
    }
  ];

  const team = [
    {
      name: 'Engineering Team',
      role: 'Algorithm Development',
      description: 'Expert mathematicians and engineers ensuring calculation accuracy and performance optimization.'
    },
    {
      name: 'Design Team',
      role: 'User Experience',
      description: 'UX specialists focused on creating intuitive interfaces that make complex calculations simple.'
    },
    {
      name: 'Quality Team',
      role: 'Testing & Validation',
      description: 'Rigorous testing across devices and browsers to ensure reliability and consistency.'
    }
  ];

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={breadcrumbs} />
        
        {/* Hero Section */}
        <div className="text-center mb-16 py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl shadow-lg mb-8">
            <span className="text-amber-200 text-4xl">🧮</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-700 mb-6">About Calculator Fort</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted source for fast, accurate online calculators and conversion tools. 
            From basic arithmetic to complex engineering calculations - making math simple for everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-700 mb-6">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We believe that powerful calculation tools should be accessible to everyone, everywhere. Whether you're 
                  a student solving homework, a professional making critical decisions, or someone planning their finances, 
                  Calculator Fort provides the precision and reliability you need.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our platform combines mathematical accuracy with intuitive design, making complex calculations 
                  simple and accessible to users of all skill levels across the globe.
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-4">80+ Calculators</h3>
                  <p className="text-gray-600 text-sm">
                    Covering mathematics, finance, health, engineering, and specialized fields
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-slate-700 text-center mb-12">Why Choose Calculator Fort</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator Categories */}
        <div className="mb-20">
          <CalculatorCategoryGrid title="Calculator Categories" />
        </div>

        {/* Author Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-slate-700 text-center mb-12">Meet the Author</h3>
          <div className="max-w-2xl mx-auto">
            <Link href="/about/ben-konna" className="block bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-200 text-3xl font-bold">BK</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-700 mb-1">Ben Konna</h4>
                  <p className="text-blue-600 font-medium mb-2">Technical Author</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    PhD in Electrical and Electronic Engineering with expertise in mathematics and technical implementation.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-slate-700 text-center mb-12">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-200 text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl shadow-xl p-8 lg:p-12 text-white text-center mb-12">
          <h3 className="text-2xl font-bold mb-8">Calculator Fort by the Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">80+</div>
              <div className="text-amber-200">Calculators Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Free</div>
              <div className="text-amber-200">Always & Forever</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-amber-200">Always Available</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
