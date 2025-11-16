// SEO metadata for learn/blog pages about calculators
// Educational content optimized for "how to" and "learn" queries

export type LearnSEO = {
  primaryKeyword: string;
  variants: string[]; // 3–7 educational keywords
  longTails: string[]; // 3–8 how-to/tutorial phrases
  metaTitle: string; // ~60 chars, focused on learning
  metaDescription: string; // ~155 chars, educational focus
  lastResearched: string; // ISO date
  faqSchema?: object;
  howToSchema?: object;
};

// Expand/merge into learnSeoBySlug
// Last researched: 2025-09-09 (Europe/London)

export const learnSeoBySlug: Record<string, LearnSEO> = {
  // ---------- HEALTH ----------

  "bmi": {
    primaryKeyword: "how to calculate BMI",
    variants: [
      "BMI calculation tutorial",
      "body mass index explained",
      "BMI categories guide",
      "BMI for adults"
    ],
    longTails: [
      "how to calculate BMI step by step",
      "BMI categories and health meaning",
      "metric and imperial BMI calculation",
      "BMI example calculations for adults"
    ],
    metaTitle: "How to Calculate BMI — Body Mass Index Guide",
    metaDescription: "Learn how to calculate BMI in metric and imperial units, interpret categories, and understand limitations with worked examples.",
    lastResearched: "2025-09-09"
  },
  "mpg": {
  primaryKeyword: "how to calculate miles per gallon",
  variants: [
    "fuel efficiency calculation tutorial",
    "MPG vs L/100km explained",
    "car fuel economy guide",
    "trip cost per mile calculation"
  ],
  longTails: [
    "how to calculate MPG step by step",
    "convert miles per gallon to litres per 100km",
    "calculate fuel cost for a road trip",
    "manual MPG calculation from odometer readings",
    "what is a good MPG for my car type"
  ],
  metaTitle: "How to Calculate MPG — Fuel Efficiency & Trip Cost Guide",
  metaDescription: "Learn how to calculate miles per gallon (MPG) manually, convert to L/100km, estimate fuel costs, and understand what good fuel economy looks like for your vehicle.",
  lastResearched: "2025-09-27"
},
"password-generator": {
  primaryKeyword: "how to create a strong password",
  variants: [
    "password strength tutorial",
    "passphrase vs random password",
    "entropy in password security",
    "use a password manager"
  ],
  longTails: [
    "how to generate a secure password step by step",
    "calculate password entropy manually",
    "create a memorable but strong passphrase",
    "why you should never reuse passwords",
    "how to use a password generator safely"
  ],
  metaTitle: "How to Create a Strong Password — Entropy, Passphrases & Security",
  metaDescription: "Learn how to generate uncrackable passwords using entropy, passphrases, and best practices. Step-by-step guide to password strength, managers, and 2FA.",
  lastResearched: "2025-09-27"
},
  "wearable-tech-data-driven-fitness": {
    "primaryKeyword": "wearable fitness technology",
    "variants": [
      "wearable fitness tracker benefits",
      "data driven fitness training",
      "using heart rate variability for recovery",
      "smartwatch health tracking guide"
    ],
    "longTails": [
      "how to use wearable fitness data to improve performance",
      "heart rate variability and recovery explained",
      "best health metrics to track with a fitness watch",
      "how to connect wearable data to calorie tracking",
      "is hrv accurate for training readiness"
    ],
    "metaTitle": "Wearable Tech & Data-Driven Fitness: How to Use HRV, Sleep, and Recovery Data to Train Smarter",
    "metaDescription": "Learn how wearable fitness tech and recovery metrics like HRV, sleep score, and resting heart rate can improve performance, fat loss, and recovery. See how to connect device data with BMI, body fat %, and calorie needs.",
    "lastResearched": "2025-11-01"
  },

  "strength-training-building-muscle-healthgoal": {
    "primaryKeyword": "benefits of strength training",
    "variants": [
      "how to build muscle safely",
      "strength training for longevity",
      "muscle building for beginners",
      "why building muscle improves health"
    ],
    "longTails": [
      "how much strength training do I need per week for health",
      "does lifting weights help with fat loss and metabolism",
      "beginner strength training plan 3 days a week",
      "how to eat for muscle gain without getting bulky",
      "how to track body fat and muscle growth over time"
    ],
    "metaTitle": "Strength Training for Everyone: Why Building Muscle Is Essential for Health and Longevity",
    "metaDescription": "Discover why building muscle is critical for metabolism, joint health, mobility, ageing, and disease prevention. Get a beginner-friendly strength plan, recovery tips, and guidance on calories, protein, and body fat tracking.",
    "lastResearched": "2025-11-01"
  },

  "holistic-recovery-mobility-low-impact-training": {
    "primaryKeyword": "mobility and recovery training",
    "variants": [
      "low impact workout benefits",
      "mobility training for longevity",
      "breathwork for recovery",
      "active recovery vs rest day"
    ],
    "longTails": [
      "how to improve mobility and reduce soreness without heavy training",
      "best low impact cardio options for joint health",
      "how breathwork improves recovery and sleep",
      "what is active recovery and how often should I do it",
      "8 week mobility and recovery routine for beginners"
    ],
    "metaTitle": "Holistic Recovery & Mobility: Low-Impact Training, Breathwork, and Smarter Recovery for Long-Term Health",
    "metaDescription": "Learn how mobility work, low-impact cardio, breathwork, and recovery tracking can prevent injury, improve energy, and protect long-term health. Includes sample weekly routine and progress tracking tips.",
    "lastResearched": "2025-11-01"
  },
"patio": {
  primaryKeyword: "how to calculate patio materials",
  variants: [
    "paver calculator tutorial",
    "patio base material guide",
    "gravel and sand for pavers",
    "patio edging and drainage"
  ],
  longTails: [
    "how to calculate number of pavers needed",
    "patio gravel base thickness UK",
    "calculate sand and gravel for patio",
    "paver waste factor for herringbone pattern",
    "how to slope patio for drainage"
  ],
  metaTitle: "How to Calculate Patio Materials — Pavers, Gravel & Sand Guide",
  metaDescription: "Learn how to calculate pavers, gravel, sand, and edging for your DIY patio. Step-by-step formulas, waste factors, drainage slope, and pro tips for a stable, long-lasting build.",
  lastResearched: "2025-09-27"
},

"seed-spacing": {
  primaryKeyword: "how to calculate seed spacing for a garden",
  variants: [
    "garden plant spacing guide",
    "vegetable spacing tutorial",
    "row and plant distance calculator",
    "optimal seed spacing by crop"
  ],
  longTails: [
    "step by step calculate seed spacing for raised beds",
    "how to space vegetables in a square foot garden",
    "plant spacing chart for common vegetables UK",
    "calculate number of seeds needed per row",
    "interplanting and succession planting spacing guide"
  ],
  metaTitle: "How to Calculate Seed Spacing — Garden Layout & Plant Density",
  metaDescription: "Learn how to calculate seed and plant spacing for any vegetable using bed dimensions, crop requirements, and layout patterns. Includes UK gardening standards and practical examples.",
  lastResearched: "2025-09-27"
},
"tax": {
  primaryKeyword: "how to calculate income tax",
  variants: [
    "federal tax calculation tutorial",
    "tax brackets explained",
    "AGI vs taxable income",
    "tax deductions vs credits"
  ],
  longTails: [
    "step by step calculate federal income tax",
    "how to estimate tax refund or amount due",
    "calculate tax with 401k and HSA contributions",
    "marginal vs effective tax rate explained",
    "how to adjust W-4 for accurate withholding"
  ],
  metaTitle: "How to Calculate Income Tax — Brackets, Deductions & Credits",
  metaDescription: "Learn how to manually calculate U.S. federal income tax using AGI, deductions, tax brackets, and credits. Step-by-step guide with real examples.",
  lastResearched: "2025-09-27"
},
"tile": {
  primaryKeyword: "how to calculate tile needed for a room",
  variants: [
    "tile quantity estimation tutorial",
    "grout and thinset calculation",
    "tile waste factor guide",
    "tile layout planning"
  ],
  longTails: [
    "step by step calculate tiles for floor or wall",
    "how to account for grout lines in tile count",
    "tile calculator with pattern waste (herringbone, diagonal)",
    "how much thinset and grout per square foot",
    "dry layout tips before tiling"
  ],
  metaTitle: "How to Calculate Tile Needed — Waste, Grout & Layout Guide",
  metaDescription: "Learn how to manually calculate tile, thinset, and grout quantities for any room. Includes grout lines, waste factors, and pattern adjustments.",
  lastResearched: "2025-09-27"
},
"subnet": {
  primaryKeyword: "how to calculate subnet mask and IP ranges",
  variants: [
    "CIDR notation tutorial",
    "IP subnetting for beginners",
    "network and broadcast address",
    "IPv4 subnet calculator guide"
  ],
  longTails: [
    "step by step calculate subnet from CIDR",
    "find usable host range in a subnet",
    "convert /24 to subnet mask 255.255.255.0",
    "how to subnet a network for VLANs",
    "IPv6 subnetting basics explained"
  ],
  metaTitle: "How to Calculate Subnets — CIDR, Mask & IP Ranges",
  metaDescription: "Master IPv4 subnetting: calculate network, broadcast, and host ranges from CIDR or subnet mask. Includes IPv6 basics and practical examples.",
  lastResearched: "2025-09-27"
},
"mortgage": {
  primaryKeyword: "how to calculate mortgage payments",
  variants: [
    "mortgage amortisation tutorial",
    "P&I payment explained",
    "mortgage with taxes and insurance",
    "PMI removal guide"
  ],
  longTails: [
    "how to calculate monthly mortgage payment step by step",
    "mortgage calculator with PMI and escrow",
    "15 year vs 30 year mortgage comparison",
    "how extra payments reduce mortgage term",
    "when can I remove PMI from my mortgage"
  ],
  metaTitle: "How to Calculate Mortgage Payments — P&I, PMI & Amortisation",
  metaDescription: "Learn how to calculate your total monthly mortgage payment including principal, interest, taxes, insurance, and PMI. Step-by-step amortisation guide with examples.",
  lastResearched: "2025-09-27"
},
"ratio": {
  primaryKeyword: "how to simplify ratios",
  variants: [
    "ratio calculator tutorial",
    "scale ratios up and down",
    "equivalent ratios explained",
    "ratio to fraction conversion"
  ],
  longTails: [
    "how to simplify a ratio step by step",
    "scale a recipe using ratios",
    "convert ratio to percentage",
    "solve ratio word problems with examples",
    "find missing value in proportion"
  ],
  metaTitle: "How to Simplify and Use Ratios — Scaling, Proportions & Examples",
  metaDescription: "Learn how to simplify ratios, scale them up or down, solve proportions, and convert ratios to fractions or percentages with clear, step-by-step examples.",
  lastResearched: "2025-09-27"
},
"protein": {
  primaryKeyword: "how to calculate daily protein intake",
  variants: [
    "protein per kg explained",
    "RDA protein guide",
    "protein for muscle gain",
    "protein for weight loss"
  ],
  longTails: [
    "protein per kg per day by goal",
    "set protein intake for muscle growth",
    "protein targets for fat loss",
    "RDA vs athlete recommendations"
  ],
  metaTitle: "How to Calculate Daily Protein Intake",
  metaDescription: "Set protein per kg for maintenance, fat loss and muscle gain. Compare RDA with sports nutrition guidelines.",
  lastResearched: "2025-09-09"
},
  "bmr": {
    primaryKeyword: "how to calculate BMR",
    variants: [
      "Mifflin St Jeor tutorial",
      "Harris Benedict vs Mifflin",
      "basal metabolic rate explained",
      "BMR to calories"
    ],
    longTails: [
      "how to calculate BMR step by step",
      "convert BMR to daily calories with activity",
      "difference between BMR and RMR",
      "BMR calculation for weight loss"
    ],
    metaTitle: "How to Calculate BMR — Mifflin-St Jeor Explained",
    metaDescription: "Calculate BMR with Mifflin-St Jeor, compare to Harris-Benedict, and convert BMR to daily calories using activity multipliers.",
    lastResearched: "2025-09-09"
  },

  "bodyfat": {
    primaryKeyword: "how to calculate body fat percentage",
    variants: [
      "US Navy body fat method",
      "waist neck hip tutorial",
      "body fat categories",
      "estimate body fat at home"
    ],
    longTails: [
      "US Navy body fat formula step by step",
      "tape measurements for body fat",
      "body fat percent ranges by age and sex",
      "accuracy limits of navy method"
    ],
    metaTitle: "How to Calculate Body Fat % — U.S. Navy Method",
    metaDescription: "Step-by-step tape-measure method for body fat %, with formulas, examples, accuracy notes and category ranges.",
    lastResearched: "2025-09-09"
  },
  "credit-card-payoff": {
  primaryKeyword: "credit card payoff calculator",
  variants: [
    "credit card debt payoff plan",
    "how to pay off credit card faster",
    "minimum payment vs full payoff",
    "credit card repayment tool",
    "UK credit card payoff schedule"
  ],
  longTails: [
    "credit card payoff calculator with interest",
    "best strategy to pay off credit card debt",
    "credit card debt snowball vs avalanche calculator",
    "how long to pay off credit cards with given payment",
    "credit card payoff plan for multiple cards"
  ],
  metaTitle: "Credit Card Payoff Calculator & Debt Repayment Plan",
  metaDescription: "Use our credit card payoff calculator to plan faster repayment. Compare minimum payments, interest, and payoff time with ease.",
  lastResearched: "2025-09-28"
},

"currency-converter": {
  primaryKeyword: "currency converter",
  variants: [
    "foreign exchange rate converter",
    "USD to GBP converter",
    "EUR to USD converter",
    "live currency converter",
    "multi currency converter tool"
  ],
  longTails: [
    "real time currency converter online",
    "how to convert between multiple currencies",
    "best free currency converter for travellers",
    "currency converter with historical rates",
    "multi-currency converter for web embedding"
  ],
  metaTitle: "Currency Converter – Live Rates & Multi-Currency Tool",
  metaDescription: "Convert currencies in real time. Supports USD, GBP, EUR and more. Use our live currency converter with historical rates and multiple currencies.",
  lastResearched: "2025-09-28"
},

"discount": {
  primaryKeyword: "discount calculator",
  variants: [
    "percentage discount calculator",
    "sale price calculator",
    "discounted price calculator",
    "bulk discount calculator",
    "how much discount calculator"
  ],
  longTails: [
    "calculate discount and sale price",
    "discount calculator with original price and percent",
    "apply multiple discounts calculator",
    "how much you save with discount calculator",
    "best discount calculator tool online"
  ],
  metaTitle: "Discount Calculator – Sale Price & Savings Tool",
  metaDescription: "Quickly calculate discount, sale price and savings. Perfect for shoppers, marketers, and e-commerce pricing decisions.",
  lastResearched: "2025-09-28"
},

"energy-usage": {
  primaryKeyword: "energy usage calculator",
  variants: [
    "household energy consumption calculator",
    "appliance energy usage calculator",
    "electricity cost calculator",
    "daily energy consumption calculator",
    "home power usage estimator"
  ],
  longTails: [
    "how to calculate home energy usage in kWh",
    "appliance power consumption calculator online",
    "energy usage calculator for electricity bills",
    "track daily household energy consumption",
    "reduce energy usage and save money calculator"
  ],
  metaTitle: "Energy Usage Calculator – Track Home & Appliance Power",
  metaDescription: "Calculate household and appliance energy consumption. Estimate electricity costs in kWh and discover savings with our energy usage calculator.",
  lastResearched: "2025-09-28"
},

"ev-range": {
  primaryKeyword: "EV range calculator",
  variants: [
    "electric vehicle range estimator",
    "EV distance calculator",
    "EV battery range calculator",
    "electric car range tool",
    "EV charging range calculator"
  ],
  longTails: [
    "how far can my EV go on a full charge calculator",
    "EV range calculator with battery size and efficiency",
    "electric car range estimator with driving conditions",
    "realistic EV range calculator UK",
    "EV charging and range planning calculator"
  ],
  metaTitle: "EV Range Calculator – Estimate Electric Car Distance",
  metaDescription: "Estimate electric vehicle range based on battery size, efficiency, speed, and conditions. Plan EV journeys with our EV range calculator.",
  lastResearched: "2025-09-28"
},

"fuel-cost": {
  primaryKeyword: "fuel cost calculator",
  variants: [
    "trip fuel cost calculator",
    "car fuel cost estimator",
    "petrol cost calculator",
    "gas mileage calculator",
    "road trip fuel calculator"
  ],
  longTails: [
    "how to calculate fuel cost for a trip",
    "fuel cost calculator with mpg and distance",
    "estimate petrol cost UK trip",
    "calculate gas mileage and trip cost online",
    "fuel cost calculator with litres per 100 km"
  ],
  metaTitle: "Fuel Cost Calculator – Estimate Petrol & Trip Costs",
  metaDescription: "Easily calculate trip fuel cost with distance, mpg, and fuel prices. Use our fuel cost calculator for commuting, travel budgeting, or fleet management.",
  lastResearched: "2025-09-28"
},

"golf-balls-boeing-747": {
  primaryKeyword: "golf balls in a 747",
  variants: [
    "golf balls boeing 747 estimate",
    "fermi estimation problem example",
    "how many golf balls fit in a plane",
    "boeing 747 golf ball problem",
    "fermi problem interview question"
  ],
  longTails: [
    "how many golf balls fit in a boeing 747 explained",
    "fermi problem golf ball boeing 747 calculator",
    "classic interview question golf balls in airplane",
    "estimate number of golf balls in jumbo jet",
    "fermi estimation guide golf balls problem"
  ],
  metaTitle: "How Many Golf Balls Fit in a 747? – Fermi Estimation",
  metaDescription: "Solve the classic Fermi problem: How many golf balls fit in a Boeing 747? Learn step-by-step estimation methods and interview tips.",
  lastResearched: "2025-09-28"
},

"gpa": {
  primaryKeyword: "GPA calculator",
  variants: [
    "grade point average calculator",
    "college GPA calculator",
    "weighted GPA calculator",
    "unweighted GPA calculator",
    "semester GPA calculator"
  ],
  longTails: [
    "how to calculate GPA step by step",
    "GPA calculator with weighted and unweighted scale",
    "calculate cumulative GPA online",
    "college GPA calculator with credit hours",
    "GPA calculator with different grade scales"
  ],
  metaTitle: "GPA Calculator – Weighted & Unweighted GPA Tool",
  metaDescription: "Calculate GPA on a 4.0 scale, weighted or unweighted. Use our GPA calculator for semester, cumulative, and credit-hour based results.",
  lastResearched: "2025-09-28"
},

"home-energy-audit": {
  primaryKeyword: "home energy audit calculator",
  variants: [
    "DIY home energy audit",
    "house energy efficiency calculator",
    "home insulation audit tool",
    "home energy savings calculator",
    "energy audit UK guide"
  ],
  longTails: [
    "how to conduct a home energy audit",
    "calculate home energy efficiency score",
    "home energy audit checklist UK",
    "energy audit calculator for savings",
    "estimate household energy efficiency improvements"
  ],
  metaTitle: "Home Energy Audit – Efficiency Score & Savings Tool",
  metaDescription: "Conduct a home energy audit to find savings opportunities. Estimate efficiency scores, insulation, and energy usage improvements.",
  lastResearched: "2025-09-28"
},

"interest": {
  primaryKeyword: "interest calculator",
  variants: [
    "simple interest calculator",
    "compound interest calculator",
    "APR vs APY calculator",
    "loan interest calculator",
    "savings interest calculator"
  ],
  longTails: [
    "how to calculate simple and compound interest",
    "interest calculator with APR and APY",
    "loan repayment and interest calculator",
    "daily monthly compound interest calculator",
    "savings account interest growth calculator"
  ],
  metaTitle: "Interest Calculator – Simple, Compound, APR ↔ APY",
  metaDescription: "Calculate simple and compound interest. Compare APR vs APY for savings, loans, and credit cards using our interest calculator.",
  lastResearched: "2025-09-28"
},

"investment": {
  primaryKeyword: "investment calculator",
  variants: [
    "investment growth calculator",
    "retirement savings calculator",
    "future value calculator",
    "compound investment calculator",
    "investment return calculator"
  ],
  longTails: [
    "investment calculator with monthly contributions",
    "how to calculate investment growth with inflation",
    "future value of investment calculator online",
    "retirement investment calculator with compound interest",
    "investment calculator with fees and returns"
  ],
  metaTitle: "Investment Calculator – Growth & Future Value Tool",
  metaDescription: "Calculate investment growth with contributions, inflation, and compounding. Plan savings and retirement with our investment calculator.",
  lastResearched: "2025-09-28"
},

"loan": {
  primaryKeyword: "loan calculator",
  variants: [
    "loan payment calculator",
    "amortization calculator",
    "personal loan calculator",
    "monthly loan repayment calculator",
    "auto loan calculator"
  ],
  longTails: [
    "how to calculate loan payments with amortization",
    "loan calculator with interest and principal breakdown",
    "monthly loan repayment estimator",
    "car loan calculator UK with APR",
    "loan amortization schedule calculator"
  ],
  metaTitle: "Loan Calculator – Payments & Amortization Schedule",
  metaDescription: "Calculate loan payments, amortization schedules, and interest savings. Use our loan calculator for mortgages, auto, and personal loans.",
  lastResearched: "2025-09-28"
},

"love-calculator": {
  primaryKeyword: "love calculator",
  variants: [
    "name compatibility calculator",
    "love percentage calculator",
    "romantic compatibility test",
    "fun love match calculator",
    "online love calculator game"
  ],
  longTails: [
    "love calculator by name compatibility test",
    "fun love calculator game online",
    "romantic compatibility calculator with names",
    "love percentage test free",
    "online love calculator prank tool"
  ],
  metaTitle: "Love Calculator – Fun Name Compatibility Test",
  metaDescription: "Test your name compatibility with our love calculator. A fun, lighthearted tool to generate love percentages and compatibility scores.",
  lastResearched: "2025-09-28"
},

"morse-code": {
  primaryKeyword: "morse code translator",
  variants: [
    "morse code decoder",
    "morse code converter",
    "text to morse code",
    "morse code chart",
    "morse code learning tool"
  ],
  longTails: [
    "translate text to morse code online free",
    "morse code audio translator and decoder",
    "how to learn morse code fast",
    "morse code translator with sound and light",
    "morse code practice tool for beginners"
  ],
  metaTitle: "Morse Code Translator – Encode & Decode Online",
  metaDescription: "Translate text to Morse code and decode signals instantly. Learn timing, rhythm, and practice Morse code with sound and light.",
  lastResearched: "2025-09-28"
},

"npv-irr": {
  primaryKeyword: "NPV and IRR calculator",
  variants: [
    "net present value calculator",
    "internal rate of return calculator",
    "discounted cash flow calculator",
    "investment appraisal tool",
    "capital budgeting calculator"
  ],
  longTails: [
    "calculate NPV and IRR online free",
    "investment decision tool with NPV and IRR",
    "discounted cash flow analysis calculator",
    "compare IRR vs NPV in project evaluation",
    "financial calculator for capital budgeting"
  ],
  metaTitle: "NPV & IRR Calculator – Investment Analysis Tool",
  metaDescription: "Calculate Net Present Value (NPV) and Internal Rate of Return (IRR) with our investment calculator. Evaluate projects using discounted cash flow analysis.",
  lastResearched: "2025-09-28"
},

"ohms-law": {
  primaryKeyword: "ohm's law calculator",
  variants: [
    "voltage current resistance calculator",
    "V=IR calculator",
    "electrical power calculator",
    "ohms law equation solver",
    "circuit analysis calculator"
  ],
  longTails: [
    "calculate voltage current resistance using ohms law",
    "ohms law calculator for electrical circuits",
    "power current voltage resistance calculator",
    "ohms law triangle calculator online",
    "simple ohms law calculator for students"
  ],
  metaTitle: "Ohm’s Law Calculator – Voltage, Current, Resistance",
  metaDescription: "Use Ohm’s Law calculator to find voltage, current, resistance, and power. Apply V=IR formulas for electronics and electrical circuits.",
  lastResearched: "2025-09-28"
},

"paint": {
  primaryKeyword: "paint calculator",
  variants: [
    "paint coverage calculator",
    "wall paint calculator",
    "room paint estimator",
    "how much paint do I need",
    "paint cost calculator"
  ],
  longTails: [
    "calculate how much paint needed for a room",
    "paint calculator with coverage and coats",
    "paint estimation tool for walls ceilings and trim",
    "paint coverage calculator with waste factor",
    "online paint calculator for home renovation"
  ],
  metaTitle: "Paint Calculator – Estimate Coverage & Paint Needed",
  metaDescription: "Calculate how much paint you need for walls, ceilings, and trim. Account for coats, coverage, and waste with our paint calculator.",
  lastResearched: "2025-09-28"
},

"recipe-converter": {
  primaryKeyword: "recipe converter",
  variants: [
    "baking measurement converter",
    "cups to grams converter",
    "recipe scaling calculator",
    "cooking conversion calculator",
    "pan size converter"
  ],
  longTails: [
    "convert baking recipes from cups to grams",
    "recipe converter for scaling ingredients",
    "cooking measurement converter cups grams ml",
    "pan size converter for cakes and baking",
    "online recipe scaling and conversion tool"
  ],
  metaTitle: "Recipe Converter – Cups to Grams & Scaling Tool",
  metaDescription: "Convert recipes between cups, grams, and milliliters. Scale ingredients and adjust pan sizes with our recipe converter.",
  lastResearched: "2025-09-28"
},

"refinance": {
  primaryKeyword: "refinance calculator",
  variants: [
    "mortgage refinance calculator",
    "refinance savings calculator",
    "refinance break even calculator",
    "loan refinance estimator",
    "refinance interest savings calculator"
  ],
  longTails: [
    "calculate refinance savings and break even point",
    "refinance calculator with monthly payment savings",
    "mortgage refinance calculator UK and US",
    "should I refinance my mortgage calculator",
    "refinance calculator with closing costs"
  ],
  metaTitle: "Refinance Calculator – Savings & Break-Even Tool",
  metaDescription: "Calculate savings, break-even point, and interest reduction with our refinance calculator. Compare mortgage refinance options easily.",
  lastResearched: "2025-09-28"
},

"retirement": {
  primaryKeyword: "retirement calculator",
  variants: [
    "retirement savings calculator",
    "pension calculator",
    "retirement income calculator",
    "401k retirement calculator",
    "retirement planning calculator"
  ],
  longTails: [
    "retirement calculator with 4% rule and inflation",
    "how much do I need to retire calculator",
    "retirement savings projection calculator UK",
    "pension and retirement income calculator",
    "compound interest retirement calculator"
  ],
  metaTitle: "Retirement Calculator – Savings & Income Planning",
  metaDescription: "Plan retirement savings and income with our retirement calculator. Estimate nest egg, withdrawals, and pension needs using the 4% rule.",
  lastResearched: "2025-09-28"
},

"roi": {
  primaryKeyword: "ROI calculator",
  variants: [
    "return on investment calculator",
    "annualized ROI calculator",
    "investment ROI calculator",
    "payback period calculator",
    "business ROI calculator"
  ],
  longTails: [
    "calculate return on investment percentage",
    "ROI calculator with payback period",
    "business ROI calculator for projects",
    "annualized ROI vs simple ROI calculator",
    "investment ROI calculator with cash flows"
  ],
  metaTitle: "ROI Calculator – Return on Investment Tool",
  metaDescription: "Calculate return on investment (ROI) with simple and annualized methods. Evaluate business projects with our ROI calculator.",
  lastResearched: "2025-09-28"
},

"roofing": {
  primaryKeyword: "roofing calculator",
  variants: [
    "roofing materials calculator",
    "roof shingle calculator",
    "roof area calculator",
    "roof squares calculator",
    "roofing cost calculator"
  ],
  longTails: [
    "calculate roofing materials needed for house",
    "roofing shingle bundles calculator",
    "roof square calculator with roof pitch",
    "roofing calculator with waste factor",
    "roofing cost estimation calculator"
  ],
  metaTitle: "Roofing Calculator – Shingles & Materials Estimator",
  metaDescription: "Estimate roofing materials, shingles, and waste with our roofing calculator. Calculate roof area, squares, and bundles easily.",
  lastResearched: "2025-09-28"
},

"salary": {
  primaryKeyword: "salary calculator",
  variants: [
    "hourly to annual salary calculator",
    "overtime pay calculator",
    "paycheck calculator",
    "salary converter UK",
    "wage calculator"
  ],
  longTails: [
    "calculate annual salary from hourly wage",
    "salary calculator with overtime pay",
    "UK salary to hourly rate calculator",
    "salary to monthly weekly pay calculator",
    "job offer salary comparison calculator"
  ],
  metaTitle: "Salary Calculator – Hourly, Annual & Overtime Pay",
  metaDescription: "Convert hourly to annual salary, calculate overtime, and compare pay structures. Use our salary calculator for UK and global jobs.",
  lastResearched: "2025-09-28"
},

"stairs": {
  primaryKeyword: "stair calculator",
  variants: [
    "stair rise and run calculator",
    "stair stringer calculator",
    "stair design calculator",
    "deck stair calculator",
    "building code stair calculator"
  ],
  longTails: [
    "how to calculate stair rise and run step by step",
    "stair stringer length calculator online",
    "staircase design calculator for builders",
    "stair riser and tread calculator for code compliance",
    "deck and basement stair calculator tool"
  ],
  metaTitle: "Stair Calculator – Rise, Run & Stringer Design Tool",
  metaDescription: "Design safe, code-compliant stairs with our stair calculator. Calculate rise, run, stringer length, and tread/riser dimensions for any project.",
  lastResearched: "2025-09-28"
},

"timezone-converter": {
  primaryKeyword: "time zone converter",
  variants: [
    "world clock converter",
    "UTC converter",
    "meeting time zone planner",
    "global time converter",
    "international time zone calculator"
  ],
  longTails: [
    "convert time zones with daylight saving adjustments",
    "time zone converter with multiple cities",
    "international meeting time zone planner tool",
    "how to convert UTC to local time manually",
    "best free online time zone converter"
  ],
  metaTitle: "Time Zone Converter – Global Time & Meeting Planner",
  metaDescription: "Convert time zones worldwide with our time zone converter. Account for DST, UTC offsets, and international date line shifts. Perfect for meetings and travel.",
  lastResearched: "2025-09-28"
},

"tip": {
  primaryKeyword: "tip calculator",
  variants: [
    "restaurant tip calculator",
    "bill splitter with tip",
    "gratuity calculator",
    "tip percentage calculator",
    "how much to tip calculator"
  ],
  longTails: [
    "calculate restaurant tips and split bills fairly",
    "tip calculator with tax and service charge options",
    "how to calculate tip percentages quickly",
    "bill splitter with tip calculator for groups",
    "gratuity calculator for restaurants taxis and salons"
  ],
  metaTitle: "Tip Calculator – Calculate Tips & Split Bills Fairly",
  metaDescription: "Easily calculate tips and split bills with our tip calculator. Adjust for tax, service charge, and group size for fair gratuity worldwide.",
  lastResearched: "2025-09-28"
},

"depreciation": {
  primaryKeyword: "depreciation calculator",
  variants: [
    "straight line depreciation calculator",
    "double declining balance calculator",
    "MACRS depreciation calculator",
    "asset depreciation calculator",
    "sum of years digits calculator"
  ],
  longTails: [
    "how to calculate straight line depreciation",
    "business asset depreciation calculator online",
    "declining balance depreciation example calculator",
    "MACRS depreciation schedule calculator",
    "depreciation calculator with salvage value and useful life"
  ],
  metaTitle: "Depreciation Calculator – Straight Line, DDB & MACRS",
  metaDescription: "Calculate depreciation using straight-line, double declining balance, SYD, or MACRS methods. Useful for accounting, tax, and asset management.",
  lastResearched: "2025-09-28"
},

"dog-age": {
  primaryKeyword: "dog age calculator",
  variants: [
    "dog years to human years calculator",
    "canine age calculator",
    "puppy age in human years",
    "breed specific dog age calculator",
    "dog lifespan calculator"
  ],
  longTails: [
    "convert dog years to human years accurately",
    "dog age calculator by breed size and weight",
    "modern dog age conversion method",
    "how old is my dog in human years calculator",
    "puppy to senior dog age calculator"
  ],
  metaTitle: "Dog Age Calculator – Convert Dog Years to Human Years",
  metaDescription: "Convert dog years to human years using modern veterinary science. Account for breed size, weight, and updated aging formulas.",
  lastResearched: "2025-09-28"
},

"electrical": {
  primaryKeyword: "electrical calculator",
  variants: [
    "ohms law calculator",
    "circuit calculator",
    "voltage current resistance calculator",
    "power calculator electrical",
    "series parallel circuit calculator"
  ],
  longTails: [
    "calculate voltage current resistance using ohms law",
    "electrical power calculation tool online",
    "series and parallel circuit resistance calculator",
    "AC and DC electrical circuit calculator",
    "electrical calculator for students and engineers"
  ],
  metaTitle: "Electrical Calculator – Ohm’s Law, Power & Circuits",
  metaDescription: "Calculate voltage, current, resistance, and power using Ohm’s Law. Solve series and parallel circuits with our electrical calculator.",
  lastResearched: "2025-09-28"
},

"space-weight": {
  primaryKeyword: "weight on other planets calculator",
  variants: [
    "space weight calculator",
    "planet weight calculator",
    "moon weight calculator",
    "mars weight calculator",
    "gravity calculator planets"
  ],
  longTails: [
    "calculate your weight on mars moon and jupiter",
    "weight on other planets compared to earth",
    "space weight calculator using gravity ratios",
    "how much would I weigh on different planets",
    "gravity based weight calculator for solar system"
  ],
  metaTitle: "Space Weight Calculator – Your Weight on Other Planets",
  metaDescription: "Find your weight on the Moon, Mars, Jupiter, and other planets. Use gravity ratios to compare your Earth weight across the solar system.",
  lastResearched: "2025-09-28"
},
  "ai-tools-2026": {
    "primaryKeyword": "AI tools 2026",
    "variants": [
      "best AI tools 2026",
      "AI productivity tools",
      "AI finance tools",
      "AI health tools",
      "everyday AI tools"
    ],
    "longTails": [
      "AI tools everyone should be using in 2026",
      "best ai tools for productivity finance and health",
      "how to use ai tools for everyday life 2026",
      "which ai tools are worth using in 2026",
      "ai tools that improve daily life and personal routines"
    ],
    "metaTitle": "AI Tools Everyone Should Be Using in 2026 — And Why They Matter",
    "metaDescription": "Discover the essential AI tools for productivity, finance and health in 2026. Learn how AI fits into daily routines and how to pair it with reliable calculators for accurate decisions.",
    "lastResearched": "2025-11-16"
  },

  "math-behind-ai": {
    "primaryKeyword": "math behind AI",
    "variants": [
      "ai math explained simply",
      "math behind artificial intelligence",
      "linear algebra for ai explained",
      "probability behind ai models",
      "optimization in machine learning"
    ],
    "longTails": [
      "simple explanation of the math behind ai",
      "how linear algebra and probability power ai models",
      "explain optimization in ai for regular people",
      "math concepts behind machine learning explained for beginners",
      "easy guide to understanding ai math without equations"
    ],
    "metaTitle": "The Hidden Math Behind AI — A Simple Guide for Regular People",
    "metaDescription": "Learn the simple math behind AI, including linear algebra, probability and optimization. A friendly guide that explains AI foundations and links to helpful calculators.",
    "lastResearched": "2025-11-16"
  },

  "ai-habits-health": {
    "primaryKeyword": "AI health habit tracking",
    "variants": [
      "ai daily habits analysis",
      "ai health pattern detection",
      "how ai tracks habits",
      "ai fitness prediction",
      "ai calorie prediction"
    ],
    "longTails": [
      "how ai detects patterns in your daily habits",
      "how ai predicts your health trends from your behaviour",
      "how ai uses health data to estimate calories and weight changes",
      "ai powered habit analysis for better health",
      "what ai health insights really mean for your everyday life"
    ],
    "metaTitle": "How AI Detects Patterns in Your Daily Habits — And What That Means for Your Health",
    "metaDescription": "See how AI reads your daily habits, predicts health trends, and offers insights on sleep, calories, fitness and stress — with calculators to verify the numbers.",
    "lastResearched": "2025-11-16"
  },

  "ai-everyday-calculations": {
    "primaryKeyword": "AI-powered online calculators",
    "variants": [
      "AI calculators",
      "AI in everyday life",
      "AI in finance and healthcare",
      "how AI is changing everyday calculations",
      "AI calculators for finance and health"
    ],
    "longTails": [
      "how AI-powered online calculators change everyday finance and health decisions",
      "examples of AI calculators for budgeting loans bmi and fitness",
      "benefits and risks of AI in everyday calculations",
      "how to use AI calculators for personal finance and health tracking",
      "AI calculators for everyday money health and energy decisions"
    ],
    "metaTitle": "How AI Is Changing Everyday Calculations in Finance and Health",
    "metaDescription": "Learn how AI-powered online calculators are transforming everyday decisions in finance, health and daily life, from budgeting and loans to fitness, sleep and energy use.",
    "lastResearched": "2025-11-16"
  },
  
"finance-automation-2026": {
  primaryKeyword: "automate personal finances",
  variants: [
    "financial automation 2026",
    "automated budgeting tools",
    "how to automate savings",
    "AI finance tools",
    "personal finance calculators"
  ],
  longTails: [
    "how to automate personal finances in 2025",
    "best budgeting automation apps",
    "financial automation strategies for beginners",
    "automated savings and investment setup",
    "how to use calculators to track financial goals"
  ],
  metaTitle: "The Ultimate Guide to Automating Your Personal Finances in 2025/26",
  metaDescription: "Learn how to automate your income, savings, and investments using smart finance tools and Calcfort calculators to simplify your financial life.",
  lastResearched: "2025-11-08"
},
"ai-engineering-2026": {
  primaryKeyword: "generative AI in engineering",
  variants: [
    "AI design tools 2026",
    "AI in technology innovation",
    "generative AI chip design",
    "AI for mechanical engineering",
    "engineering AI applications"
  ],
  longTails: [
    "how generative AI is changing engineering in 2026",
    "AI powered design and simulation tools",
    "generative AI use cases in semiconductor design",
    "AI assisted product development",
    "AI engineering tools to improve efficiency"
  ],
  metaTitle: "How Generative AI Tools Are Reshaping Engineering and Technology in 2026",
  metaDescription: "Explore how generative AI is transforming design, simulation, and manufacturing in 2026—and see how Calcfort calculators help measure real efficiency gains.",
  lastResearched: "2025-11-08"
},
"quick-home-workouts": {
  primaryKeyword: "home workouts for professionals",
  variants: [
    "quick desk workouts",
    "short workouts for remote workers",
    "15 minute office workouts",
    "home exercise routine for busy people",
    "daily movement for productivity"
  ],
  longTails: [
    "best quick home workouts for busy professionals",
    "workout routine for remote workers",
    "short daily exercise for desk jobs",
    "at home fitness for office professionals",
    "how to stay active working from home"
  ],
  metaTitle: "10 Quick Workouts You Can Do at Home for Busy Professionals",
  metaDescription: "Discover 10 efficient home workouts designed for busy professionals and remote workers. Improve energy, posture, and focus using Calcfort’s health calculators.",
  lastResearched: "2025-11-08"
},
"concept-to-silicon": {
  primaryKeyword: "physical design and implementation",
  variants: [
    "chip design process",
    "silicon implementation flow",
    "ASIC physical design guide",
    "floorplanning and timing closure",
    "digital design to silicon"
  ],
  longTails: [
    "how to go from concept to silicon in chip design",
    "physical design flow for ASIC engineers",
    "step by step guide to chip implementation",
    "understanding timing power and area tradeoffs",
    "tools used in physical design implementation"
  ],
  metaTitle: "From Concept to Silicon – A Practical Guide to Physical Design & Implementation for Engineers",
  metaDescription: "Learn how digital designs move from RTL to silicon through physical design and implementation. Understand timing, power, and area with Calcfort engineering calculators.",
  lastResearched: "2025-11-08"
},
"remote-work-2026": {
  primaryKeyword: "remote work 2026",
  variants: [
    "future of remote work",
    "virtual teams management",
    "hybrid work trends",
    "AI in remote work",
    "distributed teams productivity"
  ],
  longTails: [
    "how remote work is changing in 2026",
    "managing virtual teams effectively",
    "best productivity tools for hybrid teams",
    "financial benefits of remote work",
    "remote work technology trends 2026"
  ],
  metaTitle: "Remote Work & Virtual Teams in 2026 – What’s Changing and How to Stay Ahead",
  metaDescription: "Explore how remote work and virtual teams are evolving in 2026. Learn to manage distributed teams, track productivity, and measure performance using Calcfort calculators.",
  lastResearched: "2025-11-08"
},
  "weight-on-mars": {
    "primaryKeyword": "weight on Mars calculator",
    "variants": [
      "how much would you weigh on Mars",
      "Mars gravity weight conversion",
      "calculate your Martian weight",
      "body weight on Mars planet"
    ],
    "longTails": [
      "how to calculate my weight on Mars step by step",
      "what would a 70 kg person weigh on Mars",
      "Mars surface gravity vs Earth weight comparison",
      "weight loss illusion on Mars due to gravity difference"
    ],
    "metaTitle": "Calculate Your Weight on Mars – Mars Gravity Explained",
    "metaDescription": "Discover how your weight would change on Mars due to its weaker gravity. Use our calculator and get step-by-step explanation with comparisons across planets.",
    "lastResearched": "2025-10-28"
  },
  "time-on-mars": {
    "primaryKeyword": "day on Mars length",
    "variants": [
      "how long is a sol on Mars",
      "Mars day vs Earth day",
      "Martian time conversion guide",
      "Mars sol calendar explanation"
    ],
    "longTails": [
      "how many hours is a sol on Mars compared to Earth",
      "what is a Martian year how many days",
      "living on Mars schedule adjusting to sol length",
      "Mars seasons and calendar explained for colonisation"
    ],
    "metaTitle": "A Day on Mars (Sol) & Martian Time Explained",
    "metaDescription": "Learn how a day and year work on Mars: what a ‘sol’ is, how long Martian seasons last, and how time-keeping would adapt for life on the Red Planet.",
    "lastResearched": "2025-10-28"
  },
  "planetary-years": {
    "primaryKeyword": "planetary years explained",
    "variants": [
      "calculate age on other planets",
      "how many Earth years is a year on Mars",
      "orbital period and age conversion planets",
      "why each planet has different year length"
    ],
    "longTails": [
      "step by step calculate your age on Jupiter Saturn Mars",
      "orbital period of planets and what it means for birthdays",
      "Earth age to Mercury Venus Mars years conversion",
      "how outer planets impact human age concept in space"
    ],
    "metaTitle": "Planetary Years Explained – How Age Changes Across Worlds",
    "metaDescription": "Explore how each planet’s orbit affects the length of a year and your ‘age’. Use our calculators and see how old you’d be across the Solar System.",
    "lastResearched": "2025-10-28"
  },
"tire-size": {
  primaryKeyword: "tire size calculator",
  variants: [
    "tyre size calculator UK",
    "tire diameter calculator",
    "speedometer error calculator",
    "wheel and tire fitment calculator",
    "tire comparison calculator"
  ],
  longTails: [
    "calculate tire diameter and circumference from code",
    "tire size calculator for speedometer accuracy",
    "compare tire sizes for fitment and clearance",
    "tire size calculator with revs per mile",
    "how to calculate tire size change percentage"
  ],
  metaTitle: "Tire Size Calculator – Diameter, Speedometer & Fitment",
  metaDescription: "Calculate tire diameter, circumference, revs per mile, and speedometer error. Compare tire sizes for safe fitment and vehicle performance.",
  lastResearched: "2025-09-28"
},

 "equation-solver": {
    primaryKeyword: "how to solve linear and quadratic equations",
    variants: [
      "linear equations tutorial",
      "quadratic formula guide",
      "factoring vs completing the square",
      "simultaneous equations"
    ],
    longTails: [
      "solve linear equations step by step",
      "use the quadratic formula correctly",
      "when to factor vs complete the square",
      "solve simultaneous equations by substitution"
    ],
    metaTitle: "How to Solve Linear & Quadratic Equations",
    metaDescription: "Learn substitution, factoring, quadratic formula and elimination with step-by-step worked examples.",
    lastResearched: "2025-09-09"
  },

"budget": {
  primaryKeyword: "50/30/20 budget calculator",
  variants: [
    "50-30-20 budgeting rule",
    "monthly budget planner UK",
    "personal budget calculator",
    "budgeting tool for income and expenses",
    "UK 50 30 20 budget"
  ],
  longTails: [
    "how to use the 50 30 20 rule for budgeting",
    "best 50/30/20 budget calculator online",
    "50/30/20 rule for UK personal finance",
    "monthly budgeting with 50 30 20 method",
    "allocate income using 50 30 20 rule"
  ],
  metaTitle: "50/30/20 Budget Calculator & Guide | UK Personal Finance",
  metaDescription: "Use our 50/30/20 budget calculator to split your income into needs, wants & savings. Plan your monthly budget smartly in the UK.",
  lastResearched: "2025-09-28"
},

"capacitor": {
  primaryKeyword: "capacitor calculator",
  variants: [
    "capacitance calculator",
    "reactance of capacitor calculator",
    "series & parallel capacitor calculator",
    "capacitor charge and energy calculator",
    "RC time constant calculator"
  ],
  longTails: [
    "calculate capacitance in series and parallel circuits",
    "how to compute capacitor reactance at frequency",
    "energy stored in capacitor formula and calculation",
    "capacitor charge calculation with voltage and C",
    "use capacitor calculator for RC circuits"
  ],
  metaTitle: "Capacitor Calculator — Capacitance, Reactance & Energy",
  metaDescription: "Compute capacitance, reactance, stored energy, and series/parallel combinations with this capacitor calculator. Useful for electronics engineers.",
  lastResearched: "2025-09-28"
},

"compound-interest": {
  primaryKeyword: "compound interest calculator",
  variants: [
    "investment growth calculator",
    "future value calculator",
    "compound interest with monthly contributions",
    "savings interest calculator",
    "retirement growth calculator"
  ],
  longTails: [
    "how to calculate compound interest with monthly deposits",
    "best compound interest calculator UK",
    "compound interest formula explained example",
    "future value of investment calculator",
    "compound interest vs simple interest calculator"
  ],
  metaTitle: "Compound Interest Calculator | Growth & Savings Tool",
  metaDescription: "Use this compound interest calculator to project growth, returns & future value with or without monthly contributions. Perfect for savings/investment planning.",
  lastResearched: "2025-09-28"
},

"concrete": {
  primaryKeyword: "concrete volume calculator",
  variants: [
    "concrete slab calculator",
    "footing concrete volume",
    "cubic yard concrete calculator",
    "concrete mix calculator",
    "concrete bag calculator"
  ],
  longTails: [
    "how much concrete do I need for a slab",
    "calculate concrete volume for footings",
    "convert cubic feet to cubic yards concrete",
    "concrete calculator for DIY project",
    "number of concrete bags needed by area"
  ],
  metaTitle: "Concrete Volume Calculator — Slab & Footing Estimator",
  metaDescription: "Estimate how much concrete you need for slabs, footings or columns. Convert units and calculate bag quantities to avoid waste.",
  lastResearched: "2025-09-28"
},

"countdown-timer": {
  primaryKeyword: "online countdown timer",
  variants: [
    "event countdown timer",
    "launch countdown clock",
    "countdown with timezone support",
    "deadline countdown online",
    "embedded countdown timer"
  ],
  longTails: [
    "how to create a countdown timer for a website",
    "countdown timer for events with timezone support",
    "best free countdown timer tool online",
    "countdown clock for launch event",
    "embed a countdown timer in web project"
  ],
  metaTitle: "Online Countdown Timer — Events & Launch Clocks",
  metaDescription: "Create a countdown timer for launches, events or deadlines. Supports time zones and website embedding with flexible options.",
  lastResearched: "2025-09-28"
},
"baking": {
  "primaryKeyword": "how to convert baking measurements",
  "variants": [
    "baking conversion formulas",
    "cups to grams conversion steps",
    "recipe scaling manual method",
    "baking pan size adjustment"
  ],
  "longTails": [
    "step by step convert cups to grams for flour",
    "how to scale a cake recipe for different pan",
    "manual calculation for baking conversions",
    "why weight is better than volume in baking"
  ],
  "metaTitle": "How to Convert Baking Measurements: A Complete Guide to Cups, Grams & Scaling",
  "metaDescription": "Learn how to manually convert cups to grams for any ingredient and scale recipes accurately. Step-by-step guide with formulas, examples, and pro tips for consistent baking.",
  "lastResearched": "2025-03-20"
},
  "calorie": {
    primaryKeyword: "how to calculate daily calories",
    variants: [
      "learn TDEE",
      "maintenance calories guide",
      "calorie deficit tutorial",
      "activity multipliers"
    ],
    longTails: [
      "how to calculate daily calories with TDEE",
      "set a safe calorie deficit for weight loss",
      "maintenance calories step by step",
      "adjust calories for activity level"
    ],
    metaTitle: "How to Calculate Daily Calories — TDEE & Deficit",
    metaDescription: "Work out maintenance calories with TDEE and activity multipliers. Learn how to set safe deficits with examples.",
    lastResearched: "2025-09-09"
  },

  "heartrate": {
    primaryKeyword: "how to calculate target heart rate",
    variants: [
      "heart rate zones tutorial",
      "Karvonen method guide",
      "max heart rate formula",
      "training zones explained"
    ],
    longTails: [
      "find heart rate zones step by step",
      "Karvonen heart rate reserve calculation",
      "compare 220-age vs alternatives",
      "zones for fat burn vs cardio fitness"
    ],
    metaTitle: "How to Calculate Target Heart Rate & Zones",
    metaDescription: "Compute max HR and training zones using Karvonen and 220-age methods. Step-by-step with practical examples.",
    lastResearched: "2025-09-09"
  },

  "fitness": {
    primaryKeyword: "how to calculate 1RM pace and VO2 max",
    variants: [
      "one rep max tutorial",
      "running pace guide",
      "VO2 max estimate",
      "calorie burn math"
    ],
    longTails: [
      "calculate 1RM using Epley or Brzycki",
      "work out running pace and splits",
      "estimate VO2 max from race time",
      "calories burned from MET values"
    ],
    metaTitle: "How to Calculate 1RM, Pace & VO₂ Max",
    metaDescription: "Gym and running maths: 1RM by Epley/Brzycki, pace & splits, simple VO₂ max estimates and calorie-burn tips.",
    lastResearched: "2025-09-09"
  },
  "sleep": {
    primaryKeyword: "how to plan sleep with 90 minute cycles",
    variants: [
      "sleep cycle tutorial",
      "best time to wake up",
      "bedtime calculator guide",
      "sleep duration by age"
    ],
    longTails: [
      "plan bedtime using 90 minute cycles",
      "choose wake time by cycle counts",
      "sleep duration recommendations by age",
      "timing tips for better sleep"
    ],
    metaTitle: "How to Plan Bedtimes with 90-Minute Sleep Cycles",
    metaDescription: "Use 90-minute cycles to pick bed and wake times. Learn cycle counts, age-based needs and practical timing tips.",
    lastResearched: "2025-09-09"
  },

  "water": {
    primaryKeyword: "how to calculate daily water intake",
    variants: [
      "hydration needs guide",
      "water per kg tutorial",
      "fluid intake by climate",
      "hydration tips"
    ],
    longTails: [
      "calculate daily water intake by weight",
      "adjust water for activity and heat",
      "hydration tips and common mistakes",
      "how much water per day UK guidance"
    ],
    metaTitle: "How to Calculate Daily Water Intake",
    metaDescription: "Work out daily water needs from weight, climate and activity. Practical hydration tips and pitfalls to avoid.",
    lastResearched: "2025-09-09"
  },

  // ---------- MATHEMATICS / SCIENCE ----------

  "basic": {
    primaryKeyword: "how to use a basic calculator",
    variants: [
      "basic calculator tutorial",
      "simple calculator guide",
      "add subtract multiply divide",
      "calculator keys explained"
    ],
    longTails: [
      "how to use basic calculator step by step",
      "clear and memory keys explained",
      "order of operations on a calculator",
      "common mistakes with simple calculators"
    ],
    metaTitle: "How to Use a Basic Calculator — Step-by-Step Guide",
    metaDescription: "Master add, subtract, multiply and divide on a basic calculator with memory keys, order of operations and examples.",
    lastResearched: "2025-09-09"
  },

  "binary-converter": {
    primaryKeyword: "how to convert binary to decimal",
    variants: [
      "binary conversion tutorial",
      "decimal hex octal guide",
      "base systems explained",
      "bit weighting method"
    ],
    longTails: [
      "convert binary to decimal step by step",
      "binary to hex and octal conversion",
      "two’s complement basics",
      "worked examples of binary maths"
    ],
    metaTitle: "How to Convert Binary — Decimal, Hex & Octal",
    metaDescription: "Learn binary conversion to decimal, hex and octal using bit weights and examples, plus two’s complement basics.",
    lastResearched: "2025-09-09"
  },
"car-lease": {
  "primaryKeyword": "car lease calculator",
  "variants": [
    "lease payment calculator",
    "money factor calculator",
    "residual value calculator",
    "how to use car lease calculator",
    "car lease calculator explained",
    "car lease calculator tutorial"
  ],
  "longTails": [
    "calculate car lease payment with money factor",
    "lease vs buy calculator",
    "convert money factor to APR",
    "car lease calculator step by step guide",
    "car lease calculator with examples",
    "car lease calculator formula explained",
    "best way to use car lease calculator"
  ],
  "metaTitle": "Car Lease Guide",
  "metaDescription": "Learn how car lease calculator works with formulas, examples, and pro tips. Understand inputs, outputs, and common mistakes in one practical guide.",
  "lastResearched": "2025-09-27"
},
"resistor": {
  primaryKeyword: "how to calculate resistor values",
  variants: [
    "resistor color code tutorial",
    "series and parallel resistor calculator",
    "resistor power rating guide",
    "decode resistor bands"
  ],
  longTails: [
    "how to read 4-band and 5-band resistor colors",
    "calculate equivalent resistance in series and parallel",
    "determine resistor wattage for circuit safety",
    "find non-standard resistor values with combinations"
  ],
  metaTitle: "How to Calculate Resistor Values — Color Codes, Series & Parallel",
  metaDescription: "Learn to decode resistor color bands, calculate series/parallel networks, and size resistors for power safety with step-by-step examples.",
  lastResearched: "2025-09-27"
},
"car-loan": {
  "primaryKeyword": "auto loan calculator",
  "variants": [
    "car loan calculator",
    "car payment calculator",
    "auto amortization",
    "how to use auto loan calculator",
    "auto loan calculator explained",
    "auto loan calculator tutorial"
  ],
  "longTails": [
    "calculate car loan payment with amortization",
    "car loan interest and total cost",
    "extra payments on auto loan",
    "auto loan calculator step by step guide",
    "auto loan calculator with examples",
    "auto loan calculator formula explained",
    "best way to use auto loan calculator"
  ],
  "metaTitle": "Auto Loan Guide",
  "metaDescription": "Learn how auto loan calculators work, with the amortisation formula, examples, overpayment tips, and common pitfalls explained in plain English.",
  "lastResearched": "2025-09-27"
},

"cat-age": {
  "primaryKeyword": "cat age calculator",
  "variants": [
    "cat years to human years",
    "kitten age in human years",
    "feline age converter",
    "how to use cat age calculator",
    "cat age calculator explained",
    "cat age calculator tutorial"
  ],
  "longTails": [
    "convert cat years to human years by life stage",
    "how old is my cat in human years",
    "senior cat age chart",
    "cat age calculator step by step guide",
    "cat age calculator with examples",
    "cat age calculator formula explained",
    "best way to use cat age calculator"
  ],
  "metaTitle": "Cat Age Guide",
  "metaDescription": "Understand how cat-to-human age conversions work using life stages. Includes worked examples, care tips, and common misconceptions.",
  "lastResearched": "2025-09-27"
},

"coffee-ratio": {
  "primaryKeyword": "coffee ratio calculator",
  "variants": [
    "coffee to water ratio",
    "pour over ratio",
    "French press ratio",
    "SCA golden cup",
    "how to use coffee ratio calculator",
    "coffee ratio calculator explained"
  ],
  "longTails": [
    "best coffee to water ratio grams per liter",
    "SCA golden cup 55 g per liter",
    "espresso brew ratio calculator",
    "coffee ratio calculator step by step guide",
    "coffee ratio calculator with examples",
    "coffee ratio calculator formula explained",
    "best way to use coffee ratio calculator"
  ],
  "metaTitle": "Coffee Ratio Guide",
  "metaDescription": "Master brew ratios with the SCA Gold Cup context, examples for filter/French press/espresso, plus tips on scaling and consistency.",
  "lastResearched": "2025-09-27"
},
"carbon-footprint": {
  primaryKeyword: "how to calculate carbon footprint",
  variants: [
    "carbon footprint calculation tutorial",
    "CO2 emissions calculation guide",
    "personal carbon footprint steps",
    "greenhouse gas emissions manual method"
  ],
  longTails: [
    "step by step calculate personal carbon footprint",
    "how to measure CO2 emissions from transportation",
    "manual carbon footprint calculation formula",
    "calculate home energy emissions step by step"
  ],
  metaTitle: "How to Calculate Carbon Footprint — Complete CO₂ Emissions Guide",
  metaDescription: "Learn how to manually calculate your carbon footprint from transportation, home energy, diet, and consumption with step-by-step formulas and examples.",
  lastResearched: "2025-09-27"
},
"braille-translator": {
  primaryKeyword: "how to translate braille",
  variants: [
    "braille translation tutorial",
    "learn braille translation steps",
    "UEB braille translation guide",
    "text to braille conversion method"
  ],
  longTails: [
    "step by step translate text to unified english braille",
    "how does a braille translator work",
    "difference between grade 1 and grade 2 braille translation",
    "braille transcription examples for beginners"
  ],
  metaTitle: "How to Translate Braille — UEB Grade 1 & Grade 2 Guide",
  metaDescription: "Learn how to translate text to Braille and back. Step-by-step guide to Unified English Braille (UEB), covering Grade 1 (uncontracted) and Grade 2 (contracted) systems.",
  lastResearched: "2025-09-17"
},
"suanpan-abacus": {
  primaryKeyword: "how to use suanpan abacus",
  variants: [
    "suanpan tutorial",
    "chinese abacus guide",
    "2:5 abacus method",
    "suanpan complements to 5 and 10"
  ],
  longTails: [
    "how to use the suanpan abacus step by step",
    "suanpan addition and subtraction tutorial",
    "suanpan multiplication and division methods",
    "learn chinese abacus complements with examples"
  ],
  metaTitle: "How to Use the Suanpan (Chinese) Abacus — Tutorial",
  metaDescription: "Learn the Chinese suanpan (2:5) abacus step by step. Master bead values, complements to 5/10, and fast methods for the four operations.",
  lastResearched: "2025-09-09"
},

"soroban-abacus": {
  primaryKeyword: "how to use soroban abacus",
  variants: [
    "soroban tutorial",
    "japanese abacus guide",
    "1:4 abacus method",
    "soroban complements technique"
  ],
  longTails: [
    "how to use the soroban abacus for beginners",
    "soroban addition subtraction with complements",
    "soroban multiplication and division steps",
    "learn soroban fingering and bead movement"
  ],
  metaTitle: "How to Use the Soroban (Japanese) Abacus — Guide",
  metaDescription: "Step-by-step soroban (1:4) abacus tutorial. Learn bead positions, complements, and efficient methods for addition, subtraction, multiplication and division.",
  lastResearched: "2025-09-09"
},

"western-abacus": {
  primaryKeyword: "how to use western abacus",
  variants: [
    "school abacus tutorial",
    "place value abacus guide",
    "counting frame method",
    "ten bead abacus"
  ],
  longTails: [
    "how to teach place value with a western abacus",
    "western abacus activities for beginners and kids",
    "addition subtraction with regrouping on abacus",
    "skip counting and carrying with school abacus"
  ],
  metaTitle: "How to Use the Western/School Abacus — Place Value",
  metaDescription: "Teach and learn with a Western place-value abacus. Count, regroup, add and subtract with skip-counting and clear step-by-step activities.",
  lastResearched: "2025-09-09"
},
  "unit-converter": {
    primaryKeyword: "how to convert units",
    variants: [
      "metric to imperial tutorial",
      "unit prefixes explained",
      "temperature conversion guide",
      "length mass volume conversions"
    ],
    longTails: [
      "convert metric to imperial step by step",
      "feet and inches to metres",
      "celsius to fahrenheit and kelvin",
      "common unit conversion mistakes"
    ],
    metaTitle: "How to Convert Units — Metric & Imperial Guide",
    metaDescription: "Master unit conversions for length, mass, temperature and volume with worked examples and prefix tips.",
    lastResearched: "2025-09-09"
  },

  "area": {
    primaryKeyword: "how to calculate area",
    variants: [
      "area formulas tutorial",
      "area of circle rectangle triangle",
      "area vs perimeter",
      "units for area"
    ],
    longTails: [
      "area of common shapes step by step",
      "area formula for triangle and circle",
      "room area and square footage",
      "choose correct units for area"
    ],
    metaTitle: "How to Calculate Area — Formulas & Examples",
    metaDescription: "Area formulas for circles, rectangles, triangles and more with step-by-step examples and unit guidance.",
    lastResearched: "2025-09-09"
  },

  "volume": {
    primaryKeyword: "how to calculate volume",
    variants: [
      "volume formulas tutorial",
      "cylinder sphere prism",
      "tank volume estimation",
      "volume units and conversions"
    ],
    longTails: [
      "calculate volume of 3D shapes",
      "cylinder and sphere volume examples",
      "estimate tank volume with irregular shapes",
      "convert between volume units"
    ],
    metaTitle: "How to Calculate Volume — Shapes & Worked Steps",
    metaDescription: "Compute volume for cylinders, spheres, prisms and tanks. Worked examples, units and conversion tips.",
    lastResearched: "2025-09-09"
  },

  "percentage": {
    primaryKeyword: "how to calculate percentages",
    variants: [
      "percent change tutorial",
      "x percent of y",
      "percent difference vs change",
      "increase and decrease"
    ],
    longTails: [
      "work out percentage change step by step",
      "find x percent of y with examples",
      "calculate percent increase and decrease",
      "percent difference explained simply"
    ],
    metaTitle: "How to Calculate Percentages — % Of & % Change",
    metaDescription: "Learn % of, % change and % difference with clear formulas and worked examples you can reuse anywhere.",
    lastResearched: "2025-09-09"
  },

  "fraction": {
    primaryKeyword: "how to work with fractions",
    variants: [
      "add subtract multiply divide fractions",
      "simplify fractions",
      "mixed numbers explained",
      "fractions to decimals"
    ],
    longTails: [
      "add and subtract fractions step by step",
      "multiply and divide fractions examples",
      "simplify to lowest terms",
      "convert mixed numbers to improper"
    ],
    metaTitle: "How to Use Fractions — Operations & Simplifying",
    metaDescription: "Add, subtract, multiply, divide and simplify fractions. Includes mixed numbers and decimal conversion steps.",
    lastResearched: "2025-09-09"
  },

  "significant-figures": {
    primaryKeyword: "how to round to significant figures",
    variants: [
      "sig figs rules",
      "significant digits in operations",
      "scientific notation and sig figs",
      "counting sig figs"
    ],
    longTails: [
      "find number of significant figures",
      "sig figs in addition and multiplication",
      "rounding to sig figs with examples",
      "scientific notation sig figs rules"
    ],
    metaTitle: "How to Use Significant Figures — Rules & Rounding",
    metaDescription: "Count and round significant figures correctly. Apply rules in addition, subtraction, multiplication and division.",
    lastResearched: "2025-09-09"
  },

  "prime": {
    primaryKeyword: "how to check if a number is prime",
    variants: [
      "prime factorisation tutorial",
      "sieve of Eratosthenes",
      "is it prime methods",
      "factor tree guide"
    ],
    longTails: [
      "test primality by hand",
      "do prime factorisation step by step",
      "generate primes up to n",
      "use the sieve with examples"
    ],
    metaTitle: "How to Test Primes & Factorise — Methods & Tips",
    metaDescription: "Check primality, build factor trees and generate primes. Learn the sieve of Eratosthenes with examples.",
    lastResearched: "2025-09-09"
  },

  "graphing": {
    primaryKeyword: "how to plot functions online",
    variants: [
      "graphing tutorial",
      "parametric and polar graphs",
      "function plotting guide",
      "choose window and scale"
    ],
    longTails: [
      "plot multiple functions online",
      "graph parametric equations",
      "plot polar equations step by step",
      "window/scale tips for clear graphs"
    ],
    metaTitle: "How to Plot Functions — Cartesian, Parametric & Polar",
    metaDescription: "Graph functions online: Cartesian, parametric and polar. Learn window/scale selection with worked examples.",
    lastResearched: "2025-09-09"
  },

  "scientific": {
    primaryKeyword: "how to use a scientific calculator",
    variants: [
      "trig and logs tutorial",
      "exponents and memory",
      "degrees vs radians",
      "scientific notation"
    ],
    longTails: [
      "use sin cos tan on a calculator",
      "calculate logs and exponents",
      "switch between degrees and radians",
      "use memory and history effectively"
    ],
    metaTitle: "How to Use a Scientific Calculator — Trig & Logs",
    metaDescription: "Master trig, logs, exponents, angle modes and memory/history. Clear steps with practical examples.",
    lastResearched: "2025-09-09"
  },
"solar-panel-savings": {
  primaryKeyword: "how to calculate solar panel savings",
  variants: [
    "solar savings estimation tutorial",
    "PV system payback period guide",
    "solar ROI calculation steps",
    "net metering savings explained"
  ],
  longTails: [
    "step by step calculate solar panel savings at home",
    "how to estimate solar payback period manually",
    "calculate solar ROI with electricity rates and incentives",
    "how net metering affects your solar savings",
    "compare solar savings with and without battery storage"
  ],
  metaTitle: "How to Calculate Solar Panel Savings — Payback & ROI Guide",
  metaDescription: "Learn how to manually estimate solar panel savings, payback period, and return on investment using your electricity usage, local rates, and system cost.",
  lastResearched: "2025-09-27"
},

  "matrix": {
    primaryKeyword: "how to do matrix operations",
    variants: [
      "matrix multiplication tutorial",
      "determinant and inverse",
      "row reduction steps",
      "solve Ax=b"
    ],
    longTails: [
      "multiply matrices step by step",
      "find determinant and inverse",
      "Gauss-Jordan elimination workflow",
      "solve Ax=b with examples"
    ],
    metaTitle: "How to Multiply, Invert & Solve with Matrices",
    metaDescription: "Matrix multiplication, determinant, inverse and solving Ax=b explained with clear, worked examples.",
    lastResearched: "2025-09-09"
  },
"age-on-mars": {
  "primaryKeyword": "how to calculate age on Mars",
  "variants": [
    "Martian age conversion tutorial",
    "planetary age calculation steps",
    "Earth years to Mars years formula",
    "orbital period age conversion"
  ],
  "longTails": [
    "step by step calculate my age on Mars",
    "what is the formula for Martian age",
    "how long is a year on Mars vs Earth",
    "calculate age on other planets examples"
  ],
  "metaTitle": "How to Calculate Your Age on Mars & Other Planets",
  "metaDescription": "Learn how to convert your Earth age to Martian years using orbital periods. Step-by-step guide with clear examples for all planets.",
  "lastResearched": "2025-09-17"
},
"age": {
  "primaryKeyword": "how to calculate age",
  "variants": [
    "age calculation formula",
    "calculate exact age from date of birth",
    "manual age calculation steps",
    "date duration calculation method"
  ],
  "longTails": [
    "how to calculate age in years months and days manually",
    "what is the formula for finding age from DOB",
    "how to account for leap years when calculating age",
    "step by step calculate time between two dates"
  ],
  "metaTitle": "How to Calculate Age Accurately: A Complete Manual Guide",
  "metaDescription": "Learn how to calculate age from a date of birth manually. Step-by-step guide with formulas, examples, and how to account for leap years and variable month lengths.",
  "lastResearched": "2025-03-20"
},
"alcohol-dilution": {
  "primaryKeyword": "how to dilute alcohol",
  "variants": [
    "alcohol dilution formula",
    "Pearson's square calculation steps",
    "ABV reduction manual method",
    "spirit fortification calculation"
  ],
  "longTails": [
    "step by step dilute high proof alcohol to 40%",
    "how to use Pearson's square for alcohol",
    "calculate water to add to vodka to lower ABV",
    "formula to fortify wine with spirits"
  ],
  "metaTitle": "How to Dilute Alcohol: A Complete Guide to ABV Calculation",
  "metaDescription": "Learn how to dilute or fortify alcohol manually. Step-by-step guide using Pearson's Square and the mass-balance formula to calculate water or spirit volumes for precise ABV.",
  "lastResearched": "2025-03-20"
},
"aquarium-volume": {
  "primaryKeyword": "how to calculate aquarium volume",
  "variants": [
    "fish tank volume formula",
    "aquarium gallon calculation steps",
    "tank water volume manual method",
    "aquarium weight calculation guide"
  ],
  "longTails": [
    "step by step calculate fish tank gallons",
    "how to measure aquarium dimensions for volume",
    "calculate water weight in aquarium",
    "formula for rectangular aquarium volume"
  ],
  "metaTitle": "How to Calculate Aquarium Volume: A Complete Guide to Gallons, Liters & Weight",
  "metaDescription": "Learn how to calculate your aquarium's water volume manually. Step-by-step guide with formulas for rectangular, cylindrical, and bow front tanks, plus water weight estimation.",
  "lastResearched": "2025-03-20"
},
  "molecular-weight": {
    primaryKeyword: "how to calculate molar mass",
    variants: [
      "molecular weight tutorial",
      "hydrated salts",
      "average atomic weights",
      "isotopes and formula weight"
    ],
    longTails: [
      "calculate molar mass from formula",
      "include water of crystallisation",
      "use periodic table atomic weights",
      "molar mass worked examples"
    ],
    metaTitle: "How to Calculate Molar Mass — Step-by-Step",
    metaDescription: "Compute molar mass from chemical formulae including hydrates and isotopes. Clear steps and examples.",
    lastResearched: "2025-09-09"
  },

  "stoichiometry": {
    primaryKeyword: "how to do stoichiometry",
    variants: [
      "limiting reagent tutorial",
      "mole ratios explained",
      "percent yield guide",
      "balance equations"
    ],
    longTails: [
      "find the limiting reactant step by step",
      "calculate theoretical and percent yield",
      "convert grams to moles via molar mass",
      "balance chemical equations methods"
    ],
    metaTitle: "How to Do Stoichiometry — Limiting Reagent & Yields",
    metaDescription: "Balance equations, use mole ratios, find limiting reagent and compute yields with worked examples.",
    lastResearched: "2025-09-09"
  },

  "ph": {
    primaryKeyword: "how to calculate pH and pOH",
    variants: [
      "pH from concentration",
      "strong vs weak acids",
      "Ka and pKa guide",
      "ICE table steps"
    ],
    longTails: [
      "calculate pH from hydrogen ion concentration",
      "find pOH and convert to pH",
      "estimate pH for weak acids using Ka",
      "set up ICE tables with examples"
    ],
    metaTitle: "How to Calculate pH & pOH — Strong/Weak Acids",
    metaDescription: "Calculate pH and pOH from concentration. Handle weak acids/bases with Ka and ICE tables, plus examples.",
    lastResearched: "2025-09-09"
  },

  "speed": {
    primaryKeyword: "how to calculate speed distance and time",
    variants: [
      "speed formula tutorial",
      "average speed vs instantaneous",
      "mph km/h m/s conversions",
      "travel time maths"
    ],
    longTails: [
      "calculate time from distance and speed",
      "work out average speed for a trip",
      "convert mph to km/h and m/s",
      "common mistakes in speed problems"
    ],
    metaTitle: "How to Calculate Speed, Distance & Time",
    metaDescription: "Use the speed formula to solve for distance or time with unit conversions and practical travel examples.",
    lastResearched: "2025-09-09"
  },

  "time": {
    primaryKeyword: "how to add and subtract time",
    variants: [
      "time difference tutorial",
      "convert to decimal hours",
      "hours minutes seconds maths",
      "timesheet calculations"
    ],
    longTails: [
      "calculate time difference step by step",
      "add hours minutes and seconds",
      "convert time to decimal hours",
      "time maths for payroll and timesheets"
    ],
    metaTitle: "How to Add, Subtract & Convert Time",
    metaDescription: "Add/subtract durations, find differences and convert to decimal hours. Ideal for timesheets and payroll.",
    lastResearched: "2025-09-09"
  },

  "date": {
    primaryKeyword: "how to calculate days between dates",
    variants: [
      "add days to a date",
      "business days calculator",
      "duration between dates",
      "date maths tips"
    ],
    longTails: [
      "calculate days until a future date",
      "add business days to a date",
      "find duration between two dates",
      "common pitfalls in date calculations"
    ],
    metaTitle: "How to Calculate Days Between Dates & Add Days",
    metaDescription: "Work out durations and add/subtract days, including business days. Date maths tips with examples.",
    lastResearched: "2025-09-09"
  },

  "roman-numerals": {
    primaryKeyword: "how to convert roman numerals",
    variants: [
      "roman to decimal tutorial",
      "decimal to roman guide",
      "subtractive notation rules",
      "roman numerals chart"
    ],
    longTails: [
      "convert roman numerals to numbers step by step",
      "write numbers in roman numerals correctly",
      "rules for subtractive notation",
      "worked roman numeral examples"
    ],
    metaTitle: "How to Convert Roman Numerals — Rules & Examples",
    metaDescription: "Convert between Roman numerals and numbers. Learn subtractive notation rules with clear, worked examples.",
    lastResearched: "2025-09-09"
  }
};

// Helper function to get SEO data for a slug
export function getLearnSeo(slug: string): LearnSEO | null {
  return learnSeoBySlug[slug] || null;
}

// Helper function to get all available learn slugs
export function getAvailableLearnSlugs(): string[] {
  return Object.keys(learnSeoBySlug);
}
