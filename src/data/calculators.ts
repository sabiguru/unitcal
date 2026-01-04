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
import AveragePercentageCalculator from '@/components/calc/AveragePercentageCalculator';
import FractionToPercentCalculator from '@/components/calc/FractionToPercentCalculator';
import DecimalToPercentCalculator from '@/components/calc/DecimalToPercentCalculator';
import DoublingTimeCalculator from '@/components/calc/DoublingTimeCalculator';
import PercentageDifferenceCalculator from '@/components/calc/PercentageDifferenceCalculator';
import PercentageOfPercentageCalculator from '@/components/calc/PercentageOfPercentageCalculator';
import PercentagePointCalculator from '@/components/calc/PercentagePointCalculator';
import PercentErrorCalculator from '@/components/calc/PercentErrorCalculator';
import TimePercentageCalculator from '@/components/calc/TimePercentageCalculator';
import PercentToGoalCalculator from '@/components/calc/PercentToGoalCalculator';
import RelativeChangeCalculator from '@/components/calc/RelativeChangeCalculator';
import SlopePercentageCalculator from '@/components/calc/SlopePercentageCalculator';
import AbsoluteValueEquationCalculator from '@/components/calc/AbsoluteValueEquationCalculator';
import AbsoluteValueInequalitiesCalculator from '@/components/calc/AbsoluteValueInequalitiesCalculator';
import AddingSubtractingPolynomialsCalculator from '@/components/calc/AddingSubtractingPolynomialsCalculator';
import BesselFunctionCalculator from '@/components/calc/BesselFunctionCalculator';
import BinomialCoefficientCalculator from '@/components/calc/BinomialCoefficientCalculator';
import BoxMethodCalculator from '@/components/calc/BoxMethodCalculator';
import CompletingSquareCalculator from '@/components/calc/CompletingSquareCalculator';
import ComplexConjugateCalculator from '@/components/calc/ComplexConjugateCalculator';
import ComplexNumberCalculator from '@/components/calc/ComplexNumberCalculator';
import ComplexRootCalculator from '@/components/calc/ComplexRootCalculator';
import CubicEquationCalculator from '@/components/calc/CubicEquationCalculator';
import DescartesRuleSignsCalculator from '@/components/calc/DescartesRuleSignsCalculator';
import DiamondProblemCalculator from '@/components/calc/DiamondProblemCalculator';
import DirectVariationCalculator from '@/components/calc/DirectVariationCalculator';
import DiscriminantCalculator from '@/components/calc/DiscriminantCalculator';
import EliminationMethodCalculator from '@/components/calc/EliminationMethodCalculator';
import ErrorFunctionCalculator from '@/components/calc/ErrorFunctionCalculator';
import FactoringTrinomialsCalculator from '@/components/calc/FactoringTrinomialsCalculator';
import FOILCalculator from '@/components/calc/FOILCalculator';
import GammaFunctionCalculator from '@/components/calc/GammaFunctionCalculator';
import GenericRectangleCalculator from '@/components/calc/GenericRectangleCalculator';
import GraphingInequalitiesNumberLineCalculator from '@/components/calc/GraphingInequalitiesNumberLineCalculator';
import GraphingQuadraticInequalitiesCalculator from '@/components/calc/GraphingQuadraticInequalitiesCalculator';
import HyperbolicFunctionsCalculator from '@/components/calc/HyperbolicFunctionsCalculator';
import InequalityIntervalNotationCalculator from '@/components/calc/InequalityIntervalNotationCalculator';
import IntervalNotationCalculator from '@/components/calc/IntervalNotationCalculator';
import InverseVariationCalculator from '@/components/calc/InverseVariationCalculator';
import MultiplyingBinomialsCalculator from '@/components/calc/MultiplyingBinomialsCalculator';
import MultiplyingPolynomialsCalculator from '@/components/calc/MultiplyingPolynomialsCalculator';
import PartialFractionDecompositionCalculator from '@/components/calc/PartialFractionDecompositionCalculator';
import PerfectSquareTrinomialCalculator from '@/components/calc/PerfectSquareTrinomialCalculator';
import PolynomialDivisionCalculator from '@/components/calc/PolynomialDivisionCalculator';
import PowerSetCalculator from '@/components/calc/PowerSetCalculator';
import QuadraticFormulaCalculator from '@/components/calc/QuadraticFormulaCalculator';
import QuaternionCalculator from '@/components/calc/QuaternionCalculator';
import RationalZerosCalculator from '@/components/calc/RationalZerosCalculator';
import SquareBinomialCalculator from '@/components/calc/SquareBinomialCalculator';
import SubsetCalculator from '@/components/calc/SubsetCalculator';
import SubstitutionMethodCalculator from '@/components/calc/SubstitutionMethodCalculator';
import SyntheticDivisionCalculator from '@/components/calc/SyntheticDivisionCalculator';
import SystemEquationsCalculator from '@/components/calc/SystemEquationsCalculator';
import UnionIntersectionCalculator from '@/components/calc/UnionIntersectionCalculator';

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
  },
  {
    slug: 'average-percentage',
    title: 'Average Percentage Calculator',
    description: 'Calculate the average of multiple percentage values',
    category: 'Mathematics & Basic Tools',
    component: AveragePercentageCalculator,
    mdx: 'average-percentage.mdx'
  },
  {
    slug: 'fraction-to-percent',
    title: 'Fraction to Percent Calculator',
    description: 'Convert any fraction to its percentage equivalent',
    category: 'Mathematics & Basic Tools',
    component: FractionToPercentCalculator,
    mdx: 'fraction-to-percent.mdx'
  },
  {
    slug: 'decimal-to-percent',
    title: 'Decimal to Percent Converter',
    description: 'Convert between decimal and percentage formats',
    category: 'Mathematics & Basic Tools',
    component: DecimalToPercentCalculator,
    mdx: 'decimal-to-percent.mdx'
  },
  {
    slug: 'doubling-time',
    title: 'Doubling Time Calculator',
    description: 'Calculate how long it takes for a value to double at a given growth rate',
    category: 'Mathematics & Basic Tools',
    component: DoublingTimeCalculator,
    mdx: 'doubling-time.mdx'
  },
  {
    slug: 'percentage-difference',
    title: 'Percentage Difference Calculator',
    description: 'Calculate the absolute percentage difference between two values',
    category: 'Mathematics & Basic Tools',
    component: PercentageDifferenceCalculator,
    mdx: 'percentage-difference.mdx'
  },
  {
    slug: 'percentage-of-percentage',
    title: 'Percentage of a Percentage Calculator',
    description: 'Calculate what percentage of a percentage equals',
    category: 'Mathematics & Basic Tools',
    component: PercentageOfPercentageCalculator,
    mdx: 'percentage-of-percentage.mdx'
  },
  {
    slug: 'percentage-point',
    title: 'Percentage Point Calculator',
    description: 'Calculate the difference in percentage points between values',
    category: 'Mathematics & Basic Tools',
    component: PercentagePointCalculator,
    mdx: 'percentage-point.mdx'
  },
  {
    slug: 'percent-error',
    title: 'Percent Error Calculator',
    description: 'Calculate the percent error between experimental and actual values',
    category: 'Mathematics & Basic Tools',
    component: PercentErrorCalculator,
    mdx: 'percent-error.mdx'
  },
  {
    slug: 'time-percentage',
    title: 'Time Percentage Calculator',
    description: 'Calculate what percentage of a time period has elapsed or remains',
    category: 'Mathematics & Basic Tools',
    component: TimePercentageCalculator,
    mdx: 'time-percentage.mdx'
  },
  {
    slug: 'percent-to-goal',
    title: 'Percent to Goal Calculator',
    description: 'Calculate percentage progress toward your goals',
    category: 'Mathematics & Basic Tools',
    component: PercentToGoalCalculator,
    mdx: 'percent-to-goal.mdx'
  },
  {
    slug: 'relative-change',
    title: 'Relative Change Calculator',
    description: 'Calculate the relative percentage change between values',
    category: 'Mathematics & Basic Tools',
    component: RelativeChangeCalculator,
    mdx: 'relative-change.mdx'
  },
  {
    slug: 'slope-percentage',
    title: 'Slope Percentage Calculator',
    description: 'Calculate slope, grade, or gradient as a percentage',
    category: 'Mathematics & Basic Tools',
    component: SlopePercentageCalculator,
    mdx: 'slope-percentage.mdx'
  },
  {
    slug: 'absolute-value-equation',
    title: 'Absolute Value Equation Calculator',
    description: 'Solve absolute value equations',
    category: 'Mathematics & Basic Tools',
    component: AbsoluteValueEquationCalculator,
    mdx: 'absolute-value-equation.mdx'
  },
  {
    slug: 'absolute-value-inequalities',
    title: 'Absolute Value Inequalities Calculator',
    description: 'Solve absolute value inequalities',
    category: 'Mathematics & Basic Tools',
    component: AbsoluteValueInequalitiesCalculator,
    mdx: 'absolute-value-inequalities.mdx'
  },
  {
    slug: 'adding-subtracting-polynomials',
    title: 'Adding and Subtracting Polynomials Calculator',
    description: 'Add and subtract polynomial expressions',
    category: 'Mathematics & Basic Tools',
    component: AddingSubtractingPolynomialsCalculator,
    mdx: 'adding-subtracting-polynomials.mdx'
  },
  {
    slug: 'bessel-function',
    title: 'Bessel Function Calculator',
    description: 'Calculate Bessel functions of the first and second kind',
    category: 'Mathematics & Basic Tools',
    component: BesselFunctionCalculator,
    mdx: 'bessel-function.mdx'
  },
  {
    slug: 'binomial-coefficient',
    title: 'Binomial Coefficient Calculator',
    description: 'Calculate binomial coefficients and combinations',
    category: 'Mathematics & Basic Tools',
    component: BinomialCoefficientCalculator,
    mdx: 'binomial-coefficient.mdx'
  },
  {
    slug: 'box-method',
    title: 'Box Method Calculator',
    description: 'Multiply polynomials using the box method',
    category: 'Mathematics & Basic Tools',
    component: BoxMethodCalculator,
    mdx: 'box-method.mdx'
  },
  {
    slug: 'completing-square',
    title: 'Completing the Square Calculator',
    description: 'Complete the square for quadratic equations',
    category: 'Mathematics & Basic Tools',
    component: CompletingSquareCalculator,
    mdx: 'completing-square.mdx'
  },
  {
    slug: 'complex-conjugate',
    title: 'Complex Conjugate Calculator',
    description: 'Find the conjugate of complex numbers',
    category: 'Mathematics & Basic Tools',
    component: ComplexConjugateCalculator,
    mdx: 'complex-conjugate.mdx'
  },
  {
    slug: 'complex-number',
    title: 'Complex Number Calculator',
    description: 'Perform operations with complex numbers',
    category: 'Mathematics & Basic Tools',
    component: ComplexNumberCalculator,
    mdx: 'complex-number.mdx'
  },
  {
    slug: 'complex-root',
    title: 'Complex Root Calculator',
    description: 'Find complex roots of equations',
    category: 'Mathematics & Basic Tools',
    component: ComplexRootCalculator,
    mdx: 'complex-root.mdx'
  },
  {
    slug: 'cubic-equation',
    title: 'Cubic Equation Calculator',
    description: 'Solve cubic equations',
    category: 'Mathematics & Basic Tools',
    component: CubicEquationCalculator,
    mdx: 'cubic-equation.mdx'
  },
  {
    slug: 'descartes-rule-signs',
    title: 'Descartes\' Rule of Signs Calculator',
    description: 'Determine possible positive and negative real roots',
    category: 'Mathematics & Basic Tools',
    component: DescartesRuleSignsCalculator,
    mdx: 'descartes-rule-signs.mdx'
  },
  {
    slug: 'diamond-problem',
    title: 'Diamond Problem Calculator',
    description: 'Find two numbers that multiply and add to given values',
    category: 'Mathematics & Basic Tools',
    component: DiamondProblemCalculator,
    mdx: 'diamond-problem.mdx'
  },
  {
    slug: 'direct-variation',
    title: 'Direct Variation Calculator',
    description: 'Solve direct variation problems',
    category: 'Mathematics & Basic Tools',
    component: DirectVariationCalculator,
    mdx: 'direct-variation.mdx'
  },
  {
    slug: 'discriminant',
    title: 'Discriminant Calculator',
    description: 'Calculate the discriminant of quadratic equations',
    category: 'Mathematics & Basic Tools',
    component: DiscriminantCalculator,
    mdx: 'discriminant.mdx'
  },
  {
    slug: 'elimination-method',
    title: 'Elimination Method Calculator',
    description: 'Solve systems of equations using elimination',
    category: 'Mathematics & Basic Tools',
    component: EliminationMethodCalculator,
    mdx: 'elimination-method.mdx'
  },
  {
    slug: 'error-function',
    title: 'Error Function Calculator',
    description: 'Calculate the error function and complementary error function',
    category: 'Mathematics & Basic Tools',
    component: ErrorFunctionCalculator,
    mdx: 'error-function.mdx'
  },
  {
    slug: 'factoring-trinomials',
    title: 'Factoring Trinomials Calculator',
    description: 'Factor trinomial expressions',
    category: 'Mathematics & Basic Tools',
    component: FactoringTrinomialsCalculator,
    mdx: 'factoring-trinomials.mdx'
  },
  {
    slug: 'foil',
    title: 'FOIL Calculator',
    description: 'Multiply binomials using the FOIL method',
    category: 'Mathematics & Basic Tools',
    component: FOILCalculator,
    mdx: 'foil.mdx'
  },
  {
    slug: 'gamma-function',
    title: 'Gamma Function Calculator',
    description: 'Calculate the gamma function',
    category: 'Mathematics & Basic Tools',
    component: GammaFunctionCalculator,
    mdx: 'gamma-function.mdx'
  },
  {
    slug: 'generic-rectangle',
    title: 'Generic Rectangle Calculator',
    description: 'Use the area model for polynomial multiplication',
    category: 'Mathematics & Basic Tools',
    component: GenericRectangleCalculator,
    mdx: 'generic-rectangle.mdx'
  },
  {
    slug: 'graphing-inequalities-number-line',
    title: 'Graphing Inequalities on a Number Line Calculator',
    description: 'Graph inequalities on a number line',
    category: 'Mathematics & Basic Tools',
    component: GraphingInequalitiesNumberLineCalculator,
    mdx: 'graphing-inequalities-number-line.mdx'
  },
  {
    slug: 'graphing-quadratic-inequalities',
    title: 'Graphing Quadratic Inequalities Calculator',
    description: 'Solve and graph quadratic inequalities',
    category: 'Mathematics & Basic Tools',
    component: GraphingQuadraticInequalitiesCalculator,
    mdx: 'graphing-quadratic-inequalities.mdx'
  },
  {
    slug: 'hyperbolic-functions',
    title: 'Hyperbolic Functions Calculator',
    description: 'Calculate hyperbolic sine, cosine, and tangent',
    category: 'Mathematics & Basic Tools',
    component: HyperbolicFunctionsCalculator,
    mdx: 'hyperbolic-functions.mdx'
  },
  {
    slug: 'inequality-interval-notation',
    title: 'Inequality to Interval Notation Calculator',
    description: 'Convert inequalities to interval notation',
    category: 'Mathematics & Basic Tools',
    component: InequalityIntervalNotationCalculator,
    mdx: 'inequality-interval-notation.mdx'
  },
  {
    slug: 'interval-notation',
    title: 'Interval Notation Calculator',
    description: 'Work with interval notation',
    category: 'Mathematics & Basic Tools',
    component: IntervalNotationCalculator,
    mdx: 'interval-notation.mdx'
  },
  {
    slug: 'inverse-variation',
    title: 'Inverse Variation Calculator',
    description: 'Solve inverse variation problems',
    category: 'Mathematics & Basic Tools',
    component: InverseVariationCalculator,
    mdx: 'inverse-variation.mdx'
  },
  {
    slug: 'multiplying-binomials',
    title: 'Multiplying Binomials Calculator',
    description: 'Multiply binomial expressions',
    category: 'Mathematics & Basic Tools',
    component: MultiplyingBinomialsCalculator,
    mdx: 'multiplying-binomials.mdx'
  },
  {
    slug: 'multiplying-polynomials',
    title: 'Multiplying Polynomials Calculator',
    description: 'Multiply polynomial expressions',
    category: 'Mathematics & Basic Tools',
    component: MultiplyingPolynomialsCalculator,
    mdx: 'multiplying-polynomials.mdx'
  },
  {
    slug: 'partial-fraction-decomposition',
    title: 'Partial Fraction Decomposition Calculator',
    description: 'Decompose rational functions into partial fractions',
    category: 'Mathematics & Basic Tools',
    component: PartialFractionDecompositionCalculator,
    mdx: 'partial-fraction-decomposition.mdx'
  },
  {
    slug: 'perfect-square-trinomial',
    title: 'Perfect Square Trinomial Calculator',
    description: 'Identify and create perfect square trinomials',
    category: 'Mathematics & Basic Tools',
    component: PerfectSquareTrinomialCalculator,
    mdx: 'perfect-square-trinomial.mdx'
  },
  {
    slug: 'polynomial-division',
    title: 'Polynomial Division Calculator',
    description: 'Divide polynomials using long division',
    category: 'Mathematics & Basic Tools',
    component: PolynomialDivisionCalculator,
    mdx: 'polynomial-division.mdx'
  },
  {
    slug: 'power-set',
    title: 'Power Set Calculator',
    description: 'Generate the power set of a given set',
    category: 'Mathematics & Basic Tools',
    component: PowerSetCalculator,
    mdx: 'power-set.mdx'
  },
  {
    slug: 'quadratic-formula',
    title: 'Quadratic Formula Calculator',
    description: 'Solve quadratic equations using the quadratic formula',
    category: 'Mathematics & Basic Tools',
    component: QuadraticFormulaCalculator,
    mdx: 'quadratic-formula.mdx'
  },
  {
    slug: 'quaternion',
    title: 'Quaternion Calculator',
    description: 'Perform operations with quaternions',
    category: 'Mathematics & Basic Tools',
    component: QuaternionCalculator,
    mdx: 'quaternion.mdx'
  },
  {
    slug: 'rational-zeros',
    title: 'Rational Zeros Calculator',
    description: 'Find possible rational zeros using the rational root theorem',
    category: 'Mathematics & Basic Tools',
    component: RationalZerosCalculator,
    mdx: 'rational-zeros.mdx'
  },
  {
    slug: 'square-binomial',
    title: 'Square of a Binomial Calculator',
    description: 'Calculate the square of binomial expressions',
    category: 'Mathematics & Basic Tools',
    component: SquareBinomialCalculator,
    mdx: 'square-binomial.mdx'
  },
  {
    slug: 'subset',
    title: 'Subset Calculator',
    description: 'Check subset relationships between sets',
    category: 'Mathematics & Basic Tools',
    component: SubsetCalculator,
    mdx: 'subset.mdx'
  },
  {
    slug: 'substitution-method',
    title: 'Substitution Method Calculator',
    description: 'Solve systems of equations using substitution',
    category: 'Mathematics & Basic Tools',
    component: SubstitutionMethodCalculator,
    mdx: 'substitution-method.mdx'
  },
  {
    slug: 'synthetic-division',
    title: 'Synthetic Division Calculator',
    description: 'Divide polynomials using synthetic division',
    category: 'Mathematics & Basic Tools',
    component: SyntheticDivisionCalculator,
    mdx: 'synthetic-division.mdx'
  },
  {
    slug: 'system-equations',
    title: 'System of Equations Calculator',
    description: 'Solve systems of linear equations',
    category: 'Mathematics & Basic Tools',
    component: SystemEquationsCalculator,
    mdx: 'system-equations.mdx'
  },
  {
    slug: 'union-intersection',
    title: 'Union and Intersection Calculator',
    description: 'Calculate set union and intersection operations',
    category: 'Mathematics & Basic Tools',
    component: UnionIntersectionCalculator,
    mdx: 'union-intersection.mdx'
  }
];

export const calculators: CalcEntry[] = calculatorsBase.map((c): CalcEntry => ({
  ...c,
  seo: seoBySlug[c.slug],
}));

export const bySlug: Record<string, CalcEntry> =
  Object.fromEntries(calculators.map((c) => [c.slug, c]));