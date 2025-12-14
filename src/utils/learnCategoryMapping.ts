// Centralized mapping of learn article slugs to their categories
// This ensures consistency across the application

export const LEARN_CATEGORY_MAPPING: Record<string, string[]> = {
  'mathematics': [
    'basic', 'scientific', 'graphing', 'fraction', 'percentage', 'ratio', 'prime', 'matrix',
    'equation-solver',
    'significant-figures', 'binary-converter', 'speed',
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
    'remote-work-2026', 'cost-of-living-2026', 'ai-finance-2026'
  ],
  'engineering': [
    'capacitor', 'electrical', 'ohms-law', 'resistor', 'password-generator',
    'subnet', 'ai-engineering-2026', 'concept-to-silicon'
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
    'age-on-mars', 'space-weight', 'planetary-years', 'time-on-mars', 'weight-on-mars', 'space-discoveries-2026'
  ],
  'unique': [
    'love-calculator', 'golf-balls-boeing-747', 'aquarium-volume'
  ],
  'lifestyle': [
    'baking', 'recipe-converter', 'coffee-ratio', 'dog-age', 'cat-age', 'love-calculator',
    'timezone-converter', 'countdown-timer', 'morse-code',
    'braille-translator', 'golf-balls-boeing-747', 'alcohol-dilution', 'aquarium-volume',
    'home-energy-audit', 'gpa'
  ]
};

// Helper function to get category for a given slug
export function getCategoryForSlug(slug: string): string | null {
  for (const [category, slugs] of Object.entries(LEARN_CATEGORY_MAPPING)) {
    if (slugs.includes(slug)) {
      return category;
    }
  }
  return null;
}

// Helper function to get all slugs for a category
export function getSlugsForCategory(category: string): string[] {
  return LEARN_CATEGORY_MAPPING[category] || [];
}

// Helper function to build the full learn URL path
export function getLearnArticleUrl(slug: string): string {
  const category = getCategoryForSlug(slug);
  if (!category) {
    // Fallback to old structure if category not found
    return `/learn/${slug}`;
  }
  return `/learn/${category}/${slug}`;
}
