export interface CategoryData {
  title: string;
  icon: string;
  slug: string;
  description: string;
  color: string;
  literature: {
    introduction: string;
    keyTopics: string[];
    useCases: string;
  };
  calculators: Array<{
    name: string;
    description: string;
    popular?: boolean;
    link: string;
  }>;
}

export const calculatorCategories: CategoryData[] = [
  {
    title: 'Mathematics & Basic Tools',
    icon: '🧮',
    slug: 'mathematics',
    description: 'Essential mathematical calculators.',
    color: 'from-indigo-500 to-purple-600',
    literature: {
      introduction: "Mathematics is the foundation of all sciences and engineering disciplines. Our mathematics calculators provide powerful tools for students, educators, and professionals to solve complex problems with precision and efficiency.",
      keyTopics: [
        "Basic arithmetic operations and order of operations",
        "Advanced scientific calculations including trigonometry",
        "Algebraic equations and matrix operations", 
        "Prime numbers and number theory",
        "Percentage calculations for business and daily use"
      ],
      useCases: "Whether you're a student learning calculus, an engineer designing structures, or someone calculating tips at a restaurant, our mathematical tools cover every scenario from simple addition to complex matrix operations."
    },
    calculators: [
      { name: 'Basic Calculator', description: 'Perform standard arithmetic operations with a simple interface', popular: true, link: '/calculator/mathematics/basic' },
      { name: 'Scientific Calculator', description: 'Advanced mathematical functions including trigonometry and logarithms', popular: true, link: '/calculator/mathematics/scientific' },
      { name: 'Graphing Calculator', description: 'Plot functions and analyze mathematical relationships visually', link: '/calculator/mathematics/graphing' },
      { name: 'Fraction Calculator', description: 'Add, subtract, multiply, and divide fractions with ease', link: '/calculator/mathematics/fraction' },
      { name: 'Percentage Calculator', description: 'Calculate percentages, percentage change, and percentage of amounts', popular: true, link: '/calculator/mathematics/percentage' },
      { name: 'Ratio Calculator', description: 'Find ratios, proportions, and scale factors', link: '/calculator/mathematics/ratio' },
      { name: 'Prime Number Calculator', description: 'Check if numbers are prime and find prime factorizations', link: '/calculator/mathematics/prime' },
      { name: 'Matrix Calculator', description: 'Perform matrix operations including multiplication and determinants', link: '/calculator/mathematics/matrix' },
      { name: 'Equation Solver', description: 'Solve linear, quadratic, and polynomial equations step by step', link: '/calculator/mathematics/equation-solver' },
      { name: 'Age Calculator', description: 'Calculate exact age with milestones and fun facts', link: '/calculator/mathematics/age' },
      { name: 'Date Calculator', description: 'Add, subtract, or find the difference between dates', link: '/calculator/mathematics/date' },
      { name: 'Tip Calculator', description: 'Calculate tips and split bills easily', link: '/calculator/mathematics/tip' },
      { name: 'Speed Calculator', description: 'Calculate speed, distance, and time relationships', link: '/calculator/mathematics/speed' },
      { name: 'Significant Figures Calculator', description: 'Count, round, and calculate with significant figures', link: '/calculator/mathematics/significant-figures' },
      { name: 'Soroban Abacus Calculator', description: 'Master the Japanese soroban abacus with 1:4 bead configuration', link: '/calculator/mathematics/soroban-abacus' },
      { name: 'Suanpan Abacus Calculator', description: 'Learn the Chinese suanpan abacus with 2:5 bead configuration', link: '/calculator/mathematics/suanpan-abacus' },
      { name: 'Western Abacus Calculator', description: 'Practice with the Western classroom abacus with counting beads', link: '/calculator/mathematics/western-abacus' }
    ]
  },
  {
    title: 'Health & Fitness',
    icon: '🏃‍♂️',
    slug: 'health',
    description: 'Health monitoring and fitness tools.',
    color: 'from-red-500 to-pink-600',
    literature: {
      introduction: "Health and fitness are fundamental to a quality life. Our health calculators provide essential tools for monitoring body composition, planning nutrition, optimizing exercise routines, and maintaining overall wellness.",
      keyTopics: [
        "Body composition analysis including BMI and body fat percentage",
        "Metabolic rate calculations for weight management",
        "Nutritional planning for protein, calories, and hydration",
        "Cardiovascular fitness assessment and heart rate zones",
        "Sleep optimization and recovery planning"
      ],
      useCases: "Whether you're starting a fitness journey, training for competition, managing weight, or simply maintaining health, our tools help you make informed decisions about nutrition, exercise, and lifestyle choices."
    },
    calculators: [
      { name: 'BMI Calculator', description: 'Calculate Body Mass Index and assess weight categories', popular: true, link: '/calculator/health/bmi' },
      { name: 'Calorie Calculator', description: 'Calculate daily calorie needs for weight management goals', popular: true, link: '/calculator/health/calorie' },
      { name: 'BMR Calculator', description: 'Calculate your Basal Metabolic Rate using multiple formulas', link: '/calculator/health/bmr' },
      { name: 'Body Fat Calculator', description: 'Calculate body fat percentage using multiple measurement methods', link: '/calculator/health/bodyfat' },
      { name: 'Heart Rate Calculator', description: 'Calculate training zones and target heart rates for optimal fitness', link: '/calculator/health/heartrate' },
      { name: 'Protein Calculator', description: 'Calculate daily protein needs for your fitness goals', popular: true, link: '/calculator/health/protein' },
      { name: 'Water Intake Calculator', description: 'Calculate your daily water needs for optimal hydration', link: '/calculator/health/water' },
      { name: 'Sleep Calculator', description: 'Optimize your sleep schedule using sleep cycle science', link: '/calculator/health/sleep' },
      { name: 'Fitness Calculator', description: 'Calculate 1RM, calories burned, running pace, and VO2 Max', link: '/calculator/health/fitness' }
    ]
  },
  {
    title: 'Financial & Business',
    icon: '💰',
    slug: 'financial',
    description: 'Financial planning and business tools.',
    color: 'from-green-500 to-emerald-600',
    literature: {
      introduction: "Financial literacy is crucial for personal and business success. Our financial calculators help you make informed decisions about loans, investments, retirement planning, and business operations.",
      keyTopics: [
        "Compound interest and investment growth calculations",
        "Loan amortization and payment schedules",
        "Retirement planning and savings strategies",
        "Business valuation and ROI analysis",
        "Currency conversion and exchange rates"
      ],
      useCases: "From calculating mortgage payments to planning retirement savings, our financial tools help individuals and businesses make data-driven financial decisions with confidence."
    },
    calculators: [
      { name: 'Loan Calculator', description: 'Calculate monthly payments, interest, and amortization schedules', popular: true, link: '/calculator/financial/loan' },
      { name: 'Mortgage Calculator', description: 'Estimate mortgage payments including PMI and property taxes', popular: true, link: '/calculator/financial/mortgage' },
      { name: 'Interest Calculator', description: 'Calculate simple and compound interest on investments', popular: true, link: '/calculator/financial/interest' },
      { name: 'ROI Calculator', description: 'Measure return on investment for business decisions', link: '/calculator/financial/roi' },
      { name: 'Retirement Calculator', description: 'Plan retirement savings and estimate future needs', popular: true, link: '/calculator/financial/retirement' },
      { name: 'Budget Calculator', description: 'Track income, expenses, and savings goals', link: '/calculator/financial/budget' },
      { name: 'Salary Calculator', description: 'Convert between hourly, monthly, and annual salaries', link: '/calculator/financial/salary' },
      { name: 'Tax Calculator', description: 'Estimate federal and state income tax obligations', link: '/calculator/financial/tax' },
      { name: 'NPV/IRR Calculator', description: 'Calculate net present value and internal rate of return', link: '/calculator/financial/npv-irr' },
      { name: 'Compound Interest Calculator', description: 'Calculate compound interest with optional contributions', link: '/calculator/financial/compound-interest' },
      { name: 'Refinance Calculator', description: 'Compare mortgage refinance options and savings', link: '/calculator/financial/refinance' },
      { name: 'Currency Converter', description: 'Convert between world currencies with live exchange rates', link: '/calculator/financial/currency-converter' },
      { name: 'Credit Card Payoff', description: 'Calculate payoff time and interest savings strategies', link: '/calculator/financial/credit-card-payoff' },
      { name: 'Investment Calculator', description: 'Project investment growth with regular contributions', link: '/calculator/financial/investment' },
      { name: 'Depreciation Calculator', description: 'Calculate asset depreciation using various methods', link: '/calculator/financial/depreciation' },
      { name: 'Discount Calculator', description: 'Calculate discounts, sale prices, and savings amounts', link: '/calculator/financial/discount' }
    ]
  },
  {
    title: 'Engineering & Technology',
    icon: '⚡',
    slug: 'engineering',
    description: 'Technical calculators for engineers and developers.',
    color: 'from-yellow-500 to-orange-600',
    literature: {
      introduction: "Engineering and technology drive innovation and progress. Our technical calculators provide essential tools for electrical engineers, software developers, and technology professionals to solve complex problems and optimize designs.",
      keyTopics: [
        "Electrical circuit analysis and component calculations",
        "Digital logic and number system conversions",
        "Network configuration and IP subnet calculations",
        "Signal processing and frequency analysis",
        "Power consumption and efficiency calculations"
      ],
      useCases: "Whether you're designing circuits, configuring networks, converting between number systems, or analyzing electrical systems, our engineering tools help professionals work more efficiently and accurately."
    },
    calculators: [
      { name: 'Electrical Calculator', description: 'Calculate power, energy, cost, and AC circuit parameters', popular: true, link: '/calculator/engineering/electrical' },
      { name: 'Resistor Calculator', description: 'Calculate resistor values, color codes, and combinations', popular: true, link: '/calculator/engineering/resistor' },
      { name: 'Capacitor Calculator', description: 'Calculate capacitance, reactance, energy storage, and charging', link: '/calculator/engineering/capacitor' },
      { name: 'IP Subnet Calculator', description: 'Calculate network subnets, IP ranges, and VLSM', link: '/calculator/engineering/subnet' },
      { name: 'Password Generator', description: 'Generate secure passwords and analyze strength', link: '/calculator/engineering/password-generator' },
      { name: 'Ohm\'s Law Calculator', description: 'Calculate voltage, current, resistance, and power relationships', link: '/calculator/engineering/ohms-law' },
      { name: 'Binary/Hex Calculator', description: 'Convert between binary, decimal, hexadecimal, and octal', link: '/calculator/mathematics/binary-converter' }
    ]
  },
  {
    title: 'Automotive',
    icon: '🚗',
    slug: 'automotive',
    description: 'Vehicle calculators for car owners.',
    color: 'from-blue-500 to-green-600',
    literature: {
      introduction: "Automotive calculators help vehicle owners make informed decisions about fuel efficiency, maintenance costs, and vehicle performance. These tools are essential for both daily commuters and automotive enthusiasts.",
      keyTopics: [
        "Fuel consumption and efficiency calculations",
        "Trip cost estimation and budget planning",
        "Vehicle performance and specifications",
        "Maintenance scheduling and cost analysis",
        "Environmental impact and emissions calculations"
      ],
      useCases: "From calculating fuel costs for road trips to analyzing vehicle efficiency and planning maintenance budgets, our automotive tools help drivers optimize their vehicle ownership experience."
    },
    calculators: [
      { name: 'Fuel Cost Calculator', description: 'Calculate fuel costs for trips and optimize travel budget', popular: true, link: '/calculator/automotive/fuel-cost' },
      { name: 'MPG Calculator', description: 'Calculate vehicle fuel efficiency and cost per mile', popular: true, link: '/calculator/automotive/mpg' },
      { name: 'EV Range Calculator', description: 'Calculate electric vehicle range and charging needs', link: '/calculator/automotive/ev-range' },
      { name: 'Tire Size Calculator', description: 'Compare tire sizes and calculate speedometer differences', link: '/calculator/automotive/tire-size' },
      { name: 'Car Lease Calculator', description: 'Calculate monthly lease payments and total costs', link: '/calculator/financial/car-lease' },
      { name: 'Car Loan Calculator', description: 'Calculate auto loan payments and interest', link: '/calculator/financial/car-loan' }
    ]
  },
  {
    title: 'Cooking & Food',
    icon: '👨‍🍳',
    slug: 'cooking',
    description: 'Culinary calculators for chefs and bakers.',
    color: 'from-orange-500 to-red-600',
    literature: {
      introduction: "Cooking and baking are both art and science. Our culinary calculators help chefs, bakers, and home cooks achieve consistent results by providing precise measurements, conversions, and ratios for all your culinary creations.",
      keyTopics: [
        "Recipe scaling and ingredient conversions",
        "Baking measurements and baker's percentages",
        "Coffee brewing ratios and extraction calculations",
        "Alcohol dilution and beverage preparation",
        "Nutritional content and portion calculations"
      ],
      useCases: "Whether you're scaling a recipe for a dinner party, calculating baker's percentages for artisan bread, brewing the perfect cup of coffee, or diluting spirits for cocktails, our culinary tools ensure precision in every dish and drink."
    },
    calculators: [
      { name: 'Recipe Converter', description: 'Scale recipes up or down to match your serving size needs', popular: true, link: '/calculator/cooking/recipe-converter' },
      { name: 'Baking Calculator', description: 'Professional baking measurements and ingredient conversions', popular: true, link: '/calculator/cooking/baking' },
      { name: 'Coffee Ratio Calculator', description: 'Perfect coffee brewing ratios for every method', popular: true, link: '/calculator/cooking/coffee-ratio' },
      { name: 'Alcohol Dilution Calculator', description: 'Calculate alcohol dilution, fortification, and blending', link: '/calculator/cooking/alcohol-dilution' }
    ]
  },
  {
    title: 'Education & Science',
    icon: '🔬',
    slug: 'education',
    description: 'Educational and scientific calculators.',
    color: 'from-purple-500 to-indigo-600',
    literature: {
      introduction: "Science and education are the foundations of knowledge and discovery. Our educational calculators provide essential tools for students, educators, and researchers to understand complex concepts, perform accurate calculations, and excel in their academic pursuits.",
      keyTopics: [
        "Academic performance tracking and GPA calculations",
        "Chemical calculations and molecular analysis",
        "pH and acid-base chemistry calculations",
        "Stoichiometric relationships in chemical reactions",
        "Significant figures and measurement precision"
      ],
      useCases: "From tracking academic progress and calculating GPA to performing complex chemistry calculations and analyzing molecular structures, our educational tools support learning and research at all levels from high school to graduate studies."
    },
    calculators: [
      { name: 'GPA Calculator', description: 'Calculate your Grade Point Average and track academic performance', popular: true, link: '/calculator/education/gpa' },
      { name: 'Molecular Weight Calculator', description: 'Calculate molecular weight and composition of chemical compounds', popular: true, link: '/calculator/education/molecular-weight' },
      { name: 'pH Calculator', description: 'Calculate pH, pOH, and ion concentrations', link: '/calculator/education/ph' },
      { name: 'Stoichiometry Calculator', description: 'Calculate molar relationships in chemical reactions', link: '/calculator/education/stoichiometry' }
    ]
  },
  {
    title: 'Everyday Life',
    icon: '📅',
    slug: 'everyday',
    description: 'Daily life calculators for common tasks.',
    color: 'from-blue-500 to-indigo-600',
    literature: {
      introduction: "Everyday life is full of calculations and planning. Our daily life calculators help you manage time, plan schedules, and make quick calculations for common scenarios you encounter every day.",
      keyTopics: [
        "Time and date calculations for planning",
        "Age calculations and milestone tracking",
        "Tip calculations and bill splitting",
        "Time zone conversions for travel and communication",
        "Scheduling and countdown timers"
      ],
      useCases: "From calculating your exact age with fun facts to planning travel across time zones, splitting restaurant bills, or setting up countdown timers for important events, our everyday calculators make daily tasks simple and accurate."
    },
    calculators: [
      { name: 'Age Calculator', description: 'Calculate exact age with milestones and fun facts', popular: true, link: '/calculator/mathematics/age' },
      { name: 'Date Calculator', description: 'Add, subtract, or find the difference between dates', popular: true, link: '/calculator/mathematics/date' },
      { name: 'Tip Calculator', description: 'Calculate tips and split bills easily', popular: true, link: '/calculator/mathematics/tip' },
      { name: 'Time Calculator', description: 'Add, subtract, and convert time durations', link: '/calculator/mathematics/time' },
      { name: 'Time Zone Converter', description: 'Convert time between different time zones', link: '/calculator/everyday/timezone-converter' },
      { name: 'Countdown Timer', description: 'Count down to important dates and events', link: '/calculator/everyday/countdown-timer' }
    ]
  },
  {
    title: 'Construction & DIY',
    icon: '🏗️',
    slug: 'construction',
    description: 'Construction calculators for builders and DIY.',
    color: 'from-yellow-500 to-orange-600',
    literature: {
      introduction: "Construction and DIY projects require precise calculations for materials, measurements, and costs. Our construction calculators help builders, contractors, and DIY enthusiasts plan projects accurately and efficiently.",
      keyTopics: [
        "Area and volume calculations for materials",
        "Tile and flooring installation planning",
        "Paint coverage and material estimation",
        "Concrete mixing and quantity calculations",
        "Stair dimensions and building specifications"
      ],
      useCases: "Whether you're planning a kitchen renovation, calculating concrete for a driveway, estimating paint for a room, or designing stairs for a deck, our construction tools provide accurate measurements and material estimates."
    },
    calculators: [
      { name: 'Patio Calculator', description: 'Calculate materials and costs for patio construction', popular: true, link: '/calculator/construction/patio' },
      { name: 'Area Calculator', description: 'Calculate area for rooms, yards, and construction projects', popular: true, link: '/calculator/construction/area' },
      { name: 'Volume Calculator', description: 'Calculate volume for concrete, mulch, and storage spaces', link: '/calculator/construction/volume' },
      { name: 'Tile Calculator', description: 'Estimate tile quantities and costs for flooring projects', popular: true, link: '/calculator/construction/tile' },
      { name: 'Paint Calculator', description: 'Calculate paint coverage and quantity needed', popular: true, link: '/calculator/construction/paint' },
      { name: 'Concrete Calculator', description: 'Calculate concrete quantities for construction projects', link: '/calculator/construction/concrete' },
      { name: 'Stair Calculator', description: 'Calculate stair dimensions and building requirements', link: '/calculator/construction/stairs' },
      { name: 'Roofing Calculator', description: 'Estimate roofing materials and costs', link: '/calculator/construction/roofing' }
    ]
  },
  {
    title: 'Specialized Conversions',
    icon: '🔄',
    slug: 'conversions',
    description: 'Unique conversion tools for specialized needs.',
    color: 'from-teal-500 to-cyan-600',
    literature: {
      introduction: "Specialized conversions serve unique needs across different cultures, historical contexts, and specialized fields. Our conversion tools help bridge communication gaps and preserve historical knowledge.",
      keyTopics: [
        "Historical numeral systems and conversions",
        "Communication encoding and decoding",
        "Accessibility tools and translations",
        "Cultural and linguistic conversions",
        "Educational and learning tools"
      ],
      useCases: "From decoding Roman numerals in historical documents to converting text to Morse code for amateur radio, or translating text to Braille for accessibility, these specialized tools serve unique educational and practical purposes."
    },
    calculators: [
      { name: 'Unit Converter', description: 'Convert between various units of measurement', popular: true, link: '/calculator/conversions/unit-converter' },
      { name: 'Roman Numerals Converter', description: 'Convert between Roman numerals and decimal numbers', popular: true, link: '/calculator/conversions/roman-numerals' },
      { name: 'Morse Code Converter', description: 'Encode and decode Morse code messages', link: '/calculator/conversions/morse-code' },
      { name: 'Braille Translator', description: 'Convert text to Braille notation for accessibility', link: '/calculator/conversions/braille-translator' }
    ]
  },
  {
    title: 'Energy & Environment',
    icon: '🌱',
    slug: 'energy',
    description: 'Energy efficiency and environmental calculators.',
    color: 'from-green-500 to-emerald-600',
    literature: {
      introduction: "Energy efficiency and environmental consciousness are more important than ever. Our energy calculators help homeowners, businesses, and individuals make informed decisions about renewable energy, energy consumption, and environmental impact.",
      keyTopics: [
        "Solar panel efficiency and savings calculations",
        "Energy consumption monitoring and optimization",
        "Carbon footprint assessment and reduction",
        "Home energy audit and improvement planning",
        "Renewable energy investment analysis"
      ],
    useCases: "Whether you're considering solar panels for your home, trying to reduce energy bills, calculating carbon offsets for travel, or planning energy-efficient improvements, our tools provide accurate environmental and financial analysis."
    },
    calculators: [
      { name: 'Solar Panel Savings Calculator', description: 'Calculate solar panel costs, savings, and payback period', popular: true, link: '/calculator/energy/solar-panel-savings' },
      { name: 'Energy Usage Calculator', description: 'Monitor and optimize home energy consumption', link: '/calculator/energy/energy-usage' },
      { name: 'Carbon Footprint Calculator', description: 'Calculate your environmental impact and CO₂ emissions.', link: '/calculator/energy/carbon-footprint' },
      { name: 'Home Energy Audit Calculator', description: 'Assess home energy efficiency and improvement opportunities', link: '/calculator/energy/home-energy-audit' }
    ]
  },
  {
    title: 'Agriculture & Gardening',
    icon: '🌾',
    slug: 'agriculture',
    description: 'Grow smarter with planting, spacing, and harvest calculators.',
    color: 'from-green-500 to-lime-600',
    literature: {
      introduction: "Agriculture calculators help growers plan beds, optimize spacing, and estimate yields so plants thrive and resources aren’t wasted.",
      keyTopics: [
        "Seed and plant spacing",
        "Row planning and bed layout",
        "Yield and harvest planning",
        "Resource and input estimation"
      ],
      useCases: "Plan your beds, avoid overcrowding, and predict harvests with practical tools for gardeners and growers."
    },
    calculators: [
      { name: 'Seed Spacing Calculator', description: 'Calculate optimal seed spacing for your garden plants', popular: true, link: '/calculator/agriculture/seed-spacing' }
    ]
  },
  {
    title: 'Animal Age Calculators',
    icon: '🐾',
    slug: 'animal-age',
    description: 'Convert pet age to human equivalent.',
    color: 'from-amber-500 to-orange-600',
    literature: {
      introduction: "Understanding your pet's age in human terms helps provide better care throughout their life stages. Our animal age calculators use veterinary science to provide accurate age conversions and care recommendations.",
      keyTopics: [
        "Veterinary-approved age conversion formulas",
        "Life stage identification and characteristics",
        "Size and breed-specific calculations for dogs",
        "Indoor vs outdoor lifestyle factors for cats",
        "Age-appropriate care and health recommendations"
      ],
      useCases: "Perfect for pet owners wanting to understand their pet's development stage, plan appropriate care, discuss health needs with veterinarians, or simply satisfy curiosity about their furry friend's age in human terms."
    },
    calculators: [
      { name: 'Dog Age Calculator', description: 'Convert dog years to human years with size considerations', popular: true, link: '/calculator/animal-age/dog-age' },
      { name: 'Cat Age Calculator', description: 'Convert cat years to human years with lifestyle factors', popular: true, link: '/calculator/animal-age/cat-age' }
    ]
  },
  {
    title: 'Space & Astronomy',
    icon: '🚀',
    slug: 'space',
    description: 'Space calculators for astronomy and planetary science.',
    color: 'from-indigo-600 to-purple-700',
    literature: {
      introduction: "Space and astronomy fascinate people of all ages. Our space calculators help you understand planetary motion, gravitational effects, and time scales across our solar system, making complex astronomical concepts accessible and engaging.",
      keyTopics: [
        "Planetary orbital periods and age conversions",
        "Gravitational effects on different celestial bodies",
        "Martian time systems and calendar calculations",
        "Weight variations across the solar system",
        "Comparative planetology and space science"
      ],
      useCases: "Perfect for students learning astronomy, space enthusiasts exploring planetary science, educators teaching solar system concepts, or anyone curious about how age, weight, and time work on other worlds."
    },
    calculators: [
      { name: 'Age on Mars Calculator', description: 'Calculate your age on Mars and other planets', popular: true, link: '/calculator/space/age-on-mars' },
      { name: 'Space Weight Calculator', description: 'Calculate your weight on different planets and moons', popular: true, link: '/calculator/space/space-weight' }
    ]
  },
  {
    title: 'Unique & Niche',
    icon: '🎲',
    slug: 'unique',
    description: 'Fun calculators for entertainment and curiosity.',
    color: 'from-pink-500 to-rose-600',
    literature: {
      introduction: "Sometimes calculations are just for fun! Our unique and niche calculators provide entertainment, satisfy curiosity, and offer playful ways to explore interesting concepts and relationships.",
      keyTopics: [
        "Entertainment and novelty calculations",
        "Probability and chance calculations",
        "Fun facts and trivia generators",
        "Creative mathematical explorations",
        "Playful applications of mathematics"
      ],
      useCases: "Perfect for parties, educational entertainment, satisfying curiosity, or just having fun with numbers. These calculators turn serious mathematics into playful exploration of interesting concepts."
    },
    calculators: [
      { name: 'Love Calculator', description: 'Calculate compatibility between two people (just for fun!)', popular: true, link: '/calculator/unique/love-calculator' },
      { name: 'Golf Balls in Boeing 747', description: 'Calculate how many golf balls fit inside a Boeing 747', link: '/calculator/unique/golf-balls-boeing-747' },
      { name: 'Aquarium Volume Calculator', description: 'Calculate aquarium volume, water weight, and equipment recommendations', link: '/calculator/unique/aquarium-volume' }
    ]
  }
];
