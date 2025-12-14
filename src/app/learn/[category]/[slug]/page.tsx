import { notFound } from 'next/navigation';
import { existsSync } from 'fs';
import { join } from 'path';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { getLearnSeo } from '@/data/learnSeoBySlug';
import LearnMDXContent from '@/components/LearnMDXContent';
import EzoicAd from '@/components/ads/EzoicAd';
import { EZOIC_PLACEMENTS } from '@/config/ezoicPlacements';
import { getRelatedCalculators } from '@/data/relatedCalculators';
import { getCategoryForSlug, getSlugsForCategory } from '@/utils/learnCategoryMapping';
import { calculatorCategories } from '@/data/categoryData';
import { getAvailableLearnSlugs } from '@/data/learnSeoBySlug';
import SchemaMarkup from '@/components/SchemaMarkup';
import { organizationSchema, generateArticleSchema, generateWebPageSchema } from '@/config/schemas';

interface LearnPageProps {
  params: Promise<{ category: string; slug: string }>;
}

// Generate static params for all category/slug combinations
export async function generateStaticParams() {
  const availableLearnSlugs = Array.from(
    new Set([
      ...getAvailableLearnSlugs(),
      ...Object.values(require('@/utils/learnCategoryMapping').LEARN_CATEGORY_MAPPING).flat()
    ])
  );
  const params: { category: string; slug: string }[] = [];

  for (const slug of availableLearnSlugs) {
    const category = getCategoryForSlug(slug);
    if (category) {
      params.push({ category, slug });
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LearnPageProps): Promise<Metadata> {
  const { category, slug } = await params;

  // Verify the slug belongs to this category
  const correctCategory = getCategoryForSlug(slug);
  if (correctCategory !== category) {
    return {
      title: 'Article Not Found | Calcfort',
      description: 'The requested article could not be found.'
    };
  }

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
      alternates: {
        canonical: `https://calcfort.com/learn/${category}/${slug}`,
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
    alternates: {
      canonical: `https://calcfort.com/learn/${category}/${slug}`,
    },
  };
}

// Check if content exists (simplified for now)
function checkLearnContent(slug: string) {
  const filePath = join(process.cwd(), 'src/learn/calculators', `${slug}.mdx`);
  return existsSync(filePath);
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { category, slug } = await params;

  // Verify the slug belongs to this category
  const correctCategory = getCategoryForSlug(slug);
  if (correctCategory !== category || !correctCategory) {
    notFound();
  }

  const contentExists = checkLearnContent(slug);
  if (!contentExists) {
    notFound();
  }

  const seoData = getLearnSeo(slug);
  const title = seoData?.metaTitle || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const relatedCalculators = getRelatedCalculators(slug);

  // Get category info for breadcrumbs
  const categoryData = calculatorCategories.find(cat => cat.slug === category);

  // Generate schemas for learn page
  const learnUrl = `https://calcfort.com/learn/${category}/${slug}`;
  const description = seoData?.metaDescription || `Learn about ${title}`;
  const currentDate = new Date().toISOString();

  const articleSchemaData = generateArticleSchema(
    title,
    description,
    learnUrl,
    currentDate,
    currentDate
  );

  const webPageSchemaData = generateWebPageSchema(
    title,
    learnUrl,
    description,
    [
      { name: 'Home', url: 'https://calcfort.com' },
      { name: 'Learn', url: 'https://calcfort.com/learn' },
      { name: categoryData?.title || category, url: `https://calcfort.com/learn/${category}` },
      { name: title, url: learnUrl }
    ]
  );

  const allSchemas = [organizationSchema, articleSchemaData, webPageSchemaData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <SchemaMarkup schema={allSchemas} />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs for SEO */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-blue-600">Home</a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <a href="/learn" className="hover:text-blue-600">Learn</a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <a href={`/learn/${category}`} className="hover:text-blue-600">
                {categoryData?.title || category}
              </a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">{title}</span>
            </li>
          </ol>
        </nav>

        {/* Main Content with Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <LearnMDXContent slug={slug} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Related Calculators - Dynamic based on article slug */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-gray-600 mr-2">🔗</span>
                Related Calculators
              </h3>
              <div className="space-y-3">
                {relatedCalculators.map((calc) => (
                  <a
                    key={calc.slug}
                    href={calc.link}
                    className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="font-medium text-gray-800">{calc.name}</div>
                    <div className="text-sm text-gray-600">{calc.description}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Advertisement */}
            <div className="mb-6">
              <EzoicAd placementId={EZOIC_PLACEMENTS.LEARN_SIDEBAR} className="text-center" />
            </div>

            {/* Tips Box */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="text-gray-600 mr-2">💡</span>
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2 mt-0.5">•</span>
                  Bookmark this page for quick reference
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2 mt-0.5">•</span>
                  Practice with real examples to master the concepts
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2 mt-0.5">•</span>
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
