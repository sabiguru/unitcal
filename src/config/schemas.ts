/**
 * Centralized Schema.org structured data for the entire website
 */

// Organization Schema - represents CalcFort as a business entity
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CalcFort',
  url: 'https://calcfort.com',
  logo: 'https://calcfort.com/logo.png',
  description: 'Free online calculators for mathematics, finance, health, engineering, and more. Fast, accurate, and easy to use.',
  email: 'support@calcfort.com',
  foundingDate: '2024',
  sameAs: [
    'https://twitter.com/calcfort',
    'https://facebook.com/calcfort',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@calcfort.com',
    availableLanguage: ['English']
  }
};

// WebSite Schema - represents the website with search functionality
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CalcFort',
  url: 'https://calcfort.com',
  description: 'Free online calculators for mathematics, finance, health, engineering, and more.',
  publisher: {
    '@type': 'Organization',
    name: 'CalcFort',
    logo: {
      '@type': 'ImageObject',
      url: 'https://calcfort.com/logo.png'
    }
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://calcfort.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
};

// WebPage Schema generator for individual pages
export function generateWebPageSchema(
  pageName: string,
  pageUrl: string,
  description: string,
  breadcrumbs?: Array<{ name: string; url: string }>
) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageName,
    url: pageUrl,
    description: description,
    publisher: {
      '@type': 'Organization',
      name: 'CalcFort'
    },
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CalcFort',
      url: 'https://calcfort.com'
    }
  };

  if (breadcrumbs && breadcrumbs.length > 0) {
    schema.breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
  }

  return schema;
}

// SoftwareApplication Schema for calculators
export function generateCalculatorSchema(
  calculatorName: string,
  calculatorUrl: string,
  description: string,
  category: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calculatorName,
    url: calculatorUrl,
    description: description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CalcFort'
    },
    applicationSubCategory: category,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0'
  };
}

// FAQPage Schema generator for pages with FAQs
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Article Schema for learn/blog pages
export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
  imageUrl?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Person',
      name: 'Ben Konna',
      url: 'https://calcfort.com/about/ben-konna'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CalcFort',
      logo: {
        '@type': 'ImageObject',
        url: 'https://calcfort.com/logo.png'
      }
    },
    image: imageUrl || 'https://calcfort.com/og-image.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  };
}

// CollectionPage Schema for category pages
export function generateCollectionPageSchema(
  categoryName: string,
  categoryUrl: string,
  description: string,
  numberOfItems: number
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryName,
    url: categoryUrl,
    description: description,
    isPartOf: {
      '@type': 'WebSite',
      name: 'CalcFort',
      url: 'https://calcfort.com'
    },
    numberOfItems: numberOfItems,
    publisher: {
      '@type': 'Organization',
      name: 'CalcFort'
    }
  };
}
