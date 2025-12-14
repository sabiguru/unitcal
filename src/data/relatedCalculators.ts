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
    { slug: 'matrix', name: 'Matrix Calculator', description: 'Perform matrix operations' },
  ],
  'graphing': [
    { slug: 'graphing', name: 'Graphing Calculator', description: 'Plot mathematical functions' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'equation-solver', name: 'Equation Solver', description: 'Solve equations step by step' },
  ],
  'percentage': [
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily' },
    { slug: 'discount', name: 'Discount Calculator', description: 'Calculate discounts and sale prices' },
    { slug: 'tip', name: 'Tip Calculator', description: 'Calculate tips and split bills' },
    { slug: 'interest', name: 'Interest Calculator', description: 'Calculate simple and compound interest' },
  ],
  'fraction': [
    { slug: 'fraction', name: 'Fraction Calculator', description: 'Work with fractions and mixed numbers' },
    { slug: 'ratio', name: 'Ratio Calculator', description: 'Calculate ratios and proportions' },
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily' },
  ],
  'ratio': [
    { slug: 'ratio', name: 'Ratio Calculator', description: 'Calculate ratios and proportions' },
    { slug: 'fraction', name: 'Fraction Calculator', description: 'Work with fractions and mixed numbers' },
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily' },
  ],
  'prime': [
    { slug: 'prime', name: 'Prime Number Calculator', description: 'Check primes and factorizations' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'basic', name: 'Basic Calculator', description: 'Standard arithmetic operations' },
  ],
  'matrix': [
    { slug: 'matrix', name: 'Matrix Calculator', description: 'Perform matrix operations' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'equation-solver', name: 'Equation Solver', description: 'Solve equations step by step' },
  ],
  'equation-solver': [
    { slug: 'equation-solver', name: 'Equation Solver', description: 'Solve equations step by step' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'graphing', name: 'Graphing Calculator', description: 'Plot mathematical functions' },
  ],
  'significant-figures': [
    { slug: 'significant-figures', name: 'Significant Figures Calculator', description: 'Count and round significant figures' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'basic', name: 'Basic Calculator', description: 'Standard arithmetic operations' },
  ],
  'roman-numerals': [
    { slug: 'roman-numerals', name: 'Roman Numerals Converter', description: 'Convert Roman numerals' },
    { slug: 'binary-converter', name: 'Binary/Hex Calculator', description: 'Convert number systems' },
    { slug: 'basic', name: 'Basic Calculator', description: 'Standard arithmetic operations' },
  ],
  'binary-converter': [
    { slug: 'binary-converter', name: 'Binary/Hex Calculator', description: 'Convert number systems' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions' },
    { slug: 'roman-numerals', name: 'Roman Numerals Converter', description: 'Convert Roman numerals' },
  ],
  'soroban-abacus': [
    { slug: 'soroban-abacus', name: 'Soroban Abacus Calculator', description: 'Master the Japanese abacus' },
    { slug: 'suanpan-abacus', name: 'Suanpan Abacus Calculator', description: 'Learn Chinese abacus' },
    { slug: 'western-abacus', name: 'Western Abacus Calculator', description: 'Practice Western abacus' },
  ],
  'suanpan-abacus': [
    { slug: 'suanpan-abacus', name: 'Suanpan Abacus Calculator', description: 'Learn Chinese abacus' },
    { slug: 'soroban-abacus', name: 'Soroban Abacus Calculator', description: 'Master the Japanese abacus' },
    { slug: 'western-abacus', name: 'Western Abacus Calculator', description: 'Practice Western abacus' },
  ],
  'western-abacus': [
    { slug: 'western-abacus', name: 'Western Abacus Calculator', description: 'Practice Western abacus' },
    { slug: 'soroban-abacus', name: 'Soroban Abacus Calculator', description: 'Master the Japanese abacus' },
    { slug: 'suanpan-abacus', name: 'Suanpan Abacus Calculator', description: 'Learn Chinese abacus' },
  ],

  // Time & Date
  'age': [
    { slug: 'age', name: 'Age Calculator', description: 'Calculate exact age with milestones' },
    { slug: 'date', name: 'Date Calculator', description: 'Add, subtract, and find date differences' },
    { slug: 'age-on-mars', name: 'Age on Mars Calculator', description: 'Calculate your age on other planets' },
  ],
  'date': [
    { slug: 'date', name: 'Date Calculator', description: 'Add, subtract, and find date differences' },
    { slug: 'age', name: 'Age Calculator', description: 'Calculate exact age with milestones' },
    { slug: 'countdown-timer', name: 'Countdown Timer', description: 'Count down to important dates' },
  ],
  'time': [
    { slug: 'time', name: 'Time Calculator', description: 'Add, subtract, and convert time' },
    { slug: 'timezone-converter', name: 'Time Zone Converter', description: 'Convert times between zones' },
    { slug: 'countdown-timer', name: 'Countdown Timer', description: 'Count down to important dates' },
  ],
  'timezone-converter': [
    { slug: 'timezone-converter', name: 'Time Zone Converter', description: 'Convert times between zones' },
    { slug: 'time', name: 'Time Calculator', description: 'Add, subtract, and convert time' },
    { slug: 'date', name: 'Date Calculator', description: 'Date calculations' },
  ],
  'countdown-timer': [
    { slug: 'countdown-timer', name: 'Countdown Timer', description: 'Count down to important dates' },
    { slug: 'date', name: 'Date Calculator', description: 'Date calculations' },
    { slug: 'time', name: 'Time Calculator', description: 'Time calculations' },
  ],
  'speed': [
    { slug: 'speed', name: 'Speed Calculator', description: 'Calculate speed, distance, and time' },
    { slug: 'time', name: 'Time Calculator', description: 'Time calculations' },
    { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert various units' },
  ],

  // Health & Fitness
  'bmi': [
    { slug: 'bmi', name: 'BMI Calculator', description: 'Calculate Body Mass Index' },
    { slug: 'bodyfat', name: 'Body Fat Calculator', description: 'Calculate body fat percentage' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'bmr', name: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate' },
  ],
  'bmr': [
    { slug: 'bmr', name: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'protein', name: 'Protein Calculator', description: 'Calculate daily protein needs' },
  ],
  'bodyfat': [
    { slug: 'bodyfat', name: 'Body Fat Calculator', description: 'Calculate body fat percentage' },
    { slug: 'bmi', name: 'BMI Calculator', description: 'Calculate Body Mass Index' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
  ],
  'calorie': [
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'bmr', name: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate' },
    { slug: 'protein', name: 'Protein Calculator', description: 'Calculate daily protein needs' },
    { slug: 'fitness', name: 'Fitness Calculator', description: 'Track fitness metrics' },
  ],
  'protein': [
    { slug: 'protein', name: 'Protein Calculator', description: 'Calculate daily protein needs' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'bmr', name: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate' },
  ],
  'heartrate': [
    { slug: 'heartrate', name: 'Heart Rate Calculator', description: 'Calculate training zones' },
    { slug: 'fitness', name: 'Fitness Calculator', description: 'Track fitness metrics' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
  ],
  'fitness': [
    { slug: 'fitness', name: 'Fitness Calculator', description: 'Track fitness metrics' },
    { slug: 'heartrate', name: 'Heart Rate Calculator', description: 'Calculate training zones' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
  ],
  'sleep': [
    { slug: 'sleep', name: 'Sleep Calculator', description: 'Optimize your sleep schedule' },
    { slug: 'fitness', name: 'Fitness Calculator', description: 'Track fitness metrics' },
    { slug: 'time', name: 'Time Calculator', description: 'Time calculations' },
  ],
  'water': [
    { slug: 'water', name: 'Water Intake Calculator', description: 'Calculate daily water needs' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'fitness', name: 'Fitness Calculator', description: 'Track fitness metrics' },
  ],
  'wearable-tech-data-driven-fitness': [
    { slug: 'heartrate', name: 'Heart Rate Calculator', description: 'Calculate training zones and heart rate' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'fitness', name: 'Fitness Calculator', description: 'Track fitness metrics' },
    { slug: 'bmr', name: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate' },
  ],
  'strength-training-building-muscle-healthgoal': [
    { slug: 'protein', name: 'Protein Calculator', description: 'Calculate daily protein needs' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'bmi', name: 'BMI Calculator', description: 'Calculate Body Mass Index' },
    { slug: 'bodyfat', name: 'Body Fat Calculator', description: 'Calculate body fat percentage' },
  ],
  'holistic-recovery-mobility-low-impact-training': [
    { slug: 'bmi', name: 'BMI Calculator', description: 'Calculate Body Mass Index' },
    { slug: 'bodyfat', name: 'Body Fat Calculator', description: 'Calculate body fat percentage' },
    { slug: 'calorie', name: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
    { slug: 'heartrate', name: 'Heart Rate Calculator', description: 'Calculate training zones' },
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
    { slug: 'mortgage', name: 'Mortgage Calculator', description: 'Calculate mortgage payments' },
  ],
  'interest': [
    { slug: 'interest', name: 'Interest Calculator', description: 'Calculate simple and compound interest' },
    { slug: 'compound-interest', name: 'Compound Interest Calculator', description: 'Calculate compound interest growth' },
    { slug: 'loan', name: 'Loan Calculator', description: 'Calculate loan payments' },
  ],
  'compound-interest': [
    { slug: 'compound-interest', name: 'Compound Interest Calculator', description: 'Calculate compound interest growth' },
    { slug: 'investment', name: 'Investment Calculator', description: 'Project investment returns' },
    { slug: 'retirement', name: 'Retirement Calculator', description: 'Plan retirement savings' },
  ],
  'investment': [
    { slug: 'investment', name: 'Investment Calculator', description: 'Project investment returns' },
    { slug: 'compound-interest', name: 'Compound Interest Calculator', description: 'Calculate compound interest' },
    { slug: 'retirement', name: 'Retirement Calculator', description: 'Plan retirement savings' },
    { slug: 'roi', name: 'ROI Calculator', description: 'Measure return on investment' },
  ],
  'retirement': [
    { slug: 'retirement', name: 'Retirement Calculator', description: 'Plan retirement savings' },
    { slug: 'investment', name: 'Investment Calculator', description: 'Project investment returns' },
    { slug: 'compound-interest', name: 'Compound Interest Calculator', description: 'Calculate compound interest' },
  ],
  'budget': [
    { slug: 'budget', name: 'Budget Calculator', description: 'Track income and expenses' },
    { slug: 'salary', name: 'Salary Calculator', description: 'Convert salary formats' },
    { slug: 'tax', name: 'Tax Calculator', description: 'Estimate tax obligations' },
  ],
  'salary': [
    { slug: 'salary', name: 'Salary Calculator', description: 'Convert salary formats' },
    { slug: 'tax', name: 'Tax Calculator', description: 'Estimate tax obligations' },
    { slug: 'budget', name: 'Budget Calculator', description: 'Track income and expenses' },
  ],
  'tax': [
    { slug: 'tax', name: 'Tax Calculator', description: 'Estimate tax obligations' },
    { slug: 'salary', name: 'Salary Calculator', description: 'Convert salary formats' },
    { slug: 'budget', name: 'Budget Calculator', description: 'Track income and expenses' },
  ],
  'roi': [
    { slug: 'roi', name: 'ROI Calculator', description: 'Measure return on investment' },
    { slug: 'investment', name: 'Investment Calculator', description: 'Project investment returns' },
    { slug: 'npv-irr', name: 'NPV/IRR Calculator', description: 'Calculate net present value' },
  ],
  'npv-irr': [
    { slug: 'npv-irr', name: 'NPV/IRR Calculator', description: 'Calculate net present value' },
    { slug: 'roi', name: 'ROI Calculator', description: 'Measure return on investment' },
    { slug: 'investment', name: 'Investment Calculator', description: 'Project investment returns' },
  ],
  'refinance': [
    { slug: 'refinance', name: 'Refinance Calculator', description: 'Compare refinance options' },
    { slug: 'mortgage', name: 'Mortgage Calculator', description: 'Calculate mortgage payments' },
    { slug: 'loan', name: 'Loan Calculator', description: 'Calculate loan payments' },
  ],
  'currency-converter': [
    { slug: 'currency-converter', name: 'Currency Converter', description: 'Convert world currencies' },
    { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert various units' },
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages' },
  ],
  'credit-card-payoff': [
    { slug: 'credit-card-payoff', name: 'Credit Card Payoff', description: 'Calculate payoff strategies' },
    { slug: 'loan', name: 'Loan Calculator', description: 'Calculate loan payments' },
    { slug: 'interest', name: 'Interest Calculator', description: 'Calculate interest' },
  ],
  'depreciation': [
    { slug: 'depreciation', name: 'Depreciation Calculator', description: 'Calculate asset depreciation' },
    { slug: 'roi', name: 'ROI Calculator', description: 'Measure return on investment' },
    { slug: 'investment', name: 'Investment Calculator', description: 'Project investment returns' },
  ],
  'discount': [
    { slug: 'discount', name: 'Discount Calculator', description: 'Calculate discounts and sale prices' },
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages' },
    { slug: 'tip', name: 'Tip Calculator', description: 'Calculate tips and split bills' },
  ],
  'tip': [
    { slug: 'tip', name: 'Tip Calculator', description: 'Calculate tips and split bills' },
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages' },
    { slug: 'discount', name: 'Discount Calculator', description: 'Calculate discounts' },
  ],

  // Engineering & Technology
  'electrical': [
    { slug: 'electrical', name: 'Electrical Calculator', description: 'Calculate power and energy' },
    { slug: 'ohms-law', name: "Ohm's Law Calculator", description: 'Calculate voltage, current, resistance' },
    { slug: 'resistor', name: 'Resistor Calculator', description: 'Calculate resistor values' },
  ],
  'resistor': [
    { slug: 'resistor', name: 'Resistor Calculator', description: 'Calculate resistor values' },
    { slug: 'ohms-law', name: "Ohm's Law Calculator", description: 'Calculate voltage, current, resistance' },
    { slug: 'capacitor', name: 'Capacitor Calculator', description: 'Calculate capacitance' },
  ],
  'capacitor': [
    { slug: 'capacitor', name: 'Capacitor Calculator', description: 'Calculate capacitance' },
    { slug: 'resistor', name: 'Resistor Calculator', description: 'Calculate resistor values' },
    { slug: 'electrical', name: 'Electrical Calculator', description: 'Calculate power and energy' },
  ],
  'ohms-law': [
    { slug: 'ohms-law', name: "Ohm's Law Calculator", description: 'Calculate voltage, current, resistance' },
    { slug: 'electrical', name: 'Electrical Calculator', description: 'Calculate power and energy' },
    { slug: 'resistor', name: 'Resistor Calculator', description: 'Calculate resistor values' },
  ],
  'subnet': [
    { slug: 'subnet', name: 'IP Subnet Calculator', description: 'Calculate network subnets' },
    { slug: 'binary-converter', name: 'Binary/Hex Calculator', description: 'Convert number systems' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced calculations' },
  ],
  'password-generator': [
    { slug: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords' },
    { slug: 'morse-code', name: 'Morse Code Converter', description: 'Encode and decode Morse code' },
    { slug: 'binary-converter', name: 'Binary/Hex Calculator', description: 'Convert number systems' },
  ],
  'morse-code': [
    { slug: 'morse-code', name: 'Morse Code Converter', description: 'Encode and decode Morse code' },
    { slug: 'braille-translator', name: 'Braille Translator', description: 'Convert text to Braille' },
    { slug: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords' },
  ],
  'braille-translator': [
    { slug: 'braille-translator', name: 'Braille Translator', description: 'Convert text to Braille' },
    { slug: 'morse-code', name: 'Morse Code Converter', description: 'Encode and decode Morse code' },
    { slug: 'roman-numerals', name: 'Roman Numerals Converter', description: 'Convert Roman numerals' },
  ],

  // Automotive
  'mpg': [
    { slug: 'mpg', name: 'MPG Calculator', description: 'Calculate fuel efficiency' },
    { slug: 'fuel-cost', name: 'Fuel Cost Calculator', description: 'Calculate trip fuel costs' },
    { slug: 'ev-range', name: 'EV Range Calculator', description: 'Calculate electric vehicle range' },
  ],
  'fuel-cost': [
    { slug: 'fuel-cost', name: 'Fuel Cost Calculator', description: 'Calculate trip fuel costs' },
    { slug: 'mpg', name: 'MPG Calculator', description: 'Calculate fuel efficiency' },
    { slug: 'ev-range', name: 'EV Range Calculator', description: 'Calculate electric vehicle range' },
  ],
  'ev-range': [
    { slug: 'ev-range', name: 'EV Range Calculator', description: 'Calculate electric vehicle range' },
    { slug: 'mpg', name: 'MPG Calculator', description: 'Calculate fuel efficiency' },
    { slug: 'fuel-cost', name: 'Fuel Cost Calculator', description: 'Calculate trip fuel costs' },
  ],
  'tire-size': [
    { slug: 'tire-size', name: 'Tire Size Calculator', description: 'Compare tire sizes' },
    { slug: 'speed', name: 'Speed Calculator', description: 'Calculate speed and distance' },
    { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert various units' },
  ],
  'car-lease': [
    { slug: 'car-lease', name: 'Car Lease Calculator', description: 'Calculate lease payments' },
    { slug: 'car-loan', name: 'Car Loan Calculator', description: 'Calculate auto loan payments' },
    { slug: 'loan', name: 'Loan Calculator', description: 'Calculate loan payments' },
  ],
  'car-loan': [
    { slug: 'car-loan', name: 'Car Loan Calculator', description: 'Calculate auto loan payments' },
    { slug: 'car-lease', name: 'Car Lease Calculator', description: 'Calculate lease payments' },
    { slug: 'loan', name: 'Loan Calculator', description: 'Calculate loan payments' },
  ],

  // Cooking & Food
  'baking': [
    { slug: 'baking', name: 'Baking Calculator', description: 'Professional baking measurements' },
    { slug: 'recipe-converter', name: 'Recipe Converter', description: 'Scale recipes easily' },
    { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert various units' },
  ],
  'recipe-converter': [
    { slug: 'recipe-converter', name: 'Recipe Converter', description: 'Scale recipes easily' },
    { slug: 'baking', name: 'Baking Calculator', description: 'Professional baking measurements' },
    { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert various units' },
  ],
  'coffee-ratio': [
    { slug: 'coffee-ratio', name: 'Coffee Ratio Calculator', description: 'Perfect coffee brewing ratios' },
    { slug: 'recipe-converter', name: 'Recipe Converter', description: 'Scale recipes easily' },
    { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert various units' },
  ],
  'alcohol-dilution': [
    { slug: 'alcohol-dilution', name: 'Alcohol Dilution Calculator', description: 'Calculate alcohol dilution' },
    { slug: 'recipe-converter', name: 'Recipe Converter', description: 'Scale recipes easily' },
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages' },
  ],

  // Construction & DIY
  'paint': [
    { slug: 'paint', name: 'Paint Calculator', description: 'Calculate paint coverage' },
    { slug: 'area', name: 'Area Calculator', description: 'Calculate room areas' },
    { slug: 'volume', name: 'Volume Calculator', description: 'Calculate volumes' },
  ],
  'patio': [
    { slug: 'patio', name: 'Patio Calculator', description: 'Calculate patio materials and costs' },
    { slug: 'concrete', name: 'Concrete Calculator', description: 'Calculate concrete quantities' },
    { slug: 'area', name: 'Area Calculator', description: 'Calculate areas' },
  ],
  'concrete': [
    { slug: 'concrete', name: 'Concrete Calculator', description: 'Calculate concrete quantities' },
    { slug: 'volume', name: 'Volume Calculator', description: 'Calculate volumes' },
    { slug: 'patio', name: 'Patio Calculator', description: 'Calculate patio materials' },
  ],
  'roofing': [
    { slug: 'roofing', name: 'Roofing Calculator', description: 'Estimate roofing materials' },
    { slug: 'area', name: 'Area Calculator', description: 'Calculate areas' },
    { slug: 'tile', name: 'Tile Calculator', description: 'Estimate tile quantities' },
  ],
  'stairs': [
    { slug: 'stairs', name: 'Stair Calculator', description: 'Calculate stair dimensions' },
    { slug: 'area', name: 'Area Calculator', description: 'Calculate areas' },
    { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert units' },
  ],
  'tile': [
    { slug: 'tile', name: 'Tile Calculator', description: 'Estimate tile quantities' },
    { slug: 'area', name: 'Area Calculator', description: 'Calculate areas' },
    { slug: 'paint', name: 'Paint Calculator', description: 'Calculate paint coverage' },
  ],
  'area': [
    { slug: 'area', name: 'Area Calculator', description: 'Calculate areas for various shapes' },
    { slug: 'volume', name: 'Volume Calculator', description: 'Calculate volumes' },
    { slug: 'paint', name: 'Paint Calculator', description: 'Calculate paint coverage' },
  ],
  'volume': [
    { slug: 'volume', name: 'Volume Calculator', description: 'Calculate volumes' },
    { slug: 'area', name: 'Area Calculator', description: 'Calculate areas' },
    { slug: 'concrete', name: 'Concrete Calculator', description: 'Calculate concrete quantities' },
  ],

  // Conversions
  'unit-converter': [
    { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert various units' },
    { slug: 'currency-converter', name: 'Currency Converter', description: 'Convert world currencies' },
    { slug: 'area', name: 'Area Calculator', description: 'Calculate areas' },
  ],

  // Energy & Environment
  'energy-usage': [
    { slug: 'energy-usage', name: 'Energy Usage Calculator', description: 'Monitor energy consumption' },
    { slug: 'electrical', name: 'Electrical Calculator', description: 'Calculate power and energy' },
    { slug: 'carbon-footprint', name: 'Carbon Footprint Calculator', description: 'Calculate CO₂ emissions' },
  ],
  'carbon-footprint': [
    { slug: 'carbon-footprint', name: 'Carbon Footprint Calculator', description: 'Calculate CO₂ emissions' },
    { slug: 'energy-usage', name: 'Energy Usage Calculator', description: 'Monitor energy consumption' },
    { slug: 'solar-panel-savings', name: 'Solar Panel Calculator', description: 'Calculate solar savings' },
  ],
  'solar-panel-savings': [
    { slug: 'solar-panel-savings', name: 'Solar Panel Calculator', description: 'Calculate solar savings' },
    { slug: 'energy-usage', name: 'Energy Usage Calculator', description: 'Monitor energy consumption' },
    { slug: 'roi', name: 'ROI Calculator', description: 'Measure return on investment' },
  ],
  'home-energy-audit': [
    { slug: 'home-energy-audit', name: 'Home Energy Audit Calculator', description: 'Assess home energy efficiency' },
    { slug: 'energy-usage', name: 'Energy Usage Calculator', description: 'Monitor energy consumption' },
    { slug: 'solar-panel-savings', name: 'Solar Panel Calculator', description: 'Calculate solar savings' },
  ],
  'seed-spacing': [
    { slug: 'seed-spacing', name: 'Seed Spacing Calculator', description: 'Calculate optimal seed spacing' },
    { slug: 'area', name: 'Area Calculator', description: 'Calculate garden areas' },
    { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert units' },
  ],

  // Education & Science
  'gpa': [
    { slug: 'gpa', name: 'GPA Calculator', description: 'Calculate Grade Point Average' },
    { slug: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced calculations' },
  ],
  'molecular-weight': [
    { slug: 'molecular-weight', name: 'Molecular Weight Calculator', description: 'Calculate molecular weight' },
    { slug: 'stoichiometry', name: 'Stoichiometry Calculator', description: 'Calculate chemical reactions' },
    { slug: 'ph', name: 'pH Calculator', description: 'Calculate pH values' },
  ],
  'ph': [
    { slug: 'ph', name: 'pH Calculator', description: 'Calculate pH and pOH' },
    { slug: 'molecular-weight', name: 'Molecular Weight Calculator', description: 'Calculate molecular weight' },
    { slug: 'stoichiometry', name: 'Stoichiometry Calculator', description: 'Calculate chemical reactions' },
  ],
  'stoichiometry': [
    { slug: 'stoichiometry', name: 'Stoichiometry Calculator', description: 'Calculate chemical reactions' },
    { slug: 'molecular-weight', name: 'Molecular Weight Calculator', description: 'Calculate molecular weight' },
    { slug: 'ph', name: 'pH Calculator', description: 'Calculate pH values' },
  ],

  // Animal Age
  'dog-age': [
    { slug: 'dog-age', name: 'Dog Age Calculator', description: 'Convert dog years to human years' },
    { slug: 'cat-age', name: 'Cat Age Calculator', description: 'Convert cat years to human years' },
    { slug: 'age', name: 'Age Calculator', description: 'Calculate exact age' },
  ],
  'cat-age': [
    { slug: 'cat-age', name: 'Cat Age Calculator', description: 'Convert cat years to human years' },
    { slug: 'dog-age', name: 'Dog Age Calculator', description: 'Convert dog years to human years' },
    { slug: 'age', name: 'Age Calculator', description: 'Calculate exact age' },
  ],

  // Unique & Niche
  'love-calculator': [
    { slug: 'love-calculator', name: 'Love Calculator', description: 'Calculate compatibility (for fun!)' },
    { slug: 'age', name: 'Age Calculator', description: 'Calculate exact age' },
    { slug: 'date', name: 'Date Calculator', description: 'Date calculations' },
  ],
  'golf-balls-boeing-747': [
    { slug: 'golf-balls-boeing-747', name: 'Golf Balls in Boeing 747', description: 'Fun volume calculation' },
    { slug: 'volume', name: 'Volume Calculator', description: 'Calculate volumes' },
    { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced calculations' },
  ],
  'aquarium-volume': [
    { slug: 'aquarium-volume', name: 'Aquarium Volume Calculator', description: 'Calculate aquarium volume' },
    { slug: 'volume', name: 'Volume Calculator', description: 'Calculate volumes' },
    { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert units' },
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
