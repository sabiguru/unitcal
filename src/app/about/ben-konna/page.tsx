import type { Metadata } from 'next';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ben Konna - Author | CalcFort',
  description: 'Ben Konna holds a PhD in Electrical and Electronic Engineering with expertise in mathematics and technical implementation. Author of calculator guides at CalcFort.',
  alternates: {
    canonical: 'https://calcfort.com/about/ben-konna',
  },
  openGraph: {
    title: 'Ben Konna - Author | CalcFort',
    description: 'Ben Konna holds a PhD in Electrical and Electronic Engineering with expertise in mathematics and technical implementation.',
    url: 'https://calcfort.com/about/ben-konna',
    siteName: 'CalcFort',
    type: 'profile',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ben Konna - CalcFort Author'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ben Konna - Author | CalcFort',
    description: 'Ben Konna holds a PhD in Electrical and Electronic Engineering with expertise in mathematics and technical implementation.',
    images: ['/og-image.png']
  }
};

// Person schema for structured data
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ben Konna',
  url: 'https://calcfort.com/about/ben-konna',
  description: 'PhD engineer specialising in mathematics and technical implementation. Author of calculator guides and educational content at CalcFort.',
  jobTitle: 'Technical Author',
  knowsAbout: [
    'Mathematics',
    'Electrical Engineering',
    'Circuit Design',
    'Technical Writing'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'CalcFort',
    url: 'https://calcfort.com'
  }
};

export default function BenKonnaPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Ben Konna', current: true, canonicalUrl: 'https://calcfort.com/about/ben-konna' }
  ];

  const expertise = [
    {
      area: 'Mathematics',
      description: 'Advanced mathematical concepts including algebra, calculus, complex numbers, and numerical methods.'
    },
    {
      area: 'Electrical Engineering',
      description: 'Circuit analysis, signal processing, and electronic systems design.'
    },
    {
      area: 'Technical Implementation',
      description: 'Practical application of engineering principles to solve real-world problems.'
    },
    {
      area: 'Technical Writing',
      description: 'Educational content development, curriculum design, and technical documentation.'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={breadcrumbs} />

        {/* Author Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Profile Photo Placeholder */}
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <div className="w-48 h-48 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-amber-200 text-6xl font-bold">BK</span>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-slate-700 mb-4">Ben Konna</h1>
              <p className="text-lg text-blue-600 font-medium mb-6">Technical Author at CalcFort</p>

              <div className="prose prose-slate max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Ben holds a PhD in Electrical and Electronic Engineering, with research focused on
                  robust, low-power circuit design and implementation-aware design trade-offs.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  With over a decade of experience in technical design and implementation, Ben brings
                  deep expertise in mathematics, engineering tools, and practical calculation methods.
                  He has published peer-reviewed papers at IEEE conferences and has extensive
                  experience developing educational content.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Ben enjoys designing calculators that make complex technical concepts accessible
                  to everyone, combining mathematical precision with clear, practical explanations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Areas of Expertise */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-700 mb-6">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertise.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-2">{item.area}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Explore Calculators by Ben</h2>
          <p className="text-amber-200 mb-6">
            Browse the collection of free calculators designed with precision and clarity.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-slate-700 font-semibold px-8 py-3 rounded-lg hover:bg-amber-100 transition-colors"
          >
            View All Calculators
          </Link>
        </div>
      </div>
    </>
  );
}
