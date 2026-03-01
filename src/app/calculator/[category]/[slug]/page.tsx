import { notFound, redirect } from 'next/navigation';
import { calculators, bySlug } from '@/data/calculators';
import { seoBySlug } from '@/data/seoBySlug';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateCalculatorBreadcrumbs } from '@/lib/breadcrumbs';
import { getRelatedCalculators } from '@/data/relatedCalculators';
import { getCategoryForCalculator } from '@/utils/calculatorCategoryMapping';
import MDXContent from '@/components/MDXContent';
import SchemaMarkup from '@/components/SchemaMarkup';
import { organizationSchema, generateCalculatorSchema, generateWebPageSchema } from '@/config/schemas';
import CalculatorWithReset from '@/components/CalculatorWithReset';
import AuthorByline from '@/components/AuthorByline';

export function generateStaticParams() {
  return calculators.map((c) => {
    const category = getCategoryForCalculator(c.slug);
    return {
      category: category || 'other',
      slug: c.slug
    };
  });
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const meta = bySlug[slug];
  const seoData = seoBySlug[slug];

  // Verify the slug belongs to this category
  const correctCategory = getCategoryForCalculator(slug);
  if (correctCategory !== category) {
    return {};
  }

  if (!meta) return {};

  const pageTitle = seoData?.metaTitle || `${meta.title} | CalcFort`;
  const pageDescription = seoData?.metaDescription || meta.description;
  const pageUrl = `https://calcfort.com/calculator/${category}/${slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: seoData ? [
      seoData.primaryKeyword,
      ...seoData.variants.slice(0, 3),
      'CalcFort'
    ].join(', ') : undefined,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      siteName: 'CalcFort',
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${meta.title} - CalcFort`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: ['/og-image.png']
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;

  // Verify the slug belongs to this category
  const correctCategory = getCategoryForCalculator(slug);
  if (correctCategory !== category) {
    // Redirect to correct category if it exists
    if (correctCategory) {
      redirect(`/calculator/${correctCategory}/${slug}`);
    }
    notFound();
  }

  const meta = bySlug[slug];
  const seoData = seoBySlug[slug];

  if (!meta) return notFound();

  const Calc = meta.component;
  const calculatorUrl = `https://calcfort.com/calculator/${category}/${slug}`;
  const breadcrumbs = generateCalculatorBreadcrumbs(meta.title, meta.category, calculatorUrl);
  const relatedCalculators = getRelatedCalculators(slug);

  // Generate schemas for calculator page
  const calculatorSchemaData = generateCalculatorSchema(
    meta.title,
    calculatorUrl,
    meta.description,
    meta.category
  );
  const webPageSchemaData = generateWebPageSchema(
    meta.title,
    calculatorUrl,
    meta.description || ''
  );

  const allSchemas = [
    organizationSchema,
    calculatorSchemaData,
    webPageSchemaData
  ];

  return (
    <>
      <SchemaMarkup schema={allSchemas} />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-12 gap-6">
          <main className="col-span-12 lg:col-span-8 space-y-6">
            <CalculatorWithReset>
              <Calc />
            </CalculatorWithReset>

            {meta.mdx && (
              <>
                <AuthorByline className="mb-4" />
                <MDXContent slug={meta.mdx.replace('.mdx', '')} />
              </>
            )}
          </main>

          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {relatedCalculators && relatedCalculators.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
                <h2 className="text-xl font-bold text-slate-700 mb-4">Related {meta.category} Calculators</h2>
                <div className="space-y-3">
                  {relatedCalculators.map((calc) => (
                    <a
                      key={calc.slug}
                      href={calc.link}
                      className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="font-semibold text-slate-700 mb-1">{calc.name}</div>
                      <div className="text-sm text-gray-600">{calc.description}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
