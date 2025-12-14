import { MetadataRoute } from 'next';
import { calculators } from '@/data/calculators';
import { calculatorCategories } from '@/data/categoryData';
import { getAvailableLearnSlugs } from '@/data/learnSeoBySlug';
import { getCategoryForSlug } from '@/utils/learnCategoryMapping';
import { getCategoryForCalculator } from '@/utils/calculatorCategoryMapping';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calcfort.com';
  const currentDate = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
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
  const calculatorRoutes: MetadataRoute.Sitemap = calculators.map(calculator => {
    const category = getCategoryForCalculator(calculator.slug);
    return {
      url: category ? `${baseUrl}/calculator/${category}/${calculator.slug}` : `${baseUrl}/calculator/${calculator.slug}`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    };
  });

  // Dynamic category routes
  const categoryRoutes: MetadataRoute.Sitemap = calculatorCategories.map(category => ({
    url: `${baseUrl}/calculator/${category.slug}`,
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
        'equation-solver', 'significant-figures', 'binary-converter', 'speed',
        'suanpan-abacus', 'soroban-abacus', 'western-abacus'
      ],
      'health': [
        'bmi', 'bmr', 'bodyfat', 'calorie', 'protein', 'heartrate', 'fitness', 'sleep', 'water',
        'wearable-tech-data-driven-fitness', 'strength-training-building-muscle-healthgoal',
        'holistic-recovery-mobility-low-impact-training', 'quick-home-workouts'
      ],
      'financial': [
        'budget', 'compound-interest', 'credit-card-payoff', 'currency-converter', 'depreciation',
        'discount', 'interest', 'investment', 'loan', 'mortgage', 'npv-irr', 'refinance',
        'retirement', 'roi', 'salary', 'tax', 'car-lease', 'car-loan', 'finance-automation-2026',
        'remote-work-2026'
      ],
      'engineering': [
        'capacitor', 'electrical', 'ohms-law', 'resistor', 'subnet', 'password-generator',
        'ai-engineering-2026', 'concept-to-silicon'
      ],
      'automotive': [
        'mpg', 'fuel-cost', 'ev-range', 'tire-size'
      ],
      'construction': [
        'paint', 'patio', 'concrete', 'roofing', 'stairs', 'tile', 'area', 'volume'
      ],
      'cooking': [
        'baking', 'recipe-converter', 'coffee-ratio', 'alcohol-dilution'
      ],
      'education': [
        'gpa', 'molecular-weight', 'stoichiometry', 'ph'
      ],
      'everyday': [
        'age', 'date', 'tip', 'time', 'timezone-converter', 'countdown-timer',
        'ai-everyday-calculations', 'ai-tools-2026', 'math-behind-ai', 'ai-habits-health'
      ],
      'conversions': [
        'unit-converter', 'roman-numerals', 'morse-code', 'braille-translator'
      ],
      'energy': [
        'solar-panel-savings', 'energy-usage', 'carbon-footprint', 'home-energy-audit'
      ],
      'agriculture': [
        'seed-spacing'
      ],
      'animal-age': [
        'dog-age', 'cat-age'
      ],
      'space': [
        'age-on-mars', 'space-weight', 'planetary-years', 'weight-on-mars'
      ],
      'unique': [
        'love-calculator', 'golf-balls-boeing-747', 'aquarium-volume'
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
    url: `${baseUrl}/learn/${categorySlug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic individual learn article routes (with category-based URLs)
  const learnArticleRoutes: MetadataRoute.Sitemap = getAvailableLearnSlugs().map(slug => {
    const category = getCategoryForSlug(slug);
    return {
      url: category ? `${baseUrl}/learn/${category}/${slug}` : `${baseUrl}/learn/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    };
  });

  return [
    ...staticRoutes,
    ...calculatorRoutes,
    ...categoryRoutes,
    ...learnCategoryRoutes,
    ...learnArticleRoutes,
  ];
}
