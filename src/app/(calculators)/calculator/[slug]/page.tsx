import { notFound } from 'next/navigation';
import { calculators, bySlug } from '@/data/calculators';
import { seoBySlug } from '@/data/seoBySlug';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateCalculatorBreadcrumbs } from '@/lib/breadcrumbs';
import EzoicAd from '@/components/ads/EzoicAd';
import { EZOIC_PLACEMENTS } from '@/config/ezoicPlacements';
import MDXContent from '@/components/MDXContent';
import CalculatorLearnCrosslink from '@/components/CalculatorLearnCrosslink';


export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = bySlug[slug];
  const seoData = seoBySlug[slug];

  if (!meta) return {};

  return {
    title: seoData?.metaTitle || `${meta.title} | CalcFort`,
    description: seoData?.metaDescription || meta.description,
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
    alternates: {
      canonical: `https://calcfort.com/calculator/${slug}`,
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = bySlug[slug];
  const seoData = seoBySlug[slug];
  
  if (!meta) return notFound();

  const Calc = meta.component;
  const breadcrumbs = generateCalculatorBreadcrumbs(meta.title, meta.category);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {seoData?.webAppSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.webAppSchema)
          }}
        />
      )}
      {seoData?.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.faqSchema)
          }}
        />
      )}
      
      <Breadcrumbs items={breadcrumbs} />
      <div className="bg-white rounded-none sm:rounded-xl shadow-lg border-0 sm:border border-gray-200 overflow-hidden mb-8">
        <div className="p-3 sm:p-6">
          <Calc />
        </div>
      </div>

      {/* Learn Guide Crosslink */}
      <CalculatorLearnCrosslink calculatorSlug={slug} calculatorTitle={meta.title} />

      {/* Advertisement between calculator and content */}
      <div className="mb-8">
        <EzoicAd placementId={EZOIC_PLACEMENTS.CALCULATOR_CONTENT} className="text-center" />
      </div>

      {meta.mdx && <MDXContent slug={meta.mdx.replace('.mdx', '')} />}
    </>
  );
}