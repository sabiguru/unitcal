import type { Metadata } from 'next';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ben Konna - Author | CalcFort',
  description: 'Ben Konna holds a PhD in Electrical and Electronic Engineering with expertise in mathematics, IC design, and technical implementation. Author of calculator guides at CalcFort.',
  alternates: {
    canonical: 'https://calcfort.com/about/ben-konna',
  },
  openGraph: {
    title: 'Ben Konna - Author | CalcFort',
    description: 'Ben Konna holds a PhD in Electrical and Electronic Engineering with expertise in mathematics, IC design, and technical implementation.',
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
    description: 'Ben Konna holds a PhD in Electrical and Electronic Engineering with expertise in mathematics, IC design, and technical implementation.',
    images: ['/og-image.png']
  }
};

// Person schema for structured data
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ben Konna',
  url: 'https://calcfort.com/about/ben-konna',
  description: 'PhD engineer specialising in mathematics, IC design, and technical implementation. Author of calculator guides and educational content at CalcFort.',
  jobTitle: 'Technical Author',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Newcastle University',
      description: 'PhD in Electrical and Electronic Engineering'
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of York',
      description: 'MSc in Digital Systems Engineering'
    }
  ],
  knowsAbout: [
    'Mathematics',
    'Electrical Engineering',
    'IC Design',
    'Physical Implementation',
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
      area: 'IC Design',
      description: 'Integrated circuit implementation, timing analysis, and physical design on advanced technology nodes.'
    },
    {
      area: 'Technical Writing',
      description: 'Educational content development, curriculum design, and technical documentation.'
    }
  ];

  const publications = [
    'Loadable Kessels Counter — IEEE ASYNC Conference, 2018',
    'DCO Based on Worst-Case Delay of a Self-Timed Counter — IEEE NEWCAS, 2016',
    'An Elastic Timer for Wide Dynamic Working Range — IEEE NEWCAS, 2015'
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
                  Ben holds a PhD in Electrical and Electronic Engineering from Newcastle University,
                  where his research focused on robust, low-power asynchronous circuit design with
                  strong relevance to timing robustness and implementation-aware design trade-offs.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  With over a decade of experience in technical IC design and implementation, Ben brings
                  deep expertise in mathematics, engineering tools, and practical calculation methods.
                  His work spans hierarchical implementation, timing analysis, and physical design on
                  advanced technology nodes.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Ben has published three peer-reviewed papers at IEEE conferences and has extensive
                  experience in developing educational content for SoC design and implementation.
                  He enjoys designing calculators that make complex technical concepts accessible
                  to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-700 mb-6">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">PhD in Electrical and Electronic Engineering</h3>
              <p className="text-blue-600 font-medium mb-2">Newcastle University</p>
              <p className="text-gray-600 text-sm">
                Research in robust, low-power asynchronous circuit design. Designed and taped out
                two asynchronous ICs using the Cadence tool suite from schematic capture through
                physical implementation.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">MSc in Digital Systems Engineering</h3>
              <p className="text-blue-600 font-medium mb-2">University of York</p>
              <p className="text-gray-600 text-sm">
                Advanced study in digital systems, providing foundational knowledge for
                subsequent research and professional work in IC design.
              </p>
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

        {/* Publications */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-700 mb-6">Peer-Reviewed Publications</h2>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <ul className="space-y-4">
              {publications.map((pub, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{pub}</span>
                </li>
              ))}
            </ul>
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
