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
    "metaTitle": "Wearable Tech & Fitness: HRV, Sleep, Recovery",
    "metaDescription": "Learn how wearable fitness tech and recovery metrics like HRV, sleep score, and resting heart rate can improve performance, fat loss, and recovery.",
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
    "metaTitle": "Strength Training for Everyone: Build Muscle for Health",
    "metaDescription": "Discover why building muscle is critical for metabolism, joint health, mobility, ageing, and disease prevention.",
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
    "metaTitle": "Holistic Recovery & Mobility: Low-Impact Training Guide",
    "metaDescription": "Learn how mobility work, low-impact cardio, breathwork, and recovery tracking can prevent injury and improve long-term health.",
    "lastResearched": "2025-11-01"
  },

  "cost-of-living-2026": {
    "primaryKeyword": "cost of living calculator 2026 UK",
    "variants": [
      "UK cost of living forecast 2026",
      "personal inflation rate UK",
      "real purchasing power calculator",
      "2026 inflation impact on households"
    ],
    "longTails": [
      "how to calculate personal inflation rate in the UK",
      "2026 cost of living projection UK",
      "measure your real purchasing power UK",
      "how rising prices affect disposable income 2026",
      "UK household budget calculator for inflation"
    ],
    "metaTitle": "Cost of Living 2026: Measure Your Purchasing Power",
    "metaDescription": "Learn how to calculate your personal cost of living for 2026 using real inflation and spending weights.",
    "lastResearched": "2025-12-07"
  },

  "space-discoveries-2026": {
    "primaryKeyword": "space discoveries 2026",
    "variants": [
      "solar flare impact 2026",
      "2026 astronomy breakthroughs",
      "exoplanet data 2026",
      "space weather and gps accuracy"
    ],
    "longTails": [
      "how solar storms affect gps accuracy",
      "latest 2026 space discoveries explained",
      "how to calculate solar flare tech impact",
      "space weather forecast tools for beginners",
      "understanding orbital dynamics for 2026 astronomy"
    ],
    "metaTitle": "Space Discoveries 2026 — Everyday Impact",
    "metaDescription": "Explore 2026’s biggest space discoveries and how they influence GPS, energy grids, and modern technology.",
    "lastResearched": "2025-12-07"
  },

  "ai-finance-2026": {
    "primaryKeyword": "AI finance tools 2026",
    "variants": [
      "AI budgeting apps 2026",
      "AI investment tools UK",
      "personal finance automation AI",
      "AI debt reduction tools"
    ],
    "longTails": [
      "how AI will change personal finance in 2026",
      "AI powered budgeting tools for UK households",
      "AI investment forecasting tools 2026",
      "automated debt repayment strategies UK",
      "how to calculate financial health with AI"
    ],
    "metaTitle": "AI & Finance 2026: Automation, Investing",
    "metaDescription": "Learn how AI will transform personal finance in 2026 through automation, investing, and forecasting.",
    "lastResearched": "2025-12-07"
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
    "metaTitle": "AI Tools to Use in 2026 — What Matters",
    "metaDescription": "Discover essential AI tools for productivity, finance and health in 2026 and how they fit into daily routines.",
    "lastResearched": "2025-11-16"
  },

"degree-cost-projection-2026": {
  "primaryKeyword": "college cost calculator",
  "variants": [
    "college tuition increase calculator",
    "tuition inflation calculator",
    "cost of attendance calculator",
    "university tuition fees 2026",
    "project college costs 2026"
  ],
  "longTails": [
    "how to calculate total cost of college including tuition and living expenses",
    "how to project tuition increases year by year for a 2026 intake",
    "university tuition fees england 2026 2027 inflation increase explained",
    "how much will a degree cost if tuition rises every year",
    "college board trends college pricing 2025 2026 tuition and fees increase"
  ],
  "metaTitle": "2026 Degree Cost Projection: Tuition, Fees & Living Costs",
  "metaDescription": "Estimate the real cost of a degree for a 2026 intake by projecting tuition increases, fees, and living costs, plus payback and ROI scenarios.",
  "lastResearched": "2026-02-15"
},
"ai-productivity-roi-calculation": {
  "primaryKeyword": "AI ROI calculator",
  "variants": [
    "AI productivity ROI",
    "AI automation ROI calculator",
    "calculate ROI of AI tools",
    "AI time savings calculator",
    "AI payback period calculator"
  ],
  "longTails": [
    "how to calculate ai roi from time saved and subscription costs",
    "ai productivity roi calculator for professionals and teams",
    "how to measure roi of generative ai tools at work",
    "break even time for ai tools using time savings and hourly cost",
    "ai coding tools roi calculator for engineering teams"
  ],
  "metaTitle": "AI ROI Calculator — Convert Time Saved Into Money, ROI & Break-Even",
  "metaDescription": "Calculate the ROI of AI tools using time saved, hourly cost, rework, and subscription spend—then estimate break-even months for individuals or teams.",
  "lastResearched": "2026-02-15"
},
"ipv4-subnetting-guide-subnet-calculator": {
  "primaryKeyword": "subnet calculator",
  "variants": [
    "CIDR calculator",
    "IP subnet calculator",
    "subnet mask calculator",
    "VLSM calculator",
    "calculate network and broadcast address"
  ],
  "longTails": [
    "how to calculate subnet mask network address and broadcast address",
    "ipv4 subnetting explained with examples /24 /26 /27 /30",
    "how to find usable host range from cidr prefix",
    "subnet calculator for aws vpc cidr ranges",
    "how to avoid overlapping subnets in vpn and site to site networks"
  ],
  "metaTitle": "Subnet Calculator Guide — IPv4 CIDR, Masks, Network & Broadcast",
  "metaDescription": "Learn IPv4 subnetting fast: calculate CIDR ranges, subnet masks, network/broadcast addresses, and usable hosts with worked examples and a subnet calculator.",
  "lastResearched": "2026-02-15"
},
"solar-panel-savings-payback-roi-2026": {
  "primaryKeyword": "solar panel savings calculator",
  "variants": [
    "solar panel payback calculator",
    "solar ROI calculator UK",
    "solar panel payback time UK",
    "smart export guarantee rates",
    "solar panel cost and savings calculator"
  ],
  "longTails": [
    "solar panel savings calculator uk estimate payback time and roi",
    "how to calculate solar panel payback with self consumption and export",
    "smart export guarantee seg how export payments affect solar savings",
    "solar panel roi over 25 years with degradation and inverter replacement",
    "solar and battery payback calculator increase self consumption"
  ],
  "metaTitle": "Solar Panel Savings Calculator: Payback Time & ROI (UK 2026)",
  "metaDescription": "Estimate UK solar PV savings in 2026 with self-consumption and SEG export payments. Calculate payback time and ROI with realistic assumptions and scenarios.",
  "lastResearched": "2026-02-15"
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
    "metaTitle": "Hidden Math Behind AI: Plain-English Guide",
    "metaDescription": "Learn the simple math behind AI, including linear algebra, probability and optimisation, without heavy equations.",
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
    "metaTitle": "How AI Tracks Your Daily Habits and Health Patterns",
    "metaDescription": "See how AI analyses daily habits to predict health trends in sleep, calories, fitness and stress.",
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
    "metaTitle": "How AI Changes Everyday Finance & Health Calculations",
    "metaDescription": "Learn how AI-powered calculators are transforming everyday decisions across finance, health and energy.",
    "lastResearched": "2025-11-16"
  },

  "finance-automation-2026": {
    "primaryKeyword": "automate personal finances",
    "variants": [
      "financial automation 2026",
      "automated budgeting tools",
      "how to automate savings",
      "AI finance tools",
      "personal finance calculators"
    ],
    "longTails": [
      "how to automate personal finances in 2025",
      "best budgeting automation apps",
      "financial automation strategies for beginners",
      "automated savings and investment setup",
      "how to use calculators to track financial goals"
    ],
    "metaTitle": "Automate Your Personal Finances for 2025/26",
    "metaDescription": "Learn how to automate income, savings and investments using modern finance tools and calculators.",
    "lastResearched": "2025-11-08"
  },

  "ai-engineering-2026": {
    "primaryKeyword": "generative AI in engineering",
    "variants": [
      "AI design tools 2026",
      "AI in technology innovation",
      "generative AI chip design",
      "AI for mechanical engineering",
      "engineering AI applications"
    ],
    "longTails": [
      "how generative AI is changing engineering in 2026",
      "AI powered design and simulation tools",
      "generative AI use cases in semiconductor design",
      "AI assisted product development",
      "AI engineering tools to improve efficiency"
    ],
    "metaTitle": "Generative AI in Engineering: What Changes in 2026",
    "metaDescription": "Explore how generative AI is transforming engineering design, simulation and manufacturing in 2026.",
    "lastResearched": "2025-11-08"
  },

  "quick-home-workouts": {
    "primaryKeyword": "home workouts for professionals",
    "variants": [
      "quick desk workouts",
      "short workouts for remote workers",
      "15 minute office workouts",
      "home exercise routine for busy people",
      "daily movement for productivity"
    ],
    "longTails": [
      "best quick home workouts for busy professionals",
      "workout routine for remote workers",
      "short daily exercise for desk jobs",
      "at home fitness for office professionals",
      "how to stay active working from home"
    ],
    "metaTitle": "10 Quick Home Workouts for Busy Professionals",
    "metaDescription": "Efficient home workouts for busy professionals and remote workers to improve energy, posture and focus.",
    "lastResearched": "2025-11-08"
  },

  "concept-to-silicon": {
    "primaryKeyword": "physical design and implementation",
    "variants": [
      "chip design process",
      "silicon implementation flow",
      "ASIC physical design guide",
      "floorplanning and timing closure",
      "digital design to silicon"
    ],
    "longTails": [
      "how to go from concept to silicon in chip design",
      "physical design flow for ASIC engineers",
      "step by step guide to chip implementation",
      "understanding timing power and area tradeoffs",
      "tools used in physical design implementation"
    ],
    "metaTitle": "From Concept to Silicon: Practical Physical Design Guide",
    "metaDescription": "Learn how digital designs move from RTL to silicon through physical design, timing, power and area trade-offs.",
    "lastResearched": "2025-11-08"
  },

  "remote-work-2026": {
    "primaryKeyword": "remote work 2026",
    "variants": [
      "future of remote work",
      "virtual teams management",
      "hybrid work trends",
      "AI in remote work",
      "distributed teams productivity"
    ],
    "longTails": [
      "how remote work is changing in 2026",
      "managing virtual teams effectively",
      "best productivity tools for hybrid teams",
      "financial benefits of remote work",
      "remote work technology trends 2026"
    ],
    "metaTitle": "Remote Work & Virtual Teams in 2026: How to Stay Ahead",
    "metaDescription": "Explore how remote work and virtual teams are evolving in 2026 and how to stay productive and competitive.",
    "lastResearched": "2025-11-08"
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
    "metaDescription": "Discover how your weight would change on Mars due to weaker gravity and compare it with Earth.",
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
    "metaDescription": "Learn how Martian days (sols) and years work, how they differ from Earth time, and how timekeeping would adapt for future Mars colonization and exploration.",
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
    "metaDescription": "Explore how planetary orbits change the length of a year and what that means for age across the Solar System.",
    "lastResearched": "2025-10-28"
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
