import { MetadataRoute } from 'next';
import { calculators } from '@/data/calculators';
import { calculatorCategories } from '@/data/categoryData';
import { getAvailableLearnSlugs } from '@/data/learnSeoBySlug';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calcfort.com';
  const currentDate = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];


  // Dynamic calculator routes
  const calculatorRoutes: MetadataRoute.Sitemap = calculators.map(calculator => ({
    url: `${baseUrl}/calculator/${calculator.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic category routes
  const categoryRoutes: MetadataRoute.Sitemap = calculatorCategories.map(category => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Function to map learn articles to categories
  function getLearnCategoriesWithContent() {
    const availableLearnSlugs = getAvailableLearnSlugs();
    const categoryMapping: Record<string, string[]> = {
      'mathematics': [
        'basic', 'scientific', 'graphing', 'fraction', 'percentage', 'ratio', 'prime', 'matrix',
        'equation-solver', 'age', 'date', 'tip', 'unit-converter', 'area', 'volume',
        'significant-figures', 'roman-numerals', 'binary-converter', 'time', 'speed'
      ],
      'health': [
        'bmi', 'bmr', 'bodyfat', 'calorie', 'protein', 'heartrate', 'fitness', 'sleep', 'water'
      ],
      'financial': [
        'budget', 'compound-interest', 'credit-card-payoff', 'currency-converter', 'depreciation',
        'discount', 'interest', 'investment', 'loan', 'mortgage', 'npv-irr', 'refinance',
        'retirement', 'roi', 'salary', 'tax', 'car-lease', 'car-loan'
      ],
      'engineering': [
        'capacitor', 'electrical', 'energy-usage', 'ohms-law', 'resistor', 'molecular-weight',
        'stoichiometry', 'ph', 'subnet', 'carbon-footprint'
      ],
      'automotive': [
        'mpg', 'fuel-cost', 'ev-range', 'tire-size'
      ],
      'construction': [
        'paint', 'patio', 'concrete', 'roofing', 'stairs', 'tile'
      ],
      'lifestyle': [
        'baking', 'recipe-converter', 'coffee-ratio', 'dog-age', 'cat-age', 'love-calculator',
        'timezone-converter', 'countdown-timer', 'morse-code', 'password-generator',
        'braille-translator', 'age-on-mars', 'planetary-years', 'time-on-mars', 'weight-on-mars',
        'space-weight', 'golf-balls-boeing-747', 'alcohol-dilution', 'aquarium-volume',
        'home-energy-audit', 'gpa', 'seed-spacing', 'suanpan-abacus', 'soroban-abacus', 'western-abacus'
      ]
    };

    return calculatorCategories
      .filter(category => category.slug !== 'cooking') // Exclude cooking category
      .filter(category => {
        const learnSlugs = categoryMapping[category.slug] || [];
        const availableArticles = learnSlugs.filter(slug => availableLearnSlugs.includes(slug));
        return availableArticles.length > 0;
      })
      .map(category => category.slug);
  }

  // Dynamic learn category routes
  const learnCategoryRoutes: MetadataRoute.Sitemap = getLearnCategoriesWithContent().map(categorySlug => ({
    url: `${baseUrl}/learn/category/${categorySlug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic individual learn article routes
  const learnArticleRoutes: MetadataRoute.Sitemap = getAvailableLearnSlugs().map(slug => ({
    url: `${baseUrl}/learn/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...calculatorRoutes,
    ...categoryRoutes,
    ...learnCategoryRoutes,
    ...learnArticleRoutes,
  ];
}