// Mapping of learn article slugs to related calculators
// Each learn article can have 3-4 related calculators shown in the sidebar

export interface RelatedCalculator {
  slug: string;
  name: string;
  description: string;
  link?: string;
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

  // New Blogs 2026
  'finance-automation-2026': [
    { slug: 'budget', name: 'Budget Calculator', description: 'Track income and expenses' },
    { slug: 'investment', name: 'Investment Calculator', description: 'Project investment returns' },
    { slug: 'retirement', name: 'Retirement Calculator', description: 'Plan retirement savings' },
    { slug: 'tax', name: 'Tax Calculator', description: 'Estimate tax obligations' },
  ],
  'ai-engineering-2026': [
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'binary-converter', name: 'Binary/Hex Calculator', description: 'Convert number systems' },
    { slug: 'subnet', name: 'IP Subnet Calculator', description: 'Calculate network subnets' },
    { slug: 'electrical', name: 'Electrical Calculator', description: 'Calculate power and energy' },
  ],
  'quick-home-workouts': [
    { slug: 'bmi', name: 'BMI Calculator', description: 'Calculate Body Mass Index' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'fitness', name: 'Fitness Calculator', description: 'Track fitness metrics' },
    { slug: 'heartrate', name: 'Heart Rate Calculator', description: 'Calculate training zones' },
  ],
  'concept-to-silicon': [
    { slug: 'electrical', name: 'Electrical Calculator', description: 'Calculate power and energy' },
    { slug: 'resistor', name: 'Resistor Calculator', description: 'Calculate resistor values' },
    { slug: 'ohms-law', name: "Ohm's Law Calculator", description: 'Calculate voltage, current, resistance' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
  ],
  'remote-work-2026': [
    { slug: 'salary', name: 'Salary Calculator', description: 'Convert salary formats' },
    { slug: 'budget', name: 'Budget Calculator', description: 'Track income and expenses' },
    { slug: 'timezone-converter', name: 'Time Zone Converter', description: 'Convert times between zones' },
    { slug: 'tip', name: 'Tip Calculator', description: 'Calculate tips and split bills' },
  ],
  'ai-everyday-calculations': [
    { slug: 'budget', name: 'Budget Calculator', description: 'Track income and expenses' },
    { slug: 'loan', name: 'Loan Calculator', description: 'Calculate loan payments and interest' },
    { slug: 'bmi', name: 'BMI Calculator', description: 'Calculate Body Mass Index' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
  ],
  'ai-tools-2026': [
    { slug: 'time', name: 'Time Calculator', description: 'Add, subtract, and convert time' },
    { slug: 'budget', name: 'Budget Calculator', description: 'Track income and expenses' },
    { slug: 'investment', name: 'Investment Calculator', description: 'Project investment returns' },
    { slug: 'fitness', name: 'Fitness Calculator', description: 'Track fitness metrics' },
  ],
  'math-behind-ai': [
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'matrix', name: 'Matrix Calculator', description: 'Perform matrix operations' },
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily' },
    { slug: 'graphing', name: 'Graphing Calculator', description: 'Plot mathematical functions' },
  ],
  'ai-habits-health': [
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'sleep', name: 'Sleep Calculator', description: 'Optimize your sleep schedule' },
    { slug: 'heartrate', name: 'Heart Rate Calculator', description: 'Calculate training zones' },
    { slug: 'fitness', name: 'Fitness Calculator', description: 'Track fitness metrics' },
  ],
  'cost-of-living-2026': [
    { slug: 'budget', name: 'Budget Calculator', description: 'Track income and expenses' },
    { slug: 'salary', name: 'Salary Calculator', description: 'Estimate take-home pay and bonuses' },
    { slug: 'loan', name: 'Loan Calculator', description: 'Calculate loan payments and interest' },
    { slug: 'roi', name: 'ROI Calculator', description: 'Evaluate returns on investments' },
  ],
  'ai-finance-2026': [
    { slug: 'budget', name: 'Budget Calculator', description: 'Track income and expenses' },
    { slug: 'investment', name: 'Investment Calculator', description: 'Project investment returns' },
    { slug: 'credit-card-payoff', name: 'Credit Card Payoff Calculator', description: 'Plan debt repayment' },
    { slug: 'roi', name: 'ROI Calculator', description: 'Evaluate returns on investments' },
  ],
  'space-discoveries-2026': [
    { slug: 'space-weight', name: 'Space Weight Calculator', description: 'Calculate weight on different planets' },
    { slug: 'age-on-mars', name: 'Age on Mars Calculator', description: 'Calculate your age on other planets' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'timezone-converter', name: 'Time Zone Converter', description: 'Convert times between zones' },
    { slug: 'time', name: 'Time Calculator', description: 'Add, subtract, and convert time' },
  ],
};

// Default related calculators shown when no specific mapping exists
export const defaultRelatedCalculators: RelatedCalculator[] = [
  { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
  { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily' },
  { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert various units' },
];

// Helper function to get related calculators for a given slug
export function getRelatedCalculators(slug: string): RelatedCalculator[] {
  const calculators = relatedCalculatorsMap[slug] || defaultRelatedCalculators;

  // Import the category mapping utility
  const { getCategoryForCalculator } = require('@/utils/calculatorCategoryMapping');

  // Add the link property to each calculator
  return calculators.map(calc => {
    const category = getCategoryForCalculator(calc.slug);
    return {
      ...calc,
      link: category ? `/calculator/${category}/${calc.slug}` : `/calculator/${calc.slug}`
    };
  });
}

