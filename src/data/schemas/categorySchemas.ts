// Category JSON-LD schemas for enhanced SEO
export const categorySchemas = {
  mathematics: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Mathematics & Basic Tools Calculators",
      "url": "https://calcfort.com/calculator/mathematics",
      "description": "Essential mathematical calculators for students, professionals, and everyday use. Including basic, scientific, graphing calculators and more.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Basic arithmetic calculator",
        "Scientific calculator with trigonometry",
        "Graphing calculator for functions",
        "Fraction and percentage calculators",
        "Matrix operations and equation solver"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Mathematics & Basic Tools Calculators",
      "description": "Essential mathematical calculators for students, professionals, and everyday use.",
      "url": "https://calcfort.com/calculator/mathematics",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 12,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Basic Calculator", "url": "https://calcfort.com/calculator/basic" },
          { "@type": "SoftwareApplication", "name": "Scientific Calculator", "url": "https://calcfort.com/calculator/scientific" },
          { "@type": "SoftwareApplication", "name": "Percentage Calculator", "url": "https://calcfort.com/calculator/percentage" }
        ]
      }
    }
  },
  
  health: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Health & Fitness Calculators",
      "url": "https://calcfort.com/calculator/health",
      "description": "Health monitoring and fitness calculation tools for optimal wellness. BMI, calorie, protein calculators and more.",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "BMI and body composition analysis",
        "Calorie and metabolic rate calculations",
        "Protein and nutrition planning",
        "Heart rate and fitness tracking",
        "Sleep optimization tools"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Health & Fitness Calculators",
      "description": "Health monitoring and fitness calculation tools for optimal wellness.",
      "url": "https://calcfort.com/calculator/health",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 9,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "BMI Calculator", "url": "https://calcfort.com/calculator/bmi" },
          { "@type": "SoftwareApplication", "name": "Calorie Calculator", "url": "https://calcfort.com/calculator/calorie" },
          { "@type": "SoftwareApplication", "name": "Protein Calculator", "url": "https://calcfort.com/calculator/protein" }
        ]
      }
    }
  },

  financial: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Financial & Business Calculators",
      "url": "https://calcfort.com/calculator/financial",
      "description": "Financial planning and business calculation tools for smart money management. Loan, mortgage, investment calculators.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Loan and mortgage calculators",
        "Investment and retirement planning",
        "ROI and business analysis",
        "Currency conversion",
        "Tax and budget planning"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Financial & Business Calculators",
      "description": "Financial planning and business calculation tools for smart money management.",
      "url": "https://calcfort.com/calculator/financial",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 14,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Loan Calculator", "url": "https://calcfort.com/calculator/loan" },
          { "@type": "SoftwareApplication", "name": "Mortgage Calculator", "url": "https://calcfort.com/calculator/mortgage" },
          { "@type": "SoftwareApplication", "name": "Retirement Calculator", "url": "https://calcfort.com/calculator/retirement" }
        ]
      }
    }
  },

  engineering: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Engineering & Technology Calculators",
      "url": "https://calcfort.com/calculator/engineering",
      "description": "Technical calculators for engineers, developers, and tech professionals. Electrical, network, and conversion tools.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Electrical circuit analysis",
        "Network and IP calculations",
        "Binary and hex conversions",
        "Password generation",
        "Unit conversions"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Engineering & Technology Calculators",
      "description": "Technical calculators for engineers, developers, and tech professionals.",
      "url": "https://calcfort.com/calculator/engineering",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 8,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Electrical Calculator", "url": "https://calcfort.com/calculator/electrical" },
          { "@type": "SoftwareApplication", "name": "Resistor Calculator", "url": "https://calcfort.com/calculator/resistor" },
          { "@type": "SoftwareApplication", "name": "Binary Converter", "url": "https://calcfort.com/calculator/binary-converter" }
        ]
      }
    }
  },

  automotive: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Automotive Calculators",
      "url": "https://calcfort.com/calculator/automotive",
      "description": "Vehicle-related calculators for car owners and automotive enthusiasts. Fuel, MPG, and vehicle cost calculators.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Fuel cost and efficiency calculations",
        "Vehicle loan and lease calculations",
        "EV range and charging planning",
        "Tire size comparisons",
        "Depreciation analysis"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Automotive Calculators",
      "description": "Vehicle-related calculators for car owners and automotive enthusiasts.",
      "url": "https://calcfort.com/calculator/automotive",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 7,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Fuel Cost Calculator", "url": "https://calcfort.com/calculator/fuel-cost" },
          { "@type": "SoftwareApplication", "name": "MPG Calculator", "url": "https://calcfort.com/calculator/mpg" },
          { "@type": "SoftwareApplication", "name": "EV Range Calculator", "url": "https://calcfort.com/calculator/ev-range" }
        ]
      }
    }
  },

  cooking: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Cooking & Food Calculators",
      "url": "https://calcfort.com/calculator/cooking",
      "description": "Culinary calculators for chefs, bakers, and food enthusiasts. Recipe scaling, baking, and beverage calculators.",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Recipe scaling and conversions",
        "Baking measurements and ratios",
        "Coffee brewing calculations",
        "Alcohol dilution formulas",
        "Ingredient substitutions"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Cooking & Food Calculators",
      "description": "Culinary calculators for chefs, bakers, and food enthusiasts.",
      "url": "https://calcfort.com/calculator/cooking",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 4,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Recipe Converter", "url": "https://calcfort.com/calculator/recipe-converter" },
          { "@type": "SoftwareApplication", "name": "Baking Calculator", "url": "https://calcfort.com/calculator/baking" },
          { "@type": "SoftwareApplication", "name": "Coffee Ratio Calculator", "url": "https://calcfort.com/calculator/coffee-ratio" }
        ]
      }
    }
  },

  education: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Education & Science Calculators",
      "url": "https://calcfort.com/calculator/education",
      "description": "Educational and scientific calculators for students and researchers. GPA, chemistry, and academic tools.",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "GPA and academic tracking",
        "Chemistry calculations",
        "Molecular weight analysis",
        "pH and stoichiometry",
        "Significant figures"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Education & Science Calculators",
      "description": "Educational and scientific calculators for students and researchers.",
      "url": "https://calcfort.com/calculator/education",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 5,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "GPA Calculator", "url": "https://calcfort.com/calculator/gpa" },
          { "@type": "SoftwareApplication", "name": "Molecular Weight Calculator", "url": "https://calcfort.com/calculator/molecular-weight" },
          { "@type": "SoftwareApplication", "name": "pH Calculator", "url": "https://calcfort.com/calculator/ph" }
        ]
      }
    }
  },

  everyday: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Everyday Life Calculators",
      "url": "https://calcfort.com/calculator/everyday",
      "description": "Daily life calculators for common tasks and planning. Age, date, and time calculations.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Age and milestone calculations",
        "Date arithmetic and planning",
        "Tip and bill calculations",
        "Time management tools",
        "Countdown timers"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Everyday Life Calculators",
      "description": "Daily life calculators for common tasks and planning.",
      "url": "https://calcfort.com/calculator/everyday",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 6,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Age Calculator", "url": "https://calcfort.com/calculator/age" },
          { "@type": "SoftwareApplication", "name": "Date Calculator", "url": "https://calcfort.com/calculator/date" },
          { "@type": "SoftwareApplication", "name": "Tip Calculator", "url": "https://calcfort.com/calculator/tip" }
        ]
      }
    }
  },

  construction: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Construction & DIY Calculators",
      "url": "https://calcfort.com/calculator/construction",
      "description": "Construction and home improvement calculators for builders and DIY enthusiasts. Material and project planning tools.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Area and volume calculations",
        "Material quantity estimation",
        "Paint and tile coverage",
        "Concrete calculations",
        "Stair and roofing design"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Construction & DIY Calculators",
      "description": "Construction and home improvement calculators for builders and DIY enthusiasts.",
      "url": "https://calcfort.com/calculator/construction",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 8,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Patio Calculator", "url": "https://calcfort.com/calculator/patio" },
          { "@type": "SoftwareApplication", "name": "Area Calculator", "url": "https://calcfort.com/calculator/area" },
          { "@type": "SoftwareApplication", "name": "Paint Calculator", "url": "https://calcfort.com/calculator/paint" }
        ]
      }
    }
  },

  conversions: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Specialized Conversion Calculators",
      "url": "https://calcfort.com/calculator/conversions",
      "description": "Unique conversion tools for specialized needs and interests. Roman numerals, Morse code, and Braille converters.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Roman numeral conversions",
        "Morse code encoding/decoding",
        "Braille translation",
        "Historical number systems",
        "Communication tools"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Specialized Conversion Calculators",
      "description": "Unique conversion tools for specialized needs and interests.",
      "url": "https://calcfort.com/calculator/conversions",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 3,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Roman Numerals Converter", "url": "https://calcfort.com/calculator/roman-numerals" },
          { "@type": "SoftwareApplication", "name": "Morse Code Converter", "url": "https://calcfort.com/calculator/morse-code" },
          { "@type": "SoftwareApplication", "name": "Braille Translator", "url": "https://calcfort.com/calculator/braille-translator" }
        ]
      }
    }
  },

  energy: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Energy & Environment Calculators",
      "url": "https://calcfort.com/calculator/energy",
      "description": "Energy efficiency and environmental impact calculators. Solar panel savings and energy analysis tools.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Solar panel analysis",
        "Energy consumption tracking",
        "Carbon footprint assessment",
        "Home energy audits",
        "Renewable energy planning"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Energy & Environment Calculators",
      "description": "Energy efficiency and environmental impact calculators.",
      "url": "https://calcfort.com/calculator/energy",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 4,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Solar Panel Savings Calculator", "url": "https://calcfort.com/calculator/solar-panel-savings" }
        ]
      }
    }
  },

  "animal-age": {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Animal Age Calculators",
      "url": "https://calcfort.com/calculator/animal-age",
      "description": "Convert your pet's age to human equivalent years. Dog and cat age calculators with veterinary accuracy.",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Dog age conversion by size",
        "Cat age conversion by lifestyle",
        "Veterinary-approved formulas",
        "Life stage identification",
        "Pet care recommendations"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Animal Age Calculators",
      "description": "Convert your pet's age to human equivalent years.",
      "url": "https://calcfort.com/calculator/animal-age",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 2,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Dog Age Calculator", "url": "https://calcfort.com/calculator/dog-age" },
          { "@type": "SoftwareApplication", "name": "Cat Age Calculator", "url": "https://calcfort.com/calculator/cat-age" }
        ]
      }
    }
  },

  unique: {
    webApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Unique & Niche Calculators",
      "url": "https://calcfort.com/calculator/unique",
      "description": "Fun and unique calculators for entertainment and curiosity. Love calculator, space weight, and novelty tools.",
      "applicationCategory": "EntertainmentApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calculator Fort"
      },
      "featureList": [
        "Love compatibility calculator",
        "Space and planetary calculations",
        "Novelty and entertainment tools",
        "Mathematical curiosities",
        "Fun fact generators"
      ]
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Unique & Niche Calculators",
      "description": "Fun and unique calculators for entertainment and curiosity.",
      "url": "https://calcfort.com/calculator/unique",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": 3,
        "itemListElement": [
          { "@type": "SoftwareApplication", "name": "Love Calculator", "url": "https://calcfort.com/calculator/love-calculator" },
          { "@type": "SoftwareApplication", "name": "Space Weight Calculator", "url": "https://calcfort.com/calculator/space-weight" }
        ]
      }
    }
  }
};