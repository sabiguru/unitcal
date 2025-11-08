import { calculatorCategories } from '@/data/categoryData';

// Centralized mapping of calculator slugs to category slugs
export const CALCULATOR_CATEGORY_MAPPING: Record<string, string[]> = {
  'mathematics': [
    'basic', 'scientific', 'graphing', 'fraction', 'percentage', 'ratio', 'prime', 'matrix',
    'equation-solver', 'age', 'date', 'tip', 'time', 'significant-figures', 'speed',
    'binary-converter', 'suanpan-abacus', 'soroban-abacus', 'western-abacus'
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
    'capacitor', 'electrical', 'ohms-law', 'resistor', 'subnet', 'password-generator'
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
    'timezone-converter', 'countdown-timer'
  ],
  'conversions': [
    'unit-converter', 'roman-numerals', 'morse-code', 'braille-translator'
  ],
  'energy': [
    'solar-panel-savings', 'energy-usage', 'carbon-footprint', 'home-energy-audit'
  ],
  'animal-age': [
    'dog-age', 'cat-age'
  ],
  'space': [
    'age-on-mars', 'space-weight', 'planetary-years', 'time-on-mars', 'weight-on-mars'
  ],
  'unique': [
    'love-calculator', 'golf-balls-boeing-747', 'aquarium-volume'
  ],
  'lifestyle': []
};

/**
 * Get the category slug for a given calculator slug
 */
export function getCategoryForCalculator(calculatorSlug: string): string | null {
  for (const [category, slugs] of Object.entries(CALCULATOR_CATEGORY_MAPPING)) {
    if (slugs.includes(calculatorSlug)) {
      return category;
    }
  }
  return null;
}

/**
 * Get all calculator slugs for a given category
 */
export function getCalculatorsForCategory(categorySlug: string): string[] {
  return CALCULATOR_CATEGORY_MAPPING[categorySlug] || [];
}

/**
 * Get the full URL for a calculator
 */
export function getCalculatorUrl(calculatorSlug: string): string {
  const category = getCategoryForCalculator(calculatorSlug);
  if (!category) {
    return `/calculator/${calculatorSlug}`;
  }
  return `/calculator/${category}/${calculatorSlug}`;
}

/**
 * Get all categories that have calculators
 */
export function getCategoriesWithCalculators(): string[] {
  return Object.keys(CALCULATOR_CATEGORY_MAPPING).filter(
    category => CALCULATOR_CATEGORY_MAPPING[category].length > 0
  );
}
