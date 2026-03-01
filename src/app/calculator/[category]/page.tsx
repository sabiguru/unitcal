import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { calculatorCategories } from '@/data/categoryData';
import { categorySchemas } from '@/data/schemas/categorySchemas';
import { generateCategoryBreadcrumbs } from '@/lib/breadcrumbs';
import CategoryPageClient from '@/components/CategoryPageClient';
import Header from '@/components/Header';
import SchemaMarkup from '@/components/SchemaMarkup';
import { organizationSchema, generateCollectionPageSchema, generateWebPageSchema } from '@/config/schemas';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Enhanced metadata generation for category pages
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = calculatorCategories.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    return {
      title: 'Category Not Found | CalcFort',
      description: 'The requested calculator category could not be found.'
    };
  }

  const calculatorCount = category.calculators.length;
  const popularCalculators = category.calculators.filter(calc => calc.popular).slice(0, 3);
  const popularNames = popularCalculators.map(calc => calc.name).join(', ');
  const shortDescription = category.slug === 'cooking'
    ? 'Culinary calculators for chefs and bakers: Recipe Converter, Baking Calculator, Coffee Ratio Calculator. Four free tools.'
    : `${category.description} Popular tools include ${popularNames}. ${calculatorCount} free calculators available.`;
  const ogDescription = category.slug === 'cooking'
    ? 'Free cooking calculators for recipe scaling, baking, and coffee ratios.'
    : `Free ${category.title.toLowerCase()} calculators and tools. ${category.description}`;
  
  return {
    title: `${category.title} Calculators | CalcFort`,
    description: shortDescription,
    keywords: [
      `${category.title.toLowerCase()} calculators`,
      `${category.title.toLowerCase()} tools`,
      'free online calculators',
      'calculator tools',
      'instant calculations',
      'CalcFort'
    ],
    openGraph: {
      title: `${category.title} Calculators | CalcFort`,
      description: ogDescription,
      url: `https://calcfort.com/calculator/${category.slug}`,
      siteName: 'CalcFort',
      images: [
        {
          url: `/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${category.title} Calculators - CalcFort`,
          type: 'image/jpeg',
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} Calculators | CalcFort`,
      description: category.slug === 'cooking'
        ? 'Culinary calculators for recipes, baking, and coffee ratios.'
        : `${calculatorCount} free ${category.title.toLowerCase()} calculators. ${category.description}`,
      images: [`/og-image.png`],
      creator: '@CalcFort',
      site: '@CalcFort',
    },
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
      canonical: `https://calcfort.com/calculator/${category.slug}`,
    },
    other: {
      'og:image:alt': `${category.title} Calculators`,
      'theme-color': '#ffffff',
    },
  };
}

// Generate static params for all categories
export function generateStaticParams() {
  return calculatorCategories.map((cat) => ({
    category: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = calculatorCategories.find(cat => cat.slug === categorySlug);
  const schemas = categorySchemas[categorySlug as keyof typeof categorySchemas];

  if (!category) {
    notFound();
  }

  const categoryUrl = `https://calcfort.com/calculator/${categorySlug}`;
  const breadcrumbs = generateCategoryBreadcrumbs(category.title, categoryUrl);

  // Generate schemas for category page
  const collectionSchemaData = generateCollectionPageSchema(
    `${category.title} Calculators`,
    categoryUrl,
    category.description,
    category.calculators.length
  );

  const webPageSchemaData = generateWebPageSchema(
    `${category.title} Calculators`,
    categoryUrl,
    category.description,
    breadcrumbs.map(b => ({
      name: b.label,
      url: b.canonicalUrl || (b.href ? `https://calcfort.com${b.href}` : categoryUrl)
    }))
  );

  const allSchemas = [
    organizationSchema,
    collectionSchemaData,
    webPageSchemaData,
    ...(schemas?.webApp ? [schemas.webApp] : [])
  ];

  return (
    <>
      <SchemaMarkup schema={allSchemas} />
      {/* Removed old schema code - now using SchemaMarkup component */}
      {false && schemas?.webApp && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas.webApp)
          }}
        />
      )}
      {schemas?.collectionPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas.collectionPage)
          }}
        />
      )}
      
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          <main className="col-span-12">
            <CategoryPageClient category={category} breadcrumbs={breadcrumbs} />
          </main>
        </div>
      </div>
    </>
  );
}
