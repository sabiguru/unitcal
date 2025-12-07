import { calculatorCategories } from '@/data/categoryData';
import type { BreadcrumbItem } from '@/components/Breadcrumbs';

// Create a category name to slug mapping for quick lookup
const categoryNameToSlug = Object.fromEntries(
  calculatorCategories.map(cat => [cat.title, cat.slug])
);

export function generateCalculatorBreadcrumbs(
  calculatorTitle: string,
  categoryName: string
): BreadcrumbItem[] {
  const categorySlug = categoryNameToSlug[categoryName];
  
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: '/'
    }
  ];

  // Add category if it exists (directly, no "Categories" in between)
  if (categorySlug) {
    breadcrumbs.push({
      label: categoryName,
      href: `/calculator/${categorySlug}`
    });
  }

  // Add current calculator
  breadcrumbs.push({
    label: calculatorTitle,
    current: true
  });

  return breadcrumbs;
}

export function generateCategoryBreadcrumbs(categoryTitle: string): BreadcrumbItem[] {
  return [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Categories',
      href: '/calculators'
    },
    {
      label: categoryTitle,
      current: true
    }
  ];
}
