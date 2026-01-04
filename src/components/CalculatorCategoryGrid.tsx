import Link from 'next/link';
import { calculatorCategories } from '@/data/categoryData';

interface CalculatorCategoryGridProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function CalculatorCategoryGrid({
  title = 'All Calculator Categories',
  subtitle = 'Explore our complete collection of specialized calculators',
  className = '',
}: CalculatorCategoryGridProps) {
  return (
    <div className={`bg-white rounded-xl p-8 shadow-lg border border-gray-200 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {calculatorCategories.map((category, index) => (
          <Link
            key={index}
            href={`/calculator/${category.slug}`}
            className="group p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {category.calculators.length} tools
              </p>
              <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
