import type { ComponentType } from 'react';
import { seoBySlug } from '@/data/seoBySlug';
import type { CalcSEO } from '@/data/seoBySlug';
// All Calculator Component Imports
import BasicCalculator from '@/components/calc/BasicCalculator';
import BinaryConverterCalculator from '@/components/calc/BinaryConverterCalculator';
import SorobanAbacusCalculator from '@/components/calc/SorobanAbacusCalculator';
import SuanpanAbacusCalculator from '@/components/calc/SuanpanAbacusCalculator';
import WesternAbacusCalculator from '@/components/calc/WesternAbacusCalculator';
import AgeOnMarsCalculator from '@/components/calc/AgeOnMarsCalculator';
import AgeCalculator from '@/components/calc/AgeCalculator';
import AlcoholDilutionCalculator from '@/components/calc/AlcoholDilutionCalculator';
import AquariumVolumeCalculator from '@/components/calc/AquariumVolumeCalculator';
import AreaCalculator from '@/components/calc/AreaCalculator';
import BakingCalculator from '@/components/calc/BakingCalculator';
import BMICalculator from '@/components/calc/BMICalculator';
import BMRCalculator from '@/components/calc/BMRCalculator';
import BodyFatCalculator from '@/components/calc/BodyFatCalculator';
import BrailleTranslatorCalculator from '@/components/calc/BrailleTranslatorCalculator';
import BudgetCalculator from '@/components/calc/BudgetCalculator';
import CalorieCalculator from '@/components/calc/CalorieCalculator';
import CapacitorCalculator from '@/components/calc/CapacitorCalculator';
import CarLeaseCalculator from '@/components/calc/CarLeaseCalculator';
import CarLoanCalculator from '@/components/calc/CarLoanCalculator';
import CatAgeCalculator from '@/components/calc/CatAgeCalculator';
import CoffeeRatioCalculator from '@/components/calc/CoffeeRatioCalculator';
import CompoundInterestCalculator from '@/components/calc/CompoundInterestCalculator';
import ConcreteCalculator from '@/components/calc/ConcreteCalculator';
import CreditCardPayoffCalculator from '@/components/calc/CreditCardPayoffCalculator';
import CurrencyConverterCalculator from '@/components/calc/CurrencyConverterCalculator';
import DateCalculator from '@/components/calc/DateCalculator';
import DepreciationCalculator from '@/components/calc/DepreciationCalculator';
import DiscountCalculator from '@/components/calc/DiscountCalculator';
import DogAgeCalculator from '@/components/calc/DogAgeCalculator';
import ElectricalCalculator from '@/components/calc/ElectricalCalculator';
import EquationSolverCalculator from '@/components/calc/EquationSolverCalculator';
import EVRangeCalculator from '@/components/calc/EVRangeCalculator';
import FitnessCalculator from '@/components/calc/FitnessCalculator';
import FractionCalculator from '@/components/calc/FractionCalculator';
import FuelCostCalculator from '@/components/calc/FuelCostCalculator';
import GolfBallsBoeingCalculator from '@/components/calc/GolfBallsBoeingCalculator';
import GPACalculator from '@/components/calc/GPACalculator';
import GraphingCalculator from '@/components/calc/GraphingCalculator';
import HeartRateCalculator from '@/components/calc/HeartRateCalculator';
import InterestCalculator from '@/components/calc/InterestCalculator';
import InvestmentCalculator from '@/components/calc/InvestmentCalculator';
import LoanCalculator from '@/components/calc/LoanCalculator';
import LoveCalculator from '@/components/calc/LoveCalculator';
import MatrixCalculator from '@/components/calc/MatrixCalculator';
import MolecularWeightCalculator from '@/components/calc/MolecularWeightCalculator';
import MorseCodeCalculator from '@/components/calc/MorseCodeCalculator';
import MortgageCalculator from '@/components/calc/MortgageCalculator';
import MPGCalculator from '@/components/calc/MPGCalculator';
import NPVIRRCalculator from '@/components/calc/NPVIRRCalculator';
import OhmsLawCalculator from '@/components/calc/OhmsLawCalculator';
import PaintCalculator from '@/components/calc/PaintCalculator';
import PasswordGeneratorCalculator from '@/components/calc/PasswordGeneratorCalculator';
import PatioCalculator from '@/components/calc/PatioCalculator';
import PercentageCalculator from '@/components/calc/PercentageCalculator';
import PHCalculator from '@/components/calc/PHCalculator';
import PrimeCalculator from '@/components/calc/PrimeCalculator';
import ProteinCalculator from '@/components/calc/ProteinCalculator';
import RatioCalculator from '@/components/calc/RatioCalculator';
import RecipeConverterCalculator from '@/components/calc/RecipeConverterCalculator';
import RefinanceCalculator from '@/components/calc/RefinanceCalculator';
import ResistorCalculator from '@/components/calc/ResistorCalculator';
import RetirementCalculator from '@/components/calc/RetirementCalculator';
import ROICalculator from '@/components/calc/ROICalculator';
import RomanNumeralsCalculator from '@/components/calc/RomanNumeralsCalculator';
import RoofingCalculator from '@/components/calc/RoofingCalculator';
import SalaryCalculator from '@/components/calc/SalaryCalculator';
import ScientificCalculator from '@/components/calc/ScientificCalculator';
import SeedSpacingCalculator from '@/components/calc/SeedSpacingCalculator';
import SignificantFiguresCalculator from '@/components/calc/SignificantFiguresCalculator';
import SleepCalculator from '@/components/calc/SleepCalculator';
import SolarPanelSavingsCalculator from '@/components/calc/SolarPanelSavingsCalculator';
import SpaceWeightCalculator from '@/components/calc/SpaceWeightCalculator';
import SpeedCalculator from '@/components/calc/SpeedCalculator';
import StairsCalculator from '@/components/calc/StairsCalculator';
import StoichiometryCalculator from '@/components/calc/StoichiometryCalculator';
import SubnetCalculator from '@/components/calc/SubnetCalculator';
import TaxCalculator from '@/components/calc/TaxCalculator';
import TileCalculator from '@/components/calc/TileCalculator';
import TipCalculator from '@/components/calc/TipCalculator';
import TireSizeCalculator from '@/components/calc/TireSizeCalculator';
import UnitConverterCalculator from '@/components/calc/UnitConverterCalculator';
import VolumeCalculator from '@/components/calc/VolumeCalculator';
import WaterCalculator from '@/components/calc/WaterCalculator';
import EnergyUsageCalculator from '@/components/calc/EnergyUsageCalculator';
import CarbonFootprintCalculator from '@/components/calc/CarbonFootprintCalculator';
import HomeEnergyAuditCalculator from '@/components/calc/HomeEnergyAuditCalculator';
import TimeCalculator from '@/components/calc/TimeCalculator';
import TimeZoneConverterCalculator from '@/components/calc/TimeZoneConverterCalculator';
import CountdownTimerCalculator from '@/components/calc/CountdownTimerCalculator';

export type CalcEntry = {
  slug: string;
  title: string;
  description?: string;
  category: string;
  component: ComponentType;
  mdx?: string;
  seo?: CalcSEO;
};

const calculatorsBase: CalcEntry[] = [
  {
    slug: 'basic',
    title: 'Basic Calculator',
    description: 'Perform standard arithmetic operations with a simple interface',
    category: 'Mathematics & Basic Tools',
    component: BasicCalculator,
    mdx: 'basic.mdx'
  },
  {
    slug: 'binary-converter',
    title: 'Binary & Hex Converter',
    description: 'Convert between binary, decimal, hexadecimal, and octal number systems',
    category: 'Engineering & Technology',
    component: BinaryConverterCalculator,
    mdx: 'binary-converter.mdx'
  },
  {
    slug: 'soroban-abacus',
    title: 'Soroban Abacus Calculator',
    description: 'Master the Japanese soroban abacus with 1:4 bead configuration',
    category: 'Mathematics & Basic Tools',
    component: SorobanAbacusCalculator,
    mdx: 'soroban-abacus.mdx'
  },
  {
    slug: 'suanpan-abacus',
    title: 'Suanpan Abacus Calculator',
    description: 'Learn the Chinese suanpan abacus with 2:5 bead configuration',
    category: 'Mathematics & Basic Tools',
    component: SuanpanAbacusCalculator,
    mdx: 'suanpan-abacus.mdx'
  },
  {
    slug: 'western-abacus',
    title: 'Western Abacus Calculator',
    description: 'Practice with the Western classroom abacus with counting beads',
    category: 'Mathematics & Basic Tools',
    component: WesternAbacusCalculator,
    mdx: 'western-abacus.mdx'
  },
  {
    slug: 'age-on-mars',
    title: 'Age on Mars Calculator',
    description: 'Calculate your age on Mars and other planets in our solar system',
    category: 'Space & Astronomy',
    component: AgeOnMarsCalculator,
    mdx: 'age-on-mars.mdx'
  },
  {
    slug: 'age',
    title: 'Age Calculator',
    description: 'Calculate your exact age and discover interesting facts about your life',
    category: 'Mathematics & Basic Tools',
    component: AgeCalculator,
    mdx: 'age.mdx'
  },
  {
    slug: 'alcohol-dilution',
    title: 'Alcohol Dilution Calculator',
    description: 'Calculate alcohol dilution, fortification, and blending',
    category: 'Cooking & Food',
    component: AlcoholDilutionCalculator,
    mdx: 'alcohol-dilution.mdx'
  },
  {
    slug: 'aquarium-volume',
    title: 'Aquarium Volume Calculator',
    description: 'Calculate aquarium volume, water weight, and equipment recommendations',
    category: 'Unique & Niche',
    component: AquariumVolumeCalculator,
    mdx: 'aquarium-volume.mdx'
  },
  {
    slug: 'area',
    title: 'Area Calculator',
    description: 'Calculate area and perimeter for various shapes',
    category: 'Construction & DIY',
    component: AreaCalculator,
    mdx: 'area.mdx'
  },
  {
    slug: 'baking',
    title: 'Baking Converter',
    description: 'Convert baking measurements and scale recipes perfectly',
    category: 'Cooking & Food',
    component: BakingCalculator,
    mdx: 'baking.mdx'
  },
  {
    slug: 'bmi',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and health category',
    category: 'Health & Fitness',
    component: BMICalculator,
    mdx: 'bmi.mdx'
  },
  {
    slug: 'bmr',
    title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate and daily calorie needs',
    category: 'Health & Fitness',
    component: BMRCalculator,
    mdx: 'bmr.mdx'
  },
  {
    slug: 'bodyfat',
    title: 'Body Fat Calculator',
    description: 'Calculate body fat percentage using multiple methods',
    category: 'Health & Fitness',
    component: BodyFatCalculator,
    mdx: 'bodyfat.mdx'
  },
  {
    slug: 'braille-translator',
    title: 'Braille Translator',
    description: 'Convert text to and from Braille notation',
    category: 'Specialized Conversions',
    component: BrailleTranslatorCalculator,
    mdx: 'braille-translator.mdx'
  },
  {
    slug: 'budget',
    title: 'Budget Calculator',
    description: 'Create and manage your personal or business budget',
    category: 'Financial & Business',
    component: BudgetCalculator,
    mdx: 'budget.mdx'
  },
  {
    slug: 'calorie',
    title: 'Calorie Calculator',
    description: 'Calculate daily calorie needs and track nutrition goals',
    category: 'Health & Fitness',
    component: CalorieCalculator,
    mdx: 'calorie.mdx'
  },
  {
    slug: 'capacitor',
    title: 'Capacitor Calculator',
    description: 'Calculate capacitor values, charge, energy and reactance',
    category: 'Engineering & Technology',
    component: CapacitorCalculator,
    mdx: 'capacitor.mdx'
  },
  {
    slug: 'car-lease',
    title: 'Car Lease Calculator',
    description: 'Calculate monthly car lease payments and total costs',
    category: 'Automotive',
    component: CarLeaseCalculator,
    mdx: 'car-lease.mdx'
  },
  {
    slug: 'car-loan',
    title: 'Car Loan Calculator',
    description: 'Calculate auto loan payments, interest and total costs',
    category: 'Automotive',
    component: CarLoanCalculator,
    mdx: 'car-loan.mdx'
  },
  {
    slug: 'cat-age',
    title: 'Cat Age Calculator',
    description: 'Convert your cat\'s age to human years',
    category: 'Unique & Niche',
    component: CatAgeCalculator,
    mdx: 'cat-age.mdx'
  },
  {
    slug: 'coffee-ratio',
    title: 'Coffee Ratio Calculator',
    description: 'Calculate perfect coffee-to-water ratios for brewing',
    category: 'Cooking & Food',
    component: CoffeeRatioCalculator,
    mdx: 'coffee-ratio.mdx'
  },
  {
    slug: 'compound-interest',
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest and investment growth over time',
    category: 'Financial & Business',
    component: CompoundInterestCalculator,
    mdx: 'compound-interest.mdx'
  },
  {
    slug: 'concrete',
    title: 'Concrete Calculator',
    description: 'Calculate concrete volume, materials and costs for projects',
    category: 'Construction & DIY',
    component: ConcreteCalculator,
    mdx: 'concrete.mdx'
  },
  {
    slug: 'credit-card-payoff',
    title: 'Credit Card Payoff Calculator',
    description: 'Calculate time and interest to pay off credit card debt',
    category: 'Financial & Business',
    component: CreditCardPayoffCalculator,
    mdx: 'credit-card-payoff.mdx'
  },
  {
    slug: 'currency-converter',
    title: 'Currency Converter',
    description: 'Convert between world currencies with live exchange rates',
    category: 'Specialized Conversions',
    component: CurrencyConverterCalculator,
    mdx: 'currency-converter.mdx'
  },
  {
    slug: 'date',
    title: 'Date Calculator',
    description: 'Calculate dates, durations and time differences',
    category: 'Mathematics & Basic Tools',
    component: DateCalculator,
    mdx: 'date.mdx'
  },
  {
    slug: 'depreciation',
    title: 'Depreciation Calculator',
    description: 'Calculate asset depreciation using various methods',
    category: 'Financial & Business',
    component: DepreciationCalculator,
    mdx: 'depreciation.mdx'
  },
  {
    slug: 'discount',
    title: 'Discount Calculator',
    description: 'Calculate discounts, sale prices, and savings amounts',
    category: 'Financial & Business',
    component: DiscountCalculator,
    mdx: 'discount.mdx'
  },
  {
    slug: 'dog-age',
    title: 'Dog Age Calculator',
    description: 'Convert your dog\'s age to human years by breed',
    category: 'Unique & Niche',
    component: DogAgeCalculator,
    mdx: 'dog-age.mdx'
  },
  {
    slug: 'electrical',
    title: 'Electrical Calculator',
    description: 'Calculate electrical values using Ohm\'s law and power formulas',
    category: 'Engineering & Technology',
    component: ElectricalCalculator,
    mdx: 'electrical.mdx'
  },
  {
    slug: 'equation-solver',
    title: 'Equation Solver',
    description: 'Solve linear and quadratic equations with step-by-step solutions',
    category: 'Mathematics & Basic Tools',
    component: EquationSolverCalculator,
    mdx: 'equation-solver.mdx'
  },
  {
    slug: 'ev-range',
    title: 'EV Range Calculator',
    description: 'Calculate electric vehicle range and efficiency',
    category: 'Automotive',
    component: EVRangeCalculator,
    mdx: 'ev-range.mdx'
  },
  {
    slug: 'fitness',
    title: 'Fitness Calculator',
    description: 'Calculate 1RM, calorie burn, running pace, and VO2 max',
    category: 'Health & Fitness',
    component: FitnessCalculator,
    mdx: 'fitness.mdx'
  },
  {
    slug: 'fraction',
    title: 'Fraction Calculator',
    description: 'Add, subtract, multiply and divide fractions',
    category: 'Mathematics & Basic Tools',
    component: FractionCalculator,
    mdx: 'fraction.mdx'
  },
  {
    slug: 'fuel-cost',
    title: 'Fuel Cost Calculator',
    description: 'Calculate trip costs and fuel efficiency',
    category: 'Automotive',
    component: FuelCostCalculator,
    mdx: 'fuel-cost.mdx'
  },
  {
    slug: 'golf-balls-boeing-747',
    title: 'Golf Balls in Boeing 747',
    description: 'Calculate how many golf balls fit inside a Boeing 747',
    category: 'Unique & Niche',
    component: GolfBallsBoeingCalculator,
    mdx: 'golf-balls-boeing-747.mdx'
  },
  {
    slug: 'gpa',
    title: 'GPA Calculator',
    description: 'Calculate your Grade Point Average and course grades',
    category: 'Education & Science',
    component: GPACalculator,
    mdx: 'gpa.mdx'
  },
  {
    slug: 'graphing',
    title: 'Graphing Calculator',
    description: 'Plot mathematical functions and equations',
    category: 'Mathematics & Basic Tools',
    component: GraphingCalculator,
    mdx: 'graphing.mdx'
  },
  {
    slug: 'heartrate',
    title: 'Heart Rate Calculator',
    description: 'Calculate target heart rate zones for exercise',
    category: 'Health & Fitness',
    component: HeartRateCalculator,
    mdx: 'heartrate.mdx'
  },
  {
    slug: 'interest',
    title: 'Interest Calculator',
    description: 'Calculate simple and compound interest',
    category: 'Financial & Business',
    component: InterestCalculator,
    mdx: 'interest.mdx'
  },
  {
    slug: 'investment',
    title: 'Investment Calculator',
    description: 'Calculate investment returns and growth over time',
    category: 'Financial & Business',
    component: InvestmentCalculator,
    mdx: 'investment.mdx'
  },
  {
    slug: 'loan',
    title: 'Loan Calculator',
    description: 'Calculate loan payments, interest and amortization',
    category: 'Financial & Business',
    component: LoanCalculator,
    mdx: 'loan.mdx'
  },
  {
    slug: 'love-calculator',
    title: 'Love Calculator',
    description: 'Calculate love compatibility percentage (for fun)',
    category: 'Unique & Niche',
    component: LoveCalculator,
    mdx: 'love-calculator.mdx'
  },
  {
    slug: 'matrix',
    title: 'Matrix Calculator',
    description: 'Perform matrix operations and calculations',
    category: 'Mathematics & Basic Tools',
    component: MatrixCalculator,
    mdx: 'matrix.mdx'
  },
  {
    slug: 'molecular-weight',
    title: 'Molecular Weight Calculator',
    description: 'Calculate molecular weight of chemical compounds',
    category: 'Education & Science',
    component: MolecularWeightCalculator,
    mdx: 'molecular-weight.mdx'
  },
  {
    slug: 'morse-code',
    title: 'Morse Code Converter',
    description: 'Convert text to and from Morse code',
    category: 'Specialized Conversions',
    component: MorseCodeCalculator,
    mdx: 'morse-code.mdx'
  },
  {
    slug: 'mortgage',
    title: 'Mortgage Calculator',
    description: 'Calculate home loan payments including PMI and taxes',
    category: 'Financial & Business',
    component: MortgageCalculator,
    mdx: 'mortgage.mdx'
  },
  {
    slug: 'mpg',
    title: 'MPG Calculator',
    description: 'Calculate vehicle fuel efficiency and cost per mile',
    category: 'Automotive',
    component: MPGCalculator,
    mdx: 'mpg.mdx'
  },
  {
    slug: 'npv-irr',
    title: 'NPV & IRR Calculator',
    description: 'Calculate Net Present Value and Internal Rate of Return',
    category: 'Financial & Business',
    component: NPVIRRCalculator,
    mdx: 'npv-irr.mdx'
  },
  {
    slug: 'ohms-law',
    title: 'Ohm\'s Law Calculator',
    description: 'Calculate voltage, current, resistance, and power relationships',
    category: 'Engineering & Technology',
    component: OhmsLawCalculator,
    mdx: 'ohms-law.mdx'
  },
  {
    slug: 'paint',
    title: 'Paint Calculator',
    description: 'Calculate paint needed for rooms and projects with cost estimates',
    category: 'Construction & DIY',
    component: PaintCalculator,
    mdx: 'paint.mdx'
  },
  {
    slug: 'password-generator',
    title: 'Password Generator',
    description: 'Generate secure passwords with customizable options and strength analysis',
    category: 'Engineering & Technology',
    component: PasswordGeneratorCalculator,
    mdx: 'password-generator.mdx'
  },
  {
    slug: 'patio',
    title: 'Patio Calculator',
    description: 'Calculate materials and costs for patio construction projects',
    category: 'Construction & DIY',
    component: PatioCalculator,
    mdx: 'patio.mdx'
  },
  {
    slug: 'percentage',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, percentage change, and percentage of amounts',
    category: 'Mathematics & Basic Tools',
    component: PercentageCalculator,
    mdx: 'percentage.mdx'
  },
  {
    slug: 'ph',
    title: 'pH Calculator',
    description: 'Calculate pH, pOH, and hydrogen ion concentrations',
    category: 'Education & Science',
    component: PHCalculator,
    mdx: 'ph.mdx'
  },
  {
    slug: 'prime',
    title: 'Prime Number Calculator',
    description: 'Check if numbers are prime and find prime factorization',
    category: 'Mathematics & Basic Tools',
    component: PrimeCalculator,
    mdx: 'prime.mdx'
  },
  {
    slug: 'protein',
    title: 'Protein Calculator',
    description: 'Calculate daily protein needs based on your goals and activity',
    category: 'Health & Fitness',
    component: ProteinCalculator,
    mdx: 'protein.mdx'
  },
  {
    slug: 'ratio',
    title: 'Ratio Calculator',
    description: 'Calculate and simplify ratios and solve proportions',
    category: 'Mathematics & Basic Tools',
    component: RatioCalculator,
    mdx: 'ratio.mdx'
  },
  {
    slug: 'recipe-converter',
    title: 'Recipe Converter',
    description: 'Scale recipes and convert between measurement units',
    category: 'Cooking & Food',
    component: RecipeConverterCalculator,
    mdx: 'recipe-converter.mdx'
  },
  {
    slug: 'refinance',
    title: 'Refinance Calculator',
    description: 'Calculate refinance savings and break-even points',
    category: 'Financial & Business',
    component: RefinanceCalculator,
    mdx: 'refinance.mdx'
  },
  {
    slug: 'resistor',
    title: 'Resistor Calculator',
    description: 'Calculate resistor values from color codes and find power ratings',
    category: 'Engineering & Technology',
    component: ResistorCalculator,
    mdx: 'resistor.mdx'
  },
  {
    slug: 'retirement',
    title: 'Retirement Calculator',
    description: 'Plan for retirement with savings and withdrawal calculations',
    category: 'Financial & Business',
    component: RetirementCalculator,
    mdx: 'retirement.mdx'
  },
  {
    slug: 'roi',
    title: 'ROI Calculator',
    description: 'Calculate return on investment and profitability analysis',
    category: 'Financial & Business',
    component: ROICalculator,
    mdx: 'roi.mdx'
  },
  {
    slug: 'roman-numerals',
    title: 'Roman Numerals Converter',
    description: 'Convert between Roman numerals and decimal numbers',
    category: 'Specialized Conversions',
    component: RomanNumeralsCalculator,
    mdx: 'roman-numerals.mdx'
  },
  {
    slug: 'roofing',
    title: 'Roofing Calculator',
    description: 'Calculate roofing materials, square footage, and project costs',
    category: 'Construction & DIY',
    component: RoofingCalculator,
    mdx: 'roofing.mdx'
  },
  {
    slug: 'salary',
    title: 'Salary Calculator',
    description: 'Convert between hourly, weekly, monthly, and yearly salaries',
    category: 'Financial & Business',
    component: SalaryCalculator,
    mdx: 'salary.mdx'
  },
  {
    slug: 'scientific',
    title: 'Scientific Calculator',
    description: 'Advanced calculator with trigonometric, logarithmic, and scientific functions',
    category: 'Mathematics & Basic Tools',
    component: ScientificCalculator,
    mdx: 'scientific.mdx'
  },
  {
    slug: 'seed-spacing',
    title: 'Seed Spacing Calculator',
    description: 'Calculate optimal seed spacing for your garden plants',
    category: 'Energy & Environment',
    component: SeedSpacingCalculator,
    mdx: 'seed-spacing.mdx'
  },
  {
    slug: 'significant-figures',
    title: 'Significant Figures Calculator',
    description: 'Round numbers to specified significant figures',
    category: 'Mathematics & Basic Tools',
    component: SignificantFiguresCalculator,
    mdx: 'significant-figures.mdx'
  },
  {
    slug: 'sleep',
    title: 'Sleep Calculator',
    description: 'Calculate optimal sleep and wake times based on sleep cycles',
    category: 'Health & Fitness',
    component: SleepCalculator,
    mdx: 'sleep.mdx'
  },
  {
    slug: 'solar-panel-savings',
    title: 'Solar Panel Savings Calculator',
    description: 'Calculate potential savings from solar panel installation',
    category: 'Unique & Niche',
    component: SolarPanelSavingsCalculator,
    mdx: 'solar-panel-savings.mdx'
  },
  {
    slug: 'space-weight',
    title: 'Space Weight Calculator',
    description: 'Calculate your weight on different planets and celestial bodies',
    category: 'Space & Astronomy',
    component: SpaceWeightCalculator,
    mdx: 'space-weight.mdx'
  },
  {
    slug: 'speed',
    title: 'Speed Calculator',
    description: 'Calculate speed, distance, and time relationships',
    category: 'Mathematics & Basic Tools',
    component: SpeedCalculator,
    mdx: 'speed.mdx'
  },
  {
    slug: 'stairs',
    title: 'Stairs Calculator',
    description: 'Calculate staircase dimensions and materials for construction',
    category: 'Construction & DIY',
    component: StairsCalculator,
    mdx: 'stairs.mdx'
  },
  {
    slug: 'stoichiometry',
    title: 'Stoichiometry Calculator',
    description: 'Calculate chemical reaction quantities and molar relationships',
    category: 'Education & Science',
    component: StoichiometryCalculator,
    mdx: 'stoichiometry.mdx'
  },
  {
    slug: 'subnet',
    title: 'Subnet Calculator',
    description: 'Calculate network subnets, IP ranges, and CIDR notation',
    category: 'Engineering & Technology',
    component: SubnetCalculator,
    mdx: 'subnet.mdx'
  },
  {
    slug: 'tax',
    title: 'Tax Calculator',
    description: 'Calculate income tax, sales tax, and tax withholdings',
    category: 'Financial & Business',
    component: TaxCalculator,
    mdx: 'tax.mdx'
  },
  {
    slug: 'tile',
    title: 'Tile Calculator',
    description: 'Calculate tile quantities needed for flooring and wall projects',
    category: 'Construction & DIY',
    component: TileCalculator,
    mdx: 'tile.mdx'
  },
  {
    slug: 'tip',
    title: 'Tip Calculator',
    description: 'Calculate tips and split bills among multiple people',
    category: 'Mathematics & Basic Tools',
    component: TipCalculator,
    mdx: 'tip.mdx'
  },
  {
    slug: 'tire-size',
    title: 'Tire Size Calculator',
    description: 'Compare tire sizes and calculate speedometer differences',
    category: 'Automotive',
    component: TireSizeCalculator,
    mdx: 'tire-size.mdx'
  },
  {
    slug: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert between various units of measurement',
    category: 'Specialized Conversions',
    component: UnitConverterCalculator,
    mdx: 'unit-converter.mdx'
  },
  {
    slug: 'volume',
    title: 'Volume Calculator',
    description: 'Calculate volume for various 3D shapes and containers',
    category: 'Mathematics & Basic Tools',
    component: VolumeCalculator,
    mdx: 'volume.mdx'
  },
  {
    slug: 'water',
    title: 'Water Calculator',
    description: 'Calculate daily water intake needs based on activity and climate',
    category: 'Health & Fitness',
    component: WaterCalculator,
    mdx: 'water.mdx'
  },
  {
    slug: 'energy-usage',
    title: 'Energy Usage Calculator',
    description: 'Estimate appliance kWh and electricity cost from watts, usage hours, and tariff.',
    category: 'Engineering & Technology',
    component: EnergyUsageCalculator,
    mdx: 'energy-usage.mdx'
  },
  {
    slug: 'carbon-footprint',
    title: 'Carbon Footprint Calculator',
    description: 'Estimate annual CO₂e from transport, home energy, and lifestyle; see reduction tips.',
    category: 'Engineering & Technology',
    component: CarbonFootprintCalculator,
    mdx: 'carbon-footprint.mdx'
  },
  {
    slug: 'home-energy-audit',
    title: 'Home Energy Audit Calculator',
    description: 'Assess insulation, windows, HVAC, and appliances to prioritise upgrades and cut bills.',
    category: 'Engineering & Technology',
    component: HomeEnergyAuditCalculator,
    mdx: 'home-energy-audit.mdx'
  },
  {
    slug: 'time',
    title: 'Time Calculator',
    description: 'Add, subtract, multiply, divide, and convert time with HH:MM:SS and decimal hours.',
    category: 'Mathematics & Basic Tools',
    component: TimeCalculator,
    mdx: 'time.mdx'
  },
  {
    slug: 'timezone-converter',
    title: 'Time Zone Converter',
    description: 'Convert times between world time zones with DST awareness and date-line handling.',
    category: 'Mathematics & Basic Tools',
    component: TimeZoneConverterCalculator,
    mdx: 'timezone-converter.mdx'
  },
  {
    slug: 'countdown-timer',
    title: 'Countdown Timer',
    description: 'Create event and deadline countdowns with real-time updates and progress bars.',
    category: 'Mathematics & Basic Tools',
    component: CountdownTimerCalculator,
    mdx: 'countdown-timer.mdx'
  }
];

export const calculators: CalcEntry[] = calculatorsBase.map((c): CalcEntry => ({
  ...c,
  seo: seoBySlug[c.slug],
}));

export const bySlug: Record<string, CalcEntry> =
  Object.fromEntries(calculators.map((c) => [c.slug, c]));