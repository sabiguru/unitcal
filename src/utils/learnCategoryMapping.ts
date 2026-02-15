// Centralized mapping of learn article slugs to their categories
// This ensures consistency across the application

export const LEARN_CATEGORY_MAPPING: Record<string, string[]> = {
  'mathematics': [],
  'health': [
    'wearable-tech-data-driven-fitness',
    'strength-training-building-muscle-healthgoal',
    'holistic-recovery-mobility-low-impact-training',
    'quick-home-workouts'
  ],
  'financial': [
    'finance-automation-2026',
    'remote-work-2026',
    'cost-of-living-2026',
    'ai-finance-2026',
    'ai-productivity-roi-calculation'
  ],
  'engineering': [
    'ai-engineering-2026',
    'concept-to-silicon',
    'ipv4-subnetting-guide-subnet-calculator'
  ],
  'automotive': [],
  'construction': [],
  'cooking': [],
  'education': [
    'degree-cost-projection-2026'
  ],
  'everyday': [
    'ai-everyday-calculations',
    'ai-tools-2026',
    'math-behind-ai',
    'ai-habits-health'
  ],
  'conversions': [],
  'energy': [
    'solar-panel-savings-payback-roi-2026'
  ],
  'agriculture': [],
  'animal-age': [],
  'space': [
    'planetary-years',
    'time-on-mars',
    'weight-on-mars',
    'space-discoveries-2026'
  ],
  'unique': [],
  'lifestyle': []
};

// Helper function to get category for a given slug
export function getCategoryForSlug(slug: string): string | null {
  for (const [category, slugs] of Object.entries(LEARN_CATEGORY_MAPPING)) {
    if (slugs.includes(slug)) {
      return category;
    }
  }
  return null;
}

// Helper function to get all slugs for a category
export function getSlugsForCategory(category: string): string[] {
  return LEARN_CATEGORY_MAPPING[category] || [];
}

// Helper function to build the full learn URL path
export function getLearnArticleUrl(slug: string): string {
  const category = getCategoryForSlug(slug);
  if (!category) {
    // Fallback to old structure if category not found
    return `/learn/${slug}`;
  }
  return `/learn/${category}/${slug}`;
}
