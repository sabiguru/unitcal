// Ezoic Ad Placement Configuration
// Update these with your actual placement IDs from Ezoic dashboard

export const EZOIC_PLACEMENTS = {
  // Homepage placements
  HOME_SIDEBAR_TOP: 111,
  HOME_SIDEBAR_BOTTOM: 113,
  HOME_BANNER: 114,
  
  // Calculator page placements
  CALCULATOR_CONTENT: 111,  // Reuse 111 for calculator pages
  CALCULATOR_SIDEBAR: 113,  // Reuse 113 for calculator sidebar
  
  // Category page placements
  CATEGORY_TOP: 114,        // Reuse 114 for category pages
  CATEGORY_SIDEBAR: 111,    // Reuse 111 for category sidebar
  
  // Content page placements
  CONTENT_HEADER: 113,      // Reuse 113 for content header
  CONTENT_FOOTER: 114,      // Reuse 114 for content footer
  CONTENT_INLINE: 111,      // Reuse 111 for inline content

  // Learn page placements
  LEARN_SIDEBAR: 113,       // Reuse 113 for learn sidebar
  LEARN_CONTENT: 111,       // Reuse 111 for learn content
} as const;

// Helper function to get placement ID by name
export function getPlacementId(placementName: keyof typeof EZOIC_PLACEMENTS): number {
  return EZOIC_PLACEMENTS[placementName];
}

// Configuration for multiple ads per page (for better performance)
export const PAGE_AD_CONFIGS = {
  homepage: [
    { id: EZOIC_PLACEMENTS.HOME_SIDEBAR_TOP, className: 'mb-6' },     // 111
    { id: EZOIC_PLACEMENTS.HOME_SIDEBAR_BOTTOM, className: 'mt-6' },  // 113
    { id: EZOIC_PLACEMENTS.HOME_BANNER, className: 'text-center mb-12' }, // 114
  ],
  calculator: [
    { id: EZOIC_PLACEMENTS.CALCULATOR_CONTENT, className: 'text-center mb-8' }, // 111
  ],
} as const;