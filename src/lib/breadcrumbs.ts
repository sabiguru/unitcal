import { calculatorCategories } from '@/data/categoryData';
import type { BreadcrumbItem } from '@/components/Breadcrumbs';

// Create a category name to slug mapping for quick lookup
const categoryNameToSlug = Object.fromEntries(
  calculatorCategories.map(cat => [cat.title, cat.slug])
);

export function generateCalculatorBreadcrumbs(
  calculatorTitle: string,
  categoryName: string,
  canonicalUrl?: string
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

  // Add current calculator with canonical URL for JSON-LD
  breadcrumbs.push({
    label: calculatorTitle,
    current: true,
    canonicalUrl: canonicalUrl
  });

  return breadcrumbs;
}

export function generateCategoryBreadcrumbs(categoryTitle: string, canonicalUrl?: string): BreadcrumbItem[] {
  return [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Calculators',
      href: '/calculators'
    },
    {
      label: categoryTitle,
      current: true,
      canonicalUrl: canonicalUrl
    }
  ];
}
