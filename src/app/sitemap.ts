import { MetadataRoute } from 'next';
import { calculators } from '@/data/calculators';
import { calculatorCategories } from '@/data/categoryData';
import { getAvailableLearnSlugs } from '@/data/learnSeoBySlug';
import { LEARN_CATEGORY_MAPPING, getCategoryForSlug, getSlugsForCategory } from '@/utils/learnCategoryMapping';
import { getCategoryForCalculator } from '@/utils/calculatorCategoryMapping';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calcfort.com';
  const currentDate = new Date();
  const POSTS_PER_PAGE = 8; // keep in sync with /learn/[category] pagination

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];


  // Dynamic calculator routes
  const calculatorRoutes: MetadataRoute.Sitemap = calculators.map(calculator => {
    const category = getCategoryForCalculator(calculator.slug);
    return {
      url: category ? `${baseUrl}/calculator/${category}/${calculator.slug}` : `${baseUrl}/calculator/${calculator.slug}`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    };
  });

  // Dynamic category routes
  const categoryRoutes: MetadataRoute.Sitemap = calculatorCategories.map(category => ({
    url: `${baseUrl}/calculator/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Function to map learn articles to categories
  function getLearnCategoriesWithContent() {
    const availableLearnSlugs = getAvailableLearnSlugs();

    return calculatorCategories
      .filter(category => category.slug !== 'cooking') // Exclude cooking category
      .filter(category => {
        const learnSlugs = LEARN_CATEGORY_MAPPING[category.slug] || [];
        const availableArticles = learnSlugs.filter(slug => availableLearnSlugs.includes(slug));
        return availableArticles.length > 0;
      })
      .map(category => category.slug);
  }

  // Dynamic learn category routes
  const learnCategoryRoutes: MetadataRoute.Sitemap = getLearnCategoriesWithContent().map(categorySlug => ({
    url: `${baseUrl}/learn/${categorySlug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Pagination for learn category routes (page 2+)
  const learnCategoryPaginationRoutes: MetadataRoute.Sitemap = getLearnCategoriesWithContent()
    .flatMap(categorySlug => {
      const availableLearnSlugs = getAvailableLearnSlugs();
      const slugs = getSlugsForCategory(categorySlug);
      const totalPosts = slugs.filter(slug => availableLearnSlugs.includes(slug)).length;
      const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

      if (totalPages <= 1) return [];

      return Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map(page => ({
        url: `${baseUrl}/learn/${categorySlug}?page=${page}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    });

  // Dynamic individual learn article routes (with category-based URLs)
  const learnArticleRoutes: MetadataRoute.Sitemap = getAvailableLearnSlugs().map(slug => {
    const category = getCategoryForSlug(slug);
    return {
      url: category ? `${baseUrl}/learn/${category}/${slug}` : `${baseUrl}/learn/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    };
  });

  return [
    ...staticRoutes,
    ...calculatorRoutes,
    ...categoryRoutes,
    ...learnCategoryRoutes,
    ...learnCategoryPaginationRoutes,
    ...learnArticleRoutes,
  ];
}
