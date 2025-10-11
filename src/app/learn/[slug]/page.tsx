import { notFound } from 'next/navigation';
import { existsSync } from 'fs';
import { join } from 'path';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { getLearnSeo } from '@/data/learnSeoBySlug';
import LearnMDXContent from '@/components/LearnMDXContent';
import LearnNavigation from '@/components/LearnNavigation';
import EzoicAd from '@/components/ads/EzoicAd';
import { EZOIC_PLACEMENTS } from '@/config/ezoicPlacements';

interface LearnPageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LearnPageProps): Promise<Metadata> {
  const { slug } = await params;
  const seoData = getLearnSeo(slug);
  
  if (seoData) {
    return {
      title: seoData.metaTitle,
      description: seoData.metaDescription,
      keywords: [...seoData.variants, ...seoData.longTails].join(', '),
      openGraph: {
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.metaTitle,
        description: seoData.metaDescription,
      },
    };
  }
  
  // Fallback metadata for slugs not in SEO data
  return {
    title: `Learn ${slug.replace(/-/g, ' ')} - Calculator Fort`,
    description: `Learn how to use the ${slug.replace(/-/g, ' ')} calculator with examples, FAQs, and detailed guides.`,
    openGraph: {
      title: `Learn ${slug.replace(/-/g, ' ')} - Calculator Fort`,
      description: `Learn how to use the ${slug.replace(/-/g, ' ')} calculator with examples, FAQs, and detailed guides.`,
      type: 'article',
    },
  };
}

// Check if content exists (simplified for now)
function checkLearnContent(slug: string) {
  const filePath = join(process.cwd(), 'src/learn/calculators', `${slug}.mdx`);
  return existsSync(filePath);
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { slug } = await params;
  const contentExists = checkLearnContent(slug);

  if (!contentExists) {
    notFound();
  }

  const seoData = getLearnSeo(slug);
  const title = seoData?.metaTitle || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content with Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <LearnMDXContent slug={slug} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Navigation */}
            <LearnNavigation slug={slug} />

            {/* Related Calculators */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-purple-500 mr-2">🔗</span>
                Related Calculators
              </h3>
              <div className="space-y-3">
                <a href="/calculator/scientific" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="font-medium text-gray-800">Scientific Calculator</div>
                  <div className="text-sm text-gray-600">Advanced mathematical functions</div>
                </a>
                <a href="/calculator/percentage" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="font-medium text-gray-800">Percentage Calculator</div>
                  <div className="text-sm text-gray-600">Calculate percentages easily</div>
                </a>
                <a href="/calculator/fraction" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="font-medium text-gray-800">Fraction Calculator</div>
                  <div className="text-sm text-gray-600">Work with fractions and mixed numbers</div>
                </a>
              </div>
            </div>

            {/* Advertisement */}
            <div className="mb-6">
              <EzoicAd placementId={EZOIC_PLACEMENTS.LEARN_SIDEBAR} className="text-center" />
            </div>

            {/* Tips Box */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <span className="text-green-600 mr-2">💡</span>
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                  Bookmark this page for quick reference
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                  Practice with real examples to master the concepts
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                  Use keyboard shortcuts for faster calculations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}