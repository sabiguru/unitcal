// Mapping of learn article slugs to related calculators
// Each learn article can have 3-4 related calculators shown in the sidebar

export interface RelatedCalculator {
  slug: string;
  name: string;
  description: string;
}

export const relatedCalculatorsMap: Record<string, RelatedCalculator[]> = {
  // Space & Astronomy
  'age-on-mars': [
    { slug: 'age-on-mars', name: 'Age on Mars Calculator', description: 'Calculate your age on Mars and other planets' },
    { slug: 'space-weight', name: 'Space Weight Calculator', description: 'Calculate your weight on different planets' },
    { slug: 'age', name: 'Age Calculator', description: 'Calculate your exact Earth age with milestones' },
  ],
  'space-weight': [
    { slug: 'space-weight', name: 'Space Weight Calculator', description: 'Calculate your weight on different planets' },
    { slug: 'age-on-mars', name: 'Age on Mars Calculator', description: 'Calculate your age on Mars and other planets' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
  ],
  'planetary-years': [
    { slug: 'age-on-mars', name: 'Age on Mars Calculator', description: 'Calculate your age on Mars and other planets' },
    { slug: 'space-weight', name: 'Space Weight Calculator', description: 'Calculate your weight on different planets' },
    { slug: 'date', name: 'Date Calculator', description: 'Calculate time differences and dates' },
  ],
  'time-on-mars': [
    { slug: 'age-on-mars', name: 'Age on Mars Calculator', description: 'Calculate your age on Mars and other planets' },
    { slug: 'timezone-converter', name: 'Time Zone Converter', description: 'Convert times between zones' },
    { slug: 'time', name: 'Time Calculator', description: 'Add, subtract, and convert time' },
  ],
  'weight-on-mars': [
    { slug: 'space-weight', name: 'Space Weight Calculator', description: 'Calculate your weight on different planets' },
    { slug: 'age-on-mars', name: 'Age on Mars Calculator', description: 'Calculate your age on Mars and other planets' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
  ],

  // Mathematics & Basic Tools
  'basic': [
    { slug: 'basic', name: 'Basic Calculator', description: 'Perform standard arithmetic operations' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily' },
  ],
  'scientific': [
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'graphing', name: 'Graphing Calculator', description: 'Plot mathematical functions' },
    { slug: 'equation-solver', name: 'Equation Solver', description: 'Solve equations step by step' },
  ],
  'percentage': [
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily' },
    { slug: 'discount', name: 'Discount Calculator', description: 'Calculate discounts and sale prices' },
    { slug: 'tip', name: 'Tip Calculator', description: 'Calculate tips and split bills' },
  ],
  'fraction': [
    { slug: 'fraction', name: 'Fraction Calculator', description: 'Work with fractions and mixed numbers' },
    { slug: 'ratio', name: 'Ratio Calculator', description: 'Calculate ratios and proportions' },
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily' },
  ],

  // Health & Fitness
  'bmi': [
    { slug: 'bmi', name: 'BMI Calculator', description: 'Calculate Body Mass Index' },
    { slug: 'bodyfat', name: 'Body Fat Calculator', description: 'Calculate body fat percentage' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
  ],
  'bmr': [
    { slug: 'bmr', name: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'protein', name: 'Protein Calculator', description: 'Calculate daily protein needs' },
  ],
  'calorie': [
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'bmr', name: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate' },
    { slug: 'protein', name: 'Protein Calculator', description: 'Calculate daily protein needs' },
  ],

  // Financial & Business
  'mortgage': [
    { slug: 'mortgage', name: 'Mortgage Calculator', description: 'Calculate mortgage payments' },
    { slug: 'loan', name: 'Loan Calculator', description: 'Calculate loan payments and interest' },
    { slug: 'refinance', name: 'Refinance Calculator', description: 'Compare refinance options' },
  ],
  'loan': [
    { slug: 'loan', name: 'Loan Calculator', description: 'Calculate loan payments and interest' },
    { slug: 'interest', name: 'Interest Calculator', description: 'Calculate simple and compound interest' },
    { slug: 'car-loan', name: 'Car Loan Calculator', description: 'Calculate auto loan payments' },
  ],
  'compound-interest': [
    { slug: 'compound-interest', name: 'Compound Interest Calculator', description: 'Calculate compound interest growth' },
    { slug: 'investment', name: 'Investment Calculator', description: 'Project investment returns' },
    { slug: 'retirement', name: 'Retirement Calculator', description: 'Plan retirement savings' },
  ],

  // Add more mappings as needed...
  // For any slug not mapped, fall back to default calculators
};

// Default related calculators shown when no specific mapping exists
export const defaultRelatedCalculators: RelatedCalculator[] = [
  { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
  { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily' },
  { slug: 'fraction', name: 'Fraction Calculator', description: 'Work with fractions and mixed numbers' },
];

// Helper function to get related calculators for a given slug
export function getRelatedCalculators(slug: string): RelatedCalculator[] {
  return relatedCalculatorsMap[slug] || defaultRelatedCalculators;
}
